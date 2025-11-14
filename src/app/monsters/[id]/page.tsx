// src/app/monsters/[id]/page.tsx
import { notFound } from "next/navigation";

type PageProps = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function Page({ params }: PageProps) {
  const id = params?.id;
  if (!id) notFound();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold text-[#cbb797]">Monstro #{id}</h1>
    </main>
  );
}
