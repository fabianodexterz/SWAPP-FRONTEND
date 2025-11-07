"use client";

import OptimizerPresets from "@/features/optimizer/OptimizerPresets";

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold text-center mb-4">Otimizador</h1>
      <OptimizerPresets initialLocale="pt" />
    </div>
  );
}
