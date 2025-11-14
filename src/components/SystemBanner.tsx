'use client';
import { useEffect, useState } from 'react';

const HEALTH_URL =
  process.env.NEXT_PUBLIC_HEALTH_URL ||
  'http://swapp.local/health'; // ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¹Ãƒâ€¦Ã¢â‚¬Å“ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â  atualizado

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
      Backend offline. NÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o foi possÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­vel conectar em {HEALTH_URL}.
      {detail && <span className="block opacity-75">({detail})</span>}
    </div>
  );
}

export default BackendHealthBanner;
