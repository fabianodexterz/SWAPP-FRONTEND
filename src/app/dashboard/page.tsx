// src/app/dashboard/page.tsx
import MiniBar from '@/components/MiniBar'

type OverviewResponse = {
  totals: {
    monsters: number
    runes: number
    artifacts: number
  }
  byElement: { label: string; value: number; color?: string }[]
}

// Carrega dados da API com fallback seguro (não quebra build)
async function getDashboardData(): Promise<OverviewResponse> {
  try {
    const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'
    const res = await fetch(`${api}/stats/overview`, {
      // revalidate: 60 => se quiser ISR
      next: { revalidate: 60 },
    })
    if (!res.ok) throw new Error('bad status')
    return (await res.json()) as OverviewResponse
  } catch {
    // Fallback para não travar a build
    return {
      totals: { monsters: 0, runes: 0, artifacts: 0 },
      byElement: [
        { label: 'Fogo', value: 0, color: '#c44d34' },
        { label: 'Água', value: 0, color: '#2b6cb0' },
        { label: 'Vento', value: 0, color: '#2f855a' },
        { label: 'Luz', value: 0, color: '#d69e2e' },
        { label: 'Trevas', value: 0, color: '#4a5568' },
      ],
    }
  }
}

export const metadata = {
  title: 'Dashboard • SWAPP',
}

export default async function DashboardPage() {
  const data = await getDashboardData()
  const { totals, byElement } = data

  return (
    <main className="container-app py-6">
      <h1 className="text-2xl font-semibold text-gold-200 drop-shadow-gold-soft">
        Visão geral
      </h1>

      {/* Cards resumidos */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="card p-4">
          <div className="text-sm text-gray-400">Monstros</div>
          <div className="text-2xl font-bold text-gold-100">{totals.monsters}</div>
        </div>

        <div className="card p-4">
          <div className="text-sm text-gray-400">Runas</div>
          <div className="text-2xl font-bold text-gold-100">{totals.runes}</div>
        </div>

        <div className="card p-4">
          <div className="text-sm text-gray-400">Artefatos</div>
          <div className="text-2xl font-bold text-gold-100">{totals.artifacts}</div>
        </div>
      </section>

      {/* Distribuição por elemento */}
      <section className="card mt-6 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gold-100">Por elemento</h2>
        </div>

        <div className="mt-3">
          <MiniBar
            data={byElement.map(d => ({
              label: d.label,
              value: d.value,
              color: d.color,
            }))}
            height={140}
            showValues
          />
        </div>
      </section>
    </main>
  )
}
