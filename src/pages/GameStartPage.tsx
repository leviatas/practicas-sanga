import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadHero, saveHero, type HeroId } from '../lib/gameHero'
import { heroImages, heroNames } from '../components/Hero'
import { speak } from '../lib/speak'
import fondo from '../assets/game/fondo-juego.jpg'
import cartel from '../assets/game/cartel-personaje.png'
import play from '../assets/game/play.png'

// Pantalla principal del juego. El fondo se ve entero, tal cual la imagen
// ("APRENDER A LEER 1"), y encima van los cuatro botones:
//   - en el centro, el play (círculo verde) para entrar a jugar;
//   - debajo del play, el cartel "ELIGE TU PERSONAJE";
//   - a la izquierda la superheroína y a la derecha el superhéroe, que se
//     tocan para elegir y quedan resaltados.
// Si toca el play sin haber elegido, un cartel se lo recuerda.

const AVISO = 'PRIMERO ELEGÍ TU PERSONAJE'
const AVISO_MS = 3000

export default function GameStartPage() {
  const navigate = useNavigate()
  const [picked, setPicked] = useState<HeroId | null>(() => loadHero())
  const [avisa, setAvisa] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  function choose(hero: HeroId) {
    setPicked(hero)
    saveHero(hero)
    setAvisa(false)
    window.clearTimeout(timer.current)
    speak(heroNames[hero].toLowerCase())
  }

  function empezar() {
    if (picked) {
      navigate('/juego/mapa')
      return
    }
    // Todavía no eligió: se lo recordamos (y se lo decimos).
    setAvisa(true)
    speak('Primero elegí tu personaje')
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setAvisa(false), AVISO_MS)
  }

  function heroButton(hero: HeroId) {
    return (
      <button
        type="button"
        className={`hero-pick${picked === hero ? ' is-picked' : ''}`}
        onClick={() => choose(hero)}
        role="radio"
        aria-checked={picked === hero}
        aria-label={heroNames[hero]}
      >
        <img src={heroImages[hero]} alt="" draggable={false} />
      </button>
    )
  }

  return (
    <section className="start" aria-label="Aprender a leer 1">
      <img className="start__bg" src={fondo} alt="" aria-hidden="true" />

      <div className="start__row" role="radiogroup" aria-label="Elegí tu personaje">
        {heroButton('heroina')}

        <div className="start__middle">
          <button
            type="button"
            className="start__play"
            onClick={empezar}
            aria-label="Empezar a jugar"
          >
            <img src={play} alt="" draggable={false} />
          </button>
          <img className="start__sign" src={cartel} alt="Elegí tu personaje" />
        </div>

        {heroButton('heroe')}
      </div>

      {avisa && (
        <p className="start__warn" role="alert">
          {AVISO}
        </p>
      )}
    </section>
  )
}
