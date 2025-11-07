"use client";
import { useState } from "react";
export default function ArtifactsPage(){
  const API = process.env.NEXT_PUBLIC_API_URL!;
  const [unitId,setUnitId]=useState('');
  const [evalRes,setEvalRes]=useState<any>(null);
  const [suggRes,setSuggRes]=useState<any>(null);
  async function evaluate(){
    const r=await fetch(`${API}/artifacts/evaluate?unitId=${unitId}`);
    setEvalRes(await r.json());
  }
  async function suggest(){
    const r=await fetch(`${API}/artifacts/suggest?unitId=${unitId}&limit=5`);
    setSuggRes(await r.json());
  }
  return (<main style={{padding:24}}>
    <h2>Artefatos</h2>
    <label>Unit ID: <input value={unitId} onChange={e=>setUnitId(e.target.value)} /></label>
    <button onClick={evaluate} style={{marginLeft:8}}>Avaliar equipados</button>
    <button onClick={suggest} style={{marginLeft:8}}>Sugerir do inventário</button>
    <div style={{display:'grid', gap:12, marginTop:16}}>
      {evalRes && <pre style={{background:'#11161d',padding:12,borderRadius:12}}>{JSON.stringify(evalRes,null,2)}</pre>}
      {suggRes && <pre style={{background:'#11161d',padding:12,borderRadius:12}}>{JSON.stringify(suggRes,null,2)}</pre>}
    </div>
  </main>);
}
