// ============================================================================
// Nombre del niño — guardado en el navegador (localStorage), por grado.
// Se usa para mensajes de incentivo ("¡Muy bien, Mateo!") y, si hay backend,
// se manda junto a los eventos para ver en los logs quién jugó.
// ============================================================================

const KEY_PREFIX = 'sanga:name:'

export function loadName(gradeId: string): string {
  try {
    return localStorage.getItem(KEY_PREFIX + gradeId) ?? ''
  } catch {
    return ''
  }
}

export function saveName(gradeId: string, name: string): void {
  try {
    const value = name.trim().replace(/\s+/g, ' ').slice(0, 24)
    if (value) localStorage.setItem(KEY_PREFIX + gradeId, value)
    else localStorage.removeItem(KEY_PREFIX + gradeId)
  } catch {
    // localStorage no disponible: seguimos sin nombre.
  }
}
