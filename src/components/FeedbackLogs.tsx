import type { LogsFeedback } from '../lib/usage'

// Ventana aparte del panel de logs: los ❤️ / 👎 que los chicos les ponen a los
// ejercicios. Se abre con el botón "❤️ 👎 Ejercicios" del panel y usa el mismo
// período (7d / 14d / 1m) que ya está elegido ahí.

function fmt(t: number) {
  return t ? new Date(t).toLocaleString('es-AR') : '—'
}

/** Barrita de proporción para ver de un vistazo cómo viene un ejercicio. */
function VoteCells({ likes, dislikes }: { likes: number; dislikes: number }) {
  return (
    <>
      <td className="fb-likes">❤️ {likes}</td>
      <td className="fb-dislikes">👎🏼 {dislikes}</td>
    </>
  )
}

export default function FeedbackLogs({
  feedback,
  rangeLabel,
  onClose,
}: {
  feedback: LogsFeedback | undefined
  rangeLabel: string
  onClose: () => void
}) {
  return (
    <div
      className="logs-overlay logs-overlay--top"
      role="dialog"
      aria-modal="true"
      aria-label="Me gusta y no me gusta de los ejercicios"
    >
      <div className="logs-panel">
        <div className="logs-header">
          <h2>Ejercicios: ❤️ y 👎🏼</h2>
          <button className="btn btn--ghost btn--small" onClick={onClose}>
            ✕ Cerrar
          </button>
        </div>
        <p className="logs-note">
          Votos de los chicos ({rangeLabel}). Solo pueden votar los que tienen
          el nombre cargado.
        </p>

        {!feedback ? (
          <p className="logs-note">
            El servidor todavía no registra los votos (actualizá el backend).
          </p>
        ) : (
          <>
            <div className="logs-tiles logs-tiles--3">
              <div className="logs-tile"><strong>{feedback.likes}</strong><span>❤️ Me gusta</span></div>
              <div className="logs-tile"><strong>{feedback.dislikes}</strong><span>👎🏼 No me gusta</span></div>
              <div className="logs-tile"><strong>{feedback.voters}</strong><span>Votaron</span></div>
            </div>

            <h3>Por práctica</h3>
            <div className="logs-tablewrap">
              <table className="logs-table">
                <thead>
                  <tr><th>Práctica</th><th>Grado</th><th>❤️</th><th>👎🏼</th><th>Último</th></tr>
                </thead>
                <tbody>
                  {feedback.byPractice.length === 0 ? (
                    <tr><td colSpan={5}>Todavía nadie votó.</td></tr>
                  ) : (
                    feedback.byPractice.map((r, i) => (
                      <tr key={i}>
                        <td>{r.title}</td>
                        <td>{r.grade ?? '—'}</td>
                        <VoteCells likes={r.likes} dislikes={r.dislikes} />
                        <td>{fmt(r.last)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Los más votados abajo primero: sirve para ver cuál ejercicio
                puntual no les gusta y revisarlo. */}
            <h3>Por ejercicio</h3>
            <div className="logs-tablewrap">
              <table className="logs-table">
                <thead>
                  <tr><th>Ejercicio</th><th>Práctica</th><th>❤️</th><th>👎🏼</th><th>Último</th></tr>
                </thead>
                <tbody>
                  {feedback.byQuestion.length === 0 ? (
                    <tr><td colSpan={5}>Todavía nadie votó.</td></tr>
                  ) : (
                    feedback.byQuestion.map((r, i) => (
                      <tr key={i}>
                        <td><code>{r.question}</code></td>
                        <td>{r.title}</td>
                        <VoteCells likes={r.likes} dislikes={r.dislikes} />
                        <td>{fmt(r.last)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <h3>Por chico</h3>
            <div className="logs-tablewrap">
              <table className="logs-table">
                <thead>
                  <tr><th>Nombre</th><th>❤️</th><th>👎🏼</th><th>Último</th></tr>
                </thead>
                <tbody>
                  {feedback.byName.length === 0 ? (
                    <tr><td colSpan={4}>Todavía nadie votó.</td></tr>
                  ) : (
                    feedback.byName.map((r, i) => (
                      <tr key={i}>
                        <td>{r.name}</td>
                        <VoteCells likes={r.likes} dislikes={r.dislikes} />
                        <td>{fmt(r.last)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <h3>Votos recientes</h3>
            <div className="logs-tablewrap">
              <table className="logs-table">
                <thead>
                  <tr><th>Fecha</th><th>Nombre</th><th>Voto</th><th>Práctica</th><th>Ejercicio</th><th>IP</th></tr>
                </thead>
                <tbody>
                  {feedback.recent.length === 0 ? (
                    <tr><td colSpan={6}>Todavía nadie votó.</td></tr>
                  ) : (
                    feedback.recent.map((r, i) => (
                      <tr key={i}>
                        <td>{fmt(r.ts)}</td>
                        <td>{r.name || '—'}</td>
                        <td className={r.vote === 'dislike' ? 'fb-dislikes' : 'fb-likes'}>
                          {r.vote === 'like'
                            ? '❤️ Sí'
                            : r.vote === 'dislike'
                              ? '👎🏼 No'
                              : '—'}
                        </td>
                        <td>{r.title ?? r.practice ?? ''}</td>
                        <td><code>{r.question ?? ''}</code></td>
                        <td><code>{r.ip || '—'}</code></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
