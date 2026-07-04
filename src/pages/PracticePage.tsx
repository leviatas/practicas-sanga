import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPractice } from '../data/grades'
import type { Practice, Question } from '../types'
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

// Devuelve las preguntas con las opciones en orden aleatorio.
function withShuffledOptions(questions: Question[]): Question[] {
  return questions.map((q) => ({ ...q, options: shuffle(q.options) }))
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
  // Opciones barajadas al iniciar; se vuelven a barajar en cada intento.
  const [questions, setQuestions] = useState(() =>
    withShuffledOptions(practice.questions),
  )
  const total = questions.length

  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)

  const question = questions[current]
  const progress = useMemo(
    () => Math.round(((current + (answered ? 1 : 0)) / total) * 100),
    [current, answered, total],
  )

  function handleSelect(index: number) {
    if (answered) return
    setSelected(index)
    setAnswered(true)
    if (question.options[index].correct) {
      setCorrectCount((c) => c + 1)
    }
  }

  function handleNext() {
    if (current + 1 >= total) {
      setFinished(true)
      return
    }
    setCurrent((c) => c + 1)
    setSelected(null)
    setAnswered(false)
  }

  function handleRestart() {
    setQuestions(withShuffledOptions(practice.questions))
    setCurrent(0)
    setSelected(null)
    setAnswered(false)
    setCorrectCount(0)
    setFinished(false)
  }

  if (finished) {
    const pct = Math.round((correctCount / total) * 100)
    const emoji = pct === 100 ? '🏆' : pct >= 70 ? '🎉' : pct >= 50 ? '👍' : '💪'
    const message =
      pct === 100
        ? '¡Perfecto! Respondiste todo bien.'
        : pct >= 70
          ? '¡Muy bien! Casi todo correcto.'
          : pct >= 50
            ? '¡Bien! Seguí practicando.'
            : '¡A seguir practicando! Vas a mejorar.'

    return (
      <div className="quiz-result" role="status">
        <span className="quiz-result__emoji" aria-hidden="true">
          {emoji}
        </span>
        <h1 className="quiz-result__title">{message}</h1>
        <p className="quiz-result__score">
          Acertaste <strong>{correctCount}</strong> de <strong>{total}</strong>
        </p>
        <div className="quiz-result__actions">
          <button className="btn btn--primary" onClick={handleRestart}>
            🔁 Volver a intentar
          </button>
          <Link className="btn btn--ghost" to={`/grado/${gradeId}`}>
            ← Otras prácticas
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz">
      <div className="quiz-progress" aria-hidden="true">
        <div className="quiz-progress__bar" style={{ width: `${progress}%` }} />
      </div>
      <p className="quiz-counter">
        Pregunta {current + 1} de {total}
      </p>

      <div className="quiz-card">
        {question.emoji && (
          <div className="quiz-card__emoji" aria-hidden="true">
            {question.emoji}
          </div>
        )}
        <h1 className="quiz-card__prompt">{question.prompt}</h1>

        <ul className="quiz-options" role="list">
          {question.options.map((option, index) => {
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

        {answered && (
          <div
            className={`quiz-feedback ${
              question.options[selected!].correct ? 'is-correct' : 'is-wrong'
            }`}
            role="status"
          >
            <p className="quiz-feedback__title">
              {question.options[selected!].correct
                ? '¡Correcto! 🎉'
                : 'Ups, no era esa 🙊'}
            </p>
            {question.explanation && (
              <p className="quiz-feedback__explanation">{question.explanation}</p>
            )}
          </div>
        )}

        <div className="quiz-actions">
          <button
            className="btn btn--primary"
            onClick={handleNext}
            disabled={!answered}
          >
            {current + 1 >= total ? 'Ver resultado 🏁' : 'Siguiente →'}
          </button>
        </div>
      </div>
    </div>
  )
}
