import type { Metadata } from "next";
import {
  ArticleSection,
  ExternalTextLink,
  InternalBackLink,
  TagList,
} from "../../article-components";
import ContentShell from "../../content-shell";

export const metadata: Metadata = {
  title: "미니 리액트(버추얼 돔) 구현 | 김희준",
  description:
    "Virtual DOM, Diff/Patch, Hooks와 batching을 직접 구현하며 React 렌더링 원리를 확인한 프로젝트입니다.",
};

export default function ReactRuntimePage() {
  return (
    <ContentShell
      eyebrow="PROJECT 02 · INDIVIDUAL"
      title="미니 리액트(버추얼 돔) 구현"
      description="React를 사용하는 것만으로는 복잡한 렌더링 문제를 정확히 이해하기 어렵다고 판단해 실행 환경을 직접 구현했습니다."
      actions={
        <ExternalTextLink href="https://github.com/huiugim8-wq/react-virtual-dom">
          GitHub
        </ExternalTextLink>
      }
    >
      <article className="technical-article">
        <InternalBackLink href="/portfolio">포트폴리오로 돌아가기</InternalBackLink>

        <ArticleSection number="01" title="문제 정의">
          <p>
            순수 JavaScript나 jQuery를 이용해 DOM을 직접 조작하면 애플리케이션이
            커질수록 어떤 상태가 어느 UI를 변경하는지 추적하기 어렵습니다.
            React는 UI를 상태의 함수로 정의하고, 상태가 변하면 Virtual DOM의
            차이를 계산해 실제 DOM에 필요한 변경만 반영합니다.
          </p>
          <p>
            저는 라이브러리의 사용법에 머무르지 않고, 상태 변화가 렌더링으로
            이어지는 과정과 컴포넌트가 갱신되는 순서를 코드로 확인하고자
            했습니다.
          </p>
        </ArticleSection>

        <ArticleSection number="02" title="Virtual DOM · Diff & Patch">
          <p>
            이전 VDOM과 다음 VDOM을 비교해 속성·텍스트·자식 노드의 차이를
            계산하고, 변경된 부분만 실제 DOM에 반영했습니다. 결과가 동작하지 않을
            때는 나타난 현상만 수정하지 않고 상태의 저장 위치, 비교 순서, Patch
            적용 순서를 차례로 추적했습니다.
          </p>
          <pre className="architecture-flow">
            <code>{`State Update
     ↓
Render Component
     ↓
Next Virtual DOM
     ↓
Diff → Patch
     ↓
Real DOM Update`}</code>
          </pre>
        </ArticleSection>

        <ArticleSection number="03" title="Keyed Reconciliation">
          <p>
            key를 기준으로 리스트 항목의 동일성을 유지하고, 삽입·삭제뿐 아니라
            이동 Patch를 계산했습니다. 이를 통해 1,025개 카드의 정렬·필터·가상
            스크롤에서도 각 항목의 상태가 다른 항목과 섞이지 않도록 했습니다.
          </p>
        </ArticleSection>

        <ArticleSection number="04" title="Hooks & Batching">
          <p>
            useState·useEffect·useMemo의 슬롯과 생명주기를 구현하고, 연속된 상태
            변경을 microtask 단위로 묶어 한 번의 업데이트로 병합했습니다. Hook
            호출 순서와 저장 슬롯의 관계를 직접 구현하면서 컴포넌트가 다시
            실행되어도 상태가 보존되는 원리를 확인했습니다.
          </p>
        </ArticleSection>

        <ArticleSection number="05" title="검증과 결과">
          <p>
            Hook 슬롯, Diff/Patch, keyed 리스트 재정렬, effect 생명주기와 batching
            동작을 검증하는 78개의 테스트를 작성해 모두 통과했습니다. 이 경험을
            통해 복잡한 화면에서도 렌더링 문제를 결과가 아니라 상태 저장과 갱신
            순서의 문제로 구조화해 분석할 수 있는 기반을 갖췄습니다.
          </p>
          <TagList
            tags={[
              "JavaScript",
              "Virtual DOM",
              "Diff & Patch",
              "Keyed Reconciliation",
              "Hooks",
              "Microtask Batching",
              "78 Tests",
            ]}
          />
        </ArticleSection>
      </article>
    </ContentShell>
  );
}
