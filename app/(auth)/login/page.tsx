import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = { title: "로그인", description: "이메일 또는 카카오 계정으로 링크에 로그인하세요." };

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
