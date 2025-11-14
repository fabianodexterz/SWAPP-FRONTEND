"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

/**
 * ThemeToggle (Light / System / Dark)
 * - CompatÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­vel com next-themes
 * - Visual dark premium SWAPP (dourado #cbb797)
 * - PersistÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âªncia automÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡tica (localStorage via next-themes)
 */
export default function ThemeToggle() {
  const { theme, setTheme, systemTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evita mismatch entre SSR/CSR
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // placeholder visual para evitar "layout shift"
    return (
      <div className="h-9 w-[132px] rounded-xl bg-white/5 ring-1 ring-white/10 animate-pulse" />
    );
  }

  // Estado atual "real" levando em conta o System
  const current =
    theme === "system" ? (systemTheme ?? resolvedTheme ?? "dark") : theme;

  const isLight = current === "light";
  const isDark = current === "dark";
  const isSystem = theme === "system";

  const baseBtn =
    "px-2.5 h-9 inline-flex items-center gap-1 rounded-lg text-sm ring-1 transition focus:outline-none focus:ring-2 focus:ring-[#cbb797]/50";
  const active =
    "bg-[#cbb797]/15 text-[#cbb797] ring-[#cbb797]/30 shadow-[0_0_12px_#cbb79733]";
  const inactive =
    "text-white/70 hover:text-white hover:bg-white/5 ring-white/10";

  return (
    <div className="flex items-center gap-1.5">
      {/* Light */}
      <button
        type="button"
        aria-label="Tema claro"
        onClick={() => setTheme("light")}
        className={`${baseBtn} ${isLight ? active : inactive}`}
        title="Claro"
      >
        <SunIcon className="h-4 w-4" />
        <span className="hidden sm:inline">Claro</span>
      </button>

      {/* System */}
      <button
        type="button"
        aria-label="Tema automÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡tico (Sistema)"
        onClick={() => setTheme("system")}
        className={`${baseBtn} ${isSystem ? active : inactive}`}
        title="AutomÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡tico"
      >
        <AutoIcon className="h-4 w-4" />
        <span className="hidden sm:inline">Auto</span>
      </button>

      {/* Dark */}
      <button
        type="button"
        aria-label="Tema escuro"
        onClick={() => setTheme("dark")}
        className={`${baseBtn} ${isDark ? active : inactive}`}
        title="Escuro"
      >
        <MoonIcon className="h-4 w-4" />
        <span className="hidden sm:inline">Escuro</span>
      </button>
    </div>
  );
}

/* ==== ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡ÃƒÂ¯Ã‚Â¿Ã‚Â½cones (inline SVG) ==== */

function SunIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M20 12h2M2 12H4M18.36 5.64l1.42-1.42M4.22 19.78l1.42-1.42M5.64 5.64 4.22 4.22M19.78 19.78l-1.42-1.42" />
    </svg>
  );
}

function MoonIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function AutoIcon({ className = "" }: { className?: string }) {
  // ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡ÃƒÂ¯Ã‚Â¿Ã‚Â½cone de "sistema": mistura lua/sol
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      <path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M16.3 7.7l2.1-2.1M5.6 18.4l2.1-2.1" />
      <path d="M12 7a5 5 0 1 0 5 5 5.5 5.5 0 0 1-5-5Z" />
    </svg>
  );
}
