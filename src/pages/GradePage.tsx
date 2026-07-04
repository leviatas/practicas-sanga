import { Link, useParams } from 'react-router-dom'
import { getGrade } from '../data/grades'
import NotFoundPage from './NotFoundPage'

export default function GradePage() {
  const { gradeId } = useParams()
  const grade = getGrade(gradeId ?? '')

  if (!grade) return <NotFoundPage />

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
        <p className="page-subtitle">Elegí una práctica para empezar.</p>
      </div>

      <ul className="practice-list" role="list">
        {grade.practices.map((practice) => (
          <li key={practice.id}>
            <Link
              to={`/grado/${grade.id}/practica/${practice.id}`}
              className="practice-card"
            >
              <span className="practice-card__emoji" aria-hidden="true">
                {practice.emoji}
              </span>
              <span className="practice-card__body">
                <span className="practice-card__title">{practice.title}</span>
                <span className="practice-card__desc">{practice.description}</span>
                <span className="practice-card__meta">
                  {practice.questions.length} preguntas
                </span>
              </span>
              <span className="practice-card__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
