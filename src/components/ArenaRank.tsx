
"use client";
import Image from "next/image";
export type ArenaRankKey =
  | "BEGINNER"
  | "CHALLENGER1" | "CHALLENGER2" | "CHALLENGER3"
  | "FIGHTER1" | "FIGHTER2" | "FIGHTER3"
  | "CONQUEROR1" | "CONQUEROR2" | "CONQUEROR3"
  | "GUARDIAN1" | "GUARDIAN2" | "GUARDIAN3"
  | "LEGEND";
const MAP: Record<ArenaRankKey, { src: string; label: string }> = {
  BEGINNER: { src: "/icons/arena/Arena_ranking_beginner.webp", label: "Beginner" },
  CHALLENGER1: { src: "/icons/arena/Arena_ranking_challenger_1.webp", label: "Challenger ★" },
  CHALLENGER2: { src: "/icons/arena/Arena_ranking_challenger_2.webp", label: "Challenger ★★" },
  CHALLENGER3: { src: "/icons/arena/Arena_ranking_challenger_3.webp", label: "Challenger ★★★" },
  FIGHTER1: { src: "/icons/arena/Arena_ranking_fighter_1.webp", label: "Fighter ★" },
  FIGHTER2: { src: "/icons/arena/Arena_ranking_fighter_2.webp", label: "Fighter ★★" },
  FIGHTER3: { src: "/icons/arena/Arena_ranking_fighter_3.webp", label: "Fighter ★★★" },
  CONQUEROR1: { src: "/icons/arena/Arena_ranking_conqueror_1.webp", label: "Conqueror ★" },
  CONQUEROR2: { src: "/icons/arena/Arena_ranking_conqueror_2.webp", label: "Conqueror ★★" },
  CONQUEROR3: { src: "/icons/arena/Arena_ranking_conqueror_3.webp", label: "Conqueror ★★★" },
  GUARDIAN1: { src: "/icons/arena/Arena_ranking_guardian_1.webp", label: "Guardian ★" },
  GUARDIAN2: { src: "/icons/arena/Arena_ranking_guardian_2.webp", label: "Guardian ★★" },
  GUARDIAN3: { src: "/icons/arena/Arena_ranking_guardian_3.webp", label: "Guardian ★★★" },
  LEGEND: { src: "/icons/arena/Arena_ranking_legend.webp", label: "Legend" },
};
function normalize(input: string) {
  const s = input.trim().toUpperCase().replace(/\s+/g, "");
  if (s === "LEGEND") return "LEGEND";
  if (s === "BEGINNER") return "BEGINNER";
  const map: Record<string, any> = {
    "CHALLENGER1":"CHALLENGER1","CHALLENGER2":"CHALLENGER2","CHALLENGER3":"CHALLENGER3",
    "FIGHTER1":"FIGHTER1","FIGHTER2":"FIGHTER2","FIGHTER3":"FIGHTER3",
    "CONQUEROR1":"CONQUEROR1","CONQUEROR2":"CONQUEROR2","CONQUEROR3":"CONQUEROR3",
    "GUARDIAN1":"GUARDIAN1","GUARDIAN2":"GUARDIAN2","GUARDIAN3":"GUARDIAN3",
    "CONQUISTADOR1":"CONQUEROR1","CONQUISTADOR2":"CONQUEROR2","CONQUISTADOR3":"CONQUEROR3",
    "GUARDIÃO1":"GUARDIAN1","GUARDIAO1":"GUARDIAN1","GUARDIÃO2":"GUARDIAN2","GUARDIAO2":"GUARDIAN2","GUARDIÃO3":"GUARDIAN3","GUARDIAO3":"GUARDIAN3"
  };
  return map[s] ?? null;
}
export function ArenaRank({ rank, size=28, showLabel=false, className="" }:
  { rank: string; size?: number; showLabel?: boolean; className?: string; }) {
  const key = normalize(rank);
  if (!key) return null;
  const it = MAP[key as ArenaRankKey];
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <Image src={it.src} alt={it.label} width={size} height={size} />
      {showLabel && <span className="text-sm">{it.label}</span>}
    </span>
  );
}
