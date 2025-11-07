'use client';

import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const ELEMENTS = ['Fire','Water','Wind','Light','Dark'] as const;
const ARCHETYPES = ['Attack','Defense','Support','HP'] as const;

export default function SearchFilter() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const q0 = sp.get('q') ?? '';
  const el0 = sp.get('element') ?? '';
  const ar0 = sp.get('archetype') ?? '';

  const update = React.useCallback((patch: Record<string,string>) => {
    const q = new URLSearchParams(sp.toString());
    Object.entries(patch).forEach(([k,v]) => {
      if (v) q.set(k, v); else q.delete(k);
    });
    q.delete('page'); // reset paginação ao mudar filtros
    router.push(`${pathname}?${q.toString()}`);
  }, [sp, router, pathname]);

  const onQ = useDebouncedCallback((v: string) => update({ q: v }), 300);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <input
        defaultValue={q0}
        onChange={(e) => onQ(e.target.value)}
        placeholder="Buscar por nome, elemento, arquétipo…"
        className="h-10 w-full sm:w-72 rounded-xl bg-zinc-900 border border-zinc-700 px-3 text-zinc-100 placeholder-zinc-400 outline-none focus:ring-2 ring-violet-500/40"
      />
      <select
        value={el0}
        onChange={(e) => update({ element: e.target.value })}
        className="h-10 rounded-xl bg-zinc-900 border border-zinc-700 px-3 text-zinc-100"
      >
        <option value="">Elemento</option>
        {ELEMENTS.map(e => <option key={e} value={e}>{e}</option>)}
      </select>
      <select
        value={ar0}
        onChange={(e) => update({ archetype: e.target.value })}
        className="h-10 rounded-xl bg-zinc-900 border border-zinc-700 px-3 text-zinc-100"
      >
        <option value="">Arquétipo</option>
        {ARCHETYPES.map(a => <option key={a} value={a}>{a}</option>)}
      </select>
    </div>
  );
}
