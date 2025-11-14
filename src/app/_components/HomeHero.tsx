// src/app/_components/HomeHero.tsx
'use client';

import Link from 'next/link';

export default function HomeHero() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-12 md:flex-row md:items-center md:pt-20">
      {/* Texto */}
      <div className="flex-1 space-y-6">
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-amber-400">
          SWAPP • SUMMONERS WAR ASSISTANT
        </span>

        <h1 className="text-balance text-4xl font-black leading-tight text-slate-50 md:text-5xl lg:text-6xl">
          Sua central premium para{' '}
          <span className="text-emerald-400">conta, runas</span> e{' '}
          <span className="text-cyan-300">otimização.</span>
        </h1>

        <p className="max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
          Gerencie sua conta, otimize builds, visualize estatísticas e acelere sua evolução.
          Tudo em um painel dark elegante, rápido e responsivo, inspirado na estética de
          Summoners War.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/optimizer"
            className="rounded-full bg-amber-400 px-6 py-2.5 text-sm font-semibold text-black shadow-lg shadow-amber-500/25 transition hover:translate-y-[1px] hover:bg-amber-300"
          >
            Entrar no SWAPP
          </Link>

          <Link
            href="/import"
            className="rounded-full border border-slate-600 px-6 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-amber-400 hover:text-amber-300"
          >
            Importar dados da conta
          </Link>
        </div>

        <p className="text-xs text-slate-400">
          * Para salvar presets, builds e configurações personalizadas é necessário fazer login.
        </p>
      </div>

      {/* Mock do painel / logo */}
      <div className="mt-10 flex flex-1 justify-center md:mt-0">
        <div className="relative w-full max-w-md rounded-[32px] border border-slate-800 bg-gradient-to-b from-slate-900/80 to-black/80 p-6 shadow-[0_0_80px_rgba(0,0,0,0.7)]">
          <div className="flex h-64 items-center justify-center rounded-3xl bg-gradient-to-b from-yellow-500/10 via-black to-black">
            <div className="flex h-40 w-40 items-center justify-center rounded-full border border-yellow-500/40 bg-black/60 shadow-[0_0_45px_rgba(234,179,8,0.4)]">
              <span className="text-3xl font-extrabold tracking-[0.2em] text-amber-300">
                SWAPP
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 text-xs">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 px-3 py-3 text-slate-200">
              <div className="text-[11px] font-medium text-slate-400">+350</div>
              <div className="text-[11px] text-slate-300">Monstros</div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 px-3 py-3 text-slate-200">
              <div className="text-[11px] font-medium text-slate-400">+30</div>
              <div className="text-[11px] text-slate-300">Conj. Runas</div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 px-3 py-3 text-slate-200">
              <div className="text-[11px] font-medium text-slate-400">+100</div>
              <div className="text-[11px] text-slate-300">Presets</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
