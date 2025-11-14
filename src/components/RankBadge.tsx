// frontend/src/components/RankBadge.tsx
import Image from 'next/image';
import { scoreToArenaRank } from '@/lib/rank';

type Props = {
  score: number;
  size?: number;
  showText?: boolean;
  className?: string;
};

export default function RankBadge({ score, size = 36, showText = false, className = '' }: Props) {
  const rank = scoreToArenaRank(score);

  const file = rank.tier === 'legend'
    ? '/icons/arena/legend.webp'
    : `/icons/arena/${rank.tier}_${rank.stars}.webp`;

  const text = rank.tier === 'legend'
    ? 'Legend'
    : `${rank.label} ${'âËœâ€¦'.repeat(rank.stars)}`;

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src={file}
        alt={text}
        width={size}
        height={size}
        style={{ width: size, height: size }}
      />
      {showText && (
        <span className="text-sm text-amber-200">{text}</span>
      )}
    </div>
  );
}
