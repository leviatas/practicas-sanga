import type { Option, Practice, Question } from '../types'

// ============================================================================
// 1er GRADO — Prácticas del Lenguaje (PDL): lectoescritura de sílabas directas
// con las consonantes L, M, S, T y P.
//
// Todo el contenido respeta una sola regla: ninguna palabra ni sílaba usa una
// consonante fuera de L, M, S, T, P (las que se están trabajando en clase).
//
// Cuatro prácticas, de lo auditivo a lo escrito:
//  1) Sílabas mezcladas — se escuchan (nunca se ven escritas) y hay que
//     tocar el cartel correcto entre 8, revueltos y con todas las
//     consonantes. (kind 'listen-tap')
//  2) Completá la palabra — un dibujo arriba, la palabra con una sílaba ya
//     escrita y otra por elegir entre dos opciones. (kind 'choice')
//  3) Elegí la palabra correcta — un dibujo arriba y dos palabras enteras
//     para elegir cuál lo nombra. (kind 'choice')
//  4) Armá la oración — un dibujo arriba y dos oraciones para elegir cuál
//     describe la escena. (kind 'choice')
//
// Todas las consignas se pueden escuchar (botón 🔊) y, donde hay un dibujo,
// también se puede escuchar su nombre (botón 📢 ESCUCHA, en castellano).
// ============================================================================

// Arma las opciones de una tanda de sílabas para 'listen-tap': cada pregunta
// de la tanda comparte el mismo cartel de `syllables`, cambiando cuál es la
// correcta.
function listenTapRound(idPrefix: string, syllables: string[]): Question[] {
  return syllables.map((target, i) => ({
    id: `${idPrefix}${i + 1}`,
    kind: 'listen-tap',
    prompt: 'Escuchá con atención y tocá la sílaba que se dijo.',
    options: syllables.map((s): Option => ({ text: s, correct: s === target })),
  }))
}

export const grade1PdlPractices: Practice[] = [
  // ========================= 1. SÍLABAS MEZCLADAS ===========================
  {
    id: 'silabas-mezcladas',
    title: 'Sílabas mezcladas: L, M, S, T y P',
    description:
      'Escuchá la sílaba y tocá el cartel correcto entre ocho, revueltos y sin orden.',
    emoji: '👂',
    questions: [
      ...listenTapRound('sm1-', ['li', 'pa', 'su', 'me', 'to', 'sa', 'pu', 'le', 'mi']),
      ...listenTapRound('sm2-', ['mo', 'ta', 'si', 'lu', 'pe', 'tu', 'ma', 'lo']),
      ...listenTapRound('sm3-', ['pi', 'se', 'ti', 'mu', 'la', 'so', 'te', 'po']),
    ],
  },

  // ========================= 2. COMPLETÁ LA PALABRA =========================
  {
    id: 'completar-palabra',
    title: 'Completá la palabra',
    description: 'Mirá el dibujo y elegí la sílaba que falta.',
    emoji: '🧩',
    questions: [
      { id: 'cp1', emoji: '🦆', prompt: '¿Qué sílaba falta: PA + ⋯?',
        listen: 'pato', listenLang: 'es-AR',
        options: [{ text: 'to', correct: true }, { text: 'mo' }],
        explanation: 'PATO se separa en PA-TO.' },
      { id: 'cp2', emoji: '🐸', prompt: '¿Qué sílaba falta: ⋯ + PO?',
        listen: 'sapo', listenLang: 'es-AR',
        options: [{ text: 'sa', correct: true }, { text: 'ta' }],
        explanation: 'SAPO se separa en SA-PO.' },
      { id: 'cp3', emoji: '🍲', prompt: '¿Qué sílaba falta: SO + ⋯?',
        listen: 'sopa', listenLang: 'es-AR',
        options: [{ text: 'pa', correct: true }, { text: 'ta' }],
        explanation: 'SOPA se separa en SO-PA.' },
      { id: 'cp4', emoji: '🪑', prompt: '¿Qué sílaba falta: ⋯ + SA?',
        listen: 'mesa', listenLang: 'es-AR',
        options: [{ text: 'me', correct: true }, { text: 'se' }],
        explanation: 'MESA se separa en ME-SA.' },
      { id: 'cp5', emoji: '🗺️', prompt: '¿Qué sílaba falta: MA + ⋯?',
        listen: 'mapa', listenLang: 'es-AR',
        options: [{ text: 'pa', correct: true }, { text: 'ta' }],
        explanation: 'MAPA se separa en MA-PA.' },
      { id: 'cp6', emoji: '🔍', prompt: '¿Qué sílaba falta: ⋯ + PA?',
        listen: 'lupa', listenLang: 'es-AR',
        options: [{ text: 'lu', correct: true }, { text: 'su' }],
        explanation: 'LUPA se separa en LU-PA.' },
      { id: 'cp7', emoji: '🥫', prompt: '¿Qué sílaba falta: LA + ⋯?',
        listen: 'lata', listenLang: 'es-AR',
        options: [{ text: 'ta', correct: true }, { text: 'ma' }],
        explanation: 'LATA se separa en LA-TA.' },
      { id: 'cp8', emoji: '🍄', prompt: '¿Qué sílaba falta: ⋯ + TA?',
        listen: 'seta', listenLang: 'es-AR',
        options: [{ text: 'se', correct: true }, { text: 'me' }],
        explanation: 'SETA se separa en SE-TA.' },
      { id: 'cp9', emoji: '🧵', prompt: '¿Qué sílaba falta: TE + ⋯?',
        listen: 'tela', listenLang: 'es-AR',
        options: [{ text: 'la', correct: true }, { text: 'sa' }],
        explanation: 'TELA se separa en TE-LA.' },
      { id: 'cp10', emoji: '🏍️', prompt: '¿Qué sílaba falta: ⋯ + TO?',
        listen: 'moto', listenLang: 'es-AR',
        options: [{ text: 'mo', correct: true }, { text: 'so' }],
        explanation: 'MOTO se separa en MO-TO.' },
      { id: 'cp11', emoji: '👋', prompt: '¿Qué sílaba falta: HO + ⋯?',
        listen: 'hola', listenLang: 'es-AR',
        options: [{ text: 'la', correct: true }, { text: 'pa' }],
        explanation: 'HOLA se separa en HO-LA.' },
      { id: 'cp12', emoji: '🐻', prompt: '¿Qué sílaba falta: O + ⋯?',
        listen: 'oso', listenLang: 'es-AR',
        options: [{ text: 'so', correct: true }, { text: 'to' }],
        explanation: 'OSO se separa en O-SO. Empieza con una vocal sola.' },
      { id: 'cp13', emoji: '🌊', prompt: '¿Qué sílaba falta: O + ⋯?',
        listen: 'ola', listenLang: 'es-AR',
        options: [{ text: 'la', correct: true }, { text: 'ma' }],
        explanation: 'OLA se separa en O-LA. Empieza con una vocal sola.' },
      { id: 'cp14', emoji: '🪽', prompt: '¿Qué sílaba falta: A + ⋯?',
        listen: 'ala', listenLang: 'es-AR',
        options: [{ text: 'la', correct: true }, { text: 'ta' }],
        explanation: 'ALA se separa en A-LA. Empieza con una vocal sola.' },
    ],
  },

  // ========================= 3. ELEGÍ LA PALABRA CORRECTA ===================
  {
    id: 'elegir-palabra',
    title: 'Elegí la palabra correcta',
    description: 'Mirá el dibujo y elegí cuál de las dos palabras lo nombra.',
    emoji: '✅',
    questions: [
      { id: 'ep1', emoji: '🦆', prompt: '¿Cómo se llama este dibujo?',
        listen: 'pato', listenLang: 'es-AR',
        options: [{ text: 'pato', correct: true }, { text: 'tapa' }] },
      { id: 'ep2', emoji: '🐸', prompt: '¿Cómo se llama este dibujo?',
        listen: 'sapo', listenLang: 'es-AR',
        options: [{ text: 'sapo', correct: true }, { text: 'paso' }] },
      { id: 'ep3', emoji: '🍲', prompt: '¿Cómo se llama este dibujo?',
        listen: 'sopa', listenLang: 'es-AR',
        options: [{ text: 'sopa', correct: true }, { text: 'masa' }] },
      { id: 'ep4', emoji: '🪑', prompt: '¿Cómo se llama este dibujo?',
        listen: 'mesa', listenLang: 'es-AR',
        options: [{ text: 'mesa', correct: true }, { text: 'masa' }] },
      { id: 'ep5', emoji: '🗺️', prompt: '¿Cómo se llama este dibujo?',
        listen: 'mapa', listenLang: 'es-AR',
        options: [{ text: 'mapa', correct: true }, { text: 'papa' }] },
      { id: 'ep6', emoji: '🥔', prompt: '¿Cómo se llama este dibujo?',
        listen: 'papa', listenLang: 'es-AR',
        options: [{ text: 'papa', correct: true }, { text: 'mapa' }] },
      { id: 'ep7', emoji: '🏍️', prompt: '¿Cómo se llama este dibujo?',
        listen: 'moto', listenLang: 'es-AR',
        options: [{ text: 'moto', correct: true }, { text: 'tomo' }] },
      { id: 'ep8', emoji: '🔍', prompt: '¿Cómo se llama este dibujo?',
        listen: 'lupa', listenLang: 'es-AR',
        options: [{ text: 'lupa', correct: true }, { text: 'pala' }] },
      { id: 'ep9', emoji: '🥫', prompt: '¿Cómo se llama este dibujo?',
        listen: 'lata', listenLang: 'es-AR',
        options: [{ text: 'lata', correct: true }, { text: 'tala' }] },
      { id: 'ep10', emoji: '🍄', prompt: '¿Cómo se llama este dibujo?',
        listen: 'seta', listenLang: 'es-AR',
        options: [{ text: 'seta', correct: true }, { text: 'esta' }] },
      { id: 'ep11', emoji: '👋', prompt: '¿Cómo se llama este dibujo?',
        listen: 'hola', listenLang: 'es-AR',
        options: [{ text: 'hola', correct: true }, { text: 'sola' }] },
      { id: 'ep12', emoji: '🐻', prompt: '¿Cómo se llama este dibujo?',
        listen: 'oso', listenLang: 'es-AR',
        options: [{ text: 'oso', correct: true }, { text: 'uso' }] },
      { id: 'ep13', emoji: '🌊', prompt: '¿Cómo se llama este dibujo?',
        listen: 'ola', listenLang: 'es-AR',
        options: [{ text: 'ola', correct: true }, { text: 'ala' }] },
      { id: 'ep14', emoji: '🪽', prompt: '¿Cómo se llama este dibujo?',
        listen: 'ala', listenLang: 'es-AR',
        options: [{ text: 'ala', correct: true }, { text: 'ola' }] },
    ],
  },

  // ========================= 4. ARMÁ LA ORACIÓN =============================
  {
    id: 'armar-oracion',
    title: 'Armá la oración',
    description: 'Mirá el dibujo y elegí la oración que lo describe.',
    emoji: '📖',
    questions: [
      { id: 'ao1', emoji: '🦆🍲', prompt: '¿Qué oración describe el dibujo?',
        listen: 'El pato toma sopa.', listenLang: 'es-AR',
        options: [
          { text: 'El pato toma sopa.', correct: true },
          { text: 'El pato toma mate.' },
        ] },
      { id: 'ao2', emoji: '👩🏍️', prompt: '¿Qué oración describe el dibujo?',
        listen: 'Mama usa la moto.', listenLang: 'es-AR',
        options: [
          { text: 'Mama usa la moto.', correct: true },
          { text: 'Mama toma sopa.' },
        ] },
      { id: 'ao3', emoji: '👧🧉', prompt: '¿Qué oración describe el dibujo?',
        listen: 'Lila toma mate.', listenLang: 'es-AR',
        options: [
          { text: 'Lila toma mate.', correct: true },
          { text: 'Lila usa la moto.' },
        ] },
    ],
  },
]
