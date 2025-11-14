// src/components/optimizer/ResultCard.tsx
"use client";

import * as React from "react";

/**
 * Props do card de resultado do otimizador.
 * Aqui não travamos no tipo da runa para não brigar com AnnotatedRune.
 */
export interface ResultCardProps {
  /** ID único da combinação (usado pelo grid / debug) */
  comboId?: string;
  /** Alvo / role principal (ex: "Arena Nuker", "Bruiser") */
  target?: string;
  /** Score calculado para a combinação */
  score?: number;
  /** Runas da combinação – deixamos como any[] para aceitar AnnotatedRune[] sem erro */
  runes: any[];
}

export function ResultCard(props: ResultCardProps) {
  const { comboId, target, score, runes } = props;

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-white/5 bg-white/5 p-4 shadow-sm backdrop-blur">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="space-y-1">
          {target && (
            <div className="text-xs font-semibold uppercase text-amber-300">
              {target}
            </div>
          )}
          {comboId && (
            <div className="text-xs text-white/60">
              ID: <span className="font-mono">{comboId}</span>
            </div>
          )}
        </div>

        {typeof score === "number" && (
          <div className="rounded-xl bg-amber-400/10 px-3 py-1 text-right">
            <div className="text-[10px] uppercase tracking-wide text-amber-200/80">
              Score
            </div>
            <div className="text-sm font-semibold text-amber-300">
              {score.toFixed(1)}
            </div>
          </div>
        )}
      </div>

      {/* Lista de runas */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {runes.map((rune, index) => {
          // Tentamos mapear campos comuns de forma defensiva
          const slot =
            rune.slot ??
            rune.slotNo ??
            rune.pos ??
            rune.position ??
            `#${index + 1}`;

          const setName =
            rune.set ??
            rune.setId ??
            rune.set_name ??
            rune.setName ??
            "";

          // main pode vir como string ou objeto
          let mainStatLabel: string | undefined;
          let mainStatValue: string | number | undefined;

          if (typeof rune.main === "string") {
            mainStatLabel = rune.main;
            mainStatValue =
              rune.mainValue ??
              rune.value ??
              rune.base ??
              rune.effective ??
              "";
          } else if (rune.main && typeof rune.main === "object") {
            mainStatLabel = rune.main.stat ?? rune.main.label;
            mainStatValue =
              rune.main.value ??
              rune.main.amount ??
              rune.main.val ??
              rune.mainValue ??
              "";
          }

          const subsArray: any[] =
            rune.subs ??
            rune.substats ??
            rune.subStats ??
            rune.subsStats ??
            [];

          return (
            <div
              key={`${rune.id ?? comboId ?? index}-${slot}-${setName}`}
              className="rounded-xl bg-black/30 px-3 py-2"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-white/90">
                  Slot {slot}
                </span>
                {setName && (
                  <span className="text-[11px] uppercase text-white/60">
                    {setName}
                  </span>
                )}
              </div>

              <div className="mt-1 text-[11px] text-white/70">
                {/* Main stat */}
                {mainStatLabel && (
                  <div>
                    <span className="font-medium">{mainStatLabel}</span>{" "}
                    <span className="opacity-80">
                      {mainStatValue ?? ""}
                    </span>
                  </div>
                )}

                {/* Substats (se existirem) */}
                {Array.isArray(subsArray) &&
                  subsArray.slice(0, 3).map((sub, idx) => {
                    const label = sub.stat ?? sub.label ?? sub.name;
                    const value =
                      sub.value ??
                      sub.amount ??
                      sub.val ??
                      sub.base ??
                      "";

                    if (!label && !value) return null;

                    return (
                      <div key={idx} className="opacity-80">
                        {label}: {value}
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ResultCard;
