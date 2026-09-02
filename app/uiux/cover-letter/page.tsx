import type { Metadata } from "next";
import SirUiuxCoverLetterPage from "../../cover-letter/sir-uiux/page";

const title = "UI/UX 디자이너 자기소개서 | 김희준";
const description =
  "사용자 반응으로 디자인을 검증하고 프론트엔드로 직접 구현하는 UI/UX 디자이너 김희준의 자기소개서입니다.";

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

export default function UiuxCoverLetterPage() {
  return <SirUiuxCoverLetterPage />;
}
