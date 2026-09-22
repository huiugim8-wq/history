import Link from "next/link";
import { siteNavigation } from "./content-data";

const uiuxNavigation = [
  { href: "/uiux", label: "이력서" },
  { href: "/uiux/cover-letter", label: "자기소개서" },
  { href: "/uiux/portfolio", label: "포트폴리오" },
  { href: "/documents", label: "PDF" },
] as const;

export default function SiteNavigation({
  mode = "frontend",
}: {
  mode?: "frontend" | "uiux";
}) {
  const navigation = mode === "uiux" ? uiuxNavigation : siteNavigation;

  const withTrailingSlash = (href: string) =>
    href === "/" || href.endsWith("/") ? href : `${href}/`;

  return (
    <nav className="site-nav" aria-label="주요 메뉴">
      {navigation.map((item) => (
        <Link
          className="site-nav-link"
          href={withTrailingSlash(item.href)}
          key={item.href}
        >
          {item.label}
        </Link>
      ))}
      <a
        className="site-nav-link"
        href="https://github.com/huiugim8-wq"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>
    </nav>
  );
}
