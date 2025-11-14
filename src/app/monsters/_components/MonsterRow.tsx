"use client";

import Image from "next/image";
import ElementIcon, { ElementName } from "@/components/ElementIcon";

export type MonsterRef = {
  id: number;
  name: string;
  element: ElementName;
  portraitUrl?: string | null;
  natStars?: number;
};

type Props = {
  monster: MonsterRef;
  onClick?: (m: MonsterRef) => void;
};

export default function MonsterRow({ monster, onClick }: Props) {
  const portrait = monster.portraitUrl || "/images/monster-placeholder.svg";

  return (
    <button
      onClick={() => onClick?.(monster)}
      className="w-full text-left grid grid-cols-[44px_1fr_auto] items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 ring-1 ring-white/5"
    >
      <div className="relative h-11 w-11 overflow-hidden rounded-xl ring-1 ring-white/10">
        <Image
          src={portrait}
          alt={monster.name}
          width={44}
          height={44}
          className="h-11 w-11 object-cover"
        />
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <ElementIcon element={monster.element} size={20} />
          <p className="truncate text-white/90 font-medium">{monster.name}</p>
        </div>
        {monster.natStars ? (
          <p className="text-xs text-white/40">{monster.natStars}âËœâ€¦</p>
        ) : null}
      </div>

      <div className="text-xs text-white/50">ID #{monster.id}</div>
    </button>
  );
}
