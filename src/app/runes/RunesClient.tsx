"use client";

import { useMemo, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function RunesClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const slotInit = sp.get("slot") ?? "all";
  const setInit = sp.get("set") ?? "all";

  const [slot, setSlot] = useState(slotInit);
  const [setType, setSetType] = useState(setInit);

  const qp = useMemo(() => {
    const p = new URLSearchParams();
    if (slot !== "all") p.set("slot", slot);
    if (setType !== "all") p.set("set", setType);
    return p.toString();
  }, [slot, setType]);

  function apply() {
    const s = qp ? `?${qp}` : "";
    router.push(`/runes${s}`);
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-amber-400">
        UI nova desativada via flag. Habilite com <code>NEXT_PUBLIC_FLAGS=newRunesUI</code>
      </p>
      <div className="flex flex-col md:flex-row gap-3">
        <select value={slot} onChange={e => setSlot(e.target.value)} className="bg-zinc-900 rounded px-3 py-2">
          <option value="all">Slot Todos</option>
          <option value="1">Slot 1</option>
          <option value="2">Slot 2</option>
          <option value="3">Slot 3</option>
          <option value="4">Slot 4</option>
          <option value="5">Slot 5</option>
          <option value="6">Slot 6</option>
        </select>
        <select value={setType} onChange={e => setSetType(e.target.value)} className="bg-zinc-900 rounded px-3 py-2">
          <option value="all">Todos</option>
          <option value="swift">Swift</option>
          <option value="fatal">Fatal</option>
          <option value="violent">Violent</option>
          <option value="rage">Rage</option>
        </select>
        <button onClick={apply} className="bg-blue-600 hover:bg-blue-500 rounded px-4 py-2">Aplicar</button>
      </div>
      <p className="text-zinc-400">
        Conecte esta página à rota <code>/api/runes</code> quando a API estiver pronta. Mantive isolado para não
        quebrar nada do que existe.
      </p>
    </div>
  );
}
