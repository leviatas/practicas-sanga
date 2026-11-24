import {
  GameEngine,
  NumberChoices,
  numberOptions,
  randInt,
  shuffle,
  type GameProps,
  type RoundApi,
  type RoundBase,
} from './engine'

// ============================================================================
// LA FÁBRICA DE SUMAS — usar cálculos conocidos para resolver otros.
//
// El robot Rulo tiene una "cuenta que ya sabemos" (la tarjeta dorada) y por la
// cinta llega una cuenta nueva. Hay que darse cuenta de qué tienen que ver:
//  · doble más uno:       4 + 4 = 8   →  4 + 5 = 9
//  · doble menos uno:     6 + 6 = 12  →  6 + 5 = 11
//  · amigos del 10 más 1: 7 + 3 = 10  →  7 + 4 = 11
//  · dado vuelta:         2 + 7 = 9   →  7 + 2 = 9
//  · con decenas:         3 + 4 = 7   →  30 + 40 = 70
//  · diez más:            5 + 3 = 8   →  15 + 3 = 18
// ============================================================================

type Strategy = 'double-plus' | 'double-minus' | 'ten-plus' | 'swap' | 'tens' | 'teen'

interface FabricaRound extends RoundBase {
  strategy: Strategy
  /** Cuenta conocida: a + b = a+b */
  known: [number, number]
  /** Cuenta nueva: c + d = ? */
  ask: [number, number]
  answer: number
  options: number[]
}

function build(strategy: Strategy, i: number): FabricaRound {
  let known: [number, number]
  let ask: [number, number]
  let why: string
  let hint: string
  switch (strategy) {
    case 'double-plus': {
      const a = randInt(2, 6)
      known = [a, a]
      ask = [a, a + 1]
      why = `${a} + ${a + 1} es uno más que ${a} + ${a}.`
      hint = `${a + 1} es uno más que ${a}. Entonces el resultado también es uno más.`
      break
    }
    case 'double-minus': {
      const a = randInt(3, 7)
      known = [a, a]
      ask = [a, a - 1]
      why = `${a} + ${a - 1} es uno menos que ${a} + ${a}.`
      hint = `${a - 1} es uno menos que ${a}. Entonces el resultado también es uno menos.`
      break
    }
    case 'ten-plus': {
      const a = randInt(2, 8)
      known = [a, 10 - a]
      ask = [a, 11 - a]
      why = `${a} + ${10 - a} es 10, y ${a} + ${11 - a} es uno más.`
      hint = `${11 - a} es uno más que ${10 - a}. Entonces el resultado es uno más que 10.`
      break
    }
    case 'swap': {
      const a = randInt(1, 4)
      const b = randInt(5, 9)
      known = [a, b]
      ask = [b, a]
      why = `Son los mismos números dados vuelta, así que da lo mismo.`
      hint = 'Mirá bien: ¡son los mismos números, pero cambiados de lugar!'
      break
    }
    case 'tens': {
      const a = randInt(1, 5)
      const b = randInt(1, 9 - a)
      known = [a, b]
      ask = [a * 10, b * 10]
      why = `${a} decenas más ${b} decenas son ${a + b} decenas: ${(a + b) * 10}.`
      hint = `Es como ${a} + ${b}, pero con dieces. ${a} + ${b} = ${a + b}, entonces...`
      break
    }
    case 'teen': {
      const a = randInt(1, 6)
      const b = randInt(1, 9 - a)
      known = [a, b]
      ask = [10 + a, b]
      why = `${10 + a} es 10 más que ${a}, así que el resultado es 10 más que ${a + b}.`
      hint = `${10 + a} es 10 + ${a}. Sumale 10 a ${a + b}.`
      break
    }
  }
  const knownSum = known[0] + known[1]
  const answer = ask[0] + ask[1]
  const distractors =
    strategy === 'tens'
      ? [knownSum, answer + 10, answer - 10]
      : strategy === 'teen'
        ? [knownSum, answer + 1, answer - 1, answer + 10]
        : [knownSum, answer + 1, answer - 1, answer + 2]
  return {
    id: `f${i}-${strategy}`,
    strategy,
    known,
    ask,
    answer,
    options: numberOptions(answer, distractors, 3, 1),
    prompt: `Ya sabemos que ${known[0]} + ${known[1]} = ${knownSum}. Entonces, ¿cuánto es ${ask[0]} + ${ask[1]}?`,
    hint,
    explain: `${why} ${ask[0]} + ${ask[1]} = ${answer}.`,
  }
}

function makeRounds(): FabricaRound[] {
  const order: Strategy[] = shuffle(['double-plus', 'double-minus', 'ten-plus', 'swap', 'tens', 'teen'])
  return order.map(build)
}

const ROBOT_SAYS = ['¡Bip bup!', '¡Bip!', '¡Brrr!']

function renderRound(round: FabricaRound, api: RoundApi) {
  const knownSum = round.known[0] + round.known[1]
  return (
    <div className="fb-scene">
      <div className="fb-machine" aria-hidden="true">
        <span className="fb-robot">🤖</span>
        <span className="fb-gear fb-gear--a">⚙️</span>
        <span className="fb-gear fb-gear--b">⚙️</span>
        <span className="fb-robot__says">{ROBOT_SAYS[round.id.length % ROBOT_SAYS.length]}</span>
      </div>
      <div className="fb-cards">
        <div className="fb-card fb-card--known">
          <span className="fb-card__label">Ya lo sabemos</span>
          <span className="fb-card__calc">
            {round.known[0]} + {round.known[1]} = {knownSum}
          </span>
        </div>
        <span className="fb-arrow" aria-hidden="true">➜</span>
        <div className={`fb-card fb-card--new${api.solved ? ' is-done' : ''}`}>
          <span className="fb-card__label">Cuenta nueva</span>
          <span className="fb-card__calc">
            {round.ask[0]} + {round.ask[1]} = <span className="a10-eq__box">{api.solved ? round.answer : '?'}</span>
          </span>
        </div>
      </div>
      <div className="fb-belt" aria-hidden="true" />
      <NumberChoices options={round.options} answer={round.answer} api={api} style="gear" />
    </div>
  )
}

export default function FabricaDeSumas(props: GameProps) {
  return (
    <GameEngine
      {...props}
      title="La fábrica de sumas"
      mascot="🤖"
      intro="¡Hola! Soy Rulo, el robot de la fábrica. Con una cuenta que ya sabés, podés resolver otra sin contar todo de nuevo."
      theme="mg--fabrica"
      makeRounds={makeRounds}
      renderRound={renderRound}
    />
  )
}
