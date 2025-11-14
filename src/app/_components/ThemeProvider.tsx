// src/app/_components/ThemeProvider.tsx
'use client';

import * as React from 'react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: Props) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  );
}
