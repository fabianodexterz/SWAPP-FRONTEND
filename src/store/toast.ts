// src/store/toast.ts
import { create } from "zustand";

export type ToastKind = "success" | "error" | "info" | "warning";

type ToastState = {
  last?: { message: string; type: ToastKind; at: number };
  showToast: (message: string, type?: ToastKind) => void;
};

export const useToastStore = create<ToastState>((set) => ({
  last: undefined,
  showToast: (message, type = "info") =>
    set({ last: { message, type, at: Date.now() } }),
}));
