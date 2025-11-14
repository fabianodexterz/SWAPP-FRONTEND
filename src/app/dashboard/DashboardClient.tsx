'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/** ===== Tipos enxutos ===== */
type Element = 'Fire' | 'Water' | 'Wind' | 'Light' | 'Dark';
type Monster = { id: number; name: string; element?: Element };
type Rune = { id: number | string; slot: 1 | 2 | 3 | 4 | 5 | 6; set: string; equipped?: number | null };
type Artifact = { id: number | string; slot?: string; element?: Element };

type AccountData = {
  monsters?: Monster[];
  runes?: Rune[];
  artifacts?: Artifact[];
  // metadados opcionais
  importedAt?: string;
  source?: string;
};

const STORAGE_KEY = 'swapp.account';
const box = 'rounded-2xl border border-white/5 bg-white/[0.03] p-4 md:p-5';

/** ===== Utils ===== */
function safeParse(json: string): AccountData | null {
  try {
    const data = JSON.parse(json);
    return {
      monsters: Array.isArray(data.monsters) ? data.monsters : [],
      runes: Array.isArray(data.runes) ? data.runes : [],
      artifacts: Array.isArray(data.artifacts) ? data.artifacts : [],
      importedAt: data.importedAt ?? new Date().toISOString(),
      source: data.source ?? 'local',
    };
  } catch {
    return null;
  }
}

function formatDate(iso?: string) {
  if (!iso) return 'ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡ÃƒÂ¯Ã‚Â¿Ã‚Â½';
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso;
  }
}

/** ===== Componente ===== */
export default function DashboardClient() {
  const [data, setData] = useState<AccountData>({ monsters: [], runes: [], artifacts: [], importedAt: undefined });
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Carrega do storage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = safeParse(raw);
        if (parsed) setData(parsed);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const totals = useMemo(
    () => ({
      monsters: data.monsters?.length ?? 0,
      runes: data.runes?.length ?? 0,
      artifacts: data.artifacts?.length ?? 0,
    }),
    [data],
  );

  const byElement = useMemo(() => {
    const base: Record<Element, number> = { Fire: 0, Water: 0, Wind: 0, Light: 0, Dark: 0 };
    (data.monsters ?? []).forEach((m) => {
      if (m.element && base[m.element as Element] !== undefined) base[m.element as Element] += 1;
    });
    return base;
  }, [data]);

  const topSets = useMemo(() => {
    const counts = new Map<string, number>();
    (data.runes ?? []).forEach((r) => counts.set(r.set, (counts.get(r.set) ?? 0) + 1));
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([set, qty]) => ({ set, qty }));
  }, [data]);

  const maxElem = Math.max(1, ...Object.values(byElement));
  const elemOrder: Element[] = ['Fire', 'Water', 'Wind', 'Light', 'Dark'];

  /** Importar arquivo */
  const onPickFile = useCallback(async (file: File) => {
    setError(null);
    const text = await file.text();
    const parsed = safeParse(text);
    if (!parsed) {
      setError('JSON invÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡lido. Esperado: {"monsters":[...], "runes":[...], "artifacts":[...]}');
      return;
    }
    const payload: AccountData = { ...parsed, importedAt: new Date().toISOString(), source: file.name };
    setData(payload);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, []);

  /** Drag & drop */
  const onDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) await onPickFile(file);
    },
    [onPickFile],
  );

  /** Exportar */
  const onExport = useCallback(() => {
    const content = JSON.stringify(data, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `swapp_account_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [data]);

  /** Limpar */
  const onClear = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setData({ monsters: [], runes: [], artifacts: [] });
    setError(null);
  }, []);

  const dropClasses = dragOver ? 'border-yellow-400/60 bg-yellow-400/5' : 'border-white/10 bg-white/[0.02]';

  return (
    <div className="space-y-6">
      {/* Importador */}
      <div
        className={`${box} transition-colors ${dropClasses}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-[#e7d9b8] font-semibold">Importar conta (JSON)</h2>
            <p className="text-sm text-white/60 mt-1">
              Clique em <b>Importar JSON</b> ou arraste seu arquivo aqui. Suportado: <code>monsters</code>, <code>runes</code> e <code>artifacts</code>.
              Os dados ficam apenas no seu navegador.
            </p>
            {data.importedAt && (
              <p className="text-xs text-white/40 mt-1">
                ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ltima importaÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o: {formatDate(data.importedAt)} {data.source ? `ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ (${data.source})` : ''}
              </p>
            )}
            {error && <p className="text-xs text-red-300 mt-2">ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â  {error}</p>}
          </div>
          <div className="flex flex-wrap gap-2">
            <input
              ref={inputRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (f) await onPickFile(f);
                if (inputRef.current) inputRef.current.value = '';
              }}
            />
            <button
              onClick={() => inputRef.current?.click()}
              className="rounded-xl px-4 py-2 text-sm font-semibold bg-yellow-400/90 hover:bg-yellow-400 text-black"
              title="Selecionar arquivo JSON"
            >
              Importar JSON
            </button>
            <button
              onClick={onExport}
              className="rounded-xl px-4 py-2 text-sm border border-white/10 bg-white/[0.06] hover:bg-white/[0.1]"
              disabled={(data.monsters?.length ?? 0) + (data.runes?.length ?? 0) + (data.artifacts?.length ?? 0) === 0}
              title="Exportar dados atuais"
            >
              Exportar
            </button>
            <button
              onClick={onClear}
              className="rounded-xl px-4 py-2 text-sm border border-white/10 bg-white/[0.06] hover:bg-white/[0.1]"
              title="Limpar dados salvos"
            >
              Limpar
            </button>
          </div>
        </div>
      </div>

      {/* Cards de totais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={box}>
          <p className="text-white/60 text-xs uppercase">Monstros</p>
          <p className="text-3xl font-bold text-[#cbb797] mt-1">{totals.monsters}</p>
        </div>
        <div className={box}>
          <p className="text-white/60 text-xs uppercase">Runas</p>
          <p className="text-3xl font-bold text-[#cbb797] mt-1">{totals.runes}</p>
        </div>
        <div className={box}>
          <p className="text-white/60 text-xs uppercase">Artefatos</p>
          <p className="text-3xl font-bold text-[#cbb797] mt-1">{totals.artifacts}</p>
        </div>
      </div>

      {/* DistribuiÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o por elemento */}
      <div className={box}>
        <p className="text-white/60 text-xs uppercase mb-3">Por elemento</p>
        <div className="space-y-3">
          {elemOrder.map((k) => {
            const v = byElement[k];
            const pct = Math.round((v / maxElem) * 100);
            const color =
              k === 'Fire'
                ? '#a0442a'
                : k === 'Water'
                ? '#1f5aa3'
                : k === 'Wind'
                ? '#2a8b55'
                : k === 'Light'
                ? '#bfa76a'
                : '#6b4aa3';
            return (
              <div key={k}>
                <div className="flex justify-between text-sm text-white/70 mb-1">
                  <span>{k}</span>
                  <span>{v}</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-2" style={{ width: `${pct}%`, backgroundColor: color }} />
                </div>
              </div>
            );
          })}
        </div>
        {totals.monsters === 0 && (
          <p className="text-xs text-white/50 mt-3">Dica: importe seu JSON para ver os nÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âºmeros reais da sua conta.</p>
        )}
      </div>

      {/* Resumo rÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡pido de sets de runas */}
      <div className={box}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-white/60 text-xs uppercase">Sets de runas mais frequentes</p>
          <span className="text-xs text-white/40">Top 6</span>
        </div>
        {topSets.length === 0 ? (
          <p className="text-sm text-white/60">Nenhuma runa encontrada. Importe seu JSON.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {topSets.map((s) => (
              <div
                key={s.set}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 flex items-center justify-between"
              >
                <span className="text-white/80">{s.set}</span>
                <span className="text-[#cbb797] font-semibold">{s.qty}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RodapÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â© de ajuda */}
      <div className="text-xs text-white/40">
        <p>
          Formato aceito do JSON:&nbsp;
          <code>
            {'{ "monsters":[...] , "runes":[...] , "artifacts":[...] }'}
          </code>
          . Campos extras sÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o ignorados com seguranÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§a.
        </p>
      </div>
    </div>
  );
}
