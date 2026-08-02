import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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
  const contactHtml =
    html.match(/<address class="profile-contact" aria-label="연락처">[\s\S]*?<\/address>/)?.[0] ?? "";
  assert.doesNotMatch(contactHtml, /Github|GitHub/);
  assert.doesNotMatch(html, />github\.com\/huiugim8-wq</);
  assert.match(
    html,
    /github\.com\/huiugim8-wq\/gops-stock-trading-platform/,
  );
  assert.doesNotMatch(html, /github\.com\/KFJG-Team1\/gops/);
  assert.doesNotMatch(html, /github\.com\/woonyong-kr\/mini-react2/);
  assert.match(html, /010 8201 6811/);
  assert.match(html, /<p>프론트엔드 개발자<\/p>/);
  assert.match(html, /<h1 id="profile-title">김희준<\/h1>/);
  assert.match(html, /<nav class="site-nav" aria-label="주요 메뉴">/);
  assert.match(
    html,
    /<button type="button" class="site-nav-link site-nav-button" aria-haspopup="dialog" aria-controls="cover-letter-dialog">자기소개서<\/button>/,
  );
  assert.match(
    html,
    /<dialog class="cover-letter-dialog" id="cover-letter-dialog" aria-labelledby="cover-letter-title">/,
  );
  assert.match(
    html,
    /id="cover-letter-introduction">서론<\/h3>[\s\S]*id="cover-letter-project">프로젝트<\/h3>[\s\S]*id="cover-letter-conclusion">결론<\/h3>/,
  );
  assert.match(
    html,
    /6개월이 끝났을 때 단순히 많은 것을 배운 인턴이 아니라[\s\S]*해결책까지 남긴/,
  );
  assert.match(html, /href="#experience">경력<\/a>/);
  assert.match(html, /href="#education">학력<\/a>/);
  assert.match(
    html,
    /href="https:\/\/app\.notion\.com\/p\/Kim-hee-jun-3b00463ff9f080559a7cc2e06e89a9f3\?source=copy_link"[\s\S]*?>포트폴리오<\/a>/,
  );
  assert.match(
    html,
    /href="https:\/\/github\.com\/huiugim8-wq"[\s\S]*?>GitHub<\/a>/,
  );
  assert.doesNotMatch(html, /블로그/);
  assert.match(
    html,
    /<section class="profile" id="about" aria-labelledby="profile-title">/,
  );
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
  assert.match(html, /생산관리[\s\S]*과장 · 생산 라인장/);
  assert.match(
    html,
    /현대·기아자동차 부품 제조 현장의 생산 운영[\s\S]*약[\s\S]*20명의 현장 인력/,
  );
  assert.match(
    html,
    /<strong>20명의 현장 인력을 관리<\/strong>/,
  );
  assert.match(
    html,
    /생산계획에 따라 공정을 운영하고 작업 인력을 배치[\s\S]*안정적인 생산환경 유지/,
  );
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
  assert.match(
    html,
    /공간 설계와 시각적 구성에 대한 체계적인 훈련[\s\S]*명확하게 전달하는 역량/,
  );
  assert.match(
    html,
    /실내인테리어 공모전 동아리 ‘러스틱’을 결성[\s\S]*구성원 간 협업을 주도/,
  );
  assert.match(
    html,
    /<strong>동아리장을 맡아 프로젝트 기획과 구성원 간 협업을 주도했습니다\.<\/strong>/,
  );
  assert.match(
    html,
    /aria-label="수상 경력"[\s\S]*인테리어앤데코 공모전 수상[\s\S]*DGID 공모전 수상[\s\S]*학과 공로상 수상/,
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
  assert.match(
    html,
    /class="project-introduction project-introduction--single-line"/,
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
  assert.doesNotMatch(html, /class="project-highlight-link"/);
  assert.equal(html.match(/class="project-inline-link"/g)?.length, 4);
  assert.match(
    html,
    /class="project-inline-link" href="https:\/\/app\.notion\.com\/p\/React-43-3b00463ff9f080589486feb57d7ef0b3\?source=copy_link"[\s\S]*?>React 컴포넌트 설계[\s\S]*?<span aria-hidden="true">↗<\/span><\/a>/,
  );
  assert.match(
    html,
    /class="project-inline-link" href="https:\/\/app\.notion\.com\/p\/REST-API-WebSocket-3b00463ff9f080369e46cb05e433bf82\?source=copy_link"[\s\S]*?>REST API·WebSocket[\s\S]*?<span aria-hidden="true">↗<\/span><\/a>/,
  );
  assert.match(
    html,
    /class="project-inline-link" href="https:\/\/app\.notion\.com\/p\/2-Layer-Canvas-3b00463ff9f08007a1bfe7c8b61d3e3f\?source=copy_link"[\s\S]*?>2-Layer Canvas를 적용한 주식차트[\s\S]*?<span aria-hidden="true">↗<\/span><\/a>/,
  );
  assert.match(
    html,
    /class="project-inline-link" href="https:\/\/app\.notion\.com\/p\/TypeScript-3b00463ff9f080f1addef3b4c978e029\?source=copy_link"[\s\S]*?>TypeScript 알고리즘[\s\S]*?<span aria-hidden="true">↗<\/span><\/a>/,
  );
  assert.doesNotMatch(html, />사용 기술</);
  assert.match(html, /React 패널 구조 키워드/);
  assert.match(html, /차트 엔진 키워드/);
  assert.match(html, /차트 분석 알고리즘 키워드/);
  assert.match(
    html,
    /REST API·WebSocket[\s\S]*2-Layer Canvas를 적용한 주식차트/,
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
    /공통 프레임과 기능 패널을 분리한[\s\S]*React 컴포넌트 설계[\s\S]*REST API·WebSocket[\s\S]*2-Layer Canvas를 적용한 주식차트[\s\S]*피벗 군집·선형회귀로 지지·저항선을 생성한[\s\S]*TypeScript/,
  );
  assert.doesNotMatch(
    html,
    /class="project-highlight"><span>0[1-4]<\/span>/,
  );
  assert.match(html, /PROJECT 2[\s\S]*React 가상 DOM 실행 환경/);
  assert.doesNotMatch(html, /mini-react —/);
  assert.match(html, /aria-label="React 가상 DOM 실행 환경 핵심 구현"/);
  assert.match(
    html,
    /href="https:\/\/github\.com\/huiugim8-wq\/react-virtual-dom"/,
  );
  assert.match(
    html,
    /href="https:\/\/app\.notion\.com\/p\/1-3b00463ff9f080209e20dc502967677e\?source=copy_link"/,
  );
  assert.match(html, /Github[\s\S]*Notion/);
  assert.match(
    html,
    /함수형 컴포넌트·Hooks·Virtual DOM·Diff\/Patch를[\s\S]*프레임워크 없이 구현한 React 실행 환경/,
  );
  assert.match(html, /Diff &amp; Patch · 변경된 DOM만 갱신/);
  assert.match(html, /속성·텍스트·자식 노드의[\s\S]*변경만 실제 DOM에 반영/);
  assert.match(html, /Keyed Reconciliation · 목록 상태 유지/);
  assert.match(html, /1,025개 카드/);
  assert.match(html, /Hooks &amp; Batching · 상태 보존과 업데이트 병합/);
  assert.match(html, /연속 상태 변경을 microtask 단위로[\s\S]*묶었습니다/);
  assert.match(html, /78개 테스트 · 렌더링 흐름 검증/);
  assert.match(html, /생명주기 테스트 78개를[\s\S]*모두 통과/);
  assert.doesNotMatch(html, /class="project-verification"/);
  assert.match(html, /React 가상 DOM 실행 환경 키워드/);
  assert.match(html, /Microtask Batching/);
  assert.doesNotMatch(html, /mini-react2\/blob|mini-react2\/tree/);
  assert.doesNotMatch(html, /class="project-proof-points"/);
  assert.doesNotMatch(html, /Fiber 비교|Fiber Comparison/);
  assert.doesNotMatch(html, /Redis/);
  assert.doesNotMatch(html, /PROJECT 3|Pintos|syscall-entry\.S|x86-64 Assembly/);
  assert.doesNotMatch(html, /배포 중단을 해결한 Docker·Kubernetes 환경/);
  assert.doesNotMatch(html, /성능과 비용을 함께 고려한 인프라/);
  assert.doesNotMatch(html, /class="company-mark project-mark"/);
  assert.doesNotMatch(html, /Experience &amp; Education/);
  const notionUrl =
    "https://app.notion.com/p/1-3b00463ff9f08088b714d546253bca16?source=copy_link";
  assert.equal(html.split(`href="${notionUrl}"`).length - 1, 1);
  assert.match(html, /Notion/);
  assert.doesNotMatch(html, /Blog|블로그|준비 중/);
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

test("keeps project titles and section headings on the requested typography scale", async () => {
  const css = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(css, /--type-section-title:\s*40px/);
  assert.match(css, /--type-featured-project-title:\s*26px/);
  assert.match(
    css,
    /\.jungle-detail \.supporting-project \.project-title h4\s*\{[^}]*font-size:\s*var\(--type-featured-project-title\)/s,
  );
  assert.match(
    css,
    /\.experience-project-header \.project-title h4\s*\{[^}]*font-size:\s*var\(--type-featured-project-title\)/s,
  );
  assert.match(
    css,
    /\.experience-project-header \+ \.summary-box\s*\{[^}]*font-size:\s*var\(--text-large\)/s,
  );
  assert.match(
    css,
    /\.profile-statement\s*\{[^}]*font-size:\s*var\(--type-section-title\)[^}]*font-weight:\s*800/s,
  );
  assert.match(
    css,
    /\.profile-context\s*\{[^}]*font-size:\s*17px[^}]*font-weight:\s*650[^}]*line-height:\s*1\.68/s,
  );
});
