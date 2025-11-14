// src/app/optimizer/_components/ResultsGrid.tsx
"use client";

import React from "react";
import type { OptimizedCombo, MonsterRef } from "../_types";
import ResultCard from "./ResultCard";

type Props = {
  combos: OptimizedCombo[];
  monstersById: Record<number, string>;
  showInvalidWarning?: boolean;
};

export default function ResultsGrid({
  combos,
  monstersById,
  showInvalidWarning = false,
}: Props) {
  const has = Array.isArray(combos) && combos.length > 0;

  if (!has) {
    return (
      <div className="rounded-2xl border border-amber-600/30 bg-amber-500/10 p-4 text-amber-300">
        Nenhuma combinaÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o vÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡lida encontrada com os filtros atuais.
        {showInvalidWarning && (
          <div className="mt-1 text-amber-400/80 text-sm">
            Dica: reduza os requisitos ou aumente os sets permitidos.
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {combos.map((c, idx) => {
        // chave estÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡vel: tenta usar id do alvo + ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­ndice
        const anyC = c as any;
        const kTarget = anyC.targetId ?? anyC.target ?? idx;
        const key = `${String(kTarget)}-${idx}`;

        return (
          <ResultCard
            key={key}
            combo={c}
            monstersById={monstersById}
          />
        );
      })}
    </div>
  );
}
