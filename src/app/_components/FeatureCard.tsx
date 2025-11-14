import Link from "next/link";
import type { Route } from "next";

type FeatureCardProps = {
  tag: string;
  title: string;
  desc: string;
  href: Route;
  icon?: "monster" | "rune" | "spark";
};

function Icon({ name }: { name: FeatureCardProps["icon"] }) {
  // SVGs leves para cada card
  if (name === "rune") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-sky-300">
        <path fill="currentColor" d="M12 2l8 5v10l-8 5-8-5V7l8-5zm-1 6H9l-3 3 6 6 3-3-4-4V8z" />
      </svg>
    );
  }
  if (name === "spark") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-emerald-300">
        <path fill="currentColor" d="M13 2l1.5 4.5L19 8l-4.5 1.5L13 14l-1.5-4.5L7 8l4.5-1.5L13 2zM6 16l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
      </svg>
    );
  }
  // monster
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-amber-300">
      <path fill="currentColor" d="M12 2c4.4 0 8 3.6 8 8 0 3.1-1.8 5.8-4.5 7.1L15 22l-3-2-3 2 .5-4.9C5.8 15.8 4 13.1 4 10c0-4.4 3.6-8 8-8zm-4 9h2V9H8v2zm8 0h-2V9h2v2z" />
    </svg>
  );
}

export default function FeatureCard({ tag, title, desc, href, icon = "monster" }: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-[10px] tracking-widest text-white/60">{tag}</span>
        <Icon name={icon} />
      </div>
      <h3 className="text-white font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-white/60">{desc}</p>
      <div className="mt-4">
        <Link
          href={href}
          className="inline-flex items-center rounded-lg border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-white hover:bg-black/30"
        >
          Abrir
        </Link>
      </div>
    </div>
  );
}
