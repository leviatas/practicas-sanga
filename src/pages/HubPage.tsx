import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getHub } from '../data/grades'
import { gameStorageKey } from '../games/registry'
import { loadBest } from '../games/math/engine'
import { hush, say } from '../lib/voice'
import BackButton from '../components/BackButton'
import NotFoundPage from './NotFoundPage'
import '../games/math/mathGames.css'

// Menú visual de minijuegos (ej: «REPASO» del Alto en el camino III de
// Matemática de 1er grado). Una tarjeta ilustrada por juego; en tablet
// horizontal quedan en una grilla de 2 × 2.
export default function HubPage() {
  const { gradeId, subjectId, termId, hubId } = useParams()
  const found = getHub(gradeId ?? '', subjectId ?? '', termId ?? '', hubId ?? '')

  // Consigna hablada al entrar al menú.
  useEffect(() => {
    if (!found) return
    const t = setTimeout(() => say(found.hub.speech), 300)
    return () => {
      clearTimeout(t)
      hush()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hubId])

  if (!found) return <NotFoundPage />
  const { grade, subject, term, hub } = found
  const termPath = `/grado/${grade.id}/${subject.id}/${term.id}`
  const hubPath = `${termPath}/juegos/${hub.id}`

  return (
    <section className="hub-page" style={{ ['--accent' as string]: grade.color }}>
      <nav className="breadcrumb" aria-label="Migas de pan">
        <Link to="/">Inicio</Link>
        <span aria-hidden="true">›</span>
        <Link to={`/grado/${grade.id}`}>{grade.name}</Link>
        <span aria-hidden="true">›</span>
        <Link to={`/grado/${grade.id}/${subject.id}`}>{subject.name}</Link>
        <span aria-hidden="true">›</span>
        <Link to={termPath}>{term.name}</Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">{hub.name}</span>
      </nav>

      <div className="hub-head">
        <BackButton to={termPath} label={`Volver a ${term.name}`} />
        <h1 className="hub-title">
          <span aria-hidden="true">{hub.emoji}</span> {hub.name}
        </h1>
        <button
          type="button"
          className="mg-mega"
          onClick={() => say(hub.speech)}
          aria-label="Escuchar la consigna"
          title="Escuchar la consigna"
        >
          <span aria-hidden="true">📢</span>
        </button>
      </div>
      <p className="hub-sub">Elegí un juego para repasar. Tocá una tarjeta para empezar.</p>

      <ul className="hub-grid" role="list">
        {hub.games.map((game) => {
          const best = loadBest(gameStorageKey(grade.id, hub.id, game.id))
          return (
            <li key={game.id} className="hub-grid__item">
              <Link
                to={`${hubPath}/${game.id}`}
                className="hub-card"
                style={{
                  ['--c1' as string]: game.colors[0],
                  ['--c2' as string]: game.colors[1],
                }}
              >
                <span className="hub-card__art" aria-hidden="true">
                  {game.art.map((e, i) => (
                    <span key={i} className={`hub-card__emoji hub-card__emoji--${i}`}>
                      {e}
                    </span>
                  ))}
                </span>
                <span className="hub-card__title">{game.title}</span>
                <span className="hub-card__sub">{game.subtitle}</span>
                {best && (
                  <span className="hub-card__best" aria-label={`Mejor puntaje: ${best.stars} de ${best.total} estrellas`}>
                    ⭐ {best.stars}/{best.total}
                  </span>
                )}
              </Link>
              <button
                type="button"
                className="hub-card__listen mg-mega"
                onClick={() => say(game.speech)}
                aria-label={`Escuchar: ${game.title}`}
                title={`Escuchar: ${game.title}`}
              >
                <span aria-hidden="true">📢</span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
