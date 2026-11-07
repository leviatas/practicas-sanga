import type { Practice } from '../types'

// ============================================================================
// 4to GRADO — Prácticas del Lenguaje — "Alto en el camino III" (25/11)
// Temario del 3er trimestre:
//  1) El cuento maravilloso y sus características (libro págs. 74 a 76).
//  2) Los tiempos verbales del pasado: pretérito perfecto simple, imperfecto
//     y pluscuamperfecto (págs. 78 a 81).
//  3) La noticia, sus partes, el portal de noticias y la publicidad
//     ("Información a diario", págs. 86 a 93).
//  4) La oración bimembre y unimembre, concordancia y tipos de sujeto;
//     marcar núcleo verbal, sujeto y predicado (págs. 94 a 97).
// ============================================================================

export const grade4PdlAlto3Practices: Practice[] = [
  // ======================== 1. EL CUENTO MARAVILLOSO =======================
  {
    id: 'cuento-maravilloso',
    title: 'El cuento maravilloso',
    description:
      'Personajes, objetos mágicos, tiempo y lugar indefinidos, fórmulas de inicio y cierre y la estructura del cuento.',
    emoji: '🧚',
    questions: [
      {
        id: 'cm1',
        kind: 'reveal',
        emoji: '🏰',
        prompt: '¿Qué es un cuento maravilloso?',
        options: [
          {
            text: 'Un relato donde pasan hechos mágicos o sobrenaturales que los personajes aceptan como algo normal.',
            correct: true,
            why: '¡Correcto! En el cuento maravilloso la magia es parte del mundo del relato: a nadie le sorprende que un animal hable o que aparezca un hada.',
          },
          {
            text: 'Un texto que informa sobre un hecho real que pasó hace poco.',
            why: 'Incorrecto. Eso es una noticia, no un cuento.',
          },
          {
            text: 'Un relato que cuenta la vida real de una persona famosa.',
            why: 'Incorrecto. Eso es una biografía. El cuento maravilloso es ficción y tiene elementos mágicos.',
          },
          {
            text: 'Un texto que intenta convencernos de comprar un producto.',
            why: 'Incorrecto. Eso es una publicidad.',
          },
        ],
      },
      {
        id: 'cm2',
        emoji: '⏳',
        prompt: '¿Cómo son el tiempo y el lugar en un cuento maravilloso?',
        options: [
          { text: 'Indefinidos: «hace mucho tiempo», «en un lejano reino».', correct: true },
          { text: 'Exactos: «el 3 de mayo de 2025 en La Plata».' },
          { text: 'Siempre en el futuro, en otro planeta.' },
        ],
        explanation:
          'En los cuentos maravillosos no se sabe exactamente cuándo ni dónde pasan los hechos: «había una vez», «en un país muy lejano».',
      },
      {
        id: 'cm3',
        emoji: '📖',
        prompt: '¿Cuál de estas es una fórmula de INICIO típica del cuento maravilloso?',
        options: [
          { text: 'Había una vez…', correct: true },
          { text: '…y vivieron felices para siempre.' },
          { text: 'La Plata, 25 de noviembre.' },
          { text: '¡Compralo ya!' },
        ],
      },
      {
        id: 'cm4',
        emoji: '🔚',
        prompt: '¿Cuál de estas es una fórmula de CIERRE típica?',
        options: [
          { text: '…y colorín colorado, este cuento se ha acabado.', correct: true },
          { text: 'Érase una vez…' },
          { text: 'Hace mucho, mucho tiempo…' },
        ],
      },
      {
        id: 'cm-clas1',
        kind: 'classify',
        prompt: 'Clasificá cada fórmula: ¿es de inicio o de cierre?',
        categories: ['Inicio', 'Cierre'],
        items: [
          { text: 'Había una vez…', category: 'Inicio' },
          { text: 'Érase una vez…', category: 'Inicio' },
          { text: 'En un reino muy lejano…', category: 'Inicio' },
          { text: '…y vivieron felices para siempre.', category: 'Cierre' },
          { text: '…y colorín colorado, este cuento se ha acabado.', category: 'Cierre' },
          { text: '…y fueron felices y comieron perdices.', category: 'Cierre' },
        ],
      },
      {
        id: 'cm-clas2',
        kind: 'classify',
        prompt: 'Clasificá los personajes: ¿ayudan al héroe o se le oponen?',
        categories: ['Ayudantes', 'Oponentes'],
        items: [
          { text: 'el hada madrina', category: 'Ayudantes' },
          { text: 'el animal que habla y aconseja', category: 'Ayudantes' },
          { text: 'el mago bueno', category: 'Ayudantes' },
          { text: 'la bruja malvada', category: 'Oponentes' },
          { text: 'el ogro', category: 'Oponentes' },
          { text: 'la madrastra envidiosa', category: 'Oponentes' },
        ],
      },
      {
        id: 'cm5',
        emoji: '🪄',
        prompt: '¿Cuál de estos es un OBJETO MÁGICO?',
        options: [
          { text: 'Una varita que convierte una calabaza en carroza.', correct: true },
          { text: 'Una mochila de la escuela.' },
          { text: 'Un diario con las noticias del día.' },
        ],
        explanation:
          'Los objetos mágicos tienen poderes especiales y suelen ayudar al héroe a cumplir su misión: varitas, espejos que hablan, botas de siete leguas…',
      },
      {
        id: 'cm6',
        emoji: '🦸',
        prompt: '¿Cómo se llama el personaje principal, que tiene que cumplir una misión o superar pruebas?',
        options: [
          { text: 'El héroe o protagonista.', correct: true },
          { text: 'El oponente.' },
          { text: 'El narrador.' },
        ],
      },
      {
        id: 'cm7',
        kind: 'reveal',
        emoji: '🧩',
        prompt: '¿Cuál es el orden de la estructura de un cuento?',
        options: [
          {
            text: 'Situación inicial → conflicto → resolución.',
            correct: true,
            why: '¡Correcto! Primero se presenta a los personajes y el lugar, después aparece un problema (conflicto) y al final se soluciona (resolución).',
          },
          {
            text: 'Conflicto → situación inicial → resolución.',
            why: 'Incorrecto. El problema no puede aparecer antes de presentar a los personajes.',
          },
          {
            text: 'Título → copete → cuerpo.',
            why: 'Incorrecto. Esas son partes de la noticia, no del cuento.',
          },
        ],
      },
      {
        id: 'cm-drag1',
        kind: 'drag',
        prompt: 'Completá con las partes del cuento.',
        segments: [
          'En la ',
          ' se presentan los personajes y el lugar. En el ',
          ' aparece un problema. En la ',
          ' el problema se soluciona.',
        ],
        blanks: ['situación inicial', 'conflicto', 'resolución'],
        bank: ['resolución', 'situación inicial', 'conflicto', 'volanta'],
      },
      {
        id: 'cm8',
        emoji: '🐸',
        prompt:
          '«Una princesa besó a un sapo y el sapo se convirtió en príncipe. Nadie en el reino se asombró.» ¿Qué característica del cuento maravilloso aparece?',
        options: [
          { text: 'Los hechos mágicos se aceptan como normales.', correct: true },
          { text: 'El tiempo y el lugar son exactos.' },
          { text: 'Está contado como una noticia.' },
        ],
      },
      {
        id: 'cm9',
        emoji: '3️⃣',
        prompt: 'En los cuentos maravillosos suelen repetirse algunos números. ¿Cuál es el más común?',
        options: [
          { text: 'El 3: tres hermanos, tres pruebas, tres deseos.', correct: true },
          { text: 'El 100.' },
          { text: 'El 2.025.' },
        ],
      },
    ],
  },

  // ======================== 2. TIEMPOS VERBALES ============================
  {
    id: 'tiempos-verbales-pasado',
    title: 'Verbos: los tiempos del pasado',
    description:
      'Pretérito perfecto simple, pretérito imperfecto y pretérito pluscuamperfecto.',
    emoji: '⏪',
    questions: [
      {
        id: 'tv1',
        kind: 'reveal',
        emoji: '✅',
        prompt: '¿Para qué se usa el pretérito perfecto simple (ej: «caminó»)?',
        options: [
          {
            text: 'Para acciones del pasado que empezaron y terminaron.',
            correct: true,
            why: '¡Correcto! «El príncipe llegó al castillo»: es una acción terminada. Hace avanzar la historia.',
          },
          {
            text: 'Para describir costumbres o cómo eran las cosas en el pasado.',
            why: 'Incorrecto. Eso lo hace el pretérito imperfecto: «caminaba», «era».',
          },
          {
            text: 'Para una acción anterior a otra acción pasada.',
            why: 'Incorrecto. Eso es el pluscuamperfecto: «había caminado».',
          },
        ],
      },
      {
        id: 'tv2',
        kind: 'reveal',
        emoji: '🔄',
        prompt: '¿Para qué se usa el pretérito imperfecto (ej: «caminaba»)?',
        options: [
          {
            text: 'Para describir o contar acciones habituales en el pasado.',
            correct: true,
            why: '¡Correcto! «La princesa vivía en una torre y todas las tardes cantaba»: describe y cuenta costumbres.',
          },
          {
            text: 'Para acciones que van a pasar mañana.',
            why: 'Incorrecto. Eso es el futuro: «caminará».',
          },
          {
            text: 'Para una acción anterior a otra acción pasada.',
            why: 'Incorrecto. Eso es el pluscuamperfecto: «había caminado».',
          },
        ],
      },
      {
        id: 'tv3',
        kind: 'reveal',
        emoji: '⏮️',
        prompt: '¿Para qué se usa el pretérito pluscuamperfecto (ej: «había caminado»)?',
        options: [
          {
            text: 'Para una acción pasada que ocurrió ANTES que otra acción pasada.',
            correct: true,
            why: '¡Correcto! «Cuando llegó el príncipe, el dragón ya se había ido»: primero se fue el dragón y después llegó el príncipe.',
          },
          {
            text: 'Para acciones que pasan ahora mismo.',
            why: 'Incorrecto. Eso es el presente: «camina».',
          },
          {
            text: 'Para dar órdenes.',
            why: 'Incorrecto. Las órdenes se dan con el modo imperativo: «¡caminá!».',
          },
        ],
      },
      {
        id: 'tv4',
        emoji: '🧱',
        prompt: '¿Cómo se forma el pretérito pluscuamperfecto?',
        options: [
          { text: 'Con «había» + el participio del verbo (terminado en -ado / -ido).', correct: true },
          { text: 'Agregando -ba al final del verbo.' },
          { text: 'Con «voy a» + el verbo.' },
        ],
        explanation:
          'Es un tiempo compuesto: había cantado, habías comido, habíamos salido, habían vivido.',
      },
      {
        id: 'tv-clas1',
        kind: 'classify',
        prompt: 'Clasificá cada verbo según su tiempo.',
        categories: ['Perfecto simple', 'Imperfecto', 'Pluscuamperfecto'],
        items: [
          { text: 'saltó', category: 'Perfecto simple' },
          { text: 'comimos', category: 'Perfecto simple' },
          { text: 'escribieron', category: 'Perfecto simple' },
          { text: 'saltaba', category: 'Imperfecto' },
          { text: 'comíamos', category: 'Imperfecto' },
          { text: 'escribían', category: 'Imperfecto' },
          { text: 'había saltado', category: 'Pluscuamperfecto' },
          { text: 'habíamos comido', category: 'Pluscuamperfecto' },
          { text: 'habían escrito', category: 'Pluscuamperfecto' },
        ],
      },
      {
        id: 'tv-clas2',
        kind: 'classify',
        prompt: 'Otra tanda: clasificá cada verbo según su tiempo.',
        categories: ['Perfecto simple', 'Imperfecto', 'Pluscuamperfecto'],
        items: [
          { text: 'vivió', category: 'Perfecto simple' },
          { text: 'jugué', category: 'Perfecto simple' },
          { text: 'vivía', category: 'Imperfecto' },
          { text: 'jugaban', category: 'Imperfecto' },
          { text: 'era', category: 'Imperfecto' },
          { text: 'había vivido', category: 'Pluscuamperfecto' },
          { text: 'habías jugado', category: 'Pluscuamperfecto' },
          { text: 'había sido', category: 'Pluscuamperfecto' },
        ],
      },
      {
        id: 'tv5',
        prompt: '«El hada ______ su varita y la calabaza se transformó.» (pretérito perfecto simple de agitar)',
        options: [{ text: 'agitó', correct: true }, { text: 'agitaba' }, { text: 'había agitado' }],
      },
      {
        id: 'tv6',
        prompt: '«Todas las noches, el rey ______ cuentos a sus hijos.» (pretérito imperfecto de leer)',
        options: [{ text: 'leía', correct: true }, { text: 'leyó' }, { text: 'había leído' }],
      },
      {
        id: 'tv7',
        prompt: '«Cuando el caballero llegó, la bruja ya ______.» (pretérito pluscuamperfecto de escapar)',
        options: [{ text: 'había escapado', correct: true }, { text: 'escapaba' }, { text: 'escapó' }],
      },
      {
        id: 'tv8',
        prompt: '¿En qué tiempo está el verbo de «Los duendes trabajaban en el bosque»?',
        options: [
          { text: 'Pretérito imperfecto', correct: true },
          { text: 'Pretérito perfecto simple' },
          { text: 'Pretérito pluscuamperfecto' },
        ],
      },
      {
        id: 'tv9',
        prompt: '¿En qué tiempo está el verbo de «La reina había perdido su corona»?',
        options: [
          { text: 'Pretérito pluscuamperfecto', correct: true },
          { text: 'Pretérito imperfecto' },
          { text: 'Pretérito perfecto simple' },
        ],
      },
      {
        id: 'tv10',
        prompt: '¿En qué tiempo está el verbo de «El gigante despertó de golpe»?',
        options: [
          { text: 'Pretérito perfecto simple', correct: true },
          { text: 'Pretérito imperfecto' },
          { text: 'Pretérito pluscuamperfecto' },
        ],
      },
      {
        id: 'tv-drag1',
        kind: 'drag',
        prompt: 'Completá el cuento con los verbos que faltan.',
        segments: [
          'Había una vez un dragón que ',
          ' en una cueva. Una mañana, un niño ',
          ' a la cueva, pero el dragón ya se ',
          '.',
        ],
        blanks: ['vivía', 'entró', 'había ido'],
        bank: ['había ido', 'vivía', 'entró', 'vivirá'],
        explanation:
          '«vivía» (imperfecto) describe; «entró» (perfecto simple) es una acción terminada; «había ido» (pluscuamperfecto) pasó antes de que entrara el niño.',
      },
      {
        id: 'tv-words1',
        kind: 'words',
        prompt: 'Tocá el verbo en pretérito pluscuamperfecto.',
        words: ['Cuando', 'sonó', 'la', 'campana,', 'Cenicienta', 'ya', 'había', 'salido.'],
        pick: [6, 7],
        explanation: '«había salido» es el pluscuamperfecto: pasó antes de que sonara la campana.',
      },
      {
        id: 'tv11',
        prompt: '¿Cuál es el infinitivo de «escribían»?',
        options: [{ text: 'escribir', correct: true }, { text: 'escribiendo' }, { text: 'escrito' }],
        explanation: 'El infinitivo es el nombre del verbo y termina en -ar, -er o -ir.',
      },
    ],
  },

  // ======================== 3. INFORMACIÓN A DIARIO ========================
  {
    id: 'noticia-portal-publicidad',
    title: 'La noticia, el portal de noticias y la publicidad',
    description:
      'Partes y características de la noticia, las preguntas básicas, el portal de noticias y los recursos de la publicidad.',
    emoji: '📰',
    questions: [
      {
        id: 'no1',
        kind: 'reveal',
        emoji: '📰',
        prompt: '¿Qué es una noticia?',
        options: [
          {
            text: 'Un texto que informa sobre un hecho real, actual y de interés para la gente.',
            correct: true,
            why: '¡Correcto! La noticia cuenta hechos verdaderos que pasaron hace poco y que le importan a mucha gente.',
          },
          {
            text: 'Un relato inventado con hadas y objetos mágicos.',
            why: 'Incorrecto. Eso es un cuento maravilloso.',
          },
          {
            text: 'Un texto que busca que compremos un producto.',
            why: 'Incorrecto. Eso es una publicidad.',
          },
        ],
      },
      {
        id: 'no-drag1',
        kind: 'drag',
        prompt: 'Completá con las partes de la noticia.',
        segments: [
          'La ',
          ' va arriba del título y ubica el tema. El ',
          ' anuncia el hecho en pocas palabras. El ',
          ' resume lo más importante. El ',
          ' desarrolla toda la información.',
        ],
        blanks: ['volanta', 'título', 'copete', 'cuerpo'],
        bank: ['cuerpo', 'volanta', 'copete', 'título', 'conflicto'],
      },
      {
        id: 'no2',
        prompt: '¿Qué parte de la noticia está escrita con letras grandes y anuncia el hecho?',
        options: [{ text: 'El título', correct: true }, { text: 'El cuerpo' }, { text: 'El epígrafe' }],
      },
      {
        id: 'no3',
        prompt: '¿Qué es el epígrafe?',
        options: [
          { text: 'El texto breve que explica la foto.', correct: true },
          { text: 'El último párrafo de la noticia.' },
          { text: 'El nombre del diario.' },
        ],
      },
      {
        id: 'no4',
        prompt: '¿Qué es el copete?',
        options: [
          { text: 'Un resumen breve, debajo del título, con lo más importante.', correct: true },
          { text: 'La frase que va arriba del título.' },
          { text: 'La foto de la noticia.' },
        ],
      },
      {
        id: 'no5',
        kind: 'reveal',
        emoji: '❓',
        prompt: '¿Qué preguntas básicas responde una noticia?',
        options: [
          {
            text: '¿Qué? ¿Quién? ¿Cuándo? ¿Dónde? ¿Cómo? ¿Por qué?',
            correct: true,
            why: '¡Correcto! Una buena noticia responde qué pasó, a quién, cuándo, dónde, cómo y por qué.',
          },
          {
            text: '¿Cuánto cuesta? ¿Dónde se compra?',
            why: 'Incorrecto. Eso lo responde una publicidad.',
          },
          {
            text: '¿Había una vez? ¿Colorín colorado?',
            why: 'Incorrecto. Esas son fórmulas del cuento maravilloso.',
          },
        ],
      },
      {
        id: 'no-clas1',
        kind: 'classify',
        prompt:
          '«Ayer, en La Plata, los bomberos rescataron a un gato atrapado en un árbol con una escalera gigante.» ¿A qué pregunta responde cada parte?',
        categories: ['¿Quién?', '¿Qué?', '¿Cuándo?', '¿Dónde?', '¿Cómo?'],
        items: [
          { text: 'los bomberos', category: '¿Quién?' },
          { text: 'rescataron a un gato', category: '¿Qué?' },
          { text: 'ayer', category: '¿Cuándo?' },
          { text: 'en La Plata', category: '¿Dónde?' },
          { text: 'con una escalera gigante', category: '¿Cómo?' },
        ],
      },
      {
        id: 'no6',
        prompt: '¿En qué persona se escriben las noticias?',
        options: [
          { text: 'En tercera persona, de forma objetiva.', correct: true },
          { text: 'En primera persona, contando lo que siente el periodista.' },
          { text: 'Con rimas, como un poema.' },
        ],
        explanation:
          'El periodista cuenta los hechos desde afuera («los bomberos rescataron…») y sin dar su opinión.',
      },
      {
        id: 'no7',
        kind: 'reveal',
        emoji: '💻',
        prompt: '¿Qué es un portal de noticias?',
        options: [
          {
            text: 'Un sitio de internet donde se publican noticias que se actualizan todo el tiempo.',
            correct: true,
            why: '¡Correcto! En un portal las noticias se renuevan minuto a minuto y además hay videos, enlaces y comentarios de los lectores.',
          },
          {
            text: 'Un diario de papel que sale una vez por semana.',
            why: 'Incorrecto. El portal es digital y se actualiza constantemente.',
          },
          {
            text: 'Un libro de cuentos maravillosos.',
            why: 'Incorrecto. El portal informa hechos reales.',
          },
        ],
      },
      {
        id: 'no-clas2',
        kind: 'classify',
        prompt: '¿Qué tiene un portal de noticias y qué no?',
        categories: ['Lo tiene', 'No lo tiene'],
        items: [
          { text: 'enlaces a otras noticias', category: 'Lo tiene' },
          { text: 'videos y fotos', category: 'Lo tiene' },
          { text: 'secciones (deportes, policiales…)', category: 'Lo tiene' },
          { text: 'actualización a cada rato', category: 'Lo tiene' },
          { text: 'comentarios de los lectores', category: 'Lo tiene' },
          { text: 'hojas de papel', category: 'No lo tiene' },
          { text: 'una sola edición por día', category: 'No lo tiene' },
        ],
      },
      {
        id: 'pu1',
        kind: 'reveal',
        emoji: '📢',
        prompt: '¿Cuál es el objetivo de una publicidad?',
        options: [
          {
            text: 'Convencer al público para que compre un producto o use un servicio.',
            correct: true,
            why: '¡Correcto! La publicidad quiere persuadir: que la gente quiera lo que se ofrece.',
          },
          {
            text: 'Informar un hecho real de manera objetiva.',
            why: 'Incorrecto. Eso hace la noticia.',
          },
          {
            text: 'Entretener con una historia de hadas.',
            why: 'Incorrecto. Eso es un cuento maravilloso.',
          },
        ],
      },
      {
        id: 'pu2',
        prompt: '¿Cómo se llama la frase corta y fácil de recordar de una publicidad?',
        options: [{ text: 'El eslogan', correct: true }, { text: 'La volanta' }, { text: 'El copete' }],
        explanation: 'Ej: «¡Galletitas Crocantes: el crunch más feliz!»',
      },
      {
        id: 'pu3',
        prompt: '¿Cómo se llama el dibujo o símbolo que identifica a una marca?',
        options: [{ text: 'El logo', correct: true }, { text: 'El epígrafe' }, { text: 'El título' }],
      },
      {
        id: 'pu-clas1',
        kind: 'classify',
        prompt: 'Clasificá cada elemento: ¿es de la noticia o de la publicidad?',
        categories: ['Noticia', 'Publicidad'],
        items: [
          { text: 'volanta', category: 'Noticia' },
          { text: 'copete', category: 'Noticia' },
          { text: 'informa hechos reales', category: 'Noticia' },
          { text: 'lenguaje objetivo', category: 'Noticia' },
          { text: 'eslogan', category: 'Publicidad' },
          { text: 'logo', category: 'Publicidad' },
          { text: 'busca convencer', category: 'Publicidad' },
          { text: 'adjetivos exagerados', category: 'Publicidad' },
        ],
      },
      {
        id: 'pu4',
        prompt:
          '«¡Zapatillas Rayo: las más rápidas, las más cómodas, las mejores del mundo!» ¿Qué recurso usa esta publicidad?',
        options: [
          { text: 'Adjetivos que exageran las cualidades del producto.', correct: true },
          { text: 'Una fórmula de inicio de cuento.' },
          { text: 'Responde las preguntas básicas de la noticia.' },
        ],
      },
      {
        id: 'pu5',
        prompt: 'En las publicidades, ¿para qué se usan verbos como «¡Comprá!», «¡Probalo!», «¡Vení!»?',
        options: [
          { text: 'Para hablarle directamente al público e invitarlo a actuar.', correct: true },
          { text: 'Para contar lo que pasó en el pasado.' },
          { text: 'Para describir a los personajes de un cuento.' },
        ],
      },
    ],
  },

  // ======================== 4. LA ORACIÓN ==================================
  {
    id: 'oracion-bimembre-unimembre',
    title: 'La oración: bimembre y unimembre, sujeto y predicado',
    description:
      'Oraciones bimembres y unimembres, concordancia, sujeto expreso y tácito, y marcar sujeto, predicado y núcleo verbal.',
    emoji: '✏️',
    questions: [
      {
        id: 'or1',
        kind: 'reveal',
        emoji: '✌️',
        prompt: '¿Qué es una oración bimembre?',
        options: [
          {
            text: 'Una oración que se puede dividir en sujeto y predicado.',
            correct: true,
            why: '¡Correcto! «Bi» significa dos: tiene dos miembros, el sujeto y el predicado. Ej: «El lobo / sopló la casa».',
          },
          {
            text: 'Una oración que no se puede dividir en sujeto y predicado.',
            why: 'Incorrecto. Esa es la oración unimembre. Ej: «¡Qué lindo día!».',
          },
          {
            text: 'Una oración que tiene dos verbos.',
            why: 'Incorrecto. No se trata de la cantidad de verbos sino de si tiene sujeto y predicado.',
          },
        ],
      },
      {
        id: 'or2',
        kind: 'reveal',
        emoji: '☝️',
        prompt: '¿Qué es una oración unimembre?',
        options: [
          {
            text: 'Una oración que NO se puede dividir en sujeto y predicado.',
            correct: true,
            why: '¡Correcto! Es un solo bloque, como «¡Silencio!», «Llueve.» o «Buenas noches.».',
          },
          {
            text: 'Una oración que tiene un solo sujeto.',
            why: 'Incorrecto. Las bimembres también tienen un sujeto. La unimembre no se divide en sujeto y predicado.',
          },
          {
            text: 'Una oración de una sola palabra siempre.',
            why: 'Incorrecto. Puede tener varias palabras: «Muchas gracias por todo.».',
          },
        ],
      },
      {
        id: 'or-clas1',
        kind: 'classify',
        prompt: 'Clasificá las oraciones.',
        categories: ['Bimembre', 'Unimembre'],
        items: [
          { text: 'El hada voló sobre el bosque.', category: 'Bimembre' },
          { text: 'Los chicos leen el diario.', category: 'Bimembre' },
          { text: 'Mi abuela cocina ravioles.', category: 'Bimembre' },
          { text: '¡Qué hermoso castillo!', category: 'Unimembre' },
          { text: 'Llueve.', category: 'Unimembre' },
          { text: '¡Silencio!', category: 'Unimembre' },
          { text: 'Buenas noches.', category: 'Unimembre' },
        ],
      },
      {
        id: 'or3',
        prompt: '¿Qué es el núcleo del predicado?',
        options: [
          { text: 'El verbo conjugado (núcleo verbal).', correct: true },
          { text: 'El sustantivo más importante del sujeto.' },
          { text: 'La primera palabra de la oración.' },
        ],
      },
      {
        id: 'or-s1',
        kind: 'words',
        prompt: 'Tocá el SUJETO.',
        words: ['La', 'princesa', 'valiente', 'encontró', 'el', 'tesoro.'],
        pick: [0, 1, 2],
        explanation:
          'El sujeto es «La princesa valiente»: es de quien se habla. Para encontrarlo preguntamos al verbo: ¿quién encontró el tesoro?',
      },
      {
        id: 'or-p1',
        kind: 'words',
        prompt: 'Tocá el PREDICADO.',
        words: ['La', 'princesa', 'valiente', 'encontró', 'el', 'tesoro.'],
        pick: [3, 4, 5],
        explanation: 'El predicado es «encontró el tesoro»: lo que se dice del sujeto.',
      },
      {
        id: 'or-nv1',
        kind: 'words',
        prompt: 'Tocá el NÚCLEO VERBAL.',
        words: ['Los', 'periodistas', 'escribieron', 'una', 'noticia', 'importante.'],
        pick: [2],
        explanation: 'El núcleo verbal es el verbo conjugado: «escribieron».',
      },
      {
        id: 'or-s2',
        kind: 'words',
        prompt: 'Tocá el SUJETO.',
        words: ['Ayer', 'el', 'mago', 'del', 'reino', 'desapareció.'],
        pick: [1, 2, 3, 4],
        explanation:
          '¿Quién desapareció? «el mago del reino». «Ayer» no es parte del sujeto: dice cuándo pasó, así que es parte del predicado.',
      },
      {
        id: 'or-nv2',
        kind: 'words',
        prompt: 'Tocá el NÚCLEO VERBAL.',
        words: ['Mis', 'primos', 'juegan', 'al', 'fútbol', 'en', 'la', 'plaza.'],
        pick: [2],
        explanation: 'El núcleo verbal es «juegan».',
      },
      {
        id: 'or-an1',
        kind: 'analyze',
        prompt: 'Arrastrá S (sujeto), NV (núcleo verbal) o P (resto del predicado) debajo de cada palabra.',
        words: ['El', 'dragón', 'cuidaba', 'la', 'torre.'],
        labels: ['S', 'S', 'NV', 'P', 'P'],
        explanation: 'Sujeto: «El dragón». Predicado: «cuidaba la torre», con núcleo verbal «cuidaba».',
      },
      {
        id: 'or-an2',
        kind: 'analyze',
        prompt: 'Arrastrá S (sujeto), NV (núcleo verbal) o P (resto del predicado) debajo de cada palabra.',
        words: ['Las', 'hadas', 'bailaron', 'toda', 'la', 'noche.'],
        labels: ['S', 'S', 'NV', 'P', 'P', 'P'],
        explanation: 'Sujeto: «Las hadas». Predicado: «bailaron toda la noche», con núcleo verbal «bailaron».',
      },
      {
        id: 'or-an3',
        kind: 'analyze',
        prompt: 'Arrastrá S (sujeto), NV (núcleo verbal) o P (resto del predicado) debajo de cada palabra.',
        words: ['Por', 'la', 'mañana', 'llegó', 'el', 'cartero.'],
        labels: ['P', 'P', 'P', 'NV', 'S', 'S'],
        explanation:
          '¡El sujeto puede ir al final! ¿Quién llegó? «el cartero». El predicado es «Por la mañana llegó».',
      },
      {
        id: 'or4',
        kind: 'reveal',
        emoji: '🔗',
        prompt: '¿Qué es la concordancia entre sujeto y verbo?',
        options: [
          {
            text: 'Que el núcleo del sujeto y el verbo coinciden en número (singular o plural) y persona.',
            correct: true,
            why: '¡Correcto! «El perro ladra» / «Los perros ladran». Si el sujeto cambia a plural, el verbo también.',
          },
          {
            text: 'Que el sujeto y el verbo empiezan con la misma letra.',
            why: 'Incorrecto. La concordancia es en número y persona.',
          },
          {
            text: 'Que la oración termina con punto.',
            why: 'Incorrecto. Eso es puntuación, no concordancia.',
          },
        ],
      },
      {
        id: 'or5',
        prompt: '¿Qué verbo concuerda? «Los gigantes ______ en las montañas.»',
        options: [{ text: 'viven', correct: true }, { text: 'vive' }, { text: 'vivo' }],
        explanation: '«Los gigantes» es plural (ellos), así que el verbo va en plural: «viven».',
      },
      {
        id: 'or6',
        prompt: '¿Qué verbo concuerda? «Mi hermana y yo ______ el diario.»',
        options: [{ text: 'leemos', correct: true }, { text: 'lee' }, { text: 'leen' }],
        explanation: '«Mi hermana y yo» equivale a «nosotros», así que el verbo es «leemos».',
      },
      {
        id: 'or7',
        prompt: '¿Cuál oración tiene un error de concordancia?',
        options: [
          { text: 'Las brujas vuela en escoba.', correct: true },
          { text: 'Las brujas vuelan en escoba.' },
          { text: 'La bruja vuela en escoba.' },
        ],
        explanation: '«Las brujas» es plural: tiene que ser «vuelan».',
      },
      {
        id: 'or8',
        kind: 'reveal',
        emoji: '👻',
        prompt: '¿Qué es el sujeto tácito?',
        options: [
          {
            text: 'El sujeto que no está escrito, pero se reconoce por el verbo.',
            correct: true,
            why: '¡Correcto! En «Comimos pizza» no aparece el sujeto, pero el verbo nos dice que es «nosotros».',
          },
          {
            text: 'El sujeto que tiene dos núcleos.',
            why: 'Incorrecto. Ese es el sujeto compuesto: «Juan y Ana».',
          },
          {
            text: 'El sujeto que está escrito en la oración.',
            why: 'Incorrecto. Ese es el sujeto expreso.',
          },
        ],
      },
      {
        id: 'or-clas2',
        kind: 'classify',
        prompt: '¿El sujeto es expreso (está escrito) o tácito (no está escrito)?',
        categories: ['Sujeto expreso', 'Sujeto tácito'],
        items: [
          { text: 'El rey dio una fiesta.', category: 'Sujeto expreso' },
          { text: 'Los niños jugaban.', category: 'Sujeto expreso' },
          { text: 'Pinocho y Gepetto pescaron.', category: 'Sujeto expreso' },
          { text: 'Comimos pizza.', category: 'Sujeto tácito' },
          { text: 'Llegaste temprano.', category: 'Sujeto tácito' },
          { text: 'Leyeron la noticia.', category: 'Sujeto tácito' },
        ],
      },
      {
        id: 'or9',
        prompt: 'En «Abrimos el cofre del tesoro», ¿cuál es el sujeto tácito?',
        options: [{ text: 'nosotros', correct: true }, { text: 'ellos' }, { text: 'el cofre' }],
      },
      {
        id: 'or10',
        prompt: 'En «Escribiste una noticia», ¿cuál es el sujeto tácito?',
        options: [{ text: 'vos / tú', correct: true }, { text: 'yo' }, { text: 'una noticia' }],
      },
      {
        id: 'or11',
        kind: 'reveal',
        emoji: '👥',
        prompt: 'Sujeto simple y compuesto: ¿cuál es la diferencia?',
        options: [
          {
            text: 'El simple tiene un núcleo; el compuesto tiene dos o más núcleos.',
            correct: true,
            why: '¡Correcto! «El lobo» → simple (núcleo: lobo). «El lobo y el cerdito» → compuesto (núcleos: lobo, cerdito).',
          },
          {
            text: 'El simple tiene una palabra; el compuesto tiene muchas palabras.',
            why: 'Incorrecto. «El lobo feroz del bosque» tiene muchas palabras pero un solo núcleo: es simple.',
          },
          {
            text: 'El simple está escrito y el compuesto no.',
            why: 'Incorrecto. Eso es expreso y tácito.',
          },
        ],
      },
      {
        id: 'or-nu1',
        kind: 'words',
        prompt: 'Sujeto compuesto: tocá los NÚCLEOS del sujeto.',
        words: ['El', 'príncipe', 'y', 'la', 'princesa', 'bailaron.'],
        pick: [1, 4],
        explanation: 'Es un sujeto compuesto: tiene dos núcleos, «príncipe» y «princesa».',
      },
    ],
  },
]
