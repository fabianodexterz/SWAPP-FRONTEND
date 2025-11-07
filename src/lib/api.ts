const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const APP = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const api = API;
export const PUBLIC_BASE = APP;

export const Api = {
  async get(path, init) {
    const url = `${API}${path.startsWith("/api") ? path : `/api${path}`}`;
    const res = await fetch(url, { cache: "no-store", ...(init || {}) });
    if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
    return await res.json();
  },
};

export async function fetchHealth() { return Api.get("/health"); }
export async function fetchMonsters(q = "", page = 1, limit = 20) {
  const p = new URLSearchParams({ q, page: String(page), limit: String(limit) });
  return Api.get(`/monsters?${p}`);
}
export async function fetchPresets() { return Api.get(`/presets`); }
export async function fetchOptimizer(id) { return Api.get(`/optimizer/${id}`); }

export { Api as ApiClient };
