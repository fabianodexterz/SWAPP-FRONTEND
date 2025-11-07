export default function Home() {
  // Conteúdo simples caso o middleware não rode
  return (
    <main className="min-h-screen grid place-items-center p-8">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">SWAPP</h1>
        <p className="opacity-70">Carregando...</p>
      </div>
    </main>
  );
}
