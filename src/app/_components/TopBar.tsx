'use client';
import Link from 'next/link';
import { bronze } from './theme';

export default function TopBar(){
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-[#0f0a06]/60 bg-[#0f0a06]/90 border-b border-[#2a1b12]">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded bg-[#2a1b12] ring-1 ring-[#b3762b]/30" />
          <Link href="/" className={`text-lg font-bold ${bronze.title}`}>SWAPP</Link>
          <nav className="hidden md:flex items-center gap-4 ml-4 text-sm">
            <Link href="/monsters" className="text-[#e8d5c0] hover:text-[#ffcf91]">Monstros</Link>
            <Link href="/runas" className="text-[#e8d5c0] hover:text-[#ffcf91]">Runas</Link>
            <Link href="/otimizador" className="text-[#e8d5c0] hover:text-[#ffcf91]">Otimizador</Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <button className={bronze.btn.ghost}>🌐 PT-BR</button>
          <button className={bronze.btn.ghost}>Tema</button>
          <button className={bronze.btn.solid}>Conta</button>
        </div>
      </div>
    </header>
  );
}
