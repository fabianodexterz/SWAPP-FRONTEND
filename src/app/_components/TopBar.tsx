"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Route } from "next";
import ThemeToggle from "./ThemeToggle";

function IconMenu(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><path strokeWidth="2" strokeLinecap="round" d="M3 6h18M3 12h18M3 18h18" /></svg>;
}
function IconClose(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><path strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M18 6l-12 12" /></svg>;
}

const NAV: { label: string; href: Route }[] = [
  { label: "Monstros", href: "/monsters" },
  { label: "Runas", href: "/runes" },
  { label: "Otimizador", href: "/optimizer" },
  { label: "Presets", href: "/presets" },
];

export default function TopBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link href={"/" as Route} className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_2px_rgba(251,191,36,0.5)]" />
          <span className="text-sm tracking-[0.35em] text-white/80">SWAPP</span>
        </Link>

        <nav className="hidden md:flex items-center gap-5 text-sm">
          {NAV.map((i) => {
            const active = pathname?.startsWith(i.href);
            return (
              <Link
                key={i.href}
                href={i.href}
                className={
                  "px-2 py-1 rounded-md transition " +
                  (active
                    ? "text-amber-300 bg-white/[0.06] border border-white/10"
                    : "text-white/70 hover:text-white hover:bg-white/[0.04] border border-transparent")
                }
              >
                {i.label}
              </Link>
            );
          })}
        </nav>

        {/* AÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âµes */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href={"/login" as Route}
            className="rounded-lg border border-white/10 bg-black/20 hover:bg-black/30 px-3 py-1.5 text-sm text-white transition"
          >
            Entrar
          </Link>
          <Link
            href={"/register" as Route}
            className="rounded-lg bg-amber-400/95 text-zinc-900 hover:bg-amber-300 px-3 py-1.5 text-sm font-semibold shadow-[0_10px_40px_-10px_rgba(251,191,36,0.55)] transition"
          >
            Criar conta
          </Link>
        </div>

        <button
          className="md:hidden text-white/80 hover:text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/70 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 space-y-1">
            <ThemeToggle />
            {NAV.map((i) => {
              const active = pathname?.startsWith(i.href);
              return (
                <Link
                  key={i.href}
                  href={i.href}
                  className={
                    "block px-2 py-2 rounded-md text-sm transition " +
                    (active
                      ? "text-amber-300 bg-white/[0.08] border border-white/10"
                      : "text-white/75 hover:text-white hover:bg-white/[0.04]")
                  }
                  onClick={() => setOpen(false)}
                >
                  {i.label}
                </Link>
              );
            })}
            <div className="flex gap-2 pt-2">
              <Link
                href={"/login" as Route}
                className="flex-1 rounded-lg border border-white/10 bg-black/20 hover:bg-black/30 px-3 py-2 text-center text-sm text-white transition"
                onClick={() => setOpen(false)}
              >
                Entrar
              </Link>
              <Link
                href={"/register" as Route}
                className="flex-1 rounded-lg bg-amber-400/95 text-zinc-900 hover:bg-amber-300 px-3 py-2 text-center text-sm font-semibold shadow-[0_10px_40px_-10px_rgba(251,191,36,0.55)] transition"
                onClick={() => setOpen(false)}
              >
                Criar conta
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
