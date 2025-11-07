import Image from 'next/image';

export type Monster = {
  id: number;
  name: string;
  element: string;
  archetype?: string | null;
  natStars: number;
  awakened?: boolean;
  portraitUrl?: string | null;
};

export default function MonsterCard({ m }: { m: Monster }) {
  return (
    <div className="card flex gap-3">
      <div className="relative h-16 w-16 overflow-hidden rounded-xl">
        <Image
          src={m.portraitUrl || '/placeholder.png'}
          alt={m.name}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-base font-semibold">{m.name}</h3>
          <span className="rounded-md border px-2 py-0.5 text-xs opacity-80">{m.element}</span>
          {m.archetype && (
            <span className="rounded-md border px-2 py-0.5 text-xs opacity-80">{m.archetype}</span>
          )}
        </div>
        <p className="mt-1 text-sm opacity-80">
          {m.natStars}★ {m.awakened ? 'Awakened' : 'Base'}
        </p>
      </div>
    </div>
  );
}
