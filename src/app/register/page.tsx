"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/components/Toast";

export default function RegisterPage() {
  const router = useRouter();
  const { push } = useToast();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirm) {
      push("As senhas não coincidem.", "error");
      return;
    }

    setLoading(true);
    try {
      // Simula API
      await new Promise((r) => setTimeout(r, 800));

      push("Conta criada com sucesso!", "success");
      router.push("/login?email=" + email);
    } catch {
      push("Falha ao criar conta. Tente novamente.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh bg-[#0b0f14] text-[#e6dccb]">
      <div className="mx-auto w-full max-w-xl px-4 py-16">
        <div className="card relative overflow-hidden">
          <h1 className="mb-4 text-xl font-semibold text-[#cbb797]">
            Criar Conta
          </h1>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm text-[#bfae93]">Nome</label>
              <input
                className="input"
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-[#bfae93]">Email</label>
              <input
                className="input"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-[#bfae93]">Senha</label>
              <input
                className="input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-[#bfae93]">
                Confirmar senha
              </label>
              <input
                className="input"
                type="password"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-70"
            >
              {loading ? "Criando..." : "Criar conta"}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-[#bfae93]/80">
            Já tem uma conta?{" "}
            <Link href="/login" className="hover:underline text-[#cbb797]">
              Entrar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
