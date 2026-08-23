import { useEffect, useState } from 'react'
import { fetchLogs, type LogsResponse } from '../lib/usage'

// Panel de logs de uso (oculto). Se abre desde el footer con contraseña.
// Los datos vienen del backend. La columna "Visitante" es un id anónimo
// derivado de la IP (no la IP real); en cambio, la sección "Accesos al panel"
// sí muestra la IP real de quien entró o lo intentó.

function fmt(t: number) {
  return t ? new Date(t).toLocaleString('es-AR') : '—'
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
                <div className="logs-tiles logs-tiles--3">
                  <div className="logs-tile"><strong>{acc.ok}</strong><span>Entraron</span></div>
                  <div className={`logs-tile${acc.failed ? ' logs-tile--warn' : ''}`}>
                    <strong>{acc.failed}</strong><span>Fallidos</span>
                  </div>
                  <div className="logs-tile"><strong>{acc.uniqueIps}</strong><span>IPs distintas</span></div>
                </div>
                {acc.failed > 0 && (
                  <p className="logs-note">
                    Último intento fallido: {fmt(acc.lastFail)}
                  </p>
                )}
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

            <h3>Por visitante</h3>
            <div className="logs-tablewrap">
              <table className="logs-table">
                <thead>
                  <tr><th>Nombre</th><th>Visitante</th><th>Aperturas</th><th>Resp.</th><th>OK</th><th>Última</th></tr>
                </thead>
                <tbody>
                  {s.byIp.length === 0 ? (
                    <tr><td colSpan={6}>Sin datos todavía.</td></tr>
                  ) : (
                    s.byIp.map((r) => (
                      <tr key={r.ip}>
                        <td>{r.name || '—'}</td>
                        <td>{r.ip || '(desconocida)'}</td>
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
                  <tr><th>Fecha</th><th>Nombre</th><th>Visitante</th><th>Evento</th><th>Práctica</th><th>OK</th></tr>
                </thead>
                <tbody>
                  {data!.recent.map((e, i) => (
                    <tr key={i}>
                      <td>{fmt(e.ts)}</td>
                      <td>{e.name || '—'}</td>
                      <td>{e.ip || '—'}</td>
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
