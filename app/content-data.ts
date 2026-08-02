export const siteNavigation = [
  { href: "/", label: "이력서" },
  { href: "/cover-letter", label: "자기소개서" },
  { href: "/portfolio", label: "포트폴리오" },
  { href: "/blog", label: "블로그" },
] as const;

export const portfolioProjects = [
  {
    href: "/portfolio/trading-platform",
    eyebrow: "PROJECT 01 · TEAM",
    title: "실시간 투자 정보 플랫폼",
    description:
      "AI가 시장 탐색과 차트 분석을 지원하고, 주문부터 거래 복기까지 하나의 흐름으로 연결하는 주식 트레이딩 플랫폼입니다.",
    meta: "5주 · 5인 팀 프로젝트",
    tags: ["React", "TypeScript", "WebSocket", "Canvas 2D"],
  },
  {
    href: "/portfolio/react-runtime",
    eyebrow: "PROJECT 02 · INDIVIDUAL",
    title: "미니 리액트(버추얼 돔) 구현",
    description:
      "함수형 컴포넌트, Hooks, Virtual DOM과 Diff/Patch를 프레임워크 없이 구현하며 React의 렌더링 원리를 확인한 프로젝트입니다.",
    meta: "JavaScript · 78 tests passed",
    tags: ["Virtual DOM", "Diff & Patch", "Hooks", "Batching"],
  },
] as const;

export const blogPosts = [
  {
    href: "/blog/react-panel-registry",
    number: "01",
    title: "React 공통 프레임 · 43종 기능 패널 설계",
    description:
      "43종의 기능 패널을 하나의 공통 프레임에서 일관되게 확장하기 위해 책임과 변경 경계를 나눈 과정입니다.",
    tags: ["React", "TypeScript", "Panel Registry"],
  },
  {
    href: "/blog/rest-websocket",
    number: "02",
    title: "REST API · WebSocket 실시간 데이터 흐름",
    description:
      "과거 데이터와 최신 시장 이벤트의 책임을 분리하고, 누락 구간만 조회해 시계열에 증분 반영한 구조입니다.",
    tags: ["REST API", "WebSocket", "Time Series"],
  },
  {
    href: "/blog/two-layer-canvas",
    number: "03",
    title: "2-Layer Canvas 차트 엔진",
    description:
      "변경 빈도가 다른 정적 차트와 포인터 UI를 두 개의 Canvas로 분리해 필요한 레이어만 갱신한 과정입니다.",
    tags: ["Canvas 2D", "requestAnimationFrame", "Rendering"],
  },
  {
    href: "/blog/chart-analysis",
    number: "04",
    title: "TypeScript 피벗 군집 · 선형회귀 알고리즘",
    description:
      "피벗 군집과 선형회귀로 후보선을 만들고, 접촉·가격 반응·오차·돌파를 평가해 지지·저항선을 선별한 과정입니다.",
    tags: ["TypeScript", "Clustering", "Linear Regression"],
  },
] as const;
