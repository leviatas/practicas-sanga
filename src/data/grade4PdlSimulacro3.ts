import type { Practice } from '../types'

// ============================================================================
// 4to GRADO — Prácticas del Lenguaje — Simulacro "Alto en el camino III"
// Es EXACTAMENTE el simulacro de la fotocopia, en el mismo orden (la práctica
// tiene `inOrder`, así que las preguntas no se barajan):
//  1)   Leer el fragmento de «El gato con botas».
//  2)   Responder: A) dónde y cuándo, B) características del ogro y del gato,
//       C) objetivo del gato.
//  3)   Analizar cuatro oraciones.
//  4.a) Verdadero o falso. 4.b) Reescribir las falsas.
//  5)   Indicar las partes de la noticia (el dibujo de la fotocopia, con los
//       recuadros numerados).
//  6)   Completar el cuadro de verbos: tiempo verbal, persona y número.
//  ¡BONUS! Oraciones unimembres.
// ============================================================================

const GATO_CON_BOTAS = `Hace muchos años, el gato con botas llegó a un grandioso castillo en el medio del campo, cuyo dueño era un temible ogro, el más rico de todo el reino.

El inteligente felino, sabiendo los increíbles poderes que la criatura mágica poseía, golpeó la puerta y pidió hablar con él bajo el pretexto de presentarle sus respetos. El ogro lo recibió con cortesía y lo invitó a tomar asiento.
—Me han asegurado —dijo el gato para romper el hielo— que tenéis la increíble habilidad de convertiros en cualquier clase de animal. Que podéis, si os place, transformaros en un feroz león o en un enorme elefante.
—¡Es totalmente cierto! —contestó el ogro con orgullo—. Y para demostrártelo, me verás convertido en león en este mismo instante.
De inmediato, el ogro se transformó en un enorme león salvaje. El gato se asustó tanto al ver semejante bestia rugiendo frente a él que, de un solo salto trepó hasta las canaletas del techo.
Una vez que el ogro recuperó su forma original, el felino bajó exhausto y admitió su gran asombro. Sin embargo, usando su brillante picardía, decidió desafiarlo una vez más:
—También me han asegurado, aunque me cuesta mucho creerlo, que tenéis el poder de tomar la forma de los animales más pequeños. Por ejemplo, la de un diminuto roedor. Debo confesar que eso me parece del todo imposible.
—¿Imposible? ¡Ya lo verás! —rugió el ogro, sumamente ofendido por la incredulidad del visitante.
En un abrir y cerrar de ojos, el gigante desapareció y en su lugar comenzó a corretear por el suelo un pequeño ratón. Esa era exactamente la oportunidad que el Gato con Botas estaba esperando: sin dudarlo un segundo, se abalanzó sobre él con un rápido zarpazo y se lo comió de un solo bocado.`

const CUENTO = { poemTitle: '1) El gato con botas (fragmento)', poem: GATO_CON_BOTAS }

const ANALISIS =
  'Arrastrá los cartelitos: MD (modificador directo) y N (núcleo) en el sujeto; NV (núcleo verbal) y P (resto del predicado) en el predicado.'

export const grade4PdlSimulacro3Practices: Practice[] = [
  {
    id: 'simulacro-gato-con-botas',
    title: 'Simulacro: El gato con botas',
    description:
      'El simulacro de la fotocopia, consigna por consigna y en el mismo orden: el cuento, las oraciones, verdadero o falso, la noticia y el cuadro de verbos.',
    emoji: '🐈',
    inOrder: true,
    questions: [
      // ---- 1) Leer y 2) Responder de manera completa ----
      {
        id: 's1-lugar',
        kind: 'reveal',
        ...CUENTO,
        prompt: '2) A) ¿Dónde y cuándo sucede la historia?',
        hint: 'Buscá las pistas en el primer párrafo: ¿cuándo? y ¿dónde llegó el gato?',
        options: [
          {
            text: 'Hace muchos años, en un grandioso castillo en el medio del campo.',
            correct: true,
            why: '¡Correcto! «Hace muchos años» dice cuándo y «un grandioso castillo en el medio del campo» dice dónde. En la hoja respondé de manera completa: «La historia sucede hace muchos años, en un grandioso castillo en el medio del campo».',
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
        kind: 'classify',
        ...CUENTO,
        prompt: '2) B) ¿Cuáles son las características del ogro? ¿Y las del gato?',
        categories: ['El ogro', 'El gato'],
        items: [
          { text: 'temible', category: 'El ogro' },
          { text: 'el más rico de todo el reino', category: 'El ogro' },
          { text: 'tiene poderes mágicos', category: 'El ogro' },
          { text: 'orgulloso', category: 'El ogro' },
          { text: 'se ofende fácilmente', category: 'El ogro' },
          { text: 'inteligente', category: 'El gato' },
          { text: 'pícaro / astuto', category: 'El gato' },
          { text: 'finge ser respetuoso para engañar', category: 'El gato' },
        ],
        explanation:
          'En la hoja, de manera completa: «El ogro era temible, el más rico de todo el reino, tenía poderes mágicos y era orgulloso. El gato era inteligente y muy pícaro».',
      },
      {
        id: 's1-objetivo',
        kind: 'reveal',
        ...CUENTO,
        prompt: '2) C) ¿Qué objetivo tenía el gato?',
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

      // ---- 3) Analizar las siguientes oraciones ----
      {
        id: 's1-an1',
        kind: 'analyze',
        prompt: `3) Analizá: «El gato llegó a un grandioso castillo.» ${ANALISIS}`,
        words: ['El', 'gato', 'llegó', 'a', 'un', 'grandioso', 'castillo.'],
        labels: ['MD', 'N', 'NV', 'P', 'P', 'P', 'P'],
        explanation:
          'Oración bimembre. Sujeto expreso simple: «El gato» (MD: El, N: gato). Predicado verbal simple: «llegó a un grandioso castillo» (NV: llegó). En la hoja: con regla y los colores de siempre.',
      },
      {
        id: 's1-an2',
        kind: 'analyze',
        prompt: `3) Analizá: «El ogro lo recibió con cortesía.» ${ANALISIS}`,
        words: ['El', 'ogro', 'lo', 'recibió', 'con', 'cortesía.'],
        labels: ['MD', 'N', 'P', 'NV', 'P', 'P'],
        explanation:
          'Sujeto expreso simple: «El ogro» (MD: El, N: ogro). Predicado: «lo recibió con cortesía» (NV: recibió). El «lo» va en el predicado aunque esté antes del verbo.',
      },
      {
        id: 's1-an3',
        kind: 'reveal',
        emoji: '👻',
        prompt: '3) Analizá: «Era el más rico de todo el reino.» ¿Cómo es su sujeto y cuál es el núcleo verbal?',
        options: [
          {
            text: 'Sujeto tácito (él: el ogro). Toda la oración es predicado y el NV es «Era».',
            correct: true,
            why: '¡Correcto! El sujeto no está escrito, pero el verbo «era» nos dice que es él. En la hoja: «S.T.: él», todo es predicado y marcás el NV «Era».',
          },
          {
            text: 'Sujeto expreso: «el más rico». NV: «Era».',
            why: 'Incorrecto. «el más rico de todo el reino» dice cómo era: es parte del predicado.',
          },
          {
            text: 'Es unimembre: no tiene sujeto.',
            why: 'Incorrecto. Sí tiene sujeto, solo que no está escrito (tácito). Es bimembre.',
          },
        ],
      },
      {
        id: 's1-an4',
        kind: 'reveal',
        emoji: '👻',
        prompt: '3) Analizá: «Se transformó en un enorme león salvaje.» ¿Cómo es su sujeto y cuál es el núcleo verbal?',
        options: [
          {
            text: 'Sujeto tácito (él: el ogro). Toda la oración es predicado y el NV es «se transformó».',
            correct: true,
            why: '¡Correcto! «transformó» está en 3ra persona del singular: él. «en un enorme león salvaje» dice en qué se transformó: es parte del predicado.',
          },
          {
            text: 'Sujeto expreso: «un enorme león salvaje». NV: «transformó».',
            why: 'Incorrecto. El león no es quien realiza la acción: es en lo que se transformó el ogro. Es parte del predicado.',
          },
          {
            text: 'Sujeto tácito (ellos). NV: «león».',
            why: 'Incorrecto. El verbo está en singular (él) y «león» es un sustantivo, no un verbo.',
          },
        ],
      },

      // ---- 4.a) Verdadero o falso ----
      {
        id: 's1-vf1',
        prompt: '4.a) Verdadero o falso: «Los cuentos maravillosos transcurren en lugares imprecisos y en un tiempo incierto.»',
        keepOrder: true,
        options: [{ text: 'Verdadero', correct: true }, { text: 'Falso' }],
        explanation: '«Hace muchos años», «en un lejano reino»: no se sabe exactamente cuándo ni dónde.',
      },
      {
        id: 's1-vf2',
        prompt:
          '4.a) Verdadero o falso: «Además de los protagonistas en un cuento, hay personajes secundarios, antagonistas y ayudantes.»',
        keepOrder: true,
        options: [{ text: 'Verdadero', correct: true }, { text: 'Falso' }],
      },
      {
        id: 's1-vf3',
        prompt:
          '4.a) Verdadero o falso: «Las publicidades son anuncios impresos o audiovisuales que no buscan persuadir a los compradores.»',
        keepOrder: true,
        options: [{ text: 'Verdadero' }, { text: 'Falso', correct: true }],
        explanation: 'Es falsa: el objetivo de la publicidad es justamente persuadir (convencer) a los compradores.',
      },
      {
        id: 's1-vf4',
        prompt:
          '4.a) Verdadero o falso: «Los paratextos son elementos verbales y no verbales que agregan información al texto, sin anticipar de qué se trata.»',
        keepOrder: true,
        options: [{ text: 'Verdadero' }, { text: 'Falso', correct: true }],
        explanation: 'Es falsa: los paratextos (título, imágenes, epígrafe…) sí permiten anticipar de qué se trata el texto.',
      },
      {
        id: 's1-vf5',
        prompt: '4.a) Verdadero o falso: «Los verbos son palabras que indican qué acción se está realizando.»',
        keepOrder: true,
        options: [{ text: 'Verdadero', correct: true }, { text: 'Falso' }],
      },

      // ---- 4.b) Volver a escribir las falsas correctamente ----
      {
        id: 's1-vfb1',
        prompt: '4.b) Volvé a escribir correctamente la falsa sobre las publicidades.',
        options: [
          {
            text: 'Las publicidades son anuncios impresos o audiovisuales que buscan persuadir a los compradores.',
            correct: true,
          },
          { text: 'Las publicidades son textos que cuentan hechos reales y recientes.' },
          { text: 'Las publicidades son anuncios que no buscan vender nada.' },
        ],
        explanation: 'Para corregir una falsa se cambia solo la parte que está mal: «no buscan» → «buscan».',
      },
      {
        id: 's1-vfb2',
        prompt: '4.b) Volvé a escribir correctamente la falsa sobre los paratextos.',
        options: [
          {
            text: 'Los paratextos son elementos verbales y no verbales que agregan información al texto y permiten anticipar de qué se trata.',
            correct: true,
          },
          { text: 'Los paratextos son elementos que no agregan ninguna información al texto.' },
          { text: 'Los paratextos son solamente las imágenes de un texto.' },
        ],
        explanation: 'Se cambia «sin anticipar» por «y permiten anticipar».',
      },

      // ---- 5) Indicar las partes de la noticia ----
      {
        id: 's1-noticia',
        kind: 'drag',
        image: 'pdl-noticia-merendero',
        prompt: '5) Indicá las partes de la noticia: ¿qué va en cada recuadro?',
        segments: ['1: ', ' — 2: ', ' — 3: ', ' — 4: ', ' — 5: ', ' — 6: ', ''],
        blanks: ['volanta', 'título', 'copete', 'imagen', 'epígrafe', 'cuerpo'],
        bank: ['cuerpo', 'título', 'epígrafe', 'volanta', 'imagen', 'copete'],
        explanation:
          '1 volanta (arriba del título), 2 título, 3 copete (resume lo más importante), 4 imagen, 5 epígrafe (explica la imagen) y 6 cuerpo (desarrolla la información).',
      },

      // ---- 6) Completar el cuadro de verbos ----
      {
        id: 's1-tiempos',
        kind: 'classify',
        prompt: '6) Completá el cuadro: ¿en qué tiempo verbal está cada verbo?',
        hint: '«Ha viajado» y «He pintado» usan haber en presente (he, ha): son pretérito perfecto compuesto. «Había comprado» usa «había»: pluscuamperfecto.',
        keepOrder: true,
        categories: [
          'Pretérito perfecto simple',
          'Pretérito imperfecto',
          'Pretérito pluscuamperfecto',
          'Pretérito perfecto compuesto',
        ],
        items: [
          { text: 'Amaban', category: 'Pretérito imperfecto' },
          { text: 'Decidió', category: 'Pretérito perfecto simple' },
          { text: 'Salí', category: 'Pretérito perfecto simple' },
          { text: 'Había comprado', category: 'Pretérito pluscuamperfecto' },
          { text: 'Saltó', category: 'Pretérito perfecto simple' },
          { text: 'Ha viajado', category: 'Pretérito perfecto compuesto' },
          { text: 'Comieron', category: 'Pretérito perfecto simple' },
          { text: 'He pintado', category: 'Pretérito perfecto compuesto' },
          { text: 'Lavaban', category: 'Pretérito imperfecto' },
          { text: 'Vendió', category: 'Pretérito perfecto simple' },
        ],
        explanation:
          'Perfecto simple: una palabra, acción terminada (decidió, salí). Imperfecto: -aba / -ía (amaban, lavaban). Pluscuamperfecto: había + -ado/-ido. Perfecto compuesto: he/ha + -ado/-ido.',
      },
      {
        id: 's1-personas',
        kind: 'classify',
        prompt: '6) Completá el cuadro: ¿en qué persona y número está cada verbo?',
        hint: 'Probá ponerle adelante «yo», «él» o «ellos» y fijate cuál suena bien.',
        keepOrder: true,
        categories: ['1ra singular (yo)', '3ra singular (él/ella)', '3ra plural (ellos/ellas)'],
        items: [
          { text: 'Amaban', category: '3ra plural (ellos/ellas)' },
          { text: 'Decidió', category: '3ra singular (él/ella)' },
          { text: 'Salí', category: '1ra singular (yo)' },
          { text: 'Saltó', category: '3ra singular (él/ella)' },
          { text: 'Ha viajado', category: '3ra singular (él/ella)' },
          { text: 'Comieron', category: '3ra plural (ellos/ellas)' },
          { text: 'He pintado', category: '1ra singular (yo)' },
          { text: 'Lavaban', category: '3ra plural (ellos/ellas)' },
          { text: 'Vendió', category: '3ra singular (él/ella)' },
        ],
        explanation: '«Había comprado» no está acá porque puede ser de dos personas: es la pregunta que sigue.',
      },
      {
        id: 's1-habia',
        kind: 'reveal',
        emoji: '🤔',
        prompt: '6) ¿En qué persona y número está «Había comprado»?',
        options: [
          {
            text: '1ra o 3ra persona del singular (yo había comprado / él había comprado).',
            correct: true,
            why: '¡Correcto! «Había» es igual para yo y para él. En el cuadro podés poner «1ra o 3ra persona del singular».',
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

      // ---- ¡BONUS! Oraciones unimembres ----
      {
        id: 's1-bonus',
        kind: 'classify',
        prompt: '¡BONUS! Escribí 2 oraciones unimembres. Para practicar: ¿cuáles de estas son unimembres?',
        categories: ['Unimembre', 'Bimembre'],
        items: [
          { text: '¡Qué castillo enorme!', category: 'Unimembre' },
          { text: '¡Imposible!', category: 'Unimembre' },
          { text: 'Buenos días, señor ogro.', category: 'Unimembre' },
          { text: 'Llueve.', category: 'Unimembre' },
          { text: 'El gato trepó al techo.', category: 'Bimembre' },
          { text: 'El ogro rugió.', category: 'Bimembre' },
        ],
        explanation:
          'Las unimembres no se pueden dividir en sujeto y predicado. Ejemplos para la hoja: «¡Qué susto!», «Muchas gracias.», «Nieva.».',
      },
    ],
  },
]
