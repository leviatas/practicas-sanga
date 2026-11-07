import type { Practice, Question } from '../types'

// ============================================================================
// 1er GRADO — Matemática — "Alto en el camino III"
// (semana del 24 de noviembre). Temario:
//  1) Situaciones problemáticas de suma y resta, en el contexto del dinero.
//  2) Cálculos mentales: sumas que dan 10 y suma de iguales (dobles).
//  3) Medida.
// (Libro de matemática, capítulos 6 y 7, y el cuaderno.)
//
// Las consignas dicen "pesos" en letras (no "$") porque se leen en voz alta;
// en las opciones sí va el signo $.
// ============================================================================

// Opciones numéricas en orden (de menor a mayor), con una sola correcta.
function nums(correcta: number, otras: number[], prefijo = ''): Question['options'] {
  return [correcta, ...otras]
    .sort((a, b) => a - b)
    .map((n) => ({ text: `${prefijo}${n}`, correct: n === correcta }))
}

// Cálculo mental rápido: al tocar se corrige y pasa sola a la siguiente.
function calculo(id: string, cuenta: string, correcta: number, otras: number[]): Question {
  return {
    id,
    prompt: `${cuenta} = ⋯`,
    autoNext: true,
    keepOrder: true,
    options: nums(correcta, otras),
  }
}

export const grade1MatematicaAlto3Practices: Practice[] = [
  // ======================= 1. PROBLEMAS CON DINERO ==========================
  {
    id: 'problemas-dinero',
    title: 'Problemas con plata: suma y resta',
    description:
      'Comprar, juntar, gastar y recibir vuelto. Leé el problema y pensá: ¿tengo más o tengo menos?',
    emoji: '💵',
    questions: [
      {
        id: 'pd1', emoji: '🐷💵',
        prompt: 'Sofía tiene 20 pesos en la alcancía. Su abuela le regala 10 pesos más. ¿Cuánta plata tiene ahora?',
        keepOrder: true, options: nums(30, [10, 20, 40], '$'),
        explanation: 'Le regalan: tiene MÁS. Se suma: 20 + 10 = 30.',
      },
      {
        id: 'pd2', emoji: '🍭',
        prompt: 'Tomás tiene 50 pesos y se compra un chupetín de 20 pesos. ¿Cuánta plata le queda?',
        keepOrder: true, options: nums(30, [20, 50, 70], '$'),
        explanation: 'Gasta: le queda MENOS. Se resta: 50 − 20 = 30.',
      },
      {
        id: 'pd3', emoji: '🍎🍌',
        prompt: 'En la verdulería, una manzana cuesta 10 pesos y una banana cuesta 5 pesos. ¿Cuánto pago por las dos?',
        keepOrder: true, options: nums(15, [5, 10, 20], '$'),
        explanation: 'Compro las dos: se suma. 10 + 5 = 15.',
      },
      {
        id: 'pd4', emoji: '💵💵💵',
        prompt: 'Juan tiene tres billetes de 10 pesos. ¿Cuánta plata tiene?',
        keepOrder: true, options: nums(30, [3, 13, 20], '$'),
        explanation: '10 + 10 + 10 = 30.',
      },
      {
        id: 'pd5', emoji: '🧃',
        prompt: 'Un jugo cuesta 30 pesos. Pago con un billete de 50 pesos. ¿Cuánto me dan de vuelto?',
        keepOrder: true, options: nums(20, [10, 30, 80], '$'),
        explanation: 'El vuelto es lo que sobra: 50 − 30 = 20.',
      },
      {
        id: 'pd6', emoji: '🎈',
        prompt: 'Un globo cuesta 20 pesos. Lucas tiene 15 pesos. ¿Le alcanza para comprarlo?',
        options: [
          { text: 'No, le faltan 5 pesos', correct: true },
          { text: 'Sí, y le sobran 5 pesos' },
          { text: 'Sí, justo' },
        ],
        explanation: '15 es menos que 20: no le alcanza. Le faltan 5, porque 15 + 5 = 20.',
      },
      {
        id: 'pd7', emoji: '🪀',
        prompt: 'Mía tenía 40 pesos. Gastó 10 pesos en un yoyó y 10 pesos en un caramelo. ¿Cuánto le quedó?',
        keepOrder: true, options: nums(20, [10, 30, 60], '$'),
        explanation: '40 − 10 = 30, y 30 − 10 = 20.',
      },
      {
        id: 'pd8', emoji: '🐷',
        prompt: 'En la alcancía había 25 pesos. Pedro puso 5 pesos más. ¿Cuánto hay ahora?',
        keepOrder: true, options: nums(30, [20, 25, 35], '$'),
        explanation: 'Pone más: se suma. 25 + 5 = 30.',
      },
      {
        id: 'pd9', emoji: '🍦',
        prompt: 'Un helado cuesta 50 pesos y un alfajor cuesta 20 pesos. ¿Cuánto más caro es el helado?',
        keepOrder: true, options: nums(30, [20, 50, 70], '$'),
        explanation: 'Para ver la diferencia se resta: 50 − 20 = 30.',
      },
      {
        id: 'pd10', emoji: '💵💵',
        prompt: 'Ana tiene dos billetes de 20 pesos y una moneda de 5 pesos. ¿Cuánta plata tiene?',
        keepOrder: true, options: nums(45, [25, 40, 50], '$'),
        explanation: '20 + 20 = 40, y 40 + 5 = 45.',
      },
      {
        id: 'pd11', emoji: '📒',
        prompt: 'Un cuaderno cuesta 60 pesos. Tengo 40 pesos. ¿Cuánto me falta para comprarlo?',
        keepOrder: true, options: nums(20, [10, 40, 100], '$'),
        explanation: 'Del 40 al 60 faltan 20: 40 + 20 = 60.',
      },
      {
        id: 'pd12',
        prompt: '¿Qué cuenta resuelve el problema? «Tenía 30 pesos y gasté 10 pesos.»',
        options: [
          { text: '30 − 10', correct: true },
          { text: '30 + 10' },
          { text: '10 + 10' },
        ],
        explanation: 'Si gasto, me queda menos: es una RESTA.',
      },
      {
        id: 'pd13',
        prompt: '¿Qué cuenta resuelve el problema? «Tenía 30 pesos y me regalaron 10 pesos.»',
        options: [
          { text: '30 + 10', correct: true },
          { text: '30 − 10' },
          { text: '30 + 30' },
        ],
        explanation: 'Si me regalan, tengo más: es una SUMA.',
      },
    ],
  },

  // ======================= 2. SUMAS QUE DAN 10 ==============================
  {
    id: 'sumas-10',
    title: 'Sumas que dan 10',
    description: 'Los "amigos del 10": ¿cuánto le falta a cada número para llegar a 10?',
    emoji: '🔟',
    questions: [
      // [número dado, distractores]; la respuesta es lo que le falta para 10.
      ...([
        [7, [2, 4, 7]], [6, [3, 5, 6]], [8, [1, 3, 8]], [5, [4, 6, 10]],
        [9, [0, 2, 9]], [4, [4, 5, 7]], [3, [3, 6, 8]], [2, [2, 7, 9]],
        [1, [1, 8, 10]],
      ] as [number, number[]][]).map(([a, otras], i): Question => ({
        id: `s10-${i + 1}`,
        emoji: '🖐️🖐️',
        prompt: `${a} + ⋯ = 10`,
        autoNext: true,
        keepOrder: true,
        options: nums(10 - a, otras),
      })),
      {
        id: 's10-k',
        kind: 'classify',
        checkOnDrop: true,
        prompt: '¿Da 10 o no da 10? Llevá cada cuenta a su caja.',
        categories: ['DA 10', 'NO DA 10'],
        items: [
          { text: '6 + 4', category: 'DA 10' },
          { text: '8 + 2', category: 'DA 10' },
          { text: '7 + 3', category: 'DA 10' },
          { text: '5 + 5', category: 'DA 10' },
          { text: '6 + 3', category: 'NO DA 10' },
          { text: '7 + 4', category: 'NO DA 10' },
          { text: '5 + 4', category: 'NO DA 10' },
        ],
      },
      {
        id: 's10-p', emoji: '🍬',
        prompt: 'Tengo 6 caramelos. ¿Cuántos me faltan para tener 10?',
        keepOrder: true, options: nums(4, [3, 5, 6]),
        explanation: '6 + 4 = 10.',
      },
      {
        id: 's10-d',
        prompt: 'Si 3 + 7 = 10, ¿cuánto es 30 + 70?',
        keepOrder: true, options: nums(100, [10, 37, 90]),
        explanation: '3 dieces + 7 dieces = 10 dieces = 100.',
      },
    ],
  },

  // ======================= 3. SUMA DE IGUALES (DOBLES) ======================
  {
    id: 'dobles',
    title: 'Suma de iguales (dobles)',
    description: 'Sumar un número con él mismo: 2 + 2, 5 + 5, 10 + 10...',
    emoji: '👯',
    questions: [
      calculo('dob1', '1 + 1', 2, [1, 3, 11]),
      calculo('dob2', '2 + 2', 4, [3, 5, 22]),
      calculo('dob3', '3 + 3', 6, [5, 7, 9]),
      calculo('dob4', '4 + 4', 8, [6, 7, 9]),
      calculo('dob5', '5 + 5', 10, [9, 11, 55]),
      calculo('dob6', '6 + 6', 12, [10, 11, 13]),
      calculo('dob7', '7 + 7', 14, [12, 13, 15]),
      calculo('dob8', '8 + 8', 16, [14, 15, 18]),
      calculo('dob9', '9 + 9', 18, [16, 17, 19]),
      calculo('dob10', '10 + 10', 20, [11, 30, 100]),
      calculo('dob11', '20 + 20', 40, [22, 30, 50]),
      calculo('dob12', '50 + 50', 100, [55, 90, 150]),
      {
        id: 'dob13', emoji: '🐞🐞',
        prompt: 'Cada vaquita de San Antonio tiene 3 manchas. ¿Cuántas manchas hay en las dos?',
        keepOrder: true, options: nums(6, [3, 5, 9]),
        explanation: '3 + 3 = 6.',
      },
      {
        id: 'dob14', emoji: '🧤',
        prompt: 'En cada guante entran 5 dedos. ¿Cuántos dedos entran en los dos guantes?',
        keepOrder: true, options: nums(10, [5, 7, 15]),
        explanation: '5 + 5 = 10.',
      },
      {
        id: 'dob15', emoji: '💵💵',
        prompt: 'Tengo dos billetes de 20 pesos. ¿Cuánta plata tengo?',
        keepOrder: true, options: nums(40, [20, 22, 30], '$'),
        explanation: '20 + 20 = 40.',
      },
      {
        id: 'dob16', emoji: '🎲🎲',
        prompt: 'En los dos dados salió un 4. ¿Cuánto suman?',
        keepOrder: true, options: nums(8, [4, 6, 9]),
        explanation: '4 + 4 = 8.',
      },
    ],
  },

  // ============================ 4. MEDIDA ===================================
  {
    id: 'medida',
    title: 'Medida',
    description:
      'Largo, alto, peso, capacidad y tiempo: comparar y elegir con qué se mide.',
    emoji: '📏',
    questions: [
      {
        id: 'md1', emoji: '📏',
        prompt: '¿Con qué medimos cuánto mide de largo un lápiz?',
        options: [{ text: 'Con una regla', correct: true }, { text: 'Con una balanza' }, { text: 'Con un reloj' }],
      },
      {
        id: 'md2', emoji: '⚖️',
        prompt: '¿Con qué medimos cuánto pesa una sandía?',
        options: [{ text: 'Con una balanza', correct: true }, { text: 'Con una regla' }, { text: 'Con un calendario' }],
      },
      {
        id: 'md3', emoji: '⏰',
        prompt: '¿Con qué sabemos qué hora es?',
        options: [{ text: 'Con un reloj', correct: true }, { text: 'Con una cinta métrica' }, { text: 'Con una balanza' }],
      },
      {
        id: 'md4', emoji: '📅',
        prompt: '¿Con qué sabemos cuántos días faltan para mi cumpleaños?',
        options: [{ text: 'Con un calendario', correct: true }, { text: 'Con una regla' }, { text: 'Con una balanza' }],
      },
      {
        id: 'md5', emoji: '🧵',
        prompt: '¿Con qué mide la costurera a una persona para hacerle ropa?',
        options: [{ text: 'Con una cinta métrica', correct: true }, { text: 'Con un reloj' }, { text: 'Con un termómetro' }],
      },
      {
        id: 'md6', emoji: '🐘🐭',
        prompt: '¿Cuál pesa MÁS?',
        options: [{ text: 'El elefante', correct: true }, { text: 'El ratón' }],
      },
      {
        id: 'md7', emoji: '🦒🐕',
        prompt: '¿Cuál es MÁS BAJO?',
        options: [{ text: 'El perro', correct: true }, { text: 'La jirafa' }],
      },
      {
        id: 'md8', emoji: '🪶🧱',
        prompt: '¿Cuál es MÁS LIVIANO?',
        options: [{ text: 'La pluma', correct: true }, { text: 'El ladrillo' }],
      },
      {
        id: 'md9', emoji: '🛁🥛',
        prompt: '¿Dónde entra MÁS agua?',
        options: [{ text: 'En la bañadera', correct: true }, { text: 'En el vaso' }],
      },
      {
        id: 'md10', emoji: '📎',
        prompt: 'Un lápiz mide 6 clips y una goma mide 2 clips. ¿Cuál es MÁS LARGO?',
        options: [{ text: 'El lápiz', correct: true }, { text: 'La goma' }, { text: 'Miden lo mismo' }],
        explanation: '6 clips es más que 2 clips: el lápiz es más largo.',
      },
      {
        id: 'md11', emoji: '📎',
        prompt: 'Un lápiz mide 6 clips y una goma mide 2 clips. ¿Cuántos clips más largo es el lápiz?',
        keepOrder: true, options: nums(4, [2, 6, 8]),
        explanation: '6 − 2 = 4 clips.',
      },
      {
        id: 'md12', emoji: '✋',
        prompt: 'Martina midió la mesa con su mano: 8 cuartas. Su papá la midió con la suya: 5 cuartas. ¿Por qué les dio distinto?',
        options: [
          { text: 'Porque la mano del papá es más grande', correct: true },
          { text: 'Porque la mesa cambió de tamaño' },
          { text: 'Porque la mano de Martina es más grande' },
        ],
        explanation:
          'Con una mano más grande hacen falta menos cuartas. Por eso usamos la regla: mide igual para todos.',
      },
      {
        id: 'md13', emoji: '📏',
        prompt: 'Una cinta mide 10 centímetros y otra mide 7 centímetros. ¿Cuánto más larga es la primera?',
        keepOrder: true, options: nums(3, [2, 7, 17]),
        explanation: '10 − 7 = 3 centímetros.',
      },
      {
        id: 'md14',
        kind: 'classify',
        checkOnDrop: true,
        prompt: '¿Qué se mide con cada instrumento? Llevá cada cosa a su caja.',
        categories: ['📏 REGLA', '⚖️ BALANZA', '⏰ RELOJ'],
        items: [
          { text: 'el largo de un cuaderno', category: '📏 REGLA' },
          { text: 'el largo de una cinta', category: '📏 REGLA' },
          { text: 'el peso de las papas', category: '⚖️ BALANZA' },
          { text: 'el peso de un bebé', category: '⚖️ BALANZA' },
          { text: 'la hora del recreo', category: '⏰ RELOJ' },
          { text: 'la hora de dormir', category: '⏰ RELOJ' },
        ],
      },
      {
        id: 'md15', emoji: '📅',
        prompt: '¿Cuántos días tiene una semana?',
        keepOrder: true, options: nums(7, [5, 10, 12]),
        explanation: 'Lunes, martes, miércoles, jueves, viernes, sábado y domingo: 7 días.',
      },
      {
        id: 'md16', emoji: '📅',
        prompt: 'Si hoy es lunes, ¿qué día es mañana?',
        options: [{ text: 'Martes', correct: true }, { text: 'Domingo' }, { text: 'Miércoles' }],
      },
    ],
  },
]
