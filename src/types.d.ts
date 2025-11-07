
export type ElementType = "Fire" | "Water" | "Wind" | "Light" | "Dark";
export interface Monster {
  id: number;
  name: string;
  element: ElementType;
  archetype: string | null;
  natStars: number;
  awakened: boolean;
  portraitUrl?: string | null;
  swarfarmId?: number | null;
}
export interface Paginated<T> {
  items: T[];
  total: number;
  limit: number;
  skip: number;
}
