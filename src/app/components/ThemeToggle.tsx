'use client';
import { useEffect, useState } from 'react';
import { theme as darkTheme, lightTheme } from '../theme';

export default function ThemeToggle() {
  const [mode, setMode] = useState<'dark'|'light'>(
    (typeof window !== 'undefined' && (localStorage.getItem('swapp:theme') as 'dark'|'light')) || 'dark'
  );

  useEffect(() => {
    localStorage.setItem('swapp:theme', mode);
    const root = document.documentElement;
    if (mode === 'light') {
      root.style.setProperty('--bg-page', lightTheme.bg.page);
      root.style.setProperty('--bg-panel', lightTheme.bg.panel);
      root.style.setProperty('--bg-input', lightTheme.bg.input);
      root.style.setProperty('--border', lightTheme.border);
      root.style.setProperty('--text-title', lightTheme.text.title);
      root.style.setProperty('--text-light', lightTheme.text.light);
    } else {
      root.style.setProperty('--bg-page', darkTheme.bg.page);
      root.style.setProperty('--bg-panel', darkTheme.bg.panel);
      root.style.setProperty('--bg-input', darkTheme.bg.input);
      root.style.setProperty('--border', darkTheme.border);
      root.style.setProperty('--text-title', darkTheme.text.title);
      root.style.setProperty('--text-light', darkTheme.text.light);
    }
  }, [mode]);

  return (
    <button
      onClick={() => setMode(m => (m === 'dark' ? 'light' : 'dark'))}
      className="px-3 py-1 rounded-lg border text-sm"
      style={{ borderColor: 'var(--border)' }}
      title="Alternar tema"
    >
      {mode === 'dark' ? '🌙 Escuro' : '☀️ Claro'}
    </button>
  );
}
