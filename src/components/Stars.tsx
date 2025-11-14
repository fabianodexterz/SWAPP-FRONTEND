'use client';

export default function Stars({ n }: { n: number }) {
  const count = Math.max(0, Math.min(6, Math.round(n || 0)));
  return (
    <span aria-label={`${count} estrelas`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-yellow-300 drop-shadow-[0_0_4px_rgba(255,255,0,.35)]">âËœâ€¦</span>
      ))}
      {Array.from({ length: 6 - count }).map((_, i) => (
        <span key={`e${i}`} className="text-zinc-600">âËœâ€ </span>
      ))}
    </span>
  );
}
