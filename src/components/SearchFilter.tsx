'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

/**
 * Hook de debounce sem dependências externas.
 * Retorna uma função memoizada que só executa após `delay` ms sem novas chamadas.
 */
function useDebouncedCallback<T extends any[]>(
  fn: (...args: T) => void,
  delay = 300
) {
  const fnRef = React.useRef(fn);
  const timerRef = React.useRef<number | null>(null);

  // Mantém sempre a versão mais recente da função
  React.useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const callback = React.useCallback(
    (...args: T) => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
      timerRef.current = window.setTimeout(() => {
        fnRef.current(...args);
      }, delay);
    },
    [delay]
  );

  // Cleanup
  React.useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return callback;
}

type Props = {
  /** placeholder do input */
  placeholder?: string;
  /** chave do query param (default: 'q') */
  queryKey?: string;
  /** atraso do debounce em ms (default: 300) */
  delay?: number;
  /** classes extras */
  className?: string;
  /** valor inicial opcional */
  defaultValue?: string;
};

/**
 * Componente de filtro/busca que sincroniza o valor com a URL (?q=...)
 * e faz debounce para evitar muitas navegações.
 */
export default function SearchFilter({
  placeholder = 'Buscar…',
  queryKey = 'q',
  delay = 300,
  className = 'input w-full',
  defaultValue,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initial = defaultValue ?? (searchParams.get(queryKey) ?? '');
  const [value, setValue] = React.useState<string>(initial);

  const applyQuery = useDebouncedCallback((val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val && val.trim()) params.set(queryKey, val.trim());
    else params.delete(queryKey);

    // opcional: resetar paginação ao filtrar
    params.delete('page');

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, delay);

  // dispara a atualização com debounce quando o value muda
  React.useEffect(() => {
    applyQuery(value);
  }, [value, applyQuery]);

  return (
    <input
      className={className}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      aria-label="Filtro de busca"
    />
  );
}
