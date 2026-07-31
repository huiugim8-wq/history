const experienceItems = [
  {
    title: "㈜나현",
    role: "자동차 부품 제조",
    meta: "2 YEARS",
    summary:
      "자동차 부품 제조 현장에서 2년간 생산 작업과 품질 기준 준수를 담당했습니다.",
  },
  {
    title: "OTOS",
    role: "수건·목재 판매 창업",
    meta: "FOUNDER EXPERIENCE",
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
    meta: "EDUCATION",
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
                AI 제품 엔지니어 <strong>김희준</strong>입니다.
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
            <p>
              실내건축디자인·자동차 부품 제조·창업 경험을 거치며, 현상을
              빠르게 판단하기보다 업무와 사용자 흐름을 관찰해{" "}
              <strong>복잡한 문제를 구조화</strong>하는 방식을 익혔습니다.
            </p>
            <p>
              크래프톤 정글 12기에서 컴퓨터공학 기초와 팀 개발을 학습하고,{" "}
              <strong>24시간 기준 약 9천만 건</strong>의 시장 데이터를 처리하는
              AI 주식 트레이딩 플랫폼을 개발했습니다. Kafka 이벤트 드리븐
              구조로 수집·저장·분석을 분리하고, Redis·ClickHouse·S3를
              조회·분석·복구 목적에 맞게 구성했습니다.
            </p>
            <p>
              기술 자체보다{" "}
              <strong>운영에서 발생하는 지연·중복·장애</strong>를 줄이는 선택을
              중요하게 생각합니다. 최신 데이터는 Redis에 제한적으로 유지하고
              과거 데이터는 REST로 보완했으며, 저장 성공 후 offset 커밋과 멱등
              처리로 이벤트 재전달 시 중복 반영을 제어했습니다.
            </p>
            <p>
              AI는 계산과 주문을 직접 수행하지 않고 검증된 데이터만 설명하도록
              경계를 나눴으며, 사용자 확인을 거친 주문은 Transactional Outbox로
              전달했습니다. 와디즈 펀딩과 쿠팡 판매를 직접 운영해 연 매출 약
              1억 원을 만든 경험처럼, 기능 구현을{" "}
              <strong>사용자 가치와 제품 성과</strong>까지 연결하는 개발자를
              지향합니다.
            </p>
          </div>
        </section>

        <section className="resume-section work-section" id="experience">
          <div className="section-title">
            <h2>Work &amp; Experience</h2>
          </div>

          <div className="resume-list">
            <article className="resume-item jungle-item" id="project">
              <div className="resume-side">
                <div className="experience-heading">
                  <h3>크래프톤 정글</h3>
                  <span aria-hidden="true">·</span>
                  <p>12기 졸업</p>
                </div>
                <span>KRAFTON JUNGLE</span>
              </div>

              <div className="resume-detail jungle-detail">
                <div className="project-header">
                  <div className="project-title">
                    <span>TEAM PROJECT</span>
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
                    시장 탐색부터 AI 분석·주문·거래 복기까지 하나의 사용자
                    맥락으로 연결한 개인 맞춤형 주식 트레이딩 플랫폼입니다.
                  </p>
                  <p>
                    24시간 분량 약 9천만 건의 시장 데이터를 Kafka 이벤트
                    드리븐 구조로 처리하고, 실시간·과거·재생 경로가 같은 데이터
                    계약을 사용하도록 설계했습니다.
                  </p>
                  <p>
                    분석 시점의 근거만 사용하는 AI와 멱등 처리·Transactional
                    Outbox·정합성 확인을 적용한 주문 흐름을 구성했습니다.
                  </p>
                </div>

                <div
                  className="project-highlights"
                  aria-label="프로젝트 핵심 역량"
                >
                  <section className="project-highlight">
                    <span>01</span>
                    <div>
                      <h4>이벤트 드리븐 MSA</h4>
                      <p>
                        시장 데이터·주문·AI 서비스를 독립된 경계로 나누고 Kafka
                        이벤트로 연결했습니다. LIVE·과거 조회·SIM은 같은 공통
                        데이터 계약(canonical contract)을 사용해 결과가 달라지는
                        문제를 해결했습니다.
                      </p>
                      <div
                        className="highlight-tags"
                        aria-label="이벤트 드리븐 MSA 관련 키워드"
                      >
                        {["Kafka", "MSA", "Canonical Contract"].map(
                          (keyword) => (
                            <code key={keyword}>{keyword}</code>
                          ),
                        )}
                      </div>
                    </div>
                  </section>

                  <section className="project-highlight">
                    <span>02</span>
                    <div>
                      <h4>9,327만 건의 실시간 틱 데이터 처리</h4>
                      <p>
                        502개 종목에서 체결 4,030만 건과 호가 5,297만 건, 총{" "}
                        <strong>93,275,117개 이벤트</strong>를
                        수집·검증했습니다. 같은 이벤트가 다시 들어와도 결과가
                        바뀌지 않도록 offset 기반 멱등 처리와 저장 완료 후 커밋을
                        적용했습니다.
                      </p>
                      <div
                        className="highlight-tags"
                        aria-label="실시간 틱 데이터 처리 관련 키워드"
                      >
                        {["ClickHouse", "Idempotency", "Replay"].map(
                          (keyword) => (
                            <code key={keyword}>{keyword}</code>
                          ),
                        )}
                      </div>
                    </div>
                  </section>

                  <section className="project-highlight">
                    <span>03</span>
                    <div>
                      <h4>AI를 안전하게 운영하는 경계</h4>
                      <p>
                        AI가 주문을 직접 실행하지 못하도록 경계를 두고, 개인정보
                        마스킹과 최소 권한을 적용했습니다. 외부 AI 서비스 장애
                        시에는 핵심 기능만 제공하도록 하고, 평가·모니터링 규칙을
                        코드와 문서로 남겼습니다.
                      </p>
                      <div
                        className="highlight-tags"
                        aria-label="AI 운영 위험 통제 관련 키워드"
                      >
                        {[
                          "AI Guardrails",
                          "Least Privilege",
                          "Monitoring",
                        ].map((keyword) => (
                          <code key={keyword}>{keyword}</code>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section className="project-highlight">
                    <span>04</span>
                    <div>
                      <h4>성능과 비용을 함께 고려한 인프라</h4>
                      <p>
                        EKS 상시 자원을 32 vCPU·124GiB에서 20 vCPU·92GiB로
                        조정해 <strong>월 약 511달러</strong>를 절감했습니다.
                        비용을 줄인 뒤에도 백업과 롤백이 정상 동작하는지
                        검증했습니다.
                      </p>
                      <div
                        className="highlight-tags"
                        aria-label="인프라 비용 최적화 관련 키워드"
                      >
                        {[
                          "AWS · EKS",
                          "Cost Optimization",
                          "Backup · Rollback",
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
                    <span>{experience.meta}</span>
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
