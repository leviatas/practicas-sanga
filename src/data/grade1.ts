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
  // Reconocimiento con FOTOS (recortadas sin la etiqueta, para no revelar la
  // respuesta). Solo objetos que tienen foto.
  {
    id: 'objetos',
    title: 'Objetos de la escuela',
    description: 'Mirá la foto y elegí el objeto en inglés.',
    emoji: '🎒',
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
    description: 'Mirá el árbol de la familia y completá sobre Alison.',
    emoji: '👨‍👩‍👧‍👦',
    questions: [
      { id: 'fa1', image: 'family-tree', prompt: "Peter is Alison's...",
        options: [{ text: 'grandpa', correct: true }, { text: 'grandma' }, { text: 'dad' }] },
      { id: 'fa2', image: 'family-tree', prompt: "Ana is Alison's...",
        options: [{ text: 'grandma', correct: true }, { text: 'grandpa' }, { text: 'mum' }] },
      { id: 'fa3', image: 'family-tree', prompt: "Andy is Alison's...",
        options: [{ text: 'dad', correct: true }, { text: 'uncle' }, { text: 'brother' }] },
      { id: 'fa4', image: 'family-tree', prompt: "Emma is Alison's...",
        options: [{ text: 'mum', correct: true }, { text: 'aunt' }, { text: 'sister' }] },
      { id: 'fa5', image: 'family-tree', prompt: "Carol is Alison's...",
        options: [{ text: 'sister', correct: true }, { text: 'mum' }, { text: 'aunt' }] },
      { id: 'fa6', image: 'family-tree', prompt: "Oliver is Alison's...",
        options: [{ text: 'brother', correct: true }, { text: 'dad' }, { text: 'uncle' }] },
      { id: 'fa7', image: 'family-tree', prompt: "Alex is Alison's...",
        options: [{ text: 'uncle', correct: true }, { text: 'dad' }, { text: 'grandpa' }] },
      { id: 'fa8', image: 'family-tree', prompt: "Sofía is Alison's...",
        options: [{ text: 'aunt', correct: true }, { text: 'mum' }, { text: 'grandma' }] },
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
    description: 'Mirá y completá con el adjetivo correcto.',
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
      { id: 'a5', prompt: 'A cheetah is very...', emoji: '🐆',
        options: [{ text: 'fast', correct: true }, { text: 'slow' }] },
      { id: 'a6', prompt: 'A turtle is very...', emoji: '🐢',
        options: [{ text: 'slow', correct: true }, { text: 'fast' }] },
      { id: 'a7', prompt: 'A puppy is very...', emoji: '🐶',
        options: [{ text: 'friendly', correct: true }, { text: 'scary' }] },
      { id: 'a8', prompt: 'A ghost is very...', emoji: '👻',
        options: [{ text: 'scary', correct: true }, { text: 'friendly' }] },
      { id: 'a9', prompt: 'A grandpa is...', emoji: '👴',
        options: [{ text: 'old', correct: true }, { text: 'young' }] },
      { id: 'a10', prompt: 'A baby is very...', emoji: '👶',
        options: [{ text: 'young', correct: true }, { text: 'old' }] },
      { id: 'a11', prompt: 'A giraffe is very...', emoji: '🦒',
        options: [{ text: 'tall', correct: true }, { text: 'short' }] },
    ],
  },
]
