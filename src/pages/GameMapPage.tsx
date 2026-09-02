import { useState } from 'react'
import { Link } from 'react-router-dom'
import { gameLevels, WELCOME } from '../data/game'
import { loadGameStars } from '../lib/gameProgress'
import { speak } from '../lib/speak'
import Monster from '../components/Monster'
import mapImage from '../assets/game/mapa.jpg'

// Pantalla principal del juego "En construcción": el mapa con el camino.
// Cada nivel es un botón sobre el camino (tapa el botón que trae dibujado la
// imagen, en la misma posición). Un nivel se puede jugar si tiene ejercicios
// y el anterior ya está completado; los demás muestran candado.
// Al costado está el personaje con su globo de bienvenida, que se puede
// escuchar con el botón del altavoz.

function isUnlocked(levelId: number, stars: Record<number, number>): boolean {
  if (levelId === 1) return true
  return (stars[levelId - 1] ?? 0) > 0
}

export default function GameMapPage() {
  const [stars] = useState(() => loadGameStars())
  const [speaking, setSpeaking] = useState(false)

  function sayWelcome() {
    speak(WELCOME)
    setSpeaking(true)
    window.setTimeout(() => setSpeaking(false), 2500)
  }

  return (
    <section className="game" aria-label="Mapa del juego">
      <div className="game__side">
        <div className="game-bubble" role="status">
          <p className="game-bubble__text">{WELCOME}</p>
          <button
            type="button"
            className="game-speak"
            onClick={sayWelcome}
            aria-label="Escuchar lo que dice el personaje"
          >
            🔊 ESCUCHAR
          </button>
        </div>
        <Monster className={`game-monster${speaking ? ' is-talking' : ''}`} />
      </div>

      <div className="game-map">
        <img
          className="game-map__img"
          src={mapImage}
          alt="Mapa con el camino de los niveles"
          draggable={false}
        />
        {gameLevels.map((level) => {
          const got = stars[level.id] ?? 0
          const unlocked = level.ready && isUnlocked(level.id, stars)
          const style = { left: `${level.x}%`, top: `${level.y}%` }
          const starsRow = (
            <span className="level-btn__stars" aria-hidden="true">
              {[1, 2, 3].map((s) => (
                <span key={s} className={s <= got ? 'is-on' : ''}>
                  ★
                </span>
              ))}
            </span>
          )
          if (!unlocked) {
            return (
              <span
                key={level.id}
                className="level-btn is-locked"
                style={style}
                role="img"
                aria-label={`Nivel ${level.id}: ${level.ready ? 'bloqueado' : 'próximamente'}`}
                title={level.ready ? 'PRIMERO TERMINÁ EL NIVEL ANTERIOR' : 'PRÓXIMAMENTE'}
              >
                {starsRow}
                <span className="level-btn__coin">🔒</span>
              </span>
            )
          }
          return (
            <Link
              key={level.id}
              to={`/juego/nivel/${level.id}`}
              className={`level-btn${got > 0 ? ' is-done' : ''}`}
              style={style}
              aria-label={`Nivel ${level.id}: ${level.title}${got ? `, ${got} estrellas` : ''}`}
            >
              {starsRow}
              <span className="level-btn__coin">{level.id}</span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
