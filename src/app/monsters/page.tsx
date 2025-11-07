"use client"
import { useEffect, useMemo, useState } from "react";
import AppShell from "../../components/AppShell";
import { fetchMonsters } from "../../lib/api";
type Monster = { id:number; name:string; element:string; natStars:number; archetype?:string|null; awakened:boolean };
type SortKey = 'name' | 'element' | 'natStars';
export default function MonstersPage() {
  const [q, setQ] = useState(""); const [data, setData] = useState<Monster[]>([]); const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState<SortKey>('name'); const [page, setPage] = useState(1); const perPage = 6;
  useEffect(() => { (async()=>{ setLoading(true); try { const res = await fetchMonsters("", 1, 100); setData(res.items || []); } finally { setLoading(false); } })(); }, []);
  const filtered = useMemo(()=>{ const s=q.toLowerCase().trim(); return data.filter(m=>!s||m.name.toLowerCase().includes(s)||m.element.toLowerCase().includes(s)).sort((a,b)=> sort==='natStars' ? (b.natStars - a.natStars) : String(a[sort]).localeCompare(String(b[sort]))); }, [data, q, sort]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage)); const pageItems = filtered.slice((page-1)*perPage, (page-1)*perPage + perPage);
  useEffect(()=>{ setPage(1) }, [q, sort])
  return (<AppShell>
    <div className="card p-4 flex flex-wrap items-center gap-3">
      <input className="input input-bordered grow" placeholder="Buscar monstros..." value={q} onChange={e=>setQ(e.target.value)} />
      <select className="select select-bordered" value={sort} onChange={e=>setSort(e.target.value as SortKey)}>
        <option value="name">Nome</option><option value="element">Elemento</option><option value="natStars">Estrelas</option>
      </select>
    </div>
    <section className="grid md:grid-cols-3 gap-4 mt-4">
      {loading ? <p>Carregando...</p> : pageItems.length === 0 ? <p>Nenhum monstro encontrado.</p> :
        pageItems.map(m => (<div key={m.id} className="card p-4">
          <div className="flex items-center justify-between"><h3 className="text-lg font-semibold">{m.name}</h3><span className="text-sm opacity-70">{m.element}</span></div>
          <div className="mt-2 text-sm opacity-80">⭐ {m.natStars} • {m.archetype || "—"} {m.awakened ? "• Awk" : ""}</div>
          <a className="btn btn-sm mt-4" href={`/optimizer?id=${m.id}`}>Ver Otimizador</a>
        </div>))
      }
    </section>
    <div className="flex items-center justify-center gap-3 mt-6"><button className="btn" disabled={page<=1} onClick={()=>setPage(p=>Math.max(1,p-1))}>◀</button><div>Página {page} de {totalPages}</div><button className="btn" disabled={page>=totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))}>▶</button></div>
  </AppShell>)
}
