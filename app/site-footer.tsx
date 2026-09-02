import Link from "next/link";

export default function SiteFooter({
  mode = "frontend",
}: {
  mode?: "frontend" | "uiux";
}) {
  const isUiux = mode === "uiux";

  return (
    <footer className="page-footer">
      <Link
        className="secret-mode-link"
        href={isUiux ? "/" : "/uiux"}
        aria-label={
          isUiux
            ? "프론트엔드 개발자 페이지로 전환"
            : "UI/UX 디자이너 페이지로 전환"
        }
      >
        © 2026 KIM HEEJUN
      </Link>
      <div>
        <Link href={isUiux ? "/uiux" : "/"}>이력서</Link>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
