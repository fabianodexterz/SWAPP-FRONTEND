export const elementColor = (e?: string) => ({
  Fire: "bg-element-Fire/20 text-element-Fire",
  Water: "bg-element-Water/20 text-element-Water",
  Wind: "bg-element-Wind/20 text-element-Wind",
  Light: "bg-element-Light/20 text-element-Light",
  Dark: "bg-element-Dark/20 text-element-Dark"
} as any)[e || ""] || "bg-neutral-800 text-neutral-300";

export const placeholderFor = (name?: string, element?: string) => {
  const letter = (name?.[0] || "?").toUpperCase();
  const base = "bg-neutral-800";
  return { letter, base, ring: elementColor(element).replace("bg-", "ring-").split(" ")[0] };
};
