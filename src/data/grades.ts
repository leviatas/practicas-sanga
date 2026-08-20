import type { Grade, Practice, Subject } from '../types'
import { grade1Practices } from './grade1'
import { grade4Practices } from './grade4'
import { grade4OralPractices } from './grade4Oral'
import { grade4CienciasPractices } from './grade4Ciencias'
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

// Helper: arma la materia "English" con un período "1st Midterms" que contiene
// las prácticas indicadas.
function englishFirstMidterms(practices: Practice[]): Subject[] {
  return [
    {
      id: 'english',
      name: 'English',
      emoji: '📖',
      description: 'Vocabulario y gramática de inglés.',
      terms: [
        {
          id: '1st-midterms',
          name: '1st Midterms',
          emoji: '📝',
          description: 'Todas las prácticas para el primer parcial.',
          practices,
        },
      ],
    },
  ]
}

// 4to: dos materias.
//  - English: "1st Midterms" (elegir/arrastrar) y "Midterms oral" (tocá hablar:
//    decís la palabra en inglés y la app valida).
//  - Ciencias Naturales: "Los materiales" (características de los sólidos).
function grade4Subjects(): Subject[] {
  return [
    {
      id: 'english',
      name: 'English',
      emoji: '📖',
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
      emoji: '🔬',
      description: 'Los materiales y sus propiedades.',
      terms: [
        {
          id: 'materiales-solidos',
          name: 'Materiales sólidos',
          emoji: '🧱',
          description:
            'Dureza, rigidez, fragilidad, elasticidad, flexibilidad, permeabilidad, plasticidad y maleabilidad.',
          practices: grade4CienciasPractices,
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
    subjects: englishFirstMidterms(grade1Practices),
  },
  {
    id: '4',
    name: '4to Grado',
    emoji: '🚀',
    color: '#4f46e5', // índigo
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
