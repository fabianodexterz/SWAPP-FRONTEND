"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/api";

type Me = { id?: number | string; email?: string; name?: string } | string | null;

export default function MePage() {
  const [me, setMe] = useState<Me>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api<Me>("/auth/me");
        if (!mounted) return;
        setMe(res ?? null);
      } catch (e: any) {
        if (!mounted) return;
        setErr(e?.message ?? "Falha ao buscar dados.");
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-3">/auth/me</h1>
      {err ? (
        <pre className="text-xs whitespace-pre-wrap text-red-400">{err}</pre>
      ) : (
        <pre className="text-xs whitespace-pre-wrap">
          {JSON.stringify(me, null, 2)}
        </pre>
      )}
    </div>
  );
}
