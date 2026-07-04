import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getTerm } from '../data/grades'
import { loadMastered, resetManyMastered } from '../lib/progress'
import NotFoundPage from './NotFoundPage'

// Dentro de un período (ej: 1st Midterms) se listan todas las prácticas y hay
// un botón para reiniciar el progreso de TODAS a la vez.
export default function TermPage() {
  const { gradeId, subjectId, termId } = useParams()
  const found = getTerm(gradeId ?? '', subjectId ?? '', termId ?? '')

  // Se usa para forzar el re-render tras reiniciar el progreso (así se
  // actualizan los contadores "Dominadas x/y").
  const [, setVersion] = useState(0)

  if (!found) return <NotFoundPage />

  const { grade, subject, term } = found
  const practices = term.practices

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

      <div className="term-toolbar">
        <button
          className="btn btn--ghost btn--small"
          onClick={handleResetAll}
        >
          ↺ Reiniciar todas
        </button>
      </div>

      <ul className="practice-list" role="list">
        {practices.map((practice) => {
          const total = practice.questions.length
          const done = practice.questions.filter((q) =>
            loadMastered(grade.id, practice.id).has(q.id),
          ).length
          const complete = done === total && total > 0

          return (
            <li key={practice.id}>
              <Link
                to={`/grado/${grade.id}/${subject.id}/${term.id}/${practice.id}`}
                className="practice-card"
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
