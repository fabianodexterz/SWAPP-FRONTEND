// src/app/monsters/page.tsx
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { fetchMonsters, type Monster } from '@/lib/api';

type SortKey = 'name' | 'element' | 'natStars';

export default function MonstersPage() {
  const [q, setQ] = useState('');
  const [data, setData] = useState<Monster[]>([]);
  const [loading, setLoading] = useState(false);

  const [sort, setSort] = useState<SortKey>('name');
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetchMonsters('', 1, 100);
        const items = (res.items ?? []).map((m) => ({
          ...m,
          // garante booleano (evita undefined) para a UI
          awakened: !!m.awakened,
        }));
        setData(items);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const s = q.toLowerCase().trim();
    const base = data.filter(
      (m) =>
        !s ||
        m.name.toLowerCase().includes(s) ||
        m.element.toLowerCase().includes(s)
    );

    return base.sort((a, b) =>
      sort === 'natStars'
        ? b.natStars - a.natStars
        : String(a[sort]).localeCompare(String(b[sort]))
    );
  }, [data, q, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice(
    (page - 1) * perPage,
    (page - 1) * perPage + perPage
  );

  useEffect(() => {
    setPage(1);
  }, [q, sort]);

  return (
    <main className="container-app py-8">
      <h1 className="text-2xl font-semibold mb-4">Monstros</h1>

      <div className="flex flex-wrap gap-3 items-center mb-5">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nome/elemento…"
          className="input w-full sm:w-80"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="select"
        >
          <option value="name">Nome</option>
          <option value="element">Elemento</option>
          <option value="natStars">Estrelas</option>
        </select>
      </div>

      {loading ? (
        <p className="text-sm text-gray-400">Carregando…</p>
      ) : pageItems.length === 0 ? (
        <p className="text-sm text-gray-400">Nenhum monstro encontrado.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pageItems.map((m) => (
            <li key={m.id} className="card">
              <div className="flex items-center gap-3">
                {/* retrato se existir */}
                {m.portraitUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={m.portraitUrl}
                    alt={m.name}
                    className="w-14 h-14 rounded-lg object-cover border border-base-300"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-base-200 border border-base-300" />
                )}

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{m.name}</h3>
                    <span className="badge">{m.element}</span>
                    {m.awakened && (
                      <span className="badge badge-success">Awakened</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400">
                    {m.natStars}★ {m.archetype ? `• ${m.archetype}` : ''}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* paginação */}
      {totalPages > 1 && (
        <div className="flex items-center gap-2 mt-6">
          <button
            className="btn btn-sm"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            «
          </button>
          <span className="text-sm">
            Página {page} de {totalPages}
          </span>
          <button
            className="btn btn-sm"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            »
          </button>
        </div>
      )}
    </main>
  );
}
