// Escenas de "There is / There are" (1er grado, 2nd Midterms).
// Cada imagen muestra una escena y el alumno arma la oración que la describe
// eligiendo una opción de cada columna.
import mouseTree from '../assets/there-is-there-are/mouse-tree.png'
import dogsBench from '../assets/there-is-there-are/dogs-bench.png'
import rabbitsDesk from '../assets/there-is-there-are/rabbits-desk.png'
import birdsCage from '../assets/there-is-there-are/birds-cage.png'
import catsBox from '../assets/there-is-there-are/cats-box.png'
import horsesCar from '../assets/there-is-there-are/horses-car.png'

// Mapa nombre → imagen. El nombre se usa en el campo `image` de cada pregunta.
export const sentenceImages: Record<string, string> = {
  'mouse-tree': mouseTree,
  'dogs-bench': dogsBench,
  'rabbits-desk': rabbitsDesk,
  'birds-cage': birdsCage,
  'cats-box': catsBox,
  'horses-car': horsesCar,
}
