'use client';
import { useEffect, useState } from 'react';
import Protected from '@/components/Protected';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export default function SettingsPage(){
  const [name,setName] = useState('')
  const [newEmail,setNewEmail] = useState('')
  const [currentPassword,setCurrentPassword] = useState('')
  const [newPassword,setNewPassword] = useState('')
  const [msg,setMsg] = useState<string|null>(null)
  const [err,setErr] = useState<string|null>(null)

  async function fetchMe(){
    const token = localStorage.getItem('token')
    const resp = await fetch(`${API}/users/me`,{
      headers:{ Authorization: `Bearer ${token}` }, credentials:'include'
    })
    if(resp.ok){
      const u = await resp.json()
      setName(u.name || ''); setNewEmail(u.email || '')
    }
  }

  useEffect(()=>{ fetchMe() },[])

  async function onSubmit(e:React.FormEvent){
    e.preventDefault(); setErr(null); setMsg(null)
    try{
      const token = localStorage.getItem('token')
      const body:any = { name }
      if(newEmail) body.newEmail = newEmail
      if(newPassword) body.newPassword = newPassword
      if(body.newEmail || body.newPassword) body.currentPassword = currentPassword

      const resp = await fetch(`${API}/users/me`,{
        method:'PUT', headers:{ 'Content-Type':'application/json', Authorization: `Bearer ${token}` },
        credentials:'include', body: JSON.stringify(body)
      })
      if(!resp.ok) throw new Error(await resp.text())
      setMsg('Dados salvos.'); setCurrentPassword(''); setNewPassword(''); await fetchMe()
    }catch(e:any){ setErr(e.message || 'Falha ao salvar') }
  }

  return (
    <Protected>
      <div className="max-w-xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Configurações</h1>
        {msg && <div className="text-emerald-300 text-sm">{msg}</div>}
        {err && <div className="text-red-300 text-sm">{err}</div>}
        <form onSubmit={onSubmit} className="space-y-3">
          <div><label className="text-sm text-zinc-300">Nome</label>
            <input className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2"
              value={name} onChange={e=>setName(e.target.value)} /></div>
          <div><label className="text-sm text-zinc-300">Novo e-mail</label>
            <input className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2"
              value={newEmail} onChange={e=>setNewEmail(e.target.value)} /></div>
          <div><label className="text-sm text-zinc-300">Senha atual</label>
            <input type="password" className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2"
              value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} /></div>
          <div><label className="text-sm text-zinc-300">Nova senha</label>
            <input type="password" className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2"
              value={newPassword} onChange={e=>setNewPassword(e.target.value)} /></div>
          <button className="rounded bg-blue-600 hover:bg-blue-500 px-4 py-2">Salvar</button>
        </form>
      </div>
    </Protected>
  )
}
