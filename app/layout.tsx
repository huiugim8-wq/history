import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://huiugim8-wq.github.io"),
  title: "김희준 | Front-End Engineer",
  description:
    "서비스의 의도와 데이터의 상태 변화를 사용자 경험으로 연결하는 프론트엔드 개발자 김희준의 이력서입니다.",
  keywords: [
    "김희준",
    "프론트엔드 개발자",
    "React",
    "TypeScript",
    "크래프톤 정글 12기",
    "GOPS",
  ],
  authors: [{ name: "김희준" }],
  openGraph: {
    title: "김희준 | Front-End Engineer",
    description:
      "크래프톤 정글 12기 졸업 · 사용자 경험을 기술 구조로 구현하는 프론트엔드 개발자 김희준",
    type: "website",
    locale: "ko_KR",
    url: "/",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "김희준 AI Product Engineer 포트폴리오",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "김희준 | Front-End Engineer",
    description:
      "크래프톤 정글 12기 졸업 · 사용자 경험을 기술 구조로 구현하는 프론트엔드 개발자 김희준",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
        <script
          src="https://mcp.figma.com/mcp/html-to-design/capture.js"
          async
        />
      </body>
    </html>
  );
}
