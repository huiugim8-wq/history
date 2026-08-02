import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArticleSection,
  ExternalTextLink,
  InternalBackLink,
  TagList,
} from "../../article-components";
import ContentShell from "../../content-shell";
import { publicAssetPath } from "../../site-paths";

export const metadata: Metadata = {
  title: "실시간 투자 정보 플랫폼 | 김희준",
  description:
    "외부 차트 API가 지원하지 않는 틱 오버레이를 위해 약 9천만 건 규모의 데이터를 다루는 TypeScript 차트 엔진을 직접 구현한 프론트엔드 프로젝트입니다.",
};

const projectMetrics = [
  { value: "43", label: "Panel Types" },
  { value: "25", label: "Layout Commands" },
  { value: "2", label: "Canvas Layers" },
  { value: "48", label: "Test / Spec Files" },
] as const;

const productFlow = [
  {
    number: "01",
    title: "탐색",
    description: "시장과 종목 후보를 찾고",
  },
  {
    number: "02",
    title: "분석",
    description: "차트와 선정 근거를 확인하고",
  },
  {
    number: "03",
    title: "주문",
    description: "호가와 주문으로 연결하고",
  },
  {
    number: "04",
    title: "복기",
    description: "진입 전후 판단을 비교합니다.",
  },
] as const;

const workspaces = [
  {
    src: publicAssetPath("/gops/case-panel-portfolio.png"),
    title: "자산 현황",
    description: "계좌·보유 종목·손익을 한 화면에서 확인",
  },
  {
    src: publicAssetPath("/gops/case-recommendation.png"),
    title: "시장 탐색",
    description: "추천 기준·차트·뉴스와 시장 지수를 함께 비교",
  },
  {
    src: publicAssetPath("/gops/case-panel-review.png"),
    title: "거래 복기",
    description: "진입 전후 차트와 판단에 사용한 정보를 다시 확인",
  },
] as const;

const deepDives = [
  {
    href: "/portfolio/trading-platform/react-panel-registry",
    title: "React 공통 프레임 · 43종 기능 패널 설계",
  },
  {
    href: "/portfolio/trading-platform/rest-websocket",
    title: "REST API · WebSocket 실시간 흐름",
  },
  {
    href: "/portfolio/trading-platform/two-layer-canvas",
    title: "2-Layer Canvas 차트 엔진",
  },
  {
    href: "/portfolio/trading-platform/chart-analysis",
    title: "TypeScript 피벗 군집 · 선형회귀 알고리즘",
  },
] as const;

const validationRows = [
  {
    risk: "잘못된 Agent 패널 명령",
    boundary: "Runtime Validation + Registry-only resolve",
    verification: "미등록 kind, 범위 밖 span, 미지원 명령",
    result: "검증된 React 컴포넌트만 화면 상태에 반영",
  },
  {
    risk: "과거·실시간 시계열의 중복과 누락",
    boundary: "REST Missing Range + WebSocket Merge",
    verification: "종목·시각 병합, 재연결·backfill 시나리오",
    result: "과거와 최신 이벤트를 하나의 차트 상태로 유지",
  },
  {
    risk: "포인터 이동마다 전체 차트 갱신",
    boundary: "Base / Overlay Canvas 분리",
    verification: "포인터 이벤트에서 Base draw 호출 여부",
    result: "Base 재렌더링 0회, Overlay만 rAF로 갱신",
  },
  {
    risk: "분석 후보의 불투명한 선정 기준",
    boundary: "후보 생성 / 검증 단계 분리",
    verification: "동일 입력의 결정성과 평가 점수",
    result: "선택된 선과 평가 근거를 같은 화면에 표시",
  },
] as const;

export default function TradingPlatformPage() {
  return (
    <ContentShell
      eyebrow="크래프톤 정글 · 프론트엔드"
      title="실시간 투자 정보 플랫폼"
      description="외부 차트 API가 지원하지 않는 틱 데이터 오버레이를 위해, 약 9천만 건 규모의 데이터를 다루는 차트 엔진을 직접 구현했습니다."
      actions={
        <>
          <ExternalTextLink href="https://github.com/huiugim8-wq/gops-stock-trading-platform">
            GitHub
          </ExternalTextLink>
          <ExternalTextLink href="https://www.youtube.com/watch?v=8P4wiwDrvxs">
            시연 영상
          </ExternalTextLink>
        </>
      }
    >
      <article className="technical-article technical-article--case-study">
        <InternalBackLink href="/portfolio">포트폴리오로 돌아가기</InternalBackLink>

        <dl className="project-facts case-project-facts">
          <div>
            <dt>기간</dt>
            <dd>5주 프로젝트</dd>
          </div>
          <div>
            <dt>팀</dt>
            <dd>5인 팀 프로젝트</dd>
          </div>
          <div>
            <dt>담당</dt>
            <dd>React UI · TypeScript 차트 엔진</dd>
          </div>
          <div>
            <dt>환경</dt>
            <dd>약 9천만 건 규모의 주식 틱 이벤트</dd>
          </div>
        </dl>

        <section
          className="case-core-contribution"
          aria-labelledby="case-core-contribution-title"
        >
          <p>제가 직접 구현한 핵심</p>
          <h2 id="case-core-contribution-title">
            차트 라이브러리를 붙이는 대신, 틱 데이터 엔진부터 만들었습니다.
          </h2>
          <div>
            <p>
              기존 차트 API는 프로젝트에 필요한 틱 단위 데이터와 분석선을 같은
              화면에 오버레이하는 방식을 지원하지 않았습니다. 그래서 데이터
              조회·병합, 시간축과 가격축 계산, 캔들·거래량·분석선 렌더링까지
              TypeScript로 직접 구현했습니다.
            </p>
            <p>
              전체 데이터는 약 9천만 건 규모입니다. 전부 브라우저에 적재하지
              않고 보이는 구간만 가져온 뒤 실시간 이벤트를 이어 붙였고,
              Canvas와 WebSocket은 이 구조를 동작시키기 위한 수단으로
              사용했습니다.
            </p>
          </div>
        </section>

        <section
          className="case-study-overview"
          aria-labelledby="case-study-overview-title"
        >
          <div className="case-study-overview-head">
            <div>
              <p className="case-kicker">서비스 흐름과 담당 범위</p>
              <h2 id="case-study-overview-title">
                탐색부터 복기까지, 하나의 작업 공간으로
              </h2>
            </div>
            <p>
              사용자가 종목을 찾고 판단한 뒤 거래를 다시 확인하는 흐름을
              패널형 작업 공간으로 연결했습니다. 저는 이 흐름에서{" "}
              <strong>React 조회 패널과 TypeScript 주식차트 엔진</strong>을
              맡았습니다.
            </p>
          </div>

          <ol className="case-product-flow" aria-label="서비스 이용 흐름">
            {productFlow.map((step) => (
              <li key={step.number}>
                <span>{step.number}</span>
                <strong>{step.title}</strong>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>

          <figure className="case-hero-visual">
            <Image
              src={publicAssetPath("/gops/case-panel-portfolio.png")}
              alt="계좌 자산, 수익률, 보유 종목, 시장 히트맵과 최근 거래 복기를 한 화면에 배치한 투자 정보 플랫폼"
              width={1704}
              height={1000}
              sizes="(max-width: 760px) calc(100vw - 40px), 1040px"
              unoptimized
              priority
            />
            <figcaption>
              자산 현황과 시장 정보, 거래 복기를 기능 패널로 조합한 실제 작업 화면
            </figcaption>
          </figure>

          <dl className="case-metric-grid" aria-label="프론트엔드 구현 범위">
            {projectMetrics.map((metric) => (
              <div key={metric.label}>
                <dd>{metric.value}</dd>
                <dt>{metric.label}</dt>
              </div>
            ))}
          </dl>
        </section>

        <ArticleSection number="01" title="React 패널 아키텍처">
          <p>
            43종의 패널이 늘어나도 이동·크기 조절·닫기·오류 처리를 반복 구현하지
            않도록 공통 프레임과 기능 콘텐츠의 책임을 분리했습니다. 패널 종류와
            크기 제약은 TypeScript Registry에서 관리하고, Agent 명령은 계약을
            통과한 경우에만 화면 상태로 변환했습니다.
          </p>

          <div className="case-architecture-grid">
            <section className="case-structure-card" aria-labelledby="component-tree-title">
              <p className="case-card-label">REACT COMPONENT TREE</p>
              <h3 id="component-tree-title">공통 상호작용과 기능 로직의 분리</h3>
              <div className="case-panel-tree" aria-label="패널 컴포넌트 구조">
                <div className="case-tree-node case-tree-node--root">
                  <strong>WorkspacePanelFrame</strong>
                  <span>focus · drag · resize · close · error boundary</span>
                </div>
                <div className="case-tree-branch" aria-hidden="true" />
                <div className="case-tree-children">
                  <div className="case-tree-node">
                    <strong>PanelHeader</strong>
                    <span>title · action</span>
                  </div>
                  <div className="case-tree-node">
                    <strong>Content Slot</strong>
                    <span>feature panel</span>
                  </div>
                  <div className="case-tree-node">
                    <strong>Panel State</strong>
                    <span>loading · error</span>
                  </div>
                </div>
              </div>
              <p className="case-structure-note">
                SearchPanel · ChartPanel · OrderPanel은 도메인 로직만 유지합니다.
              </p>
            </section>

            <section
              className="case-structure-card case-structure-card--dark"
              aria-labelledby="contract-title"
            >
              <p className="case-card-label">TYPESCRIPT CONTRACTS</p>
              <h3 id="contract-title">등록 가능한 패널과 명령의 범위</h3>
              <div className="case-contract">
                <div>
                  <strong>PanelRegistryEntry</strong>
                  <code>
                    kind · component · min/default/maxSpan · layoutWeight ·
                    insertable
                  </code>
                </div>
                <div>
                  <strong>AgentLayoutCommand</strong>
                  <code>
                    create · close · move · resize · replace · focus ·
                    setPriority
                  </code>
                </div>
              </div>
              <p className="case-structure-note">
                25개 명령 타입을 Runtime Validation으로 확인합니다.
              </p>
            </section>
          </div>

          <div className="case-command-block">
            <p className="case-card-label">AGENT COMMAND PIPELINE</p>
            <ol className="case-command-pipeline" aria-label="Agent 명령 처리 흐름">
              {[
                "Agent Output",
                "Schema Parse",
                "Normalize",
                "Registry Resolve",
                "Workspace State",
              ].map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p>
              Agent가 React 컴포넌트를 직접 생성하지 않고, 검증된 명령만 상태
              변경으로 변환하도록 경계를 두었습니다.
            </p>
          </div>

          <dl className="case-policy-list" aria-label="잘못된 패널 명령 처리 정책">
            <div>
              <dt>Unknown panel kind</dt>
              <dd>Registry에 없는 컴포넌트 생성 거부</dd>
            </div>
            <div>
              <dt>Invalid span / position</dt>
              <dd>등록된 최소·최대 범위로 보정</dd>
            </div>
            <div>
              <dt>Unsupported command</dt>
              <dd>상태를 바꾸지 않고 기록 후 무시</dd>
            </div>
          </dl>

          <Link
            className="case-inline-link"
            href="/portfolio/trading-platform/react-panel-registry"
          >
            43종 패널과 Registry 설계 자세히 보기 <span aria-hidden="true">→</span>
          </Link>
        </ArticleSection>

        <ArticleSection number="02" title="하나의 구조, 세 작업 화면">
          <p>
            같은 패널 구조를 사용하되, 사용자의 목적에 따라 필요한 정보와
            우선순위가 달라지도록 작업 화면을 구성했습니다. 자산 현황에서는
            손익을, 시장 탐색에서는 판단 재료를, 거래 복기에서는 진입 전후의
            근거를 먼저 보여줍니다.
          </p>
          <div className="case-screen-gallery">
            {workspaces.map((workspace) => (
              <figure key={workspace.src}>
                <Image
                  src={workspace.src}
                  alt={workspace.description}
                  width={1704}
                  height={1000}
                  sizes="(max-width: 760px) calc(100vw - 40px), 260px"
                  unoptimized
                />
                <figcaption>
                  <strong>{workspace.title}</strong>
                  <span>{workspace.description}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </ArticleSection>

        <ArticleSection number="03" title="실시간 주식차트">
          <p>
            이 프로젝트에서 가장 많이 파고든 문제는 차트였습니다. 기존 API로는
            필요한 틱 데이터를 분석선과 함께 오버레이할 수 없어서 데이터
            조회부터 좌표 계산, 병합, 렌더링까지 직접 구현했습니다. 약 9천만 건
            규모의 전체 데이터를 한 번에 브라우저로 옮기는 대신 현재 화면에
            필요한 구간과 이후 변화만 연결했습니다.
          </p>

          <figure className="project-visual project-visual--case">
            <Image
              src={publicAssetPath("/gops/case-chart-logic.png")}
              alt="캔들 차트와 거래량, 지지 저항선, 추세선, 패턴 근거 탭이 함께 표시된 TypeScript 주식차트"
              width={1704}
              height={1000}
              sizes="(max-width: 760px) calc(100vw - 40px), 812px"
              unoptimized
            />
            <figcaption>
              캔들·거래량·분석선과 근거 패널을 연결한 TypeScript 주식차트
            </figcaption>
          </figure>

          <div className="case-data-flow" aria-label="실시간 차트 데이터 흐름">
            <div>
              <span>01 · REST</span>
              <strong>Visible Range</strong>
              <p>초기·과거·누락 구간 중 화면에 필요한 범위만 조회</p>
            </div>
            <div>
              <span>02 · STORE</span>
              <strong>Candle Store</strong>
              <p>종목과 시각을 기준으로 과거 데이터와 최신 이벤트를 병합</p>
            </div>
            <div>
              <span>03 · WEBSOCKET</span>
              <strong>Live Update</strong>
              <p>초기 조회 이후의 변동만 기존 차트 상태에 반영</p>
            </div>
          </div>

          <p className="case-reconnect-note">
            <strong>Reconnect</strong>
            마지막 수신 시각 이후의 누락 구간만 REST로 보완한 뒤 WebSocket
            이벤트를 다시 이어 붙입니다.
          </p>

          <div className="case-canvas-grid" aria-label="2-Layer Canvas 렌더링 경계">
            <section>
              <span>BASE CANVAS</span>
              <h3>데이터가 바뀔 때만</h3>
              <p>캔들 · 거래량 · 축 · 분석선</p>
            </section>
            <section>
              <span>OVERLAY CANVAS</span>
              <h3>포인터가 움직일 때</h3>
              <p>크로스헤어 · 툴팁 · 선택 상태 · requestAnimationFrame</p>
            </section>
          </div>

          <div className="case-inline-links" aria-label="실시간 차트 상세 글">
            <Link
              className="case-inline-link"
              href="/portfolio/trading-platform/rest-websocket"
            >
              REST·WebSocket 연결 자세히 보기 <span aria-hidden="true">→</span>
            </Link>
            <Link
              className="case-inline-link"
              href="/portfolio/trading-platform/two-layer-canvas"
            >
              2-Layer Canvas 자세히 보기 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </ArticleSection>

        <ArticleSection number="04" title="분석 결과를 설명하는 화면">
          <p>
            지지·저항선을 그리는 데서 끝내지 않고, 어떤 후보가 어떤 기준을
            통과했는지 같은 화면에서 확인할 수 있게 했습니다. 알고리즘의 결과를
            사용자가 다시 판단할 수 있는 정보로 바꾸는 부분을 프론트엔드의
            책임으로 두었습니다.
          </p>

          <ol className="case-analysis-pipeline" aria-label="차트 분석 알고리즘 흐름">
            <li>
              <span>01</span>
              <strong>Candle Data</strong>
              <p>가격 · 거래량</p>
            </li>
            <li>
              <span>02</span>
              <strong>Pivot</strong>
              <p>반전 지점 추출</p>
            </li>
            <li>
              <span>03</span>
              <strong>Candidate</strong>
              <p>군집 · 선형회귀</p>
            </li>
            <li>
              <span>04</span>
              <strong>Validation</strong>
              <p>접촉 · 반응 · 오차 · 돌파</p>
            </li>
          </ol>

          <figure className="project-visual project-visual--case">
            <Image
              src={publicAssetPath("/gops/case-chart-evidence.png")}
              alt="지지 저항 후보선과 접촉 횟수, 가격 반응, 허용 오차, 돌파 여부 등 선정 근거가 함께 표시된 차트"
              width={1704}
              height={1000}
              sizes="(max-width: 760px) calc(100vw - 40px), 812px"
              unoptimized
            />
            <figcaption>
              선택된 지지·저항선과 평가 근거를 같은 차트 레이어에서 확인
            </figcaption>
          </figure>

          <div className="case-analysis-evidence">
            <div>
              <p className="case-card-label">WHY THIS LINE</p>
              <h3>결과와 선정 이유를 함께 표시</h3>
            </div>
            <ul>
              <li>Contact count</li>
              <li>Price reaction</li>
              <li>Allowed error</li>
              <li>Breakout status</li>
            </ul>
            <p>
              후보 생성과 검증을 분리해 같은 입력과 조건에서는 같은 결과를
              재현하고, 통과한 선만 근거와 함께 표시했습니다.
            </p>
          </div>
        </ArticleSection>

        <ArticleSection number="05" title="검증으로 확인한 경계">
          <p>
            구현 수치만 나열하지 않고, 오류가 발생할 수 있는 지점마다 경계를
            두고 명령·재연결·렌더링·알고리즘 결과를 검증했습니다.
          </p>

          <div className="table-scroll case-validation-scroll">
            <table className="article-table case-validation-table">
              <thead>
                <tr>
                  <th>위험</th>
                  <th>경계와 선택</th>
                  <th>검증</th>
                  <th>결과</th>
                </tr>
              </thead>
              <tbody>
                {validationRows.map((row) => (
                  <tr key={row.risk}>
                    <td>{row.risk}</td>
                    <td>{row.boundary}</td>
                    <td>{row.verification}</td>
                    <td>{row.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="case-evidence-grid">
            <section>
              <span>CONTRACT</span>
              <h3>상태에 들어오기 전 검증</h3>
              <p>Panel Registry와 명령 Schema로 허용 범위를 고정했습니다.</p>
            </section>
            <section>
              <span>RENDERING</span>
              <h3>그리기 경계 확인</h3>
              <p>Base와 Overlay의 draw 호출을 나눠 포인터 갱신을 확인했습니다.</p>
            </section>
            <section>
              <span>TEST SURFACE</span>
              <h3>48개 Test / Spec 파일</h3>
              <p>계약, 재연결, 결정성, 렌더링 경계의 실패 조건을 확인했습니다.</p>
            </section>
          </div>

          <p className="case-limit-note">
            <strong>다음 검증</strong>
            Core Web Vitals와 고빈도 렌더링 처리량은 배포 환경에서 별도로
            측정해야 할 범위로 남겼습니다.
          </p>
        </ArticleSection>

        <ArticleSection number="06" title="백엔드와 협업한 경계">
          <p>
            프론트엔드와 백엔드의 책임을 섞지 않고, 과거 조회 범위와 실시간
            이벤트 형식, 재연결 시 복구 기준을 함께 맞췄습니다. 이를 통해 화면
            요구만 전달하는 것이 아니라 각 영역의 구조를 이해하며 협업했습니다.
          </p>
          <div className="case-responsibility-grid">
            <section>
              <span>BACKEND CONTRACT</span>
              <h3>제공 범위</h3>
              <p>과거 구간 REST 응답 · 최신 WebSocket 이벤트 · 재연결 기준</p>
            </section>
            <section>
              <span>FRONTEND STATE</span>
              <h3>연결 범위</h3>
              <p>Missing Range 조회 · 종목/시각 병합 · 오류와 연결 상태</p>
            </section>
            <section>
              <span>RENDERING</span>
              <h3>사용자에게 보이는 범위</h3>
              <p>조회 범위 · 실시간 변화 · 분석 결과와 선정 근거</p>
            </section>
          </div>
        </ArticleSection>

        <ArticleSection number="07" title="구현 상세 보기">
          <div className="deep-dive-grid">
            {deepDives.map((item) => (
              <Link href={item.href} key={item.href}>
                <span>{item.title}</span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
          <TagList
            tags={[
              "React",
              "TypeScript",
              "Panel Registry",
              "Runtime Validation",
              "REST API",
              "WebSocket",
              "Canvas 2D",
              "requestAnimationFrame",
              "Clustering",
              "Linear Regression",
            ]}
          />
        </ArticleSection>
      </article>
    </ContentShell>
  );
}
