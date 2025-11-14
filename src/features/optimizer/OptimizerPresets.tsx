// src/features/optimizer/OptimizerPresets.tsx
"use client";

import { useMemo, useState } from "react";
import { PRESETS_BUNDLE } from "@data/presets/presets_swapp"; // import nomeado correto

type Locale = "pt" | "en";
type StatKey =
  | "hp"
  | "atk"
  | "def"
  | "spd"
  | "criRate"
  | "criDmg"
  | "res"
  | "acc";

// Tipo inferido diretamente do bundle de presets
type SwappPreset = (typeof PRESETS_BUNDLE.presets)[number];

interface OptimizerPresetsProps {
  locale?: Locale;
}

export function OptimizerPresets({ locale = "pt" }: OptimizerPresetsProps) {
  const [presetId, setPresetId] = useState<string | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  const presets = PRESETS_BUNDLE.presets;

  const selected = useMemo(
    () => presets.find((p) => p.id === presetId),
    [presetId, presets]
  );

  function handleSelectPreset(preset: SwappPreset) {
    setPresetId(preset.id);

    const msg: string =
      locale === "pt"
        ? `Preset "${preset.name.pt}" carregado. Ajuste os filtros do otimizador conforme desejado.`
        : `Preset "${preset.name.en}" loaded. Tune optimizer filters as needed.`;

    setMessages((prev) => [...prev, msg]);
  }

  const t = (pt: string, en: string) => (locale === "pt" ? pt : en);

  return (
    <section className="space-y-4">
      <header className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-primary-100">
          {t("Presets rápidos para o Otimizador", "Quick presets for Optimizer")}
        </h2>
        <p className="text-sm text-neutral-300 max-w-2xl">
          {t(
            "Escolha um preset abaixo para preencher rapidamente alvos de status e filtros do otimizador. Útil para builds padrão de Arena, RTA e conteúdo PvE.",
            "Choose a preset below to quickly fill status targets and optimizer filters. Useful for default Arena, RTA and PvE builds."
          )}
        </p>
      </header>

      {/* LISTA DE PRESETS */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {presets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => handleSelectPreset(preset)}
            className="group flex flex-col items-start gap-2 rounded-2xl border border-neutral-800/80 bg-gradient-to-br from-neutral-900/80 to-neutral-950/90 px-4 py-3 text-left shadow-card transition hover:border-amber-400/70 hover:shadow-lg"
          >
            <div className="flex w-full items-center justify-between gap-2">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-amber-400/90">
                  {preset.tags?.includes("rta")
                    ? "RTA"
                    : preset.tags?.includes("arena")
                    ? "Arena"
                    : "Preset"}
                </div>
                <div className="text-sm font-semibold text-primary-50">
                  {locale === "pt" ? preset.name.pt : preset.name.en}
                </div>
              </div>

              {preset.roles && preset.roles.length > 0 && (
                <div className="flex flex-wrap justify-end gap-1">
                  {preset.roles.map((role) => (
                    <span
                      key={role}
                      className="rounded-full bg-neutral-800/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-neutral-200"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {preset.description && (
              <p className="text-xs text-neutral-300">
                {locale === "pt"
                  ? preset.description.pt
                  : preset.description.en}
              </p>
            )}

            {/* TAGS PRINCIPAIS */}
            {preset.tags && preset.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {preset.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-neutral-900/80 px-2 py-0.5 text-[10px] font-medium text-amber-300/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* ALVOS DE STATUS (resumo) */}
            {preset.targets && (
              <div className="mt-2 grid grid-cols-3 gap-1 text-[11px] text-neutral-200">
                {Object.entries(preset.targets).map(([stat, value]) => {
                  if (value == null) return null;
                  const labelMap: Record<StatKey, string> = {
                    hp: "HP",
                    atk: "ATK",
                    def: "DEF",
                    spd: "SPD",
                    criRate: "CRI",
                    criDmg: "CDMG",
                    res: "RES",
                    acc: "ACC",
                  };
                  const label =
                    labelMap[stat as StatKey] ?? stat.toUpperCase();

                  return (
                    <div
                      key={stat}
                      className="flex items-center justify-between rounded-md bg-neutral-900/70 px-2 py-1"
                    >
                      <span className="text-[10px] text-neutral-400">
                        {label}
                      </span>
                      <span className="text-[11px] font-semibold text-amber-300">
                        {typeof value === "number" ? value : String(value)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* MENSAGENS / LOG SIMPLES */}
      {messages.length > 0 && (
        <div className="mt-3 space-y-1 rounded-2xl border border-neutral-800/80 bg-neutral-950/90 p-3 text-xs text-neutral-300">
          <div className="font-semibold text-amber-300">
            {t("Log de presets", "Preset log")}
          </div>
          <ul className="space-y-0.5">
            {messages.map((m, idx) => (
              <li key={idx} className="text-[11px] text-neutral-200">
                • {m}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
