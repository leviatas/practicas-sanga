// Ilustraciones de objetos de la escuela (1er grado). Se recortaron de las
// flashcards SIN la etiqueta de texto, así la imagen muestra el objeto pero no
// revela su nombre en inglés (el alumno tiene que reconocerlo).
import pen from '../assets/school/pen.jpg'
import sharpener from '../assets/school/sharpener.jpg'
import crayon from '../assets/school/crayon.jpg'
import ruler from '../assets/school/ruler.jpg'
import rubber from '../assets/school/rubber.jpg'
import pencilCase from '../assets/school/pencil-case.jpg'
import computer from '../assets/school/computer.jpg'
import pencil from '../assets/school/pencil.jpg'

// Mapa nombre → imagen. El nombre se usa en el campo `image` de cada pregunta.
export const schoolImages: Record<string, string> = {
  pen,
  sharpener,
  crayon,
  ruler,
  rubber,
  'pencil-case': pencilCase,
  computer,
  pencil,
}
