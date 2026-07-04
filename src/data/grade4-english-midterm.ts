import type { Practice } from '../types'

// ============================================================================
// MIDTERM DE INGLÉS - 4to GRADO
// Basado en el temario de mitad de año (Academy Stars 4, Units 1 a 4).
//
// Temas (Use of English): verbos regulares e irregulares, preguntas en pasado
// (DID / Wh words), love/like/enjoy/don't mind/don't like + ing, preposiciones
// de movimiento, verb + to + infinitive, could/couldn't (habilidades en el
// pasado), must/mustn't (obligación/prohibición), giving directions y
// comparativos/superlativos.
//
// Para agregar o editar preguntas, copiá un bloque y cambiá el texto.
// La opción correcta se marca con `correct: true`.
// ============================================================================

export const grade4EnglishMidterm: Practice = {
  id: 'ingles-midterm',
  title: 'Midterm de Inglés',
  description:
    'Practicá el examen de mitad de año: pasado (regular e irregular), preguntas con did, verbos + ing, preposiciones de movimiento, could/must, direcciones, comparativos y vocabulario (Unidades 1–4).',
  emoji: '📝',
  questions: [
    // ---- Past simple: regular & irregular verbs ----
    {
      id: 'q1',
      prompt: 'Complete: Yesterday I ___ to the park. (play)',
      emoji: '🏞️',
      options: [
        { text: 'played', correct: true },
        { text: 'play' },
        { text: 'plaied' },
      ],
      explanation: 'Verbos regulares: agregamos -ed. play → played.',
    },
    {
      id: 'q2',
      prompt: 'Complete: She ___ a delicious cake last weekend. (make)',
      emoji: '🎂',
      options: [
        { text: 'made', correct: true },
        { text: 'maked' },
        { text: 'making' },
      ],
      explanation: 'make es irregular: make → made.',
    },
    {
      id: 'q3',
      prompt: 'What is the past of "go"?',
      emoji: '🚶',
      options: [
        { text: 'went', correct: true },
        { text: 'goed' },
        { text: 'gone' },
      ],
    },
    {
      id: 'q4',
      prompt: 'Complete: They ___ their homework yesterday. (do)',
      emoji: '📚',
      options: [
        { text: 'did', correct: true },
        { text: 'done' },
        { text: 'doed' },
      ],
    },

    // ---- Questions in the past (DID / Wh words) ----
    {
      id: 'q5',
      prompt: 'Choose the correct question: ___ you visit your grandma?',
      emoji: '❓',
      options: [
        { text: 'Did', correct: true },
        { text: 'Do' },
        { text: 'Does' },
      ],
    },
    {
      id: 'q6',
      prompt: 'Complete: ___ did you go on holiday? — To the beach.',
      emoji: '🏖️',
      options: [
        { text: 'Where', correct: true },
        { text: 'When' },
        { text: 'Who' },
      ],
    },
    {
      id: 'q7',
      prompt: 'Complete the answer: Did she watch TV? — No, she ___.',
      emoji: '📺',
      options: [
        { text: "didn't", correct: true },
        { text: "doesn't" },
        { text: "wasn't" },
      ],
    },

    // ---- Love / like / enjoy / don't mind / don't like + ing ----
    {
      id: 'q8',
      prompt: 'Complete: I love ___ football with my friends.',
      emoji: '⚽',
      options: [
        { text: 'playing', correct: true },
        { text: 'play' },
        { text: 'to play' },
      ],
      explanation: 'Después de love/like/enjoy/don’t mind usamos verbo + ing.',
    },
    {
      id: 'q9',
      prompt: 'Complete: She enjoys ___ books before bed.',
      emoji: '📖',
      options: [
        { text: 'reading', correct: true },
        { text: 'read' },
        { text: 'reads' },
      ],
    },

    // ---- Verb + to + infinitive ----
    {
      id: 'q10',
      prompt: 'Complete: He wanted ___ a doctor.',
      emoji: '🩺',
      options: [
        { text: 'to be', correct: true },
        { text: 'being' },
        { text: 'be' },
      ],
      explanation: 'want/decide/learn van seguidos de to + infinitivo.',
    },
    {
      id: 'q11',
      prompt: 'Complete: They decided ___ a new language.',
      emoji: '🗣️',
      options: [
        { text: 'to learn', correct: true },
        { text: 'learning' },
        { text: 'learn' },
      ],
    },

    // ---- Prepositions of movement ----
    {
      id: 'q12',
      prompt: 'Complete: The cat jumped ___ the box. / El gato saltó adentro de la caja.',
      emoji: '📦',
      options: [
        { text: 'into', correct: true },
        { text: 'out of' },
        { text: 'off' },
      ],
    },
    {
      id: 'q13',
      prompt: 'Complete: We walked ___ the bridge. / Caminamos a través del puente.',
      emoji: '🌉',
      options: [
        { text: 'across', correct: true },
        { text: 'up' },
        { text: 'round' },
      ],
    },
    {
      id: 'q14',
      prompt: '¿Cómo se dice "a través de (un túnel)" en inglés?',
      emoji: '🚇',
      options: [
        { text: 'through', correct: true },
        { text: 'over' },
        { text: 'down' },
      ],
    },

    // ---- Could / couldn't (abilities in the past) ----
    {
      id: 'q15',
      prompt: 'Complete: When I was two, I ___ swim. / No sabía nadar.',
      emoji: '🏊',
      options: [
        { text: "couldn't", correct: true },
        { text: 'could' },
        { text: "didn't" },
      ],
      explanation: 'could/couldn’t = habilidades en el pasado (podía / no podía).',
    },
    {
      id: 'q16',
      prompt: 'Complete: My grandpa ___ ride a horse when he was young.',
      emoji: '🐴',
      options: [
        { text: 'could', correct: true },
        { text: 'can' },
        { text: 'couldn’t' },
      ],
    },

    // ---- Must / mustn't (obligation / prohibition) ----
    {
      id: 'q17',
      prompt: 'Complete: You ___ wear a helmet when you ride a bike. / Es obligatorio.',
      emoji: '🚴',
      options: [
        { text: 'must', correct: true },
        { text: "mustn't" },
        { text: 'could' },
      ],
    },
    {
      id: 'q18',
      prompt: 'Complete: You ___ run near the pool. / Está prohibido.',
      emoji: '🚫',
      options: [
        { text: "mustn't", correct: true },
        { text: 'must' },
        { text: 'can' },
      ],
    },

    // ---- Giving directions ----
    {
      id: 'q19',
      prompt: '¿Cómo se dice "doblá a la izquierda" en inglés?',
      emoji: '⬅️',
      options: [
        { text: 'Turn left', correct: true },
        { text: 'Turn right' },
        { text: 'Go straight on' },
      ],
    },
    {
      id: 'q20',
      prompt: 'The bank? Go straight on and it’s ___ the right.',
      emoji: '🏦',
      options: [
        { text: 'on', correct: true },
        { text: 'in' },
        { text: 'at' },
      ],
    },

    // ---- Comparatives & superlatives ----
    {
      id: 'q21',
      prompt: 'Complete: An elephant is ___ than a mouse. (big)',
      emoji: '🐘',
      options: [
        { text: 'bigger', correct: true },
        { text: 'biggest' },
        { text: 'more big' },
      ],
      explanation: 'Comparativo de adjetivos cortos: adjetivo + -er (+ than).',
    },
    {
      id: 'q22',
      prompt: 'Complete: Mount Everest is the ___ mountain in the world. (high)',
      emoji: '🏔️',
      options: [
        { text: 'highest', correct: true },
        { text: 'higher' },
        { text: 'most high' },
      ],
      explanation: 'Superlativo de adjetivos cortos: the + adjetivo + -est.',
    },

    // ---- Vocabulary · Unit 1: Holiday news (hobbies & interests) ----
    {
      id: 'q23',
      prompt: '¿Cómo se dice "sacar fotos / la fotografía" en inglés?',
      emoji: '📷',
      options: [
        { text: 'Photography', correct: true },
        { text: 'Technology' },
        { text: 'Science' },
      ],
    },
    {
      id: 'q24',
      prompt: 'Which word means "a free-time activity you enjoy"?',
      emoji: '🎨',
      options: [
        { text: 'a hobby', correct: true },
        { text: 'a holiday' },
        { text: 'a story' },
      ],
    },
    {
      id: 'q25',
      prompt: '¿Cómo se dice "sano / saludable" en inglés?',
      emoji: '🍎',
      options: [
        { text: 'healthy', correct: true },
        { text: 'tired' },
        { text: 'busy' },
      ],
    },

    // ---- Vocabulary · Unit 2: Different lives (places to live) ----
    {
      id: 'q26',
      prompt: '¿Cómo se dice "pueblo" en inglés?',
      emoji: '🏘️',
      options: [
        { text: 'village', correct: true },
        { text: 'city' },
        { text: 'country' },
      ],
    },
    {
      id: 'q27',
      prompt: 'Which is a very dry place with a lot of sand?',
      emoji: '🏜️',
      options: [
        { text: 'a desert', correct: true },
        { text: 'a river' },
        { text: 'a forest' },
      ],
    },
    {
      id: 'q28',
      prompt: '¿Cómo se dice "vecino/a" en inglés?',
      emoji: '🧑‍🤝‍🧑',
      options: [
        { text: 'neighbour', correct: true },
        { text: 'stranger' },
        { text: 'teacher' },
      ],
    },

    // ---- Vocabulary · Unit 3: Super cycling (bikes & sport) ----
    {
      id: 'q29',
      prompt: '¿Cómo se dice "casco" en inglés?',
      emoji: '⛑️',
      options: [
        { text: 'helmet', correct: true },
        { text: 'wheel' },
        { text: 'glove' },
      ],
    },
    {
      id: 'q30',
      prompt: 'Which part of a bike do you turn with your hands?',
      emoji: '🚲',
      options: [
        { text: 'the handlebars', correct: true },
        { text: 'the pedals' },
        { text: 'the wheels' },
      ],
    },
    {
      id: 'q31',
      prompt: '¿Cómo se dice "carrera / competencia" en inglés?',
      emoji: '🏁',
      options: [
        { text: 'a race', correct: true },
        { text: 'a team' },
        { text: 'a prize' },
      ],
    },

    // ---- Vocabulary · Unit 4: People at work (jobs) ----
    {
      id: 'q32',
      prompt: '¿Qué trabajo apaga incendios? / Who puts out fires?',
      emoji: '🧑‍🚒',
      options: [
        { text: 'a firefighter', correct: true },
        { text: 'a farmer' },
        { text: 'a pilot' },
      ],
    },
    {
      id: 'q33',
      prompt: '¿Cómo se dice "veterinario/a" en inglés?',
      emoji: '🐶',
      options: [
        { text: 'a vet', correct: true },
        { text: 'a nurse' },
        { text: 'a cook' },
      ],
    },
    {
      id: 'q34',
      prompt: 'Who fixes cars and machines?',
      emoji: '🔧',
      options: [
        { text: 'a mechanic', correct: true },
        { text: 'a dentist' },
        { text: 'a waiter' },
      ],
    },
  ],
}
