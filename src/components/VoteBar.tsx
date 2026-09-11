import type { Vote } from '../lib/votes'

// Corazón / puño para abajo en cada ejercicio. Va en la barra de arriba del
// quiz (fuera de la tarjeta) para que no le quite lugar a la consigna y esté
// en todos los ejercicios, sea del tipo que sea.
//
// Sin nombre cargado los botones se ven, pero deshabilitados: así el adulto
// entiende que existe la opción y por qué no anda (el voto se guarda con el
// nombre, si no, no sirve para nada).
export default function VoteBar({
  vote,
  hasName,
  onVote,
}: {
  vote: Vote | null
  hasName: boolean
  onVote: (vote: Vote) => void
}) {
  const hint = hasName
    ? undefined
    : 'Para votar, cargá tu nombre en la pantalla del grado'

  return (
    <div
      className="vote-bar"
      role="group"
      aria-label="¿Te gustó este ejercicio?"
      title={hint}
    >
      <button
        type="button"
        className={`vote-btn vote-btn--like${vote === 'like' ? ' is-on' : ''}`}
        onClick={() => onVote('like')}
        disabled={!hasName}
        aria-pressed={vote === 'like'}
        aria-label="Me gustó este ejercicio"
        title={hint ?? 'Me gustó este ejercicio'}
      >
        <span aria-hidden="true">❤️</span>
      </button>
      <button
        type="button"
        className={`vote-btn vote-btn--dislike${vote === 'dislike' ? ' is-on' : ''}`}
        onClick={() => onVote('dislike')}
        disabled={!hasName}
        aria-pressed={vote === 'dislike'}
        aria-label="No me gustó este ejercicio"
        title={hint ?? 'No me gustó este ejercicio'}
      >
        <span aria-hidden="true">👎🏼</span>
      </button>
    </div>
  )
}
