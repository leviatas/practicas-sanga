import type { Practice } from '../types'

// ============================================================================
// MIDTERM DE INGLÉS - 1er GRADO
// Basado en el temario de mitad de año (libro Curious Kids level 1,
// unidades "Are you curious?", 1 y 2).
//
// Temas: School objects, Feelings, Family, Colours, Prepositions (in/on/
// under/next to), Adjectives (big/small/long/short) y estructuras
// gramaticales (What is it? / Is it a...? / Where is the...? / She is-He is).
//
// Para agregar o editar preguntas, copiá un bloque y cambiá el texto.
// La opción correcta se marca con `correct: true`.
// ============================================================================

export const grade1EnglishMidterm: Practice = {
  id: 'ingles-midterm',
  title: 'Midterm de Inglés',
  description:
    'Practicá el vocabulario y la gramática del examen de mitad de año: objetos, sentimientos, familia, colores, preposiciones y adjetivos.',
  emoji: '📝',
  questions: [
    // ---- School objects ----
    {
      id: 'q1',
      prompt: 'What is it? / ¿Qué es?',
      emoji: '✏️',
      options: [
        { text: 'It is a pencil', correct: true },
        { text: 'It is a schoolbag' },
        { text: 'It is a ruler' },
      ],
    },
    {
      id: 'q2',
      prompt: 'What is it? / ¿Qué es?',
      emoji: '✂️',
      options: [
        { text: 'It is a pair of scissors', correct: true },
        { text: 'It is a rubber' },
        { text: 'It is a sharpener' },
      ],
    },
    {
      id: 'q3',
      prompt: '¿Cómo se dice "goma de borrar" en inglés?',
      emoji: '🧽',
      options: [
        { text: 'Rubber', correct: true },
        { text: 'Ruler' },
        { text: 'Glue stick' },
      ],
      explanation: 'Rubber = goma de borrar. Ruler = regla.',
    },
    {
      id: 'q4',
      prompt: 'Is it a ruler? / ¿Es una regla?',
      emoji: '📏',
      options: [
        { text: 'Yes, it is', correct: true },
        { text: "No, it isn't" },
      ],
    },
    {
      id: 'q5',
      prompt: 'Is it a pencil case? / ¿Es una cartuchera?',
      emoji: '🎒',
      options: [
        { text: "No, it isn't. It is a schoolbag.", correct: true },
        { text: 'Yes, it is' },
      ],
      explanation: 'La mochila es "schoolbag". La cartuchera es "pencil case".',
    },

    // ---- Colours ----
    {
      id: 'q6',
      prompt: 'What colour is it? / ¿De qué color es?',
      emoji: '🟥',
      options: [
        { text: 'Red', correct: true },
        { text: 'Blue' },
        { text: 'Green' },
      ],
    },
    {
      id: 'q7',
      prompt: 'What colour is it? / ¿De qué color es?',
      emoji: '💜',
      options: [
        { text: 'Purple', correct: true },
        { text: 'Pink' },
        { text: 'Brown' },
      ],
    },
    {
      id: 'q8',
      prompt: '¿Cómo se dice "celeste" en inglés?',
      emoji: '🩵',
      options: [
        { text: 'Light-blue', correct: true },
        { text: 'White' },
        { text: 'Yellow' },
      ],
    },

    // ---- Feelings ----
    {
      id: 'q9',
      prompt: 'How do you feel? / ¿Cómo te sentís?',
      emoji: '😀',
      options: [
        { text: 'I am happy', correct: true },
        { text: 'I am sad' },
        { text: 'I am angry' },
      ],
    },
    {
      id: 'q10',
      prompt: 'How does she feel? / ¿Cómo se siente?',
      emoji: '😢',
      options: [
        { text: 'She is sad', correct: true },
        { text: 'She is surprised' },
        { text: 'She is calm' },
      ],
    },
    {
      id: 'q11',
      prompt: '¿Cómo se dice "cansado" en inglés?',
      emoji: '😴',
      options: [
        { text: 'Tired', correct: true },
        { text: 'Scared' },
        { text: 'Hot' },
      ],
    },

    // ---- Family ----
    {
      id: 'q12',
      prompt: 'Who is she? / ¿Quién es? (la mamá de tu mamá)',
      emoji: '👵',
      options: [
        { text: 'She is my grandma', correct: true },
        { text: 'She is my aunt' },
        { text: 'She is my sister' },
      ],
    },
    {
      id: 'q13',
      prompt: '¿Cómo se dice "papá" en inglés?',
      emoji: '👨',
      options: [
        { text: 'Dad', correct: true },
        { text: 'Uncle' },
        { text: 'Brother' },
      ],
    },
    {
      id: 'q14',
      prompt: 'He is my ___ / Él es mi hermano',
      emoji: '👦',
      options: [
        { text: 'brother', correct: true },
        { text: 'sister' },
        { text: 'mum' },
      ],
    },

    // ---- Prepositions ----
    {
      id: 'q15',
      prompt: 'Where is the ball? / ¿Dónde está la pelota? (arriba de la mesa)',
      emoji: '⬆️',
      options: [
        { text: 'It is on the table', correct: true },
        { text: 'It is under the table' },
        { text: 'It is in the table' },
      ],
      explanation: 'on = sobre/arriba, under = debajo, in = adentro, next to = al lado.',
    },
    {
      id: 'q16',
      prompt: 'Where is the cat? / ¿Dónde está el gato? (debajo de la silla)',
      emoji: '🪑',
      options: [
        { text: 'It is under the chair', correct: true },
        { text: 'It is on the chair' },
        { text: 'It is next to the chair' },
      ],
    },

    // ---- Adjectives ----
    {
      id: 'q17',
      prompt: 'Is it big or small? / ¿Es grande o chico? (un elefante)',
      emoji: '🐘',
      options: [
        { text: 'It is big', correct: true },
        { text: 'It is small' },
      ],
    },
    {
      id: 'q18',
      prompt: 'Is the pencil long or short? / ¿El lápiz es largo o corto?',
      emoji: '📏',
      options: [
        { text: 'It is long', correct: true },
        { text: 'It is short' },
      ],
    },
  ],
}
