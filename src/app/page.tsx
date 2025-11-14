// src/app/page.tsx
import HomeHero from './_components/HomeHero';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#050509] via-[#050509] to-[#050509]">
      <HomeHero />

      {/* Aqui ficam as próximas seções da landing (cards, como funciona, footer etc.) */}
    </main>
  );
}
