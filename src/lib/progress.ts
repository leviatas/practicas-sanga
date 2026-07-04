// ============================================================================
// Progreso de las prácticas — persistido en el navegador (localStorage).
// No requiere login ni servidor. Guarda, por práctica, los IDs de las
// preguntas ya respondidas correctamente ("dominadas").
// ============================================================================

const KEY_PREFIX = 'sanga:progress:'

function storageKey(gradeId: string, practiceId: string): string {
  return `${KEY_PREFIX}${gradeId}:${practiceId}`
}

/** Devuelve el conjunto de IDs de preguntas ya dominadas en una práctica. */
export function loadMastered(gradeId: string, practiceId: string): Set<string> {
  try {
    const raw = localStorage.getItem(storageKey(gradeId, practiceId))
    if (!raw) return new Set()
    const arr = JSON.parse(raw)
    return new Set(Array.isArray(arr) ? (arr as string[]) : [])
  } catch {
    // localStorage no disponible (modo privado, etc.): seguimos en memoria.
    return new Set()
  }
}

/** Guarda el conjunto de preguntas dominadas de una práctica. */
export function saveMastered(
  gradeId: string,
  practiceId: string,
  mastered: Set<string>,
): void {
  try {
    localStorage.setItem(
      storageKey(gradeId, practiceId),
      JSON.stringify([...mastered]),
    )
  } catch {
    // Ignoramos: la app sigue funcionando aunque no se pueda persistir.
  }
}

/** Borra el progreso guardado de una práctica. */
export function resetMastered(gradeId: string, practiceId: string): void {
  try {
    localStorage.removeItem(storageKey(gradeId, practiceId))
  } catch {
    // Ignoramos.
  }
}

/** Borra el progreso de varias prácticas (ej: todas las de un período). */
export function resetManyMastered(gradeId: string, practiceIds: string[]): void {
  practiceIds.forEach((id) => resetMastered(gradeId, id))
}
