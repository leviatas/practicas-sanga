import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { gameLevels, level1Exercises, LEVEL1_PROMPT } from '../data/game'
import { loadGameStars, saveGameStars } from '../lib/gameProgress'
import { speak } from '../lib/speak'
import Monster from '../components/Monster'

// Nivel 1 del juego: "¿Con qué sonido empieza esta palabra?".
// Se muestra un dibujo y, debajo, tres botones con una letra cada uno; hay
// que tocar la inicial de la palabra. Si acierta, festeja y pasa solo al
// siguiente; si no, la letra se pone roja y puede volver a intentar. Al
// terminar los cinco, da estrellas según cuántos acertó al primer intento.

// Fondo suave de campo con un lago, para que el ejercicio se lea bien.
function FieldBackground() {
  return (
    <svg
      className="level-bg"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bfe7ff" />
          <stop offset="1" stopColor="#eaf7ff" />
        </linearGradient>
        <linearGradient id="lake" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fd6f5" />
          <stop offset="1" stopColor="#4fb3e6" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#sky)" />
      <circle cx="680" cy="90" r="46" fill="#ffe27a" />
      <g fill="#fff" opacity="0.9">
        <ellipse cx="150" cy="110" rx="60" ry="22" />
        <ellipse cx="190" cy="98" rx="40" ry="20" />
        <ellipse cx="480" cy="70" rx="50" ry="18" />
        <ellipse cx="510" cy="60" rx="30" ry="16" />
      </g>
      <path d="M0 330 Q 200 250 420 320 T 800 300 V 600 H 0 Z" fill="#a8dd86" />
      <path d="M0 400 Q 260 330 520 400 T 800 380 V 600 H 0 Z" fill="#8ccb6a" />
      <ellipse cx="560" cy="500" rx="230" ry="70" fill="url(#lake)" />
      <ellipse cx="560" cy="500" rx="230" ry="70" fill="none" stroke="#6fc1e8" strokeWidth="6" />
      <g fill="#6db354">
        <ellipse cx="120" cy="520" rx="90" ry="26" />
        <ellipse cx="300" cy="570" rx="120" ry="30" />
      </g>
    </svg>
  )
}

const TALK_MS = 1300

export default function GameLevelPage() {
  const { levelId } = useParams()
  const id = Number(levelId)
  const level = gameLevels.find((l) => l.id === id)
  const stars = loadGameStars()
  const unlocked = level?.ready && (id === 1 || (stars[id - 1] ?? 0) > 0)

  if (!level || !unlocked) return <Navigate to="/juego" replace />
  return <Level1 key={id} />
}

function Level1() {
  const exercises = level1Exercises
  const [current, setCurrent] = useState(0)
  // Letra tocada en el ejercicio actual (para pintarla) y si ya acertó.
  const [picked, setPicked] = useState<string | null>(null)
  const [solved, setSolved] = useState(false)
  // Cuántos acertó al primer intento (define las estrellas).
  const [firstTry, setFirstTry] = useState(0)
  const [missed, setMissed] = useState(false)
  const [finished, setFinished] = useState(false)
  // Lo que dice el monstruito en su globo.
  const [says, setSays] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)

  const ex = exercises[current]!
  const total = exercises.length

  useEffect(() => () => window.clearTimeout(timer.current), [])

  function restart() {
    setCurrent(0)
    setPicked(null)
    setSolved(false)
    setFirstTry(0)
    setMissed(false)
    setFinished(false)
    setSays(null)
  }

  function sayWord() {
    speak(ex.word)
  }

  function choose(letter: string) {
    if (solved) return
    setPicked(letter)
    if (letter === ex.answer) {
      setSolved(true)
      setSays('¡MUY BIEN!')
      if (!missed) setFirstTry((n) => n + 1)
      speak(`¡Muy bien! ${ex.word} empieza con ${ex.answer}`)
      timer.current = window.setTimeout(() => {
        if (current + 1 >= total) {
          const got = !missed ? firstTry + 1 : firstTry
          saveGameStars(1, starsFor(got, total))
          setFinished(true)
        } else {
          setCurrent((c) => c + 1)
          setPicked(null)
          setSolved(false)
          setMissed(false)
          setSays(null)
        }
      }, TALK_MS)
    } else {
      setMissed(true)
      setSays('PROBÁ OTRA VEZ')
      speak('Probá otra vez')
    }
  }

  if (finished) {
    const got = starsFor(firstTry, total)
    return (
      <section className="level">
        <FieldBackground />
        <div className="level__card level__card--end">
          <h1 className="level__title">¡NIVEL COMPLETADO!</h1>
          <p className="level__stars" aria-label={`${got} estrellas de 3`}>
            {[1, 2, 3].map((s) => (
              <span key={s} className={s <= got ? 'is-on' : ''}>
                ★
              </span>
            ))}
          </p>
          <p className="level__summary">
            ACERTASTE {firstTry} DE {total} A LA PRIMERA
          </p>
          <div className="level__actions">
            <Link to="/juego" className="btn btn--primary">
              VOLVER AL MAPA 🗺️
            </Link>
            <button type="button" className="btn btn--ghost" onClick={restart}>
              JUGAR DE NUEVO 🔁
            </button>
          </div>
        </div>
        <Monster className="level__monster" />
      </section>
    )
  }

  return (
    <section className="level">
      <FieldBackground />
      <header className="level__top">
        <Link to="/juego" className="btn btn--ghost btn--small">
          ← MAPA
        </Link>
        <span className="level__counter">
          NIVEL 1 · {current + 1} DE {total}
        </span>
      </header>

      <h1 className="level__prompt">
        {LEVEL1_PROMPT}
        <button
          type="button"
          className="game-speak"
          onClick={sayWord}
          aria-label={`Escuchar el nombre del dibujo`}
        >
          🔊 ESCUCHAR
        </button>
      </h1>

      <div className="level__card" key={current}>
        <div className="level__picture" aria-label={ex.word} role="img">
          {ex.emoji}
        </div>
        <div className="level__letters">
          {ex.letters.map((letter) => {
            let state = ''
            if (picked === letter) state = letter === ex.answer ? 'is-correct' : 'is-wrong'
            return (
              <button
                key={letter}
                type="button"
                className={`letter-btn ${state}`}
                onClick={() => choose(letter)}
                disabled={solved}
                aria-label={`Letra ${letter}`}
              >
                {letter}
              </button>
            )
          })}
        </div>
      </div>

      <div className="level__buddy">
        {says && (
          <div className={`game-bubble game-bubble--small ${solved ? 'is-happy' : ''}`} role="status">
            <p className="game-bubble__text">{says}</p>
          </div>
        )}
        <Monster className="level__monster" waving={solved} />
      </div>
    </section>
  )
}

// 5 de 5 a la primera → 3 estrellas; 3 o 4 → 2; menos → 1 (por completarlo).
function starsFor(firstTry: number, total: number): number {
  if (firstTry >= total) return 3
  if (firstTry >= total - 2) return 2
  return 1
}
