"use client";

import { useMemo, useState } from "react";

/** =============================
 * Tipos bÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡sicos
 ============================= */
type Monster = {
  id: number;
  name: string;
  element?: string;
  base?: Record<string, number>;
};

type Rune = {
  id: number | string;
  slot: 1 | 2 | 3 | 4 | 5 | 6;
  set: string;
  grade?: number;
  level?: number;
  main?: string;
  sub?: Record<string, number>;
  equipped?: number | null;
};

/** =============================
 * SugestÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âµes de gemas (com tipos seguros)
 ============================= */
type GemKey = "ACC" | "RES" | "HP%" | "ATK%" | "DEF%" | "SPD" | "CDMG" | "CRI" | "GENERIC";

const GEM_SUGGESTIONS: Record<GemKey, string[]> = {
  ACC: ["Trocar por SPD", "Aumentar precisÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o com gem ACC%"],
  RES: ["Gemar HP% ou DEF%", "Focar resistÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âªncia em substats"],
  "HP%": ["Usar gem SPD ou CRI Rate"],
  "ATK%": ["Combinar com CRI Dmg", "Gem SPD se for DPS lento"],
  "DEF%": ["Manter se tanque", "Gem HP% se precisar mais vida"],
  SPD: ["Manter SPD, evite trocar"],
  CDMG: ["Gem CRI Rate", "Combinar com substats de ATK%"],
  CRI: ["Gem CRI Dmg", "Equilibrar com substats SPD"],
  GENERIC: ["Usar SPD/CRI/HP% conforme papel do monstro"],
};

function getGemKey(slot: 2 | 4 | 6, main: string | undefined): GemKey {
  if (!main) return "GENERIC";
  switch (slot) {
    case 2:
      if (main === "SPD" || main === "HP%" || main === "ATK%" || main === "DEF%") return main;
      break;
    case 4:
      if (main === "CRI" || main === "CDMG" || main === "HP%" || main === "ATK%" || main === "DEF%") return main;
      break;
    case 6:
      if (main === "ACC" || main === "RES" || main === "HP%" || main === "ATK%" || main === "DEF%") return main;
      break;
  }
  return "GENERIC";
}

/** =============================
 * Componente principal
 ============================= */
export default function MonsterEnhancer() {
  const [selected, setSelected] = useState<Monster | null>(null);

  const monsters: Monster[] = [
    { id: 1, name: "Lushen", element: "Wind" },
    { id: 2, name: "Veromos", element: "Dark" },
    { id: 3, name: "Anavel", element: "Water" },
  ];

  const runes: Rune[] = [
    { id: "r1", slot: 2, set: "Rage", main: "ATK%", equipped: 1 },
    { id: "r2", slot: 4, set: "Rage", main: "CDMG", equipped: 1 },
    { id: "r3", slot: 6, set: "Rage", main: "ATK%", equipped: 1 },
    { id: "r4", slot: 2, set: "Blade", main: "SPD", equipped: 2 },
    { id: "r5", slot: 4, set: "Blade", main: "CRI", equipped: 2 },
    { id: "r6", slot: 6, set: "Blade", main: "ATK%", equipped: 2 },
  ];

  const ownedRunes = useMemo(() => {
    if (!selected) return [];
    return runes.filter((r) => r.equipped === selected.id);
  }, [selected]);

  return (
    <section className="space-y-6">
      <h2 className="text-[#cbb797] text-2xl font-bold">Rune Enhancer</h2>

      {/* SeleÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o de monstro */}
      <div className="flex gap-3 flex-wrap">
        {monsters.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelected(m)}
            className={`px-4 py-2 rounded-xl border ${
              selected?.id === m.id
                ? "bg-yellow-400/80 text-black border-yellow-400"
                : "border-white/10 bg-white/[0.05] text-white/80 hover:bg-white/[0.1]"
            }`}
          >
            {m.name}
          </button>
        ))}
      </div>

      {/* Lista de runas equipadas */}
      {selected && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="text-white/80 font-semibold mb-3">
            Runas de {selected.name}
          </h3>

          {ownedRunes.length === 0 ? (
            <p className="text-sm text-white/60">
              Nenhuma runa equipada neste monstro.
            </p>
          ) : (
            <ul className="space-y-3">
              {ownedRunes.map((r) => {
                const key = getGemKey(r.slot as 2 | 4 | 6, r.main);
                const tips = GEM_SUGGESTIONS[key];

                return (
                  <li
                    key={r.id}
                    className="rounded-xl border border-white/10 bg-white/[0.04] p-3"
                  >
                    <p className="text-white/80">
                      <b>Slot {r.slot}</b> ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ {r.set} ({r.main ?? "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡ÃƒÂ¯Ã‚Â¿Ã‚Â½"})
                    </p>
                    <ul className="text-sm text-white/60 mt-1 list-disc list-inside">
                      {tips.map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
