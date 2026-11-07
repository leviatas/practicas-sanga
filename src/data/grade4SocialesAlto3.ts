import type { Practice } from '../types'

// ============================================================================
// 4to GRADO — Ciencias Sociales — "Alto en el camino III" (16/11)
// Temario del 3er trimestre (libro: capítulos 4 y 6):
//  1) Normas: de convivencia, no escritas (usos, costumbres y tradiciones) y
//     escritas (las leyes, la Constitución Nacional).
//  2) Niveles y funciones del gobierno nacional, provincial y municipal. El
//     gobierno de Buenos Aires y los símbolos (escudos).
//  3) Formas de vida nómada y sedentaria, cazadores-recolectores y
//     agricultores, organización social y técnicas de cultivo.
//  4) Las sociedades muy organizadas (mayas, aztecas e incas) y los pueblos
//     indígenas del territorio argentino y bonaerense.
// ============================================================================

export const grade4SocialesAlto3Practices: Practice[] = [
  // ========================= 1. LAS NORMAS =================================
  {
    id: 'normas-convivencia-leyes',
    title: 'Normas de convivencia, costumbres y leyes',
    description:
      'Para qué sirven las normas, normas escritas y no escritas, las leyes y la Constitución Nacional.',
    emoji: '🤝',
    questions: [
      {
        id: 'nc1',
        kind: 'reveal',
        emoji: '🤝',
        prompt: '¿Para qué sirven las normas en una sociedad?',
        options: [
          {
            text: 'Para organizar la vida en común y poder convivir de forma respetuosa.',
            correct: true,
            why: '¡Correcto! Las normas dicen qué se puede hacer y qué no, para que todos podamos vivir juntos.',
          },
          {
            text: 'Para que solo algunas personas puedan hacer lo que quieran.',
            why: 'Incorrecto. Las normas son para todos los miembros de la sociedad.',
          },
          {
            text: 'No sirven para nada; cada uno hace lo que quiere.',
            why: 'Incorrecto. Sin normas sería muy difícil convivir.',
          },
        ],
      },
      {
        id: 'nc2',
        prompt: '¿Cuál de estas es una norma de convivencia del aula?',
        options: [
          { text: 'Levantar la mano para pedir la palabra.', correct: true },
          { text: 'Gritar cuando habla un compañero.' },
          { text: 'Llevarse los útiles de otro sin pedir permiso.' },
        ],
      },
      {
        id: 'nc-clas1',
        kind: 'classify',
        prompt: 'Clasificá cada norma: ¿es escrita o no escrita?',
        categories: ['Escrita', 'No escrita'],
        items: [
          { text: 'la Constitución Nacional', category: 'Escrita' },
          { text: 'una ley de tránsito', category: 'Escrita' },
          { text: 'el reglamento de la escuela', category: 'Escrita' },
          { text: 'saludar al llegar', category: 'No escrita' },
          { text: 'ceder el asiento a una persona mayor', category: 'No escrita' },
          { text: 'tomar mate en ronda', category: 'No escrita' },
          { text: 'decir «gracias» y «por favor»', category: 'No escrita' },
        ],
      },
      {
        id: 'nc3',
        kind: 'reveal',
        emoji: '🧉',
        prompt: '¿Qué son los usos, las costumbres y las tradiciones?',
        options: [
          {
            text: 'Normas no escritas que un grupo aprende y repite a lo largo del tiempo.',
            correct: true,
            why: '¡Correcto! No están escritas en ninguna ley, pero la gente las respeta: festejar un cumpleaños, comer pastelitos el 25 de mayo…',
          },
          {
            text: 'Leyes que hace el Congreso.',
            why: 'Incorrecto. Las leyes son normas escritas.',
          },
          {
            text: 'Normas que, si no se cumplen, el Estado aplica una multa.',
            why: 'Incorrecto. Eso pasa con las leyes. Si no se cumple una costumbre, la sanción es social (por ejemplo, que la gente se moleste).',
          },
        ],
      },
      {
        id: 'nc4',
        kind: 'reveal',
        emoji: '⚖️',
        prompt: '¿Qué tienen de especial las leyes?',
        options: [
          {
            text: 'Están escritas, son obligatorias para todos y si no se cumplen hay una sanción establecida.',
            correct: true,
            why: '¡Correcto! Las leyes las dictan las autoridades y todos los habitantes deben cumplirlas.',
          },
          {
            text: 'Cada persona elige si las cumple o no.',
            why: 'Incorrecto. Las leyes son obligatorias para todos.',
          },
          {
            text: 'Solo valen dentro de una familia.',
            why: 'Incorrecto. Eso serían normas familiares. Las leyes valen para todos los habitantes.',
          },
        ],
      },
      {
        id: 'nc5',
        kind: 'reveal',
        emoji: '📜',
        prompt: '¿Qué es la Constitución Nacional?',
        options: [
          {
            text: 'La ley más importante del país: organiza el gobierno y establece los derechos y deberes de los habitantes.',
            correct: true,
            why: '¡Correcto! Es la «ley suprema»: ninguna otra ley puede ir en contra de ella. Se sancionó en 1853.',
          },
          {
            text: 'Un reglamento que solo vale en las escuelas.',
            why: 'Incorrecto. Vale en todo el país.',
          },
          {
            text: 'Una costumbre que se transmite de padres a hijos.',
            why: 'Incorrecto. La Constitución es una norma escrita.',
          },
        ],
      },
      {
        id: 'nc6',
        prompt: '¿En qué año se sancionó la Constitución Nacional argentina?',
        options: [{ text: '1853', correct: true }, { text: '1810' }, { text: '1816' }, { text: '1983' }],
        explanation: '1810 es la Revolución de Mayo y 1816 la Declaración de la Independencia.',
      },
      {
        id: 'nc-drag1',
        kind: 'drag',
        prompt: 'Completá.',
        segments: [
          'Las normas ',
          ' son las leyes. Las normas ',
          ' son los usos, costumbres y tradiciones. La ley más importante es la ',
          '.',
        ],
        blanks: ['escritas', 'no escritas', 'Constitución Nacional'],
        bank: ['no escritas', 'Constitución Nacional', 'escritas', 'tradición'],
      },
      {
        id: 'nc7',
        prompt: 'Comer locro y pastelitos el 25 de mayo es…',
        options: [
          { text: 'una tradición', correct: true },
          { text: 'una ley' },
          { text: 'un artículo de la Constitución' },
        ],
      },
    ],
  },

  // ========================= 2. LOS GOBIERNOS ==============================
  {
    id: 'niveles-gobierno',
    title: 'Niveles de gobierno y la provincia de Buenos Aires',
    description:
      'Gobierno nacional, provincial y municipal, los tres poderes, el gobierno bonaerense y los escudos.',
    emoji: '🏛️',
    questions: [
      {
        id: 'go1',
        kind: 'reveal',
        emoji: '🏛️',
        prompt: '¿Cuáles son los tres niveles de gobierno en la Argentina?',
        options: [
          {
            text: 'Nacional, provincial y municipal.',
            correct: true,
            why: '¡Correcto! El nacional gobierna todo el país, el provincial cada provincia y el municipal cada municipio (en Buenos Aires se llaman partidos).',
          },
          {
            text: 'Ejecutivo, legislativo y judicial.',
            why: 'Incorrecto. Esos son los tres poderes, que existen dentro de cada nivel de gobierno.',
          },
          {
            text: 'Escuela, familia y club.',
            why: 'Incorrecto. Son grupos sociales, no niveles de gobierno.',
          },
        ],
      },
      {
        id: 'go-clas1',
        kind: 'classify',
        prompt: '¿Quién gobierna en cada nivel? (Poder Ejecutivo)',
        categories: ['Nacional', 'Provincial', 'Municipal'],
        items: [
          { text: 'el presidente', category: 'Nacional' },
          { text: 'el gobernador', category: 'Provincial' },
          { text: 'el intendente', category: 'Municipal' },
        ],
      },
      {
        id: 'go-clas2',
        kind: 'classify',
        prompt: '¿Quién hace las leyes o normas en cada nivel? (Poder Legislativo)',
        categories: ['Nacional', 'Provincial', 'Municipal'],
        items: [
          { text: 'el Congreso de la Nación', category: 'Nacional' },
          { text: 'la Legislatura bonaerense', category: 'Provincial' },
          { text: 'el Concejo Deliberante', category: 'Municipal' },
        ],
      },
      {
        id: 'go2',
        kind: 'reveal',
        emoji: '⚖️',
        prompt: '¿Qué hace cada poder?',
        options: [
          {
            text: 'El Legislativo hace las leyes, el Ejecutivo las hace cumplir y gobierna, y el Judicial juzga si se cumplen.',
            correct: true,
            why: '¡Correcto! Así se dividen las tareas para que nadie tenga todo el poder.',
          },
          {
            text: 'El Judicial hace las leyes y el Legislativo juzga.',
            why: 'Incorrecto. Es al revés: el Legislativo hace las leyes y el Judicial juzga.',
          },
          {
            text: 'Los tres hacen exactamente lo mismo.',
            why: 'Incorrecto. Cada poder tiene una función distinta.',
          },
        ],
      },
      {
        id: 'go-clas3',
        kind: 'classify',
        prompt: '¿Qué poder hace cada tarea?',
        categories: ['Ejecutivo', 'Legislativo', 'Judicial'],
        items: [
          { text: 'administrar el país y hacer cumplir las leyes', category: 'Ejecutivo' },
          { text: 'organizar la recolección de residuos del barrio', category: 'Ejecutivo' },
          { text: 'debatir y votar las leyes', category: 'Legislativo' },
          { text: 'crear una ordenanza municipal', category: 'Legislativo' },
          { text: 'juzgar a quien no cumple una ley', category: 'Judicial' },
          { text: 'resolver conflictos entre personas', category: 'Judicial' },
        ],
      },
      {
        id: 'go3',
        prompt: '¿Cuál es la capital de la provincia de Buenos Aires?',
        options: [
          { text: 'La Plata', correct: true },
          { text: 'Ciudad Autónoma de Buenos Aires' },
          { text: 'Mar del Plata' },
          { text: 'Bahía Blanca' },
        ],
        explanation:
          'La Plata es la capital de la provincia; la Ciudad Autónoma de Buenos Aires es la capital del país.',
      },
      {
        id: 'go4',
        prompt: '¿Quién está a cargo del Poder Ejecutivo de la provincia de Buenos Aires?',
        options: [
          { text: 'El gobernador (y el vicegobernador lo acompaña).', correct: true },
          { text: 'El presidente de la Nación.' },
          { text: 'El intendente.' },
        ],
      },
      {
        id: 'go5',
        prompt: '¿Cómo está formado el Poder Legislativo de la provincia de Buenos Aires?',
        options: [
          { text: 'Por la Cámara de Senadores y la Cámara de Diputados.', correct: true },
          { text: 'Solo por el gobernador.' },
          { text: 'Por los jueces de la Suprema Corte.' },
        ],
      },
      {
        id: 'go6',
        prompt: '¿Cómo se llaman los municipios de la provincia de Buenos Aires?',
        options: [
          { text: 'Partidos', correct: true },
          { text: 'Departamentos' },
          { text: 'Barrios' },
        ],
        explanation: 'En otras provincias se llaman departamentos; en Buenos Aires se llaman partidos.',
      },
      {
        id: 'go7',
        prompt: '¿De qué se ocupa el gobierno municipal?',
        options: [
          { text: 'De temas cercanos a los vecinos: calles, alumbrado, plazas, residuos.', correct: true },
          { text: 'De las relaciones con otros países.' },
          { text: 'De imprimir la moneda del país.' },
        ],
      },
      {
        id: 'go8',
        kind: 'reveal',
        emoji: '🛡️',
        prompt:
          'En el escudo nacional y en el de la provincia de Buenos Aires aparecen dos manos entrelazadas. ¿Qué representan?',
        options: [
          {
            text: 'La unión y la fraternidad entre los pueblos.',
            correct: true,
            why: '¡Correcto! Las manos estrechadas simbolizan la unión.',
          },
          { text: 'Una pelea.', why: 'Incorrecto. Las manos están unidas, no enfrentadas.' },
          { text: 'El trabajo en el campo.', why: 'Incorrecto. Representan la unión.' },
        ],
      },
      {
        id: 'go-clas4',
        kind: 'classify',
        prompt: '¿Qué representa cada elemento de los escudos?',
        categories: ['Libertad', 'Unión', 'Victoria y gloria', 'Una nueva nación'],
        items: [
          { text: 'el gorro frigio', category: 'Libertad' },
          { text: 'las manos entrelazadas', category: 'Unión' },
          { text: 'las ramas de laurel', category: 'Victoria y gloria' },
          { text: 'el sol naciente', category: 'Una nueva nación' },
        ],
      },
      {
        id: 'go9',
        prompt: '¿Cuáles son símbolos de la provincia de Buenos Aires?',
        options: [
          { text: 'El escudo y la bandera bonaerenses.', correct: true },
          { text: 'La camiseta de un club de fútbol.' },
          { text: 'El logo de una empresa.' },
        ],
      },
    ],
  },

  // ========================= 3. NÓMADES Y SEDENTARIOS ======================
  {
    id: 'nomades-sedentarios',
    title: 'Nómades y sedentarios, cazadores y agricultores',
    description:
      'Formas de vida y de alimentación, organización social y técnicas de cultivo.',
    emoji: '🏹',
    questions: [
      {
        id: 'ns1',
        kind: 'reveal',
        emoji: '🏹',
        prompt: '¿Qué significa que un pueblo es nómade?',
        options: [
          {
            text: 'Que se traslada de un lugar a otro buscando alimento: sigue a los animales y busca frutos.',
            correct: true,
            why: '¡Correcto! Los nómades no tienen un lugar fijo y arman viviendas fáciles de transportar, como los toldos.',
          },
          {
            text: 'Que vive siempre en el mismo lugar y cultiva la tierra.',
            why: 'Incorrecto. Eso es un pueblo sedentario.',
          },
          {
            text: 'Que vive en grandes ciudades con pirámides.',
            why: 'Incorrecto. Eso hacían sociedades sedentarias como los mayas o los aztecas.',
          },
        ],
      },
      {
        id: 'ns2',
        kind: 'reveal',
        emoji: '🌽',
        prompt: '¿Qué cambió cuando algunos pueblos aprendieron a cultivar la tierra?',
        options: [
          {
            text: 'Se quedaron a vivir en un lugar fijo (se volvieron sedentarios) y formaron aldeas.',
            correct: true,
            why: '¡Correcto! Para cuidar los cultivos y esperar la cosecha tenían que quedarse cerca, así que construyeron viviendas permanentes.',
          },
          {
            text: 'Empezaron a viajar todo el tiempo.',
            why: 'Incorrecto. Al revés: la agricultura los hizo quedarse en un lugar.',
          },
          {
            text: 'Dejaron de comer plantas.',
            why: 'Incorrecto. Justamente empezaron a producir sus propios alimentos vegetales.',
          },
        ],
      },
      {
        id: 'ns-clas1',
        kind: 'classify',
        prompt: '¿Es de los cazadores-recolectores (nómades) o de los agricultores (sedentarios)?',
        categories: ['Cazadores-recolectores', 'Agricultores'],
        items: [
          { text: 'se trasladan siguiendo a los animales', category: 'Cazadores-recolectores' },
          { text: 'viven en toldos fáciles de desarmar', category: 'Cazadores-recolectores' },
          { text: 'usan arco, flecha y boleadoras', category: 'Cazadores-recolectores' },
          { text: 'recolectan frutos y raíces silvestres', category: 'Cazadores-recolectores' },
          { text: 'viven en aldeas permanentes', category: 'Agricultores' },
          { text: 'siembran maíz, papa y zapallo', category: 'Agricultores' },
          { text: 'guardan la cosecha en depósitos', category: 'Agricultores' },
          { text: 'hacen vasijas de cerámica', category: 'Agricultores' },
        ],
      },
      {
        id: 'ns3',
        prompt: '¿Cómo conseguían su alimento los cazadores-recolectores?',
        options: [
          { text: 'Cazando, pescando y recolectando frutos y semillas.', correct: true },
          { text: 'Comprándolo en el mercado.' },
          { text: 'Cultivando grandes campos de maíz.' },
        ],
      },
      {
        id: 'ns4',
        kind: 'reveal',
        emoji: '👥',
        prompt: '¿Cómo era la organización social de los cazadores-recolectores?',
        options: [
          {
            text: 'Vivían en grupos pequeños (bandas) de familias y se repartían las tareas.',
            correct: true,
            why: '¡Correcto! Al moverse todo el tiempo, los grupos eran chicos. Unos cazaban y otros recolectaban, preparaban la comida y cuidaban a los niños.',
          },
          {
            text: 'Tenían un emperador, ejércitos y grandes ciudades.',
            why: 'Incorrecto. Eso corresponde a sociedades muy organizadas, como los incas o los aztecas.',
          },
          {
            text: 'Cada persona vivía sola.',
            why: 'Incorrecto. Vivían en grupos y colaboraban entre todos.',
          },
        ],
      },
      {
        id: 'ns-clas2',
        kind: 'classify',
        prompt: '¿Qué técnica de cultivo es cada una?',
        categories: ['Terrazas', 'Chinampas', 'Riego', 'Roza y quema'],
        items: [
          { text: 'escalones en las laderas de las montañas', category: 'Terrazas' },
          { text: 'islas de cultivo sobre un lago', category: 'Chinampas' },
          { text: 'canales y acequias que llevan agua', category: 'Riego' },
          { text: 'cortar y quemar la selva para sembrar', category: 'Roza y quema' },
        ],
      },
      {
        id: 'ns5',
        kind: 'reveal',
        emoji: '⛰️',
        prompt: '¿Para qué servían las terrazas o andenes de cultivo en las montañas?',
        options: [
          {
            text: 'Para tener terreno plano donde sembrar y evitar que la lluvia arrastre la tierra.',
            correct: true,
            why: '¡Correcto! Los incas y los diaguitas construían escalones con muros de piedra en las laderas.',
          },
          {
            text: 'Para que los animales pudieran escaparse.',
            why: 'Incorrecto. Eran para cultivar.',
          },
          {
            text: 'Para jugar a la pelota.',
            why: 'Incorrecto. Eran una técnica de cultivo.',
          },
        ],
      },
      {
        id: 'ns6',
        prompt: '¿Cuál era el cultivo más importante de los pueblos americanos?',
        options: [{ text: 'El maíz', correct: true }, { text: 'El trigo' }, { text: 'El arroz' }],
        explanation: 'El maíz fue la base de la alimentación de mayas, aztecas, incas y muchos otros pueblos.',
      },
    ],
  },

  // ========================= 4. MAYAS, AZTECAS E INCAS =====================
  {
    id: 'mayas-aztecas-incas-indigenas',
    title: 'Mayas, aztecas, incas y pueblos indígenas argentinos',
    description:
      'Las sociedades muy organizadas de América y los pueblos originarios del territorio argentino y bonaerense.',
    emoji: '🛕',
    questions: [
      {
        id: 'ma-clas1',
        kind: 'classify',
        prompt: '¿De qué civilización es cada característica?',
        categories: ['Mayas', 'Aztecas', 'Incas'],
        items: [
          { text: 'península de Yucatán y selvas de Guatemala', category: 'Mayas' },
          { text: 'escritura con jeroglíficos y el número cero', category: 'Mayas' },
          { text: 'ciudades-estado independientes', category: 'Mayas' },
          { text: 'capital Tenochtitlan, sobre un lago', category: 'Aztecas' },
          { text: 'cultivo en chinampas', category: 'Aztecas' },
          { text: 'cobraban tributo a los pueblos vencidos', category: 'Aztecas' },
          { text: 'capital Cuzco, en la cordillera de los Andes', category: 'Incas' },
          { text: 'contaban con quipus (cuerdas con nudos)', category: 'Incas' },
          { text: 'cultivo en terrazas o andenes', category: 'Incas' },
        ],
      },
      {
        id: 'ma1',
        kind: 'reveal',
        emoji: '🛕',
        prompt: '¿Por qué se dice que mayas, aztecas e incas eran sociedades muy organizadas?',
        options: [
          {
            text: 'Porque tenían grandes ciudades, gobernantes, sacerdotes, guerreros, campesinos y artesanos, cada uno con su tarea.',
            correct: true,
            why: '¡Correcto! Eran sociedades jerárquicas: había grupos con distintas tareas y distintos privilegios.',
          },
          {
            text: 'Porque eran grupos pequeños que se trasladaban.',
            why: 'Incorrecto. Eran sedentarios y vivían en grandes ciudades.',
          },
          {
            text: 'Porque no tenían ninguna autoridad.',
            why: 'Incorrecto. Tenían gobernantes muy poderosos.',
          },
        ],
      },
      {
        id: 'ma2',
        prompt: '¿Cómo se llamaba la capital del Imperio Inca?',
        options: [{ text: 'Cuzco', correct: true }, { text: 'Tenochtitlan' }, { text: 'Tikal' }],
      },
      {
        id: 'ma3',
        prompt: '¿Dónde estaba construida Tenochtitlan, la capital azteca?',
        options: [
          { text: 'En una isla en medio de un lago.', correct: true },
          { text: 'En la cima de la cordillera de los Andes.' },
          { text: 'En la llanura pampeana.' },
        ],
        explanation: 'Estaba en el lago Texcoco, donde hoy está la Ciudad de México.',
      },
      {
        id: 'ma4',
        kind: 'reveal',
        emoji: '🧶',
        prompt: '¿Qué eran los quipus de los incas?',
        options: [
          {
            text: 'Cuerdas de colores con nudos que servían para contar y llevar registros.',
            correct: true,
            why: '¡Correcto! Con los nudos registraban cantidades: personas, cosechas, animales…',
          },
          { text: 'Pirámides escalonadas.', why: 'Incorrecto. Los quipus eran cuerdas con nudos.' },
          { text: 'Islas flotantes para cultivar.', why: 'Incorrecto. Esas eran las chinampas de los aztecas.' },
        ],
      },
      {
        id: 'ma5',
        prompt: '¿Cómo se llamaba la máxima autoridad del Imperio Inca, considerado hijo del Sol?',
        options: [{ text: 'El Inca', correct: true }, { text: 'El intendente' }, { text: 'El cacique querandí' }],
      },
      {
        id: 'ma6',
        prompt: '¿Cuál de estos aportes es de los mayas?',
        options: [
          { text: 'Un calendario muy preciso y el uso del número cero.', correct: true },
          { text: 'El Camino del Inca.' },
          { text: 'Las chinampas.' },
        ],
      },
      {
        id: 'ma7',
        prompt: '¿Qué cultivo andino domesticaron los incas y hoy se come en todo el mundo?',
        options: [{ text: 'La papa', correct: true }, { text: 'El trigo' }, { text: 'La banana' }],
      },
      {
        id: 'ind1',
        kind: 'reveal',
        emoji: '🏹',
        prompt: '¿Qué pueblo originario vivía en el territorio de la actual provincia de Buenos Aires cuando llegaron los españoles?',
        options: [
          {
            text: 'Los querandíes.',
            correct: true,
            why: '¡Correcto! Eran cazadores-recolectores nómades de la llanura pampeana: cazaban guanacos, venados y ñandúes con boleadoras.',
          },
          { text: 'Los incas.', why: 'Incorrecto. El Imperio Inca estaba en los Andes, al noroeste.' },
          { text: 'Los aztecas.', why: 'Incorrecto. Vivían en el actual México.' },
        ],
      },
      {
        id: 'ind2',
        prompt: '¿Qué arma usaban los querandíes para cazar ñandúes y guanacos?',
        options: [
          { text: 'Las boleadoras', correct: true },
          { text: 'Las chinampas' },
          { text: 'Los quipus' },
        ],
      },
      {
        id: 'ind-clas1',
        kind: 'classify',
        prompt: 'Pueblos del territorio argentino: ¿eran nómades o sedentarios?',
        categories: ['Nómades (cazadores)', 'Sedentarios (agricultores)'],
        items: [
          { text: 'querandíes (llanura pampeana)', category: 'Nómades (cazadores)' },
          { text: 'tehuelches (Patagonia)', category: 'Nómades (cazadores)' },
          { text: 'selk’nam u onas (Tierra del Fuego)', category: 'Nómades (cazadores)' },
          { text: 'diaguitas (noroeste)', category: 'Sedentarios (agricultores)' },
          { text: 'guaraníes (noreste)', category: 'Sedentarios (agricultores)' },
        ],
      },
      {
        id: 'ind3',
        kind: 'reveal',
        emoji: '⛰️',
        prompt: '¿Cómo vivían los diaguitas, en el noroeste argentino?',
        options: [
          {
            text: 'Eran agricultores sedentarios: cultivaban maíz y papa en terrazas y usaban canales de riego.',
            correct: true,
            why: '¡Correcto! Vivían en aldeas con casas de piedra y eran muy buenos ceramistas.',
          },
          {
            text: 'Eran nómades que cazaban guanacos en la llanura.',
            why: 'Incorrecto. Así vivían los querandíes o los tehuelches.',
          },
          {
            text: 'Vivían en una isla en medio de un lago.',
            why: 'Incorrecto. Esa era Tenochtitlan, de los aztecas.',
          },
        ],
      },
      {
        id: 'ind4',
        prompt: 'Los guaraníes del noreste preparaban la tierra cortando y quemando parte de la selva. ¿Qué técnica es?',
        options: [{ text: 'Roza y quema', correct: true }, { text: 'Chinampas' }, { text: 'Quipus' }],
        explanation: 'Cultivaban mandioca, maíz y zapallo en los claros que abrían en la selva.',
      },
    ],
  },
]
