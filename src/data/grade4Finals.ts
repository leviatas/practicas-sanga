import type { Option, Practice, Question } from '../types'
import { grade4Unit6Practices } from './grade4Unit6'

// ============================================================================
// 4to GRADO — FINAL EXAMS (Academy Stars 4, unidades 5 a 8).
//
// Lo que entra en los finales de 4A:
//  - READING COMPREHENSION (lunes 26/10): dos textos. T / F, subrayar el
//    error, corregir la oración falsa y contestar con respuesta completa.
//  - USE OF ENGLISH (lunes 2/11): vocabulario de las unidades 5 a 8,
//    should / shouldn't, past continuous, nouns - verbs - adjectives -
//    adverbs, who / where / which y will / won't.
//  - WRITING (jueves 12/11): una historia en tres párrafos (beginning,
//    middle, end) con past simple y past continuous, adjetivos y adverbios,
//    linkers, connectors y la puntuación correcta.
//
// Reglas del grado: enunciados y opciones SIEMPRE en inglés.
// ============================================================================

/** Las opciones de una pregunta: la primera es la correcta. */
function opts(correct: string, ...wrong: string[]): Option[] {
  return [{ text: correct, correct: true }, ...wrong.map((text) => ({ text }))]
}

/** Pregunta de opciones con una aclaración que se ve al responder. */
function pick(
  id: string,
  prompt: string,
  explanation: string,
  correct: string,
  ...wrong: string[]
): Question {
  return { id, prompt, explanation, options: opts(correct, ...wrong) }
}

/** "Armar la palabra" letra por letra, como en el resto de 4to. */
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

// ================================================== READING COMPREHENSION ====
// Cada texto se muestra arriba de la consigna (campo `poem`). Para cada
// oración FALSA hay tres pasos, como en el examen:
//   1. T o F.
//   2. Tocar la palabra equivocada ("underline the mistake").
//   3. Elegir la oración corregida.
// Y después, preguntas para contestar con una respuesta COMPLETA.

const TF = ['TRUE', 'FALSE']

interface ReadingText {
  title: string
  text: string
}

const RAINY: ReadingText = {
  title: 'A rainy afternoon',
  text: `Last Saturday it was raining, so Lucy and her brother Tom were staying at home. At four o'clock, Lucy was reading a book about famous inventors and Tom was playing a computer game. Their dad was cooking pizza in the kitchen.

Suddenly, the lights went out! Tom was scared, but Lucy wasn't. She quickly found a torch in a drawer and they played cards in the living room.

Later, the lights came back on. In the end, they ate the pizza together and Lucy said, "That was a great afternoon!"`,
}

const DOCTOR: ReadingText = {
  title: 'Doctor Rosa',
  text: `My name is Rosa and I am a doctor. I work in a hospital where I help children who are ill.

Yesterday, a boy called Leo came to the hospital because he had a terrible stomach ache. He was eating too many sweets every day! I told him, "You should eat fruit and vegetables, and you shouldn't drink fizzy drinks." Leo also had a cough, so he should stay in bed and drink warm water.

I think Leo will feel better soon. In the future, doctors will use robots, but people will still need doctors who listen to them.`,
}

function trueFalse(id: string, t: ReadingText, sentence: string, isTrue: boolean): Question {
  return {
    id,
    poem: t.text,
    poemTitle: t.title,
    prompt: `True or false? "${sentence}"`,
    keepOrder: true,
    options: TF.map((text) => ({ text, correct: (text === 'TRUE') === isTrue })),
  }
}

/** Tocar la palabra (o las palabras) equivocada de una oración falsa. */
function mistake(id: string, t: ReadingText, words: string[], wrong: number[], fix: string): Question {
  return {
    id,
    poem: t.text,
    poemTitle: t.title,
    kind: 'words',
    prompt: 'This sentence is FALSE. Tap the mistake.',
    words,
    pick: wrong,
    explanation: `Correct sentence: ${fix}`,
  }
}

function correct(id: string, t: ReadingText, sentence: string, fix: string, ...wrong: string[]): Question {
  return {
    id,
    poem: t.text,
    poemTitle: t.title,
    prompt: `"${sentence}" is FALSE. Choose the correct sentence.`,
    options: opts(fix, ...wrong),
  }
}

function fullAnswer(id: string, t: ReadingText, question: string, answer: string, ...wrong: string[]): Question {
  return {
    id,
    poem: t.text,
    poemTitle: t.title,
    prompt: `${question} Choose the FULL answer.`,
    explanation: 'A full answer repeats the subject and the verb: not just "A torch." but "She found a torch."',
    options: opts(answer, ...wrong),
  }
}

const readingRainy: Practice = {
  id: 'finals-reading-rainy',
  title: 'Reading 1: A rainy afternoon',
  description: 'Read the text: true or false, find the mistake, correct it and answer with full answers.',
  emoji: '🌧️',
  questions: [
    trueFalse('rr1', RAINY, 'It was sunny last Saturday.', false),
    mistake('rr2', RAINY, ['It', 'was', 'sunny', 'last', 'Saturday.'], [2],
      'It was raining last Saturday.'),
    correct('rr3', RAINY, 'It was sunny last Saturday.',
      'It was raining last Saturday.',
      'It wasn\'t raining last Saturday.',
      'It was sunny last Sunday.'),

    trueFalse('rr4', RAINY, 'Lucy was reading a book about famous inventors.', true),

    trueFalse('rr5', RAINY, 'Tom was playing football at four o\'clock.', false),
    mistake('rr6', RAINY, ['Tom', 'was', 'playing', 'football', 'at', 'four', "o'clock."], [3],
      'Tom was playing a computer game at four o\'clock.'),
    correct('rr7', RAINY, 'Tom was playing football at four o\'clock.',
      'Tom was playing a computer game at four o\'clock.',
      'Tom wasn\'t playing at four o\'clock.',
      'Lucy was playing football at four o\'clock.'),

    trueFalse('rr8', RAINY, 'Their mum was cooking pizza.', false),
    mistake('rr9', RAINY, ['Their', 'mum', 'was', 'cooking', 'pizza.'], [1],
      'Their dad was cooking pizza.'),

    trueFalse('rr10', RAINY, 'Lucy found a torch in the fridge.', false),
    mistake('rr11', RAINY, ['Lucy', 'found', 'a', 'torch', 'in', 'the', 'fridge.'], [6],
      'Lucy found a torch in a drawer.'),

    trueFalse('rr12', RAINY, 'In the end, they ate the pizza together.', true),

    fullAnswer('rr13', RAINY, 'Why were Lucy and Tom staying at home?',
      'They were staying at home because it was raining.',
      'Because raining.',
      'They are staying at home because it is raining.'),
    fullAnswer('rr14', RAINY, 'What was Tom doing at four o\'clock?',
      'He was playing a computer game.',
      'A computer game.',
      'He plays a computer game.'),
    fullAnswer('rr15', RAINY, 'What did Lucy find?',
      'She found a torch.',
      'A torch.',
      'She was find a torch.'),
    fullAnswer('rr16', RAINY, 'How did Tom feel when the lights went out?',
      'He felt scared.',
      'Scared.',
      'He feel scared.'),
  ],
}

const readingDoctor: Practice = {
  id: 'finals-reading-doctor',
  title: 'Reading 2: Doctor Rosa',
  description: 'Read the text: true or false, find the mistake, correct it and answer with full answers.',
  emoji: '🩺',
  questions: [
    trueFalse('rd1', DOCTOR, 'Rosa works in a hospital.', true),

    trueFalse('rd2', DOCTOR, 'Leo had a terrible headache.', false),
    mistake('rd3', DOCTOR, ['Leo', 'had', 'a', 'terrible', 'headache.'], [4],
      'Leo had a terrible stomach ache.'),
    correct('rd4', DOCTOR, 'Leo had a terrible headache.',
      'Leo had a terrible stomach ache.',
      'Leo didn\'t have a headache.',
      'Rosa had a terrible headache.'),

    trueFalse('rd5', DOCTOR, 'Leo should drink fizzy drinks.', false),
    mistake('rd6', DOCTOR, ['Leo', 'should', 'drink', 'fizzy', 'drinks.'], [1],
      'Leo shouldn\'t drink fizzy drinks.'),
    correct('rd7', DOCTOR, 'Leo should drink fizzy drinks.',
      'Leo shouldn\'t drink fizzy drinks.',
      'Leo should drink fizzy water.',
      'Leo will drink fizzy drinks.'),

    trueFalse('rd8', DOCTOR, 'Leo had a sore throat.', false),
    mistake('rd9', DOCTOR, ['Leo', 'had', 'a', 'sore', 'throat.'], [3, 4],
      'Leo had a cough.'),

    trueFalse('rd10', DOCTOR, 'Rosa thinks Leo won\'t feel better.', false),
    mistake('rd11', DOCTOR, ['Rosa', 'thinks', 'Leo', "won't", 'feel', 'better.'], [3],
      'Rosa thinks Leo will feel better.'),

    trueFalse('rd12', DOCTOR, 'In the future, doctors will use robots.', true),

    fullAnswer('rd13', DOCTOR, 'Why did Leo go to the hospital?',
      'He went to the hospital because he had a terrible stomach ache.',
      'Stomach ache.',
      'He goes to the hospital because he has a stomach ache.'),
    fullAnswer('rd14', DOCTOR, 'What should Leo eat?',
      'He should eat fruit and vegetables.',
      'Fruit and vegetables.',
      'He shouldn\'t eat fruit and vegetables.'),
    fullAnswer('rd15', DOCTOR, 'What was Leo eating every day?',
      'He was eating too many sweets.',
      'Sweets.',
      'He eats too many sweets.'),
    fullAnswer('rd16', DOCTOR, 'Will people still need doctors in the future?',
      'Yes, they will. They will need doctors who listen to them.',
      'Yes.',
      'No, they won\'t.'),
  ],
}

// ========================================================= USE OF ENGLISH ====

// ------------------------------------------------ Vocabulario Unit 5 ----
// Problemas de salud (Academy Stars 4, Unit 5).
const vocabHealth: Practice = {
  id: 'finals-vocab-health',
  title: 'Vocabulario: health problems',
  description: 'Read the definition and choose the health problem — and in some, assemble the word. (Unit 5)',
  emoji: '🤒',
  questions: [
    pick('vh1', 'Your head hurts.', 'You have got a headache.',
      'a headache', 'an earache', 'a toothache'),
    pick('vh2', 'Your tooth hurts and you should go to the dentist.', 'You have got a toothache.',
      'a toothache', 'a headache', 'a cough'),
    pick('vh3', 'Your ear hurts.', 'You have got an earache.',
      'an earache', 'a stomach ache', 'a cut'),
    pick('vh4', 'You ate too many sweets and your tummy hurts.', 'You have got a stomach ache.',
      'a stomach ache', 'a sore throat', 'a broken arm'),
    pick('vh5', 'It hurts when you speak or eat because your throat is red.', 'You have got a sore throat.',
      'a sore throat', 'a cough', 'a temperature'),
    pick('vh6', 'You fell off your bike and now you can\'t move your arm.', 'You have got a broken arm.',
      'a broken arm', 'a cut', 'flu'),
    pick('vh7', 'You are very hot and you need a thermometer.', 'You have got a temperature.',
      'a temperature', 'a cough', 'an earache'),
    pick('vh8', 'You cut your finger with a knife and it is bleeding.', 'You have got a cut.',
      'a cut', 'a broken arm', 'a sore throat'),
    pick('vh9', 'You are tired, you have got a temperature and your body hurts.', 'You have got flu.',
      'flu', 'a cut', 'a toothache'),
    pick('vh10', 'You make a loud noise from your chest: "cough, cough!"', 'You have got a cough.',
      'a cough', 'a headache', 'a stomach ache'),
    spell('vh11', 'your head hurts.', 'headache'),
    spell('vh12', 'you are ill with a temperature and your body hurts.', 'flu'),
    spell('vh13', '"cough, cough!"', 'cough'),
  ],
}

// ---------------------------------------------- Should / shouldn't ----
const should: Practice = {
  id: 'finals-should',
  title: "Should / shouldn't",
  description: 'Give advice: should (good idea) or shouldn\'t (bad idea).',
  emoji: '💡',
  questions: [
    pick('sh1', 'You ___ be active. Go for a walk!', 'It is a good idea → should.',
      'should', "shouldn't"),
    pick('sh2', 'You ___ eat too many sweets.', 'It is a bad idea → shouldn\'t.',
      "shouldn't", 'should'),
    pick('sh3', 'I have got a toothache. — You ___ go to the dentist.', 'Good idea → should.',
      'should', "shouldn't"),
    pick('sh4', 'She has got a temperature. She ___ go to school today.', 'Bad idea → shouldn\'t.',
      "shouldn't", 'should'),
    pick('sh5', 'They ___ drink lots of water every day.', 'Good idea → should.',
      'should', "shouldn't"),
    pick('sh6', 'He has got a sore throat. He ___ eat ice cream.', 'Bad idea → shouldn\'t.',
      "shouldn't", 'should'),
    pick('sh7', 'You ___ wash your hands before you eat.', 'Good idea → should.',
      'should', "shouldn't"),
    pick('sh8', 'We ___ watch TV all day.', 'Bad idea → shouldn\'t.',
      "shouldn't", 'should'),
    pick('sh9', 'Choose the correct sentence.', 'After should / shouldn\'t, the verb goes WITHOUT "to" and without "-s".',
      'You should sleep nine hours.', 'You should to sleep nine hours.', 'You should sleeps nine hours.'),
    pick('sh10', 'I have got a cut on my finger. What should I do?', 'Good advice uses should.',
      'You should wash it and put a plaster on it.', 'You shouldn\'t wash it.', 'You should play football.'),
    pick('sh11', 'I have got a headache. Which is GOOD advice?', 'Good advice uses should; bad ideas use shouldn\'t.',
      'You shouldn\'t play computer games.', 'You should play computer games all night.', 'You shouldn\'t rest.'),
  ],
}

// ---------------------------------- Nouns, verbs, adjectives, adverbs ----
const wordTypes: Practice = {
  id: 'finals-word-types',
  title: 'Nouns - verbs - adjectives - adverbs',
  description: 'Classify the words and choose the correct word type.',
  emoji: '🔠',
  questions: [
    {
      id: 'wt1',
      kind: 'classify',
      prompt: 'Is it a noun, a verb, an adjective or an adverb?',
      explanation:
        'Noun = a thing, person or place. Verb = an action. Adjective = how something IS. Adverb = HOW you do something (often -ly).',
      categories: ['NOUN', 'VERB', 'ADJECTIVE', 'ADVERB'],
      checkOnDrop: true,
      items: [
        { text: 'doctor', category: 'NOUN' },
        { text: 'computer', category: 'NOUN' },
        { text: 'invent', category: 'VERB' },
        { text: 'run', category: 'VERB' },
        { text: 'happy', category: 'ADJECTIVE' },
        { text: 'quiet', category: 'ADJECTIVE' },
        { text: 'quickly', category: 'ADVERB' },
        { text: 'carefully', category: 'ADVERB' },
      ],
    },
    {
      id: 'wt2',
      kind: 'classify',
      prompt: 'Is it a noun, a verb, an adjective or an adverb?',
      explanation:
        'Noun = a thing, person or place. Verb = an action. Adjective = how something IS. Adverb = HOW you do something (often -ly).',
      categories: ['NOUN', 'VERB', 'ADJECTIVE', 'ADVERB'],
      checkOnDrop: true,
      items: [
        { text: 'hospital', category: 'NOUN' },
        { text: 'robot', category: 'NOUN' },
        { text: 'grow', category: 'VERB' },
        { text: 'build', category: 'VERB' },
        { text: 'healthy', category: 'ADJECTIVE' },
        { text: 'slow', category: 'ADJECTIVE' },
        { text: 'slowly', category: 'ADVERB' },
        { text: 'loudly', category: 'ADVERB' },
      ],
    },
    pick('wt3', 'She is a ___ singer.', 'Before a noun (singer) → adjective.',
      'beautiful', 'beautifully'),
    pick('wt4', 'She sings ___.', 'How does she sing? → adverb.',
      'beautifully', 'beautiful'),
    pick('wt5', 'The tortoise walked ___ to the stream.', 'How did it walk? → adverb.',
      'slowly', 'slow'),
    pick('wt6', 'Be ___! The road is dangerous.', 'After "be" → adjective.',
      'careful', 'carefully'),
    pick('wt7', 'The children were playing ___ in the park.', 'How were they playing? → adverb.',
      'happily', 'happy'),
    pick('wt8', 'In "The dog barked loudly", which word is the VERB?', 'barked = the action.',
      'barked', 'dog', 'loudly'),
    pick('wt9', 'In "My clever sister invented a robot", which word is the ADJECTIVE?', 'clever tells us how the sister IS.',
      'clever', 'invented', 'robot'),
    pick('wt10', 'In "The scientist worked quietly", which word is the NOUN?', 'scientist = a person.',
      'scientist', 'worked', 'quietly'),
  ],
}

// --------------------------------------------- Who / where / which ----
const relatives: Practice = {
  id: 'finals-who-where-which',
  title: 'Who - where - which',
  description: 'Join two sentences: who (people), where (places), which (things and animals).',
  emoji: '🔗',
  questions: [
    pick('rw1', 'This is the man ___ invented the first computer.', 'A person → who.',
      'who', 'where', 'which'),
    pick('rw2', 'This is the museum ___ we saw the robots.', 'A place → where.',
      'where', 'who', 'which'),
    pick('rw3', 'This is the phone ___ my dad bought.', 'A thing → which.',
      'which', 'who', 'where'),
    pick('rw4', 'A doctor is a person ___ helps people who are ill.', 'A person → who.',
      'who', 'which', 'where'),
    pick('rw5', 'A hospital is a place ___ doctors work.', 'A place → where.',
      'where', 'which', 'who'),
    pick('rw6', 'A thermometer is a thing ___ tells you your temperature.', 'A thing → which.',
      'which', 'who', 'where'),
    pick('rw7', 'That is the park ___ I ride my bike.', 'A place → where.',
      'where', 'which', 'who'),
    pick('rw8', 'She is the girl ___ won the race.', 'A person → who.',
      'who', 'where', 'which'),
    pick('rw9', 'Join: "This is a car. It can fly."', 'The car is a thing → which.',
      'This is a car which can fly.', 'This is a car who can fly.', 'This is a car where can fly.'),
    pick('rw10', 'Join: "Da Vinci is a man. He painted the Mona Lisa."', 'Da Vinci is a person → who.',
      'Da Vinci is the man who painted the Mona Lisa.', 'Da Vinci is the man which painted the Mona Lisa.', 'Da Vinci is the man where painted the Mona Lisa.'),
    pick('rw11', 'Join: "This is the school. I study here."', 'The school is a place → where.',
      'This is the school where I study.', 'This is the school who I study.', 'This is the school which I study here.'),
  ],
}

// ------------------------------------------------------ Will / won't ----
const will: Practice = {
  id: 'finals-will',
  title: "Will / won't",
  description: 'Future predictions: affirmative, negative and questions with short answers.',
  emoji: '🔮',
  questions: [
    pick('wl1', 'If we water them, plants ___ grow.', 'Affirmative prediction → will.',
      'will', "won't"),
    pick('wl2', 'Without water, plants ___ grow.', 'Negative prediction → won\'t (will not).',
      "won't", 'will'),
    pick('wl3', 'In the future, people ___ travel to Mars.', 'Prediction → will + verb.',
      'will', 'wills', 'will to'),
    pick('wl4', 'Choose the correct sentence.', 'After will / won\'t, the verb goes WITHOUT "to" and without "-s".',
      'Robots will help us at home.', 'Robots will helps us at home.', 'Robots will to help us at home.'),
    pick('wl5', 'Choose the correct NEGATIVE.', 'Negative → won\'t + verb.',
      'Children won\'t use paper books.', 'Children will not to use paper books.', 'Children don\'t will use paper books.'),
    pick('wl6', 'Choose the correct QUESTION.', 'Question → Will + subject + verb?',
      'Will children still use books?', 'Children will still use books?', 'Do children will still use books?'),
    pick('wl7', 'Will cars fly in the future? (✔)', 'Short answer: Yes, they will.',
      'Yes, they will.', 'Yes, they do.', 'Yes, they fly.'),
    pick('wl8', 'Will it rain tomorrow? (✘)', 'Short answer: No, it won\'t.',
      "No, it won't.", "No, it doesn't.", "No, it isn't."),
    pick('wl9', 'Will you be a doctor? (✔)', 'Short answer: Yes, I will.',
      'Yes, I will.', 'Yes, I am.', 'Yes, you will.'),
    pick('wl10', '"Will robots be our teachers?" "No, they ___."', 'Short negative answer → won\'t.',
      "won't", "don't", "aren't"),
  ],
}

// --------------------------------------------- Past continuous (Unit 6) ----
// Las mismas prácticas del 2nd Midterms: también entran en el final.
const pastContinuous = grade4Unit6Practices.filter((p) => p.id.startsWith('u6-pc-'))
const vocabOutdoors = grade4Unit6Practices.filter((p) => p.id === 'u6-vocab-naturaleza')

// ================================================================ WRITING ====

const linkers: Practice = {
  id: 'finals-writing-linkers',
  title: 'Writing: linkers and connectors',
  description: 'One day, then, after that, later, in the end… and, but, because.',
  emoji: '🧩',
  questions: [
    pick('wk1', '___, Ben was walking in the forest with his dog. (BEGINNING)', 'A story starts with "One day…".',
      'One day', 'In the end', 'After that'),
    pick('wk2', 'They were walking near the stream. ___, the dog ran into the trees.', 'Something happens next → Then.',
      'Then', 'One day', 'In the end'),
    pick('wk3', '___, the family arrived home and had a delicious dinner. (END)', 'The last paragraph starts with "In the end…".',
      'In the end', 'One day', 'Because'),
    pick('wk4', 'Ben looked for his dog. ___, he heard a loud bark.', 'Something happens next → After that.',
      'After that', 'One day', 'But'),
    pick('wk5', 'We stayed at home ___ it was raining.', 'The reason → because.',
      'because', 'but', 'then'),
    pick('wk6', 'Lucy was happy ___ she found her cat.', 'The reason → because.',
      'because', 'but', 'and'),
    pick('wk7', 'Tom was scared, ___ Lucy wasn\'t.', 'Two different ideas → but.',
      'but', 'because', 'and'),
    pick('wk8', 'They played cards ___ ate pizza.', 'Adding information → and.',
      'and', 'but', 'because'),
    pick('wk9', 'The dog was tired ___ it ran all day.', 'The reason → because.',
      'because', 'but', 'then'),
    pick('wk10', 'I wanted to play outside, ___ it was raining.', 'Two different ideas → but.',
      'but', 'and', 'because'),
  ],
}

const storyTenses: Practice = {
  id: 'finals-writing-tenses',
  title: 'Writing: past simple and past continuous',
  description: 'Past continuous for the background (was walking), past simple for the actions (saw).',
  emoji: '📜',
  questions: [
    pick('st1', 'I ___ home when I saw a shooting star.', 'The long action → past continuous (was walking).',
      'was walking', 'walked', 'am walking'),
    pick('st2', 'We were having dinner when the lights ___ out.', 'The short action that interrupts → past simple (went).',
      'went', 'were going', 'go'),
    pick('st3', 'While Mia ___ a book, her brother was playing.', 'Two long actions at the same time → past continuous.',
      'was reading', 'read', 'reads'),
    pick('st4', 'It ___ when we left school.', 'The background → past continuous.',
      'was raining', 'rained', 'is raining'),
    pick('st5', 'The children were playing football when the dog ___ the ball.', 'The short action → past simple.',
      'took', 'was taking', 'takes'),
    pick('st6', 'Choose the correct sentence.', 'Long action (was cooking) + short action (burnt).',
      'Dad was cooking when he burnt his finger.', 'Dad cooked when he was burning his finger.', 'Dad was cook when he burnt his finger.'),
    pick('st7', 'Yesterday at six o\'clock, my friends ___ TV.', 'They are a plural subject → were + -ing.',
      'were watching', 'was watching', 'watching'),
    pick('st8', 'Choose the sentence with an ADJECTIVE and an ADVERB.', '"big" is an adjective and "loudly" is an adverb.',
      'The big dog barked loudly.', 'The dog barked.', 'A dog was in the park.'),
  ],
}

const punctuation: Practice = {
  id: 'finals-writing-punctuation',
  title: 'Writing: punctuation',
  description: 'Choose the sentence with the correct punctuation: , . “ ” ! ?',
  emoji: '✒️',
  questions: [
    pick('pu1', 'Choose the correct punctuation.', 'What a person says goes between “ ”.',
      '“Help!” shouted Ben.', 'Help! shouted Ben.', '“Help! shouted Ben.”'),
    pick('pu2', 'Choose the correct punctuation.', 'A comma after the linker, and a full stop at the end.',
      'One day, Lucy was walking in the park.', 'One day Lucy, was walking in the park', 'one day, lucy was walking in the park.'),
    pick('pu3', 'Choose the correct punctuation.', 'A question ends with ?',
      'Where is my dog?', 'Where is my dog.', 'where is my dog?'),
    pick('pu4', 'Choose the correct punctuation.', 'Commas separate the things in a list.',
      'We took apples, sandwiches and water.', 'We took apples sandwiches and water.', 'We took, apples, sandwiches, and, water.'),
    pick('pu5', 'Choose the correct punctuation.', 'Start with a CAPITAL letter, put the words said between “ ” and end with a full stop.',
      'Mum said, “Dinner is ready.”', 'mum said, dinner is ready.', 'Mum said “dinner is ready”'),
    pick('pu6', 'Choose the correct punctuation.', 'A comma after "In the end".',
      'In the end, they went home.', 'In the end they, went home.', 'In the end. They went home'),
  ],
}

// Ordenar la historia: cada oración a su párrafo (beginning, middle, end).
const storyParts: Practice = {
  id: 'finals-writing-parts',
  title: 'Writing: beginning, middle and end',
  description: 'Put each sentence of the story in the correct paragraph.',
  emoji: '📚',
  questions: [
    {
      id: 'sp1',
      kind: 'classify',
      prompt: 'Is it the BEGINNING, the MIDDLE or the END of the story?',
      explanation:
        'Beginning: who, where and when (One day…). Middle: the problem (Suddenly…, Then…). End: how it finishes (In the end…).',
      categories: ['BEGINNING', 'MIDDLE', 'END'],
      checkOnDrop: true,
      items: [
        { text: 'One day, Sam and his sister were camping near a stream.', category: 'BEGINNING' },
        { text: 'It was a sunny afternoon and the birds were singing.', category: 'BEGINNING' },
        { text: 'Suddenly, a big storm started.', category: 'MIDDLE' },
        { text: 'Then, the wind blew their tent away!', category: 'MIDDLE' },
        { text: 'In the end, a kind farmer helped them and they went home.', category: 'END' },
        { text: 'They were tired but very happy.', category: 'END' },
      ],
    },
    {
      id: 'sp2',
      kind: 'classify',
      prompt: 'Is it the BEGINNING, the MIDDLE or the END of the story?',
      explanation:
        'Beginning: who, where and when (One day…). Middle: the problem (Suddenly…, After that…). End: how it finishes (In the end…).',
      categories: ['BEGINNING', 'MIDDLE', 'END'],
      checkOnDrop: true,
      items: [
        { text: 'One day, Emma was walking her dog in the park.', category: 'BEGINNING' },
        { text: 'Suddenly, the dog ran after a cat.', category: 'MIDDLE' },
        { text: 'After that, Emma looked for him everywhere.', category: 'MIDDLE' },
        { text: 'In the end, she found him sleeping under a tree.', category: 'END' },
      ],
    },
  ],
}

export const grade4FinalsReadingPractices: Practice[] = [readingRainy, readingDoctor]

export const grade4FinalsUseOfEnglishPractices: Practice[] = [
  vocabHealth,
  ...vocabOutdoors,
  should,
  ...pastContinuous,
  wordTypes,
  relatives,
  will,
]

export const grade4FinalsWritingPractices: Practice[] = [
  linkers,
  storyTenses,
  punctuation,
  storyParts,
]
