// src/pages/MonstersPage.tsx
import { useEffect, useMemo, useState } from 'react';
import { monstersApi, Monster, getMonsterIconUrl } from '@/services/monsters';
import { iconsApi } from '@/services/icons';
import MonsterForm from '@/components/MonsterForm'; // <-- novo import

type Filters = {
  page: number;
  limit: number;
  search?: string;
  element?: string;
  natStars?: number;
};

export default function MonstersPage() {
  const [items, setItems] = useState<Monster[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<Filters>({ page: 1, limit: 10 });

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / (filters.limit || 10))),
    [total, filters.limit]
  );

  // --------------------------
  // Função de carregar lista
  // --------------------------
  async function load() {
    setLoading(true);
    setError(null);
    try {
      const resp = await monstersApi.list(filters);
      setItems(resp.items);
      setTotal(resp.total);
    } catch (e: any) {
      setError(e.message || 'Falha ao carregar');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.page, filters.limit, filters.element, filters.search, filters.natStars]);

  function onChangeFilter<K extends keyof Filters>(key: K, val: Filters[K]) {
    setFilters((f) => ({ ...f, page: 1, [key]: val }));
  }

  // --------------------------
  // Excluir monstro
  // --------------------------
  async function onDelete(id: number) {
    if (!confirm('Tem certeza que deseja excluir este monstro?')) return;
    try {
      await monstersApi.remove(id);
      await load();
      alert('Excluído com sucesso!');
    } catch (e: any) {
      alert(e.message || 'Falha ao excluir');
    }
  }

  // --------------------------
  // Editar nome do monstro
  // --------------------------
  async function onEditName(id: number, currentName: string) {
    const novoNome = prompt('Novo nome', currentName);
    if (!novoNome || novoNome === currentName) return;
    try {
      await monstersApi.update(id, { name: novoNome });
      await load();
      alert('Atualizado!');
    } catch (e: any) {
      alert(e.message || 'Falha ao atualizar');
    }
  }

  // --------------------------
  // “Pré-aquecer” ícone (cache)
  // --------------------------
  async function warmIcon(swarfarmId: number) {
    try {
      await iconsApi.warm(swarfarmId);
    } catch {
      // silencioso — só otimização
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>Monstros</h1>

      {/* 🔹 Formulário de criação */}
      <MonsterForm onCreated={load} />

      {/* 🔹 Filtros */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          placeholder="Buscar por nome ou ID"
          value={filters.search || ''}
          onChange={(e) => onChangeFilter('search', e.target.value)}
        />
        <select
          value={filters.element || ''}
          onChange={(e) => onChangeFilter('element', e.target.value || undefined)}
        >
          <option value="">Elemento</option>
          <option>Fire</option>
          <option>Water</option>
          <option>Wind</option>
          <option>Light</option>
          <option>Dark</option>
        </select>
        <select
          value={String(filters.natStars || '')}
          onChange={(e) => {
            const v = e.target.value.trim();
            onChangeFilter('natStars', v ? Number(v) : undefined);
          }}
        >
          <option value="">★</option>
          <option value="3">3★</option>
          <option value="4">4★</option>
          <option value="5">5★</option>
          <option value="6">6★</option>
        </select>
        <select
          value={String(filters.limit)}
          onChange={(e) => onChangeFilter('limit', Number(e.target.value))}
        >
          <option value="10">10 por pág.</option>
          <option value="20">20 por pág.</option>
          <option value="50">50 por pág.</option>
        </select>
      </div>

      {/* 🔹 Tabela */}
      {loading ? (
        <div>Carregando…</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <>
          <table width="100%" cellPadding={8} style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', background: '#f3f3f3' }}>
                <th>Ícone</th>
                <th>Id</th>
                <th>SwarfarmId</th>
                <th>Nome</th>
                <th>Elemento</th>
                <th>Archetype</th>
                <th>★</th>
                <th>Awk</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map((m) => (
                <tr key={m.id} style={{ borderTop: '1px solid #eee' }}>
                  <td>
                    <img
                      src={getMonsterIconUrl(m.swarfarmId)}
                      width={40}
                      height={40}
                      alt={m.name}
                      onLoad={() => warmIcon(m.swarfarmId)}
                      onError={(ev) => ((ev.currentTarget as HTMLImageElement).style.visibility = 'hidden')}
                      style={{ borderRadius: 6 }}
                    />
                  </td>
                  <td>{m.id}</td>
                  <td>{m.swarfarmId}</td>
                  <td>{m.name}</td>
                  <td>{m.element}</td>
                  <td>{m.archetype}</td>
                  <td>{m.natStars}★</td>
                  <td>{m.awakened ? 'Sim' : 'Não'}</td>
                  <td style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => onEditName(m.id, m.name)}>Editar</button>
                    <button onClick={() => onDelete(m.id)}>Excluir</button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: 24, color: '#888' }}>
                    Nenhum registro encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* 🔹 Paginação */}
          <div style={{ display: 'flex', gap: 8, marginTop: 12, alignItems: 'center' }}>
            <button
              disabled={filters.page <= 1}
              onClick={() => setFilters(f => ({ ...f, page: f.page - 1 }))}
            >
              ◀ Anterior
            </button>
            <span>
              Página {filters.page} de {totalPages}
            </span>
            <button
              disabled={filters.page >= totalPages}
              onClick={() => setFilters(f => ({ ...f, page: f.page + 1 }))}
            >
              Próxima ▶
            </button>
          </div>
        </>
      )}
    </div>
  );
}


export async function getServerSideProps(){
  return { props: {} };
}
