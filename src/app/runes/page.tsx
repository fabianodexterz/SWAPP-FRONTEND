// src/app/runes/page.tsx
"use client";

import { useCallback, useMemo, useState } from "react";

type ImportedRune = {
  id?: number | string;
  slot: 1 | 2 | 3 | 4 | 5 | 6;
  set: string;
  level?: number;
  main?: string;
  subs?: Record<string, number> | string[] | null;
  equipped?: number | string | null;
};

type Summary = {
  total: number;
  bySet: Array<{ set: string; qty: number }>;
  bySlot: Array<{ slot: number; qty: number }>;
  avgLevel: number;
  subPresenceTop: Array<{ sub: string; qty: number }>;
};

export default function RunesPage() {
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);

  const onFile = useCallback(async (f: File) => {
    setError(null);
    try {
      const text = await f.text();
      const json = JSON.parse(text);

      // Aceitar: { runes: [...] } OU [...]
      const runes: ImportedRune[] = Array.isArray(json) ? json : Array.isArray(json?.runes) ? json.runes : [];
      if (!Array.isArray(runes) || runes.length === 0) {
        throw new Error("Formato invÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡lido. Esperado: array de runas ou { runes: [...] }.");
      }

      // Persistir o bruto para testes locais
      localStorage.setItem("swapp.account.runes", JSON.stringify(runes));

      // SumarizaÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o
      const s = summarize(runes);
      setSummary(s);
      // Pequena badge visual
    } catch (e: any) {
      setError(e?.message || "Falha ao ler JSON.");
      setSummary(null);
    }
  }, []);

  return (
    <main className="px-6 md:px-10 lg:px-12 py-8 max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 text-[#cbb797]">Runes</h1>

      <div className="rounded-2xl bg-[#111214] border border-[#2b2b2b] p-5">
        <p className="text-sm text-[#c9c9c9]">
          Ainda nÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o conectamos ao backend nesta aba. VocÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âª pode importar seus <b>presets/runas</b> em JSON para testes locais.
        </p>

        <div className="mt-4 flex items-center gap-3">
          <label className="inline-flex items-center gap-2">
            <input
              type="file"
              accept="application/json,.json"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onFile(file);
              }}
              className="hidden"
              id="runes-file"
            />
            <span className="px-4 py-2 rounded-xl bg-[#cbb797] text-black font-medium cursor-pointer" role="button" onClick={() => document.getElementById("runes-file")?.click()}>
              Importar JSON
            </span>
          </label>

          <a
            href="/optimizer"
            className="px-4 py-2 rounded-xl border border-[#2b2b2b] text-[#e6e6e6] hover:bg-[#1a1a1a]"
          >
            Ir ao Otimizador
          </a>
        </div>

        {error && (
          <div className="mt-4 text-sm text-[#f2b9b9]">
            {error}
          </div>
        )}

        {summary && (
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {/* KPIs */}
            <div className="rounded-xl border border-[#2a2a2a] p-4 bg-[#0c0c0d]">
              <div className="text-sm font-semibold text-[#cbb797] mb-2">VisÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o Geral</div>
              <div className="text-sm space-y-2">
                <div>Total de runas: <b>{summary.total}</b></div>
                <div>NÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­vel mÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©dio: <b>{summary.avgLevel.toFixed(2)}</b></div>
              </div>
            </div>

            {/* Por slot */}
            <div className="rounded-xl border border-[#2a2a2a] p-4 bg-[#0c0c0d]">
              <div className="text-sm font-semibold text-[#cbb797] mb-2">Por Slot</div>
              <div className="text-sm flex flex-wrap gap-2">
                {summary.bySlot.map(s => (
                  <span key={s.slot} className="px-3 py-1 rounded-xl bg-[#161618] border border-[#2a2a2a]">
                    {s.slot}: <b>{s.qty}</b>
                  </span>
                ))}
              </div>
            </div>

            {/* Por set */}
            <div className="rounded-xl border border-[#2a2a2a] p-4 bg-[#0c0c0d] md:col-span-2">
              <div className="text-sm font-semibold text-[#cbb797] mb-2">Por Set</div>
              <div className="text-sm flex flex-wrap gap-2">
                {summary.bySet.map(s => (
                  <span key={s.set} className="px-3 py-1 rounded-xl bg-[#161618] border border-[#2a2a2a]">
                    {s.set}: <b>{s.qty}</b>
                  </span>
                ))}
              </div>
            </div>

            {/* Substats mais comuns */}
            <div className="rounded-xl border border-[#2a2a2a] p-4 bg-[#0c0c0d] md:col-span-2">
              <div className="text-sm font-semibold text-[#cbb797] mb-2">Substats mais presentes</div>
              <div className="text-sm flex flex-wrap gap-2">
                {summary.subPresenceTop.map(s => (
                  <span key={s.sub} className="px-3 py-1 rounded-xl bg-[#161618] border border-[#2a2a2a]">
                    {s.sub}: <b>{s.qty}</b>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-[#9aa0a6]">
        Os dados importados ficam somente no seu navegador (localStorage) para testes locais.
      </p>
    </main>
  );
}

function summarize(runes: ImportedRune[]): Summary {
  const total = runes.length;

  // por set
  const setCount = new Map<string, number>();
  for (const r of runes) setCount.set(r.set, (setCount.get(r.set) ?? 0) + 1);
  const bySet = [...setCount.entries()]
    .sort((a,b) => b[1] - a[1])
    .map(([set, qty]) => ({ set, qty }));

  // por slot
  const slotCount = new Map<number, number>();
  for (const r of runes) slotCount.set(r.slot, (slotCount.get(r.slot) ?? 0) + 1);
  const bySlot = [...slotCount.entries()]
    .sort((a,b) => a[0] - b[0])
    .map(([slot, qty]) => ({ slot, qty }));

  // nÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­vel mÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©dio
  const levels = runes.map(r => r.level ?? 0);
  const avgLevel = levels.reduce((a,b) => a+b, 0) / Math.max(1, levels.length);

  // substats
  const subCount = new Map<string, number>();
  for (const r of runes) {
    if (!r.subs) continue;
    if (Array.isArray(r.subs)) {
      r.subs.forEach(s => subCount.set(String(s), (subCount.get(String(s)) ?? 0) + 1));
    } else {
      Object.keys(r.subs).forEach(k => subCount.set(k, (subCount.get(k) ?? 0) + 1));
    }
  }
  const subPresenceTop = [...subCount.entries()]
    .sort((a,b) => b[1] - a[1])
    .slice(0, 12)
    .map(([sub, qty]) => ({ sub, qty }));

  return { total, bySet, bySlot, avgLevel, subPresenceTop };
}
