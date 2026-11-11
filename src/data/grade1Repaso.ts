import type { MatchPair, Practice, Question } from '../types'

// ============================================================================
// 1er GRADO — English: REPASO
//
// Una práctica por cada ficha que pasó la seño, con los MISMOS dibujos de la
// fotocopia (recortados, ver src/components/repasoImages.ts):
//  - They are / They aren't, It is / It isn't y Can / Can't: cada tarjeta de
//    la ficha es una pregunta. Donde la fotocopia tiene el renglón en blanco,
//    las dos opciones van ADENTRO del hueco y el chico toca la correcta.
//  - Body parts (en dos fichas, como en el papel: si no, son demasiados
//    dibujos y no entran en la pantalla) y Animals: unir cada dibujo con su
//    palabra, toda la ficha de una vez.
// ============================================================================

const THEY = ['THEY ARE', "THEY AREN'T"]
const IT = ['IT IS', "IT ISN'T"]
const CAN = ['CAN', "CAN'T"]

/** Una tarjeta de la ficha: dibujo + oración con el hueco para tocar. */
function card(
  id: string,
  image: string,
  prompt: string,
  blank: string,
  choices: string[],
  answer: string,
  explanation?: string,
): Question {
  return {
    id,
    image,
    prompt,
    blank,
    keepOrder: true,
    options: choices.map((text) => ({ text, correct: text === answer || undefined })),
    explanation,
  }
}

const theyAre = (id: string, image: string, question: string, yes: boolean) =>
  card(id, image, question, yes ? 'YES, ___.' : 'NO, ___.', THEY, yes ? 'THEY ARE' : "THEY AREN'T")

const itIs = (id: string, image: string, question: string, yes: boolean) =>
  card(id, image, question, yes ? 'YES, ___.' : 'NO, ___.', IT, yes ? 'IT IS' : "IT ISN'T")

const COMPLETE_CAN = "COMPLETE WITH CAN OR CAN'T."
const canCant = (id: string, image: string, sentence: string, can: boolean) =>
  card(
    id,
    image,
    COMPLETE_CAN,
    sentence,
    CAN,
    can ? 'CAN' : "CAN'T",
    can ? undefined : "La ✗ del dibujo quiere decir que NO puede: CAN'T.",
  )

/** Una ficha de "Match with arrows" entera, en una sola pregunta. */
function matchSheet(id: string, pairs: MatchPair[]): Question {
  return { id, kind: 'match', prompt: 'MATCH WITH ARROWS.', pairs }
}

export const grade1RepasoPractices: Practice[] = [
  {
    id: 'repaso-they-are',
    title: "They are / They aren't",
    description: "Mirá los dos animales y tocá THEY ARE o THEY AREN'T en el hueco.",
    emoji: '🐴',
    questions: [
      theyAre('rta1', 'they-horses', 'ARE THEY TWO HORSES?', true),
      theyAre('rta2', 'they-dogs', 'ARE THEY TWO HORSES?', false),
      theyAre('rta3', 'they-tortoises', 'ARE THEY TWO FISHES?', false),
      theyAre('rta4', 'they-fish', 'ARE THEY TWO FISHES?', true),
      theyAre('rta5', 'they-birds', 'ARE THEY TWO BIRDS?', true),
      theyAre('rta6', 'they-cats', 'ARE THEY TWO BIRDS?', false),
      theyAre('rta7', 'they-hamsters', 'ARE THEY TWO HAMSTERS?', true),
      theyAre('rta8', 'they-rabbits', 'ARE THEY TWO HAMSTERS?', false),
    ],
  },
  {
    id: 'repaso-is-it',
    title: "Is it…? It is / It isn't",
    description: "Mirá el animal y tocá IT IS o IT ISN'T en el hueco.",
    emoji: '🐰',
    questions: [
      itIs('rii1', 'isit-rabbit', 'IS IT A RABBIT?', true),
      itIs('rii2', 'isit-dog', 'IS IT A RABBIT?', false),
      itIs('rii3', 'isit-fish', 'IS IT A HORSE?', false),
      itIs('rii4', 'isit-horse', 'IS IT A HORSE?', true),
      itIs('rii5', 'isit-tortoise', 'IS IT A TORTOISE?', true),
      itIs('rii6', 'isit-bird-1', 'IS IT A TORTOISE?', false),
      itIs('rii7', 'isit-bird-2', 'IS IT A BIRD?', true),
      itIs('rii8', 'isit-hamster', 'IS IT A BIRD?', false),
    ],
  },
  {
    id: 'repaso-can-cant',
    title: "Can / Can't",
    description: "Mirá el dibujo (¡ojo con la ✗!) y tocá CAN o CAN'T en el hueco.",
    emoji: '🐟',
    questions: [
      canCant('rcc1', 'can-dog-swim', 'THE DOG ___ SWIM.', false),
      canCant('rcc2', 'can-fish-swim', 'THE FISH ___ SWIM.', true),
      canCant('rcc3', 'can-rabbit-jump', 'THE RABBIT ___ JUMP.', true),
      canCant('rcc4', 'can-tortoise-jump', 'THE TORTOISE ___ JUMP.', false),
      canCant('rcc5', 'can-horse-dance', 'THE HORSE ___ DANCE.', true),
      canCant('rcc6', 'can-bird-dance', 'THE BIRD ___ DANCE.', true),
      canCant('rcc7', 'can-cat-dance', 'THE CAT ___ DANCE.', false),
      canCant('rcc8', 'can-hamster-play', 'THE HAMSTER ___ PLAY.', true),
    ],
  },
  {
    id: 'repaso-body-parts-1',
    title: 'Body parts (1)',
    description: 'Uní cada dibujo con su palabra: head, ears, eyes, mouth, nose, fingers y body.',
    emoji: '👂',
    questions: [
      matchSheet('rbp1', [
        { image: 'bp-head', word: 'HEAD' },
        { image: 'bp-ears', word: 'EARS' },
        { image: 'bp-eyes', word: 'EYES' },
        { image: 'bp-mouth', word: 'MOUTH' },
        { image: 'bp-nose', word: 'NOSE' },
        { image: 'bp-fingers', word: 'FINGERS' },
        { image: 'bp-body', word: 'BODY' },
      ]),
    ],
  },
  {
    id: 'repaso-body-parts-2',
    title: 'Body parts (2)',
    description: 'Uní cada dibujo con su palabra: toes, arms, feet, foot, hair, hands y legs.',
    emoji: '🦶',
    questions: [
      matchSheet('rbp2', [
        { image: 'bp-toes', word: 'TOES' },
        { image: 'bp-arms', word: 'ARMS' },
        { image: 'bp-feet', word: 'FEET' },
        { image: 'bp-foot', word: 'FOOT' },
        { image: 'bp-hair', word: 'HAIR' },
        { image: 'bp-hands', word: 'HANDS' },
        { image: 'bp-legs', word: 'LEGS' },
      ]),
    ],
  },
  {
    id: 'repaso-animals',
    title: 'Animals',
    description: 'Uní cada animal con su nombre en inglés.',
    emoji: '🐢',
    questions: [
      matchSheet('ran1', [
        { image: 'an-bird', word: 'BIRD' },
        { image: 'an-cat', word: 'CAT' },
        { image: 'an-dog', word: 'DOG' },
        { image: 'an-fish', word: 'FISH' },
        { image: 'an-hamster', word: 'HAMSTER' },
        { image: 'an-horse', word: 'HORSE' },
        { image: 'an-rabbit', word: 'RABBIT' },
        { image: 'an-tortoise', word: 'TORTOISE' },
      ]),
    ],
  },
]
