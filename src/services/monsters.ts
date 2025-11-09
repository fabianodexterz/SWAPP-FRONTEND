// src/services/monsters.ts
// Wrapper para a API de monstros usando o helper Api (JSON) sem PUBLIC_BASE.

import { Api } from '@/lib/api';

export type Monster = {
  id: number;
  name: string;
  element: string;       // Fire | Water | Wind | Light | Dark (livre aqui)
  natStars: number;      // 1..6
  awakened?: boolean;
  portraitUrl?: string | null;
  swarfarmId?: number | null;
};

export type MonsterFilters = {
  q?: string;
  element?: string;
  page?: number;
  limit?: number;
  sort?: string; // 'name' | 'natStars' etc.
};

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
};

const BASE = '/api/monsters';

function toQuery(filters: MonsterFilters = {}): string {
  const params = new URLSearchParams();
  if (filters.q) params.set('q', filters.q);
  if (filters.element) params.set('element', filters.element);
  if (filters.page != null) params.set('page', String(filters.page));
  if (filters.limit != null) params.set('limit', String(filters.limit));
  if (filters.sort) params.set('sort', filters.sort);
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

export const monstersApi = {
  // GET /api/monsters?q=&element=&page=&limit=&sort=
  list: async (filters: MonsterFilters = {}): Promise<Paginated<Monster>> => {
    return Api<Paginated<Monster>>(`${BASE}${toQuery(filters)}`);
  },

  // GET /api/monsters/:id
  get: async (id: number | string): Promise<Monster> => {
    return Api<Monster>(`${BASE}/${encodeURIComponent(id)}`);
  },

  // POST /api/monsters
  create: async (
    data: Partial<Monster> & { name: string; element: string; natStars: number }
  ): Promise<Monster> => {
    return Api<Monster>(BASE, {
      method: 'POST',
      // Tipagem para BodyInit: o helper faz a serialização JSON, aqui só ajustamos o tipo
      body: data as unknown as BodyInit,
    });
  },

  // PUT /api/monsters/:id
  update: async (
    id: number | string,
    data: Partial<Monster>
  ): Promise<Monster> => {
    return Api<Monster>(`${BASE}/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: data as unknown as BodyInit,
    });
  },

  // DELETE /api/monsters/:id
  remove: async (id: number | string): Promise<void> => {
    await Api<void>(`${BASE}/${encodeURIComponent(id)}`, { method: 'DELETE' });
  },
};

export default monstersApi;
