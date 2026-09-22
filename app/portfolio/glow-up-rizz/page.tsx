import type { Metadata } from "next";
import {
  ArticleSection,
  ExternalTextLink,
  InternalBackLink,
  TagList,
} from "../../article-components";
import ContentShell from "../../content-shell";

export const metadata: Metadata = {
  title: "글로우업리즈 기업 웹사이트·콘텐츠 관리 시스템 | 김희준",
  description:
    "브랜드 홈페이지와 콘텐츠 관리자를 Next.js·PostgreSQL로 구현하고 AWS EC2에 배포한 개인 풀스택 프로젝트입니다. 인증과 권한, 동시 수정 충돌, 이미지 처리와 통합 테스트를 연결했습니다.",
};

const siteUrl = "https://54-180-95-162.nip.io/";
const repositoryUrl = "https://github.com/huiugim8-wq/rizz";

export default function GlowUpRizzPage() {
  return (
    <ContentShell
      eyebrow="개인 프로젝트 · Next.js 풀스택"
      title="글로우업리즈 기업 웹사이트·콘텐츠 관리 시스템"
      description="회사의 사업 구조를 사용자에게 전달하는 홈페이지와, 운영자가 콘텐츠를 직접 관리하는 시스템을 설계·구현하고 AWS EC2에 배포했습니다."
      actions={
        <>
          <ExternalTextLink href={siteUrl}>사이트 보기</ExternalTextLink>
          <ExternalTextLink href={`${siteUrl}admin/login`}>
            관리자 체험
          </ExternalTextLink>
          <ExternalTextLink href={repositoryUrl}>GitHub</ExternalTextLink>
        </>
      }
    >
      <article className="technical-article technical-article--case-study">
        <InternalBackLink href="/portfolio">포트폴리오로 돌아가기</InternalBackLink>

        <dl className="project-facts case-project-facts">
          <div>
            <dt>형태</dt>
            <dd>개인 포트폴리오 프로젝트</dd>
          </div>
          <div>
            <dt>담당</dt>
            <dd>기획 · UI 구현 · 백엔드 · 배포</dd>
          </div>
          <div>
            <dt>핵심 기술</dt>
            <dd>Next.js 16 · React 19 · PostgreSQL</dd>
          </div>
          <div>
            <dt>배포 환경</dt>
            <dd>AWS EC2 · Nginx · PM2 · HTTPS</dd>
          </div>
        </dl>

        <ArticleSection number="01" title="사업을 이해하는 화면과 콘텐츠 운영을 함께 설계했습니다">
          <p>
            글로우업리즈에 지원하기 위해 회사의 공개 정보와 사업 구조를 살펴보며
            시작한 프로젝트입니다. 크리에이터의 성장, 콘텐츠로 발생한 트래픽,
            커머스와 교육으로의 확장이 어떻게 이어지는지 방문자가 이해할 수 있도록
            정보의 순서와 화면 흐름을 구성했습니다.
          </p>
          <p>
            MCN, Commerce, Academy, Property, F&amp;B 등 사업별 페이지를 만들고,
            뉴스와 크리에이터 정보는 운영자가 코드를 수정하거나 다시 배포하지
            않아도 관리할 수 있도록 데이터베이스와 관리자 화면으로 연결했습니다.
            <strong> 공개 홈페이지와 관리자가 같은 데이터를 사용하는 구조</strong>로
            구현했습니다.
          </p>
          <p>
            회사가 공개한 정보와 브랜드 자료를 참고한 비공식 개인 프로젝트이며,
            실제 회사의 의뢰나 공식 운영 실적을 의미하지 않습니다.
          </p>
        </ArticleSection>

        <ArticleSection number="02" title="화면과 서버의 역할을 나눴습니다">
          <p>
            하나의 Next.js 애플리케이션 안에서 공개 화면과 관리자를 구성하되,
            라우트, 화면 기능, 공통 UI, 서버 서비스를 분리했습니다. 페이지는
            서비스 함수를 통해 데이터를 조회하고, 인증·입력 검증·DB 변경은
            서버에서 처리하도록 경계를 두었습니다.
          </p>
          <ul>
            <li>
              <strong>공개 화면:</strong> 게시 상태이며 삭제되지 않은 뉴스와
              크리에이터만 조회합니다. 크리에이터의 채널과 표시 순서를 함께 관리합니다.
            </li>
            <li>
              <strong>관리자:</strong> 콘텐츠 등록·수정·게시·숨김·휴지통·복원,
              크리에이터 정렬, 이미지 선택과 미리보기를 제공합니다.
            </li>
            <li>
              <strong>데이터:</strong> PostgreSQL과 Prisma로 사용자·세션·뉴스·크리에이터·채널·미디어·감사
              로그를 모델링하고, 마이그레이션으로 스키마 변경을 관리합니다.
            </li>
          </ul>
          <TagList tags={["Next.js App Router", "Server Actions", "Route Handlers", "Prisma", "PostgreSQL", "Zod"]} />
        </ArticleSection>

        <ArticleSection number="03" title="권한과 동시 수정에서 발생하는 문제를 처리했습니다">
          <div className="article-subsection">
            <h3>계정 정지가 기존 로그인에도 반영되도록</h3>
            <p>
              Better Auth로 Google OAuth와 이메일 로그인을 연결하고, 계정의
              역할과 승인 상태를 구분했습니다. 가입한 직원은 승인 대기 상태로
              시작하며, 서버에서 현재 권한을 다시 검사합니다. 직원 정지 시에는
              기존 세션도 삭제해 이미 로그인한 계정의 접근을 막습니다.
            </p>
          </div>
          <div className="article-subsection">
            <h3>다른 직원의 수정 내용을 덮어쓰지 않도록</h3>
            <p>
              콘텐츠마다 버전을 두고 저장 시 최신 버전과 비교합니다. 다른 직원이
              먼저 수정한 경우 저장을 거부하고 다시 열도록 안내합니다. 변경 작업은
              트랜잭션과 PostgreSQL 잠금으로 조율하고, 최고 관리자와 대표 뉴스가
              각각 한 건만 존재하도록 DB에도 제약조건을 적용했습니다.
            </p>
          </div>
          <div className="article-subsection">
            <h3>복원한 콘텐츠가 곧바로 공개되지 않도록</h3>
            <p>
              삭제는 휴지통 이동으로 처리하고, 복원 시에는 임시 저장 상태로
              되돌려 운영자가 확인한 뒤 게시하도록 했습니다. 주요 변경에는 작업자,
              대상과 작업 종류를 기록해 변경 이력을 확인할 수 있게 했습니다.
            </p>
          </div>
        </ArticleSection>

        <ArticleSection number="04" title="이미지 업로드부터 저장과 재사용까지 연결했습니다">
          <p>
            업로드 요청의 인증과 Origin을 확인하고, 파일 크기와 실제 이미지 형식,
            픽셀 수를 검사합니다. Sharp로 회전을 보정한 뒤 최대 1600×1600 범위의
            WebP로 변환하며, 변환 결과의 SHA-256 체크섬으로 같은 이미지의 중복
            저장을 방지합니다.
          </p>
          <p>
            콘텐츠가 참조하는 이미지는 삭제할 수 없도록 하고, 업로드 파일은
            애플리케이션 릴리스 폴더 밖에 저장했습니다. 새 버전을 배포해도 운영 중
            업로드한 파일이 보존되도록 구성했습니다.
          </p>
          <TagList tags={["Sharp", "WebP", "SHA-256", "파일 검증", "영구 업로드 경로"]} />
        </ArticleSection>

        <ArticleSection number="05" title="제한된 비용 안에서 배포와 운영 구조를 구성했습니다">
          <p>
            AWS EC2 한 대에서 Next.js, PostgreSQL, Nginx를 실행하는 구성을
            선택했습니다. Nginx가 HTTPS 요청을 받아 애플리케이션으로 전달하고,
            PM2가 프로세스를 관리합니다. 상태 확인 API는 DB 연결까지 확인한 뒤
            정상 또는 실패 응답을 반환합니다.
          </p>
          <p>
            Next.js standalone 산출물로 배포 패키지를 만들고, 버전별 릴리스와
            현재 버전을 가리키는 링크를 구분했습니다. 운영 환경변수와 업로드 파일도
            릴리스에서 분리했습니다.
          </p>
          <p>
            한 서버로 구성해 비용과 관리 범위를 줄였지만 애플리케이션과 DB가 같은
            장애 영향을 받는 한계가 있습니다. S3 외부 백업, RDS 분리, CloudWatch
            알림과 인프라 코드화는 향후 개선 항목으로 두었습니다.
          </p>
        </ArticleSection>

        <ArticleSection number="06" title="정상 동작과 실패 조건을 테스트로 남겼습니다">
          <p>
            실제 PostgreSQL 테스트 DB를 사용하는 <strong>14개의 통합 테스트</strong>를
            작성했습니다. 회원가입과 로그인, 승인되지 않은 계정의 접근 거부,
            직원 정지에 따른 세션 폐기, 동시 소유권 이전과 콘텐츠 수정 충돌,
            이미지 변환·중복 제거 등을 확인하는 테스트입니다.
          </p>
          <p>
            테스트 대상은 로컬의 전용 테스트 DB로 제한했습니다. 타입 검사와
            린트 외에도 콘텐츠·이미지 참조와 파일 구조를 검사하는 스크립트를
            추가했습니다. 브라우저 전체 흐름을 확인하는 E2E 테스트와 실사용
            성능 측정은 추가 검증 과제로 남아 있습니다.
          </p>
          <TagList tags={["Vitest", "통합 테스트", "TypeScript", "ESLint", "콘텐츠·에셋 검사"]} />
        </ArticleSection>

        <ArticleSection number="07" title="프로젝트 확인">
          <p>
            공개 홈페이지와 관리자 체험 화면에서 구현 결과를 확인할 수 있습니다.
            설계 판단, 데이터 흐름, 배포 절차와 남은 개선 과제는 저장소에 정리했습니다.
          </p>
          <div className="content-actions">
            <ExternalTextLink href={siteUrl}>사이트 보기</ExternalTextLink>
            <ExternalTextLink href={`${siteUrl}admin/login`}>관리자 체험</ExternalTextLink>
            <ExternalTextLink href={repositoryUrl}>GitHub · 구현 문서</ExternalTextLink>
          </div>
        </ArticleSection>
      </article>
    </ContentShell>
  );
}
