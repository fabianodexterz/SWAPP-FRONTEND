"use client";

import Image from "next/image";
import ElementIcon, { ElementName } from "@/components/ElementIcon";

type Props = {
  title: string;
  mode?: "RTA" | "Arena" | "Cairos";
  element?: ElementName;
  onOpen?: () => void;
};

export default function PresetCard({ title, mode = "RTA", element = "Wind", onOpen }: Props) {
  return (
    <div className="rounded-2xl bg-[#111319] ring-1 ring-white/5 p-4 shadow-card">
      <div className="flex items-center gap-3">
        <ElementIcon element={element} size={28} />
        <div className="flex-1">
          <h3 className="text-white/90 font-semibold">{title}</h3>
          <p className="text-white/50 text-sm">{mode}</p>
        </div>
        <button
          onClick={onOpen}
          className="btn btn-sm bg-[#cbb797] text-black hover:brightness-110 rounded-xl"
        >
          Abrir
        </button>
      </div>

      <div className="mt-4">
        <Image
          src="/og-image.png"
          alt="Preview"
          width={720}
          height={360}
          className="w-full h-28 object-cover rounded-xl ring-1 ring-white/5"
        />
      </div>
    </div>
  );
}
