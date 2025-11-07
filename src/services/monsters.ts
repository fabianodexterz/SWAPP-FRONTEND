import { api, PUBLIC_BASE } from "@/lib/api";

export type Monster = {
  id: number;
  name: string;
  element: string;
  archetype?: string | null;
  natStars: number;
  awakened: boolean;
  swarfarmId: number;
};

export type MonsterFilters = {
  page?: number;
  limit?: number;
  search?: string;
  element?: string;
  natStars?: number;
};

export type Paginated<T> = { items: T[]; total: number };

const BASE = "/api/monsters";

export const monstersApi = {
  async list(filters: MonsterFilters = {}): Promise<Paginated<Monster>> {
    const params = new URLSearchParams();
    if (filters.page) params.set("page", String(filters.page));
    if (filters.limit) params.set("limit", String(filters.limit));
    if (filters.search) params.set("q", filters.search);
    if (filters.element) params.set("element", filters.element);
    if (filters.natStars) params.set("natStars", String(filters.natStars));
    const qs = params.toString();
    return await api.get<Paginated<Monster>>(`${BASE}${qs ? "?" + qs : ""}`);
  },
  async remove(id: number) {
    return await api.del(`${BASE}/${id}`);
  },
  async update(id: number, data: Partial<Monster>) {
    return await api.patch(`${BASE}/${id}`, data);
  },
};

export function getMonsterIconUrl(swarfarmId: number) {
  // endpoint de ícones do backend (rota /api/icons/:swarfarmId)
  return `${PUBLIC_BASE.replace(/\/$/, "")}/api/icons/${swarfarmId}`;
}
