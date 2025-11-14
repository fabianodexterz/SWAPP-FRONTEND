"use client";
import React from "react";
type Props={content:string;children:React.ReactNode};
export default function KaiTooltip({content,children}:Props){
  return <span title={content} className="inline-flex items-center">{children}</span>;
}
