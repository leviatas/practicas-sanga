import { useState } from 'react'
import {
  GameEngine,
  NumberChoices,
  distinct,
  numberOptions,
  pick,
  shuffle,
  type GameProps,
  type RoundApi,
  type RoundBase,
} from './engine'

// ============================================================================
// LOS GEMELOS — sumas de números iguales (dobles).
//
// Los gemelos Tomi y Santi tienen siempre lo mismo. Rondas:
//  · la vaquita de San Antonio: copiar en el ala derecha los puntitos del ala
//    izquierda y después contar cuántos hay en total;
//  · los gemelos tienen 4 caramelos cada uno: ¿cuántos entre los dos?;
//  · 3 + 3 = □;
//  · ¿qué gemelos suman 8? (elegir la cuenta de dobles).
// ============================================================================

interface Thing {
  emoji: string
  one: string
  many: string
}

const THINGS: Thing[] = [
  { emoji: '🍬', one: 'caramelo', many: 'caramelos' },
  { emoji: '⚽', one: 'pelota', many: 'pelotas' },
  { emoji: '🍎', one: 'manzana', many: 'manzanas' },
  { emoji: '🧸', one: 'osito', many: 'ositos' },
  { emoji: '🖍️', one: 'crayón', many: 'crayones' },
  { emoji: '🎈', one: 'globo', many: 'globos' },
]

type GemelosRound = RoundBase &
  (
    | { kind: 'ladybug'; n: number; options: number[] }
    | { kind: 'twins'; n: number; thing: Thing; options: number[] }
    | { kind: 'calc'; n: number; options: number[] }
    | { kind: 'which'; n: number; options: number[] }
  )

function makeRounds(): GemelosRound[] {
  const small = distinct(2, 1, 5) // para la vaquita (hasta 5 por ala)
  const big = distinct(4, 2, 10)
  const things = shuffle(THINGS)
  const sumOpts = (n: number) => numberOptions(2 * n, [2 * n + 1, 2 * n - 1, n, 2 * n + 2], 3, 1)
  const explain = (n: number) => `${n} + ${n} = ${2 * n}.`
  const rounds: GemelosRound[] = [
    {
      id: 'lady0',
      kind: 'ladybug',
      n: small[0],
      options: sumOpts(small[0]),
      prompt: `La vaquita tiene ${small[0]} ${small[0] === 1 ? 'puntito' : 'puntitos'} en un ala. Tocá el ala vacía para ponerle los mismos.`,
      hint: 'Las dos alas tienen que quedar iguales, como gemelas. Contá los puntitos del ala que ya está pintada.',
      explain: `Las dos alas tienen ${small[0]}. ${explain(small[0])}`,
    },
    {
      id: 'twins0',
      kind: 'twins',
      n: big[0],
      thing: things[0],
      options: sumOpts(big[0]),
      prompt: `Los gemelos Tomi y Santi tienen ${big[0]} ${things[0].many} cada uno. ¿Cuántos ${things[0].many} tienen entre los dos?`,
      hint: `Es una suma de iguales: ${big[0]} + ${big[0]}.`,
      explain: explain(big[0]),
    },
    {
      id: 'calc0',
      kind: 'calc',
      n: big[1],
      options: sumOpts(big[1]),
      prompt: `¿Cuánto es ${big[1]} + ${big[1]}?`,
      hint: `Podés mostrar ${big[1]} dedos, y otros ${big[1]} más, y contar todo.`,
      explain: explain(big[1]),
    },
    {
      id: 'which0',
      kind: 'which',
      n: big[2],
      options: numberOptions(big[2], [big[2] - 1, big[2] + 1, big[2] + 2, big[2] - 2], 3, 1),
      prompt: `¿Qué gemelos suman ${2 * big[2]}? Tocá la cuenta correcta.`,
      hint: `Buscá el número que sumado con él mismo da ${2 * big[2]}.`,
      explain: explain(big[2]),
    },
    {
      id: 'lady1',
      kind: 'ladybug',
      n: small[1],
      options: sumOpts(small[1]),
      prompt: `Esta vaquita tiene ${small[1]} ${small[1] === 1 ? 'puntito' : 'puntitos'} en un ala. Tocá el ala vacía para ponerle los mismos.`,
      hint: 'Las dos alas tienen que quedar iguales. Contá los puntitos del ala pintada.',
      explain: `Las dos alas tienen ${small[1]}. ${explain(small[1])}`,
    },
    {
      id: 'twins1',
      kind: 'twins',
      n: big[3],
      thing: things[1],
      options: sumOpts(big[3]),
      prompt: `Tomi tiene ${big[3]} ${big[3] === 1 ? things[1].one : things[1].many} y Santi tiene la misma cantidad. ¿Cuántos hay en total?`,
      hint: `Santi tiene lo mismo que Tomi: ${big[3]} + ${big[3]}.`,
      explain: explain(big[3]),
    },
  ]
  return rounds
}

/** Las 6 posiciones de puntitos de cada ala (en %). */
const SPOTS = [
  { x: 35, y: 25 },
  { x: 65, y: 30 },
  { x: 40, y: 50 },
  { x: 70, y: 55 },
  { x: 45, y: 76 },
  { x: 72, y: 80 },
]

function Ladybug({ round, api }: { round: Extract<GemelosRound, { kind: 'ladybug' }>; api: RoundApi }) {
  const [dots, setDots] = useState<Set<number>>(new Set())
  const [mirrored, setMirrored] = useState(false)

  function toggle(i: number) {
    if (mirrored) return
    setDots((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  function check() {
    if (dots.size === round.n) {
      setMirrored(true)
      api.tell(`¡Muy bien, quedaron iguales! Ahora contá: ¿cuántos puntitos hay en total? ${round.n} + ${round.n}.`)
    } else if (dots.size > round.n) {
      api.wrong(`Pusiste ${dots.size}, y el otro ala tiene ${round.n}. Sacá alguno.`)
    } else {
      api.wrong(`Pusiste ${dots.size}, y el otro ala tiene ${round.n}. Te faltan.`)
    }
  }

  return (
    <div className="gm-scene">
      <div className="gm-bug" aria-label={`Vaquita con ${round.n} puntitos en el ala izquierda y ${dots.size} en la derecha`}>
        <span className="gm-bug__head" aria-hidden="true" />
        <div className="gm-wing gm-wing--left">
          {SPOTS.slice(0, round.n).map((s, i) => (
            <span key={i} className="gm-spot" style={{ left: `${100 - s.x}%`, top: `${s.y}%` }} />
          ))}
        </div>
        <div className="gm-wing gm-wing--right" role="group" aria-label="Ala para completar">
          {SPOTS.map((s, i) => (
            <button
              key={i}
              type="button"
              className={`gm-spot-btn${dots.has(i) ? ' is-on' : ''}`}
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
              disabled={mirrored || api.solved}
              onClick={() => toggle(i)}
              aria-label={dots.has(i) ? 'Sacar puntito' : 'Poner puntito'}
            />
          ))}
        </div>
      </div>
      <p className="a10-eq">
        {round.n} + <span className="a10-eq__box">{dots.size}</span>
        {mirrored && <> = <span className="a10-eq__box">{api.solved ? 2 * round.n : '?'}</span></>}
      </p>
      {!mirrored ? (
        <button type="button" className="mg-btn mg-btn--go" onClick={check}>
          ✅ ¡Listo!
        </button>
      ) : (
        <NumberChoices options={round.options} answer={2 * round.n} api={api} />
      )}
    </div>
  )
}

function Twins({ n, thing }: { n: number; thing: Thing }) {
  const pile = (
    <span className="gm-pile">
      {Array.from({ length: n }, (_, i) => (
        <span key={i}>{thing.emoji}</span>
      ))}
    </span>
  )
  return (
    <div className="gm-twins" aria-hidden="true">
      <div className="gm-twin">
        <span className="gm-twin__face">👦</span>
        <span className="gm-twin__name">Tomi</span>
        {pile}
      </div>
      <div className="gm-twin">
        <span className="gm-twin__face">👦</span>
        <span className="gm-twin__name">Santi</span>
        {pile}
      </div>
    </div>
  )
}

function renderRound(round: GemelosRound, api: RoundApi) {
  switch (round.kind) {
    case 'ladybug':
      return <Ladybug round={round} api={api} />
    case 'twins':
      return (
        <div className="gm-scene">
          <Twins n={round.n} thing={round.thing} />
          <p className="a10-eq">
            {round.n} + {round.n} = <span className="a10-eq__box">{api.solved ? 2 * round.n : '?'}</span>
          </p>
          <NumberChoices options={round.options} answer={2 * round.n} api={api} />
        </div>
      )
    case 'calc':
      return (
        <div className="gm-scene">
          <div className="gm-twins gm-twins--small" aria-hidden="true">
            <span className="gm-twin__face">👦</span>
            <span className="gm-twin__face">👦</span>
          </div>
          <p className="a10-eq a10-eq--big">
            {round.n} + {round.n} = <span className="a10-eq__box">{api.solved ? 2 * round.n : '?'}</span>
          </p>
          <NumberChoices options={round.options} answer={2 * round.n} api={api} />
        </div>
      )
    case 'which':
      return (
        <div className="gm-scene">
          <div className="gm-twins gm-twins--small" aria-hidden="true">
            <span className="gm-twin__face">👦</span>
            <span className="gm-target">{2 * round.n}</span>
            <span className="gm-twin__face">👦</span>
          </div>
          <div className="mg-choices mg-choices--pill" role="group" aria-label="Opciones">
            {round.options.map((k) => (
              <WhichButton key={k} k={k} round={round} api={api} />
            ))}
          </div>
        </div>
      )
  }
}

function WhichButton({ k, round, api }: { k: number; round: Extract<GemelosRound, { kind: 'which' }>; api: RoundApi }) {
  const [tried, setTried] = useState(false)
  return (
    <button
      type="button"
      className={`mg-choice mg-choice--wide${api.solved && k === round.n ? ' is-right' : ''}${tried ? ' is-tried' : ''}`}
      disabled={api.solved || tried}
      onClick={() => {
        if (k === round.n) api.correct()
        else {
          setTried(true)
          api.wrong(`${k} + ${k} = ${2 * k}, no ${2 * round.n}.`)
        }
      }}
    >
      {k} + {k}
    </button>
  )
}

export default function Gemelos(props: GameProps) {
  return (
    <GameEngine
      {...props}
      title="Los gemelos"
      mascot="👦"
      intro={pick([
        '¡Hola! Somos Tomi y Santi, los gemelos. Siempre tenemos lo mismo.',
        '¡Hola! Somos los gemelos Tomi y Santi. Vamos a sumar números iguales.',
      ])}
      theme="mg--gemelos"
      makeRounds={makeRounds}
      renderRound={renderRound}
    />
  )
}
