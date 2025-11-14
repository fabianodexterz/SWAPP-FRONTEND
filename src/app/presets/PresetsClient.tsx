'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { Search, RefreshCcw } from 'lucide-react';

interface Preset {
  id: string | number;
  name: string;
  monster: string;
  element?: string;
  stars?: number;
  type?: string;
  sets?: string[];
  description?: string;
}

const PresetsClient: React.FC = () => {
  const [query, setQuery] = useState('');
  const [element, setElement] = useState('Todos');
  const [role, setRole] = useState('Todas');
  const [stars, setStars] = useState('Todas');

  // SimulaÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o temporÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ria de dados mockados
  const presets: Preset[] = useMemo(
    () => [
      {
        id: 1,
        name: 'Lushen Rage/Blade Arena',
        monster: 'Lushen',
        element: 'Vento',
        stars: 4,
        type: 'DPS',
        sets: ['Rage', 'Blade'],
        description: 'Build de dano para Arena rÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡pida e eficiente.',
      },
      {
        id: 2,
        name: 'Fran Swift/Will Suporte',
        monster: 'Fran',
        element: 'Luz',
        stars: 4,
        type: 'Support',
        sets: ['Swift', 'Will'],
        description: 'Build de suporte para imunidade e cura.',
      },
      {
        id: 3,
        name: 'Verde SPD/CRI/RES Raid',
        monster: 'Verdehile',
        element: 'Fogo',
        stars: 4,
        type: 'Bruiser',
        sets: ['SPD', 'CRI', 'RES'],
        description: 'Build voltada para controle de turno e resistÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âªncia.',
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    return presets.filter((p) => {
      const matchQuery = query
        ? p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.monster.toLowerCase().includes(query.toLowerCase())
        : true;
      const matchElement =
        element === 'Todos' || p.element?.toLowerCase() === element.toLowerCase();
      const matchRole =
        role === 'Todas' || p.type?.toLowerCase() === role.toLowerCase();
      const matchStars =
        stars === 'Todas' || String(p.stars) === stars;
      return matchQuery && matchElement && matchRole && matchStars;
    });
  }, [presets, query, element, role, stars]);

  return (
    <main className="min-h-screen px-4 py-10 bg-[#0a0a0a] text-[#e8d5c0]">
      <h1 className="text-3xl font-bold mb-2">Presets</h1>
      <p className="text-sm text-[#a7a7a7] mb-8">
        Explore presets prontos de builds e aplique diretamente no otimizador.
      </p>

      {/* Barra de Filtros */}
      <section className="flex flex-wrap gap-3 items-center mb-8">
        <div className="flex items-center bg-[#151515] border border-[#2a2a2a] rounded-lg px-3 py-2">
          <Search size={16} className="text-[#c5c6c9] mr-2" />
          <input
            type="text"
            placeholder="Buscar preset..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent text-sm outline-none w-48 placeholder-[#6b6b6b]"
          />
        </div>

        <select
          value={element}
          onChange={(e) => setElement(e.target.value)}
          className="bg-[#151515] text-sm rounded-lg px-3 py-2 border border-[#2a2a2a] text-[#c5c6c9]"
        >
          <option>Todos</option>
          <option>Fogo</option>
          <option>ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡ÃƒÂ¯Ã‚Â¿Ã‚Â½gua</option>
          <option>Vento</option>
          <option>Luz</option>
          <option>Trevas</option>
        </select>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="bg-[#151515] text-sm rounded-lg px-3 py-2 border border-[#2a2a2a] text-[#c5c6c9]"
        >
          <option>Todas</option>
          <option>DPS</option>
          <option>Support</option>
          <option>Bruiser</option>
        </select>

        <select
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          className="bg-[#151515] text-sm rounded-lg px-3 py-2 border border-[#2a2a2a] text-[#c5c6c9]"
        >
          <option>Todas</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
        </select>

        <button
          onClick={() => {
            setQuery('');
            setElement('Todos');
            setRole('Todas');
            setStars('Todas');
          }}
          className="flex items-center bg-[#2a2a2a] hover:bg-[#3a3a3a] text-sm px-3 py-2 rounded-lg"
        >
          <RefreshCcw size={14} className="mr-1" /> Resetar
        </button>
      </section>

      {/* Lista de Presets */}
      <section className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="bg-[#151515] border border-[#2a2a2a] rounded-2xl p-5 flex flex-col justify-between shadow-lg hover:border-[#3a3a3a] transition"
          >
            <div>
              <h2 className="text-lg font-semibold text-[#f5d67b] mb-1">
                {p.name}
              </h2>
              <p className="text-sm text-[#a7a7a7] mb-2">
                {p.monster} ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ {p.type}
              </p>
              <p className="text-xs text-[#6b6b6b] mb-3">{p.description}</p>
            </div>

            <div className="flex gap-2 mt-auto">
              <Link
                href={{ pathname: '/presets/[id]', query: { id: String(p.id) } }}
                className="px-3 py-1.5 rounded-xl text-sm bg-[#151515] border border-[#2a2a2a] text-[#c5c6c9] hover:bg-[#1b1b1b] transition"
              >
                Detalhes
              </Link>

              <button className="px-3 py-1.5 rounded-xl text-sm bg-[#f1b80a] text-black font-semibold hover:bg-[#ffce48] transition">
                Aplicar no Otimizador
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-center col-span-full text-[#7c7c7c] py-8">
            Nenhum preset encontrado.
          </p>
        )}
      </section>
    </main>
  );
};

export default PresetsClient;
