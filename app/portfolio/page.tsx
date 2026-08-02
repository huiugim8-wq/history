import type { Metadata } from "next";
import Link from "next/link";
import ContentShell from "../content-shell";
import { portfolioProjects } from "../content-data";

export const metadata: Metadata = {
  title: "포트폴리오 | 김희준",
  description:
    "김희준이 사용자 문제를 프론트엔드 구조와 상호작용으로 해결한 프로젝트를 소개합니다.",
};

export default function PortfolioPage() {
  return (
    <ContentShell
      eyebrow="PORTFOLIO"
      title="문제를 구조로 바꾼 프로젝트"
      description="기능 구현에 그치지 않고, 사용자가 서비스를 이해하고 행동하는 흐름까지 설계한 프로젝트입니다."
    >
      <section className="content-index" aria-label="프로젝트 목록">
        {portfolioProjects.map((project) => (
          <Link className="content-card project-card" href={project.href} key={project.href}>
            <span className="content-card-number">{project.eyebrow}</span>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p className="content-card-meta">{project.meta}</p>
            <ul className="content-card-tags" aria-label={`${project.title} 사용 기술`}>
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <span className="content-card-link">
              프로젝트 보기 <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </section>
    </ContentShell>
  );
}
