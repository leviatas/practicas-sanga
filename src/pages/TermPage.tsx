import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { getTerm } from '../data/grades'
import { loadMastered, resetManyMastered } from '../lib/progress'
import NotFoundPage from './NotFoundPage'

// Dentro de un período (ej: 1st Midterms) se listan todas las prácticas y hay
// un botón para reiniciar el progreso de TODAS a la vez.
export default function TermPage() {
  const { gradeId, subjectId, termId } = useParams()
  const location = useLocation()
  const found = getTerm(gradeId ?? '', subjectId ?? '', termId ?? '')

  // Se usa para forzar el re-render tras reiniciar el progreso (así se
  // actualizan los contadores "Dominadas x/y").
  const [, setVersion] = useState(0)

  // Al llegar desde una práctica ("Otras prácticas" o el breadcrumb del
  // período) saltamos a la primera práctica sin completar y la resaltamos, así
  // no hay que scrollear a buscarla.
  const jumpToNext = (location.state as { jumpToNext?: boolean } | null)?.jumpToNext
  const nextRef = useRef<HTMLLIElement>(null)
  const [highlight, setHighlight] = useState(false)

  // Al montar (viniendo con jumpToNext), llevar a la vista la práctica sin
  // completar y resaltarla un instante.
  useEffect(() => {
    if (!jumpToNext) return
    const el = nextRef.current
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setHighlight(true)
    const t = setTimeout(() => setHighlight(false), 2200)
    return () => clearTimeout(t)
  }, [jumpToNext])

  if (!found) return <NotFoundPage />

  const { grade, subject, term } = found
  const practices = term.practices

  // Estado de completado de cada práctica (una sola lectura por práctica).
  const completion = practices.map((p) => {
    const mastered = loadMastered(grade.id, p.id)
    const total = p.questions.length
    const done = p.questions.filter((q) => mastered.has(q.id)).length
    return { total, done, complete: done === total && total > 0 }
  })
  const firstIncompleteIndex = completion.findIndex((c) => !c.complete)

  function handleResetAll() {
    const ok = window.confirm(
      `¿Reiniciar el progreso de TODAS las prácticas de "${term.name}"? Se borran las preguntas ya dominadas.`,
    )
    if (!ok) return
    resetManyMastered(
      grade.id,
      practices.map((p) => p.id),
    )
    setVersion((v) => v + 1)
  }

  return (
    <section style={{ ['--accent' as string]: grade.color }}>
      <nav className="breadcrumb" aria-label="Migas de pan">
        <Link to="/">Inicio</Link>
        <span aria-hidden="true">›</span>
        <Link to={`/grado/${grade.id}`}>{grade.name}</Link>
        <span aria-hidden="true">›</span>
        <Link to={`/grado/${grade.id}/${subject.id}`}>{subject.name}</Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">{term.name}</span>
      </nav>

      <div className="page-intro">
        <h1 className="page-title">
          <span aria-hidden="true">{term.emoji}</span> {term.name}
        </h1>
        <p className="page-subtitle">Elegí una práctica para empezar.</p>
      </div>

      {firstIncompleteIndex === -1 && (
        <div className="section-complete" role="status">
          <span className="section-complete__emoji" aria-hidden="true">🏆</span>
          <div>
            <strong>¡Sección completada!</strong>
            <span>
              Dominaste las {practices.length}{' '}
              {practices.length === 1 ? 'práctica' : 'prácticas'}. ¡Genial! 🎉
            </span>
          </div>
        </div>
      )}

      <div className="term-toolbar">
        <button
          className="btn btn--ghost btn--small"
          onClick={handleResetAll}
        >
          ↺ Reiniciar todas
        </button>
      </div>

      <ul className="practice-list" role="list">
        {practices.map((practice, index) => {
          const { total, done, complete } = completion[index]
          const isNext = index === firstIncompleteIndex

          return (
            <li key={practice.id} ref={isNext ? nextRef : undefined}>
              <Link
                to={`/grado/${grade.id}/${subject.id}/${term.id}/${practice.id}`}
                className={`practice-card${
                  isNext && highlight ? ' is-next' : ''
                }`}
              >
                <span className="practice-card__emoji" aria-hidden="true">
                  {practice.emoji}
                </span>
                <span className="practice-card__body">
                  <span className="practice-card__title">{practice.title}</span>
                  <span className="practice-card__desc">
                    {practice.description}
                  </span>
                  <span className="practice-card__meta">
                    {complete
                      ? '✅ ¡Completada!'
                      : done > 0
                        ? `Dominadas: ${done}/${total}`
                        : `${total} preguntas`}
                  </span>
                </span>
                <span className="practice-card__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
