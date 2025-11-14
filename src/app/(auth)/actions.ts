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
  // TODO: invalidar sessÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o/token
  redirect("/");
}
