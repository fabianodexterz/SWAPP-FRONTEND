"use client";

import { useState } from "react";
import Link from "next/link";
import { useToast } from "@/components/Toast";

export default function ForgotPage() {
  const { push } = useToast();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      // Simula requisição
      await new Promise((r) => setTimeout(r, 700));
      setSent(true);
      push("Link de redefinição enviado com sucesso!", "success");
    } catch {
      push("Falha ao enviar o link de redefinição.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh bg-[#0b0f14] text-[#e6dccb]">
      <div className="mx-auto w-full max-w-xl px-4 py-16">
        <div className="card relative overflow-hidden">
          <h1 className="mb-4 text-xl font-semibold text-[#cbb797]">
            Recuperar Senha
          </h1>

          {!sent ? (
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-[#bfae93]">
                  Email
                </label>
                <input
                  className="input"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-70"
              >
                {loading ? "Enviando..." : "Enviar link de redefinição"}
              </button>
            </form>
          ) : (
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-200">
              Um link de redefinição foi enviado para <b>{email}</b>.
            </div>
          )}

          <div className="mt-4 text-center text-sm text-[#bfae93]/80">
            <Link href="/login" className="hover:underline text-[#cbb797]">
              Voltar ao login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
