"use client";

import { useState } from "react";
import { useAtbSimulator } from "../hooks/useAtbSimulator";

type UnitForm = {
  id: string;
  name: string;
  baseSpd: number;
  speedPct: number;
  team: "ally" | "enemy";
};

export default function AtbSimulatorPanel() {
  const [units, setUnits] = useState<UnitForm[]>([
    { id: "1", name: "Verdehile", baseSpd: 100, speedPct: 150, team: "ally" },
    { id: "2", name: "Bernard", baseSpd: 111, speedPct: 120, team: "ally" },
    { id: "3", name: "Enemy", baseSpd: 100, speedPct: 100, team: "enemy" },
  ]);

  const { run, data, loading, error } = useAtbSimulator("/api/simulate-atb");

  async function handleSimulate() {
    await run(
      units.map((u) => ({
        id: u.id,
        name: u.name,
        baseSpd: u.baseSpd,
        speedPct: u.speedPct,
        team: u.team,
      })),
      { turnCap: 10 }
    );
  }

  return (
    <div className="glass p-4 rounded-2xl space-y-4">
      <h2 className="text-xl font-semibold">Simulador de ATB</h2>

      <div className="space-y-2">
        {units.map((u, i) => (
          <div
            key={u.id}
            className="grid grid-cols-5 gap-2 items-center bg-neutral-800/50 p-2 rounded-lg"
          >
            <input
              className="col-span-2 bg-neutral-900/60 rounded px-2 py-1 text-sm"
              value={u.name}
              onChange={(e) =>
                setUnits((old) =>
                  old.map((x, idx) =>
                    idx === i ? { ...x, name: e.target.value } : x
                  )
                )
              }
            />
            <input
              type="number"
              className="bg-neutral-900/60 rounded px-2 py-1 text-sm"
              value={u.baseSpd}
              onChange={(e) =>
                setUnits((old) =>
                  old.map((x, idx) =>
                    idx === i ? { ...x, baseSpd: Number(e.target.value) } : x
                  )
                )
              }
            />
            <input
              type="number"
              className="bg-neutral-900/60 rounded px-2 py-1 text-sm"
              value={u.speedPct}
              onChange={(e) =>
                setUnits((old) =>
                  old.map((x, idx) =>
                    idx === i ? { ...x, speedPct: Number(e.target.value) } : x
                  )
                )
              }
            />
            <select
              className="bg-neutral-900/60 rounded px-2 py-1 text-sm"
              value={u.team}
              onChange={(e) =>
                setUnits((old) =>
                  old.map((x, idx) =>
                    idx === i ? { ...x, team: e.target.value as any } : x
                  )
                )
              }
            >
              <option value="ally">Aliado</option>
              <option value="enemy">Inimigo</option>
            </select>
          </div>
        ))}
      </div>

      <button
        disabled={loading}
        onClick={handleSimulate}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium disabled:opacity-50"
      >
        {loading ? "Simulando..." : "Rodar Simulação"}
      </button>

      {error && <p className="text-red-400 text-sm">{error}</p>}
      {data && (
        <div className="text-sm bg-neutral-900/50 p-3 rounded-lg overflow-auto max-h-48">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
