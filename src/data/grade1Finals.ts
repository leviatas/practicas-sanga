import type { Option, Practice, Question, SentenceColumn } from '../types'

// ============================================================================
// 1er GRADO — FINAL EXAMS (Curious Kids 1, unidades 3, 4, 5 y 6)
//
// Lo que entra en los finales de 1A:
//  - WRITING (27/10): describir una imagen ("There are six blue birds...").
//  - COMPREHENSION (03/11): leer un texto y marcar true / false o contestar.
//  - USE OF ENGLISH (12/11): gramática y vocabulario de las unidades 3 a 6.
//
// Reglas (las mismas que el resto de 1er grado):
//  - Las consignas y opciones están SIEMPRE en inglés.
//  - El apoyo visual es un emoji (o la foto de la parte del cuerpo).
// ============================================================================

/** Arma las opciones: la primera es la correcta y el resto, distractores. */
function opts(correct: string, ...wrong: string[]): Option[] {
  return [{ text: correct, correct: true }, ...wrong.map((text) => ({ text }))]
}

/** Pregunta de elegir una opción con un emoji de apoyo. */
function pick(
  id: string,
  emoji: string,
  prompt: string,
  correct: string,
  ...wrong: string[]
): Question {
  return { id, emoji, prompt, options: opts(correct, ...wrong) }
}

// ---------------------------------------------------------------- WRITING ----
// Se describe la escena armando la oración, como en el examen: There is /
// There are + el número + el animal. Fijarse en IS (uno) o ARE (varios) y en
// la palabra en singular (DOG) o plural (DOGS).

const THERE = ['THERE IS', 'THERE ARE']
const NUMBERS = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX']
const SINGULAR = ['BIRD', 'CAT', 'DOG', 'FISH', 'HAMSTER', 'HORSE', 'RABBIT', 'TORTOISE']
const PLURAL = ['BIRDS', 'CATS', 'DOGS', 'FISH', 'HAMSTERS', 'HORSES', 'RABBITS', 'TORTOISES']

const WRITING_PROMPT = 'Look at the picture and make the sentence.'

/**
 * Escena con `count` animales iguales. El animal va en singular o en plural
 * según cuántos haya (FISH es igual en los dos).
 */
function scene(id: string, emoji: string, count: number, animal: number): Question {
  const plural = count > 1
  const columns: SentenceColumn[] = [
    { options: THERE, answer: plural ? 'THERE ARE' : 'THERE IS' },
    { options: NUMBERS, answer: NUMBERS[count - 1] },
    {
      options: plural ? PLURAL : SINGULAR,
      answer: (plural ? PLURAL : SINGULAR)[animal],
    },
  ]
  return {
    id,
    emoji: emoji.repeat(count),
    prompt: WRITING_PROMPT,
    kind: 'sentence',
    columns,
  }
}

// Índices de SINGULAR / PLURAL, para que las escenas se lean mejor.
const BIRD = 0, CAT = 1, DOG = 2, FISH = 3, HAMSTER = 4, HORSE = 5, RABBIT = 6, TORTOISE = 7

const writing: Practice = {
  id: 'finals-writing',
  title: 'Writing: describe the picture',
  description:
    'Mirá el dibujo y armá la oración: There is / There are, el número y el animal.',
  emoji: '✍️',
  questions: [
    scene('fw1', '🐶', 1, DOG),
    scene('fw2', '🐦', 6, BIRD),
    scene('fw3', '🐱', 3, CAT),
    scene('fw4', '🐟', 5, FISH),
    scene('fw5', '🐰', 2, RABBIT),
    scene('fw6', '🐢', 1, TORTOISE),
    scene('fw7', '🐴', 4, HORSE),
    scene('fw8', '🐹', 1, HAMSTER),
    scene('fw9', '🐢', 3, TORTOISE),
    scene('fw10', '🐹', 2, HAMSTER),
    scene('fw11', '🐟', 1, FISH),
    scene('fw12', '🐱', 1, CAT),
  ],
}

// Describir con colores y lugares, como los ejemplos del examen ("There is one
// brown dog next to the girl."). Se elige la oración que describe el dibujo.
const describing: Practice = {
  id: 'finals-describe',
  title: 'Writing: choose the sentence',
  description: 'Mirá el dibujo y elegí la oración que lo describe.',
  emoji: '🖼️',
  questions: [
    pick('fd1', '🐦🐦🐦🌳', 'Look and choose.',
      'There are three birds on the tree.',
      'There is one bird on the tree.',
      'There are three cats on the tree.'),
    pick('fd2', '🐸', 'Look and choose.',
      'I can see one green frog.',
      'I can see two green frogs.',
      'I can see one green fish.'),
    pick('fd3', '🐶🐶👧', 'Look and choose.',
      'There are two dogs next to the girl.',
      'There is one dog next to the girl.',
      'There are two cats next to the girl.'),
    pick('fd4', '🐟🐟🐟🐟', 'Look and choose.',
      'There are four fish.',
      'There is four fish.',
      'There are five fish.'),
    pick('fd5', '🐴', 'Look and choose.',
      'There is one brown horse.',
      'There are one brown horse.',
      'There is one brown dog.'),
    pick('fd6', '🐰🐰', 'Look and choose.',
      'I can see two rabbits.',
      'I can see two rabbit.',
      'I can see two hamsters.'),
  ],
}

// ---------------------------------------------------------- COMPREHENSION ----
// Textos cortitos en primera persona. Cada pregunta muestra el texto arriba
// (en el campo `poem`) y pide marcar TRUE o FALSE, o contestar.

const MIA = `Hello! I am Mia.
I have got a rabbit. Its name is Bunny.
Bunny is white and it is very friendly.
It can jump, but it can't swim.
I like cake and ice cream.
I don't like onions!`

const TOM = `Hi! I am Tom. I am six.
I have got two dogs and one cat.
My dogs are brown and they are very fast.
I can ride a bike and I can play football.
I can't ride a horse.
I like burgers and chips. I don't like eggs.`

const SAM = `This is Sam. He is a tortoise.
He has got four legs and a small head.
He hasn't got hair.
Sam is very slow. He can't run, but he can swim.
Sam likes lemons and mangoes.`

const TF = ['TRUE', 'FALSE']

function trueFalse(id: string, text: string, title: string, sentence: string, isTrue: boolean): Question {
  return {
    id,
    poem: text,
    poemTitle: title,
    prompt: sentence,
    keepOrder: true,
    options: TF.map((text) => ({ text, correct: (text === 'TRUE') === isTrue })),
  }
}

function answer(id: string, text: string, title: string, question: string, correct: string, ...wrong: string[]): Question {
  return { id, poem: text, poemTitle: title, prompt: question, options: opts(correct, ...wrong) }
}

const comprehension: Practice = {
  id: 'finals-comprehension',
  title: 'Comprehension: read and answer',
  description: 'Leé el texto y marcá TRUE o FALSE, o elegí la respuesta.',
  emoji: '📖',
  questions: [
    trueFalse('fc1', MIA, 'Mia', 'Mia has got a dog.', false),
    trueFalse('fc2', MIA, 'Mia', 'Bunny is friendly.', true),
    trueFalse('fc3', MIA, 'Mia', 'Bunny can swim.', false),
    trueFalse('fc4', MIA, 'Mia', 'Mia likes ice cream.', true),
    answer('fc5', MIA, 'Mia', 'What colour is Bunny?', 'white', 'brown', 'black'),
    answer('fc6', MIA, 'Mia', "What doesn't Mia like?", 'onions', 'cake', 'ice cream'),

    trueFalse('fc7', TOM, 'Tom', 'Tom has got two dogs.', true),
    trueFalse('fc8', TOM, 'Tom', 'The dogs are slow.', false),
    trueFalse('fc9', TOM, 'Tom', 'Tom can ride a horse.', false),
    trueFalse('fc10', TOM, 'Tom', 'Tom likes burgers.', true),
    answer('fc11', TOM, 'Tom', 'How many cats has Tom got?', 'one', 'two', 'three'),
    answer('fc12', TOM, 'Tom', 'What can Tom do?', 'ride a bike', 'ride a horse', 'swim'),

    trueFalse('fc13', SAM, 'Sam', 'Sam has got four legs.', true),
    trueFalse('fc14', SAM, 'Sam', 'Sam has got hair.', false),
    trueFalse('fc15', SAM, 'Sam', 'Sam is fast.', false),
    answer('fc16', SAM, 'Sam', 'What can Sam do?', 'swim', 'run', 'fly'),
    answer('fc17', SAM, 'Sam', 'What does Sam like?', 'lemons and mangoes', 'burgers and chips', 'cake and chocolate'),
  ],
}

// ---------------------------------------------------------------- GRAMMAR ----

const whatIsIt: Practice = {
  id: 'finals-what-is-it',
  title: 'What is it? / What are they?',
  description: 'Uno: "It is a...". Varios: "They are...". Y Is it...? / Are they...?',
  emoji: '❓',
  questions: [
    pick('wi1', '✏️', 'What is it?', 'It is a pencil.', 'They are pencils.', 'It is a pen.'),
    pick('wi2', '🐶🐶', 'What are they?', 'They are dogs.', 'It is a dog.', 'They are cats.'),
    pick('wi3', '🐱', 'What is it?', 'It is a cat.', 'They are cats.', 'It is a rabbit.'),
    pick('wi4', '🐟🐟🐟', 'What are they?', 'They are fish.', 'It is a fish.', 'They are birds.'),
    pick('wi5', '🐴', 'What is it?', 'It is a horse.', 'It is a dog.', 'They are horses.'),
    pick('wi6', '🍒🍒', 'What are they?', 'They are cherries.', 'It is a cherry.', 'They are lemons.'),
    pick('wi7', '🐰', 'Is it a rabbit?', 'Yes, it is.', "No, it isn't.", 'Yes, they are.'),
    pick('wi8', '🐢', 'Is it a hamster?', "No, it isn't.", 'Yes, it is.', "No, they aren't."),
    pick('wi9', '🐦🐦', 'Are they birds?', 'Yes, they are.', "No, they aren't.", 'Yes, it is.'),
    pick('wi10', '🐹🐹', 'Are they cats?', "No, they aren't.", 'Yes, they are.', "No, it isn't."),
    pick('wi11', '🍋', 'Is it a lemon?', 'Yes, it is.', "No, it isn't.", 'Yes, they are.'),
    pick('wi12', '🥚🥚', 'Are they burgers?', "No, they aren't.", 'Yes, they are.', "No, it isn't."),
  ],
}

const canCant: Practice = {
  id: 'finals-can-cant',
  title: "Can / Can't",
  description: '¿Puede o no puede? Elegí can o can\'t.',
  emoji: '🐦',
  questions: [
    pick('cc1', '🐦', 'The bird ___ fly.', 'can', "can't"),
    pick('cc2', '🐱', 'The cat ___ fly.', "can't", 'can'),
    pick('cc3', '🐟', 'The fish ___ swim.', 'can', "can't"),
    pick('cc4', '🐟', 'The fish ___ climb.', "can't", 'can'),
    pick('cc5', '🐴', 'The horse ___ run.', 'can', "can't"),
    pick('cc6', '🐢', 'The tortoise ___ run fast.', "can't", 'can'),
    pick('cc7', '🐰', 'The rabbit ___ jump.', 'can', "can't"),
    pick('cc8', '🐶', 'The dog ___ ride a bike.', "can't", 'can'),
    pick('cc9', '🐱', 'The cat ___ climb.', 'can', "can't"),
    pick('cc10', '🐹', 'The hamster ___ fly a kite.', "can't", 'can'),
  ],
}

const haveGot: Practice = {
  id: 'finals-have-got',
  title: 'Have got / Has got',
  description: 'I / you / they → have got. He / she / it → has got. Y en negativo: haven\'t / hasn\'t got.',
  emoji: '👀',
  questions: [
    pick('hg1', '💪💪', 'I ___ two arms.', 'have got', 'has got'),
    pick('hg2', '👦🔵👀', 'He ___ blue eyes.', 'has got', 'have got'),
    pick('hg3', '👧', 'She ___ long hair.', 'has got', 'have got'),
    pick('hg4', '🐶', 'The dog ___ four legs.', 'has got', 'have got'),
    pick('hg5', '👫', 'They ___ two hands.', 'have got', 'has got'),
    pick('hg6', '🐍', 'The snake ___ legs.', "hasn't got", "haven't got", 'has got'),
    pick('hg7', '🐟', "The fish ___ arms.", "hasn't got", "haven't got", 'has got'),
    pick('hg8', '🙋', 'I ___ ten fingers.', 'have got', 'has got'),
    pick('hg9', '🐦', 'I ___ a bird.', 'have got', 'has got'),
    pick('hg10', '🚫🐴', 'We ___ a horse.', "haven't got", "hasn't got", 'have got'),
  ],
}

const thisThese: Practice = {
  id: 'finals-this-these',
  title: 'This is / These are',
  description: 'Uno: "This is my...". Varios: "These are my...".',
  emoji: '👃',
  questions: [
    pick('tt1', '👄', '___ my mouth.', 'This is', 'These are'),
    pick('tt2', '🦶🦶', '___ my feet.', 'These are', 'This is'),
    pick('tt3', '👃', '___ my nose.', 'This is', 'These are'),
    pick('tt4', '👀', '___ my eyes.', 'These are', 'This is'),
    pick('tt5', '👂👂', '___ my ears.', 'These are', 'This is'),
    pick('tt6', '🙂', '___ my head.', 'This is', 'These are'),
    pick('tt7', '🖐️🖐️', '___ my hands.', 'These are', 'This is'),
    pick('tt8', '🦶', '___ my foot.', 'This is', 'These are'),
    pick('tt9', '🦵🦵', 'These are my ___.', 'legs', 'leg'),
    pick('tt10', '🦶', 'This is my ___.', 'foot', 'feet'),
  ],
}

const likeDontLike: Practice = {
  id: 'finals-like',
  title: "Like / Don't like",
  description: '😋 = like, 🤢 = don\'t like. Mirá la cara y elegí.',
  emoji: '😋',
  questions: [
    pick('lk1', '😋🍐', 'I ___ pears.', 'like', "don't like"),
    pick('lk2', '🤢🍉', "They ___ watermelons.", "don't like", 'like'),
    pick('lk3', '😋🍦', 'I ___ ice cream.', 'like', "don't like"),
    pick('lk4', '🤢🧅', 'I ___ onions.', "don't like", 'like'),
    pick('lk5', '😋🍔', 'We ___ burgers.', 'like', "don't like"),
    pick('lk6', '🤢🥚', 'They ___ eggs.', "don't like", 'like'),
    pick('lk7', '😋🍫', 'I ___ chocolate.', 'like', "don't like"),
    pick('lk8', '🤢🍋', 'I ___ lemons.', "don't like", 'like'),
    pick('lk9', '😋🎂', 'They ___ cake.', 'like', "don't like"),
    pick('lk10', '😋🍟', 'I like ___.', 'chips', 'onions', 'eggs'),
  ],
}

// ------------------------------------------------------------- VOCABULARY ----

const animals: Practice = {
  id: 'finals-animals',
  title: 'Animals and adjectives',
  description: 'Mirá el animal y elegí su nombre; después, cómo es.',
  emoji: '🐹',
  questions: [
    pick('an1', '🐦', 'What is it?', 'a bird', 'a fish', 'a cat'),
    pick('an2', '🐱', 'What is it?', 'a cat', 'a dog', 'a rabbit'),
    pick('an3', '🐶', 'What is it?', 'a dog', 'a horse', 'a cat'),
    pick('an4', '🐟', 'What is it?', 'a fish', 'a bird', 'a tortoise'),
    pick('an5', '🐹', 'What is it?', 'a hamster', 'a rabbit', 'a dog'),
    pick('an6', '🐴', 'What is it?', 'a horse', 'a dog', 'a hamster'),
    pick('an7', '🐰', 'What is it?', 'a rabbit', 'a hamster', 'a bird'),
    pick('an8', '🐢', 'What is it?', 'a tortoise', 'a fish', 'a horse'),
    pick('an9', '🐆', 'A cheetah is...', 'fast', 'slow'),
    pick('an10', '🐢', 'A tortoise is...', 'slow', 'fast'),
    pick('an11', '🐶', 'My dog is...', 'friendly', 'scary'),
    pick('an12', '🦈', 'A shark is...', 'scary', 'friendly'),
  ],
}

// Partes del cuerpo con las fotos de 2nd Midterms (clave `image` en minúscula).
function bodyPart(id: string, image: string, correct: string, ...wrong: string[]): Question {
  return { id, image, prompt: 'What is this?', options: opts(correct, ...wrong) }
}

const bodyParts: Practice = {
  id: 'finals-body',
  title: 'Body parts',
  description: 'Mirá la foto y elegí la parte del cuerpo.',
  emoji: '🦵',
  questions: [
    bodyPart('fb1', 'head', 'HEAD', 'HAIR', 'BODY'),
    bodyPart('fb2', 'eye', 'EYE', 'EAR', 'NOSE'),
    bodyPart('fb3', 'ear', 'EAR', 'EYE', 'MOUTH'),
    bodyPart('fb4', 'nose', 'NOSE', 'MOUTH', 'TOE'),
    bodyPart('fb5', 'mouth', 'MOUTH', 'NOSE', 'HAND'),
    bodyPart('fb6', 'hair', 'HAIR', 'HEAD', 'HAND'),
    bodyPart('fb7', 'arm', 'ARM', 'LEG', 'HAND'),
    bodyPart('fb8', 'hand', 'HAND', 'FOOT', 'FINGER'),
    bodyPart('fb9', 'finger', 'FINGER', 'TOE', 'HAND'),
    bodyPart('fb10', 'leg', 'LEG', 'ARM', 'FOOT'),
    bodyPart('fb11', 'foot', 'FOOT', 'HAND', 'LEG'),
    bodyPart('fb12', 'toe', 'TOE', 'FINGER', 'FOOT'),
    bodyPart('fb13', 'body', 'BODY', 'HEAD', 'ARM'),
  ],
}

const actions: Practice = {
  id: 'finals-actions',
  title: 'Actions',
  description: 'Mirá qué está haciendo y elegí la acción en inglés.',
  emoji: '🚴',
  questions: [
    pick('ac1', '🧤⚾', 'What can you do?', 'catch a ball', 'play football', 'fly a kite'),
    pick('ac2', '🧗', 'What can you do?', 'climb', 'swim', 'dance'),
    pick('ac3', '🦘', 'What can you do?', 'jump', 'run', 'swim'),
    pick('ac4', '⚽', 'What can you do?', 'play football', 'catch a ball', 'ride a bike'),
    pick('ac5', '🚴', 'What can you do?', 'ride a bike', 'ride a horse', 'run'),
    pick('ac6', '🏇', 'What can you do?', 'ride a horse', 'ride a bike', 'climb'),
    pick('ac7', '🏃', 'What can you do?', 'run', 'swim', 'fly a kite'),
    pick('ac8', '💃', 'What can you do?', 'dance', 'climb', 'hop'),
    pick('ac9', '🪁', 'What can you do?', 'fly a kite', 'catch a ball', 'skip'),
    pick('ac10', '🏊', 'What can you do?', 'swim', 'run', 'dance'),
    pick('ac11', '🪢', 'What can you do?', 'skip', 'swim', 'ride a bike'),
    pick('ac12', '🐸', 'Frogs can...', 'hop', 'fly a kite', 'ride a bike'),
  ],
}

const food: Practice = {
  id: 'finals-food',
  title: 'Food and fruits',
  description: 'Mirá la comida y elegí su nombre en inglés.',
  emoji: '🍔',
  questions: [
    pick('fo1', '🍔', 'Look and choose.', 'burgers', 'chips', 'cake'),
    pick('fo2', '🎂', 'Look and choose.', 'cake', 'ice cream', 'eggs'),
    pick('fo3', '🍟', 'Look and choose.', 'chips', 'burgers', 'onions'),
    pick('fo4', '🥚', 'Look and choose.', 'eggs', 'onions', 'lemon'),
    pick('fo5', '🍦', 'Look and choose.', 'ice cream', 'milkshake', 'cake'),
    pick('fo6', '🍫', 'Look and choose.', 'chocolate', 'cake', 'chips'),
    pick('fo7', '🥤', 'Look and choose.', 'milkshake', 'ice cream', 'chocolate'),
    pick('fo8', '🧅', 'Look and choose.', 'onions', 'eggs', 'mango'),
    pick('fo9', '🍒', 'Look and choose.', 'cherry', 'lemon', 'mango'),
    pick('fo10', '🍋', 'Look and choose.', 'lemon', 'mango', 'cherry'),
    pick('fo11', '🥭', 'Look and choose.', 'mango', 'lemon', 'onions'),
    pick('fo12', '🍦🤍', 'White ice cream is...', 'vanilla', 'chocolate', 'lemon'),
  ],
}

// Repaso cortito: cada palabra a su grupo, como en las actividades del libro.
const classify: Practice = {
  id: 'finals-classify',
  title: 'Animals, food or actions?',
  description: 'Arrastrá cada palabra a su grupo.',
  emoji: '🗂️',
  questions: [
    {
      id: 'fcl1',
      kind: 'classify',
      prompt: 'Put the words in the right group.',
      categories: ['ANIMALS', 'FOOD', 'ACTIONS'],
      checkOnDrop: true,
      items: [
        { text: 'hamster', category: 'ANIMALS' },
        { text: 'tortoise', category: 'ANIMALS' },
        { text: 'horse', category: 'ANIMALS' },
        { text: 'rabbit', category: 'ANIMALS' },
        { text: 'chips', category: 'FOOD' },
        { text: 'milkshake', category: 'FOOD' },
        { text: 'mango', category: 'FOOD' },
        { text: 'eggs', category: 'FOOD' },
        { text: 'climb', category: 'ACTIONS' },
        { text: 'skip', category: 'ACTIONS' },
        { text: 'hop', category: 'ACTIONS' },
        { text: 'swim', category: 'ACTIONS' },
      ],
    },
  ],
}

export const grade1FinalsPractices: Practice[] = [
  writing,
  describing,
  comprehension,
  whatIsIt,
  canCant,
  haveGot,
  thisThese,
  likeDontLike,
  animals,
  bodyParts,
  actions,
  food,
  classify,
]
