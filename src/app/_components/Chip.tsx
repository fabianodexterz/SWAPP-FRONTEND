'use client';
import React from 'react';
import { bronze } from './theme';

type Props = {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
};
export default function Chip({ children, selected, onClick, className='' }: Props){
  const base = "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium shadow-sm transition-transform hover:translate-y-[-1px]";
  const tone = selected
    ? "bg-[#2a1b12] text-[#ffcf91] ring-1 ring-[#b3762b]/30"
    : "bg-[#0f0a06] text-[#e8d5c0] ring-1 ring-[#66401a]/40";
  return <button type="button" onClick={onClick} className={`${base} ${tone} ${className}`}>{children}</button>;
}
