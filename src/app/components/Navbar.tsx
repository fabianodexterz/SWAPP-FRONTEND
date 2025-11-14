"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import LogoSwapp from "@/components/LogoSwapp";
import ThemeToggle from "@/app/_components/ThemeToggle"; // ajuste o caminho se o seu ThemeToggle estiver em outro lugar

// Tipamos href como Route para funcionar com typedRoutes
const links: { href: Route; label: string }[] = [
  { href: "/" as Route, label: "Home" },
  { href: "/monsters" as Route, label: "Monstros" },
  { href: "/runes" as Route, label: "Runas" },
  { href: "/optimizer" as Route, label: "Otimizador" },
  { href: "/presets" as Route, label: "Presets" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/40 ring-1 ring-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LogoSwapp withText />
          <nav className="hidden md:flex items-center gap-3">
            {links.map((l) => {
              const active = pathname === l.href || pathname?.startsWith(`${l.href}/`);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={[
                    "px-3 py-1.5 rounded-xl text-sm transition",
                    active
                      ? "bg-[#cbb797]/15 text-[#cbb797] ring-1 ring-[#cbb797]/30"
                      : "text-white/70 hover:text-white hover:bg-white/5",
                  ].join(" ")}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href={"/login" as Route}
            className="hidden sm:inline bg-white/5 hover:bg-white/10 text-white/80 px-3 py-1.5 rounded-xl text-sm ring-1 ring-white/10"
          >
            Entrar
          </Link>
          <Link
            href={"/register" as Route}
            className="bg-[#cbb797] text-black hover:brightness-105 px-3 py-1.5 rounded-xl text-sm font-medium"
          >
            Criar conta
          </Link>
        </div>
      </div>
    </header>
  );
}
