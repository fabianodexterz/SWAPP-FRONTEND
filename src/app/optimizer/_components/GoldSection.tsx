import React from "react";
export default function GoldSection({ title, children }: { title: string; children: React.ReactNode; }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[color:var(--swapp-panel)] p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white/80"><span className="swapp-text-gold">{title}</span></h3>
        <div className="w-14 h-1 rounded-full" style={{background: 'linear-gradient(90deg, rgba(203,183,151,.6), rgba(203,183,151,0))'}} />
      </div>
      <div>{children}</div>
    </section>
  );
}
