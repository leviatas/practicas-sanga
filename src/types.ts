// Modelo de datos de la app.
// Editá los archivos de src/data para agregar grados, prácticas y preguntas.

export interface Option {
  /** Texto de la opción (lo que ve el alumno). */
  text: string
  /** Marcá con `true` la(s) opción(es) correcta(s). */
  correct?: boolean
  /** Emoji grande para actividades visuales (kind 'tap', ideal para jardín). */
  emoji?: string
  /**
   * Explicación propia de ESTA opción (kind 'reveal'): por qué es correcta o
   * por qué no. Se despliega al tocarla, en verde si es correcta o en gris si
   * no lo es. Escribila completa, como la vería el alumno
   * (ej: "Incorrecto. Estás sumando en lugar de multiplicar.").
   */
  why?: string
}

export interface Hotspot {
  /** Palabra correcta para este casillero (ej: 'NOSE'). */
  label: string
  /**
   * Punto que señala la flecha, en % del ancho y del alto de la IMAGEN
   * (0–100). Ej: { x: 43, y: 26 } = nariz.
   */
  x: number
  y: number
  /** Columna donde va el casillero: a la izquierda o a la derecha del dibujo. */
  side: 'left' | 'right'
  /** Alto del casillero dentro de la columna, en % (0–100). */
  at: number
}

export interface SentenceColumn {
  /** Todas las opciones de la columna, en el orden en que se muestran. */
  options: string[]
  /** La opción correcta para esta escena (tiene que estar en `options`). */
  answer: string
}

export interface Question {
  /** Identificador único dentro de la práctica. */
  id: string
  /** Consigna / pregunta. */
  prompt: string
  /** Emoji o texto grande de apoyo visual (opcional, ideal para los más chicos). */
  emoji?: string
  /** Apoyo visual con un mapa dibujado (SVG). Ej: 'city' o 'city2'. */
  map?: string
  /** Apoyo visual con una escena de preposición (SVG). Ej: 'on', 'into'. */
  scene?: string
  /** Apoyo visual con una foto de un objeto de la escuela. Ej: 'pen', 'ruler'. */
  image?: string
  /**
   * Poema (u otro texto) que se muestra ARRIBA de la consigna, con sus saltos
   * de línea y sus estrofas tal cual se escriben acá: un salto de línea separa
   * versos y una línea en blanco separa estrofas.
   *
   * Lo que va entre [corchetes] se muestra RESALTADO. Sirve para preguntar
   * "lo que está resaltado, ¿qué es?": se puede resaltar un verso entero, una
   * estrofa completa o solo algunas palabras. Ej:
   *   '[Mi gato se ha dormido]\nencima del sillón,'
   */
  poem?: string
  /** Título del poema (se muestra arriba del texto, en negrita). */
  poemTitle?: string
  /** Aclaración opcional que se muestra después de responder. */
  explanation?: string
  /**
   * Pista opcional (kind 'reveal'): una ayuda para pensar ANTES de tocar una
   * opción. Aparece plegada en un botón "Pista"; el alumno la abre solo si la
   * necesita. No revela la respuesta: la orienta.
   */
  hint?: string
  /**
   * Tipo de ejercicio:
   *  - 'choice' (por defecto): elegir una opción.
   *  - 'drag': arrastrar fichas a los huecos de un párrafo y validar.
   *  - 'classify': arrastrar palabras a su categoría y validar.
   *  - 'tap': tocar el dibujo/emoji correcto (jardín); reintenta sin penalizar,
   *    festeja al acertar y avanza solo.
   *  - 'speak': el alumno DICE la respuesta en voz alta y la app valida con
   *    reconocimiento de voz (Web Speech API). Reintenta sin penalizar.
   *  - 'reveal': opciones "para explorar". No se ve cuál es la correcta: al
   *    tocar una se despliega su explicación (`why`) en verde si es correcta o
   *    en gris si no. Se puede seguir tocando hasta dar con la correcta, o
   *    pedir verla con el botón "Ver la respuesta correcta". Solo cuenta como
   *    dominada si acertó en el primer toque.
   *  - 'label': señalar partes de un dibujo. Cada flecha del dibujo apunta a
   *    una parte y termina en un casillero vacío; el alumno arrastra (o toca)
   *    la palabra del banco hasta el casillero y valida.
   *  - 'verses': tocar los versos que riman entre sí. Se muestra una copla
   *    cortita y el alumno toca los versos que rimen; con "Enviar" se corrige
   *    todo junto (verdes los que rimaban, roja la elección de más).
   *  - 'sentence': armar una oración que describa la escena. Debajo del dibujo
   *    hay varias columnas y el alumno toca una opción en cada una; con
   *    "Enviar" se corrige todo junto (verde la acertada; roja la elegida que
   *    no iba, y en verde la que correspondía).
   */
  kind?:
  | 'choice'
  | 'drag'
  | 'classify'
  | 'tap'
  | 'speak'
  | 'reveal'
  | 'label'
  | 'sentence'
  | 'verses'
  /** Opciones de respuesta (para kind 'choice' y 'reveal'). */
  options?: Option[]
  /**
   * Si es `true`, las opciones NO se barajan (se muestran en el orden dado).
   * Útil para contar: los números 1..10 siempre en orden.
   */
  keepOrder?: boolean
  /**
   * Para kind 'drag': el párrafo partido en trozos de texto. Los huecos van
   * ENTRE los trozos, así que hay `segments.length - 1` huecos.
   */
  segments?: string[]
  /** Para kind 'drag': la ficha correcta de cada hueco (largo = huecos). */
  blanks?: string[]
  /** Para kind 'drag': todas las fichas disponibles para arrastrar. */
  bank?: string[]
  /**
   * Para kind 'drag': si es `true`, NO importa en qué hueco va cada ficha
   * mientras estén todas las correctas. Se usa cuando la frase es simétrica y
   * las dos respuestas son igual de válidas en cualquier orden. Ej:
   * "atravesado por ___ o ___" (gases o líquidos / líquidos o gases).
   */
  anyOrder?: boolean
  /** Para kind 'classify': las categorías (columnas) donde clasificar. */
  categories?: string[]
  /** Para kind 'classify': cada palabra y a qué categoría pertenece. */
  items?: { text: string; category: string }[]
  /** Para kind 'label': clave de la imagen a etiquetar (ej: 'fullbody'). */
  labelImage?: string
  /** Para kind 'label': los puntos señalados por las flechas. */
  hotspots?: Hotspot[]
  /**
   * Para kind 'sentence': las columnas de la oración, de izquierda a derecha.
   * El alumno elige una opción de cada una y se corrige todo junto al enviar.
   */
  columns?: SentenceColumn[]
  /**
   * Para kind 'classify': si es `true`, se corrige ficha por ficha al soltarla.
   * La que va bien queda pegada en su caja (en verde) y la que va mal vuelve
   * sola al banco. No hay botón "Validar": termina cuando están todas.
   */
  checkOnDrop?: boolean
  /** Para kind 'verses': los versos de la copla, uno por renglón. */
  verses?: string[]
  /**
   * Para kind 'verses': los índices (base 0) de los versos que riman entre sí.
   * Ej: [0, 1] = riman el primero y el segundo.
   */
  rhyme?: number[]
  /**
   * Para kind 'choice': si es `true`, al tocar una opción se muestra un ratito
   * si estuvo bien o mal y se pasa SOLO a la siguiente (sin botón). Ideal para
   * tandas largas de la misma consigna, ej: clasificar imágenes sensoriales.
   */
  autoNext?: boolean
  /**
   * Para kind 'speak': lo que el alumno tiene que decir en voz alta (ej: la
   * palabra o frase correcta). Se compara con lo que reconoce el micrófono.
   */
  answer?: string
  /**
   * Para kind 'speak': variantes adicionales que también se dan por buenas
   * (útil porque el reconocedor confunde homófonos, ej: "chef" ↔ "shef").
   * No hace falta incluir `answer`: ya se acepta por defecto.
   */
  accept?: string[]
}

export interface Practice {
  /** Identificador único dentro del grado (se usa en la URL). */
  id: string
  /** Título de la práctica, ej: "Midterm de Inglés". */
  title: string
  /** Descripción corta. */
  description: string
  /** Emoji representativo. */
  emoji: string
  /** Preguntas de la práctica. */
  questions: Question[]
}

export interface Term {
  /** Identificador único dentro de la materia (se usa en la URL). Ej: '1st-midterms'. */
  id: string
  /** Nombre visible, ej: "1st Midterms". */
  name: string
  /** Emoji representativo. */
  emoji: string
  /** Descripción corta (opcional). */
  description?: string
  /** Prácticas de este período. */
  practices: Practice[]
}

export interface Subject {
  /** Identificador único dentro del grado (se usa en la URL). Ej: 'english'. */
  id: string
  /** Nombre visible, ej: "English". */
  name: string
  /** Emoji representativo. */
  emoji: string
  /** Descripción corta (opcional). */
  description?: string
  /** Períodos/exámenes de la materia (ej: 1st Midterms). */
  terms: Term[]
}

export interface Grade {
  /** Identificador único (se usa en la URL). */
  id: string
  /** Nombre visible, ej: "1er Grado". */
  name: string
  /** Emoji representativo. */
  emoji: string
  /** Color de acento (cualquier valor CSS válido). */
  color: string
  /** Materias del grado (ej: English). Cada una tiene sus períodos y prácticas. */
  subjects: Subject[]
}
