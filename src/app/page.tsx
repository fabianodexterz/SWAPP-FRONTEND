import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 style={{fontSize:32, fontWeight:700, marginBottom:12}}>SWAPP — Home</h1>
      <p style={{opacity:.8, marginBottom:16}}>Se você vê isso, o build e as rotas estão funcionando.</p>
      <Link href="/login" style={{display:'inline-block', padding:'10px 14px', borderRadius:10, background:'#111827', border:'1px solid #30363d'}}>Ir para Login</Link>
    </main>
  );
}
