"use client";
import { useState } from "react";

export default function Forgot() {
  const [email, setEmail] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: enviar para /auth/forgot (sua API)
    alert("Se existir uma conta com este e-mail, enviaremos instruções.");
  };

  return (
    <section className="min-h-[70vh] flex items-center justify-center">
      <div className="card w-full max-w-xl">
        <h1 className="text-2xl font-semibold mb-2 text-center">Recuperar acesso</h1>
        <p className="text-sm text-gray-400 text-center mb-6">
          Informe seu e-mail para receber o link de redefinição de senha.
        </p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-sm block mb-1">E-mail</label>
            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="voce@exemplo.com"
              required
            />
          </div>

          <button type="submit" className="btn w-full">Enviar instruções</button>
        </form>

        <div className="mt-6 text-center">
          <a className="link" href="/login">Voltar ao login</a>
        </div>
      </div>
    </section>
  );
}
