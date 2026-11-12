import type { Practice } from '../types'

// ============================================================================
// 4to GRADO — Ciencias Sociales — Simulacro "Alto en el camino III"
// Es EXACTAMENTE el simulacro de la fotocopia, en el mismo orden (la práctica
// tiene `inOrder`, así que las preguntas no se barajan), con sus dibujos:
//  1)  Nómades o sedentarios (imágenes A y B).   2)  Justificar.
//  3)  Nombrar las técnicas de cultivo (terrazas, chinampas, roza) y explicar
//      una.
//  4)  Pistas: M (mayas), A (aztecas) o I (incas), con el mapa.
//  5)  Los tres poderes.   6)  Cuadro de autoridades (doble entrada).
//  7)  República y Poder Legislativo.   8)  Leyes, Constitución, tradiciones
//      y normas.   9)  C o A.   10) Verdadero o falso.
// ============================================================================

export const grade4SocialesSimulacro3Practices: Practice[] = [
  {
    id: 'simulacro-sociales',
    title: 'Simulacro: consigna por consigna',
    description:
      'El simulacro de la fotocopia, en el mismo orden y con sus dibujos: nómades y sedentarios, técnicas de cultivo, mayas, aztecas e incas, los poderes, normas y pueblos indígenas.',
    emoji: '📝',
    inOrder: true,
    questions: [
      // ---- 1 y 2: nómades o sedentarios ----
      {
        id: 'ss1a',
        kind: 'reveal',
        image: 'sociales-sedentarios',
        prompt: '1) Observá atentamente las imágenes y clasificá cada grupo en NÓMADES O SEDENTARIOS. A)',
        hint: 'Mirá dónde viven, qué están haciendo las mujeres y qué animales hay.',
        options: [
          {
            text: 'Sedentarios',
            correct: true,
            why: '¡Correcto! Justificación: viven en casas de piedra, que son permanentes; cultivan la tierra, crían llamas, tejen en telar y hacen vasijas de cerámica, que son pesadas y no se pueden andar trasladando.',
          },
          {
            text: 'Nómades',
            why: 'Incorrecto. Los nómades se trasladan todo el tiempo, por eso no construyen casas de piedra ni hacen vasijas pesadas.',
          },
        ],
      },
      {
        id: 'ss1b',
        kind: 'reveal',
        image: 'sociales-nomades',
        prompt: '1) Observá atentamente las imágenes y clasificá cada grupo en NÓMADES O SEDENTARIOS. B)',
        hint: 'Mirá con qué están hechos sus refugios: ¿son casas para quedarse siempre o se pueden desarmar y llevar?',
        options: [
          {
            text: 'Nómades',
            correct: true,
            why: '¡Correcto! Justificación: viven en toldos hechos con palos y cueros de animales, que se arman y desarman fácilmente para trasladarse; obtienen su alimento cazando y recolectando, y se mudan siguiendo a los animales.',
          },
          {
            text: 'Sedentarios',
            why: 'Incorrecto. Sus toldos de cuero no son casas permanentes: se desarman y se llevan. Viven de la caza y la recolección.',
          },
        ],
      },
      {
        id: 'ss2',
        kind: 'classify',
        prompt: '2) Justificá la respuesta de las imágenes de arriba: ¿qué característica es de los nómades y cuál de los sedentarios?',
        categories: ['Nómades', 'Sedentarios'],
        items: [
          { text: 'se trasladan de un lugar a otro', category: 'Nómades' },
          { text: 'cazan, pescan y recolectan', category: 'Nómades' },
          { text: 'viven en toldos de cuero o refugios temporarios', category: 'Nómades' },
          { text: 'pocas pertenencias, fáciles de llevar', category: 'Nómades' },
          { text: 'viven siempre en el mismo lugar', category: 'Sedentarios' },
          { text: 'cultivan la tierra (agricultura)', category: 'Sedentarios' },
          { text: 'crían animales domesticados', category: 'Sedentarios' },
          { text: 'construyen casas permanentes y aldeas', category: 'Sedentarios' },
          { text: 'fabrican cerámica', category: 'Sedentarios' },
        ],
        explanation:
          'Para justificar, nombrá lo que ves en el dibujo y explicá: «Son sedentarios porque viven en casas fijas, cultivan y hacen cerámica».',
      },

      // ---- 3: técnicas de cultivo ----
      {
        id: 'ss3a',
        kind: 'reveal',
        image: 'sociales-terrazas',
        prompt: '3) Nombrá cada una de las siguientes técnicas de cultivo: roza, chinampas y terrazas. Primer dibujo:',
        options: [
          {
            text: 'Terrazas',
            correct: true,
            why: '¡Correcto! Las terrazas (o andenes) son escalones en las laderas de las montañas. Las usaban los incas: así tenían terreno plano para cultivar y el agua no se llevaba la tierra.',
          },
          { text: 'Chinampas', why: 'Incorrecto. Las chinampas son islas artificiales sobre un lago.' },
          { text: 'Roza', why: 'Incorrecto. La roza es cortar y quemar la selva.' },
        ],
      },
      {
        id: 'ss3b',
        kind: 'reveal',
        image: 'sociales-chinampas',
        prompt: '3) Nombrá cada una de las siguientes técnicas de cultivo: roza, chinampas y terrazas. Segundo dibujo:',
        options: [
          {
            text: 'Chinampas',
            correct: true,
            why: '¡Correcto! Las chinampas eran islas artificiales hechas con troncos, ramas y barro del fondo del lago. Las usaban los aztecas en el lago Texcoco.',
          },
          { text: 'Terrazas', why: 'Incorrecto. Las terrazas están en las montañas, no en el agua.' },
          { text: 'Roza', why: 'Incorrecto. La roza se hace en la selva.' },
        ],
      },
      {
        id: 'ss3c',
        kind: 'reveal',
        image: 'sociales-roza',
        prompt: '3) Nombrá cada una de las siguientes técnicas de cultivo: roza, chinampas y terrazas. Tercer dibujo (pasos 1, 2 y 3):',
        options: [
          {
            text: 'Roza',
            correct: true,
            why: '¡Correcto! La roza consistía en talar y quemar una parte de la selva; las cenizas abonaban la tierra y ahí sembraban maíz. Cuando la tierra se agotaba, se mudaban a otro sector. La usaban los mayas.',
          },
          { text: 'Chinampas', why: 'Incorrecto. Las chinampas son en un lago.' },
          { text: 'Terrazas', why: 'Incorrecto. Las terrazas son en las montañas.' },
        ],
      },
      {
        id: 'ss3e',
        kind: 'drag',
        prompt: '3) ● Elegí una de las técnicas y explicá en qué consistía. Por ejemplo, las chinampas: completá.',
        segments: [
          'Las chinampas eran ',
          ' artificiales que los ',
          ' construían sobre el lago con troncos, ramas y ',
          '. Allí cultivaban maíz, porotos y otros alimentos.',
        ],
        blanks: ['islas', 'aztecas', 'barro'],
        bank: ['barro', 'incas', 'islas', 'aztecas', 'montañas'],
      },

      // ---- 4: mayas, aztecas e incas ----
      {
        id: 'ss4',
        kind: 'classify',
        image: 'sociales-mapa',
        prompt: '4) Leé las pistas y colocá M (Mayas), A (Aztecas) o I (Incas) según corresponda.',
        keepOrder: true,
        categories: ['M (Mayas)', 'A (Aztecas)', 'I (Incas)'],
        items: [
          { text: 'a. Vivieron en América del Sur.', category: 'I (Incas)' },
          { text: 'b. Para cultivar en la selva usaban una técnica llamada roza.', category: 'M (Mayas)' },
          { text: 'c. Eran ciudades independientes, no formaron un imperio.', category: 'M (Mayas)' },
          { text: 'd. Construyeron una gran ciudad sobre un lago rodeada de chinampas.', category: 'A (Aztecas)' },
          { text: 'e. La máxima autoridad era un emperador que comandaba un gran ejército.', category: 'A (Aztecas)' },
          { text: 'f. Construyeron terrazas de cultivo en los valles y zonas montañosas.', category: 'I (Incas)' },
          { text: 'g. Mandaban mensajes por medio de los chasquis.', category: 'I (Incas)' },
          { text: 'h. Habitaban la zona de Centroamérica y sur de México.', category: 'M (Mayas)' },
          { text: 'i. Crearon una red de caminos que conducían todas a la ciudad capital, Cuzco.', category: 'I (Incas)' },
        ],
        explanation:
          'Mayas: b, c, h. Aztecas: d, e. Incas: a, f, g, i. Ojo con la «e»: los incas también tenían un emperador (el Inca) con un gran ejército. Acá va con los aztecas, pero preguntale a la seño si acepta las dos.',
      },
      {
        id: 'ss5a',
        prompt: '5) ¿Qué poder propone y aprueba las leyes?',
        keepOrder: true,
        options: [
          { text: 'a) El Poder Judicial' },
          { text: 'b) El Poder Ejecutivo' },
          { text: 'c) El Poder Legislativo', correct: true },
        ],
        explanation: 'El Legislativo hace las leyes (en la Nación, el Congreso; en la provincia, la Legislatura).',
      },
      {
        id: 'ss5b',
        prompt: '5) ¿Quién controla que se cumplan las leyes?',
        keepOrder: true,
        options: [
          { text: 'a) El Poder Judicial', correct: true },
          { text: 'b) El Poder Legislativo' },
          { text: 'c) El Poder Ejecutivo' },
        ],
        explanation: 'El Poder Judicial (los jueces) controla que se cumplan las leyes y resuelve los conflictos.',
      },
      {
        id: 'ss5c',
        prompt: '5) ¿Cuántas cámaras tiene el Poder Legislativo de la provincia?',
        keepOrder: true,
        options: [{ text: 'a) Una' }, { text: 'b) Dos', correct: true }, { text: 'c) Tres' }],
        explanation: 'Dos: la Cámara de Senadores y la Cámara de Diputados. Juntas forman la Legislatura.',
      },
      {
        id: 'ss5d',
        prompt: '5) ¿Qué poder está a cargo del gobernador?',
        keepOrder: true,
        options: [
          { text: 'a) Poder Legislativo' },
          { text: 'b) Poder Judicial' },
          { text: 'c) Poder Ejecutivo', correct: true },
        ],
        explanation: 'El gobernador encabeza el Poder Ejecutivo de la provincia: administra y gobierna.',
      },

      // ---- 6: cuadro de autoridades ----
      {
        id: 'ss6',
        kind: 'classify',
        prompt: '6) Completá el cuadro colocando cada autoridad en el casillero correspondiente.',
        categories: ['Nacional', 'Provincial', 'Municipal'],
        tableRows: ['Poder Ejecutivo', 'Poder Legislativo', 'Poder Judicial'],
        items: [
          { text: 'Presidente', row: 'Poder Ejecutivo', category: 'Nacional' },
          { text: 'Gobernador', row: 'Poder Ejecutivo', category: 'Provincial' },
          { text: 'Intendente', row: 'Poder Ejecutivo', category: 'Municipal' },
          { text: 'Congreso Nacional', row: 'Poder Legislativo', category: 'Nacional' },
          { text: 'Legislatura provincial', row: 'Poder Legislativo', category: 'Provincial' },
          { text: 'Concejo Deliberante', row: 'Poder Legislativo', category: 'Municipal' },
          { text: 'Corte Suprema de Justicia de la Nación', row: 'Poder Judicial', category: 'Nacional' },
          { text: 'Suprema Corte de Justicia provincial', row: 'Poder Judicial', category: 'Provincial' },
          { text: 'Tribunal de Faltas', row: 'Poder Judicial', category: 'Municipal' },
        ],
        explanation:
          'Ejecutivo → Presidente / Gobernador / Intendente. Legislativo → Congreso Nacional / Legislatura provincial / Concejo Deliberante. Judicial → Corte Suprema de la Nación / Suprema Corte provincial / Tribunal de Faltas.',
      },

      // ---- 7: república y Poder Legislativo ----
      {
        id: 'ss7a',
        kind: 'reveal',
        emoji: '🇦🇷',
        prompt: '7) Señalá la respuesta correcta. a. ¿Por qué la Argentina es una república?',
        keepOrder: true,
        options: [
          {
            text: 'i. Porque el territorio nacional está dividido en provincias, que eligen a sus propias autoridades.',
            why: 'Incorrecto. Eso explica por qué la Argentina es FEDERAL, no por qué es una república.',
          },
          {
            text: 'ii. El poder de gobernar se divide en tres poderes y cada poder tiene una función, además los poderes se controlan entre sí.',
            correct: true,
            why: '¡Correcto! Eso es la división de poderes, la base de la forma republicana.',
          },
        ],
      },
      {
        id: 'ss7b',
        prompt: '7) b. ¿Cuál es la función del Poder Legislativo?',
        keepOrder: true,
        options: [
          { text: 'i. Administrar el país.' },
          { text: 'ii. Hacer las leyes que gobiernan el país.', correct: true },
        ],
        explanation: 'Administrar el país es la función del Poder Ejecutivo.',
      },

      // ---- 8: conceptos ----
      {
        id: 'ss8',
        kind: 'drag',
        prompt: '8) ¿A cuál de los conceptos corresponde cada una de las siguientes definiciones? Leyes - Constitución - Tradiciones - Normas',
        segments: [
          'a. Texto que contiene las ideas fundamentales acerca de cómo debe ser un país: ',
          '. b. Reglas que fijan qué se puede hacer y qué no: ',
          '. c. Costumbres que se mantienen durante mucho tiempo y son compartidas por una comunidad, un pueblo o un país: ',
          '. d. Normas escritas que sirven para organizar una sociedad y son obligatorias, es decir que tienen que cumplirlas todas las personas que habitan un territorio: ',
          '.',
        ],
        blanks: ['Constitución', 'Normas', 'Tradiciones', 'Leyes'],
        bank: ['Leyes', 'Constitución', 'Tradiciones', 'Normas'],
      },

      // ---- 9: pueblos indígenas ----
      {
        id: 'ss9',
        kind: 'classify',
        prompt: '9) Indicá con una C (cazadores - recolectores) o con una A (agricultores) según corresponda.',
        keepOrder: true,
        categories: ['C (cazadores - recolectores)', 'A (agricultores)'],
        items: [
          { text: 'a. Diaguitas', category: 'A (agricultores)' },
          { text: 'b. Querandíes', category: 'C (cazadores - recolectores)' },
          { text: 'c. Guaraníes', category: 'A (agricultores)' },
          { text: 'd. Qom', category: 'C (cazadores - recolectores)' },
          { text: 'e. Selk’nam', category: 'C (cazadores - recolectores)' },
          { text: 'f. Wichis', category: 'C (cazadores - recolectores)' },
          { text: 'g. Atacamas', category: 'A (agricultores)' },
        ],
        explanation:
          'A: diaguitas y atacamas (noroeste, con terrazas) y guaraníes (noreste, con roza). C: querandíes (llanura pampeana), qom y wichis (Chaco) y selk’nam (Tierra del Fuego).',
      },

      // ---- 10: verdadero o falso ----
      {
        id: 'ss10',
        kind: 'classify',
        prompt: '10) Indicá si las siguientes afirmaciones son verdaderas o falsas.',
        keepOrder: true,
        categories: ['Verdadera', 'Falsa'],
        items: [
          {
            text: 'a. Los primeros seres humanos que llegaron a América venían desde Oceanía o Asia.',
            category: 'Verdadera',
          },
          { text: 'b. Los cazadores-recolectores podían producir su propio alimento.', category: 'Falsa' },
          {
            text: 'c. Al finalizar la Era de Hielo, todos los pueblos americanos eran agricultores.',
            category: 'Falsa',
          },
          {
            text: 'd. Durante la glaciación, una parte de los mares y los océanos se congeló y bajó el nivel del mar dejando al descubierto el Estrecho de Bering.',
            category: 'Verdadera',
          },
          {
            text: 'e. Al congelarse los mares, por el Estrecho de Bering, pasaron grandes animales en busca de alimento y un mejor clima.',
            category: 'Verdadera',
          },
        ],
        explanation:
          'b es falsa: los cazadores-recolectores NO producían su alimento, lo obtenían de la naturaleza. c es falsa: al terminar la Era de Hielo ALGUNOS pueblos se hicieron agricultores y otros siguieron siendo cazadores-recolectores.',
      },
    ],
  },
]
