import { useEffect, useMemo, useRef, useState } from 'react'
import type { Question } from '../types'

// Ejercicio ORAL: el alumno toca "Hablar", DICE la respuesta en inglés y la app
// valida con el reconocimiento de voz del navegador (Web Speech API).
//
// Filosofía (como el 'tap' de jardín): reintenta sin penalizar. Recién se marca
// la respuesta cuando acierta (verde) o cuando toca "Ver la respuesta" (se rinde
// y la repasa en la próxima ronda). Así una mala pronunciación o un error del
// reconocedor no cuentan como respuesta equivocada.

// Normaliza texto para comparar: minúsculas, sin tildes, sin puntuación y sin
// los artículos a/an/the (el reconocedor a veces los agrega o los come).
function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\b(a|an|the)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function getRecognitionCtor(): { new (): SpeechRecognition } | undefined {
  if (typeof window === 'undefined') return undefined
  return window.SpeechRecognition ?? window.webkitSpeechRecognition
}

export default function SpeakCheck({
  question,
  locked,
  correct,
  onValidate,
}: {
  question: Question
  locked: boolean
  correct: boolean
  onValidate: (isCorrect: boolean) => void
}) {
  const answer = question.answer ?? ''
  // Objetivos aceptados (la respuesta + variantes), ya normalizados.
  const targets = useMemo(
    () =>
      [answer, ...(question.accept ?? [])]
        .map(normalize)
        .filter((t) => t.length > 0),
    [answer, question.accept],
  )

  const Ctor = useMemo(getRecognitionCtor, [])
  const supported = !!Ctor

  const [listening, setListening] = useState(false)
  const [heard, setHeard] = useState('') // último intento reconocido
  const [error, setError] = useState('')
  const recogRef = useRef<SpeechRecognition | null>(null)

  // ¿Alguna de las alternativas reconocidas coincide con un objetivo?
  function isMatch(transcripts: string[]): boolean {
    return transcripts.some((tr) => {
      const padded = ` ${normalize(tr)} `
      return targets.some((g) => padded.includes(` ${g} `))
    })
  }

  function stopRecognition() {
    const r = recogRef.current
    if (r) {
      r.onresult = null
      r.onerror = null
      r.onend = null
      try {
        r.abort()
      } catch {
        /* noop */
      }
      recogRef.current = null
    }
    setListening(false)
  }

  // Al desmontar (o cambiar de pregunta) cortamos el micrófono.
  useEffect(() => stopRecognition, [])

  function handleListen() {
    if (locked || listening || !Ctor) return
    setError('')
    setHeard('')

    let recog: SpeechRecognition
    try {
      recog = new Ctor()
    } catch {
      setError('No se pudo abrir el micrófono.')
      return
    }
    recogRef.current = recog
    recog.lang = 'en-US'
    recog.interimResults = false
    recog.maxAlternatives = 5
    recog.continuous = false

    recog.onstart = () => setListening(true)

    recog.onresult = (ev: SpeechRecognitionEvent) => {
      const result = ev.results[ev.results.length - 1]
      const alts: string[] = []
      for (let i = 0; i < result.length; i++) alts.push(result[i].transcript)
      setHeard(alts[0] ?? '')
      stopRecognition()
      if (isMatch(alts)) onValidate(true)
    }

    recog.onerror = (ev: SpeechRecognitionErrorEvent) => {
      if (ev.error === 'no-speech') setError('No te escuché. Probá de nuevo 🎤')
      else if (ev.error === 'not-allowed' || ev.error === 'service-not-allowed')
        setError('Necesito permiso para usar el micrófono 🎤')
      else setError('Hubo un problema con el micrófono. Probá de nuevo.')
      stopRecognition()
    }

    recog.onend = () => setListening(false)

    try {
      recog.start()
    } catch {
      setError('No se pudo iniciar el micrófono. Probá de nuevo.')
      stopRecognition()
    }
  }

  // Lee la pista (la consigna) en voz alta, en inglés.
  function handleHear() {
    try {
      const synth = window.speechSynthesis
      if (!synth) return
      synth.cancel()
      const u = new SpeechSynthesisUtterance(question.prompt)
      u.lang = 'en-US'
      u.rate = 0.9
      synth.speak(u)
    } catch {
      /* sin soporte de voz: no rompemos nada */
    }
  }

  // ---- Navegador sin soporte: no bloqueamos, ofrecemos ver la respuesta ----
  if (!supported) {
    return (
      <div className="speak">
        <p className="speak-unsupported">
          Este navegador no permite reconocer la voz. Probá con Chrome 🌐
        </p>
        {!locked ? (
          <div className="quiz-actions">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => onValidate(false)}
            >
              Ver la respuesta 👀
            </button>
          </div>
        ) : (
          <p className="speak-answer">
            La respuesta es: <strong>{answer}</strong>
          </p>
        )}
      </div>
    )
  }

  // ---- Respondida ----
  if (locked) {
    return (
      <div className="speak">
        {correct ? (
          <p className="drag-hint">¡Lo dijiste bien! Quedó dominada 🎉</p>
        ) : (
          <p className="speak-answer">
            La respuesta era: <strong>{answer}</strong>
            <br />
            La practicás de nuevo en la próxima ronda 🔁
          </p>
        )}
      </div>
    )
  }

  // ---- Respondiendo ----
  return (
    <div className="speak">
      <button
        type="button"
        className={`speak-mic${listening ? ' is-listening' : ''}`}
        onClick={handleListen}
        disabled={listening}
        aria-label="Hablar para responder"
      >
        <span className="speak-mic__icon" aria-hidden="true">
          🎤
        </span>
        {listening ? 'Escuchando… hablá ahora' : 'Tocá y hablá en inglés'}
      </button>

      <button
        type="button"
        className="speak-hear"
        onClick={handleHear}
        aria-label="Escuchar la pista"
      >
        🔊 Escuchar la pista
      </button>

      {heard && !error && (
        <p className="speak-heard">
          Escuché: “{heard}”. Probá de nuevo 🔁
        </p>
      )}
      {error && <p className="speak-heard speak-heard--error">{error}</p>}

      <div className="quiz-actions">
        <button
          type="button"
          className="btn btn--ghost btn--small"
          onClick={() => onValidate(false)}
        >
          Ver la respuesta 👀
        </button>
      </div>
    </div>
  )
}
