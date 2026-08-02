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
            <dd>2026.03 — 2026.07</dd>
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
        </ArticleSection>

        <ArticleSection number="02" title="Architecture at a Glance">
          <p>
            공통 프레임은 레이아웃과 정책을 담당하고, 기능 패널은 각 도메인의
            조회·표현 로직에 집중하도록 경계를 나눴습니다.
          </p>
          <pre className="architecture-flow">
            <code>{`Layout Agent / User Action
          ↓
   Panel Command
          ↓
 Runtime Validation
          ↓
   Panel Registry
          ↓
 Common Frame + Feature Panel`}</code>
          </pre>
        </ArticleSection>

        <ArticleSection number="03" title="Key Contributions">
          <div className="article-subsection">
            <h3>1) 공통 프레임과 기능 패널을 분리한 React 컴포넌트 설계</h3>
            <p>
              43종의 패널이 제목, 크기 제약, 배치, 공통 액션을 같은 프레임에서
              재사용하도록 구성했습니다. 컴포넌트·최소 크기·기본 배치·우선순위를
              TypeScript Registry 한곳에서 관리하고, Layout Agent 명령은 Runtime
              Validation을 거친 뒤 등록된 패널로만 변환되도록 제한했습니다.
            </p>
          </div>
          <div className="article-subsection">
            <h3>2) REST API · WebSocket 데이터 흐름</h3>
            <p>
              REST API로 현재 화면에 필요한 과거 구간을 조회하고, 이미 보유한
              범위를 기준으로 누락 구간만 추가 요청했습니다. 초기 데이터 이후의
              시장 이벤트는 WebSocket으로 반영하고, 정규화된 시계열을 차트 엔진에
              전달해 증분 렌더링했습니다.
            </p>
          </div>
          <div className="article-subsection">
            <h3>3) 2-Layer Canvas 차트 엔진</h3>
            <p>
              캔들·거래량·축·분석선과 크로스헤어·툴팁의 변경 빈도가 다르다는 점을
              기준으로 Base Canvas와 Overlay Canvas를 분리했습니다. 포인터가
              움직일 때는 오버레이만 다시 그리고, requestAnimationFrame으로 화면
              갱신을 브라우저 페인팅 주기에 맞췄습니다.
            </p>
          </div>
          <div className="article-subsection">
            <h3>4) 피벗 군집 · 선형회귀 기반 TypeScript 알고리즘</h3>
            <p>
              피벗 추출, 군집화, 선형회귀, 후보 평가를 단계별로 분리했습니다.
              후보선은 접촉·가격 반응·오차·돌파를 기준으로 평가하고, 기준을
              통과한 선과 선정 근거를 별도 차트 레이어에 표시했습니다.
            </p>
          </div>
        </ArticleSection>

        <ArticleSection number="04" title="기술적 의사결정">
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

        <ArticleSection number="05" title="Technical Deep Dive">
          <div className="deep-dive-grid">
            {deepDives.map((item) => (
              <Link href={item.href} key={item.href}>
                <span>{item.title}</span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </ArticleSection>

        <ArticleSection number="06" title="What I Learned">
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
