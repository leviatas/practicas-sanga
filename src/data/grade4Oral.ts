import type { Practice } from '../types'

// ============================================================================
// 4to GRADO — MIDTERMS ORAL.
// El alumno LEE/escucha la definición y DICE la palabra en inglés; la app valida
// con reconocimiento de voz (kind 'speak', ver components/SpeakCheck.tsx).
//
// Se reutiliza el vocabulario del "1st Midterms" (oficios, lugares, la bici y
// animales). Reglas:
//  - Enunciados SIEMPRE en inglés.
//  - `answer` es lo que hay que decir; `accept` suma variantes que el
//    reconocedor suele confundir (homófonos, plurales), para no penalizar de
//    más una respuesta que en realidad está bien dicha.
// ============================================================================

export const grade4OralPractices: Practice[] = [
  // ------------------------------------------------ Unit 4: People at work ----
  {
    id: 'oral-oficios',
    title: 'Oral: oficios',
    description: 'Read the definition and say the job out loud in English. (Unit 4)',
    emoji: '🗣️',
    questions: [
      { id: 'oj1', kind: 'speak', prompt: 'Say it: this person catches criminals and keeps people safe.',
        answer: 'a police officer', accept: ['police officer', 'policeman', 'police'] },
      { id: 'oj2', kind: 'speak', prompt: 'Say it: this person cooks food in a restaurant.',
        answer: 'a chef', accept: ['chef', 'shef'] },
      { id: 'oj3', kind: 'speak', prompt: 'Say it: this person takes photos as their job.',
        answer: 'a photographer', accept: ['photographer'] },
      { id: 'oj4', kind: 'speak', prompt: 'Say it: this person fixes water pipes, taps and toilets.',
        answer: 'a plumber', accept: ['plumber', 'plummer'] },
      { id: 'oj5', kind: 'speak', prompt: 'Say it: this person looks after sick people in a hospital.',
        answer: 'a nurse', accept: ['nurse', 'nurs'] },
      { id: 'oj6', kind: 'speak', prompt: 'Say it: this person checks and fixes your teeth.',
        answer: 'a dentist', accept: ['dentist'] },
      { id: 'oj7', kind: 'speak', prompt: 'Say it: this person knows the law and helps people in court.',
        answer: 'a lawyer', accept: ['lawyer', 'loyer'] },
      { id: 'oj8', kind: 'speak', prompt: 'Say it: this person designs and builds machines, roads and bridges.',
        answer: 'an engineer', accept: ['engineer'] },
      { id: 'oj9', kind: 'speak', prompt: 'Say it: this person paints and draws pictures.',
        answer: 'an artist', accept: ['artist', 'artis'] },
    ],
  },

  // ------------------------------------------------- Unit 1: Different lives ----
  {
    id: 'oral-lugares',
    title: 'Oral: lugares',
    description: 'Read the definition and say the place out loud in English. (Unit 1)',
    emoji: '🗺️',
    questions: [
      { id: 'ol1', kind: 'speak', prompt: 'Say it: water that falls straight down from a high place.',
        answer: 'a waterfall', accept: ['waterfall', 'water fall'] },
      { id: 'ol2', kind: 'speak', prompt: 'Say it: a piece of land with water all around it.',
        answer: 'an island', accept: ['island'] },
      { id: 'ol3', kind: 'speak', prompt: 'Say it: a big area of water with land all around it.',
        answer: 'a lake', accept: ['lake'] },
      { id: 'ol4', kind: 'speak', prompt: 'Say it: a long line of water that flows to the sea.',
        answer: 'a river', accept: ['river'] },
      { id: 'ol5', kind: 'speak', prompt: 'Say it: a mountain that can throw out hot lava and smoke.',
        answer: 'a volcano', accept: ['volcano', 'vulcano'] },
      { id: 'ol6', kind: 'speak', prompt: 'Say it: land that is high, but lower than a mountain.',
        answer: 'a hill', accept: ['hill', 'heel'] },
      { id: 'ol7', kind: 'speak', prompt: 'Say it: a big area with a lot of trees.',
        answer: 'a forest', accept: ['forest', 'forrest'] },
      { id: 'ol8', kind: 'speak', prompt: 'Say it: a very small town in the countryside.',
        answer: 'a village', accept: ['village'] },
      { id: 'ol9', kind: 'speak', prompt: 'Say it: a place with houses and shops, bigger than a village.',
        answer: 'a town', accept: ['town', 'down'] },
    ],
  },

  // --------------------------------------------------- Unit 3: Super cycling ----
  {
    id: 'oral-bici',
    title: 'Oral: la bici',
    description: 'Read the definition and say the bike word out loud in English. (Unit 3)',
    emoji: '🚲',
    questions: [
      { id: 'ob1', kind: 'speak', prompt: 'Say it: you ring this to warn people that you are coming.',
        answer: 'a bell', accept: ['bell', 'bel'] },
      { id: 'ob2', kind: 'speak', prompt: 'Say it: you change these to pedal more easily up a hill.',
        answer: 'gears', accept: ['gears', 'gear', 'years'] },
      { id: 'ob3', kind: 'speak', prompt: 'Say it: you use this to put air in the tyres.',
        answer: 'a pump', accept: ['pump'] },
      { id: 'ob4', kind: 'speak', prompt: 'Say it: you use this so nobody can steal your bike.',
        answer: 'a lock', accept: ['lock'] },
      { id: 'ob5', kind: 'speak', prompt: 'Say it: you put things in this at the front of the bike.',
        answer: 'a basket', accept: ['basket'] },
      { id: 'ob6', kind: 'speak', prompt: 'Say it: you turn this on so people can see you in the dark.',
        answer: 'a light', accept: ['light', 'lite'] },
      { id: 'ob7', kind: 'speak', prompt: 'Say it: you use these to stop the bike.',
        answer: 'brakes', accept: ['brakes', 'brake', 'breaks'] },
      { id: 'ob8', kind: 'speak', prompt: 'Say it: you wear this bright jacket so drivers can see you.',
        answer: 'a safety vest', accept: ['safety vest', 'safety best'] },
      { id: 'ob9', kind: 'speak', prompt: 'Say it: a round part of the bike that turns on the road.',
        answer: 'a wheel', accept: ['wheel', 'will'] },
      { id: 'ob10', kind: 'speak', prompt: 'Say it: a person who rides a bike.',
        answer: 'a cyclist', accept: ['cyclist'] },
    ],
  },

  // --------------------------------------------------- Unit 1: Holiday news ----
  {
    id: 'oral-animales',
    title: 'Oral: animales',
    description: 'Read the definition and say the animal out loud in English. (Unit 1)',
    emoji: '🐸',
    questions: [
      { id: 'oa1', kind: 'speak', prompt: 'Say it: a small creature that later turns into a butterfly.',
        answer: 'a caterpillar', accept: ['caterpillar'] },
      { id: 'oa2', kind: 'speak', prompt: 'Say it: a sea animal with a hard shell and ten legs.',
        answer: 'a crab', accept: ['crab', 'grab'] },
      { id: 'oa3', kind: 'speak', prompt: 'Say it: a tiny flying insect that bites you and drinks blood.',
        answer: 'a mosquito', accept: ['mosquito'] },
      { id: 'oa4', kind: 'speak', prompt: 'Say it: a big bird with a beautiful blue and green tail.',
        answer: 'a peacock', accept: ['peacock', 'pea cock'] },
      { id: 'oa5', kind: 'speak', prompt: 'Say it: a small green animal that jumps and lives near water.',
        answer: 'a frog', accept: ['frog'] },
      { id: 'oa6', kind: 'speak', prompt: 'Say it: a small animal with a big furry tail that climbs trees.',
        answer: 'a squirrel', accept: ['squirrel', 'squirl'] },
    ],
  },
]
