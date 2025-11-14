"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";

export default function LogoutPage() {
  const [msg, setMsg] = useState<string>("Saindo...");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await api("/auth/logout", { method: "POST" });
        if (!mounted) return;
        setMsg("Você saiu da conta.");
      } catch {
        if (!mounted) return;
        setMsg("Falha ao sair. Tente novamente.");
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 space-y-3">
      <div>{msg}</div>
      <Link href="/auth/login" className="btn btn-primary w-full">Ir para o login</Link>
    </div>
  );
}
