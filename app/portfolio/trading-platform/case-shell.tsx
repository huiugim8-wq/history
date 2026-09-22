import type { ReactNode } from "react";
import Link from "next/link";
import SiteFooter from "../../site-footer";
import "./trading-case.css";

export default function TradingCaseShell({ children }: { children: ReactNode }) {
  return (
    <div className="trading-case" id="top">
      <a className="trading-skip" href="#project-content">본문으로 이동</a>
      <header className="trading-masthead">
        <div className="trading-container">
          <nav className="trading-nav" aria-label="주요 메뉴">
            <Link href="/">이력서</Link>
            <Link href="/cover-letter/">자기소개서</Link>
            <Link href="/portfolio/">포트폴리오</Link>
            <Link href="/documents/">PDF</Link>
            <a href="https://github.com/huiugim8-wq" target="_blank" rel="noreferrer">GitHub</a>
          </nav>
          <Link href="/portfolio/" className="trading-wordmark" aria-label="김희준 포트폴리오 목록">
            <span>Portfolio<span className="trading-dot">.</span></span>
            <span className="trading-name">KIM<br />HEEJUN</span>
          </Link>
        </div>
      </header>
      <main className="trading-container trading-main" id="project-content">{children}</main>
      <div className="trading-container trading-footer"><SiteFooter /></div>
    </div>
  );
}

export function CaseExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer">{children} <span aria-hidden="true">↗</span></a>;
}

export function CaseDetailLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link className="trading-detail-link" href={href}>{children}<span aria-hidden="true">↗</span></Link>;
}

export function CaseSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section className="trading-section" aria-labelledby={id}><h2 id={id}>{title}</h2>{children}</section>;
}

export function CaseTags({ tags }: { tags: readonly string[] }) {
  return <ul className="trading-tags" aria-label="사용 기술">{tags.map(tag => <li key={tag}>{tag}</li>)}</ul>;
}
