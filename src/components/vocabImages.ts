// Mapas de imágenes de vocabulario para los ejercicios de "unir con una
// línea" (kind 'match') y "memotest" (kind 'memory'): buscan la clave en
// varios mapas, así sirven para cualquier vocabulario con fotos o íconos, sin
// tener que tocar el componente al sumar uno nuevo.
//
// "The great outdoors" usa los íconos vectoriales (`outdoorIcons`): son los
// que pasó la seño porque se ven más claros que las fotos originales, así que
// van primeros en la búsqueda. El resto del vocabulario (objetos de la
// escuela, partes del cuerpo, familia, las escenas de past continuous) sigue
// con fotos, no tiene íconos propios.
import { outdoorIcons } from './outdoorIcons'
import { pastContinuousImages } from './pastContinuousImages'
import { schoolImages } from './schoolImages'
import { bodyPartsImages } from './bodyPartsImages'
import { familyImages } from './familyImages'

const IMAGE_MAPS: Record<string, string>[] = [
  outdoorIcons,
  pastContinuousImages,
  schoolImages,
  bodyPartsImages,
  familyImages,
]

export function vocabImageSrc(key: string): string | undefined {
  for (const map of IMAGE_MAPS) if (map[key]) return map[key]
  return undefined
}
