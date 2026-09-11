// ============================================================================
// Voto de cada ejercicio — ❤️ (me gustó) o 👎 (no me gustó).
//
// Se guarda en el navegador (localStorage) para que el botón quede marcado si
// el chico vuelve a la misma pregunta, y además se manda al backend con el
// nombre, para poder ver en los logs qué ejercicios gustaron y cuáles no.
//
// Solo se puede votar si el nombre está cargado (ver `profile.ts`): sin nombre
// el dato no sirve para nada, así que los botones quedan deshabilitados.
// ============================================================================

export type Vote = 'like' | 'dislike'

const KEY_PREFIX = 'sanga:vote:'

function storageKey(gradeId: string, practiceId: string): string {
  return `${KEY_PREFIX}${gradeId}:${practiceId}`
}

type Votes = Record<string, Vote>

/** Votos guardados de una práctica: { idDePregunta: 'like' | 'dislike' }. */
export function loadVotes(gradeId: string, practiceId: string): Votes {
  try {
    const raw = localStorage.getItem(storageKey(gradeId, practiceId))
    if (!raw) return {}
    const data = JSON.parse(raw)
    return data && typeof data === 'object' ? (data as Votes) : {}
  } catch {
    // localStorage no disponible (modo privado, etc.): seguimos en memoria.
    return {}
  }
}

/** Guarda el voto de una pregunta dentro de su práctica. */
export function saveVote(
  gradeId: string,
  practiceId: string,
  questionId: string,
  vote: Vote,
): void {
  try {
    const votes = loadVotes(gradeId, practiceId)
    votes[questionId] = vote
    localStorage.setItem(storageKey(gradeId, practiceId), JSON.stringify(votes))
  } catch {
    // Ignoramos: la app sigue funcionando aunque no se pueda persistir.
  }
}
