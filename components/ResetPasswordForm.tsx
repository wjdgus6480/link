"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition, type FormEvent } from "react";
import { createClient } from "@/utils/supabase/client";
import AuthLogo from "./AuthLogo";
import Button from "./Button";
import { fieldStyles, labelStyles } from "./fieldStyles";
import Toast from "./Toast";

const updateErrors: Record<string, string> = {
  weak_password: "비밀번호가 너무 약해요. 6자 이상으로 입력해 주세요.",
  same_password: "이전과 다른 비밀번호를 입력해 주세요.",
  session_not_found: "링크가 만료되었어요. 비밀번호 찾기를 다시 진행해 주세요.",
};

export default function ResetPasswordForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const closeToast = useCallback(() => setToast(null), []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password !== passwordConfirm) return setToast("비밀번호가 일치하지 않아요.");

    startTransition(async () => {
      const { error } = await createClient().auth.updateUser({ password });
      if (error) {
        setToast(updateErrors[error.code ?? ""] ?? "비밀번호 변경에 실패했어요. 다시 시도해 주세요.");
        return;
      }
      router.push("/");
      router.refresh();
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
          <label htmlFor="password" className={labelStyles}>
            새 비밀번호
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            autoComplete="new-password"
            placeholder="새 비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={fieldStyles}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="passwordConfirm" className={labelStyles}>
            새 비밀번호 확인
          </label>
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            required
            autoComplete="new-password"
            placeholder="새 비밀번호를 한 번 더 입력"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className={fieldStyles}
          />
        </div>
        <Button
          type="submit"
          disabled={!password || !passwordConfirm || pending}
          className="mt-1 w-full disabled:opacity-50"
        >
          {pending ? "변경 중…" : "비밀번호 변경"}
        </Button>
      </form>
    </div>
  );
}
