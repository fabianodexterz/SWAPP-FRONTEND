"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import LangToggle from "./LangToggle"
import { useLang } from "../store/lang"

function StatusPill({ ok }: { ok:boolean }) {
  return <span className={"px-2 py-0.5 text-xs rounded-full " + (ok ? "bg-emerald-900/40 text-emerald-300" : "bg-rose-900/40 text-rose-300")}>{ok ? "OK" : "OFF"}</span>
}

export default function AppShell({ children }:{ children: React.ReactNode }){
  const [apiOk, setApiOk] = useState<boolean>(false)
  const [dbOk, setDbOk] = useState<boolean>(false)
  const { t } = useLang()

  useEffect(()=>{
    const check = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/health`)
        const j = await res.json()
        if (j?.ok) { setApiOk(true); setDbOk(true) }
      } catch {}
    }
    check()
    const tmr = setInterval(check, 10000)
    return ()=>clearInterval(tmr)
  },[])

  return (
    <div className="min-h-screen">
      <div className="navbar bg-[#0e1118] border-b border-[#232636]">
        <div className="flex-1 px-4">
          <Link href="/" className="text-xl font-bold text-[var(--brand-gold)]">SWAPP</Link>
        </div>
        <div className="flex gap-2 px-4 items-center">
          <LangToggle />
          <Link href="/login" className="btn btn-sm btn-ghost">{t('login')}</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 grid md:grid-cols-[260px,1fr] gap-6">
        <aside className="card p-4 h-fit sticky top-4">
          <nav className="flex flex-col gap-2">
            <Link href="/" className="btn btn-ghost justify-start">{t('home')}</Link>
            <Link href="/monsters" className="btn btn-ghost justify-start">{t('monsters')}</Link>
            <Link href="/optimizer" className="btn btn-ghost justify-start">{t('optimizer')}</Link>
            <Link href="/import" className="btn btn-ghost justify-start">{t('import')}</Link>
            <Link href="/presets" className="btn btn-ghost justify-start">{t('presets')}</Link>
          </nav>
          <div className="mt-6">
            <div className="k mb-2">{t('status')}</div>
            <div className="flex items-center justify-between text-sm">
              <span>{t('backend')}</span> <StatusPill ok={apiOk} />
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span>{t('db')}</span> <StatusPill ok={dbOk} />
            </div>
          </div>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  )
}
