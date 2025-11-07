// src/app/dashboard/page.tsx
import MiniBar from "@/components/MiniBar";
import MiniDonut from "@/components/MiniDonut";

type CountResponse = { total?: number; data?: any[]; items?: any[]; meta?: { total?: number } } | any;

const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000";

function readTotal(json: CountResponse): number {
  if (typeof json?.total === "number") return json.total;
  if (Array.isArray(json?.data)) return json.data.length;
  if (Array.isArray(json?.items)) return json.items.length;
  if (typeof json?.meta?.total === "number") return json.meta.total;
  return 0;
}

async function fetchCount(url: string) {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return 0;
    return readTotal(await res.json());
  } catch {
    return 0;
  }
}

export const metadata = { title: "SWApp â€¢ Dashboard" };

export default async function DashboardPage() {
  const q = "?limit=1"; // a API jÃ¡ devolve 'total', nÃ£o precisamos dos itens

  // Contagens por elemento
  const [total, water, wind, fire, light, dark] = await Promise.all([
    fetchCount(`${API}/api/monsters${q}`),
    fetchCount(`${API}/api/monsters${q}&element=water`),
    fetchCount(`${API}/api/monsters${q}&element=wind`),
    fetchCount(`${API}/api/monsters${q}&element=fire`),
    fetchCount(`${API}/api/monsters${q}&element=light`),
    fetchCount(`${API}/api/monsters${q}&element=dark`),
  ]);

  const byElement = [
    { label: "Water", value: water, color: "#60a5fa" },
    { label: "Wind",  value: wind,  color: "#34d399" },
    { label: "Fire",  value: fire,  color: "#f87171" },
    { label: "Light", value: light, color: "#facc15" },
    { label: "Dark",  value: dark,  color: "#a78bfa" },
  ];

  // Contagens por estrelas (3/4/5/6)
  const [s3, s4, s5, s6] = await Promise.all([
    fetchCount(`${API}/api/monsters${q}&stars=3`),
    fetchCount(`${API}/api/monsters${q}&stars=4`),
    fetchCount(`${API}/api/monsters${q}&stars=5`),
    fetchCount(`${API}/api/monsters${q}&stars=6`),
  ]);

  const byStars = [
    { label: "3â˜…", value: s3, color: "#9ca3af" }, // slate-400
    { label: "4â˜…", value: s4, color: "#60a5fa" }, // blue-400
    { label: "5â˜…", value: s5, color: "#f59e0b" }, // amber-500
    { label: "6â˜…", value: s6, color: "#10b981" }, // emerald-500
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      {/* CabeÃ§alho */}
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
          <span>ðŸ“Š</span> Dashboard
        </h1>
        <a href="/" className="text-sm text-primary/80 hover:text-primary">Voltar</a>
      </header>

      {/* Linha 1: Total / Elementos / Atalhos por elemento */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total */}
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-700">Total de Monstros</h2>
          <p className="mt-2 text-4xl font-bold text-slate-900 tabular-nums">{total}</p>
          <p className="mt-1 text-xs text-slate-500">Contagem geral cadastrada.</p>
          <div className="mt-4">
            <a
              href="/"
              className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-sm text-white hover:opacity-90"
            >
              Ver lista completa
            </a>
          </div>
        </div>

        {/* GrÃ¡fico por elemento */}
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-700">Monstros por elemento</h2>
          <div className="mt-3">
            <MiniBar
              data={byElement.map((d) => ({ label: d.label, value: d.value, color: d.color }))}
              height={140}
              showValues
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
            {byElement.map((d) => (
              <span key={d.label} className="inline-flex items-center gap-1">
                <span className="inline-block h-3 w-3 rounded-sm" style={{ background: d.color }} />
                {d.label}: <strong>{d.value}</strong>
              </span>
            ))}
          </div>
        </div>

        {/* Atalhos rÃ¡pidos por elemento */}
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-700">Atalhos rÃ¡pidos</h2>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {["water","wind","fire","light","dark"].map((el) => (
              <li key={el}>
                <a
                  className="block rounded-md border border-slate-200 px-3 py-2 hover:bg-slate-50 capitalize"
                  href={`/?element=${el}&page=1`}
                >
                  {el}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-slate-500">Clique para abrir a lista jÃ¡ filtrada por elemento.</p>
        </div>
      </section>

      {/* Linha 2: DistribuiÃ§Ã£o por Estrelas / Atalhos por Estrelas */}
      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        {/* Donut por estrelas */}
        <div className="rounded-lg border border-slate-200 bg-white p-4 lg:col-span-2">
          <h2 className="text-sm font-semibold text-slate-700">DistribuiÃ§Ã£o por estrelas</h2>
          <div className="mt-3">
            <MiniDonut data={byStars} centerTitle="Total" />
          </div>
        </div>

        {/* Atalhos por estrela */}
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-700">Filtros por estrelas</h2>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {[3,4,5,6].map((s) => (
              <li key={s}>
                <a
                  className="block rounded-md border border-slate-200 px-3 py-2 hover:bg-slate-50"
                  href={`/?stars=${s}&page=1`}
                >
                  {s}â˜…
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-slate-500">Abra a lista filtrada diretamente por natStars.</p>
        </div>
      </section>
    </main>
  );
}
