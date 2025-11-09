"use server";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();
  if (!email || !password) throw new Error("Preencha e-mail e senha.");
  // TODO: POST em seu backend: /auth/login
  redirect("/dashboard");
}

export async function registerAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();
  if (!email || !password) throw new Error("Preencha e-mail e senha.");
  // TODO: POST em seu backend: /auth/register
  redirect("/login");
}

export async function logoutAction() {
  // TODO: invalidar sessão/token
  redirect("/");
}
