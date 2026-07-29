const skills = [
  {
    label: "Frontend",
    items: ["TypeScript", "React", "Vite", "Canvas"],
  },
  {
    label: "Backend · AI",
    items: ["Python", "FastAPI", "WebSocket", "LangGraph"],
  },
  {
    label: "Data · Infra",
    items: [
      "Kafka",
      "Redis",
      "ClickHouse",
      "PostgreSQL",
      "S3",
      "Docker",
      "AWS · EKS",
    ],
  },
];

const capabilities = [
  {
    number: "01",
    title: "제품의 끝까지",
    description:
      "화면 한 조각에 머물지 않고 API, 실시간 데이터, 저장소와 배포까지 이어지는 흐름을 설계합니다.",
  },
  {
    number: "02",
    title: "작게 만들고 검증",
    description:
      "사용자의 문제를 먼저 정의하고, 작동하는 단위로 빠르게 구현한 뒤 관찰한 결과로 개선합니다.",
  },
  {
    number: "03",
    title: "복잡함을 구조로",
    description:
      "디자인과 제조 현장에서 기른 관찰력을 바탕으로 복잡한 정보를 이해하기 쉬운 구조로 바꿉니다.",
  },
];

const experiences = [
  {
    period: "12TH COHORT · GRADUATE",
    title: "크래프톤 정글 12기 수료",
    body: "컴퓨터공학 기초부터 운영체제, 네트워크, 팀 프로젝트까지 밀도 높은 몰입 과정을 완주했습니다. 낯선 문제를 작은 단위로 나누고 끝까지 해결하는 개발 습관을 만들었습니다.",
    emphasis: true,
  },
  {
    period: "2 YEARS",
    title: "㈜나현 · 자동차 부품 제조",
    body: "생산과 운영이 연결되는 현장에서 품질 기준, 협업 방식, 반복 업무의 정확성을 배웠습니다.",
  },
  {
    period: "FOUNDER EXPERIENCE",
    title: "OTOS · 수건·목재 판매 창업",
    body: "상품 기획부터 판매, 고객 응대와 운영까지 직접 맡으며 고객 반응을 빠르게 제품과 실행으로 연결했습니다.",
  },
  {
    period: "INTERIOR ARCHITECTURE DESIGN",
    title: "대구대학교 · 실내건축디자인학과",
    body: "공간 설계와 시각적 구성 훈련을 통해 정보를 구조화하고 명확하게 전달하는 기반을 다졌습니다.",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <>
      <div className="top-stripe" />
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="김희준 포트폴리오 홈">
          KHJ<span className="wordmark-dot">.</span>
        </a>
        <nav aria-label="주요 메뉴">
          <a href="#about">소개</a>
          <a href="#project">프로젝트</a>
          <a href="#journey">경험</a>
          <a href="#contact">연락</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">AI PRODUCT ENGINEER · FULL-STACK DEVELOPER</p>
            <h1 id="hero-title">
              안녕하세요,
              <br />
              <span>김희준</span>입니다.
            </h1>
            <p className="hero-lead">
              사용자의 문제를 이해하고
              <br className="desktop-break" /> 실제로 작동하는 제품으로 연결합니다.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#project">
                대표 프로젝트 보기 <Arrow />
              </a>
              <a
                className="button button-quiet"
                href="mailto:huiugim8@gmail.com"
              >
                이메일
              </a>
            </div>
          </div>

          <aside className="hero-card" aria-label="주요 프로필">
            <div className="cohort-badge">
              <span className="cohort-number">12</span>
              <span>
                KRAFTON
                <br />
                JUNGLE
              </span>
            </div>
            <div className="hero-card-copy">
              <p className="status">
                <span className="status-dot" />
                크래프톤 정글 12기 졸업
              </p>
              <p>
                AI 제품 엔지니어와
                <br />
                풀스택 개발자를 향해
                <br />
                만들고, 검증하고, 개선합니다.
              </p>
            </div>
            <div className="hero-card-footer">
              <span>SEOUL · KOREA</span>
              <span>2026</span>
            </div>
          </aside>
        </section>

        <section className="section intro-section" id="about">
          <div className="section-kicker">
            <span>01</span>
            <p>ABOUT</p>
          </div>
          <div className="section-content">
            <h2>
              사용자가 끝까지 쓰는
              <br />
              AI 서비스를 만들고 싶습니다.
            </h2>
            <div className="intro-grid">
              <p>
                기술 자체보다 사용자의 문제를 이해하고, 빠르게 시도해 실제로
                작동하는 제품으로 연결하는 일을 좋아합니다. 실내건축디자인,
                제조업, 창업에서 배운 관찰력과 실행력을 개발 과정에 이어가고
                있습니다.
              </p>
              <p>
                GOPS를 만들며 화면, API, 실시간 데이터, 저장소와 배포 구조를
                함께 다뤘습니다. 작은 기능을 구현하고 검증하는 과정을 반복하며,
                사용자가 이해하기 쉬운 제품으로 개선하고 있습니다.
              </p>
            </div>
          </div>
        </section>

        <section className="capability-grid" aria-label="일하는 방식">
          {capabilities.map((item) => (
            <article className="capability-card" key={item.number}>
              <span className="card-number">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </section>

        <section className="section project-section" id="project">
          <div className="section-kicker">
            <span>02</span>
            <p>FEATURED PROJECT</p>
          </div>
          <div className="section-content">
            <div className="project-heading">
              <div>
                <p className="project-label">REAL-TIME INVESTMENT PLATFORM</p>
                <h2>GOPS</h2>
              </div>
              <a
                className="text-link"
                href="https://github.com/KFJG-Team1/gops"
                target="_blank"
                rel="noreferrer"
              >
                GitHub에서 보기 <Arrow />
              </a>
            </div>

            <figure className="project-visual">
              <img
                src="/gops-workspace.png"
                alt="GOPS의 NVDA 캔들 차트, 호가, 비교 차트가 배치된 투자 분석 화면"
              />
              <figcaption>
                실시간 차트 · 주문 흐름 · AI 분석을 하나의 워크스페이스로
              </figcaption>
            </figure>

            <div className="project-summary">
              <p className="project-quote">
                “종목을 찾는 사람에게 기준을,
                <br />
                시장을 읽는 사람에게 방향을.”
              </p>
              <div className="project-description">
                <p>
                  실시간 시세 수집부터 차트 표현, 주문 제어, AI 분석까지 하나의
                  흐름으로 연결한 투자 정보 플랫폼입니다.
                </p>
                <ul>
                  <li>
                    React·TypeScript 화면과 FastAPI·WebSocket API를 연결해
                    실시간 차트 및 주문 흐름 구현
                  </li>
                  <li>
                    Kafka 파이프라인을 Redis·ClickHouse·PostgreSQL·S3의
                    역할에 맞게 분리
                  </li>
                  <li>
                    역할 기반 AI 에이전트, 과거 데이터 시뮬레이터,
                    Docker·AWS/EKS 배포 구조 설계
                  </li>
                </ul>
              </div>
            </div>

            <div className="tech-list" aria-label="GOPS 사용 기술">
              {[
                "React",
                "TypeScript",
                "FastAPI",
                "WebSocket",
                "Kafka",
                "Redis",
                "ClickHouse",
                "PostgreSQL",
                "Docker",
                "AWS · EKS",
              ].map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section journey-section" id="journey">
          <div className="section-kicker">
            <span>03</span>
            <p>JOURNEY</p>
          </div>
          <div className="section-content">
            <h2>
              경험은 달라도,
              <br />
              문제를 끝까지 푸는 태도는 같습니다.
            </h2>
            <div className="timeline">
              {experiences.map((experience) => (
                <article
                  className={`timeline-item ${
                    experience.emphasis ? "timeline-item-emphasis" : ""
                  }`}
                  key={experience.title}
                >
                  <p className="timeline-period">{experience.period}</p>
                  <div>
                    <h3>{experience.title}</h3>
                    <p>{experience.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section skills-section">
          <div className="section-kicker">
            <span>04</span>
            <p>SKILLS</p>
          </div>
          <div className="section-content">
            <h2>제품을 연결하는 기술</h2>
            <div className="skills-list">
              {skills.map((skill) => (
                <div className="skill-row" key={skill.label}>
                  <h3>{skill.label}</h3>
                  <p>{skill.items.join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <p className="eyebrow">LET&apos;S BUILD SOMETHING USEFUL</p>
          <h2>
            함께 만들 이야기가 있다면
            <br />
            편하게 연락해 주세요.
          </h2>
          <div className="contact-links">
            <a href="mailto:huiugim8@gmail.com">
              <span>EMAIL</span>
              huiugim8@gmail.com <Arrow />
            </a>
            <a
              href="https://github.com/KFJG-Team1/gops"
              target="_blank"
              rel="noreferrer"
            >
              <span>GITHUB</span>
              KFJG-Team1 / gops <Arrow />
            </a>
          </div>
        </section>
      </main>

      <footer>
        <p>© 2026 KIM HEEJUN</p>
        <p>PRODUCT-MINDED ENGINEER</p>
        <a href="#top">맨 위로 ↑</a>
      </footer>
    </>
  );
}
