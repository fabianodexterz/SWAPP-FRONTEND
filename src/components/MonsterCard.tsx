import React from 'react';
import type { ReactNode } from 'react';

export type ResultCardStat = {
  label: string;
  value: string | number;
};

export type ResultCardProps = {
  monsterName: string;
  buildLabel?: string;
  slotLabel?: string;
  mainStat?: string;
  score?: number | null;
  stats?: ResultCardStat[];
  footer?: ReactNode;
};

export function ResultCard({
  monsterName,
  buildLabel,
  slotLabel,
  mainStat,
  score,
  stats = [],
  footer,
}: ResultCardProps) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-white/8 bg-slate-950/60 p-4 text-sm text-slate-50 shadow-sm shadow-black/40">
      <header className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          {slotLabel && (
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
              {slotLabel}
            </p>
          )}
          <h3 className="text-base font-semibold text-slate-50">
            {monsterName}
          </h3>
          {buildLabel && (
            <p className="text-xs text-slate-400">{buildLabel}</p>
          )}
        </div>

        {typeof score === 'number' && (
          <div className="rounded-xl bg-emerald-500/10 px-3 py-1 text-right">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Score
            </p>
            <p className="text-sm font-semibold text-emerald-200">
              {score.toFixed(1)}
            </p>
          </div>
        )}
      </header>

      {mainStat && (
        <p className="text-xs font-medium text-amber-200">
          Main stat:{' '}
          <span className="font-semibold text-amber-300">{mainStat}</span>
        </p>
      )}

      {stats.length > 0 && (
        <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-300">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center justify-between">
              <dt className="text-slate-400">{s.label}</dt>
              <dd className="font-medium text-slate-100">{s.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {footer && <div className="pt-2 text-xs text-slate-400">{footer}</div>}
    </article>
  );
}

export default ResultCard;
