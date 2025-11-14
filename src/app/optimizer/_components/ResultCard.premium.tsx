"use client";
import React from "react";
import ScoreBar from "./ui/ScoreBar";
import KaiTooltip from "./ui/KaiTooltip";

type Rune={id?:number;slot?:number;set?:string;grade?:number;level?:number;main?:string;sub1?:string;sub2?:string;sub3?:string;subs?:string[]};
type OptimizedCombo={id?:string;target?:string;runes:Rune[];meta?:{score?:number;targetId?:number};delta?:{spd?:number;cri?:number;cdm?:number}};

export default function ResultCardPremium({combo,monstersById}:{combo:OptimizedCombo;monstersById:Record<number,string>}){
  const score = combo.meta?.score ?? (typeof (combo as any).score === "number" ? (combo as any).score : undefined);
  const targetId = combo.meta?.targetId ?? (combo as any).targetId;
  const title = combo.target || (typeof targetId === "number" && monstersById?.[targetId] ? monstersById[targetId] : "Monstro");
  const runes = Array.isArray(combo.runes)?combo.runes:[];

  return (<div className="kai-resultcard">
    <header className="kai-resultcard__head">
      <div className="kai-resultcard__monster"><span className="text-white/80">{title}</span></div>
      <div className="kai-score">
        <div className="text-right text-sm text-white/70">Score: <span className="text-[var(--kai-gold)] font-semibold">{typeof score==='number'?score.toFixed(2):'-'}</span></div>
        <ScoreBar value={typeof score==='number'?Math.min(100,Math.max(0,score)):0}/>
        <div className="kai-help text-right">
          {combo.delta?.spd?`ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â½ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡ÃƒÂ¯Ã‚Â¿Ã‚Â½SPD ${combo.delta.spd}`:''}
          {combo.delta?.cri?`  ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â½ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡ÃƒÂ¯Ã‚Â¿Ã‚Â½CRI ${combo.delta.cri}`:''}
          {combo.delta?.cdm?`  ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â½ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡ÃƒÂ¯Ã‚Â¿Ã‚Â½CDMG ${combo.delta.cdm}`:''}
        </div>
      </div>
    </header>
    <div className="kai-resultcard__slots">
      {runes.map((r,idx)=>{
        const subsArr = Array.isArray(r.subs)?r.subs:([r.sub1,r.sub2,r.sub3].filter(Boolean) as string[]);
        return (<div key={idx} className="kai-slot">
          <div className="kai-slot__head">
            <span className="text-white/60">Slot {r.slot ?? "-"}</span>
            <span className="mx-2">ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢</span>
            <KaiTooltip content={`Set ${r.set ?? "-"}, +${r.level ?? 0}`}><span className="text-[var(--kai-gold-weak)] font-medium">{r.set ?? "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡ÃƒÂ¯Ã‚Â¿Ã‚Â½"} {r.level!=null?`+${r.level}`:''}</span></KaiTooltip>
            <span className="ml-auto text-white/50">{r.main ?? "-"}</span>
          </div>
          <div className="kai-slot__stats">
            {subsArr?.slice(0,3).map((s,i)=>(<span key={i} className="kai-stat-pill">{s}</span>))}
          </div>
        </div>);
      })}
    </div>
  </div>);
}
