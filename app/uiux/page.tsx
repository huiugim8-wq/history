import type { Metadata } from "next";
import { ResumePage } from "../page";

const title = "김희준 | UI/UX Designer";
const description =
  "사용자의 선택을 설계하고 구현 가능성까지 고려하는 UI/UX 디자이너 김희준의 이력서입니다.";

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

export default function UiuxResumePage() {
  return <ResumePage variant="uiux" />;
}
