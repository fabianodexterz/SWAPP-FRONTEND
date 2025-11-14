// src/components/AccountSummary.tsx
"use client";
import { useMemo } from "react";

type Rune = {
  id: string|number;
  slot: 1|2|3|4|5|6;
  set: string;
  grade: number;
  level: number;
  equipped?: number|null;
};

type Props = {
  runes: Rune[];
  monsters: { id: number; name: string }[];
};

export default function AccountSummary({ runes, monsters }: Props) {
  const counts = useMemo(() => {
    const bySet: Record<string, number> = {};
    const bySlot: Record<number, number> = {1:0,2:0,3:0,4:0,5:0,6:0};
    let equipped = 0;
    runes.forEach(r => {
      bySet[r.set] = (bySet[r.set] ?? 0) + 1;
      bySlot[r.slot] = (bySlot[r.slot] ?? 0) + 1;
      if (r.equipped) equipped++;
    });
    return { bySet, bySlot, total: runes.length, equipped, inventory: runes.length - equipped };
  }, [runes]);

  return (
    <section className="rounded-2xl bg-[#111] p-4 mt-6">
      <h3 className="text-[#e7d9b8] text-lg font-medium">Resumo da conta</h3>
      <div className="mt-3 grid md:grid-cols-3 gap-4">
        <div className="rounded-xl bg-[#171717] p-3">
          <p className="text-zinc-400 text-sm">Total de runas</p>
          <p className="text-2xl text-amber-300">{counts.total}</p>
          <p className="text-zinc-400 text-sm mt-1">
            Equipadas: {counts.equipped} ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ InventÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡rio: {counts.inventory}
          </p>
        </div>
        <div className="rounded-xl bg-[#171717] p-3">
          <p className="text-zinc-400 text-sm">Por slot</p>
          <ul className="mt-2 grid grid-cols-3 gap-1 text-sm">
            {([1,2,3,4,5,6] as const).map(s => (
              <li key={s} className="flex justify-between">
                <span>Slot {s}</span>
                <span className="text-amber-300">{counts.bySlot[s]}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl bg-[#171717] p-3">
          <p className="text-zinc-400 text-sm">Top sets</p>
          <ul className="mt-2 space-y-1 text-sm">
            {Object.entries(counts.bySet)
              .sort((a,b) => b[1]-a[1])
              .slice(0,8)
              .map(([set, n]) => (
                <li key={set} className="flex justify-between">
                  <span>{set}</span>
                  <span className="text-amber-300">{n}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
