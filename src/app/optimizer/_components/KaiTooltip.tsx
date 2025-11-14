import React from "react";
export default function KaiTooltip({ text, children }: { text: string; children: React.ReactNode; }) {
  return (
    <span className="relative inline-flex items-center">
      <span className="group inline-flex">{children}</span>
      <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-2 hidden whitespace-nowrap rounded-md bg-black/90 px-2 py-1 text-xs text-white/90 shadow-xl ring-1 ring-black/40 group-hover:block">
        {text}
      </span>
    </span>
  );
}
