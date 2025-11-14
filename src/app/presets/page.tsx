import type { Metadata } from 'next';
import Image from 'next/image';
import { use } from 'react';

export const metadata: Metadata = {
  title: 'SWAPP ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ Presets',
  description: 'Presets de builds por modo de jogo. RTA disponÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­vel. Arena e Cairos em breve.',
};

type Preset = {
  id: string;
  title: string;
  mode: 'RTA' | 'Arena' | 'Cairos';
  tags: string[];
  summary?: string;
};

async function getPresets(): Promise<Preset[]> {
  return [
    { id: 'rta-lushen', title: 'Lushen ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡ÃƒÂ¯Ã‚Â¿Ã‚Â½ Rage/Blade', mode: 'RTA', tags: ['ATK', 'CRI'], summary: 'Arena/RTA nuker' },
    { id: 'rta-veromos', title: 'Veromos ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡ÃƒÂ¯Ã‚Â¿Ã‚Â½ Violent/Focus', mode: 'RTA', tags: ['HP', 'SPD'], summary: 'Controle/Sustain' },
    // exemplos futuros:
    // { id: 'arena-something', title: 'Time Arena XYZ', mode: 'Arena', tags: ['ATK'], summary: 'Em breve' },
    // { id: 'cairos-gbr10', title: 'Giant B12 Safe', mode: 'Cairos', tags: ['Safe'], summary: 'Em breve' },
  ];
}

const box = 'rounded-2xl border border-white/5 bg-white/[0.03] p-4 md:p-5';

export default function PresetsPage() {
  const data = use(getPresets());
  const activeMode: 'RTA' = 'RTA';
  const list = data.filter((p) => p.mode === activeMode);

  return (
    <main className="px-6 md:px-10 lg:px-12 py-8 max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 text-[#cbb797]">Presets</h1>

      {/* Tabs de modo */}
      <div className="flex items-center gap-3 mb-6">
        <button className="px-4 py-2 rounded-xl bg-yellow-400/90 text-black font-semibold border border-yellow-400 shadow">
          RTA
        </button>
        <button
          disabled
          title="Em breve"
          className="px-4 py-2 rounded-xl border border-white/10 bg-white/[0.06] text-white/50 cursor-not-allowed"
        >
          Arena (em breve)
        </button>
        <button
          disabled
          title="Em breve"
          className="px-4 py-2 rounded-xl border border-white/10 bg-white/[0.06] text-white/50 cursor-not-allowed"
        >
          Cairos (em breve)
        </button>
      </div>

      {/* Lista */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {list.map((p) => (
          <article key={p.id} className={box}>
            <div className="flex items-start gap-4">
              <Image
                src="/og-image.png"
                alt=""
                width={64}
                height={64}
                className="rounded-xl border border-white/10 bg-white/[0.04]"
              />
              <div className="flex-1">
                <h2 className="text-white/90 font-semibold text-lg">{p.title}</h2>
                <p className="text-xs text-white/50">{p.summary ?? 'Preset para RTA'}</p>
                <div className="mt-3 flex gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs rounded-full px-2 py-1 bg-white/[0.06] border border-white/10 text-white/70">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4">
                  <button className="rounded-xl bg-yellow-400/90 hover:bg-yellow-400 text-black font-semibold px-4 py-2 text-sm">
                    Abrir
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
