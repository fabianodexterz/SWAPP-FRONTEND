"use client";

import React, { useState } from "react";
import Link from "next/link";
import api from "@/lib/api";

export default function ResetPage() {
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    setErr(null);

    const data = Object.fromEntries(new FormData(e.currentTarget)) as {
      token: string;
      password: string;
    };

    try {
      const res = await api("/auth/reset", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setMsg(typeof res === "string" ? res : "Senha redefinida!");
      // TODO: redirecionar para /auth/login após sucesso
    } catch (e: any) {
      setErr(e?.message ?? "Falha ao redefinir senha.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-xl font-semibold">Redefinir senha</h1>

      {msg && <div className="alert alert-success">{msg}</div>}
      {err && <div className="alert alert-error">{err}</div>}

      <form className="space-y-3" onSubmit={onSubmit}>
        <input name="token" className="input input-bordered w-full" placeholder="Token do e-mail" required />
        <input name="password" type="password" className="input input-bordered w-full" placeholder="Nova senha" required />
        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Salvando..." : "Redefinir"}
        </button>
      </form>

      <div className="text-sm">
        <Link href="/auth/login" className="link">Voltar ao login</Link>
      </div>
    </div>
  );
}
