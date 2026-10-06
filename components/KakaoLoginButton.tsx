"use client";

import { useTransition } from "react";
import { createClient } from "@/utils/supabase/client";

type KakaoLoginButtonProps = {
  onError: (message: string) => void;
};

// Follows Kakao's login button guide: #FEE500 background, black speech-bubble symbol.
export default function KakaoLoginButton({ onError }: KakaoLoginButtonProps) {
  const [pending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      const { error } = await createClient().auth.signInWithOAuth({
        provider: "kakao",
        options: { redirectTo: `${window.location.origin}/auth/callback?next=/` },
      });
      if (error) onError("카카오 로그인에 실패했어요. 다시 시도해 주세요.");
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="relative inline-flex w-full items-center justify-center rounded-xl bg-[#FEE500] px-6 py-3.5 text-base leading-none font-bold text-black/85 disabled:opacity-50"
    >
      <svg viewBox="0 0 24 24" aria-hidden className="absolute left-5 size-5 fill-black">
        <path d="M12 3C6.48 3 2 6.54 2 10.9c0 2.83 1.88 5.3 4.7 6.7l-.96 3.52c-.08.3.26.55.52.37l4.2-2.78c.5.06 1.02.1 1.54.1 5.52 0 10-3.54 10-7.9S17.52 3 12 3Z" />
      </svg>
      {pending ? "이동 중…" : "카카오 로그인"}
    </button>
  );
}
