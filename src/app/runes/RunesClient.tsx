'use client';

import React, { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { themeTokens as ui } from '../theme';

type Runa = {
  id: number;
  set: string;
  slot: 1 | 2 | 3 | 4 | 5 | 6;
  main: string;
  substats: string[];
};

type Props = {
  items?: Runa[]; // opcional: vocÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âª pode injetar as runas via props
};

const MOCK: Runa[] = [
  { id: 1, set: 'Violent', slot: 2, main: 'SPD +42',     substats: ['CRI 9%', 'CDMG 12%', 'HP 7%'] },
  { id: 2, set: 'Will',    slot: 4, main: 'CDMG +80%',   substats: ['ATK 8%', 'SPD 12', 'ACC 10%'] },
  { id: 3, set: 'Swift',   slot: 6, main: 'HP +63%',     substats: ['RES 12%', 'DEF 8%', 'SPD 7'] },
];

export default function RunesClient({ items = MOCK }: Props) {
  const router = useRouter();
  const params = useSearchParams();

  const [q, setQ] = useState<string>(params.get('q') ?? '');
  const [slot, setSlot] = useState<number | 'all'>(
    (params.get('slot') ? Number(params.get('slot')) : 'all') as number | 'all'
  );
  const [setName, setSetName] = useState<string>(params.get('set') ?? '');

  // Atualiza URL quando filtros mudam (opcional)
  const updateUrl = (nextQ = q, nextSlot = slot, nextSet = setName) => {
    const sp = new URLSearchParams();
    if (nextQ) sp.set('q', nextQ);
    if (nextSlot !== 'all') sp.set('slot', String(nextSlot));
    if (nextSet) sp.set('set', nextSet);
    router.replace(`?${sp.toString()}`);
  };

  const list = useMemo(() => {
    const s = q.toLowerCase().trim();
    return items.filter((r) => {
      const okQ =
        !s ||
        r.set.toLowerCase().includes(s) ||
        r.main.toLowerCase().includes(s) ||
        r.substats.some((t) => t.toLowerCase().includes(s));
      const okSlot = slot === 'all' || r.slot === slot;
      const okSet = !setName || r.set.toLowerCase().includes(setName.toLowerCase());
      return okQ && okSlot && okSet;
    });
  }, [items, q, slot, setName]);

  return (
    <section
      className="rounded-xl border p-6 space-y-5"
      style={{ background: ui.bg.panel, borderColor: ui.border.base }}
    >
      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          className="input w-full"
          placeholder="Buscar por set / main / sub"
          value={q}
          onChange={(e) => {
            const v = e.target.value;
            setQ(v);
            updateUrl(v, slot, setName);
          }}
        />

        <select
          className="input w-full"
          value={slot}
          onChange={(e) => {
            const val = e.target.value === 'all' ? 'all' : (Number(e.target.value) as 1 | 2 | 3 | 4 | 5 | 6);
            setSlot(val);
            updateUrl(q, val, setName);
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
          onChange={(e) => {
            const v = e.target.value;
            setSetName(v);
            updateUrl(q, slot, v);
          }}
        />
      </div>

      {/* Lista */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((r) => (
          <div
            key={r.id}
            className="rounded-lg border p-4"
            style={{ background: ui.bg.card, borderColor: ui.border.base }}
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
                <li key={i}>ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ {s}</li>
              ))}
            </ul>

            <button className="btn mt-4 w-full">Detalhes</button>
          </div>
        ))}
      </div>

      {list.length === 0 && (
        <div className="text-center text-sm opacity-70">Nenhuma runa encontrada.</div>
      )}
    </section>
  );
}
