// Fotos (ilustraciones de un gato y un tronco) para las preposiciones de
// movimiento de 4to grado. Se recortaron SIN la etiqueta de texto, así la
// imagen muestra la acción pero no revela la respuesta.
import up from '../assets/prepositions/up.jpg'
import down from '../assets/prepositions/down.jpg'
import across from '../assets/prepositions/across.jpg'
import into from '../assets/prepositions/into.jpg'
import outOf from '../assets/prepositions/out-of.jpg'
import onto from '../assets/prepositions/onto.jpg'
import off from '../assets/prepositions/off.jpg'
import round from '../assets/prepositions/round.jpg'
import through from '../assets/prepositions/through.jpg'
import over from '../assets/prepositions/over.jpg'

// Mapa nombre-de-escena → imagen. Las preposiciones estáticas de 1er grado
// (on / in / under / next-to) no están aquí: siguen usando la escena SVG.
export const prepImages: Record<string, string> = {
  up,
  down,
  across,
  into,
  'out-of': outOf,
  onto,
  off,
  round,
  through,
  over,
}
