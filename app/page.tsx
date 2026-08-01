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
    <div className="resume-sheet">
      <header className="top-banner" id="top">
        <div className="top-banner-inner">
          <div className="top-banner-copy">
            <p>프론트엔드 개발자</p>
            <h1 id="profile-title">김희준</h1>

            <nav className="profile-links" aria-label="프로필 링크">
              <a href="mailto:huiugim8@gmail.com">Email</a>
              <a
                href="https://github.com/huiugim8-wq"
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
              소통을 바탕으로 구현하는 프론트엔드 개발자
            </h2>
            <p className="profile-context">
              실내건축디자인을 전공하고 창업 과정에서 체험단을 운영하며 사용자의
              피드백을 실행 가능한 형태로 구체화해 왔고, 이 경험은 개발에서도
              사용자의 문제를 기준으로 해결책을 찾는 태도로 이어졌습니다.
            </p>
            <p className="profile-context">
              비전공자로서 7개월 만에 9천만 건의 주식 틱 이벤트를 처리하는
              환경에서 React 조회 패널과 TypeScript 차트 엔진을 구현했으며, 과거
              데이터는 REST로, 최신 데이터는 WebSocket으로 반영하고 정적·실시간
              요소를 두 개의 Canvas로 분리해 필요한 부분만 다시 그리도록
              설계했습니다.
            </p>
            <p className="profile-context">
              개발 영역을 프론트엔드에 한정하지 않고, 백엔드 구조까지 이해하며
              원활하게 협업하는 개발자를 지향합니다.
            </p>
          </div>
        </section>

        <section className="resume-section work-section" id="experience">
          <div className="section-title">
            <h2>Work &amp; Experience</h2>
          </div>

          <div className="resume-list">
            <article className="resume-item jungle-item" id="project">
              <div className="resume-side jungle-side">
                <div className="experience-heading">
                  <h3>크래프톤 정글</h3>
                  <p>12기 졸업</p>
                </div>
                <time className="experience-period">2026.03 — 2026.07</time>

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
                      Github
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
                      YouTube
                    </a>
                  </nav>
                </div>

                <div className="project-introduction">
                  <p>
                    AI가 시장 탐색과 차트 분석을 지원하고, 주문부터 거래
                    복기까지 하나의 흐름으로 연결하는 주식 트레이딩
                    플랫폼입니다.
                  </p>
                </div>

                <div
                  className="project-highlights"
                  aria-label="프로젝트 핵심 역량"
                >
                  <section className="project-highlight">
                    <span aria-hidden="true">•</span>
                    <div>
                      <h4>
                        공통 프레임과 기능 패널을 분리한 React 컴포넌트 설계
                      </h4>
                      <div className="project-achievements">
                        <p>
                          <strong>43종의 패널</strong>이 공통 프레임을 재사용하도록
                          설계하고, 크기·배치·우선순위를{" "}
                          <strong>TypeScript Registry 한곳에서 관리</strong>해
                          Layout Agent 명령도{" "}
                          <strong>등록된 패널로만 변환</strong>되게 했습니다.
                        </p>
                      </div>
                      <div
                        className="highlight-tags"
                        aria-label="React 패널 구조 키워드"
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
                    <span aria-hidden="true">•</span>
                    <div>
                      <h4>
                        REST·WebSocket과 2-Layer Canvas를 적용한 차트 엔진
                      </h4>
                      <div className="project-achievements">
                        <p>
                          기존 데이터 범위 밖의 누락 구간만 REST로 조회하고 이후
                          시장 이벤트는 WebSocket으로 반영해,{" "}
                          <strong>전체 구간을 다시 요청하지 않고</strong> 실시간
                          차트를 유지했습니다.
                        </p>
                        <p>
                          정적 차트와 포인터·가이드 UI를 2개의 Canvas로 분리해,
                          포인터 이동 시{" "}
                          <strong>
                            정적 차트의 재렌더링 없이 오버레이 Canvas만 갱신
                          </strong>
                          하도록 구현했습니다.
                        </p>
                      </div>
                      <div
                        className="highlight-tags"
                        aria-label="차트 엔진 키워드"
                      >
                        {[
                          "TypeScript CSR",
                          "REST API",
                          "WebSocket",
                          "Canvas 2D",
                          "requestAnimationFrame",
                        ].map((keyword) => (
                          <code key={keyword}>{keyword}</code>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section className="project-highlight">
                    <span aria-hidden="true">•</span>
                    <div>
                      <h4>
                        후보 생성과 검증을 분리한 TypeScript 차트 분석 알고리즘
                      </h4>
                      <div className="project-achievements">
                        <p>
                          피벗 군집과 선형회귀로 후보선을 생성하고
                          접촉·가격 반응·오차·돌파를 평가해,{" "}
                          <strong>기준을 통과한 후보만 차트에 표시</strong>
                          했습니다.
                        </p>
                        <p>
                          후보 생성과 검증을 분리해 동일한 데이터와 조건에서
                          같은 분석 결과를 재현하고, 선택된 선과 평가 근거를
                          별도 차트 레이어에 표시해{" "}
                          <strong>
                            사용자가 선정 이유를 확인
                          </strong>
                          할 수 있도록 구성했습니다.
                        </p>
                      </div>
                      <div
                        className="highlight-tags"
                        aria-label="차트 분석 알고리즘 키워드"
                      >
                        {[
                          "TypeScript",
                          "Data Structures",
                          "Clustering",
                          "Linear Regression",
                          "Candidate Scoring",
                        ].map((keyword) => (
                          <code key={keyword}>{keyword}</code>
                        ))}
                      </div>
                    </div>
                  </section>

                </div>

                <section
                  className="pintos-experience"
                  aria-labelledby="pintos-title"
                >
                  <h4 id="pintos-title">
                    Pintos 시스템 콜 구현과 실행 흐름 추적
                  </h4>
                  <div className="project-achievements">
                    <p>
                      Pintos에서 read·write·open·close 시스템 콜을 구현하고,
                      사용자 프로그램의 인자가 레지스터와 interrupt frame을
                      거쳐 커널 함수로 전달되는 흐름을 추적했습니다.
                    </p>
                    <p>
                      <code>syscall-entry.S</code>와 GDB로 사용자 모드에서 커널
                      모드로 전환되는 지점을 어셈블리와 레지스터 수준에서
                      확인하고, 프론트엔드의 HTTP GET 요청이 백엔드의 소켓
                      I/O와 운영체제 시스템 콜로 이어지는 구조를 이해했습니다.
                    </p>
                  </div>
                  <div className="highlight-tags" aria-label="Pintos 키워드">
                    {[
                      "Pintos",
                      "C",
                      "System Call",
                      "x86-64 Assembly",
                      "GDB",
                    ].map((keyword) => (
                      <code key={keyword}>{keyword}</code>
                    ))}
                  </div>
                </section>
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
    </div>
  );
}
