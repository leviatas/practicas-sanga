import { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { logEvent } from './lib/usage'
import UsageLogs from './components/UsageLogs'

export default function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  // Pantalla de ejercicio: /grado/:grade/:subject/:term/:practice (5 segmentos).
  // Ahí fijamos el alto al viewport para evitar el scroll de página.
  const segments = location.pathname.split('/').filter(Boolean)
  const isExercise = segments[0] === 'grado' && segments.length === 5
  const [logsPassword, setLogsPassword] = useState<string | null>(null)
  const openedRef = useRef(false)

  // Registra una "apertura" al cargar la app (una sola vez).
  useEffect(() => {
    if (openedRef.current) return
    openedRef.current = true
    logEvent('open')
  }, [])

  // Click en la versión → pide contraseña. La valida el backend.
  function handleVersionClick() {
    const pw = window.prompt('Contraseña para ver los logs de uso:')
    if (pw) setLogsPassword(pw)
  }

  return (
    <div className={`app${isExercise ? ' app--exercise' : ''}`}>
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
            </a>{' '}
            ·{' '}
            <Link to="/privacidad" className="app-footer__link">
              Privacidad
            </Link>{' '}
            ·{' '}
            <button
              type="button"
              className="app-version app-version--btn"
              onClick={handleVersionClick}
              title="Logs de uso"
            >
              v{__APP_VERSION__}
            </button>
          </p>
        </div>
      </footer>

      {logsPassword && (
        <UsageLogs
          password={logsPassword}
          onClose={() => setLogsPassword(null)}
        />
      )}
    </div>
  )
}
