// =====================================================
// src/lib/api.ts — versão consolidada e 100% funcional
// =====================================================

// Métodos HTTP suportados
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * Função base de requisições para a API do SWAPP.
 * Exemplo:
 *   await Api('/health');
 *   await Api('/monsters', { method: 'POST', body: JSON.stringify({...}) });
 */
export async function Api<T = any>(
  path: string,
  init: RequestInit & { method?: HttpMethod } = {}
): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_URL || 'https://api.swap.dev.br';
  const url = path.startsWith('http') ? path : `${base}${path}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(init.headers || {}),
  };

  const res = await fetch(url, { ...init, headers, cache: 'no-store' });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Request failed: ${res.status}`);
  }

  if (res.status === 204) return undefined as unknown as T;

  return (await res.json()) as T;
}

// Alias para compatibilidade: "api"
export { Api as api };

// =====================================================
// Tipos compartilhados
// =====================================================

export type Paginated<T> = {
  items: T[];
  page: number;
  limit: number;
  total: number;
};

// =====================================================
// MONSTERS
// =====================================================

export type MonsterElement = 'Fire' | 'Water' | 'Wind' | 'Light' | 'Dark';

export type Monster = {
  id: number;
  name: string;
  element: MonsterElement;
  natStars: number;
  archetype?: string | null;
  awakened?: boolean;
  portraitUrl?: string | null;
  swarfarmId?: number | null;
};

export type MonsterFilters = {
  q?: string;
  page?: number;
  limit?: number;
  element?: MonsterElement;
};

// CRUD completo da entidade Monster
export const monstersApi = {
  list(filters: MonsterFilters = {}): Promise<Paginated<Monster>> {
    const params = new URLSearchParams();
    if (filters.q) params.set('q', filters.q);
    if (filters.page) params.set('page', String(filters.page));
    if (filters.limit) params.set('limit', String(filters.limit));
    if (filters.element) params.set('element', filters.element);
    const qs = params.toString();
    return Api<Paginated<Monster>>(`/monsters${qs ? `?${qs}` : ''}`);
  },

  create(payload: {
    swarfarmId?: number | null;
    name: string;
    element: MonsterElement;
    natStars?: number;
    archetype?: string | null;
    awakened?: boolean;
    portraitUrl?: string | null;
  }): Promise<Monster> {
    return Api<Monster>('/monsters', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  update(id: number, data: Partial<Monster>): Promise<Monster> {
    return Api<Monster>(`/monsters/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  remove(id: number): Promise<void> {
    return Api<void>(`/monsters/${id}`, { method: 'DELETE' });
  },
};

// Helper para listar monstros (usado nas páginas)
export async function fetchMonsters(
  q = '',
  page = 1,
  limit = 20
): Promise<Paginated<Monster>> {
  return monstersApi.list({ q, page, limit });
}

// =====================================================
// OPTIMIZER
// =====================================================

export type OptimizerResponse = {
  runes: any[];
  artifacts: any[];
  [key: string]: any;
};

export async function fetchOptimizer(
  monsterId: number | string
): Promise<OptimizerResponse> {
  return Api<OptimizerResponse>(`/optimizer/${monsterId}`);
}

// =====================================================
// PRESETS
// =====================================================

export type Preset = {
  id?: number | string;
  locale: string;
  name: string;
  monsterName: string;
  runeSets: string;
  stats?: Record<string, any>;
  [key: string]: any;
};

export async function fetchPresets(): Promise<{ items: Preset[] }> {
  const data = await Api<Preset[] | { items: Preset[] }>('/presets');
  return Array.isArray(data) ? { items: data } : data;
}

// =====================================================
// HEALTHCHECK
// =====================================================

export async function fetchHealth(): Promise<{ ok: boolean }> {
  return Api<{ ok: boolean }>('/health');
}
