import type { Grade, Practice, Subject } from '../types'
import { grade1Practices } from './grade1'
import { grade4Practices } from './grade4'

// ============================================================================
// GRADOS DISPONIBLES
//
// Jerarquía: Grado → Materia → Período → Prácticas.
//   Grado (1er, 4to) → Materia (English) → Período (1st Midterms) → Prácticas.
//
// Por ahora cada grado tiene una sola materia (English) con un solo período
// (1st Midterms). A futuro se pueden sumar más materias o períodos sin tocar
// las páginas: alcanza con agregar entradas acá. El `id` se usa en la URL.
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

export const grades: Grade[] = [
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
    subjects: englishFirstMidterms(grade4Practices),
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
