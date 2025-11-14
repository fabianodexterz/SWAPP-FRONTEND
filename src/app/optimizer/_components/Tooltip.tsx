"use client";

import React, { useState } from "react";

type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
};

export default function Tooltip({ content, children }: TooltipProps) {
  const [open, setOpen] = useState(false);
  return (
    <span
      className="relative inline-flex items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
      {open && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-xs text-white shadow">
          {content}
        </span>
      )}
    </span>
  );
}
