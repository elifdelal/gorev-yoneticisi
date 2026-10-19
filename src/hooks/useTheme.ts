import { useEffect, useState } from 'react'

export type Theme = 'acik' | 'koyu'

const STORAGE_KEY = 'tnc-tema'

// Açık / koyu tema tercihini LocalStorage'da saklar
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains('dark') ? 'koyu' : 'acik',
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'koyu')
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // gizli sekmede LocalStorage kapalı olabilir, tema yine çalışır
    }
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'koyu' ? 'acik' : 'koyu'))

  return { theme, toggleTheme }
}
