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

test("renders the reference Product Engineer resume and working links", async () => {
  const html = await htmlFor("/");
  assert.match(html, /<html lang="ko">/);
  assert.match(html, /class="product-resume"/);
  assert.match(html, /Product Engineer/);
  assert.match(html, /<h1 id="profile-title">김희준<\/h1>/);
  assert.match(html, /About Me/);
  assert.match(html, /비즈니스 임팩트/);
  assert.match(html, /Work &amp; Experience/);
  assert.match(html, /크래프톤 정글[\s\S]*㈜나현[\s\S]*OTOS[\s\S]*대구대학교/);
  assert.match(html, /href="\/cover-letter\/"/);
  assert.match(html, /href="\/portfolio\/"/);
  assert.match(html, /href="\/portfolio\/trading-platform\/"/);
  assert.match(html, /href="\/portfolio\/trading-platform\/two-layer-canvas\/"/);
  assert.match(html, /href="\/portfolio\/trading-platform\/#event-pipeline"/);
  assert.match(html, /href="\/portfolio\/trading-platform\/#ai-coach"/);
  assert.match(html, /href="https:\/\/www\.youtube\.com\/watch\?v=8P4wiwDrvxs"/);
  assert.match(html, /href="tel:01082016811"/);
  assert.match(html, /href="mailto:huiugim8@gmail\.com"/);
  assert.match(html, /href="\/awards\/interior-deco-14-encouragement\.jpg"/);
  assert.match(html, /aria-label="주요 기술"/);
  for (const skill of ["TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Python"]) {
    assert.ok(html.includes(`title="${skill}"`), `${skill} icon should render`);
  }
  assert.match(html, /href="\/uiux\/"[^>]*aria-label="UI\/UX 디자이너 이력서로 전환"/);
  assert.doesNotMatch(html, /localhost:|class="project-highlights"/);
});

test("renders the unbranded Product Engineer cover letter from the latest reference", async () => {
  const html = await htmlFor("/cover-letter/");
  assert.ok(html.includes("<title>자기소개서 | 김희준</title>"));
  assert.match(html, /class="content-site cover-letter-site product-cover-letter"/);
  for (const text of [
    "기술을 통해 비즈니스 임팩트를 만드는 Product Engineer 김희준",
    "소비자의 관점에서 문제를 다시 정의했습니다",
    "개인의 경험에 의존하지 않는 반복 가능한 시스템",
    "사용자 중심의 관점, 기술적 기본기, 소통",
    "5주 동안 약 9천만 건의 틱 데이터를 다루는 실시간 투자 정보 플랫폼",
    "평균 초당 약 1,080건", "백엔드 데이터 파이프라인까지 직접 다뤘습니다",
    "Kafka 기반의 이벤트 드리븐 구조", "약 20명의 현장 인력을 관리",
    "Product Engineer로서 귀사에서 비즈니스 임팩트를 만들어내겠습니다",
    "긴 글 읽어 주셔서 감사합니다. 면접날 뵙겠습니다.",
  ]) assert.ok(html.includes(text), text);
  assert.doesNotMatch(html, /마이리얼트립|myrealtrip|id="cover-letter-user"|PDF 다운로드/);
  assert.ok(html.includes('href="/documents/"'));
});

test("renders separate frontend and UI UX PDF downloads", async () => {
  const html = await htmlFor("/documents/");

  assert.match(html, /<title>지원 문서 PDF \| 김희준<\/title>/);
  assert.match(html, /프론트엔드 개발자용과 UI\/UX 디자이너용 문서를 각각 구분했습니다/);
  assert.match(html, /kim-heejun-frontend-resume\.pdf/);
  assert.match(html, /kim-heejun-frontend-cover-letter\.pdf/);
  assert.match(html, /kim-heejun-frontend-portfolio\.pdf/);
  assert.match(html, /kim-heejun-uiux-resume\.pdf/);
  assert.match(html, /kim-heejun-uiux-cover-letter\.pdf/);
  assert.match(html, /kim-heejun-uiux-portfolio\.pdf/);
  assert.match(html, /download="김희준_프론트엔드_이력서\.pdf"/);
  assert.match(html, /download="김희준_UIUX_자기소개서\.pdf"/);
});

test("renders a focused portfolio without work-history or card grids", async () => {
  const portfolio = await htmlFor("/portfolio/");
  const project = await htmlFor("/portfolio/trading-platform/");
  const runtime = await htmlFor("/portfolio/react-runtime/");

  assert.match(portfolio, /class="fp-wordmark-title">Portfolio/);
  assert.match(
    portfolio,
    /<img(?=[^>]*class="fp-profile-photo")(?=[^>]*src="\/profile-id\.png")(?=[^>]*width="1086")(?=[^>]*height="1448")[^>]*>/,
  );
  assert.match(portfolio, /기술로 <strong>비즈니스 임팩트<\/strong>를 만드는 개발자/);
  assert.match(portfolio, /010 8201 6811/);
  assert.match(portfolio, /huiugim8@gmail\.com/);
  assert.match(portfolio, /실시간 투자 정보 플랫폼/);
  assert.match(portfolio, /Mini React/);
  assert.match(portfolio, /Amazon MSK 기반으로 처리하고/);
  assert.match(portfolio, /JavaScript · 83 tests passed/);
  assert.doesNotMatch(portfolio, /Work &amp; Experience/);
  assert.doesNotMatch(portfolio, /㈜나현|OTOS/);
  assert.match(portfolio, /class="fp-video-link"/);
  assert.match(portfolio, /<button[^>]*aria-label="실시간 투자 정보 플랫폼 시연 영상 재생"/);
  assert.doesNotMatch(portfolio, /<a[^>]*class="fp-project-card fp-project-summary"[^>]*>(?:(?!<\/a>)[\s\S])*<button/);
  assert.match(portfolio, /class="fp-skill-list"/);
  assert.doesNotMatch(
    portfolio,
    /class="[^"]*(?:content-card|content-card-tags|portfolio-skills-grid)/,
  );
  assert.doesNotMatch(
    portfolio,
    /Education &amp; Awards|대구대학교 · 실내건축디자인학과|인테리어앤데코 공모전 수상|DGID 공모전 수상|학과 공로상 수상/,
  );
  assert.match(portfolio, />Skills</);
  assert.match(portfolio, /하루 약 9천만 건의 시장 이벤트/);
  assert.doesNotMatch(portfolio, />블로그</);
  assert.match(project, /<h1>실시간 투자 정보 플랫폼<\/h1>/);
  assert.match(project, /하루 약 9천만 건의 시장 이벤트/);
  assert.match(project, /탐색부터 거래 복기까지의 서비스 흐름/);
  assert.match(project, /<dt>팀원<\/dt><dd>5인<\/dd>/);
  assert.match(project, /id="architecture">아키텍처<\/h2>/);
  assert.match(
    project,
    /id="custom-chart">대량의 실시간 데이터를 위한 커스텀 주식 차트 구현<\/h2>/,
  );
  assert.match(
    project,
    /id="event-pipeline">초당 평균 1,080건의 시장 데이터를 처리하는 실시간 파이프라인<\/h2>/,
  );
  assert.match(
    project,
    /id="ai-coach">거래 결과가 아니라 판단 과정을 복기하는 AI 투자 코치<\/h2>/,
  );
  assert.match(
    project,
    /<button(?=[^>]*class="trading-video-poster")(?=[^>]*aria-label="실시간 투자 정보 플랫폼 시연 영상 재생")[^>]*>/,
  );
  assert.match(project, /\/gops\/portfolio\/video-poster\.png/);
  assert.match(project, /href="https:\/\/www\.youtube\.com\/watch\?v=8P4wiwDrvxs"/);
  assert.match(project, /\/gops\/portfolio\/chart-comparison\.png/);
  const architecture = project.match(
    /<section\b[^>]*aria-labelledby="architecture"[^>]*>([\s\S]*?)<\/section>/,
  )?.[1];
  const pipeline = project.match(
    /<section\b[^>]*aria-labelledby="event-pipeline"[^>]*>([\s\S]*?)<\/section>/,
  )?.[1];
  assert.ok(architecture, "architecture section should render");
  assert.ok(pipeline, "event pipeline section should render");
  assert.match(architecture, /<img\b[^>]*src="[^"]*\/gops\/portfolio\/aws-architecture\.png"/);
  assert.match(architecture, /href="[^"]*\/gops\/portfolio\/aws-architecture\.png"/);
  assert.doesNotMatch(architecture, /<svg\b[^>]*class="trading-architecture-svg"/);
  assert.match(pipeline, /<svg\b[^>]*class="trading-architecture-svg"/);
  assert.match(
    pipeline,
    /\/gops\/portfolio\/event-pipeline\.png[\s\S]*처리 경로 분리[\s\S]*실패 후 재처리[\s\S]*중복 수신 확인[\s\S]*실제 서비스의 데이터 전달 경로[\s\S]*<svg\b[^>]*class="trading-architecture-svg"/,
  );
  assert.doesNotMatch(project, /실제 활성 경로는 상단 아키텍처 기준/);
  assert.equal(
    [...project.matchAll(/<svg\b[^>]*class="trading-architecture-svg"/g)].length,
    1,
    "market data flow should render exactly once",
  );
  assert.match(project, /\/gops\/portfolio\/ai-review-flow\.png/);
  assert.ok(project.indexOf('id="custom-chart"') < project.indexOf('id="ai-coach"'));
  assert.ok(project.indexOf('id="ai-coach"') < project.indexOf('id="event-pipeline"'));
  assert.match(
    project,
    /href="\/portfolio\/trading-platform\/rest-websocket\/?"[^>]*>REST·WebSocket 연결 자세히 보기/,
  );
  assert.match(
    project,
    /href="\/portfolio\/trading-platform\/two-layer-canvas\/?"[^>]*>2-Layer Canvas 자세히 보기/,
  );
  assert.match(project, /백엔드와 협업한 경계/);
  assert.match(project, /구현 상세 보기/);
  assert.doesNotMatch(
    project,
    /Panel Types|Layout Commands|Test \/ Spec Files|Base 재렌더링 0회|9,327만|무유실|Exactly-once/,
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
  assert.match(combined, /REST · 필요한 과거 범위 추가/);
  assert.match(combined, /Overlay Canvas/);
  assert.match(combined, /Candidate Scoring/);
  assert.match(combined, /재현성과 설명 가능성/);
  assert.doesNotMatch(combined, /app\.notion\.com/);
  for (const html of pages.slice(1, 3)) {
    assert.match(html, /class="trading-case trading-case--detail"/);
    assert.doesNotMatch(html, /class="trading-wordmark"/);
  }
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
  assert.match(css, /--max-width:\s*840px/);
  assert.match(
    css,
    /--page-content-width:\s*clamp\(700px,\s*55vw,\s*var\(--max-width\)\)/,
  );
  assert.match(css, /--page-inline-space:\s*48px/);
  assert.match(css, /--page-inline-space:\s*40px/);
  assert.match(
    css,
    /\.cover-letter-site \.content-hero,\s*\.cover-letter-page\s*\{[^}]*width:\s*min\(100%,\s*940px\)[^}]*margin-inline:\s*auto/s,
  );
  assert.match(
    css,
    /@media print\s*\{[\s\S]*\.cover-letter-site \.content-hero,\s*\.cover-letter-page\s*\{[^}]*width:\s*100%[^}]*max-width:\s*none[^}]*margin-inline:\s*0/s,
  );
  assert.match(
    css,
    /@media print\s*\{[\s\S]*\.cover-letter-section-heading h2\s*\{[^}]*font-size:\s*15pt[^}]*white-space:\s*nowrap/s,
  );
  assert.match(
    css,
    /\.cover-letter-intro\s*>\s*p:first-child\s*\{[^}]*font-size:\s*19px[^}]*font-weight:\s*650/s,
  );
  assert.match(
    css,
    /\.cover-letter-copy p\s*\{[^}]*text-align:\s*justify[^}]*text-align-last:\s*left[^}]*text-justify:\s*inter-character[^}]*word-break:\s*keep-all/s,
  );
  assert.match(
    css,
    /\.technical-article\s*\{[^}]*width:\s*100%[^}]*max-width:\s*none[^}]*margin-inline:\s*0/s,
  );
  assert.match(
    css,
    /@media print\s*\{[\s\S]*\.cover-letter-site \.content-hero,\s*\.cover-letter-page\s*\{[^}]*width:\s*170mm[^}]*max-width:\s*100%[^}]*margin-inline:\s*auto/s,
  );
  assert.match(
    css,
    /\.cover-letter-intro\s*>\s*p:first-child\s*\{[^}]*font-size:\s*19px[^}]*font-weight:\s*650/s,
  );
  assert.match(
    css,
    /\.cover-letter-copy p\s*\{[^}]*text-align:\s*justify[^}]*text-align-last:\s*left[^}]*text-justify:\s*inter-character[^}]*word-break:\s*keep-all/s,
  );
  assert.match(
    css,
    /\.portfolio-profile-photo\s*\{[^}]*aspect-ratio:\s*3\s*\/\s*4/s,
  );
  assert.match(
    css,
    /\.content-hero h1\s*\{[^}]*font-size:\s*var\(--type-section-title\)/s,
  );
  assert.match(
    css,
    /\.article-section-heading h2\s*\{[^}]*font-size:\s*var\(--type-entity-title\)/s,
  );
  assert.match(
    css,
    /\.case-study-overview-head h2\s*\{[^}]*font-size:\s*var\(--type-featured-project-title\)/s,
  );
  assert.match(css, /break-inside:\s*avoid/);
});
