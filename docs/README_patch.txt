SWAPP — Patch rápido (frontend)

✅ O que este patch faz
1) Corrige o tsconfig.json (estava com chaves/paths duplicados), garantindo que o alias '@/…' funcione.
2) Centraliza os ícones em src/lib/ui.ts (ELEMENT_ICON, RUNE_ICON, ARENA_RANK_ICON) apontando para /public/icons/**.
3) Adiciona um componente de botão Voltar (src/components/BackButton.tsx) para usar nas telas do Otimizador.
4) Observações para você aplicar no projeto (2 linhas por arquivo): 
   • Trocar imports que estavam como '@src/…' para '@/…' (ex.: import { ELEMENT_ICON } from '@/lib/ui').
   • Garantir que o fetch use a URL do backend: const API = process.env.NEXT_PUBLIC_API_URL || ''; 
     -> .env.local: NEXT_PUBLIC_API_URL=http://localhost:3001

📌 Como aplicar
1) Feche o dev server do Next.
2) Copie os arquivos deste patch para sua pasta do frontend (sobrescreva tsconfig.json e adicione src/lib/ui.ts + src/components/BackButton.tsx).
3) Confira se seus arquivos que usam ícones importam de '@/lib/ui'.
4) Rode: npm i && npm run dev

🔗 Dicas de uso
- Header “SWAPP” como link para /monsters: deixe o texto dentro de <Link href="/monsters">SWAPP</Link> (em layout.tsx ou no seu componente de TopBar).
- Botão Voltar nas telas do Otimizador:
    import BackButton from '@/components/BackButton';
    ...
    <div className="flex justify-end mb-4"><BackButton href="/otimizador" /></div>

Se quiser que eu gere os arquivos de página já com o botão inserido, me diga os paths exatos
(por ex.: src/app/otimizador/presets/page.tsx e src/app/otimizador/relatorios/page.tsx) e eu mando pronto.
