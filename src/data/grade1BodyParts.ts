import type { Hotspot, Practice } from '../types'

// ============================================================================
// 1er GRADO — 2nd Midterms: BODY PARTS
//
// Cada pregunta muestra una imagen de una parte del cuerpo y presenta 3
// opciones (sin repetir ninguna). El alumno elige la correcta.
// El listado completo: EYE, NOSE, MOUTH, EAR, HAIR, BODY, HEAD, ARM,
//                      HAND, FINGER, FOOT, LEG, TOE.
// ============================================================================

const ALL_PARTS = [
  'EYE', 'NOSE', 'MOUTH', 'EAR', 'HAIR', 'BODY',
  'HEAD', 'ARM', 'HAND', 'FINGER', 'FOOT', 'LEG', 'TOE',
]

/**
 * Para cada parte del cuerpo, elige 2 distractores al azar de las restantes.
 * Se asegura de que nunca se repita una opción dentro de la misma pregunta.
 */
function distractors(correct: string): string[] {
  const pool = ALL_PARTS.filter((p) => p !== correct)
  // Elegir 2 al azar
  const shuffled = pool.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 2)
}

function makeQuestion(id: string, correct: string) {
  const wrong = distractors(correct)
  // Posición aleatoria para la correcta entre las 3 opciones
  const opts = [
    { text: correct, correct: true as const },
    { text: wrong[0] },
    { text: wrong[1] },
  ]
  return {
    id,
    image: correct.toLowerCase(),
    prompt: 'What is this?',
    options: opts,
  }
}

export const grade1BodyPartsPractices: Practice[] = [
  {
    id: 'body-parts',
    title: 'Body Parts',
    description: 'Mirá la imagen y elegí la parte del cuerpo correcta en inglés.',
    emoji: '🦵',
    questions: [
      makeQuestion('bp1', 'EYE'),
      makeQuestion('bp2', 'NOSE'),
      makeQuestion('bp3', 'MOUTH'),
      makeQuestion('bp4', 'EAR'),
      makeQuestion('bp5', 'HAIR'),
      makeQuestion('bp6', 'BODY'),
      makeQuestion('bp7', 'HEAD'),
      makeQuestion('bp8', 'ARM'),
      makeQuestion('bp9', 'HAND'),
      makeQuestion('bp10', 'FINGER'),
      makeQuestion('bp11', 'FOOT'),
      makeQuestion('bp12', 'LEG'),
      makeQuestion('bp13', 'TOE'),
    ],
  },
]

// ----------------------------------------------------------------------------
// SEÑALAR LAS PARTES DEL CUERPO (arrastrar la palabra a la flecha)
//
// Cada flecha nace de un casillero vacío y apunta a una parte del dibujo
// (`fullbody.jpg`). `x`/`y` son el punto señalado, en % del ancho y del alto
// de la IMAGEN. `side` es la columna del casillero y `at` su altura, en % del
// alto del escenario. Los casilleros de cada columna van de arriba hacia abajo
// siguiendo el orden de sus puntos, para que las flechas no se crucen.
// ----------------------------------------------------------------------------

const BODY_HOTSPOTS: Hotspot[] = [
  // Columna izquierda: pelo, mano/dedos y piernas/pies.
  { label: 'HAIR', x: 27, y: 11, side: 'left', at: 6 },
  { label: 'FINGER', x: 12.7, y: 29.8, side: 'left', at: 22 },
  { label: 'HAND', x: 17.2, y: 35.6, side: 'left', at: 34 },
  { label: 'BODY', x: 45.3, y: 52.5, side: 'left', at: 50 },
  { label: 'LEG', x: 37.7, y: 73.9, side: 'left', at: 68 },
  { label: 'FOOT', x: 54.4, y: 91.7, side: 'left', at: 82 },
  { label: 'TOE', x: 30.7, y: 93.5, side: 'left', at: 94 },
  // Columna derecha: la cara y el brazo.
  { label: 'HEAD', x: 46.8, y: 19, side: 'right', at: 8 },
  { label: 'EYE', x: 52.8, y: 23, side: 'right', at: 19 },
  { label: 'EAR', x: 63.5, y: 25.5, side: 'right', at: 30 },
  { label: 'NOSE', x: 42.9, y: 26.3, side: 'right', at: 41 },
  { label: 'MOUTH', x: 45.8, y: 30.7, side: 'right', at: 52 },
  { label: 'ARM', x: 64.1, y: 57, side: 'right', at: 66 },
]

export const grade1BodyLabelPractices: Practice[] = [
  {
    id: 'label-the-body',
    title: 'Señalá las partes del cuerpo',
    description:
      'Arrastrá cada palabra al casillero de su flecha. También podés tocar la palabra y después el casillero.',
    emoji: '🧍',
    questions: [
      {
        id: 'label-body-1',
        kind: 'label',
        prompt: 'Label the body parts',
        explanation:
          'EYE, NOSE, MOUTH, EAR y HAIR están en la cabeza (HEAD). El brazo (ARM) termina en la mano (HAND) y sus dedos (FINGER); la pierna (LEG) termina en el pie (FOOT) y sus dedos (TOE).',
        labelImage: 'fullbody',
        hotspots: BODY_HOTSPOTS,
        bank: ALL_PARTS,
      },
    ],
  },
]
