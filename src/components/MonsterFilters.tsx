"use client";

import { useEffect, useMemo, useState } from "react";

export type Filters = {
  q: string;
  element: "Todos" | "Fire" | "Water" | "Wind" | "Light" | "Dark";
  stars: "Todas" | 1 | 2 | 3 | 4 | 5 | 6;
  awakened: "Qualquer" | "Awakened" | "Not Awakened";
};

const elements = ["Todos","Fire","Water","Wind","Light","Dark"] as const;
const starOptions = ["Todas",1,2,3,4,5,6] as const;
const awakenOptions = ["Qualquer","Awakened","Not Awakened"] as const;

export default function MonsterFilters({
  value,
  onChange,
  onApply,
  onClear,
}: {
  value: Filters;
  onChange: (f: Filters) => void;
  onApply: () => void;
  onClear: () => void;
}) {
  const [local, setLocal] = useState<Filters>(value);
  useEffect(()=>setLocal(value),[value]);

  function update<K extends keyof Filters>(k: K, v: Filters[K]) {
    const next = { ...local, [k]: v };
    setLocal(next);
    onChange(next);
  }

  return (
    <div className="rounded-2xl border border-white/5 bg-zinc-900/50 p-3 sm:p-4 backdrop-blur">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div>
          <label className="text-xs text-zinc-400">Busca</label>
          <input
            value={local.q}
            onChange={(e)=>update("q", e.target.value)}
            placeholder="Nome, elemento, arquÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©tipo"
            className="mt-1 w-full rounded-lg bg-black/40 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-white/20"
          />
        </div>
        <div>
          <label className="text-xs text-zinc-400">Elemento</label>
          <select
            value={local.element}
            onChange={(e)=>update("element", e.target.value as Filters["element"])}
            className="mt-1 w-full rounded-lg bg-black/40 px-3 py-2 text-sm ring-1 ring-white/10 focus:ring-2 focus:ring-white/20"
          >
            {elements.map(el=>(<option key={el} value={el}>{el}</option>))}
          </select>
        </div>
        <div>
          <label className="text-xs text-zinc-400">Estrelas</label>
          <select
            value={local.stars as any}
            onChange={(e)=>update("stars", (isNaN(+e.target.value) ? "Todas" : +e.target.value) as any)}
            className="mt-1 w-full rounded-lg bg-black/40 px-3 py-2 text-sm ring-1 ring-white/10 focus:ring-2 focus:ring-white/20"
          >
            {starOptions.map(st=>(<option key={st.toString()} value={st as any}>{st}</option>))}
          </select>
        </div>
        <div>
          <label className="text-xs text-zinc-400">Awakened</label>
          <select
            value={local.awakened}
            onChange={(e)=>update("awakened", e.target.value as Filters["awakened"])}
            className="mt-1 w-full rounded-lg bg-black/40 px-3 py-2 text-sm ring-1 ring-white/10 focus:ring-2 focus:ring-white/20"
          >
            {awakenOptions.map(a=>(<option key={a} value={a}>{a}</option>))}
          </select>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <button onClick={onApply} className="rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/15">
          Aplicar
        </button>
        <button onClick={onClear} className="rounded-lg bg-white/5 px-3 py-2 text-sm hover:bg-white/10">
          Limpar
        </button>
      </div>
    </div>
  );
}
