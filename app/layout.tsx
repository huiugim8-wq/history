import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://huiugim8-wq.github.io"),
  title: "김희준 | AI Product Engineer",
  description:
    "사용자의 문제를 실제로 작동하는 제품으로 연결하는 AI 제품 엔지니어 김희준의 포트폴리오입니다.",
  keywords: [
    "김희준",
    "AI 제품 엔지니어",
    "풀스택 개발자",
    "크래프톤 정글 12기",
    "GOPS",
  ],
  authors: [{ name: "김희준" }],
  openGraph: {
    title: "김희준 | AI Product Engineer",
    description:
      "크래프톤 정글 12기 졸업 · GOPS를 만드는 AI 제품 엔지니어 김희준",
    type: "website",
    locale: "ko_KR",
    url: "/",
  },
  twitter: {
    card: "summary",
    title: "김희준 | AI Product Engineer",
    description:
      "크래프톤 정글 12기 졸업 · GOPS를 만드는 AI 제품 엔지니어 김희준",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
