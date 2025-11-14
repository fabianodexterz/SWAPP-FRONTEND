'use client'
import { useEffect, useState } from 'react'

export default function ProfilePage() {
  const [email, setEmail] = useState('user@domain')

  useEffect(() => {
    // sÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â³ um ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œplaceholderÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡ÃƒÂ¯Ã‚Â¿Ã‚Â½ ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¯Ã‚Â¿Ã‚Â½ pegue do backend quando tiver /me
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
