'use client';
import { useEffect, useState } from 'react';

const HEALTH_URL =
  process.env.NEXT_PUBLIC_HEALTH_URL ||
  'http://swapp.local/health'; // 👈 atualizado

type HealthResponse = { ok: boolean; name?: string; time?: string; error?: string };

export function BackendHealthBanner() {
  const [status, setStatus] = useState<'ok' | 'fail' | 'loading'>('loading');
  const [detail, setDetail] = useState<string>('');

  useEffect(() => {
    async function check() {
      try {
        const res = await fetch(HEALTH_URL, { cache: 'no-store' });
        const data: HealthResponse = await res.json();
        if (data.ok) {
          setStatus('ok');
          setDetail('');
        } else {
          setStatus('fail');
          setDetail(data.error || 'Erro desconhecido');
        }
      } catch (err: any) {
        setStatus('fail');
        setDetail(String(err.message || err));
      }
    }

    check();
    const interval = setInterval(check, 15000);
    return () => clearInterval(interval);
  }, []);

  if (status === 'ok') return null;

  return (
    <div className="bg-yellow-900/40 border border-yellow-700 text-yellow-200 p-3 rounded-md text-sm">
      Backend offline. Não foi possível conectar em {HEALTH_URL}.
      {detail && <span className="block opacity-75">({detail})</span>}
    </div>
  );
}

export default BackendHealthBanner;
