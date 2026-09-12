import type { Practice, Question, SentenceColumn } from '../types'

// ============================================================================
// 4to GRADO — 2nd Midterms (Academy Stars 4, Unit 6: "The great outdoors").
//
// Dos temas, tal como los pidió la seño:
//  - Vocabulario de la unidad 6: world, field, grass, ground, campfire,
//    stream, shooting star, branch, nest y leaf / leaves.
//  - Past continuous: afirmativo (I was walking), negativo (my friends
//    weren't reading a book) y preguntas (Was Mary doing her homework?).
//
// Reglas del grado (las mismas del 1st Midterms):
//  - Enunciados y opciones SIEMPRE en inglés (sin castellano).
//  - Vocabulario: se pregunta con una definición en inglés.
//  - Gramática: cada práctica trabaja UNA forma (afirmativo, negativo o
//    pregunta), y recién al final hay una práctica mixta que las mezcla.
// ============================================================================

/**
 * Pregunta de "ordenar las palabras": cada palabra es una ficha y el alumno
 * las arrastra a los huecos en el orden correcto. `end` es lo que va después
 * del último hueco ('.' en las oraciones, '?' en las preguntas).
 *
 * Las fichas salen barajadas solas (PracticePage mezcla el `bank`).
 */
function order(id: string, words: string[], end = '.'): Question {
  return {
    id,
    kind: 'drag',
    prompt: 'Put the words in order.',
    segments: [...words.map(() => ''), end],
    blanks: words,
    bank: [...words],
    explanation: `${words.join(' ')}${end}`,
  }
}

/**
 * Pregunta de "armar la palabra" letra por letra (misma forma que Unit 1-4).
 *
 * Las fichas que se arrastran van en IMPRENTA MAYÚSCULA, como lo pidió la
 * seño: a esta edad les resulta más fácil reconocer la letra suelta así.
 */
function spell(id: string, clue: string, word: string): Question {
  const letters = word.toUpperCase().split('')
  return {
    id,
    kind: 'drag',
    prompt: `Assemble the word — ${clue}`,
    segments: letters.map(() => ''),
    blanks: letters,
    bank: [...letters],
    explanation: `The word is "${letters.join('')}".`,
  }
}

// Columnas de la práctica mixta: el alumno arma la oración eligiendo una
// opción de cada columna. Son siempre las mismas; lo que cambia de una
// pregunta a otra es cuál es la correcta.
const SUBJECTS = ['I', 'He', 'She', 'We', 'They']
const AUXILIARIES = ['was', 'were', "wasn't", "weren't"]
const VERBS = ['reading', 'cooking', 'playing', 'cycling', 'sleeping', 'watching']
const COMPLEMENTS = ['a book', 'dinner', 'football', 'to school', 'in the tent', 'TV']

function sentence(
  subject: string,
  auxiliary: string,
  verb: string,
  complement: string,
): SentenceColumn[] {
  return [
    { options: SUBJECTS, answer: subject },
    { options: AUXILIARIES, answer: auxiliary },
    { options: VERBS, answer: verb },
    { options: COMPLEMENTS, answer: complement },
  ]
}

export const grade4Unit6Practices: Practice[] = [
  // ========================================================= VOCABULARIO ====

  {
    id: 'u6-vocab-naturaleza',
    title: 'Vocabulario: the great outdoors',
    description: 'Read the definition and choose the correct word. (Unit 6)',
    emoji: '🌿',
    questions: [
      { id: 'u6v1', image: 'nest', prompt: 'Birds build this for their eggs.',
        options: [{ text: 'a nest', correct: true }, { text: 'a field' }, { text: 'a campfire' }] },
      { id: 'u6v2', image: 'branch', prompt: 'A part of a tree with leaves on.',
        options: [{ text: 'a branch', correct: true }, { text: 'a stream' }, { text: 'a nest' }] },
      { id: 'u6v3', image: 'shooting-star', prompt: 'A special thing you can see in the sky at night.',
        options: [{ text: 'a shooting star', correct: true }, { text: 'the ground' }, { text: 'a stream' }] },
      { id: 'u6v4', image: 'field', prompt: 'A big place with grass, where cows and sheep eat.',
        options: [{ text: 'a field', correct: true }, { text: 'a branch' }, { text: 'a nest' }] },
      { id: 'u6v5', image: 'stream', prompt: 'A small river.',
        options: [{ text: 'a stream', correct: true }, { text: 'a field' }, { text: 'the world' }] },
      { id: 'u6v6', image: 'world', prompt: 'The place where we all live.',
        options: [{ text: 'the world', correct: true }, { text: 'the ground' }, { text: 'a field' }] },
      { id: 'u6v7', image: 'ground', prompt: 'What we walk on.',
        options: [{ text: 'the ground', correct: true }, { text: 'the world' }, { text: 'a branch' }] },
      { id: 'u6v8', image: 'campfire', prompt: 'You have this near your tent. You use it for cooking.',
        options: [{ text: 'a campfire', correct: true }, { text: 'a stream' }, { text: 'a nest' }] },
      { id: 'u6v9', image: 'leaves', prompt: 'They are usually green and they grow on the branches of a tree.',
        options: [{ text: 'leaves', correct: true }, { text: 'nests' }, { text: 'streams' }] },
      { id: 'u6v10', image: 'grass', prompt: 'Green plants that cover the ground in a park or in a garden.',
        options: [{ text: 'grass', correct: true }, { text: 'a campfire' }, { text: 'a shooting star' }] },
      { id: 'u6v11', image: 'leaves', prompt: 'One of them is green and it grows on a branch. What is it?',
        options: [{ text: 'a leaf', correct: true }, { text: 'a leafs' }, { text: 'a leaves' }] },
      { id: 'u6v12', image: 'shooting-star', prompt: 'You are in your tent at night and you want to see the shooting stars. Where do you look?',
        options: [{ text: 'at the sky', correct: true }, { text: 'at the ground' }, { text: 'at the grass' }] },
    ],
  },

  {
    id: 'u6-vocab-armar',
    title: 'Vocabulario: armar la palabra',
    description: 'Read the clue and assemble the word with its letters. (Unit 6)',
    emoji: '🔤',
    questions: [
      spell('u6s1', 'birds build it for their eggs.', 'nest'),
      spell('u6s2', 'a part of a tree with leaves on.', 'branch'),
      spell('u6s3', 'a small river.', 'stream'),
      spell('u6s4', 'a big place with grass where cows eat.', 'field'),
      spell('u6s5', 'what we walk on.', 'ground'),
      spell('u6s6', 'the place where we all live.', 'world'),
      spell('u6s7', 'green plants that cover the ground.', 'grass'),
      spell('u6s8', 'you use it for cooking near your tent.', 'campfire'),
      spell('u6s9', 'they are green and they grow on the branches.', 'leaves'),
    ],
  },

  {
    id: 'u6-vocab-unir',
    title: 'Vocabulario: unir con una línea',
    description: 'Tap a picture and then its word to draw a line between them. (Unit 6)',
    emoji: '🔗',
    questions: [
      // Tandas cortas (2 o 3 pares) para que las líneas no se amontonen.
      { id: 'u6mt1', kind: 'match', prompt: 'Match each picture with its word.',
        pairs: [
          { image: 'world', word: 'world' },
          { image: 'field', word: 'field' },
          { image: 'grass', word: 'grass' },
        ] },
      { id: 'u6mt2', kind: 'match', prompt: 'Match each picture with its word.',
        pairs: [
          { image: 'ground', word: 'ground' },
          { image: 'campfire', word: 'campfire' },
          { image: 'stream', word: 'stream' },
        ] },
      { id: 'u6mt3', kind: 'match', prompt: 'Match each picture with its word.',
        pairs: [
          { image: 'shooting-star', word: 'shooting star' },
          { image: 'branch', word: 'branch' },
        ] },
      { id: 'u6mt4', kind: 'match', prompt: 'Match each picture with its word.',
        pairs: [
          { image: 'nest', word: 'nest' },
          { image: 'leaves', word: 'leaves' },
        ] },
    ],
  },

  // ===================================================== PAST CONTINUOUS ====

  {
    id: 'u6-pc-afirmativo',
    title: 'Past continuous: afirmativo',
    description: 'I was walking. Put the words in order and choose was or were.',
    emoji: '✅',
    questions: [
      order('u6a1', ['I', 'was', 'reading', 'a book']),
      order('u6a2', ['She', 'was', 'cooking', 'dinner']),
      order('u6a3', ['They', 'were', 'cycling', 'to school']),
      order('u6a4', ['He', 'was', 'wearing', 'a helmet']),
      order('u6a5', ['We', 'were', 'sitting', 'near the campfire']),
      order('u6a6', ['The birds', 'were', 'singing', 'in the nest']),
      order('u6a7', ['Mary', 'was', 'doing', 'her homework']),
      order('u6a8', ['You', 'were', 'walking', 'in the field']),
      { id: 'u6a9', prompt: 'Yesterday at six o’clock, my friends ___ playing football.',
        options: [{ text: 'were', correct: true }, { text: 'was' }, { text: 'are' }],
        explanation: '"My friends" is plural, so it takes "were".' },
      { id: 'u6a10', prompt: 'Last night, I ___ looking at a shooting star.',
        options: [{ text: 'was', correct: true }, { text: 'were' }, { text: 'am' }],
        explanation: 'With I / he / she / it we use "was".' },
      { id: 'u6a11', prompt: 'The dog ___ running in the grass.',
        options: [{ text: 'was', correct: true }, { text: 'were' }, { text: 'is' }],
        explanation: '"The dog" is one animal, so it takes "was".' },
      { id: 'u6a12', prompt: 'We ___ walking near the stream.',
        options: [{ text: 'were', correct: true }, { text: 'was' }, { text: 'are' }],
        explanation: 'With you / we / they we use "were".' },
      { id: 'u6a13', prompt: 'At eight o’clock she ___ her homework.',
        options: [{ text: 'was doing', correct: true }, { text: 'was do' }, { text: 'were doing' }],
        explanation: 'was / were + verb + -ing: "was doing".' },
      { id: 'u6a14', prompt: 'The children ___ under the tree.',
        options: [{ text: 'were sleeping', correct: true }, { text: 'was sleeping' }, { text: 'were sleep' }],
        explanation: '"The children" is plural: were + sleeping.' },
    ],
  },

  {
    id: 'u6-pc-negativo',
    title: 'Past continuous: negativo',
    description: "My friends weren't reading a book. Choose the correct form and build the sentence.",
    emoji: '🚫',
    questions: [
      { id: 'u6n1', prompt: 'My friends ___ reading a book.',
        options: [{ text: "weren't", correct: true }, { text: "wasn't" }, { text: "isn't" }],
        explanation: '"My friends" is plural: were not = weren’t.' },
      { id: 'u6n2', prompt: 'He ___ eating cereal. He was playing a computer game.',
        options: [{ text: "wasn't", correct: true }, { text: "weren't" }, { text: "didn't" }],
        explanation: 'He + was not = he wasn’t.' },
      { id: 'u6n3', prompt: 'The girls ___ walking to school. They were cycling.',
        options: [{ text: "weren't", correct: true }, { text: "wasn't" }, { text: "aren't" }],
        explanation: '"The girls" is plural: weren’t.' },
      { id: 'u6n4', prompt: 'I ___ watching TV at nine o’clock. I was sleeping.',
        options: [{ text: "wasn't", correct: true }, { text: "weren't" }, { text: "am not" }],
        explanation: 'I + was not = I wasn’t.' },
      { id: 'u6n5', prompt: 'She ___ a safety vest. She was wearing a helmet.',
        options: [{ text: "wasn't wearing", correct: true }, { text: "wasn't wear" }, { text: "weren't wearing" }],
        explanation: "wasn't / weren't + verb + -ing." },
      order('u6n6', ['She', "wasn't", 'watching', 'TV']),
      order('u6n7', ['They', "weren't", 'walking', 'to school']),
      order('u6n8', ['I', "wasn't", 'sleeping', "at ten o'clock"]),
      order('u6n9', ['We', "weren't", 'cooking', 'on the campfire']),
      order('u6n10', ['He', "wasn't", 'climbing', 'the branch']),
      {
        id: 'u6n11',
        kind: 'drag',
        prompt: 'Complete the sentences. Drag the correct words.',
        segments: ['He ', ' cereal. He ', ' a computer game.'],
        blanks: ["wasn't eating", 'was playing'],
        bank: ["wasn't eating", 'was playing', "weren't eating", 'were playing'],
        explanation: "He wasn't eating cereal. He was playing a computer game.",
      },
      {
        id: 'u6n12',
        kind: 'drag',
        prompt: 'Complete the sentences. Drag the correct words.',
        segments: ['They ', ' to school. They ', ' to school.'],
        blanks: ["weren't walking", 'were cycling'],
        bank: ["weren't walking", 'were cycling', "wasn't walking", 'was cycling'],
        explanation: "They weren't walking to school. They were cycling to school.",
      },
    ],
  },

  {
    id: 'u6-pc-preguntas',
    title: 'Past continuous: preguntas',
    description: 'Was Mary doing her homework? Put the questions in order and answer them.',
    emoji: '❓',
    questions: [
      order('u6q1', ['Was', 'Mary', 'doing', 'her homework'], '?'),
      order('u6q2', ['Were', 'they', 'playing', 'football'], '?'),
      order('u6q3', ['Was', 'he', 'wearing', 'a helmet'], '?'),
      order('u6q4', ['What', 'were', 'you', 'doing', 'yesterday'], '?'),
      order('u6q5', ['Where', 'were', 'you', 'going'], '?'),
      order('u6q6', ['Why', 'were', 'you', 'calling', 'me'], '?'),
      order('u6q7', ['Were', 'the birds', 'singing', 'in the tree'], '?'),
      { id: 'u6q8', prompt: 'Was she cooking dinner? — Yes, ___.',
        options: [{ text: 'she was', correct: true }, { text: 'she were' }, { text: 'she is' }],
        explanation: 'Short answer: Yes, she was.' },
      { id: 'u6q9', prompt: 'Were the children sleeping? — No, ___.',
        options: [{ text: "they weren't", correct: true }, { text: "they wasn't" }, { text: "they aren't" }],
        explanation: "Short answer: No, they weren't." },
      { id: 'u6q10', prompt: 'Were you walking near the stream? — Yes, ___.',
        options: [{ text: 'I was', correct: true }, { text: 'I were' }, { text: 'I am' }],
        explanation: 'Short answer: Yes, I was.' },
      { id: 'u6q11', prompt: 'Which question is correct?',
        options: [
          { text: 'Was he wearing a helmet?', correct: true },
          { text: 'Was he wear a helmet?' },
          { text: 'He was wearing a helmet?' },
        ],
        explanation: 'In questions the auxiliary goes first: Was + he + wearing...?' },
      { id: 'u6q12', prompt: 'Which question is correct?',
        options: [
          { text: 'Were they sitting near the campfire?', correct: true },
          { text: 'Was they sitting near the campfire?' },
          { text: 'Were they sit near the campfire?' },
        ],
        explanation: '"They" takes "were", and the verb keeps the -ing.' },
      {
        id: 'u6q13',
        kind: 'drag',
        prompt: 'Complete the dialogue. Drag the correct words.',
        segments: ['A: Where ', ' yesterday afternoon? — B: I ', ' to see my grandparents.'],
        blanks: ['were you going', 'was going'],
        bank: ['were you going', 'was going', 'was you going', 'were going'],
        explanation: 'A: Where were you going yesterday afternoon? B: I was going to see my grandparents.',
      },
      {
        id: 'u6q14',
        kind: 'drag',
        prompt: 'Complete the dialogue. Drag the correct words.',
        segments: ['A: Why ', ' me? — B: I ', ' my homework and I had a question.'],
        blanks: ['were you calling', 'was doing'],
        bank: ['were you calling', 'was doing', 'was you calling', 'were doing'],
        explanation: 'A: Why were you calling me? B: I was doing my homework and I had a question.',
      },
    ],
  },

  {
    id: 'u6-pc-elegir',
    title: 'Elegir la oración correcta',
    description: 'Look at the picture and choose the sentence that is true.',
    emoji: '🖼️',
    questions: [
      { id: 'u6c1', image: 'computer-game', prompt: 'Look at the picture. Which sentence is true?',
        options: [
          { text: 'He was playing a computer game.', correct: true },
          { text: 'He was eating cereal.' },
          { text: 'He was cycling to school.' },
        ] },
      { id: 'u6c2', image: 'reading', prompt: 'Look at the picture. Which sentence is true?',
        options: [
          { text: 'She was reading a book.', correct: true },
          { text: 'She was watching TV.' },
          { text: "She wasn't reading a book." },
        ] },
      { id: 'u6c3', image: 'cycling', prompt: 'Look at the picture. Which sentence is true?',
        options: [
          { text: 'They were cycling to school.', correct: true },
          { text: 'They were walking to school.' },
          { text: "They weren't cycling to school." },
        ] },
      { id: 'u6c4', image: 'dancing', prompt: 'Look at the picture. Which sentence is true?',
        options: [
          { text: 'He was dancing.', correct: true },
          { text: 'He was playing football.' },
          { text: "He wasn't dancing." },
        ] },
      { id: 'u6c5', image: 'cooking', prompt: 'Look at the picture. Which sentence is true?',
        options: [
          { text: 'She was cooking.', correct: true },
          { text: 'She was eating a sandwich.' },
          { text: "She wasn't cooking." },
        ] },
      { id: 'u6c6', image: 'campfire', prompt: 'Look at the picture. Which sentence is true?',
        options: [
          { text: 'They were sitting near the campfire.', correct: true },
          { text: 'They were swimming in the stream.' },
          { text: "They weren't camping." },
        ] },
      { id: 'u6c7', image: 'sleeping', prompt: 'Look at the picture. Which sentence is true?',
        options: [
          { text: 'He was sleeping.', correct: true },
          { text: 'He was doing his homework.' },
          { text: "He wasn't sleeping." },
        ] },
      { id: 'u6c8', image: 'football', prompt: 'Look at the picture. Which sentence is true?',
        options: [
          { text: 'They were playing football.', correct: true },
          { text: 'They were cycling to school.' },
          { text: "They weren't playing football." },
        ] },
      // Las cuatro láminas que muestran lo que NO estaba pasando: acá la
      // respuesta correcta es la oración NEGATIVA.
      { id: 'u6c9', image: 'cake', prompt: 'Look at the picture. Which sentence is true?',
        options: [
          { text: "He wasn't eating cereal.", correct: true },
          { text: 'He was eating cereal.' },
          { text: "He wasn't eating cake." },
        ],
        explanation: 'He was eating cake, so he wasn\'t eating cereal.' },
      { id: 'u6c10', image: 'tv-off', prompt: 'Look at the picture. Which sentence is true?',
        options: [
          { text: "She wasn't watching TV.", correct: true },
          { text: 'She was watching TV.' },
          { text: 'She was dancing.' },
        ],
        explanation: 'The TV is broken, so she wasn\'t watching TV.' },
      { id: 'u6c11', image: 'awake', prompt: 'Look at the picture. Which sentence is true?',
        options: [
          { text: "He wasn't sleeping.", correct: true },
          { text: 'He was sleeping.' },
          { text: "He wasn't listening to the alarm clock." },
        ],
        explanation: 'The alarm clock woke him up: he wasn\'t sleeping.' },
      { id: 'u6c12', image: 'car-night', prompt: 'Look at the picture. Which sentence is true?',
        options: [
          { text: "They weren't walking.", correct: true },
          { text: 'They were walking.' },
          { text: 'They were cycling.' },
        ],
        explanation: 'They were in the car, so they weren\'t walking.' },
      { id: 'u6c13', prompt: 'Which sentence is correct?',
        options: [
          { text: 'They were playing football.', correct: true },
          { text: 'They was playing football.' },
          { text: 'They were play football.' },
        ],
        explanation: 'they + were + playing.' },
      { id: 'u6c14', prompt: 'Which sentence is correct?',
        options: [
          { text: "I wasn't watching TV.", correct: true },
          { text: "I weren't watching TV." },
          { text: "I wasn't watch TV." },
        ],
        explanation: "I + wasn't + watching." },
    ],
  },


  {
    id: 'u6-pc-error',
    title: 'Encontrar el error',
    description: 'Tap the word that is wrong, and then choose the correct sentence.',
    emoji: '🕵️',
    questions: [
      { id: 'u6e1', kind: 'words', prompt: 'Tap the word that is wrong.',
        words: ['They', 'was', 'playing', 'football.'], pick: [1],
        explanation: 'They were playing football.' },
      { id: 'u6e2', kind: 'words', prompt: 'Tap the word that is wrong.',
        words: ['She', 'were', 'cooking', 'dinner.'], pick: [1],
        explanation: 'She was cooking dinner.' },
      { id: 'u6e3', kind: 'words', prompt: 'Tap the word that is wrong.',
        words: ['I', 'was', 'read', 'a', 'book.'], pick: [2],
        explanation: 'I was reading a book. After was / were the verb takes -ing.' },
      { id: 'u6e4', kind: 'words', prompt: 'Tap the word that is wrong.',
        words: ['We', "wasn't", 'walking', 'in', 'the', 'field.'], pick: [1],
        explanation: "We weren't walking in the field." },
      { id: 'u6e5', kind: 'words', prompt: 'Tap the word that is wrong.',
        words: ['Were', 'Mary', 'doing', 'her', 'homework?'], pick: [0],
        explanation: 'Was Mary doing her homework?' },
      { id: 'u6e6', kind: 'words', prompt: 'Tap the word that is wrong.',
        words: ['The', 'birds', 'was', 'singing', 'in', 'the', 'nest.'], pick: [2],
        explanation: 'The birds were singing in the nest.' },
      { id: 'u6e7', prompt: 'Correct the sentence: "He were wearing a helmet."',
        options: [
          { text: 'He was wearing a helmet.', correct: true },
          { text: 'He were wear a helmet.' },
          { text: 'He was wear a helmet.' },
        ] },
      { id: 'u6e8', prompt: 'Correct the sentence: "They weren\'t cycle to school."',
        options: [
          { text: "They weren't cycling to school.", correct: true },
          { text: "They wasn't cycling to school." },
          { text: "They weren't cycled to school." },
        ] },
      { id: 'u6e9', prompt: 'Correct the question: "What you were doing yesterday?"',
        options: [
          { text: 'What were you doing yesterday?', correct: true },
          { text: 'What was you doing yesterday?' },
          { text: 'What were you do yesterday?' },
        ] },
    ],
  },

  {
    id: 'u6-pc-mixta',
    title: 'Actividad mixta',
    description: 'Affirmative, negative or question: decide and build the sentence.',
    emoji: '🎯',
    questions: [
      { id: 'u6x1', kind: 'sentence', emoji: '📖',
        prompt: 'Yesterday at six o’clock. Build the AFFIRMATIVE sentence: she / read a book.',
        columns: sentence('She', 'was', 'reading', 'a book') },
      { id: 'u6x2', kind: 'sentence', emoji: '🚫📺',
        prompt: 'Build the NEGATIVE sentence: they / not watch TV.',
        columns: sentence('They', "weren't", 'watching', 'TV') },
      { id: 'u6x3', kind: 'sentence', emoji: '🍳',
        prompt: 'Build the AFFIRMATIVE sentence: I / cook dinner.',
        columns: sentence('I', 'was', 'cooking', 'dinner') },
      { id: 'u6x4', kind: 'sentence', emoji: '🚫⚽',
        prompt: 'Build the NEGATIVE sentence: he / not play football.',
        columns: sentence('He', "wasn't", 'playing', 'football') },
      { id: 'u6x5', kind: 'sentence', emoji: '🚴',
        prompt: 'Build the AFFIRMATIVE sentence: we / cycle to school.',
        columns: sentence('We', 'were', 'cycling', 'to school') },
      { id: 'u6x6', kind: 'sentence', emoji: '⛺😴',
        prompt: 'Build the AFFIRMATIVE sentence: they / sleep in the tent.',
        columns: sentence('They', 'were', 'sleeping', 'in the tent') },
      { id: 'u6x7', prompt: 'You want to ASK about Mary and her homework. Which sentence do you use?',
        options: [
          { text: 'Was Mary doing her homework?', correct: true },
          { text: 'Mary was doing her homework.' },
          { text: "Mary wasn't doing her homework." },
        ],
        explanation: 'In a question the auxiliary (was / were) goes first.' },
      { id: 'u6x8', prompt: 'You want to say that something DID NOT happen. Which sentence do you use?',
        options: [
          { text: "They weren't swimming in the stream.", correct: true },
          { text: 'They were swimming in the stream.' },
          { text: 'Were they swimming in the stream?' },
        ],
        explanation: "The negative takes wasn't / weren't." },
      { id: 'u6x9', prompt: 'This sentence is affirmative, negative or a question? "Were you looking at the shooting star?"',
        options: [
          { text: 'It is a question.', correct: true },
          { text: 'It is affirmative.' },
          { text: 'It is negative.' },
        ],
        explanation: 'It starts with the auxiliary "Were" and it ends with "?".' },
      { id: 'u6x10', prompt: 'This sentence is affirmative, negative or a question? "The children weren\'t climbing the branch."',
        options: [
          { text: 'It is negative.', correct: true },
          { text: 'It is affirmative.' },
          { text: 'It is a question.' },
        ],
        explanation: "\"weren't\" = were not, so it is negative." },
      order('u6x11', ['We', 'were', 'looking', 'at the shooting star']),
      order('u6x12', ['Were', 'you', 'sleeping', 'in the tent'], '?'),
      order('u6x13', ['The cows', "weren't", 'eating', 'the grass']),
    ],
  },
]
