// frontend/src/lib/rank.ts
export type ArenaTier = 'fighter' | 'challenger' | 'conqueror' | 'guardian' | 'legend';
export type TierLabel = 'Fighter' | 'Challenger' | 'Conqueror' | 'Guardian' | 'Legend';

export interface RankResult {
  tier: ArenaTier;
  label: TierLabel;
  stars: 0 | 1 | 2 | 3;
  tierIndex: number;
}

export function scoreToArenaRank(scoreRaw: number): RankResult {
  const score = Math.max(0, Math.min(100, Number.isFinite(scoreRaw) ? scoreRaw : 0));

  const bands: Array<{
    min: number; max: number;
    tier: ArenaTier; label: TierLabel; tierIndex: number; stars: boolean;
  }> = [
    { min: 0,  max: 34.9999, tier: 'fighter',     label: 'Fighter',     tierIndex: 0, stars: true  },
    { min: 35, max: 54.9999, tier: 'challenger',  label: 'Challenger',  tierIndex: 1, stars: true  },
    { min: 55, max: 69.9999, tier: 'conqueror',   label: 'Conqueror',   tierIndex: 2, stars: true  },
    { min: 70, max: 89.9999, tier: 'guardian',    label: 'Guardian',    tierIndex: 3, stars: true  },
    { min: 90, max: 100,     tier: 'legend',      label: 'Legend',      tierIndex: 4, stars: false },
  ];

  const band = bands.find(b => score >= b.min && score <= b.max)!;

  if (!band.stars) {
    return { tier: band.tier, label: band.label, stars: 0, tierIndex: band.tierIndex };
  }

  const span = band.max - band.min + Number.EPSILON;
  const p = (score - band.min) / span;
  let stars: 1 | 2 | 3 = 1;
  if (p >= 2 / 3) stars = 3;
  else if (p >= 1 / 3) stars = 2;

  return { tier: band.tier, label: band.label, stars, tierIndex: band.tierIndex };
}
