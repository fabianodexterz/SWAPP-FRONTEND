'use client'
import { create } from 'zustand'
type Locale = 'pt-BR' | 'en-US'
type State = { locale: Locale, setLocale:(l:Locale)=>void, t:(k:string)=>string }
const dict: Record<Locale, Record<string,string>> = {
  'pt-BR': { home:'Início', monsters:'Monstros', optimizer:'Otimizar (IA Rune)', import:'Import JSON', presets:'Artefatos / Presets', status:'Status', backend:'Backend', db:'Banco', login:'Login', searchPlaceholder:'Buscar por nome, monstro ou set...', presetsTitle:'Presets', sort:'Ordenar por', name:'Nome', monster:'Monstro', runes:'Runas', page:'Página', of:'de', perPage:'por página', chooseMonster:'Escolha um monstro...', allowSteal:'Permitir roubar runas', respectLocked:"Respeitar runas/artefatos travados", requiredSets:'Sets obrigatórios (ex: Violent,Will)', allowedSets:'Sets permitidos (opcional)', chooseArtifacts:'Escolher artefatos também', spdMin:'SPD min', criMin:'CRI min', cdmgMin:'CDMG min', suggest:'Sugerir', selectMonsterToSee:'Selecione um monstro para ver a análise.', valid:'Válido', missing:'Pendente' },
  'en-US': { home:'Home', monsters:'Monsters', optimizer:'Optimizer (AI Rune)', import:'Import JSON', presets:'Artifacts / Presets', status:'Status', backend:'Backend', db:'Database', login:'Login', searchPlaceholder:'Search by name, monster or set...', presetsTitle:'Presets', sort:'Sort by', name:'Name', monster:'Monster', runes:'Runes', page:'Page', of:'of', perPage:'per page', chooseMonster:'Choose a monster...', allowSteal:'Allow rune stealing', respectLocked:"Respect locked runes/artifacts", requiredSets:'Required sets (e.g. Violent,Will)', allowedSets:'Allowed sets (optional)', chooseArtifacts:'Pick artifacts too', spdMin:'SPD min', criMin:'CRI min', cdmgMin:'CDMG min', suggest:'Suggest', selectMonsterToSee:'Select a monster to see analysis.', valid:'Valid', missing:'Missing' }
}
function getInitial(): Locale { if (typeof window!=='undefined'){ const s=localStorage.getItem('swapp_locale'); if (s==='pt-BR'||s==='en-US') return s as Locale } return 'pt-BR' }
export const useLang = create<State>((set,get)=>({
  locale: getInitial(),
  setLocale:(l)=>{ if(typeof window!=='undefined') localStorage.setItem('swapp_locale', l); set({locale:l}) },
  t:(k)=> dict[get().locale][k] ?? k
}))
