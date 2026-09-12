import { useLayoutEffect, useRef, useState } from 'react'
import type { Question } from '../types'
import { outdoorImages } from './outdoorImages'
import { pastContinuousImages } from './pastContinuousImages'
import { schoolImages } from './schoolImages'
import { bodyPartsImages } from './bodyPartsImages'
import { familyImages } from './familyImages'

// Todos los mapas de imágenes disponibles para kind 'match' (se busca la clave
// en cada uno, así el ejercicio sirve para cualquier vocabulario con fotos).
const IMAGE_MAPS = [
  outdoorImages,
  pastContinuousImages,
  schoolImages,
  bodyPartsImages,
  familyImages,
]

function imageSrc(key: string): string | undefined {
  for (const map of IMAGE_MAPS) if (map[key]) return map[key]
  return undefined
}

// Baraja un array (Fisher-Yates) devolviendo una copia nueva.
function shuffle<T>(items: readonly T[]): T[] {
  const arr = items.slice()
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

type Point = { x: number; y: number }
type Line = { key: string; from: Point; to: Point; state: 'is-correct' | 'is-wrong' }

// Ejercicio "unir con una línea" (kind 'match'): a la izquierda van las fotos
// y a la derecha las palabras, barajadas. El alumno toca una foto y después su
// palabra (o al revés) para trazar la línea entre las dos. Si el par es
// correcto queda unida en verde; si no, se marca un instante en rojo y vuelve
// a quedar libre (sin penalizar: se puede reintentar las veces que haga
// falta). Pensado para tandas cortas (2 o 3 pares) para que las líneas no se
// crucen ni se amontonen.
export default function MatchLines({
  question,
  locked,
  onValidate,
}: {
  question: Question
  locked: boolean
  onValidate: (isCorrect: boolean) => void
}) {
  const pairs = question.pairs ?? []

  // Orden de las palabras: barajado UNA vez por pregunta (si no, alinearían
  // en el mismo renglón que su foto y no habría nada que unir).
  const [words] = useState(() => shuffle(pairs.map((p) => p.word)))

  // Qué imagen (por índice) ya quedó unida a su palabra correcta.
  const [matched, setMatched] = useState<Set<number>>(new Set())
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  // Intento fallido: se marca un instante en rojo y se suelta solo.
  const [wrong, setWrong] = useState<{ image: number; word: string } | null>(null)
  const doneRef = useRef(false)

  // Refs para dibujar las líneas: el contenedor (referencia de coordenadas) y
  // cada casillero, por índice de imagen o por texto de palabra.
  const boxRef = useRef<HTMLDivElement>(null)
  const imageRefs = useRef<(HTMLButtonElement | null)[]>([])
  const wordRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [lines, setLines] = useState<Line[]>([])

  // Recalcula las líneas trazadas (unidas o en rojo) cada vez que cambia lo
  // unido, y también si el tamaño cambia (--fit escala todo el ejercicio).
  useLayoutEffect(() => {
    function recompute() {
      const box = boxRef.current
      if (!box) return
      const boxRect = box.getBoundingClientRect()
      const anchor = (el: HTMLElement | null | undefined, side: 'right' | 'left'): Point | null => {
        if (!el) return null
        const r = el.getBoundingClientRect()
        return {
          x: (side === 'right' ? r.right : r.left) - boxRect.left,
          y: r.top + r.height / 2 - boxRect.top,
        }
      }
      const next: Line[] = []
      matched.forEach((i) => {
        const from = anchor(imageRefs.current[i], 'right')
        const to = anchor(wordRefs.current[pairs[i].word], 'left')
        if (from && to) next.push({ key: `ok:${i}`, from, to, state: 'is-correct' })
      })
      if (wrong) {
        const from = anchor(imageRefs.current[wrong.image], 'right')
        const to = anchor(wordRefs.current[wrong.word], 'left')
        if (from && to) next.push({ key: 'wrong', from, to, state: 'is-wrong' })
      }
      setLines(next)
    }
    recompute()
    const ro = new ResizeObserver(recompute)
    if (boxRef.current) ro.observe(boxRef.current)
    window.addEventListener('resize', recompute)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', recompute)
    }
  }, [matched, wrong, pairs])

  function attempt(imageIndex: number, word: string) {
    if (locked || matched.has(imageIndex)) return
    if (pairs[imageIndex].word === word) {
      const next = new Set(matched)
      next.add(imageIndex)
      setMatched(next)
      setSelectedImage(null)
      setSelectedWord(null)
      if (next.size === pairs.length && !doneRef.current) {
        doneRef.current = true
        onValidate(true)
      }
    } else {
      setWrong({ image: imageIndex, word })
      setSelectedImage(null)
      setSelectedWord(null)
      window.setTimeout(() => setWrong(null), 600)
    }
  }

  function tapImage(i: number) {
    if (locked || matched.has(i)) return
    if (selectedWord !== null) {
      attempt(i, selectedWord)
    } else {
      setSelectedImage((cur) => (cur === i ? null : i))
    }
  }

  function wordUsed(word: string): boolean {
    return pairs.some((p, i) => p.word === word && matched.has(i))
  }

  function tapWord(word: string) {
    if (locked || wordUsed(word)) return
    if (selectedImage !== null) {
      attempt(selectedImage, word)
    } else {
      setSelectedWord((cur) => (cur === word ? null : word))
    }
  }

  return (
    <div className="match" ref={boxRef}>
      <svg className="match-svg" aria-hidden="true">
        {lines.map((l) => (
          <line key={l.key} x1={l.from.x} y1={l.from.y} x2={l.to.x} y2={l.to.y} className={l.state} />
        ))}
      </svg>

      <div className="match-col match-col--images">
        {pairs.map((pair, i) => {
          const isDone = matched.has(i)
          const isWrong = wrong?.image === i
          const src = imageSrc(pair.image)
          return (
            <button
              key={pair.image}
              ref={(el) => (imageRefs.current[i] = el)}
              type="button"
              className={`match-item match-item--image${selectedImage === i ? ' is-selected' : ''}${
                isDone ? ' is-correct' : ''
              }${isWrong ? ' is-wrong' : ''}`}
              onClick={() => tapImage(i)}
              disabled={locked || isDone}
              aria-pressed={selectedImage === i}
              aria-label={`Foto ${i + 1} para unir con su palabra`}
            >
              {src && <img src={src} alt="" />}
            </button>
          )
        })}
      </div>

      <div className="match-col match-col--words">
        {words.map((word) => {
          const isDone = wordUsed(word)
          const isWrong = wrong?.word === word
          return (
            <button
              key={word}
              ref={(el) => (wordRefs.current[word] = el)}
              type="button"
              className={`match-item match-item--word${selectedWord === word ? ' is-selected' : ''}${
                isDone ? ' is-correct' : ''
              }${isWrong ? ' is-wrong' : ''}`}
              onClick={() => tapWord(word)}
              disabled={locked || isDone}
              aria-pressed={selectedWord === word}
            >
              {word}
            </button>
          )
        })}
      </div>
    </div>
  )
}
