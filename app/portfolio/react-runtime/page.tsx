import type { Metadata } from "next";
import Link from "next/link";
import CaseShell, { CaseExternalLink, CaseSection, CaseTags } from "../trading-platform/case-shell";
import "./runtime-case.css";

export const metadata: Metadata = {
  title: "Mini React · Vanilla JS React Runtime | 김희준",
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
        <code>patchAsync()</code>는 브라우저에 제어권을 돌려주며 Render를 이어가고,
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
    <CaseShell>
      <div className="runtime-case">
        <header className="trading-intro">
          <div className="trading-title-row">
            <h1>Mini React</h1>
            <div className="trading-links">
              <CaseExternalLink href="https://github.com/huiugim8-wq/react-virtual-dom">GitHub</CaseExternalLink>
            </div>
          </div>
          <p className="trading-lead">
            Virtual DOM과 Hooks를 직접 구현하고, 동기식 렌더링을 작업 단위로 나누는 Fiber Reconciler와 협력형 스케줄러로 확장한 JavaScript 런타임
          </p>
        </header>

        <RuntimeJourney />

        <dl className="runtime-meta">
          <div><dt>실행 환경</dt><dd>Vanilla JavaScript · DOM</dd></div>
          <div><dt>핵심 구조</dt><dd>Virtual DOM · Diff &amp; Patch → Fiber</dd></div>
          <div><dt>검증</dt><dd>83 tests passed</dd></div>
        </dl>

        <section className="trading-overview" aria-labelledby="runtime-overview">
          <h2 id="runtime-overview">프로젝트 요약</h2>
          <div className="trading-overview-grid">
            <section>
              <h3>담당 역할 및 기여</h3>
              <ul>
                <li>Virtual DOM·Diff/Patch·Hooks의 실행 흐름 구현</li>
                <li>Fiber Reconciler와 협력형 스케줄러 설계 및 검증</li>
              </ul>
            </section>
            <section>
              <h3>핵심 구현</h3>
              <ul>
                <li>Render·Commit 분리와 오래된 비동기 렌더 취소</li>
                <li>key 기반 DOM 재사용과 작업 중단·재개 구현</li>
              </ul>
            </section>
          </div>
        </section>

        <CaseSection id="fiber-reconciler" title="한 번에 처리하던 렌더링을 작은 작업 단위로 분리">
          <p>
            상태 변경이 화면에 반영되는 과정을 이해하기 위해 Virtual DOM과 Hooks를 직접 구현했습니다.
            초기 Diff/Patch 엔진은 전체 트리를 재귀적으로 비교해 한 번에 반영하는 구조여서,
            계산 도중 브라우저에 제어권을 돌려주거나 새로운 렌더 요청으로 교체하기 어려웠습니다.
          </p>
          <p>
            이를 해결하기 위해 트리 순회를 Fiber 단위로 나누고, 변경 사항을 계산하는 Render와 실제 DOM을 바꾸는 Commit을 분리했습니다.
          </p>
          <div className="runtime-comparison-grid" aria-label="기존 VDOM 구조와 Fiber 구조 비교">
            <div className="runtime-comparison-column">
              <span>BEFORE · SYNC VDOM</span>
              <strong>전체 트리를 한 번에 처리</strong>
              <ul>
                <li>재귀 호출로 전체 트리 비교</li>
                <li>계산 중간에 중단·재개 불가</li>
                <li>Diff 직후 DOM에 변경 반영</li>
              </ul>
            </div>
            <div className="runtime-comparison-column runtime-comparison-column--active">
              <span>AFTER · FIBER</span>
              <strong>작업을 나누고 완성된 결과만 반영</strong>
              <ul>
                <li>Fiber 단위로 다음 작업 추적</li>
                <li>작업 양보·재개·취소 가능</li>
                <li>Render 완료 후 Commit</li>
              </ul>
            </div>
          </div>

          <h3 className="runtime-subheading">Current · WIP Fiber</h3>
          <p>
            현재 화면의 Current 트리는 유지하고, 다음 화면은 Work-in-Progress 트리에서 계산합니다.{" "}
            <code>parent</code>·<code>child</code>·<code>sibling</code>으로 다음 작업을 찾고,{" "}
            <code>alternate</code>로 이전 Fiber를 연결해 DOM을 재사용합니다.
          </p>
          <FiberTreeDiagram />
        </CaseSection>

        <CaseSection id="cooperative-scheduler" title="브라우저에 제어권을 양보하고, 최신 요청만 화면에 반영">
          <p>
            <code>patchAsync()</code>는 <code>requestIdleCallback</code>과 timeout fallback을 사용해
            렌더 작업을 여러 구간으로 나눕니다. 실행을 멈춘 위치를 저장하고 다음 구간에서 이어가며,
            새 요청이 들어오면 아직 Commit하지 않은 이전 작업을 취소합니다.
            기존 <code>patch()</code>는 같은 Fiber 작업을 한 번에 끝내도록 해 동기 동작을 유지했습니다.
          </p>
          <SchedulerDiagram />
          <p className="trading-result">
            계산 중에는 현재 화면을 유지하고, 끝까지 완성된 작업의 변경 사항만 DOM에 반영하도록 했습니다.
          </p>
          <div className="runtime-boundaries">
            <section>
              <h3>Hooks · 업데이트를 묶는 시점</h3>
              <p>Microtask batching으로 여러 <code>setState</code> 요청을 하나의 업데이트로 묶습니다.</p>
            </section>
            <section>
              <h3>Scheduler · 렌더 작업을 나누는 방식</h3>
              <p>시작된 렌더를 작은 작업으로 나누고, 브라우저에 제어권을 돌려준 뒤 이어서 처리합니다.</p>
            </section>
          </div>
        </CaseSection>

        <CaseSection id="keyed-reconciliation" title="리스트 순서가 바뀌어도 기존 DOM을 재사용">
          <p>
            Keyed Reconciliation에서는 같은 <code>key</code>와 <code>type</code>을 가진 항목을
            동일한 노드로 판단합니다. 이전 Fiber와 DOM을 재사용하고, 위치가 달라진 노드에는{" "}
            <code>MOVE</code> Effect를 기록해 새로 생성하지 않고 이동으로 처리했습니다.
          </p>
          <KeyedMoveDiagram />
          <p className="trading-result">
            목록의 순서 변경과 노드의 생성·삭제를 구분해 필요한 DOM 변경만 반영했습니다.
          </p>
        </CaseSection>

        <CaseSection id="runtime-verification" title="83개의 테스트로 실행 흐름과 DOM 반영 시점을 검증">
          <p>
            기존 Hooks·Diff/Patch·History 테스트에 Fiber 시나리오를 추가해 전체 83개의 테스트를 통과했습니다.
            최종 화면뿐 아니라, 계산 중 DOM 유지와 작업 취소·재개 과정도 확인했습니다.
          </p>
          <div className="runtime-verification-table">
            <table>
              <caption>주요 검증 시나리오</caption>
              <thead><tr><th scope="col">검증 항목</th><th scope="col">확인한 동작</th></tr></thead>
              <tbody>
                <tr><th scope="row">Fiber 연결</th><td>부모·자식·형제와 이전 Fiber의 연결을 유지</td></tr>
                <tr><th scope="row">Render / Commit</th><td>계산이 완료되기 전에는 실제 DOM을 변경하지 않음</td></tr>
                <tr><th scope="row">Yield / Resume</th><td>중단한 위치를 보존하고 다음 작업 구간에서 재개</td></tr>
                <tr><th scope="row">Key 기반 이동</th><td>리스트 순서가 바뀌어도 기존 DOM 노드를 재사용</td></tr>
                <tr><th scope="row">오래된 작업 취소</th><td>이전 비동기 렌더를 취소하고 최신 작업만 Commit</td></tr>
              </tbody>
            </table>
          </div>
          <aside className="runtime-scope">
            <h3>구현 범위와 배운 점</h3>
            <p>
              Virtual DOM 자체가 성능을 보장하는 것은 아니며, 변경을 계산하는 방식과 실제 DOM에 반영하는 시점을
              나누는 것이 핵심임을 배웠습니다.
            </p>
            <p>
              이 프로젝트는 최종 Host VNode 트리를 작업 단위로 처리하는 학습용 런타임입니다.
              React의 컴포넌트별 Fiber, Lane 기반 우선순위·Preemption, Suspense, Hydration은 구현 범위에 포함하지 않았습니다.
            </p>
          </aside>
          <CaseTags tags={["JavaScript", "Virtual DOM", "Hooks", "Fiber", "Keyed Reconciliation", "Render / Commit", "Cooperative Scheduler"]} />
        </CaseSection>

        <nav className="runtime-resources" aria-label="프로젝트 관련 링크">
          <Link href="/portfolio/">← 포트폴리오 목록</Link>
          <div>
            <CaseExternalLink href="https://cedis.tistory.com/105">Diff/Patch 구현 회고 참고</CaseExternalLink>
            <CaseExternalLink href="https://github.com/acdlite/react-fiber-architecture">React Fiber Architecture</CaseExternalLink>
          </div>
        </nav>
      </div>
    </CaseShell>
  );
}
