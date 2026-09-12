// Mapas de imágenes de vocabulario para los ejercicios de "unir con una
// línea" (kind 'match') y "memotest" (kind 'memory'): buscan la clave en
// varios mapas, así sirven para cualquier vocabulario con fotos o íconos, sin
// tener que tocar el componente al sumar uno nuevo.
//
// OJO: `outdoorIcons` y `outdoorImages` tienen las MISMAS claves (world,
// field, campfire...), una con fotos y la otra con íconos vectoriales. Por
// eso hay dos funciones con distinta prioridad: "unir con una línea" ya usa
// las fotos (`matchImageSrc`) y el memotest usa los íconos (`memoryImageSrc`,
// pensados para reconocerse de un vistazo al dar vuelta la ficha).
import { outdoorImages } from './outdoorImages'
import { outdoorIcons } from './outdoorIcons'
import { pastContinuousImages } from './pastContinuousImages'
import { schoolImages } from './schoolImages'
import { bodyPartsImages } from './bodyPartsImages'
import { familyImages } from './familyImages'

const OTHER_MAPS: Record<string, string>[] = [
  pastContinuousImages,
  schoolImages,
  bodyPartsImages,
  familyImages,
]

function firstMatch(maps: Record<string, string>[], key: string): string | undefined {
  for (const map of maps) if (map[key]) return map[key]
  return undefined
}

/** Para kind 'match': prioriza las fotos (ej: "unir con una línea"). */
export function matchImageSrc(key: string): string | undefined {
  return firstMatch([outdoorImages, ...OTHER_MAPS], key)
}

/** Para kind 'memory': prioriza los íconos vectoriales del memotest. */
export function memoryImageSrc(key: string): string | undefined {
  return firstMatch([outdoorIcons, ...OTHER_MAPS], key)
}
