import { useEffect, useState } from 'react'
import {
  applyTheme,
  loadTheme,
  nextTheme,
  saveTheme,
  THEME_LABELS,
  type Theme,
} from '../lib/theme'

// Botón del encabezado para cambiar el tema. Rota entre:
//   💻 Automático (el del dispositivo) → ☀️ Claro → 🌙 Oscuro → …
// La elección queda guardada en el navegador para las próximas visitas.

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => loadTheme())

  // Por si el valor guardado cambió en otra pestaña o no se aplicó al cargar.
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  function handleClick() {
    const next = nextTheme(theme)
    setTheme(next)
    saveTheme(next)
    applyTheme(next)
  }

  const { icon, name } = THEME_LABELS[theme]
  const upcoming = THEME_LABELS[nextTheme(theme)].name.toLowerCase()

  return (
    <button
      type="button"
      className="btn btn--ghost btn--small theme-toggle"
      onClick={handleClick}
      title={`Tema: ${name}. Tocá para pasar a ${upcoming}.`}
      aria-label={`Tema ${name}. Cambiar a ${upcoming}.`}
    >
      <span aria-hidden="true">{icon}</span>
      <span className="theme-toggle__label">{name}</span>
    </button>
  )
}
