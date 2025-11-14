// src/app/optimizer/_components/FiltersBar.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { OptimizerFilters, RuneSet, MainStat } from "../_types";

// CatÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡logo de sets (chips)
const ALL_SETS: RuneSet[] = [
  "Violent","Will","Swift","Blade","Rage","Despair",
  "Guard","Endure","Energy","Fatal","Revenge",
  "Nemesis","Shield","Vampire","Destroy","Tolerance",
  "Focus","Determination","Seal",
];

// OpÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âµes de main stat (slots 2/4/6)
const MAIN_CHOICES: MainStat[] = [
  "qualquer","HP","ATK","DEF","HP%","ATK%","DEF%","SPD","CRI","CDMG","ACC","RES",
];

type Props = {
  value?: OptimizerFilters;
  onChange: (filters: OptimizerFilters) => void;
};

export default function FiltersBar({ value, onChange }: Props) {
  // estado interno controlado, mas aceita value externo
  const [required, setRequired] = useState<RuneSet[]>(value?.requiredSets ?? []);
  const [allowed,  setAllowed]  = useState<RuneSet[]>(value?.allowedSets  ?? []);

  const [minSpd, setMinSpd] = useState<number | undefined>(value?.minSpd);
  const [minCri, setMinCri] = useState<number | undefined>(value?.minCriRate);
  const [minCdm, setMinCdm] = useState<number | undefined>(value?.minCriDmg);

  const [main2, setMain2] = useState<MainStat>(value?.slotMain?.[2] ?? "qualquer");
  const [main4, setMain4] = useState<MainStat>(value?.slotMain?.[4] ?? "qualquer");
  const [main6, setMain6] = useState<MainStat>(value?.slotMain?.[6] ?? "qualquer");

  const [allowAncient, setAllowAncient]     = useState<boolean>(value?.options?.allowAncient ?? true);
  const [considerGrinds, setConsiderGrinds] = useState<boolean>(value?.options?.considerGrinds ?? true);
  const [considerGems, setConsiderGems]     = useState<boolean>(value?.options?.considerGems ?? true);

  // reflete mudanÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§as vindas do pai
  useEffect(() => {
    if (!value) return;
    setRequired(value.requiredSets ?? []);
    setAllowed(value.allowedSets ?? []);
    setMinSpd(value.minSpd);
    setMinCri(value.minCriRate);
    setMinCdm(value.minCriDmg);
    setMain2(value.slotMain?.[2] ?? "qualquer");
    setMain4(value.slotMain?.[4] ?? "qualquer");
    setMain6(value.slotMain?.[6] ?? "qualquer");
    setAllowAncient(!!value.options?.allowAncient);
    setConsiderGrinds(!!value.options?.considerGrinds);
    setConsiderGems(!!value.options?.considerGems);
  }, [value]);

  // monta objeto final e emite
  const filters = useMemo<OptimizerFilters>(() => ({
    requiredSets: required,
    allowedSets: allowed,
    minSpd,
    minCriRate: minCri,
    minCriDmg: minCdm,
    minFlat: {},
    minPct: {},
    slotMain: { 2: main2, 4: main4, 6: main6 },
    options: { allowAncient, considerGrinds, considerGems }
  }), [required, allowed, minSpd, minCri, minCdm, main2, main4, main6, allowAncient, considerGrinds, considerGems]);

  useEffect(() => { onChange(filters); }, [filters, onChange]);

  // helpers de UI
  const toggleSet = (list: RuneSet[], setList: (v: RuneSet[]) => void, key: RuneSet) => {
    setList(list.includes(key) ? list.filter(s => s !== key) : [...list, key]);
  };

  return (
    <div className="space-y-6">
      {/* Requeridos */}
      <div className="rounded-2xl border border-white/10 p-4">
        <div className="mb-2 text-sm font-semibold text-white/80">
          Sets obrigatÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â³rios <span className="text-white/40">(restam {Math.max(0, 5 - required.length)} / 5)</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {ALL_SETS.map((s) => (
            <button
              key={`req-${s}`}
              onClick={() => toggleSet(required, setRequired, s)}
              className={[
                "rounded-xl px-3 py-1.5 text-sm border transition",
                required.includes(s)
                  ? "border-[#cbb797]/40 bg-[#cbb797]/15 text-[#e6d6ac]"
                  : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
              ].join(" ")}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Permitidos */}
      <div className="rounded-2xl border border-white/10 p-4">
        <div className="mb-2 text-sm font-semibold text-white/80">
          Sets permitidos <span className="text-white/40">(total {allowed.length} / 5)</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {ALL_SETS.map((s) => (
            <button
              key={`allow-${s}`}
              onClick={() => toggleSet(allowed, setAllowed, s)}
              className={[
                "rounded-xl px-3 py-1.5 text-sm border transition",
                allowed.includes(s)
                  ? "border-white/20 bg-white/10 text-white/80"
                  : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
              ].join(" ")}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* NÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âºcleo */}
      <div className="rounded-2xl border border-white/10 p-4">
        <div className="mb-2 text-sm font-semibold text-white/80">
          NÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âºcleo <span className="text-white/40 text-xs ml-2">Dica: SPD/CRI/CDMG sÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o guias, nÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o hard caps.</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="number" className="input input-bordered w-full bg-black/30"
            placeholder="SPD mÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­n." value={minSpd ?? ""} onChange={(e)=>setMinSpd(e.target.value ? Number(e.target.value) : undefined)}
          />
          <input
            type="number" className="input input-bordered w-full bg-black/30"
            placeholder="CRI mÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­n. (%)" value={minCri ?? ""} onChange={(e)=>setMinCri(e.target.value ? Number(e.target.value) : undefined)}
          />
          <input
            type="number" className="input input-bordered w-full bg-black/30"
            placeholder="CDMG mÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­n. (%)" value={minCdm ?? ""} onChange={(e)=>setMinCdm(e.target.value ? Number(e.target.value) : undefined)}
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          {["Nuker (PVE/PVP)","Bruiser","Support"].map((t)=>(
            <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-white/60">{t}</span>
          ))}
        </div>
      </div>

      {/* Main slots */}
      <div className="rounded-2xl border border-white/10 p-4">
        <div className="mb-2 text-sm font-semibold text-white/80">RestriÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o por slot (main)</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select className="select select-bordered bg-black/30" value={main2} onChange={(e)=>setMain2(e.target.value as MainStat)}>
            {MAIN_CHOICES.map(m => <option key={`m2-${m}`} value={m}>{m}</option>)}
          </select>
          <select className="select select-bordered bg-black/30" value={main4} onChange={(e)=>setMain4(e.target.value as MainStat)}>
            {MAIN_CHOICES.map(m => <option key={`m4-${m}`} value={m}>{m}</option>)}
          </select>
          <select className="select select-bordered bg-black/30" value={main6} onChange={(e)=>setMain6(e.target.value as MainStat)}>
            {MAIN_CHOICES.map(m => <option key={`m6-${m}`} value={m}>{m}</option>)}
          </select>
        </div>
      </div>

      {/* OpÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âµes */}
      <div className="rounded-2xl border border-white/10 p-4">
        <div className="mb-2 text-sm font-semibold text-white/80">OpÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âµes</div>
        <label className="flex items-center gap-2 text-white/75">
          <input type="checkbox" checked={allowAncient} onChange={(e)=>setAllowAncient(e.target.checked)} />
          Permitir Ancient
        </label>
        <label className="flex items-center gap-2 text-white/75">
          <input type="checkbox" checked={considerGrinds} onChange={(e)=>setConsiderGrinds(e.target.checked)} />
          Considerar Grinds
        </label>
        <label className="flex items-center gap-2 text-white/75">
          <input type="checkbox" checked={considerGems} onChange={(e)=>setConsiderGems(e.target.checked)} />
          Considerar Gems (mostrar sugestÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âµes)
        </label>
      </div>
    </div>
  );
}
