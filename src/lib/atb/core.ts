export type AtbInput = { speedA: number; speedB: number; ticks?: number };
export type AtbResult = { winner: "A" | "B" | "empate"; rounds: number };

/** Stub simples para build: decide pelo maior speed. */
export function simulateATB({ speedA, speedB, ticks = 1 }: AtbInput): AtbResult {
  if (speedA === speedB) return { winner: "empate", rounds: ticks };
  return { winner: speedA > speedB ? "A" : "B", rounds: ticks };
}
