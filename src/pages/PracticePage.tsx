import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPractice } from '../data/grades'
import type { Practice, Question } from '../types'
import { loadMastered, saveMastered, resetMastered } from '../lib/progress'
import { logEvent } from '../lib/usage'
import CityMap from '../components/CityMap'
import DragCloze from '../components/DragCloze'
import ClassifyDrag from '../components/ClassifyDrag'
import TapGrid from '../components/TapGrid'
import PrepositionScene from '../components/PrepositionScene'
import { schoolImages } from '../components/schoolImages'
import { familyImages } from '../components/familyImages'
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
    // keepOrder: mantener el orden dado (ej: números 1..10 al contar).
    options: q.options && !q.keepOrder ? shuffle(q.options) : q.options,
    bank: q.bank ? shuffle(q.bank) : q.bank,
  }))
}

// Lee un texto en voz alta (Web Speech API). Quita emojis para que la voz no
// diga "círculo rojo" y demás. Se usa solo para la consigna (no las opciones),
// así no revela la respuesta.
function speak(text: string) {
  try {
    const synth = window.speechSynthesis
    if (!synth) return
    const clean = text
      .replace(/[\p{Extended_Pictographic}️‍]/gu, '')
      .replace(/\s+/g, ' ')
      .trim()
    if (!clean) return
    synth.cancel()
    const u = new SpeechSynthesisUtterance(clean)
    u.lang = 'es-AR'
    u.rate = 0.9
    synth.speak(u)
  } catch {
    // Sin soporte de voz: no rompemos nada.
  }
}

// Preguntas todavía no dominadas (las que faltan o se respondieron mal).
function pendingQuestions(questions: Question[], mastered: Set<string>): Question[] {
  return questions.filter((q) => !mastered.has(q.id))
}

export default function PracticePage() {
  const { gradeId, subjectId, termId, practiceId } = useParams()
  const result = getPractice(
    gradeId ?? '',
    subjectId ?? '',
    termId ?? '',
    practiceId ?? '',
  )

  if (!result) return <NotFoundPage />

  const { grade, subject, term, practice } = result
  const termPath = `/grado/${grade.id}/${subject.id}/${term.id}`

  return (
    <section className="practice-view" style={{ ['--accent' as string]: grade.color }}>
      <nav className="breadcrumb" aria-label="Migas de pan">
        <Link to="/">Inicio</Link>
        <span aria-hidden="true">›</span>
        <Link to={`/grado/${grade.id}`}>{grade.name}</Link>
        <span aria-hidden="true">›</span>
        <Link to={`/grado/${grade.id}/${subject.id}`}>{subject.name}</Link>
        <span aria-hidden="true">›</span>
        <Link to={termPath} state={{ jumpToNext: true }}>
          {term.name}
        </Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">{practice.title}</span>
      </nav>

      {/* key fuerza reiniciar el estado si cambia la práctica */}
      <Quiz
        key={practice.id}
        practice={practice}
        gradeId={grade.id}
        termPath={termPath}
      />
    </section>
  )
}

function Quiz({
  practice,
  gradeId,
  termPath,
}: {
  practice: Practice
  gradeId: string
  termPath: string
}) {
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

  // Refs para ajustar el tamaño del contenido (--fit) y que todo entre sin scroll.
  const cardRef = useRef<HTMLDivElement>(null)
  const fitRef = useRef<HTMLDivElement>(null)

  // Avance a prueba de reentradas: evita que el auto-avance (tap) + toques
  // rápidos hagan pasar de largo la última pregunta (round[current] undefined).
  const currentRef = useRef(0)
  currentRef.current = current
  const advancingRef = useRef(false)
  const autoNextRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // Al cambiar de pregunta o de fase, se habilita el próximo avance.
  useEffect(() => {
    advancingRef.current = false
  }, [current, phase])

  // Cancela cualquier auto-avance pendiente al desmontar.
  useEffect(() => () => clearTimeout(autoNextRef.current), [])

  // En jardín, leer la consigna en voz alta al cambiar de pregunta (best-effort:
  // algunos navegadores móviles recién lo permiten tras el primer toque; para
  // eso está también el botón 🔊).
  useEffect(() => {
    if (gradeId !== 'jardin' || phase !== 'playing') return
    const q = round[current]
    if (q) speak(q.prompt)
    return () => window.speechSynthesis?.cancel()
  }, [current, phase, round, gradeId])

  const masteredCount = allQuestions.filter((q) => mastered.has(q.id)).length
  const pendingCount = total - masteredCount
  const allDone = pendingCount === 0

  // Registra el inicio de la práctica (una vez por montaje).
  useEffect(() => {
    logEvent('practice_start', {
      grade: gradeId,
      practice: practiceId,
      title: practice.title,
    })
  }, [gradeId, practiceId, practice.title])

  // Registra cuando se completa toda la práctica.
  useEffect(() => {
    if (allDone) {
      logEvent('complete', {
        grade: gradeId,
        practice: practiceId,
        title: practice.title,
      })
    }
  }, [allDone, gradeId, practiceId, practice.title])

  // Ajusta --fit para que el contenido de la tarjeta entre sin scroll.
  // Mide el alto natural del contenido vs el alto disponible y, si no entra,
  // achica proporcionalmente (letra, cuadros e imagen). Adaptativo a la
  // pantalla; en desktop, donde sobra alto, --fit queda en 1.
  useLayoutEffect(() => {
    const card = cardRef.current
    const inner = fitRef.current
    const quiz = card?.closest('.quiz') as HTMLElement | null
    if (!card || !inner || !quiz) return

    function fit() {
      quiz!.style.setProperty('--fit', '1')
      const avail = card!.clientHeight
      if (!avail) return
      // Itera achicando hasta que entre (o hasta el piso de legibilidad).
      const MIN = 0.45
      let k = 1
      for (let i = 0; i < 6; i++) {
        const content = inner!.offsetHeight
        if (content <= avail) break
        k = Math.max(MIN, k * (avail / content) * 0.98)
        quiz!.style.setProperty('--fit', String(k))
        if (k <= MIN) break
      }
    }

    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(card)
    window.addEventListener('resize', fit)
    window.addEventListener('orientationchange', fit)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', fit)
      window.removeEventListener('orientationchange', fit)
    }
  }, [current, answered, dragCorrect, round, phase])

  function persist(next: Set<string>) {
    saveMastered(gradeId, practiceId, next)
  }

  function logAnswer(correct: boolean) {
    logEvent('answer', {
      grade: gradeId,
      practice: practiceId,
      title: practice.title,
      correct,
    })
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
    const correct = !!q.options?.[index]?.correct
    logAnswer(correct)
    if (correct) markMastered(q.id)
  }

  // Validación del ejercicio de arrastrar.
  function handleDragValidate(isCorrect: boolean) {
    if (answered) return
    setAnswered(true)
    setDragCorrect(isCorrect)
    logAnswer(isCorrect)
    if (isCorrect) markMastered(round[current].id)
  }

  // Actividad de jardín ('tap'): solo llega cuando el chico acierta. Festeja,
  // marca dominada y avanza solo tras un ratito.
  function handleTapCorrect() {
    if (answered) return
    setAnswered(true)
    setDragCorrect(true)
    logAnswer(true)
    markMastered(round[current].id)
    clearTimeout(autoNextRef.current)
    autoNextRef.current = setTimeout(handleNext, 1600)
  }

  function handleNext() {
    // Un solo avance por pregunta: evita que el auto-avance y los toques
    // rápidos se acumulen y pasen de largo (round[current] undefined → crash).
    if (advancingRef.current) return
    advancingRef.current = true
    clearTimeout(autoNextRef.current)
    autoNextRef.current = undefined

    if (currentRef.current + 1 >= round.length) {
      setPhase('roundEnd')
      return
    }
    setCurrent(currentRef.current + 1)
    setSelected(null)
    setAnswered(false)
    setDragCorrect(false)
  }

  // Empieza otra ronda con lo que todavía falta dominar.
  function startNextRound() {
    clearTimeout(autoNextRef.current)
    autoNextRef.current = undefined
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
    clearTimeout(autoNextRef.current)
    autoNextRef.current = undefined
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
            <Link
              className="btn btn--ghost"
              to={termPath}
              state={{ jumpToNext: true }}
            >
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
  const isChoice = question.kind == null || question.kind === 'choice'
  // En 1er grado los ejercicios van en MAYÚSCULAS.
  const upper = gradeId === '1'
  const T = (s: string) => (upper ? s.toUpperCase() : s)

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
        Pregunta {current + 1} de {round.length}
      </p>

      <div className="quiz-card" ref={cardRef}>
       <div className="quiz-card__fit" ref={fitRef}>
        <div className="quiz-card__scroll">
          {question.map === 'city' && question.kind !== 'drag' && <CityMap />}
          {question.scene && <PrepositionScene name={question.scene} />}
          {question.image && schoolImages[question.image] && (
            <img
              className="school-photo"
              src={schoolImages[question.image]}
              alt="¿Qué objeto de la escuela es?"
            />
          )}
          {question.image && familyImages[question.image] && (
            <img
              className="family-photo"
              src={familyImages[question.image]}
              alt="Árbol genealógico de la familia de Alison"
            />
          )}
          {question.emoji && (
            <div className="quiz-card__emoji" aria-hidden="true">
              {question.emoji}
            </div>
          )}
          <h1 className="quiz-card__prompt">{T(question.prompt)}</h1>

          {gradeId === 'jardin' && (
            <button
              type="button"
              className="speak-btn"
              onClick={() => speak(question.prompt)}
              aria-label="Escuchar la consigna"
            >
              🔊 Escuchar
            </button>
          )}

          {question.kind === 'drag' ? (
            <DragCloze
              key={question.id}
              question={question}
              locked={answered}
              correct={dragCorrect}
              onValidate={handleDragValidate}
            />
          ) : question.kind === 'classify' ? (
            <ClassifyDrag
              key={question.id}
              question={question}
              locked={answered}
              correct={dragCorrect}
              onValidate={handleDragValidate}
            />
          ) : question.kind === 'tap' ? (
            <TapGrid
              key={question.id}
              question={question}
              locked={answered}
              onCorrect={handleTapCorrect}
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
                      <span className="quiz-option__text">{T(option.text)}</span>
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
        </div>

        {answered && isChoice && (
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

        {answered && question.kind === 'tap' && (
          <div className="quiz-feedback is-correct tap-cheer" role="status">
            <p className="quiz-feedback__title">¡Muy bien! 🎉</p>
          </div>
        )}

        {answered && (
          <div className="quiz-actions">
            <button className="btn btn--primary" onClick={handleNext}>
              {current + 1 >= round.length
                ? 'Terminar ronda 🏁'
                : question.kind === 'tap'
                  ? 'Seguir →'
                  : 'Siguiente →'}
            </button>
          </div>
        )}
       </div>
      </div>
    </div>
  )
}
