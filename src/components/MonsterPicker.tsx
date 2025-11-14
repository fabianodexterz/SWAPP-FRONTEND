// src/components/MonsterPicker.tsx
"use client";
type Monster = { id: number; name: string; element?: "Fire"|"Water"|"Wind"|"Light"|"Dark"; portraitUrl?: string };

export default function MonsterPicker({
  monsters,
  onPick,
}: {
  monsters: Monster[];
  onPick: (m: Monster) => void;
}) {
  const groups = {
    Water: monsters.filter(m => m.element === "Water"),
    Fire: monsters.filter(m => m.element === "Fire"),
    Wind: monsters.filter(m => m.element === "Wind"),
    Light: monsters.filter(m => m.element === "Light"),
    Dark: monsters.filter(m => m.element === "Dark"),
  };

  return (
    <div className="space-y-6">
      {Object.entries(groups).map(([el, list]) => (
        <section key={el}>
          <h4 className="text-[#cbb797] mb-2">{el}</h4>
          <div className="flex flex-wrap gap-3">
            {list.map(m => (
              <button
                key={m.id}
                onClick={() => onPick(m)}
                className="rounded-full overflow-hidden bg-[#171717] hover:ring-2 hover:ring-amber-400"
                title={m.name}
              >
                <img
                  src={m.portraitUrl ?? "/images/monsters/default.png"}
                  className="w-12 h-12 object-cover"
                  alt={m.name}
                />
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
