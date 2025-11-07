'use client'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const { logout } = useAuth()
  const router = useRouter()
  return (
    <button
      onClick={() => { logout(); router.replace('/login') }}
      className="text-sm px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700"
    >
      Sair
    </button>
  )
}
