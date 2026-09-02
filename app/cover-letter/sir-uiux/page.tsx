import type { Metadata } from "next";
import ContentShell from "../../content-shell";
import { publicAssetPath } from "../../site-paths";

export const metadata: Metadata = {
  title: "UI/UX 디자이너 자기소개서 | 김희준",
  description:
    "사용자 반응으로 디자인을 검증하고 프론트엔드로 직접 구현하는 UI/UX 디자이너 김희준의 자기소개서입니다.",
};

export default function SirUiuxCoverLetterPage() {
  return (
    <ContentShell
      title="자기소개서"
      description="UI/UX 디자이너 김희준"
      className="cover-letter-site cover-letter-site--sir"
      mode="uiux"
      actions={
        <a
          className="content-text-link"
          href={publicAssetPath(
            "/documents/kim-heejun-uiux-cover-letter.pdf",
          )}
          download="김희준_UIUX_자기소개서.pdf"
        >
          PDF 다운로드 <span aria-hidden="true">↓</span>
        </a>
      }
    >
      <article className="cover-letter-page">
        <div className="cover-letter-intro cover-letter-copy">
          <p>
            안녕하십니까. 사용자의 선택을 설계하고 이를 실제 화면으로 구현하는
            UI/UX 디자이너 김희준입니다.
          </p>

          <p className="cover-letter-key-message">
            저는{" "}
            <strong>
              상품의 콘셉트와 상세페이지를 직접 설계하고, 그 결과를 와디즈 펀딩
              1,206%와 연 매출 약 1억 원으로 확인한 디자이너
            </strong>
            입니다. 실내건축디자인에서 익힌 사용자 중심의 관점에 프론트엔드
            개발 역량을 더해 사용하기 편하면서도 실제로 구현 가능한 화면을
            설계해 왔습니다.
          </p>
        </div>

        <section
          className="cover-letter-section"
          aria-labelledby="sir-cover-letter-result"
        >
          <div className="cover-letter-section-heading">
            <h2 id="sir-cover-letter-result">
              디자인의 결과를 사용자 반응으로 확인했습니다
            </h2>
          </div>

          <div className="cover-letter-copy">
            <p>
              실내건축디자인을 전공하며 공간의 목적과 사용자의 시선·동선을 함께
              설계했습니다. 이 과정에서 보기 좋은 결과물 자체보다 사용자가
              무엇을 먼저 보고 어떻게 행동하게 될지를 고민하는 태도를 익혔고,
              이는 이후 상세페이지와 웹 화면의 정보 구조를 정하는 기준이
              됐습니다.
            </p>

            <p>
              창업 과정에서는 상품 기획부터 상세페이지와 펀딩 페이지 제작,
              온라인 판매까지 직접 맡았습니다. 고객이 어떤 정보를 확인하고
              무엇을 비교한 뒤 구매를 결정하는지 살펴 정보의 순서와 강조 요소를
              정했으며, 체험단의 피드백은 상품 구성과 상세페이지 개선으로
              이어갔습니다. 그 결과 와디즈 펀딩에서 목표 대비 1,206%를 달성하고
              연 매출 약 1억 원을 만들 수 있었습니다. 디자인을 감각이나 취향에
              머물지 않고 실제 사용자의 반응과 성과로 검증한 경험입니다.
            </p>

            <p>
              다만 판매 성과를 지속 가능한 사업 구조로 발전시키지는 못했습니다.
              이 실패는 사용자 반응을 수집하는 것뿐 아니라 다음 개선으로 연결할
              수 있는 시스템이 필요하다는 사실을 깨닫게 했습니다. 문제를
              발견하는 데서 멈추지 않고 직접 구현할 수 있는 역량을 갖추고자
              개발을 시작했고, 그 선택은 크래프톤 정글 참여로 이어졌습니다.
            </p>
          </div>
        </section>

        <section
          className="cover-letter-section"
          aria-labelledby="sir-cover-letter-implementation"
        >
          <div className="cover-letter-section-heading">
            <h2 id="sir-cover-letter-implementation">
              디자인을 실제 서비스로 구현할 수 있습니다
            </h2>
          </div>

          <div className="cover-letter-copy">
            <p>
              실시간 투자정보 플랫폼을 제작하며 정보의 우선순위와 화면 흐름을
              설계한 뒤 React와 TypeScript로 직접 구현했습니다. 서로 다른 목적을
              가진 43종의 기능 패널에는 공통 프레임을 적용함으로써 기능이
              추가되더라도 사용자가 같은 방식으로 서비스를 이해하고 조작할 수
              있도록 구성했습니다.
            </p>

            <p>
              특히 5주 안에 9천만 건의 틱 데이터를 다루는 커스텀 주식 차트
              엔진을 구현하면서, 과거 데이터는 REST API로 조회하고 실시간
              데이터는 WebSocket으로 반영했습니다. 대량의 데이터가 갱신되는
              상황에서도 상호작용이 끊기지 않도록 정적인 차트와 포인터 UI를 서로
              다른 Canvas 레이어로 나누고 필요한 영역만 갱신했습니다.
            </p>

            <p>
              이 경험을 통해 UI는 완성된 기능을 보기 좋게 배치하는 마지막
              단계가 아니라,{" "}
              <strong>
                데이터의 상태 변화와 사용자 상호작용을 연결해 서비스의 목적을
                사용자 경험으로 구체화하는 영역
              </strong>
              이라는 관점을 갖게 됐습니다. 개발 경험은 디자인의 구현 가능성을
              판단하고 개발자와 구체적인 기준으로 소통할 수 있게 하며, 화면이
              실제 서비스에 적용되는 과정에서도 디자인의 의도를 끝까지 지킬 수
              있는 강점으로 이어집니다.
            </p>
          </div>
        </section>

        <section
          className="cover-letter-section"
          aria-labelledby="sir-cover-letter-collaboration"
        >
          <div className="cover-letter-section-heading">
            <h2 id="sir-cover-letter-collaboration">
              여러 역할을 연결해 문제를 해결합니다
            </h2>
          </div>

          <div className="cover-letter-copy">
            <p>
              자동차 부품 제조 현장에서는 생산 라인장으로 근무하며 20명의 현장
              인력을 관리하는 동시에 작업자와 엔지니어, 외주업체와 납품업체
              사이의 일정과 품질 기준을 조율했습니다.
            </p>

            <p>
              문제가 발생하면 관련 담당자에게 상황을 확인하고 원인이 시작된
              지점을 먼저 찾은 뒤, 각 담당자의 조건을 정리해 대응 방안을
              결정했습니다. 이 과정에서 한 사람의 판단만으로 해결책을 정하기보다
              필요한 정보를 빠르게 공유하고 서로 다른 역할을 하나의 해결책으로
              연결하는 방법을 익혔습니다.
            </p>

            <p>
              디자인과 개발 역시 여러 역할이 밀접하게 연결되는 일이라고
              생각합니다. 합류 후에는 사용자가 서비스를 이용하는 목적과 불편을
              먼저 확인해 정보 구조와 화면 흐름으로 구체화하고, 개발 경험을
              활용해 기술적인 제약과 구현 방식까지 함께 검토하겠습니다. 출시
              이후에는 실제 사용자 반응을 다시 살피며 다음 개선의 기준으로
              이어가겠습니다.
            </p>

            <p className="cover-letter-closing">
              <strong>
                사용자의 선택을 이끌어낸 디자인 경험과 이를 직접 구현할 수 있는
                개발 역량으로, 서비스의 목적을 사용자가 이해하기 쉽고 편리한
                경험으로 구체화하겠습니다.
              </strong>
            </p>

            <p>감사합니다.</p>
          </div>
        </section>
      </article>
    </ContentShell>
  );
}
