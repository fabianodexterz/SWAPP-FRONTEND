"use client";
import React, { useState } from "react";
import { loginAction } from "../actions";

export default function LoginPage() {
  const [pending, setPending] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    try {
      const data = new FormData(e.currentTarget);
      await loginAction(data);
    } catch (err) {
      alert((err as Error)?.message || "Erro ao entrar");
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h1 className="text-2xl font-semibold text-zinc-100 text-center">Entrar</h1>
      <div className="space-y-2">
        <label className="text-sm text-zinc-300">E-mail</label>
        <input name="email" type="email" required className="w-full rounded-lg bg-zinc-800/70 px-4 py-2 outline-none ring-1 ring-zinc-700 focus:ring-amber-400" placeholder="voce@exemplo.com" />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-zinc-300">Senha</label>
        <input name="password" type="password" required className="w-full rounded-lg bg-zinc-800/70 px-4 py-2 outline-none ring-1 ring-zinc-700 focus:ring-amber-400" placeholder="••••••••" />
      </div>
      <button type="submit" disabled={pending} className="w-full rounded-lg bg-amber-400 px-4 py-2 font-semibold text-zinc-900 hover:bg-amber-300 disabled:opacity-60">
        {pending ? "Entrando..." : "Entrar"}
      </button>
      <p className="pt-2 text-center text-sm text-zinc-400">
        Novo por aqui? <a className="text-amber-300 hover:underline" href="/register">Criar conta</a>
      </p>
    </form>
  );
}
