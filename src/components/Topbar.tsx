export default function Topbar() {
  return (
    <div className="navbar bg-[#11131a] border-b border-[#232636]">
      <div className="flex-1 px-4">
        <span className="text-xl font-bold text-[var(--brand-gold)]">SWApp v3.0</span>
      </div>
      <div className="flex gap-2 px-4">
        <a className="btn btn-sm btn-ghost" href="/">Monstros</a>
        <a className="btn btn-sm btn-ghost" href="/optimizer">Otimizador</a>
        <a className="btn btn-sm btn-ghost" href="/presets">Presets</a>
        <a className="btn btn-sm btn-ghost" href="/teams">Equipes</a>
      </div>
    </div>
  )
}
