const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'

export async function getJson<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API}${path}`
  const res = await fetch(url, { ...init, cache: 'no-store' })
  if (!res.ok) {
    const txt = await res.text().catch(() => '')
    throw new Error(`${res.status} ${res.statusText} ${txt}`.trim())
  }
  return res.json() as Promise<T>
}
