import type { Practice } from '../types'

// ============================================================================
// 1er GRADO — prácticas separadas por tema (Curious Kids 1, unidades 1 y 2).
// Reglas:
//  - Los enunciados y opciones están SIEMPRE en inglés (sin castellano).
//  - Vocabulario: se pregunta con una definición/pista en inglés.
//  - Colores y sentimientos usan un apoyo visual (cuadro de color / cara).
// ============================================================================

export const grade1Practices: Practice[] = [
  // -------------------------------------------------------------- Colores ----
  {
    id: 'colores',
    title: 'Colores',
    description: 'Mirá el color y elegí su nombre en inglés.',
    emoji: '🎨',
    questions: [
      { id: 'c1', prompt: 'What colour is this?', emoji: '🟥',
        options: [{ text: 'red', correct: true }, { text: 'blue' }, { text: 'green' }] },
      { id: 'c2', prompt: 'What colour is this?', emoji: '🟦',
        options: [{ text: 'blue', correct: true }, { text: 'yellow' }, { text: 'black' }] },
      { id: 'c3', prompt: 'What colour is this?', emoji: '🟩',
        options: [{ text: 'green', correct: true }, { text: 'orange' }, { text: 'red' }] },
      { id: 'c4', prompt: 'What colour is this?', emoji: '🟨',
        options: [{ text: 'yellow', correct: true }, { text: 'purple' }, { text: 'brown' }] },
      { id: 'c5', prompt: 'What colour is this?', emoji: '🟪',
        options: [{ text: 'purple', correct: true }, { text: 'pink' }, { text: 'blue' }] },
      { id: 'c6', prompt: 'What colour is this?', emoji: '🟧',
        options: [{ text: 'orange', correct: true }, { text: 'green' }, { text: 'white' }] },
      { id: 'c7', prompt: 'What colour is this?', emoji: '🟫',
        options: [{ text: 'brown', correct: true }, { text: 'black' }, { text: 'pink' }] },
      { id: 'c8', prompt: 'What colour is this?', emoji: '🩵',
        options: [{ text: 'light-blue', correct: true }, { text: 'white' }, { text: 'yellow' }] },
    ],
  },

  // ---------------------------------------------------------- Sentimientos ----
  {
    id: 'sentimientos',
    title: 'Sentimientos',
    description: 'Mirá la cara y elegí cómo se siente, en inglés.',
    emoji: '🙂',
    questions: [
      { id: 'f1', prompt: 'How does he feel?', emoji: '😀',
        options: [{ text: 'happy', correct: true }, { text: 'sad' }, { text: 'angry' }] },
      { id: 'f2', prompt: 'How does he feel?', emoji: '😢',
        options: [{ text: 'sad', correct: true }, { text: 'happy' }, { text: 'surprised' }] },
      { id: 'f3', prompt: 'How does he feel?', emoji: '😠',
        options: [{ text: 'angry', correct: true }, { text: 'calm' }, { text: 'tired' }] },
      { id: 'f4', prompt: 'How does he feel?', emoji: '😲',
        options: [{ text: 'surprised', correct: true }, { text: 'scared' }, { text: 'happy' }] },
      { id: 'f5', prompt: 'How does he feel?', emoji: '😴',
        options: [{ text: 'tired', correct: true }, { text: 'hot' }, { text: 'angry' }] },
      { id: 'f6', prompt: 'How does he feel?', emoji: '😱',
        options: [{ text: 'scared', correct: true }, { text: 'calm' }, { text: 'sad' }] },
      { id: 'f7', prompt: 'How does he feel?', emoji: '🥵',
        options: [{ text: 'hot', correct: true }, { text: 'tired' }, { text: 'surprised' }] },
    ],
  },

  // ----------------------------------------------------- School objects ----
  {
    id: 'objetos',
    title: 'Objetos de la escuela',
    description: 'Leé la pista en inglés y elegí el objeto correcto.',
    emoji: '🎒',
    questions: [
      { id: 'o1', prompt: 'You use this to write.',
        options: [{ text: 'a pencil', correct: true }, { text: 'a schoolbag' }, { text: 'a ruler' }] },
      { id: 'o2', prompt: 'You use this to cut paper.',
        options: [{ text: 'scissors', correct: true }, { text: 'a rubber' }, { text: 'a sharpener' }] },
      { id: 'o3', prompt: 'You use this to rub out a mistake.',
        options: [{ text: 'a rubber', correct: true }, { text: 'a pen' }, { text: 'a ruler' }] },
      { id: 'o4', prompt: 'You carry your books in this.',
        options: [{ text: 'a schoolbag', correct: true }, { text: 'a pencil case' }, { text: 'a marker' }] },
      { id: 'o5', prompt: 'You keep your pens and pencils in this.',
        options: [{ text: 'a pencil case', correct: true }, { text: 'a schoolbag' }, { text: 'a ruler' }] },
      { id: 'o6', prompt: 'You use this to draw a straight line.',
        options: [{ text: 'a ruler', correct: true }, { text: 'a rubber' }, { text: 'scissors' }] },
      { id: 'o7', prompt: 'You use this to make paper stick together.',
        options: [{ text: 'glue', correct: true }, { text: 'a marker' }, { text: 'a sharpener' }] },
    ],
  },

  // -------------------------------------------- School objects (imágenes) ----
  // Reconocimiento de vocabulario: se muestra la foto del objeto (recortada sin
  // la etiqueta) y el alumno elige su nombre en inglés.
  {
    id: 'objetos-imagenes',
    title: 'Objetos de la escuela (con fotos)',
    description: 'Mirá la foto y elegí el nombre del objeto en inglés.',
    emoji: '✏️',
    questions: [
      { id: 'oi1', image: 'pen', prompt: 'What is this?',
        options: [{ text: 'a pen', correct: true }, { text: 'a pencil' }, { text: 'a crayon' }] },
      { id: 'oi2', image: 'pencil', prompt: 'What is this?',
        options: [{ text: 'a pencil', correct: true }, { text: 'a pen' }, { text: 'a ruler' }] },
      { id: 'oi3', image: 'sharpener', prompt: 'What is this?',
        options: [{ text: 'a sharpener', correct: true }, { text: 'a rubber' }, { text: 'a pencil case' }] },
      { id: 'oi4', image: 'rubber', prompt: 'What is this?',
        options: [{ text: 'a rubber', correct: true }, { text: 'a sharpener' }, { text: 'a ruler' }] },
      { id: 'oi5', image: 'ruler', prompt: 'What is this?',
        options: [{ text: 'a ruler', correct: true }, { text: 'a pencil case' }, { text: 'a rubber' }] },
      { id: 'oi6', image: 'crayon', prompt: 'What is this?',
        options: [{ text: 'a crayon', correct: true }, { text: 'a pencil' }, { text: 'a pen' }] },
      { id: 'oi7', image: 'pencil-case', prompt: 'What is this?',
        options: [{ text: 'a pencil case', correct: true }, { text: 'a computer' }, { text: 'a sharpener' }] },
      { id: 'oi8', image: 'computer', prompt: 'What is this?',
        options: [{ text: 'a computer', correct: true }, { text: 'a pencil case' }, { text: 'a ruler' }] },
    ],
  },

  // --------------------------------------------------------------- Family ----
  {
    id: 'familia',
    title: 'La familia',
    description: 'Leé la pista en inglés y elegí el familiar correcto.',
    emoji: '👨‍👩‍👧‍👦',
    questions: [
      { id: 'fa1', prompt: "Your mother's mother is your...",
        options: [{ text: 'grandma', correct: true }, { text: 'aunt' }, { text: 'sister' }] },
      { id: 'fa2', prompt: "Your father's father is your...",
        options: [{ text: 'grandpa', correct: true }, { text: 'uncle' }, { text: 'brother' }] },
      { id: 'fa3', prompt: 'A boy with the same parents as you is your...',
        options: [{ text: 'brother', correct: true }, { text: 'sister' }, { text: 'dad' }] },
      { id: 'fa4', prompt: 'A girl with the same parents as you is your...',
        options: [{ text: 'sister', correct: true }, { text: 'brother' }, { text: 'mum' }] },
      { id: 'fa5', prompt: "Your mother's sister is your...",
        options: [{ text: 'aunt', correct: true }, { text: 'grandma' }, { text: 'mum' }] },
      { id: 'fa6', prompt: "Your mother's brother is your...",
        options: [{ text: 'uncle', correct: true }, { text: 'grandpa' }, { text: 'dad' }] },
    ],
  },

  // --------------------------------------------------------- Prepositions ----
  {
    id: 'preposiciones',
    title: 'Preposiciones',
    description: 'Mirá el dibujo y elegí dónde está la pelota (in, on, under, next to).',
    emoji: '📦',
    questions: [
      { id: 'p1', scene: 'on', prompt: 'Where is the ball?',
        options: [{ text: 'on the box', correct: true }, { text: 'under the box' }, { text: 'in the box' }] },
      { id: 'p2', scene: 'in', prompt: 'Where is the ball?',
        options: [{ text: 'in the box', correct: true }, { text: 'on the box' }, { text: 'under the box' }] },
      { id: 'p3', scene: 'under', prompt: 'Where is the ball?',
        options: [{ text: 'under the box', correct: true }, { text: 'on the box' }, { text: 'next to the box' }] },
      { id: 'p4', scene: 'next-to', prompt: 'Where is the ball?',
        options: [{ text: 'next to the box', correct: true }, { text: 'in the box' }, { text: 'on the box' }] },
    ],
  },

  // ----------------------------------------------------------- Adjectives ----
  {
    id: 'adjetivos',
    title: 'Adjetivos',
    description: 'Mirá y completá con big, small, long o short.',
    emoji: '📏',
    questions: [
      { id: 'a1', prompt: 'An elephant is very...', emoji: '🐘',
        options: [{ text: 'big', correct: true }, { text: 'small' }] },
      { id: 'a2', prompt: 'An ant is very...', emoji: '🐜',
        options: [{ text: 'small', correct: true }, { text: 'big' }] },
      { id: 'a3', prompt: 'A snake is very...', emoji: '🐍',
        options: [{ text: 'long', correct: true }, { text: 'short' }] },
      { id: 'a4', prompt: 'This pencil is very...', emoji: '✏️',
        options: [{ text: 'short', correct: true }, { text: 'long' }] },
    ],
  },
]
