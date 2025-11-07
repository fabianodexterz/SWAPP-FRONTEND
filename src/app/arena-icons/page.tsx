'use client';
import { useEffect, useState } from 'react';
import { getIconMap } from '../lib/icons';

export default function ArenaIconsPreview() {
  const [icons, setIcons] = useState<any>(null);
  useEffect(()=>{ getIconMap().then(setIcons); }, []);
  const entries = icons?.arena ? Object.entries(icons.arena) as [string,string][] : [];
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Arena Icons Preview</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {entries.map(([k,v]) => (
          <div key={k} className="flex items-center gap-3 p-3 rounded-lg border border-zinc-700 bg-zinc-900">
            {v ? <img src={v} alt={k} className="w-8 h-8" /> : <div className="w-8 h-8 bg-zinc-700 rounded" />}
            <span className="text-sm">{k}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
