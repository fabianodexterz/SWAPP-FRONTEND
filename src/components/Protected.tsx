'use client';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Protected({ children }:{ children: React.ReactNode }){
  const [ok,setOk] = useState(false)
  const router = useRouter()
  useEffect(()=>{
    const t = localStorage.getItem('token')
    if(!t) router.replace('/login'); else setOk(true)
  },[router])
  if(!ok) return null
  return <>{children}</>
}
