// src/services/monsters.ts
import api from "@/lib/api";

export type Monster = {
  id: number;
  name: string;
  element: string;
  archetype?: string;
  imageUrl?: string;
};

export type PaginatedMonsters = {
  items: Monster[];
  total: number;
};

const BASE = "/api/monsters";

/**
 * Lista de monstros com filtros e paginação
 */
export async function listMonsters(filters?: Record<string, string | number>): Promise<PaginatedMonsters> {
  const query = filters
    ? "?" +
      Object.entries(filters)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join("&")
    : "";

  const res = await api<PaginatedMonsters>(`${BASE}${query}`);
  return {
    items: res?.items || [],
    total: res?.total || res?.items?.length || 0,
  };
}

/**
 * Busca um monstro específico pelo ID
 */
export async function getMonster(id: number): Promise<Monster | null> {
  if (!id) return null;
  return await api<Monster>(`${BASE}/${id}`);
}

/**
 * Cria novo monstro
 */
export async function createMonster(data: Partial<Monster>): Promise<Monster | null> {
  const res = await api<Monster>(BASE, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res || null;
}

/**
 * Atualiza um monstro existente
 */
export async function updateMonster(id: number, data: Partial<Monster>): Promise<Monster | null> {
  const res = await api<Monster>(`${BASE}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return res || null;
}

/**
 * Remove um monstro
 */
export async function deleteMonster(id: number): Promise<boolean> {
  const res = await api<{ ok?: boolean }>(`${BASE}/${id}`, {
    method: "DELETE",
  });
  return !!res?.ok;
}
