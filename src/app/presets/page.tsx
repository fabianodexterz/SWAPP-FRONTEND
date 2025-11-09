// src/app/presets/page.tsx
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { fetchPresets, type Preset as ApiPreset } from '@/lib/api';
import { useLang } from '@/store/lang';

// -------- Tipos da UI (independentes do tipo da API) --------
type UIPreset = {
  id: string | number;
  name: string;          // nome do preset
  monsterName: string;   // nome do monstro
  runeSets: string;      // ex.: "Violent, Will"
  stats?: Record<string, number>;
  locale: string;        // pt | en ...
};

type SortKey = 'name' | 'monsterName' | 'runeSets';

export default function PresetsPage() {
  const { locale, t } = useLang();

  const [items, setItems] = useState<UIPreset[]>([]);
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<SortKey>('name');

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);
  const perPageOptions = [6, 9, 12, 18];

  // --- mapeia o retorno da API para o tipo da UI ---
  const mapApiToUI = (p: ApiPreset): UIPreset => {
    const anyP = p as any; // campos não garantidos pela API

    const id =
      anyP.id ??
      anyP.slug ??
      `${anyP.name ?? ''}-${anyP.monsterName ?? anyP.monster ?? ''}`;

    const name: string = anyP.name ?? anyP.title ?? '';
    const monsterName: string = anyP.monsterName ?? anyP.monster ?? '';
    const runeSets: string = Array.isArray(anyP.sets)
      ? anyP.sets.join(', ')
      : anyP.runeSets ?? '';

    const stats: Record<string, number> | undefined = anyP.stats ?? undefined;
    const loc: string = anyP.locale ?? 'pt';

    return { id, name, monsterName, runeSets, stats, locale: loc };
  };

  // carregar presets
  useEffect(() => {
    (async () => {
      const res = await fetchPresets();
      const mapped: UIPreset[] = (res.items ?? []).map(mapApiToUI);
      setItems(mapped);
    })();
  }, []);

  // filtro + sort
  const filtered = useMemo(() => {
    const s = q.toLowerCase().trim();
    return items
      .filter(
        (p) =>
          p.locale === locale &&
          (!s ||
            p.name.toLowerCase().includes(s) ||
            p.monsterName.toLowerCase().includes(s) ||
            p.runeSets.toLowerCase().includes(s)),
      )
      .sort((a, b) => String(a[sort]).localeCompare(String(b[sort])));
  }, [items, q, sort, locale]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice(
    (page - 1) * perPage,
    (page - 1) * perPage + perPage,
  );

  // sempre que mudar filtros, volta pra página 1
  useEffect(() => {
    setPage(1);
  }, [q, sort, perPage, locale]);

  return (
    <main className="container-app py-8 space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            {t?.('presets.title') ?? 'Presets de Runas'}
          </h1>
          <p className="text-xs text-gray-400">
            {t?.('presets.subtitle') ??
              'Pesquise e organize presets prontos por monstro e sets.'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <input
            className="input w-56"
            placeholder={t?.('common.search') ?? 'Pesquisar...'}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          <select
            className="select"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
          >
            <option value="name">Nome</option>
            <option value="monsterName">Monstro</option>
            <option value="runeSets">Sets</option>
          </select>

          <select
            className="select"
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
          >
            {perPageOptions.map((n) => (
              <option key={n} value={n}>
                {n}/página
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* lista */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {pageItems.map((p) => (
          <article key={p.id} className="card">
            <h3 className="font-medium text-lg">{p.name}</h3>
            <p className="text-sm text-gray-400">{p.monsterName}</p>
            <div className="mt-2 flex flex-wrap gap-1 text-xs">
              {p.runeSets.split(',').map((s) => (
                <span key={s.trim()} className="badge">
                  {s.trim()}
                </span>
              ))}
            </div>
            {p.stats && (
              <div className="mt-3 text-xs text-gray-400">
                {Object.entries(p.stats).map(([k, v]) => (
                  <span key={k} className="mr-2">
                    {k.toUpperCase()}: {v}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}

        {pageItems.length === 0 && (
          <div className="col-span-full text-sm text-gray-400">
            {t?.('common.noResults') ?? 'Nenhum preset encontrado.'}
          </div>
        )}
      </section>

      {/* paginação */}
      <footer className="flex items-center justify-between">
        <span className="text-xs text-gray-400">
          {filtered.length} resultados • {totalPages} páginas
        </span>
        <div className="flex gap-2">
          <button
            className="btn"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            ←
          </button>
          <span className="text-sm">
            {page}/{totalPages}
          </span>
          <button
            className="btn"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            →
          </button>
        </div>
      </footer>
    </main>
  );
}
