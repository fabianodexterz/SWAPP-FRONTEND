"use client"
import { useEffect, useMemo, useState } from "react";
import AppShell from "../../components/AppShell";
import { fetchPresets } from "../../lib/api";
import { useLang } from "../../store/lang";
type Preset = { id:number; name:string; locale:string; monsterName:string; runeSets:string; stats:any; };
type SortKey = 'name' | 'monsterName' | 'runeSets';
export default function PresetsPage() {
  const [items, setItems] = useState<Preset[]>([]); const [q, setQ] = useState(""); const [sort, setSort] = useState<SortKey>('name'); const [page, setPage] = useState(1);
  const perPageOptions = [6, 9, 12, 18]; const [perPage, setPerPage] = useState(9); const { locale, t } = useLang();
  useEffect(()=>{ (async ()=>{ const res = await fetchPresets(); setItems(res.items || []); })(); }, []);
  const filtered = useMemo(()=>{ const s=q.toLowerCase().trim(); return items.filter(p => p.locale === locale).filter(p => !s || p.name.toLowerCase().includes(s) || p.monsterName.toLowerCase().includes(s) || p.runeSets.toLowerCase().includes(s)).sort((a,b)=> String(a[sort]).localeCompare(String(b[sort]))); }, [items, q, sort, locale]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage)); const pageItems = filtered.slice((page-1)*perPage, (page-1)*perPage + perPage);
  useEffect(()=>{ setPage(1) }, [q, sort, perPage, locale])
  return (<AppShell>
    <div className="card p-5">
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <h3 className="text-lg font-semibold">{t('presetsTitle')}</h3>
        <div className="flex flex-wrap gap-2 items-center">
          <label className="k">{t('sort')}</label>
          <select className="select select-bordered" value={sort} onChange={e=>setSort(e.target.value as SortKey)}>
            <option value="name">{t('name')}</option><option value="monsterName">{t('monster')}</option><option value="runeSets">{t('runes')}</option>
          </select>
          <label className="k">{t('perPage')}</label>
          <select className="select select-bordered" value={perPage} onChange={e=>setPerPage(Number(e.target.value))}>
            {perPageOptions.map(n=> <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3"><input className="input input-bordered w-full" placeholder={t('searchPlaceholder')} value={q} onChange={e=>setQ(e.target.value)} /></div>
    </div>
    <div className="grid md:grid-cols-3 gap-4 mt-4">
      {pageItems.map(p => (<div key={p.id} className="card p-5"><div className="text-xl font-semibold">{p.name}</div><div className="opacity-80 mt-1">{p.monsterName}</div><div className="mt-2 k">{t('runes')}</div><div>{p.runeSets}</div><details className="mt-3"><summary className="cursor-pointer k">Stats</summary><pre className="mt-2 text-xs opacity-80 overflow-auto">{JSON.stringify(p.stats, null, 2)}</pre></details></div>))}
      {pageItems.length === 0 && (<div className="card p-6 col-span-full text-center opacity-80">Nenhum preset encontrado.</div>)}
    </div>
    <div className="flex items-center justify-center gap-3 mt-6"><button className="btn" disabled={page<=1} onClick={()=>setPage(p=>Math.max(1,p-1))}>◀</button><div>{t('page')} {page} {t('of')} {totalPages}</div><button className="btn" disabled={page>=totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))}>▶</button></div>
  </AppShell>)
}
