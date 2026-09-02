import type { Practice, Question } from '../types'

// ============================================================================
// 1er GRADO — 2nd Midterms: NUMBERS (1 a 10)
//
// Igual que la fotocopia: arriba están los números y debajo de cada uno un
// casillero vacío. El alumno arrastra el cartelito con el número escrito en
// letras (ONE, TWO, THREE...) al casillero del número que le toca. Los
// cartelitos salen SIEMPRE mezclados (los baraja el propio ejercicio), así que
// no alcanza con seguir el orden en que están.
//
// Se usa el kind 'analyze' (casillero debajo de cada palabra) con
// `bigNumbers`, que muestra los números gigantes y de colores.
//
// Después vienen los números de a uno: el número gigante solo, tres opciones
// abajo para elegir cómo se escribe y el botón "📢 ESCUCHA" para oír la
// pronunciación correcta.
// ============================================================================

// El nombre en inglés de cada número, del 1 al 10.
const WORDS = [
  'ONE',
  'TWO',
  'THREE',
  'FOUR',
  'FIVE',
  'SIX',
  'SEVEN',
  'EIGHT',
  'NINE',
  'TEN',
]

const PROMPT = 'Arrastrá cada palabra al casillero del número que le corresponde.'

// ---------------------------------------------------------------------------
// Segunda parte: elegir cómo se escribe.
//
// Se muestra UN número gigante (el mismo color de la fotocopia) y abajo tres
// opciones para elegir cómo se escribe en inglés. El botón "📢 ESCUCHA" dice
// el número en voz alta, así el alumno oye la pronunciación correcta las veces
// que quiera; escucharlo no responde la pregunta.
// ---------------------------------------------------------------------------

// Las dos opciones incorrectas de cada número. Están elegidas a propósito
// entre las que se le parecen al escribirlas o al escucharlas (ej: FIVE con
// FOUR y NINE), para que haya que mirar bien y no salga por descarte.
const DISTRACTORS: Record<number, [string, string]> = {
  1: ['TWO', 'TEN'],
  2: ['TEN', 'ONE'],
  3: ['TWO', 'TEN'],
  4: ['FIVE', 'ONE'],
  5: ['FOUR', 'NINE'],
  6: ['SEVEN', 'TEN'],
  7: ['SIX', 'NINE'],
  8: ['NINE', 'THREE'],
  9: ['FIVE', 'EIGHT'],
  10: ['TWO', 'THREE'],
}

/** Pregunta "¿cómo se escribe este número?" para el número `n`. */
function howToWrite(n: number): Question {
  const answer = WORDS[n - 1]
  return {
    id: `nw${n}`,
    prompt: '¿Cómo se escribe este número?',
    bigNumber: String(n),
    listen: answer,
    options: [
      { text: answer, correct: true },
      { text: DISTRACTORS[n][0] },
      { text: DISTRACTORS[n][1] },
    ],
    explanation: `${n} se escribe ${answer}.`,
  }
}

/** Arma una pregunta con los números de `from` a `to` (inclusive). */
function numbers(id: string, from: number, to: number): Question {
  const digits = []
  for (let n = from; n <= to; n++) digits.push(n)
  return {
    id,
    prompt: PROMPT,
    kind: 'analyze',
    bigNumbers: true,
    words: digits.map((n) => String(n)),
    labels: digits.map((n) => WORDS[n - 1]),
  }
}

export const grade1NumbersPractices: Practice[] = [
  {
    id: 'numbers',
    title: 'Numbers',
    description:
      'Arrastrá el cartelito con el número escrito en letras al casillero de su número, y elegí cómo se escribe cada número escuchando su pronunciación.',
    emoji: '🔢',
    questions: [
      // Primero de a cinco (como las dos filas de la fotocopia) y al final los
      // diez juntos, que es el desafío completo.
      numbers('nu1', 1, 5),
      numbers('nu2', 6, 10),
      numbers('nu3', 1, 10),
      // Y después, número por número: cuál de las tres es la forma correcta de
      // escribirlo (con el botón para escuchar cómo se pronuncia).
      ...Array.from({ length: 10 }, (_, i) => howToWrite(i + 1)),
    ],
  },
]
