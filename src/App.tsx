import { Link, Outlet, useLocation } from 'react-router-dom'

export default function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="app">
      <header className="app-header">
        <div className="container app-header__inner">
          <Link to="/" className="brand" aria-label="Ir al inicio">
            <span className="brand__icon" aria-hidden="true">
              📚
            </span>
            <span className="brand__text">Prácticas Sanga</span>
          </Link>
          {!isHome && (
            <Link to="/" className="btn btn--ghost btn--small">
              🏠 Inicio
            </Link>
          )}
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>Hecho con ❤️ para practicar. Sin registro, para toda la familia.</p>
        </div>
      </footer>
    </div>
  )
}
