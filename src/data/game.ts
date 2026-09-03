// ============================================================================
// "En construcción" — el juego de aprender a leer.
//
// No usa el modelo Grado → Materia → Período → Práctica: es un juego aparte
// con una pantalla principal (el mapa con el camino y sus niveles) y un
// ejercicio por nivel. Los niveles que todavía no tienen contenido se ven en
// el camino con candado.
//
// Cada nivel tiene su propia lista de palabras. Las rondas son de cinco y, al
// volver a jugar, salen las que todavía no habían tocado (src/lib/gameDeck.ts).
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

/** Cuántos ejercicios trae cada ronda (los bancos de palabras son más grandes). */
export const ROUND_SIZE = 5

/**
 * Nivel 1 — "¿con qué sonido empieza esta palabra?".
 * La primera letra de `letters` es la correcta (los botones salen barajados) y
 * las otras dos son del mismo tipo: a una vocal la acompañan vocales, a una
 * consonante consonantes.
 */
export interface SoundWord {
  /** La palabra, en mayúscula (se muestra y se lee en voz alta). */
  word: string
  /** El dibujo. */
  emoji: string
  letters: [string, string, string]
}

export const level1Words: SoundWord[] = [
  { word: 'SOL', emoji: '☀️', letters: ['S', 'C', 'M'] },
  { word: 'LUNA', emoji: '🌙', letters: ['L', 'M', 'T'] },
  { word: 'PATO', emoji: '🦆', letters: ['P', 'T', 'R'] },
  { word: 'CASA', emoji: '🏠', letters: ['C', 'S', 'T'] },
  { word: 'MANO', emoji: '✋', letters: ['M', 'P', 'S'] },
  { word: 'AVIÓN', emoji: '✈️', letters: ['A', 'E', 'O'] },
  { word: 'ELEFANTE', emoji: '🐘', letters: ['E', 'A', 'I'] },
  { word: 'ISLA', emoji: '🏝️', letters: ['I', 'E', 'A'] },
  { word: 'OSO', emoji: '🐻', letters: ['O', 'U', 'A'] },
  { word: 'UNICORNIO', emoji: '🦄', letters: ['U', 'O', 'I'] },
  { word: 'TOMATE', emoji: '🍅', letters: ['T', 'P', 'C'] },
  { word: 'RATÓN', emoji: '🐭', letters: ['R', 'L', 'P'] },
]

/**
 * Nivel 2 — "completá la primera sílaba".
 * Tiene su propia lista: todas empiezan con consonante + vocal, así la opción
 * incorrecta puede ser la misma sílaba cambiando SOLO la inicial (LU / MU).
 */
export interface SyllableWord {
  word: string
  emoji: string
  /** La primera sílaba (la respuesta) y lo que queda de la palabra. */
  syllable: string
  rest: string
  /** La sílaba distractora: igual a `syllable` pero con otra inicial. */
  other: string
}

export const level2Words: SyllableWord[] = [
  { word: 'SAPO', emoji: '🐸', syllable: 'SA', rest: 'PO', other: 'LA' },
  { word: 'LUNA', emoji: '🌙', syllable: 'LU', rest: 'NA', other: 'MU' },
  { word: 'PATO', emoji: '🦆', syllable: 'PA', rest: 'TO', other: 'MA' },
  { word: 'CASA', emoji: '🏠', syllable: 'CA', rest: 'SA', other: 'TA' },
  { word: 'MANO', emoji: '✋', syllable: 'MA', rest: 'NO', other: 'NA' },
  { word: 'TOMATE', emoji: '🍅', syllable: 'TO', rest: 'MATE', other: 'LO' },
  { word: 'RATÓN', emoji: '🐭', syllable: 'RA', rest: 'TÓN', other: 'PA' },
  { word: 'NIDO', emoji: '🪺', syllable: 'NI', rest: 'DO', other: 'MI' },
  { word: 'DEDO', emoji: '☝️', syllable: 'DE', rest: 'DO', other: 'TE' },
  { word: 'FOCA', emoji: '🦭', syllable: 'FO', rest: 'CA', other: 'SO' },
]

/** El banco de palabras de cada nivel. */
export function wordBankSize(level: number): number {
  return level === 2 ? level2Words.length : level1Words.length
}

/** Consigna de cada nivel (la dice el monstruito en su globo). */
export const LEVEL_PROMPTS: Record<number, string> = {
  1: '¿CON QUÉ SONIDO EMPIEZA ESTA PALABRA?',
  2: 'COMPLETÁ LA PRIMERA SÍLABA',
}
