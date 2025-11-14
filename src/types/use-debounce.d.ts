// src/types/use-debounce.d.ts
declare module 'use-debounce' {
  export function useDebouncedCallback<T extends (...args: any[]) => any>(
    func: T,
    delay: number,
    deps?: React.DependencyList
  ): T;
}
