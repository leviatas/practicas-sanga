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
  /** Apoyo visual con un mapa dibujado (SVG). Ej: 'city' para las direcciones. */
  map?: string
  /** Aclaración opcional que se muestra después de responder. */
  explanation?: string
  /** Opciones de respuesta (mínimo 2). */
  options: Option[]
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

export interface Grade {
  /** Identificador único (se usa en la URL). */
  id: string
  /** Nombre visible, ej: "1er Grado". */
  name: string
  /** Emoji representativo. */
  emoji: string
  /** Color de acento (cualquier valor CSS válido). */
  color: string
  /** Prácticas disponibles en este grado. */
  practices: Practice[]
}
