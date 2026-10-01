import { useState } from 'react'
import type { Question } from '../types'

const LETTER_CODES = [
  ['A', '3 × 4', 12], ['B', '4 × 2', 8], ['C', '2 × 8', 16],
  ['D', '5 × 2', 10], ['E', '3 × 5', 15], ['F', '3 × 9', 27],
  ['G', '4 × 8', 32], ['H', '3 × 1', 3], ['I', '2 × 7', 14],
  ['J', '2 × 11', 22], ['K', '5 × 11', 55], ['L', '3 × 7', 21],
  ['M', '2 × 1', 2], ['N', '4 × 7', 28], ['Ñ', '3 × 11', 33],
  ['O', '3 × 6', 18], ['P', '3 × 10', 30], ['Q', '5 × 1', 5],
  ['R', '3 × 8', 24], ['S', '3 × 3', 9], ['T', '3 × 2', 6],
  ['U', '4 × 5', 20], ['V', '2 × 2', 4], ['W', '5 × 5', 25],
  ['X', '4 × 11', 44], ['Y', '4 × 10', 40], ['Z', '5 × 10', 50],
] as const
const LETTER_CODES_BY_VALUE = [...LETTER_CODES].sort(([, , firstValue], [, , secondValue]) => firstValue - secondValue)

const CODE_BY_LETTER = new Map<string, { equation: string; value: number }>(
  LETTER_CODES.map(([letter, equation, value]) => [letter, { equation, value }]),
)

function normalizeLetter(letter: string) {
  if (letter.toLocaleUpperCase('es-AR') === 'Ñ') return 'Ñ'
  return letter
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleUpperCase('es-AR')
}

function isLetter(character: string) {
  return /^[A-ZÑÁÉÍÓÚÜ]$/i.test(character)
}

export default function SecretCode({
  question,
  locked,
  onValidate,
}: {
  question: Question
  locked: boolean
  onValidate: (correct: boolean) => void
}) {
  const text = question.secretText ?? ''
  const letters = Array.from(text).filter(isLetter)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isWrong, setIsWrong] = useState(false)
  const activeLetter = normalizeLetter(letters[currentIndex] ?? '')

  function chooseLetter(letter: string) {
    if (locked) return
    if (letter !== activeLetter) {
      setIsWrong(true)
      return
    }

    setIsWrong(false)
    if (currentIndex + 1 === letters.length) {
      setCurrentIndex(letters.length)
      onValidate(true)
      return
    }
    setCurrentIndex((index) => index + 1)
  }

  let letterIndex = 0

  return (
    <div className="secret-code">
      <div className="secret-code__text" aria-label="Texto para descifrar">
        {text.trim().split(/\s+/).map((word, wordIndex) => (
          <span className="secret-code__word" key={wordIndex}>
            {Array.from(word).map((character, characterIndex) => {
              if (!isLetter(character)) {
                return <span className="secret-code__punctuation" key={characterIndex}>{character}</span>
              }

              const index = letterIndex++
              const isRevealed = index < currentIndex || locked
              const letterCode = CODE_BY_LETTER.get(normalizeLetter(character))

              return (
                <span
                  className={`secret-code__slot${isRevealed ? ' is-revealed' : ''}${index === currentIndex && !locked ? ' is-active' : ''}`}
                  key={characterIndex}
                  aria-label={isRevealed ? character : `Cuenta ${letterCode?.equation ?? ''}`}
                >
                  {isRevealed ? character.toLocaleUpperCase('es-AR') : letterCode?.equation.replace(/\s/g, '')}
                </span>
              )
            })}
          </span>
        ))}
      </div>
      {!locked && (
        <>
          {isWrong && (
            <p className="secret-code__feedback is-wrong" aria-live="polite">
              Esa letra no corresponde. ¡Probá otra vez!
            </p>
          )}
          <div className="secret-code__choices" aria-label="Elegí la letra correcta">
            {LETTER_CODES_BY_VALUE.map(([letter, , value]) => (
              <button
                className="secret-code__choice"
                type="button"
                key={letter}
                onClick={() => chooseLetter(letter)}
                aria-label={`${letter}, valor ${value}`}
              >
                <span className="secret-code__choice-letter">{letter}</span>
                <span className="secret-code__choice-value">{value}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}