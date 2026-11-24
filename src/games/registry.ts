import type { ComponentType } from 'react'
import type { GameProps } from './math/engine'
import Kiosco from './math/Kiosco'
import AmigosDel10 from './math/AmigosDel10'
import Gemelos from './math/Gemelos'
import FabricaDeSumas from './math/FabricaDeSumas'

// ============================================================================
// Registro de minijuegos: une el `id` de cada juego de un menú (ver
// src/data/grade1MatematicaRepaso.ts) con su componente. Para sumar un juego
// nuevo: crear el componente (con GameEngine de ./math/engine) y agregarlo acá.
// ============================================================================

export const gameComponents: Record<string, ComponentType<GameProps>> = {
  kiosco: Kiosco,
  'amigos-del-10': AmigosDel10,
  gemelos: Gemelos,
  'fabrica-de-sumas': FabricaDeSumas,
}

/** Clave de localStorage del mejor puntaje de un juego. */
export function gameStorageKey(gradeId: string, hubId: string, gameId: string): string {
  return `sanga:games:${gradeId}:${hubId}:${gameId}`
}
