import type { Metadata } from "next";
import Link from "next/link";
import TradingCaseShell, { CaseDetailLink, CaseExternalLink, CaseSection, CaseTags } from "../case-shell";

export const metadata: Metadata = {
  title: "2-Layer Canvas 차트 엔진 | 김희준",
  description: "차트 데이터와 크로스헤어의 갱신을 분리하고, 프레임 단위로 렌더링 요청을 묶은 커스텀 차트 구현 기록입니다.",
};

export default function TwoLayerCanvasPage() {
  return (
    <TradingCaseShell variant="detail">
      <article>
        <header className="trading-intro">
          <Link className="trading-back" href="/portfolio/trading-platform/">← 실시간 투자 정보 플랫폼</Link>
          <div className="trading-title-row">
            <h1>2-Layer Canvas 차트 엔진</h1>
            <div className="trading-links">
              <CaseExternalLink href="https://github.com/huiugim8-wq/gops-stock-trading-platform">GitHub</CaseExternalLink>
            </div>
          </div>
          <p className="trading-lead">
            실시간 데이터와 사용자의 포인터가 서로 다른 속도로 변한다는 점에 맞춰,
            차트와 크로스헤어의 그리기 작업을 분리했습니다.
          </p>
          <CaseTags tags={["TypeScript", "Canvas 2D", "requestAnimationFrame", "Coordinate Transform"]} />
        </header>

        <CaseSection id="canvas-problem" title="포인터 이동만으로 전체 차트를 다시 그려야 할까">
          <p className="trading-copy">
            캔들·거래량·분석선은 데이터나 표시 범위가 바뀔 때 갱신되지만,
            크로스헤어는 포인터를 움직일 때마다 바뀝니다. 이 작업을 같은 Canvas에
            묶으면 가격을 확인하는 작은 움직임에도 차트 전체를 다시 그리게 됩니다.
            변경 원인에 따라 두 레이어를 독립적으로 갱신하도록 구성했습니다.
          </p>
        </CaseSection>

        <CaseSection id="canvas-layers" title="같은 좌표 위에, 다른 갱신 주기를 가진 두 레이어">
          <div className="trading-layer-stack" aria-label="두 개의 Canvas 레이어 구성">
            <section>
              <h3>Overlay Canvas · 포인터 레이어</h3>
              <p>크로스헤어와 포인터에 따라 바뀌는 일시적 표시를 그립니다.</p>
              <p><strong>갱신 조건</strong> 포인터 이동 · 차트 좌표 변경</p>
            </section>
            <section>
              <h3>Base Canvas · 차트 레이어</h3>
              <p>캔들·거래량·축·분석선과 AI 분석 표시를 그립니다.</p>
              <p><strong>갱신 조건</strong> 데이터 · 확대/이동 · 크기 · 분석 표시 변경</p>
            </section>
          </div>
          <p className="trading-copy">
            Base에서 만든 차트 좌표를 Overlay도 공유합니다. 렌더링 작업은 나누되,
            포인터가 가리키는 시점과 가격은 같은 좌표 기준으로 맞췄습니다.
          </p>
        </CaseSection>

        <CaseSection id="canvas-scheduling" title="연속된 입력을 한 프레임의 갱신으로 묶기">
          <div className="trading-tech-grid">
            <div className="trading-tech-block">
              <h3>포인터 이동 → Overlay 갱신</h3>
              <p>최신 포인터 좌표를 보관한 뒤 Overlay의 그리기 작업을 예약합니다. 프레임이 이미 예약돼 있으면 추가 예약 없이 좌표만 갱신합니다.</p>
            </div>
            <div className="trading-tech-block">
              <h3>데이터·범위 변경 → Base 갱신</h3>
              <p>실시간 데이터가 바뀌거나 차트를 이동·확대하면 Base를 다시 그립니다. 새 좌표를 만든 다음 Overlay도 갱신해 두 레이어의 위치를 맞춥니다.</p>
            </div>
          </div>
          <ol className="trading-flow-strip" aria-label="프레임 단위 그리기 과정">
            <li><strong>입력 수신</strong><small>최신 좌표와 차트 상태 보관</small></li>
            <li><strong>프레임 예약</strong><small>중복 예약은 추가하지 않음</small></li>
            <li><strong>해당 레이어 갱신</strong><small>requestAnimationFrame</small></li>
          </ol>
        </CaseSection>

        <CaseSection id="canvas-result" title="포인터 확인과 차트 데이터 갱신의 책임 분리">
          <div className="trading-table-wrap">
            <table className="trading-table">
              <thead><tr><th>입력</th><th>갱신 범위</th></tr></thead>
              <tbody>
                <tr><td>크로스헤어만 이동</td><td>Overlay Canvas</td></tr>
                <tr><td>실시간 데이터·분석 표시 변경</td><td>Base Canvas → Overlay Canvas</td></tr>
                <tr><td>차트 이동·확대·크기 변경</td><td>좌표 재계산 → 두 레이어 갱신</td></tr>
              </tbody>
            </table>
          </div>
          <p className="trading-result">
            포인터만 움직일 때는 차트 데이터를 다시 그리지 않도록 해,
            사용자가 가격과 시점을 확인하는 과정의 불필요한 렌더링을 줄였습니다.
          </p>
          <div className="trading-links">
            <CaseDetailLink href="/portfolio/trading-platform/rest-websocket/">REST · WebSocket 연결 자세히 보기</CaseDetailLink>
            <CaseDetailLink href="/portfolio/trading-platform/">프로젝트 전체 보기</CaseDetailLink>
          </div>
        </CaseSection>
      </article>
    </TradingCaseShell>
  );
}
