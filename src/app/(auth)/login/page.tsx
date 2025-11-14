"use client";

import React, { useState } from "react";
import Link from "next/link";
import api from "@/lib/api";

export default function LoginPage() {
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    setErr(null);

    const data = Object.fromEntries(new FormData(e.currentTarget)) as {
      email: string;
      password: string;
    };

    try {
      const res = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setMsg(typeof res === "string" ? res : "Login efetuado!");
      // TODO: redirecionar para / (ou rota protegida) após login
    } catch (e: any) {
      setErr(e?.message ?? "Falha ao efetuar login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-xl font-semibold">Entrar</h1>

      {msg && <div className="alert alert-success">{msg}</div>}
      {err && <div className="alert alert-error">{err}</div>}

      <form className="space-y-3" onSubmit={onSubmit}>
        <input name="email" type="email" className="input input-bordered w-full" placeholder="E-mail" required />
        <input name="password" type="password" className="input input-bordered w-full" placeholder="Senha" required />
        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <div className="text-sm flex items-center justify-between">
        <Link href="/auth/forgot" className="link">Esqueci a senha</Link>
        <Link href="/auth/register" className="link">Criar conta</Link>
      </div>
    </div>
  );
}
