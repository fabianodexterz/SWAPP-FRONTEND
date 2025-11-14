// src/lib/ui.ts
// Centraliza os caminhos dos ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­cones usados no app (elementos, runas, arena).
// Mantenha os arquivos em /public/icons/** como vocÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âª jÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ organizou.

export type ElementKey = 'Fire' | 'Water' | 'Wind' | 'Light' | 'Dark';

export const ELEMENT_ICON: Record<ElementKey, string> = {
  Fire:  '/icons/elements/FireSymbol.webp',
  Water: '/icons/elements/WaterSymbol.webp',
  Wind:  '/icons/elements/WindSymbol.webp',
  Light: '/icons/elements/LightSymbol.webp',
  Dark:  '/icons/elements/DarkSymbol.webp',
};

// Runas ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡ÃƒÂ¯Ã‚Â¿Ã‚Â½ use exatamente os nomes que aparecem nos chips da UI
// (Swift, Violent, Rage, Will, Vampire, Blade, Energy, Guard, Focus, Nemesis, Shield, Revenge, Destroy, Fight, Tolerance, Seal, Intangible, Determination, Endure, Enhance)
export const RUNE_ICON: Record<string, string> = {
  Swift: '/icons/runes/Swift.webp',
  Violent: '/icons/runes/Violent.webp',
  Rage: '/icons/runes/Rage.webp',
  Will: '/icons/runes/Will.webp',
  Vampire: '/icons/runes/Vampire.webp',
  Blade: '/icons/runes/Blade.webp',
  Energy: '/icons/runes/Energy.webp',
  Guard: '/icons/runes/Guard.webp',
  Focus: '/icons/runes/Focus.webp',
  Nemesis: '/icons/runes/Nemesis.webp',
  Shield: '/icons/runes/Shield.webp',
  Revenge: '/icons/runes/Revenge.webp',
  Destroy: '/icons/runes/Destroy.webp',
  Fight: '/icons/runes/Fight.webp',
  Tolerance: '/icons/runes/Tolerance.webp',
  Seal: '/icons/runes/Seal.webp',
  Intangible: '/icons/runes/Intangible.webp',
  Determination: '/icons/runes/Determination.webp',
  Endure: '/icons/runes/Endure.webp',
  Enhance: '/icons/runes/Enhance.webp',
};

// Emblemas da Arena
export const ARENA_RANK_ICON: Record<string, string> = {
  beginner: '/icons/arena/beginner.webp',
  challenger_1: '/icons/arena/challenger_1.webp',
  challenger_2: '/icons/arena/challenger_2.webp',
  challenger_3: '/icons/arena/challenger_3.webp',
  conqueror_1: '/icons/arena/conqueror_1.webp',
  conqueror_2: '/icons/arena/conqueror_2.webp',
  conqueror_3: '/icons/arena/conqueror_3.webp',
  fighter_1: '/icons/arena/fighter_1.webp',
  fighter_2: '/icons/arena/fighter_2.webp',
  fighter_3: '/icons/arena/fighter_3.webp',
  guardian_1: '/icons/arena/guardian_1.webp',
  guardian_2: '/icons/arena/guardian_2.webp',
  guardian_3: '/icons/arena/guardian_3.webp',
  legend: '/icons/arena/legend.webp',
};
