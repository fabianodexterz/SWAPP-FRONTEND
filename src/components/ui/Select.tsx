'use client';
import { SelectHTMLAttributes } from 'react';
import clsx from 'clsx';

type Props = SelectHTMLAttributes<HTMLSelectElement> & { label?: string };

export default function Select({ className, label, ...props }: Props) {
  return (
    <label className="inline-flex flex-col gap-1">
      {label && <span className="text-xs text-mute">{label}</span>}
      <select {...props}
        className={clsx(
          'h-10 rounded-xl2 border border-white/10 bg-card/70 text-ink/90 px-3',
          'hover:border-brand-500/40 focus:border-brand-400/60 focus:shadow-glow',
          'outline-none transition-all',
          className
        )}
      />
    </label>
  );
}
