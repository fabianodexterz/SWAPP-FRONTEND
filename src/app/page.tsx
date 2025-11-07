"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Se a rota /login existir, o Next redireciona; se não, ficará nesta página.
    router.push("/login");
  }, [router]);

  return (
    <main style={{
      display: "flex",
      height: "100vh",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "12px",
      fontFamily: "Inter, system-ui, Arial"
    }}>
      <h1>SWAPP</h1>
      <p>Redirecionando para <code>/login</code>...</p>
    </main>
  );
}
