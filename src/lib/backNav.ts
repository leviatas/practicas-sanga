// ============================================================================
// Botón «Volver» jerárquico.
//
// «Volver» siempre lleva al nivel de ARRIBA en la jerarquía (juego → menú
// REPASO → Alto en el camino III → Matemática → 1er grado → inicio), no a la
// página anterior del historial. Para no llenar el historial de entradas
// repetidas ni armar bucles (menú → juego → menú → juego...):
//  · si la entrada anterior del historial YA es el padre, se vuelve con
//    navigate(-1), igual que la flecha del navegador;
//  · si no (ej: se entró directo por un link), se REEMPLAZA la entrada actual
//    por el padre, así no se suma una entrada nueva.
//
// Para saber qué hay en la entrada anterior, App anota la ruta de cada
// entrada del historial según su índice (`history.state.idx`, que pone
// React Router).
// ============================================================================

import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const pathByIndex = new Map<number, string>()

function currentIndex(): number | null {
  const idx = (window.history.state as { idx?: unknown } | null)?.idx
  return typeof idx === 'number' ? idx : null
}

/** Lo llama App en cada cambio de ruta. */
export function recordHistoryEntry(pathname: string): void {
  const idx = currentIndex()
  if (idx !== null) pathByIndex.set(idx, pathname)
}

/** Devuelve una función que sube un nivel, hasta `parentPath`. */
export function useBackTo(parentPath: string): () => void {
  const navigate = useNavigate()
  return useCallback(() => {
    const idx = currentIndex()
    if (idx !== null && idx > 0 && pathByIndex.get(idx - 1) === parentPath) {
      navigate(-1)
    } else {
      navigate(parentPath, { replace: true })
    }
  }, [navigate, parentPath])
}
