"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { createClient } from "@/utils/supabase/client";
import { compactSecondaryButtonStyles } from "./Button";

export default function LogoutButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await createClient().auth.signOut();
      router.push("/login");
      router.refresh();
    });
  }

  return (
    <button type="button" onClick={handleLogout} disabled={pending} className={compactSecondaryButtonStyles}>
      {pending ? "로그아웃 중…" : "로그아웃"}
    </button>
  );
}
