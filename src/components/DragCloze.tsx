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
import CityMap from './CityMap'
import CityMapBig from './CityMapBig'

// Ejercicio de "arrastrar y soltar": el alumno arrastra las fichas a los huecos
// del párrafo y toca "Validar". Funciona con mouse y con touch (móvil).

function Chip({ text, disabled }: { text: string; disabled?: boolean }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `chip:${text}`,
    disabled,
  })
  return (
    <button
      ref={setNodeRef}
      type="button"
      className={`drag-chip${isDragging ? ' is-dragging' : ''}`}
      {...listeners}
      {...attributes}
    >
      {text}
    </button>
  )
}

function Blank({
  index,
  chip,
  state,
  disabled,
}: {
  index: number
  chip: string | null
  state: '' | 'is-correct' | 'is-wrong'
  disabled: boolean
}) {
  const { setNodeRef, isOver } = useDroppable({ id: `blank:${index}`, disabled })
  return (
    <span
      ref={setNodeRef}
      className={`drag-blank ${state} ${isOver ? 'is-over' : ''}`}
    >
      {chip ? (
        <Chip text={chip} disabled={disabled} />
      ) : (
        <span className="drag-blank__ph">⬚</span>
      )}
    </span>
  )
}

export default function DragCloze({
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
  const segments = question.segments ?? []
  const blanks = question.blanks ?? []
  const bank = question.bank ?? []

  // Ficha asignada a cada hueco (o null).
  const [assign, setAssign] = useState<(string | null)[]>(() =>
    blanks.map(() => null),
  )
  const [activeChip, setActiveChip] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor),
  )

  const placedTexts = assign.filter((t): t is string => t !== null)
  const bankChips = bank.filter((t) => !placedTexts.includes(t))
  const allFilled = assign.every((t) => t !== null)

  function chipTextFromId(id: string) {
    return id.startsWith('chip:') ? id.slice(5) : null
  }

  function handleDragStart(e: DragStartEvent) {
    setActiveChip(chipTextFromId(String(e.active.id)))
  }

  function handleDragEnd(e: DragEndEvent) {
    setActiveChip(null)
    if (locked) return
    const text = chipTextFromId(String(e.active.id))
    if (!text) return
    const overId = e.over ? String(e.over.id) : null

    setAssign((prev) => {
      const next = prev.map((t) => (t === text ? null : t)) // sacar de su hueco
      if (overId && overId.startsWith('blank:')) {
        const idx = Number(overId.slice(6))
        next[idx] = text // (si estaba ocupado, el anterior vuelve al banco)
      }
      return next
    })
  }

  function stateFor(i: number): '' | 'is-correct' | 'is-wrong' {
    if (!locked) return ''
    return assign[i] === blanks[i] ? 'is-correct' : 'is-wrong'
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {question.map === 'city2' && <CityMapBig />}
      {question.map === 'city' && <CityMap />}

      <p className="drag-paragraph">
        {segments.map((seg, i) => (
          <span key={i}>
            {seg}
            {i < blanks.length && (
              <Blank
                index={i}
                chip={assign[i]}
                state={stateFor(i)}
                disabled={locked}
              />
            )}
          </span>
        ))}
      </p>

      {!locked && (
        <>
          <div className="drag-bank" aria-label="Opciones para arrastrar">
            {bankChips.length === 0 ? (
              <span className="drag-bank__empty">
                Arrastrá las fichas a los huecos ⬚
              </span>
            ) : (
              bankChips.map((t) => <Chip key={t} text={t} />)
            )}
          </div>
          <div className="quiz-actions">
            <button
              type="button"
              className="btn btn--primary"
              disabled={!allFilled}
              onClick={() => onValidate(assign.every((t, i) => t === blanks[i]))}
            >
              Validar ✅
            </button>
          </div>
        </>
      )}

      <DragOverlay>
        {activeChip ? (
          <span className="drag-chip is-overlay">{activeChip}</span>
        ) : null}
      </DragOverlay>

      {locked && (
        <p className="drag-hint">
          {correct
            ? '¡Correcto! Quedó dominada 🎉'
            : 'Revisá el mapa: fijate las que quedaron en rojo 🙊'}
        </p>
      )}
    </DndContext>
  )
}
