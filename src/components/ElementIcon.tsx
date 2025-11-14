"use client";

import Image from "next/image";
import { useState } from "react";

export type ElementName = "Fire" | "Water" | "Wind" | "Light" | "Dark";

type Props = {
  element: ElementName;
  size?: number;
  className?: string;
  title?: string;
  muted?: boolean;
  glow?: boolean;
  colorClass?: string; // aplicÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡vel quando for SVG (usa currentColor)
};

const base = "/icons/elements";
const SVG: Record<ElementName, string> = {
  Fire:  `${base}/fire.svg`,
  Water: `${base}/water.svg`,
  Wind:  `${base}/wind.svg`,
  Light: `${base}/light.svg`,
  Dark:  `${base}/dark.svg`,
};
const WEBP: Record<ElementName, string> = {
  Fire:  `${base}/fire.webp`,
  Water: `${base}/water.webp`,
  Wind:  `${base}/wind.webp`,
  Light: `${base}/light.webp`,
  Dark:  `${base}/dark.webp`,
};

export default function ElementIcon({
  element,
  size = 28,
  className = "",
  title,
  muted = false,
  glow = true,
  colorClass = "text-[#cbb797]",
}: Props) {
  const [src, setSrc] = useState<string>(SVG[element]);
  const svg = src.endsWith(".svg");

  return (
    <Image
      src={src}
      alt={title ?? element}
      width={size}
      height={size}
      onError={() => setSrc(WEBP[element])}
      className={[
        "rounded-full ring-1 ring-white/10 transition-all duration-200",
        muted ? "opacity-55" : "opacity-100",
        glow ? "shadow-[0_0_10px_#cbb79740] hover:shadow-[0_0_14px_#cbb79766]" : "",
        svg ? colorClass : "",
        className,
      ].join(" ")}
      priority={false}
    />
  );
}
