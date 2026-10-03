import Image from "next/image";
import Link from "next/link";
import SiteNavigation from "../site-navigation";
import TradingVideo from "./trading-platform/video-embed";
import { publicAssetPath } from "../site-paths";

const skillGroups = [
  {
    title: "Frontend",
    items: "React · TypeScript · JavaScript · HTML · CSS",
  },
  {
    title: "Data & Rendering",
    items: "REST API · WebSocket · Kafka · Canvas 2D · requestAnimationFrame",
  },
  {
    title: "Architecture",
    items: "Component Composition · Panel Registry · Runtime Validation",
  },
  {
    title: "Algorithm",
    items: "Data Structures · Clustering · Linear Regression · Candidate Scoring",
  },
] as const;

export default function FrontendPortfolio() {
  return (
    <div className="fp-portfolio" id="top">
      <header className="fp-header">
        <div className="fp-shell fp-header-inner">
          <SiteNavigation />
          <Link className="fp-wordmark" href="/portfolio/">
            <span className="fp-wordmark-title">
              Portfolio<span aria-hidden="true">.</span>
            </span>
            <span className="fp-wordmark-name">KIM<br />HEEJUN</span>
          </Link>
        </div>
      </header>

      <main className="fp-shell fp-main">
        <section className="fp-profile" aria-labelledby="fp-intro-title">
          <Image
            className="fp-profile-photo"
            src={publicAssetPath("/profile-id.png")}
            alt="정장을 입은 김희준의 증명사진"
            width={1086}
            height={1448}
            sizes="(max-width: 640px) 104px, 128px"
            priority
            unoptimized
          />

          <div className="fp-profile-content">
            <h1 id="fp-intro-title">
              “기술로 <strong>비즈니스 임팩트</strong>를 만드는 개발자”
            </h1>
            <p className="fp-name">김희준</p>
            <dl className="fp-contact">
              <div>
                <dt>Phone</dt>
                <dd><a href="tel:01082016811">010 8201 6811</a></dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd><a href="mailto:huiugim8@gmail.com">huiugim8@gmail.com</a></dd>
              </div>
              <div>
                <dt>GitHub</dt>
                <dd>
                  <a href="https://github.com/huiugim8-wq" target="_blank" rel="noreferrer">
                    huiugim8-wq ↗
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="fp-projects" aria-labelledby="fp-project-title">
          <h2 id="fp-project-title" className="fp-section-title">Project</h2>

          <Link className="fp-project-card fp-rizz-project" href="/portfolio/rizz-workspace/" aria-label="리즈 AI 서비스 제안 상세 보기">
            <div className="fp-rizz-preview" aria-hidden="true">
              <Image src={publicAssetPath("/workspace-project/workspace-calendar.jpg")} alt="" width={1280} height={720} sizes="(max-width: 700px) calc(100vw - 40px), 390px" unoptimized />
              <span>RIZZ AI · 1-WEEK MVP</span>
            </div>
            <div className="fp-rizz-summary">
              <span className="fp-rizz-kicker">RIZZ AI · 서비스 도입 제안</span>
              <div className="fp-project-heading"><h3>AI로 공간 예약과 커피챗을 연결한 1주 MVP</h3><span aria-hidden="true">↗</span></div>
              <p className="fp-project-description">커피챗으로 공간을 찾을 이유를 만들고, 수강 진도를 참여 조건으로 연결합니다. 수강생과 코치의 예약·개설·소통을 AI와 카카오톡으로 처리하는 서비스 제안입니다.</p>
              <div className="fp-project-meta"><span>개인 프로젝트 · 기획부터 AI 연동까지</span><span>Next.js · PostgreSQL · OpenAI · Kakao</span></div>
            </div>
          </Link>

          <Link
            className="fp-project-card fp-rizz-project"
            href="/portfolio/glow-up-rizz/"
            aria-label="글로우업리즈 브랜드 홈페이지 프로젝트 상세 보기"
          >
            <div className="fp-rizz-preview" aria-hidden="true">
              <Image
                src={publicAssetPath("/rizz-project/captures/home-hero.jpg")}
                alt=""
                width={1024}
                height={576}
                sizes="(max-width: 700px) calc(100vw - 40px), 390px"
                unoptimized
              />
              <span>PUBLIC SITE · ADMIN CMS</span>
            </div>
            <div className="fp-rizz-summary">
              <span className="fp-rizz-kicker">GLOW UP RIZZ · 지원을 위해 시작한 개인 프로젝트</span>
              <div className="fp-project-heading">
                <h3>리즈의 이야기를 담은 브랜드 홈페이지</h3>
                <span aria-hidden="true">↗</span>
              </div>
              <p className="fp-project-description">
                관심을 가져온 브랜드의 성장 흐름을 영상과 스크롤 UI로 표현했습니다. 직원이 직접 콘텐츠를 수정하는 관리자부터 데이터베이스, AWS 배포까지 연결했습니다.
              </p>
              <div className="fp-project-meta">
                <span>기획 · 프론트엔드 · 백엔드 · 배포</span>
                <span>Next.js · PostgreSQL · AWS EC2</span>
              </div>
            </div>
          </Link>

          <article className="fp-featured-project">
          <Link
            className="fp-project-card fp-project-summary"
            href="/portfolio/trading-platform/"
            aria-label="실시간 투자 정보 플랫폼 상세 보기"
          >
            <div className="fp-project-heading">
              <h3>실시간 투자 정보 플랫폼</h3>
              <span aria-hidden="true">↗</span>
            </div>
            <p className="fp-project-description">
              하루 약 9천만 건의 시장 이벤트를 Amazon MSK 기반으로 처리하고, AI 분석과 실시간 커스텀 차트로 연결한 투자 정보 플랫폼
            </p>
            <dl className="fp-project-facts">
              <div><dt>팀원</dt><dd>5인</dd></div>
              <div><dt>기간</dt><dd>2026.03 — 2026.07</dd></div>
              <div><dt>담당</dt><dd>풀스택</dd></div>
            </dl>
          </Link>
          <div className="fp-video-link"><TradingVideo /></div>
          </article>



          <Link
            className="fp-project-card fp-compact-project"
            href="/portfolio/react-runtime/"
            aria-label="Mini React 상세 보기"
          >
            <div className="fp-project-heading">
              <h3>Mini React</h3>
              <span aria-hidden="true">↗</span>
            </div>
            <p className="fp-project-description">
              Virtual DOM과 Hooks를 직접 구현한 뒤 동기식 Diff 구조를 Fiber Reconciler와 협력형 스케줄러로 확장한 프로젝트입니다.
            </p>
            <div className="fp-project-meta">
              <span>JavaScript · 83 tests passed</span>
              <span>Virtual DOM · Fiber · Keyed Reconciliation · Scheduler</span>
            </div>
          </Link>
        </section>

        <section className="fp-skills" aria-labelledby="fp-skills-title">
          <h2 id="fp-skills-title" className="fp-section-title">Skills</h2>
          <div className="fp-skill-list">
            {skillGroups.map((group) => (
              <div className="fp-skill-row" key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.items}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
