const workExperiences = [
  {
    mark: "12",
    title: "크래프톤 정글",
    role: "12기 졸업",
    meta: "KRAFTON JUNGLE",
    summary:
      "CS 기초와 팀 프로젝트를 집중적으로 학습하며 문제를 끝까지 해결하는 개발 습관을 만들었습니다.",
    featured: true,
  },
  {
    mark: "NH",
    title: "㈜나현",
    role: "자동차 부품 제조",
    meta: "2 YEARS",
    summary:
      "자동차 부품 생산 현장에서 품질 기준과 생산·운영 협업을 경험했습니다.",
  },
  {
    mark: "O",
    title: "OTOS",
    role: "수건·목재 판매 창업",
    meta: "FOUNDER EXPERIENCE",
    summary:
      "상품 기획부터 판매, 고객 응대와 운영까지 사업의 전 과정을 직접 맡았습니다.",
  },
];

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
    label: "Data",
    items: ["Kafka", "Redis", "ClickHouse", "PostgreSQL", "S3"],
  },
  {
    label: "Infra",
    items: ["Docker", "AWS", "EKS", "GitHub Actions"],
  },
];

function ExternalArrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <>
      <header className="top-banner">
        <p>사용자가 끝까지 쓰는 AI 서비스를 만드는 개발자</p>
      </header>

      <main id="top">
        <section className="profile" aria-labelledby="profile-title">
          <p className="profile-kicker">AI PRODUCT ENGINEER · FULL-STACK</p>
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

          <ul className="profile-points">
            <li>
              사용자의 문제를 이해하고, 빠르게 시도해{" "}
              <strong>실제로 작동하는 제품</strong>으로 연결합니다.
            </li>
            <li>
              화면부터 API, 실시간 데이터, 저장소와 배포까지{" "}
              <strong>제품 전체 흐름</strong>을 설계합니다.
            </li>
            <li>
              실내건축디자인·제조업·창업 경험에서 얻은 관찰력으로{" "}
              <strong>복잡한 문제를 구조화</strong>합니다.
            </li>
            <li>
              <strong>크래프톤 정글 12기 졸업</strong> 후에도 낯선 문제를
              끝까지 해결하며 꾸준히 성장하고 있습니다.
            </li>
          </ul>
        </section>

        <section className="resume-section" id="experience">
          <div className="section-title">
            <h2>Work Experience</h2>
          </div>

          <div className="resume-list">
            {workExperiences.map((experience) => (
              <article
                className={`resume-item ${
                  experience.featured ? "resume-item-featured" : ""
                }`}
                key={experience.title}
              >
                <div className="resume-side">
                  <div className="company-mark" aria-hidden="true">
                    {experience.mark}
                  </div>
                  <h3>{experience.title}</h3>
                  <p>{experience.role}</p>
                  <span>{experience.meta}</span>
                </div>

                <div className="resume-detail">
                  <p className="summary-box">{experience.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="resume-section project-section" id="project">
          <div className="section-title">
            <h2>Team Project</h2>
          </div>

          <article className="resume-item project-item">
            <div className="resume-side">
              <div className="company-mark project-mark" aria-hidden="true">
                G
              </div>
              <h3>GOPS</h3>
              <p>실시간 투자 정보 플랫폼</p>
              <span>FEATURED PROJECT</span>
              <a
                className="side-link"
                href="https://github.com/KFJG-Team1/gops"
                target="_blank"
                rel="noreferrer"
                aria-label="GOPS GitHub 저장소 열기"
              >
                Github <ExternalArrow />
              </a>
            </div>

            <div className="resume-detail project-detail">
              <blockquote>
                종목을 찾는 사람에게 기준을,
                <br />
                시장을 읽는 사람에게 방향을.
              </blockquote>

              <div className="tech-tags" aria-label="GOPS 사용 기술">
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
                  <code key={tech}>{tech}</code>
                ))}
              </div>

              <p className="contribution">
                역할 : Frontend · Backend · Data Pipeline · Infra
              </p>

              <h4>목표</h4>
              <ul>
                <li>
                  실시간 시세, 캔들 차트, 주문 흐름과 AI 분석을 하나의
                  워크스페이스로 연결했습니다.
                </li>
                <li>
                  사용자가 복잡한 시장 정보를 한 화면에서 이해하고 행동할 수
                  있도록 구성했습니다.
                </li>
              </ul>

              <h4>주요 역할</h4>
              <ul>
                <li>
                  <code>React · TypeScript</code> 화면과{" "}
                  <code>FastAPI · WebSocket</code> API를 연결해 실시간 차트와
                  주문 흐름을 구현했습니다.
                </li>
                <li>
                  <code>Kafka</code> 파이프라인을{" "}
                  <code>Redis · ClickHouse · PostgreSQL · S3</code>의 역할에
                  맞게 분리했습니다.
                </li>
                <li>
                  역할 기반 AI 에이전트와 과거 데이터 시뮬레이터,{" "}
                  <code>Docker · AWS · EKS</code> 배포 구조를 설계했습니다.
                </li>
              </ul>

              <h4>제품을 만들며 배운 점</h4>
              <ul>
                <li>
                  기능 하나보다 데이터가 들어와 사용자에게 전달되는 전체 흐름을
                  먼저 설계하는 것이 중요했습니다.
                </li>
                <li>
                  복잡한 정보를 잘 나누고 각 기술의 역할을 명확하게 정할수록
                  제품을 안정적으로 개선할 수 있었습니다.
                </li>
              </ul>

              <figure className="project-image">
                <img
                  src="/gops-workspace.png"
                  alt="GOPS의 NVDA 캔들 차트, 호가, 비교 차트가 배치된 투자 분석 화면"
                />
                <figcaption>GOPS · REAL-TIME INVESTMENT WORKSPACE</figcaption>
              </figure>
            </div>
          </article>
        </section>

        <section className="resume-section" id="skills">
          <div className="section-title">
            <h2>Skills</h2>
          </div>

          <div className="skill-table">
            {skills.map((skill) => (
              <div className="skill-row" key={skill.label}>
                <h3>{skill.label}</h3>
                <div>
                  {skill.items.map((item) => (
                    <code key={item}>{item}</code>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="resume-section education-section" id="education">
          <div className="section-title">
            <h2>Education</h2>
          </div>

          <article className="education-item">
            <p>대구대학교</p>
            <div>
              <h3>실내건축디자인학과</h3>
              <span>
                공간 설계와 시각적 구성 훈련을 통해 복잡한 정보를 구조화하고
                명확하게 전달하는 기반을 다졌습니다.
              </span>
            </div>
          </article>
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
