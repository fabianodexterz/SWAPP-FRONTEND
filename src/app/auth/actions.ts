"use server";

import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Preencha todos os campos.");
  }

  // Aqui você conectará com seu backend futuramente
  console.log("Login:", { email, password });

  redirect("/dashboard");
}

export async function registerAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Preencha todos os campos.");
  }

  console.log("Registro:", { email, password });

  redirect("/login");
}

export async function logoutAction() {
  console.log("Usuário deslogado");
  redirect("/");
}
