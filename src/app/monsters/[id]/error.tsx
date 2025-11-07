'use client';
export default function ErrorMonster({ error }: { error: Error }) {
  return (
    <div className="container py-8">
      <div className="card">
        <h1 className="text-2xl font-bold mb-2">Erro ao carregar monstro</h1>
        <p className="text-neutral-300 text-sm">{error.message}</p>
      </div>
    </div>
  );
}
