'use client'
import { useEffect, useState } from 'react'

const THEMES = ['dark', 'business'] // pode deixar só "dark" se quiser travar

export default function ThemeToggle() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem('theme') || THEMES[0]
    document.documentElement.setAttribute('data-theme', saved)
    const idx = THEMES.indexOf(saved)
    if (idx >= 0) setI(idx)
  }, [])

  const toggle = () => {
    const next = THEMES[(i + 1) % THEMES.length]
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
    setI((i + 1) % THEMES.length)
  }

  return (
    <button className="btn btn-sm btn-primary" onClick={toggle}>
      Dark Mode
    </button>
  )
}
