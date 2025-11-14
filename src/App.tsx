"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/api";

type HealthResponse = { ok?: boolean } | string | null;

export default function App() {
  const [status, setStatus] = useState<string>("Carregando...");

  useEffect(() => {
    let mounted = true;

    const fetchStatus = async () => {
      try {
        const data = await api<HealthResponse>("/health");
        if (!mounted) return;

        const text =
          typeof data === "string" ? data : data?.ok ? "online" : "offline";
        setStatus(`API: ${text ?? "desconhecido"}`);
      } catch {
        if (!mounted) return;
        setStatus("API: offline");
      }
    };

    fetchStatus();
    return () => {
      mounted = false;
    };
  }, []);

  return <div className="text-xs opacity-70 px-2 py-1">{status}</div>;
}
