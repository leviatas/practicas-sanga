import { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
  pointerWithin,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core'
import type { Question } from '../types'

// Ejercicio de clasificar: el alumno arrastra cada palabra a su categoría y
// toca "Validar". Funciona con mouse y con touch (móvil).
//
// Con `checkOnDrop` la corrección es ficha por ficha: la que va bien queda
// pegada en su caja (en verde) y la que va mal vuelve sola al banco, marcada
// un instante en rojo. No hay botón "Validar": termina cuando están todas.

function Chip({
  text,
  state,
  disabled,
}: {
  text: string
  state?: '' | 'is-correct' | 'is-wrong'
  disabled?: boolean
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `item:${text}`,
    disabled,
  })
  return (
    <button
      ref={setNodeRef}
      type="button"
      className={`drag-chip ${state ?? ''}${isDragging ? ' is-dragging' : ''}`}
      {...listeners}
      {...attributes}
    >
      {text}
    </button>
  )
}

function Zone({
  id,
  title,
  children,
  disabled,
}: {
  id: string
  title?: string
  children: React.ReactNode
  disabled: boolean
}) {
  const { setNodeRef, isOver } = useDroppable({ id, disabled })
  return (
    <div className={`classify-bin ${isOver ? 'is-over' : ''}`} ref={setNodeRef}>
      {title && <span className="classify-bin__title">{title}</span>}
      <div className="classify-bin__items">{children}</div>
    </div>
  )
}

export default function ClassifyDrag({
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
  const categories = question.categories ?? []
  const items = question.items ?? []
  const checkOnDrop = !!question.checkOnDrop

  // A qué categoría fue asignada cada palabra (o null = todavía en el banco).
  const [assign, setAssign] = useState<Record<string, string | null>>(() =>
    Object.fromEntries(items.map((it) => [it.text, null])),
  )
  const [active, setActive] = useState<string | null>(null)
  // Ficha que acaba de volver del casillero equivocado (se marca un ratito).
  const [bounced, setBounced] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor),
  )

  const pool = items.filter((it) => assign[it.text] == null)
  const allAssigned = items.every((it) => assign[it.text] != null)

  function idText(id: string, prefix: string) {
    return id.startsWith(prefix) ? id.slice(prefix.length) : null
  }

  function handleDragStart(e: DragStartEvent) {
    setActive(idText(String(e.active.id), 'item:'))
  }

  function handleDragEnd(e: DragEndEvent) {
    setActive(null)
    if (locked) return
    const text = idText(String(e.active.id), 'item:')
    if (!text) return
    const overId = e.over ? String(e.over.id) : null
    const cat = overId?.startsWith('cat:') ? overId.slice(4) : null

    if (checkOnDrop) {
      if (!cat) return
      const item = items.find((i) => i.text === text)
      if (!item) return
      if (item.category !== cat) {
        // Caja equivocada: la ficha vuelve al banco y se marca un instante.
        setBounced(text)
        window.setTimeout(() => setBounced((b) => (b === text ? null : b)), 900)
        return
      }
      const next = { ...assign, [text]: cat }
      setAssign(next)
      setBounced(null)
      // ¿Ya están todas en su lugar? Entonces el ejercicio está resuelto.
      if (items.every((it) => next[it.text] === it.category)) onValidate(true)
      return
    }

    setAssign((prev) => {
      const next = { ...prev }
      if (cat) next[text] = cat
      else if (overId === 'pool') next[text] = null
      return next
    })
  }

  function stateFor(text: string): '' | 'is-correct' | 'is-wrong' {
    // Con `checkOnDrop` lo que está en una caja ya está bien puesto.
    if (checkOnDrop) return assign[text] != null ? 'is-correct' : ''
    if (!locked) return ''
    const it = items.find((i) => i.text === text)!
    return assign[text] === it.category ? 'is-correct' : 'is-wrong'
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="classify-bins" data-count={categories.length}>
        {categories.map((cat) => (
          <Zone key={cat} id={`cat:${cat}`} title={cat} disabled={locked}>
            {items
              .filter((it) => assign[it.text] === cat)
              .map((it) => (
                <Chip
                  key={it.text}
                  text={it.text}
                  state={stateFor(it.text)}
                  disabled={locked || checkOnDrop}
                />
              ))}
          </Zone>
        ))}
      </div>

      {!locked && (
        <>
          <Zone id="pool" disabled={locked}>
            {pool.length === 0 ? (
              <span className="drag-bank__empty">
                Arrastrá cada palabra a su columna ⬚
              </span>
            ) : (
              pool.map((it) => (
                <Chip
                  key={it.text}
                  text={it.text}
                  state={bounced === it.text ? 'is-wrong' : ''}
                />
              ))
            )}
          </Zone>
          {!checkOnDrop && (
            <div className="quiz-actions">
              <button
                type="button"
                className="btn btn--primary"
                disabled={!allAssigned}
                onClick={() =>
                  onValidate(items.every((it) => assign[it.text] === it.category))
                }
              >
                Validar ✅
              </button>
            </div>
          )}
        </>
      )}

      <DragOverlay>
        {active ? <span className="drag-chip is-overlay">{active}</span> : null}
      </DragOverlay>

      {locked && (
        <p className="drag-hint">
          {correct
            ? '¡Correcto! Quedó dominada 🎉'
            : 'Revisá las que quedaron en rojo 🙊'}
        </p>
      )}
    </DndContext>
  )
}
