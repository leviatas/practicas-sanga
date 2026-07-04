// Modelo de datos de la app.
// Editá los archivos de src/data para agregar grados, prácticas y preguntas.

export interface Option {
  /** Texto de la opción (lo que ve el alumno). */
  text: string
  /** Marcá con `true` la(s) opción(es) correcta(s). */
  correct?: boolean
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
  /** Aclaración opcional que se muestra después de responder. */
  explanation?: string
  /**
   * Tipo de ejercicio:
   *  - 'choice' (por defecto): elegir una opción.
   *  - 'drag': arrastrar fichas a los huecos de un párrafo y validar.
   *  - 'classify': arrastrar palabras a su categoría y validar.
   */
  kind?: 'choice' | 'drag' | 'classify'
  /** Opciones de respuesta (para kind 'choice'). */
  options?: Option[]
  /**
   * Para kind 'drag': el párrafo partido en trozos de texto. Los huecos van
   * ENTRE los trozos, así que hay `segments.length - 1` huecos.
   */
  segments?: string[]
  /** Para kind 'drag': la ficha correcta de cada hueco (largo = huecos). */
  blanks?: string[]
  /** Para kind 'drag': todas las fichas disponibles para arrastrar. */
  bank?: string[]
  /** Para kind 'classify': las categorías (columnas) donde clasificar. */
  categories?: string[]
  /** Para kind 'classify': cada palabra y a qué categoría pertenece. */
  items?: { text: string; category: string }[]
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
