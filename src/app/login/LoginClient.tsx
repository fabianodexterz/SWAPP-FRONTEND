"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

export default function LoginClient() {
  const params = useSearchParams();
  const msg = params.get("m") || "";

  return (
    <div className="mx-auto mt-16 w-full max-w-md rounded-2xl border border-white/10 bg-black/30 p-6">
      <h1 className="mb-4 text-xl text-[#e6dccb]">Login</h1>
      {msg && <div className="mb-3 text-sm text-[#cbb797]">{msg}</div>}
      <form action="#" className="space-y-3">
        <input
          className="w-full rounded-md border border-white/10 bg-black/40 p-2 text-[#e6dccb] outline-none"
          placeholder="seu@email.com"
          type="email"
        />
        <input
          className="w-full rounded-md border border-white/10 bg-black/40 p-2 text-[#e6dccb] outline-none"
          placeholder="Senha"
          type="password"
        />
        <button
          type="button"
          className="w-full rounded-md bg-[#cbb797] p-2 font-medium text-black/90"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
