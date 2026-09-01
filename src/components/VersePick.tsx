import { useState } from 'react'
import type { Question } from '../types'

// Ejercicio "tocá los versos que riman entre sí" (kind 'verses').
// Se muestra una copla cortita, un verso por renglón, y el alumno toca los que
// rimen. Con "Enviar" se corrige todo junto: quedan en verde los que sí
// rimaban y en rojo los que eligió de más.

export default function VersePick({
  question,
  locked,
  onValidate,
}: {
  question: Question
  locked: boolean
  onValidate: (isCorrect: boolean) => void
}) {
  const verses = question.verses ?? []
  const rhyme = question.rhyme ?? []
  // Índices tocados por el alumno.
  const [picked, setPicked] = useState<number[]>([])

  function toggle(index: number) {
    if (locked) return
    setPicked((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    )
  }

  // Está bien si eligió exactamente los versos que riman.
  const isRight =
    picked.length === rhyme.length && picked.every((i) => rhyme.includes(i))

  function stateFor(index: number): string {
    if (!locked) return picked.includes(index) ? 'is-picked' : ''
    if (rhyme.includes(index)) return 'is-correct'
    return picked.includes(index) ? 'is-wrong' : ''
  }

  return (
    <div className="verses">
      <ul className="verses__list" role="list">
        {verses.map((verse, index) => (
          <li key={index}>
            <button
              type="button"
              className={`verse-option ${stateFor(index)}`}
              onClick={() => toggle(index)}
              disabled={locked}
              aria-pressed={picked.includes(index)}
            >
              {verse}
            </button>
          </li>
        ))}
      </ul>

      {!locked && (
        <div className="quiz-actions">
          <button
            type="button"
            className="btn btn--primary"
            disabled={picked.length < 2}
            onClick={() => onValidate(isRight)}
          >
            Enviar ✅
          </button>
        </div>
      )}
    </div>
  )
}
