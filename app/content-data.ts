export const siteNavigation = [
  { href: "/", label: "이력서" },
  { href: "/cover-letter", label: "자기소개서" },
  { href: "/portfolio", label: "포트폴리오" },
] as const;

export const portfolioProjects = [
  {
    href: "/portfolio/trading-platform",
    eyebrow: "크래프톤 정글 · 5인 팀 · 프론트엔드",
    title: "실시간 투자 정보 플랫폼",
    description:
      "외부 차트 API가 지원하지 않는 틱 데이터 오버레이를 위해, 약 9천만 건 규모의 데이터를 다루는 TypeScript 차트 엔진을 직접 구현했습니다.",
    meta: "5주 · 5인 팀 · 프론트엔드",
    tags: ["Custom Chart Engine", "90M Tick Data", "Tick Overlay", "TypeScript"],
  },
  {
    href: "/portfolio/react-runtime",
    eyebrow: "개인 프로젝트 · JavaScript",
    title: "Vanilla JS React Runtime",
    description:
      "Virtual DOM과 Hooks를 직접 구현한 뒤 동기식 Diff 구조를 Fiber Reconciler와 협력형 스케줄러로 확장한 프로젝트입니다.",
    meta: "JavaScript · 83 tests passed",
    tags: ["Virtual DOM", "Fiber", "Keyed Reconciliation", "Scheduler"],
  },
] as const;

export const portfolioDeepDives = [
  {
    href: "/portfolio/trading-platform/react-panel-registry",
    number: "01",
    title: "React 공통 프레임 · 43종 기능 패널 설계",
    description:
      "43종의 기능 패널을 하나의 공통 프레임에서 일관되게 확장하기 위해 책임과 변경 경계를 나눈 과정입니다.",
    tags: ["React", "TypeScript", "Panel Registry"],
  },
  {
    href: "/portfolio/trading-platform/rest-websocket",
    number: "02",
    title: "REST API · WebSocket 실시간 데이터 흐름",
    description:
      "과거 데이터와 최신 시장 이벤트의 책임을 분리하고, 누락 구간만 조회해 시계열에 증분 반영한 구조입니다.",
    tags: ["REST API", "WebSocket", "Time Series"],
  },
  {
    href: "/portfolio/trading-platform/two-layer-canvas",
    number: "03",
    title: "2-Layer Canvas 차트 엔진",
    description:
      "외부 차트 API가 지원하지 않는 틱 오버레이를 직접 구현하고, 약 9천만 건 규모의 데이터에서 필요한 구간만 그리도록 렌더링 경계를 나눈 과정입니다.",
    tags: ["Canvas 2D", "requestAnimationFrame", "Rendering"],
  },
  {
    href: "/portfolio/trading-platform/chart-analysis",
    number: "04",
    title: "TypeScript 피벗 군집 · 선형회귀 알고리즘",
    description:
      "피벗 군집과 선형회귀로 후보선을 만들고, 접촉·가격 반응·오차·돌파를 평가해 지지·저항선을 선별한 과정입니다.",
    tags: ["TypeScript", "Clustering", "Linear Regression"],
  },
] as const;
