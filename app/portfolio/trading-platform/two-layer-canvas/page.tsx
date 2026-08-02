import type { Metadata } from "next";
import {
  ArticleSection,
  ExternalTextLink,
  InternalBackLink,
  TagList,
} from "../../../article-components";
import ContentShell from "../../../content-shell";

export const metadata: Metadata = {
  title: "2-Layer Canvas 차트 엔진 | 김희준",
  description:
    "정적 차트와 포인터 UI를 두 개의 Canvas로 분리해 필요한 레이어만 다시 그린 렌더링 구조입니다.",
};

export default function TwoLayerCanvasPage() {
  return (
    <ContentShell
      eyebrow="PROJECT 01 · DEEP DIVE 03"
      title="2-Layer Canvas 차트 엔진"
      description="정적 차트와 고빈도 포인터 UI를 두 개의 Canvas로 분리해 필요한 레이어만 다시 그리도록 설계했습니다."
      actions={
        <ExternalTextLink href="https://github.com/huiugim8-wq/gops-stock-trading-platform">
          GitHub
        </ExternalTextLink>
      }
    >
      <article className="technical-article">
        <InternalBackLink href="/portfolio/trading-platform">
          실시간 투자 정보 플랫폼으로 돌아가기
        </InternalBackLink>

        <ArticleSection number="01" title="문제 정의">
          <p>
            캔들·거래량·축·분석선은 데이터나 화면 범위가 바뀔 때 갱신되지만,
            크로스헤어와 툴팁은 포인터가 움직일 때마다 바뀝니다. 두 종류의 요소를
            하나의 Canvas에 그리면 포인터 이동만으로도 전체 차트를 반복해서 다시
            그리게 됩니다.
          </p>
          <ul>
            <li>변경 빈도가 다른 요소가 같은 렌더링 루프에 묶여 있었습니다.</li>
            <li>포인터 이동은 초당 많은 이벤트를 발생시킵니다.</li>
            <li>
              정적 차트까지 다시 그리면 불필요한 연산과 페인팅이 증가합니다.
            </li>
          </ul>
        </ArticleSection>

        <ArticleSection number="02" title="Layer Separation">
          <div className="table-scroll">
            <table className="article-table">
              <thead>
                <tr>
                  <th>레이어</th>
                  <th>표현 요소</th>
                  <th>갱신 시점</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Base Canvas</td>
                  <td>캔들, 거래량, 가격·시간 축, 지지·저항선</td>
                  <td>데이터·범위·크기 변경</td>
                </tr>
                <tr>
                  <td>Overlay Canvas</td>
                  <td>크로스헤어, 포인터, 툴팁, 선택 상태</td>
                  <td>포인터 이동·사용자 인터랙션</td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className="architecture-flow">
            <code>{`┌────────────────────────────┐
│ Overlay Canvas             │  ← pointer / tooltip / hover
├────────────────────────────┤
│ Base Canvas                │  ← candle / volume / axis / line
└────────────────────────────┘`}</code>
          </pre>
        </ArticleSection>

        <ArticleSection number="03" title="Rendering Flow">
          <pre className="architecture-flow">
            <code>{`Data / Viewport Change ──→ drawBase()
Pointer Move ─────────────→ drawOverlay()
                              ↓
                    requestAnimationFrame`}</code>
          </pre>
          <ol>
            <li>데이터 또는 화면 범위가 바뀌면 Base Canvas를 갱신합니다.</li>
            <li>포인터 좌표는 차트 좌표계로 변환합니다.</li>
            <li>
              크로스헤어·툴팁 상태를 Overlay Canvas에만 그립니다.
            </li>
            <li>
              requestAnimationFrame 기준으로 여러 입력을 한 번의 화면 갱신에
              묶습니다.
            </li>
          </ol>
        </ArticleSection>

        <ArticleSection number="04" title="좌표와 인터랙션">
          <div className="table-scroll">
            <table className="article-table">
              <thead>
                <tr>
                  <th>변환</th>
                  <th>역할</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Time → X</td>
                  <td>시계열 인덱스 또는 시간을 화면 가로 좌표로 변환</td>
                </tr>
                <tr>
                  <td>Price → Y</td>
                  <td>가격 범위를 화면 세로 좌표로 변환</td>
                </tr>
                <tr>
                  <td>Pointer → Data</td>
                  <td>마우스 위치에서 가장 가까운 시점과 가격을 계산</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            렌더링 레이어는 분리했지만 같은 좌표 변환 규칙을 사용해 Base
            Canvas의 데이터와 Overlay Canvas의 포인터 UI가 정확히 일치하도록
            구성했습니다.
          </p>
        </ArticleSection>

        <ArticleSection number="05" title="Before / After">
          <div className="table-scroll">
            <table className="article-table">
              <thead>
                <tr>
                  <th>구분</th>
                  <th>단일 Canvas</th>
                  <th>2-Layer Canvas</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>포인터 이동</td>
                  <td>전체 차트 다시 그리기</td>
                  <td>Overlay만 갱신</td>
                </tr>
                <tr>
                  <td>렌더링 책임</td>
                  <td>정적·동적 요소 혼합</td>
                  <td>변경 빈도에 따라 분리</td>
                </tr>
                <tr>
                  <td>성능 분석</td>
                  <td>병목 범위가 넓음</td>
                  <td>레이어별 갱신 조건 확인 가능</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="article-emphasis">
            무조건 덜 그리는 것보다, “무엇이 언제 변하는가”를 기준으로 렌더링
            책임을 나누는 것이 핵심이었습니다.
          </p>
        </ArticleSection>

        <ArticleSection number="06" title="결과">
          <ul>
            <li>포인터 이동 시 Overlay Canvas만 갱신합니다.</li>
            <li>정적 차트와 고빈도 UI의 갱신 조건이 분리되었습니다.</li>
            <li>차트 엔진의 렌더링 흐름과 디버깅 범위가 명확해졌습니다.</li>
          </ul>
          <TagList
            tags={[
              "TypeScript",
              "Canvas 2D",
              "requestAnimationFrame",
              "Coordinate Transform",
              "Interaction Rendering",
            ]}
          />
        </ArticleSection>
      </article>
    </ContentShell>
  );
}
