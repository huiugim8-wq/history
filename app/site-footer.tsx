import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="page-footer">
      <p>© 2026 KIM HEEJUN</p>
      <div>
        <Link href="/">이력서</Link>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
