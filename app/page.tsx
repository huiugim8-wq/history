"use client";

import { useEffect, useState } from "react";

const skills = [
  "TypeScript",
  "React",
  "Vite",
  "Python",
  "FastAPI",
  "WebSocket",
  "LangGraph",
  "Kafka",
  "Redis",
  "ClickHouse",
  "PostgreSQL",
  "Docker",
  "AWS · EKS",
];

const experiences = [
  {
    eyebrow: "12TH COHORT · GRADUATE",
    title: "크래프톤 정글 12기 졸업",
    description:
      "컴퓨터공학 기초부터 운영체제, 네트워크, 팀 프로젝트까지 밀도 높은 몰입 과정을 완주했습니다.",
    featured: true,
  },
  {
    eyebrow: "2 YEARS · MANUFACTURING",
    title: "㈜나현",
    description:
      "자동차 부품 제조 현장에서 생산과 운영의 흐름, 품질 기준과 협업 방식을 경험했습니다.",
  },
  {
    eyebrow: "FOUNDER EXPERIENCE",
    title: "OTOS",
    description:
      "수건·목재 판매 사업을 운영하며 상품 기획부터 판매, 고객 응대까지 직접 실행했습니다.",
  },
  {
    eyebrow: "INTERIOR ARCHITECTURE DESIGN",
    title: "대구대학교",
    description:
      "실내건축디자인을 공부하며 복잡한 정보를 구조화하고 명확하게 전달하는 기반을 다졌습니다.",
  },
];

function ExternalArrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [lightTheme, setLightTheme] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const shouldUseLight =
      savedTheme === "light" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: light)").matches);

    setLightTheme(shouldUseLight);
    document.documentElement.dataset.theme = shouldUseLight ? "light" : "dark";
  }, []);

  function toggleTheme() {
    const nextTheme = !lightTheme;
    setLightTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme ? "light" : "dark";
    window.localStorage.setItem(
      "portfolio-theme",
      nextTheme ? "light" : "dark",
    );
  }

  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="김희준 포트폴리오 홈">
          KHJ<span>.</span>
        </a>

        <div className="header-actions">
          <nav aria-label="주요 메뉴">
            <a href="#project">Project</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </nav>
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={lightTheme ? "어두운 테마로 변경" : "밝은 테마로 변경"}
            title={lightTheme ? "어두운 테마" : "밝은 테마"}
          >
            <span aria-hidden="true">{lightTheme ? "☾" : "☼"}</span>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <p className="hero-eyebrow">
            AI PRODUCT ENGINEER · FULL-STACK DEVELOPER
          </p>
          <h1 id="hero-title">
            안녕하세요,
            <br />
            <span>김희준</span>입니다.
          </h1>
          <h2>사용자의 문제를 끝까지 해결하는 제품 엔지니어.</h2>
          <p className="hero-description">
            크래프톤 정글 12기 졸업 후, 아이디어를 화면·API·데이터·배포까지
            연결하며 실제로 사용할 수 있는 제품을 만들고 있습니다.
          </p>
          <div className="hero-links">
            <a className="button button-primary" href="#project">
              프로젝트 보기
            </a>
            <a
              className="icon-link"
              href="https://github.com/KFJG-Team1/gops"
              target="_blank"
              rel="noreferrer"
              aria-label="GOPS GitHub 저장소 열기"
            >
              GH
            </a>
            <a
              className="icon-link"
              href="mailto:huiugim8@gmail.com"
              aria-label="김희준에게 이메일 보내기"
            >
              @
            </a>
          </div>
        </section>

        <section className="section project-section" id="project">
          <div className="section-heading">
            <p>Selected work</p>
            <h2>Project</h2>
          </div>

          <article className="project-card">
            <div className="project-copy">
              <div>
                <p className="project-kicker">REAL-TIME INVESTMENT PLATFORM</p>
                <h3>GOPS</h3>
                <p className="project-subtitle">
                  종목을 찾는 사람에게 기준을,
                  <br />
                  시장을 읽는 사람에게 방향을.
                </p>
              </div>

              <p className="project-description">
                실시간 시세 수집, 캔들 차트, 주문 흐름과 AI 분석을 하나의
                워크스페이스로 연결한 투자 정보 플랫폼입니다. 화면부터 데이터
                파이프라인과 클라우드 배포 구조까지 제품 전체 흐름을
                설계했습니다.
              </p>

              <ul className="tag-list" aria-label="GOPS 사용 기술">
                {[
                  "React",
                  "TypeScript",
                  "FastAPI",
                  "WebSocket",
                  "Kafka",
                  "ClickHouse",
                  "Docker",
                  "AWS",
                ].map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>

              <a
                className="source-link"
                href="https://github.com/KFJG-Team1/gops"
                target="_blank"
                rel="noreferrer"
              >
                Source code <ExternalArrow />
              </a>
            </div>

            <figure className="project-preview">
              <img
                src="/gops-workspace.png"
                alt="GOPS의 NVDA 캔들 차트, 호가, 비교 차트가 배치된 투자 분석 화면"
              />
              <figcaption>GOPS · PRODUCT WORKSPACE</figcaption>
            </figure>
          </article>
        </section>

        <section className="section experience-section" id="experience">
          <div className="section-heading">
            <p>What shaped me</p>
            <h2>Experience</h2>
          </div>

          <div className="experience-grid">
            {experiences.map((experience) => (
              <article
                className={`experience-card ${
                  experience.featured ? "featured" : ""
                }`}
                key={experience.title}
              >
                <p>{experience.eyebrow}</p>
                <h3>{experience.title}</h3>
                <span>{experience.description}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section skills-section" id="skills">
          <div className="section-heading">
            <p>Tools I work with</p>
            <h2>Skills</h2>
          </div>

          <ul className="skills-list" aria-label="보유 기술">
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>

        <section className="contact-section" id="contact">
          <p>LET&apos;S BUILD SOMETHING USEFUL</p>
          <h2>함께 만들 이야기가 있나요?</h2>
          <a className="button button-primary" href="mailto:huiugim8@gmail.com">
            이메일 보내기
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
