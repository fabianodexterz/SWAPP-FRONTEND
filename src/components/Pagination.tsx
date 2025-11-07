
'use client';

type Props = {
  page: number;
  total: number;
  limit: number;
  onPage: (p: number) => void;
};

export default function Pagination({ page, total, limit, onPage }: Props) {
  const pages = Math.max(1, Math.ceil(total / limit));
  if (pages <= 1) return null;

  const prev = () => onPage(Math.max(1, page - 1));
  const next = () => onPage(Math.min(pages, page + 1));

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <button
        onClick={prev}
        className="rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-800"
      >
        Anterior
      </button>
      <span className="px-2 text-sm text-zinc-400">
        {page} / {pages}
      </span>
      <button
        onClick={next}
        className="rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-800"
      >
        Próxima
      </button>
    </div>
  );
}
