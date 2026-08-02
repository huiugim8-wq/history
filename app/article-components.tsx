import Link from "next/link";
import type { ReactNode } from "react";

export function ArticleSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="article-section">
      <div className="article-section-heading">
        <span>{number}</span>
        <h2>{title}</h2>
      </div>
      <div className="article-section-body">{children}</div>
    </section>
  );
}

export function TagList({
  tags,
  label = "사용 기술",
}: {
  tags: readonly string[];
  label?: string;
}) {
  return (
    <ul className="article-tags" aria-label={label}>
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}

export function InternalBackLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link className="content-back-link" href={href}>
      <span aria-hidden="true">←</span> {children}
    </Link>
  );
}

export function ExternalTextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      className="content-text-link"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}
