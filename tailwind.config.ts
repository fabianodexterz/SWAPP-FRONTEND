import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        card: "0 8px 30px rgba(0,0,0,0.25)"
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [{
      swdark: {
        "primary": "#cbb797",
        "secondary": "#6da7ff",
        "accent": "#ffd166",
        "neutral": "#20232a",
        "base-100": "#0f1115",
        "info": "#69b3ff",
        "success": "#22c55e",
        "warning": "#f59e0b",
        "error": "#ef4444"
      }
    }]
  }
}
export default config
