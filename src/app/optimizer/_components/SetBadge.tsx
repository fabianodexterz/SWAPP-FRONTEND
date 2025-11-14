// src/app/optimizer/_components/SetBadge.tsx
"use client";
import React from "react";

/** Insere um badge simples para exibir o nome de um set. Substitua pelo ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­cone real quando quiser. */
export default function SetBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-[11px] text-white/70">
      <span className="w-1.5 h-1.5 rounded-full bg-[#cbb797]" />
      {name}
    </span>
  );
}
