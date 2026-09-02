// ============================================================================
// Progreso del juego "En construcción" — persistido en el navegador.
// Guarda, por nivel, la mejor cantidad de estrellas conseguida (1 a 3). Un
// nivel está completado si tiene al menos una estrella; el siguiente se
// desbloquea cuando el anterior está completado.
// ============================================================================

const KEY = 'sanga:juego:niveles'

export type GameStars = Record<number, number>

export function loadGameStars(): GameStars {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return {}
    const obj = JSON.parse(raw)
    return obj && typeof obj === 'object' ? (obj as GameStars) : {}
  } catch {
    return {}
  }
}

/** Guarda las estrellas de un nivel si mejoran las que ya tenía. */
export function saveGameStars(level: number, stars: number): GameStars {
  const all = loadGameStars()
  all[level] = Math.max(all[level] ?? 0, stars)
  try {
    localStorage.setItem(KEY, JSON.stringify(all))
  } catch {
    // Ignoramos: el juego sigue aunque no se pueda persistir.
  }
  return all
}

export function resetGameStars(): void {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // Ignoramos.
  }
}
