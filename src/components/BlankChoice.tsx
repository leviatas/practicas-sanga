import type { Question } from '../types'

// Oración con un hueco (pregunta 'choice' con `blank`): en lugar de la lista
// de opciones de abajo, las opciones van ADENTRO del hueco de la oración,
// apiladas, como si el chico completara la fotocopia. Ej:
//   NO, [ THEY ARE   ] .
//       [ THEY AREN'T]
// Al tocar una se corrige igual que una pregunta de opciones común: la
// correcta queda en verde y, si eligió otra, esa queda en rojo.
export default function BlankChoice({
  question,
  selected,
  answered,
  onSelect,
  T,
}: {
  question: Question
  selected: number | null
  answered: boolean
  onSelect: (index: number) => void
  T: (s: string) => string
}) {
  const [before, after = ''] = (question.blank ?? '').split('___')
  const options = question.options ?? []

  return (
    <p className="blank-sentence">
      {before.trim() && <span className="blank-sentence__text">{T(before.trim())}</span>}
      <span className={`blank-slot${answered ? ' is-answered' : ''}`}>
        {options.map((option, index) => {
          const isSelected = selected === index
          let stateClass = ''
          if (answered && option.correct) stateClass = ' is-correct'
          else if (answered && isSelected) stateClass = ' is-wrong'
          else if (answered) stateClass = ' is-dim'
          return (
            <button
              key={index}
              type="button"
              className={`blank-option${stateClass}`}
              onClick={() => onSelect(index)}
              disabled={answered}
              aria-pressed={isSelected}
            >
              {T(option.text)}
              {answered && (option.correct || isSelected) && (
                <span className="blank-option__mark" aria-hidden="true">
                  {option.correct ? ' ✓' : ' ✗'}
                </span>
              )}
            </button>
          )
        })}
      </span>
      {after.trim() && <span className="blank-sentence__text">{T(after.trim())}</span>}
    </p>
  )
}
