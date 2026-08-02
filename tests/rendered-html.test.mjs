import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "test",
    `${process.pid}-${Date.now()}-${pathname.replaceAll("/", "-")}`,
  );
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

async function htmlFor(pathname = "/") {
  const response = await render(pathname);
  assert.equal(response.status, 200, `${pathname} should render`);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}

test("renders the resume with page navigation and internal detail links", async () => {
  const html = await htmlFor("/");

  assert.match(html, /<html lang="ko">/);
  assert.match(html, /<title>김희준 \| Front-End Engineer<\/title>/);
  assert.match(html, /<h1 id="profile-title">김희준<\/h1>/);
  assert.match(
    html,
    /<img(?=[^>]*class="profile-photo")(?=[^>]*src="\/profile-id\.png")(?=[^>]*width="1086")(?=[^>]*height="1448")[^>]*>/,
  );
  assert.match(html, /소통을 바탕으로 구현하는 프론트엔드 개발자/);
  assert.match(html, /크래프톤 정글[\s\S]*12기 졸업/);
  assert.match(html, /㈜나현[\s\S]*OTOS[\s\S]*대구대학교/);
  assert.match(html, /href="\/"[^>]*>이력서<\/a>/);
  assert.match(html, /href="\/cover-letter"[^>]*>자기소개서<\/a>/);
  assert.match(html, /href="\/portfolio"[^>]*>포트폴리오<\/a>/);
  assert.doesNotMatch(html, /href="\/blog"[^>]*>블로그<\/a>/);
  assert.match(html, /href="\/portfolio\/trading-platform"/);
  assert.match(html, /href="\/portfolio\/react-runtime"/);
  assert.match(html, /미니 리액트\(버추얼 돔\) 구현/);
  assert.match(
    html,
    /미니 리액트\(버추얼 돔\) 구현[\s\S]*Fiber Reconciler[\s\S]*83개 테스트/,
  );
  assert.match(
    html,
    /href="\/portfolio\/trading-platform\/react-panel-registry"/,
  );
  assert.match(
    html,
    /href="\/portfolio\/trading-platform\/two-layer-canvas"/,
  );
  assert.match(
    html,
    /href="\/portfolio\/trading-platform\/chart-analysis"/,
  );
  assert.match(
    html,
    /대량의 실시간 데이터를 위한 커스텀 주식 차트 구현[\s\S]*평균 초당 약 1,080건[\s\S]*팀원이 사용할 수 있도록 43종의 React 공용 컴포넌트를 설계·구현[\s\S]*지지·저항선을 위한 알고리즘 개발 및 시각화/,
  );
  assert.match(html, /과거 데이터도 REST API로 지원/);
  assert.match(
    html,
    /차트 API에서 지원하지 않는 틱 데이터[\s\S]*주식 차트를 직접 구현/,
  );
  assert.match(html, /멀티 레이어 Canvas[\s\S]*를 사용/);
  assert.match(html, /머신러닝\(선형회귀, 피벗\) 모델을 학습/);
  assert.match(
    html,
    /크래프톤 정글[\s\S]*팀 프로젝트[\s\S]*팀원[\s\S]*5인[\s\S]*기간[\s\S]*2026\.03 — 2026\.07[\s\S]*담당[\s\S]*프론트엔드/,
  );
  assert.doesNotMatch(html, /PDF로 저장|print-button/);
  assert.doesNotMatch(html, /app\.notion\.com|>Notion</);
  assert.doesNotMatch(html, /<dialog|aria-haspopup="dialog"/);
});

test("renders the cover letter as a standalone printable page", async () => {
  const html = await htmlFor("/cover-letter/");

  assert.match(html, /<title>자기소개서 \| 김희준<\/title>/);
  assert.match(html, /APPLICATION ESSAY/);
  assert.match(
    html,
    /id="cover-letter-introduction">서론<\/h2>[\s\S]*id="cover-letter-project">프로젝트<\/h2>[\s\S]*id="cover-letter-conclusion">결론<\/h2>/,
  );
  assert.match(html, /결국 사업은 실패했습니다/);
  assert.match(
    html,
    /프론트엔드는 데이터의 상태 변화와 사용자 상호작용을 연결해[\s\S]*사용자 경험으로 구체화하는 영역/,
  );
  assert.match(
    html,
    /Virtual DOM과[\s\S]*Diff\/Patch[\s\S]*Hooks[\s\S]*batching/,
  );
  assert.match(
    html,
    /6개월이 끝났을 때 단순히 많은 것을 배운 인턴이 아니라[\s\S]*해결책까지 남긴/,
  );
  assert.match(html, /PDF로 저장/);
});

test("renders a focused portfolio without work-history or card grids", async () => {
  const portfolio = await htmlFor("/portfolio/");
  const project = await htmlFor("/portfolio/trading-platform/");
  const runtime = await htmlFor("/portfolio/react-runtime/");

  assert.match(portfolio, /<h1>Portfolio<\/h1>/);
  assert.match(
    portfolio,
    /<img(?=[^>]*class="portfolio-profile-photo")(?=[^>]*src="\/profile-id\.png")(?=[^>]*width="1086")(?=[^>]*height="1448")[^>]*>/,
  );
  assert.match(portfolio, /소통을 바탕으로 구현하는 프론트엔드 개발자/);
  assert.match(portfolio, /010 8201 6811/);
  assert.match(portfolio, /huiugim8@gmail\.com/);
  assert.match(portfolio, /실시간 투자 정보 플랫폼/);
  assert.match(portfolio, /Vanilla JS React Runtime/);
  assert.match(portfolio, /React 공통 프레임 · 43종 기능 패널 설계/);
  assert.match(portfolio, /REST API · WebSocket 실시간 데이터 흐름/);
  assert.match(portfolio, /2-Layer Canvas 차트 엔진/);
  assert.match(portfolio, /TypeScript 피벗 군집 · 선형회귀 알고리즘/);
  assert.doesNotMatch(portfolio, /Work &amp; Experience/);
  assert.doesNotMatch(portfolio, /㈜나현|OTOS/);
  assert.match(portfolio, /class="portfolio-entry-list"/);
  assert.match(portfolio, /class="portfolio-skill-list"/);
  assert.doesNotMatch(
    portfolio,
    /class="[^"]*(?:content-card|content-card-tags|portfolio-skills-grid)/,
  );
  assert.doesNotMatch(
    portfolio,
    /Education &amp; Awards|대구대학교 · 실내건축디자인학과|인테리어앤데코 공모전 수상|DGID 공모전 수상|학과 공로상 수상/,
  );
  assert.match(portfolio, />Skills</);
  assert.match(
    portfolio,
    /약 9천만 건 규모의 데이터를 다루는 TypeScript 차트 엔진/,
  );
  assert.doesNotMatch(portfolio, />블로그</);
  assert.match(project, /약 9천만 건 규모의 주식 틱 이벤트/);
  assert.match(
    project,
    /차트 라이브러리를 붙이는 대신, 틱 데이터 엔진부터 만들었습니다/,
  );
  assert.match(
    project,
    /틱 단위 데이터와 분석선을 같은 화면에 오버레이/,
  );
  assert.match(project, /5주 프로젝트/);
  assert.match(project, /5인 팀 프로젝트/);
  assert.match(project, /탐색부터 복기까지, 하나의 작업 공간으로/);
  assert.match(project, /43[\s\S]*Panel Types/);
  assert.match(project, /25[\s\S]*Layout Commands/);
  assert.match(project, /2[\s\S]*Canvas Layers/);
  assert.match(project, /48[\s\S]*Test \/ Spec Files/);
  assert.match(project, /React 패널 아키텍처/);
  assert.match(project, /WorkspacePanelFrame/);
  assert.match(project, /Reconnect/);
  assert.match(project, /Base 재렌더링 0회/);
  assert.match(project, /분석 결과를 설명하는 화면/);
  assert.match(project, /백엔드와 협업한 경계/);
  assert.match(project, /\/gops\/case-panel-portfolio\.png/);
  assert.match(project, /\/gops\/case-recommendation\.png/);
  assert.match(project, /\/gops\/case-panel-review\.png/);
  assert.match(project, /\/gops\/case-chart-logic\.png/);
  assert.match(project, /\/gops\/case-chart-evidence\.png/);
  assert.match(project, /구현 상세 보기/);
  assert.doesNotMatch(
    project,
    /<dd>42<\/dd><dt>Panel Types<\/dt>|9,327만/,
  );
  assert.match(runtime, /Virtual DOM · Diff &amp; Patch/);
  assert.match(runtime, /83개의 테스트/);
  assert.match(runtime, /Current · WIP Fiber/);
  assert.match(runtime, /Keyed Reconciliation/);

  for (const html of [portfolio, project, runtime]) {
    assert.doesNotMatch(html, /app\.notion\.com/);
  }
});

test("renders every technical deep dive under the portfolio route", async () => {
  const routes = [
    "/portfolio/trading-platform/react-panel-registry/",
    "/portfolio/trading-platform/rest-websocket/",
    "/portfolio/trading-platform/two-layer-canvas/",
    "/portfolio/trading-platform/chart-analysis/",
  ];

  const pages = await Promise.all(routes.map((route) => htmlFor(route)));
  const combined = pages.join("\n");

  assert.match(combined, /Panel Registry/);
  assert.match(combined, /Missing Range Request/);
  assert.match(combined, /Overlay Canvas/);
  assert.match(combined, /Candidate Scoring/);
  assert.match(combined, /재현성과 설명 가능성/);
  assert.doesNotMatch(combined, /app\.notion\.com/);
});

test("removes the standalone blog index", async () => {
  const response = await render("/blog/");
  assert.equal(response.status, 404);
});

test("keeps public images under the GitHub Pages base path", async () => {
  const workflow = await readFile(
    new URL("../.github/workflows/deploy-pages.yml", import.meta.url),
    "utf8",
  );
  const sitePaths = await readFile(
    new URL("../app/site-paths.ts", import.meta.url),
    "utf8",
  );

  assert.match(workflow, /NEXT_PUBLIC_BASE_PATH:\s*"\/history"/);
  assert.match(sitePaths, /NEXT_PUBLIC_BASE_PATH/);
  assert.match(sitePaths, /`\$\{basePath\}\$\{path\}`/);
});

test("removes the resume PDF control and keeps responsive presentation rules", async () => {
  const css = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(css, /@page\s*\{[^}]*size:\s*A4/s);
  assert.match(css, /@media print\s*\{/);
  assert.match(css, /\.print-button/);
  assert.match(css, /\.page-site-header/);
  assert.match(css, /\.content-index/);
  assert.match(css, /\.article-section/);
  assert.match(css, /--max-width:\s*1040px/);
  assert.match(
    css,
    /--resume-content-width:\s*clamp\(860px,\s*68vw,\s*var\(--max-width\)\)/,
  );
  assert.match(
    css,
    /\.portfolio-profile-photo\s*\{[^}]*aspect-ratio:\s*3\s*\/\s*4/s,
  );
  assert.match(
    css,
    /\.portfolio-page \.content-hero h1\s*\{[^}]*font-size:\s*25px/s,
  );
  assert.match(css, /break-inside:\s*avoid/);
});
