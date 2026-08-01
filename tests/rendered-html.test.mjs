import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
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

test("server-renders the finished Kim Heejun portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="ko">/);
  assert.match(html, /<title>김희준 \| AI Product Engineer<\/title>/);
  assert.match(html, /크래프톤 정글 12기 (?:수료|졸업)/);
  assert.match(html, /GOPS/);
  assert.match(html, /huiugim8@gmail\.com/);
  assert.match(html, /github\.com\/KFJG-Team1\/gops/);
  assert.match(html, /<p>프론트엔드 개발자<\/p>/);
  assert.match(html, /<h1 id="profile-title">김희준<\/h1>/);
  assert.doesNotMatch(html, /안녕하세요/);
  assert.match(html, /복잡한 문제를 화면의 구조로 풀어내는/);
  assert.match(html, /사용자 흐름을 먼저 정의/);
  assert.match(html, /24시간 약 9천만 건의 시장 데이터/);
  assert.match(html, /일관된 사용자 경험과 기능별 확장성/);
  assert.doesNotMatch(html, /개인의 성장이 팀의 실행력으로 이어지는/);
  assert.match(html, /og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("renders landmark structure and accessible project imagery", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /<header class="top-banner" id="top">/);
  assert.match(html, /<nav class="profile-links" aria-label="프로필 링크">/);
  assert.match(html, /<main>/);
  assert.match(
    html,
    /<section class="resume-section work-section" id="experience">/,
  );
  assert.match(html, /Work &amp; Experience/);
  assert.match(
    html,
    /크래프톤 정글[\s\S]*12기 졸업[\s\S]*실시간 투자 정보 플랫폼/,
  );
  assert.doesNotMatch(html, /TEAM PROJECT/);
  assert.doesNotMatch(html, />KRAFTON JUNGLE</);
  assert.match(html, /㈜나현[\s\S]*2024 — 2025\.08/);
  assert.match(html, /OTOS[\s\S]*2023 — 2024 · 1년/);
  assert.match(html, /대구대학교[\s\S]*2017\.03 — 2023\.08/);
  assert.match(html, /<article class="resume-item jungle-item" id="project">/);
  assert.match(
    html,
    /<img class="jungle-logo" src="\/jungle-by-krafton\.png" alt="Jungle by KRAFTON"\/>/,
  );
  assert.match(html, /class="project-header"/);
  assert.doesNotMatch(html, /<h3>GOPS<\/h3>/);
  assert.match(html, /실시간 투자 정보 플랫폼/);
  assert.match(html, /class="project-contribution-label">주요 구현<\/p>/);
  assert.match(
    html,
    /24시간 기준 약 9천만 건의 시장 이벤트를 처리하는 Kafka 환경/,
  );
  assert.match(html, /React UI와 TypeScript 차트 엔진을 담당/);
  assert.match(html, /Agent 명령으로 조합되는 React 패널 컴포넌트 설계/);
  assert.match(html, /TypeScript Registry와 연결해 화면을 조합/);
  assert.match(html, /Component Composition/);
  assert.match(html, /Runtime Validation/);
  assert.match(html, /Agent-driven UI/);
  assert.match(html, /CSR 기반 차트 엔진의 데이터 시각화와 UX 최적화/);
  assert.match(html, /필요한 구간만 REST API로 조회/);
  assert.match(html, /이후 변화는 WebSocket으로 반영/);
  assert.match(html, /두 경로를 시간 기준으로 병합/);
  assert.match(html, /TypeScript CSR/);
  assert.match(html, /REST API/);
  assert.match(html, /Canvas 2D/);
  assert.match(html, /Web Accessibility/);
  assert.doesNotMatch(html, /상세 글 준비 중/);
  assert.match(html, /후보 생성과 검증을 분리한 TypeScript 차트 분석 알고리즘/);
  assert.match(html, /검증된 지지·저항·추세·패턴과 판단 근거/);
  assert.match(html, /Data Structures/);
  assert.match(html, /Linear Regression/);
  assert.match(
    html,
    /<span>01<\/span>[\s\S]*Agent 명령으로 조합되는 React 패널 컴포넌트 설계[\s\S]*<span>02<\/span>[\s\S]*CSR 기반 차트 엔진의 데이터 시각화와 UX 최적화[\s\S]*<span>03<\/span>[\s\S]*후보 생성과 검증을 분리한 TypeScript 차트 분석 알고리즘/,
  );
  assert.doesNotMatch(html, /<span>04<\/span>/);
  assert.doesNotMatch(html, /배포 중단을 해결한 Docker·Kubernetes 환경/);
  assert.doesNotMatch(html, /성능과 비용을 함께 고려한 인프라/);
  assert.doesNotMatch(html, /class="company-mark project-mark"/);
  assert.doesNotMatch(html, /Experience &amp; Education/);
  assert.match(html, /Blog/);
  assert.match(html, /YouTube/);
  assert.match(
    html,
    /href="https:\/\/www\.wadiz\.kr\/web\/campaign\/detail\/198814"/,
  );
  assert.match(html, /‘무엇을 팔까’보다 고객의 어떤 문제를 풀어야 하는지/);
  assert.match(html, /연 매출 약 1억 원/);
  assert.doesNotMatch(html, /AI PRODUCT ENGINEER · FULL-STACK/);
  assert.doesNotMatch(html, /FEATURED PROJECT/);
  assert.doesNotMatch(html, /담당 · Frontend/);
  assert.doesNotMatch(html, /<h2>Skills<\/h2>/);
  assert.doesNotMatch(html, /<h2>Education<\/h2>/);
  assert.doesNotMatch(html, /class="project-image"/);
  assert.doesNotMatch(html, /gops-workspace\.png/);
  assert.match(html, /<footer>/);
});
