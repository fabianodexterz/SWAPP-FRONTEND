// src/hooks/useAuth.ts
"use client";

import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api"; // âÅ“â€¦ Import default (sem chaves)

type LoginPayload = { email: string; password: string };
type LoginResponse = { token: string };

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const login = useCallback(async (payload: LoginPayload) => {
    setLoading(true);
    setError(null);

    try {
      const res = await api<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setToken(res?.token || null);
      return res;
    } catch (err: any) {
      setError(err?.message || "Falha ao autenticar.");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api("/auth/logout", { method: "POST" });
      setToken(null);
    } catch {
      setError("Falha ao sair.");
    }
  }, []);

  useEffect(() => {
    // Tenta validar token atual
    (async () => {
      try {
        const res = await api("/auth/me");
        if (res && typeof res === "object" && "id" in res) {
          setToken("valid");
        }
      } catch {
        setToken(null);
      }
    })();
  }, []);

  return {
    token,
    error,
    loading,
    login,
    logout,
  };
}
