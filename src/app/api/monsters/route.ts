export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
  const url = new URL(req.url);
  const qs = url.search ? url.search : '';
  const upstream = `${base.replace(/\/$/, '')}/api/monsters${qs}`;

  try {
    const res = await fetch(upstream, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });

    const text = await res.text().catch(() => '');

    if (!res.ok) {
      return new Response(text || JSON.stringify({ error: `Upstream ${res.status}` }), {
        status: res.status,
        headers: { 'content-type': 'application/json; charset=utf-8' },
      });
    }

    try {
      return Response.json(JSON.parse(text));
    } catch {
      return new Response(text, {
        status: 200,
        headers: { 'content-type': 'application/json; charset=utf-8' },
      });
    }
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || 'Proxy falhou' }), { status: 502 });
  }
}
