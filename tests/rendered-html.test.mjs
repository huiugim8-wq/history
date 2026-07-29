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
  assert.match(html, /og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("renders landmark structure and accessible project imagery", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /<header class="site-header">/);
  assert.match(html, /<nav aria-label="주요 메뉴">/);
  assert.match(html, /<main id="top">/);
  assert.match(html, /<section class="section project-section" id="project">/);
  assert.match(
    html,
    /alt="GOPS의 NVDA 캔들 차트, 호가, 비교 차트가 배치된 투자 분석 화면"/,
  );
  assert.match(html, /<footer>/);
});
