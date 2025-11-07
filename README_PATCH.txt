# Patch v3 - Correção 404 na Vercel (Next.js App Router)

Arquivos incluídos (substitua/adicione no mesmo caminho do projeto):
- `next.config.mjs`  → força build server (remove qualquer output: "export").
- `middleware.ts`    → redireciona `/` para `/login` e evita 404 mesmo sem rota.
- `src/app/page.tsx` → fallback simples.

## Passo a passo
1) Extraia o conteúdo deste zip na raiz do **frontend** (mesmo nível do package.json).
2) Confirme que **NÃO** existe `next.config.js` antigo conflitando e **NÃO** há `output: "export"` em nenhum lugar.
3) Commit e push:
   ```powershell
   git add .
   git commit -m "fix: 404 na Vercel (middleware + next.config)"
   git push origin main
   ```
4) Na Vercel, aguarde o deploy concluir e abra:
   - `https://swapp-frontend.vercel.app/`
   - `https://app.swap.dev.br/`
