"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const ELEMENTS = ["Fire", "Water", "Wind", "Light", "Dark"];

export default function MonstersFilters() {
  const router = useRouter();
  const sp = useSearchParams();

  const [q, setQ] = useState(sp.get("q") ?? "");
  const [element, setElement] = useState(sp.get("element") ?? "");
  const [stars, setStars] = useState(sp.get("stars") ?? "");
  const [awakened, setAwakened] = useState(sp.get("awakened") ?? "");

  useEffect(() => {
    setQ(sp.get("q") ?? "");
    setElement(sp.get("element") ?? "");
    setStars(sp.get("stars") ?? "");
    setAwakened(sp.get("awakened") ?? "");
  }, [sp]);

  function apply() {
    const params = new URLSearchParams(sp.toString());
    if (q) params.set("q", q); else params.delete("q");
    if (element) params.set("element", element); else params.delete("element");
    if (stars) params.set("stars", stars); else params.delete("stars");
    if (awakened) params.set("awakened", awakened); else params.delete("awakened");
    params.delete("page");
    router.push(`/monsters?${params.toString()}`);
  }

  function clear() {
    router.push("/monsters");
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 flex flex-wrap gap-3 items-end">
      <div className="flex flex-col gap-1">
        <label className="text-xs opacity-70">Busca</label>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Nome, elemento, arquÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©tipoÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦"
          className="px-3 py-2 rounded-md bg-black/30 border border-zinc-700"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs opacity-70">Elemento</label>
        <select
          value={element}
          onChange={(e) => setElement(e.target.value)}
          className="px-3 py-2 rounded-md bg-black/30 border border-zinc-700"
        >
          <option value="">Todos</option>
          {ELEMENTS.map(el => <option key={el} value={el}>{el}</option>)}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs opacity-70">Estrelas</label>
        <select
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          className="px-3 py-2 rounded-md bg-black/30 border border-zinc-700"
        >
          <option value="">Todas</option>
          {[1,2,3,4,5,6].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs opacity-70">Awakened</label>
        <select
          value={awakened}
          onChange={(e) => setAwakened(e.target.value)}
          className="px-3 py-2 rounded-md bg-black/30 border border-zinc-700"
        >
          <option value="">Qualquer</option>
          <option value="true">Sim</option>
          <option value="false">NÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button onClick={apply} className="px-4 py-2 rounded-md border border-zinc-700">Aplicar</button>
        <button onClick={clear} className="px-4 py-2 rounded-md border border-zinc-700">Limpar</button>
      </div>
    </div>
  );
}
