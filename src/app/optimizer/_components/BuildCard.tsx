// src/app/optimizer/_components/BuildCard.tsx
"use client";

import { computeEHP, validateSets, LiteRune } from "@/lib/runes/ehp";

export type MonsterRef = { id: number | string; name: string; element?: string; portraitUrl?: string };
export type OptimizedCombo = { id: string; target: string; score: number; runes: LiteRune[]; role?: "Nuker" | "Bruiser" | "Support" };

type Props = {
  combo: OptimizedCombo;
  monsters: MonsterRef[];
  ehpMode?: "simple" | "true";
};

function findMonsterName(monsters: MonsterRef[], id: number | string | null | undefined): string {
  if (id === null || id === undefined) return "InventÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡rio";
  const m = monsters.find(x => String(x.id) === String(id));
  return m?.name ?? "InventÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡rio";
}

function suggestGem(r: LiteRune, role: Props["combo"]["role"]): string[] {
  // HeurÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­stica simples e segura para exibiÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o
  const s: string[] = [];
  const main = (r.main || "").toUpperCase();

  if (role === "Nuker") {
    if (!main.includes("CRI DMG") && r.slot === 4) s.push("Gem: CRI Dmg% no slot 4");
    if (!main.includes("ATK") && (r.slot === 2 || r.slot === 6)) s.push("Gem: ATK% no sub");
  } else if (role === "Bruiser") {
    if (!main.includes("HP") && (r.slot === 2 || r.slot === 6)) s.push("Gem: HP% no sub");
    if (!main.includes("DEF") && r.slot === 4) s.push("Gem: DEF% no sub");
  } else if (role === "Support") {
    if (!main.includes("SPD") && r.slot === 2) s.push("Gem: SPD no sub");
    s.push("Gem: ACC% se precisar acertar debuffs");
  } else {
    s.push("Gem: ajuste o sub mais fraco");
  }

  return s;
}

export default function BuildCard({ combo, monsters, ehpMode = "simple" }: Props) {
  const { runes } = combo;
  const sets = validateSets(runes);

  return (
    <div className="rounded-2xl bg-[#141416] border border-[#2c2c2c] p-4">
      <div className="flex items-center justify-between">
        <div className="text-[#cbb797] font-semibold">
          Build <span className="text-white">#{combo.id}</span> ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡ÃƒÂ¯Ã‚Â¿Ã‚Â½ Alvo: <span className="text-white">{combo.target}</span>
        </div>
        <div className="text-sm">
          Score: <span className="font-semibold text-white">{combo.score.toFixed(2)}</span>{" "}
          {sets.valid ? (
            <span className="ml-2 px-2 py-0.5 rounded bg-emerald-700 text-white text-xs">ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡ÃƒÂ¯Ã‚Â¿Ã‚Â½ vÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡lidos (4/2)</span>
          ) : (
            <span className="ml-2 px-2 py-0.5 rounded bg-rose-700 text-white text-xs">ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“ set incompleto</span>
          )}
        </div>
      </div>

      {!sets.valid && sets.unmet.length > 0 && (
        <div className="mt-2 text-xs text-[#f3b5b5]">
          Faltando: {sets.unmet.map(u => `${u.set}: +${u.needed}`).join(" ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â· ")}
        </div>
      )}

      <div className="mt-4 grid md:grid-cols-2 gap-3">
        {runes
          .sort((a,b) => a.slot - b.slot)
          .map((r) => (
          <div key={String(r.id)} className="rounded-xl border border-[#2a2a2a] p-3 bg-[#0e0e10]">
            <div className="flex items-center justify-between">
              <div className="font-medium">
                Slot {r.slot} ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡ÃƒÂ¯Ã‚Â¿Ã‚Â½ {r.set} {r.main ? `ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡ÃƒÂ¯Ã‚Â¿Ã‚Â½ ${r.main}` : ""}
              </div>
              <div className="text-xs text-[#aaa]">
                {r.level ? `+${r.level}` : ""}
              </div>
            </div>
            <div className="text-xs mt-1 text-[#c4c4c4]">
              Em: <span className="text-white">{findMonsterName(monsters, r.equipped ?? null)}</span>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              {suggestGem(r, combo.role).map((g, i) => (
                <span key={i} className="text-[11px] px-2 py-0.5 rounded-full bg-[#202022] border border-[#2c2c2c]">
                  {g}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-[#9aa0a6]">
        * EHP mostrado no painel superior do combo (quando calculado) utiliza o modo {ehpMode === "true" ? "True DEF (166)" : "Simples (DEF/100)"}.
      </div>
    </div>
  );
}
