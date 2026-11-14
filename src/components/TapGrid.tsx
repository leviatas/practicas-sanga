import { useState } from 'react'
import type { Question } from '../types'

// Actividad para los más chiquitos (jardín): "tocá el dibujo correcto".
// - Muestra opciones grandes con emoji (o número/texto).
// - Si toca la incorrecta: la ficha se sacude y puede volver a intentar
//   (sin penalización).
// - Si acierta: la ficha festeja, aparecen estrellitas y se avisa al padre
//   (que marca la pregunta como dominada y avanza solo).

// Aviso de "esa no era": un sonidito grave y cortito, y vibración si el
// dispositivo la tiene. Todo best-effort: si no hay audio, no pasa nada.
let audioCtx: AudioContext | null = null
function buzz() {
  try {
    navigator.vibrate?.(180)
  } catch {
    // sin vibración
  }
  try {
    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctx) return
    audioCtx ??= new Ctx()
    const ctx = audioCtx
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'square'
    osc.frequency.setValueAtTime(190, ctx.currentTime)
    osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.25)
    gain.gain.setValueAtTime(0.12, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28)
    osc.connect(gain).connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.3)
  } catch {
    // sin audio
  }
}

export default function TapGrid({
  question,
  locked,
  onCorrect,
}: {
  question: Question
  locked: boolean
  onCorrect: () => void
}) {
  const options = question.options ?? []
  const [wrongIdx, setWrongIdx] = useState<number | null>(null)
  const [rightIdx, setRightIdx] = useState<number | null>(null)

  // Si todas las opciones son números (ej: contar 1..10), grilla compacta.
  const numbersOnly =
    options.length > 0 && options.every((o) => !o.emoji && /^\d+$/.test(o.text))

  // Con título fijo (ej: «Completá con las letras que faltan») las opciones
  // van en UNA hilera de recuadros, y la que no es suena y vibra.
  const inRow = !!question.title

  function handleTap(index: number) {
    if (locked || rightIdx !== null) return
    const opt = options[index]
    if (opt.correct) {
      setRightIdx(index)
      setWrongIdx(null)
      onCorrect()
    } else {
      // Sacudida breve; se puede reintentar.
      if (inRow) buzz()
      setWrongIdx(index)
      window.setTimeout(() => {
        setWrongIdx((cur) => (cur === index ? null : cur))
      }, 500)
    }
  }

  return (
    <div
      className={`tap-grid${numbersOnly ? ' tap-grid--numbers' : ''}${inRow ? ' tap-grid--row' : ''}`}
      style={inRow ? { gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` } : undefined}
      role="list"
    >
      {options.map((option, index) => {
        const isRight = rightIdx === index
        const isWrong = wrongIdx === index
        return (
          <button
            key={index}
            type="button"
            role="listitem"
            className={`tap-card${isRight ? ' is-right' : ''}${
              isWrong ? ' is-wrong' : ''
            }`}
            style={{ animationDelay: `${index * 90}ms` }}
            onClick={() => handleTap(index)}
            disabled={locked && !isRight}
            aria-label={option.text}
          >
            <span className="tap-card__face" aria-hidden="true">
              {option.emoji ?? option.text}
            </span>
            {option.emoji && (
              <span className="tap-card__label">{option.text}</span>
            )}
            {isRight && (
              <span className="tap-card__stars" aria-hidden="true">
                <span>⭐</span>
                <span>✨</span>
                <span>🌟</span>
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
