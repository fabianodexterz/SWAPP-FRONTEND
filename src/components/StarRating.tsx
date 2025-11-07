export default function StarRating({ n }: { n: number }) {
  const filled = 'text-yellow-500';
  const empty  = 'text-slate-300';
  return (
    <div className="flex gap-0.5" aria-label={`${n} estrelas`}>
      {Array.from({ length: 6 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={`h-4 w-4 ${i < n ? filled : empty}`} fill="currentColor">
          <path d="M10 15.27 16.18 19l-1.64-7.03L20 7.24l-7.19-.62L10 0 7.19 6.62 0 7.24l5.46 4.73L3.82 19z"/>
        </svg>
      ))}
    </div>
  );
}
