import type { Monster } from "@/lib/types";
import Image from "next/image";
import { elementColor, placeholderFor } from "@/lib/images";

export default function MonsterCard({ m }: { m: Monster }) {
  const ph = placeholderFor(m.name, m.element);
  return (
    <article className="card p-4 flex items-center gap-4 justify-between">
      <div className="flex items-center gap-4">
        <div className={`size-12 rounded-lg ring-2 flex items-center justify-center ${ph.ring} bg-neutral-900`}>
          {m.portraitUrl ? (
            /* fallback para retrato remoto/local */
            <Image src={m.portraitUrl} alt={m.name} width={48} height={48} className="rounded-md object-cover"/>
          ) : (
            <span className="text-lg opacity-80">{ph.letter}</span>
          )}
        </div>
        <div>
          <div className="font-medium">{m.name}</div>
          <div className="flex items-center gap-2 mt-1">
            <span className={`badge ${elementColor(m.element)}`}>{m.element}</span>
            {m.archetype && <span className="badge">{m.archetype}</span>}
            <span className="badge">★ {m.natStars}</span>
            <span className="badge">{m.awakened ? "Awakened" : "Not Awakened"}</span>
          </div>
        </div>
      </div>
      {m.swarfarmId != null && (
        <span className="text-xs text-neutral-500">SWF: {m.swarfarmId}</span>
      )}
    </article>
  );
}
