import type { Practice } from '../types'

// ============================================================================
// 4to GRADO — Prácticas del Lenguaje — Simulacro "Alto en el camino III"
// Basado en el simulacro que dio la seño:
//  1-2) Lectura y comprensión de un fragmento de «El gato con botas».
//  3)   Análisis de oraciones (sujeto, predicado, núcleos, MD, sujeto tácito).
//  4)   Verdadero o falso (cuento maravilloso, publicidad, paratextos, verbos)
//       y reescribir las falsas.
//  5)   Partes de la noticia.
//  6)   Cuadro de verbos: tiempo verbal, persona y número.
//  Bonus) Oraciones unimembres.
// La práctica 1 sigue el simulacro tal cual; la 2 es otra vuelta con otros
// textos y otras oraciones.
// ============================================================================

const GATO_CON_BOTAS = `Hace muchos años, el gato con botas llegó a un grandioso castillo en el medio del campo, cuyo dueño era un temible ogro, el más rico de todo el reino.

El inteligente felino, sabiendo los increíbles poderes que la criatura mágica poseía, golpeó la puerta y pidió hablar con él bajo el pretexto de presentarle sus respetos. El ogro lo recibió con cortesía y lo invitó a tomar asiento.

—Me han asegurado —dijo el gato para romper el hielo— que tenéis la increíble habilidad de convertiros en cualquier clase de animal. Que podéis, si os place, transformaros en un feroz león o en un enorme elefante.
—¡Es totalmente cierto! —contestó el ogro con orgullo—. Y para demostrártelo, me verás convertido en león en este mismo instante.

De inmediato, el ogro se transformó en un enorme león salvaje. El gato se asustó tanto al ver semejante bestia rugiendo frente a él que, de un solo salto, trepó hasta las canaletas del techo.

Una vez que el ogro recuperó su forma original, el felino bajó exhausto y admitió su gran asombro. Sin embargo, usando su brillante picardía, decidió desafiarlo una vez más:
—También me han asegurado, aunque me cuesta mucho creerlo, que tenéis el poder de tomar la forma de los animales más pequeños. Por ejemplo, la de un diminuto roedor. Debo confesar que eso me parece del todo imposible.
—¿Imposible? ¡Ya lo verás! —rugió el ogro, sumamente ofendido por la incredulidad del visitante.

En un abrir y cerrar de ojos, el gigante desapareció y en su lugar comenzó a corretear por el suelo un pequeño ratón. Esa era exactamente la oportunidad que el Gato con Botas estaba esperando: sin dudarlo un segundo, se abalanzó sobre él con un rápido zarpazo y se lo comió de un solo bocado.`

const PRINCESA_DRAGON = `Hace mucho tiempo, en un reino lejano rodeado de montañas, vivía una princesa valiente llamada Ana. En lo alto de la montaña más alta dormía un dragón gigante que cuidaba un tesoro.

Una mañana, el dragón despertó furioso y quemó los campos del reino. Los habitantes, asustados, se escondieron en sus casas.

La princesa tomó su caballo y subió a la montaña. Allí encontró a un hada que le regaló una flauta mágica.
—Cuando la toques, el dragón se dormirá —le dijo el hada.

Ana tocó la flauta frente a la cueva. El dragón bostezó, se acostó sobre el tesoro y durmió durante cien años. Desde ese día, el reino vivió en paz.`

const ANALISIS =
  'Arrastrá los cartelitos: MD (modificador directo) y N (núcleo) en el sujeto; NV (núcleo verbal) y P (resto del predicado) en el predicado.'

export const grade4PdlSimulacro3Practices: Practice[] = [
  // =================== 1. EL SIMULACRO, CONSIGNA POR CONSIGNA ===============
  {
    id: 'simulacro-gato-con-botas',
    title: 'Simulacro 1: El gato con botas',
    description:
      'El simulacro de la seño: comprensión del cuento, análisis de oraciones, verdadero o falso, partes de la noticia y cuadro de verbos.',
    emoji: '🐈',
    questions: [
      // ---- 1 y 2: lectura y comprensión ----
      {
        id: 's1-lugar',
        kind: 'reveal',
        poemTitle: 'El gato con botas (fragmento)',
        poem: GATO_CON_BOTAS,
        prompt: 'A) ¿Dónde y cuándo sucede la historia?',
        hint: 'Buscá las pistas en el primer párrafo: ¿cuándo? y ¿dónde llegó el gato?',
        options: [
          {
            text: 'Hace muchos años, en un grandioso castillo en el medio del campo.',
            correct: true,
            why: '¡Correcto! «Hace muchos años» dice cuándo y «un grandioso castillo en el medio del campo» dice dónde. Son un tiempo y un lugar imprecisos, típicos del cuento maravilloso. En la carpeta respondé con oración completa: «La historia sucede hace muchos años, en un grandioso castillo en el medio del campo».',
          },
          {
            text: 'Ayer a la tarde, en la casa del molinero.',
            why: 'Incorrecto. En el fragmento no aparece ni «ayer» ni la casa del molinero. Releé el comienzo.',
          },
          {
            text: 'En el año 1850, en un castillo de Francia.',
            why: 'Incorrecto. Los cuentos maravillosos no dan fechas ni lugares exactos.',
          },
        ],
      },
      {
        id: 's1-ogro',
        poemTitle: 'El gato con botas (fragmento)',
        poem: GATO_CON_BOTAS,
        kind: 'classify',
        prompt: 'B) ¿Cuáles son las características de cada personaje? Clasificalas.',
        categories: ['El ogro', 'El gato'],
        items: [
          { text: 'temible', category: 'El ogro' },
          { text: 'el más rico del reino', category: 'El ogro' },
          { text: 'tiene poderes mágicos', category: 'El ogro' },
          { text: 'orgulloso', category: 'El ogro' },
          { text: 'se ofende fácilmente', category: 'El ogro' },
          { text: 'inteligente', category: 'El gato' },
          { text: 'pícaro / astuto', category: 'El gato' },
          { text: 'respetuoso y educado (para engañar)', category: 'El gato' },
        ],
        explanation:
          'En la carpeta: «El ogro era temible, el más rico del reino, tenía poderes mágicos y era orgulloso. El gato era inteligente y muy pícaro».',
      },
      {
        id: 's1-objetivo',
        poemTitle: 'El gato con botas (fragmento)',
        poem: GATO_CON_BOTAS,
        kind: 'reveal',
        emoji: '🎯',
        prompt: 'C) ¿Qué objetivo tenía el gato?',
        hint: 'Pensá por qué lo desafió a convertirse en un animal pequeño y qué hizo después.',
        options: [
          {
            text: 'Engañar al ogro para que se convirtiera en un ratón y así poder comérselo.',
            correct: true,
            why: '¡Correcto! El gato lo provoca diciendo que «le parece imposible»; el ogro, ofendido, se transforma en ratón y el gato se lo come. Esa era «la oportunidad que estaba esperando».',
          },
          {
            text: 'Hacerse amigo del ogro y vivir con él en el castillo.',
            why: 'Incorrecto. El gato solo fingió ser respetuoso: «bajo el pretexto de presentarle sus respetos».',
          },
          {
            text: 'Ver un león de verdad.',
            why: 'Incorrecto. Cuando vio al león se asustó tanto que trepó al techo.',
          },
        ],
      },
      {
        id: 's1-tipo',
        prompt: '¿Qué tipo de texto es «El gato con botas»?',
        options: [
          { text: 'Un cuento maravilloso.', correct: true },
          { text: 'Una noticia.' },
          { text: 'Una publicidad.' },
        ],
        explanation: 'Tiene personajes mágicos (un ogro que se transforma, un gato que habla) y un tiempo y lugar imprecisos.',
      },
      {
        id: 's1-roles',
        poemTitle: 'El gato con botas (fragmento)',
        poem: GATO_CON_BOTAS,
        kind: 'classify',
        prompt: '¿Qué papel cumple cada personaje en el fragmento?',
        categories: ['Protagonista', 'Antagonista'],
        items: [
          { text: 'el Gato con Botas', category: 'Protagonista' },
          { text: 'el ogro', category: 'Antagonista' },
        ],
        explanation: 'El protagonista es el personaje principal. El antagonista es el que se le opone: el ogro.',
      },

      // ---- 3: análisis de oraciones ----
      {
        id: 's1-an1',
        kind: 'analyze',
        prompt: `«El gato llegó a un grandioso castillo.» ${ANALISIS}`,
        words: ['El', 'gato', 'llegó', 'a', 'un', 'grandioso', 'castillo.'],
        labels: ['MD', 'N', 'NV', 'P', 'P', 'P', 'P'],
        explanation:
          'Oración bimembre. Sujeto expreso simple: «El gato» (MD: El, N: gato). Predicado verbal simple: «llegó a un grandioso castillo» (NV: llegó).',
      },
      {
        id: 's1-an2',
        kind: 'analyze',
        prompt: `«El ogro lo recibió con cortesía.» ${ANALISIS}`,
        words: ['El', 'ogro', 'lo', 'recibió', 'con', 'cortesía.'],
        labels: ['MD', 'N', 'P', 'NV', 'P', 'P'],
        explanation:
          'Sujeto expreso simple: «El ogro» (MD: El, N: ogro). Predicado: «lo recibió con cortesía» (NV: recibió). El «lo» va en el predicado aunque esté antes del verbo.',
      },
      {
        id: 's1-an3a',
        kind: 'words',
        prompt: '«Era el más rico de todo el reino.» Tocá el NÚCLEO VERBAL.',
        words: ['Era', 'el', 'más', 'rico', 'de', 'todo', 'el', 'reino.'],
        pick: [0],
        explanation: 'El núcleo verbal es «Era». Toda la oración es predicado: no hay sujeto escrito.',
      },
      {
        id: 's1-an3b',
        kind: 'reveal',
        emoji: '👻',
        prompt: '«Era el más rico de todo el reino.» ¿Cómo es el sujeto de esta oración?',
        options: [
          {
            text: 'Sujeto tácito: él (el ogro).',
            correct: true,
            why: '¡Correcto! No está escrito, pero el verbo «era» nos dice que es él. Al analizarla se escribe «S.T.: él» y se marca todo como predicado.',
          },
          {
            text: 'Sujeto expreso: «el más rico».',
            why: 'Incorrecto. «el más rico de todo el reino» dice cómo era: es parte del predicado.',
          },
          {
            text: 'Es una oración unimembre, no tiene sujeto.',
            why: 'Incorrecto. Sí tiene sujeto, solo que no está escrito (tácito). Es bimembre.',
          },
        ],
      },
      {
        id: 's1-an4a',
        prompt: '«Se transformó en un enorme león salvaje.» ¿Cuál es el sujeto tácito?',
        options: [
          { text: 'él (el ogro)', correct: true },
          { text: 'un enorme león salvaje' },
          { text: 'ellos' },
        ],
        explanation:
          'El verbo «transformó» está en 3ra persona del singular: él. «un enorme león salvaje» es en qué se transformó, parte del predicado.',
      },
      {
        id: 's1-an4b',
        kind: 'words',
        prompt: '«Se transformó en un enorme león salvaje.» Tocá el sustantivo que es núcleo de «un enorme león salvaje».',
        words: ['Se', 'transformó', 'en', 'un', 'enorme', 'león', 'salvaje.'],
        pick: [5],
        explanation: 'En «un enorme león salvaje» el núcleo es «león»; «un», «enorme» y «salvaje» son sus modificadores directos.',
      },
      {
        id: 's1-or-tipo',
        kind: 'classify',
        prompt: 'Las 4 oraciones del simulacro: ¿el sujeto es expreso o tácito?',
        categories: ['Sujeto expreso', 'Sujeto tácito'],
        items: [
          { text: 'El gato llegó a un grandioso castillo.', category: 'Sujeto expreso' },
          { text: 'El ogro lo recibió con cortesía.', category: 'Sujeto expreso' },
          { text: 'Era el más rico de todo el reino.', category: 'Sujeto tácito' },
          { text: 'Se transformó en un enorme león salvaje.', category: 'Sujeto tácito' },
        ],
      },

      // ---- 4: verdadero o falso ----
      {
        id: 's1-vf1',
        prompt: 'Verdadero o falso: «Los cuentos maravillosos transcurren en lugares imprecisos y en un tiempo incierto.»',
        keepOrder: true,
        options: [{ text: 'Verdadero', correct: true }, { text: 'Falso' }],
        explanation: '«Hace muchos años», «en un lejano reino»: no se sabe exactamente cuándo ni dónde.',
      },
      {
        id: 's1-vf2',
        prompt:
          'Verdadero o falso: «Además de los protagonistas en un cuento, hay personajes secundarios, antagonistas y ayudantes.»',
        keepOrder: true,
        options: [{ text: 'Verdadero', correct: true }, { text: 'Falso' }],
      },
      {
        id: 's1-vf3',
        kind: 'reveal',
        emoji: '📢',
        prompt:
          'Verdadero o falso: «Las publicidades son anuncios impresos o audiovisuales que no buscan persuadir a los compradores.»',
        options: [
          {
            text: 'Falso',
            correct: true,
            why: '¡Correcto! Corregida: «Las publicidades son anuncios impresos o audiovisuales que SÍ buscan persuadir (convencer) a los compradores».',
          },
          {
            text: 'Verdadero',
            why: 'Incorrecto. El objetivo de la publicidad es justamente persuadir: convencernos de comprar o usar algo.',
          },
        ],
      },
      {
        id: 's1-vf4',
        kind: 'reveal',
        emoji: '🖼️',
        prompt:
          'Verdadero o falso: «Los paratextos son elementos verbales y no verbales que agregan información al texto, sin anticipar de qué se trata.»',
        options: [
          {
            text: 'Falso',
            correct: true,
            why: '¡Correcto! Corregida: «Los paratextos son elementos verbales y no verbales que agregan información al texto y PERMITEN ANTICIPAR de qué se trata». Ej: el título, las imágenes, el epígrafe.',
          },
          {
            text: 'Verdadero',
            why: 'Incorrecto. Los paratextos sí anticipan: con solo mirar el título y la imagen ya imaginamos de qué trata.',
          },
        ],
      },
      {
        id: 's1-vf5',
        prompt: 'Verdadero o falso: «Los verbos son palabras que indican qué acción se está realizando.»',
        keepOrder: true,
        options: [{ text: 'Verdadero', correct: true }, { text: 'Falso' }],
        explanation: 'Los verbos indican acciones (correr, saltar), y también estados o procesos.',
      },
      {
        id: 's1-vf-corr',
        prompt: '4.b) ¿Cuál es la forma correcta de reescribir la afirmación falsa sobre las publicidades?',
        options: [
          {
            text: 'Las publicidades son anuncios impresos o audiovisuales que buscan persuadir a los compradores.',
            correct: true,
          },
          { text: 'Las publicidades son textos que cuentan hechos reales y recientes.' },
          { text: 'Las publicidades son cuentos con personajes mágicos.' },
        ],
        explanation: 'Para corregir una falsa, se cambia solo la parte que está mal. Lo que cuenta hechos reales y recientes es la noticia.',
      },

      // ---- 5: partes de la noticia ----
      {
        id: 's1-noticia',
        kind: 'drag',
        prompt: 'Indicá las partes de la noticia «Recolectaron donaciones para un merendero».',
        segments: [
          '«Solidaridad en el barrio» (arriba del título, chiquito) es la ',
          '. «Recolectaron donaciones para un merendero» (en letras grandes) es el ',
          '. «Los vecinos y una escuela del barrio organizaron una colecta…» (el resumen) es el ',
          '. El dibujo de los chicos con la caja es la ',
          '. «Los chicos del barrio se sumaron a la iniciativa» (debajo del dibujo) es el ',
          '. «Durante la semana, los chicos juntaron alimentos…» (donde se cuenta todo) es el ',
          '.',
        ],
        blanks: ['volanta', 'título', 'copete', 'imagen', 'epígrafe', 'cuerpo'],
        bank: ['cuerpo', 'título', 'epígrafe', 'volanta', 'imagen', 'copete'],
        explanation:
          'Volanta: arriba del título. Título: lo más grande. Copete: resume lo más importante. Imagen y epígrafe: el texto que explica la imagen. Cuerpo: desarrolla la información.',
      },
      {
        id: 's1-noticia2',
        prompt: '¿Qué preguntas responde el copete de una noticia?',
        options: [
          { text: '¿Qué pasó? ¿Quiénes? ¿Dónde? ¿Cuándo?', correct: true },
          { text: '¿Había una vez? ¿Y colorín colorado?' },
          { text: '¿Cuánto cuesta? ¿Dónde se compra?' },
        ],
        explanation: 'En la noticia del merendero: qué (una colecta), quiénes (los vecinos y una escuela), para qué (ayudar al merendero).',
      },

      // ---- 6: cuadro de verbos ----
      {
        id: 's1-ppc',
        kind: 'reveal',
        emoji: '🧩',
        prompt: 'En el cuadro aparecen «Ha viajado» y «He pintado». ¿En qué tiempo están?',
        options: [
          {
            text: 'Pretérito perfecto compuesto: verbo «haber» en presente (he, has, ha, hemos, han) + el verbo terminado en -ado / -ido.',
            correct: true,
            why: '¡Correcto! Es una acción pasada pero cercana al presente: «Hoy he pintado un cuadro». No lo confundas con el pluscuamperfecto, que usa «había»: «había comprado».',
          },
          {
            text: 'Pretérito pluscuamperfecto.',
            why: 'Incorrecto. El pluscuamperfecto usa «había» (había viajado). Acá el auxiliar es «ha» / «he».',
          },
          {
            text: 'Pretérito imperfecto.',
            why: 'Incorrecto. El imperfecto es una sola palabra terminada en -aba o -ía: viajaba, pintaba.',
          },
        ],
      },
      {
        id: 's1-tiempos',
        kind: 'classify',
        prompt: 'Completá el cuadro: ¿en qué tiempo verbal está cada verbo?',
        categories: [
          'Pretérito perfecto simple',
          'Pretérito imperfecto',
          'Pretérito pluscuamperfecto',
          'Pretérito perfecto compuesto',
        ],
        items: [
          { text: 'Decidió', category: 'Pretérito perfecto simple' },
          { text: 'Salí', category: 'Pretérito perfecto simple' },
          { text: 'Saltó', category: 'Pretérito perfecto simple' },
          { text: 'Comieron', category: 'Pretérito perfecto simple' },
          { text: 'Vendió', category: 'Pretérito perfecto simple' },
          { text: 'Amaban', category: 'Pretérito imperfecto' },
          { text: 'Lavaban', category: 'Pretérito imperfecto' },
          { text: 'Había comprado', category: 'Pretérito pluscuamperfecto' },
          { text: 'Ha viajado', category: 'Pretérito perfecto compuesto' },
          { text: 'He pintado', category: 'Pretérito perfecto compuesto' },
        ],
        explanation:
          'Perfecto simple: una palabra, acción terminada (decidió, salí). Imperfecto: -aba / -ía (amaban, lavaban). Pluscuamperfecto: había + -ado/-ido. Perfecto compuesto: he/ha + -ado/-ido.',
      },
      {
        id: 's1-personas',
        kind: 'classify',
        prompt: 'Completá el cuadro: ¿en qué persona y número está cada verbo?',
        categories: ['1ra singular (yo)', '3ra singular (él/ella)', '3ra plural (ellos/ellas)'],
        items: [
          { text: 'Salí', category: '1ra singular (yo)' },
          { text: 'He pintado', category: '1ra singular (yo)' },
          { text: 'Decidió', category: '3ra singular (él/ella)' },
          { text: 'Saltó', category: '3ra singular (él/ella)' },
          { text: 'Ha viajado', category: '3ra singular (él/ella)' },
          { text: 'Vendió', category: '3ra singular (él/ella)' },
          { text: 'Amaban', category: '3ra plural (ellos/ellas)' },
          { text: 'Comieron', category: '3ra plural (ellos/ellas)' },
          { text: 'Lavaban', category: '3ra plural (ellos/ellas)' },
        ],
        explanation: 'Truco: probá ponerle adelante «yo», «él» o «ellos» y fijate cuál suena bien: «yo salí», «él decidió», «ellos amaban».',
      },
      {
        id: 's1-habia',
        kind: 'reveal',
        emoji: '🤔',
        prompt: '¿En qué persona y número está «Había comprado»?',
        options: [
          {
            text: 'Puede ser 1ra persona singular (yo había comprado) o 3ra persona singular (él había comprado).',
            correct: true,
            why: '¡Correcto! «Había» es igual para yo y para él. En el cuadro podés poner «1ra o 3ra persona del singular». Lo que seguro es: singular.',
          },
          {
            text: '3ra persona plural.',
            why: 'Incorrecto. En plural sería «habían comprado».',
          },
          {
            text: '2da persona singular.',
            why: 'Incorrecto. Para tú/vos sería «habías comprado».',
          },
        ],
      },
      {
        id: 's1-v1',
        prompt: '«Comieron»: ¿en qué tiempo, persona y número está?',
        options: [
          { text: 'Pretérito perfecto simple, 3ra persona plural.', correct: true },
          { text: 'Pretérito imperfecto, 3ra persona plural.' },
          { text: 'Pretérito perfecto simple, 1ra persona plural.' },
        ],
        explanation: 'Ellos comieron. En imperfecto sería «comían» y en 1ra plural «comimos».',
      },
      {
        id: 's1-v2',
        prompt: '«Lavaban»: ¿en qué tiempo, persona y número está?',
        options: [
          { text: 'Pretérito imperfecto, 3ra persona plural.', correct: true },
          { text: 'Pretérito perfecto simple, 3ra persona plural.' },
          { text: 'Pretérito imperfecto, 3ra persona singular.' },
        ],
        explanation: 'Ellos lavaban: termina en -aban, es imperfecto y plural.',
      },

      // ---- Bonus: unimembres ----
      {
        id: 's1-bonus',
        kind: 'classify',
        prompt: '¡BONUS! Separá las oraciones unimembres de las bimembres.',
        categories: ['Unimembre', 'Bimembre'],
        items: [
          { text: '¡Qué castillo enorme!', category: 'Unimembre' },
          { text: '¡Imposible!', category: 'Unimembre' },
          { text: 'Buenos días, señor ogro.', category: 'Unimembre' },
          { text: 'Llueve sobre el reino.', category: 'Unimembre' },
          { text: 'El gato trepó al techo.', category: 'Bimembre' },
          { text: 'El ogro rugió.', category: 'Bimembre' },
        ],
        explanation:
          'Las unimembres no se pueden dividir en sujeto y predicado. Ejemplos para el bonus: «¡Qué susto!», «Muchas gracias.», «Nieva.».',
      },
    ],
  },

  // ===================== 2. OTRA VUELTA, CON OTRO CUENTO ====================
  {
    id: 'simulacro-otra-vuelta',
    title: 'Simulacro 2: otra vuelta',
    description:
      'Las mismas consignas del simulacro con otro cuento, otras oraciones y otros verbos.',
    emoji: '🔁',
    questions: [
      {
        id: 's2-lugar',
        kind: 'reveal',
        poemTitle: 'La princesa y el dragón',
        poem: PRINCESA_DRAGON,
        prompt: '¿Dónde y cuándo sucede la historia?',
        options: [
          {
            text: 'Hace mucho tiempo, en un reino lejano rodeado de montañas.',
            correct: true,
            why: '¡Correcto! Tiempo y lugar imprecisos, como en todo cuento maravilloso.',
          },
          {
            text: 'Una mañana, en la cueva del dragón.',
            why: 'Casi. Eso es un momento y un lugar de una parte del cuento, pero toda la historia sucede «hace mucho tiempo, en un reino lejano».',
          },
          {
            text: 'En 2020, en Buenos Aires.',
            why: 'Incorrecto. En los cuentos maravillosos no hay fechas ni lugares reales.',
          },
        ],
      },
      {
        id: 's2-roles',
        poemTitle: 'La princesa y el dragón',
        poem: PRINCESA_DRAGON,
        kind: 'classify',
        prompt: 'Clasificá los personajes del cuento.',
        categories: ['Protagonista', 'Antagonista', 'Ayudante', 'Secundarios'],
        items: [
          { text: 'la princesa Ana', category: 'Protagonista' },
          { text: 'el dragón', category: 'Antagonista' },
          { text: 'el hada', category: 'Ayudante' },
          { text: 'los habitantes del reino', category: 'Secundarios' },
        ],
      },
      {
        id: 's2-objeto',
        poemTitle: 'La princesa y el dragón',
        poem: PRINCESA_DRAGON,
        prompt: '¿Cuál es el objeto mágico del cuento?',
        options: [
          { text: 'La flauta mágica.', correct: true },
          { text: 'El caballo.' },
          { text: 'El tesoro.' },
        ],
        explanation: 'El hada (ayudante) le da a la protagonista un objeto mágico para resolver el conflicto.',
      },
      {
        id: 's2-objetivo',
        poemTitle: 'La princesa y el dragón',
        poem: PRINCESA_DRAGON,
        prompt: '¿Qué objetivo tenía la princesa?',
        options: [
          { text: 'Detener al dragón para que el reino viviera en paz.', correct: true },
          { text: 'Robarle el tesoro al dragón.' },
          { text: 'Aprender a tocar la flauta.' },
        ],
      },
      {
        id: 's2-an1',
        kind: 'analyze',
        prompt: `«La princesa valiente subió a la montaña.» ${ANALISIS}`,
        words: ['La', 'princesa', 'valiente', 'subió', 'a', 'la', 'montaña.'],
        labels: ['MD', 'N', 'MD', 'NV', 'P', 'P', 'P'],
        explanation: 'Sujeto: «La princesa valiente» (MD: La, valiente; N: princesa). Predicado: «subió a la montaña» (NV: subió).',
      },
      {
        id: 's2-an2',
        kind: 'analyze',
        prompt: `«Un hada mágica le regaló una flauta.» ${ANALISIS}`,
        words: ['Un', 'hada', 'mágica', 'le', 'regaló', 'una', 'flauta.'],
        labels: ['MD', 'N', 'MD', 'P', 'NV', 'P', 'P'],
        explanation: 'Sujeto: «Un hada mágica» (N: hada). Predicado: «le regaló una flauta» (NV: regaló).',
      },
      {
        id: 's2-an3',
        kind: 'analyze',
        prompt: `«El enorme dragón durmió cien años.» ${ANALISIS}`,
        words: ['El', 'enorme', 'dragón', 'durmió', 'cien', 'años.'],
        labels: ['MD', 'MD', 'N', 'NV', 'P', 'P'],
        explanation: 'Sujeto: «El enorme dragón» (MD: El, enorme; N: dragón). Predicado: «durmió cien años» (NV: durmió).',
      },
      {
        id: 's2-tacito',
        prompt: '«Tocó la flauta frente a la cueva.» ¿Cuál es el sujeto tácito?',
        options: [
          { text: 'ella (la princesa)', correct: true },
          { text: 'la flauta' },
          { text: 'nosotros' },
        ],
        explanation: '«Tocó» está en 3ra persona del singular: ella.',
      },
      {
        id: 's2-tacito2',
        prompt: '«Escondimos el tesoro en la cueva.» ¿Cuál es el sujeto tácito?',
        options: [
          { text: 'nosotros', correct: true },
          { text: 'ellos' },
          { text: 'el tesoro' },
        ],
      },
      {
        id: 's2-vf',
        kind: 'classify',
        prompt: 'Verdadero o falso: arrastrá cada afirmación.',
        categories: ['Verdadero', 'Falso'],
        items: [
          { text: 'La noticia cuenta hechos reales y recientes.', category: 'Verdadero' },
          { text: 'El título y la imagen son paratextos.', category: 'Verdadero' },
          { text: 'En los cuentos maravillosos aparecen objetos mágicos.', category: 'Verdadero' },
          { text: 'La publicidad no quiere convencer a nadie.', category: 'Falso' },
          { text: 'La volanta va debajo de la imagen.', category: 'Falso' },
          { text: 'El antagonista ayuda al protagonista.', category: 'Falso' },
        ],
        explanation:
          'Corregidas: la publicidad SÍ busca convencer (persuadir); el texto que va debajo de la imagen es el EPÍGRAFE (la volanta va arriba del título); el que ayuda es el AYUDANTE (el antagonista se le opone).',
      },
      {
        id: 's2-noticia',
        kind: 'drag',
        prompt: 'Ordená las partes de la noticia, de arriba hacia abajo.',
        segments: ['1° ', ', 2° ', ', 3° ', ', 4° ', ' (con su epígrafe), 5° ', '.'],
        blanks: ['volanta', 'título', 'copete', 'imagen', 'cuerpo'],
        bank: ['cuerpo', 'imagen', 'título', 'copete', 'volanta'],
        explanation:
          'Arriba la volanta, después el título y el copete. La imagen (con su epígrafe) suele ir al lado o en el medio, y el cuerpo desarrolla la noticia.',
      },
      {
        id: 's2-tiempos',
        kind: 'classify',
        prompt: 'Otro cuadro de verbos: ¿en qué tiempo está cada uno?',
        categories: [
          'Pretérito perfecto simple',
          'Pretérito imperfecto',
          'Pretérito pluscuamperfecto',
          'Pretérito perfecto compuesto',
        ],
        items: [
          { text: 'Corrimos', category: 'Pretérito perfecto simple' },
          { text: 'Escribió', category: 'Pretérito perfecto simple' },
          { text: 'Cantaste', category: 'Pretérito perfecto simple' },
          { text: 'Jugábamos', category: 'Pretérito imperfecto' },
          { text: 'Vivía', category: 'Pretérito imperfecto' },
          { text: 'Habían llegado', category: 'Pretérito pluscuamperfecto' },
          { text: 'Habíamos salido', category: 'Pretérito pluscuamperfecto' },
          { text: 'Hemos ganado', category: 'Pretérito perfecto compuesto' },
          { text: 'Han roto', category: 'Pretérito perfecto compuesto' },
        ],
      },
      {
        id: 's2-personas',
        kind: 'classify',
        prompt: '¿En qué persona y número está cada verbo?',
        categories: ['1ra plural (nosotros)', '2da singular (tú/vos)', '3ra singular (él/ella)', '3ra plural (ellos/ellas)'],
        items: [
          { text: 'Corrimos', category: '1ra plural (nosotros)' },
          { text: 'Jugábamos', category: '1ra plural (nosotros)' },
          { text: 'Hemos ganado', category: '1ra plural (nosotros)' },
          { text: 'Cantaste', category: '2da singular (tú/vos)' },
          { text: 'Escribió', category: '3ra singular (él/ella)' },
          { text: 'Habían llegado', category: '3ra plural (ellos/ellas)' },
          { text: 'Han roto', category: '3ra plural (ellos/ellas)' },
        ],
      },
      {
        id: 's2-v1',
        prompt: '«Habíamos salido»: ¿tiempo, persona y número?',
        options: [
          { text: 'Pretérito pluscuamperfecto, 1ra persona plural.', correct: true },
          { text: 'Pretérito perfecto compuesto, 1ra persona plural.' },
          { text: 'Pretérito pluscuamperfecto, 3ra persona plural.' },
        ],
        explanation: 'Nosotros habíamos salido: «había» + -ido es pluscuamperfecto.',
      },
      {
        id: 's2-bonus',
        prompt: '¡BONUS! ¿Cuál de estas es una oración unimembre?',
        options: [
          { text: '¡Qué dragón tan grande!', correct: true },
          { text: 'El dragón es grande.' },
          { text: 'Los dragones vuelan.' },
        ],
        explanation: 'No se puede dividir en sujeto y predicado: es un solo bloque.',
      },
    ],
  },
]
