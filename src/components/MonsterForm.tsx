// =====================================================
// src/components/MonsterForm.tsx — Formulário completo
// =====================================================

'use client';

import React, { useState } from 'react';
import { monstersApi, MonsterElement } from '@/lib/api';

type FormState = {
  swarfarmId?: string;
  name: string;
  element: MonsterElement | '';
  natStars?: string;
  archetype?: string;
  awakened?: boolean;
  portraitUrl?: string;
};

type Props = {
  onSuccess?: () => void;
};

export default function MonsterForm({ onSuccess }: Props) {
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState<FormState>({
    swarfarmId: '',
    name: '',
    element: '',
    natStars: '6',
    archetype: '',
    awakened: false,
    portraitUrl: '',
  });

  const handleChange =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const v =
        e.currentTarget.type === 'checkbox'
          ? (e.currentTarget as HTMLInputElement).checked
          : e.currentTarget.value;
      setForm((old) => ({ ...old, [k]: v as any }));
    };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.element) return;
    setBusy(true);
    try {
      await monstersApi.create({
        swarfarmId:
          form.swarfarmId && form.swarfarmId.trim() !== ''
            ? Number(form.swarfarmId)
            : null,
        name: form.name,
        element: form.element as MonsterElement,
        natStars:
          form.natStars && form.natStars.trim() !== ''
            ? Number(form.natStars)
            : 6,
        archetype: form.archetype?.trim() || null,
        awakened: !!form.awakened,
        portraitUrl: form.portraitUrl?.trim() || null,
      });

      onSuccess?.();

      setForm({
        swarfarmId: '',
        name: '',
        element: '',
        natStars: '6',
        archetype: '',
        awakened: false,
        portraitUrl: '',
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-sm opacity-80">Swarfarm ID</span>
          <input
            className="input"
            value={form.swarfarmId}
            onChange={handleChange('swarfarmId')}
            placeholder="ex: 12345"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm opacity-80">Nome</span>
          <input
            className="input"
            value={form.name}
            onChange={handleChange('name')}
            placeholder="ex: Veromos"
            required
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm opacity-80">Elemento</span>
          <select
            className="input"
            value={form.element}
            onChange={handleChange('element')}
            required
          >
            <option value="">Selecione…</option>
            <option value="Fire">Fire</option>
            <option value="Water">Water</option>
            <option value="Wind">Wind</option>
            <option value="Light">Light</option>
            <option value="Dark">Dark</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm opacity-80">Nat. Stars</span>
          <input
            className="input"
            value={form.natStars}
            onChange={handleChange('natStars')}
            placeholder="6"
            inputMode="numeric"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm opacity-80">Arquetipo</span>
          <input
            className="input"
            value={form.archetype}
            onChange={handleChange('archetype')}
            placeholder="Support / Attack / Defense"
          />
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={!!form.awakened}
            onChange={handleChange('awakened')}
          />
          <span>Awakened</span>
        </label>

        <label className="flex flex-col gap-1 col-span-2">
          <span className="text-sm opacity-80">Portrait URL</span>
          <input
            className="input"
            value={form.portraitUrl}
            onChange={handleChange('portraitUrl')}
            placeholder="https://..."
          />
        </label>
      </div>

      <button className="btn w-full" disabled={busy}>
        {busy ? 'Salvando…' : 'Criar Monstro'}
      </button>
    </form>
  );
}
