// src/components/HomeHero.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HomeHero() {
  return (
    <main className="min-h-screen">
      {/* Topbar simples */}
      <header className="container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,.7)]" />
          <span className="tracking-[0.35em] text-sm text-gray-300">SWAPP</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 rounded-md text-sm bg-zinc-800/70 hover:bg-zinc-700 transition"
          >
            Entrar
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 rounded-md text-sm bg-yellow-500 text-black hover:bg-yellow-400 transition"
          >
            Criar conta
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Texto */}
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl font-extrabold leading-tight"
            >
              Sua central <span className="text-yellow-400">premium</span> para{" "}
              <span className="text-[#31f2a9]">Monstros</span>,{" "}
              <span className="text-[#5bd0ff]">Runas</span> e{" "}
              <span className="text-[#8bff6f]">Presets</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-gray-400 max-w-xl"
            >
              Gerencie sua conta, otimize builds, visualize estatÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­sticas e acelere sua
              evoluÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o. Tudo num painel dark elegante, rÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡pido e responsivo.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <Link
                href="/dashboard"
                className="px-5 py-2 rounded-md bg-yellow-500 text-black hover:bg-yellow-400 transition"
              >
                Entrar no app
              </Link>

              <Link
                href="/optimizer"
                className="px-5 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 transition"
              >
                Otimizador
              </Link>

              <Link
                href="/login"
                className="px-5 py-2 rounded-md bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 transition"
              >
                Login
              </Link>
            </motion.div>

            <p className="text-xs text-gray-500">
              * Para salvar presets e builds, ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â© necessÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡rio fazer login.
            </p>
          </div>

          {/* Card/Imagem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl border border-zinc-800/70 bg-gradient-to-b from-zinc-900/60 to-zinc-900/30 shadow-[0_0_60px_#0b0b0b_inset] p-6"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-950/50 border border-zinc-800/60">
              {/* Imagem do herÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â³i (arquivo em /public/images/swapp-hero.png) */}
              <Image
                src="/images/swapp-hero.png"
                alt="SWAPP"
                fill
                className="object-contain p-6 opacity-90"
                priority
              />
            </div>

            {/* MÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©tricas */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              <Stat label="Monstros" value="+350" />
              <Stat label="Conj. Runas" value="+30" />
              <Stat label="Presets" value="+100" />
            </div>
          </motion.div>
        </div>

        {/* 3 caixas inferiores */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Feature
            title="Lista de Monstros"
            desc="Pesquise, filtre e analise sua coleÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o completa."
            tag="M"
          />
          <Feature
            title="Presets"
            desc="Acesse builds prÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©-configuradas e acelere seu progresso."
            tag="P"
          />
          <Feature
            title="Otimizador"
            desc="Gere combinaÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âµes de runas ideais com poucos cliques."
            tag="O"
          />
        </div>

        {/* CTA final */}
        <div className="mt-12 rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Pronto para comeÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ar?</h3>
          <p className="text-gray-400 mb-4">
            Crie sua conta agora mesmo e desbloqueie o melhor do SWAPP.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/register"
              className="px-5 py-2 rounded-md bg-yellow-500 text-black hover:bg-yellow-400 transition"
            >
              Criar conta
            </Link>
            <Link
              href="/login"
              className="px-5 py-2 rounded-md bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 transition"
            >
              JÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ tenho conta
            </Link>
          </div>
        </div>

        {/* RodapÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â© */}
        <footer className="mt-12 text-center text-xs text-gray-500">
          SWAPP ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ Ambiente seguro ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢{" "}
          <a
            className="underline decoration-dotted hover:text-gray-300"
            href="https://api.swapp.dev.br"
            target="_blank"
            rel="noreferrer"
          >
            https://api.swapp.dev.br
          </a>
        </footer>
      </section>
    </main>
  );
}

/* ====== componentes auxiliares ====== */
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-zinc-800/60 bg-zinc-900/50 px-4 py-3 text-center">
      <div className="text-yellow-400 font-bold">{value}</div>
      <div className="text-xs text-gray-400">{label}</div>
    </div>
  );
}

function Feature({ title, desc, tag }: { title: string; desc: string; tag: string }) {
  return (
    <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4">
      <div className="text-yellow-400 mb-2 text-xs">{tag}</div>
      <div className="font-semibold mb-1">{title}</div>
      <div className="text-gray-400 text-sm">{desc}</div>
    </div>
  );
}
