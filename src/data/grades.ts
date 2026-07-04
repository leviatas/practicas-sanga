import type { Grade } from '../types'
import { grade1Practices } from './grade1'
import { grade4Practices } from './grade4'

// ============================================================================
// GRADOS DISPONIBLES
//
// Cada grado tiene varias prácticas separadas por tema (ver src/data/grade1.ts
// y src/data/grade4.ts). Para agregar un grado nuevo, creá su archivo de
// prácticas y sumá una entrada acá. El `id` se usa en la URL.
// ============================================================================

export const grades: Grade[] = [
  {
    id: '1',
    name: '1er Grado',
    emoji: '🐣',
    color: '#f59e0b', // ámbar
    practices: grade1Practices,
  },
  {
    id: '4',
    name: '4to Grado',
    emoji: '🚀',
    color: '#4f46e5', // índigo
    practices: grade4Practices,
  },
]

export function getGrade(gradeId: string): Grade | undefined {
  return grades.find((g) => g.id === gradeId)
}

export function getPractice(gradeId: string, practiceId: string) {
  const grade = getGrade(gradeId)
  if (!grade) return undefined
  const practice = grade.practices.find((p) => p.id === practiceId)
  if (!practice) return undefined
  return { grade, practice }
}
