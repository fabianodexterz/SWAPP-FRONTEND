export const dynamic = 'force-dynamic';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const base = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!base) return new Response(JSON.stringify({ error: 'BACKEND_URL não configurada' }), { status: 500 });

  try {
    const res = await fetch(`${base.replace(/\/$/, '')}/api/monsters/${params.id}`, { cache: 'no-store' });
    if (!res.ok) return new Response(await res.text(), { status: res.status });
    return Response.json(await res.json());
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || 'Proxy falhou' }), { status: 502 });
  }
}
