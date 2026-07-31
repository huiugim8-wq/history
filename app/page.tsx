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
        <p>사용자가 끝까지 쓰는 AI 서비스를 만드는 개발자</p>
      </header>

      <main>
        <section className="profile" aria-labelledby="profile-title">
          <div className="profile-intro">
            <div>
              <h1 id="profile-title">
                안녕하세요,
                <br />
                AI 엔지니어 <strong>김희준</strong>입니다.
              </h1>

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

          <div className="profile-points">
            <p className="profile-context">
              실내건축디자인·제조업·창업을 거치며, 현장과 사용자의 문제를
              관찰하고 <strong>복잡한 정보를 구조화</strong>하는 방식을
              익혔습니다.
            </p>
            <p className="profile-principle">
              이 관점은 개발에서도 이어져, 요구사항을 기능 목록으로만
              받아들이지 않고 <strong>해결해야 할 문제와 성공 기준</strong>을
              먼저 구체화합니다.
            </p>
            <p className="profile-evidence">
              24시간 기준 약 9천만 건의 시장 데이터를 다루며 Kafka 이벤트
              분리, Redis TTL·REST 보완, 멱등 키와 저장 후 offset 커밋을
              적용했습니다. 그 결과 저장·분석 장애가 실시간 수집으로 전파되지
              않고, <strong>재전달된 이벤트가 중복 반영되지 않는</strong>{" "}
              파이프라인을 구성했습니다.
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
                    <span className="side-link-placeholder">
                      YouTube <small>준비 중</small>
                    </span>
                  </nav>
                </div>

                <div className="project-introduction">
                  <p>
                    시장 탐색부터 AI 분석·주문·거래 복기까지 한 화면에서
                    이어지는 개인 맞춤형 주식 트레이딩 플랫폼입니다.
                  </p>
                  <p>
                    24시간 동안 수집된 약 9천만 건의 시장 이벤트를 Kafka 이벤트
                    드리븐 구조로 처리하고, 수집·저장·분석이 독립적으로 확장하고
                    복구되도록 구성했습니다.
                  </p>
                  <p>
                    React 화면과 TypeScript 차트 엔진의 책임을 분리하고, 분석
                    시점에 고정한 시장·재무·뉴스 근거와 차트 분석 결과를
                    사용자가 직접 확인할 수 있도록 구현했습니다.
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
                      <h4>REST·WebSocket 흐름을 결합한 React 패널 구조</h4>
                      <p>
                        검색·차트·기업 분석·주문을 독립된 React 패널
                        컴포넌트로 구성하고, 공통 레지스트리에서 패널의 생성과
                        배치를 관리했습니다. 최초 조회와 과거 구간은 REST API로
                        보완하고 이후 데이터는 WebSocket으로 구독했습니다.
                        TypeScript 차트 엔진이 시간 기준으로 캔들을 병합해
                        중복 없이 연속된 차트를 유지하도록 구성했습니다.
                      </p>
                      <div
                        className="highlight-tags"
                        aria-label="React 패널과 데이터 흐름 관련 키워드"
                      >
                        {[
                          "React",
                          "Component Architecture",
                          "REST Backfill",
                          "WebSocket",
                          "Chart Engine",
                        ].map((keyword) => (
                          <code key={keyword}>{keyword}</code>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section className="project-highlight">
                    <span>02</span>
                    <div>
                      <h4>후보 생성과 검증을 분리한 차트 분석 알고리즘</h4>
                      <p>
                        캔들의 가격 반전과 변동성을 기준으로 의미 있는 피벗을
                        추출했습니다. 피벗을 가격대로 군집화해 지지·저항 후보를
                        만들고, 피벗 쌍과 선형회귀로 추세·패턴 후보를
                        계산했습니다. 접촉 횟수·가격 반응·선과의 오차·최근성·돌파
                        여부를 점수화해 기준을 통과한 후보만 분석 결과로
                        사용했습니다.
                      </p>
                      <div
                        className="highlight-tags"
                        aria-label="차트 분석 알고리즘 관련 키워드"
                      >
                        {[
                          "Pivot Detection",
                          "Clustering",
                          "Linear Regression",
                          "Candidate Scoring",
                        ].map((keyword) => (
                          <code key={keyword}>{keyword}</code>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section className="project-highlight">
                    <span>03</span>
                    <div>
                      <h4>분석 시점을 고정하고 근거를 추적하는 AI 분석 UI</h4>
                      <p>
                        분석 요청 시점의 시장·재무·뉴스 데이터를 Snapshot으로
                        고정해 기업 분석과 차트 패널이 동일한 시점의 근거를
                        사용하도록 구성했습니다. 수치 계산과 후보 판정은 재현
                        가능한 분석 로직이 담당하고, LLM은 조회·계산된 근거를
                        설명하도록 역할을 분리했습니다. React 패널에서는 분석
                        결과와 사용된 근거를 함께 확인할 수 있도록 구현했습니다.
                      </p>
                      <div
                        className="highlight-tags"
                        aria-label="차트·기업 분석 UI 관련 키워드"
                      >
                        {[
                          "Point-in-Time Snapshot",
                          "Evidence Trace",
                          "Deterministic Analysis",
                          "AI Guardrails",
                        ].map((keyword) => (
                          <code key={keyword}>{keyword}</code>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section className="project-highlight">
                    <span>04</span>
                    <div>
                      <h4>배포 중단을 해결한 Docker·Kubernetes 환경</h4>
                      <p>
                        React 앱과 TypeScript 차트 엔진을 Docker 멀티 스테이지
                        빌드로 이미지화하고 Nginx로 제공했습니다. EKS에서
                        프론트엔드·API·WebSocket 경로와 컨테이너 상태 검사를
                        구성했습니다. 클러스터 자원 부족으로 새로운 Pod가
                        실행되지 않아 배포가 멈추자, 자원 요청량과 Rolling
                        Update 정책을 조정해 서비스 중단 없이 배포가 완료되도록
                        개선했습니다.
                      </p>
                      <div
                        className="highlight-tags"
                        aria-label="프론트엔드 배포 관련 키워드"
                      >
                        {[
                          "Docker",
                          "Nginx",
                          "EKS",
                          "Rolling Update",
                          "Health Check",
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
