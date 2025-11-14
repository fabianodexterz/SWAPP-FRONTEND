// src/app/optimizer/ClientOptimizer.tsx
"use client";

import React, { useMemo, useState } from "react";
import FiltersBar from "./_components/FiltersBar";
import ResultsGrid from "./_components/ResultsGrid";
import EmptyState from "./_components/EmptyState";
import type {
  MonsterRef,
  OptimizedCombo,
  OptimizerFilters,
  Rune,
  MainStat,
} from "./_types";

type Props = {
  monsters?: MonsterRef[];
  combos?: OptimizedCombo[];
};

const DEFAULT_FILTERS: OptimizerFilters = {
  requiredSets: [],
  allowedSets: [],
  minSpd: undefined,
  minCriRate: undefined,
  minCriDmg: undefined,
  minFlat: {},
  minPct: {},
  slotMain: { 2: "qualquer" as MainStat, 4: "qualquer" as MainStat, 6: "qualquer" as MainStat },
  options: { allowAncient: true, considerGrinds: true, considerGems: true },
};

export default function ClientOptimizer({ monsters = [], combos = [] }: Props) {
  const [filters, setFilters] = useState<OptimizerFilters>(DEFAULT_FILTERS);

  const monstersById = useMemo(
    () =>
      Object.fromEntries(
        (monsters ?? []).map((m) => [m.id, m.name] as const)
      ),
    [monsters]
  );

  const filteredCombos = useMemo(() => {
    let out = (combos ?? []).slice();

    // 1) Sets obrigatÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â³rios
    if ((filters.requiredSets?.length ?? 0) > 0) {
      out = out.filter((c) => {
        const cReq = Array.isArray((c as any).requiredSets)
          ? ((c as any).requiredSets as string[])
          : [];
        // todo 'rs' do filtro precisa existir na combo
        return (filters.requiredSets ?? []).every((rs) => cReq.includes(rs as any));
      });
    }

    // 2) NÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âºcleo: SPD / CRI / CDMG mÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­nimos
    if (filters.minSpd != null) {
      out = out.filter((c) => (c as any).delta?.spd ?? 0 >= (filters.minSpd ?? 0));
    }
    if (filters.minCriRate != null) {
      out = out.filter((c) => (c as any).delta?.cri ?? 0 >= (filters.minCriRate ?? 0));
    }
    if (filters.minCriDmg != null) {
      out = out.filter((c) => (c as any).delta?.cdmg ?? 0 >= (filters.minCriDmg ?? 0));
    }

    // 3) Slot mains (2/4/6)
    const want2 = filters.slotMain?.[2];
    const want4 = filters.slotMain?.[4];
    const want6 = filters.slotMain?.[6];

    const wants = {
      2: want2 && want2 !== "qualquer" ? want2 : null,
      4: want4 && want4 !== "qualquer" ? want4 : null,
      6: want6 && want6 !== "qualquer" ? want6 : null,
    };

    if (wants[2] || wants[4] || wants[6]) {
      out = out.filter((c) => {
        // cada combo deve ter suas 3 runas principais descritas; tratamos faltas com guards
        const r2 = ((c as any).runes?.find?.((r: Rune) => r.slot === 2) ?? null) as Rune | null;
        const r4 = ((c as any).runes?.find?.((r: Rune) => r.slot === 4) ?? null) as Rune | null;
        const r6 = ((c as any).runes?.find?.((r: Rune) => r.slot === 6) ?? null) as Rune | null;

        const ok2 = wants[2] ? (r2?.main === wants[2]) : true;
        const ok4 = wants[4] ? (r4?.main === wants[4]) : true;
        const ok6 = wants[6] ? (r6?.main === wants[6]) : true;

        return ok2 && ok4 && ok6;
      });
    }

    // 4) Sets permitidos (se usuÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡rio informou, combos sÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â³ podem conter sets dentro da lista)
    if ((filters.allowedSets?.length ?? 0) > 0) {
      out = out.filter((c) => {
        const cSets: string[] = Array.isArray((c as any).allSets)
          ? ((c as any).allSets as string[])
          : Array.isArray((c as any).requiredSets)
          ? ((c as any).requiredSets as string[])
          : [];
        // cada set da combo precisa estar permitido
        return cSets.every((s) => (filters.allowedSets ?? []).includes(s as any));
      });
    }

    return out;
  }, [combos, filters]);

  return (
    <section className="space-y-6">
      <FiltersBar value={filters} onChange={setFilters} />

      {filteredCombos.length === 0 ? (
        <EmptyState filters={filters} />
      ) : (
        <ResultsGrid
          combos={filteredCombos}
          monstersById={monstersById}
        />
      )}
    </section>
  );
}
