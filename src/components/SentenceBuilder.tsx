import { useState } from 'react'
import type { Question } from '../types'

// Ejercicio de armar la oración que describe la escena del dibujo.
// Debajo de la imagen hay una columna por cada parte de la oración (There
// is/are, el número, el animal, la preposición y el lugar). El alumno toca una
// opción en cada columna y recién con "Enviar" se corrige todo junto: la que
// correspondía queda en verde y la que eligió de más, en rojo.

export default function SentenceBuilder({
  question,
  locked,
  correct,
  onValidate,
}: {
  question: Question
  locked: boolean
  correct: boolean
  onValidate: (isCorrect: boolean) => void
}) {
  const columns = question.columns ?? []
  // Opción elegida en cada columna (null = todavía sin elegir).
  const [picked, setPicked] = useState<(string | null)[]>(() =>
    columns.map(() => null),
  )

  const allPicked = picked.every((p) => p !== null)
  const rights = columns.filter((c, i) => picked[i] === c.answer).length
  const wrongs = columns.length - rights

  function choose(colIndex: number, option: string) {
    if (locked) return
    setPicked((prev) => {
      const next = prev.slice()
      // Volver a tocar la misma opción la deselecciona.
      next[colIndex] = next[colIndex] === option ? null : option
      return next
    })
  }

  return (
    <div className="sentence">
      <div className="sentence-columns">
        {columns.map((column, colIndex) => (
          <ul className="sentence-column" role="list" key={colIndex}>
            {column.options.map((option) => {
              const isPicked = picked[colIndex] === option
              // Antes de enviar solo se resalta lo elegido. Después, la que
              // correspondía va en verde (la haya elegido o no) y la que eligió
              // de más, en rojo.
              let stateClass = ''
              if (!locked) stateClass = isPicked ? 'is-picked' : ''
              else if (option === column.answer) stateClass = 'is-correct'
              else if (isPicked) stateClass = 'is-wrong'

              return (
                <li key={option}>
                  <button
                    type="button"
                    className={`sentence-option ${stateClass}`}
                    onClick={() => choose(colIndex, option)}
                    disabled={locked}
                    aria-pressed={isPicked}
                  >
                    {option}
                  </button>
                </li>
              )
            })}
          </ul>
        ))}
      </div>

      {locked ? (
        <>
          <p className="sentence-score">
            <span className="sentence-score__right">
              {rights} {rights === 1 ? 'CORRECTA' : 'CORRECTAS'}
            </span>
            {' — '}
            <span className="sentence-score__wrong">
              {wrongs} {wrongs === 1 ? 'INCORRECTA' : 'INCORRECTAS'}
            </span>
          </p>
          {!correct && (
            <p className="sentence-answer">
              La oración era: <strong>{columns.map((c) => c.answer).join(' ')}</strong>.
            </p>
          )}
        </>
      ) : (
        <div className="quiz-actions">
          <button
            type="button"
            className="btn btn--primary"
            disabled={!allPicked}
            onClick={() => onValidate(rights === columns.length)}
          >
            Enviar ✅
          </button>
        </div>
      )}
    </div>
  )
}
