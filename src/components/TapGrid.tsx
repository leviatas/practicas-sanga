import { useState } from 'react'
import type { Question } from '../types'

// Actividad para los más chiquitos (jardín): "tocá el dibujo correcto".
// - Muestra opciones grandes con emoji (o número/texto).
// - Si toca la incorrecta: la ficha se sacude y puede volver a intentar
//   (sin penalización).
// - Si acierta: la ficha festeja, aparecen estrellitas y se avisa al padre
//   (que marca la pregunta como dominada y avanza solo).

export default function TapGrid({
  question,
  locked,
  onCorrect,
}: {
  question: Question
  locked: boolean
  onCorrect: () => void
}) {
  const options = question.options ?? []
  const [wrongIdx, setWrongIdx] = useState<number | null>(null)
  const [rightIdx, setRightIdx] = useState<number | null>(null)

  // Si todas las opciones son números (ej: contar 1..10), grilla compacta.
  const numbersOnly =
    options.length > 0 && options.every((o) => !o.emoji && /^\d+$/.test(o.text))

  function handleTap(index: number) {
    if (locked || rightIdx !== null) return
    const opt = options[index]
    if (opt.correct) {
      setRightIdx(index)
      setWrongIdx(null)
      onCorrect()
    } else {
      // Sacudida breve; se puede reintentar.
      setWrongIdx(index)
      window.setTimeout(() => {
        setWrongIdx((cur) => (cur === index ? null : cur))
      }, 500)
    }
  }

  return (
    <div className={`tap-grid${numbersOnly ? ' tap-grid--numbers' : ''}`} role="list">
      {options.map((option, index) => {
        const isRight = rightIdx === index
        const isWrong = wrongIdx === index
        return (
          <button
            key={index}
            type="button"
            role="listitem"
            className={`tap-card${isRight ? ' is-right' : ''}${
              isWrong ? ' is-wrong' : ''
            }`}
            style={{ animationDelay: `${index * 90}ms` }}
            onClick={() => handleTap(index)}
            disabled={locked && !isRight}
            aria-label={option.text}
          >
            <span className="tap-card__face" aria-hidden="true">
              {option.emoji ?? option.text}
            </span>
            {option.emoji && (
              <span className="tap-card__label">{option.text}</span>
            )}
            {isRight && (
              <span className="tap-card__stars" aria-hidden="true">
                <span>⭐</span>
                <span>✨</span>
                <span>🌟</span>
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
