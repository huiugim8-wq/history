import SelectableTags from "./selectable-tags";

const projectNotionUrl =
  "https://app.notion.com/p/3aa0463ff9f08065b16bd4cbbc87d321?source=copy_link";

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
];

const educationItem = {
  title: "대구대학교",
  role: "실내건축디자인학과",
  period: "2017.03 — 2023.08",
  summary:
    "공간 설계와 시각적 구성 훈련을 통해 복잡한 정보를 구조화하고 명확하게 전달하는 기반을 다졌습니다.",
};

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
                    <a
                      className="side-link notion-link"
                      href={projectNotionUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="프로젝트 Notion 상세 문서 열기"
                    >
                      Notion <ExternalArrow />
                    </a>
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
                        <a
                          className="project-highlight-link"
                          href={projectNotionUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          공통 프레임과 기능 패널을 분리한 React 컴포넌트 설계{" "}
                          <ExternalArrow />
                        </a>
                      </h5>
                      <div className="project-achievements">
                        <p>
                          43종의 패널이 공통 프레임을 재사용하도록 설계하고,
                          크기·배치·우선순위를 TypeScript Registry 한곳에서
                          관리하여 Layout Agent 명령도 등록된 패널로만 변환되게
                          했습니다.
                        </p>
                      </div>
                      <SelectableTags
                        ariaLabel="React 패널 구조 키워드"
                        labels={[
                          "React",
                          "TypeScript",
                          "Component Composition",
                          "Runtime Validation",
                          "Agent-driven UI",
                        ]}
                      />
                    </div>
                  </section>

                  <section className="project-highlight">
                    <span aria-hidden="true">•</span>
                    <div>
                      <h5>
                        <a
                          className="project-highlight-link"
                          href={projectNotionUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          REST API·WebSocket과 2-Layer Canvas를 적용한 차트 엔진{" "}
                          <ExternalArrow />
                        </a>
                      </h5>
                      <div className="project-achievements">
                        <p>
                          24시간 9,327만 건(평균 초당 약 1,080건)을 REST
                          API·WebSocket으로 구간 조회·실시간 반영했습니다.
                        </p>
                        <p>
                          정적 차트와 포인터 UI를 2-Layer Canvas로 분리해 이동
                          시 <strong>오버레이만 갱신</strong>했습니다.
                        </p>
                      </div>
                      <SelectableTags
                        ariaLabel="차트 엔진 키워드"
                        labels={[
                          "TypeScript CSR",
                          "REST API",
                          "WebSocket",
                          "Canvas 2D",
                          "requestAnimationFrame",
                        ]}
                      />
                    </div>
                  </section>

                  <section className="project-highlight">
                    <span aria-hidden="true">•</span>
                    <div>
                      <h5>
                        <a
                          className="project-highlight-link"
                          href={projectNotionUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          피벗 군집·선형회귀로 지지·저항선을 생성한 TypeScript
                          알고리즘 <ExternalArrow />
                        </a>
                      </h5>
                      <div className="project-achievements">
                        <p>
                          피벗 군집·선형회귀로 지지·저항 후보선을 생성하고,
                          접촉·반응·오차·돌파 점수로{" "}
                          <strong>유효한 선만 선별</strong>했습니다.
                        </p>
                        <p>
                          선택된 선과 검증 근거를 별도 차트 레이어에 표시해{" "}
                          <strong>동일 조건의 결과와 선정 이유를 재현</strong>
                          했습니다.
                        </p>
                      </div>
                      <SelectableTags
                        ariaLabel="차트 분석 알고리즘 키워드"
                        labels={[
                          "TypeScript",
                          "Data Structures",
                          "Clustering",
                          "Linear Regression",
                          "Candidate Scoring",
                        ]}
                      />
                    </div>
                  </section>

                </div>

                <section
                  className="supporting-project"
                  aria-labelledby="mini-react-title"
                >
                  <div className="project-header">
                    <div className="project-title">
                      <span>PROJECT 2</span>
                      <h4 id="mini-react-title">
                        mini-react — React 가상 DOM 실행 환경
                      </h4>
                    </div>
                    <a
                      className="side-link"
                      href="https://github.com/woonyong-kr/mini-react2"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="mini-react GitHub 저장소 열기"
                    >
                      Github <ExternalArrow />
                    </a>
                  </div>
                  <div className="project-introduction">
                    <p>
                      React API를 흉내 내는 데 그치지 않고, 상태 변경이 실제 DOM
                      업데이트로 이어지는 전 과정을 직접 설계했습니다. 구현한
                      런타임은 1,025개 카드의 검색·정렬·가상 스크롤이 동작하는
                      SPA에 적용해 검증했습니다.
                    </p>
                  </div>
                  <div
                    className="project-highlights"
                    aria-label="mini-react 핵심 구현"
                  >
                    <section className="project-highlight">
                      <span aria-hidden="true">•</span>
                      <div>
                        <h5>
                          <a
                            className="project-highlight-link"
                            href="https://github.com/woonyong-kr/mini-react2/blob/main/src/core/renderer-dom/patch.js"
                            target="_blank"
                            rel="noreferrer"
                          >
                            전체 DOM을 다시 그리지 않고, 바뀐 부분만 갱신했습니다{" "}
                            <ExternalArrow />
                          </a>
                        </h5>
                        <div className="project-achievements">
                          <p>
                            렌더 단계에서는 이전·다음 UI 트리를 비교해 변경
                            목록을 만들고, 적용 단계에서 속성·텍스트·자식 노드만
                            수정했습니다. 계산과 DOM 조작을 분리해 문제가 생긴
                            단계를 추적하고 테스트할 수 있게 했습니다.
                          </p>
                        </div>
                      </div>
                    </section>
                    <section className="project-highlight">
                      <span aria-hidden="true">•</span>
                      <div>
                        <h5>
                          <a
                            className="project-highlight-link"
                            href="https://github.com/woonyong-kr/mini-react2/blob/main/src/core/reconciler/diffChildren.js"
                            target="_blank"
                            rel="noreferrer"
                          >
                            정렬·필터 후에도 카드 정보가 섞이지 않게 했습니다{" "}
                            <ExternalArrow />
                          </a>
                        </h5>
                        <div className="project-achievements">
                          <p>
                            index 기준 비교에서 카드와 DOM의 대응이 어긋나는
                            원인을 key 기반 동일성 문제로 좁혔습니다. 이동이
                            필요한 노드만 재배치해 1,025개 카드의 정렬·필터·
                            <a
                              className="project-evidence-link"
                              href="https://github.com/woonyong-kr/mini-react2/blob/main/src/app/pages/CollectionPage.js"
                              target="_blank"
                              rel="noreferrer"
                            >
                              가상 스크롤
                            </a>
                            에서도 이미지와 타입 정보가 올바른 카드에 남도록
                            했습니다.
                          </p>
                        </div>
                      </div>
                    </section>
                    <section className="project-highlight">
                      <span aria-hidden="true">•</span>
                      <div>
                        <h5>
                          <a
                            className="project-highlight-link"
                            href="https://github.com/woonyong-kr/mini-react2/blob/main/src/app/components/CardTile.js"
                            target="_blank"
                            rel="noreferrer"
                          >
                            마우스를 움직일 때마다 전체 UI를 다시 그리지 않았습니다{" "}
                            <ExternalArrow />
                          </a>
                        </h5>
                        <div className="project-achievements">
                          <p>
                            검색·필터처럼 UI 구조가 바뀌는 작업은 가상 DOM이
                            처리하고, 카드 기울기·홀로그램처럼 초당 여러 번
                            발생하는 효과는 CSS 변수만 갱신했습니다. 상태
                            렌더링과 시각 효과를 분리해 불필요한 비교 작업을
                            피했습니다.
                          </p>
                        </div>
                      </div>
                    </section>
                    <section className="project-highlight">
                      <span aria-hidden="true">•</span>
                      <div>
                        <h5>
                          <a
                            className="project-highlight-link"
                            href="https://github.com/woonyong-kr/mini-react2/blob/main/src/core/runtime/scheduleUpdate.js"
                            target="_blank"
                            rel="noreferrer"
                          >
                            상태는 보존하고, 연속 업데이트는 한 번으로 합쳤습니다{" "}
                            <ExternalArrow />
                          </a>
                        </h5>
                        <div className="project-achievements">
                          <p>
                            <a
                              className="project-evidence-link"
                              href="https://github.com/woonyong-kr/mini-react2/tree/main/src/core/runtime/hooks"
                              target="_blank"
                              rel="noreferrer"
                            >
                              Hook 호출 순서에 따라 state·effect·memo 값을 유지
                            </a>
                            하고 effect의 정리 시점을 관리했습니다. 연속 상태
                            변경은 microtask에 모아 한 번만 렌더링하되, 즉시
                            반영이 필요할 때는 sync 전략을 선택할 수 있게
                            했습니다.
                          </p>
                        </div>
                      </div>
                    </section>
                    <section className="project-highlight">
                      <span aria-hidden="true">•</span>
                      <div>
                        <h5>
                          <a
                            className="project-highlight-link"
                            href="https://github.com/woonyong-kr/mini-react2/blob/main/src/core/engine/inspect.js"
                            target="_blank"
                            rel="noreferrer"
                          >
                            최적화 효과를 감이 아니라 숫자로 확인했습니다{" "}
                            <ExternalArrow />
                          </a>
                        </h5>
                        <div className="project-achievements">
                          <p>
                            Render/Patch Inspector에서 비교 전략별 생성 Patch
                            수를 확인해 어떤 방식이 DOM 작업을 줄이는지
                            검증했습니다. Hook·Diff/Patch·가상 스크롤을 포함한
                            78개 테스트를 모두 통과했습니다.
                          </p>
                        </div>
                      </div>
                    </section>
                  </div>
                  <ul
                    className="project-proof-points"
                    aria-label="mini-react 검증 결과"
                  >
                    <li>
                      <strong>1,025개</strong>
                      <span>카드 목록으로 검증</span>
                    </li>
                    <li>
                      <strong>78 / 78</strong>
                      <span>단위·기능 테스트 통과</span>
                    </li>
                    <li>
                      <strong>3개</strong>
                      <span>비교 전략별 Patch 계측</span>
                    </li>
                  </ul>
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

        <section
          className="resume-section education-section"
          id="education"
          aria-labelledby="education-title"
        >
          <div className="section-title">
            <h2 id="education-title">Education</h2>
          </div>

          <div className="resume-list">
            <article className="resume-item">
              <div className="resume-side">
                <div className="experience-heading">
                  <h3>{educationItem.title}</h3>
                  <p>{educationItem.role}</p>
                </div>
                <time className="experience-period">{educationItem.period}</time>
              </div>

              <div className="resume-detail">
                <p className="summary-box">{educationItem.summary}</p>
              </div>
            </article>
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
