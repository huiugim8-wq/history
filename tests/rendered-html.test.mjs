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
  assert.match(html, /github\.com\/huiugim8-wq/);
  assert.match(html, /github\.com\/KFJG-Team1\/gops/);
  assert.match(html, /<p>프론트엔드 개발자<\/p>/);
  assert.match(html, /<h1 id="profile-title">김희준<\/h1>/);
  assert.doesNotMatch(html, /안녕하세요/);
  assert.match(html, /화면 너머의 구조까지 이해하는/);
  assert.match(html, /실내건축디자인과 창업 경험/);
  assert.match(html, /REST·WebSocket[\s\S]*데이터를 화면 상태에 연결/);
  assert.match(html, /백엔드와 프론트엔드의 데이터[\s\S]*책임도 구분/);
  assert.match(html, /필요한 기술을 배우고 직접 검증/);
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
  assert.doesNotMatch(html, /주요 구현/);
  assert.match(
    html,
    /사용자가 시장을 탐색하고, 차트를 분석하고, 주문한 뒤 거래를[\s\S]*복기하는 과정/,
  );
  assert.match(
    html,
    /인프라·프론트엔드·백엔드·AI 각 1명으로 구성된 4인 팀/,
  );
  assert.match(html, /프론트엔드를 담당/);
  assert.match(html, /React 기반 UI와[\s\S]*TypeScript 차트 엔진/);
  assert.match(
    html,
    /백엔드 데이터 파이프라인은 Kafka를 통해 24시간 기준 약[\s\S]*9천만 건/,
  );
  assert.match(html, /Docker와[\s\S]*Kubernetes 환경에서 배포·운영/);
  assert.match(
    html,
    /공통 프레임과 기능 패널을 분리한 React 컴포넌트 설계/,
  );
  assert.match(html, /<strong>43종의 패널<\/strong>/);
  assert.match(html, /<strong>TypeScript Registry 한곳에서 관리<\/strong>/);
  assert.match(html, /<strong>등록된 패널로만 변환<\/strong>/);
  assert.match(html, /Component Composition/);
  assert.match(html, /Runtime Validation/);
  assert.match(html, /Agent-driven UI/);
  assert.doesNotMatch(html, />사용 기술</);
  assert.match(html, /React 패널 구조 키워드/);
  assert.match(html, /차트 엔진 키워드/);
  assert.match(html, /차트 분석 알고리즘 키워드/);
  assert.match(
    html,
    /REST·WebSocket과 2-Layer Canvas를 적용한 차트 엔진/,
  );
  assert.match(
    html,
    /기존 데이터 범위 밖의 누락 구간만 REST로 조회하고 이후[\s\S]*WebSocket으로 반영/,
  );
  assert.match(html, /전체 구간을 다시 요청하지 않고/);
  assert.match(html, /정적 차트의 재렌더링 없이 오버레이 Canvas만 갱신/);
  assert.match(html, /TypeScript CSR/);
  assert.match(html, /REST API/);
  assert.match(html, /Canvas 2D/);
  assert.match(html, /requestAnimationFrame/);
  assert.doesNotMatch(html, /상세 글 준비 중/);
  assert.match(
    html,
    /후보 생성과 검증을 분리한 TypeScript 차트 분석 알고리즘/,
  );
  assert.match(html, /피벗 군집과 선형회귀로 후보선을 생성/);
  assert.match(html, /기준을 통과한 후보만 차트에 표시/);
  assert.match(
    html,
    /동일한 데이터와 조건에서[\s\S]*같은 분석 결과를 재현/,
  );
  assert.match(html, /별도 차트 레이어/);
  assert.match(html, /사용자가 선정 이유를 확인/);
  assert.match(html, /Data Structures/);
  assert.match(html, /Clustering/);
  assert.match(html, /Linear Regression/);
  assert.match(
    html,
    /<span>01<\/span>[\s\S]*공통 프레임과 기능 패널을 분리한 React 컴포넌트 설계[\s\S]*<span>02<\/span>[\s\S]*REST·WebSocket과 2-Layer Canvas를 적용한 차트 엔진[\s\S]*<span>03<\/span>[\s\S]*후보 생성과 검증을 분리한 TypeScript 차트 분석 알고리즘/,
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
