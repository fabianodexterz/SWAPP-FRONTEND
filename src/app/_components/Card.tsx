import React from 'react';
import { bronze } from './theme';

export default function Card({ children, className='' }: { children: React.ReactNode; className?: string }){
  return <div className={`${bronze.panel} ${bronze.edge} rounded-2xl p-4 ${className}`}>{children}</div>;
}
