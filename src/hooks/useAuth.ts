'use client'
import { useEffect, useState, useCallback } from 'react'
import { API_URL } from '@/lib/api'

type LoginPayload = { email: string; password: string }
type LoginResponse = { token: string }

export function useAuth() {
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const ck = typeof document !== 'undefined'
      ? document.cookie.split('; ').find(c => c.startsWith('swapp_token=')) : null;
    const fromCookie = ck ? decodeURIComponent(ck.split('=')[1]) : null;
    const fromLS = typeof window !== 'undefined' ? localStorage.getItem('swapp_token') : null;
    setToken(fromCookie || fromLS)
    setLoading(false)
  }, [])

  const login = useCallback(async ({ email, password }: LoginPayload) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    })
    if (!res.ok) {
      let text = 'Login inválido'
      try { const j = await res.json(); if (j?.error) text = j.error } catch {}
      throw new Error(text)
    }
    const data = await res.json() as LoginResponse
    const t = data.token
    const maxAge = 60 * 60 * 24 * 7
    if (typeof document !== 'undefined')
      document.cookie = `swapp_token=${encodeURIComponent(t)}; path=/; max-age=${maxAge}`
    if (typeof window !== 'undefined') localStorage.setItem('swapp_token', t)
    setToken(t)
    return t
  }, [])

  const logout = useCallback(() => {
    if (typeof document !== 'undefined')
      document.cookie = 'swapp_token=; path=/; max-age=0'
    if (typeof window !== 'undefined') localStorage.removeItem('swapp_token')
    setToken(null)
    fetch(`${API_URL}/auth/logout`, { method: 'POST', credentials: 'include' }).catch(() => {})
  }, [])

  return { token, loading, login, logout }
}
