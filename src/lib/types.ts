export type Monster = {
  id: number;
  name: string;
  element: "Fire" | "Water" | "Wind" | "Light" | "Dark" | string;
  archetype?: string | null;
  natStars: number;
  awakened: boolean;
  portraitUrl?: string | null;
  swarfarmId?: number | null;
};
export type Paged<T> = { items: T[]; total: number; limit: number; skip: number };
