import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { publicAssetPath } from "./site-paths";
import SiteNavigation from "./site-navigation";
import "./frontend-resume.css";

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer">{children} <span aria-hidden="true">↗</span></a>;
}

function SkillIcons() {
  return (
    <ul className="pr-skills" aria-label="주요 기술">
      <li title="TypeScript"><svg viewBox="0 0 32 32" role="img" aria-label="TypeScript"><rect width="32" height="32" rx="1" fill="#5193d3" /><text x="29" y="27" fill="white" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700" textAnchor="end">TS</text></svg></li>
      <li title="JavaScript"><svg viewBox="0 0 32 32" role="img" aria-label="JavaScript"><path fill="#f7df1e" d="M0 0h32v32H0z" /><text x="29" y="27" fill="#23262a" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700" textAnchor="end">JS</text></svg></li>
      <li title="React"><svg viewBox="-16 -16 32 32" role="img" aria-label="React"><g fill="none" stroke="#00d8ff" strokeWidth="1.4"><ellipse rx="15" ry="5.6" /><ellipse rx="15" ry="5.6" transform="rotate(60)" /><ellipse rx="15" ry="5.6" transform="rotate(120)" /></g><circle r="2.6" fill="#00d8ff" /></svg></li>
      <li title="Next.js"><svg viewBox="0 0 32 32" role="img" aria-label="Next.js"><circle cx="16" cy="16" r="16" fill="#262626" /><path d="M10 23V9l16 20M22 9v13" fill="none" stroke="white" strokeWidth="1.8" /></svg></li>
      <li title="Node.js"><svg viewBox="0 0 32 32" role="img" aria-label="Node.js"><path d="M16 1.7 29 9v14L16 30.3 3 23V9Z" fill="none" stroke="#79b963" strokeWidth="2.2" /><text x="16" y="23" fill="#79b963" fontFamily="Arial, sans-serif" fontSize="18" textAnchor="middle">JS</text></svg></li>
      <li title="Python"><Image src={publicAssetPath("/resume-skills/python.svg")} alt="Python" width={32} height={32} unoptimized /></li>
    </ul>
  );
}

function Tags({ values }: { values: string[] }) {
  return <ul className="pr-tags" aria-label="사용 기술">{values.map(value => <li key={value}>{value}</li>)}</ul>;
}

export default function FrontendResume() {
  return (
    <div className="product-resume" id="top">
      <a className="pr-skip" href="#about">본문으로 이동</a>
      <header className="pr-container pr-header">
        <SiteNavigation />
        <div className="pr-profile">
          <Image className="pr-photo" src={publicAssetPath("/profile-id.png")} alt="정장을 입은 김희준의 증명사진" width={1086} height={1448} sizes="(max-width: 560px) 96px, 126px" unoptimized priority />
          <div className="pr-profile-copy">
            <p className="pr-role">Product Engineer</p>
            <h1 id="profile-title">김희준</h1>
            <address className="pr-contact" aria-label="연락처">
              <a href="tel:01082016811"><strong>Phone</strong><span>010 8201 6811</span></a>
              <a href="mailto:huiugim8@gmail.com"><strong>Email</strong><span>huiugim8@gmail.com</span></a>
            </address>
          </div>
          <SkillIcons />
        </div>
      </header>

      <main className="pr-container">
        <section className="pr-about" id="about" aria-labelledby="about-title">
          <h2 className="pr-section-title" id="about-title">About Me</h2>
          <p className="pr-statement">“기술로 <span>비즈니스 임팩트</span>를 만드는 개발자”</p>
          <div className="pr-about-copy">
            <p>창업을 경험하며 필드에서 <strong>소비자와 소통하고, 이를 개선으로 연결해 실제 성과</strong>를 만들어냈습니다.<br className="pr-desktop-break" /> 이 경험을 통해 서비스는 아이디어에서 끝나는 것이 아닌, 사용자의 반응을 확인하고 끊임없이 개선하는 과정에서 만들어진다는 것을 배웠습니다.</p>
            <p>비전공자로 개발을 시작했지만, <strong>5주라는 짧은 기간 동안 9,000만 건의 대용량 틱 데이터를 처리하는 실시간 주식 차트 프로덕트</strong>를 구현했습니다.<br className="pr-desktop-break" /> 이처럼 비즈니스 목표에 필요한 기술적 깊이를 두고 빠르게 학습하여 결과물로 만들어내는 것을 선호합니다.</p>
            <p>현재 기술을 비즈니스 가치로 연결할 수 있는 <strong>Product Engineer</strong>를 목표로, 프론트엔드 개발자에 그치지 않고 <strong>풀스택형 개발자</strong>를 지향합니다.</p>
          </div>
        </section>

        <section className="pr-work" id="experience" aria-labelledby="experience-title">
          <h2 className="pr-section-title" id="experience-title">Work &amp; Experience</h2>
          <article className="pr-entry pr-project" id="project">
            <div className="pr-side">
              <h3>크래프톤 정글</h3><p>12기 졸업</p>
              <p className="pr-team">팀 프로젝트</p>
              <dl className="pr-meta"><div><dt>팀원</dt><dd>5인</dd></div><div><dt>기간</dt><dd>2026.03 — 2026.07</dd></div><div><dt>담당</dt><dd>풀스택</dd></div></dl>
            </div>
            <div className="pr-detail">
              <div className="pr-entry-title"><h3>실시간 투자 정보 플랫폼</h3><nav className="pr-project-links" aria-label="실시간 투자 정보 플랫폼 관련 링크"><ExternalLink href="https://www.youtube.com/watch?v=8P4wiwDrvxs">YouTube</ExternalLink><ExternalLink href="https://github.com/huiugim8-wq/gops-stock-trading-platform">GitHub</ExternalLink><Link href="/portfolio/trading-platform/">프로젝트 상세 <span aria-hidden="true">↗</span></Link></nav></div>
              <section className="pr-feature" aria-labelledby="resume-chart"><h4 id="resume-chart"><Link href="/portfolio/trading-platform/two-layer-canvas/">대량의 실시간 데이터를 위한 커스텀 주식 차트 구현</Link></h4><p>기존 라이브러리의 정해진 표현 방식에서 벗어나, 여러 차트의 조합부터 AI 분석 결과까지 서비스에 필요한 형태로 확장할 수 있는 맞춤형 차트 엔진을 구현했습니다. 평균 초당 약 1,080건의 틱 이벤트를 반영하도록 최적화했습니다.</p><Tags values={["TypeScript", "WebSocket", "REST API", "Canvas 2D"]} /></section>
              <section className="pr-feature" aria-labelledby="resume-pipeline"><h4 id="resume-pipeline"><Link href="/portfolio/trading-platform/#event-pipeline">초당 평균 1,080건의 시장 데이터를 처리하는 실시간 파이프라인</Link></h4><p>Kafka 기반의 <strong>이벤트 드리븐 구조</strong>를 핵심으로 설계하여, 데이터 수신과 처리를 분리하고 유실 위험을 줄였습니다. 초당 평균 약 1,080건의 실시간 데이터를 Kubernetes 환경에서 처리하고, 차트와 AI 분석에 실시간으로 공급했습니다.</p><Tags values={["Kafka", "Kubernetes", "Redis", "ClickHouse", "WebSocket"]} /></section>
              <section className="pr-feature" aria-labelledby="resume-coach"><h4 id="resume-coach"><Link href="/portfolio/trading-platform/#ai-coach">거래 결과가 아니라 판단 과정을 복기하는 AI 투자 코치</Link></h4><p>AI가 거래 당시의 기록을 유사 사례와 비교해 반복되는 판단 실수를 찾고, 다음 투자에서 확인할 기준을 제안하도록 만들었습니다.</p><Tags values={["Python", "TypeScript", "AI"]} /></section>
            </div>
          </article>

          <article className="pr-entry pr-company">
            <div className="pr-side"><h3>㈜나현</h3><p>생산관리</p><p>과장 · 생산 라인장</p><time>2024 — 2025.08</time></div>
            <div className="pr-detail"><h3>플라스틱사출 오퍼레이터/ 자동차 부품 생산 라인 운영</h3><p>현대·기아자동차 부품 제조 현장의 생산 운영과 약 <strong>20명의 현장 인력</strong>을 관리했습니다. 생산계획에 따라 공정을 운영하고 작업 인력을 배치했으며, 품질기준 준수와 안정적인 생산환경 유지를 담당했습니다.</p></div>
          </article>
          <article className="pr-entry pr-company">
            <div className="pr-side"><h3>OTOS</h3><p>수건·목재 판매 창업</p><time>2023 — 2024</time></div>
            <div className="pr-detail"><div className="pr-entry-title"><h3>와디즈 스피마코튼 <span>펀딩 1,206% 달성</span></h3><div className="pr-project-links"><ExternalLink href="https://www.wadiz.kr/web/campaign/detail/198814">와디즈 펀딩</ExternalLink></div></div><p>와디즈 펀딩과 쿠팡 목재 판매를 직접 기획·운영하며, <strong>‘무엇을 팔까’보다 고객의 어떤 문제를 풀어야 하는지</strong> 먼저 정의하고 시장 반응과 수익성으로 사업 가능성을 검증해 매출 약 1억 원을 달성했습니다.</p></div>
          </article>
        </section>

        <section className="pr-education" id="education" aria-labelledby="education-title">
          <h2 className="pr-section-title" id="education-title">Education</h2>
          <article className="pr-entry"><div className="pr-side"><h3>대구대학교</h3><p>실내건축디자인학과</p><time>2017.03 — 2023.08</time></div><div className="pr-detail"><p>공간 설계와 시각적 구성에 대한 체계적인 훈련을 통해 복잡한 정보를 효과적으로 구조화하고 명확하게 전달하는 역량을 길렀습니다.<br />실내인테리어 공모전 동아리 ‘러스틱’을 결성하고 <strong>동아리장을 맡아 프로젝트 기획과 구성원 간 협업을 주도했습니다.</strong></p><ul className="pr-awards" aria-label="수상 경력"><li><ExternalLink href={publicAssetPath("/awards/interior-deco-14-encouragement.jpg")}>14회 인테르니에 데코 공모전 장려상 수상</ExternalLink></li><li>2023 DGID 공모전 수상</li><li>학과 공로상 수상</li></ul></div></article>
        </section>
      </main>
      <footer className="pr-container pr-footer"><Link href="/uiux/" aria-label="UI/UX 디자이너 이력서로 전환">© 2026 KIM HEEJUN</Link><a href="#top">Back to top ↑</a></footer>
    </div>
  );
}
