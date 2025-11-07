
import { RuneIcon } from "@/components/RuneIcon";
export default function Page() {
  const sets = ['Energy', 'Fatal', 'Blade', 'Swift', 'Focus', 'Guard', 'Endure', 'Shield', 'Revenge', 'Vampire', 'Destroy', 'Despair', 'Will', 'Rage', 'Violent', 'Nemesis', 'Fight', 'Determination', 'Enhance'];
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Rune Icons Demo</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {sets.map((s) => (
          <div key={s} className="rounded-xl border border-zinc-800 p-3 flex items-center gap-2 bg-zinc-900/40">
            <RuneIcon set={s} size={28} />
            <span className="text-sm">{s}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
