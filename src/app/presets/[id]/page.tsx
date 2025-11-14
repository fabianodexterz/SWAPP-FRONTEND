// src/app/presets/[id]/page.tsx
import { notFound } from "next/navigation";

type PageProps = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function Page({ params }: PageProps) {
  const id = params?.id;
  if (!id) notFound();

  return (
    <main className="px-6 md:px-10 lg:px-12 py-8 max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 text-[#cbb797]">
        Preset #{id}
      </h1>
      <section className="rounded-2xl border border-white/10 p-4 bg-white/5">
        <p className="text-white/70">Conteúdo do preset em construção.</p>
      </section>
    </main>
  );
}
