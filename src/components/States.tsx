// src/components/States.tsx
export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 animate-pulse">
      <div className="h-4 w-40 bg-white/10 rounded mb-3" />
      <div className="flex gap-2">
        <div className="h-6 w-16 bg-white/10 rounded-full" />
        <div className="h-6 w-14 bg-white/10 rounded-full" />
        <div className="h-6 w-12 bg-white/10 rounded-full" />
      </div>
    </div>
  )
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-10 text-center">
      <p className="text-white/80 font-medium">{title}</p>
      {hint && <p className="text-white/40 text-sm mt-1">{hint}</p>}
    </div>
  )
}
