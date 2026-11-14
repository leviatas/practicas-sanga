import type { Practice, Question } from '../types'

// ============================================================================
// 1er GRADO — Prácticas del Lenguaje — Práctica para el "Alto en el camino
// III": la fotocopia «Misiones de palabras» (9 fichas), misión por misión y
// en el mismo orden (cada práctica tiene `inOrder`).
//  1) Detectives de sonidos: FL, FR, GL, GR, DR.
//  2) El correo de las palabras: BL, PL, CR, CL.
//  3) ¿Una R o dos?
//  4) La W y la X escondidas.
//  5) Un poema con pistas («Un barco diferente»).
//  6) El mapa del poema («La fiesta en el jardín»): título, versos, estrofas.
//  7) Cazadoras de rimas.
//  8) Una imagen, dos oraciones.
//  9) Misión final (repaso cortito).
//
// Lo que en la hoja es "unir con flechas", "rodear", "recortar y pegar" o
// "escribir", acá se resuelve tocando o arrastrando.
//
// Todas las misiones arrancan en MAYÚSCULA (`upper`), como la fotocopia. El
// botón abc/ABC las puede pasar a minúscula, así que ningún ejercicio depende
// de mayúsculas.
// ============================================================================

type Opt = { text: string; correct?: boolean }

function opts(correcta: string, otras: string[]): Opt[] {
  return [{ text: correcta, correct: true }, ...otras.map((text) => ({ text }))]
}

// "Uní con flechas": los dibujos a la izquierda y las palabras, mezcladas, a
// la derecha.
function unir(id: string, prompt: string, pares: [string, string][]): Question {
  return {
    id,
    kind: 'match',
    prompt,
    pairs: pares.map(([emoji, word]) => ({ image: `${id}-${word}`, emoji, word })),
  }
}

// "Completá": el título fijo arriba, el dibujo, la palabra con un hueco (⋯),
// un solo botón de sonido (la palabra) y las letras para elegir, siempre en
// el mismo orden.
function falta(
  id: string,
  title: string,
  emoji: string,
  palabra: string,
  hueco: string,
  correcta: string,
  opciones: string[],
  explanation?: string,
): Question {
  return {
    id,
    title,
    emoji,
    prompt: hueco,
    listen: palabra,
    listenLang: 'es-AR',
    keepOrder: true,
    options: opciones.map((text) => ({ text, correct: text === correcta || undefined })),
    explanation: explanation ?? `Se escribe ${palabra.toUpperCase()}.`,
  }
}

const BUZONES = ['bl', 'pl', 'cr', 'cl']
const R_RR = ['r', 'rr']
const T_BUZON = '¿En qué buzón va? Elegí las letras que faltan.'
const T_R = 'Completá con R o RR'
const T_FINAL = 'Completá con las letras que faltan'

// "Rodeá las dos primeras letras de la palabra".
function empieza(id: string, palabra: string, correcta: string, otras: string[]): Question {
  return {
    id,
    prompt: `¿Con qué dos letras empieza ${palabra.toUpperCase()}?`,
    listen: palabra,
    listenLang: 'es-AR',
    options: opts(correcta, otras),
    explanation: `${palabra.toUpperCase()} empieza con ${correcta.toUpperCase()}.`,
  }
}

// "Marcá la palabra que completa la oración": las opciones van en el hueco.
function completa(
  id: string,
  blank: string,
  choices: string[],
  answer: string,
  explanation: string,
): Question {
  return {
    id,
    prompt: 'Leé y tocá la palabra que completa la oración.',
    blank,
    keepOrder: true,
    options: choices.map((text) => ({ text, correct: text === answer || undefined })),
    explanation,
  }
}

// ------------------------------- Poemas ------------------------------------

const BARCO = {
  listenPoem: true,
  poemTitle: 'Un barco diferente',
  poem: `En un charco de la plaza
flota un barco de papel.
Lo empuja el viento
y un caracol viaja en él.

Cuando sale el sol,
el barco ya no flota.
El caracol se baja
y se esconde en una bota.`,
}

const FIESTA_TITULO = 'La fiesta en el jardín'
const FIESTA_1 = `En el jardín baila un gato
con un sombrero y un zapato.
Llega corriendo un ratón
y trae de regalo un botón.`
const FIESTA_2 = `A la fiesta viene una rana
que se asoma a la ventana.
También se acerca una ardilla
y se sienta en una silla.`
const FIESTA = { listenPoem: true, poemTitle: FIESTA_TITULO, poem: `${FIESTA_1}\n\n${FIESTA_2}` }

const MARIPOSA = {
  listenPoem: true,
  poem: `Una mariposa
voló hasta el jardín.
Se posó sobre una flor
y descansó por fin.`,
}

const PISTA_VERSOS =
  'Un verso es cada renglón del poema. Una estrofa es un grupo de versos.'

function rimaFiesta(id: string, palabra: string, correcta: string, otras: string[]): Question {
  return {
    ...FIESTA,
    id,
    prompt: `Buscá al final de los versos: ¿qué palabra rima con ${palabra.toUpperCase()}?`,
    options: opts(correcta, otras),
    explanation: `${palabra.toUpperCase()} y ${correcta.toUpperCase()} riman: terminan igual.`,
  }
}

export const grade1PdlMisionesPractices: Practice[] = [
  // ==================== MISIÓN 1: DETECTIVES DE SONIDOS =====================
  {
    id: 'mision-1-detectives-de-sonidos',
    title: 'Misión 1: Detectives de sonidos',
    description: 'FL, FR, GL, GR y DR: uní cada dibujo con su palabra y mirá con qué letras empieza.',
    emoji: '🔎',
    inOrder: true,
    upper: true,
    questions: [
      unir('m1a1', 'Nombrá cada dibujo y unilo con su palabra.', [
        ['🌸', 'flor'],
        ['🍓', 'frutilla'],
        ['🎈', 'globo'],
        ['🦗', 'grillo'],
        ['🐉', 'dragón'],
      ]),
      empieza('m1b1', 'globo', 'gl', ['gr', 'go']),
      empieza('m1b2', 'dragón', 'dr', ['gr', 'da']),
      empieza('m1b3', 'flor', 'fl', ['fr', 'fo']),
      empieza('m1b4', 'grillo', 'gr', ['gl', 'gi']),
      empieza('m1b5', 'frutilla', 'fr', ['fl', 'fu']),
      {
        id: 'm1c1',
        emoji: '🎈',
        prompt: '¿Cómo se escribe el nombre de este dibujo?',
        options: opts('globo', ['golobo', 'gobo']),
        explanation: 'GLOBO: la G y la L van juntas.',
      },
      {
        id: 'm1c2',
        emoji: '🐉',
        prompt: '¿Cómo se escribe el nombre de este dibujo?',
        options: opts('dragón', ['daragón', 'dagón']),
        explanation: 'DRAGÓN: la D y la R van juntas.',
      },
    ],
  },

  // ==================== MISIÓN 2: EL CORREO DE LAS PALABRAS =================
  {
    id: 'mision-2-el-correo-de-las-palabras',
    title: 'Misión 2: El correo de las palabras',
    description: 'BL, PL, CR y CL: mirá el dibujo, escuchá la palabra y elegí su buzón.',
    emoji: '📮',
    inOrder: true,
    upper: true,
    questions: [
      falta('m2a1', T_BUZON, '🪶', 'pluma', '⋯ uma', 'pl', BUZONES),
      falta('m2a2', T_BUZON, '🏫', 'clase', '⋯ ase', 'cl', BUZONES),
      falta('m2a3', T_BUZON, '👚', 'blusa', '⋯ usa', 'bl', BUZONES),
      falta('m2a4', T_BUZON, '✝️', 'cruz', '⋯ uz', 'cr', BUZONES),
      falta('m2a5', T_BUZON, '🧴', 'crema', '⋯ ema', 'cr', BUZONES),
      falta('m2a6', T_BUZON, '🧱', 'bloque', '⋯ oque', 'bl', BUZONES),
      falta('m2a7', T_BUZON, '🔨', 'clavo', '⋯ avo', 'cl', BUZONES),
      falta('m2a8', T_BUZON, '🍽️', 'plato', '⋯ ato', 'pl', BUZONES),
    ],
  },

  // ==================== MISIÓN 3: ¿UNA R O DOS? =============================
  {
    id: 'mision-3-una-r-o-dos',
    title: 'Misión 3: ¿Una R o dos?',
    description:
      'Al empezar, la R suena fuerte en RANA. Entre vocales, compará PERA con PERRA.',
    emoji: '🐶',
    inOrder: true,
    upper: true,
    questions: [
      falta('m3a1', T_R, '🐸', 'rana', '⋯ ana', 'r', R_RR,
        'Al empezar la palabra va UNA sola R, aunque suene fuerte: RANA.'),
      falta('m3a2', T_R, '🐶', 'perro', 'pe ⋯ o', 'rr', R_RR,
        'PERRO suena fuerte entre vocales: va con RR.'),
      falta('m3a3', T_R, '🍐', 'pera', 'pe ⋯ a', 'r', R_RR,
        'PERA suena suave: va con una sola R.'),
      falta('m3a4', T_R, '🚗', 'carro', 'ca ⋯ o', 'rr', R_RR,
        'CARRO suena fuerte entre vocales: va con RR.'),
      falta('m3a5', T_R, '🦜', 'loro', 'lo ⋯ o', 'r', R_RR,
        'LORO suena suave: va con una sola R.'),
      falta('m3a6', T_R, '🐭', 'ratón', '⋯ atón', 'r', R_RR,
        'Al empezar la palabra va UNA sola R, aunque suene fuerte: RATÓN.'),
      completa('m3b1', 'El ___ ladra.', ['pero', 'perro'], 'perro',
        'El PERRO ladra: el animal va con RR.'),
      completa('m3b2', 'La ___ es una fruta.', ['perra', 'pera'], 'pera',
        'La PERA es una fruta: suena suave, con una sola R.'),
      completa('m3b3', 'El ___ canta.', ['coro', 'corro'], 'coro',
        'El CORO canta: suena suave, con una sola R. CORRO es de correr.'),
    ],
  },

  // ==================== MISIÓN 4: LA W Y LA X ESCONDIDAS ====================
  {
    id: 'mision-4-la-w-y-la-x',
    title: 'Misión 4: La W y la X escondidas',
    description: 'Leé, encontrá la W y la X, y elegí palabras con cada una.',
    emoji: '🚕',
    inOrder: true,
    upper: true,
    questions: [
      unir('m4a1', 'Uní cada dibujo con su palabra.', [
        ['🥝', 'kiwi'],
        ['🚕', 'taxi'],
        ['🧇', 'waffle'],
        ['🎷', 'saxofón'],
      ]),
      {
        id: 'm4b1',
        kind: 'classify',
        checkOnDrop: true,
        prompt: 'Buscá la letra escondida: ¿la palabra tiene W o tiene X?',
        categories: ['W', 'X'],
        items: [
          { text: 'wifi', category: 'W' },
          { text: 'galaxia', category: 'X' },
          { text: 'sándwich', category: 'W' },
          { text: 'extra', category: 'X' },
        ],
      },
      {
        id: 'm4c1',
        prompt: 'Elegí una palabra con W.',
        options: opts('kiwi', ['taxi', 'galaxia']),
        explanation: 'KIWI tiene W. TAXI y GALAXIA tienen X.',
      },
      {
        id: 'm4c2',
        prompt: 'Elegí una palabra con X.',
        options: opts('saxofón', ['waffle', 'wifi']),
        explanation: 'SAXOFÓN tiene X. WAFFLE y WIFI tienen W.',
      },
      {
        id: 'm4d1',
        emoji: '🗣️',
        prompt:
          'Desafío oral: escuchá y decí dos veces seguidas «Wanda viaja en taxi». Después tocá la palabra que tiene W.',
        listen: 'Wanda viaja en taxi',
        listenLang: 'es-AR',
        options: opts('Wanda', ['viaja', 'taxi']),
        explanation: 'WANDA tiene W. TAXI tiene X y VIAJA va con V.',
      },
    ],
  },

  // ==================== MISIÓN 5: UN POEMA CON PISTAS =======================
  {
    id: 'mision-5-un-poema-con-pistas',
    title: 'Misión 5: Un poema con pistas',
    description:
      'Leé «Un barco diferente» y buscá las pistas. Podés volver al poema cuantas veces quieras.',
    emoji: '⛵',
    inOrder: true,
    upper: true,
    questions: [
      {
        ...BARCO,
        id: 'm5a1',
        prompt: '¿Dónde flota el barco?',
        options: opts('En un charco', ['En el mar', 'En una pileta']),
        explanation: 'La pista está en el primer verso: «En un charco de la plaza».',
      },
      {
        ...BARCO,
        id: 'm5a2',
        prompt: '¿Qué empuja el barco?',
        options: opts('El viento', ['Un remo', 'El caracol']),
        explanation: 'La pista: «Lo empuja el viento».',
      },
      {
        ...BARCO,
        id: 'm5a3',
        prompt: '¿Quién viaja en el barco?',
        options: opts('Un caracol', ['Un sapo', 'Un gato']),
        explanation: 'La pista: «y un caracol viaja en él».',
      },
      {
        ...BARCO,
        id: 'm5b1',
        prompt: '¿Qué verso dice dónde se esconde el caracol?',
        options: opts('y se esconde en una bota.', [
          'El caracol se baja',
          'flota un barco de papel.',
        ]),
        explanation: 'El último verso dice dónde se esconde: en una bota.',
      },
      {
        ...BARCO,
        id: 'm5c1',
        prompt: '¿Cuántas estrofas tiene el poema?',
        keepOrder: true,
        options: [{ text: '1' }, { text: '2', correct: true }, { text: '4' }],
        explanation: 'Tiene 2 estrofas: son los dos grupos de versos, separados por un espacio.',
      },
      {
        ...BARCO,
        id: 'm5c2',
        prompt: 'Contá los versos de la primera estrofa. ¿Cuántos son?',
        keepOrder: true,
        options: [{ text: '2' }, { text: '3' }, { text: '4', correct: true }],
        explanation: 'Cada renglón es un verso: la primera estrofa tiene 4.',
      },
      {
        ...BARCO,
        id: 'm5c3',
        prompt: 'Contá los versos de la segunda estrofa. ¿Cuántos son?',
        keepOrder: true,
        options: [{ text: '2' }, { text: '4', correct: true }, { text: '8' }],
        explanation: 'La segunda estrofa también tiene 4 versos.',
      },
    ],
  },

  // ==================== MISIÓN 6: EL MAPA DEL POEMA =========================
  {
    id: 'mision-6-el-mapa-del-poema',
    title: 'Misión 6: El mapa del poema',
    description: 'Leé «La fiesta en el jardín» y encontrá el título, los versos y las estrofas.',
    emoji: '🗺️',
    inOrder: true,
    upper: true,
    questions: [
      {
        ...FIESTA,
        id: 'm6a1',
        prompt: 'Leé el poema en voz alta. ¿Cuál es su título?',
        options: opts('La fiesta en el jardín', [
          'En el jardín baila un gato',
          'y se sienta en una silla.',
        ]),
        explanation: 'El título es el nombre del poema y va arriba de todo.',
      },
      {
        listenPoem: true,
        poemTitle: FIESTA_TITULO,
        poem: `[${FIESTA_1}]\n\n${FIESTA_2}`,
        id: 'm6b1',
        prompt: 'Lo que está resaltado, ¿qué es?',
        options: opts('Una estrofa', ['Un verso', 'El título']),
        explanation: PISTA_VERSOS,
      },
      {
        listenPoem: true,
        poemTitle: FIESTA_TITULO,
        poem: `${FIESTA_1}\n\n[A la fiesta viene una rana]\nque se asoma a la ventana.\nTambién se acerca una ardilla\ny se sienta en una silla.`,
        id: 'm6b2',
        prompt: 'Lo que está resaltado, ¿qué es?',
        options: opts('Un verso', ['Una estrofa', 'El título']),
        explanation: PISTA_VERSOS,
      },
      {
        ...FIESTA,
        id: 'm6c1',
        prompt: '¿Cuántas estrofas hay?',
        keepOrder: true,
        options: [{ text: '1' }, { text: '2', correct: true }, { text: '8' }],
        explanation: `Hay 2 estrofas. ${PISTA_VERSOS}`,
      },
      {
        ...FIESTA,
        id: 'm6d1',
        prompt: '¿Cuántos versos hay en la primera estrofa?',
        keepOrder: true,
        options: [{ text: '2' }, { text: '3' }, { text: '4', correct: true }],
        explanation: `Hay 4 versos. ${PISTA_VERSOS}`,
      },
      {
        ...FIESTA,
        id: 'm6d2',
        prompt: '¿Cuántos versos hay en la segunda estrofa?',
        keepOrder: true,
        options: [{ text: '2' }, { text: '4', correct: true }, { text: '8' }],
        explanation: `Hay 4 versos. ${PISTA_VERSOS}`,
      },
    ],
  },

  // ==================== MISIÓN 7: CAZADORAS DE RIMAS ========================
  {
    id: 'mision-7-cazadoras-de-rimas',
    title: 'Misión 7: Cazadoras de rimas',
    description: 'Escuchá cómo terminan las palabras y encontrá las que riman.',
    emoji: '🎵',
    inOrder: true,
    upper: true,
    questions: [
      rimaFiesta('m7a1', 'gato', 'zapato', ['sombrero', 'jardín']),
      rimaFiesta('m7a2', 'ratón', 'botón', ['regalo', 'zapato']),
      rimaFiesta('m7a3', 'rana', 'ventana', ['fiesta', 'silla']),
      rimaFiesta('m7a4', 'ardilla', 'silla', ['ventana', 'rana']),
      {
        id: 'm7b1',
        kind: 'drag',
        prompt: 'Llevá a cada hueco la palabra que hace rimar el par. Sobran dos tarjetas.',
        segments: [
          'En el charco salta un sapo.\nPara secarse pide un ',
          '.\n\nSopla fuerte el viento.\nYo me siento y leo un ',
          '.',
        ],
        blanks: ['trapo', 'cuento'],
        bank: ['libro', 'trapo', 'cuento', 'globo'],
        explanation: 'SAPO rima con TRAPO, y VIENTO rima con CUENTO.',
      },
      {
        id: 'm7c1',
        emoji: '📖',
        prompt:
          'Abrí «Don Sueño» en la página 119 del libro. En la última estrofa, ¿qué palabra rima con RATITO?',
        options: opts('solito', ['sueño', 'ratón']),
        explanation: 'RATITO y SOLITO riman: las dos terminan en «ITO». Decilas juntas.',
      },
    ],
  },

  // ==================== MISIÓN 8: UNA IMAGEN, DOS ORACIONES =================
  {
    id: 'mision-8-una-imagen-dos-oraciones',
    title: 'Misión 8: Una imagen, dos oraciones',
    description: 'Mirá el dibujo, contá en voz alta qué pasa y armá las oraciones.',
    emoji: '✏️',
    inOrder: true,
    upper: true,
    questions: [
      {
        id: 'm8a1',
        kind: 'sentence-mix',
        image: 'pdl-nena-riega-flores',
        prompt: 'Mirá el dibujo y armá tres oraciones con las fichas.',
        sentences: [
          ['La nena', 'riega', 'las flores'],
          ['El perro', 'ladra'],
          ['La pelota', 'rueda'],
        ],
      },
      {
        id: 'm8c1',
        image: 'pdl-nena-riega-flores',
        prompt: '¿Qué oración cuenta algo que se ve en el dibujo?',
        options: opts('La pelota está al lado del banco.', [
          'La nena juega con la pelota.',
          'El perro duerme en el banco.',
        ]),
      },
      {
        id: 'm8d1',
        prompt: 'Releé y revisá los espacios: ¿cuál está bien escrita?',
        options: opts('La nena riega las flores.', [
          'Lanenariegalasflores.',
          'La nenariega lasflores.',
        ]),
        explanation: 'Entre palabra y palabra va un espacio.',
      },
      {
        id: 'm8d2',
        prompt: 'Releé y revisá: ¿cuál está completa y termina con punto?',
        options: opts('El perro mira las flores.', [
          'El perro mira las',
          'El perro mira las flores',
        ]),
        explanation: 'La oración tiene que estar completa y terminar con un punto final.',
      },
    ],
  },

  // ==================== MISIÓN 9: MISIÓN FINAL ==============================
  {
    id: 'mision-9-mision-final',
    title: 'Misión final',
    description: 'Repaso cortito de todo. ¡Probá hacerlo sin ayuda!',
    emoji: '🚀',
    inOrder: true,
    upper: true,
    questions: [
      falta('m9a1', T_FINAL, '🦗', 'grillo', '⋯ illo', 'gr', ['cl', 'gr', 'rr']),
      falta('m9a2', T_FINAL, '🔨', 'clavo', '⋯ avo', 'cl', ['cl', 'gr', 'x']),
      falta('m9a3', T_FINAL, '🐸', 'rana', '⋯ ana', 'r', ['r', 'rr', 'w']),
      falta('m9a4', T_FINAL, '🐶', 'perro', 'pe ⋯ o', 'rr', ['r', 'rr', 'x']),
      falta('m9a5', T_FINAL, '🥝', 'kiwi', 'ki ⋯ i', 'w', ['r', 'w', 'x']),
      falta('m9a6', T_FINAL, '🚕', 'taxi', 'ta ⋯ i', 'x', ['rr', 'w', 'x']),
      {
        ...MARIPOSA,
        id: 'm9b1',
        emoji: '🦋',
        prompt: 'Leé el poema. ¿Dónde se posó la mariposa?',
        options: opts('Sobre una flor', ['Sobre un árbol', 'Sobre una piedra']),
        explanation: 'La pista: «Se posó sobre una flor».',
      },
      {
        id: 'm9c1',
        kind: 'sentence',
        emoji: '🚀',
        prompt: 'Mirá el dibujo y armá una oración.',
        columns: [
          { options: ['El cohete', 'El barco', 'El taxi'], answer: 'El cohete' },
          { options: ['vuela', 'nada', 'duerme'], answer: 'vuela' },
          { options: ['entre las estrellas.', 'en el charco.', 'en la cama.'], answer: 'entre las estrellas.' },
        ],
      },
    ],
  },
]
