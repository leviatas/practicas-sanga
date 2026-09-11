// Fotos del vocabulario de "The great outdoors" (4to grado, Unit 6).
// Se recortaron de la lámina que pasó la seño, SIN la etiqueta de texto: la
// foto acompaña a la definición y el alumno igual tiene que elegir la palabra.
import world from '../assets/outdoors/world.jpg'
import field from '../assets/outdoors/field.jpg'
import grass from '../assets/outdoors/grass.jpg'
import ground from '../assets/outdoors/ground.jpg'
import campfire from '../assets/outdoors/campfire.jpg'
import stream from '../assets/outdoors/stream.jpg'
import shootingStar from '../assets/outdoors/shooting-star.jpg'
import branch from '../assets/outdoors/branch.jpg'
import nest from '../assets/outdoors/nest.jpg'
import leaves from '../assets/outdoors/leaves.jpg'

// Mapa nombre → imagen. El nombre se usa en el campo `image` de cada pregunta.
export const outdoorImages: Record<string, string> = {
  world,
  field,
  grass,
  ground,
  campfire,
  stream,
  'shooting-star': shootingStar,
  branch,
  nest,
  leaves,
}
