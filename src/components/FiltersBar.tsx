
'use client';

import { useState } from 'react';

type Props = {
  onApply: (f: { q?: string; element?: string; stars?: number; awakened?: 'true' | 'false' | 'any' }) => void;
  onClear: () => void;
  initial?: { q?: string; element?: string; stars?: number; awakened?: 'true' | 'false' | 'any' };
};

const elements = ['Any', 'Fire', 'Water', 'Wind', 'Light', 'Dark'] as const;

export default function FiltersBar({ onApply, onClear, initial }: Props) {
  const [q, setQ] = useState(initial?.q ?? '');
  const [element, setElement] = useState<string>(initial?.element ?? 'Any');
  const [stars, setStars] = useState<number>(initial?.stars ?? 0);
  const [awakened, setAwakened] = useState<'true' | 'false' | 'any'>(initial?.awakened ?? 'any');

  return (
    <div className="sticky top-0 z-10 mb-4 w-full rounded-2xl border border-zinc-800 bg-zinc-950/70 p-3 backdrop-blur sm:p-4">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Nome, elemento, arquÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©tipo"
          className="col-span-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600 sm:col-span-2"
        />

        <select
          value={element}
          onChange={(e) => setElement(e.target.value)}
          className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-600"
        >
          {elements.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>

        <select
          value={String(stars)}
          onChange={(e) => setStars(Number(e.target.value))}
          className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-600"
        >
          <option value="0">Estrelas</option>
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={awakened}
          onChange={(e) => setAwakened(e.target.value as any)}
          className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-600"
        >
          <option value="any">Awakened?</option>
          <option value="true">Sim</option>
          <option value="false">NÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o</option>
        </select>

        <div className="col-span-2 flex gap-2 sm:col-span-2 sm:justify-end">
          <button
            onClick={() => onApply({ q, element, stars, awakened })}
            className="flex-1 rounded-lg bg-zinc-800 px-3 py-2 text-sm font-medium text-zinc-100 hover:bg-zinc-700 sm:flex-none"
          >
            Aplicar
          </button>
          <button
            onClick={() => {
              setQ(''); setElement('Any'); setStars(0); setAwakened('any'); onClear();
            }}
            className="flex-1 rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800 sm:flex-none"
          >
            Limpar
          </button>
        </div>
      </div>
    </div>
  );
}
