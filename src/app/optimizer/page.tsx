"use client"
import AppShell from "../../components/AppShell";
import { useEffect, useMemo, useState } from "react";
import { fetchMonsters, fetchOptimizer } from "../../lib/api";
import { useLang } from "../../store/lang";
function Chip({ text }:{ text:string }){ return <span className="px-2 py-0.5 rounded-full text-xs bg-[#0c0f14] border border-[#2a2e3f]">{text}</span> }
function Progress({ value }:{ value:number }){ const v=Math.max(0,Math.min(100,value||0)); return (<div className="progress-wrap"><div className="progress-bar" style={{width:`${v}%`}}/></div>) }
export default function OptimizerPage() {
  const [mons, setMons] = useState<any[]>([]); const [sel, setSel] = useState<number|null>(null); const [data, setData] = useState<any|null>(null);
  const [reqSets, setReqSets] = useState("Violent,Will"); const [allowSets, setAllowSets] = useState(""); const [spd, setSpd] = useState("200"); const [cri, setCri] = useState("70"); const [cdmg, setCdmg] = useState("150"); const [fav, setFav] = useState<boolean>(false); const { t } = useLang();
  useEffect(() => { (async ()=>{ const res = await fetchMonsters("", 1, 100); setMons(res.items); })(); }, []);
  const load = async (id:number) => { setSel(id); const res = await fetchOptimizer(id); setData(res); const key=`swapp_fav_${id}`; const isFav = typeof window!=='undefined' && window.localStorage.getItem(key)==='1'; setFav(isFav); }
  const toggleFav = () => { if (!sel) return; const key = `swapp_fav_${sel}`; const next=!fav; setFav(next); if (typeof window!=='undefined'){ if(next) localStorage.setItem(key,'1'); else localStorage.removeItem(key);} }
  const reqChips = useMemo(()=> reqSets.split(',').map(s=>s.trim()).filter(Boolean), [reqSets]); const allowChips = useMemo(()=> allowSets.split(',').map(s=>s.trim()).filter(Boolean), [allowSets]); const allOk = Number(spd)>0 && Number(cri)>0 && Number(cdmg)>0
  const runesTop = (data?.runes || []).slice(0,6); const artsTop = (data?.artifacts || []).slice(0,2);
  return (<AppShell><div className="card p-6 space-y-4">
    <div className="flex items-center gap-3 flex-wrap justify-between">
      <div className="flex items-center gap-3">
        <select className="select select-bordered w-72" onChange={e=>load(Number(e.target.value))} defaultValue=""><option value="" disabled>{t('chooseMonster')}</option>{mons.map(m => <option key={m.id} value={m.id}>{m.name} ({m.element})</option>)}</select>
        {sel && (<button className={`btn ${fav?'btn-primary':''}`} onClick={toggleFav}>{fav ? '★ Marcado' : '☆ Marcar'}</button>)}
      </div>
      {data && (<div className="grid grid-cols-3 gap-2 w-full md:w-auto min-w-[320px]">
        <div className="card p-3"><div className="k">Runas</div><div className="text-2xl font-bold mb-2">{data.scores.runes}</div><Progress value={data.scores.runes}/></div>
        <div className="card p-3"><div className="k">Artefatos</div><div className="text-2xl font-bold mb-2">{data.scores.artifacts}</div><Progress value={data.scores.artifacts}/></div>
        <div className="card p-3"><div className="k">Total</div><div className="text-2xl font-bold mb-2">{data.scores.total}</div><Progress value={data.scores.total}/></div>
      </div>)}
    </div>
    <div className="grid xl:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="card p-4 space-y-3">
          <div className="k">Parâmetros</div>
          <div className="flex flex-wrap items-center gap-3">
            <label className="label cursor-pointer justify-start gap-3"><input type="checkbox" className="checkbox checkbox-sm" defaultChecked /><span>{t('allowSteal')}</span></label>
            <label className="label cursor-pointer justify-start gap-3"><input type="checkbox" className="checkbox checkbox-sm" /><span>{t('respectLocked')}</span></label>
          </div>
          <div className="grid md:grid-cols-2 gap-2"><input className="input input-bordered" placeholder={t('requiredSets')} value={reqSets} onChange={e=>setReqSets(e.target.value)} /><input className="input input-bordered" placeholder={t('allowedSets')} value={allowSets} onChange={e=>setAllowSets(e.target.value)} /></div>
          <div className="flex flex-wrap gap-2">{reqChips.map((c,i)=><Chip key={i} text={c} />)}{allowChips.map((c,i)=><Chip key={'a'+i} text={c} />)}</div>
          <div className="grid grid-cols-3 gap-2"><input className="input input-bordered" placeholder={`${t('spdMin')}: 200`} value={spd} onChange={e=>setSpd(e.target.value)} /><input className="input input-bordered" placeholder={`${t('criMin')}: 70`} value={cri} onChange={e=>setCri(e.target.value)} /><input className="input input-bordered" placeholder={`${t('cdmgMin')}: 150`} value={cdmg} onChange={e=>setCdmg(e.target.value)} /></div>
          <button className="btn btn-primary" disabled={!allOk}>{t('suggest')}</button>
        </div>
        <div className="card p-4"><div className="k mb-2">Top Runas</div><table className="table"><thead><tr><th>ID</th><th>Set</th><th>Slot</th><th>Main</th><th>Score</th></tr></thead><tbody>{runesTop.map((r:any)=>(<tr key={r.id}><td>#{r.id}</td><td>{r.set}</td><td>{r.slot}</td><td>{r.mainStat}</td><td>{r.score}</td></tr>))}</tbody></table></div>
      </div>
      <div className="space-y-4">{data ? (<div className="card p-4"><h3 className="text-lg font-semibold">Detalhes</h3><div className="k mb-2">Top Artefatos</div><table className="table mb-4"><thead><tr><th>ID</th><th>Tipo</th><th>Score</th></tr></thead><tbody>{artsTop.map((a:any)=>(<tr key={a.id}><td>#{a.id}</td><td>{a.type||'-'}</td><td>{a.score}</td></tr>))}</tbody></table><details><summary className="cursor-pointer k">JSON bruto (ver)</summary><pre className="mt-2 text-xs opacity-80 overflow-auto">{JSON.stringify(data, null, 2)}</pre></details></div>) : (<div className="card p-4"><p className="opacity-80">{t('selectMonsterToSee')}</p></div>)}</div>
    </div>
  </div></AppShell>)
}
