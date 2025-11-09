'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { doLogin } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      const res = await doLogin(email, password);
      if (!res.ok) {
        setErr(res.message);
        return;
      }
      // guarda token (ajuste depois para cookies httpOnly se preferir)
      if (typeof window !== 'undefined') {
        localStorage.setItem('swapp_token', res.token);
      }
      router.push('/dashboard');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0e13] text-white px-4">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-black/40 p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-2">Entrar</h1>
        <p className="text-center text-white/60 mb-8">Acesse sua conta para continuar</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-[#141820] border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="voce@exemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Senha</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-[#141820] border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="••••••••"
            />
          </div>

          {err && (
            <div className="text-sm text-red-400">{err}</div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-lg bg-yellow-400 text-black font-semibold py-3 hover:bg-yellow-300 transition disabled:opacity-60"
          >
            {busy ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="text-center mt-6 text-white/60">
          Novo por aqui? <a href="/register" className="text-yellow-300 hover:underline">Criar conta</a>
        </div>
      </div>
    </div>
  );
}
