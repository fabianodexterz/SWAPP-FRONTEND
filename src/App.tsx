'use client';
import React, { useEffect, useState } from 'react';
import { Api } from '@/lib/api';

export default function App() {
  const [ok, setOk] = useState(null);

  useEffect(() => {
    Api.get('/health', {}) // 2º argumento para tipagens rígidas
      .then((h) => setOk(!!h.ok))
      .catch(() => setOk(false));
  }, []);

  return (
    <div className="p-6 text-sm text-[#e8e6e3]">
      <div className="opacity-70">Backend status:</div>
      <div className="mt-1 font-semibold">
        {ok === null ? 'checando…' : ok ? 'OK' : 'OFFLINE'}
      </div>
    </div>
  );
}
