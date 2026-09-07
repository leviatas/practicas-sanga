import { loadHero, type HeroId } from '../lib/gameHero'
import heroinaImg from '../assets/game/heroina.png'
import heroeImg from '../assets/game/heroe.png'

// El personaje del juego: la superheroína o el superhéroe, según lo que haya
// elegido el alumno en la primera pantalla. Acompaña en el mapa y en los
// niveles (antes ese lugar lo ocupaba un monstruito dibujado en SVG).

export const heroImages: Record<HeroId, string> = {
  heroina: heroinaImg,
  heroe: heroeImg,
}

export const heroNames: Record<HeroId, string> = {
  heroina: 'SUPERHEROÍNA',
  heroe: 'SUPERHÉROE',
}

export default function Hero({
  className,
  hero,
  cheering = false,
}: {
  className?: string
  /** Cuál mostrar. Si no se pasa, el que eligió el alumno (o la heroína). */
  hero?: HeroId
  /** `true` cuando festeja: da un saltito. */
  cheering?: boolean
}) {
  const which = hero ?? loadHero() ?? 'heroina'
  return (
    <img
      className={`${className ?? ''}${cheering ? ' is-cheering' : ''}`}
      src={heroImages[which]}
      alt={heroNames[which]}
      draggable={false}
    />
  )
}
