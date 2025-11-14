"use client";
import React from "react";
export default function ScoreBar({value=0}:{value?:number}){
  const v=Math.max(0,Math.min(100,value));
  return (<div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
    <div className="h-full bg-[var(--kai-gold)]" style={{width:`${v}%`}}/>
  </div>);
}
