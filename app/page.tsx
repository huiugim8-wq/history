const experienceItems = [
  {
    title: "㈜나현",
    role: "자동차 부품 제조",
    period: "2024 — 2025.08",
    summary:
      "자동차 부품 제조 현장에서 생산 작업과 품질 기준 준수를 담당했습니다.",
  },
  {
    title: "OTOS",
    role: "수건·목재 판매 창업",
    period: "2023 — 2024 · 1년",
    link: {
      label: "와디즈 펀딩",
      href: "https://www.wadiz.kr/web/campaign/detail/198814",
    },
    summary: (
      <>
        와디즈 펀딩과 쿠팡 목재 판매를 직접 기획·운영하며,{" "}
        <strong>
          ‘무엇을 팔까’보다 고객의 어떤 문제를 풀어야 하는지
        </strong>{" "}
        먼저 정의하고 시장 반응과 수익성으로 사업 가능성을 검증해{" "}
        <strong>연 매출 약 1억 원</strong>을 달성했습니다.
      </>
    ),
  },
  {
    title: "대구대학교",
    role: "실내건축디자인학과",
    period: "2017.03 — 2023.08",
    summary:
      "공간 설계와 시각적 구성 훈련을 통해 복잡한 정보를 구조화하고 명확하게 전달하는 기반을 다졌습니다.",
  },
];

function ExternalArrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <>
      <header className="top-banner" id="top">
        <div className="top-banner-inner">
          <div className="top-banner-copy">
            <p>프론트엔드 개발자</p>
            <h1 id="profile-title">김희준</h1>

            <nav className="profile-links" aria-label="프로필 링크">
              <a href="mailto:huiugim8@gmail.com">Email</a>
              <a
                href="https://github.com/KFJG-Team1/gops"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </nav>
          </div>

          <img
            className="profile-photo"
            src="/profile-id.png"
            alt="정장을 입은 김희준의 증명사진"
          />
        </div>
      </header>

      <main>
        <section className="profile" aria-labelledby="profile-title">
          <div className="profile-points">
            <h2 className="profile-statement">
              “실내건축디자인과 창업에서 익힌 관찰력으로 복잡한 문제를 화면의
              구조로 풀어내는 프론트엔드 개발자”
            </h2>
            <p className="profile-context">
              저는 사용자 흐름을 먼저 정의하고, 화면과 데이터의 책임이 분명한
              설계를 지향합니다. 단순히 기능을 나열하는 것을 넘어, 24시간 약
              9천만 건의 시장 데이터를 다루는 환경에서 실시간·과거 데이터를
              하나의 차트 경험으로 연결하고 React 화면과 TypeScript 차트
              엔진을 분리해 일관된 사용자 경험과 기능별 확장성을 확보했습니다.
            </p>
          </div>
        </section>

        <section className="resume-section work-section" id="experience">
          <div className="section-title">
            <h2>Work &amp; Experience</h2>
          </div>

          <div className="resume-list">
            <article className="resume-item jungle-item" id="project">
              <div className="jungle-entry-header">
                <div className="resume-side">
                  <div className="experience-heading">
                    <h3>크래프톤 정글</h3>
                    <span aria-hidden="true">·</span>
                    <p>12기 졸업</p>
                  </div>
                  <time className="experience-period">2026.03 — 2026.07</time>
                </div>

                <img
                  className="jungle-logo"
                  src="/jungle-by-krafton.png"
                  alt="Jungle by KRAFTON"
                />
              </div>

              <div className="resume-detail jungle-detail">
                <div className="project-header">
                  <div className="project-title">
                    <p>실시간 투자 정보 플랫폼</p>
                  </div>
                  <nav className="project-links" aria-label="프로젝트 관련 링크">
                    <a
                      className="side-link"
                      href="https://github.com/KFJG-Team1/gops"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="프로젝트 GitHub 저장소 열기"
                    >
                      Github <ExternalArrow />
                    </a>
                    <span className="side-link-placeholder">
                      Blog <small>준비 중</small>
                    </span>
                    <a
                      className="side-link"
                      href="https://www.youtube.com/watch?v=8P4wiwDrvxs"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="프로젝트 YouTube 영상 열기"
                    >
                      YouTube <ExternalArrow />
                    </a>
                  </nav>
                </div>

                <div className="project-introduction">
                  <p>
                    시장 탐색·차트 분석·주문·거래 복기를 하나의 작업 화면에
                    연결한 AI 주식 트레이딩 플랫폼입니다.
                  </p>
                  <p>
                    24시간 기준 약 9천만 건의 시장 이벤트를 처리하는 Kafka
                    환경에서 React UI와 TypeScript 차트 엔진을 담당했습니다.
                  </p>
                </div>

                <p className="project-contribution-label">주요 구현</p>
                <div
                  className="project-highlights"
                  aria-label="프로젝트 핵심 역량"
                >
                  <section className="project-highlight">
                    <span>01</span>
                    <div>
                      <h4>
                        Agent 명령으로 조합되는 React 패널 컴포넌트 설계
                      </h4>
                      <ul className="project-achievements">
                        <li>
                          차트·뉴스·기업 분석·주문을 독립된 기능 컴포넌트로
                          분리하고, 공통 프레임이 선택·이동·크기 조절을
                          담당하도록 설계했습니다.
                        </li>
                        <li>
                          Layout Agent의 패널 종류·동작·우선순위를 런타임에서
                          검증하고 TypeScript Registry와 연결해 화면을
                          조합했습니다.
                        </li>
                      </ul>
                      <div
                        className="highlight-tags"
                        aria-label="TypeScript 패널 구조 관련 키워드"
                      >
                        {[
                          "React",
                          "TypeScript",
                          "Component Composition",
                          "Runtime Validation",
                          "Agent-driven UI",
                        ].map((keyword) => (
                          <code key={keyword}>{keyword}</code>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section className="project-highlight">
                    <span>02</span>
                    <div>
                      <h4>
                        CSR 기반 차트 엔진의 데이터 시각화와 UX 최적화
                      </h4>
                      <ul className="project-achievements">
                        <li>
                          초기·과거 데이터는 필요한 구간만 REST API로 조회하고
                          이후 변화는 WebSocket으로 반영해 중복 요청을 줄이고
                          차트의 연속성을 유지했습니다.
                        </li>
                        <li>
                          브라우저 TypeScript 엔진에서 두 경로를 시간 기준으로
                          병합하고 Canvas 2D 레이어와 렌더링 주기를 분리해
                          성능과 접근성을 함께 고려했습니다.
                        </li>
                      </ul>
                      <div
                        className="highlight-tags"
                        aria-label="React 차트 데이터 흐름과 접근성 관련 키워드"
                      >
                        {[
                          "TypeScript CSR",
                          "REST API",
                          "WebSocket",
                          "Canvas 2D",
                          "Web Accessibility",
                        ].map((keyword) => (
                          <code key={keyword}>{keyword}</code>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section className="project-highlight">
                    <span>03</span>
                    <div>
                      <h4>
                        후보 생성과 검증을 분리한 TypeScript 차트 분석 알고리즘
                      </h4>
                      <ul className="project-achievements">
                        <li>
                          캔들 데이터에서 피벗을 추출하고 군집화·선형회귀로
                          후보선을 생성했습니다.
                        </li>
                        <li>
                          접촉·반응·오차·돌파를 점수화해 검증된
                          지지·저항·추세·패턴과 판단 근거를 차트에 표시했습니다.
                        </li>
                      </ul>
                      <div
                        className="highlight-tags"
                        aria-label="차트 분석 알고리즘 관련 키워드"
                      >
                        {[
                          "TypeScript",
                          "Data Structures",
                          "Linear Regression",
                          "Candidate Scoring",
                        ].map((keyword) => (
                          <code key={keyword}>{keyword}</code>
                        ))}
                      </div>
                    </div>
                  </section>

                </div>
              </div>
            </article>
            {experienceItems.map((experience) => (
              <article className="resume-item" key={experience.title}>
                <div className="experience-header">
                  <div className="resume-side">
                    <div className="experience-heading">
                      <h3>{experience.title}</h3>
                      <span aria-hidden="true">·</span>
                      <p>{experience.role}</p>
                    </div>
                    <time className="experience-period">
                      {experience.period}
                    </time>
                  </div>

                  {experience.link ? (
                    <a
                      className="side-link experience-header-link"
                      href={experience.link.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${experience.title} ${experience.link.label} 프로젝트 열기`}
                    >
                      {experience.link.label} <ExternalArrow />
                    </a>
                  ) : null}
                </div>

                <div className="resume-detail">
                  <p className="summary-box">{experience.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <p>함께 만들 이야기가 있다면 편하게 연락해 주세요.</p>
          <a href="mailto:huiugim8@gmail.com">
            huiugim8@gmail.com <ExternalArrow />
          </a>
        </section>
      </main>

      <footer>
        <p>© 2026 KIM HEEJUN</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
