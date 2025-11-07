'use client';

import React from 'react';
import { cn } from './_utils';

const ELEMENT_STYLE: Record<string, string> = {
  Fire:   'bg-[#2b0f0f] border border-red-500/40 text-red-300',
  Water:  'bg-[#0e1b2b] border border-sky-500/40 text-sky-300',
  Wind:   'bg-[#0f2b1a] border border-emerald-500/40 text-emerald-300',
  Light:  'bg-[#2b2b0f] border border-amber-400/40 text-amber-200',
  Dark:   'bg-[#1e0f2b] border border-fuchsia-500/40 text-fuchsia-300',
};

const ELEMENT_EMOJI: Record<string, string> = {
  Fire: '🔥', Water: '💧', Wind: '🌿', Light: '🌕', Dark: '🌫️',
};

export function ElementBadge({ element }: { element: string }) {
  const style = ELEMENT_STYLE[element] ?? 'bg-zinc-800/60 border border-zinc-700 text-zinc-200';
  const emoji = ELEMENT_EMOJI[element] ?? '✨';
  return (
    <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center gap-1', style)}>
      <span>{emoji}</span>{element}
    </span>
  );
}
