import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteNavigation from "../../site-navigation";
import { publicAssetPath } from "../../site-paths";
import styles from "./rizz-case.module.css";

export const metadata: Metadata = {
  title: "GLOW UP RIZZ · 리즈의 이야기가, 담겨진 홈페이지로 | 김희준",
  description:
    "글로우업리즈에 지원하기 위해 시작한 개인 프로젝트. 브랜드의 성장 흐름을 UI로 표현하고, 직원이 직접 정보를 바꿀 수 있는 홈페이지를 만들었습니다.",
};

const developmentStack = [
  { label: "Frontend", value: "Next.js · React · TypeScript" },
  { label: "Backend", value: "Node.js · Prisma · PostgreSQL" },
  { label: "Infra", value: "AWS EC2 · Nginx · PM2" },
];

export default function GlowUpRizzPage() {
  return (
    <div className={styles.page} id="top">
      <header className={styles.header}>
        <SiteNavigation />
        <Link className={styles.backLink} href="/portfolio/">← 포트폴리오</Link>
      </header>
      <main>
        <h1 className={styles.visuallyHidden}>GLOW UP RIZZ · 리즈의 이야기가, 담겨진 홈페이지로</h1>
        <div className={styles.portfolio}>
          <div className={styles.artworkTitle} aria-hidden="true">
            <Image
              src={publicAssetPath("/rizz-project/glow-up-rizz-portfolio.png")}
              alt=""
              width={2164}
              height={14559}
              sizes="(max-width: 1080px) 100vw, 1080px"
              preload
              unoptimized
            />
          </div>
        <section className={styles.stack} aria-labelledby="development-stack">
          <div className={styles.stackHeading}>
            <h2 id="development-stack">Development Stack</h2>
            <nav className={styles.projectLinks} aria-label="프로젝트 링크">
              <a href="https://54-180-95-162.nip.io/" target="_blank" rel="noreferrer">사이트 ↗</a>
              <a href="https://github.com/huiugim8-wq/rizz" target="_blank" rel="noreferrer">GitHub ↗</a>
            </nav>
          </div>
          <dl className={styles.stackList}>
            {developmentStack.map(({ label, value }) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
        </section>
        <figure className={styles.portfolioBody}>
          <div className={styles.artwork}>
            <Image
              src={publicAssetPath("/rizz-project/glow-up-rizz-portfolio.png")}
              alt="GLOW UP RIZZ 포트폴리오. 리즈의 이야기가, 담겨진 홈페이지로. 지원 계기, 브랜드의 순환 구조, 스크롤 UI 설계, 직원용 콘텐츠 관리와 작업 이력, PostgreSQL 및 AWS 운영 과정을 정리한 원본 포트폴리오."
              width={2164}
              height={14559}
              sizes="(max-width: 1080px) 100vw, 1080px"
              preload
              unoptimized
            />
          </div>
          <figcaption className={styles.originalLink}>
            <a href={publicAssetPath("/rizz-project/glow-up-rizz-portfolio.png")} target="_blank" rel="noreferrer">포트폴리오 원본 크게 보기 ↗</a>
          </figcaption>
        </figure>
        </div>
      </main>
      <footer className={styles.footer}>
        <Link href="/portfolio/">← 포트폴리오 목록</Link>
        <a href="#top">맨 위로 ↑</a>
      </footer>
    </div>
  );
}
