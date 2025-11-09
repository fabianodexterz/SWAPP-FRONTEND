'use client';

import React from 'react';

type Item = {
  label: string;
  value: number;
  color?: string;
};

type Props = {
  /** Pode enviar como "items" (preferido) ou "data" (compat antigo) */
  items?: Item[];
  data?: Item[];
  height?: number;
  showValues?: boolean;
};

export default function MiniBar({ items, data, height = 120, showValues = false }: Props) {
  const series: Item[] = (items ?? data ?? []).filter((d) => d && typeof d.value === 'number');

  if (!series.length) {
    return (
      <div className="text-xs text-gray-400">
        Sem dados para exibir.
      </div>
    );
  }

  const max = Math.max(...series.map((s) => s.value)) || 1;

  return (
    <div className="w-full flex items-end gap-2" style={{ height }}>
      {series.map((s, i) => {
        const h = Math.max(4, Math.round((s.value / max) * (height - 28))); // margem p/ rótulos
        const color = s.color ?? '#f5d27b';

        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-md shadow-sm transition-transform hover:scale-[1.03]"
              style={{ background: color, height: h }}
              title={`${s.label}: ${s.value}`}
            />
            <div className="text-[10px] leading-3 text-gray-300 truncate w-full text-center" title={s.label}>
              {s.label}
            </div>
            {showValues && (
              <div className="text-[10px] leading-3 text-gray-400">{s.value}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
