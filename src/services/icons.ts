// src/services/icons.ts
// Serviço de ícones sem depender de PUBLIC_BASE.
// Usa apenas a função Api (JSON) e fetch direto para multipart.

import { Api } from '@/lib/api';

const BASE = '/api/icons';

export type IconItem = {
  id: string;
  name: string;
  url: string;
};

export const icons = {
  // GET /api/icons  -> { items: IconItem[] }
  list: async (): Promise<IconItem[]> => {
    const res = await Api<{ items?: IconItem[] }>(BASE);
    return res.items ?? [];
  },

  // DELETE /api/icons/:id
  remove: async (id: string): Promise<void> => {
    await Api<void>(`${BASE}/${encodeURIComponent(id)}`, { method: 'DELETE' });
  },

  // POST /api/icons (multipart) -> IconItem
  // Usa fetch direto para multipart/form-data (Api é para JSON).
  upload: async (file: File): Promise<IconItem> => {
    const form = new FormData();
    form.append('file', file);

    const res = await fetch(BASE, {
      method: 'POST',
      body: form,
    });
    if (!res.ok) throw new Error('Falha no upload do ícone');
    return (await res.json()) as IconItem;
  },
};

export default icons;
