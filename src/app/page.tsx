// src/app/page.tsx
import type { Metadata, Viewport } from "next";
import HomeHero from "@/components/HomeHero";

export const metadata: Metadata = {
  title: "SWAPP • Home",
  description:
    "SWAPP — Gerencie monstros, runas e presets num painel dark premium. Faça login e otimize seu progresso.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function Page() {
  return <HomeHero />;
}
