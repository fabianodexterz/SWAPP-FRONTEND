import React from "react";
type Props = { set: string; className?: string };
const map: Record<string, string> = {
  Violent: "/icons/runes/violent.svg", Will: "/icons/runes/will.svg",
  Swift: "/icons/runes/swift.svg", Blade: "/icons/runes/blade.svg",
  Rage: "/icons/runes/rage.svg", Despair: "/icons/runes/despair.svg",
  Guard: "/icons/runes/guard.svg", Endure: "/icons/runes/endure.svg",
  Energy: "/icons/runes/energy.svg", Fatal: "/icons/runes/fatal.svg",
  Revenge: "/icons/runes/revenge.svg", Nemesis: "/icons/runes/nemesis.svg",
  Shield: "/icons/runes/shield.svg", Vampire: "/icons/runes/vampire.svg",
  Destroy: "/icons/runes/destroy.svg", Tolerance: "/icons/runes/tolerance.svg",
  Focus: "/icons/runes/focus.svg", Determination: "/icons/runes/determination.svg",
  Seal: "/icons/runes/seal.svg",
};
export default function RuneIcon({ set, className }: Props) {
  const src = map[set] || null;
  if (!src) return <span className={"pill " + (className ?? "")}>{set}</span>;
  return <img alt={set} title={set} src={src} className={className || "w-5 h-5"} />;
}
