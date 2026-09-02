import { useEffect, useState } from 'react'
import { fetchLogs, type AccessRecentIp, type LogsAccess, type LogsResponse } from '../lib/usage'

// Panel de logs de uso (oculto). Se abre desde el footer con contraseña.
// Los datos vienen del backend: la columna "IP" es la del visitante, y la
// sección "Accesos al panel" muestra la de quien entró o lo intentó, con la
// lista de las IPs que entraron en los últimos días.

function fmt(t: number) {
  return t ? new Date(t).toLocaleString('es-AR') : '—'
}

/** "hace 3 h", "ayer", "hace 4 días": para leer de un vistazo. */
function ago(t: number) {
  const mins = Math.round((Date.now() - t) / 60000)
  if (mins < 1) return 'recién'
  if (mins < 60) return `hace ${mins} min`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `hace ${hours} h`
  const days = Math.round(hours / 24)
  return days === 1 ? 'ayer' : `hace ${days} días`
}

/**
 * Las IPs que entraron al panel en los últimos días. Las manda el backend en
 * `last7`; si el backend todavía es más viejo que la app, se deducen de los
 * accesos recientes (`recent`) para que la lista no quede vacía.
 */
function recentIps(acc: LogsAccess, days: number): AccessRecentIp[] {
  if (acc.last7) return acc.last7
  const since = Date.now() - days * 24 * 60 * 60 * 1000
  const byIp = new Map<string, AccessRecentIp>()
  for (const r of acc.recent) {
    if (!r.ok || r.ts < since) continue
    const key = r.ip ?? ''
    const found = byIp.get(key)
    if (found) {
      found.entries += r.tries
      found.last = Math.max(found.last, r.ts)
    } else {
      byIp.set(key, { ip: r.ip, entries: r.tries, last: r.ts })
    }
  }
  return [...byIp.values()].sort((a, b) => b.last - a.last)
}

/** Acorta el user-agent para que entre en la tabla ("Chrome · Android"). */
function shortUa(ua: string | null) {
  if (!ua) return '—'
  const browser =
    /Edg\//.test(ua) ? 'Edge'
    : /OPR\//.test(ua) ? 'Opera'
    : /Chrome\//.test(ua) ? 'Chrome'
    : /Firefox\//.test(ua) ? 'Firefox'
    : /Safari\//.test(ua) ? 'Safari'
    : 'Otro'
  const os =
    /Android/.test(ua) ? 'Android'
    : /iPhone|iPad|iOS/.test(ua) ? 'iOS'
    : /Windows/.test(ua) ? 'Windows'
    : /Mac OS X/.test(ua) ? 'Mac'
    : /Linux/.test(ua) ? 'Linux'
    : ''
  return os ? `${browser} · ${os}` : browser
}

export default function UsageLogs({
  password,
  onClose,
}: {
  password: string
  onClose: () => void
}) {
  const [data, setData] = useState<LogsResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    fetchLogs(password)
      .then((d) => alive && setData(d))
      .catch((e) =>
        alive &&
        setError(
          e.message === 'unauthorized'
            ? 'Contraseña incorrecta.'
            : 'No se pudo conectar con el servidor de logs.',
        ),
      )
    return () => {
      alive = false
    }
  }, [password])

  const s = data?.summary
  const acc = data?.access
  const days = acc?.lastDays ?? 7
  const ips = acc ? recentIps(acc, days) : []

  return (
    <div className="logs-overlay" role="dialog" aria-modal="true" aria-label="Logs de uso">
      <div className="logs-panel">
        <div className="logs-header">
          <h2>Logs de uso</h2>
          <button className="btn btn--ghost btn--small" onClick={onClose}>
            ✕ Cerrar
          </button>
        </div>

        {error && <p className="logs-error">{error}</p>}
        {!error && !data && <p className="logs-note">Cargando…</p>}

        {s && (
          <>
            <div className="logs-tiles">
              <div className="logs-tile"><strong>{s.uniqueIps}</strong><span>Visitantes</span></div>
              <div className="logs-tile"><strong>{s.opens}</strong><span>Aperturas</span></div>
              <div className="logs-tile"><strong>{s.answers}</strong><span>Respuestas</span></div>
              <div className="logs-tile"><strong>{s.pct}%</strong><span>Correctas</span></div>
            </div>
            <p className="logs-last">Última actividad: {fmt(s.last)}</p>

            <h3>Accesos al panel 🔐</h3>
            {!acc ? (
              <p className="logs-note">
                El servidor todavía no registra accesos (actualizá el backend).
              </p>
            ) : (
              <>
                <div className="logs-tiles logs-tiles--2">
                  <div className="logs-tile"><strong>{acc.ok}</strong><span>Entraron</span></div>
                  <div className={`logs-tile${acc.failed ? ' logs-tile--warn' : ''}`}>
                    <strong>{acc.failed}</strong><span>Fallidos</span>
                  </div>
                </div>
                {acc.failed > 0 && (
                  <p className="logs-note">
                    Último intento fallido: {fmt(acc.lastFail)}
                  </p>
                )}

                {/* En lugar de "cuántas IPs distintas hubo", las IPs concretas
                    que entraron en la última semana: es lo que sirve para
                    reconocer si alguna no es de casa. */}
                <h3>Últimas IPs que entraron ({days} días)</h3>
                {ips.length === 0 ? (
                  <p className="logs-note">
                    Nadie entró al panel en los últimos {days} días.
                  </p>
                ) : (
                  <ul className="logs-ips" role="list">
                    {ips.map((r, i) => (
                      <li key={i} className="logs-ip">
                        <code className="logs-ip__addr">
                          {r.ip || '(desconocida)'}
                        </code>
                        <span className="logs-ip__when">
                          {ago(r.last)} · {fmt(r.last)}
                        </span>
                        <span className="logs-ip__count">
                          {r.entries} {r.entries === 1 ? 'entrada' : 'entradas'}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                <h3>Últimos intentos</h3>
                <div className="logs-tablewrap">
                  <table className="logs-table">
                    <thead>
                      <tr><th>Fecha</th><th>IP</th><th>Resultado</th><th>Intentos</th><th>Navegador</th></tr>
                    </thead>
                    <tbody>
                      {acc.recent.length === 0 ? (
                        <tr><td colSpan={5}>Sin accesos registrados.</td></tr>
                      ) : (
                        acc.recent.map((r, i) => (
                          <tr key={i} className={r.ok ? '' : 'is-fail'}>
                            <td>{fmt(r.ts)}</td>
                            <td><code>{r.ip || '(desconocida)'}</code></td>
                            <td>{r.ok ? '✅ Entró' : '⛔ Contraseña incorrecta'}</td>
                            <td>{r.tries}</td>
                            <td>{shortUa(r.ua)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <h3>Accesos por IP</h3>
                <div className="logs-tablewrap">
                  <table className="logs-table">
                    <thead>
                      <tr><th>IP</th><th>Intentos</th><th>Entró</th><th>Falló</th><th>Último</th></tr>
                    </thead>
                    <tbody>
                      {acc.byIp.length === 0 ? (
                        <tr><td colSpan={5}>Sin accesos registrados.</td></tr>
                      ) : (
                        acc.byIp.map((r, i) => (
                          <tr key={i} className={r.ok ? '' : 'is-fail'}>
                            <td><code>{r.ip || '(desconocida)'}</code></td>
                            <td>{r.attempts}</td>
                            <td>{r.ok}</td>
                            <td>{r.failed}</td>
                            <td>{fmt(r.last)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            <h3>Por IP</h3>
            <div className="logs-tablewrap">
              <table className="logs-table">
                <thead>
                  <tr><th>Nombre</th><th>IP</th><th>Aperturas</th><th>Resp.</th><th>OK</th><th>Última</th></tr>
                </thead>
                <tbody>
                  {s.byIp.length === 0 ? (
                    <tr><td colSpan={6}>Sin datos todavía.</td></tr>
                  ) : (
                    s.byIp.map((r) => (
                      <tr key={r.ip}>
                        <td>{r.name || '—'}</td>
                        <td><code>{r.ip || '(desconocida)'}</code></td>
                        <td>{r.opens}</td>
                        <td>{r.answers}</td>
                        <td>{r.correct}</td>
                        <td>{fmt(r.last)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <h3>Por práctica</h3>
            <div className="logs-tablewrap">
              <table className="logs-table">
                <thead>
                  <tr><th>Práctica</th><th>Grado</th><th>Inicios</th><th>Resp.</th><th>%</th></tr>
                </thead>
                <tbody>
                  {s.byPractice.length === 0 ? (
                    <tr><td colSpan={5}>Sin datos todavía.</td></tr>
                  ) : (
                    s.byPractice.map((r, i) => (
                      <tr key={i}>
                        <td>{r.title}</td>
                        <td>{r.grade}</td>
                        <td>{r.starts}</td>
                        <td>{r.answers}</td>
                        <td>{r.answers ? Math.round((r.correct / r.answers) * 100) : 0}%</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <h3>Actividad reciente</h3>
            <div className="logs-tablewrap">
              <table className="logs-table">
                <thead>
                  <tr><th>Fecha</th><th>Nombre</th><th>IP</th><th>Evento</th><th>Práctica</th><th>OK</th></tr>
                </thead>
                <tbody>
                  {data!.recent.map((e, i) => (
                    <tr key={i}>
                      <td>{fmt(e.ts)}</td>
                      <td>{e.name || '—'}</td>
                      <td><code>{e.ip || '—'}</code></td>
                      <td>{e.type}</td>
                      <td>{e.title ?? e.practice ?? ''}</td>
                      <td>{e.correct === null ? '' : e.correct ? '✓' : '✗'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
