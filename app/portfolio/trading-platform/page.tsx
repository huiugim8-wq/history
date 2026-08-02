import type { Metadata } from "next";
import Link from "next/link";
import {
  ArticleSection,
  ExternalTextLink,
  InternalBackLink,
  TagList,
} from "../../article-components";
import ContentShell from "../../content-shell";

export const metadata: Metadata = {
  title: "실시간 투자 정보 플랫폼 | 김희준",
  description:
    "43종 기능 패널, REST API와 WebSocket, 2-Layer Canvas, TypeScript 분석 알고리즘을 구현한 실시간 투자 정보 플랫폼 프로젝트입니다.",
};

const deepDives = [
  {
    href: "/blog/react-panel-registry",
    title: "React 공통 프레임 · 43종 기능 패널 설계",
  },
  {
    href: "/blog/rest-websocket",
    title: "REST API · WebSocket 실시간 데이터 흐름",
  },
  {
    href: "/blog/two-layer-canvas",
    title: "2-Layer Canvas 차트 엔진",
  },
  {
    href: "/blog/chart-analysis",
    title: "TypeScript 피벗 군집 · 선형회귀 알고리즘",
  },
] as const;

export default function TradingPlatformPage() {
  return (
    <ContentShell
      eyebrow="PROJECT 01 · TEAM"
      title="실시간 투자 정보 플랫폼"
      description="AI가 시장 탐색과 차트 분석을 지원하고, 주문부터 거래 복기까지 하나의 흐름으로 연결하는 실시간 주식 트레이딩 플랫폼입니다."
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
      <article className="technical-article">
        <InternalBackLink href="/portfolio">포트폴리오로 돌아가기</InternalBackLink>

        <dl className="project-facts">
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
            <dt>협업</dt>
            <dd>Frontend · Infrastructure · Backend · AI</dd>
          </div>
          <div>
            <dt>데이터</dt>
            <dd>Kafka 기반 · 24시간 9,327만 건의 시장 이벤트</dd>
          </div>
          <div>
            <dt>배포</dt>
            <dd>Docker · Kubernetes</dd>
          </div>
        </dl>

        <ArticleSection number="01" title="프로젝트 개요">
          <p>
            다양한 시장 정보를 한 화면에서 조합해 조회하고, AI가 사용자 의도에
            맞춰 분석 화면을 구성하는 투자 정보 플랫폼입니다. 프론트엔드에서는
            많은 기능을 일관된 방식으로 확장할 수 있는 패널 구조, 과거·실시간
            데이터가 끊김 없이 이어지는 차트, 그리고 분석 결과를 설명 가능한
            형태로 보여주는 데 집중했습니다.
          </p>
          <div className="article-callout">
            <h3>핵심 과제</h3>
            <ul>
              <li>
                <strong>확장성</strong> — 43종의 기능 패널을 중복 없이 동일한
                프레임 안에서 운영하기
              </li>
              <li>
                <strong>연속성</strong> — REST API의 과거 데이터와 WebSocket의
                최신 이벤트를 자연스럽게 연결하기
              </li>
              <li>
                <strong>렌더링 성능</strong> — 포인터 이동마다 전체 차트를 다시
                그리지 않기
              </li>
              <li>
                <strong>설명 가능성</strong> — 지지·저항선이 선택된 근거를
                결과와 함께 확인할 수 있게 만들기
              </li>
            </ul>
          </div>
          <figure className="project-visual project-visual--poster">
            <img
              src="/gops/figma-panel.png"
              alt="서비스 소개, 주요 기능, 기술적 도전과 시스템 구성을 정리한 GOPS 팀 프로젝트 패널"
            />
            <figcaption>
              5주 동안 구현한 서비스 흐름과 기술적 과제를 정리한 팀 프로젝트
              패널
            </figcaption>
          </figure>
        </ArticleSection>

        <ArticleSection number="02" title="시스템 아키텍처">
          <p>
            프로젝트는 Docker·Kubernetes 기반의 배포 환경에서 운영했습니다.
            인프라 구조는 인프라 담당자가 설계했으며, 프론트엔드에서는
            Frontend Server와 Backend Server 사이의 데이터 경계, 차트 엔진으로
            전달되는 REST·WebSocket 흐름을 구현했습니다.
          </p>
          <figure className="project-visual">
            <img
              src="/gops/system-architecture.png"
              alt="AWS의 두 가용 영역에 프론트엔드, 백엔드, AI 서비스와 데이터 저장소가 배치된 GOPS 시스템 구성도"
            />
            <figcaption>
              팀 공통 시스템 구성도 — 본인 담당 범위는 React UI와 차트 엔진,
              프론트엔드 데이터 연결 지점입니다.
            </figcaption>
          </figure>
          <div className="article-subsection">
            <h3>Kafka 이벤트를 기능별로 나눠 처리</h3>
            <p>
              팀은 시장 이벤트를 Kafka에 기록하고 거래 분석·지표 계산·AI 참조가
              각각 독립된 Consumer로 처리되도록 구성했습니다. 프론트엔드에서는
              이 흐름이 제공하는 조회 API와 실시간 이벤트를 화면 상태에
              연결했습니다. 한 기능의 지연이 전체 흐름을 막지 않으며, 실패한
              작업은 Offset을 기준으로 다시 처리할 수 있습니다.
            </p>
            <figure className="project-visual">
              <img
                src="/gops/architecture.png"
                alt="틱, 1분봉, 5분봉, 10분봉 시장 이벤트를 Kafka와 독립 Consumer로 처리하는 구조"
              />
              <figcaption>
                대용량 시장 이벤트의 독립 처리와 재처리 구조
              </figcaption>
            </figure>
          </div>
        </ArticleSection>

        <ArticleSection number="03" title="React 패널 구조">
          <div className="article-subsection">
            <h3>공통 프레임과 기능 패널의 역할 분리</h3>
            <p>
              43종의 패널이 제목, 크기 제약, 배치, 공통 액션을 같은 프레임에서
              재사용하도록 구성했습니다. 컴포넌트·최소 크기·기본 배치·우선순위를
              TypeScript Registry 한곳에서 관리하고, Layout Agent 명령은 Runtime
              Validation을 거친 뒤 등록된 패널로만 변환되도록 제한했습니다.
            </p>
            <div className="architecture-steps" aria-label="패널 생성 흐름">
              <span>Layout Agent 또는 사용자 명령</span>
              <span>Runtime Validation</span>
              <span>Panel Registry</span>
              <span>Common Frame + Feature Panel</span>
            </div>
          </div>
        </ArticleSection>

        <ArticleSection number="04" title="TypeScript 차트 엔진">
          <div className="article-subsection">
            <h3>과거 조회와 실시간 반영의 역할 분리</h3>
            <p>
              REST API로 현재 화면에 필요한 과거 구간을 조회하고, 이미 보유한
              범위를 기준으로 누락 구간만 추가 요청했습니다. 초기 데이터 이후의
              시장 이벤트는 WebSocket으로 반영하고, 정규화된 시계열을 차트 엔진에
              전달해 증분 렌더링했습니다.
            </p>
          </div>
          <div className="article-subsection">
            <h3>정적 차트와 포인터 UI를 두 Canvas로 분리</h3>
            <p>
              캔들·거래량·축·분석선과 크로스헤어·툴팁의 변경 빈도가 다르다는 점을
              기준으로 Base Canvas와 Overlay Canvas를 분리했습니다. 포인터가
              움직일 때는 오버레이만 다시 그리고, requestAnimationFrame으로 화면
              갱신을 브라우저 페인팅 주기에 맞췄습니다.
            </p>
            <div className="chart-engine-flow" aria-label="차트 데이터와 렌더링 흐름">
              <div>
                <strong>REST</strong>
                <span>화면에 없는 과거 구간만 조회</span>
              </div>
              <div>
                <strong>WebSocket</strong>
                <span>최신 시장 이벤트만 반영</span>
              </div>
              <div>
                <strong>Base Canvas</strong>
                <span>캔들·거래량·축·분석선</span>
              </div>
              <div>
                <strong>Overlay Canvas</strong>
                <span>크로스헤어·툴팁만 갱신</span>
              </div>
            </div>
            <figure className="project-visual project-visual--wide">
              <img
                src="/gops/chart-engine.jpg"
                alt="캔들 차트, 지지 저항선, 분석 근거, 호가와 주문 화면이 연결된 GOPS 차트 엔진"
              />
              <figcaption>
                차트·분석 근거·호가·주문을 하나의 작업 화면에 연결한 실제 UI
              </figcaption>
            </figure>
          </div>
        </ArticleSection>

        <ArticleSection number="05" title="차트 분석">
          <div className="article-subsection">
            <h3>후보 생성과 검증을 분리한 분석 알고리즘</h3>
            <p>
              피벗 추출, 군집화, 선형회귀, 후보 평가를 단계별로 분리했습니다.
              후보선은 접촉·가격 반응·오차·돌파를 기준으로 평가하고, 기준을
              통과한 선과 선정 근거를 별도 차트 레이어에 표시했습니다.
            </p>
            <ul>
              <li>
                <strong>후보 생성</strong> — 피벗 군집과 선형회귀로 지지·저항
                후보선을 생성
              </li>
              <li>
                <strong>후보 검증</strong> — 접촉·가격 반응·오차·돌파 점수로
                유효한 선만 선택
              </li>
              <li>
                <strong>결과 재현</strong> — 같은 데이터와 조건에서는 같은
                후보가 선택되도록 단계와 정렬 기준을 고정
              </li>
              <li>
                <strong>선정 이유 표시</strong> — 선택된 선과 검증 근거를 별도
                차트 레이어에서 함께 확인
              </li>
            </ul>
            <figure className="project-visual project-visual--wide">
              <img
                src="/gops/chart-analysis.jpg"
                alt="여러 종목의 지지 저항 후보선과 거래 복기 근거가 표시된 GOPS 차트 분석 결과"
              />
              <figcaption>
                여러 종목에 적용된 지지·저항 후보선과 거래 복기 근거
              </figcaption>
            </figure>
          </div>
        </ArticleSection>

        <ArticleSection number="06" title="기술적 의사결정">
          <div className="table-scroll">
            <table className="article-table">
              <thead>
                <tr>
                  <th>문제</th>
                  <th>선택</th>
                  <th>이유</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>패널 수 증가에 따른 중복</td>
                  <td>Common Frame + Panel Registry</td>
                  <td>공통 정책을 한곳에서 유지하고 기능 추가 범위를 제한</td>
                </tr>
                <tr>
                  <td>과거·실시간 데이터의 경계</td>
                  <td>REST + WebSocket 역할 분리</td>
                  <td>누락 구간만 조회하고 최신 이벤트는 증분 반영</td>
                </tr>
                <tr>
                  <td>포인터 이동 시 전체 재렌더링</td>
                  <td>2-Layer Canvas</td>
                  <td>정적 차트와 고빈도 UI의 갱신 주기를 분리</td>
                </tr>
                <tr>
                  <td>분석 결과의 신뢰성</td>
                  <td>후보 생성 / 검증 단계 분리</td>
                  <td>같은 입력에서 재현 가능한 결과와 선정 근거 제공</td>
                </tr>
              </tbody>
            </table>
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
        </ArticleSection>

        <ArticleSection number="08" title="프로젝트에서 배운 점">
          <ul>
            <li>
              기능이 많아질수록 컴포넌트 자체보다 변경 이유와 책임의 경계를 먼저
              설계해야 한다는 점을 배웠습니다.
            </li>
            <li>
              실시간 데이터는 연결 여부만이 아니라 초기 스냅샷과 최신 이벤트가
              만나는 데이터 경계가 중요했습니다.
            </li>
            <li>
              Canvas 성능 최적화는 무조건 덜 그리는 것보다 변경 빈도에 따라
              렌더링 레이어를 나누는 것에서 시작했습니다.
            </li>
            <li>
              알고리즘 결과와 함께 선정 근거까지 보여줄 때 사용자가 결과를
              검증할 수 있었습니다.
            </li>
          </ul>
          <TagList
            tags={[
              "React",
              "TypeScript",
              "REST API",
              "WebSocket",
              "Canvas 2D",
              "Component Composition",
              "Runtime Validation",
              "Clustering",
              "Linear Regression",
              "Docker",
              "Kubernetes",
            ]}
          />
        </ArticleSection>
      </article>
    </ContentShell>
  );
}
