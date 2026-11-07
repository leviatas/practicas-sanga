import type { Practice, Question } from '../types'

// ============================================================================
// 1er GRADO — Prácticas del Lenguaje — "Alto en el camino III"
// (semana del 16 de noviembre). Temario:
//  1) Grupos consonánticos: FL, FR, GL, GR, DR, BL, PL, CR y CL.
//  2) RR / R, W y X.
//  3) Poesía: comprensión lectora.
//  4) Escribir oraciones a partir de una imagen.
// (Libro "Clic y Leo", unidades 6 y 8, y el cuaderno.)
//
// Ojo: en PDL de 1er grado el botón abc/ABC pasa TODO a minúscula o a
// MAYÚSCULA, así que ningún ejercicio depende de mayúsculas.
// ============================================================================

// Pregunta de "¿qué falta?": un dibujo arriba, la palabra con un hueco (⋯) y
// las opciones de letras. El nombre del dibujo se puede escuchar.
function falta(
  id: string,
  emoji: string,
  palabra: string,
  hueco: string,
  correcta: string,
  otras: string[],
  explanation?: string,
): Question {
  return {
    id,
    emoji,
    prompt: `¿Qué falta? ${hueco}`,
    listen: palabra,
    listenLang: 'es-AR',
    options: [{ text: correcta, correct: true }, ...otras.map((text) => ({ text }))],
    explanation: explanation ?? `Se escribe ${palabra.toUpperCase()}.`,
  }
}

// Pregunta de "¿cuál está bien escrita?" con el dibujo arriba.
function bienEscrita(
  id: string,
  emoji: string,
  correcta: string,
  otras: string[],
): Question {
  return {
    id,
    emoji,
    prompt: '¿Cuál está bien escrita?',
    listen: correcta,
    listenLang: 'es-AR',
    options: [{ text: correcta, correct: true }, ...otras.map((text) => ({ text }))],
  }
}

export const grade1PdlAlto3Practices: Practice[] = [
  // ==================== 1. GRUPOS CONSONÁNTICOS: COMPLETAR ==================
  {
    id: 'grupos-completar',
    title: 'Grupos consonánticos: completá la palabra',
    description:
      'FL, FR, GL, GR, DR, BL, PL, CR y CL: mirá el dibujo y elegí el grupo que falta.',
    emoji: '🧩',
    questions: [
      falta('gc1', '🌸', 'flor', '⋯ or', 'fl', ['fr']),
      falta('gc2', '🍓', 'frutilla', '⋯ utilla', 'fr', ['fl']),
      falta('gc3', '🏹', 'flecha', '⋯ echa', 'fl', ['fr']),
      falta('gc4', '🫙', 'frasco', '⋯ asco', 'fr', ['fl']),
      falta('gc5', '🎈', 'globo', '⋯ obo', 'gl', ['gr']),
      falta('gc6', '🦗', 'grillo', '⋯ illo', 'gr', ['gl']),
      falta('gc7', '🏗️', 'grúa', '⋯ úa', 'gr', ['gl']),
      falta('gc8', '🐉', 'dragón', '⋯ agón', 'dr', ['br']),
      falta('gc9', '🧱', 'ladrillo', 'la ⋯ illo', 'dr', ['bl']),
      falta('gc10', '🐊', 'cocodrilo', 'coco ⋯ ilo', 'dr', ['cl']),
      falta('gc11', '👚', 'blusa', '⋯ usa', 'bl', ['pl']),
      falta('gc12', '🍽️', 'plato', '⋯ ato', 'pl', ['bl']),
      falta('gc13', '🪶', 'pluma', '⋯ uma', 'pl', ['bl']),
      falta('gc14', '🏖️', 'playa', '⋯ aya', 'pl', ['bl']),
      falta('gc15', '🖍️', 'crayón', '⋯ ayón', 'cr', ['cl']),
      falta('gc16', '🦀', 'cangrejo', 'can ⋯ ejo', 'gr', ['gl']),
      falta('gc17', '📎', 'clip', '⋯ ip', 'cl', ['cr']),
      falta('gc18', '🚲', 'bicicleta', 'bici ⋯ eta', 'cl', ['cr']),
    ],
  },

  // ==================== 2. GRUPOS CONSONÁNTICOS: CLASIFICAR =================
  {
    id: 'grupos-clasificar',
    title: 'Grupos consonánticos: ¿con L o con R?',
    description: 'Arrastrá cada palabra a la caja de su grupo.',
    emoji: '🗂️',
    questions: [
      {
        id: 'gk1',
        kind: 'classify',
        checkOnDrop: true,
        prompt: 'Llevá cada palabra a su caja: ¿FL o FR?',
        categories: ['FL', 'FR'],
        items: [
          { text: 'flor', category: 'FL' },
          { text: 'flan', category: 'FL' },
          { text: 'flecha', category: 'FL' },
          { text: 'fruta', category: 'FR' },
          { text: 'frío', category: 'FR' },
          { text: 'fresa', category: 'FR' },
        ],
      },
      {
        id: 'gk2',
        kind: 'classify',
        checkOnDrop: true,
        prompt: 'Llevá cada palabra a su caja: ¿GL o GR?',
        categories: ['GL', 'GR'],
        items: [
          { text: 'globo', category: 'GL' },
          { text: 'iglú', category: 'GL' },
          { text: 'regla', category: 'GL' },
          { text: 'grillo', category: 'GR' },
          { text: 'gris', category: 'GR' },
          { text: 'tigre', category: 'GR' },
        ],
      },
      {
        id: 'gk3',
        kind: 'classify',
        checkOnDrop: true,
        prompt: 'Llevá cada palabra a su caja: ¿BL o PL?',
        categories: ['BL', 'PL'],
        items: [
          { text: 'blusa', category: 'BL' },
          { text: 'tabla', category: 'BL' },
          { text: 'blanco', category: 'BL' },
          { text: 'plato', category: 'PL' },
          { text: 'pluma', category: 'PL' },
          { text: 'planta', category: 'PL' },
        ],
      },
      {
        id: 'gk4',
        kind: 'classify',
        checkOnDrop: true,
        prompt: 'Llevá cada palabra a su caja: ¿CR o CL?',
        categories: ['CR', 'CL'],
        items: [
          { text: 'crema', category: 'CR' },
          { text: 'cruz', category: 'CR' },
          { text: 'crayón', category: 'CR' },
          { text: 'clavo', category: 'CL' },
          { text: 'clase', category: 'CL' },
          { text: 'clip', category: 'CL' },
        ],
      },
      {
        id: 'gk5',
        kind: 'classify',
        checkOnDrop: true,
        prompt: 'Llevá cada palabra a su caja: ¿DR, GR o PL?',
        categories: ['DR', 'GR', 'PL'],
        items: [
          { text: 'dragón', category: 'DR' },
          { text: 'piedra', category: 'DR' },
          { text: 'madre', category: 'DR' },
          { text: 'grande', category: 'GR' },
          { text: 'grúa', category: 'GR' },
          { text: 'playa', category: 'PL' },
          { text: 'plaza', category: 'PL' },
        ],
      },
    ],
  },

  // ==================== 3. GRUPOS CONSONÁNTICOS: BIEN ESCRITA ===============
  {
    id: 'grupos-bien-escrita',
    title: 'Grupos consonánticos: ¿cuál está bien escrita?',
    description:
      'Las dos letras del grupo van JUNTAS, sin una vocal en el medio. Elegí la palabra bien escrita.',
    emoji: '✅',
    questions: [
      bienEscrita('gb1', '🎈', 'globo', ['golobo', 'gobo']),
      bienEscrita('gb2', '🌸', 'flor', ['folor', 'for']),
      bienEscrita('gb3', '🍽️', 'plato', ['palato', 'pato']),
      bienEscrita('gb4', '🐉', 'dragón', ['daragón', 'dagón']),
      bienEscrita('gb5', '🦗', 'grillo', ['garillo', 'gillo']),
      bienEscrita('gb6', '👚', 'blusa', ['bulusa', 'busa']),
      bienEscrita('gb7', '🖍️', 'crayón', ['carayón', 'cayón']),
      bienEscrita('gb8', '🍓', 'frutilla', ['furutilla', 'futilla']),
      bienEscrita('gb9', '📎', 'clip', ['culip', 'cip']),
      bienEscrita('gb10', '🪴', 'planta', ['palanta', 'panta']),
    ],
  },

  // ============================ 4. R O RR ===================================
  {
    id: 'r-rr',
    title: 'R o RR',
    description:
      'Entre vocales, la R suave va sola (pera) y la fuerte va doble (perro). Al principio de la palabra, siempre una sola R (rata).',
    emoji: '🐶',
    questions: [
      falta('rr1', '🐶', 'perro', 'pe ⋯ o', 'rr', ['r'],
        'PERRO suena fuerte entre vocales: va con RR.'),
      falta('rr2', '🍐', 'pera', 'pe ⋯ a', 'r', ['rr'],
        'PERA suena suave: va con una sola R.'),
      falta('rr3', '🦜', 'loro', 'lo ⋯ o', 'r', ['rr'],
        'LORO suena suave: va con una sola R.'),
      falta('rr4', '🦊', 'zorro', 'zo ⋯ o', 'rr', ['r'],
        'ZORRO suena fuerte entre vocales: va con RR.'),
      falta('rr5', '🐭', 'ratón', '⋯ atón', 'r', ['rr'],
        'Al principio de la palabra va siempre UNA sola R, aunque suene fuerte.'),
      falta('rr6', '🌹', 'rosa', '⋯ osa', 'r', ['rr'],
        'Al principio de la palabra va siempre UNA sola R, aunque suene fuerte.'),
      falta('rr7', '🧢', 'gorra', 'go ⋯ a', 'rr', ['r'],
        'GORRA suena fuerte entre vocales: va con RR.'),
      falta('rr8', '🎸', 'guitarra', 'guita ⋯ a', 'rr', ['r'],
        'GUITARRA suena fuerte entre vocales: va con RR.'),
      falta('rr9', '🐂', 'toro', 'to ⋯ o', 'r', ['rr'],
        'TORO suena suave: va con una sola R.'),
      falta('rr10', '🫏', 'burro', 'bu ⋯ o', 'rr', ['r'],
        'BURRO suena fuerte entre vocales: va con RR.'),
      falta('rr11', '👑', 'corona', 'co ⋯ ona', 'r', ['rr'],
        'CORONA suena suave: va con una sola R.'),
      falta('rr12', '🐸', 'rana', '⋯ ana', 'r', ['rr'],
        'Al principio de la palabra va siempre UNA sola R.'),
      falta('rr13', '🦋', 'mariposa', 'ma ⋯ iposa', 'r', ['rr'],
        'MARIPOSA suena suave: va con una sola R.'),
      falta('rr14', '🌍', 'tierra', 'tie ⋯ a', 'rr', ['r'],
        'TIERRA suena fuerte entre vocales: va con RR.'),
      {
        id: 'rr15',
        kind: 'classify',
        checkOnDrop: true,
        prompt: '¿Suena suave o suena fuerte? Llevá cada palabra a su caja.',
        categories: ['SUAVE', 'FUERTE'],
        items: [
          { text: 'pera', category: 'SUAVE' },
          { text: 'loro', category: 'SUAVE' },
          { text: 'cara', category: 'SUAVE' },
          { text: 'perro', category: 'FUERTE' },
          { text: 'rata', category: 'FUERTE' },
          { text: 'carro', category: 'FUERTE' },
        ],
      },
      {
        id: 'rr16',
        emoji: '🐶',
        prompt: '¿Cuál es el animal que ladra?',
        listen: 'perro',
        listenLang: 'es-AR',
        options: [{ text: 'perro', correct: true }, { text: 'pero' }],
        explanation: 'PERRO (el animal) va con RR. PERO, con una sola R, es otra palabra.',
      },
      {
        id: 'rr17',
        emoji: '🛒',
        prompt: '¿Cuál es el carrito del súper?',
        listen: 'carro',
        listenLang: 'es-AR',
        options: [{ text: 'carro', correct: true }, { text: 'caro' }],
        explanation: 'CARRO va con RR. CARO, con una R, quiere decir que cuesta mucha plata.',
      },
    ],
  },

  // ============================ 5. W Y X ====================================
  {
    id: 'w-x',
    title: 'La W y la X',
    description: 'Palabras con W (kiwi, wafle) y con X (taxi, saxofón).',
    emoji: '🚕',
    questions: [
      falta('wx1', '🥝', 'kiwi', 'ki ⋯ i', 'w', ['b', 'x']),
      falta('wx2', '🧇', 'wafle', '⋯ afle', 'w', ['g', 'x']),
      falta('wx3', '🥪', 'sándwich', 'sánd ⋯ ich', 'w', ['x', 'v']),
      falta('wx4', '📶', 'wifi', '⋯ ifi', 'w', ['x', 'u']),
      falta('wx5', '🚕', 'taxi', 'ta ⋯ i', 'x', ['s', 'w']),
      falta('wx6', '🎷', 'saxofón', 'sa ⋯ ofón', 'x', ['s', 'w']),
      falta('wx7', '🥊', 'boxeo', 'bo ⋯ eo', 'x', ['s', 'w']),
      falta('wx8', '📝', 'examen', 'e ⋯ amen', 'x', ['s', 'w']),
      falta('wx9', '🎵', 'xilofón', '⋯ ilofón', 'x', ['s', 'w']),
      falta('wx10', '🏆', 'éxito', 'é ⋯ ito', 'x', ['s', 'w']),
      {
        id: 'wx11',
        kind: 'classify',
        checkOnDrop: true,
        prompt: '¿Tiene W o tiene X? Llevá cada palabra a su caja.',
        categories: ['W', 'X'],
        items: [
          { text: 'kiwi', category: 'W' },
          { text: 'wafle', category: 'W' },
          { text: 'Walter', category: 'W' },
          { text: 'taxi', category: 'X' },
          { text: 'saxofón', category: 'X' },
          { text: 'examen', category: 'X' },
        ],
      },
    ],
  },

  // ============================ 6. POESÍA ===================================
  {
    id: 'poesia',
    title: 'Poesía: leo y comprendo',
    description:
      'Leé (o escuchá) cada poesía y respondé las preguntas: quién aparece, qué hace, cuántas estrofas tiene y qué palabras riman.',
    emoji: '📜',
    questions: [
      // ---- Poesía 1: El grillo Gregorio ----
      ...poesiaGrillo(),
      // ---- Poesía 2: Mi perro Ramón ----
      ...poesiaPerro(),
      // ---- Poesía 3: El dragón Florindo ----
      ...poesiaDragon(),
    ],
  },

  // ==================== 7. ORACIONES A PARTIR DE UNA IMAGEN ================
  {
    id: 'oraciones-imagen',
    title: 'Escribí oraciones a partir de una imagen',
    description:
      'Mirá el dibujo y armá la oración que lo cuenta: quién es, qué hace y dónde o qué.',
    emoji: '✏️',
    questions: [
      {
        id: 'oi1',
        kind: 'sentence',
        emoji: '🐶🦴',
        prompt: 'Mirá el dibujo y armá la oración.',
        columns: [
          { options: ['El perro', 'El gato', 'La rana'], answer: 'El perro' },
          { options: ['come', 'lava', 'pinta'], answer: 'come' },
          { options: ['un hueso.', 'una flor.', 'un plato.'], answer: 'un hueso.' },
        ],
      },
      {
        id: 'oi2',
        kind: 'sentence',
        emoji: '👧🎈',
        prompt: 'Mirá el dibujo y armá la oración.',
        columns: [
          { options: ['La nena', 'El abuelo', 'El dragón'], answer: 'La nena' },
          { options: ['tiene', 'come', 'lava'], answer: 'tiene' },
          { options: ['un globo.', 'un clavo.', 'una blusa.'], answer: 'un globo.' },
        ],
      },
      {
        id: 'oi3',
        kind: 'sentence',
        emoji: '🐸🌊',
        prompt: 'Mirá el dibujo y armá la oración.',
        columns: [
          { options: ['La rana', 'La vaca', 'El tigre'], answer: 'La rana' },
          { options: ['nada', 'vuela', 'duerme'], answer: 'nada' },
          { options: ['en el agua.', 'en la cama.', 'en el plato.'], answer: 'en el agua.' },
        ],
      },
      {
        id: 'oi4',
        kind: 'sentence',
        emoji: '👦🚲',
        prompt: 'Mirá el dibujo y armá la oración.',
        columns: [
          { options: ['El nene', 'La rata', 'El loro'], answer: 'El nene' },
          { options: ['anda en', 'come', 'lava'], answer: 'anda en' },
          { options: ['bicicleta.', 'frutilla.', 'pluma.'], answer: 'bicicleta.' },
        ],
      },
      {
        id: 'oi5',
        kind: 'sentence',
        emoji: '🐭🧀',
        prompt: 'Mirá el dibujo y armá la oración.',
        columns: [
          { options: ['El ratón', 'El perro', 'El grillo'], answer: 'El ratón' },
          { options: ['come', 'canta', 'salta'], answer: 'come' },
          { options: ['queso.', 'flan.', 'pan.'], answer: 'queso.' },
        ],
      },
      {
        id: 'oi6',
        emoji: '🦜🌳',
        prompt: '¿Qué oración cuenta lo que pasa en el dibujo?',
        options: [
          { text: 'El loro está en el árbol.', correct: true },
          { text: 'El loro está en el agua.' },
          { text: 'El perro está en el árbol.' },
        ],
      },
      {
        id: 'oi7',
        emoji: '👩‍🍳🍮',
        prompt: '¿Qué oración cuenta lo que pasa en el dibujo?',
        options: [
          { text: 'Mamá prepara un flan.', correct: true },
          { text: 'Mamá maneja un taxi.' },
          { text: 'Mamá toca la guitarra.' },
        ],
      },
      {
        id: 'oi8',
        emoji: '🐉🔥',
        prompt: '¿Qué oración está completa?',
        options: [
          { text: 'El dragón echa fuego.', correct: true },
          { text: 'El dragón.' },
          { text: 'echa fuego' },
        ],
        explanation:
          'Una oración dice QUIÉN es y QUÉ HACE, y termina con un punto: «El dragón echa fuego.»',
      },
      {
        id: 'oi9',
        emoji: '🐊🏖️',
        prompt: '¿Qué oración está completa?',
        options: [
          { text: 'El cocodrilo duerme en la playa.', correct: true },
          { text: 'duerme en la playa' },
          { text: 'El cocodrilo en la.' },
        ],
        explanation:
          'Una oración dice QUIÉN es y QUÉ HACE, y termina con un punto.',
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Poesías (originales, escritas para practicar). Cada una tiene su texto en
// `poem` y se repite en todas sus preguntas para poder releerla.
// ---------------------------------------------------------------------------

function poesiaGrillo(): Question[] {
  const poem = `El grillo Gregorio
toca el violín,
salta en la hierba
de mi jardín.

Con su sombrero
de color gris,
canta de noche
y es muy feliz.`
  const base = { poem, poemTitle: 'El grillo Gregorio' }
  return [
    { ...base, id: 'pg1', prompt: '¿Quién es el protagonista de la poesía?',
      options: [{ text: 'Un grillo', correct: true }, { text: 'Un gato' }, { text: 'Un globo' }] },
    { ...base, id: 'pg2', prompt: '¿Qué instrumento toca Gregorio?',
      options: [{ text: 'El violín', correct: true }, { text: 'La guitarra' }, { text: 'El tambor' }] },
    { ...base, id: 'pg3', prompt: '¿Dónde salta?',
      options: [{ text: 'En la hierba del jardín', correct: true }, { text: 'En la playa' }, { text: 'En la cama' }] },
    { ...base, id: 'pg4', prompt: '¿De qué color es su sombrero?',
      options: [{ text: 'Gris', correct: true }, { text: 'Rojo' }, { text: 'Blanco' }] },
    { ...base, id: 'pg5', prompt: '¿Cuándo canta?',
      options: [{ text: 'De noche', correct: true }, { text: 'De mañana' }, { text: 'Al mediodía' }] },
    { ...base, id: 'pg6', prompt: '¿Cuántas estrofas tiene la poesía?',
      keepOrder: true,
      options: [{ text: '1' }, { text: '2', correct: true }, { text: '3' }],
      explanation: 'Tiene 2 estrofas: cada estrofa es un grupo de versos, separado por un espacio.' },
    { id: 'pg7', kind: 'verses', prompt: 'Tocá los dos versos que riman.',
      verses: ['El grillo Gregorio', 'toca el violín,', 'salta en la hierba', 'de mi jardín.'],
      rhyme: [1, 3],
      explanation: 'VIOLÍN y JARDÍN riman: terminan igual, en «ÍN».' },
    { id: 'pg8', prompt: '¿Qué palabra rima con GRIS?',
      options: [{ text: 'feliz', correct: true }, { text: 'noche' }, { text: 'sombrero' }],
      explanation: 'GRIS y FELIZ terminan con el mismo sonido.' },
  ]
}

function poesiaPerro(): Question[] {
  const poem = `Mi perro Ramón
corre y corre sin parar,
persigue a una ratita
que se fue a pasear.

Ladra a la luna,
duerme en el sillón,
¡cómo lo quiero
a mi perro Ramón!`
  const base = { poem, poemTitle: 'Mi perro Ramón' }
  return [
    { ...base, id: 'pp1', prompt: '¿Cómo se llama el perro?',
      options: [{ text: 'Ramón', correct: true }, { text: 'Gregorio' }, { text: 'Florindo' }] },
    { ...base, id: 'pp2', prompt: '¿A quién persigue el perro?',
      options: [{ text: 'A una ratita', correct: true }, { text: 'A un gato' }, { text: 'A un loro' }] },
    { ...base, id: 'pp3', prompt: '¿A qué le ladra?',
      options: [{ text: 'A la luna', correct: true }, { text: 'Al sol' }, { text: 'A la ratita' }] },
    { ...base, id: 'pp4', prompt: '¿Dónde duerme Ramón?',
      options: [{ text: 'En el sillón', correct: true }, { text: 'En la cucha' }, { text: 'En la cama' }] },
    { ...base, id: 'pp5', prompt: '¿Cuántos versos tiene cada estrofa?',
      keepOrder: true,
      options: [{ text: '2' }, { text: '3' }, { text: '4', correct: true }],
      explanation: 'Cada renglón de la poesía es un verso. Cada estrofa tiene 4.' },
    { ...base, id: 'pp6', prompt: 'En la poesía, ¿qué palabra va con RR?',
      options: [{ text: 'perro', correct: true }, { text: 'Ramón' }, { text: 'ratita' }],
      explanation: 'PERRO tiene RR entre vocales. RAMÓN y RATITA empiezan con una sola R.' },
    { id: 'pp7', kind: 'verses', prompt: 'Tocá los dos versos que riman.',
      verses: ['Ladra a la luna,', 'duerme en el sillón,', '¡cómo lo quiero', 'a mi perro Ramón!'],
      rhyme: [1, 3],
      explanation: 'SILLÓN y RAMÓN riman: terminan en «ÓN».' },
  ]
}

function poesiaDragon(): Question[] {
  const poem = `El dragón Florindo
no echa fuego, echa flores,
tiene alas de colores
y es un dragón muy lindo.`
  const base = { poem, poemTitle: 'El dragón Florindo' }
  return [
    { ...base, id: 'pd1', prompt: '¿Qué echa el dragón Florindo?',
      options: [{ text: 'Flores', correct: true }, { text: 'Fuego' }, { text: 'Agua' }] },
    { ...base, id: 'pd2', prompt: '¿Cómo son sus alas?',
      options: [{ text: 'De colores', correct: true }, { text: 'Grises' }, { text: 'Blancas' }] },
    { ...base, id: 'pd3', prompt: '¿Cómo es el dragón?',
      options: [{ text: 'Muy lindo', correct: true }, { text: 'Muy malo' }, { text: 'Muy chiquito' }] },
    { ...base, id: 'pd4', prompt: '¿Cuántas estrofas tiene esta poesía?',
      keepOrder: true,
      options: [{ text: '1', correct: true }, { text: '2' }, { text: '4' }],
      explanation: 'Tiene una sola estrofa de 4 versos.' },
    { ...base, id: 'pd5', prompt: '¿Con qué grupo empieza la palabra FLORES?',
      options: [{ text: 'fl', correct: true }, { text: 'fr' }, { text: 'pl' }] },
    { ...base, id: 'pd6', prompt: '¿Con qué grupo empieza la palabra DRAGÓN?',
      options: [{ text: 'dr', correct: true }, { text: 'gr' }, { text: 'cr' }] },
    { id: 'pd7', kind: 'verses', prompt: 'Tocá los dos versos que riman.',
      verses: ['no echa fuego, echa flores,', 'tiene alas de colores', 'y es un dragón muy lindo.'],
      rhyme: [0, 1],
      explanation: 'FLORES y COLORES riman: terminan en «ORES».' },
  ]
}
