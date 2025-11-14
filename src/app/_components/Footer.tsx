// src/app/_components/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 md:flex-row md:items-start md:justify-between md:py-10">
        <div className="max-w-md space-y-2">
          <h3 className="text-sm font-semibold text-white">SWAPP • Summoners War App</h3>
          <p className="text-xs text-white/60">
            Painel premium para gerenciar sua conta, runas, presets e builds otimizadas.
            Rápido, elegante e pensado para quem leva Summoners War a sério.
          </p>
          <p className="text-[11px] text-white/40">
            Ambiente seguro • API: https://api.swapp.dev.br
          </p>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-6 text-xs text-white/60 md:grid-cols-3">
          <div>
            <h4 className="text-xs font-semibold text-white">Acesso rápido</h4>
            <ul className="mt-2 space-y-1">
              <li><a href="/dashboard" className="hover:text-white">Dashboard</a></li>
              <li><a href="/optimizer" className="hover:text-white">Otimizador</a></li>
              <li><a href="/runes" className="hover:text-white">Runas</a></li>
              <li><a href="/presets" className="hover:text-white">Presets</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white">Conta</h4>
            <ul className="mt-2 space-y-1">
              <li><a href="/login" className="hover:text-white">Login</a></li>
              <li><a href="/register" className="hover:text-white">Criar conta</a></li>
              <li><a href="/settings" className="hover:text-white">Configurações</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white">Projeto</h4>
            <ul className="mt-2 space-y-1">
              <li><span className="text-white/50">v1.0 • Preview</span></li>
              <li><span className="text-white/50">Kai • Assistente técnico</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-3">
        <p className="text-center text-[11px] text-white/40">
          SWAPP não é afiliado à Com2uS. Todos os direitos sobre Summoners War pertencem aos seus respectivos proprietários.
        </p>
      </div>
    </footer>
  );
}
