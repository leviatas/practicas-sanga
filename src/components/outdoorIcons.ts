// Íconos vectoriales del vocabulario de "The great outdoors" (4to grado, Unit
// 6), recortados de la lámina de íconos que pasó la seño (sin el cartelito
// bilingüe de abajo). Se usan en el memotest: a diferencia de las fotos de
// `outdoorImages`, acá es un dibujo simple, ideal para reconocer de un
// vistazo al dar vuelta una ficha.
import branch from '../assets/outdoor-icons/branch.jpg'
import campfire from '../assets/outdoor-icons/campfire.jpg'
import field from '../assets/outdoor-icons/field.jpg'
import grass from '../assets/outdoor-icons/grass.jpg'
import ground from '../assets/outdoor-icons/ground.jpg'
import leaves from '../assets/outdoor-icons/leaves.jpg'
import nest from '../assets/outdoor-icons/nest.jpg'
import shootingStar from '../assets/outdoor-icons/shooting-star.jpg'
import stream from '../assets/outdoor-icons/stream.jpg'
import world from '../assets/outdoor-icons/world.jpg'

// Mapa nombre → ícono. El nombre se usa en el campo `image` de cada pregunta.
export const outdoorIcons: Record<string, string> = {
  branch,
  campfire,
  field,
  grass,
  ground,
  leaves,
  nest,
  'shooting-star': shootingStar,
  stream,
  world,
}
