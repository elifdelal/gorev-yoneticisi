import { ListTodo, Moon, Sun } from 'lucide-react'
import type { Theme } from '../hooks/useTheme'

export type PageName = 'gorevler' | 'hakkinda'

interface HeaderProps {
  page: PageName
  onNavigate: (page: PageName) => void
  theme: Theme
  onToggleTheme: () => void
}

const LINKS: { page: PageName; label: string }[] = [
  { page: 'gorevler', label: 'Görevler' },
  { page: 'hakkinda', label: 'Hakkında' },
]

export default function Header({ page, onNavigate, theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/70 backdrop-blur-lg dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <button onClick={() => onNavigate('gorevler')} className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/30">
            <ListTodo size={20} />
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            Görev<span className="hidden text-indigo-600 sm:inline dark:text-indigo-400">Yöneticisi</span>
          </span>
        </button>

        <div className="flex items-center gap-2">
          <nav className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800/80">
            {LINKS.map((l) => (
              <button
                key={l.page}
                onClick={() => onNavigate(l.page)}
                className={`rounded-lg px-2.5 py-1.5 text-sm font-semibold transition sm:px-3 ${
                  page === l.page
                    ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-white'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {l.label}
              </button>
            ))}
          </nav>
          <button
            onClick={onToggleTheme}
            aria-label={theme === 'koyu' ? 'Açık temaya geç' : 'Koyu temaya geç'}
            title={theme === 'koyu' ? 'Açık tema' : 'Koyu tema'}
            className="grid h-9 w-9 place-items-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-amber-300"
          >
            {theme === 'koyu' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  )
}
