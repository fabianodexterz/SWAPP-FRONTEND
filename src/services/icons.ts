import { PUBLIC_BASE, api } from "@/lib/api";

const BASE = "/api/icons";

export const iconsApi = {
  async warm(swarfarmId: number) {
    try {
      await api.get(`${BASE}/warm/${swarfarmId}`);
    } catch {
      // silencioso
    }
  },
};

export { PUBLIC_BASE };
