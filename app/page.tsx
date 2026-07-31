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
                    React 화면과 TypeScript 차트 엔진의 책임을 분리하고, 분석
                    시점에 고정한 시장·재무·뉴스 근거와 차트 분석 결과를
                    사용자가 직접 확인할 수 있도록 구현했습니다.
                  </p>
                </div>

                <div
                  className="project-highlights"
                  aria-label="프로젝트 핵심 역량"
                >
                  <section className="project-highlight">
                    <span>01</span>
                    <div>
                      <h4>Docker·Kubernetes 기반 프론트엔드 배포</h4>
                      <p>
                        React 앱과 TypeScript 차트 엔진을 Docker 멀티 스테이지
                        빌드로 이미지화하고 Nginx로 제공했습니다. EKS에서
                        프론트엔드·API·WebSocket 경로와 상태 검사를 구성했으며,
                        배포 중 자원 부족으로 업데이트가 멈추는 문제는 컨테이너
                        자원과 Rolling Update 설정을 조정해 해결했습니다.
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

                  <section className="project-highlight">
                    <span>02</span>
                    <div>
                      <h4>React와 분리한 TypeScript 차트 엔진</h4>
                      <p>
                        React는 검색·분석·주문 패널과 사용자 상호작용을 담당하고,
                        TypeScript 차트 엔진은 캔들 상태·화면 좌표·보조지표·작도
                        결과를 관리하도록 분리했습니다. 기능별 패널을 독립
                        컴포넌트로 구성해 하나의 작업 화면에서 조합하고 확장할 수
                        있도록 설계했습니다.
                      </p>
                      <div
                        className="highlight-tags"
                        aria-label="React 차트 엔진 관련 키워드"
                      >
                        {[
                          "React",
                          "TypeScript",
                          "Component Architecture",
                          "Chart Engine",
                        ].map((keyword) => (
                          <code key={keyword}>{keyword}</code>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section className="project-highlight">
                    <span>03</span>
                    <div>
                      <h4>근거를 검증해 작도하는 차트 분석</h4>
                      <p>
                        캔들의 가격 반전과 변동성을 기준으로 의미 있는 피벗을
                        추출하고, 지지·저항·추세·패턴 후보를 만들었습니다. 접촉
                        횟수·가격 반응·선과의 오차·최근성·돌파 여부를 평가해
                        기준을 통과한 후보와 판단 근거를 차트에 함께
                        표시했습니다.
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
                    <span>04</span>
                    <div>
                      <h4>분석 근거까지 탐색하는 차트·기업 분석 UI</h4>
                      <p>
                        분석 요청 시점의 시장·재무·뉴스 데이터를 Snapshot으로
                        고정해 여러 패널이 동일한 근거를 사용하도록 구성했습니다.
                        분석 엔진은 캔들에서 피벗을 추출하고 접촉·반응·오차를
                        평가해 지지·저항·추세 후보를 선별합니다. React에서는
                        피벗·후보선·검증 결과를 독립된 차트 레이어로 변환해
                        사용자가 분석 결과와 근거를 함께 탐색할 수 있도록
                        구현했습니다.
                      </p>
                      <div
                        className="highlight-tags"
                        aria-label="차트·기업 분석 UI 관련 키워드"
                      >
                        {[
                          "React",
                          "TypeScript",
                          "Point-in-Time Snapshot",
                          "Chart Geometry",
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
