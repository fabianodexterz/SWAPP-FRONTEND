// src/components/MonsterForm.tsx
import { useState } from 'react';
import { monstersApi } from '@/services/monsters';

export default function MonsterForm({ onCreated }: { onCreated?: () => void }) {
  const [form, setForm] = useState({
    swarfarmId: '',
    name: '',
    element: 'Fire',
    archetype: 'Attacker',
    natStars: '4',
    awakened: 'true',
    iconURL: '',
  });
  const [busy, setBusy] = useState(false);

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await monstersApi.create({
        swarfarmId: Number(form.swarfarmId),
        name: form.name,
        element: form.element,
        archetype: form.archetype,
        natStars: Number(form.natStars),
        awakened: form.awakened === 'true',
        iconURL: form.iconURL || undefined,
      });
      alert('Criado!');
      onCreated?.();
      // limpa alguns campos
      setForm((f) => ({ ...f, name: '', iconURL: '' }));
    } catch (e: any) {
      alert(e.message || 'Falha ao criar');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(6, 1fr)', marginBottom: 12 }}>
      <input placeholder="swarfarmId" value={form.swarfarmId} onChange={(e) => set('swarfarmId', e.target.value)} required />
      <input placeholder="name" value={form.name} onChange={(e) => set('name', e.target.value)} required />
      <select value={form.element} onChange={(e) => set('element', e.target.value)}>
        <option>Fire</option><option>Water</option><option>Wind</option><option>Light</option><option>Dark</option>
      </select>
      <input placeholder="archetype" value={form.archetype} onChange={(e) => set('archetype', e.target.value)} />
      <select value={form.natStars} onChange={(e) => set('natStars', e.target.value)}>
        <option>3</option><option>4</option><option>5</option><option>6</option>
      </select>
      <select value={form.awakened} onChange={(e) => set('awakened', e.target.value)}>
        <option value="true">Awakened ✓</option>
        <option value="false">Not Awakened</option>
      </select>
      <input placeholder="iconURL (opcional)" value={form.iconURL} onChange={(e) => set('iconURL', e.target.value)} style={{ gridColumn: '1 / span 5' }} />
      <button disabled={busy} style={{ gridColumn: '6 / span 1' }}>{busy ? 'Salvando…' : 'Criar'}</button>
    </form>
  );
}
