// src/hooks/useAuth.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import { Api } from '@/lib/api';

type LoginPayload = { email: string; password: string };
type LoginResponse = { token: string };

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // carrega token salvo no client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('swapp_token');
      if (saved) setToken(saved);
    }
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await Api<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      if (res?.token) {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('swapp_token', res.token);
        }
        setToken(res.token);
        return true;
      }
      setError('Falha ao autenticar.');
      return false;
    } catch (e: any) {
      setError(e?.message ?? 'Erro ao autenticar.');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Se sua API tiver endpoint de logout, pode chamar aqui:
      // await Api('/auth/logout', { method: 'POST' }).catch(() => {});
    } finally {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('swapp_token');
      }
      setToken(null);
      setLoading(false);
    }
  }, []);

  return {
    token,
    isAuthenticated: !!token,
    loading,
    error,
    login,
    logout,
    setError,
  };
}

export default useAuth;
