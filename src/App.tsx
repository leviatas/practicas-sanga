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
          <p>
            Hecho con ❤️ por Edu ·{' '}
            <a
              href="https://dev.leviatas.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              dev.leviatas.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
