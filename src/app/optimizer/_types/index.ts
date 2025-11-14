// src/app/optimizer/_types/index.ts
export type RuneSlot = 1 | 2 | 3 | 4 | 5 | 6;

export type Rune = {
  id: number | string;
  slot: RuneSlot;
  set: string;
  grade: number;
  level: number;
  main?: string;
  subs?: Record<string, number>;
  equipped?: number | null; // monsterId ou null
};

export type MonsterRef = {
  id: number;
  name: string;
  element?: "Fire" | "Water" | "Wind" | "Light" | "Dark";
  portraitUrl?: string | null;
};

export type OptimizedCombo = {
  id: string;
  score?: number;
  target?: string;
  runes: Rune[];
};
