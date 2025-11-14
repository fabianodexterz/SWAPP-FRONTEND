// src/app/presets/_components/PresetsClient.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { getPresets, type Preset as ApiPreset } from "@/lib/api";
import { useLang } from "@/store/lang";

export type UIPreset = {
  id: string;
  name: string;
  tags: string[];
  author?: string;
  createdAt?: string;
};

type LoadState = "idle" | "loading" | "done" | "error";

export default function PresetsClient() {
  const { t, locale } = useLang(); // `locale` fica disponÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­vel para uso futuro

  const [status, setStatus] = useState<LoadState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<UIPreset[]>([]);

  useEffect(() => {
    let alive = true;

    async function load() {
      setStatus("loading");
      setError(null);

      try {
        // getPresets() NÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢O aceita argumentos
        const data = await getPresets();

        const list: UIPreset[] = (Array.isArray(data) ? data : []).map((p: ApiPreset) => ({
          id: String((p as any).id ?? (p as any)._id ?? crypto.randomUUID()),
          name: String((p as any).name ?? (p as any).title ?? "Preset"),
          tags: Array.isArray((p as any).tags) ? (p as any).tags : [],
          author: (p as any).author ?? (p as any).owner ?? undefined,
          createdAt: (p as any).createdAt ?? undefined,
        }));

        if (!alive) return;
        setItems(list);
        setStatus("done");
      } catch (e: any) {
        if (!alive) return;
        setError(e?.message || "Falha ao carregar presets.");
        setStatus("error");
      }
    }

    load();
    return () => {
      alive = false;
    };
    // se quiser recarregar ao trocar idioma, mantenha `locale` aqui; nÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o quebra mesmo sem usar no fetch
  }, [locale]);

  const header = useMemo(
    () => ({
      title: t?.("presets.title") ?? "Presets",
      empty: t?.("presets.empty") ?? "Nenhum preset encontrado.",
      retry: t?.("common.retry") ?? "Tentar novamente",
    }),
    [t]
  );

  if (status === "loading" || status === "idle") {
    return (
      <div className="flex items-center justify-center h-28">
        <span className="loading loading-spinner loading-md" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="alert alert-error">
        <span>{error}</span>
        <button
          className="btn btn-sm ml-auto"
          onClick={() => setStatus("idle")}
        >
          {header.retry}
        </button>
      </div>
    );
    }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">{header.title}</h2>

      {items.length === 0 ? (
        <div className="text-sm opacity-70">{header.empty}</div>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <li key={p.id} className="card bg-base-200 shadow-card rounded-2xl">
              <div className="card-body">
                <div className="font-medium">{p.name}</div>
                {p.tags?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span key={tag} className="badge badge-outline">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {(p.author || p.createdAt) && (
                  <div className="mt-3 text-xs opacity-70">
                    {p.author && <span>by {p.author}</span>}
                    {p.author && p.createdAt && <span> ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â· </span>}
                    {p.createdAt && <span>{new Date(p.createdAt).toLocaleDateString()}</span>}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
