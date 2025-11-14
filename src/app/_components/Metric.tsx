"use client";

import { motion } from "framer-motion";

type MetricProps = {
  label: string;
  value: string | number;
  hint?: string;
};

export default function Metric({ label, value, hint }: MetricProps) {
  return (
    <motion.div
      className="rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      <div className="px-6 py-4">
        <div className="text-amber-300 font-semibold text-lg leading-none">{value}</div>
        <div className="text-xs text-white/60 mt-1">{label}</div>
        {hint ? <div className="text-[10px] text-white/40 mt-0.5">{hint}</div> : null}
      </div>
    </motion.div>
  );
}
