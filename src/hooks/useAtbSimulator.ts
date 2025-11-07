"use client";
import { useCallback, useState } from "react";

type Unit = {
  id: string;
  name?: string;
  baseSpd: number;
  speedPct?: number;
  flatSpd?: number;
  startAtb?: number;
  team?: "ally" | "enemy";
  priority?: number;
};

type Options = {
  bonuses?: {
    leaderPct?: number;
    towerPct?: number;
    setSwift?: boolean;
    otherPct?: number;
    flat?: number;
  };
  leo?: { enabled: boolean; leoSpeed: number };
  turnCap?: number;
  epsilon?: number;
  logSteps?: boolean;
};

export function useAtbSimulator(apiPath = "/api/simulate-atb") {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const run = useCallback(
    async (units: Unit[], options?: Options) => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        const res = await fetch(apiPath, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ units, options }),
        });

        // 🔥 Se o backend retornar HTML, força erro legível
        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          const text = await res.text();
          throw new Error(
            `Resposta inválida do servidor (${res.status}): ${text.slice(0, 100)}`
          );
        }

        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Falha na simulação");

        setData(json);
        return json;
      } catch (e: any) {
        const msg = e?.message ?? "Erro desconhecido";
        setError(msg);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [apiPath]
  );

  return { run, loading, error, data };
}
