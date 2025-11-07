// src/components/BackButton.tsx
'use client';
import Link from 'next/link';

export default function BackButton({ href = '/otimizador', label = 'Voltar' }: { href?: string; label?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-sm hover:opacity-90"
      style={{ background: '#2b2218', borderColor: '#4b3b28', color: '#f6d08f' }}
    >
      ← {label}
    </Link>
  );
}
