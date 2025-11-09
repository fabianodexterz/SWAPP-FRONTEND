// src/app/theme.ts
// Tokens de cor do tema (dark). Mantém nomes que usamos nas páginas.
export const themeTokens = {
  text: {
    title: '#f5e6c9',   // títulos
    base:  '#d9d3c0',   // texto padrão
    faint: '#a8a39a',
  },
  bg: {
    app:   '#0a0c0f',
    panel: '#0d0f12',
    card:  '#0b0d10',
  },
  border: {
    base: 'rgba(255,255,255,.08)',
  },
  badge: {
    bg: 'rgba(255,214,102,.12)',
    fg: '#ffd666',
  },
} as const;

export type ThemeTokens = typeof themeTokens;

// (Opcional) se você tiver um "modo" de tema em outro lugar, mantenha separado:
// export type ThemeMode = 'dark' | 'light';
// export const themeMode: ThemeMode = 'dark';
