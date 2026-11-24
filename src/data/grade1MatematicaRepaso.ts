import type { GameHub } from '../types'

// ============================================================================
// 1er GRADO — Matemática — Alto en el camino III → «REPASO»
//
// Menú de minijuegos para repasar jugando (pensado para tablet y pantallas
// táctiles). Cada juego tiene su componente en src/games/registry.ts, con la
// misma clave que su `id`.
//
// Para sumar otro juego más adelante: agregar una entrada acá y su componente
// en el registro. Nada más.
// ============================================================================

export const grade1MatematicaRepasoHub: GameHub = {
  id: 'repaso',
  name: 'REPASO',
  emoji: '🎮',
  newUntil: '2026-12-05',
  description: 'Cuatro minijuegos: el kiosco, los amigos del 10, los gemelos y la fábrica de sumas.',
  speech: '¡Hola! Elegí un juego para repasar. Tocá una tarjeta para empezar.',
  games: [
    {
      id: 'kiosco',
      title: 'El kiosco',
      subtitle: 'Problemas con dinero',
      speech: 'El kiosco. Comprá golosinas y pagá con billetes y monedas.',
      art: ['🍭', '🏪', '🪙'],
      colors: ['#ffb347', '#ff6f61'],
    },
    {
      id: 'amigos-del-10',
      title: 'Los amigos del 10',
      subtitle: 'Sumas que llegan a 10',
      speech: 'Los amigos del 10. Buscá el número que falta para llegar a 10.',
      art: ['🐸', '🔟', '🐢'],
      colors: ['#7ee081', '#2fa36b'],
    },
    {
      id: 'gemelos',
      title: 'Los gemelos',
      subtitle: 'Sumas de números iguales',
      speech: 'Los gemelos. Sumá números iguales, como 3 más 3.',
      art: ['👦', '🐞', '👦'],
      colors: ['#8fd3ff', '#5b7cfa'],
    },
    {
      id: 'fabrica-de-sumas',
      title: 'La fábrica de sumas',
      subtitle: 'Usá lo que ya sabés',
      speech: 'La fábrica de sumas. Usá una cuenta que ya sabés para resolver otra.',
      art: ['🤖', '⚙️', '🏭'],
      colors: ['#d7a6ff', '#9b51e0'],
    },
  ],
}
