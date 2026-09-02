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

// Ejercicio "analizá la construcción sustantiva" (kind 'analyze').
// Arriba se muestra la oración con un casillero vacío DEBAJO de cada palabra y
// abajo un banco de cartelitos (MD, NÚCLEO, ...) para arrastrar al casillero
// que corresponda. Con "Validar" se corrige todo junto.
//
// Los cartelitos se repiten (hay varios MD), así que cada uno tiene identidad
// propia por su ÍNDICE en el banco y la corrección compara el TEXTO: un MD es
// correcto en cualquiera de los casilleros que llevan MD.
//
// Con `bigNumbers` el mismo mecanismo sirve para "NUMBERS" (1er grado): arriba
// de cada casillero va un número gigante de colores y los cartelitos son ONE,
// TWO, THREE...

// Baraja un array devolviendo una copia nueva (Fisher-Yates).
function shuffle<T>(items: readonly T[]): T[] {
  const arr = items.slice()
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function Tag({
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
      className={`drag-chip word-tag${isDragging ? ' is-dragging' : ''}`}
      {...listeners}
      {...attributes}
    >
      {text}
    </button>
  )
}

function WordSlot({
  index,
  word,
  tagId,
  tagText,
  state,
  disabled,
  big,
}: {
  index: number
  word: string
  tagId: number | null
  tagText: string | null
  state: '' | 'is-correct' | 'is-wrong'
  disabled: boolean
  big?: boolean
}) {
  const { setNodeRef, isOver } = useDroppable({ id: `slot:${index}`, disabled })
  return (
    <div className="word-slot">
      <span
        className={`word-slot__word${big ? ' word-slot__word--number' : ''}`}
        data-num={big ? word : undefined}
      >
        {word}
      </span>
      <span
        ref={setNodeRef}
        className={`word-box ${state} ${isOver ? 'is-over' : ''}`}
      >
        {tagId !== null && tagText !== null ? (
          <Tag id={`tag:${tagId}`} text={tagText} disabled={disabled} />
        ) : (
          <span className="word-box__ph">⬚</span>
        )}
      </span>
    </div>
  )
}

export default function WordLabel({
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
  const words = question.words ?? []
  const labels = question.labels ?? []
  // 'bigNumbers': arriba de cada casillero va un número gigante de colores
  // (ejercicio "NUMBERS" de 1er grado) en vez de una palabra de la oración.
  const big = question.bigNumbers === true

  // Un cartelito por palabra, barajados una sola vez al montar el ejercicio.
  const [tags] = useState(() =>
    shuffle(labels).map((text, id) => ({ id, text })),
  )

  // Índice del cartelito puesto en cada casillero (o null si está vacío).
  const [assign, setAssign] = useState<(number | null)[]>(() =>
    words.map(() => null),
  )
  const [activeId, setActiveId] = useState<number | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor),
  )

  const placedIds = assign.filter((v): v is number => v !== null)
  const bankTags = tags.filter((t) => !placedIds.includes(t.id))
  const allFilled = assign.every((v) => v !== null)

  function tagIdFromDndId(id: string): number | null {
    if (!id.startsWith('tag:')) return null
    const n = Number(id.slice(4))
    return Number.isNaN(n) ? null : n
  }

  function textOf(tagId: number | null): string | null {
    return tagId === null ? null : (tags[tagId]?.text ?? null)
  }

  function handleDragStart(e: DragStartEvent) {
    setActiveId(tagIdFromDndId(String(e.active.id)))
  }

  function handleDragEnd(e: DragEndEvent) {
    setActiveId(null)
    if (locked) return
    const tagId = tagIdFromDndId(String(e.active.id))
    if (tagId === null) return
    const overId = e.over ? String(e.over.id) : null

    setAssign((prev) => {
      const next = prev.map((v) => (v === tagId ? null : v)) // sacarlo de donde estaba
      if (overId && overId.startsWith('slot:')) {
        const idx = Number(overId.slice(5))
        next[idx] = tagId // (si estaba ocupado, el anterior vuelve al banco)
      }
      return next
    })
  }

  // Cada casillero está bien si su cartelito dice lo que corresponde a esa
  // palabra (los MD son intercambiables entre sí porque se compara el texto).
  const right = assign.map((id, i) => {
    const text = textOf(id)
    return text !== null && text === labels[i]
  })
  const allRight = right.every(Boolean)

  function stateFor(i: number): '' | 'is-correct' | 'is-wrong' {
    if (!locked) return ''
    return right[i] ? 'is-correct' : 'is-wrong'
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className={`word-analysis${big ? ' word-analysis--numbers' : ''}`}>
        {words.map((word, i) => (
          <WordSlot
            key={i}
            index={i}
            word={word}
            tagId={assign[i]}
            tagText={textOf(assign[i])}
            state={stateFor(i)}
            disabled={locked}
            big={big}
          />
        ))}
      </div>

      {!locked && (
        <>
          <div className="drag-bank" aria-label="Cartelitos para arrastrar">
            {bankTags.length === 0 ? (
              <span className="drag-bank__empty">
                Arrastrá los cartelitos a los casilleros ⬚
              </span>
            ) : (
              bankTags.map((t) => (
                <Tag key={t.id} id={`tag:${t.id}`} text={t.text} />
              ))
            )}
          </div>
          <div className="quiz-actions">
            <button
              type="button"
              className="btn btn--primary"
              disabled={!allFilled}
              onClick={() => onValidate(allRight)}
            >
              Validar ✅
            </button>
          </div>
        </>
      )}

      <DragOverlay>
        {activeId !== null ? (
          <span className="drag-chip word-tag is-overlay">{textOf(activeId)}</span>
        ) : null}
      </DragOverlay>

      {locked && (
        <p className="drag-hint">
          {correct
            ? '¡Correcto! Quedó dominada 🎉'
            : 'Revisá los que quedaron en rojo 🙊'}
        </p>
      )}
    </DndContext>
  )
}
