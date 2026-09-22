import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { publicAssetPath } from "../../site-paths";
import TradingCaseShell, { CaseDetailLink, CaseExternalLink, CaseSection, CaseTags } from "./case-shell";
import MarketArchitecture from "./market-architecture";
import TradingVideo from "./video-embed";

export const metadata: Metadata = {
  title: "실시간 투자 정보 플랫폼 | 김희준",
  description: "시장 데이터의 수집부터 커스텀 차트, AI 거래 복기까지 연결한 실시간 투자 정보 플랫폼의 구현 기록입니다.",
};

const productFlow = [
  ["01", "탐색", "시장과 종목 후보를 찾고"],
  ["02", "분석", "차트와 선정 근거를 확인하고"],
  ["03", "주문", "호가와 주문으로 연결하고"],
  ["04", "복기", "진입 전후 판단을 비교합니다."],
] as const;

const deepDives = [
  ["react-panel-registry", "React 공통 프레임 · 기능 패널 설계"],
  ["rest-websocket", "REST API · WebSocket 실시간 흐름"],
  ["two-layer-canvas", "2-Layer Canvas 차트 엔진"],
  ["chart-analysis", "TypeScript 피벗 군집 · 선형회귀 알고리즘"],
] as const;

export default function TradingPlatformPage() {
  return (
    <TradingCaseShell>
      <header className="trading-intro">
        <div className="trading-title-row">
          <h1>실시간 투자 정보 플랫폼</h1>
          <div className="trading-links">
            <CaseExternalLink href="https://github.com/huiugim8-wq/gops-stock-trading-platform">GitHub</CaseExternalLink>
            <CaseExternalLink href="https://www.youtube.com/watch?v=8P4wiwDrvxs">시연 영상</CaseExternalLink>
          </div>
        </div>
        <p className="trading-lead">하루 약 9천만 건의 시장 이벤트를 Kafka 기반으로 처리하고, AI 분석과 실시간 커스텀 차트로 연결한 투자 정보 플랫폼</p>
      </header>

      <ol className="trading-product-flow" aria-label="탐색부터 거래 복기까지의 서비스 흐름">
        {productFlow.map(([number, title, description]) => <li key={number}><span>{number}</span><strong>{title}</strong><p>{description}</p></li>)}
      </ol>

      <div className="trading-demo">
        <TradingVideo />
        <dl className="trading-project-meta">
          <div><dt>팀원</dt><dd>5인</dd></div>
          <div><dt>기간</dt><dd>2026.03 — 2026.07</dd></div>
          <div><dt>담당</dt><dd>풀스택</dd></div>
        </dl>
      </div>

      <CaseSection id="architecture" title="아키텍처">
        <figure className="trading-architecture">
          <a href={publicAssetPath("/gops/portfolio/aws-architecture.png")} target="_blank" rel="noreferrer" aria-label="AWS 전체 서비스 아키텍처 원본 크게 보기">
            <Image src={publicAssetPath("/gops/portfolio/aws-architecture.png")} alt="AWS Cloud의 VPC와 가용 영역, 프론트엔드·API 서버·시장 데이터 처리·AI 에이전트 및 저장소를 연결한 전체 서비스 아키텍처" width={1672} height={941} sizes="(max-width: 880px) calc(100vw - 40px), 840px" unoptimized />
          </a>
          <figcaption>AWS 기반 전체 서비스 아키텍처 · 클릭하면 원본 크기로 볼 수 있습니다.</figcaption>
        </figure>
        <p>프론트엔드와 API 서버, 시장 데이터 처리 서비스, AI 에이전트, 저장소를 연결한 전체 서비스 구성입니다.</p>
      </CaseSection>

      <CaseSection id="custom-chart" title="대량의 실시간 데이터를 위한 커스텀 주식 차트 구현">
        <p>기존 라이브러리의 정해진 표현 방식에서 벗어나, 여러 차트의 조합과 AI 분석 결과를 서비스에 필요한 형태로 확장할 수 있는 맞춤형 차트 엔진을 구현했습니다. 데이터 조회·병합부터 좌표 계산, 캔들·거래량·분석선 렌더링까지 TypeScript로 직접 연결했습니다.</p>
        <figure className="trading-chart-figure">
          <a href={publicAssetPath("/gops/portfolio/chart-comparison.png")} target="_blank" rel="noreferrer" aria-label="차트 비교와 거래 복기 화면 원본 크게 보기">
            <Image src={publicAssetPath("/gops/portfolio/chart-comparison.png")} alt="여러 종목의 캔들, 추세선과 지지·저항선을 비교하는 네 개의 차트 및 거래 당시 확인 항목을 보여주는 복기 화면" width={1686} height={670} sizes="(max-width: 880px) calc(100vw - 40px), 840px" unoptimized />
          </a>
        </figure>
        <p>전체 데이터를 브라우저에 적재하지 않고 보이는 구간만 가져온 뒤 실시간 이벤트를 이어 붙였습니다. 데이터의 연결과 화면의 갱신을 나눠, 과거 차트를 탐색하면서도 최신 변화를 함께 확인할 수 있도록 했습니다.</p>

        <div className="trading-tech-grid">
          <section className="trading-tech-block" aria-labelledby="chart-data-title">
            <h3 id="chart-data-title">과거 조회와 최신 변화의 연결</h3>
            <p>과거 구간은 REST로 조회하고 최신 변화는 WebSocket으로 반영합니다. 필요한 범위만 추가로 요청하고, 같은 시점의 데이터는 병합해 탐색 중인 화면을 유지합니다.</p>
            <CaseDetailLink href="/portfolio/trading-platform/rest-websocket/">REST·WebSocket 연결 자세히 보기</CaseDetailLink>
          </section>
          <section className="trading-tech-block" aria-labelledby="chart-layer-title">
            <h3 id="chart-layer-title">변경된 레이어만 다시 그리기</h3>
            <p>캔들·분석선과 크로스헤어를 두 개의 Canvas로 나눴습니다. 포인터 이동은 Overlay만 갱신하고, 연속된 입력은 프레임 단위로 묶어 불필요한 그리기를 줄였습니다.</p>
            <CaseDetailLink href="/portfolio/trading-platform/two-layer-canvas/">2-Layer Canvas 자세히 보기</CaseDetailLink>
          </section>
        </div>
      </CaseSection>

      <CaseSection id="event-pipeline" title="초당 평균 1,080건의 시장 데이터를 처리하는 실시간 파이프라인">
        <figure className="trading-pipeline-figure">
          <Image src={publicAssetPath("/gops/portfolio/event-pipeline.png?v=2")} alt="Kafka에 기록된 이벤트를 기능별 Consumer가 독립적으로 처리하고, 지연된 처리 경로는 복구하는 개념도" width={1891} height={832} sizes="(max-width: 760px) calc(100vw - 40px), 720px" unoptimized />
          <figcaption>기능별 확장·변경·복구를 분리한 개념도 · 실제 데이터 전달 경로는 아래 흐름도 참고</figcaption>
        </figure>
        <p>시장 이벤트가 여러 기능으로 전달되는 과정에서 한 경로의 지연이 다른 기능의 진행을 막지 않도록 Kafka 기반 EDA를 적용했습니다. 기능별 Consumer Group이 독립적으로 처리하며, 가공·저장 작업은 처리와 출력이 완료된 뒤 Offset을 커밋해 실패 시 재처리하도록 했습니다.</p>
        <div className="trading-evidence-row">
          <div><strong>처리 경로 분리</strong><p>Consumer Group마다 독립된 진행 위치를 관리</p></div>
          <div><strong>실패 후 재처리</strong><p>커밋된 Offset 이후부터 다시 읽어 처리</p></div>
          <div><strong>중복 수신 확인</strong><p>최근 이벤트 ID를 추적해 같은 이벤트를 구분</p></div>
        </div>
        <p className="trading-note">실시간 상태는 Redis, 틱·과거 조회 데이터는 ClickHouse, 마감 봉과 이벤트 기록은 S3로 나눠 저장했습니다.</p>
        <div className="trading-pipeline-detail">
          <h3>실제 서비스의 데이터 전달 경로</h3>
          <figure className="trading-architecture">
            <MarketArchitecture />
            <figcaption>가공한 이벤트를 실시간 화면 갱신과 저장·분석 경로로 나눠 전달합니다.</figcaption>
          </figure>
        </div>
      </CaseSection>

      <CaseSection id="ai-coach" title="거래 결과가 아니라 판단 과정을 복기하는 AI 투자 코치">
        <p><strong>거래 당시의 기록과 유사 사례를 근거로 AI가 놓친 조건을 설명하고, 다음 투자에서 확인할 기준을 제안하도록 했습니다.</strong></p>
        <figure className="trading-coach-figure">
          <a href={publicAssetPath("/gops/portfolio/ai-review-flow.png?v=2")} target="_blank" rel="noreferrer" aria-label="AI 거래 복기 흐름 원본 크게 보기">
            <Image src={publicAssetPath("/gops/portfolio/ai-review-flow.png?v=2")} alt="거래 시점 근거 검증 및 이벤트 기반 재검증: 판단 데이터, 복기 근거 구성, AI 주장 검증과 관찰 조건으로 이어지는 흐름. 새 이벤트가 발생하면 연결된 판단과 알림을 재검증합니다." width={1945} height={808} sizes="(max-width: 880px) calc(100vw - 40px), 840px" unoptimized />
          </a>
        </figure>
        <p>주문·체결 기록과 당시 차트, 확인한 정보들을 연결해 결과뿐 아니라 판단 과정에서 빠진 조건을 확인합니다. 비교·평가 수치는 코드로 계산하고, AI는 근거가 확인된 결과를 피드백으로 설명하도록 역할을 나눴습니다.</p>
        <p className="trading-result">복기에서 발견한 개선점을 다음 거래의 확인 기준과 알림으로 연결했습니다.</p>
      </CaseSection>

      <section className="trading-closing" aria-labelledby="collaboration-title">
        <h2 id="collaboration-title">백엔드와 협업한 경계</h2>
        <div className="trading-contract-grid">
          <section><span>BACKEND CONTRACT</span><h3>제공 범위</h3><p>과거 구간 REST 응답 · 최신 WebSocket 이벤트 · 연결 상태</p></section>
          <section><span>FRONTEND STATE</span><h3>연결 범위</h3><p>필요한 범위 조회 · 시점별 병합 · 종목과 주기 변경</p></section>
          <section><span>RENDERING</span><h3>사용자에게 보이는 범위</h3><p>조회 범위 · 실시간 변화 · 분석 결과와 선정 근거</p></section>
        </div>
      </section>

      <section className="trading-closing trading-deep-dives" aria-labelledby="deep-dive-title">
        <h2 id="deep-dive-title">구현 상세 보기</h2>
        <div>
          <div className="trading-deep-links">{deepDives.map(([route, title]) => <Link key={route} href={`/portfolio/trading-platform/${route}/`}><span>{title}</span><span aria-hidden="true">→</span></Link>)}</div>
          <CaseTags tags={["React", "TypeScript", "Python", "Kafka", "Kubernetes", "REST API", "WebSocket", "Canvas 2D"]} />
        </div>
      </section>
    </TradingCaseShell>
  );
}
