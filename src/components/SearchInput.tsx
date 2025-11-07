'use client';
import { useDebouncedCallback } from 'use-debounce';
import { useEffect, useState } from 'react';

type Props = {
  placeholder?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
};

export default function SearchInput({ placeholder, defaultValue = '', onChange }: Props) {
  const [value, setValue] = useState(defaultValue);
  const debounced = useDebouncedCallback((v: string) => onChange(v), 300);

  useEffect(() => {
    debounced(value);
  }, [value]);

  return (
    <input
      className="input"
      placeholder={placeholder ?? 'Buscar...'}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
