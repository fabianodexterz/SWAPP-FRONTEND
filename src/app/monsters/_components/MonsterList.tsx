"use client";

import MonsterRow, { MonsterRef } from "./MonsterRow";

type Props = {
  monsters: MonsterRef[];
};

export default function MonsterList({ monsters }: Props) {
  if (!monsters?.length) {
    return (
      <div className="p-6 text-center text-white/60 ring-1 ring-white/10 rounded-2xl">
        Nenhum monstro encontrado.
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      {monsters.map((m) => (
        <MonsterRow key={m.id} monster={m} />
      ))}
    </div>
  );
}
