import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPractice } from '../data/grades'
import type { Practice, Question } from '../types'
import { loadMastered, saveMastered, resetMastered } from '../lib/progress'
import CityMap from '../components/CityMap'
import DragCloze from '../components/DragCloze'
import NotFoundPage from './NotFoundPage'

// Baraja un array (Fisher-Yates) devolviendo una copia nueva.
function shuffle<T>(items: readonly T[]): T[] {
  const arr = items.slice()
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// Baraja el orden de las preguntas y, dentro de cada una, el de las opciones
// (o el banco de fichas, en los ejercicios de arrastrar).
function withShuffledQuiz(questions: Question[]): Question[] {
  return shuffle(questions).map((q) => ({
    ...q,
    options: q.options ? shuffle(q.options) : q.options,
    bank: q.bank ? shuffle(q.bank) : q.bank,
  }))
}

// Preguntas todavía no dominadas (las que faltan o se respondieron mal).
function pendingQuestions(questions: Question[], mastered: Set<string>): Question[] {
  return questions.filter((q) => !mastered.has(q.id))
}

export default function PracticePage() {
  const { gradeId, practiceId } = useParams()
  const result = getPractice(gradeId ?? '', practiceId ?? '')

  if (!result) return <NotFoundPage />

  const { grade, practice } = result

  return (
    <section style={{ ['--accent' as string]: grade.color }}>
      <nav className="breadcrumb" aria-label="Migas de pan">
        <Link to="/">Inicio</Link>
        <span aria-hidden="true">›</span>
        <Link to={`/grado/${grade.id}`}>{grade.name}</Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">{practice.title}</span>
      </nav>

      {/* key fuerza reiniciar el estado si cambia la práctica */}
      <Quiz key={practice.id} practice={practice} gradeId={grade.id} />
    </section>
  )
}

function Quiz({ practice, gradeId }: { practice: Practice; gradeId: string }) {
  const practiceId = practice.id
  const allQuestions = practice.questions
  const total = allQuestions.length

  // Preguntas ya dominadas (persistidas en el navegador).
  const [mastered, setMastered] = useState(() =>
    loadMastered(gradeId, practiceId),
  )
  // Ronda actual: solo las pendientes, con orden y opciones barajados.
  const [round, setRound] = useState(() =>
    withShuffledQuiz(pendingQuestions(allQuestions, loadMastered(gradeId, practiceId))),
  )
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  // Resultado del ejercicio de arrastrar (kind 'drag') tras validar.
  const [dragCorrect, setDragCorrect] = useState(false)
  // 'playing' = respondiendo; 'roundEnd' = terminó la ronda.
  const [phase, setPhase] = useState<'playing' | 'roundEnd'>('playing')

  const masteredCount = allQuestions.filter((q) => mastered.has(q.id)).length
  const pendingCount = total - masteredCount
  const allDone = pendingCount === 0

  function persist(next: Set<string>) {
    saveMastered(gradeId, practiceId, next)
  }

  function markMastered(id: string) {
    setMastered((prev) => {
      const next = new Set(prev)
      next.add(id)
      persist(next)
      return next
    })
  }

  function handleSelect(index: number) {
    if (answered) return
    setSelected(index)
    setAnswered(true)
    const q = round[current]
    if (q.options?.[index]?.correct) markMastered(q.id)
  }

  // Validación del ejercicio de arrastrar.
  function handleDragValidate(isCorrect: boolean) {
    if (answered) return
    setAnswered(true)
    setDragCorrect(isCorrect)
    if (isCorrect) markMastered(round[current].id)
  }

  function handleNext() {
    if (current + 1 >= round.length) {
      setPhase('roundEnd')
      return
    }
    setCurrent((c) => c + 1)
    setSelected(null)
    setAnswered(false)
    setDragCorrect(false)
  }

  // Empieza otra ronda con lo que todavía falta dominar.
  function startNextRound() {
    setRound(withShuffledQuiz(pendingQuestions(allQuestions, mastered)))
    setCurrent(0)
    setSelected(null)
    setAnswered(false)
    setDragCorrect(false)
    setPhase('playing')
  }

  function handleReset() {
    const ok = window.confirm(
      '¿Reiniciar el progreso de esta práctica? Se borran las preguntas ya dominadas.',
    )
    if (!ok) return
    resetMastered(gradeId, practiceId)
    const cleared = new Set<string>()
    setMastered(cleared)
    setRound(withShuffledQuiz(allQuestions))
    setCurrent(0)
    setSelected(null)
    setAnswered(false)
    setDragCorrect(false)
    setPhase('playing')
  }

  // ---- Pantalla de fin de ronda / completado ----
  if (phase === 'roundEnd' || round.length === 0) {
    if (allDone) {
      return (
        <div className="quiz-result" role="status">
          <span className="quiz-result__emoji" aria-hidden="true">
            🏆
          </span>
          <h1 className="quiz-result__title">¡Completaste toda la práctica!</h1>
          <p className="quiz-result__score">
            Dominaste las <strong>{total}</strong> preguntas. 🎉
          </p>
          <div className="quiz-result__actions">
            <button className="btn btn--primary" onClick={handleReset}>
              🔁 Reiniciar y practicar de nuevo
            </button>
            <Link className="btn btn--ghost" to={`/grado/${gradeId}`}>
              ← Otras prácticas
            </Link>
          </div>
        </div>
      )
    }

    // Terminó la ronda pero quedan preguntas por dominar (las que fallaste).
    return (
      <div className="quiz-result" role="status">
        <span className="quiz-result__emoji" aria-hidden="true">
          💪
        </span>
        <h1 className="quiz-result__title">¡Vas muy bien!</h1>
        <p className="quiz-result__score">
          Dominadas: <strong>{masteredCount}</strong> de <strong>{total}</strong>.
          <br />
          Te {pendingCount === 1 ? 'queda' : 'quedan'}{' '}
          <strong>{pendingCount}</strong> por practicar.
        </p>
        <div className="quiz-result__actions">
          <button className="btn btn--primary" onClick={startNextRound}>
            Seguir con las que faltan →
          </button>
          <button className="btn btn--ghost" onClick={handleReset}>
            ↺ Reiniciar progreso
          </button>
        </div>
      </div>
    )
  }

  // ---- Pantalla de pregunta ----
  const question = round[current]
  const roundProgress = Math.round(
    ((current + (answered ? 1 : 0)) / round.length) * 100,
  )

  return (
    <div className="quiz">
      <div className="quiz-topbar">
        <span className="quiz-mastery">
          Dominadas: {masteredCount}/{total}
        </span>
        <button
          className="btn btn--ghost btn--small quiz-reset"
          onClick={handleReset}
        >
          ↺ Reiniciar
        </button>
      </div>

      <div className="quiz-progress" aria-hidden="true">
        <div className="quiz-progress__bar" style={{ width: `${roundProgress}%` }} />
      </div>
      <p className="quiz-counter">
        Pregunta {current + 1} de {round.length} (pendientes de esta ronda)
      </p>

      <div className="quiz-card">
        {question.map === 'city' && question.kind !== 'drag' && <CityMap />}
        {question.emoji && (
          <div className="quiz-card__emoji" aria-hidden="true">
            {question.emoji}
          </div>
        )}
        <h1 className="quiz-card__prompt">{question.prompt}</h1>

        {question.kind === 'drag' ? (
          <DragCloze
            key={question.id}
            question={question}
            locked={answered}
            correct={dragCorrect}
            onValidate={handleDragValidate}
          />
        ) : (
          <ul className="quiz-options" role="list">
            {(question.options ?? []).map((option, index) => {
              const isSelected = selected === index
              const showState = answered && (isSelected || option.correct)
              let stateClass = ''
              if (answered && option.correct) stateClass = 'is-correct'
              else if (isSelected) stateClass = 'is-wrong'

              return (
                <li key={index}>
                  <button
                    className={`quiz-option ${stateClass}`}
                    onClick={() => handleSelect(index)}
                    disabled={answered}
                    aria-pressed={isSelected}
                  >
                    <span className="quiz-option__text">{option.text}</span>
                    {showState && (
                      <span className="quiz-option__mark" aria-hidden="true">
                        {option.correct ? '✓' : '✗'}
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        )}

        {answered && question.kind !== 'drag' && (
          <div
            className={`quiz-feedback ${
              question.options?.[selected!]?.correct ? 'is-correct' : 'is-wrong'
            }`}
            role="status"
          >
            <p className="quiz-feedback__title">
              {question.options?.[selected!]?.correct
                ? '¡Correcto! Queda dominada 🎉'
                : 'Ups, no era esa. La repasás en la próxima ronda 🙊'}
            </p>
            {question.explanation && (
              <p className="quiz-feedback__explanation">{question.explanation}</p>
            )}
          </div>
        )}

        {answered && (
          <div className="quiz-actions">
            <button className="btn btn--primary" onClick={handleNext}>
              {current + 1 >= round.length ? 'Terminar ronda 🏁' : 'Siguiente →'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
