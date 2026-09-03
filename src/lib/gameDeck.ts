// ============================================================================
// La "bolsa" de palabras del juego.
//
// Cada ronda usa cinco palabras de un banco más grande. Para que al volver a
// jugar salgan OTRAS, se recuerda por nivel cuáles ya tocaron: se sacan
// siempre de las que faltan y, cuando el banco se termina, la bolsa se da
// vuelta y vuelven a entrar todas.
// ============================================================================

const KEY = 'sanga:juego:vistas'

type Seen = Record<number, string[]>

function loadSeen(): Seen {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return {}
    const obj = JSON.parse(raw)
    return obj && typeof obj === 'object' ? (obj as Seen) : {}
  } catch {
    return {}
  }
}

function saveSeen(seen: Seen): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(seen))
  } catch {
    // Ignoramos: el juego sigue aunque no se pueda persistir.
  }
}

/** Baraja un array devolviendo una copia nueva (Fisher-Yates). */
function shuffle<T>(items: readonly T[]): T[] {
  const arr = items.slice()
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j]!, arr[i]!]
  }
  return arr
}

/**
 * Elige `count` palabras para una ronda del nivel `level`, priorizando las que
 * todavía no salieron. Es una función PURA: no toca lo guardado. La ronda que
 * de verdad se juega se anota después con `markWordsSeen` (así el modo
 * estricto de React, que renderiza dos veces, no consume la bolsa al doble).
 */
export function pickWords<T extends { word: string }>(
  all: T[],
  count: number,
  level: number,
): T[] {
  const used = new Set(loadSeen()[level] ?? [])
  const pending = shuffle(all.filter((w) => !used.has(w.word)))
  if (pending.length >= count) return pending.slice(0, count)
  // Se acabó la bolsa: van las que quedaban y se completa con las demás.
  const rest = shuffle(all.filter((w) => used.has(w.word)))
  return shuffle([...pending, ...rest.slice(0, count - pending.length)])
}

/**
 * Anota las palabras de la ronda que se está jugando. Si la bolsa todavía
 * tenía suficientes, se suman a las vistas; si no, empieza una bolsa nueva con
 * las de esta ronda. Llamarla dos veces con la misma ronda no cambia nada.
 */
export function markWordsSeen(
  level: number,
  words: string[],
  total: number,
): void {
  const seen = loadSeen()
  const used = new Set(seen[level] ?? [])
  // Ya anotada (segundo render del modo estricto): no hacemos nada.
  if (used.size < total && words.every((w) => used.has(w))) return
  seen[level] =
    total - used.size >= words.length ? [...used, ...words] : [...words]
  saveSeen(seen)
}

/** Olvida qué palabras salieron (por si hace falta empezar de cero). */
export function resetDeck(): void {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // Ignoramos.
  }
}

export { shuffle }
