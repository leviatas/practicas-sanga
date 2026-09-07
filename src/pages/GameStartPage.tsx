import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadHero, saveHero, type HeroId } from '../lib/gameHero'
import { heroImages, heroNames } from '../components/Hero'
import { speak } from '../lib/speak'
import fondo from '../assets/game/fondo-juego.jpg'
import cartel from '../assets/game/cartel-personaje.png'
import play from '../assets/game/play.png'

// Primera pantalla del juego: "APRENDER A LEER 1" (el título viene en el
// fondo) con el cartel "ELIGE TU PERSONAJE", los dos personajes para tocar y
// el botón de play, que lleva al mapa. Si ya había elegido antes, viene
// marcado el suyo y solo tiene que darle a play.

const HEROES: HeroId[] = ['heroina', 'heroe']

export default function GameStartPage() {
  const navigate = useNavigate()
  const [picked, setPicked] = useState<HeroId | null>(() => loadHero())

  function choose(hero: HeroId) {
    setPicked(hero)
    saveHero(hero)
    speak(heroNames[hero].toLowerCase())
  }

  return (
    <section className="start" aria-label="Elegí tu personaje">
      <img className="start__bg" src={fondo} alt="" aria-hidden="true" />

      <div className="start__content">
        <img className="start__sign" src={cartel} alt="Elegí tu personaje" />

        <div className="start__heroes" role="radiogroup" aria-label="Personajes">
          {HEROES.map((hero) => (
            <button
              key={hero}
              type="button"
              className={`hero-pick${picked === hero ? ' is-picked' : ''}`}
              onClick={() => choose(hero)}
              role="radio"
              aria-checked={picked === hero}
              aria-label={heroNames[hero]}
            >
              <img src={heroImages[hero]} alt="" draggable={false} />
            </button>
          ))}
        </div>

        {/* Sin personaje elegido no se puede arrancar: el play espera. */}
        <button
          type="button"
          className="start__play"
          onClick={() => navigate('/juego/mapa')}
          disabled={!picked}
          aria-label="Empezar a jugar"
        >
          <img src={play} alt="" draggable={false} />
        </button>
      </div>
    </section>
  )
}
