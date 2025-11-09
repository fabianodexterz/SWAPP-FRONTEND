// src/App.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Api } from '@/lib/api';
import { useToastStore } from '@/store/toast';

/**
 * Pequena sonda de saúde do backend.
 * Renderiza nada; apenas verifica /health e dispara toast.
 */
export default function App() {
  const [ok, setOk] = useState<boolean | null>(null);
  const { addToast } = useToastStore();

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        // CHAME A FUNÇÃO Api DIRETAMENTE (não existe Api.get)
        const h = await Api<{ ok: boolean }>('/health');

        if (!mounted) return;

        setOk(!!h?.ok);

        if (h?.ok) {
          addToast('Backend conectado com sucesso!', 'success');
        } else {
          addToast('Backend fora do ar', 'error');
        }
      } catch (_) {
        if (!mounted) return;
        setOk(false);
        addToast('Não foi possível contatar o backend.', 'error');
      }
    })();

    return () => {
      mounted = false;
    };
  }, [addToast]);

  // Não precisa renderizar nada
  return null;
}
