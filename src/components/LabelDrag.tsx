import { useEffect, useState } from 'react'
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
import type { Hotspot, Question } from '../types'
import { bodyPartsImages } from './bodyPartsImages'

// Ejercicio de señalar partes de un dibujo: cada flecha sale de un casillero
// vacío (en la columna de la izquierda o la de la derecha) y apunta a una
// parte del cuerpo. El alumno arrastra la palabra hasta el casillero —o toca
// la palabra y después el casillero, más cómodo en celular— y valida.

// ---- Geometría del escenario (todo en % del ancho/alto del escenario) ----
// El dibujo va centrado y a los costados quedan las dos columnas de
// casilleros. Las flechas nacen justo al borde del dibujo.
//
// En pantallas angostas el dibujo se lleva más ancho (y las columnas menos),
// así no queda diminuto en un celular. Como el escenario tiene alto fijo por
// relación de aspecto, cada reparto tiene su propio `vh` (= alto del viewBox),
// que sale de la proporción de `fullbody.jpg` (944×1127 → alto = ancho × 1.194).
const LAYOUTS = {
  wide: {
    imgLeft: 23,
    imgW: 54,
    col: { left: 11.5, right: 88.5 },
    tail: { left: 21, right: 79 },
    colW: 21,
    vh: 645,
  },
  narrow: {
    imgLeft: 19,
    imgW: 62,
    col: { left: 9.5, right: 90.5 },
    tail: { left: 17.5, right: 82.5 },
    colW: 18,
    vh: 740,
  },
} as const

type Layout = (typeof LAYOUTS)['wide'] | (typeof LAYOUTS)['narrow']

// Ancho del viewBox del SVG de las flechas. Su relación de aspecto es la misma
// que la del escenario, así las puntas de flecha no salen deformadas.
const VW = 1000
const NARROW = '(max-width: 620px)'

/** Reparto según el ancho de la pantalla (se recalcula al rotar el celular). */
function useLayout(): Layout {
  const [narrow, setNarrow] = useState(
    () => window.matchMedia?.(NARROW).matches ?? false,
  )
  useEffect(() => {
    const mq = window.matchMedia?.(NARROW)
    if (!mq) return
    const onChange = () => setNarrow(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return narrow ? LAYOUTS.narrow : LAYOUTS.wide
}

/** Punto señalado (en % de la imagen) → coordenadas del SVG. */
function tip(spot: Hotspot, L: Layout) {
  return {
    x: ((L.imgLeft + (spot.x / 100) * L.imgW) / 100) * VW,
    y: (spot.y / 100) * L.vh,
  }
}

/** Nacimiento de la flecha: el borde del casillero que mira al dibujo. */
function tail(spot: Hotspot, L: Layout) {
  return { x: (L.tail[spot.side] / 100) * VW, y: (spot.at / 100) * L.vh }
}

/** Palabra del banco: se arrastra o se toca para elegirla. */
function Word({
  text,
  picked,
  onPick,
}: {
  text: string
  picked: boolean
  onPick: () => void
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `word:${text}`,
  })
  return (
    <button
      ref={setNodeRef}
      type="button"
      className={`drag-chip label-word${isDragging ? ' is-dragging' : ''}${
        picked ? ' is-picked' : ''
      }`}
      onClick={onPick}
      {...listeners}
      {...attributes}
    >
      {text}
    </button>
  )
}

function Slot({
  spot,
  layout,
  word,
  state,
  locked,
  onTap,
}: {
  spot: Hotspot
  layout: Layout
  word: string | null
  state: '' | 'is-correct' | 'is-wrong'
  locked: boolean
  onTap: () => void
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `slot:${spot.label}`,
    disabled: locked,
  })
  // La palabra ya puesta también se puede arrastrar a otro casillero o de
  // vuelta al banco (o sacarla con un toque, ver `onTap`).
  const drag = useDraggable({
    id: word ? `word:${word}` : `empty:${spot.label}`,
    disabled: !word || locked,
  })
  return (
    <div
      ref={setNodeRef}
      className={`label-slot ${state} ${isOver ? 'is-over' : ''}`}
      // Ojo: nada de `transform` acá. dnd-kit mide las zonas de drop ignorando
      // el transform del elemento, así que centrar con translate(-50%, -50%)
      // dejaba el área que recibe la ficha corrida media caja. Por eso el
      // centrado se hace restando la mitad del ancho/alto en el propio `left`
      // y `top` (el alto viene de --label-slot-h, fijo en el CSS).
      style={{
        left: `${layout.col[spot.side] - layout.colW / 2}%`,
        top: `calc(${spot.at}% - var(--label-slot-h) / 2)`,
        width: `${layout.colW}%`,
      }}
    >
      <button
        ref={drag.setNodeRef}
        type="button"
        className={`label-slot__btn${drag.isDragging ? ' is-dragging' : ''}`}
        onClick={onTap}
        disabled={locked}
        {...drag.listeners}
        {...drag.attributes}
      >
        {word ?? <span className="label-slot__ph">⬚</span>}
      </button>
    </div>
  )
}

export default function LabelDrag({
  question,
  locked,
  correct,
  onValidate,
  onRetry,
}: {
  question: Question
  locked: boolean
  correct: boolean
  onValidate: (isCorrect: boolean) => void
  /** Vuelve al modo "editable" tras validar (para corregir o empezar de nuevo). */
  onRetry?: () => void
}) {
  const L = useLayout()
  const spots = question.hotspots ?? []
  const bank = question.bank ?? spots.map((s) => s.label)
  const src = bodyPartsImages[question.labelImage ?? '']

  // Qué palabra quedó en cada casillero (la clave es el label correcto).
  const [assign, setAssign] = useState<Record<string, string | null>>(() =>
    Object.fromEntries(spots.map((s) => [s.label, null])),
  )
  const [active, setActive] = useState<string | null>(null)
  // Palabra elegida con un toque (alternativa al arrastre, para celular).
  const [picked, setPicked] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor),
  )

  const placed = new Set(Object.values(assign).filter(Boolean) as string[])
  const pool = bank.filter((w) => !placed.has(w))
  const allPlaced = spots.every((s) => assign[s.label] != null)

  /** Pone la palabra en el casillero (sacándola de donde estuviera). */
  function place(word: string, slotKey: string) {
    setAssign((prev) => {
      const next = { ...prev }
      for (const k of Object.keys(next)) if (next[k] === word) next[k] = null
      next[slotKey] = word
      return next
    })
    setPicked(null)
  }

  /** Devuelve al banco la palabra que estuviera en ese casillero. */
  function clearSlot(slotKey: string) {
    setAssign((prev) => ({ ...prev, [slotKey]: null }))
  }

  function idText(id: string, prefix: string) {
    return id.startsWith(prefix) ? id.slice(prefix.length) : null
  }

  function handleDragStart(e: DragStartEvent) {
    setPicked(null)
    setActive(idText(String(e.active.id), 'word:'))
  }

  function handleDragEnd(e: DragEndEvent) {
    setActive(null)
    if (locked) return
    const word = idText(String(e.active.id), 'word:')
    if (!word) return
    const overId = e.over ? String(e.over.id) : null
    if (overId?.startsWith('slot:')) place(word, overId.slice(5))
    else if (overId === 'pool') {
      setAssign((prev) => {
        const next = { ...prev }
        for (const k of Object.keys(next)) if (next[k] === word) next[k] = null
        return next
      })
    }
  }

  // Toque en un casillero: si hay una palabra elegida, la coloca; si no, saca
  // la que ya estuviera puesta y la devuelve al banco.
  function handleSlotTap(slotKey: string) {
    if (locked) return
    if (picked) place(picked, slotKey)
    else if (assign[slotKey]) clearSlot(slotKey)
  }

  function stateFor(slotKey: string): '' | 'is-correct' | 'is-wrong' {
    if (!locked) return ''
    return assign[slotKey] === slotKey ? 'is-correct' : 'is-wrong'
  }

  /** Deja puestas solo las que acertó: las demás vuelven al banco. */
  function fixWrong() {
    setAssign((prev) =>
      Object.fromEntries(
        Object.keys(prev).map((k) => [k, prev[k] === k ? prev[k] : null]),
      ),
    )
    setPicked(null)
    onRetry?.()
  }

  /** Saca todas las palabras del escenario y las devuelve al banco. */
  function clearAll() {
    setAssign((prev) => Object.fromEntries(Object.keys(prev).map((k) => [k, null])))
    setPicked(null)
    onRetry?.()
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        className="label-stage"
        // --label-ratio = alto/ancho del escenario: de ahí salen su relación de
        // aspecto y el tope de ancho cuando manda el alto de la pantalla.
        style={{ ['--label-ratio' as string]: L.vh / VW }}
      >
        {src && (
          <img
            className="label-stage__img"
            style={{ left: `${L.imgLeft}%`, width: `${L.imgW}%` }}
            src={src}
            alt="Dibujo de una nena para señalar las partes del cuerpo"
          />
        )}

        <svg
          className="label-arrows"
          viewBox={`0 0 ${VW} ${L.vh}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            {/* Una punta de flecha por color: al validar, cada flecha se pinta
                de verde o de rojo según cómo quedó su casillero. */}
            {(['', 'is-correct', 'is-wrong'] as const).map((st) => (
              <marker
                key={st || 'plain'}
                id={`label-arrow-head${st ? `-${st}` : ''}`}
                className={st}
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M0,0 L10,5 L0,10 Z" />
              </marker>
            ))}
          </defs>
          {spots.map((s) => {
            const a = tail(s, L)
            const b = tip(s, L)
            const st = stateFor(s.label)
            return (
              <line
                key={s.label}
                className={st}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                markerEnd={`url(#label-arrow-head${st ? `-${st}` : ''})`}
              />
            )
          })}
        </svg>

        {spots.map((s) => (
          <Slot
            key={s.label}
            spot={s}
            layout={L}
            word={assign[s.label]}
            state={stateFor(s.label)}
            locked={locked}
            onTap={() => handleSlotTap(s.label)}
          />
        ))}
      </div>

      {!locked && (
        <>
          <Pool>
            {pool.length === 0 ? (
              <span className="drag-bank__empty">
                Ya pusiste todas: tocá “Validar” ✅ (para cambiar una, tocá su
                casillero)
              </span>
            ) : (
              pool.map((w) => (
                <Word
                  key={w}
                  text={w}
                  picked={picked === w}
                  onPick={() => setPicked(picked === w ? null : w)}
                />
              ))
            )}
          </Pool>
          <div className="quiz-actions">
            <button
              type="button"
              className="btn btn--primary"
              disabled={!allPlaced}
              onClick={() =>
                onValidate(spots.every((s) => assign[s.label] === s.label))
              }
            >
              Validar ✅
            </button>
          </div>
        </>
      )}

      <DragOverlay>
        {active ? (
          <span className="drag-chip label-word is-overlay">{active}</span>
        ) : null}
      </DragOverlay>

      {locked && (
        <p className="drag-hint">
          {correct
            ? '¡Correcto! Quedó dominada 🎉'
            : 'Mirá las flechas en rojo: ahí iba otra palabra 🙊'}
        </p>
      )}

      {/* Si quedó alguna mal, puede seguir intentando sin pasar de pregunta:
          "Corregir" saca solo las equivocadas y "Reiniciar" saca todas. */}
      {locked && !correct && onRetry && (
        <div className="quiz-actions">
          <button type="button" className="btn btn--ghost" onClick={fixWrong}>
            Corregir ✏️
          </button>
          <button type="button" className="btn btn--ghost" onClick={clearAll}>
            ↺ Reiniciar ejercicio
          </button>
        </div>
      )}

      {locked && question.explanation && (
        <p className="drag-explanation">{question.explanation}</p>
      )}
    </DndContext>
  )
}

/** Banco de palabras (también acepta que le devuelvan una arrastrándola). */
function Pool({ children }: { children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: 'pool' })
  return (
    <div
      ref={setNodeRef}
      className={`drag-bank label-bank ${isOver ? 'is-over' : ''}`}
    >
      {children}
    </div>
  )
}
