import type { Grade } from '../types'
import { grade1EnglishMidterm } from './grade1-english-midterm'
import { grade4EnglishMidterm } from './grade4-english-midterm'

// ============================================================================
// GRADOS DISPONIBLES
//
// Para agregar un grado nuevo (ej: 2do, 3ro...), creá su archivo de práctica
// en src/data/ y sumá una entrada acá. El `id` se usa en la URL.
// ============================================================================

export const grades: Grade[] = [
  {
    id: '1',
    name: '1er Grado',
    emoji: '🐣',
    color: '#f59e0b', // ámbar
    practices: [grade1EnglishMidterm],
  },
  {
    id: '4',
    name: '4to Grado',
    emoji: '🚀',
    color: '#4f46e5', // índigo
    practices: [grade4EnglishMidterm],
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
