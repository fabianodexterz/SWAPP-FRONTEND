import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function IndexPage() {
  const router = useRouter();
  useEffect(() => {
    // Se existir /login no App Router, redireciona.
    router.replace('/login');
  }, [router]);

  return (
    <main style={{padding: 24, fontFamily: 'system-ui, sans-serif'}}>
      <h1>SWAPP</h1>
      <p>Redirecionando para <code>/login</code>…</p>
      <p>Se nada acontecer, <a href="/login">clique aqui</a>.</p>
    </main>
  );
}
