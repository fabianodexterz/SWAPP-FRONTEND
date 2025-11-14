// src/components/optimizer/ResultsGrid.tsx
"use client";

import ResultCard from "./ResultCard";
import type { MonsterRef, OptimizedCombo } from "@/types/runes";
import { annotateRuneLocations } from "@/lib/runes/location";

export default function ResultsGrid({
  combos,
  monsters,
}: {
  combos: OptimizedCombo[];
  monsters: MonsterRef[];
}) {
  // index auxiliar por id
  const monstersIndex = Object.fromEntries(monsters.map((m) => [m.id, m]));

  return (
    <section className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {combos.map((c) => {
        const annotated = annotateRuneLocations(c.runes, monstersIndex);
        return (
          <ResultCard
            key={c.id}
            comboId={c.id}
            target={c.target}
            score={c.score}
            runes={annotated}
          />
        );
      })}
    </section>
  );
}
