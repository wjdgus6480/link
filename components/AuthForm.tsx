"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition, type FormEvent } from "react";
import { createClient } from "@/utils/supabase/client";
import AuthLogo from "./AuthLogo";
import Button from "./Button";
import { fieldStyles, labelStyles } from "./fieldStyles";
import KakaoLoginButton from "./KakaoLoginButton";
import Toast from "./Toast";

type AuthFormProps = {
  mode: "login" | "signup";
};

const copy = {
  login: { submit: "로그인", prompt: "아직 계정이 없나요?", linkText: "회원가입", href: "/signup" },
  signup: { submit: "회원가입", prompt: "이미 계정이 있나요?", linkText: "로그인", href: "/login" },
};

const signUpErrors: Record<string, string> = {
  user_already_exists: "이미 가입된 이메일이에요.",
  email_exists: "이미 가입된 이메일이에요.",
  weak_password: "비밀번호가 너무 약해요. 6자 이상으로 입력해 주세요.",
  email_address_invalid: "올바른 이메일 주소를 입력해 주세요.",
  validation_failed: "입력한 정보를 다시 확인해 주세요.",
  over_email_send_rate_limit: "요청이 너무 많아요. 잠시 후 다시 시도해 주세요.",
  over_request_rate_limit: "요청이 너무 많아요. 잠시 후 다시 시도해 주세요.",
  signup_disabled: "현재 회원가입을 할 수 없어요.",
};

const signInErrors: Record<string, string> = {
  invalid_credentials: "이메일 또는 비밀번호가 올바르지 않아요.",
  email_not_confirmed: "이메일 인증이 필요해요. 메일함을 확인해 주세요.",
  user_banned: "이용이 제한된 계정이에요.",
  over_request_rate_limit: "요청이 너무 많아요. 잠시 후 다시 시도해 주세요.",
};

export default function AuthForm({ mode }: AuthFormProps) {
  const { submit, prompt, linkText, href } = copy[mode];
  const isSignup = mode === "signup";
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [toast, setToast] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const closeToast = useCallback(() => setToast(null), []);

  const canSubmit = Boolean(email && password && (!isSignup || passwordConfirm));

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSignup && password !== passwordConfirm) return setToast("비밀번호가 일치하지 않아요.");

    startTransition(async () => {
      const auth = createClient().auth;
      const { error } = isSignup
        ? await auth.signUp({ email, password })
        : await auth.signInWithPassword({ email, password });
      if (error) {
        const errors = isSignup ? signUpErrors : signInErrors;
        setToast(errors[error.code ?? ""] ?? `${submit}에 실패했어요. 다시 시도해 주세요.`);
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={fieldStyles}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className={labelStyles}>
            비밀번호
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete={isSignup ? "new-password" : "current-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className={fieldStyles}
          />
        </div>
        {isSignup && (
          <div className="flex flex-col gap-1.5">
            <label htmlFor="passwordConfirm" className={labelStyles}>
              비밀번호 확인
            </label>
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              required
              autoComplete="new-password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="비밀번호를 한 번 더 입력"
              className={fieldStyles}
            />
          </div>
        )}
        <Button type="submit" disabled={!canSubmit || pending} className="mt-1 w-full disabled:opacity-50">
          {pending ? "처리 중…" : submit}
        </Button>
        {!isSignup && <KakaoLoginButton onError={setToast} />}
      </form>
      {!isSignup && (
        <p className="-mb-4 text-center text-sm">
          <Link href="/forgot-password" className="text-[var(--text-sub)] underline-offset-2 hover:underline">
            비밀번호를 잊으셨나요?
          </Link>
        </p>
      )}
      <p className="text-center text-sm text-[var(--text-sub)]">
        {prompt}{" "}
        <Link href={href} className="font-bold text-[var(--accent)] underline-offset-2 hover:underline">
          {linkText}
        </Link>
      </p>
    </div>
  );
}
