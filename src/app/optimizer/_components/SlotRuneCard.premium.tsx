"use client";
import React from "react";
export default function SlotRuneCardPremium({title,headRight,subs=[]}:{title:string;headRight?:string;subs?:string[]}){
  return (<div className="kai-slot">
    <div className="kai-slot__head">
      <span className="text-white/70">{title}</span>
      {headRight?<span className="ml-auto text-white/50">{headRight}</span>:null}
    </div>
    <div className="kai-slot__stats">
      {subs.slice(0,4).map((s,i)=>(<span key={i} className="kai-stat-pill">{s}</span>))}
    </div>
  </div>);
}
