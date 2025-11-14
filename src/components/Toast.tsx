"use client";

import { useCallback } from "react";
import { useToastStore } from "@/store/toast";

export function useToast() {
  const store = useToastStore();

  // Tenta resolver dinamicamente qual mÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©todo existe
  const showFn =
    (store as any).addToast ||
    (store as any).showToast ||
    (store as any).push ||
    ((msg: string, type?: string) => {
      console.warn("Nenhum mÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©todo de toast encontrado:", msg, type);
    });

  const removeFn =
    (store as any).removeToast ||
    (store as any).clearToast ||
    (() => {});

  return {
    success: useCallback(
      (msg: string) => showFn(msg, "success"),
      [showFn]
    ),
    error: useCallback(
      (msg: string) => showFn(msg, "error"),
      [showFn]
    ),
    info: useCallback(
      (msg: string) => showFn(msg, "info"),
      [showFn]
    ),
    remove: useCallback(() => removeFn(), [removeFn]),
  };
}
