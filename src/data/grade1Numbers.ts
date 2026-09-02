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
      'Arrastrá el cartelito con el número escrito en letras al casillero de su número.',
    emoji: '🔢',
    questions: [
      // Primero de a cinco (como las dos filas de la fotocopia) y al final los
      // diez juntos, que es el desafío completo.
      numbers('nu1', 1, 5),
      numbers('nu2', 6, 10),
      numbers('nu3', 1, 10),
    ],
  },
]
