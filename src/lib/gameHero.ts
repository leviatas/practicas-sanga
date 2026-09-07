// ============================================================================
// El personaje del juego — el que se elige en la primera pantalla.
// Queda guardado en el navegador, así al volver ya viene elegido.
// ============================================================================

export type HeroId = 'heroina' | 'heroe'

const KEY = 'sanga:juego:personaje'

export function loadHero(): HeroId | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw === 'heroina' || raw === 'heroe' ? raw : null
  } catch {
    return null
  }
}

export function saveHero(hero: HeroId): void {
  try {
    localStorage.setItem(KEY, hero)
  } catch {
    // Ignoramos: el juego sigue aunque no se pueda persistir.
  }
}
