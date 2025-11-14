'use client';

import Link from 'next/link';
import type { Route } from 'next';

type BackButtonProps = {
  /** Rota de destino. Ex.: "/monsters", "/optimizer" */
  href?: Route | string;
  /** Texto do botÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o */
  label?: string;
  /** Classes extras opcionais */
  className?: string;
};

/**
 * BotÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o de voltar/navegar.
 * CompatÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­vel com `typedRoutes`: converte `string` para `Route` de forma segura.
 */
export default function BackButton({
  href = '/',
  label = 'Voltar',
  className,
}: BackButtonProps) {
  // Se vier string, fazemos o cast explÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­cito para Route (Next typedRoutes)
  const resolvedHref: Route =
    (typeof href === 'string' ? (href as Route) : href) ?? ('/' as Route);

  return (
    <Link
      href={resolvedHref}
      prefetch={false}
      className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-sm hover:opacity-90 ${className ?? ''}`}
      style={{ background: '#2b2218', borderColor: '#4b3b28', color: '#f6d08f' }}
    >
      {label}
    </Link>
  );
}
