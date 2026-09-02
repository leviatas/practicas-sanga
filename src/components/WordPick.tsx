import { useState } from 'react'
import type { Question } from '../types'

// Ejercicio "tocá la(s) palabra(s)" (kind 'words').
// Se muestra una construcción sustantiva palabra por palabra y el alumno toca
// la que le piden (el núcleo) o las que le piden (los modificadores directos).
// Con "Enviar" se corrige todo junto: quedan en verde las que había que tocar
// y en rojo las que tocó de más.

export default function WordPick({
  question,
  locked,
  onValidate,
}: {
  question: Question
  locked: boolean
  onValidate: (isCorrect: boolean) => void
}) {
  const words = question.words ?? []
  const pick = question.pick ?? []
  // Índices tocados por el alumno.
  const [picked, setPicked] = useState<number[]>([])

  function toggle(index: number) {
    if (locked) return
    setPicked((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    )
  }

  // Está bien si tocó exactamente las palabras pedidas.
  const isRight =
    picked.length === pick.length && picked.every((i) => pick.includes(i))

  function stateFor(index: number): string {
    if (!locked) return picked.includes(index) ? 'is-picked' : ''
    if (pick.includes(index)) return 'is-correct'
    return picked.includes(index) ? 'is-wrong' : ''
  }

  return (
    <div className="wordpick">
      <div className="wordpick__sentence">
        {words.map((word, index) => (
          <button
            key={index}
            type="button"
            className={`word-option ${stateFor(index)}`}
            onClick={() => toggle(index)}
            disabled={locked}
            aria-pressed={picked.includes(index)}
          >
            {word}
          </button>
        ))}
      </div>

      {!locked && (
        <div className="quiz-actions">
          <button
            type="button"
            className="btn btn--primary"
            disabled={picked.length === 0}
            onClick={() => onValidate(isRight)}
          >
            Enviar ✅
          </button>
        </div>
      )}
    </div>
  )
}
