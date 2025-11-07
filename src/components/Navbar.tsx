'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Início' },
  { href: '/monsters', label: 'Monstros' },
  { href: '/presets', label: 'Presets' },
  { href: '/equipes', label: 'Equipes' },
  { href: '/otimizado', label: 'Otimizado' },
  { href: '/login', label: 'Login' },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 border-b bg-[rgb(var(--panel))]/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 md:px-6 lg:px-8">
        <span className="text-lg font-bold tracking-tight">SWAPP</span>
        <ul className="ml-auto flex items-center gap-3 text-sm">
          {links.map((l) => {
            const active = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href));
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={
                    'rounded-lg px-3 py-2 ' +
                    (active ? 'bg-brand text-black' : 'hover:bg-black/5 dark:hover:bg-white/5')
                  }
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
