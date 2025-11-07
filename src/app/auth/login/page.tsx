import { Suspense } from "react";
import LoginClient from "./LoginClient";
export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense>
      <LoginClient />
    </Suspense>
  );
}
