// src/app/register/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Api } from '@/lib/api';
import { useToastStore } from '@/store/toast'; // <- correto: usa addToast

export default function RegisterPage() {
  const router = useRouter();
  const addToast = useToastStore((s) => s.addToast);

  const [email, setEmail] = useState('');
  const [name, setName]   = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password || !name) {
      addToast('Preencha nome, e-mail e senha.', 'error');
      return;
    }

    setLoading(true);
    try {
      await Api('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      addToast('Conta criada com sucesso!', 'success');
      router.push('/auth/login?registered=1');
    } catch (err: any) {
      addToast(err?.message ?? 'Falha ao registrar. Tente novamente.', 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container-app min-h-screen flex items-center justify-center py-10">
      <div className="card w-full max-w-md">
        <h1 className="text-xl font-semibold mb-2">Criar conta</h1>
        <p className="text-xs text-gray-400 mb-4">
          Preencha seus dados para acessar o SWAPP.
        </p>

        <form onSubmit={onSubmit} className="space-y-3">
          <input
            className="input w-full"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />

          <input
            className="input w-full"
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <input
            className="input w-full"
            placeholder="Senha (mín. 6)"
            type="password"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />

          <button className="btn w-full" disabled={loading}>
            {loading ? 'Criando...' : 'Criar conta'}
          </button>
        </form>

        <div className="mt-4 text-center text-xs text-gray-400">
          Já tem conta?{' '}
          <a href="/auth/login" className="link">Entrar</a>
        </div>
      </div>
    </main>
  );
}
