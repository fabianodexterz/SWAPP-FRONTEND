// src/app/optimizer/_components/SetSpeedSummary.tsx
"use client";
import React from "react";
import SetBadge from "./SetBadge";

export type SpeedSummary = {
  id: string;
  label: string;        // "Swift+Will #1"
  sets: string[];       // ["Swift","Will"]
  eff?: number;         // eficiÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âªncia mÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©dia opcional
  spd: number;          // SPD total/estimado
  runs?: number;        // qtd de diferentes combinaÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âµes vÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡lidas
};

export default function SetSpeedSummary({ items }:{ items: SpeedSummary[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-3">
      {items.map(it=>(
        <div key={it.id} className="rounded-2xl border border-white/10 bg-black/30 p-3">
          <div className="flex items-center justify-between">
            <div className="text-white/80 text-sm">{it.label}</div>
            <div className="flex gap-1">{it.sets.map(s=> <SetBadge key={s} name={s}/>)}</div>
          </div>
          <div className="mt-3 text-3xl font-bold tracking-tight text-white">
            {it.spd} <span className="text-white/60 text-base font-normal">SPD</span>
          </div>
          <div className="mt-2 text-xs text-white/50 flex gap-4">
            {typeof it.eff === "number" && <span>Eff% {it.eff.toFixed(1)}</span>}
            {typeof it.runs === "number" && <span>{it.runs} builds</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
