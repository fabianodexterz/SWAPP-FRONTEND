# SWAPP Frontend — App Router Fix (Vercel 404)

Este patch remove o conflito entre **`src/pages`** (Pages Router) e **`src/app`** (App Router) e garante que a Vercel sirva o app corretamente.

## O que tem aqui
- `middleware.ts` – redireciona `/` -> `/login` no DEV e também roda na Vercel.
- `next.config.mjs` – força `output: 'standalone'` e habilita `appDir`.
- `vercel.json` – reforço de rewrites na Vercel (root -> /login).
- `src/app/api/health/route.ts` – endpoint simples para testar (GET /api/health).

> **Importante:** Não sobrescreva sua pasta `src/app`. Apenas remova a pasta `src/pages` para acabar com o conflito.

## Passos para aplicar

1. **Remova** a pasta Pages Router (somente se estiver usando App Router):
   ```bash
   git rm -r src/pages
   ```

2. **Copie** os arquivos deste patch para a raiz do seu projeto (mesmas localizações).  
   Se já existir `next.config.mjs` ou `vercel.json`, **faça merge** do conteúdo indicado abaixo.

3. **Opcional:** Confirme que existe sua rota de login em `src/app/login/page.tsx`.
   Se a sua Home (`src/app/page.tsx`) estiver vazia, o `middleware` cuidará do redirect `/` -> `/login`.

4. **Commit e deploy**:
   ```bash
   git add .
   git commit -m "fix(frontend): remover Pages Router e padronizar App Router + middleware/rewrites"
   git push origin main
   ```

## Conteúdo dos arquivos

### `middleware.ts`
- Redireciona a raiz para `/login` quando necessário.

### `next.config.mjs`
- Usa `output: 'standalone'` para garantir **server runtime** na Vercel.
- Ativa `experimental.appDir` (App Router).

### `vercel.json`
- Fixa rewrites na Vercel (especialmente útil se o middleware não estiver ativo).

### `src/app/api/health/route.ts`
- Endpoint de teste: `GET /api/health` retorna `{ ok: true }`.

---

## Dicas
- Se você tinha **API Routes** em `src/pages/api/...`, migre para `src/app/api/<rota>/route.ts`.
- Verifique os **Logs** da Vercel após o deploy: qualquer 404 na raiz deve desaparecer.

Boa publicação! 🚀
