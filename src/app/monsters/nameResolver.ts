'use client';

// Lightweight cache for external EN map (public/data/monsters-en.json)
let enMap: Record<string, string> | null = null;
let enMapLoaded = false;

export async function loadEnglishMap() {
  if (enMapLoaded) return enMap;
  enMapLoaded = true;
  try {
    const res = await fetch('/data/monsters-en.json', { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      if (json && typeof json === 'object') enMap = json as Record<string, string>;
    }
  } catch {}
  return enMap;
}

// Hangul detection to skip KR candidates
const HANGUL_RE = /[\u1100-\u11FF\u3130-\u318F\uAC00-\uD7AF]/;

// Try to extract a readable name from the portrait URL
function nameFromPortrait(url?: string | null): string | null {
  if (!url) return null;
  try {
    const last = url.split('/').pop() || '';
    const base = last.replace(/\.[a-z0-9]+$/i, '');
    if (!base) return null;
    // cleanup typical tokens like underscores/dashes, keep capitalization when present
    const cleaned = decodeURIComponent(base).replace(/[_-]+/g, ' ').trim();
    if (cleaned && !HANGUL_RE.test(cleaned)) return cleaned;
  } catch {}
  return null;
}

type Monster = {
  id: number;
  name?: string | null;
  name_en?: string | null;
  englishName?: string | null;
  nameEnglish?: string | null;
  awakened_name_en?: string | null;
  awakenedNameEn?: string | null;
  base_name_en?: string | null;
  family_name_en?: string | null;
  displayName?: string | null;
  display_name_en?: string | null;
  com2us_name?: string | null;
  com2us_en?: string | null;
  full_name_en?: string | null;
  unit_name?: string | null;
  unit_name_en?: string | null;
  portraitUrl?: string | null;
  swarfarmId?: number | null;
};

// Synchronous best-effort resolution without the external map
export function resolveNameLocal(m: Monster): string | null {
  const candidates = [
    m.name_en, m.englishName, m.nameEnglish,
    m.awakened_name_en, m.awakenedNameEn,
    m.base_name_en, m.family_name_en,
    m.displayName, m.display_name_en,
    m.com2us_en, m.com2us_name,
    m.full_name_en, m.unit_name_en, m.unit_name,
    m.name,
    nameFromPortrait(m.portraitUrl),
  ].filter(Boolean) as string[];

  for (const c of candidates) {
    const s = String(c).trim();
    if (!HANGUL_RE.test(s) && s.length > 0) return s;
  }
  return null;
}

// Async resolver that also consults the external map by swarfarmId/id
export async function resolveNameEN(m: Monster): Promise<string> {
  const local = resolveNameLocal(m);
  if (local) return local;

  const map = await loadEnglishMap();
  if (map) {
    if (m.swarfarmId && map[String(m.swarfarmId)]) return map[String(m.swarfarmId)];
    if (map[String(m.id)]) return map[String(m.id)];
  }
  // Last resort
  if (typeof m.swarfarmId === 'number' && m.swarfarmId) return `Monster #${m.swarfarmId}`;
  return `Monster ${m.id}`;
}
