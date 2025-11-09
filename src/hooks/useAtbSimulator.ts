// =====================================================
// src/hooks/useAtbSimulator.ts
// Hook "stub" (desativado) para o simulador de ATB.
// Mantém a API esperada e evita quebras no build.
// =====================================================

import { useCallback, useState } from 'react';

type UseAtbReturn = {
  enabled: boolean;
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;

  // API esperada pelo painel
  run: (...args: any[]) => Promise<void>;
  reset: () => void;
  data: any;
  loading: boolean;
  error: string | null;

  log: string[];
};

export function useAtbSimulator(_endpoint?: string): UseAtbReturn {
  const [enabled, setEnabled] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const log = [
    '⚙️ Simulador de ATB está desativado nesta versão.',
    '🔒 Quando ativado, permitirá simular barras de turno e ordem de ação.',
  ];

  const run = useCallback(async () => {
    setLoading(true);
    try {
      console.warn('[useAtbSimulator] run() chamado – recurso desativado.');
      setError('Simulador de ATB desativado temporariamente.');
      setData(null);
      await new Promise((r) => setTimeout(r, 150));
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return {
    enabled,
    setEnabled,
    run,
    reset,
    data,
    loading,
    error,
    log,
  };
}

export default useAtbSimulator;
