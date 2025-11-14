"use client";

import React from "react";
import type { Rune, Slot } from "../_types";

/** Pill simples para exibir textos de stats */
function StatPill({ text }: { text: string }) {
  return (
    <span className="rounded-xl border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/70">
      {text}
    </span>
  );
}

type Props = {
  rune: Rune;
  ownerName?: string | null;
};

/** Card compacto de uma runa por slot (lista de resultados) */
export default function SlotRuneCard({ rune, ownerName }: Props) {
  // Substats: priorizar array 'subs'; se nÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o existir, cair para sub1/2/3
  const subStats: string[] = (
    Array.isArray((rune as unknown as { subs?: unknown }).subs)
      ? ((rune as unknown as { subs: unknown[] }).subs as string[])
      : [rune.sub1, rune.sub2, rune.sub3]
  ).filter((v): v is string => Boolean(v && v.toString().trim()));

  const mainLabel = rune.main ?? "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡ÃƒÂ¯Ã‚Â¿Ã‚Â½";
  const header = `Slot ${rune.slot} ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ ${rune.set}`;
  const equipped = typeof rune.equipped === "number" ? rune.equipped : null;

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
      <div className="mb-1 flex items-center justify-between">
        <div className="text-xs text-white/50">{header}</div>
        <div className="text-[10px] text-white/40">G{rune.grade} ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ +{rune.level}</div>
      </div>

      <div className="text-white/60">
        <div className="text-white/60">
          <span className="text-white/70">Main:</span>{" "}
          <span className="text-white/90">{mainLabel}</span>
        </div>

        {subStats.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {subStats.slice(0, 6).map((s, i) => (
              <StatPill key={i} text={s} />
            ))}
          </div>
        )}

        {(ownerName || equipped) && (
          <div className="mt-3 text-xs text-white/40">
            {ownerName ? `Equipada em: ${ownerName}` : equipped ? `Equipada em ID ${equipped}` : null}
          </div>
        )}
      </div>
    </div>
  );
}
