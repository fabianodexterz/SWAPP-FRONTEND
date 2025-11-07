'use client';

import Container from '@/components/Container';
import { theme } from '@/theme';
import { useState } from 'react';

type Team = {
  id: string;
  name: string;
  mode: 'Arena' | 'Guild' | 'RTA' | 'Cairos';
  notes?: string;
  monsters: number[]; // monster ids
};

export default function EquipesPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [name, setName] = useState('');
  const [mode, setMode] = useState<Team['mode']>('Arena');

  function addTeam() {
    if (!name.trim()) return;
    setTeams((t) => [
      ...t,
      { id: String(Date.now()), name: name.trim(), mode, monsters: [] },
    ]);
    setName('');
  }

  return (
    <Container>
      <div className="mt-8 rounded-2xl border p-6" style={{ background: theme.bg.panel, borderColor: theme.border }}>
        <h1 className="text-2xl font-bold" style={{ color: '#cbb797', textShadow: '0 0 6px rgba(216,132,104,0.35)' }}>
          Equipes
        </h1>

        <div className="mt-4 grid gap-4 md:grid-cols-[2fr_3fr]">
          <div className="rounded-xl border p-4 space-y-3" style={{ background: 'rgba(18,13,10,0.6)', borderColor: theme.border }}>
            <div>
              <label className="login-label text-sm">Nome da equipe</label>
              <input className="login-input mt-1" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: AA - Speed" />
            </div>
            <div>
              <label className="login-label text-sm">Modo</label>
              <select
                className="login-input mt-1"
                value={mode}
                onChange={(e) => setMode(e.target.value as Team['mode'])}
              >
                <option>Arena</option>
                <option>Guild</option>
                <option>RTA</option>
                <option>Cairos</option>
              </select>
            </div>
            <button onClick={addTeam} className="px-4 py-2 rounded-lg border"
              style={{ background: 'rgba(18,13,10,0.6)', borderColor: theme.border }}>
              Adicionar
            </button>
          </div>

          <div className="space-y-3">
            {teams.length === 0 ? (
              <div className="rounded-xl border p-4 text-center" style={{ background: 'rgba(18,13,10,0.6)', borderColor: theme.border }}>
                <p className="opacity-80">Nenhuma equipe criada ainda.</p>
              </div>
            ) : (
              teams.map((t) => (
                <div key={t.id} className="rounded-xl border p-4" style={{ background: 'rgba(18,13,10,0.6)', borderColor: theme.border }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold" style={{ color: '#cbb797' }}>{t.name}</h3>
                      <p className="text-xs opacity-70">Modo: {t.mode}</p>
                    </div>
                    <button
                      onClick={() => setTeams((arr) => arr.filter((x) => x.id !== t.id))}
                      className="px-3 py-1 rounded-md border text-sm"
                      style={{ background: 'rgba(18,13,10,0.6)', borderColor: theme.border }}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
