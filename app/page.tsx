import Link from "next/link";
import PrintButton from "./print-button";
import SelectableTags from "./selectable-tags";

const experienceItems = [
  {
    title: "㈜나현",
    role: "생산관리",
    position: "과장 · 생산 라인장",
    period: "2024 — 2025.08",
    summary: (
      <>
        현대·기아자동차 부품 제조 현장의 생산 운영과 약{" "}
        <strong>20명의 현장 인력을 관리</strong>했습니다. 생산계획에 따라
        공정을 운영하고 작업 인력을 배치했으며, 품질기준 준수와 안정적인
        생산환경 유지를 담당했습니다.
      </>
    ),
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
  summary: [
    {
      id: "design",
      content:
        "공간 설계와 시각적 구성에 대한 체계적인 훈련을 통해 복잡한 정보를 효과적으로 구조화하고 명확하게 전달하는 역량을 길렀습니다.",
    },
    {
      id: "leadership",
      content: (
        <>
          실내인테리어 공모전 동아리 ‘러스틱’을 결성하고{" "}
          <strong>
            동아리장을 맡아 프로젝트 기획과 구성원 간 협업을 주도했습니다.
          </strong>
        </>
      ),
    },
  ],
  awards: [
    "인테리어앤데코 공모전 수상",
    "DGID 공모전 수상",
    "학과 공로상 수상",
  ],
};

function ExternalArrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <div className="resume-sheet">
      <header className="top-banner" id="top">
        <div className="top-banner-inner">
          <nav className="site-nav" aria-label="주요 메뉴">
            <Link className="site-nav-link" href="/">
              이력서
            </Link>
            <Link className="site-nav-link" href="/cover-letter">
              자기소개서
            </Link>
            <Link className="site-nav-link" href="/portfolio">
              포트폴리오
            </Link>
            <Link className="site-nav-link" href="/blog">
              블로그
            </Link>
            <a
              className="site-nav-link"
              href="https://github.com/huiugim8-wq"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <PrintButton />
          </nav>

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
        <section
          className="profile"
          id="about"
          aria-labelledby="profile-title"
        >
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
                      href="https://github.com/huiugim8-wq/gops-stock-trading-platform"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="프로젝트 GitHub 저장소 열기"
                    >
                      Github <ExternalArrow />
                    </a>
                    <Link
                      className="side-link"
                      href="/portfolio/trading-platform"
                      aria-label="실시간 투자 정보 플랫폼 상세 페이지 열기"
                    >
                      프로젝트 상세 <ExternalArrow />
                    </Link>
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

                <div className="project-introduction project-introduction--single-line">
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
                        공통 프레임과 기능 패널을 분리한{" "}
                        <Link
                          className="project-inline-link"
                          href="/blog/react-panel-registry"
                        >
                          React 컴포넌트 설계 <ExternalArrow />
                        </Link>
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
                        <Link
                          className="project-inline-link"
                          href="/blog/rest-websocket"
                        >
                          REST API·WebSocket <ExternalArrow />
                        </Link>
                        {" "}과{" "}
                        <Link
                          className="project-inline-link"
                          href="/blog/two-layer-canvas"
                        >
                          2-Layer Canvas를 적용한 주식차트 <ExternalArrow />
                        </Link>
                      </h5>
                      <div className="project-achievements">
                        <p>
                          24시간 9,327만 건(평균 초당 약 1,080건)을 REST
                          API·WebSocket으로 구간 조회·실시간 반영했습니다.{" "}
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
                        피벗 군집·선형회귀로 지지·저항선을 생성한{" "}
                        <Link
                          className="project-inline-link"
                          href="/blog/chart-analysis"
                        >
                          TypeScript 알고리즘 <ExternalArrow />
                        </Link>
                      </h5>
                      <div className="project-achievements">
                        <p>
                          피벗 군집·선형회귀로 지지·저항 후보선을 생성하고,
                          접촉·반응·오차·돌파 점수로{" "}
                          <strong>유효한 선만 선별</strong>했습니다.{" "}
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
                      <h4 id="mini-react-title">React 가상 DOM 실행 환경</h4>
                    </div>
                    <nav
                      className="project-links"
                      aria-label="React 가상 DOM 실행 환경 관련 링크"
                    >
                      <a
                        className="side-link"
                        href="https://github.com/huiugim8-wq/react-virtual-dom"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="React 가상 DOM 실행 환경 GitHub 저장소 열기"
                      >
                        Github <ExternalArrow />
                      </a>
                      <Link
                        className="side-link"
                        href="/portfolio/react-runtime"
                        aria-label="React 가상 DOM 실행 환경 상세 페이지 열기"
                      >
                        프로젝트 상세 <ExternalArrow />
                      </Link>
                    </nav>
                  </div>
                  <div className="project-introduction">
                    <p>
                      함수형 컴포넌트·Hooks·Virtual DOM·Diff/Patch를
                      프레임워크 없이 구현한 React 실행 환경입니다.
                    </p>
                  </div>
                  <div
                    className="project-highlights"
                    aria-label="React 가상 DOM 실행 환경 핵심 구현"
                  >
                    <section className="project-highlight">
                      <span aria-hidden="true">•</span>
                      <div>
                        <h5>Diff &amp; Patch · 변경된 DOM만 갱신</h5>
                        <div className="project-achievements">
                          <p>
                            이전·다음 VDOM을 비교하고 속성·텍스트·자식 노드의
                            변경만 실제 DOM에 반영했습니다.
                          </p>
                        </div>
                      </div>
                    </section>
                    <section className="project-highlight">
                      <span aria-hidden="true">•</span>
                      <div>
                        <h5>Keyed Reconciliation · 목록 상태 유지</h5>
                        <div className="project-achievements">
                          <p>
                            key 기반 동일성과 이동 Patch로 1,025개 카드의
                            정렬·필터·가상 스크롤에서도 상태가 섞이지 않게
                            했습니다.
                          </p>
                        </div>
                      </div>
                    </section>
                    <section className="project-highlight">
                      <span aria-hidden="true">•</span>
                      <div>
                        <h5>Hooks &amp; Batching · 상태 보존과 업데이트 병합</h5>
                        <div className="project-achievements">
                          <p>
                            useState·useEffect·useMemo의 값과 생명주기를
                            유지하고, 연속 상태 변경을 microtask 단위로
                            묶었습니다.
                          </p>
                        </div>
                      </div>
                    </section>
                    <section className="project-highlight">
                      <span aria-hidden="true">•</span>
                      <div>
                        <h5>78개 테스트 · 렌더링 흐름 검증</h5>
                        <div className="project-achievements">
                          <p>
                            Hook·Diff/Patch·리스트 재정렬·생명주기 테스트 78개를
                            모두 통과했습니다.
                          </p>
                        </div>
                      </div>
                    </section>
                  </div>
                  <SelectableTags
                    ariaLabel="React 가상 DOM 실행 환경 키워드"
                    labels={[
                      "JavaScript",
                      "Virtual DOM",
                      "Diff & Patch",
                      "Hooks",
                      "Microtask Batching",
                    ]}
                  />
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
                      {"position" in experience && experience.position ? (
                        <p className="experience-position">
                          {experience.position}
                        </p>
                      ) : null}
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
                <div className="education-copy">
                  {educationItem.summary.map((paragraph) => (
                    <p className="summary-box" key={paragraph.id}>
                      {paragraph.content}
                    </p>
                  ))}
                </div>
                <ul className="education-awards" aria-label="수상 경력">
                  {educationItem.awards.map((award) => (
                    <li key={award}>{award}</li>
                  ))}
                </ul>
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
