import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteNavigation from "../../site-navigation";
import { publicAssetPath } from "../../site-paths";
import styles from "./workspace-case.module.css";

export const metadata: Metadata = {
  title: "리즈 AI — 공간 예약과 커피챗을 카카오톡으로 연결한 1주 MVP | 김희준",
  description: "공간을 찾을 이유는 커피챗으로, 예약과 운영은 AI로. 수강생과 코치의 모든 활동을 홈 캘린더와 카카오톡으로 연결하는 리즈 AI 서비스 제안.",
};

const developmentStack = [
  { label: "Frontend", value: "Next.js · React · TypeScript" },
  { label: "Backend", value: "Node.js · Drizzle · PostgreSQL" },
  { label: "AI & Channel", value: "AI SDK · OpenAI · Kakao" },
  { label: "Infra", value: "AWS · Nginx · PM2 · LiveKit" },
];

function Section({ id, number, title, children }: { id: string; number: string; title: string; children: ReactNode }) {
  return <section id={id} className={styles.section}><p className={styles.sectionNumber}>{number.split(" / ")[1]}</p><h2>{title}</h2>{children}</section>;
}
function Diagram({ file, title, width, height, caption }: { file: string; title: string; width: number; height: number; caption: string }) {
  const src = publicAssetPath(`/workspace-project/${file}`);
  return <figure className={styles.diagram}>
    <a href={src} target="_blank" rel="noreferrer" aria-label={`${title} 확대 보기`}><Image src={src} alt={title} width={width} height={height} sizes="(max-width: 1100px) 100vw, 1080px" unoptimized /></a>
    <figcaption><span>{caption}</span><a href={src} target="_blank" rel="noreferrer">확대 보기 ↗</a></figcaption>
  </figure>;
}

export default function RizzWorkspacePage() {
  return <div className={styles.page} id="top">
    <header className={styles.header}><SiteNavigation /><Link className={styles.back} href="/portfolio/">← 포트폴리오</Link></header>
    <main className={styles.main}>
      <article>
        <header className={styles.hero}>
          <p className={styles.kicker}>RIZZ AI Portfolio Project</p>
          <h1>공간 예약과 커피챗을,<br />카카오톡으로 연결한 <span className={styles.keepTogether}>AI MVP<span className={styles.titleDot}>.</span></span></h1>
          <p className={styles.byline}>김희준 · 개인 프로젝트 · 2026 · 1주 MVP</p>
        </header>
        <section className={styles.developmentStack} aria-labelledby="development-stack">
          <div className={styles.stackHeading}><h2 id="development-stack">Development Stack</h2><nav className={styles.stackLinks} aria-label="리즈 AI 프로젝트 관련 링크"><a href="https://rizz-52-78-22-36.sslip.io/?persona=coach" target="_blank" rel="noreferrer">사이트 ↗</a><a href="#application">아키텍처 ↓</a></nav></div>
          <dl>{developmentStack.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>
        </section>
        <figure className={styles.heroCapture}><a href={publicAssetPath('/workspace-project/workspace-calendar.jpg')} target="_blank" rel="noreferrer" aria-label="홈 캘린더와 리즈 AI 실제 화면 확대"><Image src={publicAssetPath('/workspace-project/workspace-calendar.jpg')} alt="홈의 중앙 캘린더에 공간 예약과 코치 이벤트가 보이고, 오른쪽 리즈 AI에서 예약·추천·참여를 요청하는 화면" width={1280} height={720} sizes="(max-width: 840px) 100vw, 796px" preload unoptimized /></a><figcaption>RIZZ AI · 홈 캘린더와 AI / 실제 MVP 화면 · 가상 데모 데이터</figcaption></figure>
        <div className={styles.introduction}>
          <p className={styles.lead}>리즈의 공간 이용률을 높이기 위해 시작한 프로젝트입니다. 커피챗으로 공간을 찾을 이유를 만들고, 수강생과 코치의 예약·개설·소통을 AI로 연결했습니다.</p>
          <p>낮은 공간 이용률을 다룬 영상을 보고, 강사진과의 만남을 공간의 이용 목적으로 제안했습니다. 이 흐름을 홈 캘린더와 카카오톡에서 경험할 수 있도록 일주일 동안 MVP를 제작했습니다.</p>
        </div>

        <Section id="background" number="01 / 발견한 문제" title="공간을 예약하기 어렵고, 찾아갈 이유도 부족하다">
          <div className={styles.problemGrid}>
            <div><span>공간</span><h3>낮은 이용률</h3><p>공간은 있지만, 수강생이 찾아와 사용할 이유가 부족합니다.</p></div>
            <div><span>예약</span><h3>번거로운 이용 과정</h3><p>시간·장소·좌석을 확인하고 예약하는 과정이 복잡합니다.</p></div>
            <div><span>수강생</span><h3>강사진과의 실제 만남</h3><p>강의 시청을 넘어 강사진을 만나 직접 피드백받고 싶어 합니다.</p></div>
          </div>
          <div className={styles.solution}><p className={styles.smallLabel}>제안하는 해결 방식</p><h3>커피챗으로 공간을 이용할 이유를 만듭니다.</h3><p>AI와 대화하며 공간을 예약하고, 그곳에서 코치와 만납니다. 커피챗에는 수강 자격과 진도율 조건을 설정해, <strong>강사진과의 만남을 강의 완주의 동기</strong>로 연결합니다.</p>
            <ol className={styles.learningLoop}><li><strong>강의 수강</strong><span>학습 시작</span></li><li><strong>참여 조건 달성</strong><span>예: 해당 강의 진도 70%</span></li><li><strong>코치 커피챗</strong><span>공간 방문 · 직접 피드백</span></li><li><strong>다음 학습</strong><span>피드백을 적용하고 재참여</span></li></ol>
            <small>진도율은 코치가 정하는 참여 조건의 예시입니다.</small>
          </div>
          <div className={styles.solution} id="coach-connection"><h3>고민을 남기면, 코치가 먼저 커피챗을 제안합니다.</h3><p>공간 예약 시 남긴 오늘의 목표와 고민을 코치가 공간 이용 현황에서 확인합니다. 도움이 필요한 수강생에게 <strong>먼저 실시간 커피챗을 제안</strong>하며, 공간 이용을 피드백과 만남으로 연결합니다.</p></div>
        </Section>

        <Section id="scope" number="02 / AI 중심 MVP" title="수강생도 코치도, AI와 대화하며 서비스를 이용합니다">
          <p><strong>“편집실 예약해줘.” 한마디면 시작할 수 있습니다.</strong> AI가 필요한 날짜·시간·좌석을 질문하고, 가능한 자리를 찾아 사용자 확인 후 예약을 완료합니다. 커피챗 추천·신청·소통과 코치의 커피챗·강연 개설도 대화로 처리하고, 모든 일정은 캘린더로 시각화합니다.</p>
          <div className={styles.roles}>
            <article><span>STUDENT</span><h3>수강생</h3><p className={styles.sample}>“편집실 예약해줘.”</p><ul><li>AI의 추가 질문을 따라 공간 예약</li><li>오늘의 고민 공유·커피챗 참여</li><li>코치·수강생과 소통</li></ul></article>
            <article><span>COACH</span><h3>코치</h3><p className={styles.sample}>“강의 진도 70% 이상인 수강생을 위한 커피챗을 열어줘.”</p><ul><li>공유된 고민을 보고 커피챗 제안</li><li>커피챗·강연 개설과 참여 조건 설정</li><li>일정·참여자·피드백 관리</li></ul></article>
          </div>
          <div className={styles.pipeline}><span>웹 · 카카오톡</span><b>→</b><strong>리즈 AI</strong><b>→</b><span>예약 · 개설 · 참여 · 소통</span><b>→</b><span>캘린더</span></div>
          <p className={styles.shortNote}>사이트 방문도 부담이 될 수 있습니다. 카카오톡 봇에서 공간 예약과 커피챗으로 바로 이어지는 경로까지 MVP에 포함했습니다.</p>
        </Section>

        <Section id="experience" number="03 / 홈과 캘린더" title="여러 페이지를 오가지 않고, 홈에서 한 번에">
          <p>홈에서 AI와 대화하고, 예약·신청·소통을 이어갑니다. 코치가 연 커피챗과 강연, 내 예약을 같은 캘린더에서 확인하고 <strong>내 일정에 맞는 학습·공간 이용 계획</strong>을 세울 수 있습니다.</p>

          <div className={styles.uiPoints}><div><strong>전체 일정</strong><span>코치 이벤트와 참여 가능한 모임</span></div><div><strong>내 일정</strong><span>학습·예약·커피챗을 한눈에</span></div><div><strong>리즈 AI</strong><span>대화하면서 추천·예약·개설</span></div></div>
        </Section>

        <Section id="application" number="04 / 시스템 아키텍처" title="시스템 아키텍처">
          <Diagram file="rizz-system-architecture.svg" title="리즈 AI 시스템 아키텍처: 웹·카카오톡, AWS 단일 호스트의 Nginx·Next.js·PM2·PostgreSQL과 외부 AI·미디어 서비스 연결" width={1240} height={824} caption="MVP 구성 · 실제 기술 아이콘과 실행 경계" />
          <p className={styles.shortNote}>Next.js로 화면과 API를 한 제품·서버에 구성했습니다. 외부 연동과 분석은 PM2 작업 프로세스로 분리합니다.</p>
        </Section>

        <Section id="ai" number="05 / AI 구조" title="AI는 이해하고, 조회하고, 실행을 연결합니다">
          <Diagram file="rizz-ai-flow.svg" title="Mermaid로 작성한 리즈 AI 흐름: 의도 파악, 운영 데이터 조회, 추천·제안, 사용자 확인과 공식 명령 실행" width={995} height={170} caption="Mermaid · 의도 파악부터 예약·개설·참여 실행까지" />
          <div className={styles.aiSummary} id="booking"><div><span>현재</span><p>대화 맥락을 유지하며 빠진 조건만 질문합니다. 공간·일정·수강 진도를 DB에서 조회하고, 사용자 확인 후 공통 명령으로 예약·개설·참여를 실행합니다.</p></div><div><span>다음</span><p>동의받은 코치 대화를 검토·지식화해 RAG에 활용합니다. 반복 질문에 지식을 재사용하며 <strong>서비스 확대와 토큰 사용량 절감</strong>을 목표로 합니다.</p></div></div>
          <a className={styles.sourceLink} href={publicAssetPath('/workspace-project/rizz-ai-flow.mmd')} download>Mermaid 원본 ↓</a>
        </Section>

        <Section id="kakao" number="06 / 카카오톡 연결" title="웹에 들어오지 않아도, 카카오톡에서 바로">
          <p>카카오 계정을 리즈 계정에 연결하면 같은 AI와 예약 정보를 사용합니다. 카카오톡에서 공간을 예약하고 커피챗을 신청한 결과가 웹 캘린더에도 반영됩니다.</p>
          <div className={styles.kakaoFlow}><div><span>01</span><strong>카카오톡</strong><p>자연어 요청 · 카드 선택</p></div><b>→</b><div><span>02</span><strong>계정 연결</strong><p>수강생 · 코치 권한 확인</p></div><b>→</b><div><span>03</span><strong>공용 AI 실행</strong><p>조회 · 제안 · 확인 후 실행</p></div><b>→</b><div><span>04</span><strong>결과 전달</strong><p>카카오 응답 · 캘린더 반영</p></div></div>
          <p className={styles.shortNote}>Kakao Skill → PostgreSQL 작업 큐 → AI worker → Callback. 긴 AI 응답은 비동기로 전달합니다.</p>
        </Section>

        <aside className={styles.proposal} id="proposal"><p className={styles.smallLabel}>도입 후 확인할 것</p><h2>공간 이용과 강의 진도, 실제로 달라지는가</h2><div><span>공간 실제 이용률</span><span>수강 진도·완주율</span><span>커피챗 참여·재참여율</span></div><p>일부 코치·수강생·공간부터 적용하고, 도입 전후를 같은 기준으로 비교합니다.</p></aside>
      </article>
    </main>
    <footer className={styles.footer}><Link href="/portfolio/">← 포트폴리오 목록</Link><span>RIZZ AI · 김희준 · 2026</span><a href="#top">맨 위로 ↑</a></footer>
  </div>;
}
