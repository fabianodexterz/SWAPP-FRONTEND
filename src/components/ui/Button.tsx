'use client';
import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'sm' | 'md';
  active?: boolean;
};

export default function Button({
  className, variant = 'primary', size = 'md', active = false, ...props
}: Props) {
  const base =
    'inline-flex items-center justify-center rounded-xl2 font-medium transition-all duration-200 ease-snappy focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60 focus-visible:ring-offset-0 disabled:opacity-50 disabled:pointer-events-none';
  const sizes = { sm: 'h-9 px-3 text-sm', md: 'h-10 px-4 text-sm' };
  const variants = {
    primary:
      'bg-brand-500 text-white hover:bg-brand-400 active:translate-y-[1px] shadow-soft hover:shadow-lg',
    ghost:
      'bg-transparent text-ink/90 hover:text-ink hover:bg-white/5 active:bg-white/10',
    outline:
      'border border-white/10 text-ink/90 hover:bg-white/5 active:bg-white/10'
  };

  return (
    <button {...props}
      className={clsx(base, sizes[size], variants[variant], active && 'ring-2 ring-brand-400/50', className)}
    />
  );
}
