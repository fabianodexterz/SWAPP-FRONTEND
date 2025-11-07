import clsx from 'clsx';

export default function ListCard({ children, right, className, onClick }: {
  children: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div onClick={onClick}
      className={clsx(
        'group grid grid-cols-[auto,1fr,auto] items-center gap-4 rounded-xl2 bg-card/70 px-4 py-3',
        'border border-white/6 hover:border-brand-500/40 hover:bg-card/90 hover:shadow-soft',
        'transition-all duration-200 ease-snappy',
        onClick && 'cursor-pointer', className)}>
      {children}
      {right}
    </div>
  );
}
