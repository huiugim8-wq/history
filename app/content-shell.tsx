import type { ReactNode } from "react";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";

type ContentShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
};

export default function ContentShell({
  eyebrow,
  title,
  description,
  actions,
  children,
}: ContentShellProps) {
  return (
    <div className="content-site" id="top">
      <SiteHeader />
      <main className="content-main">
        <header className="content-hero">
          <div>
            <p className="content-eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p className="content-description">{description}</p>
          </div>
          {actions ? <div className="content-actions">{actions}</div> : null}
        </header>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
