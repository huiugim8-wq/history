import type { Metadata } from "next";
import Link from "next/link";
import TradingCaseShell, { CaseDetailLink, CaseExternalLink, CaseSection, CaseTags } from "../case-shell";

export const metadata: Metadata = {
  title: "REST · WebSocket 연결 | 김희준",
  description: "필요한 과거 구간만 추가로 조회하고 실시간 이벤트를 병합해, 탐색 중인 차트 범위를 유지한 구현 기록입니다.",
};

export default function RestWebSocketPage() {
  return (
    <TradingCaseShell variant="detail">
      <article>
        <header className="trading-intro">
          <Link className="trading-back" href="/portfolio/trading-platform/">← 실시간 투자 정보 플랫폼</Link>
          <div className="trading-title-row">
            <h1>REST · WebSocket 연결</h1>
            <div className="trading-links">
              <CaseExternalLink href="https://github.com/huiugim8-wq/gops-stock-trading-platform">GitHub</CaseExternalLink>
            </div>
          </div>
          <p className="trading-lead">
            과거 데이터를 살펴보는 동안에도 최신 변화가 이어지도록,
            범위 조회와 실시간 수신을 하나의 차트 데이터로 연결했습니다.
          </p>
          <CaseTags tags={["TypeScript", "REST API", "WebSocket", "Time Series"]} />
        </header>

        <CaseSection id="data-problem" title="과거를 탐색하는 화면에 실시간 변화를 연결하기">
          <p className="trading-copy">
            차트는 과거 구간을 추가로 불러오는 동시에 최신 시세를 반영해야 합니다.
            매번 전체 데이터를 다시 받으면 요청이 반복되고, 새 데이터가 들어올 때
            사용자가 보고 있던 위치도 달라질 수 있습니다. 조회 범위와 실시간 갱신을
            분리하면서 현재 탐색 위치를 유지하는 데 초점을 맞췄습니다.
          </p>
        </CaseSection>

        <CaseSection id="data-flow" title="조회는 필요한 범위만, 갱신은 도착한 이벤트만">
          <ol className="trading-flow-strip" aria-label="차트 데이터 연결 과정">
            <li><strong>범위 선택</strong><small>종목 · 주기 · 탐색 위치</small></li>
            <li><strong>REST 조회</strong><small>초기 데이터와 추가 과거 구간</small></li>
            <li><strong>시계열 병합</strong><small>같은 시점은 하나의 데이터로</small></li>
            <li><strong>실시간 반영</strong><small>WebSocket 이벤트 연결</small></li>
          </ol>
          <div className="trading-tech-grid trading-tech-grid--stacked">
            <div className="trading-tech-block">
              <h3>REST · 필요한 과거 범위 추가</h3>
              <p>보유한 데이터보다 이전 구간을 탐색하면 해당 범위만 요청합니다. 동일한 요청이 진행 중이면 추가 호출을 막고, 받아 온 데이터는 시점 기준으로 기존 데이터와 병합합니다.</p>
            </div>
            <div className="trading-tech-block">
              <h3>WebSocket · 최신 상태 반영</h3>
              <p>선택한 종목과 주기의 이벤트를 구독해 차트에 전달합니다. 통신 응답을 차트가 이해하는 데이터 형태로 정규화해, 렌더링 코드가 수신 방식에 의존하지 않도록 했습니다.</p>
            </div>
          </div>
        </CaseSection>

        <CaseSection id="data-boundaries" title="데이터가 바뀌어도 사용자의 탐색은 유지">
          <div className="trading-table-wrap">
            <table className="trading-table">
              <thead><tr><th>발생 상황</th><th>처리 방식</th></tr></thead>
              <tbody>
                <tr><td>과거 데이터가 앞에 추가됨</td><td>추가된 개수와 화면 기준 시점을 반영해 보고 있던 범위를 유지합니다.</td></tr>
                <tr><td>같은 시점의 데이터가 다시 도착함</td><td>타임스탬프를 기준으로 병합해 같은 시점을 중복 나열하지 않습니다.</td></tr>
                <tr><td>응답 전에 종목·주기가 바뀜</td><td>현재 선택과 응답의 대상을 확인해 이전 요청이 다른 차트를 덮지 않도록 합니다.</td></tr>
                <tr><td>WebSocket 연결이 끊김</td><td>오류 상태를 구분하고, 재시도 간격을 늘리는 방식으로 다시 연결합니다.</td></tr>
              </tbody>
            </table>
          </div>
        </CaseSection>

        <CaseSection id="data-result" title="연결 결과">
          <p className="trading-result">
            과거 범위의 추가 조회와 최신 이벤트 갱신을 분리해,
            이미 받은 데이터를 재사용하면서 사용자가 탐색하던 차트를 이어 볼 수 있게 했습니다.
          </p>
          <p className="trading-note">
            재접속은 연결 복구를 담당합니다. 연결이 끊긴 동안의 모든 이벤트가 자동으로
            복원된다는 의미는 아니며, 데이터 조회와 복구 범위는 별도로 다룹니다.
          </p>
          <div className="trading-links">
            <CaseDetailLink href="/portfolio/trading-platform/two-layer-canvas/">2-Layer Canvas 자세히 보기</CaseDetailLink>
            <CaseDetailLink href="/portfolio/trading-platform/">프로젝트 전체 보기</CaseDetailLink>
          </div>
        </CaseSection>
      </article>
    </TradingCaseShell>
  );
}
