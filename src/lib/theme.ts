// ============================================================================
// Tema visual (claro / oscuro / el del dispositivo) — se recuerda en el
// navegador (localStorage), así la próxima visita abre como lo dejaron.
//
// Cómo funciona: se pone (o se saca) el atributo `data-theme` en el <html>.
//   · data-theme="light"  → siempre claro
//   · data-theme="dark"   → siempre oscuro
//   · sin atributo        → manda el dispositivo (prefers-color-scheme)
// Los colores están en src/index.css.
//
// Para que no haya un "flashazo" del tema equivocado al cargar, index.html
// aplica el valor guardado antes de que arranque React (mismo KEY).
// ============================================================================

export type Theme = 'light' | 'dark' | 'device'

export const KEY = 'sanga:theme'

/** Orden en el que rota el botón del encabezado. */
export const THEME_CYCLE: Theme[] = ['device', 'light', 'dark']

export const THEME_LABELS: Record<Theme, { icon: string; name: string }> = {
  device: { icon: '💻', name: 'Automático' },
  light: { icon: '☀️', name: 'Claro' },
  dark: { icon: '🌙', name: 'Oscuro' },
}

export function loadTheme(): Theme {
  try {
    const value = localStorage.getItem(KEY)
    if (value === 'light' || value === 'dark' || value === 'device') return value
  } catch {
    // localStorage no disponible (modo privado, etc.).
  }
  return 'device'
}

export function saveTheme(theme: Theme): void {
  try {
    if (theme === 'device') localStorage.removeItem(KEY)
    else localStorage.setItem(KEY, theme)
  } catch {
    // Si no se puede guardar, al menos vale para esta sesión.
  }
}

export function applyTheme(theme: Theme): void {
  const root = document.documentElement
  if (theme === 'device') root.removeAttribute('data-theme')
  else root.setAttribute('data-theme', theme)
}

/** El siguiente tema del ciclo: automático → claro → oscuro → automático. */
export function nextTheme(theme: Theme): Theme {
  const i = THEME_CYCLE.indexOf(theme)
  return THEME_CYCLE[(i + 1) % THEME_CYCLE.length]
}
