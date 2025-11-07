'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Api } from '@/lib/api'
import Cookies from 'js-cookie'

export default function Logout() {
  const router = useRouter()
  useEffect(()=>{
    const token = localStorage.getItem('swapp_token') || ''
    if(token){ Api.logout(token).catch(()=>{}) }
    Cookies.remove('swapp_token')
    localStorage.removeItem('swapp_token')
    router.replace('/login')
  },[router])
  return <div className='p-6'>Saindo...</div>
}
