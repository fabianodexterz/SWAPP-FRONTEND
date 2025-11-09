// src/app/runas/page.tsx
'use client';

import React, { useMemo, useState } from 'react';
import { themeTokens as ui } from '../theme'; // <- tokens de cor corretos

type Runa = {
  id: number;
  set: string;
  slot: 1 | 2 | 3 | 4 | 5 | 6;
  main: string;
  substats: string[];
};

const MOCK: Runa[] = [
  { id: 1, set: 'Violent', slot: 2, main: 'SPD +42',     substats: ['CRI 9%', 'CDMG 12%', 'HP 7%'] },
  { id: 2, set: 'Will',    slot: 4, main: 'CDMG +80%',   substats: ['ATK 8%', 'SPD 12', 'ACC 10%'] },
  { id: 3, set: 'Swift',   slot: 6, main: 'HP +63%',     substats: ['RES 12%', 'DEF 8%', 'SPD 7'] },
];

export default function RunasPage() {
  const [q, setQ] = useState('');
  const [slot, setSlot] = useState<number | 'all'>('all');
  const [setName, setSetName] = useState('');

  const list = useMemo(() => {
    const s = q.toLowerCase().trim();
    return MOCK.filter((r) => {
      const okQ =
        !s ||
        r.set.toLowerCase().includes(s) ||
        r.main.toLowerCase().includes(s) ||
        r.substats.some((t) => t.toLowerCase().includes(s));
      const okSlot = slot === 'all' || r.slot === slot;
      const okSet = !setName || r.set.toLowerCase().includes(setName.toLowerCase());
      return okQ && okSlot && okSet;
    });
  }, [q, slot, setName]);

  return (
    <main className="container-app mx-auto max-w-6xl px-4 py-10">
      <h1
        className="text-3xl font-bold mb-6"
        style={{
          color: ui.text.title,
          textShadow: '0 0 6px rgba(216,132,104,.35)',
        }}
      >
        Runas
      </h1>

      <div
        className="rounded-xl border p-6 space-y-5"
        style={{
          background: ui.bg.panel,
          borderColor: ui.border.base,
        }}
      >
        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            className="input w-full"
            placeholder="Buscar por set / main / sub"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          <select
            className="input w-full"
            value={slot}
            onChange={(e) => {
              const val = e.target.value;
              setSlot(val === 'all' ? 'all' : (Number(val) as 1 | 2 | 3 | 4 | 5 | 6));
            }}
          >
            <option value="all">Todos os slots</option>
            <option value="1">Slot 1</option>
            <option value="2">Slot 2</option>
            <option value="3">Slot 3</option>
            <option value="4">Slot 4</option>
            <option value="5">Slot 5</option>
            <option value="6">Slot 6</option>
          </select>

          <input
            className="input w-full"
            placeholder="Filtro por Set (ex.: Violent)"
            value={setName}
            onChange={(e) => setSetName(e.target.value)}
          />
        </div>

        {/* Lista */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((r) => (
            <div
              key={r.id}
              className="rounded-lg border p-4"
              style={{
                background: ui.bg.card,
                borderColor: ui.border.base,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-wide opacity-80">{r.set}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: ui.badge.bg, color: ui.badge.fg }}
                >
                  Slot {r.slot}
                </span>
              </div>

              <div className="mt-2 font-medium">{r.main}</div>

              <ul className="mt-3 space-y-1 text-sm opacity-90">
                {r.substats.map((s, i) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>

              <button className="btn mt-4 w-full">Detalhes</button>
            </div>
          ))}
        </div>

        {list.length === 0 && (
          <div className="text-center text-sm opacity-70">Nenhuma runa encontrada.</div>
        )}
      </div>
    </main>
  );
}
