// src/services/api.ts
// Re-exporta base e helpers pra manter retrocompatibilidade.
export const NEXT_PUBLIC_API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://swapp.local/api';

export * from '@/lib/api';
