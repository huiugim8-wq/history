import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArticleSection,
  ExternalTextLink,
  TagList,
} from "../article-components";
import ContentShell from "../content-shell";
import { portfolioDeepDives, portfolioProjects } from "../content-data";

export const metadata: Metadata = {
  title: "통합 포트폴리오 | 김희준",
  description:
    "김희준의 소개, 경력, 교육, 수상, 프로젝트, 기술적 의사결정과 연락처를 한곳에 정리한 통합 포트폴리오입니다.",
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
      eyebrow="PORTFOLIO · RESUME"
      title="김희준의 통합 포트폴리오"
      description="이력서의 경력과 교육, 프로젝트 결과물과 기술적 의사결정을 하나의 흐름으로 연결했습니다."
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
        <ArticleSection number="01" title="About">
          <div className="portfolio-profile">
            <Image
              className="portfolio-profile-photo"
              src="/profile-id.png"
              alt="정장을 입은 김희준의 증명사진"
              width={148}
              height={197}
              sizes="(max-width: 760px) 124px, 148px"
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

        <ArticleSection number="02" title="Projects">
          <p className="portfolio-section-intro">
            문제 정의부터 구현, 검증과 회고까지 확인할 수 있는 프로젝트입니다.
          </p>
          <section className="content-index" aria-label="프로젝트 목록">
            {portfolioProjects.map((project) => (
              <Link
                className="content-card project-card"
                href={project.href}
                key={project.href}
              >
                <span className="content-card-number">{project.eyebrow}</span>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <p className="content-card-meta">{project.meta}</p>
                <ul
                  className="content-card-tags"
                  aria-label={`${project.title} 사용 기술`}
                >
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
        </ArticleSection>

        <ArticleSection number="03" title="Technical Deep Dives">
          <p className="portfolio-section-intro">
            실시간 투자 정보 플랫폼을 구현하며 내린 기술적 의사결정을 프로젝트
            하위 페이지로 통합했습니다.
          </p>
          <section
            className="content-index portfolio-deep-dive-index"
            aria-label="기술 상세 목록"
          >
            {portfolioDeepDives.map((post) => (
              <Link
                className="content-card deep-dive-card"
                href={post.href}
                key={post.href}
              >
                <span className="content-card-number">
                  PROJECT 01 · DEEP DIVE {post.number}
                </span>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <ul
                  className="content-card-tags"
                  aria-label={`${post.title} 키워드`}
                >
                  {post.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <span className="content-card-link">
                  구현 상세 보기 <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </section>
        </ArticleSection>

        <ArticleSection number="04" title="Work & Experience">
          <div className="portfolio-experience-stack">
            <section className="article-subsection">
              <div className="portfolio-role-heading">
                <div>
                  <span>2026.03 — 2026.07 · 5인 팀 프로젝트</span>
                  <h3>크래프톤 정글 12기 졸업 · 프론트엔드</h3>
                </div>
                <div className="portfolio-role-actions">
                  <a
                    href="https://github.com/huiugim8-wq/gops-stock-trading-platform"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub ↗
                  </a>
                  <Link href="/portfolio/trading-platform">
                    프로젝트 상세 ↗
                  </Link>
                  <a
                    href="https://www.youtube.com/watch?v=8P4wiwDrvxs"
                    target="_blank"
                    rel="noreferrer"
                  >
                    YouTube ↗
                  </a>
                </div>
              </div>
              <p>
                AI가 시장 탐색과 차트 분석을 지원하고, 주문부터 거래 복기까지
                하나의 흐름으로 연결하는 실시간 투자 정보 플랫폼을
                구현했습니다.
              </p>
              <ul>
                <li>
                  WebSocket 기반 실시간 데이터{" "}
                  <strong>평균 초당 약 1,080건</strong>을 처리하고, REST API로
                  과거 데이터를 지원하는 커스텀 주식 차트를 구현했습니다.
                </li>
                <li>
                  차트 API가 지원하지 않는 틱 데이터를 오버레이하기 위해{" "}
                  <strong>멀티 레이어 Canvas 기반 차트 엔진</strong>을 직접
                  구현했습니다.
                </li>
                <li>
                  팀원이 재사용할 수 있도록{" "}
                  <strong>43종의 React 공용 컴포넌트</strong>를 설계·구현했습니다.
                </li>
                <li>
                  지지·저항선을 시각화하기 위해 선형회귀·피벗 기반 모델을
                  적용하고 차트에 표현했습니다.
                </li>
              </ul>
            </section>

            <section className="article-subsection">
              <div className="portfolio-role-heading">
                <div>
                  <span>2024 — 2025.08</span>
                  <h3>㈜나현 · 생산관리</h3>
                  <p>과장 · 생산 라인장</p>
                </div>
              </div>
              <p>
                현대·기아자동차 부품 제조 현장의 생산 운영과{" "}
                <strong>약 20명의 현장 인력을 관리</strong>했습니다. 생산계획에
                따라 공정을 운영하고 작업 인력을 배치했으며, 품질기준 준수와
                안정적인 생산환경 유지를 담당했습니다.
              </p>
            </section>

            <section className="article-subsection">
              <div className="portfolio-role-heading">
                <div>
                  <span>2023 — 2024</span>
                  <h3>OTOS · 수건·목재 판매 창업</h3>
                  <p>와디즈 스피마코튼 펀딩 1,206% 달성</p>
                </div>
                <a
                  href="https://www.wadiz.kr/web/campaign/detail/198814"
                  target="_blank"
                  rel="noreferrer"
                >
                  와디즈 펀딩 ↗
                </a>
              </div>
              <p>
                와디즈 펀딩과 쿠팡 목재 판매를 직접 기획·운영하며,{" "}
                <strong>
                  ‘무엇을 팔까’보다 고객의 어떤 문제를 풀어야 하는지
                </strong>{" "}
                먼저 정의하고 시장 반응과 수익성으로 사업 가능성을 검증해{" "}
                <strong>연 매출 약 1억 원</strong>을 달성했습니다.
              </p>
            </section>
          </div>
        </ArticleSection>

        <ArticleSection number="05" title="Education & Awards">
          <div className="portfolio-role-heading">
            <div>
              <span>2017.03 — 2023.08</span>
              <h3>대구대학교 · 실내건축디자인학과</h3>
            </div>
          </div>
          <p>
            공간 설계와 시각적 구성에 대한 체계적인 훈련을 통해 복잡한 정보를
            효과적으로 구조화하고 명확하게 전달하는 역량을 길렀습니다.
          </p>
          <p>
            실내인테리어 공모전 동아리 ‘러스틱’을 결성하고{" "}
            <strong>
              동아리장을 맡아 프로젝트 기획과 구성원 간 협업을 주도했습니다.
            </strong>
          </p>
          <ul>
            <li>인테리어앤데코 공모전 수상</li>
            <li>DGID 공모전 수상</li>
            <li>학과 공로상 수상</li>
          </ul>
        </ArticleSection>

        <ArticleSection number="06" title="Skills & Libraries">
          <div className="portfolio-skills-grid">
            {skills.map((skill) => (
              <section key={skill.title}>
                <h3>{skill.title}</h3>
                <TagList tags={skill.tags} label={`${skill.title} 기술`} />
              </section>
            ))}
          </div>
        </ArticleSection>

        <ArticleSection number="07" title="Contact">
          <p>
            함께 만들 이야기가 있다면 편하게 연락해 주세요. 사용자 문제를
            구조화하고, 데이터의 상태 변화를 이해할 수 있는 인터페이스로 만드는
            일을 좋아합니다.
          </p>
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
