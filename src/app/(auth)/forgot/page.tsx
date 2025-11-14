"use client";

import React, { useState } from "react";
import Link from "next/link";
import api from "@/lib/api";

export default function ForgotPage() {
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
    };

    try {
      const res = await api("/auth/forgot", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setMsg(
        typeof res === "string"
          ? res
          : "Se existir uma conta, enviaremos um e-mail de recuperação."
      );
    } catch (e: any) {
      setErr(e?.message ?? "Falha ao solicitar recuperação.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-xl font-semibold">Esqueci a senha</h1>

      {msg && <div className="alert alert-success">{msg}</div>}
      {err && <div className="alert alert-error">{err}</div>}

      <form className="space-y-3" onSubmit={onSubmit}>
        <input name="email" type="email" className="input input-bordered w-full" placeholder="E-mail" required />
        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Enviando..." : "Enviar link"}
        </button>
      </form>

      <div className="text-sm">
        <Link href="/auth/login" className="link">Voltar ao login</Link>
      </div>
    </div>
  );
}
