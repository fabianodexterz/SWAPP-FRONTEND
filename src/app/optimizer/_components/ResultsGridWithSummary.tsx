// src/app/optimizer/_components/ResultsGridWithSummary.tsx
"use client";

/**
 * Wrapper que adiciona um ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“Resumo por SetÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡ÃƒÂ¯Ã‚Â¿Ã‚Â½ acima do ResultsGrid,
 * repassando TODAS as props exigidas pelo grid original.
 */

import React, { useMemo, ComponentProps } from "react";
import BaseResultsGrid from "./ResultsGrid";
import type { OptimizedCombo } from "../_types";

// Descobre o tipo de props do ResultsGrid original
type BaseGridProps = ComponentProps<typeof BaseResultsGrid>;

// Nosso wrapper recebe todas as props do grid, mas permite
// sobrepor combos (mantendo o tipo exato do original).
type Props = Omit<BaseGridProps, "combos"> & {
  combos: OptimizedCombo[];
};

type SpeedSummary = {
  id: string;
  sets: string;
  spd: number;
  score?: number;
  count: number;
};

function normalizeSetLabel(setsArr: string[]): string {
  return setsArr
    .map((s) => String(s || "").trim())
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b))
    .join("+");
}

function getDominantSets(c: any): string[] {
  if (Array.isArray(c?.sets) && c.sets.length > 0) {
    return c.sets.slice(0, 2);
  }
  if (Array.isArray(c?.runes) && c.runes.length > 0) {
    const freq = new Map<string, number>();
    for (const r of c.runes) {
      const setName = String(r?.set ?? "").trim();
      if (!setName) continue;
      freq.set(setName, (freq.get(setName) ?? 0) + 1);
    }
    const ranked = [...freq.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([name]) => name);
    if (ranked.length > 0) return ranked.slice(0, 2);
  }
  return ["N/A"];
}

function SummaryCard({ item }: { item: SpeedSummary }) {
  const hasSpd = Number.isFinite(item.spd) && item.spd > 0;
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:bg-white/[0.06] transition">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-white/60">Set</div>
          <div className="text-base font-semibold text-white/90">{item.sets}</div>
        </div>
        <div className="text-xs text-white/50">{item.count} combo(s)</div>
      </div>

      <div className="mt-3 text-white/70 text-sm">
        {hasSpd ? (
          <>
            <span className="text-white/90 font-medium">+{item.spd}</span> SPD
          </>
        ) : (
          <>
            Score:{" "}
            <span className="text-white/90 font-medium">
              {typeof item.score === "number" ? item.score.toFixed(2) : "-"}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

function SetSpeedSummary({ items }: { items: SpeedSummary[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((it) => (
        <SummaryCard key={it.id} item={it} />
      ))}
    </div>
  );
}

export default function ResultsGridWithSummary({
  combos,
  ...rest
}: Props) {
  const items = useMemo<SpeedSummary[]>(() => {
    if (!Array.isArray(combos) || combos.length === 0) return [];

    const groups = new Map<string, { bestSpd: number; bestScore: number; count: number }>();

    for (const c of combos) {
      const spd = Number(c?.delta?.spd ?? 0);
      const score = Number(c?.score ?? 0);
      const sets = getDominantSets(c);
      const label = normalizeSetLabel(sets);

      const g = groups.get(label) ?? { bestSpd: 0, bestScore: 0, count: 0 };
      g.count += 1;
      if (spd > g.bestSpd) g.bestSpd = spd;
      if (score > g.bestScore) g.bestScore = score;
      groups.set(label, g);
    }

    const arr: SpeedSummary[] = [...groups.entries()].map(([label, g], idx) => ({
      id: `${label}-${idx}`,
      sets: label,
      spd: g.bestSpd || 0,
      score: g.bestScore || 0,
      count: g.count,
    }));

    arr.sort((a, b) => {
      const aHasSpd = a.spd > 0 ? 1 : 0;
      const bHasSpd = b.spd > 0 ? 1 : 0;
      if (aHasSpd !== bHasSpd) return bHasSpd - aHasSpd;
      if (aHasSpd) return b.spd - a.spd;
      return (b.score ?? 0) - (a.score ?? 0);
    });

    return arr.slice(0, 12);
  }, [combos]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white/80">
          Resumo por <span className="text-[#e6d6ac]">set</span>{" "}
          <span className="text-white/60">(melhor SPD/Score por grupo)</span>
        </h3>
      </div>

      <SetSpeedSummary items={items} />

      <div className="h-px w-full bg-white/10 my-2" />

      {/* Repassa TODAS as props obrigatÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â³rias do grid base (incluindo monstersById) */}
      <BaseResultsGrid combos={combos} {...rest} />
    </div>
  );
}
