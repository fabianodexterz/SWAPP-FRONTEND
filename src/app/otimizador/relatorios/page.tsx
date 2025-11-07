'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

/**
 * Relatórios – drop-in
 * Mostra retrato do monstro quando tivermos `portraitUrl` ou `swarfarmId`.
 * Fallback automático: chip do elemento.
 */

type Relatorio = {
  id: string;
  monsterName: string;
  build: string;
  spd: number;
  cri: string;
  cdmg: string;
  score: number;
  element: 'Fire' | 'Water' | 'Wind' | 'Light' | 'Dark';
  portraitUrl?: string | null; // se vier do backend
  swarfarmId?: number | null;  // alternativa
};

const elementColors: Record<Relatorio['element'], string> = {
  Fire: '#e37046',
  Water: '#2f80ed',
  Wind: '#2ea36a',
  Light: '#d6b45b',
  Dark: '#7b61ff',
};

function Portrait({
  item,
  size = 28,
  radius = 8,
}: {
  item: Relatorio;
  size?: number;
  radius?: number;
}) {
  // 1) preferir portraitUrl vindo da API
  let src: string | null = item.portraitUrl ?? null;

  // 2) se não tiver, mas existir swarfarmId, monta um caminho padrão (ajuste se seu backend já serve isso)
  if (!src && item.swarfarmId) {
    // Exemplo de caminho local/CDN. Troque conforme seu projeto.
    src = `/images/monsters/${item.swarfarmId}.png`;
  }

  if (src) {
    return (
      <div
        className="overflow-hidden ring-1 ring-[#3b2a18]"
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          boxShadow: '0 0 0 2px rgba(0,0,0,0.25)',
        }}
        title={item.monsterName}
      >
        {/* next/image com fallback simples (onError esconde) */}
        <Image
          src={src}
          alt={item.monsterName}
          width={size}
          height={size}
          className="h-full w-full object-cover"
          onError={(e) => {
            // se quebrar, esconde e deixa o fallback de elemento
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>
    );
  }

  // 3) fallback: badge do elemento
  return (
    <div
      className="grid place-items-center text-black"
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: elementColors[item.element],
        boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.25)',
      }}
      title={`${item.element} • ${item.monsterName}`}
    >
      <span className="text-[10px] font-semibold uppercase tracking-wide">
        {item.element[0]}
      </span>
    </div>
  );
}

export default function RelatoriosPage() {
  // NOTE: troque pela sua fonte real (API)
  const dados = useMemo<Relatorio[]>(
    () => [
      {
        id: '1',
        monsterName: 'Verdehile',
        build: 'Violent/Will',
        spd: 290,
        cri: '100%',
        cdmg: '170%',
        score: 92,
        element: 'Fire',
        swarfarmId: 192, // exemplo
        portraitUrl: null,
      },
      {
        id: '2',
        monsterName: 'Galleon',
        build: 'Swift/Blade',
        spd: 320,
        cri: '80%',
        cdmg: '150%',
        score: 88,
        element: 'Water',
        swarfarmId: 146,
        portraitUrl: null,
      },
      {
        id: '3',
        monsterName: 'Fran',
        build: 'Swift/Will',
        spd: 300,
        cri: '70%',
        cdmg: '120%',
        score: 75,
        element: 'Light',
        swarfarmId: 1104,
        portraitUrl: null,
      },
    ],
    []
  );

  const [conteudo, setConteudo] = useState<'Arena' | 'RTA' | 'Masmorra de Cairos'>('Arena');
  const [busca, setBusca] = useState('');
  const [ordem, setOrdem] = useState<'Score' | 'SPD' | 'CDMG' | 'CRI'>('Score');

  const filtrados = useMemo(() => {
    let arr = [...dados];
    if (busca.trim()) {
      const q = busca.trim().toLowerCase();
      arr = arr.filter(
        (r) =>
          r.monsterName.toLowerCase().includes(q) ||
          r.build.toLowerCase().includes(q)
      );
    }
    switch (ordem) {
      case 'SPD':
        arr.sort((a, b) => b.spd - a.spd);
        break;
      case 'CDMG':
        arr.sort((a, b) => parseInt(b.cdmg) - parseInt(a.cdmg));
        break;
      case 'CRI':
        arr.sort((a, b) => parseInt(b.cri) - parseInt(a.cri));
        break;
      default:
        arr.sort((a, b) => b.score - a.score);
        break;
    }
    return arr;
  }, [dados, busca, ordem]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 text-[#e9d2a6]">
      <h1 className="mb-6 text-3xl font-semibold tracking-wide text-[#ffb774]">
        Otimizador — Relatórios
      </h1>

      <div className="rounded-xl border border-[#3b2a18] bg-[#20180f]/70">
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          <select
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value as any)}
            className="w-full rounded-md border border-[#3b2a18] bg-[#14100c] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#6a4a22] sm:w-52"
          >
            <option value="Arena">Arena</option>
            <option value="RTA">RTA</option>
            <option value="Masmorra de Cairos">Masmorra de Cairos</option>
          </select>

          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Monstro ou build..."
            className="w-full rounded-md border border-[#3b2a18] bg-[#14100c] px-3 py-2 text-sm outline-none placeholder:text-[#756447] focus:ring-2 focus:ring-[#6a4a22]"
          />

          <select
            value={ordem}
            onChange={(e) => setOrdem(e.target.value as any)}
            className="w-full rounded-md border border-[#3b2a18] bg-[#14100c] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#6a4a22] sm:w-48"
          >
            <option value="Score">Score</option>
            <option value="SPD">SPD</option>
            <option value="CDMG">CDMG</option>
            <option value="CRI">CRI</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-t border-[#3b2a18] text-sm">
            <thead className="bg-[#1a140d] text-[#c8b390]">
              <tr>
                <th className="px-3 py-2 text-left">Monstro</th>
                <th className="px-3 py-2 text-left">Build</th>
                <th className="px-3 py-2 text-left">SPD</th>
                <th className="px-3 py-2 text-left">CRI</th>
                <th className="px-3 py-2 text-left">CDMG</th>
                <th className="px-3 py-2 text-left">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3b2a18]">
              {filtrados.map((r) => (
                <tr key={r.id} className="hover:bg-[#2a2016]">
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-3">
                      <Portrait item={r} />
                      <span className="font-medium">{r.monsterName}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2">{r.build}</td>
                  <td className="px-3 py-2">{r.spd}</td>
                  <td className="px-3 py-2">{r.cri}</td>
                  <td className="px-3 py-2">{r.cdmg}</td>
                  <td className="px-3 py-2">
                    <span className="inline-flex min-w-10 justify-center rounded-full bg-[#2b2217] px-2 py-0.5 text-[#ffcf8a]">
                      {r.score}
                    </span>
                  </td>
                </tr>
              ))}

              {filtrados.length === 0 && (
                <tr>
                  <td className="px-3 py-6 text-center text-[#bca98a]" colSpan={6}>
                    Nenhum resultado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
