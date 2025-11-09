"use client";
import React, { useEffect } from "react";
import { logoutAction } from "../actions";

export default function LogoutPage() {
  useEffect(() => { (async () => { await logoutAction(); })(); }, []);
  return <p className="text-center text-zinc-300">Saindo...</p>;
}
