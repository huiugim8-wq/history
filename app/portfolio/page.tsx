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

const uiuxSkills = [
  {
    title: "User Experience",
    tags: ["사용자 관찰", "체험단 피드백", "정보 구조", "사용자 흐름"],
  },
  {
    title: "UI Design",
    tags: ["상세페이지", "데이터 대시보드", "컴포넌트 시스템", "반응형 UI"],
  },
  {
    title: "Design Tools",
    tags: ["Figma", "Adobe Illustrator", "Adobe Photoshop"],
  },
  {
    title: "Implementation",
    tags: ["React", "TypeScript", "REST API", "WebSocket", "Canvas 2D"],
  },
  {
    title: "Collaboration",
    tags: ["상품 기획", "개발 협업", "외주 관리", "납품업체 커뮤니케이션"],
  },
] as const;

type PortfolioProject = {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  meta: string;
  tags: readonly string[];
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  youtubeId?: string;
  external?: boolean;
};

const uiuxProjects: readonly PortfolioProject[] = [
  {
    href: "/portfolio/trading-platform",
    eyebrow: "UI/UX · 데이터 제품 · 5인 팀",
    title: "실시간 투자정보 플랫폼",
    description:
      "흩어진 시장 데이터와 AI 분석, 주문 기능을 사용자의 판단 순서에 맞춰 하나의 투자 작업 흐름으로 구성했습니다.",
    meta: "5주 · 사용자 흐름 · 공통 패널 UI · 프론트엔드 구현",
    tags: ["Information Architecture", "Dashboard", "Design System", "React"],
    youtubeId: "8P4wiwDrvxs",
  },
  {
    href: "https://www.wadiz.kr/web/campaign/detail/198814",
    eyebrow: "상품 기획 · 사용자 조사 · 상세페이지",
    title: "수피마코튼 와디즈 펀딩",
    description:
      "체험단의 피드백과 고객의 구매 기준을 상품 구성과 정보의 순서에 반영해, 목표 대비 1,206%의 펀딩 성과로 검증했습니다.",
    meta: "펀딩 1,206% · 연 매출 약 1억 원",
    tags: ["User Feedback", "Content Design", "Detail Page", "Validation"],
    image: {
      src: "/wadiz-supima-project.png",
      alt: "수피마코튼 수건의 와디즈 펀딩 상세페이지",
      width: 1341,
      height: 816,
    },
    external: true,
  },
];

function PortfolioEntry({ project }: { project: PortfolioProject }) {
  if (project.youtubeId) {
    return (
      <article className="portfolio-entry portfolio-entry--visual portfolio-entry--video">
        <div className="portfolio-entry-visual portfolio-entry-video">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?rel=0`}
            title={`${project.title} 프로젝트 영상`}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <span className="portfolio-entry-kicker">{project.eyebrow}</span>
        <div className="portfolio-entry-body">
          <h2>
            <Link href={project.href}>{project.title}</Link>
          </h2>
          <p>{project.description}</p>
          <div className="portfolio-entry-meta">
            <span>{project.meta}</span>
            <span>{project.tags.join(" · ")}</span>
          </div>
        </div>
        <Link
          className="portfolio-entry-arrow"
          href={project.href}
          aria-label={`${project.title} 상세 보기`}
        >
          ↗
        </Link>
      </article>
    );
  }

  const content = (
    <>
      {project.image ? (
        <div className="portfolio-entry-visual">
          <Image
            src={publicAssetPath(project.image.src)}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            sizes="(max-width: 760px) calc(100vw - 40px), 644px"
            unoptimized
          />
        </div>
      ) : null}
      <span className="portfolio-entry-kicker">{project.eyebrow}</span>
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
    </>
  );

  if (project.external) {
    return (
      <a
        className={`portfolio-entry${project.image ? " portfolio-entry--visual" : ""}`}
        href={project.href}
        target="_blank"
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      className={`portfolio-entry${project.image ? " portfolio-entry--visual" : ""}`}
      href={project.href}
    >
      {content}
    </Link>
  );
}

export default function PortfolioPage() {
  return <PortfolioContent mode="frontend" />;
}

export function PortfolioContent({
  mode,
}: {
  mode: "frontend" | "uiux";
}) {
  const isUiux = mode === "uiux";
  const projects: readonly PortfolioProject[] = isUiux
    ? uiuxProjects
    : portfolioProjects;
  const visibleSkills = isUiux ? uiuxSkills : skills;

  return (
    <ContentShell
      className="portfolio-page"
      eyebrow="KIM HEEJUN"
      title="Portfolio"
      description={
        isUiux
          ? "사용자의 선택을 설계하고 구현 가능성까지 검토한 과정과 결과를 정리했습니다."
          : "프론트엔드 개발자로 전환한 뒤 만든 것과, 그 과정에서 직접 부딪히며 배운 내용을 정리했습니다."
      }
      mode={mode}
      actions={
        <>
          <a
            className="content-text-link"
            href={publicAssetPath("/documents/kim-heejun-portfolio.pdf")}
            download="김희준_포트폴리오.pdf"
          >
            PDF 다운로드 <span aria-hidden="true">↓</span>
          </a>
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
              {isUiux ? (
                <>
                  <h3>
                    사용자의 선택을 설계하고 구현 가능성까지 고려하는 UI/UX
                    디자이너
                  </h3>
                  <p>
                    <strong>
                      실내건축디자인에서 익힌 사용자 중심의 관점과 창업 과정에서
                      체험단의 피드백을 구체적인 개선으로 발전시킨 경험
                    </strong>
                    을 바탕으로, 사용자의 목적과 행동을 정보 구조와 화면 흐름으로
                    설계합니다.
                  </p>
                  <p>
                    상품의 콘셉트와 상세페이지를 직접 설계해{" "}
                    <strong>와디즈 펀딩 1,206%와 연 매출 약 1억 원</strong>
                    이라는 결과를 만들었습니다. 디자인의 결과를 감각이나 취향이
                    아니라 실제 사용자의 선택과 성과로 확인했습니다.
                  </p>
                  <p>
                    프론트엔드 개발 경험은 디자인의 구현 가능성을 판단하는
                    강점입니다.{" "}
                    <strong>
                      5주 안에 React와 TypeScript로 9천만 건의 틱 데이터를
                      다루는 주식 차트를 구현
                    </strong>
                    했으며, 기술적 제약을 고려해 설계하고 개발자와 구체적인
                    기준으로 소통할 수 있습니다.
                  </p>
                </>
              ) : (
                <>
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
                      비전공자로 개발을 시작해 9천만 건의 틱 데이터를 다루는
                      주식 차트를 구현했습니다.
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
                </>
              )}
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
            {isUiux
              ? "사용자의 문제를 발견하고 화면과 기능으로 구체화한 두 가지 프로젝트입니다."
              : "맡은 역할보다 제가 직접 해결한 문제를 중심으로 정리했습니다."}
          </p>
          <section className="portfolio-entry-list" aria-label="프로젝트 목록">
            {projects.map((project) => (
              <PortfolioEntry project={project} key={project.href} />
            ))}
          </section>
        </ArticleSection>

        {!isUiux ? (
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
        ) : null}

        <ArticleSection number={isUiux ? "03" : "04"} title="Skills">
          <div className="portfolio-skill-list">
            {visibleSkills.map((skill) => (
              <section key={skill.title}>
                <h3>{skill.title}</h3>
                <p>{skill.tags.join(" · ")}</p>
              </section>
            ))}
          </div>
        </ArticleSection>

        <ArticleSection number={isUiux ? "04" : "05"} title="연락처">
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
