"use client";
import React from "react";

type Props = { value?: number; label?: string };

export default function MiniBar({ value = 50, label = "Score" }: Props) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="w-full rounded-md border border-white/10 p-3 text-sm">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[#cbb797]">{label}</span>
        <span className="text-[#e6dccb]/80">{pct}%</span>
      </div>
      <div className="h-2 w-full rounded bg-white/10">
        <div
          className="h-2 rounded bg-[#cbb797]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
