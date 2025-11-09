'use client';

import React, { useState } from 'react';

export default function UploadJsonPage() {
  const [name, setName] = useState('');
  const [fileJson, setFileJson] = useState<string>('');
  const [preview, setPreview] = useState<any>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const text = await f.text();
    setFileJson(text);

    try {
      setPreview(JSON.parse(text));
    } catch {
      setPreview({ erro: 'JSON inválido' });
    }
  }

  function send() {
    // Troque pelo POST real quando o backend estiver pronto
    console.log('Nome dataset:', name);
    console.log('JSON:', preview ?? fileJson);
    alert('Arquivo carregado. Verifique o console. Integração futura com backend.');
  }

  return (
    <main className="container-app py-8">
      <h1 className="text-xl font-semibold mb-4">Upload de JSON</h1>

      <div className="card space-y-3">
        <input
          className="input"
          placeholder="Nome desse dataset (opcional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input type="file" accept="application/json" onChange={onFile} />

        <button className="btn" onClick={send}>Enviar</button>

        {!!preview && (
          <pre className="text-xs overflow-auto max-h-72 bg-black/30 p-3 rounded">
            {JSON.stringify(preview, null, 2)}
          </pre>
        )}
      </div>
    </main>
  );
}
