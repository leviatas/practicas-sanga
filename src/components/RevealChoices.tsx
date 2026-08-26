import { useRef, useState } from 'react'
import type { Question } from '../types'

// Ejercicio "para explorar" (kind: 'reveal').
//
// La pregunta va de encabezado y abajo las cuatro opciones, SIN mostrar cuál
// es la correcta. Al tocar una se despliega su explicación:
//   · verde  → es la correcta, con el por qué;
//   · gris   → no es, con el por qué no.
// Se puede seguir tocando hasta dar con la correcta, o pedir verla con el
// botón "Ver la respuesta correcta" (así siempre queda el aprendizaje, aunque
// no la haya acertado). Si no la quiere ver, al lado está "Seguir sin ver",
// que pasa a la próxima pregunta (vuelve a aparecer en la siguiente ronda).
// Una vez resuelta se pueden seguir abriendo las demás para leer todas las
// explicaciones.
//
// Si la pregunta trae `hint`, arriba de las opciones aparece un botón "Pista"
// plegado: la ayuda orienta para pensar, sin revelar cuál es la correcta.
//
// Solo cuenta como dominada si acertó en el PRIMER toque (`onValidate(true)`);
// si no, vuelve a aparecer en la próxima ronda.

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

export default function RevealChoices({
  question,
  onValidate,
  onSkip,
  lastOfRound,
}: {
  question: Question
  /** Se llama una sola vez, cuando queda a la vista la opción correcta. */
  onValidate: (firstTryCorrect: boolean) => void
  /** Pasar a la próxima pregunta sin ver la respuesta correcta. */
  onSkip: () => void
  /** Si es la última de la ronda, el botón de saltear lo dice. */
  lastOfRound?: boolean
}) {
  const options = question.options ?? []
  // Índices de las opciones desplegadas.
  const [opened, setOpened] = useState<number[]>([])
  // Pista abierta o no (solo si la pregunta trae `hint`).
  const [hintOpen, setHintOpen] = useState(false)
  // Índice de la primera opción que tocó (para saber si acertó de una).
  const [firstPick, setFirstPick] = useState<number | null>(null)
  const [solved, setSolved] = useState(false)
  const resolvedRef = useRef(false)

  function resolve(firstTryCorrect: boolean) {
    if (resolvedRef.current) return
    resolvedRef.current = true
    setSolved(true)
    onValidate(firstTryCorrect)
  }

  function toggle(index: number) {
    const wasOpen = opened.includes(index)
    setOpened((prev) =>
      wasOpen ? prev.filter((i) => i !== index) : [...prev, index],
    )
    // Cerrar una explicación ya vista no cuenta como intento.
    if (wasOpen) return
    const isFirstPick = firstPick === null
    if (isFirstPick) setFirstPick(index)
    if (options[index].correct) resolve(isFirstPick)
  }

  // Botón de ayuda: abre la correcta aunque no la haya tocado.
  function showCorrect() {
    const index = options.findIndex((o) => o.correct)
    if (index < 0) return
    setOpened((prev) => (prev.includes(index) ? prev : [...prev, index]))
    resolve(false)
  }

  return (
    <div className="reveal">
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

      <ul className="reveal-options" role="list">
        {options.map((option, index) => {
          const isOpen = opened.includes(index)
          const state = !isOpen ? '' : option.correct ? ' is-correct' : ' is-wrong'
          return (
            <li key={index} className={`reveal-option${state}`}>
              <button
                type="button"
                className="reveal-option__head"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
              >
                <span className="reveal-option__letter" aria-hidden="true">
                  {LETTERS[index] ?? '•'}
                </span>
                <span className="reveal-option__text">{option.text}</span>
                <span className="reveal-option__mark" aria-hidden="true">
                  {isOpen ? (option.correct ? '✓' : '✗') : '▾'}
                </span>
              </button>
              {isOpen && option.why && (
                <p className="reveal-option__why">{option.why}</p>
              )}
            </li>
          )
        })}
      </ul>

      {!solved && opened.length > 0 && (
        <div className="reveal-help">
          <button
            type="button"
            className="btn btn--ghost btn--small"
            onClick={showCorrect}
          >
            👀 Ver la respuesta correcta
          </button>
          <button
            type="button"
            className="btn btn--ghost btn--small"
            onClick={onSkip}
            title="Pasar sin ver la respuesta (la vas a volver a ver en la próxima ronda)"
          >
            {lastOfRound ? 'Seguir sin ver 🏁' : 'Seguir sin ver →'}
          </button>
        </div>
      )}
    </div>
  )
}
