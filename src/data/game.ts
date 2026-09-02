// ============================================================================
// "En construcción" — el juego de aprender a leer.
//
// No usa el modelo Grado → Materia → Período → Práctica: es un juego aparte
// con una pantalla principal (el mapa con el camino y sus niveles) y un
// ejercicio por nivel. Los niveles que todavía no tienen contenido se ven en
// el camino con candado.
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
  { id: 2, title: 'LA PRIMERA SÍLABA', x: 28, y: 64.5, ready: true },
  { id: 3, title: 'PRÓXIMAMENTE', x: 66, y: 51.5, ready: false },
  { id: 4, title: 'PRÓXIMAMENTE', x: 69, y: 41, ready: false },
  { id: 5, title: 'PRÓXIMAMENTE', x: 35, y: 36, ready: false },
  { id: 6, title: 'PRÓXIMAMENTE', x: 73, y: 27.5, ready: false },
]

/** Cuántos ejercicios trae cada ronda (el banco de palabras es más grande). */
export const ROUND_SIZE = 5

/**
 * El banco de palabras del juego. Los dos niveles usan las MISMAS imágenes:
 * el 1 pregunta por la letra inicial y el 2 por la primera sílaba. Cada ronda
 * toma cinco al azar y, al volver a jugar, salen las que todavía no tocaron
 * (ver `pickWords` en src/lib/gameDeck.ts).
 */
export interface GameWord {
  /** La palabra, en mayúscula (se muestra y se lee en voz alta). */
  word: string
  /** El dibujo. */
  emoji: string
  /** Nivel 1: la letra inicial y dos distractores (mismo tipo: vocal o consonante). */
  letters: [string, string, string]
  /** Nivel 2: la primera sílaba y lo que queda de la palabra. */
  syllable: string
  rest: string
  /** Nivel 2: la sílaba distractora, igual a `syllable` pero con otra inicial. */
  otherSyllable: string
}

export const gameWords: GameWord[] = [
  {
    word: 'SOL',
    emoji: '☀️',
    letters: ['S', 'C', 'M'],
    syllable: 'SOL',
    rest: '',
    otherSyllable: 'MOL',
  },
  {
    word: 'LUNA',
    emoji: '🌙',
    letters: ['L', 'M', 'T'],
    syllable: 'LU',
    rest: 'NA',
    otherSyllable: 'MU',
  },
  {
    word: 'PATO',
    emoji: '🦆',
    letters: ['P', 'T', 'R'],
    syllable: 'PA',
    rest: 'TO',
    otherSyllable: 'MA',
  },
  {
    word: 'CASA',
    emoji: '🏠',
    letters: ['C', 'S', 'T'],
    syllable: 'CA',
    rest: 'SA',
    otherSyllable: 'TA',
  },
  {
    word: 'MANO',
    emoji: '✋',
    letters: ['M', 'P', 'S'],
    syllable: 'MA',
    rest: 'NO',
    otherSyllable: 'NA',
  },
  {
    word: 'AVIÓN',
    emoji: '✈️',
    letters: ['A', 'E', 'O'],
    syllable: 'A',
    rest: 'VIÓN',
    otherSyllable: 'E',
  },
  {
    word: 'ELEFANTE',
    emoji: '🐘',
    letters: ['E', 'A', 'I'],
    syllable: 'E',
    rest: 'LEFANTE',
    otherSyllable: 'I',
  },
  {
    word: 'ISLA',
    emoji: '🏝️',
    letters: ['I', 'E', 'A'],
    syllable: 'IS',
    rest: 'LA',
    otherSyllable: 'AS',
  },
  {
    word: 'OSO',
    emoji: '🐻',
    letters: ['O', 'U', 'A'],
    syllable: 'O',
    rest: 'SO',
    otherSyllable: 'U',
  },
  {
    word: 'UNICORNIO',
    emoji: '🦄',
    letters: ['U', 'O', 'I'],
    syllable: 'U',
    rest: 'NICORNIO',
    otherSyllable: 'O',
  },
  {
    word: 'TOMATE',
    emoji: '🍅',
    letters: ['T', 'P', 'C'],
    syllable: 'TO',
    rest: 'MATE',
    otherSyllable: 'LO',
  },
  {
    word: 'RATÓN',
    emoji: '🐭',
    letters: ['R', 'L', 'P'],
    syllable: 'RA',
    rest: 'TÓN',
    otherSyllable: 'PA',
  },
]

/** Consigna de cada nivel (la dice el monstruito en su globo). */
export const LEVEL_PROMPTS: Record<number, string> = {
  1: '¿CON QUÉ SONIDO EMPIEZA ESTA PALABRA?',
  2: 'COMPLETÁ LA PRIMERA SÍLABA',
}
