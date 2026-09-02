import type { Metadata } from "next";
import ContentShell from "../content-shell";
import { publicAssetPath } from "../site-paths";

export const metadata: Metadata = {
  title: "지원 문서 PDF | 김희준",
  description:
    "김희준의 이력서, 자기소개서, 포트폴리오를 A4 PDF로 확인하고 내려받을 수 있습니다.",
};

const documentGroups = [
  {
    title: "프론트엔드 개발자",
    documents: [
      {
        number: "01",
        title: "프론트엔드 이력서",
        description: "프론트엔드 개발 경험과 경력, 교육을 정리한 이력서",
        file: "/documents/kim-heejun-frontend-resume.pdf" as const,
        downloadName: "김희준_프론트엔드_이력서.pdf",
        pages: 2,
      },
      {
        number: "02",
        title: "프론트엔드 자기소개서",
        description: "사용자 관점, 학습력, 소통 역량을 담은 자기소개서",
        file: "/documents/kim-heejun-frontend-cover-letter.pdf" as const,
        downloadName: "김희준_프론트엔드_자기소개서.pdf",
        pages: 2,
      },
      {
        number: "03",
        title: "프론트엔드 포트폴리오",
        description: "개발 프로젝트와 주요 구현 과정을 정리한 포트폴리오",
        file: "/documents/kim-heejun-frontend-portfolio.pdf" as const,
        downloadName: "김희준_프론트엔드_포트폴리오.pdf",
        pages: 2,
      },
    ],
  },
  {
    title: "UI/UX 디자이너",
    documents: [
      {
        number: "04",
        title: "UI/UX 이력서",
        description: "사용자 중심 설계와 디자인 성과를 중심으로 정리한 이력서",
        file: "/documents/kim-heejun-uiux-resume.pdf" as const,
        downloadName: "김희준_UIUX_이력서.pdf",
        pages: 2,
      },
      {
        number: "05",
        title: "UI/UX 자기소개서",
        description: "디자인 경험과 구현 역량, 협업 경험을 담은 자기소개서",
        file: "/documents/kim-heejun-uiux-cover-letter.pdf" as const,
        downloadName: "김희준_UIUX_자기소개서.pdf",
        pages: 1,
      },
      {
        number: "06",
        title: "UI/UX 포트폴리오",
        description: "사용자 흐름과 디자인 성과를 중심으로 정리한 포트폴리오",
        file: "/documents/kim-heejun-uiux-portfolio.pdf" as const,
        downloadName: "김희준_UIUX_포트폴리오.pdf",
        pages: 2,
      },
    ],
  },
] as const;

export default function DocumentsPage() {
  return (
    <ContentShell
      className="documents-site"
      eyebrow="PDF DOCUMENTS"
      title="지원 문서 PDF"
      description="프론트엔드 개발자용과 UI/UX 디자이너용 문서를 각각 구분했습니다. 미리 확인하거나 제출용 파일로 바로 내려받을 수 있습니다."
    >
      {documentGroups.map((group) => (
        <section
          className="document-group"
          aria-labelledby={`document-group-${group.documents[0].number}`}
          key={group.title}
        >
          <h2 id={`document-group-${group.documents[0].number}`}>
            {group.title}
          </h2>
          <div className="document-library">
            {group.documents.map((document) => {
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
                    <small>
                      A4 · {document.pages} page{document.pages > 1 ? "s" : ""}
                    </small>
                  </a>
                  <div className="document-item-copy">
                    <h3>{document.title}</h3>
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
          </div>
        </section>
      ))}
    </ContentShell>
  );
}
