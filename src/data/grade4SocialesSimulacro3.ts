import type { Practice } from '../types'

// ============================================================================
// 4to GRADO — Ciencias Sociales — Simulacro "Alto en el camino III"
// Basado en el simulacro que dio la seño:
//  1-2) Nómades o sedentarios (mirando dibujos) y justificar.
//  3)   Técnicas de cultivo: roza, chinampas y terrazas.
//  4)   Pistas para mayas, aztecas e incas.
//  5)   Los tres poderes (opción múltiple).
//  6)   Cuadro de autoridades: nacional, provincial y municipal.
//  7)   República y función del Poder Legislativo.
//  8)   Leyes, Constitución, tradiciones y normas.
//  9)   Pueblos indígenas: cazadores-recolectores o agricultores.
//  10)  Verdadero o falso: el poblamiento de América.
// La práctica 1 sigue el simulacro tal cual; la 2 es otra vuelta con
// preguntas parecidas.
// ============================================================================

export const grade4SocialesSimulacro3Practices: Practice[] = [
  // =================== 1. EL SIMULACRO, CONSIGNA POR CONSIGNA ===============
  {
    id: 'simulacro-sociales',
    title: 'Simulacro 1: consigna por consigna',
    description:
      'El simulacro de la seño: nómades y sedentarios, técnicas de cultivo, mayas, aztecas e incas, los tres poderes, normas y pueblos indígenas.',
    emoji: '📝',
    questions: [
      // ---- 1 y 2: nómades o sedentarios ----
      {
        id: 'ss1a',
        kind: 'reveal',
        emoji: '🏘️🏺🌽',
        prompt:
          'Imagen A: un grupo vive en casas de piedra y adobe, una mujer hace vasijas de cerámica, otras muelen granos y hay animales domesticados en un corral. ¿Son nómades o sedentarios?',
        options: [
          {
            text: 'Sedentarios',
            correct: true,
            why: '¡Correcto! Justificación: viven en un lugar fijo (casas permanentes), cultivan y muelen granos, crían animales y fabrican cerámica, que es pesada y no se puede trasladar todo el tiempo.',
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
        emoji: '⛰️🔥🏹',
        prompt:
          'Imagen B: un grupo vive en la entrada de una cueva, se abriga con pieles y lleva lanzas para cazar; hay un fuego y un perro. ¿Son nómades o sedentarios?',
        options: [
          {
            text: 'Nómades',
            correct: true,
            why: '¡Correcto! Justificación: viven en refugios naturales (cuevas) o temporarios, cazan y recolectan, y se trasladan siguiendo a los animales y los frutos de cada estación.',
          },
          {
            text: 'Sedentarios',
            why: 'Incorrecto. No construyen viviendas permanentes ni cultivan: viven de la caza y la recolección.',
          },
        ],
      },
      {
        id: 'ss2',
        kind: 'classify',
        prompt: '2) Para justificar: ¿qué característica es de los nómades y cuál de los sedentarios?',
        categories: ['Nómades', 'Sedentarios'],
        items: [
          { text: 'se trasladan de un lugar a otro', category: 'Nómades' },
          { text: 'cazan, pescan y recolectan', category: 'Nómades' },
          { text: 'viven en cuevas o refugios temporarios', category: 'Nómades' },
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
        emoji: '⛰️🌱',
        prompt: 'Dibujo 1: escalones de tierra en la ladera de una montaña, sostenidos con muros de piedra. ¿Qué técnica es?',
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
        emoji: '🛶🌿',
        prompt: 'Dibujo 2: personas en canoas, entre parcelas cultivadas que flotan sobre el agua. ¿Qué técnica es?',
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
        emoji: '🌳🔥🌽',
        prompt: 'Dibujo 3 (en tres pasos): 1) cortan árboles de la selva, 2) los queman, 3) siembran en ese terreno. ¿Qué técnica es?',
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
        id: 'ss3d',
        kind: 'classify',
        prompt: '¿Qué pueblo usaba cada técnica y en qué ambiente?',
        categories: ['Roza', 'Chinampas', 'Terrazas'],
        items: [
          { text: 'mayas', category: 'Roza' },
          { text: 'en la selva', category: 'Roza' },
          { text: 'aztecas', category: 'Chinampas' },
          { text: 'sobre un lago', category: 'Chinampas' },
          { text: 'incas', category: 'Terrazas' },
          { text: 'en las montañas', category: 'Terrazas' },
        ],
      },
      {
        id: 'ss3e',
        kind: 'drag',
        prompt: 'Elegí una técnica y explicá en qué consistía: completá.',
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
        prompt: 'Leé las pistas y colocá cada una en Mayas, Aztecas o Incas.',
        categories: ['Mayas', 'Aztecas', 'Incas'],
        items: [
          { text: 'Para cultivar en la selva usaban la roza.', category: 'Mayas' },
          { text: 'Eran ciudades independientes, no formaron un imperio.', category: 'Mayas' },
          { text: 'Habitaban Centroamérica y el sur de México.', category: 'Mayas' },
          { text: 'Construyeron una gran ciudad sobre un lago rodeada de chinampas.', category: 'Aztecas' },
          { text: 'Su emperador gobernaba desde Tenochtitlan y comandaba un gran ejército.', category: 'Aztecas' },
          { text: 'Vivieron en América del Sur.', category: 'Incas' },
          { text: 'Hicieron terrazas de cultivo en los valles y zonas montañosas.', category: 'Incas' },
          { text: 'Mandaban mensajes por medio de los chasquis.', category: 'Incas' },
          { text: 'Sus caminos conducían todos a la capital, Cuzco.', category: 'Incas' },
        ],
        explanation:
          'Ojo: los incas también tenían un emperador (el Inca) con un gran ejército. En el simulacro, fijate en las otras pistas de la misma fila; si dice Tenochtitlan o el lago, es azteca; si dice Cuzco, es inca.',
      },
      {
        id: 'ss4b',
        prompt: '¿Quiénes eran los chasquis?',
        options: [
          { text: 'Mensajeros incas que corrían por los caminos llevando noticias.', correct: true },
          { text: 'Sacerdotes mayas que estudiaban las estrellas.' },
          { text: 'Agricultores aztecas que trabajaban en las chinampas.' },
        ],
      },

      // ---- 5: los tres poderes ----
      {
        id: 'ss5a',
        prompt: '¿Qué poder propone y aprueba las leyes?',
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
        prompt: '¿Quién controla que se cumplan las leyes?',
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
        prompt: '¿Cuántas cámaras tiene el Poder Legislativo de la provincia de Buenos Aires?',
        keepOrder: true,
        options: [{ text: 'a) Una' }, { text: 'b) Dos', correct: true }, { text: 'c) Tres' }],
        explanation: 'Dos: la Cámara de Senadores y la Cámara de Diputados. Juntas forman la Legislatura.',
      },
      {
        id: 'ss5d',
        prompt: '¿Qué poder está a cargo del gobernador?',
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
        prompt: '¿Por qué la Argentina es una república?',
        options: [
          {
            text: 'Porque el poder de gobernar se divide en tres poderes, cada uno con una función, y los poderes se controlan entre sí.',
            correct: true,
            why: '¡Correcto! Eso es la división de poderes, la base de la forma republicana.',
          },
          {
            text: 'Porque el territorio está dividido en provincias, que eligen a sus propias autoridades.',
            why: 'Incorrecto. Eso explica por qué la Argentina es FEDERAL, no por qué es una república.',
          },
        ],
      },
      {
        id: 'ss7b',
        prompt: '¿Cuál es la función del Poder Legislativo?',
        options: [
          { text: 'Hacer las leyes que gobiernan el país.', correct: true },
          { text: 'Administrar el país.' },
        ],
        explanation: 'Administrar el país es la función del Poder Ejecutivo.',
      },

      // ---- 8: conceptos ----
      {
        id: 'ss8',
        kind: 'drag',
        prompt: '8) ¿A qué concepto corresponde cada definición? Arrastrá: Leyes, Constitución, Tradiciones, Normas.',
        segments: [
          'a) Texto que contiene las ideas fundamentales acerca de cómo debe ser un país: ',
          '. b) Reglas que fijan qué se puede hacer y qué no: ',
          '. c) Costumbres que se mantienen durante mucho tiempo y son compartidas por una comunidad: ',
          '. d) Normas escritas, obligatorias para todos los que habitan un territorio: ',
          '.',
        ],
        blanks: ['Constitución', 'Normas', 'Tradiciones', 'Leyes'],
        bank: ['Leyes', 'Constitución', 'Tradiciones', 'Normas'],
      },

      // ---- 9: pueblos indígenas ----
      {
        id: 'ss9',
        kind: 'classify',
        prompt: '9) Indicá si cada pueblo era cazador-recolector (C) o agricultor (A).',
        categories: ['C: cazadores-recolectores', 'A: agricultores'],
        items: [
          { text: 'Querandíes', category: 'C: cazadores-recolectores' },
          { text: 'Qom', category: 'C: cazadores-recolectores' },
          { text: 'Selk’nam', category: 'C: cazadores-recolectores' },
          { text: 'Wichís', category: 'C: cazadores-recolectores' },
          { text: 'Diaguitas', category: 'A: agricultores' },
          { text: 'Guaraníes', category: 'A: agricultores' },
          { text: 'Atacamas', category: 'A: agricultores' },
        ],
        explanation:
          'Agricultores: diaguitas y atacamas (noroeste, con terrazas) y guaraníes (noreste, con roza). Cazadores-recolectores: querandíes (llanura pampeana), qom y wichís (Chaco) y selk’nam (Tierra del Fuego).',
      },

      // ---- 10: verdadero o falso ----
      {
        id: 'ss10',
        kind: 'classify',
        prompt: '10) ¿Verdadero o falso? El poblamiento de América.',
        categories: ['Verdadero', 'Falso'],
        items: [
          {
            text: 'Los primeros seres humanos que llegaron a América venían desde Oceanía o Asia.',
            category: 'Verdadero',
          },
          {
            text: 'Durante la glaciación se congeló parte de los mares, bajó su nivel y quedó al descubierto el Estrecho de Bering.',
            category: 'Verdadero',
          },
          {
            text: 'Por el Estrecho de Bering pasaron grandes animales en busca de alimento y un mejor clima.',
            category: 'Verdadero',
          },
          { text: 'Los cazadores-recolectores podían producir su propio alimento.', category: 'Falso' },
          {
            text: 'Al finalizar la Era de Hielo, todos los pueblos americanos eran agricultores.',
            category: 'Falso',
          },
        ],
        explanation:
          'Corregidas: los cazadores-recolectores NO producían su alimento, lo obtenían de la naturaleza (cazando y recolectando). Al terminar la Era de Hielo ALGUNOS pueblos se hicieron agricultores y otros siguieron siendo cazadores-recolectores.',
      },
      {
        id: 'ss10b',
        kind: 'reveal',
        emoji: '🧊',
        prompt: '¿Por qué los primeros pobladores pudieron pasar caminando de Asia a América?',
        options: [
          {
            text: 'Porque en la glaciación bajó el nivel del mar y el Estrecho de Bering quedó como un puente de tierra.',
            correct: true,
            why: '¡Correcto! Siguiendo a los grandes animales que cazaban, cruzaron por ese «puente» y fueron poblando el continente.',
          },
          {
            text: 'Porque construyeron un puente de piedra.',
            why: 'Incorrecto. Fue un paso natural que quedó al descubierto cuando bajó el mar.',
          },
          {
            text: 'Porque viajaron en grandes barcos de vela.',
            why: 'Incorrecto. Por Bering pasaron caminando. (Otra teoría dice que algunos llegaron desde Oceanía en canoas o balsas, pero no en barcos de vela.)',
          },
        ],
      },
    ],
  },

  // ===================== 2. OTRA VUELTA, CON PREGUNTAS PARECIDAS ============
  {
    id: 'simulacro-otra-vuelta',
    title: 'Simulacro 2: otra vuelta',
    description: 'Preguntas parecidas a las del simulacro, para practicar de nuevo con otras palabras.',
    emoji: '🔁',
    questions: [
      {
        id: 'so1',
        prompt: 'Un grupo vive en tiendas de cuero que desarman y cargan cuando los guanacos se van a otra zona. ¿Cómo son?',
        options: [{ text: 'Nómades', correct: true }, { text: 'Sedentarios' }],
        explanation: 'Se trasladan siguiendo a los animales: son nómades.',
      },
      {
        id: 'so2',
        prompt: 'Una aldea tiene casas de piedra, campos de maíz y corrales con llamas. ¿Cómo son sus habitantes?',
        options: [{ text: 'Sedentarios', correct: true }, { text: 'Nómades' }],
        explanation: 'Cultivan, crían animales y tienen casas fijas: son sedentarios.',
      },
      {
        id: 'so3',
        kind: 'reveal',
        emoji: '🌽',
        prompt: '¿Qué cambio permitió que algunos pueblos se volvieran sedentarios?',
        options: [
          {
            text: 'La agricultura: al cultivar, tenían que quedarse cerca de sus campos.',
            correct: true,
            why: '¡Correcto! Al producir su propio alimento ya no necesitaban trasladarse para buscarlo.',
          },
          {
            text: 'La caza de grandes animales.',
            why: 'Incorrecto. La caza obligaba a moverse siguiendo a los animales.',
          },
          {
            text: 'El uso del fuego.',
            why: 'Incorrecto. Los nómades también usaban el fuego.',
          },
        ],
      },
      {
        id: 'so4',
        kind: 'classify',
        prompt: 'Otra tanda: ¿mayas, aztecas o incas?',
        categories: ['Mayas', 'Aztecas', 'Incas'],
        items: [
          { text: 'Península de Yucatán', category: 'Mayas' },
          { text: 'pirámides y estudio de los astros', category: 'Mayas' },
          { text: 'Tenochtitlan', category: 'Aztecas' },
          { text: 'lago Texcoco', category: 'Aztecas' },
          { text: 'Cordillera de los Andes', category: 'Incas' },
          { text: 'quipus para contar', category: 'Incas' },
        ],
      },
      {
        id: 'so5',
        prompt: '¿Quién está a cargo del Poder Ejecutivo de un municipio?',
        options: [{ text: 'El intendente', correct: true }, { text: 'El gobernador' }, { text: 'El Concejo Deliberante' }],
      },
      {
        id: 'so6',
        prompt: '¿Qué hace el Concejo Deliberante?',
        options: [
          { text: 'Hace las ordenanzas (las normas del municipio).', correct: true },
          { text: 'Juzga las faltas de tránsito.' },
          { text: 'Gobierna la provincia.' },
        ],
        explanation: 'Es el Poder Legislativo del municipio. Las faltas las juzga el Tribunal de Faltas.',
      },
      {
        id: 'so7',
        prompt: '¿Cuáles son las dos cámaras del Congreso Nacional?',
        options: [
          { text: 'Diputados y Senadores', correct: true },
          { text: 'Jueces y Fiscales' },
          { text: 'Ministros y Gobernadores' },
        ],
      },
      {
        id: 'so8',
        kind: 'classify',
        prompt: '¿Es una ley o una tradición?',
        categories: ['Ley', 'Tradición'],
        items: [
          { text: 'Es obligatorio usar cinturón de seguridad.', category: 'Ley' },
          { text: 'La educación primaria es obligatoria.', category: 'Ley' },
          { text: 'Comer rosca de Pascua.', category: 'Tradición' },
          { text: 'Festejar la Fiesta de la Tradición con danzas folclóricas.', category: 'Tradición' },
        ],
      },
      {
        id: 'so9',
        kind: 'classify',
        prompt: 'Verdadero o falso.',
        categories: ['Verdadero', 'Falso'],
        items: [
          { text: 'El presidente hace las leyes.', category: 'Falso' },
          { text: 'La Argentina es una república federal.', category: 'Verdadero' },
          { text: 'Los guaraníes cultivaban mandioca y maíz.', category: 'Verdadero' },
          { text: 'Los selk’nam vivían en Tierra del Fuego.', category: 'Verdadero' },
          { text: 'Los incas vivían en la selva de México.', category: 'Falso' },
        ],
        explanation: 'Corregidas: las leyes las hace el Congreso (Poder Legislativo); los incas vivían en la Cordillera de los Andes, en América del Sur.',
      },
    ],
  },
]
