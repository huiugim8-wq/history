import type { Metadata } from "next";
import { PortfolioContent } from "../../portfolio/page";

const title = "UI/UX Portfolio | 김희준";
const description =
  "사용자의 문제를 관찰하고 정보 구조와 화면 흐름으로 구체화한 UI/UX 디자이너 김희준의 포트폴리오입니다.";

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

export default function UiuxPortfolioPage() {
  return <PortfolioContent mode="uiux" />;
}
