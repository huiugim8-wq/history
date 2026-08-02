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
  assert.match(
    html,
    /href="https:\/\/github\.com\/huiugim8-wq"[\s\S]*?<strong>Github<\/strong><\/a>/,
  );
  assert.doesNotMatch(html, />github\.com\/huiugim8-wq</);
  assert.match(html, /github\.com\/KFJG-Team1\/gops/);
  assert.match(html, /010 8201 6811/);
  assert.match(html, /<p>프론트엔드 개발자<\/p>/);
  assert.match(html, /<h1 id="profile-title">김희준<\/h1>/);
  assert.doesNotMatch(html, /안녕하세요/);
  assert.match(html, /소통을 바탕으로 구현하는 프론트엔드 개발자/);
  assert.match(
    html,
    /실내건축디자인을 전공\/ 창업 과정[\s\S]*체험단을 진행하며[\s\S]*피드백을 실행 가능한 형태로 구체화/,
  );
  assert.match(
    html,
    /비전공자로서 7개월 만에[\s\S]*9천만 건의 주식 틱 이벤트/,
  );
  assert.match(html, /과거 데이터는 REST로[\s\S]*최신 데이터는 WebSocket/);
  assert.match(html, /정적·실시간 요소를 두 개의 Canvas/);
  assert.match(
    html,
    /백엔드 구조까지 이해하며[\s\S]*원활하게[\s\S]*협업하는 개발자/,
  );
  assert.doesNotMatch(html, /개인의 성장이 팀의 실행력으로 이어지는/);
  assert.match(html, /og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("renders landmark structure and project experience details", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /<header class="top-banner" id="top">/);
  assert.match(html, /<address class="profile-contact" aria-label="연락처">/);
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
  assert.match(
    html,
    /<h2>Work &amp; Experience<\/h2>[\s\S]*<h3>크래프톤 정글<\/h3>[\s\S]*<h4>실시간 투자 정보 플랫폼<\/h4>[\s\S]*<h5 id="team-title">팀 프로젝트 5인<\/h5>/,
  );
  assert.doesNotMatch(html, /TEAM PROJECT/);
  assert.doesNotMatch(html, />KRAFTON JUNGLE</);
  assert.match(html, /㈜나현[\s\S]*2024 — 2025\.08/);
  assert.match(html, /OTOS[\s\S]*2023 — 2024/);
  assert.doesNotMatch(html, /2023 — 2024 · 1년/);
  assert.match(html, /와디즈 스피마코튼 펀딩 1,206% 달성/);
  assert.match(
    html,
    /<section class="resume-section education-section" id="education" aria-labelledby="education-title">/,
  );
  assert.match(
    html,
    /<h2 id="education-title">Education<\/h2>[\s\S]*대구대학교[\s\S]*실내건축디자인학과[\s\S]*2017\.03 — 2023\.08/,
  );
  assert.ok(html.indexOf("Work &amp; Experience") < html.indexOf("Education"));
  assert.ok(html.indexOf("Education") < html.indexOf("대구대학교"));
  assert.match(html, /<article class="resume-item jungle-item" id="project">/);
  assert.doesNotMatch(html, /class="jungle-logo"/);
  assert.match(html, /class="project-header"/);
  assert.doesNotMatch(html, /<h3>GOPS<\/h3>/);
  assert.match(html, /실시간 투자 정보 플랫폼/);
  assert.match(html, /PROJECT 1/);
  assert.doesNotMatch(html, /주요 구현/);
  assert.match(
    html,
    /AI가 시장 탐색과 차트 분석을 지원하고, 주문부터 거래[\s\S]*복기까지 하나의 흐름으로 연결하는 주식 트레이딩[\s\S]*플랫폼/,
  );
  assert.doesNotMatch(html, /하나의 작업 화면에서 수행할 수 있도록 만든/);
  assert.match(
    html,
    /공통 프레임과 기능 패널을 분리한[\s\S]*React 컴포넌트 설계/,
  );
  assert.match(html, /팀 프로젝트 5인/);
  assert.match(html, /Frontend[\s\S]*Infrastructure[\s\S]*Backend[\s\S]*AI/);
  assert.match(html, /43종의 패널이 공통 프레임을 재사용하도록 설계/);
  assert.match(html, /TypeScript Registry 한곳에서[\s\S]*관리하여/);
  assert.match(html, /등록된 패널로만 변환/);
  assert.match(html, /Component Composition/);
  assert.match(html, /Runtime Validation/);
  assert.match(html, /Agent-driven UI/);
  assert.match(
    html,
    /type="button" class="highlight-tag" aria-pressed="false">React<\/button>/,
  );
  assert.match(html, /class="project-highlight-link"/);
  assert.equal(html.match(/class="project-inline-link"/g)?.length, 4);
  assert.match(
    html,
    /class="project-inline-link" href="https:\/\/app\.notion\.com\/p\/3aa0463ff9f08065b16bd4cbbc87d321\?source=copy_link"[\s\S]*?>React 컴포넌트 설계<\/a>/,
  );
  assert.match(
    html,
    /class="project-inline-link" href="https:\/\/app\.notion\.com\/p\/3aa0463ff9f08065b16bd4cbbc87d321\?source=copy_link"[\s\S]*?>REST API·WebSocket<\/a>/,
  );
  assert.match(
    html,
    /class="project-inline-link" href="https:\/\/app\.notion\.com\/p\/3aa0463ff9f08065b16bd4cbbc87d321\?source=copy_link"[\s\S]*?>2-Layer Canvas를 적용한 차트 엔진<\/a>/,
  );
  assert.match(
    html,
    /class="project-inline-link" href="https:\/\/app\.notion\.com\/p\/3aa0463ff9f08065b16bd4cbbc87d321\?source=copy_link"[\s\S]*?>TypeScript 알고리즘<\/a>/,
  );
  assert.doesNotMatch(html, />사용 기술</);
  assert.match(html, /React 패널 구조 키워드/);
  assert.match(html, /차트 엔진 키워드/);
  assert.match(html, /차트 분석 알고리즘 키워드/);
  assert.match(
    html,
    /REST API·WebSocket[\s\S]*2-Layer Canvas를 적용한 차트 엔진/,
  );
  assert.match(
    html,
    /24시간 9,327만 건\(평균 초당 약 1,080건\)/,
  );
  assert.match(html, /REST[\s\S]*API·WebSocket으로 구간 조회·실시간 반영/);
  assert.match(html, /2-Layer Canvas로 분리해 이동[\s\S]*오버레이만 갱신/);
  assert.match(html, /TypeScript CSR/);
  assert.match(html, /REST API/);
  assert.match(html, /Canvas 2D/);
  assert.match(html, /requestAnimationFrame/);
  assert.doesNotMatch(html, /상세 글 준비 중/);
  assert.match(
    html,
    /피벗 군집·선형회귀로 지지·저항선을 생성한[\s\S]*TypeScript 알고리즘/,
  );
  assert.match(html, /피벗 군집·선형회귀로 지지·저항 후보선을 생성하고/);
  assert.match(html, /유효한 선만 선별/);
  assert.match(
    html,
    /동일 조건의 결과와 선정 이유를 재현/,
  );
  assert.match(html, /별도 차트 레이어/);
  assert.match(html, /Data Structures/);
  assert.match(html, /Clustering/);
  assert.match(html, /Linear Regression/);
  assert.match(
    html,
    /공통 프레임과 기능 패널을 분리한[\s\S]*React 컴포넌트 설계[\s\S]*REST API·WebSocket[\s\S]*2-Layer Canvas를 적용한 차트 엔진[\s\S]*피벗 군집·선형회귀로 지지·저항선을 생성한[\s\S]*TypeScript/,
  );
  assert.doesNotMatch(html, /<span>0[1-4]<\/span>/);
  assert.match(html, /PROJECT 2[\s\S]*mini-react — React 가상 DOM 실행 환경/);
  assert.match(html, /aria-label="mini-react 핵심 구현"/);
  assert.match(
    html,
    /href="https:\/\/github\.com\/woonyong-kr\/mini-react2"/,
  );
  assert.match(
    html,
    /상태 변경이 실제 DOM[\s\S]*업데이트로 이어지는 전 과정을 직접 설계/,
  );
  assert.match(
    html,
    /전체 DOM을 다시 그리지 않고, 바뀐 부분만 갱신했습니다/,
  );
  assert.match(
    html,
    /계산과 DOM 조작을 분리해 문제가 생긴[\s\S]*단계를 추적하고 테스트/,
  );
  assert.match(html, /정렬·필터 후에도 카드 정보가 섞이지 않게 했습니다/);
  assert.match(html, /1,025개 카드/);
  assert.match(html, /CollectionPage\.js/);
  assert.match(
    html,
    /마우스를 움직일 때마다 전체 UI를 다시 그리지 않았습니다/,
  );
  assert.match(html, /카드 기울기·홀로그램[\s\S]*CSS 변수만 갱신/);
  assert.match(html, /상태는 보존하고, 연속 업데이트는 한 번으로 합쳤습니다/);
  assert.match(html, /microtask에 모아 한 번만 렌더링/);
  assert.match(html, /즉시[\s\S]*반영이 필요할 때는 sync 전략/);
  assert.match(html, /최적화 효과를 감이 아니라 숫자로 확인했습니다/);
  assert.match(html, /78개 테스트를 모두 통과/);
  assert.match(html, /class="project-proof-points"/);
  assert.match(html, /1,025개[\s\S]*78 \/ 78[\s\S]*3개/);
  assert.doesNotMatch(html, /Fiber 비교|Fiber Comparison/);
  assert.doesNotMatch(html, /Redis/);
  assert.doesNotMatch(html, /PROJECT 3|Pintos|syscall-entry\.S|x86-64 Assembly/);
  assert.doesNotMatch(html, /배포 중단을 해결한 Docker·Kubernetes 환경/);
  assert.doesNotMatch(html, /성능과 비용을 함께 고려한 인프라/);
  assert.doesNotMatch(html, /class="company-mark project-mark"/);
  assert.doesNotMatch(html, /Experience &amp; Education/);
  const notionUrl =
    "https://app.notion.com/p/3aa0463ff9f08065b16bd4cbbc87d321?source=copy_link";
  assert.equal(html.split(`href="${notionUrl}"`).length - 1, 5);
  assert.match(html, /Notion/);
  assert.doesNotMatch(html, /Blog|준비 중/);
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
  assert.doesNotMatch(html, /class="project-image"/);
  assert.doesNotMatch(html, /gops-workspace\.png/);
  assert.match(html, /<footer>/);
});
