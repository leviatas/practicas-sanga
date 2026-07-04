import { Link } from 'react-router-dom'
import { grades } from '../data/grades'

export default function HomePage() {
  return (
    <section>
      <div className="page-intro">
        <h1 className="page-title">Elegí tu grado</h1>
        <p className="page-subtitle">
          Tocá tu grado para ver las prácticas disponibles.
        </p>
      </div>

      <ul className="card-grid" role="list">
        {grades.map((grade) => (
          <li key={grade.id}>
            <Link
              to={`/grado/${grade.id}`}
              className="grade-card"
              style={{ ['--accent' as string]: grade.color }}
            >
              <span className="grade-card__emoji" aria-hidden="true">
                {grade.emoji}
              </span>
              <span className="grade-card__name">{grade.name}</span>
              <span className="grade-card__meta">
                {grade.practices.length}{' '}
                {grade.practices.length === 1 ? 'práctica' : 'prácticas'}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
