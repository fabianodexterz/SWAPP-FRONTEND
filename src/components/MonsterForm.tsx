// src/components/MonsterForm.tsx
"use client";

import React, { useState } from "react";
import { monstersApi } from "@/lib/api";

type FormState = {
  swarfarmId: string;
  name: string;
};

export default function MonsterForm() {
  const [form, setForm] = useState<FormState>({
    swarfarmId: "",
    name: "",
  });

  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  function onChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    setErr(null);

    try {
      const payload = {
        swarfarmId:
          form.swarfarmId && form.swarfarmId.trim() !== ""
            ? Number(form.swarfarmId)
            : undefined,
        name: form.name?.trim() || undefined,
      };

      const created = await monstersApi.create(payload);
      setMsg(`Monstro criado (id ${created.id}) com sucesso!`);
      setForm({ swarfarmId: "", name: "" });
    } catch (e: any) {
      setErr(e?.message || "Falha ao criar monstro.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Swarfarm ID (opcional)</span>
        </label>
        <input
          name="swarfarmId"
          value={form.swarfarmId}
          onChange={onChange}
          placeholder="ex.: 12345"
          className="input input-bordered"
          disabled={saving}
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Nome (opcional)</span>
        </label>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="ex.: Lushen"
          className="input input-bordered"
          disabled={saving}
        />
      </div>

      <div className="flex gap-2">
        <button className={`btn btn-primary ${saving ? "btn-disabled" : ""}`} disabled={saving}>
          {saving ? "Salvando..." : "Criar monstro"}
        </button>
        {msg && <span className="text-success">{msg}</span>}
        {err && <span className="text-error">{err}</span>}
      </div>
    </form>
  );
}
