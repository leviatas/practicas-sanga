import { Link, useParams } from 'react-router-dom'
import { getHub } from '../data/grades'
import { gameComponents, gameStorageKey } from '../games/registry'
import { loadName } from '../lib/profile'
import { useBackTo } from '../lib/backNav'
import BackButton from '../components/BackButton'
import NotFoundPage from './NotFoundPage'
import '../games/math/mathGames.css'

// Pantalla de un minijuego de un menú (ej: REPASO → El kiosco).
export default function HubGamePage() {
  const { gradeId, subjectId, termId, hubId, gameId } = useParams()
  const found = getHub(gradeId ?? '', subjectId ?? '', termId ?? '', hubId ?? '')
  const game = found?.hub.games.find((g) => g.id === gameId)
  const Game = game ? gameComponents[game.id] : undefined
  const hubPath = found
    ? `/grado/${found.grade.id}/${found.subject.id}/${found.term.id}/juegos/${found.hub.id}`
    : '/'
  const backToHub = useBackTo(hubPath)

  if (!found || !game || !Game) return <NotFoundPage />
  const { grade, subject, term, hub } = found

  return (
    <section className="hub-game" style={{ ['--accent' as string]: grade.color }}>
      <nav className="breadcrumb hub-game__crumbs" aria-label="Migas de pan">
        <Link to={`/grado/${grade.id}/${subject.id}`}>{subject.name}</Link>
        <span aria-hidden="true">›</span>
        <Link to={`/grado/${grade.id}/${subject.id}/${term.id}`}>{term.name}</Link>
        <span aria-hidden="true">›</span>
        <Link to={hubPath}>{hub.name}</Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">{game.title}</span>
      </nav>
      <div className="hub-head">
        <BackButton to={hubPath} label={`Volver a ${hub.name}`} />
        <h1 className="hub-title hub-title--game">
          <span aria-hidden="true">{game.art[0]}</span> {game.title}
        </h1>
      </div>
      {/* key: al cambiar de juego, arranca de cero */}
      <Game
        key={game.id}
        childName={loadName(grade.id)}
        storageKey={gameStorageKey(grade.id, hub.id, game.id)}
        onExit={backToHub}
      />
    </section>
  )
}
