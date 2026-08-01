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
    period: "2023 — 2024",
    projectTitle: "와디즈 스피마코튼 펀딩 1,206% 달성",
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

            <address className="profile-contact" aria-label="연락처">
              <a className="contact-item" href="tel:01082016811">
                <strong>Phone</strong>
                <span>010 8201 6811</span>
              </a>
              <a className="contact-item" href="mailto:huiugim8@gmail.com">
                <strong>Email</strong>
                <span>huiugim8@gmail.com</span>
              </a>
              <a
                className="contact-item"
                href="https://github.com/huiugim8-wq"
                target="_blank"
                rel="noreferrer"
              >
                <strong>Github</strong>
              </a>
            </address>
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
              <span aria-hidden="true">“</span>{" "}
              <span className="profile-statement-text">
                소통을 바탕으로 구현하는 프론트엔드 개발자
              </span>{" "}
              <span aria-hidden="true">”</span>
            </h2>
            <p className="profile-context">
              <strong>실내건축디자인을 전공/ 창업 과정</strong>에서 체험단을
              진행하며 사용자의 피드백을 실행 가능한 형태로 구체화해 왔고, 이
              경험은 개발에서도 사용자 문제를 기준으로 해결책을 찾는 태도로
              이어졌습니다.
            </p>
            <p className="profile-context">
              비전공자로서 7개월 만에{" "}
              <strong>9천만 건의 주식 틱 이벤트</strong>를 처리하는 환경에서{" "}
              <strong>React 조회 패널과 TypeScript 주식차트 엔진</strong>을
              구현했으며, 과거 데이터는 REST로, 최신 데이터는 WebSocket으로
              반영하고 정적·실시간 요소를 두 개의 Canvas로 분리해 필요한 부분만
              다시 그리도록 설계했습니다.
            </p>
            <p className="profile-context">
              개발 영역을 <strong>프론트엔드</strong>에 한정하지 않고, 백엔드
              구조까지 이해하며 원활하게{" "}
              <strong>협업하는 개발자</strong>를 지향합니다.
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
              </div>

              <div className="resume-detail jungle-detail">
                <div className="project-header">
                  <div className="project-title">
                    <span>PROJECT 1</span>
                    <h4>실시간 투자 정보 플랫폼</h4>
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
                    AI가 시장 탐색과 차트 분석을 지원하고, 주문부터 거래
                    복기까지 하나의 흐름으로 연결하는 주식 트레이딩
                    플랫폼입니다.
                  </p>
                </div>

                <section className="project-team" aria-labelledby="team-title">
                  <div className="project-team-heading">
                    <span aria-hidden="true">•</span>
                    <h5 id="team-title">팀 프로젝트 5인</h5>
                  </div>
                  <div className="project-role-tags" aria-label="프로젝트 역할 구성">
                    {["Frontend", "Infrastructure", "Backend", "AI"].map(
                      (role) => (
                        <span
                          className={role === "Frontend" ? "is-primary" : ""}
                          key={role}
                        >
                          {role}
                        </span>
                      ),
                    )}
                  </div>
                </section>

                <div
                  className="project-highlights"
                  aria-label="프로젝트 핵심 역량"
                >
                  <section className="project-highlight">
                    <span aria-hidden="true">•</span>
                    <div>
                      <h5>
                        공통 프레임과 기능 패널을 분리한 React 컴포넌트 설계
                      </h5>
                      <div className="project-achievements">
                        <p>
                          43종의 패널이 공통 프레임을 재사용하도록 설계하고,
                          크기·배치·우선순위를 TypeScript Registry 한곳에서
                          관리하여 Layout Agent 명령도 등록된 패널로만 변환되게
                          했습니다.
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
                      <h5>
                        REST·WebSocket과 2-Layer Canvas를 적용한 차트 엔진
                      </h5>
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
                      <h5>
                        후보 생성과 검증을 분리한 TypeScript 차트 분석 알고리즘
                      </h5>
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
                  className="supporting-project"
                  aria-labelledby="mini-react-title"
                >
                  <div className="supporting-project-header">
                    <div className="project-title">
                      <span>PROJECT 2</span>
                      <h4 id="mini-react-title">React Virtual DOM Runtime</h4>
                    </div>
                    <a
                      className="side-link"
                      href="https://github.com/huiugim8-wq/mini-react2"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="React Virtual DOM Runtime GitHub 저장소 열기"
                    >
                      Github <ExternalArrow />
                    </a>
                  </div>
                  <p className="supporting-project-summary">
                    React의 렌더링 흐름을 이해하기 위해 함수형 컴포넌트,
                    Hooks와 Virtual DOM 런타임을 프레임워크 없이 구현했습니다.
                  </p>
                  <ul className="project-bullet-list">
                    <li>
                      <strong>Virtual DOM 동기화:</strong> 상태 변경 시 이전·다음
                      VDOM을 비교하고, 변경된 속성·텍스트·자식 노드만 Patch로
                      실제 DOM에 반영
                    </li>
                    <li>
                      <strong>Keyed Reconciliation:</strong> key로 리스트 항목의
                      동일성을 유지하고 이동 Patch를 계산해, 1,025개 카드의
                      정렬·필터·가상 스크롤에서 노드가 섞이는 문제 해결
                    </li>
                    <li>
                      <strong>Hooks &amp; Batching:</strong> useState·useEffect·
                      useMemo의 슬롯과 생명주기를 구현하고, 같은 실행 구간의
                      연속 상태 변경을 microtask 한 번의 업데이트로 병합
                    </li>
                    <li>
                      <strong>Fiber 비교:</strong> 동기식
                      render→diff→patch→commit의 한계를 확인하고, Fiber의 작업
                      분할·우선순위 스케줄링과의 차이를 문서화
                    </li>
                  </ul>
                  <p className="project-verification">
                    Hook 슬롯·Diff·Patch·리스트 재정렬·생명주기를 검증한{" "}
                    <strong>78개 테스트를 모두 통과</strong>했습니다.
                  </p>
                  <div
                    className="highlight-tags"
                    aria-label="React Virtual DOM Runtime 키워드"
                  >
                    {[
                      "JavaScript",
                      "Virtual DOM",
                      "Diff & Patch",
                      "Hooks",
                      "Microtask Batching",
                      "Fiber Comparison",
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
                </div>

                <div className="resume-detail">
                  {experience.projectTitle ? (
                    <div className="project-header experience-project-header">
                      <div className="project-title">
                        <h4>{experience.projectTitle}</h4>
                      </div>
                      {experience.link ? (
                        <nav
                          className="project-links"
                          aria-label={`${experience.title} 프로젝트 관련 링크`}
                        >
                          <a
                            className="side-link"
                            href={experience.link.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${experience.title} ${experience.link.label} 프로젝트 열기`}
                          >
                            {experience.link.label} <ExternalArrow />
                          </a>
                        </nav>
                      ) : null}
                    </div>
                  ) : null}
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
