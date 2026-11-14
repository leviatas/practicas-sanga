import { useRef, useState } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
  pointerWithin,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core'
import type { Question } from '../types'

// Ejercicio "armá las oraciones" (kind 'sentence-mix').
// Hay un renglón vacío por cada oración (1, 2, 3...) y, abajo, todas las
// fichas MEZCLADAS: todas sirven. El alumno arrastra cada ficha al renglón que
// quiera y las puede cambiar de orden o de renglón (o devolver al montón)
// hasta estar conforme. También se puede sin arrastrar: tocar una ficha y
// después el renglón (o la ficha delante de la cual va).
// Con "Enviar" se corrige: el renglón que forma una de las oraciones queda en
// verde y fijo; el que no, se marca un instante en rojo y se puede seguir
// acomodando (sin penalizar). Termina cuando están todas.

type Chip = { id: number; text: string }

function shuffle<T>(items: readonly T[]): T[] {
  const arr = items.slice()
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function ChipButton({
  chip,
  selected,
  disabled,
  onTap,
}: {
  chip: Chip
  selected: boolean
  disabled: boolean
  onTap: () => void
}) {
  const drag = useDraggable({ id: `chip:${chip.id}`, disabled })
  const drop = useDroppable({ id: `chip:${chip.id}`, disabled })
  return (
    <button
      ref={(el) => {
        drag.setNodeRef(el)
        drop.setNodeRef(el)
      }}
      type="button"
      className={`sentence-mix__chip${selected ? ' is-selected' : ''}${
        drag.isDragging ? ' is-dragging' : ''
      }${drop.isOver && !drag.isDragging ? ' is-over' : ''}`}
      onClick={(e) => {
        e.stopPropagation()
        if (!disabled) onTap()
      }}
      {...drag.listeners}
      {...drag.attributes}
    >
      {chip.text}
    </button>
  )
}

function Zone({
  id,
  className,
  disabled,
  onTap,
  children,
}: {
  id: string
  className: string
  disabled: boolean
  onTap: () => void
  children: React.ReactNode
}) {
  const { setNodeRef, isOver } = useDroppable({ id, disabled })
  return (
    <div
      ref={setNodeRef}
      className={`${className}${isOver ? ' is-over' : ''}`}
      onClick={() => !disabled && onTap()}
    >
      {children}
    </div>
  )
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
  // Fichas puestas en cada renglón, en orden. Las que no están en ninguno
  // siguen en el montón.
  const [rows, setRows] = useState<number[][]>(() => sentences.map(() => []))
  // Renglones ya corregidos y bien (quedan fijos) y los marcados en rojo.
  const [okRows, setOkRows] = useState<boolean[]>(() => sentences.map(() => false))
  const [wrongRows, setWrongRows] = useState<boolean[]>(() => sentences.map(() => false))
  const [selected, setSelected] = useState<number | null>(null)
  const [dragging, setDragging] = useState<number | null>(null)
  const finishedRef = useRef(false)

  const sensors = useSensors(
    // Con un poquito de recorrido para empezar a arrastrar, un toque sigue
    // siendo un toque (sirve para la versión "tocar y después tocar").
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  )

  const chipById = (id: number) => chips.find((c) => c.id === id)!
  const rowOf = (id: number) => rows.findIndex((r) => r.includes(id))
  const placed = new Set(rows.flat())
  const bank = chips.filter((c) => !placed.has(c.id))
  const isFixed = (id: number) => {
    const r = rowOf(id)
    return r !== -1 && okRows[r]
  }

  /** Mueve la ficha al renglón `row` (o al montón si es null), delante de `before` si se indica. */
  function move(id: number, row: number | null, before?: number) {
    if (locked || isFixed(id)) return
    if (row !== null && okRows[row]) return
    setRows((prev) => {
      const fromRow = prev.findIndex((r) => r.includes(id))
      const fromIdx = fromRow === -1 ? -1 : prev[fromRow].indexOf(id)
      const next = prev.map((r) => r.filter((x) => x !== id))
      if (row === null) return next
      if (before === undefined || before === id) {
        if (before === id) return prev
        next[row].push(id)
        return next
      }
      const targetIdxBefore = prev[row].indexOf(before)
      let at = next[row].indexOf(before)
      // Dentro del mismo renglón, al llevarla hacia adelante va DESPUÉS de la
      // ficha sobre la que se suelta (si no, nunca podría quedar última).
      if (fromRow === row && fromIdx < targetIdxBefore) at += 1
      next[row].splice(at, 0, id)
      return next
    })
    setSelected(null)
  }

  function dropOn(id: number, target: string) {
    if (target === 'bank') return move(id, null)
    if (target.startsWith('row:')) return move(id, Number(target.slice(4)))
    if (target.startsWith('chip:')) {
      const other = Number(target.slice(5))
      const row = rowOf(other)
      return move(id, row === -1 ? null : row, row === -1 ? undefined : other)
    }
  }

  function onDragStart(e: DragStartEvent) {
    setDragging(Number(String(e.active.id).slice(5)))
    setSelected(null)
  }

  function onDragEnd(e: DragEndEvent) {
    const id = Number(String(e.active.id).slice(5))
    setDragging(null)
    if (e.over) dropOn(id, String(e.over.id))
  }

  function tapChip(id: number) {
    if (locked || isFixed(id)) return
    if (selected === null) return setSelected(id)
    if (selected === id) return setSelected(null)
    // Con una ficha ya elegida: va delante de la que se toca, si esa está en
    // un renglón; si está en el montón, pasa a ser ella la elegida.
    if (rowOf(id) === -1) return setSelected(id)
    dropOn(selected, `chip:${id}`)
  }

  function tapZone(target: string) {
    if (selected !== null) dropOn(selected, target)
  }

  function send() {
    const claimed = new Set<number>()
    const ok = rows.map((row, i) => {
      if (okRows[i]) return true
      const built = row.map((id) => chipById(id).text).join(' ')
      const found = sentences.findIndex((s, j) => !claimed.has(j) && s.join(' ') === built)
      if (found === -1) return false
      claimed.add(found)
      return true
    })
    setOkRows(ok)
    setSelected(null)
    if (ok.every(Boolean)) {
      if (!finishedRef.current) {
        finishedRef.current = true
        onValidate(true)
      }
      return
    }
    setWrongRows(ok.map((v) => !v))
    window.setTimeout(() => setWrongRows(sentences.map(() => false)), 1200)
  }

  const allPlaced = bank.length === 0
  const done = okRows.every(Boolean) && sentences.length > 0

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={() => setDragging(null)}
    >
      <div className="sentence-mix">
        <ol className="sentence-mix__rows">
          {rows.map((row, i) => (
            <li key={i} className="sentence-mix__row-item">
              <span className="sentence-mix__num" aria-hidden="true">
                {i + 1}
              </span>
              <Zone
                id={`row:${i}`}
                className={`sentence-mix__row${okRows[i] ? ' is-correct' : ''}${
                  wrongRows[i] ? ' is-wrong' : ''
                }`}
                disabled={locked || okRows[i]}
                onTap={() => tapZone(`row:${i}`)}
              >
                {row.map((id) => (
                  <ChipButton
                    key={id}
                    chip={chipById(id)}
                    selected={selected === id}
                    disabled={locked || okRows[i]}
                    onTap={() => tapChip(id)}
                  />
                ))}
                {row.length > 0 && <span className="sentence-mix__dot">.</span>}
              </Zone>
            </li>
          ))}
        </ol>

        {!done && (
          <>
            <Zone
              id="bank"
              className="sentence-mix__bank"
              disabled={locked}
              onTap={() => tapZone('bank')}
            >
              {bank.length === 0 ? (
                <span className="sentence-mix__hint">
                  Podés cambiar las fichas de lugar. Cuando estés conforme, tocá Enviar.
                </span>
              ) : (
                bank.map((c) => (
                  <ChipButton
                    key={c.id}
                    chip={c}
                    selected={selected === c.id}
                    disabled={locked}
                    onTap={() => tapChip(c.id)}
                  />
                ))
              )}
            </Zone>

            <div className="quiz-actions">
              <button
                type="button"
                className="btn btn--primary"
                disabled={!allPlaced}
                onClick={send}
              >
                Enviar ✅
              </button>
            </div>
          </>
        )}
      </div>

      <DragOverlay>
        {dragging !== null ? (
          <span className="sentence-mix__chip sentence-mix__chip--overlay">
            {chipById(dragging).text}
          </span>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
