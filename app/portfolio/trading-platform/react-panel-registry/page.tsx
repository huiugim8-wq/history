import type { Metadata } from "next";
import {
  ArticleSection,
  ExternalTextLink,
  InternalBackLink,
  TagList,
} from "../../../article-components";
import ContentShell from "../../../content-shell";

export const metadata: Metadata = {
  title: "React 공통 프레임 · 43종 기능 패널 설계 | 김희준",
  description:
    "43종의 기능 패널을 공통 프레임과 TypeScript Registry로 일관되게 확장한 설계입니다.",
};

export default function ReactPanelRegistryPage() {
  return (
    <ContentShell
      eyebrow="실시간 투자 정보 플랫폼 · 구현 기록 01"
      title="React 공통 프레임 · 43종 기능 패널 설계"
      description="43종의 기능 패널을 하나의 공통 프레임에서 일관되게 확장할 수 있도록 설계했습니다."
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
            투자 정보 플랫폼은 차트, 호가, 주문, 뉴스, AI 분석 등 서로 다른
            책임을 가진 패널을 조합해 화면을 구성합니다. 기능 수가 늘어날수록 각
            패널이 레이아웃·제목·크기·공통 액션을 개별 구현하면 중복이 커지고 UI
            정책을 일관되게 유지하기 어렵습니다.
          </p>
          <ul>
            <li>43종 패널의 공통 UI 중복을 줄여야 했습니다.</li>
            <li>
              새 패널을 추가할 때 기존 레이아웃 코드를 수정하지 않아야 했습니다.
            </li>
            <li>
              AI가 화면 구성을 요청하더라도 등록되지 않은 UI가 임의로 생성되지
              않아야 했습니다.
            </li>
          </ul>
        </ArticleSection>

        <ArticleSection number="02" title="설계 목표">
          <div className="table-scroll">
            <table className="article-table">
              <thead>
                <tr>
                  <th>목표</th>
                  <th>설계 기준</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>일관성</td>
                  <td>제목, 크기 제약, 공통 액션을 Common Frame에서 관리</td>
                </tr>
                <tr>
                  <td>확장성</td>
                  <td>패널 추가를 Registry 등록 작업으로 제한</td>
                </tr>
                <tr>
                  <td>안전성</td>
                  <td>Layout Agent 명령을 Runtime Validation 후 변환</td>
                </tr>
                <tr>
                  <td>응집도</td>
                  <td>Feature Panel은 도메인 데이터와 인터랙션에 집중</td>
                </tr>
              </tbody>
            </table>
          </div>
        </ArticleSection>

        <ArticleSection number="03" title="Component Architecture">
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
          <div className="table-scroll">
            <table className="article-table">
              <thead>
                <tr>
                  <th>레이어</th>
                  <th>책임</th>
                  <th>변경 이유</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Common Frame</td>
                  <td>레이아웃, 제목, 크기, 공통 액션, 오류 경계</td>
                  <td>제품 전반의 UI 정책 변경</td>
                </tr>
                <tr>
                  <td>Panel Registry</td>
                  <td>패널 타입과 컴포넌트·메타데이터 연결</td>
                  <td>기능 등록 또는 배치 정책 변경</td>
                </tr>
                <tr>
                  <td>Feature Panel</td>
                  <td>도메인 조회, 상태 표현, 사용자 인터랙션</td>
                  <td>개별 기능 요구사항 변경</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3>TypeScript Registry 설계 예시</h3>
          <pre className="article-code">
            <code>{`type PanelDefinition = {
  component: React.ComponentType<PanelProps>
  minSize: { width: number; height: number }
  defaultPlacement: GridPlacement
  priority: number
}

const panelRegistry: Record<PanelType, PanelDefinition> = {
  // panel type → component & layout metadata
}`}</code>
          </pre>
        </ArticleSection>

        <ArticleSection number="04" title="Runtime Validation">
          <ol>
            <li>Layout Agent가 패널 타입과 배치 명령을 생성합니다.</li>
            <li>명령의 구조와 값이 허용 범위인지 검증합니다.</li>
            <li>Registry에 등록된 패널인지 확인합니다.</li>
            <li>검증을 통과한 명령만 React 컴포넌트로 변환합니다.</li>
          </ol>
          <p>
            AI가 React 코드를 직접 생성하는 방식이 아니라, 검증된 패널 조합만
            선택하게 만들어 예측 가능성을 확보했습니다.
          </p>
        </ArticleSection>

        <ArticleSection number="05" title="결과">
          <ul>
            <li>43종 패널이 동일한 프레임과 상호작용 규칙을 재사용합니다.</li>
            <li>기능 패널과 레이아웃 정책의 변경 범위를 분리했습니다.</li>
            <li>
              새 패널은 Registry 등록만으로 기존 화면 구성 흐름에 참여할 수
              있습니다.
            </li>
            <li>Agent-driven UI에서도 허용된 컴포넌트만 생성됩니다.</li>
          </ul>
          <TagList
            tags={[
              "React",
              "TypeScript",
              "Component Composition",
              "Panel Registry",
              "Runtime Validation",
              "Agent-driven UI",
            ]}
          />
        </ArticleSection>
      </article>
    </ContentShell>
  );
}
