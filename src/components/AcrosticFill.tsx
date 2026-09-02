import { useRef, useState, type KeyboardEvent } from 'react'
import type { Question } from '../types'

// Ejercicio "completá el acróstico" (kind 'acrostic').
// Cada fila muestra una consigna (ej: 'LA PLATA ☞') y una hilera de casilleros,
// uno por letra de la respuesta. La letra del acróstico ya viene escrita y
// resaltada, y las filas se alinean por esa columna: leída de arriba hacia
// abajo forma la palabra vertical.
//
// El alumno ESCRIBE las letras que faltan (un casillero por letra, con salto
// automático al siguiente) y con "Validar" se corrige fila por fila.

// Normaliza una letra para comparar: mayúscula y sin tilde. La «Ñ» se compara
// como «N» para no trabar al que escribe desde un teclado sin esa tecla.
function norm(letter: string): string {
  return letter
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export default function AcrosticFill({
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
  const rows = question.rows ?? []
  // Pista plegada, igual que en las preguntas "para explorar".
  const [hintOpen, setHintOpen] = useState(false)

  // Columna donde cae la letra del acróstico: la fila con la letra más
  // "adentro" manda, y las demás se corren a la derecha para alinearse con ella.
  const maxGiven = rows.reduce((max, r) => Math.max(max, r.given), 0)
  const cols = rows.reduce(
    (max, r) => Math.max(max, maxGiven - r.given + r.answer.length),
    0,
  )

  // Lo escrito en cada casillero. La letra del acróstico ya viene puesta.
  const [typed, setTyped] = useState<string[][]>(() =>
    rows.map((r) =>
      Array.from(r.answer, (letter, i) => (i === r.given ? letter : '')),
    ),
  )

  const inputs = useRef<(HTMLInputElement | null)[][]>(rows.map(() => []))

  // Casilleros que el alumno tiene que completar (todos menos el del acróstico).
  function isEditable(row: number, index: number): boolean {
    return rows[row]!.given !== index
  }

  function focusFrom(row: number, index: number, step: 1 | -1) {
    for (let i = index + step; i >= 0 && i < rows[row]!.answer.length; i += step) {
      if (isEditable(row, i)) {
        inputs.current[row]?.[i]?.focus()
        inputs.current[row]?.[i]?.select()
        return
      }
    }
  }

  function handleChange(row: number, index: number, value: string) {
    if (locked) return
    // Del teclado puede llegar más de un carácter (autocompletado): tomamos el
    // último que tipeó.
    const letter = value.trim().slice(-1).toUpperCase()
    setTyped((prev) =>
      prev.map((r, ri) =>
        ri === row ? r.map((l, li) => (li === index ? letter : l)) : r,
      ),
    )
    if (letter) focusFrom(row, index, 1)
  }

  function handleKeyDown(
    row: number,
    index: number,
    e: KeyboardEvent<HTMLInputElement>,
  ) {
    if (e.key === 'Backspace' && !typed[row]?.[index]) focusFrom(row, index, -1)
    else if (e.key === 'ArrowLeft') focusFrom(row, index, -1)
    else if (e.key === 'ArrowRight') focusFrom(row, index, 1)
  }

  const rowRight = rows.map((r, ri) =>
    Array.from(r.answer).every(
      (letter, li) => norm(typed[ri]?.[li] ?? '') === norm(letter),
    ),
  )
  const allRight = rowRight.every(Boolean)
  const allFilled = typed.every((r) => r.every((letter) => letter !== ''))

  function stateFor(row: number, index: number): string {
    if (!locked) return ''
    const expected = rows[row]!.answer[index] ?? ''
    return norm(typed[row]?.[index] ?? '') === norm(expected)
      ? 'is-correct'
      : 'is-wrong'
  }

  return (
    <div className="acrostic">
      {question.hint && (
        <div className="reveal-hint">
          <button
            type="button"
            className="reveal-hint__btn"
            onClick={() => setHintOpen((v) => !v)}
            aria-expanded={hintOpen}
          >
            💡 {hintOpen ? 'Ocultar la pista' : 'Pista'}
          </button>
          {hintOpen && <p className="reveal-hint__text">{question.hint}</p>}
        </div>
      )}

      <div className="acrostic__scroll">
        <div className="acrostic__grid">
          {rows.map((row, ri) => (
            <div className="acrostic__row" key={ri}>
              <span className="acrostic__clue">{row.clue} ☞</span>
              <div
                className="acrostic__boxes"
                style={{ ['--cols' as string]: cols }}
              >
                {Array.from(row.answer, (letter, li) => {
                  const style =
                    li === 0
                      ? { gridColumnStart: maxGiven - row.given + 1 }
                      : undefined
                  if (!isEditable(ri, li)) {
                    return (
                      <span
                        key={li}
                        className="acrostic__cell acrostic__cell--given"
                        style={style}
                      >
                        {letter}
                      </span>
                    )
                  }
                  return (
                    <input
                      key={li}
                      ref={(el) => {
                        if (!inputs.current[ri]) inputs.current[ri] = []
                        inputs.current[ri]![li] = el
                      }}
                      className={`acrostic__cell acrostic__cell--input ${stateFor(ri, li)}`}
                      style={style}
                      type="text"
                      inputMode="text"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="characters"
                      spellCheck={false}
                      maxLength={1}
                      disabled={locked}
                      value={typed[ri]?.[li] ?? ''}
                      onChange={(e) => handleChange(ri, li, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(ri, li, e)}
                      aria-label={`${row.clue}, letra ${li + 1}`}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {locked && !allRight && (
        <ul className="acrostic__answers" role="list">
          {rows.map((row, ri) =>
            rowRight[ri] ? null : (
              <li key={ri}>
                {row.clue} → <strong>{row.answer}</strong>
              </li>
            ),
          )}
        </ul>
      )}

      {!locked ? (
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
      ) : (
        <p className="drag-hint">
          {correct
            ? '¡Correcto! Quedó dominada 🎉'
            : 'Mirá las letras que quedaron en rojo 🙊'}
        </p>
      )}
    </div>
  )
}
