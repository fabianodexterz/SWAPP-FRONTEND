'use client'
import { useEffect, useState } from 'react'

export default function ProfilePage() {
  const [email, setEmail] = useState('user@domain')

  useEffect(() => {
    // só um “placeholder” — pegue do backend quando tiver /me
    const token = document.cookie.split('; ').find(c=>c.startsWith('swapp_token='))?.split('=')[1]
    if (token) setEmail('fabianodexterz@gmail.com')
  }, [])

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Perfil</h1>
      <div className="glass p-6">
        <div className="text-neutral-300">E-mail: <span className="font-medium text-white">{email}</span></div>
      </div>
    </section>
  )
}
