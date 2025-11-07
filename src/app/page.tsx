"use client"
import AppShell from "../components/AppShell"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useLang } from "../store/lang"

export default function Home(){
  const [apiOk, setApiOk] = useState<boolean>(false)
  const { t } = useLang()
  useEffect(()=>{(async()=>{try{const r=await fetch(`${process.env.NEXT_PUBLIC_API_URL||"http://localhost:4000"}/api/health`);const j=await r.json();setApiOk(!!j?.ok)}catch{}})()},[])
  return (
    <AppShell>
      {!apiOk && (<div className="card p-4 mb-4 border-amber-700 bg-amber-900/20"><b>Backend offline.</b> Não foi possível conectar.</div>)}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="tile"><div className="k">SWAPP</div><h2 className="text-xl font-semibold mt-1">Toolkit de Summoners War</h2><p className="opacity-80 mt-2">Interface rápida, leve e organizada. Use os atalhos abaixo.</p></div>
        <div className="tile"><div className="k">Atalhos</div><div className="flex flex-wrap gap-2 mt-2">
          <Link href="/monsters" className="btn btn-sm">{t('monsters')}</Link>
          <Link href="/optimizer" className="btn btn-sm">{t('optimizer')}</Link>
          <Link href="/import" className="btn btn-sm">{t('import')}</Link>
          <Link href="/presets" className="btn btn-sm">{t('presets')}</Link>
        </div></div>
      </div>
    </AppShell>
  )
}
