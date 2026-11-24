import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { hush, praise, retry, say } from '../../lib/voice'

// ============================================================================
// Motor común de los minijuegos de matemática (1er grado).
//
// Cada juego arma sus rondas (problemas generados al azar) y dibuja su escena;
// el motor se ocupa de lo que comparten todos:
//  · Consigna ESCRITA y HABLADA: se lee sola al empezar cada ronda y se puede
//    repetir con el megáfono 📢.
//  · Pista 💡 (escrita y hablada). Si se equivoca dos veces, aparece sola.
//  · Al acertar: felicitación hablada + la explicación de por qué, papelitos
//    de colores y el botón para seguir.
//  · Al equivocarse: ánimo hablado, sin retar ni penalizar más que la
//    estrella de esa ronda (la estrella es por acertar al primer intento).
//  · Pantalla final con las estrellas, «Jugar otra vez» y «Volver al menú».
// ============================================================================

export interface RoundBase {
  id: string
  /** Consigna escrita (completa). */
  prompt: string
  /** Cómo se dice la consigna si difiere de lo escrito (opcional). */
  speech?: string
  /** Pista: orienta sin decir la respuesta. */
  hint: string
  /** Explicación que se dice al acertar (ej: «7 + 3 = 10»). */
  explain: string
}

export interface RoundApi {
  /** `true` cuando la ronda ya se resolvió bien (bloquear los controles). */
  solved: boolean
  /** Avisar que respondió bien. */
  correct: () => void
  /** Avisar que se equivocó; `msg` reemplaza el ánimo genérico. */
  wrong: (msg?: string) => void
  /** Decir algo en voz alta y mostrarlo en el globo de mensajes. */
  tell: (msg: string) => void
}

export interface GameProps {
  /** Nombre del chico (opcional) para felicitarlo por su nombre. */
  childName: string
  /** Clave de localStorage para guardar el mejor puntaje. */
  storageKey: string
  /** Volver al menú del REPASO. */
  onExit: () => void
}

// ---------- utilidades para generar problemas ----------

export function randInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1))
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/** Tres opciones numéricas distintas (de menor a mayor) con la correcta. */
export function numberOptions(
  correct: number,
  candidates: number[],
  count = 3,
  min = 0,
): number[] {
  const set = new Set<number>([correct])
  for (const c of shuffle(candidates)) {
    if (set.size >= count) break
    if (c >= min && c !== correct) set.add(c)
  }
  let delta = 1
  while (set.size < count) {
    if (correct + delta >= min) set.add(correct + delta)
    if (set.size < count && correct - delta >= min) set.add(correct - delta)
    delta++
  }
  return [...set].sort((a, b) => a - b)
}

/** Varios valores distintos al azar dentro de un rango. */
export function distinct(count: number, min: number, max: number): number[] {
  return shuffle(Array.from({ length: max - min + 1 }, (_, i) => min + i)).slice(0, count)
}

// ---------- mejor puntaje ----------

export interface BestScore {
  stars: number
  total: number
}

export function loadBest(key: string): BestScore | null {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const v = JSON.parse(raw) as BestScore
    return typeof v?.stars === 'number' && typeof v?.total === 'number' ? v : null
  } catch {
    return null
  }
}

function saveBest(key: string, score: BestScore): void {
  try {
    const prev = loadBest(key)
    if (!prev || score.stars >= prev.stars) localStorage.setItem(key, JSON.stringify(score))
  } catch {
    // sin localStorage: no se guarda, el juego sigue.
  }
}

// ---------- componentes chicos ----------

/** Botón de megáfono: vuelve a leer un texto. */
export function Megaphone({ text, label = 'Escuchar otra vez' }: { text: string; label?: string }) {
  return (
    <button
      type="button"
      className="mg-mega"
      onClick={() => say(text)}
      aria-label={label}
      title={label}
    >
      <span aria-hidden="true">📢</span>
    </button>
  )
}

/** Papelitos de colores al acertar. */
function Confetti() {
  const pieces = Array.from({ length: 22 }, (_, i) => i)
  const colors = ['#ff6f61', '#ffd166', '#06d6a0', '#118ab2', '#c77dff', '#ff9f1c']
  return (
    <div className="mg-confetti" aria-hidden="true">
      {pieces.map((i) => (
        <span
          key={i}
          style={{
            left: `${(i * 37) % 100}%`,
            background: colors[i % colors.length],
            animationDelay: `${(i % 7) * 0.06}s`,
            transform: `rotate(${i * 29}deg)`,
          }}
        />
      ))}
    </div>
  )
}

/** Botones grandes de números (para elegir la respuesta). */
export function NumberChoices({
  options,
  api,
  answer,
  prefix = '',
  wrongMsg,
  style = 'pill',
}: {
  options: number[]
  api: RoundApi
  answer: number
  prefix?: string
  wrongMsg?: (n: number) => string | undefined
  /** Forma de los botones: pastilla, globo o engranaje. */
  style?: 'pill' | 'balloon' | 'gear'
}) {
  const [tried, setTried] = useState<number[]>([])
  return (
    <div className={`mg-choices mg-choices--${style}`} role="group" aria-label="Opciones">
      {options.map((n) => {
        const isRight = api.solved && n === answer
        const isTried = tried.includes(n)
        return (
          <button
            key={n}
            type="button"
            className={`mg-choice${isRight ? ' is-right' : ''}${isTried ? ' is-tried' : ''}`}
            disabled={api.solved || isTried}
            onClick={() => {
              if (n === answer) api.correct()
              else {
                setTried((t) => [...t, n])
                api.wrong(wrongMsg?.(n))
              }
            }}
          >
            {prefix}
            {n}
          </button>
        )
      })}
    </div>
  )
}

// ---------- el motor ----------

interface EngineProps<R extends RoundBase> extends GameProps {
  /** Nombre del juego (para el final). */
  title: string
  /** Personaje que acompaña (emoji) en el globo de la consigna. */
  mascot: string
  /** Bienvenida que se dice antes de la primera consigna. */
  intro: string
  /** Arma las rondas (al azar). Se vuelve a llamar en «Jugar otra vez». */
  makeRounds: () => R[]
  /** Dibuja la escena y los controles de una ronda. */
  renderRound: (round: R, api: RoundApi) => ReactNode
  /** Clase de tema del juego (colores de fondo, etc). */
  theme: string
}

type Status = 'playing' | 'wrong' | 'right'

export function GameEngine<R extends RoundBase>({
  title,
  mascot,
  intro,
  makeRounds,
  renderRound,
  theme,
  childName,
  storageKey,
  onExit,
}: EngineProps<R>) {
  const [rounds, setRounds] = useState<R[]>(() => makeRounds())
  const [index, setIndex] = useState(0)
  const [status, setStatus] = useState<Status>('playing')
  const [message, setMessage] = useState('')
  const [mistakes, setMistakes] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [stars, setStars] = useState<boolean[]>([])
  const [finished, setFinished] = useState(false)
  // Para que la bienvenida se diga una sola vez por partida.
  const introDone = useRef(false)

  const round = rounds[index]
  const promptSpeech = round ? round.speech ?? round.prompt : ''

  // Leer la consigna al empezar cada ronda (si el navegador lo permite).
  useEffect(() => {
    if (finished || !round) return
    const t = setTimeout(() => {
      if (!introDone.current) {
        introDone.current = true
        say([intro, promptSpeech])
      } else {
        say(promptSpeech)
      }
    }, 250)
    return () => clearTimeout(t)
    // Solo al cambiar de ronda o de partida.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round?.id, finished])

  // Al salir del juego, callar la voz.
  useEffect(() => () => hush(), [])

  const correct = useCallback(() => {
    if (status === 'right') return
    const msg = `${praise(childName)} ${round.explain}`
    setStatus('right')
    setMessage(msg)
    setStars((s) => {
      const next = [...s]
      next[index] = mistakes === 0
      return next
    })
    say(msg)
  }, [status, childName, round, index, mistakes])

  const wrong = useCallback(
    (msg?: string) => {
      if (status === 'right') return
      const text = msg ?? retry()
      const n = mistakes + 1
      setMistakes(n)
      setStatus('wrong')
      // A la segunda equivocación, la pista aparece sola.
      if (n >= 2) {
        setShowHint(true)
        setMessage(`${text} Pista: ${round.hint}`)
        say([text, `Una pista: ${round.hint}`])
      } else {
        setMessage(text)
        say(text)
      }
    },
    [status, mistakes, round],
  )

  const tell = useCallback((msg: string) => {
    setMessage(msg)
    say(msg)
  }, [])

  function next() {
    if (index + 1 >= rounds.length) {
      const earned = stars.filter(Boolean).length
      saveBest(storageKey, { stars: earned, total: rounds.length })
      setFinished(true)
      const who = childName ? `, ${childName}` : ''
      say(
        earned > 0
          ? `¡Terminaste${who}! Ganaste ${earned} ${earned === 1 ? 'estrella' : 'estrellas'} de ${rounds.length}. ¡Muy bien!`
          : `¡Terminaste${who}! Muy bien que llegaste al final. Jugá otra vez para ganar estrellas.`,
      )
      return
    }
    setIndex(index + 1)
    setStatus('playing')
    setMessage('')
    setMistakes(0)
    setShowHint(false)
  }

  function playAgain() {
    introDone.current = true
    setRounds(makeRounds())
    setIndex(0)
    setStatus('playing')
    setMessage('')
    setMistakes(0)
    setShowHint(false)
    setStars([])
    setFinished(false)
  }

  if (finished) {
    const earned = stars.filter(Boolean).length
    const endText =
      earned > 0
        ? `¡Terminaste${childName ? `, ${childName}` : ''}! Ganaste ${earned} ${earned === 1 ? 'estrella' : 'estrellas'} de ${rounds.length}.`
        : `¡Terminaste${childName ? `, ${childName}` : ''}! Jugá otra vez para ganar estrellas.`
    return (
      <div className={`mg ${theme}`}>
        <div className="mg-end">
          <Confetti />
          <div className="mg-end__trophy" aria-hidden="true">🏆</div>
          <p className="mg-end__sub">{title}</p>
          <h2 className="mg-end__title">
            {endText} <Megaphone text={endText} />
          </h2>
          <div className="mg-end__stars" aria-label={`${earned} estrellas de ${rounds.length}`}>
            {rounds.map((r, i) => (
              <span key={r.id} className={stars[i] ? 'is-on' : ''} aria-hidden="true">
                ⭐
              </span>
            ))}
          </div>
          <p className="mg-end__sub">Las estrellas son por acertar al primer intento.</p>
          <div className="mg-end__actions">
            <button type="button" className="mg-btn mg-btn--go" onClick={playAgain}>
              🔄 Jugar otra vez
            </button>
            <button type="button" className="mg-btn" onClick={onExit}>
              🎮 Elegir otro juego
            </button>
          </div>
        </div>
      </div>
    )
  }

  const api: RoundApi = { solved: status === 'right', correct, wrong, tell }

  return (
    <div className={`mg ${theme}`}>
      <div className="mg-progress" aria-label={`Ronda ${index + 1} de ${rounds.length}`}>
        {rounds.map((r, i) => (
          <span
            key={r.id}
            className={`mg-dot${i === index ? ' is-current' : ''}${i < index || (i === index && status === 'right') ? (stars[i] ? ' is-star' : ' is-done') : ''}`}
            aria-hidden="true"
          >
            {i < index || (i === index && status === 'right') ? (stars[i] ? '⭐' : '✔') : i + 1}
          </span>
        ))}
      </div>

      <div className="mg-prompt">
        <span className="mg-prompt__mascot" aria-hidden="true">
          {mascot}
        </span>
        <p className="mg-prompt__text">{round.prompt}</p>
        <Megaphone text={promptSpeech} label="Escuchar la consigna" />
      </div>

      {/* key: cada ronda arranca su escena de cero */}
      <div className="mg-stage" key={round.id}>
        {renderRound(round, api)}
      </div>

      <div className="mg-footer">
        {message ? (
          <div
            className={`mg-msg${status === 'right' ? ' is-right' : status === 'wrong' ? ' is-wrong' : ''}`}
            role="status"
          >
            <span aria-hidden="true">{status === 'right' ? '🎉' : status === 'wrong' ? '🤔' : '💬'}</span>
            <span className="mg-msg__text">{message}</span>
            <Megaphone text={message} label="Escuchar el mensaje" />
          </div>
        ) : showHint ? null : (
          <span className="mg-footer__spacer" />
        )}
        {showHint && status !== 'right' && !message.includes(round.hint) && (
          <div className="mg-msg is-hint" role="status">
            <span aria-hidden="true">💡</span>
            <span className="mg-msg__text">{round.hint}</span>
            <Megaphone text={round.hint} label="Escuchar la pista" />
          </div>
        )}
        <div className="mg-footer__actions">
          {status !== 'right' && !showHint && (
            <button
              type="button"
              className="mg-btn mg-btn--hint"
              onClick={() => {
                setShowHint(true)
                say(`Una pista: ${round.hint}`)
              }}
            >
              💡 Pista
            </button>
          )}
          {status === 'right' && (
            <button type="button" className="mg-btn mg-btn--go mg-btn--big" onClick={next}>
              {index + 1 >= rounds.length ? '🏁 Terminar' : 'Seguir ➡️'}
            </button>
          )}
        </div>
      </div>

      {status === 'right' && <Confetti key={`c-${round.id}`} />}
    </div>
  )
}
