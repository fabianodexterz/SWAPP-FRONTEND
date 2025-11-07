"use client";

import { useState } from "react";
import { useAtbSimulator } from "../../hooks/useAtbSimulator";

type UnitForm = {
  id: string; name: string; baseSpd: number; speedPct: number; team: "ally" | "enemy";
};

const defaultUnits: UnitForm[] = [
  { id: "ally1",  name: "Bernard", baseSpd: 111, speedPct: 120, team: "ally" },
  { id: "ally2",  name: "Galleon", baseSpd: 96,  speedPct: 80,  team: "ally" },
  { id: "enemy1", name: "Theo",    baseSpd: 100, speedPct: 70,  team: "enemy" },
];

export default function AtbSimulatorPanel() {
  const [units, setUnits] = useState<UnitForm[]>(defaultUnits);
  const [leaderPct, setLeaderPct] = useState(24);
  const [towerPct, setTowerPct] = useState(15);
  const [setSwift, setSetSwift] = useState(true);
  const [turnCap, setTurnCap] = useState(10);
  const [leoEnabled, setLeoEnabled] = useState(false);
  const [leoSpeed, setLeoSpeed] = useState(100);

  const { run, loading, error, data } = useAtbSimulator(); // POST /api/simulate-atb

  const handleChange = (idx: number, field: keyof UnitForm, value: string) => {
    const clone = [...units];
    if (field === "team") clone[idx][field] = value as "ally" | "enemy";
    else if (field === "name" || field === "id") clone[idx][field] = value;
    else clone[idx][field] = Number(value) as any;
    setUnits(clone);
  };

  const simulate = async () => {
    const payload = {
      units: units.map(u => ({
        id: u.id, name: u.name, baseSpd: u.baseSpd, speedPct: u.speedPct, team: u.team
      })),
      options: {
        bonuses: { leaderPct, towerPct, setSwift },
        leo: { enabled: leoEnabled, leoSpeed },
        turnCap
      }
    };
    await run(payload.units as any, payload.options as any);
  };

  return (
    <div className="space-y-6">
      <div className="glass p-6 space-y-4">
        <h2 className="text-xl font-semibold">Parametros</h2>

        <div className="grid md:grid-cols-3 gap-3">
          {units.map((u, i) => (
            <div key={u.id} className="p-4 rounded-xl border border-white/10 bg-neutral-900/50">
              <div className="font-medium mb-2">Unidade {i+1}</div>
              <div className="grid grid-cols-2 gap-2">
                <input className="px-2 py-1 rounded bg-neutral-800 border border-white/10"
                       value={u.name} onChange={e=>handleChange(i,"name",e.target.value)} placeholder="Nome"/>
                <input className="px-2 py-1 rounded bg-neutral-800 border border-white/10"
                       value={u.id} onChange={e=>handleChange(i,"id",e.target.value)} placeholder="ID"/>

                <input type="number" className="px-2 py-1 rounded bg-neutral-800 border border-white/10"
                       value={u.baseSpd} onChange={e=>handleChange(i,"baseSpd",e.target.value)} placeholder="Base SPD"/>
                <input type="number" className="px-2 py-1 rounded bg-neutral-800 border border-white/10"
                       value={u.speedPct} onChange={e=>handleChange(i,"speedPct",e.target.value)} placeholder="% SPD"/>

                <select className="col-span-2 px-2 py-1 rounded bg-neutral-800 border border-white/10"
                        value={u.team} onChange={e=>handleChange(i,"team",e.target.value)}>
                  <option value="ally">Aliado</option>
                  <option value="enemy">Inimigo</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-4 gap-3">
          <label className="flex items-center gap-2">
            Leader% <input type="number" className="w-20 px-2 py-1 rounded bg-neutral-800 border border-white/10"
            value={leaderPct} onChange={e=>setLeaderPct(Number(e.target.value))}/>
          </label>
          <label className="flex items-center gap-2">
            Tower% <input type="number" className="w-20 px-2 py-1 rounded bg-neutral-800 border border-white/10"
            value={towerPct} onChange={e=>setTowerPct(Number(e.target.value))}/>
          </label>
          <label className="flex items-center gap-2">
            Swift <input type="checkbox" className="scale-110" checked={setSwift} onChange={e=>setSetSwift(e.target.checked)}/>
          </label>
          <label className="flex items-center gap-2">
            TurnCap <input type="number" className="w-20 px-2 py-1 rounded bg-neutral-800 border border-white/10"
            value={turnCap} onChange={e=>setTurnCap(Number(e.target.value))}/>
          </label>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <label className="flex items-center gap-2">
            Leo ativo <input type="checkbox" className="scale-110" checked={leoEnabled} onChange={e=>setLeoEnabled(e.target.checked)}/>
          </label>
          <label className="flex items-center gap-2">
            Leo SPD <input type="number" className="w-24 px-2 py-1 rounded bg-neutral-800 border border-white/10"
            value={leoSpeed} onChange={e=>setLeoSpeed(Number(e.target.value))} disabled={!leoEnabled}/>
          </label>
          <button onClick={simulate} disabled={loading}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50">
            {loading ? "Calculando..." : "Simular"}
          </button>
        </div>

        {error && <div className="text-red-400">Erro: {error}</div>}
      </div>

      {data?.turns?.length ? (
        <div className="glass p-6">
          <h3 className="text-lg font-semibold mb-3">Ordem de Turnos</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left opacity-70">
                <tr>
                  <th className="py-2 pr-4">#</th>
                  <th className="py-2 pr-4">Unit</th>
                  <th className="py-2 pr-4">Team</th>
                  <th className="py-2 pr-4">Eff SPD</th>
                  <th className="py-2 pr-4">ATB Antes</th>
                  <th className="py-2 pr-4">ATB Depois</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {data.turns.map((t: any) => (
                  <tr key={`${t.order}-${t.unitId}`}>
                    <td className="py-2 pr-4">{t.order}</td>
                    <td className="py-2 pr-4">{t.unitName ?? t.unitId}</td>
                    <td className="py-2 pr-4">{t.team ?? "-"}</td>
                    <td className="py-2 pr-4">{Math.round(t.effSpd)}</td>
                    <td className="py-2 pr-4">{Math.round(t.atbBefore)}</td>
                    <td className="py-2 pr-4">{Math.round(t.atbAfter)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="opacity-70 mt-2 text-sm">
            Ticks: {data.ticksProcessed} • Leo: {data.usedLeo ? "sim" : "não"}
          </div>
        </div>
      ) : null}
    </div>
  );
}
