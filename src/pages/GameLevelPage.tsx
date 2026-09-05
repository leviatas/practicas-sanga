import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  gameLevels,
  level1Words,
  level2Words,
  LEVEL_PROMPTS,
  ROUND_SIZE,
  soundOf,
  wordBankSize,
} from '../data/game'
import { loadGameStars, saveGameStars } from '../lib/gameProgress'
import { markWordsSeen, pickWords, shuffle } from '../lib/gameDeck'
import { speak } from '../lib/speak'
import Monster from '../components/Monster'

// Los niveles del juego. Los dos comparten el mismo flujo: se muestra un
// dibujo y, debajo, unos botones para elegir.
//   Nivel 1: "¿con qué sonido empieza esta palabra?" → tres letras.
//   Nivel 2: "completá la primera sílaba" → el hueco y el resto de la palabra
//            (____NA) con dos sílabas que se diferencian solo en la inicial.
// Cada uno tiene su propia lista de palabras (ver src/data/game.ts).
// En los dos, al tocar una opción el monstruito nombra lo que apretó con su
// sonido: "Muy bien, apretaste sss" o "Apretaste mmm, probá otra vez". Si
// acierta pasa solo al siguiente; si no, la opción se pone roja y puede volver
// a intentar. Al terminar los cinco, da estrellas según cuántos acertó al
// primer intento.
//
// Cada ronda toma cinco palabras del banco del nivel y, al volver a jugar,
// salen las que todavía no habían tocado (ver src/lib/gameDeck.ts).

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

/** Un ejercicio ya armado: el dibujo, los botones y cuál es el correcto. */
interface Round {
  word: string
  emoji: string
  options: string[]
  answer: string
  /** Nivel 2: lo que queda de la palabra después de la primera sílaba. */
  rest?: string
}

/** Arma los cinco ejercicios de una ronda, con el banco propio del nivel. */
function buildRound(level: number): Round[] {
  if (level === 2) {
    return pickWords(level2Words, ROUND_SIZE, level).map((w) => ({
      word: w.word,
      emoji: w.emoji,
      options: shuffle([w.syllable, w.other]),
      answer: w.syllable,
      rest: w.rest,
    }))
  }
  return pickWords(level1Words, ROUND_SIZE, level).map((w) => ({
    word: w.word,
    emoji: w.emoji,
    options: shuffle(w.letters),
    answer: w.letters[0],
  }))
}

export default function GameLevelPage() {
  const { levelId } = useParams()
  const id = Number(levelId)
  const level = gameLevels.find((l) => l.id === id)
  const stars = loadGameStars()
  const unlocked = level?.ready && (id === 1 || (stars[id - 1] ?? 0) > 0)

  if (!level || !unlocked) return <Navigate to="/juego" replace />
  return <Play key={id} level={id} />
}

function Play({ level }: { level: number }) {
  // Las cinco palabras de esta ronda (se eligen una sola vez al entrar).
  const [rounds, setRounds] = useState<Round[]>(() => buildRound(level))
  const [current, setCurrent] = useState(0)
  // Opción tocada en el ejercicio actual (para pintarla) y si ya acertó.
  const [picked, setPicked] = useState<string | null>(null)
  const [solved, setSolved] = useState(false)
  // Cuántos acertó al primer intento (define las estrellas).
  const [firstTry, setFirstTry] = useState(0)
  const [missed, setMissed] = useState(false)
  const [finished, setFinished] = useState(false)
  // Lo que dice el monstruito: `text` es lo que se lee en el globo (con la
  // letra o sílaba tal cual) y `speech` lo que dice la voz (con su sonido).
  const [says, setSays] = useState<{ text: string; speech: string } | null>(null)
  const timer = useRef<number | undefined>(undefined)

  const prompt = LEVEL_PROMPTS[level] ?? ''
  const ex = rounds[current]!
  const total = rounds.length

  useEffect(() => () => window.clearTimeout(timer.current), [])

  // Anotamos las palabras de esta ronda para que la próxima traiga otras.
  useEffect(() => {
    markWordsSeen(level, rounds.map((r) => r.word), wordBankSize(level))
  }, [level, rounds])

  /** Otra ronda: cinco palabras nuevas del banco. */
  function restart() {
    setRounds(buildRound(level))
    setCurrent(0)
    setPicked(null)
    setSolved(false)
    setFirstTry(0)
    setMissed(false)
    setFinished(false)
    setSays(null)
  }

  // En minúscula, así la voz lee la palabra y no la deletrea.
  function sayWord() {
    speak(ex.word.toLowerCase())
  }

  function choose(option: string) {
    if (solved) return
    setPicked(option)
    // El monstruito nombra siempre lo que apretó, así escucha su sonido.
    const sound = soundOf(option)
    if (option === ex.answer) {
      setSolved(true)
      const speech = `Muy bien, apretaste ${sound}`
      setSays({ text: `MUY BIEN, APRETASTE ${option}`, speech })
      if (!missed) setFirstTry((n) => n + 1)
      speak(speech)
      timer.current = window.setTimeout(() => {
        if (current + 1 >= total) {
          const got = !missed ? firstTry + 1 : firstTry
          saveGameStars(level, starsFor(got, total))
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
      const speech = `Apretaste ${sound}, probá otra vez`
      setSays({ text: `APRETASTE ${option}, PROBÁ OTRA VEZ`, speech })
      speak(speech)
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
          NIVEL {level} · {current + 1} DE {total}
        </span>
      </header>

      {/* La consigna la dice el monstruito en su globo (y también lo que
          comenta al acertar o errar). El altavoz de al lado la lee. */}
      <div className="level__buddy">
        <Monster className="level__monster" waving={solved} />
        <div
          className={`game-bubble game-bubble--side${solved ? ' is-happy' : ''}`}
          role="status"
        >
          <h1 className="game-bubble__text">{says?.text ?? prompt}</h1>
          <button
            type="button"
            className="game-speak game-speak--icon"
            onClick={() => speak(says?.speech ?? prompt)}
            aria-label="Escuchar lo que dice el monstruito"
          >
            🔊
          </button>
        </div>
      </div>

      <div className="level__card" key={current}>
        {/* El dibujo, con su propio altavoz para escuchar qué es. */}
        <div className="level__picture-row">
          <div className="level__picture" aria-label={ex.word} role="img">
            {ex.emoji}
          </div>
          <button
            type="button"
            className="game-speak game-speak--icon"
            onClick={sayWord}
            aria-label="Escuchar el nombre del dibujo"
          >
            🔊
          </button>
        </div>

        {/* Nivel 2: la palabra con la primera sílaba en blanco (____NA). */}
        {ex.rest !== undefined && (
          <p className="level__word">
            <span className={`level__blank${solved ? ' is-filled' : ''}`}>
              {solved ? ex.answer : '____'}
            </span>
            {ex.rest}
          </p>
        )}

        <div className="level__letters">
          {ex.options.map((option) => {
            let state = ''
            if (picked === option) state = option === ex.answer ? 'is-correct' : 'is-wrong'
            return (
              <button
                key={option}
                type="button"
                className={`letter-btn${option.length > 1 ? ' letter-btn--syllable' : ''} ${state}`}
                onClick={() => choose(option)}
                disabled={solved}
                aria-label={option}
              >
                {option}
              </button>
            )
          })}
        </div>
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
