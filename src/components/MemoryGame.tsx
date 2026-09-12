import { useRef, useState } from 'react'
import type { Question } from '../types'
import { memoryImageSrc } from './vocabImages'

// Baraja un array (Fisher-Yates) devolviendo una copia nueva.
function shuffle<T>(items: readonly T[]): T[] {
  const arr = items.slice()
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

type Card = { pairIndex: number; kind: 'image' | 'word'; content: string }

// Memotest (kind 'memory'): todas las fichas empiezan boca abajo y
// mezcladas, una por cada imagen y otra por cada palabra de `pairs`. El
// alumno toca dos fichas; si forman un par (una imagen y su palabra) quedan
// boca arriba para siempre; si no, se dan vuelta solas después de un
// instante, sin penalizar (se puede reintentar las veces que haga falta).
export default function MemoryGame({
  question,
  locked,
  onValidate,
}: {
  question: Question
  locked: boolean
  onValidate: (isCorrect: boolean) => void
}) {
  const pairs = question.pairs ?? []

  // El mazo se arma y se mezcla UNA sola vez por pregunta.
  const [cards] = useState<Card[]>(() =>
    shuffle(
      pairs.flatMap((p, i) => [
        { pairIndex: i, kind: 'image' as const, content: p.image },
        { pairIndex: i, kind: 'word' as const, content: p.word },
      ]),
    ),
  )

  // Pares ya encontrados (quedan boca arriba para siempre).
  const [solved, setSolved] = useState<Set<number>>(new Set())
  // Fichas boca arriba en este intento (0, 1 o 2, por índice en `cards`).
  const [flipped, setFlipped] = useState<number[]>([])
  // Mientras se muestra un par que NO era correcto (ambas boca arriba un
  // instante, en rojo) no se puede tocar nada más.
  const [busy, setBusy] = useState(false)
  const doneRef = useRef(false)

  function isUp(i: number): boolean {
    return solved.has(cards[i].pairIndex) || flipped.includes(i)
  }

  function tap(i: number) {
    if (locked || busy || isUp(i)) return

    if (flipped.length === 0) {
      setFlipped([i])
      return
    }

    // Segunda ficha del intento: se corrige al toque.
    const first = flipped[0]
    const a = cards[first]
    const b = cards[i]
    const isPair = a.pairIndex === b.pairIndex && a.kind !== b.kind

    if (isPair) {
      const next = new Set(solved)
      next.add(a.pairIndex)
      setSolved(next)
      setFlipped([])
      if (next.size === pairs.length && !doneRef.current) {
        doneRef.current = true
        onValidate(true)
      }
    } else {
      setFlipped([first, i])
      setBusy(true)
      window.setTimeout(() => {
        setFlipped([])
        setBusy(false)
      }, 900)
    }
  }

  return (
    <div className="memory-grid" role="list">
      {cards.map((card, i) => {
        const up = isUp(i)
        const isSolved = solved.has(card.pairIndex)
        const isWrong = busy && flipped.includes(i)
        const src = card.kind === 'image' ? memoryImageSrc(card.content) : undefined
        return (
          <button
            key={i}
            type="button"
            role="listitem"
            className={`memory-card${up ? ' is-up' : ''}${isSolved ? ' is-correct' : ''}${
              isWrong ? ' is-wrong' : ''
            }`}
            onClick={() => tap(i)}
            disabled={locked || up}
            aria-label={up ? undefined : 'Ficha boca abajo'}
          >
            <span className="memory-card__inner">
              <span className="memory-card__back" aria-hidden="true">
                ❓
              </span>
              <span className="memory-card__front">
                {card.kind === 'image' ? (
                  src && <img src={src} alt="" />
                ) : (
                  <span className="memory-card__word">{card.content}</span>
                )}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
