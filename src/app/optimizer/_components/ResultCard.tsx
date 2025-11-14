// src/app/optimizer/_components/ResultCard.tsx
"use client";

import React from "react";
import type { OptimizedCombo, Rune } from "../_types";

type Props = {
  combo: OptimizedCombo;
  monstersById: Record<number, string>;
};

function StatPill({ text }: { text: string }) {
  return (
    <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-white/70 border border-white/10">
      {text}
    </span>
  );
}

// Compat: aceita r.subs (string[]) OU sub1/sub2/sub3 legados
function getSubStats(rune: Rune): string[] {
  const anyRune = rune as unknown as {
    subs?: unknown;
    sub1?: unknown;
    sub2?: unknown;
    sub3?: unknown;
  };

  if (Array.isArray(anyRune.subs)) {
    return (anyRune.subs as unknown[])
      .filter((v): v is string => typeof v === "string" && v.trim().length > 0);
  }

  const candidates = [anyRune.sub1, anyRune.sub2, anyRune.sub3];
  return candidates
    .filter((v): v is string => typeof v === "string" && v.trim().length > 0);
}

// Compat: exibe grade/level se vierem no objeto
function getLegacyGradeLevel(rune: Rune): string | null {
  const anyRune = rune as unknown as { grade?: unknown; level?: unknown };
  const grade = typeof anyRune.grade === "number" ? anyRune.grade : undefined;
  const level = typeof anyRune.level === "number" ? anyRune.level : undefined;
  if (grade == null && level == null) return null;

  const parts: string[] = [];
  if (grade != null) parts.push(`${grade}ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦`);
  if (level != null) parts.push(`+${level}`);
  return parts.join(" ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ ");
}

// Compat: extrai alvo do combo (targetId antigo, target novo, numÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©rico ou string)
function resolveOwnerName(
  combo: OptimizedCombo,
  monstersById: Record<number, string>
): string {
  const anyCombo = combo as any;
  const rawTarget =
    anyCombo.targetId !== undefined ? anyCombo.targetId : anyCombo.target;

  if (rawTarget === null || rawTarget === undefined) return "Monstro";

  const num =
    typeof rawTarget === "number"
      ? rawTarget
      : typeof rawTarget === "string" && /^\d+$/.test(rawTarget)
      ? Number(rawTarget)
      : null;

  if (num !== null) return monstersById[num] ?? String(rawTarget);
  return String(rawTarget);
}

// Compat: extrai score se existir (nÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âºmero/string), senÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“-ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡ÃƒÂ¯Ã‚Â¿Ã‚Â½
function resolveScore(combo: OptimizedCombo): string {
  const anyCombo = combo as any;
  const hasScore = anyCombo && "score" in anyCombo;
  if (!hasScore) return "-";

  const v = anyCombo.score as unknown;
  if (typeof v === "number") return v.toFixed(2);
  if (typeof v === "string") return v;
  return "-";
}

export default function ResultCard({ combo, monstersById }: Props) {
  const ownerName = resolveOwnerName(combo, monstersById);
  const scoreText = resolveScore(combo);

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4 hover:border-white/20 transition">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-white/80 font-semibold">{ownerName}</div>
          <div className="text-white/50 text-sm">
            Score: <span className="text-white/70">{scoreText}</span>
          </div>
        </div>
        {(((combo as any).role || (combo as any).build || (combo as any).target) ?? null) && (
          <div className="text-xs text-white/50">
            {(combo as any).role ?? (combo as any).build ?? (combo as any).target}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {combo.runes?.map((r: Rune) => {
          const subs = getSubStats(r);
          const legacy = getLegacyGradeLevel(r);

          return (
            <div
              key={(r as any).id ?? `${r.set}-${r.slot}-${r.main}`}
              className="rounded-xl border border-white/10 bg-white/5 p-3"
            >
              <div className="flex items-center justify-between">
                <div className="text-white/80 font-medium">
                  Slot {r.slot} ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ {r.set}
                </div>
                <div className="text-white/60 text-sm">Main: {r.main}</div>
              </div>

              {subs.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {subs.slice(0, 4).map((s) => (
                    <StatPill key={s} text={s} />
                  ))}
                </div>
              )}

              {legacy && <div className="mt-2 text-xs text-white/40">{legacy}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
