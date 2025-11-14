"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  withText?: boolean;
  size?: number; // altura em px
  className?: string;
};

export default function LogoSwapp({ withText = false, size = 36, className = "" }: Props) {
  return (
    <Link href="/" aria-label="SWAPP ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ InÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­cio" className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src="/logo-swapp.svg"
        alt="SWAPP"
        width={size}
        height={size}
        className="rounded-lg"
        priority
      />
      {withText && (
        <span className="hidden sm:inline text-[#cbb797] font-semibold tracking-wide">SWAPP</span>
      )}
    </Link>
  );
}
