// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from './_components/ThemeProvider';

export const metadata: Metadata = {
  title: 'SWAPP – Summoners War Assistant',
  description:
    'Sua central premium para conta, runas, monstros, presets e otimização no estilo Summoners War.',
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="bg-[#050509] text-slate-50 antialiased">
        <ThemeProvider>{props.children}</ThemeProvider>
      </body>
    </html>
  );
}
