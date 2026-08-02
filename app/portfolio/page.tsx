import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArticleSection, ExternalTextLink } from "../article-components";
import ContentShell from "../content-shell";
import { portfolioDeepDives, portfolioProjects } from "../content-data";
import { publicAssetPath } from "../site-paths";

export const metadata: Metadata = {
  title: "Portfolio | 김희준",
  description:
    "김희준의 프로젝트와 구현 과정, 기술, 교육 및 수상 내용을 정리한 프론트엔드 포트폴리오입니다.",
};

const skills = [
  {
    title: "Frontend",
    tags: ["React", "TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Data & Rendering",
    tags: [
      "REST API",
      "WebSocket",
      "Kafka",
      "Canvas 2D",
      "requestAnimationFrame",
    ],
  },
  {
    title: "Architecture",
    tags: [
      "Component Composition",
      "Panel Registry",
      "Runtime Validation",
      "Agent-driven UI",
    ],
  },
  {
    title: "Algorithm",
    tags: [
      "Data Structures",
      "Clustering",
      "Linear Regression",
      "Candidate Scoring",
    ],
  },
  {
    title: "Collaboration & Infra",
    tags: ["Git", "Docker", "Kubernetes", "Frontend", "Backend", "AI"],
  },
] as const;

export default function PortfolioPage() {
  return (
    <ContentShell
      className="portfolio-page"
      eyebrow="KIM HEEJUN"
      title="Portfolio"
      description="프론트엔드 개발자로 전환한 뒤 만든 것과, 그 과정에서 직접 부딪히며 배운 내용을 정리했습니다."
      actions={
        <>
          <ExternalTextLink href="mailto:huiugim8@gmail.com">
            Email
          </ExternalTextLink>
          <ExternalTextLink href="https://github.com/huiugim8-wq">
            GitHub
          </ExternalTextLink>
        </>
      }
    >
      <article className="portfolio-hub technical-article">
        <ArticleSection number="01" title="소개">
          <div className="portfolio-profile">
            <Image
              className="portfolio-profile-photo"
              src={publicAssetPath("/profile-id.png")}
              alt="정장을 입은 김희준의 증명사진"
              width={1086}
              height={1448}
              sizes="(max-width: 760px) 124px, 148px"
              unoptimized
            />
            <div>
              <h3>소통을 바탕으로 구현하는 프론트엔드 개발자</h3>
              <p>
                <strong>
                  창업 과정에서 체험단의 피드백을 구체적인 개선으로 발전시킨
                  경험과 실내건축디자인에서 익힌 사용자 중심의 관점
                </strong>
                은 프론트엔드로 커리어를 전환한 지금도 문제를 바라보는
                밑바탕이 되고 있습니다.
              </p>
              <p>
                <strong>
                  비전공자로 개발을 시작해 9천만 건의 틱 데이터를 다루는 주식
                  차트를 구현했습니다.
                </strong>{" "}
                <strong>5주라는 짧은 기간 안에</strong> 필요한 기술을 빠르게
                익혀 실제 구현에 적용하며 성장하고 있습니다.
              </p>
              <p>
                프론트엔드를 중심으로 역량을 쌓으며,{" "}
                <strong>
                  백엔드에 대한 소양과 역량도 갖춘 풀스택 개발자
                </strong>
                가 되기 위해 매일 노력하고 있습니다.
              </p>
            </div>
          </div>

          <dl className="portfolio-contact-facts">
            <div>
              <dt>Phone</dt>
              <dd>
                <a href="tel:01082016811">010 8201 6811</a>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href="mailto:huiugim8@gmail.com">huiugim8@gmail.com</a>
              </dd>
            </div>
            <div>
              <dt>GitHub</dt>
              <dd>
                <a
                  href="https://github.com/huiugim8-wq"
                  target="_blank"
                  rel="noreferrer"
                >
                  huiugim8-wq ↗
                </a>
              </dd>
            </div>
          </dl>
        </ArticleSection>

        <ArticleSection number="02" title="프로젝트">
          <p className="portfolio-section-intro">
            맡은 역할보다 제가 직접 해결한 문제를 중심으로 정리했습니다.
          </p>
          <section className="portfolio-entry-list" aria-label="프로젝트 목록">
            {portfolioProjects.map((project) => (
              <Link
                className="portfolio-entry"
                href={project.href}
                key={project.href}
              >
                <span className="portfolio-entry-kicker">
                  {project.eyebrow}
                </span>
                <div className="portfolio-entry-body">
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                  <div className="portfolio-entry-meta">
                    <span>{project.meta}</span>
                    <span>{project.tags.join(" · ")}</span>
                  </div>
                </div>
                <span className="portfolio-entry-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            ))}
          </section>
        </ArticleSection>

        <ArticleSection number="03" title="구현 기록">
          <p className="portfolio-section-intro">
            결과 화면만으로 보이지 않는 설계 이유와 구현 과정을 따로 남겼습니다.
          </p>
          <section
            className="portfolio-entry-list"
            aria-label="기술 상세 목록"
          >
            {portfolioDeepDives.map((post) => (
              <Link
                className="portfolio-entry"
                href={post.href}
                key={post.href}
              >
                <span className="portfolio-entry-kicker">
                  투자 플랫폼 구현 기록 {post.number}
                </span>
                <div className="portfolio-entry-body">
                  <h2>{post.title}</h2>
                  <p>{post.description}</p>
                  <div className="portfolio-entry-meta">
                    <span>{post.tags.join(" · ")}</span>
                  </div>
                </div>
                <span className="portfolio-entry-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            ))}
          </section>
        </ArticleSection>

        <ArticleSection number="04" title="Skills">
          <div className="portfolio-skill-list">
            {skills.map((skill) => (
              <section key={skill.title}>
                <h3>{skill.title}</h3>
                <p>{skill.tags.join(" · ")}</p>
              </section>
            ))}
          </div>
        </ArticleSection>

        <ArticleSection number="05" title="연락처">
          <p>함께 만들 이야기가 있다면 편하게 연락해 주세요.</p>
          <div className="portfolio-contact-links">
            <a href="mailto:huiugim8@gmail.com">huiugim8@gmail.com ↗</a>
            <a href="tel:01082016811">010 8201 6811</a>
            <a
              href="https://github.com/huiugim8-wq"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
          </div>
        </ArticleSection>
      </article>
    </ContentShell>
  );
}
