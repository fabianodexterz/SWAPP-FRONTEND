// src/services/icons.ts
import api from "@/lib/api";

export type IconItem = {
  id: string;
  name?: string;
  url: string;
};

const BASE = "/api/icons";

/**
 * Lista os ícones disponíveis.
 */
export async function listIcons(): Promise<IconItem[]> {
  const data = await api<{ list?: IconItem[] } | IconItem[]>(BASE);
  if (Array.isArray(data)) return data;
  return Array.isArray(data?.list) ? data.list! : [];
}

/**
 * Cria/enviar novo ícone.
 */
export async function createIcon(file: File, name?: string): Promise<IconItem | null> {
  const fd = new FormData();
  fd.append("file", file);
  if (name) fd.append("name", name);

  const res = await fetch(BASE, {
    method: "POST",
    body: fd,
    credentials: "include",
  });

  if (!res.ok) throw new Error("Falha ao enviar ícone");
  return (await res.json()) as IconItem;
}

/**
 * Remove um ícone pelo ID.
 */
export async function deleteIcon(id: string): Promise<boolean> {
  const res = await api<{ ok?: boolean }>(`${BASE}/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  return !!res?.ok;
}
