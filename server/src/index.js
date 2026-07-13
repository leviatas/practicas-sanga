// Backend de logs de uso (Node puro, sin dependencias externas).
// Guarda cada visita/evento en SQLite (node:sqlite). La IP NO se almacena en
// claro: se guarda un identificador anónimo derivado de ella (ver anonId).
//
// Endpoints:
//   POST /api/event   -> registra un evento (open, practice_start, answer, complete)
//   GET  /api/logs     -> devuelve eventos + resumen (requiere contraseña)
//   GET  /api/health   -> 200 ok
//
// Variables de entorno:
//   PORT            (default 3000)
//   DB_PATH         (default /data/usage.db)
//   LOGS_PASSWORD   (default Sanga70)

import { createServer } from 'node:http'
import { DatabaseSync } from 'node:sqlite'
import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { createHash, randomBytes } from 'node:crypto'

const PORT = Number(process.env.PORT || 3000)
const DB_PATH = process.env.DB_PATH || '/data/usage.db'
const LOGS_PASSWORD = process.env.LOGS_PASSWORD || 'Sanga70'

// --- Base de datos ---
try {
  mkdirSync(dirname(DB_PATH), { recursive: true })
} catch {
  // el directorio ya existe
}
const db = new DatabaseSync(DB_PATH)
db.exec(`
  CREATE TABLE IF NOT EXISTS events (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    ts       INTEGER NOT NULL,
    ip       TEXT,
    ua       TEXT,
    type     TEXT NOT NULL,
    grade    TEXT,
    practice TEXT,
    title    TEXT,
    correct  INTEGER,
    name     TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_events_ts ON events(ts);
`)
// Para bases ya existentes (creadas antes de la columna 'name'): agregarla.
try {
  db.exec(`ALTER TABLE events ADD COLUMN name TEXT`)
} catch {
  // la columna ya existe
}
const insertEvent = db.prepare(
  `INSERT INTO events (ts, ip, ua, type, grade, practice, title, correct, name)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
)

// --- Salt para anonimizar la IP ---
// La columna 'ip' NO guarda la IP real, sino un identificador anónimo:
// sha256(salt + ip) truncado. Alcanza para contar visitantes distintos, pero
// no permite recuperar la IP. El salt se genera una vez y se persiste en la
// misma base (sobrevive reinicios), así que se puede usar IP_SALT del entorno
// para fijarlo, o dejar que el servidor cree uno aleatorio.
db.exec(`CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT)`)
function loadSalt() {
  if (process.env.IP_SALT) return process.env.IP_SALT
  const row = db.prepare(`SELECT value FROM meta WHERE key='ip_salt'`).get()
  if (row?.value) return row.value
  const salt = randomBytes(16).toString('hex')
  db.prepare(`INSERT INTO meta (key, value) VALUES ('ip_salt', ?)`).run(salt)
  return salt
}
const IP_SALT = loadSalt()

/** Devuelve un identificador anónimo del visitante (no la IP real). */
function anonId(ip) {
  if (!ip) return ''
  return createHash('sha256').update(IP_SALT + ip).digest('hex').slice(0, 16)
}

// --- Helpers ---
function clientIp(req) {
  // Detrás de Cloudflare Tunnel / nginx, la IP real viene en estos headers.
  const cf = req.headers['cf-connecting-ip']
  if (cf) return String(cf)
  const xff = req.headers['x-forwarded-for']
  if (xff) return String(xff).split(',')[0].trim()
  return req.socket.remoteAddress || ''
}

function send(res, status, data, extraHeaders = {}) {
  const body = data == null ? '' : JSON.stringify(data)
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, X-Logs-Password',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    ...extraHeaders,
  })
  res.end(body)
}

function readBody(req) {
  return new Promise((resolve) => {
    let data = ''
    req.on('data', (c) => {
      data += c
      if (data.length > 1e6) req.destroy() // límite de seguridad
    })
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {})
      } catch {
        resolve({})
      }
    })
    req.on('error', () => resolve({}))
  })
}

const ALLOWED_TYPES = new Set(['open', 'practice_start', 'answer', 'complete'])

function buildSummary() {
  const opens = db.prepare(`SELECT COUNT(*) n FROM events WHERE type='open'`).get().n
  const answers = db.prepare(`SELECT COUNT(*) n FROM events WHERE type='answer'`).get().n
  const correct = db
    .prepare(`SELECT COUNT(*) n FROM events WHERE type='answer' AND correct=1`)
    .get().n
  const completes = db.prepare(`SELECT COUNT(*) n FROM events WHERE type='complete'`).get().n
  const uniqueIps = db.prepare(`SELECT COUNT(DISTINCT ip) n FROM events`).get().n
  const last = db.prepare(`SELECT MAX(ts) t FROM events`).get().t || 0

  const byIp = db
    .prepare(
      `SELECT ip,
              COUNT(*) events,
              SUM(CASE WHEN type='open' THEN 1 ELSE 0 END) opens,
              SUM(CASE WHEN type='answer' THEN 1 ELSE 0 END) answers,
              SUM(CASE WHEN type='answer' AND correct=1 THEN 1 ELSE 0 END) correct,
              MAX(ts) last,
              (SELECT e2.name FROM events e2
                 WHERE e2.ip = events.ip AND e2.name IS NOT NULL
                 ORDER BY e2.ts DESC LIMIT 1) name
       FROM events GROUP BY ip ORDER BY last DESC LIMIT 200`,
    )
    .all()

  const byPractice = db
    .prepare(
      `SELECT COALESCE(title, practice) title, grade,
              SUM(CASE WHEN type='practice_start' THEN 1 ELSE 0 END) starts,
              SUM(CASE WHEN type='answer' THEN 1 ELSE 0 END) answers,
              SUM(CASE WHEN type='answer' AND correct=1 THEN 1 ELSE 0 END) correct
       FROM events WHERE practice IS NOT NULL
       GROUP BY practice, grade ORDER BY answers DESC LIMIT 200`,
    )
    .all()

  return {
    opens,
    answers,
    correct,
    completes,
    uniqueIps,
    last,
    pct: answers ? Math.round((correct / answers) * 100) : 0,
    byIp,
    byPractice,
  }
}

// --- Servidor ---
const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost')
  const path = url.pathname

  if (req.method === 'OPTIONS') return send(res, 204, null)
  if (path === '/api/health') return send(res, 200, { ok: true })

  if (path === '/api/event' && req.method === 'POST') {
    const body = await readBody(req)
    const type = String(body.type || '')
    if (!ALLOWED_TYPES.has(type)) return send(res, 400, { error: 'bad type' })
    insertEvent.run(
      Date.now(),
      anonId(clientIp(req)),
      String(req.headers['user-agent'] || '').slice(0, 300),
      type,
      body.grade ? String(body.grade).slice(0, 40) : null,
      body.practice ? String(body.practice).slice(0, 80) : null,
      body.title ? String(body.title).slice(0, 120) : null,
      body.correct === true ? 1 : body.correct === false ? 0 : null,
      body.name ? String(body.name).slice(0, 40) : null,
    )
    return send(res, 204, null)
  }

  if (path === '/api/logs' && req.method === 'GET') {
    const pw = req.headers['x-logs-password'] || url.searchParams.get('password')
    if (pw !== LOGS_PASSWORD) return send(res, 401, { error: 'unauthorized' })
    const recent = db
      .prepare(`SELECT ts, ip, type, grade, title, practice, correct, name
                FROM events ORDER BY ts DESC LIMIT 200`)
      .all()
    return send(res, 200, { summary: buildSummary(), recent })
  }

  return send(res, 404, { error: 'not found' })
})

server.listen(PORT, () => {
  console.log(`[backend] escuchando en :${PORT}, db=${DB_PATH}`)
})
