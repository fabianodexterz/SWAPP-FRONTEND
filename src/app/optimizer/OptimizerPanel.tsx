// src/app/optimizer/OptimizerPanel.tsx
'use client';
import { useMemo, useState } from 'react';

type StatKey = 'HP'|'ATK'|'DEF'|'SPD'|'CRI Rate'|'CRI Dmg'|'Resistance'|'Accuracy';
type SlotMain = 'None'|'SPD'|'ATK%'|'HP%'|'DEF%'|'CRI Rate'|'CRI Dmg'|'Resistance'|'Accuracy';

const ALL_SETS = ['Violent','Will','Swift','Rage','Fatal','Despair','Vampire','Guard','Focus','Revenge'];
const statOrder: StatKey[] = ['HP','ATK','DEF','SPD','CRI Rate','CRI Dmg','Resistance','Accuracy'];

type BuildRune = { slot:number; main:string; subs?:string[] };
type Build = {
  id: string;
  score: number;
  runes: BuildRune[];
  notes?: string;
};

export default function OptimizerPanel() {
  const [unitId, setUnitId] = useState<string>('');
  const [allowSteal, setAllowSteal] = useState(true);
  const [respectLocked, setRespectLocked] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const [setsRequired, setSetsRequired] = useState<string[]>(['Violent','Will']);
  const [setsAllowed, setSetsAllowed] = useState<string[]>([]);
  const [pickArtifacts, setPickArtifacts] = useState(true);
  const [artifactQty, setArtifactQty] = useState(2);
  const [slot2, setSlot2] = useState<SlotMain>('SPD');
  const [slot4, setSlot4] = useState<SlotMain>('None');
  const [slot6, setSlot6] = useState<SlotMain>('None');
  const [min, setMin] = useState<Record<StatKey, number>>({
    HP:0, ATK:0, DEF:0, SPD:200, 'CRI Rate':70, 'CRI Dmg':150, Resistance:0, Accuracy:0
  });
  const [max, setMax] = useState<Record<StatKey, number>>({
    HP:0, ATK:0, DEF:0, SPD:0, 'CRI Rate':0, 'CRI Dmg':0, Resistance:0, Accuracy:0
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|undefined>();
  const [builds, setBuilds] = useState<Build[]>([]);
  const [score, setScore] = useState<number>(0);
  const [expected, setExpected] = useState<number>(0);

  // valores de exibiÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o (substitua por dados reais vindos do backend se preferir)
  const current: Record<StatKey, number> = { HP:11205, ATK:670, DEF:725, SPD:96, 'CRI Rate':33, 'CRI Dmg':79, Resistance:104, Accuracy:0 };
  const gains:   Record<StatKey, number> = { HP:25057, ATK:276, DEF:653, SPD:152, 'CRI Rate':0, 'CRI Dmg':0, Resistance:0, Accuracy:0 };

  function toggleSet(arr: string[], set: (v:string[])=>void, name: string) {
    set(arr.includes(name) ? arr.filter(s=>s!==name) : [...arr, name]);
  }

  async function onEnhance() {
    setLoading(true);
    setError(undefined);
    try {
      const payload = {
        unitId,
        allowStealRunes: allowSteal,
        respectLockedRunes: respectLocked,
        favorite,
        sets: { required: setsRequired, allowed: setsAllowed },
        artifacts: { include: pickArtifacts, max: artifactQty },
        slots: { "2": slot2, "4": slot4, "6": slot6 },
        constraints: { min, max },
      };

      // 1ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âª tentativa: rota mais provÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡vel
      let res = await fetch('/api/optimizer/suggest', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(payload)
      });

      // fallback para projetos que expÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âµem apenas /api/optimizer (POST)
      if (!res.ok) {
        res = await fetch('/api/optimizer', {
          method: 'POST',
          headers: { 'Content-Type':'application/json' },
          body: JSON.stringify({ action:'suggest', ...payload })
        });
      }

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      // formatos aceitos:
      // { builds: Build[], score:number, expectedStars:number }
      // ou { data:{ builds, score, expectedStars } }
      const root = (data?.data && data.data.builds) ? data.data : data;
      setBuilds(root.builds ?? []);
      setScore(root.score ?? 0);
      setExpected(root.expectedStars ?? 0);
    } catch (e:any) {
      setError(e?.message ?? 'Erro inesperado');
    } finally {
      setLoading(false);
    }
  }

  function onReset() {
    setSlot2('SPD'); setSlot4('None'); setSlot6('None');
    setMin({ HP:0, ATK:0, DEF:0, SPD:0, 'CRI Rate':0, 'CRI Dmg':0, Resistance:0, Accuracy:0 });
    setMax({ HP:0, ATK:0, DEF:0, SPD:0, 'CRI Rate':0, 'CRI Dmg':0, Resistance:0, Accuracy:0 });
    setSetsAllowed([]); setSetsRequired(['Violent','Will']);
    setBuilds([]); setScore(0); setExpected(0);
  }

  return (
    <div className="mx-auto max-w-6xl">
      {/* TÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­tulo */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-text">Otimizar (IA Rune + Artefatos)</h1>
        <div className="flex items-center gap-3">
          <ScorePill score={score}/>
          <RankStars stars={expected}/>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Esquerda: portrait + controles */}
        <div className="col-span-12 md:col-span-4">
          <div className="rounded-3xl bg-surface/90 border border-border p-5 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-2xl bg-border overflow-hidden">
                <img src="/icons/monsters/placeholder.png" alt="unit" className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="text-text font-medium">Unit ID</div>
                <input
                  value={unitId}
                  onChange={e=>setUnitId(e.target.value)}
                  placeholder="ex: 123456"
                  className="mt-2 w-48 rounded-xl bg-[#0c1117] border border-border px-3 py-2 text-sm text-text placeholder-subtext focus:outline-none focus:ring-2 focus:ring-gold/30"
                />
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <Toggle label="Permitir roubar runas" checked={allowSteal} onChange={setAllowSteal}/>
              <Toggle label="Respeitar runas/artefatos travados" checked={respectLocked} onChange={setRespectLocked}/>

              <button
                onClick={()=>setFavorite(v=>!v)}
                className="w-full rounded-2xl border border-border bg-[#101622] px-4 py-2 text-sm text-text hover:border-gold/50 transition"
              >
                {favorite ? 'ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ Em favoritos' : 'Adicionar aos Favoritos'}
              </button>
            </div>
          </div>

          {/* Sets */}
          <div className="mt-6 grid grid-cols-1 gap-6">
            <ChipGroup
              title="Sets obrigatÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â³rios"
              items={ALL_SETS}
              selected={setsRequired}
              onToggle={(s)=>toggleSet(setsRequired, setSetsRequired, s)}
            />
            <ChipGroup
              title="Sets permitidos"
              items={ALL_SETS}
              selected={setsAllowed}
              onToggle={(s)=>toggleSet(setsAllowed, setSetsAllowed, s)}
            />
          </div>

          {/* Artefatos */}
          <div className="mt-6 rounded-3xl bg-surface/90 border border-border p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-subtext">
                <input type="checkbox" checked={pickArtifacts} onChange={e=>setPickArtifacts(e.target.checked)} />
                Escolher artefatos tambÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©m
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-subtext">Qtd</span>
                <input
                  type="number" min={0} max={2}
                  value={artifactQty}
                  onChange={e=>setArtifactQty(Number(e.target.value))}
                  className="w-16 rounded-lg bg-[#0c1117] border border-border px-2 py-1 text-sm text-text"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Direita: stats + filtros + aÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âµes + resultados */}
        <div className="col-span-12 md:col-span-8 space-y-6">
          {/* Atributos atuais */}
          <div className="rounded-3xl bg-surface/90 border border-border p-5 shadow-xl">
            <div className="grid grid-cols-2 gap-4">
              {statOrder.map((k)=>(
                <div key={k} className="flex items-center justify-between rounded-2xl bg-[#101622] border border-border px-4 py-2">
                  <span className="text-sm text-subtext">{k}</span>
                  <span className="text-sm text-text flex items-center gap-3">
                    <b className="tabular-nums">{current[k]}</b>
                    <span className="text-green tabular-nums">+ {gains[k]}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* SeleÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o slots + constraints */}
          <div className="rounded-3xl bg-surface/90 border border-border p-5 shadow-xl">
            <div className="flex flex-wrap items-center gap-4">
              <SlotSelect label="* Slot 2 Main" value={slot2} onChange={setSlot2} options={['SPD','ATK%','HP%','DEF%']} />
              <SlotSelect label="Slot 4 Main" value={slot4} onChange={setSlot4} options={['None','ATK%','HP%','DEF%','CRI Rate','CRI Dmg']} />
              <SlotSelect label="Slot 6 Main" value={slot6} onChange={setSlot6} options={['None','ATK%','HP%','DEF%','Resistance','Accuracy']} />
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-border">
              <div className="bg-[#101622] px-4 py-2 text-subtext text-sm border-b border-border">Stats</div>
              <div className="divide-y divide-border">
                {statOrder.map((k)=>(
                  <div key={k} className="grid grid-cols-12 items-center px-4 py-2">
                    <div className="col-span-4 text-sm text-text">{k}</div>
                    <div className="col-span-4">
                      <input
                        type="number" value={min[k]}
                        onChange={e=>setMin({...min, [k]: Number(e.target.value)})}
                        className="w-full rounded-lg bg-[#0c1117] border border-border px-3 py-2 text-sm text-text"
                        placeholder="Min"
                      />
                    </div>
                    <div className="col-span-4">
                      <input
                        type="number" value={max[k]}
                        onChange={e=>setMax({...max, [k]: Number(e.target.value)})}
                        className="w-full rounded-lg bg-[#0c1117] border border-border px-3 py-2 text-sm text-text"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <button
                disabled={loading}
                onClick={onEnhance}
                className="rounded-2xl px-5 py-2 border border-gold/40 bg-gold/10 text-gold hover:bg-gold/20 transition disabled:opacity-60"
              >
                {loading ? 'Gerando builds...' : 'Sugerir (Enhance)'}
              </button>
              <button
                onClick={onReset}
                className="rounded-2xl px-5 py-2 border border-border bg-[#101622] text-subtext hover:border-red/40 hover:text-red transition"
              >
                Reset
              </button>
            </div>

            {error && (
              <div className="mt-4 rounded-xl border border-red/40 bg-red/10 px-4 py-2 text-sm text-red">
                {error}
              </div>
            )}
          </div>

          {/* Resultados */}
          <div className="rounded-3xl bg-surface/90 border border-border p-5 shadow-xl">
            <div className="mb-3 text-sm text-subtext">Resultados</div>
            {builds.length === 0 ? (
              <div className="text-subtext text-sm">Nenhuma build sugerida ainda.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {builds.map((b)=>(
                  <BuildCard key={b.id} build={b} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Subcomponentes ---------- */

function RankStars({ stars=0 }: {stars:number}) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({length:5}).map((_,i)=>(
        <svg key={i} viewBox="0 0 24 24" className={`h-5 w-5 ${i<stars?'fill-gold':'fill-border'}`}>
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      ))}
    </div>
  );
}

function ScorePill({ score }: {score:number}) {
  if (!score) return null;
  return (
    <div className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-gold text-sm">
      Rune Score: <b className="tabular-nums">{score.toFixed(2)}</b>
    </div>
  );
}

function ChipGroup({
  title, items, selected, onToggle
}: {title:string; items:string[]; selected:string[]; onToggle:(s:string)=>void}) {
  return (
    <div className="rounded-3xl bg-surface/90 border border-border p-5 shadow-xl">
      <div className="mb-3 text-sm text-subtext">{title}</div>
      <div className="flex flex-wrap gap-2">
        {items.map((s)=>(
          <button
            key={s}
            onClick={()=>onToggle(s)}
            className={`rounded-full px-3 py-1 text-sm border transition
             ${selected.includes(s)
               ? 'border-gold/50 bg-gold/10 text-gold'
               : 'border-border bg-[#101622] text-subtext hover:border-gold/30'}`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

function SlotSelect({
  label, value, onChange, options
}: {label:string; value:SlotMain; onChange:(v:SlotMain)=>void; options:SlotMain[]}) {
  return (
    <label className="text-sm text-subtext flex items-center gap-2">
      <span className="min-w-[7.5rem]">{label}</span>
      <select
        value={value}
        onChange={(e)=>onChange(e.target.value as SlotMain)}
        className="rounded-xl bg-[#0c1117] border border-border px-3 py-2 text-sm text-text hover:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/30"
      >
        {options.map(o=><option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function Toggle({label, checked, onChange}:{label:string; checked:boolean; onChange:(v:boolean)=>void}){
  return (
    <label className="flex items-center justify-between rounded-2xl border border-border bg-[#101622] px-4 py-2 text-sm text-text">
      <span>{label}</span>
      <input type="checkbox" checked={checked} onChange={e=>onChange(e.target.checked)} />
    </label>
  );
}

function BuildCard({ build }: {build: Build}) {
  return (
    <div className="rounded-2xl border border-border bg-[#101622] p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-text">Score: <b className="tabular-nums">{build.score?.toFixed?.(2) ?? '-'}</b></div>
        <div className="text-subtext text-xs">{build.id}</div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {build.runes?.sort((a,b)=>a.slot-b.slot).map(r=>(
          <div key={r.slot} className="rounded-xl border border-border bg-[#0c1117] px-3 py-2">
            <div className="text-subtext text-xs">Slot {r.slot}</div>
            <div className="text-text text-sm">{r.main}</div>
            {r.subs && <div className="mt-1 text-[11px] text-subtext">{r.subs.join(' ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â· ')}</div>}
          </div>
        ))}
      </div>
      {build.notes && <div className="mt-2 text-[11px] text-subtext">{build.notes}</div>}
    </div>
  );
}
