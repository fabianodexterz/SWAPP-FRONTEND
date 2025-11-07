export type Monster = {
  id: number;
  name: string;
  element: 'Fire' | 'Water' | 'Wind' | 'Light' | 'Dark' | string;
  archetype?: 'Attack' | 'Defense' | 'Support' | 'HP' | string | null;
  natStars: number;
  awakened?: boolean;
  portraitUrl?: string | null;
  swarfarmId?: number | null;
  userId?: number | null;
  createdAt?: string;
  updatedAt?: string;
};

export type Paged<T> = {
  items: T[];
  total: number;
  limit: number;
  skip: number;
};
