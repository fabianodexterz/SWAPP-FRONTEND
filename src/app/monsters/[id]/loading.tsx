export default function LoadingMonster() {
  return (
    <div className="container py-8">
      <div className="card animate-pulse">
        <div className="h-6 w-40 bg-white/10 rounded mb-4" />
        <div className="flex gap-6">
          <div className="h-40 w-40 bg-white/10 rounded-xl" />
          <div className="grow">
            <div className="h-4 w-64 bg-white/10 rounded mb-2" />
            <div className="h-4 w-48 bg-white/10 rounded mb-2" />
            <div className="h-4 w-56 bg-white/10 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
