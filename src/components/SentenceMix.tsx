import { useRef, useState } from 'react'
import type { Question } from '../types'

// Ejercicio "armá las oraciones" (kind 'sentence-mix').
// Todas las fichas de todas las oraciones van MEZCLADAS en un montón y todas
// sirven. El alumno toca las fichas en orden para armar una oración en el
// renglón y la envía: si es una de las que faltan, queda escrita arriba (en
// verde) y esas fichas se van; si no, el renglón se marca un instante en rojo
// y las fichas vuelven al montón (sin penalizar). Termina al armarlas todas.

type Chip = { id: number; text: string }

function shuffle<T>(items: readonly T[]): T[] {
  const arr = items.slice()
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export default function SentenceMix({
  question,
  locked,
  onValidate,
}: {
  question: Question
  locked: boolean
  onValidate: (isCorrect: boolean) => void
}) {
  const sentences = question.sentences ?? []
  const [chips] = useState<Chip[]>(() =>
    shuffle(sentences.flat().map((text, id) => ({ id, text }))),
  )
  // Fichas puestas en el renglón (en orden) y fichas ya gastadas.
  const [line, setLine] = useState<number[]>([])
  const [used, setUsed] = useState<Set<number>>(new Set())
  // Oraciones ya armadas (índices de `sentences`), en el orden en que salieron.
  const [done, setDone] = useState<number[]>([])
  const [wrong, setWrong] = useState(false)
  const finishedRef = useRef(false)

  const textOf = (id: number) => chips.find((c) => c.id === id)?.text ?? ''

  function add(id: number) {
    if (locked || wrong) return
    setLine((prev) => [...prev, id])
  }

  function remove(id: number) {
    if (locked || wrong) return
    setLine((prev) => prev.filter((x) => x !== id))
  }

  function send() {
    const built = line.map(textOf).join(' ')
    const found = sentences.findIndex(
      (s, i) => !done.includes(i) && s.join(' ') === built,
    )
    if (found === -1) {
      setWrong(true)
      window.setTimeout(() => {
        setWrong(false)
        setLine([])
      }, 800)
      return
    }
    const nextDone = [...done, found]
    setDone(nextDone)
    setUsed((prev) => new Set([...prev, ...line]))
    setLine([])
    if (nextDone.length === sentences.length && !finishedRef.current) {
      finishedRef.current = true
      onValidate(true)
    }
  }

  const finished = done.length === sentences.length

  return (
    <div className="sentence-mix">
      {done.length > 0 && (
        <ul className="sentence-mix__done" role="list">
          {done.map((i) => (
            <li key={i}>✓ {sentences[i].join(' ')}.</li>
          ))}
        </ul>
      )}

      {!finished && (
        <>
          <div className={`sentence-mix__line${wrong ? ' is-wrong' : ''}`} aria-live="polite">
            {line.length === 0 ? (
              <span className="sentence-mix__hint">Tocá las fichas para armar una oración</span>
            ) : (
              line.map((id) => (
                <button
                  key={id}
                  type="button"
                  className="sentence-mix__chip"
                  onClick={() => remove(id)}
                >
                  {textOf(id)}
                </button>
              ))
            )}
          </div>

          <div className="sentence-mix__bank">
            {chips
              .filter((c) => !used.has(c.id) && !line.includes(c.id))
              .map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className="sentence-mix__chip"
                  onClick={() => add(c.id)}
                >
                  {c.text}
                </button>
              ))}
          </div>

          <div className="quiz-actions">
            <button
              type="button"
              className="btn btn--primary"
              disabled={line.length === 0 || wrong}
              onClick={send}
            >
              Enviar ✅
            </button>
          </div>
        </>
      )}
    </div>
  )
}
