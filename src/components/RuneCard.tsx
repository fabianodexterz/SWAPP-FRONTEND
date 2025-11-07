"use client";
import React from "react";

type Rune = {
  id: number;
  set: string;
  slot: number;
  grade: number; // 1-6
  stars: number; // visual only, mirrors grade
  level: number; // +0..+15
  mainStat: string;
  subStats: string[];
  efficiency?: number; // 0..100
};

function starRow(count: number) {
  return Array.from({ length: count }).map((_, i) => (
    <svg key={i} className="w-3 h-3 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.803 2.037a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.803-2.037a1 1 0 00-1.176 0l-2.803 2.037c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.292z" />
    </svg>
  ));
}

const setColor: Record<string, string> = {
  "Swift": "from-cyan-500/20 to-cyan-400/10",
  "Violent": "from-violet-500/20 to-violet-400/10",
  "Rage": "from-red-500/20 to-red-400/10",
  "Despair": "from-rose-500/20 to-rose-400/10",
  "Will": "from-amber-500/20 to-amber-400/10",
  "Destroy": "from-emerald-500/20 to-emerald-400/10",
  "Energy": "from-green-500/20 to-green-400/10",
  "Guard": "from-sky-500/20 to-sky-400/10",
  "Fatal": "from-orange-500/20 to-orange-400/10",
  "Blade": "from-indigo-500/20 to-indigo-400/10",
  "Focus": "from-blue-500/20 to-blue-400/10",
  "Endure": "from-teal-500/20 to-teal-400/10",
  "Revenge": "from-fuchsia-500/20 to-fuchsia-400/10",
};

export default function RuneCard({ rune }: { rune: Rune }) {
  const color = setColor[rune.set] ?? "from-zinc-600/20 to-zinc-700/10";
  return (
    <div className={`rounded-2xl border border-zinc-800 bg-gradient-to-br ${color} p-4 hover:border-zinc-700 transition`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="size-12 rounded-xl bg-zinc-900/60 border border-zinc-700 flex items-center justify-center">
            <span className="text-lg font-semibold">{rune.slot}</span>
          </div>
          <div>
            <div className="text-sm text-zinc-400">{rune.set}</div>
            <div className="flex items-center gap-1">{starRow(rune.stars)}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-zinc-400">Nível</div>
          <div className="text-base font-semibold text-zinc-200">+{rune.level}</div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
        <div className="rounded-lg bg-zinc-900/50 border border-zinc-800 p-2">
          <div className="text-zinc-400">Principal</div>
          <div className="font-medium">{rune.mainStat}</div>
        </div>
        <div className="rounded-lg bg-zinc-900/50 border border-zinc-800 p-2 col-span-2">
          <div className="text-zinc-400">Substats</div>
          <div className="flex flex-wrap gap-1 mt-1">
            {rune.subStats.map((s, i) => (
              <span key={i} className="px-2 py-0.5 rounded-full bg-zinc-800/70 border border-zinc-700">{s}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-zinc-400">
        <div>Grade: <span className="font-semibold text-zinc-300">{rune.grade}</span></div>
        {typeof rune.efficiency === "number" && (
          <div>Eficiência: <span className="font-semibold text-zinc-300">{rune.efficiency.toFixed(1)}%</span></div>
        )}
      </div>
    </div>
  );
}
