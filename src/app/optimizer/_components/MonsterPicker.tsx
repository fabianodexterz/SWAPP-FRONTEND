// src/app/optimizer/_components/MonsterPicker.tsx
"use client";

import React from "react";
import type { MonsterRef } from "../_types";

type Props = {
  monsters: MonsterRef[];
  value?: number | null;                 // id selecionado
  onChange: (monsterId: number) => void; // callback ao selecionar
};

export default function MonsterPicker({ monsters, value, onChange }: Props) {
  if (!Array.isArray(monsters) || monsters.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {monsters.map((m) => {
        const active = value === m.id;

        // Fallbacks seguros
        const src =
          m.portraitUrl && m.portraitUrl.trim().length > 0
            ? m.portraitUrl
            : "/images/monsters/default.png";

        const starsText =
          typeof m.stars === "number" && m.stars > 0 ? ` ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ ${m.stars}ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦` : "";

        const elementText =
          m.element && m.element.toString().trim().length > 0
            ? ` ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ ${m.element}`
            : "";

        const title = `${m.name}${starsText}${elementText}`;

        return (
          <button
            key={m.id}
            type="button"
            title={title}
            aria-label={title}
            onClick={() => onChange(m.id)}
            className={[
              "relative inline-flex items-center gap-2",
              "rounded-xl border px-2 py-1",
              active
                ? "border-[#cbb797]/60 bg-[#cbb797]/15 text-[#e6d6ac]"
                : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10",
            ].join(" ")}
          >
            <img
              src={src}
              alt={m.name}
              className="w-8 h-8 object-cover rounded-md"
            />
            <div className="flex flex-col items-start leading-tight">
              <span className="text-xs font-medium">{m.name}</span>
              {(starsText || elementText) && (
                <span className="text-[10px] text-white/50">
                  {starsText.replace(" ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ ", "")}
                  {starsText && elementText ? " ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â· " : ""}
                  {elementText.replace(" ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ ", "")}
                </span>
              )}
            </div>
            {active && (
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[#cbb797]" />
            )}
          </button>
        );
      })}
    </div>
  );
}
