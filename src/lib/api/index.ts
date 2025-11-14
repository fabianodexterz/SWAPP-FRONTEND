/* ---------- src/lib/api/index.ts ----------
 * Cliente HTTP central do SWAPP (frontend)
 * Inclui: api base + presets + auth (login, logout, register, me, forgot)
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ?? "";

/** Converte Response -> JSON e trata erros HTTP */
async function toJson<T = any>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status} ${res.statusText}`);
  }
  if (res.status === 204 || res.status === 205) return undefined as unknown as T;
  return (await res.json()) as T;
}

/** Aplica cabeÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§alhos/credenciais padrÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o */
function withDefaults(init?: RequestInit): RequestInit {
  const headers = new Headers(init?.headers ?? {});
  if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  return { credentials: "include", ...init, headers };
}

/** Cliente HTTP base */
const api = {
  get<T = any>(path: string, init?: RequestInit) {
    return fetch(`${BASE_URL}${path}`, withDefaults({ method: "GET", ...init })).then(toJson<T>);
  },
  post<T = any>(path: string, body?: any, init?: RequestInit) {
    return fetch(
      `${BASE_URL}${path}`,
      withDefaults({
        method: "POST",
        body: body != null ? JSON.stringify(body) : undefined,
        ...init,
      }),
    ).then(toJson<T>);
  },
  put<T = any>(path: string, body?: any, init?: RequestInit) {
    return fetch(
      `${BASE_URL}${path}`,
      withDefaults({
        method: "PUT",
        body: body != null ? JSON.stringify(body) : undefined,
        ...init,
      }),
    ).then(toJson<T>);
  },
  delete<T = any>(path: string, init?: RequestInit) {
    return fetch(`${BASE_URL}${path}`, withDefaults({ method: "DELETE", ...init })).then(toJson<T>);
  },
};

/* ---------------- Tipos ---------------- */

export type Preset = {
  id: string;
  name: string;
  monsterId?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
};

export type AuthUser = {
  id: string;
  name?: string;
  email: string;
  avatarUrl?: string;
  role?: string;
};

export type AuthLoginInput = { email: string; password: string };
export type AuthRegisterInput = { name?: string; email: string; password: string };
export type AuthForgotInput = { email: string };

/* ----------- Endpoints de Presets ----------- */

export async function fetchPresets(): Promise<Preset[]> {
  try {
    return await api.get<Preset[]>("/presets");
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[fetchPresets] API offline ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡ÃƒÂ¯Ã‚Â¿Ã‚Â½ retornando [] em DEV:", err);
      return [];
    }
    throw err;
  }
}

/* --------------- Endpoints Auth --------------- */

export async function login(input: AuthLoginInput): Promise<{ user: AuthUser }> {
  return api.post<{ user: AuthUser }>("/auth/login", input);
}

export async function logout(): Promise<{ ok: true }> {
  return api.post<{ ok: true }>("/auth/logout");
}

export async function register(input: AuthRegisterInput): Promise<{ user: AuthUser }> {
  return api.post<{ user: AuthUser }>("/auth/register", input);
}

export async function forgotPassword(input: AuthForgotInput): Promise<{ ok: true }> {
  return api.post<{ ok: true }>("/auth/forgot", input);
}

export async function getMe(): Promise<AuthUser> {
  return api.get<AuthUser>("/auth/me");
}

/* --------------- Healthcheck --------------- */

export async function checkHealth(): Promise<string> {
  try {
    const res = await api.get<{ status: string }>("/health");
    return res.status || "online";
  } catch {
    return "offline";
  }
}

/* Exports principais */
export default api;
/** Alias opcionais para compatibilidade com imports existentes */
export { api as Api };
