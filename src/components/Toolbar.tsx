"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export type Query = {
  q?: string;
  element?: string;
  stars?: number;
  page?: number;
};

// --- Função segura para lidar com SearchParams ---
function useSearchParamsSafe(): URLSearchParams {
  if (typeof window === "undefined") return new URLSearchParams("");
  try {
    return new URLSearchParams(window.location.search);
  } catch {
    return new URLSearchParams("");
  }
}

export default function Toolbar() {
  const router = useRouter();
  const sp = useSearchParamsSafe();

  const q = useMemo<Query>(
    () => ({
      q: sp.get("q") ?? undefined,
      element: sp.get("element") ?? undefined,
      stars: sp.get("stars") ? Number(sp.get("stars")) : undefined,
      page: sp.get("page") ? Number(sp.get("page")) : 1,
    }),
    [sp.toString()]
  );

  function update(next: Partial<Query>) {
    const p = new URLSearchParams(sp.toString());
    if (next.q !== undefined) next.q ? p.set("q", next.q) : p.delete("q");
    if (next.element !== undefined)
      next.element ? p.set("element", next.element) : p.delete("element");
    if (next.stars !== undefined)
      Number.isFinite(next.stars)
        ? p.set("stars", String(next.stars))
        : p.delete("stars");
    if (next.page !== undefined)
      next.page ? p.set("page", String(next.page)) : p.delete("page");

    router.push(`/?${p.toString()}`);
  }

  return (
    <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto_auto]">
      <input
        className="h-10 rounded-md border border-slate-300 bg-white px-3 outline-none focus:ring-2 focus:ring-blue-200"
        placeholder="Buscar por nome…"
        defaultValue={q.q ?? ""}
        onKeyDown={(e) => {
          if (e.key === "Enter")
            update({ q: (e.target as HTMLInputElement).value, page: 1 });
        }}
      />
      <select
        className="h-10 rounded-md border border-slate-300 bg-white px-3"
        defaultValue={q.element ?? ""}
        onChange={(e) =>
          update({ element: e.target.value || undefined, page: 1 })
        }
      >
        <option value="">Elemento: todos</option>
        <option value="water">Água</option>
        <option value="wind">Vento</option>
        <option value="fire">Fogo</option>
        <option value="light">Luz</option>
        <option value="dark">Trevas</option>
      </select>

      <select
        className="h-10 rounded-md border border-slate-300 bg-white px-3"
        defaultValue={q.stars ?? ""}
        onChange={(e) =>
          update({
            stars: e.target.value ? Number(e.target.value) : undefined,
            page: 1,
          })
        }
      >
        <option value="">Estrelas: todas</option>
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <option key={n} value={n}>
            {n}★
          </option>
        ))}
      </select>

      <button
        onClick={() =>
          update({ q: undefined, element: undefined, stars: undefined, page: 1 })
        }
        className="h-10 rounded-md bg-primary px-3 text-white hover:opacity-95"
      >
        Limpar
      </button>
    </div>
  );
}
