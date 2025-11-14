// src/data/presets/presets_swapp.ts

export type PresetRole = 'RTA' | 'Arena' | 'Cairos' | 'ToA' | 'Outros';

export interface SwappPreset {
  id: string; // usado no optimizer e /presets/[id]
  slug: string;
  role: PresetRole;

  monsterId: number;
  monsterName: string;
  title: string;
  description: string;

  runeSets: string[]; // ex.: ['Violent', 'Will']
  runeSlotsMain: string; // ex.: '2 SPD • 4 CRI DANO • 6 HP%'
  tags: string[];

  recommendedStats?: string[];
}

// bundle simples: array direto (sem .presets)
export const PRESETS_BUNDLE: SwappPreset[] = [
  {
    id: 'lushen-rta-rage-blade',
    slug: 'lushen-rta-rage-blade',
    role: 'RTA',
    monsterId: 101,
    monsterName: 'Lushen',
    title: 'Lushen – Arena/RTA Nuker',
    description:
      'Build focada em dano explosivo para limpar ondas e finalizar partidas rápido. Ideal para Arena ofensiva e algumas comps de RTA agressiva.',
    runeSets: ['Rage', 'Blade'],
    runeSlotsMain: '2 ATK% • 4 CRI DANO • 6 ATK%',
    tags: ['ATK', 'CRI', 'Nuker', 'Arena', 'RTA'],
    recommendedStats: ['CRI Rate 85%+', 'CRI Dano 180%+', 'SPD 140+', 'ATK 2600+'],
  },
  {
    id: 'veromos-violent-focus',
    slug: 'veromos-violent-focus',
    role: 'RTA',
    monsterId: 102,
    monsterName: 'Veromos',
    title: 'Veromos – Controle/Sustain',
    description:
      'Build utilitária para controle de debuffs e sustain da equipe, com bastante precisão e HP.',
    runeSets: ['Violent', 'Focus'],
    runeSlotsMain: '2 SPD • 4 HP% • 6 HP%',
    tags: ['HP', 'SPD', 'Suporte', 'Controle'],
    recommendedStats: ['SPD 190+', 'HP 30k+', 'RES 70%+', 'ACC 60%+'],
  },
];
