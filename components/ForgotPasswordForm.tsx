"use client";

import Link from "next/link";
import { useCallback, useState, useTransition, type FormEvent } from "react";
import { createClient } from "@/utils/supabase/client";
import AuthLogo from "./AuthLogo";
import Button from "./Button";
import { fieldStyles, labelStyles } from "./fieldStyles";
import Toast from "./Toast";

export default function ForgotPasswordForm() {
  const [pending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const closeToast = useCallback(() => setToast(null), []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      const { error } = await createClient().auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      });
      if (error) {
        setToast(
          error.code === "over_email_send_rate_limit"
            ? "요청이 너무 많아요. 잠시 후 다시 시도해 주세요."
            : "메일 발송에 실패했어요. 다시 시도해 주세요.",
        );
        return;
      }
      setSent(true);
    });
  }

  return (
    <div className="flex flex-col gap-7">
      <Toast message={toast} onClose={closeToast} />
      <AuthLogo />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3.5 rounded-2xl bg-[var(--surface)] p-5 shadow-[var(--shadow)]"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className={labelStyles}>
            이메일
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoFocus
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldStyles}
          />
        </div>
        {sent && (
          <p role="status" className="text-[13px] leading-[1.4] text-[var(--text-sub)]">
            비밀번호 재설정 링크를 보냈어요. 메일함을 확인해 주세요.
          </p>
        )}
        <Button type="submit" disabled={!email || pending} className="mt-1 w-full disabled:opacity-50">
          {pending ? "발송 중…" : "비밀번호 재설정 링크 보내기"}
        </Button>
      </form>
      <p className="text-center text-sm text-[var(--text-sub)]">
        <Link href="/login" className="font-bold text-[var(--accent)] underline-offset-2 hover:underline">
          로그인으로 돌아가기
        </Link>
      </p>
    </div>
  );
}
