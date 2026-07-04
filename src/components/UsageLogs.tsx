import { useEffect, useState } from 'react'
import { fetchLogs, type LogsResponse } from '../lib/usage'

// Panel de logs de uso (oculto). Se abre desde el footer con contraseña.
// Los datos vienen del backend (incluye la IP de cada visitante).

function fmt(t: number) {
  return t ? new Date(t).toLocaleString('es-AR') : '—'
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
              <div className="logs-tile"><strong>{s.uniqueIps}</strong><span>IPs (PCs)</span></div>
              <div className="logs-tile"><strong>{s.opens}</strong><span>Aperturas</span></div>
              <div className="logs-tile"><strong>{s.answers}</strong><span>Respuestas</span></div>
              <div className="logs-tile"><strong>{s.pct}%</strong><span>Correctas</span></div>
            </div>
            <p className="logs-last">Última actividad: {fmt(s.last)}</p>

            <h3>Por IP (PC)</h3>
            <div className="logs-tablewrap">
              <table className="logs-table">
                <thead>
                  <tr><th>IP</th><th>Aperturas</th><th>Resp.</th><th>OK</th><th>Última</th></tr>
                </thead>
                <tbody>
                  {s.byIp.length === 0 ? (
                    <tr><td colSpan={5}>Sin datos todavía.</td></tr>
                  ) : (
                    s.byIp.map((r) => (
                      <tr key={r.ip}>
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
                  <tr><th>Fecha</th><th>IP</th><th>Evento</th><th>Práctica</th><th>OK</th></tr>
                </thead>
                <tbody>
                  {data!.recent.map((e, i) => (
                    <tr key={i}>
                      <td>{fmt(e.ts)}</td>
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
