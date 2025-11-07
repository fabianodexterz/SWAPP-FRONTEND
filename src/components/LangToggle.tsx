'use client'
import { useLang } from '../store/lang'
export default function LangToggle(){
  const { locale, setLocale } = useLang()
  return (
    <div className="join">
      <button className={`btn btn-sm join-item ${locale==='pt-BR'?'btn-primary':''}`} onClick={()=>setLocale('pt-BR')}>PT</button>
      <button className={`btn btn-sm join-item ${locale==='en-US'?'btn-primary':''}`} onClick={()=>setLocale('en-US')}>EN</button>
    </div>
  )
}
