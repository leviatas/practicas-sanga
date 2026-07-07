import { useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getGrade } from '../data/grades'
import { loadName, saveName } from '../lib/profile'
import NotFoundPage from './NotFoundPage'

// Dentro de un grado el alumno elige primero la MATERIA (ej: English).
export default function GradePage() {
  const { gradeId } = useParams()
  const grade = getGrade(gradeId ?? '')

  // Nombre del niño (opcional), guardado por grado. Se usa para los mensajes de
  // incentivo al responder.
  const [name, setName] = useState(() => loadName(gradeId ?? ''))
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(() => loadName(gradeId ?? ''))

  if (!grade) return <NotFoundPage />

  function submitName(e: FormEvent) {
    e.preventDefault()
    const value = draft.trim().replace(/\s+/g, ' ').slice(0, 24)
    saveName(gradeId ?? '', value)
    setName(value)
    setEditing(false)
  }

  const showForm = editing || !name

  return (
    <section style={{ ['--accent' as string]: grade.color }}>
      <nav className="breadcrumb" aria-label="Migas de pan">
        <Link to="/">Inicio</Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">{grade.name}</span>
      </nav>

      <div className="page-intro">
        <h1 className="page-title">
          <span aria-hidden="true">{grade.emoji}</span> {grade.name}
        </h1>
        <p className="page-subtitle">Elegí una materia.</p>
      </div>

      <div className="name-card">
        {showForm ? (
          <form className="name-form" onSubmit={submitName}>
            <label htmlFor="child-name">¿Cómo te llamás?</label>
            <div className="name-form__row">
              <input
                id="child-name"
                className="name-input"
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Tu nombre"
                maxLength={24}
                autoComplete="off"
              />
              <button type="submit" className="btn btn--primary btn--small">
                Guardar
              </button>
              {name && (
                <button
                  type="button"
                  className="btn btn--ghost btn--small"
                  onClick={() => {
                    setDraft(name)
                    setEditing(false)
                  }}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        ) : (
          <div className="name-greeting">
            <span>
              <span aria-hidden="true">👋</span> ¡Hola, <strong>{name}</strong>!
            </span>
            <button
              type="button"
              className="btn btn--ghost btn--small"
              onClick={() => {
                setDraft(name)
                setEditing(true)
              }}
            >
              Cambiar
            </button>
          </div>
        )}
      </div>

      <ul className="practice-list" role="list">
        {grade.subjects.map((subject) => {
          const terms = subject.terms.length
          return (
            <li key={subject.id}>
              <Link
                to={`/grado/${grade.id}/${subject.id}`}
                className="practice-card"
              >
                <span className="practice-card__emoji" aria-hidden="true">
                  {subject.emoji}
                </span>
                <span className="practice-card__body">
                  <span className="practice-card__title">{subject.name}</span>
                  {subject.description && (
                    <span className="practice-card__desc">
                      {subject.description}
                    </span>
                  )}
                  <span className="practice-card__meta">
                    {terms} {terms === 1 ? 'período' : 'períodos'}
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
