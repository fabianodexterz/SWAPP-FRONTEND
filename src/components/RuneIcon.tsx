
"use client";
import Image from "next/image";
type RuneKey =
  | "ENERGY" | "FATAL" | "BLADE" | "SWIFT" | "FOCUS" | "GUARD" | "ENDURE" | "SHIELD"
  | "REVENGE" | "VAMPIRE" | "DESTROY" | "DESPAIR" | "WILL"
  | "RAGE" | "VIOLENT" | "NEMESIS"
  | "FIGHT" | "DETERMINATION" | "ENHANCE";
const MAP: Record<RuneKey, { src: string; label: string }> = {
  ENERGY: { src: "/icons/runes/Energy_Rune_Icon.webp", label: "Energy" },
  FATAL: { src: "/icons/runes/Fatal_Rune_Icon.webp", label: "Fatal" },
  BLADE: { src: "/icons/runes/Blade_Rune_Icon.webp", label: "Blade" },
  SWIFT: { src: "/icons/runes/Swift_Rune_Icon.webp", label: "Swift" },
  FOCUS: { src: "/icons/runes/Focus_Rune_Icon.webp", label: "Focus" },
  GUARD: { src: "/icons/runes/Guard_Rune_Icon.webp", label: "Guard" },
  ENDURE: { src: "/icons/runes/Endure_Rune_Icon.webp", label: "Endure" },
  SHIELD: { src: "/icons/runes/Shield_Rune_Icon.webp", label: "Shield" },
  REVENGE: { src: "/icons/runes/Revenge_Rune_Icon.webp", label: "Revenge" },
  VAMPIRE: { src: "/icons/runes/Vampire_Rune_Icon.webp", label: "Vampire" },
  DESTROY: { src: "/icons/runes/Destroy_Rune_Icon.webp", label: "Destroy" },
  DESPAIR: { src: "/icons/runes/Despair_Rune_Icon.webp", label: "Despair" },
  WILL: { src: "/icons/runes/Will_Rune_Icon.webp", label: "Will" },
  RAGE: { src: "/icons/runes/Rage_Rune_Icon.webp", label: "Rage" },
  VIOLENT: { src: "/icons/runes/Violent_Rune_Icon.webp", label: "Violent" },
  NEMESIS: { src: "/icons/runes/Nemesis_Rune_Icon.webp", label: "Nemesis" },
  FIGHT: { src: "/icons/runes/Fight_Rune_Icon.webp", label: "Fight" },
  DETERMINATION: { src: "/icons/runes/Determination_Rune_Icon.webp", label: "Determination" },
  ENHANCE: { src: "/icons/runes/Enhance_Rune_Icon.webp", label: "Enhance" },
};
function normalizeRune(input: string): RuneKey | null {
  const s = input.trim().toUpperCase().replace("Ã", "A").replace("Ç","C").replace("Á","A").replace("É","E").replace("Í","I").replace("Ó","O").replace("Ú","U");
  const map: Record<string, RuneKey> = {
    "ENERGY": "ENERGY", "ENERGIA":"ENERGY",
    "FATAL":"FATAL",
    "BLADE":"BLADE","LAMINA":"BLADE","LÂMINA":"BLADE",
    "SWIFT":"SWIFT","RAPIDO":"SWIFT","RÁPIDO":"SWIFT",
    "FOCUS":"FOCUS","FOCO":"FOCUS",
    "GUARD":"GUARD","GUARDA":"GUARD",
    "ENDURE":"ENDURE","RESISTENCIA":"ENDURE","RESISTÊNCIA":"ENDURE",
    "SHIELD":"SHIELD","ESCUDO":"SHIELD",
    "REVENGE":"REVENGE","VINGANCA":"REVENGE","VINGANÇA":"REVENGE",
    "VAMPIRE":"VAMPIRE","VAMPIRO":"VAMPIRE",
    "DESTROY":"DESTROY","DESTRUIR":"DESTROY","DESTRUIÇÃO":"DESTROY","DESTRUICAO":"DESTROY",
    "DESPAIR":"DESPAIR","DESESPERO":"DESPAIR",
    "WILL":"WILL","IMUNIDADE":"WILL","IMUNITY":"WILL",
    "RAGE":"RAGE","FURIA":"RAGE","FÚRIA":"RAGE",
    "VIOLENT":"VIOLENT","VIOLENTO":"VIOLENT",
    "NEMESIS":"NEMESIS","NEMESE":"NEMESIS","NÊMESE":"NEMESIS",
    "FIGHT":"FIGHT","LUTA":"FIGHT",
    "DETERMINATION":"DETERMINATION","DETERMINACAO":"DETERMINATION","DETERMINAÇÃO":"DETERMINATION",
    "ENHANCE":"ENHANCE","APRIMORAMENTO":"ENHANCE"
  };
  return map[s] ?? null;
}
export function RuneIcon({ set, size=26, showLabel=false, className="" }:
  { set: string; size?: number; showLabel?: boolean; className?: string }) {
  const key = normalizeRune(set);
  if (!key) return null;
  const it = MAP[key];
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <Image src={it.src} alt={it.label} width={size} height={size} />
      {showLabel && <span className="text-xs">{it.label}</span>}
    </span>
  );
}
