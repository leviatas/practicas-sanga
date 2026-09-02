// ============================================================================
// "En construcción" — el juego de aprender a leer.
//
// No usa el modelo Grado → Materia → Período → Práctica: es un juego aparte
// con una pantalla principal (el mapa con el camino y sus niveles) y un
// ejercicio por nivel. Por ahora está habilitado solo el nivel 1; los demás
// se ven en el camino pero aparecen con candado hasta que tengan contenido.
//
// Todos los textos del juego van en IMPRENTA MAYÚSCULA (además el CSS los
// fuerza, por las dudas).
// ============================================================================

/** Tarjeta del "grado" en la pantalla de inicio. */
export const gameGrade = {
  id: 'juego',
  name: 'En construcción',
  emoji: '🚧',
  color: '#f97316', // naranja obra
  description: 'Aprendé a leer',
}

/** Lo que dice el personaje al entrar al mapa (y lo que lee en voz alta). */
export const WELCOME = '¡BIENVENIDO! APRENDAMOS A LEER JUNTOS'

export interface GameLevel {
  /** Número del nivel (1 = el primero del camino). */
  id: number
  /** Nombre corto que se muestra al elegirlo. */
  title: string
  /**
   * Dónde va el botón sobre la imagen del mapa, en % del ancho y del alto.
   * Coinciden con los botones dibujados en el mapa, así el nuestro los tapa.
   */
  x: number
  y: number
  /** `true` si el nivel ya tiene ejercicios (los demás muestran candado). */
  ready: boolean
}

/** Los niveles del camino, de abajo hacia arriba del mapa. */
export const gameLevels: GameLevel[] = [
  { id: 1, title: 'EL SONIDO INICIAL', x: 51, y: 83, ready: true },
  { id: 2, title: 'PRÓXIMAMENTE', x: 28, y: 64.5, ready: false },
  { id: 3, title: 'PRÓXIMAMENTE', x: 66, y: 51.5, ready: false },
  { id: 4, title: 'PRÓXIMAMENTE', x: 69, y: 41, ready: false },
  { id: 5, title: 'PRÓXIMAMENTE', x: 35, y: 36, ready: false },
  { id: 6, title: 'PRÓXIMAMENTE', x: 73, y: 27.5, ready: false },
]

/** Un ejercicio del nivel 1: ¿con qué sonido empieza esta palabra? */
export interface InitialSoundExercise {
  /** La palabra (se lee en voz alta con el botón de escuchar). */
  word: string
  /** El dibujo que se muestra (emoji grande). */
  emoji: string
  /** Las tres letras de los botones; `answer` es la correcta. */
  letters: [string, string, string]
  answer: string
}

/** Consigna que va arriba de cada ejercicio del nivel 1. */
export const LEVEL1_PROMPT = '¿CON QUÉ SONIDO EMPIEZA ESTA PALABRA?'

// Cinco palabras con dibujo claro y letra inicial bien distinta de las otras
// dos opciones (evitamos vocales como distractores para no confundir).
export const level1Exercises: InitialSoundExercise[] = [
  { word: 'SOL', emoji: '☀️', letters: ['S', 'M', 'P'], answer: 'S' },
  { word: 'LUNA', emoji: '🌙', letters: ['T', 'L', 'N'], answer: 'L' },
  { word: 'PATO', emoji: '🦆', letters: ['B', 'D', 'P'], answer: 'P' },
  { word: 'CASA', emoji: '🏠', letters: ['C', 'G', 'T'], answer: 'C' },
  { word: 'MANO', emoji: '✋', letters: ['N', 'S', 'M'], answer: 'M' },
]
