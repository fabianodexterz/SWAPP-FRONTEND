"use client";
import React from "react";

type Props = { value?: number; size?: number };

export default function MiniDonut({ value = 65, size = 80 }: Props) {
  const pct = Math.max(0, Math.min(100, value));
  const radius = 32;
  const stroke = 8;
  const circ = 2 * Math.PI * radius;
  const dash = (pct / 100) * circ;

  return (
    <svg width={size} height={size} viewBox="0 0 80 80" className="block">
      <circle
        cx="40"
        cy="40"
        r={radius}
        stroke="rgba(255,255,255,0.15)"
        strokeWidth={stroke}
        fill="none"
      />
      <circle
        cx="40"
        cy="40"
        r={radius}
        stroke="#cbb797"
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ - dash}`}
        transform="rotate(-90 40 40)"
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="14"
        fill="#e6dccb"
      >
        {pct}%
      </text>
    </svg>
  );
}
