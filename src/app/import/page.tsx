"use client"
import AppShell from "../../components/AppShell";
import { useRef, useState } from "react";
export default function ImportPage(){
  const ref = useRef<HTMLInputElement|null>(null); const [msg, setMsg] = useState<string|null>(null); const [err, setErr] = useState<string|null>(null); const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const send = async () => {
    setMsg(null); setErr(null);
    const file = ref.current?.files?.[0]; if (!file) { setErr("Selecione um arquivo JSON."); return; }
    try { const text = await file.text(); let json = JSON.parse(text); if (Array.isArray(json)) json = { presets: json }; if (!json.presets || !Array.isArray(json.presets)) { setErr("Formato invÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡lido. Esperado { presets: [...] } ou um array de presets."); return; }
      const res = await fetch(`${apiBase}/api/presets/import`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(json) });
      const data = await res.json(); if (!res.ok) throw new Error(data?.error || "Erro ao importar"); setMsg(`Importado com sucesso: ${data.created} presets.`);
    } catch (e:any) { setErr(e.message || "Falha ao importar"); }
  }
  return (<AppShell><div className="card p-5"><div className="k">Import JSON</div><div className="mt-3 flex items-center gap-3"><input ref={ref} type="file" accept="application/json" className="file-input file-input-bordered" /><button className="btn btn-primary" onClick={send}>Enviar</button></div>{msg && <div className="mt-3 rounded-xl p-3 bg-emerald-900/20 border border-emerald-800 text-emerald-300">{msg}</div>}{err && <div className="mt-3 rounded-xl p-3 bg-rose-900/20 border border-rose-800 text-rose-300">{err}</div>}</div></AppShell>)
}
