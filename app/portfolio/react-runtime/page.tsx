import type { Metadata } from "next";
import {
  ArticleSection,
  ExternalTextLink,
  InternalBackLink,
  TagList,
} from "../../article-components";
import ContentShell from "../../content-shell";

export const metadata: Metadata = {
  title: "Vanilla JS React Runtime | 김희준",
  description:
    "Virtual DOM과 Hooks를 직접 구현한 뒤 Fiber Reconciler와 협력형 스케줄러로 확장한 프로젝트입니다.",
};

function RuntimeJourney() {
  return (
    <figure className="runtime-journey-figure">
      <div
        className="runtime-journey"
        role="img"
        aria-label="상태 변경부터 Virtual DOM, Work-in-Progress Fiber, Effect 계산, DOM Commit으로 이어지는 실행 흐름"
      >
        <div className="runtime-journey-step">
          <span>01</span>
          <strong>State</strong>
          <small>업데이트 요청</small>
        </div>
        <div className="runtime-journey-step">
          <span>02</span>
          <strong>Next VDOM</strong>
          <small>다음 UI 표현</small>
        </div>
        <div className="runtime-journey-step">
          <span>03</span>
          <strong>WIP Fiber</strong>
          <small>작업 단위 계산</small>
        </div>
        <div className="runtime-journey-step">
          <span>04</span>
          <strong>Effect Flags</strong>
          <small>변경 목록 완성</small>
        </div>
        <div className="runtime-journey-step">
          <span>05</span>
          <strong>Commit</strong>
          <small>실제 DOM 반영</small>
        </div>
      </div>
      <figcaption>
        상태가 바뀌어도 현재 화면은 유지하고, 작업 중인 Fiber 트리가 완성된
        뒤에만 DOM을 변경합니다.
      </figcaption>
    </figure>
  );
}

function FiberTreeDiagram() {
  return (
    <figure className="fiber-tree-figure">
      <div
        className="fiber-tree-board"
        role="img"
        aria-label="Current Fiber 트리와 Work-in-Progress Fiber 트리가 alternate로 연결된 구조"
      >
        <div className="fiber-tree-column">
          <div className="fiber-tree-column-head">
            <span>CURRENT</span>
            <strong>현재 화면</strong>
          </div>
          <div className="fiber-node fiber-node--root">Root</div>
          <div className="fiber-node-row">
            <div className="fiber-node">Header</div>
            <div className="fiber-node">List</div>
            <div className="fiber-node">Footer</div>
          </div>
        </div>

        <div className="fiber-alternate-bridge" aria-hidden="true">
          <span>alternate</span>
          <i />
          <i />
          <i />
        </div>

        <div className="fiber-tree-column fiber-tree-column--active">
          <div className="fiber-tree-column-head">
            <span>WORK IN PROGRESS</span>
            <strong>다음 화면 계산</strong>
          </div>
          <div className="fiber-node fiber-node--root">Root</div>
          <div className="fiber-node-row">
            <div className="fiber-node">Header</div>
            <div className="fiber-node fiber-node--changed">List · UPDATE</div>
            <div className="fiber-node">Footer</div>
          </div>
        </div>
      </div>
      <div className="fiber-pointer-legend" aria-label="Fiber 연결 필드">
        <span>parent</span>
        <span>child</span>
        <span>sibling</span>
        <span>alternate</span>
      </div>
      <figcaption>
        각 Fiber는 부모·첫 자식·다음 형제·이전 트리를 가리키며, 재귀 호출
        스택 없이 다음 작업을 찾습니다.
      </figcaption>
    </figure>
  );
}

function SchedulerDiagram() {
  return (
    <figure className="scheduler-figure">
      <div
        className="scheduler-visual"
        role="img"
        aria-label="Fiber Render가 여러 Slice로 나뉘어 Yield와 Resume을 반복한 뒤 Commit되는 과정"
      >
        <div className="scheduler-lane">
          <strong>RENDER</strong>
          <span className="scheduler-slice">Unit 1—10</span>
          <span className="scheduler-yield">YIELD</span>
          <span className="scheduler-slice">Unit 11—20</span>
          <span className="scheduler-yield">YIELD</span>
          <span className="scheduler-slice">남은 Unit</span>
        </div>
        <div className="scheduler-lane scheduler-lane--commit">
          <strong>COMMIT</strong>
          <span>Deletion</span>
          <span>Placement / Move</span>
          <span>Update</span>
          <span>Current 교체</span>
        </div>
      </div>
      <figcaption>
        `patchAsync()`는 브라우저에 제어권을 돌려주며 Render를 이어가고,
        Commit은 완성된 결과를 한 번에 반영합니다.
      </figcaption>
    </figure>
  );
}

function KeyedMoveDiagram() {
  return (
    <figure className="keyed-move-figure">
      <div
        className="keyed-move-visual"
        role="img"
        aria-label="키 A B C 순서가 C A B로 바뀔 때 기존 DOM 노드를 재사용해 이동하는 과정"
      >
        <div className="keyed-state">
          <span>BEFORE</span>
          <div>
            <strong>A</strong>
            <strong>B</strong>
            <strong>C</strong>
          </div>
        </div>
        <div className="keyed-move-arrow" aria-hidden="true">
          <span>MOVE · DOM REUSE</span>
          <b>→</b>
        </div>
        <div className="keyed-state keyed-state--after">
          <span>AFTER</span>
          <div>
            <strong>C</strong>
            <strong>A</strong>
            <strong>B</strong>
          </div>
        </div>
      </div>
      <figcaption>
        같은 key와 type은 동일한 노드로 판단합니다. 순서만 바뀌면 새로
        생성하지 않고 기존 DOM을 이동합니다.
      </figcaption>
    </figure>
  );
}

export default function ReactRuntimePage() {
  return (
    <ContentShell
      eyebrow="PROJECT 02 · INDIVIDUAL EXTENSION"
      title="Vanilla JS React Runtime"
      description="Virtual DOM과 Hooks를 직접 구현한 뒤, 동기식 Diff 구조를 작업 단위 기반의 Fiber Reconciler로 확장했습니다."
      actions={
        <ExternalTextLink href="https://github.com/huiugim8-wq/react-virtual-dom">
          GitHub
        </ExternalTextLink>
      }
    >
      <article className="technical-article">
        <InternalBackLink href="/portfolio">포트폴리오로 돌아가기</InternalBackLink>

        <dl className="project-facts">
          <div>
            <dt>핵심 역할</dt>
            <dd>Fiber Reconciler · Runtime 설계</dd>
          </div>
          <div>
            <dt>실행 환경</dt>
            <dd>Vanilla JavaScript · DOM</dd>
          </div>
          <div>
            <dt>검증</dt>
            <dd>83 tests passed</dd>
          </div>
          <div>
            <dt>핵심 구조</dt>
            <dd>Virtual DOM · Diff &amp; Patch → Fiber</dd>
          </div>
        </dl>

        <ArticleSection number="01" title="왜 직접 만들었나">
          <p>
            React를 사용하는 것만으로는 상태 변화가 어떤 경로를 거쳐 화면
            변경으로 이어지는지 정확히 설명하기 어렵다고 판단했습니다. 먼저
            이전 VDOM과 다음 VDOM을 비교해 필요한 DOM 변경만 계산하는
            Diff/Patch 엔진을 만들었습니다.
          </p>
          <p>
            구현 과정에서 Virtual DOM은 무조건 빠른 기술이 아니라, 메모리상의
            비교를 통해 Layout·Paint로 이어질 수 있는 실제 DOM 변경을 줄이는
            전략이라는 점을 확인했습니다.
          </p>
          <RuntimeJourney />
        </ArticleSection>

        <ArticleSection number="02" title="VDOM에서 Fiber로">
          <p>
            초기 엔진은 재귀적으로 전체 트리를 한 번에 비교하고, Diff 직후
            Patch를 적용하는 동기식 구조였습니다. 트리가 커질수록 메인 스레드를
            오래 점유하며, 계산을 중간에 멈추거나 최신 렌더 요청으로 교체하기
            어렵다는 한계가 있었습니다.
          </p>
          <div className="runtime-comparison-grid" aria-label="기존 VDOM 구조와 Fiber 구조 비교">
            <div className="runtime-comparison-column">
              <span>BEFORE · SYNC VDOM</span>
              <strong>전체 트리를 한 번에 처리</strong>
              <ul>
                <li>재귀 Diff</li>
                <li>중단·재개 불가</li>
                <li>Diff 직후 DOM 변경</li>
              </ul>
            </div>
            <div className="runtime-comparison-column runtime-comparison-column--active">
              <span>AFTER · FIBER</span>
              <strong>작업을 작은 단위로 분리</strong>
              <ul>
                <li>Unit of Work 순회</li>
                <li>Yield · Resume · Cancel</li>
                <li>Render / Commit 분리</li>
              </ul>
            </div>
          </div>
        </ArticleSection>

        <ArticleSection number="03" title="Current · WIP Fiber">
          <p>
            각 VDOM 노드를 `parent`, `child`, `sibling`, `alternate` 연결을 가진
            Fiber로 변환했습니다. 현재 화면을 나타내는 Current 트리는 유지하고,
            다음 화면은 Work-in-Progress 트리에서 계산합니다.
          </p>
          <p>
            `alternate`로 이전 Fiber와 같은 type/key의 노드를 연결해 실제 DOM을
            재사용하고, 변경이 있는 Fiber에만 Effect Flag를 기록합니다.
          </p>
          <FiberTreeDiagram />
        </ArticleSection>

        <ArticleSection number="04" title="Render · Commit · Scheduler">
          <p>
            기존 공개 API의 동기 동작을 유지하기 위해 `patch()`는 같은 Fiber
            작업을 한 번에 완료합니다. `patchAsync()`는
            `requestIdleCallback`과 timeout fallback을 이용해 렌더 작업을 여러
            Slice로 나누고, 브라우저가 처리할 시간이 필요하면 제어권을
            양보합니다.
          </p>
          <p>
            새로운 비동기 렌더가 들어오면 아직 Commit하지 않은 이전 작업은
            취소합니다. Work-in-Progress가 끝까지 완성된 경우에만
            Placement·Update·Deletion·Move Effect를 실제 DOM에 반영합니다.
          </p>
          <SchedulerDiagram />
        </ArticleSection>

        <ArticleSection number="05" title="Keyed Reconciliation">
          <p>
            리스트의 key를 단순한 표시 값이 아니라 노드의 동일성을 결정하는
            기준으로 사용했습니다. 같은 key와 type이면 이전 Fiber와 실제 DOM을
            재사용하고, 이전 index와 다음 index를 비교해 `MOVE` Effect를
            계산합니다.
          </p>
          <KeyedMoveDiagram />
          <div className="article-callout">
            <h3>상태 스케줄링과 렌더 스케줄링을 분리했습니다</h3>
            <p>
              Hook의 microtask batching은 여러 `setState`를 언제 하나의
              업데이트로 묶을지 결정하고, Fiber scheduler는 시작된 렌더를 몇
              개의 작업 Slice로 나눌지 결정합니다.
            </p>
          </div>
        </ArticleSection>

        <ArticleSection number="06" title="검증과 한계">
          <p>
            기존 Hooks·Diff/Patch·History 테스트에 Fiber 전용 시나리오를 추가해
            전체 83개의 테스트를 모두 통과했습니다.
          </p>
          <ul>
            <li>Fiber의 parent/child/sibling/alternate 연결</li>
            <li>Render 완료 전 실제 DOM이 변경되지 않는지 확인</li>
            <li>작업 Yield와 다음 Slice에서의 Resume</li>
            <li>key 기반 MOVE와 실제 DOM 노드 재사용</li>
            <li>오래된 비동기 렌더 취소와 최신 작업 Commit</li>
          </ul>
          <div className="article-emphasis">
            실제 React의 Lane 기반 우선순위, Preemption, Suspense, Hydration은
            포함하지 않았습니다. 또한 이번 Fiber는 컴포넌트별 Fiber가 아니라
            최종 Host VNode 트리를 작업 단위로 나누는 학습용 구현입니다.
          </div>
          <TagList
            tags={[
              "JavaScript",
              "Virtual DOM",
              "Fiber",
              "Diff & Patch",
              "Keyed Reconciliation",
              "Render / Commit",
              "Cooperative Scheduler",
              "Hooks",
              "83 Tests",
            ]}
          />
          <div className="deep-dive-grid runtime-reference-links" aria-label="참고 자료">
            <a href="https://cedis.tistory.com/105" target="_blank" rel="noreferrer">
              Virtual DOM · Diff/Patch 구현 회고 참고
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href="https://github.com/acdlite/react-fiber-architecture"
              target="_blank"
              rel="noreferrer"
            >
              React Fiber Architecture
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </ArticleSection>
      </article>
    </ContentShell>
  );
}
