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
  assert.match(html, /AI 엔지니어 <strong>김희준<\/strong>입니다/);
  assert.match(html, /해결해야 할 문제와 성공 기준/);
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
  assert.match(
    html,
    /24시간 동안 수집된 약 9천만 건의 시장 이벤트를 Kafka 이벤트 드리븐 구조로 처리/,
  );
  assert.match(html, /Docker·Kubernetes 기반 프론트엔드 배포/);
  assert.match(html, /Rolling Update/);
  assert.match(html, /React와 분리한 TypeScript 차트 엔진/);
  assert.match(html, /Component Architecture/);
  assert.match(html, /근거를 검증해 작도하는 차트 분석/);
  assert.match(html, /Pivot Detection/);
  assert.match(html, /Linear Regression/);
  assert.match(html, /분석 근거까지 탐색하는 차트·기업 분석 UI/);
  assert.match(html, /Point-in-Time Snapshot/);
  assert.match(html, /독립된 차트 레이어/);
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
