"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import type { Monster, Paged } from "@/lib/types";
import MonsterCard from "./MonsterCard";

type Props = { initial: Paged<Monster> };

const elements = ["Todos","Fire","Water","Wind","Light","Dark"] as const;
const starOpts = ["Todas","1","2","3","4","5","6"] as const;
const awakenedOpts = ["Qualquer","Awakened","NotAwakened"] as const;

export default function MonstersClient({ initial }: Props) {
  const search = useSearchParams();
  const router = useRouter();

  const [q, setQ] = useState(search.get("q") || "");
  const [element, setElement] = useState(search.get("element") || "Todos");
  const [stars, setStars] = useState(search.get("stars") || "Todas");
  const [awakened, setAwakened] = useState(search.get("awakened") || "Qualquer");

  const items = initial.items;

  const filtered = useMemo(() => {
    return items.filter(m => {
      if (q && !`${m.name} ${m.element} ${m.archetype || ""}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (element !== "Todos" && m.element !== element) return false;
      if (stars !== "Todas" && m.natStars !== Number(stars)) return false;
      if (awakened !== "Qualquer") {
        const want = awakened === "Awakened";
        if (!!m.awakened !== want) return false;
      }
      return true;
    });
  }, [items, q, element, stars, awakened]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (element !== "Todos") params.set("element", element);
    if (stars !== "Todas") params.set("stars", stars);
    if (awakened !== "Qualquer") params.set("awakened", awakened);
    const qs = params.toString();
    router.replace("/monsters" + (qs ? `?${qs}` : ""));
  }, [q, element, stars, awakened, router]);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Monstros</h1>

      <div className="card p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          <input className="input w-full" placeholder="Nome, elemento, arquétipo" value={q} onChange={e=>setQ(e.target.value)} />
          <select className="select" value={element} onChange={e=>setElement(e.target.value)}>
            {elements.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
          <select className="select" value={stars} onChange={e=>setStars(e.target.value)}>
            {starOpts.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
          <select className="select" value={awakened} onChange={e=>setAwakened(e.target.value)}>
            {awakenedOpts.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
          <button className="btn" onClick={()=>{ /* já aplica em tempo real */ }}>Aplicar</button>
          <button className="btn" onClick={()=>{ setQ(""); setElement("Todos"); setStars("Todas"); setAwakened("Qualquer"); }}>Limpar</button>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(m => <MonsterCard key={m.id} m={m} />)}
        {filtered.length === 0 && <p className="text-neutral-500 text-sm">Nenhum resultado com os filtros atuais.</p>}
      </div>
    </section>
  );
}
