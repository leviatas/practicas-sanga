import { useState, type ReactNode } from 'react'
import {
  GameEngine,
  NumberChoices,
  numberOptions,
  pick,
  randInt,
  shuffle,
  type GameProps,
  type RoundApi,
  type RoundBase,
} from './engine'

// ============================================================================
// EL KIOSCO — problemas con dinero (suma y resta).
//
// La kiosquera Tina atiende y propone problemas de la vida diaria:
//  · pagar justo: tocar billetes y monedas hasta juntar el precio;
//  · cuánto pago por dos cosas (suma);
//  · cuánto me queda / el vuelto (resta);
//  · ¿me alcanza? (comparar);
//  · cuánto me falta (completar).
// ============================================================================

interface Item {
  emoji: string
  /** Con artículo, ej: «un chupetín». */
  name: string
}

const ITEMS: Item[] = [
  { emoji: '🍭', name: 'un chupetín' },
  { emoji: '🍫', name: 'un chocolate' },
  { emoji: '🧃', name: 'un jugo' },
  { emoji: '🍬', name: 'un caramelo' },
  { emoji: '🍪', name: 'un paquete de galletitas' },
  { emoji: '🍦', name: 'un helado' },
  { emoji: '🎈', name: 'un globo' },
  { emoji: '🧁', name: 'una magdalena' },
  { emoji: '🥤', name: 'una gaseosa' },
  { emoji: '🍩', name: 'una dona' },
]

type KioscoRound = RoundBase &
  (
    | { kind: 'pay'; item: Item; price: number }
    | { kind: 'two'; a: Item; b: Item; pa: number; pb: number; options: number[]; answer: number }
    | { kind: 'change'; item: Item; have: number; price: number; options: number[]; answer: number }
    | { kind: 'enough'; item: Item; have: number; price: number; answer: boolean }
    | { kind: 'missing'; item: Item; have: number; price: number; options: number[]; answer: number }
  )

function makeRounds(): KioscoRound[] {
  const items = shuffle(ITEMS)
  let k = 0
  const nextItem = () => items[k++ % items.length]
  const rounds: KioscoRound[] = []

  // 1) Pagar justo (dos veces: una fácil, una con monedas).
  const payPrices = [randInt(2, 5) * 5, randInt(11, 39)]
  payPrices.forEach((price, i) => {
    const item = nextItem()
    rounds.push({
      id: `pay${i}`,
      kind: 'pay',
      item,
      price,
      prompt: `${capital(item.name)} cuesta $${price}. Tocá los billetes y las monedas para pagar justo.`,
      hint:
        price >= 10
          ? `Empezá por los billetes de $10. ${tensHint(price)}`
          : 'Usá las monedas y contá de a una.',
      explain: `Pagaste justo: $${price}.`,
    })
  })

  // 2) Dos cosas: se suma.
  {
    const a = nextItem()
    const b = nextItem()
    const pa = pick([10, 20, 30])
    const pb = pick([5, 10, 15, 20])
    const answer = pa + pb
    rounds.push({
      id: 'two',
      kind: 'two',
      a,
      b,
      pa,
      pb,
      answer,
      options: numberOptions(answer, [pa, pb, answer + 10, answer - 10, answer + 5], 3, 1),
      prompt: `Comprás ${a.name} de $${pa} y ${b.name} de $${pb}. ¿Cuánto pagás por las dos cosas?`,
      hint: 'Comprás las dos cosas: tenés que juntar los dos precios. Se suma.',
      explain: `$${pa} + $${pb} = $${answer}.`,
    })
  }

  // 3) Cuánto me queda: se resta.
  {
    const item = nextItem()
    const have = pick([20, 30, 50])
    const price = pick([5, 10, 20].filter((p) => p < have))
    const answer = have - price
    rounds.push({
      id: 'change',
      kind: 'change',
      item,
      have,
      price,
      answer,
      options: numberOptions(answer, [have + price, price, have, answer + 10], 3, 1),
      prompt: `Tenés $${have} y comprás ${item.name} que cuesta $${price}. ¿Cuánta plata te queda?`,
      hint: 'Si gastás, te queda menos plata. Se resta.',
      explain: `$${have} − $${price} = $${answer}.`,
    })
  }

  // 4) ¿Me alcanza?
  {
    const item = nextItem()
    const price = pick([20, 25, 30, 40])
    const answer = Math.random() < 0.5
    const have = answer ? price + pick([0, 5, 10]) : price - pick([5, 10])
    rounds.push({
      id: 'enough',
      kind: 'enough',
      item,
      have,
      price,
      answer,
      prompt: `Tenés $${have}. ¿Te alcanza para comprar ${item.name} que cuesta $${price}?`,
      hint: `Fijate si $${have} es igual o más que $${price}.`,
      explain: answer
        ? have === price
          ? `Sí, te alcanza justo: tenés $${have} y cuesta $${price}.`
          : `Sí, te alcanza: $${have} es más que $${price}, y te sobran $${have - price}.`
        : `No te alcanza: $${have} es menos que $${price}. Te faltan $${price - have}.`,
    })
  }

  // 5) Cuánto me falta.
  {
    const item = nextItem()
    const price = pick([30, 40, 50, 60])
    const have = price - pick([10, 20])
    const answer = price - have
    rounds.push({
      id: 'missing',
      kind: 'missing',
      item,
      have,
      price,
      answer,
      options: numberOptions(answer, [have, price, answer + 10, answer + 5], 3, 1),
      prompt: `${capital(item.name)} cuesta $${price} y tenés $${have}. ¿Cuánta plata te falta para ${item.name.startsWith('una ') ? 'comprarla' : 'comprarlo'}?`,
      hint: `Contá desde ${have} hasta ${price}. ¿Cuánto tenés que agregar?`,
      explain: `Te faltan $${answer}, porque $${have} + $${answer} = $${price}.`,
    })
  }

  // Orden: pagar, dos cosas, me queda, pagar, alcanza, falta.
  return [rounds[0], rounds[2], rounds[3], rounds[1], rounds[4], rounds[5]]
}

function capital(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function tensHint(price: number): string {
  const tens = Math.floor(price / 10)
  const ones = price % 10
  const t = tens === 1 ? 'un billete de $10' : `${tens} billetes de $10`
  return ones ? `Por ejemplo: ${t} y monedas que sumen ${ones}.` : `Por ejemplo: ${t}.`
}

// ---------- dinero dibujado ----------

const MONEY = [
  { value: 20, kind: 'bill' as const },
  { value: 10, kind: 'bill' as const },
  { value: 5, kind: 'coin' as const },
  { value: 2, kind: 'coin' as const },
  { value: 1, kind: 'coin' as const },
]

function Money({ value, kind, small = false }: { value: number; kind: 'bill' | 'coin'; small?: boolean }) {
  return (
    <span className={`kq-money kq-money--${kind} kq-money--v${value}${small ? ' is-small' : ''}`}>
      ${value}
    </span>
  )
}

function moneyKind(value: number): 'bill' | 'coin' {
  return value >= 10 ? 'bill' : 'coin'
}

// ---------- escena ----------

function Shop({ children }: { children: ReactNode }) {
  return (
    <div className="kq-shop">
      <div className="kq-awning" aria-hidden="true" />
      <div className="kq-sign" aria-hidden="true">KIOSCO</div>
      <div className="kq-inside">
        <span className="kq-seller" aria-hidden="true">👩‍🦱</span>
        <div className="kq-counter">{children}</div>
      </div>
    </div>
  )
}

function PriceTag({ item, price }: { item: Item; price: number }) {
  return (
    <span className="kq-product">
      <span className="kq-product__emoji" aria-hidden="true">{item.emoji}</span>
      <span className="kq-tag">${price}</span>
    </span>
  )
}

function Wallet({ amount }: { amount: number }) {
  return (
    <span className="kq-wallet">
      <span aria-hidden="true">👛</span>
      <span className="kq-wallet__amount">Tenés ${amount}</span>
    </span>
  )
}

/** Pagar justo: tocar billetes y monedas para ponerlos en el mostrador. */
function PayRound({ round, api }: { round: Extract<KioscoRound, { kind: 'pay' }>; api: RoundApi }) {
  const [tray, setTray] = useState<number[]>([])
  const total = tray.reduce((a, b) => a + b, 0)

  function pay() {
    if (total === round.price) api.correct()
    else if (total > round.price)
      api.wrong(`Pusiste $${total} y cuesta $${round.price}. ¡Te pasaste! Tocá la plata del mostrador para sacarla.`)
    else if (total === 0) api.tell('Primero tocá los billetes y las monedas de abajo.')
    else api.wrong(`Pusiste $${total} y cuesta $${round.price}. Te falta plata.`)
  }

  return (
    <Shop>
      <PriceTag item={round.item} price={round.price} />
      <div className="kq-tray" aria-label={`En el mostrador hay $${total}`}>
        {tray.length === 0 && <span className="kq-tray__empty">Poné la plata acá</span>}
        {tray.map((v, i) => (
          <button
            key={i}
            type="button"
            className="kq-tray__money"
            disabled={api.solved}
            onClick={() => setTray((t) => t.filter((_, j) => j !== i))}
            aria-label={`Sacar $${v}`}
          >
            <Money value={v} kind={moneyKind(v)} small />
          </button>
        ))}
      </div>
      <div className="kq-total">
        En el mostrador: <strong>${total}</strong>
      </div>
      <div className="kq-purse" role="group" aria-label="Tu plata">
        {MONEY.map((m) => (
          <button
            key={m.value}
            type="button"
            className="kq-purse__btn"
            disabled={api.solved}
            onClick={() => setTray((t) => [...t, m.value])}
            aria-label={`Poner $${m.value}`}
          >
            <Money value={m.value} kind={m.kind} />
          </button>
        ))}
      </div>
      <button type="button" className="mg-btn mg-btn--go" disabled={api.solved} onClick={pay}>
        🛒 ¡Pagar!
      </button>
    </Shop>
  )
}

/** Sí / No (¿me alcanza?). La opción equivocada queda marcada. */
function YesNo({ answer, api }: { answer: boolean; api: RoundApi }) {
  const [tried, setTried] = useState<boolean | null>(null)
  return (
    <div className="mg-choices mg-choices--pill" role="group" aria-label="Opciones">
      {[true, false].map((yes) => (
        <button
          key={String(yes)}
          type="button"
          className={`mg-choice mg-choice--wide${api.solved && yes === answer ? ' is-right' : ''}${tried === yes ? ' is-tried' : ''}`}
          disabled={api.solved || tried === yes}
          onClick={() => {
            if (yes === answer) api.correct()
            else {
              setTried(yes)
              api.wrong()
            }
          }}
        >
          {yes ? '👍 Sí, me alcanza' : '👎 No me alcanza'}
        </button>
      ))}
    </div>
  )
}

function renderRound(round: KioscoRound, api: RoundApi) {
  switch (round.kind) {
    case 'pay':
      return <PayRound round={round} api={api} />
    case 'two':
      return (
        <Shop>
          <div className="kq-products">
            <PriceTag item={round.a} price={round.pa} />
            <span className="kq-plus" aria-hidden="true">+</span>
            <PriceTag item={round.b} price={round.pb} />
          </div>
          <NumberChoices options={round.options} answer={round.answer} api={api} prefix="$" />
        </Shop>
      )
    case 'change':
    case 'missing':
      return (
        <Shop>
          <div className="kq-products">
            <Wallet amount={round.have} />
            <PriceTag item={round.item} price={round.price} />
          </div>
          <NumberChoices options={round.options} answer={round.answer} api={api} prefix="$" />
        </Shop>
      )
    case 'enough':
      return (
        <Shop>
          <div className="kq-products">
            <Wallet amount={round.have} />
            <PriceTag item={round.item} price={round.price} />
          </div>
          <YesNo answer={round.answer} api={api} />
        </Shop>
      )
  }
}

export default function Kiosco(props: GameProps) {
  return (
    <GameEngine
      {...props}
      title="El kiosco"
      mascot="👩‍🦱"
      intro="¡Hola! Soy Tina, la kiosquera. Vamos a comprar y a pagar."
      theme="mg--kiosco"
      makeRounds={makeRounds}
      renderRound={renderRound}
    />
  )
}
