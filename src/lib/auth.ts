// src/lib/auth.ts
'use server'

export type LoginResult =
  | { ok: true; token: string }
  | { ok: false; message: string }

export async function doLogin(email: string, password: string): Promise<LoginResult> {
  const base = process.env.NEXT_PUBLIC_API_URL!
  try {
    const res = await fetch(`${base}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      cache: 'no-store',
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      return { ok: false, message: err?.message ?? 'Falha no login' }
    }

    const data = await res.json()
    if (!data?.token) return { ok: false, message: 'Resposta invÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡lida do servidor' }
    return { ok: true, token: String(data.token) }
  } catch {
    return { ok: false, message: 'Erro de rede. Tente novamente.' }
  }
}
