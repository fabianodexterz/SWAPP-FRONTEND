"use client";

import { useMemo, useState } from "react";
import PRESETS_BUNDLE from "@/data/presets/presets_swapp";

type Locale = "pt" | "en";
type StatKey =
  | "SPD"
  | "HP%"
  | "DEF%"
  | "ATK%"
  | "CR%"
  | "CD%"
  | "RES"
  | "ACC";

type Caps = Record<string, number>;

interface FormState {
  SPD: number | "";
  "HP%": number | "";
  "DEF%": number | "";
  "ATK%": number | "";
  "CR%": number | "";
  "CD%": number | "";
  RES: number | "";
  ACC: number | "";
}

const EMPTY_FORM: FormState = {
  SPD: "",
  "HP%": "",
  "DEF%": "",
  "ATK%": "",
  "CR%": "",
  "CD%": "",
  RES: "",
  ACC: "",
};

function clamp(num: number, min?: number, max?: number) {
  let n = Number.isFinite(num) ? num : 0;
  if (typeof min === "number") n = Math.max(min, n);
  if (typeof max === "number") n = Math.min(max, n);
  return n;
}

export default function OptimizerPresets({
  initialLocale = "pt",
}: {
  initialLocale?: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [presetId, setPresetId] = useState<string>("");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [messages, setMessages] = useState<string[]>([]);

  const presets = PRESETS_BUNDLE.presets;

  const selected = useMemo(
    () => presets.find((p) => p.id === presetId),
    [presets, presetId],
  );

  const requiredMin: Caps | undefined = selected?.required_caps?.[locale];
  const maxCaps: Caps | undefined = selected?.status_maximos_exigidos;

  function applyPresetDefaults() {
    if (!selected) return;
    // Preenche o formulário com os mínimos do preset (quando houver)
    const f: FormState = { ...EMPTY_FORM };
    const keys: StatKey[] = ["SPD", "HP%", "DEF%", "ATK%", "CR%", "CD%", "RES", "ACC"];

    for (const k of keys) {
      const minKey = Object.keys(requiredMin ?? {}).find((rk) =>
        rk.toUpperCase().startsWith(k.toUpperCase()),
      );
      const raw = minKey ? requiredMin?.[minKey] : undefined;
      f[k] = typeof raw === "number" ? (raw as number) : "";
    }
    setForm(f);
    setMessages([]);
  }

  function updateField(key: StatKey, value: string) {
    // normaliza para número ou vazio
    const raw = value.replace(",", ".").trim();
    const num = raw === "" ? "" : Number(raw);

    if (num === "") {
      setForm((prev) => ({ ...prev, [key]: "" }));
      return;
    }
    if (!Number.isFinite(num)) return;

    // aplica clamp de teto, se houver
    const maxFor = maxCaps?.[key] ?? undefined;
    const clamped = clamp(num as number, undefined, maxFor);

    setForm((prev) => ({ ...prev, [key]: clamped }));
  }

  function validateCaps() {
    const errs: string[] = [];
    if (!selected) return setMessages(["Selecione um preset primeiro."]);

    if (requiredMin) {
      for (const [reqKey, reqVal] of Object.entries(requiredMin)) {
        // mapeia nome flexível do required_caps para nossa chave padrão
        const normalized: StatKey | undefined = ([
          "SPD",
          "HP%",
          "DEF%",
          "ATK%",
          "CR%",
          "CD%",
          "RES",
          "ACC",
        ] as StatKey[]).find((k) => reqKey.toUpperCase().startsWith(k));

        if (!normalized) continue;
        const current = form[normalized];
        if (typeof current !== "number") {
          errs.push(
            locale === "pt"
              ? `Preencha ${normalized} (mín: ${reqVal}).`
              : `Fill ${normalized} (min: ${reqVal}).`,
          );
        } else if (current < reqVal) {
          errs.push(
            locale === "pt"
              ? `${normalized} abaixo do mínimo (${current} < ${reqVal}).`
              : `${normalized} below minimum (${current} < ${reqVal}).`,
          );
        }
      }
    }

    // avisa quando estoura teto
    if (maxCaps) {
      for (const [capKey, capMax] of Object.entries(maxCaps)) {
        const k = capKey as StatKey;
        const current = form[k];
        if (typeof current === "number" && current > capMax) {
          errs.push(
            locale === "pt"
              ? `${k} acima do teto (${current} > ${capMax}).`
              : `${k} above cap (${current} > ${capMax}).`,
          );
        }
      }
    }

    setMessages(
      errs.length
        ? errs
        : [
            locale === "pt"
              ? "Tudo certo! Parâmetros dentro dos limites."
              : "All good! Parameters within limits.",
          ],
    );
  }

  const statInputs: { key: StatKey; labelPT: string; labelEN: string; hint?: string }[] =
    [
      { key: "SPD", labelPT: "Velocidade (SPD)", labelEN: "Speed (SPD)" },
      { key: "HP%", labelPT: "Vida % (HP%)", labelEN: "HP % (HP%)" },
      { key: "DEF%", labelPT: "Defesa % (DEF%)", labelEN: "Defense % (DEF%)" },
      { key: "ATK%", labelPT: "Ataque % (ATK%)", labelEN: "Attack % (ATK%)" },
      { key: "CR%", labelPT: "Taxa Crítica % (CR%)", labelEN: "Crit Rate % (CR%)" },
      { key: "CD%", labelPT: "Dano Crítico % (CD%)", labelEN: "Crit Damage % (CD%)" },
      { key: "RES", labelPT: "Resistência % (RES)", labelEN: "Resistance % (RES)" },
      { key: "ACC", labelPT: "Precisão % (ACC)", labelEN: "Accuracy % (ACC)" },
    ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            {locale === "pt" ? "Otimizado • Presets" : "Optimizer • Presets"}
          </h2>
          <p className="text-sm opacity-80">
            {locale === "pt"
              ? "Selecione um preset, ajuste estatísticas e valide contra mínimos e tetos."
              : "Select a preset, tune stats, and validate against minimums and caps."}
          </p>
        </div>

        {/* Locale + Preset */}
        <div className="flex flex-col md:flex-row gap-2">
          <select
            className="rounded-xl border bg-transparent px-3 py-2"
            value={locale}
            onChange={(e) => setLocale(e.target.value as Locale)}
            aria-label="Locale"
          >
            <option value="pt">PT-BR</option>
            <option value="en">EN</option>
          </select>

          <select
            className="rounded-xl border bg-transparent px-3 py-2 min-w-64"
            value={presetId}
            onChange={(e) => {
              setPresetId(e.target.value);
              setMessages([]);
            }}
            aria-label="Preset"
          >
            <option value="">
              {locale === "pt" ? "— Selecione um preset —" : "— Select a preset —"}
            </option>
            {presets.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name[locale]} — {p.role.join("/")}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={applyPresetDefaults}
            disabled={!selected}
            className="rounded-xl border px-3 py-2 disabled:opacity-50"
            title={
              locale === "pt"
                ? "Preencher com mínimos do preset"
                : "Fill with preset minimums"
            }
          >
            {locale === "pt" ? "Aplicar mínimos" : "Apply minimums"}
          </button>
        </div>
      </div>

      {/* Descrição + Runes */}
      {selected && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border p-4">
            <h3 className="font-semibold">{selected.name[locale]}</h3>
            <p className="text-sm opacity-80">{selected.description[locale]}</p>
            <div className="mt-3 text-sm">
              <div className="opacity-80">
                <strong>{locale === "pt" ? "Modos:" : "Modes:"}</strong>{" "}
                {selected.game_modes.join(", ")}
              </div>
              <div className="opacity-80">
                <strong>Runes:</strong>{" "}
                {selected.runes.primary_sets.join("/")} +{" "}
                {selected.runes.secondary_sets.join("/")} | 2/4/6:{" "}
                {selected.runes.slot246.join(", ")}
              </div>
              <div className="opacity-80">
                <strong>{locale === "pt" ? "Artefatos:" : "Artifacts:"}</strong>{" "}
                {selected.artifacts.type.join("/")} •{" "}
                {selected.artifacts.focus.join(", ")}
              </div>
              <div className="opacity-80">
                <strong>{locale === "pt" ? "Prioridade:" : "Priority:"}</strong>{" "}
                {selected.stat_priority.join(" > ")}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border p-4">
            <h4 className="font-semibold mb-2">
              {locale === "pt" ? "Limites do Preset" : "Preset Limits"}
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {(["SPD", "HP%", "DEF%", "ATK%", "CR%", "CD%", "RES", "ACC"] as StatKey[]).map(
                (k) => (
                  <div key={k} className="flex items-center justify-between">
                    <span className="opacity-80">{k}</span>
                    <span className="text-right">
                      {requiredMin && Object.entries(requiredMin).find(([rk]) =>
                        rk.toUpperCase().startsWith(k),
                      )
                        ? `min ${
                            Object.entries(requiredMin).find(([rk]) =>
                              rk.toUpperCase().startsWith(k),
                            )![1]
                          }`
                        : "—"}
                      {"  "}
                      {maxCaps?.[k] !== undefined ? `| cap ${maxCaps[k]}` : ""}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      )}

      {/* Formulário de stats */}
      <div className="rounded-2xl border p-4">
        <h4 className="font-semibold mb-4">
          {locale === "pt" ? "Atributos do Monstro" : "Monster Attributes"}
        </h4>

        <div className="grid gap-3 md:grid-cols-4">
          {statInputs.map(({ key, labelPT, labelEN }) => (
            <label key={key} className="flex flex-col gap-1">
              <span className="text-sm">{locale === "pt" ? labelPT : labelEN}</span>
              <input
                inputMode="decimal"
                className="rounded-xl border bg-transparent px-3 py-2"
                placeholder={
                  maxCaps?.[key] !== undefined
                    ? `${locale === "pt" ? "teto" : "cap"} ${maxCaps[key]}`
                    : ""
                }
                value={form[key]}
                onChange={(e) => updateField(key, e.target.value)}
              />
            </label>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={validateCaps}
            className="rounded-xl border px-3 py-2"
          >
            {locale === "pt" ? "Validar" : "Validate"}
          </button>
          <button
            type="button"
            onClick={() => {
              setForm(EMPTY_FORM);
              setMessages([]);
            }}
            className="rounded-xl border px-3 py-2"
          >
            {locale === "pt" ? "Limpar" : "Clear"}
          </button>
        </div>

        {!!messages.length && (
          <ul className="mt-3 space-y-1 text-sm">
            {messages.map((m, i) => (
              <li
                key={i}
                className={
                  m.toLowerCase().includes("tudo certo") ||
                  m.toLowerCase().includes("all good")
                    ? "text-emerald-600"
                    : "text-red-600"
                }
              >
                • {m}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
