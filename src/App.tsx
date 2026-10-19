import { useState } from 'react'
import Header, { type PageName } from './components/Header'
import { useTheme } from './hooks/useTheme'
import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'

export default function App() {
  const [page, setPage] = useState<PageName>('gorevler')
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      {/* arka plandaki yumuşak renk lekeleri */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl dark:bg-indigo-600/20" />
        <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-fuchsia-300/30 blur-3xl dark:bg-fuchsia-600/15" />
      </div>

      <Header page={page} onNavigate={setPage} theme={theme} onToggleTheme={toggleTheme} />
      <main className="flex-1">{page === 'gorevler' ? <HomePage /> : <AboutPage />}</main>
    </div>
  )
}
