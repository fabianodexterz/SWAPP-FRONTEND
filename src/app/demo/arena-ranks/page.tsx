
import { ArenaRank } from "@/components/ArenaRank";
export default function Page() {
  const ranks = [
    "Beginner",
    "Challenger1","Challenger2","Challenger3",
    "Fighter1","Fighter2","Fighter3",
    "Conqueror1","Conqueror2","Conqueror3",
    "Guardian1","Guardian2","Guardian3",
    "Legend"
  ];
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Arena Ranks Demo</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {ranks.map((r) => (
          <div key={r} className="rounded-xl border border-zinc-800 p-3 flex items-center gap-2 bg-zinc-900/40">
            <ArenaRank rank={r} size={36} />
            <span className="text-sm">{r}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
