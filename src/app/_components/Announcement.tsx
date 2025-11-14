// src/app/_components/Announcement.tsx
export default function Announcement() {
  return (
    <div className="mb-4 flex items-center justify-between rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs text-amber-50">
      <div>
        <p className="font-semibold text-amber-200">
          SWAPP em desenvolvimento
        </p>
        <p className="text-amber-100/80">
          Esta é uma prévia da interface. Alguns recursos ainda estão em fase de testes e podem mudar nas próximas versões.
        </p>
      </div>
      <span className="hidden rounded-full bg-amber-400/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-100 md:inline-flex">
        Preview
      </span>
    </div>
  );
}
