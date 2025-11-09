'use client';

import React from 'react';

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

  // mantém a referência da função sempre atualizada
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

  // cleanup
  React.useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return callback;
}

type Props = {
  /** Valor controlado (opcional). Se não informado, usa estado interno com defaultValue */
  value?: string;
  /** Valor inicial quando não controlado */
  defaultValue?: string;
  /** Dispara imediatamente a cada digitação */
  onChange?: (val: string) => void;
  /** Dispara apenas após o debounce (ex.: buscar na API) */
  onDebouncedChange?: (val: string) => void;
  /** Placeholder do input */
  placeholder?: string;
  /** Delay do debounce (ms). Padrão: 300 */
  delay?: number;
  /** Classe CSS do input */
  className?: string;
  /** Tipo do input */
  type?: 'text' | 'search';
  /** Autofocus */
  autoFocus?: boolean;
  /** Atributos extras do input */
  name?: string;
  id?: string;
  ariaLabel?: string;
};

export default function SearchInput({
  value,
  defaultValue = '',
  onChange,
  onDebouncedChange,
  placeholder = 'Buscar…',
  delay = 300,
  className = 'input w-full',
  type = 'search',
  autoFocus,
  name,
  id,
  ariaLabel,
}: Props) {
  const isControlled = value !== undefined;
  const [inner, setInner] = React.useState<string>(isControlled ? value! : defaultValue);

  // Mantém estado interno sincronizado quando controlado
  React.useEffect(() => {
    if (isControlled) setInner(value!);
  }, [isControlled, value]);

  const debouncedEmit = useDebouncedCallback((val: string) => {
    onDebouncedChange?.(val);
  }, delay);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!isControlled) setInner(val);      // componente não controlado
    onChange?.(val);                       // emite imediato
    debouncedEmit(val);                    // emite apenas após debounce
  };

  return (
    <input
      id={id}
      name={name}
      type={type}
      className={className}
      value={isControlled ? value : inner}
      onChange={handleChange}
      placeholder={placeholder}
      autoFocus={autoFocus}
      aria-label={ariaLabel ?? 'Campo de busca'}
    />
  );
}
