"use client";

import React from "react";
import type { OptimizedCombo } from "../_types";

/** Mapa de rÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â³tulos bonitos para as chaves do delta */
const LABELS: Record<keyof Delta, string> = {
  hp: "HP",
  atk: "ATK",
  def: "DEF",
  spd: "SPD",
  cri: "CRI",
  cdmg: "CDMG",
  acc: "ACC",
  res: "RES",
  ehp: "EHP",
};

/** Tipo local para aceitar delta sem mudar o _types global */
type Delta = Partial<{
  hp: number;
  atk: number;
  def: number;
  spd: number;
  cri: number;
  cdmg: number;
  acc: number;
  res: number;
  ehp: number;
}>;

type ComboWithDelta = OptimizedCombo & { delta?: Delta };

export default function StatsPanel({ combo }: { combo: ComboWithDelta }) {
  const delta: Delta = combo.delta ?? {};

  const Row = ({
    label,
    value,
  }: {
    label: string;
    value: number | undefined;
  }) => {
    const shown =
      typeof value === "number"
        ? `${value > 0 ? "+" : ""}${value}`
        : "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡ÃƒÂ¯Ã‚Â¿Ã‚Â½";

    const color =
      typeof value === "number"
        ? value > 0
          ? "text-emerald-400"
          : value < 0
          ? "text-red-400"
          : "text-zinc-300"
        : "text-zinc-400";

    return (
      <div className="flex items-center justify-between rounded-xl border border-zinc-800/60 bg-zinc-900/40 px-3 py-2">
        <span className="text-[13px] text-zinc-300">{label}</span>
        <span className={`text-sm font-medium ${color}`}>{shown}</span>
      </div>
    );
  };

  return (
    <section className="space-y-2">
      <h4 className="text-sm font-medium text-zinc-300">
        VariaÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o de atributos (ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â½ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡ÃƒÂ¯Ã‚Â¿Ã‚Â½)
      </h4>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {(
          Object.keys(LABELS) as Array<keyof Delta>
        ).map((k) => (
          <Row key={k} label={LABELS[k]} value={delta[k]} />
        ))}
      </div>
    </section>
  );
}
