"use client";
import { useState } from "react";

export default function RunesClient({ enabled }: { enabled: boolean }) {
  // placeholder de UI com filtros básicos; você pode ligar à sua API quando estiver pronto
  const [slot, setSlot] = useState("Todos");
  const [setName, setSetName] = useState("Todos");
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Runas</h1>
      {!enabled && <p className="text-sm text-orange-400">UI nova desativada via flag. Habilite com NEXT_PUBLIC_FLAGS=newRunesUI</p>}
      <div className="card p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <select className="select" value={slot} onChange={e=>setSlot(e.target.value)}>
          {["Todos","1","2","3","4","5","6"].map(s => <option key={s} value={s}>Slot {s}</option>)}
        </select>
        <select className="select" value={setName} onChange={e=>setSetName(e.target.value)}>
          {["Todos","Violent","Swift","Despair","Rage","Will","Nemesis","Guard","Energy"].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button className="btn">Aplicar</button>
      </div>
      <div className="text-sm text-neutral-400">Conecte esta página à rota /api/runes quando a API estiver pronta. Mantive isolado para não quebrar nada do que existe.</div>
    </section>
  );
}
