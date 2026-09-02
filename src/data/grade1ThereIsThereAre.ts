import type { Practice, SentenceColumn } from '../types'

// ============================================================================
// 1er GRADO — 2nd Midterms: THERE IS / THERE ARE
//
// Cada pregunta muestra una escena y el alumno arma la oración que la describe
// eligiendo una opción de cada una de las 5 columnas. Recién con "Enviar" se
// corrige todo junto.
//
// Las columnas son SIEMPRE las mismas y van siempre en el mismo orden: lo que
// cambia de una escena a otra es cuál es la respuesta correcta.
// ============================================================================

const THERE = ['THERE IS', 'THERE ARE']
const NUMBERS = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX']
const ANIMALS = ['HORSES', 'BIRDS', 'MOUSE', 'DOGS', 'CATS', 'RABBITS']
const PREPOSITIONS = ['IN', 'ON', 'UNDER', 'NEXT TO']
const PLACES = [
  'THE BENCH',
  'THE TREE',
  'THE CAR',
  'THE DESK',
  'THE BOX',
  'THE CAGE',
]

/** Arma las 5 columnas de una escena a partir de su oración correcta. */
function sentence(
  there: string,
  number: string,
  animal: string,
  preposition: string,
  place: string,
): SentenceColumn[] {
  return [
    { options: THERE, answer: there },
    { options: NUMBERS, answer: number },
    { options: ANIMALS, answer: animal },
    { options: PREPOSITIONS, answer: preposition },
    { options: PLACES, answer: place },
  ]
}

const PROMPT = 'Mirá el dibujo y armá la oración: elegí una opción de cada columna.'

export const grade1ThereIsThereArePractices: Practice[] = [
  {
    id: 'there-is-there-are',
    title: 'There is / There are',
    description:
      'Mirá la escena y armá la oración eligiendo una opción de cada columna.',
    emoji: '🐭',
    questions: [
      {
        id: 'tita1',
        image: 'mouse-tree',
        prompt: PROMPT,
        kind: 'sentence',
        columns: sentence('THERE IS', 'ONE', 'MOUSE', 'NEXT TO', 'THE TREE'),
      },
      {
        id: 'tita2',
        image: 'dogs-bench',
        prompt: PROMPT,
        kind: 'sentence',
        columns: sentence('THERE ARE', 'TWO', 'DOGS', 'UNDER', 'THE BENCH'),
      },
      {
        id: 'tita3',
        image: 'rabbits-desk',
        prompt: PROMPT,
        kind: 'sentence',
        // El dibujo tiene CINCO conejos (el documento decía "three", pero la
        // respuesta tiene que coincidir con lo que ve el chico).
        columns: sentence('THERE ARE', 'FIVE', 'RABBITS', 'ON', 'THE DESK'),
      },
      {
        id: 'tita4',
        image: 'birds-cage',
        prompt: PROMPT,
        kind: 'sentence',
        columns: sentence('THERE ARE', 'SIX', 'BIRDS', 'IN', 'THE CAGE'),
      },
      {
        id: 'tita5',
        image: 'cats-box',
        prompt: PROMPT,
        kind: 'sentence',
        columns: sentence('THERE ARE', 'THREE', 'CATS', 'IN', 'THE BOX'),
      },
      {
        id: 'tita6',
        image: 'horses-car',
        prompt: PROMPT,
        kind: 'sentence',
        columns: sentence('THERE ARE', 'FOUR', 'HORSES', 'IN', 'THE CAR'),
      },
    ],
  },
]
