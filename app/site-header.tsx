import Link from "next/link";
import { siteNavigation } from "./content-data";

export default function SiteHeader() {
  return (
    <header className="page-site-header">
      <div className="page-site-header-inner">
        <Link className="site-wordmark" href="/">
          KIM HEEJUN
        </Link>
        <nav className="site-nav" aria-label="주요 메뉴">
          {siteNavigation.map((item) => (
            <Link className="site-nav-link" href={item.href} key={item.href}>
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
      </div>
    </header>
  );
}
