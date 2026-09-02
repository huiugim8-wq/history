import type { Metadata } from "next";
import Link from "next/link";
import { FrontendLibrary } from "../../frontend-library/frontend-library";
import "../../frontend-library/frontend-library.css";

const title = "Frontend Library | 김희준 포트폴리오";
const description =
  "HTML, CSS, JavaScript, TypeScript, React, 브라우저와 성능을 직접 확인한 실험과 질문으로 정리한 프론트엔드 학습 아카이브입니다.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [],
  },
  twitter: {
    title,
    description,
    images: [],
  },
};

export default function FrontendLibraryProjectPage() {
  return (
    <div className="frontend-library-project">
      <FrontendLibrary />
      <Link className="frontend-library-project-back" href="/portfolio">
        ← 포트폴리오로 돌아가기
      </Link>
    </div>
  );
}
