
import React from 'react';

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-zinc-800/80 px-2 py-1 text-xs text-zinc-200">
      {children}
    </span>
  );
}

export function Dot({ color }: { color: string }) {
  return <span className={`mr-1 inline-block h-2 w-2 rounded-full ${color}`} />;
}
