import type { Metadata } from "next";
import ContentShell from "../content-shell";
import PrintButton from "../print-button";

export const metadata: Metadata = {
  title: "자기소개서 | 김희준",
  description:
    "Publishing Platform Div. Junior Front-end Engineer 포지션에 지원한 김희준의 자기소개서입니다.",
};

export default function CoverLetterPage() {
  return (
    <ContentShell
      eyebrow="APPLICATION ESSAY"
      title="자기소개서"
      description="사용자 경험을 설계하는 관점에서 시작해, 실패를 기술로 극복하며 프론트엔드를 선택한 과정입니다."
      actions={<PrintButton />}
    >
      <article className="cover-letter-page">
        <section
          className="cover-letter-section"
          aria-labelledby="cover-letter-introduction"
        >
          <div className="cover-letter-section-heading">
            <span>01</span>
            <h2 id="cover-letter-introduction">서론</h2>
          </div>

          <div className="cover-letter-copy">
            <p>
              안녕하십니까. Publishing Platform Div. Junior Front-end Engineer
              포지션에 지원한 김희준입니다.
            </p>

            <p>
              실내건축디자인을 전공하며 디자인은 단순히 보기 좋은 결과물을 만드는
              일이 아니라는 것을 배웠습니다. 공간의 목적을 정의하고, 그 안에서
              사용자가 무엇을 보고 어떻게 이동하며 어떤 경험을 하게 될지를
              설계하는 일이었습니다. 이때 배운{" "}
              <strong>
                사용자 경험에 대한 관점은 창업의 실패와 개발 학습을 거쳐 제가
                프론트엔드를 선택하는 기준
              </strong>
              이 됐습니다.
            </p>

            <p>
              창업을 하며 상품 기획부터 온라인 판매와 고객 대응까지 사업 전반을
              직접 운영했습니다. 고객이 어떤 정보를 보고 상품에 관심을 가지며,
              무엇을 비교한 뒤 구매를 결정하는지 관찰하면서 상품과 판매 방식을
              개선했습니다. 빠른 실행으로 판매 성과를 내는 데는 성공했지만,
              사업을 지속 가능한 구조로 발전시키지는 못했습니다.
            </p>

            <p>
              가장 큰 패착은 실행의 결과를 검증하고 다음 판단으로 연결하는 구조가
              부족했다는 점입니다. 고객 반응과 판매 정보가 여러 채널에 흩어져
              있었고, 문제가 발생할 때마다 제 경험과 판단에 의존해 대응했습니다.
              고객이 어떤 부분에서 불편을 느끼는지 알고 있어도 이를 일관된 서비스
              경험으로 반영하지 못했고, 무엇이 효과적이었는지 데이터로 축적해
              반복적으로 개선하지도 못했습니다.{" "}
              <strong>결국 사업은 실패했습니다.</strong>
            </p>

            <p>
              사업의 실패가 기술의 부재만으로 발생했다고 생각하지 않습니다.
              충분한 검증 없이 빠르게 실행한 제 판단이 근본적인 원인이었습니다.
              하지만 이 실패를 통해 사용자의 문제를 발견하는 능력과 이를 반복
              가능한 구조로 해결하는 능력은 다르다는 사실을 배웠습니다.{" "}
              <strong>
                문제를 알고 있으면서도 직접 시스템으로 구현하지 못했던 한계를
                극복하기 위해 개발을 시작했고, 크래프톤 정글에 참여했습니다.
              </strong>
            </p>

            <p>
              정글에서는 자료구조와 알고리즘, 운영체제, 네트워크를 학습하며
              이전에는 결과로만 바라봤던 서비스가 내부에서 어떻게 동작하는지
              이해했습니다. 문제를 감각적으로 파악하는 데서 그치지 않고, 데이터와
              상태를 구조화해 코드로 구현할 수 있는 기반을 쌓았습니다.
            </p>

            <p>
              특히 ‘나만의 무기’ 프로젝트를 진행하며 기능 구현만큼이나 UI가
              중요하다는 사실을 배웠습니다. 처음에는 UI란 완성된 기능을 화면에
              배치하는 과정이라고 생각했습니다. 그러나 같은 데이터와 AI 기능이라도
              무엇을 먼저 보여주고 어떤 행동으로 이어지게 하느냐에 따라 단순한
              정보 조회 서비스가 될 수도, 사용자의 판단을 돕는 투자 작업 공간이
              될 수도 있었습니다.
            </p>

            <p className="cover-letter-key-message">
              이를 통해 UI는 프로젝트의 겉모습이 아니라, 사용자가 서비스를
              무엇으로 이해하고 어떻게 사용해야 하는지를 결정하는 요소라는 것을
              배웠습니다.{" "}
              <strong>
                프론트엔드는 데이터의 상태 변화와 사용자 상호작용을 연결해
                프로젝트의 콘셉트와 역할을 사용자 경험으로 구체화하는 영역
              </strong>
              이라는 확신을 얻었고, 이를 계기로 프론트엔드를 제 진로로
              결정했습니다.
            </p>
          </div>
        </section>

        <section
          className="cover-letter-section"
          aria-labelledby="cover-letter-project"
        >
          <div className="cover-letter-section-heading">
            <span>02</span>
            <h2 id="cover-letter-project">프로젝트</h2>
          </div>

          <div className="cover-letter-copy">
            <p>
              이 관점을 GOPS의 구조에도 반영했습니다. 서로 다른 목적과 상태를
              가진 43종의 기능을 개별적으로 구현하면, 기능이 늘어날수록 사용자가
              새로운 사용법을 익혀야 하고 작업의 맥락도 잃을 수 있다고
              판단했습니다. 이에 모든 기능 패널이{" "}
              <strong>공통 프레임을 사용하도록 설계</strong>하고, 패널의 상태와
              동작 기준을 <strong>TypeScript Registry에서 관리</strong>했습니다.
              이는 단순히 코드를 재사용하기 위한 선택이 아니라, 기능이 확장돼도
              사용자가 동일한 방식으로 서비스를 이해하고 조작할 수 있게 하기
              위한 설계였습니다.
            </p>

            <p>
              React를 사용하는 것만으로는 복잡한 렌더링 문제를 정확히 이해하기
              어렵다고 판단해 <strong>실행 환경도 직접 구현했습니다.</strong>{" "}
              Virtual DOM과 Diff/Patch, Hooks, batching을 코드로 작성하며 상태
              변화가 렌더링으로 이어지는 과정을 확인했습니다. 동작하지 않는
              부분이 생기면 나타난 현상만 수정하지 않고, 상태의 저장과 갱신 순서를
              추적하며 원인을 찾았습니다. 이를 통해 라이브러리의 사용법에 머무르지
              않고 렌더링 문제를 구조적으로 분석하고 개선할 수 있는 기반을
              갖췄습니다.
            </p>
          </div>
        </section>

        <section
          className="cover-letter-section"
          aria-labelledby="cover-letter-conclusion"
        >
          <div className="cover-letter-section-heading">
            <span>03</span>
            <h2 id="cover-letter-conclusion">결론</h2>
          </div>

          <div className="cover-letter-copy">
            <p>
              저의 경험은 서로 분리돼 있지 않습니다. 실내건축디자인을 통해 사용자
              경험을 설계하는 관점을 배웠고, 창업의 실패를 통해 좋은 의도와 빠른
              실행만으로는 문제를 지속해서 해결할 수 없다는 사실을 깨달았습니다.
              정글에서는 그 한계를 극복하기 위한 기술을 학습했고, 프로젝트를 통해
              서비스의 의도를 실제 사용자 경험으로 구현하는 방법을 익혔습니다.
            </p>

            <p>
              <strong>
                저의 강점은 사용자의 관점에서 서비스의 목적을 정의하고, 현장에서
                발견한 문제를 상태와 컴포넌트 구조로 구체화할 수 있다는 점입니다.
              </strong>{" "}
              또한 실패의 원인을 외부 환경에서 찾지 않고 제 부족함으로 받아들이며,
              필요한 역량을 학습해 결과로 증명해왔습니다.
            </p>

            <p>
              크래프톤에서도 요구사항을 그대로 화면에 옮기기보다 서비스가
              사용자에게 어떤 역할을 해야 하는지 먼저 이해하겠습니다. 기획과
              데이터, 백엔드의 기능이 일관된 컴포넌트와 예측 가능한 상호작용을
              통해 사용자에게 자연스럽게 전달되도록 하는 것이 제 목표입니다.
            </p>

            <p className="cover-letter-closing">
              <strong>
                6개월이 끝났을 때 단순히 많은 것을 배운 인턴이 아니라, 문제가
                생겼을 때 포기하지 않고 원인을 찾아 해결책까지 남긴 개발자로
                기억되겠습니다.
              </strong>
            </p>

            <p>감사합니다.</p>
          </div>
        </section>
      </article>
    </ContentShell>
  );
}
