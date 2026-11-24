import { useState } from 'react'
import {
  GameEngine,
  NumberChoices,
  distinct,
  numberOptions,
  type GameProps,
  type RoundApi,
  type RoundBase,
} from './engine'

// ============================================================================
// LOS AMIGOS DEL 10 — completar sumas para llegar a 10.
//
// La rana Pipa y la tortuga Tota son "amigos del 10": juntos siempre suman
// 10. Rondas:
//  · el cartón del 10 (dos filas de 5): hay algunas fichas y el chico toca los
//    lugares vacíos para completar;
//  · ¿quién es el amigo del 7? (elegir un globo);
//  · □ + 4 = 10 (el que falta va primero).
// ============================================================================

type AmigosRound = RoundBase &
  (
    | { kind: 'frame'; n: number }
    | { kind: 'friend'; n: number; options: number[] }
    | { kind: 'first'; n: number; options: number[] }
  )

function makeRounds(): AmigosRound[] {
  // Seis números distintos del 1 al 9.
  const ns = distinct(6, 1, 9)
  const kinds: AmigosRound['kind'][] = ['frame', 'friend', 'frame', 'first', 'friend', 'frame']
  return kinds.map((kind, i) => {
    const n = ns[i]
    const answer = 10 - n
    const base = {
      id: `${kind}${i}`,
      explain: `${n} + ${answer} = 10. ¡${n} y ${answer} son amigos del 10!`,
    }
    const opts = numberOptions(answer, [answer + 1, answer - 1, n, answer + 2], 3, 1)
    switch (kind) {
      case 'frame':
        return {
          ...base,
          kind,
          n,
          prompt: `En el cartón hay ${n} ${n === 1 ? 'ficha' : 'fichas'}. Tocá los lugares vacíos hasta llenarlo y llegar a 10.`,
          hint: 'Contá los lugares vacíos: cada uno es una ficha que falta.',
        }
      case 'friend':
        return {
          ...base,
          kind,
          n,
          options: opts,
          prompt: `¿Quién es el amigo del ${n}? ¿Cuánto le falta al ${n} para llegar a 10?`,
          hint: `Contá con los dedos desde ${n} hasta 10.`,
        }
      default:
        return {
          ...base,
          kind: 'first' as const,
          n,
          options: opts,
          prompt: `¿Qué número sumado con ${n} da 10? □ + ${n} = 10`,
          speech: `¿Qué número sumado con ${n} da 10?`,
          hint: `Pensá: ¿cuánto le falta al ${n} para llegar a 10?`,
        }
    }
  })
}

/** Los dos amigos con sus carteles. */
function Friends({ left, right }: { left: string; right: string }) {
  return (
    <div className="a10-friends" aria-hidden="true">
      <span className="a10-friend">
        <span className="a10-friend__face">🐸</span>
        <span className="a10-friend__sign">{left}</span>
      </span>
      <span className="a10-heart">🤝</span>
      <span className="a10-friend">
        <span className="a10-friend__face">🐢</span>
        <span className="a10-friend__sign">{right}</span>
      </span>
      <span className="a10-ten">= 10</span>
    </div>
  )
}

/** Cartón del 10: dos filas de 5. */
function FrameRound({ round, api }: { round: Extract<AmigosRound, { kind: 'frame' }>; api: RoundApi }) {
  const [added, setAdded] = useState<Set<number>>(new Set())
  const count = added.size

  function toggle(i: number) {
    setAdded((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  function check() {
    const total = round.n + count
    if (total === 10) api.correct()
    else if (total > 10) api.wrong('¡Te pasaste de 10!')
    else api.wrong(`Todavía hay lugares vacíos. Tenés ${total}, y queremos llegar a 10.`)
  }

  return (
    <div className="a10-scene">
      <Friends left={String(round.n)} right={count ? String(count) : '?'} />
      <div className="a10-frame" role="group" aria-label="Cartón del 10">
        {Array.from({ length: 10 }, (_, i) => {
          const fixed = i < round.n
          const on = added.has(i)
          return (
            <button
              key={i}
              type="button"
              className={`a10-cell${fixed ? ' is-fixed' : ''}${on ? ' is-on' : ''}`}
              disabled={fixed || api.solved}
              onClick={() => toggle(i)}
              aria-label={fixed ? 'Ficha roja' : on ? 'Ficha azul, tocá para sacarla' : 'Lugar vacío'}
            >
              {(fixed || on) && <span className="a10-chip" aria-hidden="true" />}
            </button>
          )
        })}
      </div>
      <p className="a10-eq" aria-live="polite">
        {round.n} + <span className="a10-eq__box">{count}</span> = {round.n + count}
      </p>
      <button type="button" className="mg-btn mg-btn--go" disabled={api.solved} onClick={check}>
        ✅ ¡Listo!
      </button>
    </div>
  )
}

function renderRound(round: AmigosRound, api: RoundApi) {
  if (round.kind === 'frame') return <FrameRound round={round} api={api} />
  const answer = 10 - round.n
  return (
    <div className="a10-scene">
      {round.kind === 'friend' ? (
        <Friends left={String(round.n)} right={api.solved ? String(answer) : '?'} />
      ) : (
        <Friends left={api.solved ? String(answer) : '?'} right={String(round.n)} />
      )}
      <p className="a10-eq">
        {round.kind === 'friend' ? (
          <>
            {round.n} + <span className="a10-eq__box">{api.solved ? answer : '?'}</span> = 10
          </>
        ) : (
          <>
            <span className="a10-eq__box">{api.solved ? answer : '?'}</span> + {round.n} = 10
          </>
        )}
      </p>
      <NumberChoices
        options={round.options}
        answer={answer}
        api={api}
        style="balloon"
        wrongMsg={(x) =>
          round.n + x > 10
            ? `${round.n} + ${x} = ${round.n + x}. Te pasaste de 10.`
            : `${round.n} + ${x} = ${round.n + x}. No llega a 10.`
        }
      />
    </div>
  )
}

export default function AmigosDel10(props: GameProps) {
  return (
    <GameEngine
      {...props}
      title="Los amigos del 10"
      mascot="🐸"
      intro="¡Hola! Somos Pipa y Tota, los amigos del 10. Juntos siempre sumamos 10."
      theme="mg--amigos"
      makeRounds={makeRounds}
      renderRound={renderRound}
    />
  )
}
