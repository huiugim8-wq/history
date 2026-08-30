import type { Metadata } from "next";
import ContentShell from "../content-shell";
import { publicAssetPath } from "../site-paths";

export const metadata: Metadata = {
  title: "지원 문서 PDF | 김희준",
  description:
    "김희준의 이력서, 자기소개서, 포트폴리오를 A4 PDF로 확인하고 내려받을 수 있습니다.",
};

const documents = [
  {
    number: "01",
    title: "이력서",
    description: "경력, 프로젝트, 교육을 정리한 제출용 이력서",
    file: "/documents/kim-heejun-resume.pdf" as const,
    downloadName: "김희준_이력서.pdf",
  },
  {
    number: "02",
    title: "자기소개서",
    description: "사용자 관점, 학습력, 소통 역량을 담은 자기소개서",
    file: "/documents/kim-heejun-cover-letter.pdf" as const,
    downloadName: "김희준_자기소개서.pdf",
  },
  {
    number: "03",
    title: "포트폴리오",
    description: "프로젝트와 주요 구현 과정을 요약한 포트폴리오",
    file: "/documents/kim-heejun-portfolio.pdf" as const,
    downloadName: "김희준_포트폴리오.pdf",
  },
] as const;

export default function DocumentsPage() {
  return (
    <ContentShell
      className="documents-site"
      eyebrow="PDF DOCUMENTS"
      title="지원 문서 PDF"
      description="세 문서 모두 A4 세로 비율과 2페이지 구성을 유지했습니다. 미리 확인하거나 제출용 파일로 바로 내려받을 수 있습니다."
    >
      <section className="document-library" aria-label="PDF 문서 목록">
        {documents.map((document) => {
          const href = publicAssetPath(document.file);

          return (
            <article className="document-item" key={document.title}>
              <a
                className="document-paper"
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${document.title} PDF 미리보기`}
              >
                <span>{document.number}</span>
                <strong>{document.title}</strong>
                <small>A4 · 2 pages</small>
              </a>
              <div className="document-item-copy">
                <h2>{document.title}</h2>
                <p>{document.description}</p>
                <div className="document-item-actions">
                  <a href={href} target="_blank" rel="noreferrer">
                    미리보기 <span aria-hidden="true">↗</span>
                  </a>
                  <a href={href} download={document.downloadName}>
                    다운로드 <span aria-hidden="true">↓</span>
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </ContentShell>
  );
}
