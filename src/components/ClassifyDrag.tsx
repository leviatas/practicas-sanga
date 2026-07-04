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

  // A qué categoría fue asignada cada palabra (o null = todavía en el banco).
  const [assign, setAssign] = useState<Record<string, string | null>>(() =>
    Object.fromEntries(items.map((it) => [it.text, null])),
  )
  const [active, setActive] = useState<string | null>(null)

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
    setAssign((prev) => {
      const next = { ...prev }
      if (overId && overId.startsWith('cat:')) next[text] = overId.slice(4)
      else if (overId === 'pool') next[text] = null
      return next
    })
  }

  function stateFor(text: string): '' | 'is-correct' | 'is-wrong' {
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
      <div className="classify-bins">
        {categories.map((cat) => (
          <Zone key={cat} id={`cat:${cat}`} title={cat} disabled={locked}>
            {items
              .filter((it) => assign[it.text] === cat)
              .map((it) => (
                <Chip
                  key={it.text}
                  text={it.text}
                  state={stateFor(it.text)}
                  disabled={locked}
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
              pool.map((it) => <Chip key={it.text} text={it.text} />)
            )}
          </Zone>
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
