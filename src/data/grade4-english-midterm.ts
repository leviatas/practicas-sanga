import type { Practice } from '../types'

// ============================================================================
// MIDTERM DE INGLÉS - 4to GRADO
//
// ⚠️  CONTENIDO DE EJEMPLO / PLACEHOLDER  ⚠️
// Estas preguntas son de muestra (nivel típico de 4to grado) para que la app
// funcione de punta a punta. REEMPLAZALAS por el temario real de 4to grado
// cuando lo tengas. La estructura es idéntica a la de 1er grado.
// ============================================================================

export const grade4EnglishMidterm: Practice = {
  id: 'ingles-midterm',
  title: 'Midterm de Inglés',
  description:
    'Práctica del examen de mitad de año. (Contenido de ejemplo: reemplazar por el temario real de 4to grado.)',
  emoji: '📝',
  questions: [
    // ---- Verb "to be" ----
    {
      id: 'q1',
      prompt: 'Complete: They ___ my friends.',
      emoji: '👫',
      options: [
        { text: 'are', correct: true },
        { text: 'is' },
        { text: 'am' },
      ],
    },
    {
      id: 'q2',
      prompt: 'Complete: She ___ a teacher.',
      emoji: '👩‍🏫',
      options: [
        { text: 'is', correct: true },
        { text: 'are' },
        { text: 'am' },
      ],
    },

    // ---- Present simple ----
    {
      id: 'q3',
      prompt: 'Complete: He ___ football every day.',
      emoji: '⚽',
      options: [
        { text: 'plays', correct: true },
        { text: 'play' },
        { text: 'playing' },
      ],
      explanation: 'Con he/she/it agregamos -s al verbo en present simple.',
    },
    {
      id: 'q4',
      prompt: 'Choose the correct question: ___ you like pizza?',
      emoji: '🍕',
      options: [
        { text: 'Do', correct: true },
        { text: 'Does' },
        { text: 'Are' },
      ],
    },

    // ---- Plurals ----
    {
      id: 'q5',
      prompt: 'What is the plural of "child"?',
      emoji: '🧒',
      options: [
        { text: 'children', correct: true },
        { text: 'childs' },
        { text: 'childes' },
      ],
    },
    {
      id: 'q6',
      prompt: 'What is the plural of "box"?',
      emoji: '📦',
      options: [
        { text: 'boxes', correct: true },
        { text: 'boxs' },
        { text: 'box' },
      ],
    },

    // ---- There is / There are ----
    {
      id: 'q7',
      prompt: 'Complete: ___ three apples on the table.',
      emoji: '🍎',
      options: [
        { text: 'There are', correct: true },
        { text: 'There is' },
        { text: 'It is' },
      ],
    },

    // ---- Vocabulary ----
    {
      id: 'q8',
      prompt: '¿Cómo se dice "cocina" (habitación) en inglés?',
      emoji: '🍳',
      options: [
        { text: 'Kitchen', correct: true },
        { text: 'Bedroom' },
        { text: 'Bathroom' },
      ],
    },
    {
      id: 'q9',
      prompt: 'What day comes after Monday?',
      emoji: '📅',
      options: [
        { text: 'Tuesday', correct: true },
        { text: 'Sunday' },
        { text: 'Friday' },
      ],
    },
    {
      id: 'q10',
      prompt: 'What time is it? (3:00)',
      emoji: '🕒',
      options: [
        { text: "It's three o'clock", correct: true },
        { text: "It's two o'clock" },
        { text: "It's half past three" },
      ],
    },
  ],
}
