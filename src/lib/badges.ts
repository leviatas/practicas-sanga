// ============================================================================
// Etiqueta "NEW" con fecha de vencimiento.
//
// En los datos (grados y materias) se pone `newUntil` con una fecha en formato
// 'AAAA-MM-DD'. La etiqueta se muestra hasta el final de ese día, inclusive:
// al día siguiente desaparece sola, sin tener que tocar el código.
// ============================================================================

export function showsNewBadge(
  newUntil: string | undefined,
  today: Date = new Date(),
): boolean {
  if (!newUntil) return false
  // Comparar como texto 'AAAA-MM-DD' evita problemas de zona horaria: usa el
  // día del reloj del alumno, que es lo que él ve en el calendario.
  const y = today.getFullYear()
  const m = String(today.getMonth() + 1).padStart(2, '0')
  const d = String(today.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}` <= newUntil
}
