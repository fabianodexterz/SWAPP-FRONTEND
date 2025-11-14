// src/app/optimizer/_components/RuneDetailCard.tsx
"use client";
import React from "react";
import { potentialEfficiency } from "../_lib/runeMath";

type RuneDetail = {
  set: string;
  slot: 1|2|3|4|5|6;
  grade: number;          // 6*
  level: number;          // +15
  main: string;           // "ATK", "HP%", etc
  subs: Record<string, number>;     // { SPD:25, "HP%":21 ... }
  grind?: Record<string, number>;   // { SPD:4, "HP%":6 ... }
  rarity?: "Common"|"Hero"|"Legend";
};

function Bar({label, rune, grind, max=30}:{label:string; rune:number; grind?:number; max?:number}) {
  const g = grind ?? 0;
  const pctRune  = Math.min(100, (rune / max) * 100);
  const pctGrind = Math.min(100, ((rune+g) / max) * 100);
  return (
    <div className="grid grid-cols-5 gap-2 items-center text-[12px]">
      <div className="text-white/60">{label}</div>
      <div className="col-span-3 h-2 rounded bg-white/5 relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 bg-white/20" style={{width:`${pctRune}%`}} />
        {g>0 && <div className="absolute inset-y-0 left-0 bg-emerald-400/60" style={{width:`${pctGrind}%`}} />}
      </div>
      <div className="text-right text-white/70">{rune}{g?` + ${g}`:""}</div>
    </div>
  );
}

export default function RuneDetailCard({ r }: { r: RuneDetail }) {
  const { current, maxed } = potentialEfficiency(r.subs, r.grind);
  const eff = current.toFixed(1) + "%";
  const pot = maxed.toFixed(1)  + "%";

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-[#e6d6ac] font-semibold">+{r.level} {r.set} Rune</div>
          <div className="text-white/60 text-sm">Slot {r.slot} ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ {r.grade}ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ Main {r.main}</div>
        </div>
        <div className="text-right text-sm">
          <div className="text-white/70">Eff: <span className="text-white">{eff}</span></div>
          <div className="text-white/50">Max c/ grind: <span className="text-emerald-400">{pot}</span></div>
        </div>
      </div>

      <div className="space-y-2">
        {Object.entries(r.subs).map(([k,v])=>(
          <Bar key={k} label={k} rune={v} grind={r.grind?.[k]} />
        ))}
      </div>
    </div>
  );
}
