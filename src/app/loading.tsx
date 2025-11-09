export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full border-2 border-gold border-t-transparent animate-spin" />
        <p className="text-sm text-gray-400">Carregando...</p>
      </div>
    </div>
  );
}
