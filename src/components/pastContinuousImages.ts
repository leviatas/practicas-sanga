// Láminas de "Elegir la oración correcta" (4to grado, 2nd Midterms).
// Cada dibujo muestra una escena y el alumno elige la oración que la describe.
// Vienen recortadas SIN el texto del pie (que en el original era solo de
// referencia): la oración la tiene que elegir el alumno.
import awake from '../assets/past-continuous/awake.jpg'
import cake from '../assets/past-continuous/cake.jpg'
import campfire from '../assets/past-continuous/campfire.jpg'
import carNight from '../assets/past-continuous/car-night.jpg'
import computerGame from '../assets/past-continuous/computer-game.jpg'
import cooking from '../assets/past-continuous/cooking.jpg'
import cycling from '../assets/past-continuous/cycling.jpg'
import dancing from '../assets/past-continuous/dancing.jpg'
import football from '../assets/past-continuous/football.jpg'
import reading from '../assets/past-continuous/reading.jpg'
import sleeping from '../assets/past-continuous/sleeping.jpg'
import tvOff from '../assets/past-continuous/tv-off.jpg'

// Mapa nombre → dibujo. El nombre se usa en el campo `image` de cada pregunta.
export const pastContinuousImages: Record<string, string> = {
  awake,
  cake,
  campfire,
  'car-night': carNight,
  'computer-game': computerGame,
  cooking,
  cycling,
  dancing,
  football,
  reading,
  sleeping,
  'tv-off': tvOff,
}
