'use client';

import { useEffect, useMemo, useState } from 'react';
import { theme } from '../theme';
import { getIconMap } from '../lib/icons';

const ALL_RUNES = [
  'Swift','Violent','Despair','Rage','Will','Vampire','Blade','Energy','Guard','Focus','Nemesis',
  'Shield','Revenge','Destroy','Fight','Tolerance','Seal','Intangible'
] as const;
type RuneSet = typeof ALL_RUNES[number];
type Slot = 1|2|3|4|5|6;

export default function RunasPage() {
  const [icons, setIcons] = useState<any>(null);
  const [query, setQuery] = useState('');
  const [setFilter, setSetFilter] = useState<'all'|RuneSet>('all');
  const [slot, setSlot] = useState<Slot|'all'>('all');

  useEffect(() => { getIconMap().then(setIcons).catch(()=>setIcons(null)); }, []);

  const visibleSets = useMemo(() => {
    let sets = ALL_RUNES.slice();
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      sets = sets.filter(s => s.toLowerCase().includes(q));
    }
    if (setFilter !== 'all') sets = sets.filter(s => s === setFilter);
    return sets;
  }, [query, setFilter]);

  const Chip = ({label, active, onClick, iconUrl}:{label:string;active:boolean;onClick:()=>void;iconUrl?:string}) => (
    <button
      onClick={onClick}
      className={[
        'px-3 py-1 rounded-full border transition flex items-center gap-2',
        active ? 'bg-amber-600/90 text-black border-amber-400 shadow'
               : 'bg-zinc-800 text-zinc-200 border-zinc-700 hover:bg-zinc-700'
      ].join(' ')}
      title={label}
    >
      {iconUrl ? <img src={iconUrl} alt={label} className="w-5 h-5 object-contain" /> : null}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-6" style={{ color: theme.text.title, textShadow: '0 0 6px rgba(216,132,104,0.35)' }}>Runas</h1>

      <div className="rounded-xl border p-6 space-y-5" style={{ background: theme.bg.panel, borderColor: theme.border }}>
        <input
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          placeholder="Filtrar por set/estatística..."
          className="w-full rounded-lg px-3 py-2 border outline-none"
          style={{ background: theme.bg.input, borderColor: theme.border, color: theme.text.light }}
        />

        {/* Sets */}
        <div className="flex flex-wrap gap-2 justify-center">
          <Chip label="Todos" active={setFilter==='all'} onClick={()=>setSetFilter('all')} />
          {visibleSets.map(setName => (
            <Chip
              key={setName}
              label={setName}
              active={setFilter===setName}
              onClick={()=>setSetFilter(setName)}
              iconUrl={icons?.runes?.[setName] /* <- usa o icone oficial do map.json */}
            />
          ))}
        </div>

        {/* Slots */}
        <div className="flex flex-wrap gap-2 justify-center">
          <Chip label="Todos" active={slot==='all'} onClick={()=>setSlot('all')} />
          {[1,2,3,4,5,6].map((s)=>(
            <Chip key={s} label={`Slot ${s}`} active={slot===s} onClick={()=>setSlot(s as Slot)} />
          ))}
        </div>

        <div className="pt-2 border-t text-xs text-zinc-400" style={{ borderColor: theme.border }}>
          Resultados: 0
        </div>
      </div>

      <p className="text-center mt-8 text-[#cbb797]">Em breve: listagem de runas, filtros avançados (main/sub, qualidade) e ações em massa.</p>
    </div>
  );
}
