import type { Practice } from '../types'

// ============================================================================
// 4to GRADO — prácticas separadas por tema (Academy Stars 4, unidades 1 a 4).
// Reglas:
//  - Enunciados y opciones SIEMPRE en inglés (sin castellano).
//  - Vocabulario: se pregunta con una definición en inglés.
//  - Gramática: agrupada por tema (nada mezclado).
// ============================================================================

export const grade4Practices: Practice[] = [
  // ============================ VOCABULARIO (por definición) ================

  // ----------------------------------------------- Unit 4: People at work ----
  {
    id: 'vocab-oficios',
    title: 'Vocabulario: oficios',
    description: 'Read the English definition and choose the job.',
    emoji: '🧑‍🏭',
    questions: [
      { id: 'j1', prompt: 'This person helps sick or injured animals.',
        options: [{ text: 'a vet', correct: true }, { text: 'a farmer' }, { text: 'a nurse' }] },
      { id: 'j2', prompt: 'This person puts out fires.',
        options: [{ text: 'a firefighter', correct: true }, { text: 'a pilot' }, { text: 'a cook' }] },
      { id: 'j3', prompt: 'This person fixes cars and machines.',
        options: [{ text: 'a mechanic', correct: true }, { text: 'a dentist' }, { text: 'a farmer' }] },
      { id: 'j4', prompt: 'This person grows crops and looks after animals on a farm.',
        options: [{ text: 'a farmer', correct: true }, { text: 'a vet' }, { text: 'a waiter' }] },
      { id: 'j5', prompt: 'This person flies planes.',
        options: [{ text: 'a pilot', correct: true }, { text: 'a mechanic' }, { text: 'a teacher' }] },
      { id: 'j6', prompt: 'This person cooks food in a restaurant.',
        options: [{ text: 'a cook', correct: true }, { text: 'a firefighter' }, { text: 'a farmer' }] },
    ],
  },

  // ------------------------------------------------ Unit 2: Different lives ----
  {
    id: 'vocab-lugares',
    title: 'Vocabulario: lugares',
    description: 'Read the English definition and choose the place.',
    emoji: '🗺️',
    questions: [
      { id: 'pl1', prompt: 'A very dry place with a lot of sand and little water.',
        options: [{ text: 'a desert', correct: true }, { text: 'a forest' }, { text: 'a river' }] },
      { id: 'pl2', prompt: 'A small town in the countryside.',
        options: [{ text: 'a village', correct: true }, { text: 'a city' }, { text: 'a mountain' }] },
      { id: 'pl3', prompt: 'A long line of water that flows to the sea.',
        options: [{ text: 'a river', correct: true }, { text: 'a desert' }, { text: 'a village' }] },
      { id: 'pl4', prompt: 'A very high piece of land, higher than a hill.',
        options: [{ text: 'a mountain', correct: true }, { text: 'a river' }, { text: 'a city' }] },
      { id: 'pl5', prompt: 'A place with a lot of trees.',
        options: [{ text: 'a forest', correct: true }, { text: 'a desert' }, { text: 'a beach' }] },
      { id: 'pl6', prompt: 'A big, busy place with many buildings and people.',
        options: [{ text: 'a city', correct: true }, { text: 'a village' }, { text: 'a forest' }] },
    ],
  },

  // -------------------------------------------------- Unit 3: Super cycling ----
  {
    id: 'vocab-bici',
    title: 'Vocabulario: bici y deporte',
    description: 'Read the English definition and choose the word.',
    emoji: '🚲',
    questions: [
      { id: 'b1', prompt: 'You wear this on your head to protect it when you cycle.',
        options: [{ text: 'a helmet', correct: true }, { text: 'a wheel' }, { text: 'a glove' }] },
      { id: 'b2', prompt: 'A bike has two of these round parts that turn on the ground.',
        options: [{ text: 'wheels', correct: true }, { text: 'pedals' }, { text: 'handlebars' }] },
      { id: 'b3', prompt: 'You push these with your feet to move the bike.',
        options: [{ text: 'the pedals', correct: true }, { text: 'the wheels' }, { text: 'the brakes' }] },
      { id: 'b4', prompt: 'You hold these with your hands to steer the bike.',
        options: [{ text: 'the handlebars', correct: true }, { text: 'the pedals' }, { text: 'the wheels' }] },
      { id: 'b5', prompt: 'A competition to see who is the fastest.',
        options: [{ text: 'a race', correct: true }, { text: 'a team' }, { text: 'a prize' }] },
    ],
  },

  // --------------------------------------------------- Unit 1: Holiday news ----
  {
    id: 'vocab-intereses',
    title: 'Vocabulario: intereses',
    description: 'Read the English definition and choose the word.',
    emoji: '📷',
    questions: [
      { id: 'i1', prompt: 'Taking pictures with a camera.',
        options: [{ text: 'photography', correct: true }, { text: 'science' }, { text: 'music' }] },
      { id: 'i2', prompt: 'The study of nature and how things work.',
        options: [{ text: 'science', correct: true }, { text: 'technology' }, { text: 'sport' }] },
      { id: 'i3', prompt: 'New machines, computers and phones.',
        options: [{ text: 'technology', correct: true }, { text: 'photography' }, { text: 'stories' }] },
      { id: 'i4', prompt: 'A time when you do not go to school and you can travel or rest.',
        options: [{ text: 'a holiday', correct: true }, { text: 'a hobby' }, { text: 'a race' }] },
      { id: 'i5', prompt: 'An activity you do in your free time for fun.',
        options: [{ text: 'a hobby', correct: true }, { text: 'a holiday' }, { text: 'a job' }] },
    ],
  },

  // ================================ GRAMÁTICA (por tema) ====================

  // ----------------------------------------------------------- Past simple ----
  {
    id: 'pasado',
    title: 'Pasado (past simple)',
    description: 'Regular and irregular verbs, and questions with did / Wh words.',
    emoji: '⏪',
    questions: [
      { id: 'pa1', prompt: 'Yesterday I ___ football with my friends. (play)',
        options: [{ text: 'played', correct: true }, { text: 'play' }, { text: 'plaied' }],
        explanation: 'Regular verbs add -ed: play → played.' },
      { id: 'pa2', prompt: 'She ___ a delicious cake last weekend. (make)',
        options: [{ text: 'made', correct: true }, { text: 'maked' }, { text: 'making' }],
        explanation: 'make is irregular: make → made.' },
      { id: 'pa3', prompt: 'What is the past of "go"?',
        options: [{ text: 'went', correct: true }, { text: 'goed' }, { text: 'gone' }] },
      { id: 'pa4', prompt: '___ you visit your grandma last Sunday?',
        options: [{ text: 'Did', correct: true }, { text: 'Do' }, { text: 'Does' }] },
      { id: 'pa5', prompt: '___ did you go on holiday? — To the beach.',
        options: [{ text: 'Where', correct: true }, { text: 'When' }, { text: 'Who' }] },
      { id: 'pa6', prompt: 'Did she watch TV? — No, she ___.',
        options: [{ text: "didn't", correct: true }, { text: "doesn't" }, { text: "wasn't" }] },
    ],
  },

  // ------------------------------------------------------------- Verb + ing ----
  {
    id: 'verbo-ing',
    title: 'Verbo + ing',
    description: 'love / like / enjoy / don’t mind / don’t like + verb-ing.',
    emoji: '🎵',
    questions: [
      { id: 'g1', prompt: 'I love ___ football with my friends.',
        options: [{ text: 'playing', correct: true }, { text: 'play' }, { text: 'to play' }],
        explanation: 'After love/like/enjoy/don’t mind we use verb + ing.' },
      { id: 'g2', prompt: 'She enjoys ___ books before bed.',
        options: [{ text: 'reading', correct: true }, { text: 'read' }, { text: 'reads' }] },
      { id: 'g3', prompt: "I don't mind ___ the dishes.",
        options: [{ text: 'washing', correct: true }, { text: 'wash' }, { text: 'to wash' }] },
      { id: 'g4', prompt: "They don't like ___ early.",
        options: [{ text: 'getting up', correct: true }, { text: 'get up' }, { text: 'to get up' }] },
    ],
  },

  // --------------------------------------------------- Verb + to + infinitive ----
  {
    id: 'verbo-infinitivo',
    title: 'Verbo + to + infinitive',
    description: 'want / decide / learn + to + infinitive.',
    emoji: '🎯',
    questions: [
      { id: 't1', prompt: 'He wanted ___ a doctor.',
        options: [{ text: 'to be', correct: true }, { text: 'being' }, { text: 'be' }],
        explanation: 'want/decide/learn are followed by to + infinitive.' },
      { id: 't2', prompt: 'They decided ___ a new language.',
        options: [{ text: 'to learn', correct: true }, { text: 'learning' }, { text: 'learn' }] },
      { id: 't3', prompt: 'She learned ___ a bike when she was five.',
        options: [{ text: 'to ride', correct: true }, { text: 'riding' }, { text: 'rode' }] },
    ],
  },

  // ------------------------------------------------ Prepositions of movement ----
  {
    id: 'prep-movimiento',
    title: 'Preposiciones de movimiento',
    description: 'into / out of / across / through / up / down / over ...',
    emoji: '🏃',
    questions: [
      { id: 'm1', prompt: 'The cat jumped ___ the box and hid inside.',
        options: [{ text: 'into', correct: true }, { text: 'out of' }, { text: 'off' }] },
      { id: 'm2', prompt: 'We walked ___ the bridge to the other side.',
        options: [{ text: 'across', correct: true }, { text: 'up' }, { text: 'round' }] },
      { id: 'm3', prompt: 'The train went ___ a long, dark tunnel.',
        options: [{ text: 'through', correct: true }, { text: 'over' }, { text: 'down' }] },
      { id: 'm4', prompt: 'The ball rolled ___ the hill to the bottom.',
        options: [{ text: 'down', correct: true }, { text: 'up' }, { text: 'into' }] },
    ],
  },

  // ---------------------------------------------------------- Could / couldn't ----
  {
    id: 'could',
    title: "Could / couldn't",
    description: 'Abilities in the past.',
    emoji: '🏊',
    questions: [
      { id: 'cd1', prompt: 'When I was two, I ___ swim.',
        options: [{ text: "couldn't", correct: true }, { text: 'could' }, { text: "didn't" }],
        explanation: 'could / couldn’t = ability in the past.' },
      { id: 'cd2', prompt: 'My grandpa ___ ride a horse when he was young.',
        options: [{ text: 'could', correct: true }, { text: 'can' }, { text: "couldn't" }] },
      { id: 'cd3', prompt: 'The baby was too small, so she ___ walk yet.',
        options: [{ text: "couldn't", correct: true }, { text: 'could' }, { text: "wasn't" }] },
    ],
  },

  // ---------------------------------------------------------- Must / mustn't ----
  {
    id: 'must',
    title: "Must / mustn't",
    description: 'Obligation and prohibition.',
    emoji: '⚠️',
    questions: [
      { id: 'mu1', prompt: 'You ___ wear a helmet when you ride a bike. (it is necessary)',
        options: [{ text: 'must', correct: true }, { text: "mustn't" }, { text: 'could' }] },
      { id: 'mu2', prompt: 'You ___ run near the swimming pool. (it is not allowed)',
        options: [{ text: "mustn't", correct: true }, { text: 'must' }, { text: 'can' }] },
      { id: 'mu3', prompt: 'We ___ be quiet in the library. (it is a rule)',
        options: [{ text: 'must', correct: true }, { text: "mustn't" }, { text: "couldn't" }] },
    ],
  },

  // ----------------------------------------------------------- Giving directions ----
  {
    id: 'direcciones',
    title: 'Direcciones',
    description: 'Mirá el mapa y completá la frase. You start at START, facing up.',
    emoji: '🧭',
    questions: [
      { id: 'd1', map: 'city',
        prompt: 'Go straight on to the end of the road. Complete: The ___ is straight on.',
        options: [{ text: 'park', correct: true }, { text: 'shop' }, { text: 'hospital' }] },
      { id: 'd2', map: 'city',
        prompt: 'As you go straight on, complete: The bank is on your ___.',
        options: [{ text: 'right', correct: true }, { text: 'left' }],
        explanation: 'On the map, the bank is on the right side of the road.' },
      { id: 'd3', map: 'city',
        prompt: 'As you go straight on, complete: The hospital is on your ___.',
        options: [{ text: 'left', correct: true }, { text: 'right' }] },
      { id: 'd4', map: 'city',
        prompt: 'To get to the school, complete: Turn ___ at the crossroads.',
        options: [{ text: 'left', correct: true }, { text: 'right' }],
        explanation: 'The school is on the left side of the crossroads.' },
      { id: 'd5', map: 'city',
        prompt: 'To get to the shop, complete: Turn ___ at the crossroads.',
        options: [{ text: 'right', correct: true }, { text: 'left' }] },
      { id: 'd6', map: 'city',
        prompt: 'You want to reach the park. Complete: Go ___ on.',
        options: [{ text: 'straight', correct: true }, { text: 'past' }, { text: 'back' }] },
    ],
  },

  // --------------------------------------------------- Comparatives & superlatives ----
  {
    id: 'comparativos',
    title: 'Comparativos y superlativos',
    description: 'Comparative and superlative adjectives.',
    emoji: '📊',
    questions: [
      { id: 'cs1', prompt: 'An elephant is ___ than a mouse. (big)',
        options: [{ text: 'bigger', correct: true }, { text: 'biggest' }, { text: 'more big' }],
        explanation: 'Short adjectives: adjective + -er (+ than).' },
      { id: 'cs2', prompt: 'Mount Everest is the ___ mountain in the world. (high)',
        options: [{ text: 'highest', correct: true }, { text: 'higher' }, { text: 'most high' }],
        explanation: 'Short adjectives: the + adjective + -est.' },
      { id: 'cs3', prompt: 'This book is ___ than that one. (interesting)',
        options: [{ text: 'more interesting', correct: true }, { text: 'interestinger' }, { text: 'most interesting' }],
        explanation: 'Long adjectives: more + adjective (+ than).' },
    ],
  },
]
