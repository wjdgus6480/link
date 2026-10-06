import type { Metadata, Viewport } from "next";
import "./globals.css";

const description = "자주 찾는 링크를 폴더별로 모아 두고 한눈에 꺼내 보는 북마크 서비스";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001"),
  title: { default: "링크", template: "%s | 링크" },
  description,
  applicationName: "링크",
  keywords: ["북마크", "링크 저장", "링크 관리", "폴더"],
  // favicon.ico is picked up from app/ by convention; listed here for the shortcut/apple variants.
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/favicon.ico" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "링크",
    title: "링크",
    description,
  },
  twitter: { card: "summary_large_image", title: "링크", description },
};

export const viewport: Viewport = {
  themeColor: "#0e9c97",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
