"use client";
import React from "react";

export type RuneFilter = {
  q: string;
  set: string;
  slot: string;
  stars: string;
  main: string;
  sub: string;
};

export default function RuneFilters({
  value,
  onChange,
  onApply,
  onClear,
}: {
  value: RuneFilter;
  onChange: (v: Partial<RuneFilter>) => void;
  onApply: () => void;
  onClear: () => void;
}) {
  const sets = ["Todos","Swift","Violent","Rage","Despair","Will","Destroy","Energy","Guard","Fatal","Blade","Focus","Endure","Revenge"];
  const slots = ["Todos","1","2","3","4","5","6"];
  const stars = ["Todas","6","5","4","3"];
  const mains = ["Qualquer","ATK%","HP%","DEF%","SPD","CRIT Rate%","CRIT Dmg%","ACC%","RES%","ATK flat","HP flat","DEF flat"];
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 backdrop-blur">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        <div>
          <div className="text-xs text-zinc-400 mb-1">Busca</div>
          <input
            value={value.q}
            onChange={(e)=>onChange({q:e.target.value})}
            placeholder="stat, set, qualquer texto..."
            className="w-full rounded-lg bg-zinc-950/70 border border-zinc-800 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700"
          />
        </div>
        <div>
          <div className="text-xs text-zinc-400 mb-1">Set</div>
          <select value={value.set} onChange={(e)=>onChange({set:e.target.value})}
            className="w-full rounded-lg bg-zinc-950/70 border border-zinc-800 px-3 py-2">
            {sets.map(s=> <option key={s} value={s === "Todos" ? "" : s}>{s}</option>)}
          </select>
        </div>
        <div>
          <div className="text-xs text-zinc-400 mb-1">Slot</div>
          <select value={value.slot} onChange={(e)=>onChange({slot:e.target.value})}
            className="w-full rounded-lg bg-zinc-950/70 border border-zinc-800 px-3 py-2">
            {slots.map(s=> <option key={s} value={s==="Todos" ? "" : s}>{s}</option>)}
          </select>
        </div>
        <div>
          <div className="text-xs text-zinc-400 mb-1">Estrelas</div>
          <select value={value.stars} onChange={(e)=>onChange({stars:e.target.value})}
            className="w-full rounded-lg bg-zinc-950/70 border border-zinc-800 px-3 py-2">
            {stars.map(s=> <option key={s} value={s==="Todas" ? "" : s}>{s}</option>)}
          </select>
        </div>
        <div>
          <div className="text-xs text-zinc-400 mb-1">Main Stat</div>
          <select value={value.main} onChange={(e)=>onChange({main:e.target.value})}
            className="w-full rounded-lg bg-zinc-950/70 border border-zinc-800 px-3 py-2">
            {mains.map(s=> <option key={s} value={s==="Qualquer" ? "" : s}>{s}</option>)}
          </select>
        </div>
        <div>
          <div className="text-xs text-zinc-400 mb-1">Substat contém</div>
          <input
            value={value.sub}
            onChange={(e)=>onChange({sub:e.target.value})}
            placeholder="ex: SPD, CRIT, ACC"
            className="w-full rounded-lg bg-zinc-950/70 border border-zinc-800 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700"
          />
        </div>
      </div>
      <div className="mt-3 flex gap-2 justify-end">
        <button onClick={onClear} className="px-4 py-2 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-800">Limpar</button>
        <button onClick={onApply} className="px-4 py-2 rounded-lg bg-zinc-200 text-zinc-900 font-medium hover:bg-white">Aplicar</button>
      </div>
    </div>
  );
}
