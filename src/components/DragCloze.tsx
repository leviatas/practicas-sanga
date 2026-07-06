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
//
// Cada ficha se identifica por su ÍNDICE en el banco (no por su texto), así
// pueden existir fichas con el mismo texto (ej: dos letras "e" al armar una
// palabra). La validación compara el TEXTO de la ficha con lo esperado en cada
// hueco, por lo que una letra repetida es correcta en cualquiera de sus
// posiciones válidas.

function Chip({
  id,
  text,
  disabled,
}: {
  id: string
  text: string
  disabled?: boolean
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
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
  chipId,
  chipText,
  state,
  disabled,
}: {
  index: number
  chipId: number | null
  chipText: string | null
  state: '' | 'is-correct' | 'is-wrong'
  disabled: boolean
}) {
  const { setNodeRef, isOver } = useDroppable({ id: `blank:${index}`, disabled })
  return (
    <span
      ref={setNodeRef}
      className={`drag-blank ${state} ${isOver ? 'is-over' : ''}`}
    >
      {chipId !== null && chipText !== null ? (
        <Chip id={`chip:${chipId}`} text={chipText} disabled={disabled} />
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

  // Fichas del banco con identidad propia (índice), aunque el texto se repita.
  const tiles = bank.map((text, id) => ({ id, text }))

  // Ejercicio de "armar la palabra": todos los huecos son de una sola letra.
  // En ese caso queremos las cajas en una única línea (compactas).
  const isLetters = blanks.length > 1 && blanks.every((b) => b.length === 1)

  // Índice de la ficha asignada a cada hueco (o null).
  const [assign, setAssign] = useState<(number | null)[]>(() =>
    blanks.map(() => null),
  )
  const [activeId, setActiveId] = useState<number | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor),
  )

  const placedIds = assign.filter((v): v is number => v !== null)
  const bankTiles = tiles.filter((t) => !placedIds.includes(t.id))
  const allFilled = assign.every((v) => v !== null)

  function tileIdFromDndId(id: string): number | null {
    if (!id.startsWith('chip:')) return null
    const n = Number(id.slice(5))
    return Number.isNaN(n) ? null : n
  }

  function textOf(tileId: number | null): string | null {
    return tileId === null ? null : (tiles[tileId]?.text ?? null)
  }

  function handleDragStart(e: DragStartEvent) {
    setActiveId(tileIdFromDndId(String(e.active.id)))
  }

  function handleDragEnd(e: DragEndEvent) {
    setActiveId(null)
    if (locked) return
    const tileId = tileIdFromDndId(String(e.active.id))
    if (tileId === null) return
    const overId = e.over ? String(e.over.id) : null

    setAssign((prev) => {
      const next = prev.map((v) => (v === tileId ? null : v)) // sacar de su hueco
      if (overId && overId.startsWith('blank:')) {
        const idx = Number(overId.slice(6))
        next[idx] = tileId // (si estaba ocupado, el anterior vuelve al banco)
      }
      return next
    })
  }

  function isRight(i: number): boolean {
    return assign[i] !== null && textOf(assign[i]) === blanks[i]
  }

  function stateFor(i: number): '' | 'is-correct' | 'is-wrong' {
    if (!locked) return ''
    return isRight(i) ? 'is-correct' : 'is-wrong'
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

      <p className={`drag-paragraph${isLetters ? ' drag-paragraph--letters' : ''}`}>
        {segments.map((seg, i) => (
          <span key={i}>
            {seg}
            {i < blanks.length && (
              <Blank
                index={i}
                chipId={assign[i]}
                chipText={textOf(assign[i])}
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
            {bankTiles.length === 0 ? (
              <span className="drag-bank__empty">
                Arrastrá las fichas a los huecos ⬚
              </span>
            ) : (
              bankTiles.map((t) => (
                <Chip key={t.id} id={`chip:${t.id}`} text={t.text} />
              ))
            )}
          </div>
          <div className="quiz-actions">
            <button
              type="button"
              className="btn btn--primary"
              disabled={!allFilled}
              onClick={() => onValidate(blanks.every((_, i) => isRight(i)))}
            >
              Validar ✅
            </button>
          </div>
        </>
      )}

      <DragOverlay>
        {activeId !== null ? (
          <span className="drag-chip is-overlay">{textOf(activeId)}</span>
        ) : null}
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
