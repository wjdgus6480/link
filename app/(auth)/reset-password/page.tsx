import type { Metadata } from "next";
import ResetPasswordForm from "@/components/ResetPasswordForm";

export const metadata: Metadata = { title: "비밀번호 재설정", description: "새 비밀번호를 설정하세요." };

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
