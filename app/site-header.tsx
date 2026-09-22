import Link from "next/link";
import SiteNavigation from "./site-navigation";

export default function SiteHeader({
  mode = "frontend",
}: {
  mode?: "frontend" | "uiux";
}) {
  return (
    <header className="page-site-header">
      <div className="page-site-header-inner">
        <Link className="site-wordmark" href={mode === "uiux" ? "/uiux" : "/"}>
          KIM HEEJUN
        </Link>
        <SiteNavigation mode={mode} />
      </div>
    </header>
  );
}
