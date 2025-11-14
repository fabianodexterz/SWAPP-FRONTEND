"use client";
import React from "react";
import ScoreBar from "./ScoreBar";
import RuneIcon from "./RuneIcon";
import KaiTooltip from "./KaiTooltip";

type Rune = { id: number | string; slot: 1|2|3|4|5|6; set: string; grade?: number; level?: number; main: string; sub1?: string; sub2?: string; sub3?: string; sub4?: string; };
export type OptimizedComboLite = { id?: string; target?: string; targetId?: number | string | null; score?: number; runes: Rune[]; };
type Props = { combo: OptimizedComboLite; monstersById?: Record<string|number,string>; };

function SlotRuneCard({ rune }: { rune: Rune }) {
  const subs = [rune.sub1, rune.sub2, rune.sub3, rune.sub4].filter(Boolean) as string[];
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="mb-1 flex items-center justify-between text-xs text-white/60">
        <div className="flex items-center gap-2"><RuneIcon set={rune.set} className="w-4 h-4" /><span className="pill">Slot {rune.slot}</span></div>
        <span className="pill">{rune.main}</span>
      </div>
      <div className="kai-divider my-2" />
      {subs.length>0 ? <div className="flex flex-wrap gap-1">{subs.map((s,i)=>(<span key={i} className="pill">{s}</span>))}</div> : <div className="text-xs text-white/40">Sem substats</div>}
    </div>
  );
}

export default function OptimizerCard({ combo, monstersById = {} }: Props) {
  const name = (combo.targetId != null ? monstersById[combo.targetId] : null) ?? combo.target ?? "Monstro";
  const score = typeof combo.score === "number" ? combo.score : undefined;
  const r2 = combo.runes.find(r => r.slot === 2);
  const r4 = combo.runes.find(r => r.slot === 4);
  const r6 = combo.runes.find(r => r.slot === 6);
  return (
    <article className="card-premium p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img src={"/images/monsters/default.png"} alt={name} className="h-12 w-12 rounded-xl object-cover ring-1 ring-white/10" />
          <div>
            <div className="text-sm font-semibold text-white/90">{name}</div>
            <div className="mt-1 w-44"><ScoreBar value={score ?? 0} /></div>
            <div className="mt-1 text-xs text-white/60">Score: <span className="swapp-text-gold">{score?.toFixed(2) ?? "-"}</span></div>
          </div>
        </div>
      </div>
      <div className="kai-divider my-4" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {r2 && <KaiTooltip text="Slot 2"><SlotRuneCard rune={r2} /></KaiTooltip>}
        {r4 && <KaiTooltip text="Slot 4"><SlotRuneCard rune={r4} /></KaiTooltip>}
        {r6 && <KaiTooltip text="Slot 6"><SlotRuneCard rune={r6} /></KaiTooltip>}
      </div>
    </article>
  );
}
