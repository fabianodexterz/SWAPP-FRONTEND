import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-zinc-800/60 bg-zinc-900/60 p-6 shadow-xl backdrop-blur">
        {children}
      </div>
    </div>
  );
}
