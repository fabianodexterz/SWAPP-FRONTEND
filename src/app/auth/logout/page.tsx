'use client';

import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Api } from '@/lib/api'; // o helper que criamos (Api(path, init))

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        // tenta pegar token do localStorage ou cookie
        const token =
          localStorage.getItem('swapp_token') ||
          Cookies.get('swapp_token') ||
          '';

        // se tiver token, avisa o backend (ignora qualquer erro de rede)
        if (token) {
          await Api('/auth/logout', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).catch(() => {});
        }
      } finally {
        // limpa tudo do lado do cliente
        Cookies.remove('swapp_token');          // token da API (se usar cookie)
        document.cookie = 'auth=; Max-Age=0; path=/'; // cookie usado no middleware
        localStorage.removeItem('swapp_token'); // token da API (se usar localStorage)

        // volta pro login
        router.replace('/login');
      }
    })();
  }, [router]);

  // Não precisa renderizar nada
  return null;
}
