// src/lib/import/schema.ts
import { z } from "zod";

// Schema de uma runa importada (JSON do SW/optimizador etc.)
export const RuneZ = z.object({
  id: z.union([z.string(), z.number()]),

  slot: z.number().int().min(1).max(6),

  set: z.string(),

  grade: z.number().int().min(1).max(6),

  level: z.number().int().min(0).max(15),

  // main stat em texto (ex: ATK%, HP%, SPD)
  main: z.string().optional(),

  // substats em formato { "SPD": 5, "CRI_RATE": 7, ... }
  // chave = string, valor = número
  subs: z.record(z.string(), z.number()).optional(),

  // id do monstro equipado ou null
  equipped: z.union([z.number(), z.null()]).optional(),
});

// payload de import
export const ImportPayloadZ = z.object({
  runes: z.array(RuneZ).default([]),
});

export type RuneInput = z.infer<typeof RuneZ>;
export type ImportPayload = z.infer<typeof ImportPayloadZ>;
