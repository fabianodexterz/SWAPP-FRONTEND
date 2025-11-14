// src/app/optimizer/_lib/sets.ts
import type { Rune } from "../_types";

const TITLE = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

export const SET_SIZES: Record<string, 2 | 4> = {
  // 4-peÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§as
  Violent: 4, Swift: 4, Rage: 4, Despair: 4, Vampire: 4, Fatal: 4,
  // 2-peÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§as
  Will: 2, Blade: 2, Fight: 2, Endure: 2, Guard: 2, Revenge: 2, Seal: 2,
  Destroy: 2, Nemesis: 2, Energy: 2, Tolerance: 2, Accuracy: 2,
};

export function getSetSize(name: string): 2 | 4 {
  const key = TITLE(name.trim());
  return SET_SIZES[key] ?? 2;
}

export function normalizeSet(name: string) {
  return TITLE(name.trim());
}

export function countSetPieces(runes: Rune[]) {
  const map = new Map<string, number>();
  for (const r of runes) {
    const key = normalizeSet(r.set);
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  return map;
}

export function computeCompletedSets(runes: Rune[]) {
  const counts = countSetPieces(runes);
  const active: Array<{ name: string; size: 2 | 4; bonuses: number; piecesUsed: number; totalPieces: number }> = [];
  let piecesUsed = 0;

  counts.forEach((qty, name) => {
    const size = getSetSize(name);
    const bonuses = Math.floor(qty / size);
    if (bonuses > 0) {
      const used = bonuses * size;
      piecesUsed += used;
      active.push({ name, size, bonuses, piecesUsed: used, totalPieces: qty });
    }
  });

  return { active, piecesUsed };
}

export function validateCombo(runes: Rune[], requiredSets: string[] = []) {
  const { active, piecesUsed } = computeCompletedSets(runes);

  const reasons: string[] = [];
  if (piecesUsed !== 6) {
    const counts = countSetPieces(runes);
    const partials: string[] = [];
    counts.forEach((qty, name) => {
      const size = getSetSize(name);
      const mod = qty % size;
      if (mod !== 0) partials.push(`${name} ${qty}/${size}`);
    });
    reasons.push(
      partials.length
        ? `Conjuntos incompletos: ${partials.join(", ")}.`
        : `A soma de peÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§as de sets completos nÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o fecha 6 (usadas: ${piecesUsed}).`
    );
  }

  const activeNames = new Set(active.map((a) => normalizeSet(a.name)));
  for (const req of requiredSets.map(normalizeSet)) {
    if (!activeNames.has(req)) reasons.push(`Set obrigatÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â³rio ausente: ${req}.`);
  }

  return { valid: reasons.length === 0, active, reasons };
}

export function formatActiveSets(active: ReturnType<typeof computeCompletedSets>["active"]) {
  if (active.length === 0) return "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡ÃƒÂ¯Ã‚Â¿Ã‚Â½";
  return active
    .sort((a, b) => (b.size - a.size) || a.name.localeCompare(b.name))
    .map((s) => `${s.name} x${s.bonuses}`)
    .join(" ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ ");
}
