import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = { title: "회원가입", description: "이메일로 가입하고 나만의 북마크를 폴더별로 정리하세요." };

export default function SignupPage() {
  return <AuthForm mode="signup" />;
}
