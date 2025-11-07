import Image from 'next/image';
import clsx from 'clsx';

export default function MonsterAvatar({ src, alt }: { src?: string | null; alt: string; }) {
  return (
    <div className={clsx(
      'relative size-12 overflow-hidden rounded-xl2 border border-white/10',
      'ring-0 transition-all group-hover:ring-2 group-hover:ring-brand-400/50'
    )}>
      {src ? (
        <Image src={src} alt={alt} fill sizes="48px" className="object-cover" unoptimized />
      ) : (
        <div className="grid h-full w-full place-items-center bg-white/5 text-mute text-xs">IMG</div>
      )}
    </div>
  );
}
