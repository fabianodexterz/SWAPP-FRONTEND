import Link from "next/link";

export default function LoginPage() {
  return (
    <main>
      <h1 style={{fontSize:32, fontWeight:700, marginBottom:12}}>SWAPP — Login</h1>
      <p style={{opacity:.8, marginBottom:24}}>Deploy OK ✅ — rota / redirecionada para /login via <code>vercel.json</code>.</p>
      <form style={{display:'grid', gap:12, maxWidth:420}}>
        <input placeholder="Email" type="email" required style={{padding:'12px 14px', borderRadius:10, border:'1px solid #30363d', background:'#0b0d12', color:'#e5e7eb'}} />
        <input placeholder="Senha" type="password" required style={{padding:'12px 14px', borderRadius:10, border:'1px solid #30363d', background:'#0b0d12', color:'#e5e7eb'}} />
        <button type="submit" style={{padding:'12px 14px', borderRadius:10, background:'#8b5cf6', color:'#fff', border:'none', fontWeight:600}}>Entrar</button>
      </form>
      <p style={{marginTop:16, opacity:.8}}>
        <Link href="/">Voltar para Home</Link>
      </p>
    </main>
  );
}
