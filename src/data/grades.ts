import type { Grade, Practice, Subject } from '../types'
import { grade1Practices } from './grade1'
import {
  grade1BodyPartsPractices,
  grade1BodyLabelPractices,
} from './grade1BodyParts'
import { grade1ThereIsThereArePractices } from './grade1ThereIsThereAre'
import { grade1NumbersPractices } from './grade1Numbers'
import { grade4Practices } from './grade4'
import { grade4OralPractices } from './grade4Oral'
import { grade4CienciasPractices } from './grade4Ciencias'
import { grade4CienciasClasificacionPractices } from './grade4CienciasClasificacion'
import { grade4CienciasCalorPractices } from './grade4CienciasCalor'
import { grade4MatematicaPractices } from './grade4Matematica'
import { grade4PdlPractices } from './grade4Pdl'
import { jardinPractices } from './jardin'

// ============================================================================
// GRADOS DISPONIBLES
//
// Jerarquía: Grado → Materia → Período → Prácticas.
//   Ej: 4to Grado → Ciencias Naturales → Materiales sólidos → Prácticas.
//
// Un grado puede tener varias materias y cada materia varios períodos. Para
// sumar contenido no hace falta tocar las páginas: alcanza con agregar
// entradas acá. El `id` se usa en la URL.
// ============================================================================

// Helper: arma la materia "English" para 1er grado con los períodos
// "1st Midterms" y "2nd Midterms". La materia y el "2nd Midterms" llevan
// etiqueta NEW (vence sola en la fecha de `newUntil`).
function grade1English(firstMidtermPractices: Practice[], secondMidtermPractices: Practice[]): Subject[] {
  return [
    {
      id: 'english',
      name: 'English',
      emoji: '📖',
      newUntil: '2026-09-15',
      description: 'Vocabulario y gramática de inglés.',
      terms: [
        {
          id: '1st-midterms',
          name: '1st Midterms',
          emoji: '📝',
          description: 'Todas las prácticas para el primer parcial.',
          practices: firstMidtermPractices,
        },
        {
          id: '2nd-midterms',
          name: '2nd Midterms',
          emoji: '📝',
          newUntil: '2026-09-15',
          description: 'Todas las prácticas para el segundo parcial.',
          practices: secondMidtermPractices,
        },
      ],
    },
  ]
}

// 4to: cuatro materias. Prácticas del Lenguaje va primera y con etiqueta NEW.
//  - Prácticas del Lenguaje: "2do Trimestre" — poesía, artículos y adjetivos,
//    diccionario, clasificación semántica y tildación.
//  - English: "1st Midterms" (elegir/arrastrar) y "Midterms oral" (tocá hablar:
//    decís la palabra en inglés y la app valida).
//  - Ciencias Naturales: "Los materiales" — tres períodos: características de
//    los sólidos, clasificación (estado y origen) y el calor y los materiales.
//  - Matemática: "2da Trimestral" — con "Estrategias de cálculo de
//    multiplicación y división" y "Relaciones multiplicativas con el cuadro de
//    multiplicaciones", de opciones para explorar (se toca una y se despliega
//    el por qué).
function grade4Subjects(): Subject[] {
  return [
    {
      id: 'pdl',
      name: 'Prácticas del Lenguaje',
      emoji: '📚',
      newUntil: '2026-09-15',
      description: 'Poesía, gramática, diccionario y tildación.',
      terms: [
        {
          id: '2do-trimestre',
          name: '2do Trimestre',
          emoji: '📚',
          description:
            'Poesía, artículos y adjetivos, construcción sustantiva, diccionario, clasificación semántica y tildación.',
          practices: grade4PdlPractices,
        },
      ],
    },
    {
      id: 'english',
      name: 'English',
      emoji: '🌍',
      description: 'Vocabulario y gramática de inglés.',
      terms: [
        {
          id: '1st-midterms',
          name: '1st Midterms',
          emoji: '📝',
          description: 'Todas las prácticas para el primer parcial.',
          practices: grade4Practices,
        },
        {
          id: 'midterms-oral',
          name: 'Midterms oral',
          emoji: '🎤',
          description: 'Tocá hablar: decí la palabra en inglés y la app te valida.',
          practices: grade4OralPractices,
        },
      ],
    },
    {
      id: 'ciencias',
      name: 'Ciencias Naturales',
      emoji: '🧪',
      description: 'Los materiales, sus propiedades y el calor.',
      terms: [
        {
          id: 'materiales-solidos',
          name: 'Materiales sólidos',
          emoji: '🧱',
          description:
            'Dureza, rigidez, fragilidad, elasticidad, flexibilidad, permeabilidad, plasticidad y maleabilidad.',
          practices: grade4CienciasPractices,
        },
        {
          id: 'clasificacion-materiales',
          name: 'Clasificación de materiales',
          emoji: '🗂️',
          description:
            'Según su estado (sólidos, líquidos y gaseosos), según su origen (naturales, manufacturados y sintéticos) y sus usos.',
          practices: grade4CienciasClasificacionPractices,
        },
        {
          id: 'calor-materiales',
          name: 'El calor y los materiales',
          emoji: '🔥',
          description:
            'Calor y temperatura, conductores y aislantes, cambios que produce el calor y las experiencias del laboratorio.',
          practices: grade4CienciasCalorPractices,
        },
      ],
    },
    {
      id: 'matematica',
      name: 'Matemática',
      emoji: '🧮',
      description: 'Cálculo mental: multiplicar y dividir con trucos.',
      terms: [
        {
          id: '2da-trimestral',
          name: '2da Trimestral',
          emoji: '📐',
          description: 'Todas las prácticas para el segundo trimestral.',
          practices: grade4MatematicaPractices,
        },
      ],
    },
  ]
}

// Jardín: materia "3 años" con un período de actividades para los más chicos.
function tresAnios(practices: Practice[]): Subject[] {
  return [
    {
      id: '3-anios',
      name: '3 años',
      emoji: '🧸',
      description: 'Juegos con dibujos: colores, animales, contar y más.',
      terms: [
        {
          id: 'actividades',
          name: 'Actividades',
          emoji: '🎈',
          description: 'Actividades para jugar y aprender.',
          practices,
        },
      ],
    },
  ]
}

export const grades: Grade[] = [
  {
    id: 'jardin',
    name: 'Jardín',
    emoji: '🧸',
    color: '#ec4899', // rosa alegre
    subjects: tresAnios(jardinPractices),
  },
  {
    id: '1',
    name: '1er Grado',
    emoji: '🐣',
    color: '#f59e0b', // ámbar
    newUntil: '2026-09-15',
    subjects: grade1English(grade1Practices, [
      ...grade1BodyPartsPractices,
      ...grade1BodyLabelPractices,
      ...grade1ThereIsThereArePractices,
      ...grade1NumbersPractices,
    ]),
  },
  {
    id: '4',
    name: '4to Grado',
    emoji: '🚀',
    color: '#4f46e5', // índigo
    newUntil: '2026-09-15',
    subjects: grade4Subjects(),
  },
]

export function getGrade(gradeId: string): Grade | undefined {
  return grades.find((g) => g.id === gradeId)
}

export function getSubject(gradeId: string, subjectId: string) {
  const grade = getGrade(gradeId)
  const subject = grade?.subjects.find((s) => s.id === subjectId)
  if (!grade || !subject) return undefined
  return { grade, subject }
}

export function getTerm(gradeId: string, subjectId: string, termId: string) {
  const found = getSubject(gradeId, subjectId)
  const term = found?.subject.terms.find((t) => t.id === termId)
  if (!found || !term) return undefined
  return { ...found, term }
}

export function getPractice(
  gradeId: string,
  subjectId: string,
  termId: string,
  practiceId: string,
) {
  const found = getTerm(gradeId, subjectId, termId)
  const practice = found?.term.practices.find((p) => p.id === practiceId)
  if (!found || !practice) return undefined
  return { ...found, practice }
}

// Todas las prácticas de un grado (aplanando materias y períodos). Útil para
// contar preguntas o prácticas en las pantallas de resumen.
export function gradePractices(grade: Grade): Practice[] {
  return grade.subjects.flatMap((s) => s.terms.flatMap((t) => t.practices))
}
