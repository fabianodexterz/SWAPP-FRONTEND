'use client'
import { useEffect, useState } from 'react'
const THEME_KEY = 'theme'
export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark'|'light'>('dark')
  useEffect(() => {
    const saved = (typeof window !== 'undefined' && localStorage.getItem(THEME_KEY)) as 'dark'|'light'|null
    const next = saved ?? 'dark'
    setTheme(next)
    if (typeof document !== 'undefined') document.documentElement.setAttribute('data-theme', next)
  }, [])
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    if (typeof document !== 'undefined') document.documentElement.setAttribute('data-theme', next)
    if (typeof window !== 'undefined') localStorage.setItem(THEME_KEY, next)
  }
  return (
    <button onClick={toggle} className="rounded-xl border border-neutral-800 px-3 py-1 text-xs text-neutral-300 hover:text-white hover:border-neutral-700 transition" aria-label="Alternar tema" type="button">
      {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
    </button>
  )
}
