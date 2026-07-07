import type { Practice } from '../types'

// ============================================================================
// JARDÍN — materia "3 años"
// Actividades para los más chiquitos (todavía no leen): todo con dibujos/emojis
// grandes y la actividad "tocá el correcto" (kind 'tap'), que reintenta sin
// penalizar, festeja al acertar y avanza solo. La consigna la lee un grande.
// ============================================================================

export const jardinPractices: Practice[] = [
  // ------------------------------------------------------------- Colores ----
  {
    id: 'colores',
    title: 'Colores',
    description: 'Tocá el color correcto. 🎨',
    emoji: '🎨',
    questions: [
      { id: 'co1', kind: 'tap', prompt: 'Tocá el color ROJO 🔴',
        options: [
          { text: 'rojo', emoji: '🔴', correct: true },
          { text: 'azul', emoji: '🔵' },
          { text: 'amarillo', emoji: '🟡' },
        ] },
      { id: 'co2', kind: 'tap', prompt: 'Tocá el color AZUL 🔵',
        options: [
          { text: 'azul', emoji: '🔵', correct: true },
          { text: 'verde', emoji: '🟢' },
          { text: 'rojo', emoji: '🔴' },
        ] },
      { id: 'co3', kind: 'tap', prompt: 'Tocá el color AMARILLO 🟡',
        options: [
          { text: 'amarillo', emoji: '🟡', correct: true },
          { text: 'violeta', emoji: '🟣' },
          { text: 'azul', emoji: '🔵' },
        ] },
      { id: 'co4', kind: 'tap', prompt: 'Tocá el color VERDE 🟢',
        options: [
          { text: 'verde', emoji: '🟢', correct: true },
          { text: 'naranja', emoji: '🟠' },
          { text: 'rojo', emoji: '🔴' },
        ] },
      { id: 'co5', kind: 'tap', prompt: 'Tocá el color NARANJA 🟠',
        options: [
          { text: 'naranja', emoji: '🟠', correct: true },
          { text: 'amarillo', emoji: '🟡' },
          { text: 'violeta', emoji: '🟣' },
        ] },
    ],
  },

  // ------------------------------------------------------------ Animales ----
  {
    id: 'animales',
    title: 'Animales',
    description: 'Encontrá el animalito. 🐾',
    emoji: '🐾',
    questions: [
      { id: 'an1', kind: 'tap', prompt: '¿Dónde está el PERRO? 🐶',
        options: [
          { text: 'perro', emoji: '🐶', correct: true },
          { text: 'gato', emoji: '🐱' },
          { text: 'vaca', emoji: '🐮' },
        ] },
      { id: 'an2', kind: 'tap', prompt: '¿Dónde está el GATO? 🐱',
        options: [
          { text: 'gato', emoji: '🐱', correct: true },
          { text: 'chancho', emoji: '🐷' },
          { text: 'pollito', emoji: '🐤' },
        ] },
      { id: 'an3', kind: 'tap', prompt: '¿Dónde está la VACA? 🐮',
        options: [
          { text: 'vaca', emoji: '🐮', correct: true },
          { text: 'caballo', emoji: '🐴' },
          { text: 'oveja', emoji: '🐑' },
        ] },
      { id: 'an4', kind: 'tap', prompt: '¿Dónde está el PATO? 🦆',
        options: [
          { text: 'pato', emoji: '🦆', correct: true },
          { text: 'rana', emoji: '🐸' },
          { text: 'gallina', emoji: '🐔' },
        ] },
      { id: 'an5', kind: 'tap', prompt: '¿Dónde está el LEÓN? 🦁',
        options: [
          { text: 'león', emoji: '🦁', correct: true },
          { text: 'tigre', emoji: '🐯' },
          { text: 'oso', emoji: '🐻' },
        ] },
      { id: 'an6', kind: 'tap', prompt: '¿Dónde está el PEZ? 🐟',
        options: [
          { text: 'pez', emoji: '🐟', correct: true },
          { text: 'mariposa', emoji: '🦋' },
          { text: 'tortuga', emoji: '🐢' },
        ] },
    ],
  },

  // ------------------------------------------------------------- Contar ----
  {
    id: 'contar',
    title: 'A contar',
    description: 'Contá y tocá el número. 🔢',
    emoji: '🔢',
    questions: [
      { id: 'cn1', kind: 'tap', emoji: '🍎', prompt: '¿Cuántas manzanas hay?',
        options: [
          { text: '1', correct: true },
          { text: '2' },
          { text: '3' },
        ] },
      { id: 'cn2', kind: 'tap', emoji: '🐤🐤', prompt: '¿Cuántos pollitos hay?',
        options: [
          { text: '2', correct: true },
          { text: '1' },
          { text: '3' },
        ] },
      { id: 'cn3', kind: 'tap', emoji: '⭐⭐⭐', prompt: '¿Cuántas estrellas hay?',
        options: [
          { text: '3', correct: true },
          { text: '2' },
          { text: '4' },
        ] },
      { id: 'cn4', kind: 'tap', emoji: '🐟🐟', prompt: '¿Cuántos pececitos hay?',
        options: [
          { text: '2', correct: true },
          { text: '3' },
          { text: '4' },
        ] },
      { id: 'cn5', kind: 'tap', emoji: '🎈🎈🎈🎈', prompt: '¿Cuántos globos hay?',
        options: [
          { text: '4', correct: true },
          { text: '3' },
          { text: '5' },
        ] },
    ],
  },

  // ------------------------------------------------------------- Formas ----
  {
    id: 'formas',
    title: 'Formas',
    description: 'Tocá la forma correcta. 🔷',
    emoji: '🔷',
    questions: [
      { id: 'fo1', kind: 'tap', prompt: 'Tocá el CÍRCULO 🔵',
        options: [
          { text: 'círculo', emoji: '🔵', correct: true },
          { text: 'triángulo', emoji: '🔺' },
          { text: 'cuadrado', emoji: '🟥' },
        ] },
      { id: 'fo2', kind: 'tap', prompt: 'Tocá el CUADRADO 🟥',
        options: [
          { text: 'cuadrado', emoji: '🟥', correct: true },
          { text: 'círculo', emoji: '🔵' },
          { text: 'estrella', emoji: '⭐' },
        ] },
      { id: 'fo3', kind: 'tap', prompt: 'Tocá el TRIÁNGULO 🔺',
        options: [
          { text: 'triángulo', emoji: '🔺', correct: true },
          { text: 'círculo', emoji: '🟢' },
          { text: 'cuadrado', emoji: '🟩' },
        ] },
      { id: 'fo4', kind: 'tap', prompt: 'Tocá la ESTRELLA ⭐',
        options: [
          { text: 'estrella', emoji: '⭐', correct: true },
          { text: 'corazón', emoji: '❤️' },
          { text: 'círculo', emoji: '🔵' },
        ] },
      { id: 'fo5', kind: 'tap', prompt: 'Tocá el CORAZÓN ❤️',
        options: [
          { text: 'corazón', emoji: '❤️', correct: true },
          { text: 'estrella', emoji: '⭐' },
          { text: 'triángulo', emoji: '🔺' },
        ] },
    ],
  },

  // ---------------------------------------------------------- Emociones ----
  {
    id: 'emociones',
    title: 'Caritas',
    description: '¿Cómo se siente? 😊',
    emoji: '😊',
    questions: [
      { id: 'em1', kind: 'tap', prompt: '¿Quién está FELIZ? 😀',
        options: [
          { text: 'feliz', emoji: '😀', correct: true },
          { text: 'triste', emoji: '😢' },
          { text: 'enojado', emoji: '😠' },
        ] },
      { id: 'em2', kind: 'tap', prompt: '¿Quién está TRISTE? 😢',
        options: [
          { text: 'triste', emoji: '😢', correct: true },
          { text: 'feliz', emoji: '😀' },
          { text: 'sorprendido', emoji: '😮' },
        ] },
      { id: 'em3', kind: 'tap', prompt: '¿Quién está ENOJADO? 😠',
        options: [
          { text: 'enojado', emoji: '😠', correct: true },
          { text: 'feliz', emoji: '😀' },
          { text: 'dormido', emoji: '😴' },
        ] },
      { id: 'em4', kind: 'tap', prompt: '¿Quién está SORPRENDIDO? 😮',
        options: [
          { text: 'sorprendido', emoji: '😮', correct: true },
          { text: 'triste', emoji: '😢' },
          { text: 'feliz', emoji: '😀' },
        ] },
      { id: 'em5', kind: 'tap', prompt: '¿Quién tiene SUEÑO? 😴',
        options: [
          { text: 'con sueño', emoji: '😴', correct: true },
          { text: 'feliz', emoji: '😀' },
          { text: 'enojado', emoji: '😠' },
        ] },
    ],
  },

  // ----------------------------------------------------- Frutas y comida ----
  {
    id: 'frutas',
    title: 'Frutas',
    description: 'Tocá la fruta. 🍓',
    emoji: '🍓',
    questions: [
      { id: 'fr1', kind: 'tap', prompt: '¿Dónde está la BANANA? 🍌',
        options: [
          { text: 'banana', emoji: '🍌', correct: true },
          { text: 'manzana', emoji: '🍎' },
          { text: 'uvas', emoji: '🍇' },
        ] },
      { id: 'fr2', kind: 'tap', prompt: '¿Dónde está la MANZANA? 🍎',
        options: [
          { text: 'manzana', emoji: '🍎', correct: true },
          { text: 'banana', emoji: '🍌' },
          { text: 'frutilla', emoji: '🍓' },
        ] },
      { id: 'fr3', kind: 'tap', prompt: '¿Dónde están las UVAS? 🍇',
        options: [
          { text: 'uvas', emoji: '🍇', correct: true },
          { text: 'naranja', emoji: '🍊' },
          { text: 'banana', emoji: '🍌' },
        ] },
      { id: 'fr4', kind: 'tap', prompt: '¿Dónde está la FRUTILLA? 🍓',
        options: [
          { text: 'frutilla', emoji: '🍓', correct: true },
          { text: 'pera', emoji: '🍐' },
          { text: 'manzana', emoji: '🍎' },
        ] },
      { id: 'fr5', kind: 'tap', prompt: '¿Dónde está la NARANJA? 🍊',
        options: [
          { text: 'naranja', emoji: '🍊', correct: true },
          { text: 'sandía', emoji: '🍉' },
          { text: 'uvas', emoji: '🍇' },
        ] },
    ],
  },
]
