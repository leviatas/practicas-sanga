// ============================================================================
// Registro de uso — habla con el backend (Node + SQLite).
// Cada evento queda guardado en el servidor con un identificador anónimo del
// visitante (derivado de la IP, no la IP real). Ver server/src/index.js.
// ============================================================================

// En dev no hay backend (y no queremos ensuciar las estadísticas), así que no
// registramos nada. Si en producción un envío falla (backend caído), dejamos de
// intentar para no llenar la consola con un error en cada evento.
let loggingDisabled = import.meta.env.DEV

export function logEvent(type: string, data: Record<string, unknown> = {}) {
  if (loggingDisabled) return
  try {
    fetch('/api/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, ...data }),
      keepalive: true,
    })
      .then((res) => {
        if (!res.ok) loggingDisabled = true // sin backend: no seguir intentando
      })
      .catch(() => {
        loggingDisabled = true
      })
  } catch {
    loggingDisabled = true
  }
}

export interface LogsByIp {
  ip: string
  events: number
  opens: number
  answers: number
  correct: number
  last: number
  name: string | null
}

export interface LogsByPractice {
  title: string
  grade: string
  starts: number
  answers: number
  correct: number
}

export interface RecentEvent {
  ts: number
  ip: string
  type: string
  grade: string | null
  title: string | null
  practice: string | null
  correct: number | null
  name: string | null
}

/** Un intento de entrar al panel de logs (con la IP real). */
export interface AccessRow {
  ts: number
  ip: string | null
  ua: string | null
  ok: number
  tries: number
}

export interface AccessByIp {
  ip: string | null
  attempts: number
  ok: number
  failed: number
  last: number
}

export interface LogsAccess {
  attempts: number
  ok: number
  failed: number
  uniqueIps: number
  lastFail: number
  byIp: AccessByIp[]
  recent: AccessRow[]
}

export interface LogsResponse {
  summary: {
    opens: number
    answers: number
    correct: number
    completes: number
    uniqueIps: number
    last: number
    pct: number
    byIp: LogsByIp[]
    byPractice: LogsByPractice[]
  }
  recent: RecentEvent[]
  /** Accesos al panel. Puede faltar si el backend es más viejo que la app. */
  access?: LogsAccess
}

/** Trae los logs del backend. Lanza 'unauthorized' si la contraseña es incorrecta. */
export async function fetchLogs(password: string): Promise<LogsResponse> {
  const res = await fetch('/api/logs', {
    headers: { 'X-Logs-Password': password },
  })
  if (res.status === 401) throw new Error('unauthorized')
  if (!res.ok) throw new Error('error')
  return res.json()
}
