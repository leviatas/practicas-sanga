import { Link, useParams } from 'react-router-dom'
import { getSubject } from '../data/grades'
import NotFoundPage from './NotFoundPage'

// Dentro de una materia el alumno elige el PERÍODO (ej: 1st Midterms).
export default function SubjectPage() {
  const { gradeId, subjectId } = useParams()
  const found = getSubject(gradeId ?? '', subjectId ?? '')

  if (!found) return <NotFoundPage />

  const { grade, subject } = found

  return (
    <section style={{ ['--accent' as string]: grade.color }}>
      <nav className="breadcrumb" aria-label="Migas de pan">
        <Link to="/">Inicio</Link>
        <span aria-hidden="true">›</span>
        <Link to={`/grado/${grade.id}`}>{grade.name}</Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">{subject.name}</span>
      </nav>

      <div className="page-intro">
        <h1 className="page-title">
          <span aria-hidden="true">{subject.emoji}</span> {subject.name}
        </h1>
        <p className="page-subtitle">Elegí un período.</p>
      </div>

      <ul className="practice-list" role="list">
        {subject.terms.map((term) => {
          const count = term.practices.length
          return (
            <li key={term.id}>
              <Link
                to={`/grado/${grade.id}/${subject.id}/${term.id}`}
                className="practice-card"
              >
                <span className="practice-card__emoji" aria-hidden="true">
                  {term.emoji}
                </span>
                <span className="practice-card__body">
                  <span className="practice-card__title">{term.name}</span>
                  {term.description && (
                    <span className="practice-card__desc">
                      {term.description}
                    </span>
                  )}
                  <span className="practice-card__meta">
                    {count} {count === 1 ? 'práctica' : 'prácticas'}
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
