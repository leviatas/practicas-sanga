import type { Practice } from '../types'

export const grade4TablasPractices: Practice[] = [
  {
    id: 'descifra-el-codigo',
    title: 'Descifra el código y lee el mensaje secreto',
    description:
      'Resuelve las multiplicaciones y completa las letras para descubrir cada mensaje.',
    emoji: '🔐',
    questions: [
      {
        id: 'mensaje-secreto-1',
        kind: 'secret-code',
        emoji: '🧩',
        prompt: 'Mensaje secreto 1',
        secretText: 'ENCONTRÉ LA PISTA',
      },
      {
        id: 'mensaje-secreto-2',
        kind: 'secret-code',
        emoji: '🧩',
        prompt: 'Mensaje secreto 2',
        secretText: 'EL TESORO APARECIÓ',
      },
      {
        id: 'mensaje-secreto-3',
        kind: 'secret-code',
        emoji: '🧩',
        prompt: 'Mensaje secreto 3',
        secretText: 'ALGUIEN DEJÓ HUELLAS',
      },
      {
        id: 'mensaje-secreto-4',
        kind: 'secret-code',
        emoji: '🧩',
        prompt: 'Mensaje secreto 4',
        secretText: 'LA PUERTA SE ABRIÓ',
      },
      {
        id: 'mensaje-secreto-5',
        kind: 'secret-code',
        emoji: '🧩',
        prompt: 'Mensaje secreto 5',
        secretText: 'EL MAPA DESAPARECIÓ',
      },
      {
        id: 'mensaje-secreto-6',
        kind: 'secret-code',
        emoji: '🧩',
        prompt: 'Mensaje secreto 6',
        secretText: 'ENCONTRAMOS EL TESORO',
      },
      {
        id: 'mensaje-secreto-7',
        kind: 'secret-code',
        emoji: '🧩',
        prompt: 'Mensaje secreto 7',
        secretText: 'LA PISTA ESTÁ AQUÍ',
      },
      {
        id: 'mensaje-secreto-8',
        kind: 'secret-code',
        emoji: '🧩',
        prompt: 'Mensaje secreto 8',
        secretText: 'EL MISTERIO TERMINÓ',
      },
    ],
  },
]