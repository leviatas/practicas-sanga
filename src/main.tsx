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
      // "En construcción": el juego de aprender a leer (mapa y niveles).
      { path: 'juego', element: <GameMapPage /> },
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
