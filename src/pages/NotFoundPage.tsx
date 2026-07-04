import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="notfound">
      <span className="notfound__emoji" aria-hidden="true">
        🧭
      </span>
      <h1 className="page-title">No encontramos esta página</h1>
      <p className="page-subtitle">Puede que el enlace haya cambiado.</p>
      <Link className="btn btn--primary" to="/">
        🏠 Volver al inicio
      </Link>
    </div>
  )
}
