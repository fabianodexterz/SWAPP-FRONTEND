'use client';

import * as React from 'react';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useDebouncedCallback} from 'use-debounce';
import type {Route} from 'next';

type Elemento = 'Todos' | 'Fire' | 'Water' | 'Wind' | 'Light' | 'Dark';
type Awaken = 'Qualquer' | 'Desperto' | 'NÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o desperto';

const elementos: Elemento[] = ['Todos', 'Fire', 'Water', 'Wind', 'Light', 'Dark'];
const estrelas = [1, 2, 3, 4, 5, 6];
const awakenOpts: Awaken[] = ['Qualquer', 'Desperto', 'NÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o desperto'];

export default function MonstersToolbar() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  // estados refletem a URL
  const [q, setQ] = React.useState<string>(params.get('q') ?? '');
  const [element, setElement] = React.useState<Elemento>((params.get('e') as Elemento) ?? 'Todos');
  const [stars, setStars] = React.useState<number>(Number(params.get('s') ?? 0));
  const [awakened, setAwakened] = React.useState<Awaken>((params.get('a') as Awaken) ?? 'Qualquer');

  // aplica filtros na URL (com debounce pra nÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o floodar)
  const applyQuery = useDebouncedCallback(() => {
    const p = new URLSearchParams(params.toString());
    // nome
    if (q.trim()) p.set('q', q.trim()); else p.delete('q');
    // elemento
    if (element !== 'Todos') p.set('e', element); else p.delete('e');
    // estrelas
    if (stars > 0) p.set('s', String(stars)); else p.delete('s');
    // awaken
    if (awakened !== 'Qualquer') {
      p.set('a', awakened === 'Desperto' ? '1' : '0');
    } else {
      p.delete('a');
    }
    // reset de paginaÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o, se existir
    p.delete('page');

    const qs = p.toString();
    const href = (qs ? `${pathname}?${qs}` : pathname) as Route;
    router.replace(href, { scroll: false });
  }, 250);

  // quando campos mudarem, aplicamos
  React.useEffect(() => {
    applyQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, element, stars, awakened]);

  const clearAll = () => {
    setQ('');
    setElement('Todos');
    setStars(0);
    setAwakened('Qualquer');
    const href = pathname as Route;
    router.replace(href, { scroll: false });
  };

  return (
    <div className="sticky top-[72px] z-30 bg-[#0d0f12]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0d0f12]/60 border border-white/5 rounded-2xl p-4 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-4">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar monstro..."
            className="w-full input input-bordered bg-[#0f1216] border-white/10 focus:border-[#ffcf91]"
          />
        </div>

        <div className="md:col-span-3">
          <select
            value={element}
            onChange={(e) => setElement(e.target.value as Elemento)}
            className="select select-bordered w-full bg-[#0f1216] border-white/10 focus:border-[#ffcf91]"
          >
            <option>Todos</option>
            <option>Fire</option>
            <option>Water</option>
            <option>Wind</option>
            <option>Light</option>
            <option>Dark</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <select
            value={String(stars)}
            onChange={(e) => setStars(Number(e.target.value))}
            className="select select-bordered w-full bg-[#0f1216] border-white/10 focus:border-[#ffcf91]"
          >
            <option value="0">Estrelas (todas)</option>
            {estrelas.map((s) => (
              <option key={s} value={s}>{s}ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <select
            value={awakened}
            onChange={(e) => setAwakened(e.target.value as Awaken)}
            className="select select-bordered w-full bg-[#0f1216] border-white/10 focus:border-[#ffcf91]"
          >
            {awakenOpts.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-1 flex">
          <button onClick={clearAll} className="btn w-full bg-[#1b1f26] hover:bg-[#232934] border-white/10">
            Limpar
          </button>
        </div>
      </div>
      <div className="mt-2 text-[12px] text-white/40">
        Dica: filtros aplicados alteram a URL (permite compartilhar a busca).
      </div>
    </div>
  );
}
