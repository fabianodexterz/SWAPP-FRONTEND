import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  tone?: 'default' | 'success' | 'danger' | 'info' | 'warning';
  className?: string;
  hoverable?: boolean;
};

export default function Badge({ children, tone = 'default', className, hoverable }: Props) {
  const tones = {
    default: 'bg-white/6 text-ink/90',
    success: 'bg-emerald-500/15 text-emerald-300',
    danger:  'bg-rose-500/15 text-rose-300',
    info:    'bg-sky-500/15 text-sky-300',
    warning: 'bg-amber-500/15 text-amber-300'
  };

  return (
    <span className={clsx('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors',
      tones[tone], hoverable && 'hover:bg-white/12', className)}>
      {children}
    </span>
  );
}
