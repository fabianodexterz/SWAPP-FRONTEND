// src/app/monsters/page.tsx
import type { Metadata } from "next";
import MonsterList from "./_components/MonsterList";
import type { MonsterRef } from "./_components/MonsterRow"; // <-- aqui ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â© o tipo correto

export const metadata: Metadata = {
  title: "SWAPP ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ Monstros",
};

async function getMonsters(): Promise<MonsterRef[]> {
  // MOCK: troque pelo fetch do backend quando quiser
  return [
    {
      id: 101,
      name: "Lushen",
      element: "Wind",
      natStars: 4,
      portraitUrl: "/logo-swapp.png",
    },
    {
      id: 102,
      name: "Veromos",
      element: "Dark",
      natStars: 5,
      portraitUrl: "/images/portrait-placeholder.png",
    },
    {
      id: 103,
      name: "Anavel",
      element: "Water",
      natStars: 5,
      portraitUrl: "/images/portrait-placeholder.png",
    },
  ];
}

export default async function MonstersPage() {
  const monsters = await getMonsters();

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 text-[#cbb797]">
        Monstros
      </h1>

      <MonsterList monsters={monsters} />
    </main>
  );
}
