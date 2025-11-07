export type IconMap = {
  elements: Record<'Fire'|'Water'|'Wind'|'Light'|'Dark', string>;
  runes: Record<string, string>;
  arena: Record<string, string>;
};

let cache: IconMap | null = null;

export async function getIconMap(): Promise<IconMap> {
  if (cache) return cache;
  try {
    const res = await fetch('/icons/map.json', { cache: 'no-store' });
    if (res.ok) {
      cache = (await res.json()) as IconMap;
      return cache;
    }
  } catch {}
  return {
    elements: { Fire: '', Water: '', Wind: '', Light: '', Dark: '' },
    runes: {},
    arena: {},
  };
}
