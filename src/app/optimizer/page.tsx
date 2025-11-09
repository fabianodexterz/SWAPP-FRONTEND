// src/app/optimizer/page.tsx
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { fetchMonsters, fetchOptimizer, type Monster } from '@/lib/api';
import { useLang } from '@/store/lang';

type SortableMonster = Monster & { awakened: boolean };
type OptimizerData = any; // ajuste quando tipar a resposta do backend

export default function OptimizerPage() {
  const { t } = useLang();

  // filtros/inputs
  const [reqSets, setReqSets] = useState('Violent,Will');
  const [allowSets, setAllowSets] = useState('');
  const [spd, setSpd] = useState('200');
  const [cri, setCri] = useState('70');
  const [cdmg, setCdmg] = useState('150');

  // estado principal
  const [mons, setMons] = useState<SortableMonster[]>([]);
  const [sel, setSel] = useState<number | null>(null);
  const [data, setData] = useState<OptimizerData | null>(null);
  const [fav, setFav] = useState(false);
  const [loading, setLoading] = useState(false);

  // carrega monstros
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetchMonsters('', 1, 100);
        const items: SortableMonster[] = (res.items ?? []).map((m) => ({
          ...m,
          awakened: !!m.awakened,
        }));
        setMons(items);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // carrega otimização do monstro escolhido
  const load = async (id: number) => {
    setSel(id);
    setLoading(true);
    try {
      // 🔧 correção principal: converter id para string
      const res = await fetchOptimizer(String(id));
      setData(res);

      const key = `swapp_fav_${id}`;
      const isFav =
        typeof window !== 'undefined' &&
        window.localStorage.getItem(key) === '1';
      setFav(isFav);
    } finally {
      setLoading(false);
    }
  };

  const toggleFav = () => {
    if (!sel) return;
    const key = `swapp_fav_${sel}`;
    const next = !fav;
    setFav(next);
    if (typeof window !== 'undefined') {
      if (next) localStorage.setItem(key, '1');
      else localStorage.removeItem(key);
    }
  };

  const reqChips = useMemo(
    () => reqSets.split(',').map((s) => s.trim()).filter(Boolean),
    [reqSets]
  );
  const allowChips = useMemo(
    () => allowSets.split(',').map((s) => s.trim()).filter(Boolean),
    [allowSets]
  );

  const allOk =
    Number(spd) > 0 && Number(cri) > 0 && Number(cdmg) > 0;

  const runesTop = (data?.runes || []).slice(0, 6);
  const artsTop = (data?.artifacts || []).slice(0, 2);

  return (
    <main className="container-app py-8 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          {t?.('optimizer.title') ?? 'Otimizador'}
        </h1>
        {sel && (
          <button className="btn" onClick={toggleFav}>
            {fav ? '★ Favorito' : '☆ Favoritar'}
          </button>
        )}
      </header>

      {/* filtros básicos */}
      <section className="card space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <label className="form-control">
            <span className="label-text">Sets obrigatórios</span>
            <input
              className="input"
              value={reqSets}
              onChange={(e) => setReqSets(e.target.value)}
              placeholder="Violent,Will"
            />
          </label>

          <label className="form-control">
            <span className="label-text">Sets permitidos</span>
            <input
              className="input"
              value={allowSets}
              onChange={(e) => setAllowSets(e.target.value)}
              placeholder="Swift,Blade"
            />
          </label>

          <label className="form-control">
            <span className="label-text">SPD mínima</span>
            <input
              className="input"
              value={spd}
              onChange={(e) => setSpd(e.target.value)}
              inputMode="numeric"
            />
          </label>

          <label className="form-control">
            <span className="label-text">CRI/CDMG mín.</span>
            <div className="flex gap-2">
              <input
                className="input w-full"
                value={cri}
                onChange={(e) => setCri(e.target.value)}
                inputMode="numeric"
                placeholder="CRI"
              />
              <input
                className="input w-full"
                value={cdmg}
                onChange={(e) => setCdmg(e.target.value)}
                inputMode="numeric"
                placeholder="CDMG"
              />
            </div>
          </label>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          {reqChips.map((c) => (
            <span key={`req-${c}`} className="badge badge-warning">
              {c}
            </span>
          ))}
          {allowChips.map((c) => (
            <span key={`allow-${c}`} className="badge">
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* lista de monstros simples */}
      <section className="card">
        <h2 className="text-lg font-medium mb-3">Escolha o monstro</h2>
        {loading && mons.length === 0 ? (
          <p className="text-sm text-gray-400">Carregando…</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {mons.map((m) => (
              <button
                key={m.id}
                onClick={() => load(m.id)}
                className={`btn justify-start ${
                  sel === m.id ? 'btn-primary' : ''
                }`}
                title={m.name}
              >
                <span className="truncate">
                  {m.name} • {m.natStars}★
                </span>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* resultado */}
      {sel && (
        <section className="card">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">
              Resultado • ID {sel}
            </h2>
            {!allOk && (
              <span className="badge badge-error">
                Complete os limites mínimos (SPD/CRI/CDMG)
              </span>
            )}
          </div>

          {loading ? (
            <p className="text-sm text-gray-400 mt-3">Processando…</p>
          ) : data ? (
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="font-medium mb-2">Melhores Runas</h3>
                <ul className="list-disc list-inside text-sm">
                  {runesTop.map((r: any, idx: number) => (
                    <li key={idx}>
                      {r.slot} • {r.set} • +{r.mainStat} / {r.subs?.join(', ')}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">Melhores Artefatos</h3>
                <ul className="list-disc list-inside text-sm">
                  {artsTop.map((a: any, idx: number) => (
                    <li key={idx}>
                      {a.slot} • {a.mainStat} / {a.subs?.join(', ')}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-400 mt-3">
              Selecione um monstro para ver a sugestão do otimizador.
            </p>
          )}
        </section>
      )}
    </main>
  );
}
