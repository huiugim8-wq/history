import type { Metadata } from "next";
import Link from "next/link";
import ContentShell from "../content-shell";
import { blogPosts } from "../content-data";

export const metadata: Metadata = {
  title: "기술 블로그 | 김희준",
  description:
    "실시간 투자 정보 플랫폼을 구현하며 내린 프론트엔드 기술적 의사결정을 기록합니다.",
};

export default function BlogPage() {
  return (
    <ContentShell
      eyebrow="TECHNICAL NOTES"
      title="구현보다 먼저 고민한 것들"
      description="문제를 어떻게 정의했고, 어떤 기준으로 구조와 렌더링 방식을 선택했는지 정리했습니다."
    >
      <section className="content-index blog-index" aria-label="기술 글 목록">
        {blogPosts.map((post) => (
          <Link className="content-card blog-card" href={post.href} key={post.href}>
            <span className="content-card-number">{post.number}</span>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <ul className="content-card-tags" aria-label={`${post.title} 키워드`}>
              {post.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <span className="content-card-link">
              글 읽기 <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </section>
    </ContentShell>
  );
}
