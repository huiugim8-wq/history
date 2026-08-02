import type { Metadata } from "next";
import {
  ArticleSection,
  ExternalTextLink,
  InternalBackLink,
  TagList,
} from "../../../article-components";
import ContentShell from "../../../content-shell";

export const metadata: Metadata = {
  title: "REST API · WebSocket 실시간 데이터 흐름 | 김희준",
  description:
    "과거 데이터와 최신 이벤트의 책임을 나누고 누락 구간만 증분 반영한 실시간 시계열 구조입니다.",
};

export default function RestWebSocketPage() {
  return (
    <ContentShell
      eyebrow="실시간 투자 정보 플랫폼 · 구현 기록 02"
      title="REST API · WebSocket 실시간 데이터 흐름"
      description="과거 데이터는 REST API로, 최신 시장 이벤트는 WebSocket으로 처리해 조회와 실시간 갱신의 책임을 분리했습니다."
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
            차트는 사용자가 선택한 과거 범위를 빠르게 제공하면서도 새로운 시장
            이벤트를 즉시 반영해야 합니다. 모든 변화마다 전체 구간을 다시
            요청하면 네트워크와 렌더링 비용이 커지고, 과거 조회와 실시간 수신의
            경계도 불명확해집니다.
          </p>
          <ul>
            <li>현재 화면에 필요한 과거 범위를 안정적으로 조회해야 했습니다.</li>
            <li>이미 가지고 있는 데이터는 다시 요청하지 않아야 했습니다.</li>
            <li>초기 조회 이후의 이벤트는 실시간으로 이어져야 했습니다.</li>
          </ul>
        </ArticleSection>

        <ArticleSection number="02" title="책임 분리">
          <div className="table-scroll">
            <table className="article-table">
              <thead>
                <tr>
                  <th>채널</th>
                  <th>책임</th>
                  <th>갱신 기준</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>REST API</td>
                  <td>초기 스냅샷과 누락된 과거 구간 조회</td>
                  <td>종목·주기·조회 범위 변경</td>
                </tr>
                <tr>
                  <td>WebSocket</td>
                  <td>초기 조회 이후의 최신 시장 이벤트 반영</td>
                  <td>새 이벤트 수신</td>
                </tr>
                <tr>
                  <td>Chart Series</td>
                  <td>정규화된 시계열을 차트 엔진에 제공</td>
                  <td>스냅샷 또는 실시간 데이터 병합</td>
                </tr>
              </tbody>
            </table>
          </div>
        </ArticleSection>

        <ArticleSection number="03" title="Data Flow">
          <pre className="architecture-flow">
            <code>{`사용자 범위 선택
      ↓
보유 범위 확인 ── 누락 구간 계산
      ↓
REST Snapshot → Normalize → Chart Series
                             ↑
WebSocket Event → Merge / Update`}</code>
          </pre>
          <ol>
            <li>사용자가 종목과 조회 범위를 선택합니다.</li>
            <li>현재 보유한 시계열 범위와 필요한 범위를 비교합니다.</li>
            <li>기존 범위 밖의 누락 구간만 REST API로 조회합니다.</li>
            <li>응답을 차트가 사용하는 시계열 구조로 정규화합니다.</li>
            <li>
              이후 이벤트는 WebSocket으로 받아 기존 시계열에 증분 반영합니다.
            </li>
          </ol>
        </ArticleSection>

        <ArticleSection number="04" title="핵심 설계 포인트">
          <div className="article-subsection">
            <h3>Missing Range Request</h3>
            <p>
              전체 구간을 다시 요청하지 않고, 현재 데이터 범위 밖에서 필요한
              구간만 조회하도록 구성했습니다. 조회 범위가 확장돼도 이미 받은
              데이터는 재사용합니다.
            </p>
          </div>
          <div className="article-subsection">
            <h3>Snapshot과 Event의 경계</h3>
            <p>
              REST 응답은 기준 시점까지의 스냅샷, WebSocket 메시지는 그 이후의
              변화를 담당하도록 역할을 나눴습니다. 두 입력은 동일한 차트 시계열로
              정규화해 렌더링 계층이 통신 방식을 알 필요가 없도록 했습니다.
            </p>
          </div>
          <div className="article-subsection">
            <h3>Incremental Rendering</h3>
            <p>
              새 이벤트가 도착하면 전체 시계열을 다시 만드는 대신 변경된 구간을
              차트 엔진에 전달해 필요한 부분만 갱신하도록 연결했습니다.
            </p>
          </div>
        </ArticleSection>

        <ArticleSection number="05" title="고려한 데이터 경계">
          <ul>
            <li>초기 REST 응답이 도착하기 전 수신된 실시간 이벤트</li>
            <li>사용자가 차트 범위를 과거 방향으로 확장하는 경우</li>
            <li>종목 또는 캔들 주기가 변경되는 경우</li>
            <li>
              연결이 끊긴 동안 UI가 최신 상태가 아님을 구분해야 하는 경우
            </li>
          </ul>
          <p className="article-emphasis">
            통신 기술보다 중요한 것은 “현재 데이터가 어느 시점까지 유효한가”라는
            경계를 명확하게 유지하는 것이었습니다.
          </p>
        </ArticleSection>

        <ArticleSection number="06" title="결과">
          <ul>
            <li>과거 데이터 전체 재요청을 피하고 누락 범위만 조회합니다.</li>
            <li>초기 조회와 실시간 이벤트의 책임이 분리되었습니다.</li>
            <li>
              통신 계층과 Canvas 렌더링 계층 사이에 정규화된 데이터 계약을
              만들었습니다.
            </li>
          </ul>
          <TagList
            tags={[
              "TypeScript",
              "REST API",
              "WebSocket",
              "Kafka",
              "Time Series",
              "Incremental Update",
            ]}
          />
        </ArticleSection>
      </article>
    </ContentShell>
  );
}
