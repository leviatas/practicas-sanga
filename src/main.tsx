import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import HomePage from './pages/HomePage'
import GradePage from './pages/GradePage'
import SubjectPage from './pages/SubjectPage'
import TermPage from './pages/TermPage'
import PracticePage from './pages/PracticePage'
import HubPage from './pages/HubPage'
import HubGamePage from './pages/HubGamePage'
import GameStartPage from './pages/GameStartPage'
import GameMapPage from './pages/GameMapPage'
import GameLevelPage from './pages/GameLevelPage'
import PrivacyPage from './pages/PrivacyPage'
import NotFoundPage from './pages/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      // Grado → Materia → Período → Práctica
      { path: 'grado/:gradeId', element: <GradePage /> },
      { path: 'grado/:gradeId/:subjectId', element: <SubjectPage /> },
      { path: 'grado/:gradeId/:subjectId/:termId', element: <TermPage /> },
      {
        path: 'grado/:gradeId/:subjectId/:termId/:practiceId',
        element: <PracticePage />,
      },
      // Menú de minijuegos dentro de un período (ej: REPASO) y cada juego.
      {
        path: 'grado/:gradeId/:subjectId/:termId/juegos/:hubId',
        element: <HubPage />,
      },
      {
        path: 'grado/:gradeId/:subjectId/:termId/juegos/:hubId/:gameId',
        element: <HubGamePage />,
      },
      // "En construcción": el juego de aprender a leer (elegir personaje,
      // mapa y niveles).
      { path: 'juego', element: <GameStartPage /> },
      { path: 'juego/mapa', element: <GameMapPage /> },
      { path: 'juego/nivel/:levelId', element: <GameLevelPage /> },
      { path: 'privacidad', element: <PrivacyPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
