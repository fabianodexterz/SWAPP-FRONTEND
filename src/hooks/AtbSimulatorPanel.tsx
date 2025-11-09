'use client';

import React from 'react';
// ✅ como está no MESMO diretório "hooks", use caminho relativo simples:
import useAtbSimulator from './useAtbSimulator';

/**
 * Painel do simulador de ATB (desativado).
 * Mantém layout e interações mínimas sem executar simulações reais.
 */
export default function AtbSimulatorPanel() {
  const {
    enabled,
    setEnabled,
    run,
    reset,
    data,
    loading,
    error,
    log,
  } = useAtbSimulator('/api/simulate-atb');

  async function handleSimulate() {
    await run(); // no stub, apenas avisa que está desativado
  }

  return (
    <div className="p-6 border border-base-300 bg-base-200/50 rounded-xl space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">🧩 Simulador de ATB</h2>
        <button
          className="btn btn-sm btn-outline"
          onClick={() => setEnabled((v) => !v)}
        >
          {enabled ? 'Desativar (visual)' : 'Ativar (visual)'}
        </button>
      </div>

      <p className="text-sm opacity-75">
        Este módulo está temporariamente desativado. Ele aparecerá aqui com
        os controles e resultados quando a feature estiver pronta.
      </p>

      <div className="flex gap-2">
        <button
          className="btn btn-primary btn-sm"
          onClick={handleSimulate}
          disabled={loading}
        >
          {loading ? 'Simulando…' : 'Simular (placeholder)'}
        </button>

        <button className="btn btn-ghost btn-sm" onClick={reset} disabled={loading}>
          Limpar
        </button>
      </div>

      {(error || data) && (
        <div className="alert alert-warning text-sm">
          {error ?? JSON.stringify(data)}
        </div>
      )}

      <div className="bg-base-300/40 rounded-lg p-3 text-xs max-h-40 overflow-auto">
        {log.map((line, i) => (
          <div key={i} className="opacity-70">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}
