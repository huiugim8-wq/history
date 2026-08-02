import type { Metadata } from "next";
import {
  ArticleSection,
  ExternalTextLink,
  InternalBackLink,
  TagList,
} from "../../../article-components";
import ContentShell from "../../../content-shell";

export const metadata: Metadata = {
  title: "TypeScript 피벗 군집 · 선형회귀 알고리즘 | 김희준",
  description:
    "피벗 군집과 선형회귀로 후보선을 만들고 평가 기준을 통해 지지·저항선을 선별한 알고리즘입니다.",
};

export default function ChartAnalysisPage() {
  return (
    <ContentShell
      eyebrow="PROJECT 01 · DEEP DIVE 04"
      title="TypeScript 피벗 군집 · 선형회귀 알고리즘"
      description="피벗 군집과 선형회귀로 후보선을 만들고, 접촉·가격 반응·오차·돌파를 평가해 지지·저항선을 선별했습니다."
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
            차트의 지지·저항선은 단순히 두 점을 연결하는 것으로 끝나지 않습니다.
            많은 피벗 중 의미 있는 조합을 찾고, 가격 움직임과 얼마나 잘 맞는지
            평가하며, 선정 이유를 사용자가 확인할 수 있어야 합니다.
          </p>
          <ul>
            <li>후보 조합이 많아질수록 계산과 검증 기준이 복잡해집니다.</li>
            <li>데이터와 조건이 같다면 결과도 같아야 합니다.</li>
            <li>선만 표시하는 것이 아니라 선정 근거를 설명해야 합니다.</li>
          </ul>
        </ArticleSection>

        <ArticleSection number="02" title="Algorithm Pipeline">
          <pre className="architecture-flow">
            <code>{`OHLC Data
    ↓
Pivot Extraction
    ↓
Clustering
    ↓
Linear Regression
    ↓
Candidate Scoring
    ↓
Filter & Select
    ↓
Chart Layer Rendering`}</code>
          </pre>
          <ol>
            <li>
              <strong>Pivot Extraction</strong> — 국소 고점과 저점을 후보 피벗으로
              추출합니다.
            </li>
            <li>
              <strong>Clustering</strong> — 시간·가격상 가까운 피벗을
              군집화합니다.
            </li>
            <li>
              <strong>Linear Regression</strong> — 군집별로 추세를 설명하는
              후보선을 생성합니다.
            </li>
            <li>
              <strong>Candidate Scoring</strong> — 접촉, 가격 반응, 오차, 돌파
              기준으로 후보를 평가합니다.
            </li>
            <li>
              <strong>Filter & Select</strong> — 기준을 통과한 후보만
              지지·저항선으로 선택합니다.
            </li>
            <li>
              <strong>Visualization</strong> — 선택된 선과 평가 근거를 별도
              차트 레이어에 표시합니다.
            </li>
          </ol>
        </ArticleSection>

        <ArticleSection number="03" title="Candidate Generation">
          <p>
            모든 점의 조합을 직접 선으로 만드는 대신, 먼저 피벗을 추출하고
            유사한 피벗을 군집화해 후보 공간을 줄였습니다. 각 군집에 선형회귀를
            적용해 여러 피벗의 전체 경향을 반영하는 후보선을 생성했습니다.
          </p>
          <pre className="article-code">
            <code>{`type Pivot = {
  index: number
  price: number
  kind: 'high' | 'low'
}

type CandidateLine = {
  slope: number
  intercept: number
  pivots: Pivot[]
}`}</code>
          </pre>
        </ArticleSection>

        <ArticleSection number="04" title="Candidate Scoring">
          <div className="table-scroll">
            <table className="article-table">
              <thead>
                <tr>
                  <th>평가 기준</th>
                  <th>의미</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>접촉</td>
                  <td>가격이 후보선과 의미 있게 만난 횟수</td>
                </tr>
                <tr>
                  <td>가격 반응</td>
                  <td>후보선 접촉 후 반등·반락이 발생한 정도</td>
                </tr>
                <tr>
                  <td>오차</td>
                  <td>피벗과 회귀선 사이의 거리</td>
                </tr>
                <tr>
                  <td>돌파</td>
                  <td>가격이 후보선을 무효화한 횟수와 강도</td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className="article-code">
            <code>{`score = contactWeight
      + reactionWeight
      - errorPenalty
      - breakoutPenalty`}</code>
          </pre>
          <p>
            생성 단계와 평가 단계를 분리해 평가 기준의 변경이 후보 생성 로직에
            영향을 주지 않도록 구성했습니다.
          </p>
        </ArticleSection>

        <ArticleSection number="05" title="재현성과 설명 가능성">
          <ul>
            <li>후보 생성과 검증 단계를 분리했습니다.</li>
            <li>
              동일한 입력 데이터와 조건에서는 같은 결과가 나오도록 결정적 흐름을
              유지했습니다.
            </li>
            <li>
              선택된 선뿐 아니라 접촉·오차·돌파 등 평가 근거를 함께
              보관했습니다.
            </li>
            <li>
              평가 결과를 별도 차트 레이어에 표시해 사용자가 선정 이유를 확인할
              수 있게 했습니다.
            </li>
          </ul>
          <p className="article-emphasis">
            알고리즘 결과의 정확도만큼, 사용자가 결과를 검증할 수 있는 설명
            가능성이 중요했습니다.
          </p>
        </ArticleSection>

        <ArticleSection number="06" title="결과">
          <ul>
            <li>피벗 군집과 회귀를 통해 후보 생성 범위를 구조화했습니다.</li>
            <li>여러 평가 기준을 조합해 후보선의 품질을 비교했습니다.</li>
            <li>선정 결과와 근거를 차트에서 함께 확인할 수 있습니다.</li>
          </ul>
          <TagList
            tags={[
              "TypeScript",
              "Data Structures",
              "Pivot Detection",
              "Clustering",
              "Linear Regression",
              "Candidate Scoring",
            ]}
          />
        </ArticleSection>
      </article>
    </ContentShell>
  );
}
