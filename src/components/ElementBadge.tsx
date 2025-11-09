// src/components/ElementBadge.tsx
import React from 'react';
import { cn } from './_utils';

type ElementKey = 'Fire' | 'Water' | 'Wind' | 'Light' | 'Dark';

type Props = {
  element: ElementKey;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode; // opcional: caso queira renderizar texto/ícone custom
};

// Paleta pensada para tema dark (funciona no light também)
const ELEMENT_STYLE: Record<ElementKey, string> = {
  Fire:  'bg-[#2b0f0f] border-red-500/40 text-red-300',
  Water: 'bg-[#0f162b] border-blue-500/40 text-blue-300',
  Wind:  'bg-[#0f2b1a] border-emerald-500/40 text-emerald-300',
  Light: 'bg-[#2b2b1a] border-yellow-400/40 text-yellow-300',
  Dark:  'bg-[#1a1a2b] border-purple-400/40 text-purple-300',
};

const SIZE_STYLE: Record<NonNullable<Props['size']>, string> = {
  sm: 'text-[10px] px-2 py-0.5',
  md: 'text-xs px-2.5 py-1',
  lg: 'text-sm px-3 py-1.5',
};

export default function ElementBadge({
  element,
  size = 'md',
  className,
  children,
}: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border',
        'shadow-sm/20',
        ELEMENT_STYLE[element],
        SIZE_STYLE[size],
        className
      )}
      title={element}
      aria-label={`Elemento: ${element}`}
    >
      {/* se quiser, troque por um ícone futuramente */}
      <span
        aria-hidden
        className={cn(
          'inline-block h-2.5 w-2.5 rounded-full',
          // pontinho com matiz por elemento
          element === 'Fire'  && 'bg-red-400',
          element === 'Water' && 'bg-blue-400',
          element === 'Wind'  && 'bg-emerald-400',
          element === 'Light' && 'bg-yellow-300',
          element === 'Dark'  && 'bg-purple-400'
        )}
      />
      {children ?? element}
    </span>
  );
}
