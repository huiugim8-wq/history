"use client";

import { isValidElement, useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { learningJavascriptArticleId, learningJavascriptChapters, learningJavascriptTopicId } from "./learning-javascript-data";
import { learningProgressByChapter, learningProgressLabels, type ChapterLearningProgress } from "./learning-progress-data";

type HtmlArticleId =
  | "html-intro"
  | "tag-overview"
  | "semantic-tags"
  | "text-tags"
  | "list-tags"
  | "table"
  | "image-pdf"
  | "media"
  | "form"
  | "fieldset"
  | "legend";

type CssArticleId = "css-intro" | "css-spacing-selectors" | "css-fonts" | "css-text-styles" | "css-box-model" | "css-borders" | "css-backgrounds" | "css-gradients" | "css-layout" | "css-flex" | "css-responsive";

type LearningJavascriptArticleId = `learning-js-${string}`;

type ArticleId = HtmlArticleId | CssArticleId | LearningJavascriptArticleId;

type View =
  | { type: "overview" }
  | { type: "category"; id: string }
  | { type: "article"; id: ArticleId };

type Section = {
  id: string;
  label: string;
  description: string;
  groups: { label?: string; items: string[] }[];
};

const sections: Section[] = [
  {
    id: "getting-started",
    label: "Getting Started",
    description: "프론트엔드를 공부하는 방향과 웹의 기본 동작을 정리합니다.",
    groups: [{ items: ["학습 로드맵", "개발 환경", "브라우저와 웹"] }],
  },
  {
    id: "html",
    label: "HTML",
    description: "콘텐츠의 의미와 관계를 올바른 마크업으로 표현합니다.",
    groups: [
      { label: "기초", items: ["HTML 개요"] },
      { label: "태그", items: ["태그 개요", "시맨틱 태그", "텍스트 태그", "목록 태그"] },
      { label: "콘텐츠", items: ["표 정리", "이미지와 PDF", "미디어 삽입"] },
      { label: "Form", items: ["Form", "fieldset", "legend"] },
    ],
  },
  {
    id: "css",
    label: "CSS",
    description: "레이아웃과 시각적 표현이 계산되는 방식을 기록합니다.",
    groups: [
      { label: "기초", items: ["CSS 개요", "여백과 기본 선택자", "글꼴 스타일", "텍스트 스타일"] },
      { label: "Core", items: ["Box Model", "Border와 radius", "Background", "Gradient", "Cascade", "Containing Block"] },
      { label: "Layout", items: ["페이지 배치", "Flex", "Grid", "Position"] },
      { label: "Responsive", items: ["Media Query", "Container Query"] },
    ],
  },
  {
    id: "javascript",
    label: "러닝 자바스크립트",
    description: "이선 브라운의 『러닝 자바스크립트』를 22개 챕터 순서로 공부하고, 질문과 이해의 변화를 연결해 기록합니다.",
    groups: [
      { label: "준비", items: learningJavascriptChapters.slice(0, 2).map((chapter) => `CHAPTER ${Number(chapter.number)} ${chapter.title}`) },
      { label: "언어 기초", items: learningJavascriptChapters.slice(2, 8).map((chapter) => `CHAPTER ${Number(chapter.number)} ${chapter.title}`) },
      { label: "핵심과 심화", items: learningJavascriptChapters.slice(8, 17).map((chapter) => `CHAPTER ${Number(chapter.number)} ${chapter.title}`) },
      { label: "브라우저와 서버", items: learningJavascriptChapters.slice(17).map((chapter) => `CHAPTER ${Number(chapter.number)} ${chapter.title}`) },
    ],
  },
  {
    id: "typescript",
    label: "TypeScript",
    description: "자바스크립트 위에 안전한 타입 경계를 설계합니다.",
    groups: [{ items: ["타입 추론", "Generic", "Utility Type", "Narrowing"] }],
  },
  {
    id: "react",
    label: "React",
    description: "렌더링, 상태, 컴포넌트가 상호작용하는 원리를 정리합니다.",
    groups: [
      { label: "Rendering", items: ["Render Cycle", "Reconciliation", "Virtual DOM"] },
      { label: "State", items: ["State", "Props", "Context"] },
      { label: "Hooks", items: ["useState", "useEffect", "useRef"] },
    ],
  },
  {
    id: "browser",
    label: "Browser",
    description: "요청부터 픽셀까지 브라우저가 하는 일을 추적합니다.",
    groups: [{ items: ["렌더링 파이프라인", "Reflow / Repaint", "네트워크", "캐시"] }],
  },
  {
    id: "performance",
    label: "Performance",
    description: "측정 가능한 기준으로 사용자 경험의 병목을 줄입니다.",
    groups: [{ items: ["Memoization", "Virtualization", "Web Worker", "Canvas"] }],
  },
];

const worklog = [
  { id: "experiments", label: "Projects / Experiments" },
  { id: "notes", label: "Notes" },
];

const articleIds: Record<string, ArticleId> = {
  "HTML 개요": "html-intro",
  "태그 개요": "tag-overview",
  "시맨틱 태그": "semantic-tags",
  "텍스트 태그": "text-tags",
  "목록 태그": "list-tags",
  "표 정리": "table",
  "이미지와 PDF": "image-pdf",
  "미디어 삽입": "media",
  Form: "form",
  fieldset: "fieldset",
  legend: "legend",
  "CSS 개요": "css-intro",
  "여백과 기본 선택자": "css-spacing-selectors",
  "글꼴 스타일": "css-fonts",
  "텍스트 스타일": "css-text-styles",
  "Box Model": "css-box-model",
  "Border와 radius": "css-borders",
  Background: "css-backgrounds",
  "Background 색상과 범위": "css-backgrounds",
  Gradient: "css-gradients",
  "페이지 배치": "css-layout",
  Flex: "css-flex",
  "Media Query": "css-responsive",
  ...Object.fromEntries(
    learningJavascriptChapters.map((chapter) => [
      `CHAPTER ${Number(chapter.number)} ${chapter.title}`,
      learningJavascriptArticleId(chapter.number),
    ]),
  ),
};

const articleByHash: Partial<Record<string, ArticleId>> = {
  "css-definition": "css-intro",
  "css-name": "css-intro",
  "css-syntax": "css-intro",
  "css-apply-methods": "css-intro",
  "css-keywords": "css-intro",
  "css-summary": "css-intro",
  "css-spacing-selectors": "css-spacing-selectors",
  "spacing": "css-spacing-selectors",
  "spacing-directions": "css-spacing-selectors",
  "margin-auto-negative": "css-spacing-selectors",
  "horizontal-centering": "css-spacing-selectors",
  "full-centering": "css-spacing-selectors",
  "site-container": "css-spacing-selectors",
  "spacing-utilities": "css-spacing-selectors",
  "css-fonts": "css-fonts",
  "font-properties": "css-fonts",
  "font-family": "css-fonts",
  "font-size": "css-fonts",
  "font-weight-style": "css-fonts",
  "line-height": "css-fonts",
  "font-shorthand": "css-fonts",
  "google-fonts": "css-fonts",
  "font-awesome": "css-fonts",
  "font-library": "css-fonts",
  "font-summary": "css-fonts",
  "css-text-styles": "css-text-styles",
  "text-properties": "css-text-styles",
  "text-color": "css-text-styles",
  "text-align": "css-text-styles",
  "text-line-height": "css-text-styles",
  "text-decoration": "css-text-styles",
  "text-shadow": "css-text-styles",
  "letter-spacing": "css-text-styles",
  "text-utilities": "css-text-styles",
  "text-summary": "css-text-styles",
  "css-box-model": "css-box-model",
  "box-model": "css-box-model",
  "box-sizing": "css-box-model",
  "box-shadow": "css-box-model",
  "display-flow": "css-box-model",
  "block-box": "css-box-model",
  "inline-box": "css-box-model",
  "inline-block-box": "css-box-model",
  "display-comparison": "css-box-model",
  "box-utilities": "css-box-model",
  "box-summary": "css-box-model",
  "css-borders": "css-borders",
  "border-basics": "css-borders",
  "border-styles": "css-borders",
  "border-directions": "css-borders",
  "border-values": "css-borders",
  "border-radius": "css-borders",
  "corner-radius": "css-borders",
  "radius-shapes": "css-borders",
  "border-utilities": "css-borders",
  "border-summary": "css-borders",
  "css-backgrounds": "css-backgrounds",
  "background-color": "css-backgrounds",
  "background-clip": "css-backgrounds",
  "background-examples": "css-backgrounds",
  "background-image": "css-backgrounds",
  "background-repeat": "css-backgrounds",
  "background-position": "css-backgrounds",
  "background-origin": "css-backgrounds",
  "background-attachment": "css-backgrounds",
  "background-size": "css-backgrounds",
  "background-shorthand": "css-backgrounds",
  "background-summary": "css-backgrounds",
  "css-gradients": "css-gradients",
  "linear-gradient": "css-gradients",
  "gradient-direction": "css-gradients",
  "gradient-stops": "css-gradients",
  "radial-gradient": "css-gradients",
  "radial-shape-position": "css-gradients",
  "radial-size": "css-gradients",
  "gradient-patterns": "css-gradients",
  "gradient-utilities": "css-gradients",
  "gradient-summary": "css-gradients",
  "css-layout": "css-layout",
  "layout-problems": "css-layout",
  "layout-methods": "css-layout",
  "flex-grid-compare": "css-layout",
  "flex-grid-together": "css-layout",
  "layout-decision": "css-layout",
  "layout-summary": "css-layout",
  "css-flex": "css-flex",
  "flex-definition": "css-flex",
  "flex-parent-child": "css-flex",
  "flex-inline-flex": "css-flex",
  "flex-axes": "css-flex",
  "flex-direction": "css-flex",
  "flex-wrap": "css-flex",
  "flex-flow": "css-flex",
  "justify-content": "css-flex",
  "align-items": "css-flex",
  "flex-gap": "css-flex",
  "align-content": "css-flex",
  "flex-item-properties": "css-flex",
  "flex-basis": "css-flex",
  "flex-grow": "css-flex",
  "flex-shrink": "css-flex",
  "flex-shorthand": "css-flex",
  "align-self": "css-flex",
  "flex-order": "css-flex",
  "flex-responsive": "css-flex",
  "flex-example": "css-flex",
  "flex-summary": "css-flex",
  "css-responsive": "css-responsive",
  "responsive-basics": "css-responsive",
  "viewport-meta": "css-responsive",
  "responsive-units": "css-responsive",
  "viewport-units": "css-responsive",
  "fluid-layout": "css-responsive",
  "responsive-images": "css-responsive",
  "media-query": "css-responsive",
  "mobile-first": "css-responsive",
  "media-features": "css-responsive",
  "responsive-example": "css-responsive",
  "responsive-summary": "css-responsive",
};

for (const chapter of learningJavascriptChapters) {
  const articleId = learningJavascriptArticleId(chapter.number);
  articleByHash[articleId] = articleId;
  for (const [topicNumber] of chapter.topics) {
    articleByHash[learningJavascriptTopicId(chapter.number, topicNumber)] = articleId;
  }
}

articleByHash["learning-js-03-study-notes"] = "learning-js-03";
articleByHash["learning-js-16-math-reference"] = "learning-js-16";

function articleIdForLabel(label: string): ArticleId | undefined {
  return articleIds[label];
}

function sectionIdForArticle(id: ArticleId): "html" | "css" | "javascript" {
  if (id.startsWith("learning-js-")) return "javascript";
  return id.startsWith("css-") ? "css" : "html";
}

type SearchItem = {
  label: string;
  section: string;
  view: View;
  anchor?: string;
  text?: string;
};

const menuSearchItems: SearchItem[] = sections.flatMap((section) => [
  { label: `${section.label} 개요`, section: section.label, view: { type: "category", id: section.id } as View },
  ...section.groups.flatMap((group) =>
    group.items.map((item) => ({
      label: item,
      section: group.label ? `${section.label} · ${group.label}` : section.label,
      view: articleIdForLabel(item)
        ? ({ type: "article", id: articleIdForLabel(item)! } as View)
        : ({ type: "category", id: section.id } as View),
    })),
  ),
]);

function normalizeSearchText(value: string) {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase("ko-KR")
    .replace(/[·_:()<>/\\.-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function searchItemRank(item: SearchItem, query: string) {
  const label = normalizeSearchText(item.label);
  const section = normalizeSearchText(item.section);
  const compactQuery = query.replaceAll(" ", "");
  const compactLabel = label.replaceAll(" ", "");

  if (label === query || compactLabel === compactQuery) return 0;
  if (label.startsWith(query) || compactLabel.startsWith(compactQuery)) return 1;
  if (label.includes(query) || compactLabel.includes(compactQuery)) return 2;
  if (section.includes(query) || section.replaceAll(" ", "").includes(compactQuery)) return 3;
  return 4;
}

function articleTreeForSearch(id: ArticleId): ReactNode {
  const navigate = () => undefined;

  if (id.startsWith("learning-js-")) {
    return LearningJavascriptArticle({
      id: id as LearningJavascriptArticleId,
      navigate,
    });
  }
  if (id === "css-intro") return CssIntroArticle({ navigate });
  if (id === "css-spacing-selectors") return CssSpacingSelectorsArticle({ navigate });
  if (id === "css-fonts") return CssFontsArticle({ navigate });
  if (id === "css-text-styles") return CssTextStylesArticle({ navigate });
  if (id === "css-box-model") return CssBoxModelArticle({ navigate });
  if (id === "css-borders") return CssBordersArticle({ navigate });
  if (id === "css-backgrounds") return CssBackgroundsArticle({ navigate });
  if (id === "css-gradients") return CssGradientsArticle({ navigate });
  if (id === "css-layout") return CssLayoutArticle({ navigate });
  if (id === "css-flex") return CssFlexArticle({ navigate });
  if (id === "css-responsive") return CssResponsiveArticle({ navigate });
  if (id !== "fieldset" && id !== "legend") {
    return ImportedHtmlArticle({
      id: id as Exclude<HtmlArticleId, "fieldset" | "legend">,
      navigate,
    });
  }
  return Article({ id, navigate });
}

function extractArticleSearchContent(id: ArticleId) {
  const intro: string[] = [];
  const sections: Array<{ label: string; anchor: string; text: string[] }> = [];
  let currentSection: (typeof sections)[number] | undefined;

  const addText = (value: string | number) => {
    const clean = String(value).replace(/\s+/g, " ").trim();
    if (!clean) return;
    (currentSection?.text ?? intro).push(clean);
  };

  const visit = (node: ReactNode): void => {
    if (node === null || node === undefined || typeof node === "boolean") return;
    if (typeof node === "string" || typeof node === "number") {
      addText(node);
      return;
    }
    if (Array.isArray(node)) {
      node.forEach(visit);
      return;
    }
    if (!isValidElement(node)) return;

    const props = node.props as Record<string, unknown>;

    if (node.type === ArticleHeading) {
      const label = String(props.title ?? "").replace(/^\d+\.\s*/, "");
      currentSection = { label, anchor: String(props.id ?? ""), text: [label] };
      sections.push(currentSection);
      return;
    }

    if (node.type === ImportedContent) {
      visit(ImportedContent({ id: props.id as Exclude<HtmlArticleId, "fieldset" | "legend"> }));
      return;
    }

    if (node.type === LearningProgressPanel) {
      visit(LearningProgressPanel({ progress: props.progress as ChapterLearningProgress }));
      return;
    }

    if (node.type === ChapterThreeStudyNotes) {
      visit(ChapterThreeStudyNotes());
      return;
    }

    if (node.type === ChapterFourStudyNotes) {
      visit(ChapterFourStudyNotes());
      return;
    }

    if (node.type === ChapterFiveStudyNotes) {
      visit(ChapterFiveStudyNotes());
      return;
    }

    if (node.type === PageActions || node.type === NextPage) return;

    visit(props.children as ReactNode);
    visit(props.title as ReactNode);
    visit(props.code as ReactNode);
    visit(props.headers as ReactNode);
    visit(props.rows as ReactNode);
    visit(props.alt as ReactNode);
  };

  visit(articleTreeForSearch(id));

  return {
    text: [...intro, ...sections.flatMap((section) => section.text)].join(" "),
    sections,
  };
}

function buildSearchItems(): SearchItem[] {
  const articleContent = new Map<ArticleId, ReturnType<typeof extractArticleSearchContent>>();
  const publishedArticleIds = Array.from(
    new Set(
      menuSearchItems.flatMap((item) => item.view.type === "article" ? [item.view.id] : []),
    ),
  );

  publishedArticleIds.forEach((id) => articleContent.set(id, extractArticleSearchContent(id)));

  const menuItemsWithContent = menuSearchItems.map((item) => {
    if (item.view.type !== "article") return item;
    return { ...item, text: articleContent.get(item.view.id)?.text };
  });

  const topicItems = publishedArticleIds.flatMap((id) => {
    const menuItem = menuSearchItems.find((item) => item.view.type === "article" && item.view.id === id);
    if (!menuItem) return [];

    return (articleContent.get(id)?.sections ?? []).map((topic) => ({
      label: topic.label,
      section: `${menuItem.section} · ${menuItem.label}`,
      view: { type: "article", id } as View,
      anchor: topic.anchor,
      text: topic.text.join(" "),
    }));
  });

  return [...menuItemsWithContent, ...topicItems];
}

function Logo() {
  return <span className="logo-mark" aria-hidden="true">&lt;<b>FE</b>/&gt;</span>;
}

export function FrontendLibrary() {
  const [view, setView] = useState<View>({ type: "overview" });
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const searchItems = useMemo(() => buildSearchItems(), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    let scrollFrame = 0;
    const openArticleFromHash = () => {
      const anchor = decodeURIComponent(window.location.hash.slice(1));
      const article = articleByHash[anchor];
      if (!article) return;

      setView({ type: "article", id: article });
      scrollFrame = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          document.getElementById(anchor)?.scrollIntoView();
        });
      });
    };

    openArticleFromHash();
    window.addEventListener("hashchange", openArticleFromHash);
    return () => {
      window.removeEventListener("hashchange", openArticleFromHash);
      window.cancelAnimationFrame(scrollFrame);
    };
  }, []);

  const navigate = (next: View) => {
    setView(next);
    setMenuOpen(false);
    setSearchOpen(false);
    setQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openSearchResult = (item: SearchItem) => {
    if (!item.anchor) {
      navigate(item.view);
      return;
    }

    setView(item.view);
    setMenuOpen(false);
    setSearchOpen(false);
    setQuery("");
    window.history.pushState(null, "", `#${encodeURIComponent(item.anchor)}`);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.getElementById(item.anchor!)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  };

  const results = useMemo(() => {
    const value = normalizeSearchText(query);
    if (!value) return searchItems.slice(0, 7);

    const tokens = value.split(" ").filter(Boolean);
    return searchItems
      .filter((item) => {
        const haystack = normalizeSearchText(`${item.label} ${item.section} ${item.text ?? ""}`);
        const compactHaystack = haystack.replaceAll(" ", "");
        return tokens.every((token) => haystack.includes(token) || compactHaystack.includes(token.replaceAll(" ", "")));
      })
      .sort((left, right) => searchItemRank(left, value) - searchItemRank(right, value) || left.label.localeCompare(right.label, "ko"))
      .slice(0, 8);
  }, [query, searchItems]);

  return (
    <div className="docs-app" data-theme={dark ? "dark" : "light"}>
      <TopBar
        dark={dark}
        menuOpen={menuOpen}
        navigate={navigate}
        onMenu={() => setMenuOpen((open) => !open)}
        onSearch={() => setSearchOpen(true)}
        onTheme={() => setDark((value) => !value)}
      />

      <DocsSidebar view={view} open={menuOpen} navigate={navigate} />
      {menuOpen && <button className="drawer-scrim" aria-label="메뉴 닫기" onClick={() => setMenuOpen(false)} />}

      <main className="docs-main">
        {view.type === "overview" && <Overview navigate={navigate} />}
        {view.type === "category" && <Category id={view.id} navigate={navigate} />}
        {view.type === "article" && <Article id={view.id} navigate={navigate} />}
      </main>

      {searchOpen && (
        <dialog
          open
          className="search-modal"
          aria-label="문서 검색"
        >
          <section>
            <div className="modal-input">
              <span className="magnifier" />
              <input
                ref={searchRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="문서 검색"
                aria-label="검색어"
              />
              <kbd>ESC</kbd>
            </div>
            <p className="result-label">{query ? "검색 결과" : "추천 문서"}</p>
            <div className="result-list">
              {results.map((item) => (
                <button key={`${item.section}-${item.label}-${item.anchor ?? "page"}`} onClick={() => openSearchResult(item)}>
                  <span><strong>{item.label}</strong><small>{item.section}</small></span><b>↵</b>
                </button>
              ))}
              {!results.length && <p className="no-result">일치하는 문서가 없습니다.</p>}
            </div>
          </section>
        </dialog>
      )}
    </div>
  );
}

function TopBar({
  dark,
  menuOpen,
  navigate,
  onMenu,
  onSearch,
  onTheme,
}: {
  dark: boolean;
  menuOpen: boolean;
  navigate: (view: View) => void;
  onMenu: () => void;
  onSearch: () => void;
  onTheme: () => void;
}) {
  return (
    <header className="topbar">
      <button className="menu-toggle" aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"} onClick={onMenu}>
        <span /><span /><span />
      </button>
      <button className="wordmark" onClick={() => navigate({ type: "overview" })}>
        <Logo /><strong>Frontend Library</strong><small>v1.0</small>
      </button>
      <button className="top-search" onClick={onSearch}>
        <span className="magnifier" /> <span>검색</span><kbd>⌘ K</kbd>
      </button>
      <nav className="topnav" aria-label="주요 메뉴">
        <button onClick={() => navigate({ type: "category", id: "getting-started" })}>학습하기</button>
        <button className="selected" onClick={() => navigate({ type: "overview" })}>참고서</button>
        <button onClick={() => navigate({ type: "category", id: "experiments" })}>실험실</button>
        <button onClick={() => navigate({ type: "category", id: "notes" })}>노트</button>
      </nav>
      <button className="icon-button" aria-label={dark ? "라이트 모드 사용" : "다크 모드 사용"} onClick={onTheme}>
        {dark ? "☼" : "◐"}
      </button>
    </header>
  );
}

function DocsSidebar({ view, open, navigate }: { view: View; open: boolean; navigate: (view: View) => void }) {
  const renderSectionButton = (section: Section) => {
    const active = (view.type === "category" && view.id === section.id) || (view.type === "article" && section.id === sectionIdForArticle(view.id));
    return (
      <div key={section.id}>
        <button className={active ? "active" : ""} onClick={() => navigate({ type: "category", id: section.id })}>
          {section.label}<span className="chevron">›</span>
        </button>
        {active && (
          <div className="active-tree">
            {section.groups.map((group, groupIndex) => (
              <div className="side-subgroup" key={group.label ?? groupIndex}>
                {group.label && <p>{group.label}</p>}
                {group.items.map((item) => (
                  <SidebarItem item={item} sectionId={section.id} view={view} navigate={navigate} key={item} />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className={`docs-sidebar ${open ? "open" : ""}`}>
      <nav aria-label="참고서 목차">
        <div className="side-group">
          <h3>Frontend Library</h3>
          <button
            className={view.type === "overview" ? "active" : ""}
            onClick={() => navigate({ type: "overview" })}
          >
            개요
          </button>
        </div>

        <div className="side-group">
          <h3>Core Concepts</h3>
          {sections.slice(0, 6).map(renderSectionButton)}
        </div>

        <div className="side-group">
          <h3>Web Platform</h3>
          {sections.slice(6).map(renderSectionButton)}
        </div>

        <div className="side-group">
          <h3>Worklog</h3>
          {worklog.map((item) => (
            <button
              key={item.id}
              className={view.type === "category" && view.id === item.id ? "active" : ""}
              onClick={() => navigate({ type: "category", id: item.id })}
            >
              {item.label}<span className="chevron">›</span>
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
}

function SidebarItem({ item, sectionId, view, navigate }: { item: string; sectionId: string; view: View; navigate: (view: View) => void }) {
  const article = articleIdForLabel(item);
  const active = article && view.type === "article" && view.id === article;
  return (
    <button
      className={active ? "active" : ""}
      onClick={() => navigate(article ? { type: "article", id: article } : { type: "category", id: sectionId })}
    >
      {item}<span className="chevron">›</span>
    </button>
  );
}

function PageActions() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };
  return <button className="copy-page" onClick={copy}>{copied ? "✓ 복사됨" : "▣ 페이지 복사"}</button>;
}

function Overview({ navigate }: { navigate: (view: View) => void }) {
  return (
    <DocsFrame toc={["HTML", "CSS", "JavaScript", "TypeScript", "React", "Browser", "Performance"]}>
      <article className="prose">
        <PageActions />
        <a className="breadcrumb-link" href="#top" onClick={(event) => { event.preventDefault(); navigate({ type: "overview" }); }}>참고서 <span>›</span></a>
        <h1 id="top">Frontend Library 개요</h1>
        <p className="lead">이 섹션은 프론트엔드를 공부하며 이해한 개념과 직접 확인한 실험을 주제별 참고서로 제공합니다. 처음 보는 내용이라면 <InlineButton onClick={() => navigate({ type: "category", id: "getting-started" })}>학습하기</InlineButton> 섹션을 참고하세요.</p>
        <p>Frontend Library는 다음과 같은 기능적인 하위 섹션으로 구성되어 있습니다.</p>

        <ReferenceSection id="html" title="HTML" description="문서의 구조와 의미, 접근성을 만드는 마크업." items={[
          ["Semantic", "콘텐츠의 역할을 올바른 요소로 표현합니다."],
          ["Form", "사용자의 입력을 의미 있는 구조로 수집합니다."],
          ["Accessibility", "다양한 사용자가 같은 정보에 접근하도록 설계합니다."],
        ]} onTitle={() => navigate({ type: "category", id: "html" })} />
        <ReferenceSection id="css" title="CSS" description="브라우저가 요소의 크기와 위치, 모양을 계산하는 방식." items={[
          ["Core", "Box Model과 Cascade의 기본 원리를 다룹니다."],
          ["Layout", "Flex, Grid, Position으로 배치 규칙을 만듭니다."],
          ["Responsive", "화면이 아닌 콘텐츠를 기준으로 변화하게 합니다."],
        ]} onTitle={() => navigate({ type: "category", id: "css" })} />
        <ReferenceSection id="javascript" title="러닝 자바스크립트" description="책의 목차, 질문, 이해의 변화를 연결하는 개인 학습 위키." items={[
          ["22개 챕터", "책의 상위·하위 목차를 순서대로 연결합니다."],
          ["키워드 위키", "챕터를 넘어 반복되는 개념의 관계를 기록합니다."],
          ["학습 변화", "몰랐던 점, 알게 된 점, 다음 질문을 누적합니다."],
        ]} onTitle={() => navigate({ type: "category", id: "javascript" })} />
        <ReferenceSection id="typescript" title="TypeScript" description="컴파일 전에 의도를 검증하는 타입 시스템." items={[
          ["Type System", "타입 추론과 Narrowing으로 안전한 경계를 만듭니다."],
          ["Generic", "관계는 유지하면서 재사용할 수 있는 타입을 작성합니다."],
          ["Utility Type", "기존 타입을 목적에 맞게 변환합니다."],
        ]} onTitle={() => navigate({ type: "category", id: "typescript" })} />
        <ReferenceSection id="react" title="React" description="상태를 UI로 변환하는 컴포넌트 모델." items={[
          ["Rendering", "렌더 사이클과 Reconciliation을 다룹니다."],
          ["State", "컴포넌트가 기억하고 공유하는 값을 이해합니다."],
          ["Hooks", "컴포넌트에서 React 기능을 사용합니다."],
        ]} onTitle={() => navigate({ type: "category", id: "react" })} />
        <ReferenceSection id="browser" title="Browser" description="네트워크 요청이 화면의 픽셀이 되기까지." items={[
          ["Rendering Pipeline", "파싱, 스타일 계산, 레이아웃, 페인트 과정을 살펴봅니다."],
          ["Reflow / Repaint", "화면 변경의 비용이 어디에서 생기는지 확인합니다."],
          ["Network", "요청과 캐시가 로딩 경험에 미치는 영향을 정리합니다."],
        ]} onTitle={() => navigate({ type: "category", id: "browser" })} />
        <ReferenceSection id="performance" title="Performance" description="측정하고 병목을 줄이는 프론트엔드 최적화." items={[
          ["Memoization", "다시 계산할 필요가 없는 값을 식별합니다."],
          ["Virtualization", "화면에 필요한 항목만 렌더링합니다."],
          ["Web Worker", "무거운 작업을 메인 스레드에서 분리합니다."],
        ]} onTitle={() => navigate({ type: "category", id: "performance" })} />

        <NextPage label="HTML" onClick={() => navigate({ type: "category", id: "html" })} />
      </article>
    </DocsFrame>
  );
}

function ReferenceSection({ id, title, description, items, onTitle }: { id: string; title: string; description: string; items: string[][]; onTitle: () => void }) {
  return (
    <section id={id} className="reference-section">
      <h2>{title}<a href={`#${id}`} aria-label={`${title} 링크`}>#</a></h2>
      <p>{description}</p>
      <ul>
        {items.map(([label, text]) => <li key={label}><button onClick={onTitle}>{label}</button> — {text}</li>)}
      </ul>
    </section>
  );
}

function LearningJavascriptLibrary({ navigate }: { navigate: (view: View) => void }) {
  const studied = Object.values(learningProgressByChapter);
  const learnedCount = studied.reduce((count, progress) => count + progress.learned.length, 0);
  const questionCount = studied.reduce((count, progress) => count + progress.questions.length, 0);
  const toc: Array<[string, string]> = [
    ["학습 현황", "learning-status"],
    ["지금까지 배운 것", "learned-library"],
    ["전체 챕터", "chapter-library"],
  ];

  return (
    <DocsFrame toc={toc}>
      <article className="prose learning-library">
        <PageActions />
        <button className="breadcrumb-button" onClick={() => navigate({ type: "overview" })}>참고서 <span>›</span></button>
        <p className="chapter-kicker">PERSONAL STUDY LIBRARY</p>
        <h1>러닝 자바스크립트</h1>
        <p className="lead">책의 목차와 실제 질문을 연결해, 무엇을 몰랐고 무엇을 알게 되었는지 다시 찾는 개인 학습 라이브러리입니다.</p>

        <section className="learning-dashboard" id="learning-status">
          <div><strong>{studied.length}</strong><span>학습한 챕터</span></div>
          <div><strong>{learnedCount}</strong><span>정리된 배움</span></div>
          <div><strong>{questionCount}</strong><span>기록된 질문</span></div>
          <div><strong>{learningJavascriptChapters.length - studied.length}</strong><span>학습 전 챕터</span></div>
        </section>

        <ArticleHeading id="learned-library" title="지금까지 배운 것" />
        <div className="learned-chapter-grid">
          {studied.map((progress) => {
            const chapter = learningJavascriptChapters.find((item) => item.number === progress.chapter)!;
            return (
              <button key={progress.chapter} onClick={() => navigate({ type: "article", id: learningJavascriptArticleId(progress.chapter) })}>
                <span>CHAPTER {Number(progress.chapter)} · {learningProgressLabels[progress.status]}</span>
                <strong>{chapter.title}</strong>
                <ul>{progress.learned.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul>
                <small>배운 내용 {progress.learned.length}개 · 남은 질문 {progress.remaining.length}개</small>
              </button>
            );
          })}
        </div>

        <ArticleHeading id="chapter-library" title="전체 챕터" />
        <div className="chapter-library-grid">
          {learningJavascriptChapters.map((chapter) => {
            const progress = learningProgressByChapter[chapter.number];
            return (
              <button key={chapter.number} onClick={() => navigate({ type: "article", id: learningJavascriptArticleId(chapter.number) })}>
                <span>{chapter.number}</span>
                <strong>{chapter.title}</strong>
                <small className={progress ? "studied" : "not-started"}>{progress ? learningProgressLabels[progress.status] : "학습 전"}</small>
              </button>
            );
          })}
        </div>

        <NextPage label="CHAPTER 1 첫 번째 애플리케이션" onClick={() => navigate({ type: "article", id: "learning-js-01" })} />
      </article>
    </DocsFrame>
  );
}

function Category({ id, navigate }: { id: string; navigate: (view: View) => void }) {
  if (id === "javascript") return <LearningJavascriptLibrary navigate={navigate} />;

  const fallback = id === "experiments"
    ? { id, label: "Projects / Experiments", description: "직접 구현하면서 확인한 가설과 결과를 기록합니다.", groups: [{ label: "Experiments", items: ["Canvas Lab", "Virtual List", "UI Patterns"] }] }
    : { id, label: "Notes", description: "짧은 개념 정리와 디버깅 기록을 모읍니다.", groups: [{ label: "Latest", items: ["오늘 배운 것", "삽질 기록", "코드 조각"] }] };
  const section = sections.find((item) => item.id === id) ?? fallback;
  const toc = section.groups.map((group) => group.label || section.label);
  return (
    <DocsFrame toc={toc}>
      <article className="prose">
        <PageActions />
        <button className="breadcrumb-button" onClick={() => navigate({ type: "overview" })}>참고서 <span>›</span></button>
        <h1>{section.label}</h1>
        <p className="lead">{section.description}</p>
        <p>각 문서는 개념을 정의하는 데서 끝나지 않고, 필요한 이유와 브라우저의 동작, 직접 확인할 수 있는 코드, 헷갈렸던 부분을 함께 다룹니다.</p>
        {section.groups.map((group, index) => {
          const heading = group.label || section.label;
          const anchor = heading.toLowerCase().replaceAll(" ", "-");
          return (
            <section className="reference-section" id={anchor} key={`${heading}-${index}`}>
              <h2>{heading}<a href={`#${anchor}`} aria-label={`${heading} 링크`}>#</a></h2>
              <ul className="doc-links">
                {group.items.map((item) => {
                  const articleId = articleIdForLabel(item);
                  const published = Boolean(articleId);
                  return (
                    <li key={item}>
                      <button disabled={!published} onClick={() => articleId && navigate({ type: "article", id: articleId })}>{item}</button>
                      <span> — {published ? "학습 내용과 코드 예제를 정리한 문서입니다." : "정리 중"}</span>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
        <NextPage
          label={section.id === "html" ? "HTML 개요" : section.id === "css" ? "CSS 개요" : section.id === "javascript" ? "CHAPTER 1 첫 번째 애플리케이션" : "HTML"}
          onClick={() => navigate(section.id === "html" ? { type: "article", id: "html-intro" } : section.id === "css" ? { type: "article", id: "css-intro" } : section.id === "javascript" ? { type: "article", id: "learning-js-01" } : { type: "category", id: "html" })}
        />
      </article>
    </DocsFrame>
  );
}

function LearningJavascriptArticle({ id, navigate }: { id: LearningJavascriptArticleId; navigate: (view: View) => void }) {
  const number = id.replace("learning-js-", "");
  const chapter = learningJavascriptChapters.find((item) => item.number === number) ?? learningJavascriptChapters[0];
  const chapterIndex = learningJavascriptChapters.indexOf(chapter);
  const nextChapter = learningJavascriptChapters[chapterIndex + 1];
  const progress = learningProgressByChapter[chapter.number];
  const isChapterFive = chapter.number === "05";
  const toc: Array<[string, string]> = isChapterFive ? [
    ["5장에서 배우는 것", `${id}-overview`],
    ["1. 표현식과 연산자", `${id}-expression`],
    ["2. 산술과 비교", `${id}-arithmetic`],
    ["3. 논리 연산자", `${id}-logic`],
    ["4. 조건과 쉼표", `${id}-choice`],
    ["5. typeof와 할당", `${id}-assignment`],
    ["6. 객체와 배열", `${id}-objects`],
    ["핵심 암기", `${id}-summary`],
  ] : [
    ["학습 관점", `${id}-perspective`],
    ...(progress ? [["내 학습 기록", `${id}-my-progress`] as [string, string]] : []),
    ...(chapter.number === "03" ? [["75~91쪽 핵심 노트", `${id}-study-notes`] as [string, string]] : []),
    ...(chapter.number === "04" ? [["4장 전체 복습", `${id}-study-notes`] as [string, string]] : []),
    ...(chapter.number === "16" ? [["Math 빠른 참고서", `${id}-math-reference`] as [string, string]] : []),
    ["핵심 키워드", `${id}-keywords`],
    ...chapter.topics.map(([topicNumber, title]) => [`${topicNumber} ${title}`, learningJavascriptTopicId(chapter.number, topicNumber)] as [string, string]),
    ["현재 기준 보충", `${id}-modern`],
    ["외부 참고자료", `${id}-resources`],
    ["질문 후 기록", `${id}-journal`],
  ];

  return (
    <DocsFrame toc={toc}>
      <article className="prose article-prose learning-js-article">
        <PageActions />
        <button className="breadcrumb-button" onClick={() => navigate({ type: "category", id: "javascript" })}>러닝 자바스크립트 <span>›</span> CHAPTER {Number(chapter.number)}</button>
        <p className="chapter-kicker">LEARNING JAVASCRIPT · CHAPTER {chapter.number}</p>
        <h1>{chapter.title}</h1>
        <p className="lead">{chapter.summary}</p>

        {!isChapterFive && <section className="learning-perspective" id={`${id}-perspective`}>
          <h2>학습 관점<a href={`#${id}-perspective`} aria-label="학습 관점 링크">#</a></h2>
          <p>이 페이지는 책 내용을 복제하는 공간이 아니라, 목차를 기준으로 개념과 질문을 연결하는 학습 지도입니다.</p>
          <ul>
            <li><strong>읽기 전:</strong> 이 개념을 지금 어떻게 이해하고 있는지 적습니다.</li>
            <li><strong>질문 후:</strong> 몰랐던 전제와 새로 생긴 관점을 기록합니다.</li>
            <li><strong>챕터 이동 시:</strong> 이전 질문이 새 챕터와 어떻게 연결되는지 갱신합니다.</li>
          </ul>
        </section>}

        {chapter.number === "05" && <ChapterFiveStudyNotes />}
        {progress && !isChapterFive && <LearningProgressPanel progress={progress} />}
        {chapter.number === "03" && <ChapterThreeStudyNotes />}
        {chapter.number === "04" && <ChapterFourStudyNotes />}
        {chapter.number === "16" && <MathQuickReference />}

        {!isChapterFive && <>
        <ArticleHeading id={`${id}-keywords`} title="핵심 키워드" />
        <div className="learning-keywords" aria-label={`챕터 ${Number(chapter.number)} 핵심 키워드`}>
          {chapter.keywords.map((keyword) => <a key={keyword} href={`#${id}-journal`}>#{keyword}</a>)}
        </div>

        <section className="chapter-topic-list" aria-label={`챕터 ${Number(chapter.number)} 하위 목차`}>
          {chapter.topics.map(([topicNumber, title]) => {
            const topicId = learningJavascriptTopicId(chapter.number, topicNumber);
            return (
              <div id={topicId} key={topicNumber}>
                <span>{topicNumber}</span>
                <h2>{title}<a href={`#${topicId}`} aria-label={`${topicNumber} ${title} 링크`}>#</a></h2>
                <p>이 절을 읽을 때 <strong>“무엇을 해결하기 위한 개념인가?”</strong>, <strong>“코드는 어떤 순서로 실행되는가?”</strong>, <strong>“비슷한 개념과 무엇이 다른가?”</strong>를 확인합니다.</p>
              </div>
            );
          })}
        </section>
        </>}

        {!isChapterFive && <>
        <ArticleHeading id={`${id}-modern`} title="현재 기준 보충" />
        <Note title="2017년 책과 현재 환경을 함께 보기">{chapter.modernNote}</Note>

        <ArticleHeading id={`${id}-resources`} title="외부 참고자료" />
        <ul className="external-resources">
          {chapter.resources.map(([label, url]) => <li key={url}><a href={url} target="_blank" rel="noreferrer">{label}</a></li>)}
        </ul>

        <ArticleHeading id={`${id}-journal`} title="질문 후 기록" />
        <div className="learning-journal-template">
          <p><strong>내 질문</strong><span>챕터 번호와 함께 실제로 궁금했던 문장을 기록합니다.</span></p>
          <p><strong>질문의 숨은 전제</strong><span>무엇을 이미 안다고 생각했는지, 어떤 용어를 혼동했는지 적습니다.</span></p>
          <p><strong>새로 알게 된 것</strong><span>답을 통해 바뀐 이해를 이전 생각과 비교해 적습니다.</span></p>
          <p><strong>아직 모르는 것</strong><span>다음에 확인할 질문과 실험을 남깁니다.</span></p>
          <p><strong>다음 챕터 연결</strong><span>새 챕터가 이전 질문을 확장하거나 수정하는 지점을 연결합니다.</span></p>
        </div>
        </>}

        <NextPage
          label={nextChapter ? `CHAPTER ${Number(nextChapter.number)} ${nextChapter.title}` : "러닝 자바스크립트 목차"}
          onClick={() => navigate(nextChapter ? { type: "article", id: learningJavascriptArticleId(nextChapter.number) } : { type: "category", id: "javascript" })}
        />
      </article>
    </DocsFrame>
  );
}

function ChapterThreeStudyNotes() {
  return (
    <section className="chapter-study-notes" id="learning-js-03-study-notes">
      <div className="chapter-study-notes-heading">
        <span>CHAPTER 3 · 75–91쪽 + 객체 연결</span>
        <h2>값에 이름을 붙이고, 객체 안의 값까지 찾아가는 법</h2>
        <p>식별자와 리터럴에서 시작해 데이터 타입을 구분하고, 객체의 프로퍼티를 읽는 과정까지 한 흐름으로 연결합니다.</p>
      </div>

      <div className="code-anatomy" aria-label="const drink 코드 구성">
        <span><code>const</code><small>선언 키워드</small></span>
        <span><code>drink</code><small>식별자</small></span>
        <span><code>=</code><small>대입</small></span>
        <span><code>&quot;커피&quot;</code><small>문자열 리터럴</small></span>
      </div>

      <div className="concept-connection">
        <div><strong>식별자</strong><p>값이나 대상을 찾아가기 위한 이름</p><code>drink</code></div>
        <b aria-hidden="true">→</b>
        <div><strong>값</strong><p>프로그램이 실제로 다루는 데이터</p><code>&quot;커피&quot;</code></div>
        <b aria-hidden="true">←</b>
        <div><strong>리터럴</strong><p>값을 코드에 직접 적는 표현</p><code>&quot;커피&quot;</code></div>
      </div>

      <div className="study-note-grid">
        <article>
          <span>01</span><h3>변수와 상수</h3>
          <p><code>let</code>은 다시 대입할 값, <code>const</code>는 다시 대입하지 않을 값에 사용합니다.</p>
          <pre><code>{`let temperature = 20;\ntemperature = 25;\nconst name = "희준";`}</code></pre>
        </article>
        <article>
          <span>02</span><h3>원시 타입과 객체</h3>
          <p>숫자·문자열·불리언·심볼·null·undefined는 기본 값이며, 객체는 이름표가 붙은 여러 값을 묶습니다.</p>
          <pre><code>{`const person = {\n  name: "희준",\n  age: 20\n};`}</code></pre>
        </article>
        <article>
          <span>03</span><h3>유니코드 문자열</h3>
          <p>문자열은 유니코드 문자로 이루어진 텍스트입니다. 한글·영어·이모지를 같은 문자 체계에서 다룹니다.</p>
          <pre><code>{`const text = "안녕 😀";\nconst ga = "\\uAC00"; // 가`}</code></pre>
        </article>
        <article>
          <span>04</span><h3>백틱과 템플릿 리터럴</h3>
          <p>백틱 안의 <code>${"${}"}</code>에는 식별자나 계산식을 넣을 수 있고 여러 줄도 그대로 작성할 수 있습니다.</p>
          <pre><code>{`const drink = "커피";\nconst message = \`음료는 \${drink}입니다.\`;`}</code></pre>
        </article>
        <article>
          <span>05</span><h3>숫자와 문자열</h3>
          <p><code>30</code>과 <code>&quot;30&quot;</code>은 다른 타입입니다. 자동 변환에 기대지 말고 필요한 타입을 명확히 만듭니다.</p>
          <pre><code>{`3 + "30";        // "330"\n3 * "30";        // 90\n3 + Number("30"); // 33`}</code></pre>
        </article>
        <article>
          <span>06</span><h3>불리언·심볼·빈 값</h3>
          <p><code>true</code>와 <code>false</code>는 불리언, Symbol은 고유한 값, null과 undefined는 값이 없는 서로 다른 상황을 나타냅니다.</p>
          <pre><code>{`Symbol("id") === Symbol("id"); // false\nlet pending;                     // undefined\nconst selected = null;`}</code></pre>
        </article>
      </div>

      <div className="object-access-library">
        <div className="object-access-heading">
          <span>OBJECT ACCESS</span>
          <h3>객체·프로퍼티·멤버·메서드</h3>
          <p>객체 안의 이름표가 붙은 값을 <strong>프로퍼티</strong>라 하고, 객체 구성 요소를 일반적으로 <strong>멤버</strong>라고 합니다. 값이 함수이면 <strong>메서드</strong>입니다.</p>
        </div>

        <div className="object-tree" aria-label="person 객체 구조">
          <strong>person 객체</strong>
          <span>├─ <code>name</code> → <code>&quot;희준&quot;</code></span>
          <span>├─ <code>age</code> → <code>20</code></span>
          <span>└─ <code>sayHello</code> → 함수, 즉 메서드</span>
        </div>

        <div className="access-comparison">
          <article>
            <h4>점 표기법 <code>.</code></h4>
            <p>프로퍼티 이름을 코드에 직접 알고 있을 때 가장 읽기 쉽습니다.</p>
            <pre><code>{`person.name\nevent.point.x\npaper.view.draw()`}</code></pre>
          </article>
          <article>
            <h4>대괄호 표기법 <code>[]</code></h4>
            <p>이름을 변수로 결정하거나 공백·특수문자·Symbol을 프로퍼티 키로 사용할 때 필요합니다.</p>
            <pre><code>{`const key = "name";\nperson[key];\nperson[secretKey];`}</code></pre>
          </article>
        </div>

        <div className="access-warning">
          <code>person.key</code><span>→ 이름이 실제로 <strong>key</strong>인 프로퍼티</span>
          <code>person[key]</code><span>→ <strong>key 변수의 값</strong>을 프로퍼티 이름으로 사용</span>
        </div>

        <div className="paper-code-reading">
          <strong>Paper.js 코드를 읽는 순서</strong>
          <p><code>paper.view.draw()</code>는 paper에서 view 프로퍼티를 찾고, view에서 draw 메서드를 찾아 실행합니다.</p>
          <p><code>event.point.x</code>는 event에서 point 객체를 찾고, 그 안에서 x 값을 가져옵니다.</p>
        </div>
      </div>

      <p className="study-note-summary"><strong>한 문장 정리:</strong> 프로그램은 리터럴이나 계산으로 값을 만들고 식별자로 그 값을 찾아가며, 객체에서는 프로퍼티 이름과 멤버 접근 연산자를 이용해 내부 값과 메서드를 사용합니다.</p>
    </section>
  );
}

function ChapterFourStudyNotes() {
  return (
    <section className="chapter-study-notes control-flow-reference" id="learning-js-04-study-notes">
      <div className="chapter-study-notes-heading">
        <span>CHAPTER 4 · 질문에서 다시 만든 전체 복습</span>
        <h2>제어문은 코드가 다음에 어디로 갈지를 정한다</h2>
        <p>조건문은 실행할 길을 고르고, 반복문은 같은 길을 다시 걷게 합니다. 코드를 외우기보다 조건 검사와 변수 변화의 순서를 따라갑니다.</p>
      </div>

      <div className="control-flow-core" aria-label="제어문의 두 역할">
        <article><span>선택</span><strong>조건에 따라 길을 고른다</strong><code>if · else · switch</code></article>
        <b aria-hidden="true">+</b>
        <article><span>반복</span><strong>조건에 따라 다시 실행한다</strong><code>while · do...while · for</code></article>
      </div>

      <div className="study-note-grid">
        <article>
          <span>01</span><h3>블록문</h3>
          <p>중괄호로 여러 문장을 하나의 실행 단위로 묶습니다. 들여쓰기는 사람이 구조를 읽도록 돕고, 실제 경계는 중괄호가 만듭니다.</p>
          <pre><code>{`if (funds > 0) {\n  round++;\n  console.log(round);\n}`}</code></pre>
        </article>
        <article>
          <span>02</span><h3>보조 함수</h3>
          <p>큰 작업의 작은 책임을 이름 붙여 분리합니다. <code>rand</code>는 정수 생성, <code>randFace</code>는 면 선택을 담당합니다.</p>
          <pre><code>{`function rand(min, max) {\n  return min + Math.floor(\n    (max - min + 1) * Math.random()\n  );\n}`}</code></pre>
        </article>
        <article>
          <span>03</span><h3>조건에 따른 선택</h3>
          <p><code>if...else</code>는 참과 거짓의 두 길을 고릅니다. 후보 값이 여러 개라면 <code>switch</code>로 같은 값을 여러 <code>case</code>와 비교할 수 있습니다.</p>
          <pre><code>{`if (totalBet === 7) {\n  // 특별 규칙\n} else {\n  // 일반 규칙\n}`}</code></pre>
        </article>
        <article>
          <span>04</span><h3>반복 제어</h3>
          <p><code>break</code>는 반복을 끝내고, <code>continue</code>는 이번 반복만 건너뛰며, <code>return</code>은 함수 전체를 끝냅니다.</p>
          <pre><code>{`for (const value of values) {\n  if (value < 0) continue;\n  if (value === target) break;\n}`}</code></pre>
        </article>
      </div>

      <div className="control-flow-loop-table">
        <h3>반복문을 고르는 기준</h3>
        <DocsTable
          headers={["문법", "실행 순서", "잘 맞는 상황"]}
          rows={[
            [<code key="while">while</code>, "조건 → 본문 → 조건", "몇 번 반복할지 모르고 종료 조건이 중요할 때"],
            [<code key="do-while">do...while</code>, "본문 → 조건 → 본문", "조건과 관계없이 최소 한 번은 실행해야 할 때"],
            [<code key="for">for</code>, "초기화 1회 → 조건 → 본문 → 변화", "횟수·인덱스·증감이 한눈에 보여야 할 때"],
            [<code key="for-in">for...in</code>, "프로퍼티 이름을 하나씩", "일반 객체의 이름표를 확인할 때"],
            [<code key="for-of">for...of</code>, "이터러블의 값을 하나씩", "배열·문자열의 실제 값이 필요할 때"],
          ]}
        />
      </div>

      <div className="chapter-study-notes-heading control-flow-meta-heading">
        <span>META SYNTAX</span>
        <h2><code>for</code> 문법 설명을 실제 실행 순서로 읽기</h2>
        <p>아래 영어는 입력해야 하는 키워드가 아니라 각 자리에 들어갈 코드의 역할을 설명하는 이름입니다.</p>
      </div>

      <div className="code-anatomy control-flow-for-anatomy" aria-label="for 문법의 네 부분">
        <span><code>initialization</code><small>시작 준비 · 한 번</small></span>
        <span><code>condition</code><small>반복 전마다 검사</small></span>
        <span><code>statement</code><small>조건이 참이면 실행</small></span>
        <span><code>finalExpression</code><small>본문 뒤마다 실행</small></span>
      </div>

      <SimpleCode language="JAVASCRIPT" code={'for (let i = 0; i < 3; i++) {\n  console.log(i);\n}\n\n// 실행 순서\n// let i = 0  → 한 번\n// i < 3      → 반복 전 검사\n// console.log(i)\n// i++        → 반복 후 변화\n// 다시 i < 3 검사'} />

      <div className="access-comparison control-flow-in-of">
        <article>
          <h4><code>for...in</code> — 이름표</h4>
          <p>배열에서는 <code>&quot;0&quot;</code>, <code>&quot;1&quot;</code> 같은 인덱스 이름이, 객체에서는 <code>&quot;a&quot;</code>, <code>&quot;b&quot;</code> 같은 프로퍼티 이름이 나옵니다.</p>
          <pre><code>{`const fruits = ["사과", "바나나"];\n\nfor (const index in fruits) {\n  console.log(index);\n  // "0", "1"\n}`}</code></pre>
        </article>
        <article>
          <h4><code>for...of</code> — 내용물</h4>
          <p>배열이나 문자열처럼 순서대로 값을 제공하는 이터러블에서 실제 값을 바로 꺼냅니다.</p>
          <pre><code>{`const fruits = ["사과", "바나나"];\n\nfor (const fruit of fruits) {\n  console.log(fruit);\n  // "사과", "바나나"\n}`}</code></pre>
        </article>
      </div>

      <div className="access-warning control-flow-label-value">
        <code>for...in</code><span>“어느 이름·위치인가?” → <strong>index 또는 key</strong></span>
        <code>for...of</code><span>“그 안에 무엇이 있는가?” → <strong>value</strong></span>
      </div>

      <div className="chapter-study-notes-heading control-flow-game-heading">
        <span>BOOK EXAMPLE · 베팅 시뮬레이션</span>
        <h2>여러 제어문을 하나의 실행 흐름으로 합치기</h2>
        <p>이 예제의 목적은 실제 사용자가 돈을 입력하게 만드는 것이 아니라, 프로그램이 자동 플레이어가 되어 조건·반복·함수를 함께 실행하는 과정을 보는 것입니다.</p>
      </div>

      <div className="control-flow-roadmap" aria-label="베팅 예제 실행 순서">
        <span><b>1</b>자금 확인<small><code>while</code></small></span>
        <i aria-hidden="true">→</i>
        <span><b>2</b>라운드 시작<small><code>round++</code></small></span>
        <i aria-hidden="true">→</i>
        <span><b>3</b>전체 베팅액 결정<small><code>rand</code></small></span>
        <i aria-hidden="true">→</i>
        <span><b>4</b>금액 분배<small><code>do...while</code></small></span>
        <i aria-hidden="true">→</i>
        <span><b>5</b>면 뽑기<small><code>for</code></small></span>
        <i aria-hidden="true">→</i>
        <span><b>6</b>당첨 비교<small><code>for...in</code></small></span>
        <i aria-hidden="true">→</i>
        <span><b>7</b>자금 갱신<small>다음 반복</small></span>
      </div>

      <div className="study-note-grid control-flow-game-notes">
        <article>
          <span>왜 무작위 금액인가?</span><h3>사용자 입력이 아닌 자동 시뮬레이션</h3>
          <p><code>totalBet = rand(1, funds)</code>는 사람이 입력한 값이 아닙니다. 예제 프로그램이 여러 라운드를 자동 실행하려고 이번 판의 총액을 정합니다.</p>
          <pre><code>{`let totalBet = rand(1, funds);`}</code></pre>
        </article>
        <article>
          <span>왜 7을 검사하는가?</span><h3>언어 규칙이 아닌 예제 규칙</h3>
          <p>무작위 결과가 7이면 7만 거는 것이 아니라, 작성자가 정한 특별 규칙에 따라 전체 자금을 한 면에 겁니다. 다른 프로그램에서는 전혀 다른 규칙을 만들 수 있습니다.</p>
          <pre><code>{`if (totalBet === 7) {\n  totalBet = funds;\n  bets.c = totalBet;\n}`}</code></pre>
        </article>
      </div>

      <div className="control-flow-loop-table">
        <h3>기본 제공 기능과 예제에서 만든 이름 구분</h3>
        <DocsTable
          headers={["이름", "정체", "역할"]}
          rows={[
            [<code key="math-random">Math.random()</code>, "자바스크립트 기본 기능", "0 이상 1 미만의 난수 생성"],
            [<code key="math-floor">Math.floor()</code>, "자바스크립트 기본 기능", "소수점 아래를 내림"],
            [<code key="map">array.map()</code>, "배열의 기본 메서드", "각 값을 변환해 새 배열 생성"],
            [<code key="object-keys">Object.keys()</code>, "객체의 기본 기능", "프로퍼티 이름 배열 생성"],
            [<code key="rand">rand()</code>, "예제에서 만든 보조 함수", "지정 범위의 정수 난수 생성"],
            [<code key="rand-face">randFace()</code>, "예제에서 만든 보조 함수", "a~f 중 한 면 선택"],
            [<code key="roll">roll</code>, "예제에서 정한 변수 이름", "몇 번째로 면을 뽑는지 세는 값"],
          ]}
        />
      </div>

      <div className="math-warnings control-flow-warnings">
        <p><strong>템플릿 리터럴:</strong> 값 삽입은 따옴표가 아니라 백틱을 사용합니다. <code>{'`round ${round}`'}</code></p>
        <p><strong>탭 문자:</strong> <code>\\tstarting</code>에서 <code>\\t</code>는 들여쓰기이고 <code>starting</code>은 그 뒤의 일반 단어입니다.</p>
        <p><strong>동적 프로퍼티:</strong> <code>bets.face</code>는 이름이 정말 <code>face</code>인 프로퍼티를 찾고, <code>bets[face]</code>는 변수에 든 <code>&quot;a&quot;</code> 같은 이름을 사용합니다.</p>
        <p><strong>switch:</strong> 일치하는 <code>case</code>가 없으면 <code>default</code>를 실행하며, <code>default</code>도 없으면 아무 case도 실행하지 않습니다.</p>
      </div>

      <p className="study-note-summary"><strong>한 문장 정리:</strong> 제어문을 읽을 때는 “조건을 언제 검사하는가?”, “이번 반복의 변수에는 무엇이 들어오는가?”, “어떤 값이 바뀐 뒤 어디로 돌아가는가?”를 순서대로 추적합니다.</p>
    </section>
  );
}

export function LegacyChapterFiveStudyNotes() {
  const keywordGroups = [
    { title: "코드 읽기", target: "learning-js-05-expressions", keywords: ["표현식", "연산자", "피연산자", "평가", "결과값", "부수 효과", "우선순위"] },
    { title: "숫자와 비교", target: "learning-js-05-numbers", keywords: ["number", "double", "NaN", "Infinity", "0.1 오차", "==="] },
    { title: "논리와 선택", target: "learning-js-05-logic", keywords: ["truthy", "falsy", "&&", "||", "!", "단축 평가"] },
    { title: "두 값 중 선택", target: "learning-js-05-selection", keywords: ["조건 연산자", "?:", "쉼표 연산자", "y++", "++y"] },
    { title: "확인과 저장", target: "learning-js-05-toolbox", keywords: ["typeof", "void", "할당", "=", "+=", "비트 연산자"] },
    { title: "객체와 배열", target: "learning-js-05-structures", keywords: ["구조 분해", "프로퍼티 접근", "in", "delete", "instanceof", "템플릿 문자열"] },
  ];

  return (
    <section className="chapter-study-notes expression-reference" id="learning-js-05-study-notes">
      <div className="chapter-study-notes-heading">
        <span>CHAPTER 5 · 정리 완료 · 복습용 참고서</span>
        <h2>표현식은 값을 만들고, 연산자는 그 만드는 규칙을 정한다</h2>
        <p>책의 목차를 그대로 나열하지 않고, 코드를 읽다가 막힌 단어를 바로 찾을 수 있도록 개념의 역할과 선택 기준으로 다시 정리했습니다.</p>
      </div>

      <ArticleHeading id="learning-js-05-core" title="이 장에서 가장 중요한 5문장" />
      <div className="chapter-five-core-grid">
        {[
          ["01", "표현식은 평가되면 하나의 값을 만든다.", "10 + 20은 코드 조각이고, 평가 결과는 30입니다."],
          ["02", "연산자는 규칙이고 피연산자는 입력이다.", "+가 연산자이고 10과 20이 피연산자입니다."],
          ["03", "평가 순서는 결과와 실행 여부를 바꾼다.", "우선순위·괄호·단축 평가·후위 증감을 함께 봅니다."],
          ["04", "&&와 ||는 참·거짓뿐 아니라 실제 값을 선택한다.", "truthy·falsy를 판단해 왼쪽 또는 오른쪽 값을 반환합니다."],
          ["05", "할당과 ++에는 값을 바꾸는 부수 효과가 있다.", "표현식의 결과값과 실행 뒤 변수 상태를 따로 추적합니다."],
        ].map(([number, title, description]) => (
          <article key={number}><span>{number}</span><strong>{title}</strong><p>{description}</p></article>
        ))}
      </div>

      <ArticleHeading id="learning-js-05-index" title="키워드로 바로 찾기" />
      <p className="chapter-five-index-intro">정확한 절 번호가 기억나지 않아도 됩니다. 찾고 싶은 단어가 있는 묶음을 누르면 설명과 예제로 이동합니다.</p>
      <nav className="chapter-five-keyword-index" aria-label="5장 키워드 빠른 찾기">
        {keywordGroups.map((group) => (
          <a href={`#${group.target}`} key={group.title}>
            <strong>{group.title}</strong>
            <span>{group.keywords.map((keyword) => <code key={keyword}>{keyword}</code>)}</span>
          </a>
        ))}
      </nav>

      <ArticleHeading id="learning-js-05-numbers" title="숫자·NaN·비교" />
      <p>숫자에서는 <strong>값</strong>, 언어가 보여주는 <strong>타입</strong>, 컴퓨터가 비트로 저장하는 <strong>형식</strong>을 분리해서 봅니다.</p>

      <div className="expression-layer-map" aria-label="값 타입 저장 형식의 관계">
        <article><span>VALUE</span><strong>값</strong><p>프로그램이 실제로 다루는 데이터</p><code>0.1 · NaN · true</code></article>
        <b aria-hidden="true">→</b>
        <article><span>TYPE</span><strong>타입</strong><p>가능한 값과 연산 규칙</p><code>number · boolean</code></article>
        <b aria-hidden="true">→</b>
        <article><span>FORMAT</span><strong>저장 형식</strong><p>값을 비트로 나타내는 방법</p><code>64-bit double</code></article>
      </div>

      <div className="study-note-grid expression-number-grid">
        <article>
          <span>01</span><h3><code>NaN</code>은 특별한 값</h3>
          <p>정상적인 수치 결과를 만들 수 없음을 나타냅니다. 이름은 Not a Number이지만 자바스크립트 타입은 <code>number</code>입니다.</p>
          <pre><code>{`typeof NaN;           // "number"\nNumber.isNaN(0 / 0); // true\nNaN === NaN;         // false`}</code></pre>
        </article>
        <article>
          <span>02</span><h3>double은 내부 표현</h3>
          <p>자바스크립트의 정수와 소수는 모두 <code>number</code> 타입입니다. double은 별도 타입이 아니라 이 값을 64비트로 표현하는 방식입니다.</p>
          <pre><code>{`typeof 10;   // "number"\ntypeof 3.14; // "number"\n\n// Python\n// 10 → int, 3.14 → float`}</code></pre>
        </article>
      </div>

      <div className="control-flow-loop-table expression-result-table">
        <h3>0이 들어간 나눗셈은 모두 같지 않다</h3>
        <DocsTable
          headers={["표현식", "결과", "이유"]}
          rows={[
            [<code key="zero-one">0 / 1</code>, <code key="zero">0</code>, "1 × 0 = 0으로 정상적인 결과가 있음"],
            [<code key="one-zero">1 / 0</code>, <code key="infinity">Infinity</code>, "부동소수점에서 0으로 나누는 방향을 특별한 값으로 표현"],
            [<code key="zero-zero">0 / 0</code>, <code key="nan">NaN</code>, "하나의 정상적인 수치 결과를 정할 수 없음"],
          ]}
        />
      </div>

      <div className="chapter-study-notes-heading expression-binary-heading">
        <span>BINARY FLOATING-POINT</span>
        <h2><code>0.1</code>을 저장 못 하는 것이 아니라 정확히 저장 못 한다</h2>
        <p>십진수의 <code>1 / 3 = 0.333...</code>이 끝나지 않듯, 십진수 <code>0.1</code>은 이진수에서 끝없이 반복됩니다.</p>
      </div>

      <div className="expression-repeat-compare">
        <article><span>십진수에서</span><strong><code>1 / 3</code></strong><p><code>0.333333...</code></p><small>유한한 자리로 정확히 끝낼 수 없음</small></article>
        <b aria-hidden="true">≈</b>
        <article><span>이진수에서</span><strong><code>1 / 10</code></strong><p><code>0.000110011...</code></p><small>64비트 안에서는 가까운 값으로 반올림</small></article>
      </div>

      <SimpleCode language="JAVASCRIPT" code={'console.log((0.1).toPrecision(21));\n// "0.100000000000000005551"\n\nconsole.log(0.1 + 0.2);\n// 0.30000000000000004'} />

      <div className="control-flow-loop-table">
        <h3>비교할 때 먼저 고를 것</h3>
        <DocsTable
          headers={["상황", "권장 도구", "이유"]}
          rows={[
            ["일반적인 값 비교", <code key="strict-eq">=== / !==</code>, "타입을 강제로 바꾸지 않고 값과 타입을 함께 비교"],
            ["크기 비교", <code key="relational">&lt; &lt;= &gt; &gt;=</code>, "왼쪽과 오른쪽의 순서를 기준으로 크기 판단"],
            ["NaN 검사", <code key="is-nan">Number.isNaN(value)</code>, "NaN은 자기 자신과도 같지 않음"],
            ["소수 계산", <code key="epsilon">허용 오차 또는 정수 단위</code>, "0.1 같은 값은 이진수로 근사 저장될 수 있음"],
          ]}
        />
      </div>

      <ArticleHeading id="learning-js-05-expressions" title="표현식 읽는 법" />
      <div className="chapter-study-notes-heading expression-operator-heading">
        <span>OPERATOR ANATOMY</span>
        <h2>연산자를 값과 구분해서 읽기</h2>
        <p>피연산자는 입력, 연산자는 처리 규칙, 표현식 전체는 결과값입니다.</p>
      </div>

      <div className="code-anatomy expression-operator-anatomy" aria-label="true AND false 표현식의 구조">
        <span><code>true</code><small>왼쪽 불리언 피연산자</small></span>
        <span><code>&amp;&amp;</code><small>논리 연산자</small></span>
        <span><code>false</code><small>오른쪽 불리언 피연산자</small></span>
        <span><code>→ false</code><small>표현식의 결과</small></span>
      </div>

      <div className="access-comparison expression-rule-value">
        <article>
          <h4>연산자: 판단 규칙</h4>
          <p><code>&amp;&amp;</code>, <code>||</code>, <code>!</code>는 값이 아니라 어떻게 판단할지를 나타내는 문법적 도구입니다.</p>
          <pre><code>{`true && false\ntrue || false\n!true`}</code></pre>
        </article>
        <article>
          <h4>불리언: 데이터 타입</h4>
          <p><code>true</code>와 <code>false</code>는 실제 값입니다. 비교 표현식도 평가되면 불리언 값을 만듭니다.</p>
          <pre><code>{`typeof true;  // "boolean"\n25 >= 20;    // true`}</code></pre>
        </article>
      </div>

      <div className="control-flow-loop-table chapter-five-term-table">
        <h3>코드 한 줄에서 맡는 역할</h3>
        <DocsTable
          headers={["용어", "뜻", "예"]}
          rows={[
            ["식별자", "값을 찾아가기 위한 이름", <code key="identifier">total</code>],
            ["리터럴", "값을 코드에 직접 적은 표현", <code key="literal">10, &quot;hello&quot;, true</code>],
            ["피연산자", "연산자가 처리할 입력", <code key="operand">total, 10</code>],
            ["연산자", "입력에 적용할 규칙", <code key="operator">+, ===, typeof</code>],
            ["표현식", "평가하면 하나의 값이 되는 코드", <code key="expression">total + 10</code>],
            ["평가", "표현식을 실행해 값을 구하는 과정", <code key="evaluation">total + 10 → 30</code>],
            ["부수 효과", "결과값을 만드는 것 외에 상태도 바꾸는 동작", <code key="side-effect">x++, total = 30</code>],
            ["왼쪽·오른쪽", "할당에서는 저장할 자리와 계산할 값을 구분", <code key="lhs-rhs">total = price + tax</code>],
          ]}
        />
      </div>

      <SimpleCode language="값과 부수 효과를 따로 추적" code={'let y = 10;\nconst z = y++;\n\nconsole.log(z); // 10: y++ 표현식의 결과는 증가 전 값\nconsole.log(y); // 11: 실행 뒤 변수 y의 상태'} />
      <Note title="후위와 전위 증감"><code>y++</code>는 이전 값을 내놓은 뒤 증가하고, <code>++y</code>는 먼저 증가한 뒤 새 값을 내놓습니다. 둘 다 y를 바꾸지만 표현식의 결과가 다릅니다.</Note>

      <div className="math-warnings">
        <p><strong>우선순위:</strong> 어떤 연산을 먼저 묶어 평가할지 정합니다. 헷갈리면 암기보다 괄호로 의도를 드러냅니다.</p>
        <p><strong>결합 방향:</strong> 우선순위가 같은 연산을 어느 방향부터 묶을지 정합니다. 할당은 보통 오른쪽부터 묶여 <code>a = b = 10</code>이 가능합니다.</p>
        <p><strong>문장과 표현식:</strong> 표현식은 값을 만들고, 문장은 프로그램에게 무엇을 실행할지 지시하는 더 큰 단위입니다.</p>
      </div>

      <ArticleHeading id="learning-js-05-logic" title="논리·단축 평가" />
      <div className="chapter-study-notes-heading expression-short-heading">
        <span>SHORT-CIRCUIT</span>
        <h2>단축 평가는 결과와 실행 여부를 함께 본다</h2>
        <p>왼쪽 값만으로 결과를 결정할 수 있으면 오른쪽 표현식은 실행하지 않습니다.</p>
      </div>

      <SimpleCode language="JAVASCRIPT" code={'const skipIt = true;\nlet x = 0;\nconst result = skipIt || x++;\n\nconsole.log(result); // true\nconsole.log(x);      // 0'} />

      <div className="short-circuit-trace" aria-label="OR 단축 평가 실행 순서">
        <span><b>1</b><code>skipIt</code><small>값은 true</small></span>
        <i aria-hidden="true">→</i>
        <span><b>2</b><code>true || ...</code><small>OR 결과 결정 가능</small></span>
        <i aria-hidden="true">→</i>
        <span><b>3</b><code>x++</code><small>실행하지 않음</small></span>
        <i aria-hidden="true">→</i>
        <span><b>4</b><code>result</code><small>true, x는 0</small></span>
      </div>

      <div className="chapter-study-notes-heading expression-truth-heading">
        <span>TRUTHY &amp; FALSY</span>
        <h2>불리언이 아닌 값을 조건에서 해석하는 규칙</h2>
        <p>truthy는 실제 <code>true</code>라는 뜻이 아니고, falsy도 실제 <code>false</code>라는 뜻이 아닙니다. 조건에서 그렇게 판단된다는 뜻입니다.</p>
      </div>

      <div className="truthy-falsy-grid">
        <article>
          <span>FALSY</span><h3>거짓처럼 판단</h3>
          <p><code>false</code> · <code>0</code> · <code>-0</code> · <code>0n</code> · <code>&quot;&quot;</code> · <code>null</code> · <code>undefined</code> · <code>NaN</code></p>
          <pre><code>{`Boolean(0);   // false\nBoolean("");  // false\nBoolean(NaN); // false`}</code></pre>
        </article>
        <article>
          <span>TRUTHY</span><h3>참처럼 판단</h3>
          <p>falsy 목록을 제외한 대부분의 값. 특히 <code>&quot;false&quot;</code>, <code>&quot;0&quot;</code>, <code>[]</code>, <code>{`{}`}</code>도 truthy입니다.</p>
          <pre><code>{`Boolean("false"); // true\nBoolean("0");     // true\nBoolean([]);      // true`}</code></pre>
        </article>
      </div>

      <div className="control-flow-loop-table expression-logical-table">
        <h3>논리 연산자가 값을 선택하는 방식</h3>
        <DocsTable
          headers={["연산자", "왼쪽 판단", "동작과 반환값"]}
          rows={[
            [<code key="or-truthy">||</code>, "truthy", "왼쪽 값을 반환하고 오른쪽은 실행하지 않음"],
            [<code key="or-falsy">||</code>, "falsy", "오른쪽을 평가하고 그 실제 값을 반환"],
            [<code key="and-falsy">&&</code>, "falsy", "왼쪽 값을 반환하고 오른쪽은 실행하지 않음"],
            [<code key="and-truthy">&&</code>, "truthy", "오른쪽을 평가하고 그 실제 값을 반환"],
            [<code key="not">!</code>, "truthy 또는 falsy", "판단을 반대로 바꾼 실제 boolean을 반환"],
          ]}
        />
      </div>

      <div className="math-warnings expression-warnings">
        <p><strong>실제 값과 판단은 다름:</strong> <code>&quot;안녕&quot;</code>은 여전히 문자열이지만 조건에서는 truthy입니다.</p>
        <p><strong>글자로 적힌 false:</strong> <code>&quot;false&quot;</code>는 빈 문자열이 아니므로 truthy입니다.</p>
        <p><strong>빈 배열·객체:</strong> 내용이 비어 있어도 객체 자체가 존재하므로 <code>[]</code>와 <code>{`{}`}</code>는 truthy입니다.</p>
        <p><strong>기본값 주의:</strong> <code>value || fallback</code>은 0과 빈 문자열도 없다고 판단합니다. 이 값들을 유지해야 한다면 <code>value ?? fallback</code>을 검토합니다.</p>
      </div>

      <ArticleHeading id="learning-js-05-selection" title="조건·쉼표 연산자" />
      <div className="study-note-grid chapter-five-selection-grid">
        <article>
          <span>CONDITIONAL</span><h3>조건에 따라 값 하나 선택</h3>
          <p><code>조건 ? 참일_때_값 : 거짓일_때_값</code>의 순서입니다. 문장을 두 갈래로 실행하는 <code>if</code>와 달리 표현식이므로 선택한 값 자체를 변수에 저장할 수 있습니다.</p>
          <pre><code>{`const age = 20;\nconst label = age >= 19 ? "성인" : "미성년";\n// label: "성인"`}</code></pre>
        </article>
        <article>
          <span>COMMA</span><h3>여러 표현식 평가 후 마지막 값 반환</h3>
          <p>왼쪽부터 모두 평가하지만 표현식 전체의 결과는 마지막 표현식의 결과입니다. 괄호 속 쉼표는 배열을 만드는 문법이 아닙니다.</p>
          <pre><code>{`let x = 0;\nlet y = 10;\nconst z = (x++, y++);\n\n// x: 1, y: 11, z: 10`}</code></pre>
        </article>
      </div>
      <Note title="왜 z는 11이 아니라 10인가?"><code>y++</code>는 y를 11로 바꾸지만, 그 표현식이 내놓는 값은 증가 전 값인 10입니다. 쉼표 연산자는 마지막 표현식 <code>y++</code>가 내놓은 10을 z에 전달합니다.</Note>

      <ArticleHeading id="learning-js-05-toolbox" title="typeof·할당·비트 연산자" />
      <div className="control-flow-loop-table">
        <h3>특수 연산자 빠른 참고표</h3>
        <DocsTable
          headers={["도구", "결과 또는 역할", "기억할 점"]}
          rows={[
            [<code key="typeof">typeof value</code>, "타입을 설명하는 문자열 반환", <><code>typeof NaN</code>은 <code>&quot;number&quot;</code>, <code>typeof null</code>은 역사적 이유로 <code>&quot;object&quot;</code></>],
            [<code key="array-is-array">Array.isArray(value)</code>, "배열이면 true", <><code>typeof []</code>도 <code>&quot;object&quot;</code>이므로 배열 전용 검사 사용</>],
            [<code key="void">void expression</code>, "표현식을 평가한 뒤 undefined 반환", "일상적인 앱 코드에서는 드물며 단순히 값을 버리는 목적"],
            [<code key="assign">left = right</code>, "오른쪽 값을 계산해 왼쪽 저장 장소에 기록", <><code>=</code>는 저장, <code>===</code>는 비교</>],
            [<code key="compound">+= -= *= /=</code>, "기존 값에 계산한 결과를 다시 저장", <><code>x += 2</code>는 <code>x = x + 2</code>와 같은 기본 의미</>],
            [<code key="bitwise">&amp; | ^ ~ &lt;&lt; &gt;&gt;</code>, "정수의 비트 단위 계산", "일상 UI보다 플래그·저수준 데이터 처리에서 주로 사용"],
          ]}
        />
      </div>

      <SimpleCode language="선언·초기화·재할당 구분" code={'let score;      // 선언: score라는 이름 준비\nscore = 10;     // 할당: 오른쪽 10을 score에 저장\nscore += 5;     // 복합 할당: score = score + 5\n\nconst level = 1; // 선언하면서 초기값을 할당해 초기화'} />

      <div className="code-anatomy chapter-five-assignment-anatomy" aria-label="할당 표현식의 구조">
        <span><code>total</code><small>왼쪽: 값을 저장할 자리</small></span>
        <span><code>=</code><small>할당 연산자</small></span>
        <span><code>price + tax</code><small>오른쪽: 먼저 평가할 표현식</small></span>
        <span><code>→ 저장</code><small>계산 결과가 total의 새 값</small></span>
      </div>

      <ArticleHeading id="learning-js-05-structures" title="구조 분해·객체·배열" />
      <div className="study-note-grid chapter-five-structure-grid">
        <article>
          <span>DESTRUCTURING</span><h3>구조에서 필요한 값을 이름으로 꺼내기</h3>
          <p>배열은 위치, 객체는 프로퍼티 이름을 기준으로 값을 꺼내 여러 변수를 한 번에 만듭니다.</p>
          <pre><code>{`const [first, second] = [10, 20];\nconst { name, age } = { name: "Hui", age: 30 };`}</code></pre>
        </article>
        <article>
          <span>ACCESS</span><h3>프로퍼티 이름이 고정인지 동적인지 구분</h3>
          <p>점 표기법은 이름을 코드에 직접 쓰고, 대괄호 표기법은 표현식을 평가한 결과를 프로퍼티 이름으로 사용합니다.</p>
          <pre><code>{`user.name;        // 고정된 이름\nuser[key];        // key 값으로 이름 결정\n"name" in user;  // 존재 여부\ndelete user.age; // 프로퍼티 삭제`}</code></pre>
        </article>
      </div>

      <div className="control-flow-loop-table">
        <h3>객체·배열과 함께 보는 연산자</h3>
        <DocsTable
          headers={["문법", "질문", "예"]}
          rows={[
            [<code key="dot">object.name</code>, "고정된 프로퍼티를 읽는가?", <code key="dot-example">user.name</code>],
            [<code key="bracket">object[expression]</code>, "계산된 이름으로 읽는가?", <code key="bracket-example">bets[face]</code>],
            [<code key="in">key in object</code>, "해당 이름이 객체에 존재하는가?", <code key="in-example">&quot;name&quot; in user</code>],
            [<code key="instanceof">value instanceof Constructor</code>, "생성자 계통에 속한 객체인가?", <code key="instanceof-example">today instanceof Date</code>],
            [<code key="template">{"`값: ${expression}`"}</code>, "표현식 결과를 문자열에 넣는가?", <code key="template-example">{"`합계: ${total}`"}</code>],
          ]}
        />
      </div>

      <ArticleHeading id="learning-js-05-patterns" title="실전에서 무엇을 선택할까" />
      <div className="chapter-five-lookup-grid">
        {[
          ["타입을 확인하고 싶다", "typeof", "배열은 Array.isArray를 함께 사용"],
          ["두 값이 같은지 비교한다", "===", "자동 타입 변환을 피하고 의도를 분명하게"],
          ["두 값 중 하나를 선택한다", "condition ? a : b", "결과를 변수에 저장하는 짧은 선택에 적합"],
          ["기본값을 넣는다", "??", "0과 빈 문자열을 유효한 값으로 유지해야 할 때"],
          ["조건부로 실행한다", "&& 또는 if", "짧은 표현식은 &&, 여러 문장은 if가 읽기 쉬움"],
          ["값을 저장하거나 갱신한다", "=, +=", "왼쪽 저장 장소와 오른쪽 계산식을 나눠 읽기"],
          ["객체·배열에서 값을 꺼낸다", "구조 분해", "필요한 이름과 위치를 코드에 드러내기"],
          ["소수를 정확히 다뤄야 한다", "정수 단위", "금액은 원·센트처럼 가장 작은 단위의 정수 고려"],
        ].map(([need, tool, reason]) => (
          <article key={need}><span>{need}</span><strong><code>{tool}</code></strong><p>{reason}</p></article>
        ))}
      </div>

      <div className="math-warnings chapter-five-final-checks">
        <p><strong>조건 연산자:</strong> 값 하나를 고르는 표현식에는 좋지만, 중첩하면 <code>if...else</code>보다 읽기 어려워집니다.</p>
        <p><strong>쉼표 연산자:</strong> 동작은 알아야 하지만 일반 코드에서 여러 부수 효과를 한 줄에 숨기지 않는 편이 좋습니다.</p>
        <p><strong>단축 평가:</strong> 짧게 쓰는 것보다 오른쪽이 실행되지 않을 수 있다는 사실이 코드 의도와 맞는지가 중요합니다.</p>
        <p><strong>괄호:</strong> 우선순위를 모두 외우는 대신 사람이 읽을 때 묶음이 보이도록 사용합니다.</p>
      </div>

      <p className="study-note-summary"><strong>5장 최종 정리:</strong> 코드를 보면 먼저 피연산자와 연산자를 나누고, 평가 순서와 단축 여부를 따라가며, 표현식이 내놓은 값과 할당·증감으로 바뀐 상태를 따로 확인합니다.</p>
    </section>
  );
}

function ChapterFiveStudyNotes() {
  return (
    <section className="chapter-five-simple-guide" id="learning-js-05-study-notes">
      <ArticleHeading id="learning-js-05-overview" title="5장에서 배우는 것" />
      <p>4장에서는 조건문과 반복문으로 <strong>코드의 실행 순서</strong>를 바꾸는 방법을 배웠습니다. 5장에서는 그 조건에 넣는 값이 어떻게 만들어지고, 계산되고, 비교되고, 저장되는지를 배웁니다. 예를 들어 <code>price + tax</code>는 두 값을 더해 새 값을 만드는 표현식이고, <code>total = price + tax</code>는 그 결과를 변수에 저장합니다. 따라서 이 장의 중심은 연산자 기호를 전부 외우는 것이 아니라, <strong>무슨 값을 넣었고 → 어떤 규칙을 적용했고 → 어떤 결과가 나왔고 → 실행 뒤 무엇이 바뀌었는지</strong> 읽는 것입니다.</p>
      <div className="summary-callout">5장의 중심: 입력값 → 연산 규칙 → 결과값 → 변수의 변화 순서로 코드를 읽는다.</div>

      <ArticleHeading id="learning-js-05-expression" title="1. 표현식과 연산자" />
      <p><strong>표현식</strong>은 실행했을 때 하나의 값이 되는 코드입니다. 표현식 안에서 계산할 대상을 <strong>피연산자</strong>, 계산 방법을 나타내는 기호를 <strong>연산자</strong>라고 합니다.</p>
      <SimpleCode language="JAVASCRIPT" code={'10 + 20;\n// 10과 20: 피연산자\n// +: 연산자\n// 10 + 20: 표현식\n// 결과값: 30'} />
      <DocsTable
        headers={["용어", "뜻", "예"]}
        rows={[
          ["피연산자", "연산자가 사용할 입력값", <code key="operand">10, 20</code>],
          ["연산자", "입력값을 어떻게 처리할지 정하는 기호", <code key="operator">+, ===, typeof</code>],
          ["표현식", "실행하면 하나의 값이 되는 코드", <code key="expression">10 + 20</code>],
          ["평가", "표현식을 실행해 결과값을 구하는 과정", <code key="evaluation">10 + 20 → 30</code>],
          ["부수 효과", "결과값 외에 변수나 객체의 상태도 바꾸는 동작", <code key="side-effect">x++, x = 10</code>],
        ]}
      />
      <SimpleCode language="결과값과 변수 변화" code={'let y = 10;\nconst z = y++;\n\nconsole.log(z); // 10: y++가 내놓은 결과값\nconsole.log(y); // 11: 실행이 끝난 뒤 y의 값'} />
      <Note title="가장 중요하게 구분할 것"><code>y++</code>가 내놓는 결과값은 10이지만, 실행이 끝난 뒤 y의 값은 11입니다. 표현식의 결과와 변수의 최종 상태는 같지 않을 수 있습니다.</Note>

      <ArticleHeading id="learning-js-05-arithmetic" title="2. 산술 연산자와 비교 연산자" />
      <p>산술 연산자는 숫자를 계산하고, 비교 연산자는 두 값을 비교해 <code>true</code> 또는 <code>false</code>를 만듭니다.</p>
      <DocsTable
        headers={["연산자", "역할", "예와 결과"]}
        rows={[
          [<code key="plus">+</code>, "더하기", <code key="plus-example">10 + 3 → 13</code>],
          [<code key="minus">-</code>, "빼기", <code key="minus-example">10 - 3 → 7</code>],
          [<code key="multiply">*</code>, "곱하기", <code key="multiply-example">10 * 3 → 30</code>],
          [<code key="divide">/</code>, "나누기", <code key="divide-example">10 / 2 → 5</code>],
          [<code key="remainder">%</code>, "나눈 나머지", <code key="remainder-example">10 % 3 → 1</code>],
          [<code key="power">**</code>, "거듭제곱", <code key="power-example">2 ** 3 → 8</code>],
          [<code key="increment">++ / --</code>, "값을 1 증가 또는 감소", <code key="increment-example">count++</code>],
        ]}
      />
      <h3 className="article-subheading">연산 순서</h3>
      <p>곱셈과 나눗셈은 덧셈과 뺄셈보다 먼저 계산됩니다. 원하는 순서가 따로 있다면 괄호로 묶습니다.</p>
      <SimpleCode language="JAVASCRIPT" code={'2 + 3 * 4;   // 14: 3 * 4를 먼저 계산\n(2 + 3) * 4; // 20: 괄호 안을 먼저 계산'} />
      <DocsTable
        headers={["비교 연산자", "뜻", "예와 결과"]}
        rows={[
          [<code key="equal">===</code>, "값과 타입이 모두 같은가?", <code key="equal-example">10 === 10 → true</code>],
          [<code key="not-equal">!==</code>, "값이나 타입이 다른가?", <code key="not-equal-example">10 !== &quot;10&quot; → true</code>],
          [<code key="greater">&gt;</code>, "왼쪽이 더 큰가?", <code key="greater-example">10 &gt; 3 → true</code>],
          [<code key="greater-equal">&gt;=</code>, "왼쪽이 크거나 같은가?", <code key="greater-equal-example">10 &gt;= 10 → true</code>],
          [<code key="less">&lt;</code>, "왼쪽이 더 작은가?", <code key="less-example">3 &lt; 10 → true</code>],
          [<code key="less-equal">&lt;=</code>, "왼쪽이 작거나 같은가?", <code key="less-equal-example">3 &lt;= 3 → true</code>],
        ]}
      />
      <Note title="=와 ===는 다름"><code>=</code>는 값을 변수에 저장하는 할당 연산자이고, <code>===</code>는 두 값을 비교하는 연산자입니다.</Note>

      <h3 className="article-subheading">number, double, NaN</h3>
      <DocsTable
        headers={["용어", "뜻", "기억할 점"]}
        rows={[
          [<code key="number">number</code>, "자바스크립트의 일반 숫자 타입", "정수와 소수가 모두 number"],
          [<code key="double">double</code>, "숫자를 64비트로 저장하는 내부 형식", "자바스크립트의 별도 타입이 아님"],
          [<code key="nan">NaN</code>, "정상적인 숫자 결과를 만들 수 없음을 나타내는 값", <span key="nan-type"><code>typeof NaN</code>은 <code>&quot;number&quot;</code></span>],
          [<code key="infinity">Infinity</code>, "무한대를 나타내는 특별한 숫자 값", <code key="infinity-example">1 / 0 → Infinity</code>],
        ]}
      />
      <SimpleCode language="JAVASCRIPT" code={'0 / 1; // 0\n1 / 0; // Infinity\n0 / 0; // NaN\n\nNumber.isNaN(0 / 0); // true\n0.1 + 0.2;            // 0.30000000000000004'} />
      <Note title="0.1의 오차">십진수 0.1은 이진수로 정확히 끝나지 않아 가장 가까운 값으로 저장됩니다. 금액처럼 정확성이 중요하면 원·센트처럼 가장 작은 단위의 정수로 저장하는 방법을 고려합니다.</Note>

      <ArticleHeading id="learning-js-05-logic" title="3. 논리 연산자" />
      <p>논리 연산자는 값을 조건에서 판단하거나 두 조건을 연결합니다. 자바스크립트에서는 <code>true</code>와 <code>false</code>뿐 아니라 다른 값도 조건에 넣을 수 있습니다.</p>
      <DocsTable
        headers={["연산자", "기본 의미", "실행 방법"]}
        rows={[
          [<code key="and">&&</code>, "AND: 둘 다 참인가?", "왼쪽이 falsy이면 왼쪽에서 멈춤"],
          [<code key="or">||</code>, "OR: 하나라도 참인가?", "왼쪽이 truthy이면 왼쪽에서 멈춤"],
          [<code key="not">!</code>, "NOT: 판단을 반대로", "항상 실제 boolean을 반환"],
        ]}
      />
      <DocsTable
        headers={["구분", "해당 값", "뜻"]}
        rows={[
          ["falsy", <code key="falsy">false, 0, &quot;&quot;, null, undefined, NaN</code>, "조건에서 false처럼 판단"],
          ["truthy", <code key="truthy">falsy를 제외한 대부분의 값</code>, <span key="truthy-examples"><code>&quot;false&quot;</code>, <code>[]</code>, <code>{`{}`}</code>도 포함</span>],
        ]}
      />
      <SimpleCode language="단축 평가" code={'const skipIt = true;\nlet x = 0;\nconst result = skipIt || x++;\n\nconsole.log(result); // true\nconsole.log(x);      // 0: x++는 실행되지 않음'} />
      <Note title="&&와 ||의 결과"><code>!</code>는 항상 true나 false를 반환하지만, <code>&&</code>와 <code>||</code>는 판단한 뒤 선택된 실제 값을 반환할 수 있습니다. 예를 들어 <code>0 || &quot;기본값&quot;</code>의 결과는 문자열 <code>&quot;기본값&quot;</code>입니다.</Note>

      <ArticleHeading id="learning-js-05-choice" title="4. 조건 연산자와 쉼표 연산자" />
      <h3 className="article-subheading">조건 연산자</h3>
      <p>조건 연산자는 조건에 따라 두 값 중 하나를 선택하는 표현식입니다.</p>
      <SimpleCode language="JAVASCRIPT" code={'조건 ? 참일_때_값 : 거짓일_때_값\n\nconst age = 20;\nconst label = age >= 19 ? "성인" : "미성년";\n// label은 "성인"'} />
      <DocsTable
        headers={["부분", "역할"]}
        rows={[
          [<code key="condition">age &gt;= 19</code>, "먼저 참인지 거짓인지 판단"],
          [<code key="truthy-value">&quot;성인&quot;</code>, "조건이 참일 때 선택"],
          [<code key="falsy-value">&quot;미성년&quot;</code>, "조건이 거짓일 때 선택"],
        ]}
      />
      <h3 className="article-subheading">쉼표 연산자</h3>
      <p>쉼표 연산자는 여러 표현식을 왼쪽부터 실행하고, 마지막 표현식이 내놓은 값만 전체 결과로 사용합니다.</p>
      <SimpleCode language="JAVASCRIPT" code={'let x = 0;\nlet y = 10;\nconst z = (x++, y++);\n\nconsole.log(x); // 1\nconsole.log(y); // 11\nconsole.log(z); // 10'} />
      <Note title="z가 10인 이유">마지막 표현식은 <code>y++</code>입니다. y는 실행 뒤 11이 되지만 <code>y++</code>가 내놓는 결과값은 증가 전 값 10이므로 z에는 10이 저장됩니다.</Note>

      <ArticleHeading id="learning-js-05-assignment" title="5. typeof와 할당 연산자" />
      <h3 className="article-subheading">typeof</h3>
      <p><code>typeof</code>는 오른쪽 값의 타입을 설명하는 문자열을 반환합니다.</p>
      <SimpleCode language="JAVASCRIPT" code={'typeof 10;        // "number"\ntypeof "hello";   // "string"\ntypeof true;      // "boolean"\ntypeof undefined; // "undefined"\ntypeof {};        // "object"\ntypeof [];        // "object"\n\nArray.isArray([]); // true'} />
      <Note title="배열 확인">배열도 객체이므로 <code>typeof []</code>는 <code>&quot;object&quot;</code>입니다. 배열인지 정확히 확인할 때는 <code>Array.isArray()</code>를 사용합니다.</Note>

      <h3 className="article-subheading">할당 연산자</h3>
      <p>할당 연산자는 오른쪽 표현식을 먼저 계산한 뒤, 그 결과를 왼쪽의 변수나 프로퍼티에 저장합니다.</p>
      <SimpleCode language="JAVASCRIPT" code={'let score;      // 선언: 변수 이름을 만듦\nscore = 10;     // 할당: 10을 score에 저장\nscore += 5;     // score = score + 5\n\nconst level = 1; // 선언하면서 처음 값을 넣어 초기화'} />
      <DocsTable
        headers={["연산자", "뜻", "같은 기본 의미"]}
        rows={[
          [<code key="assign">=</code>, "오른쪽 값을 왼쪽에 저장", <code key="assign-example">x = 10</code>],
          [<code key="add-assign">+=</code>, "더한 값을 다시 저장", <code key="add-assign-example">x += 2 → x = x + 2</code>],
          [<code key="subtract-assign">-=</code>, "뺀 값을 다시 저장", <code key="subtract-assign-example">x -= 2 → x = x - 2</code>],
          [<code key="multiply-assign">*=</code>, "곱한 값을 다시 저장", <code key="multiply-assign-example">x *= 2 → x = x * 2</code>],
          [<code key="divide-assign">/=</code>, "나눈 값을 다시 저장", <code key="divide-assign-example">x /= 2 → x = x / 2</code>],
        ]}
      />
      <h3 className="article-subheading">그 밖의 연산자</h3>
      <DocsTable
        headers={["연산자", "역할", "사용 빈도"]}
        rows={[
          [<code key="void">void</code>, "표현식을 실행한 뒤 undefined를 반환", "일반적인 앱 코드에서는 드묾"],
          [<code key="bitwise">&amp; | ^ ~ &lt;&lt; &gt;&gt;</code>, "정수를 비트 단위로 계산", "플래그·저수준 데이터 처리에서 사용"],
        ]}
      />

      <ArticleHeading id="learning-js-05-objects" title="6. 구조 분해와 객체·배열 연산자" />
      <h3 className="article-subheading">구조 분해 할당</h3>
      <p>구조 분해는 배열이나 객체 안의 값을 꺼내 여러 변수에 나누어 저장하는 문법입니다. 배열은 위치를, 객체는 프로퍼티 이름을 기준으로 꺼냅니다.</p>
      <SimpleCode language="JAVASCRIPT" code={'const [first, second] = [10, 20];\n// first는 10, second는 20\n\nconst user = { name: "Hui", age: 30 };\nconst { name, age } = user;\n// name은 "Hui", age는 30'} />
      <DocsTable
        headers={["문법", "역할", "예"]}
        rows={[
          [<code key="dot">object.name</code>, "정해진 프로퍼티 이름으로 접근", <code key="dot-example">user.name</code>],
          [<code key="bracket">object[value]</code>, "변수에 든 이름으로 접근", <code key="bracket-example">bets[face]</code>],
          [<code key="in">name in object</code>, "프로퍼티가 존재하는지 확인", <code key="in-example">&quot;name&quot; in user</code>],
          [<code key="delete">delete object.name</code>, "프로퍼티를 객체에서 삭제", <code key="delete-example">delete user.age</code>],
          [<code key="instanceof">value instanceof Type</code>, "어떤 생성자 계통의 객체인지 확인", <code key="instanceof-example">today instanceof Date</code>],
        ]}
      />
      <h3 className="article-subheading">템플릿 문자열 안의 표현식</h3>
      <p>백틱 문자열의 <code>{'${}'}</code> 안에는 변수뿐 아니라 계산식도 넣을 수 있습니다.</p>
      <SimpleCode language="JAVASCRIPT" code={'const price = 1000;\nconst tax = 100;\nconst message = `합계: ${price + tax}원`;\n// "합계: 1100원"'} />

      <ArticleHeading id="learning-js-05-summary" title="핵심 암기" />
      <div className="memory-grid">
        <span><code>a + b</code><small>값을 계산한다</small></span>
        <span><code>a === b</code><small>값을 비교한다</small></span>
        <span><code>a &amp;&amp; b</code><small>조건을 판단한다</small></span>
        <span><code>a = b</code><small>값을 저장한다</small></span>
      </div>
      <div className="summary-callout">표현식을 볼 때는 “무엇을 입력했는가, 어떤 연산을 했는가, 결과값은 무엇인가, 실행 뒤 값이 바뀌었는가?”를 차례대로 확인한다.</div>
    </section>
  );
}

function MathQuickReference() {
  const mathGroups = [
    {
      number: "01",
      title: "부호와 크기",
      description: "음수를 양수 크기로 바꾸거나 여러 값 중 가장 작은 값과 큰 값을 찾습니다.",
      code: `Math.abs(-8);       // 8\nMath.min(7, 2, 9); // 2\nMath.max(7, 2, 9); // 9\nMath.sign(-8);      // -1`,
    },
    {
      number: "02",
      title: "정수로 만들기",
      description: "반올림·내림·올림·소수점 버리기는 서로 결과가 다르며, 특히 음수에서 차이가 잘 보입니다.",
      code: `Math.round(3.6); // 4, 가까운 정수\nMath.floor(3.6); // 3, 아래 정수\nMath.ceil(3.1);  // 4, 위 정수\nMath.trunc(3.9); // 3, 소수점 제거`,
    },
    {
      number: "03",
      title: "거듭제곱과 제곱근",
      description: "제곱·세제곱과 그 반대 계산, 두 점 사이의 직선거리 계산에 사용합니다.",
      code: `Math.pow(2, 3);  // 8\n2 ** 3;         // 8, 현재는 이 표기도 흔함\nMath.sqrt(25);  // 5\nMath.cbrt(27);  // 3\nMath.hypot(3, 4); // 5`,
    },
    {
      number: "04",
      title: "난수",
      description: "0 이상 1 미만의 의사 난수를 만들며, 범위를 곱하고 내림하여 정수 범위로 바꿉니다.",
      code: `Math.random(); // 0 이상 1 미만\n\n// 1부터 6까지 주사위\nMath.floor(Math.random() * 6) + 1;`,
    },
    {
      number: "05",
      title: "삼각함수와 각도",
      description: "회전·원·파동·게임 좌표에 사용합니다. Math의 삼각함수는 도(degree)가 아니라 라디안(radian)을 받습니다.",
      code: `const radian = 90 * Math.PI / 180;\nMath.sin(radian); // 1\nMath.cos(0);      // 1\nMath.atan2(y, x); // 좌표의 방향 각도`,
    },
    {
      number: "06",
      title: "로그와 지수",
      description: "규모가 크게 달라지는 값, 성장·감쇠, 자릿수와 알고리즘 계산에서 사용합니다.",
      code: `Math.log(Math.E); // 1, 자연로그\nMath.log10(1000); // 3\nMath.log2(8);     // 3\nMath.exp(1);      // Math.E`,
    },
  ];

  return (
    <section className="chapter-study-notes math-reference" id="learning-js-16-math-reference">
      <div className="chapter-study-notes-heading">
        <span>JAVASCRIPT TOOLBOX · 자주 찾는 참고서</span>
        <h2>Math는 숫자 계산 도구가 모여 있는 기본 제공 객체</h2>
        <p><code>Math</code>는 설치하거나 새로 만들 필요가 없습니다. <code>Math.기능(값)</code>처럼 바로 사용하며, 계산 결과를 반환합니다.</p>
      </div>

      <div className="math-reading-flow" aria-label="Math 코드 읽는 법">
        <span><code>Math</code><small>계산 도구 모음</small></span>
        <b aria-hidden="true">.</b>
        <span><code>round</code><small>사용할 기능</small></span>
        <span><code>(3.6)</code><small>전달할 값</small></span>
        <b aria-hidden="true">→</b>
        <span><code>4</code><small>돌려받은 결과</small></span>
      </div>

      <div className="math-use-first">
        <strong>가장 먼저 기억할 10개</strong>
        <p><code>abs</code> 절댓값 · <code>round</code> 반올림 · <code>floor</code> 내림 · <code>ceil</code> 올림 · <code>trunc</code> 소수점 제거 · <code>min</code> 최솟값 · <code>max</code> 최댓값 · <code>random</code> 난수 · <code>sqrt</code> 제곱근 · <code>pow</code> 거듭제곱</p>
      </div>

      <div className="study-note-grid math-group-grid">
        {mathGroups.map((group) => (
          <article key={group.number}>
            <span>{group.number}</span><h3>{group.title}</h3>
            <p>{group.description}</p>
            <pre><code>{group.code}</code></pre>
          </article>
        ))}
      </div>

      <div className="math-lookup-table" aria-label="Math 전체 기능 빠른 찾기">
        <h3>기능 전체 빠른 찾기</h3>
        <table>
          <thead><tr><th>필요한 일</th><th>기능</th><th>결과·용도</th></tr></thead>
          <tbody>
            <tr><td>값의 크기·범위</td><td><code>abs</code>, <code>sign</code>, <code>min</code>, <code>max</code></td><td>절댓값, 부호, 최솟값, 최댓값</td></tr>
            <tr><td>정수 만들기</td><td><code>round</code>, <code>floor</code>, <code>ceil</code>, <code>trunc</code></td><td>반올림, 내림, 올림, 소수부 제거</td></tr>
            <tr><td>제곱·거리</td><td><code>pow</code>, <code>sqrt</code>, <code>cbrt</code>, <code>hypot</code></td><td>거듭제곱, 제곱근, 세제곱근, 피타고라스 거리</td></tr>
            <tr><td>임의의 값</td><td><code>random</code></td><td>0 이상 1 미만의 의사 난수</td></tr>
            <tr><td>상수</td><td><code>PI</code>, <code>E</code>, <code>SQRT2</code>, <code>LN2</code>, <code>LN10</code></td><td>원주율, 자연로그의 밑, 제곱근·로그 상수</td></tr>
            <tr><td>삼각함수</td><td><code>sin</code>, <code>cos</code>, <code>tan</code>, <code>asin</code>, <code>acos</code>, <code>atan</code>, <code>atan2</code></td><td>회전, 각도, 원, 좌표 방향</td></tr>
            <tr><td>로그·지수</td><td><code>log</code>, <code>log2</code>, <code>log10</code>, <code>log1p</code>, <code>exp</code>, <code>expm1</code></td><td>로그와 지수 계산</td></tr>
            <tr><td>쌍곡선함수</td><td><code>sinh</code>, <code>cosh</code>, <code>tanh</code>, <code>asinh</code>, <code>acosh</code>, <code>atanh</code></td><td>공학·과학 계산</td></tr>
            <tr><td>정밀도·32비트</td><td><code>fround</code>, <code>imul</code>, <code>clz32</code></td><td>32비트 부동소수점·정수 계산</td></tr>
          </tbody>
        </table>
      </div>

      <div className="math-recipes">
        <article>
          <h3>범위 안의 정수 난수</h3>
          <pre><code>{`function randomInteger(min, max) {\n  return Math.floor(Math.random() * (max - min + 1)) + min;\n}\n\nrandomInteger(5, 10); // 5~10 중 하나`}</code></pre>
        </article>
        <article>
          <h3>값을 범위 안에 가두기</h3>
          <pre><code>{`function clamp(value, min, max) {\n  return Math.min(Math.max(value, min), max);\n}\n\nclamp(120, 0, 100); // 100`}</code></pre>
        </article>
      </div>

      <div className="math-warnings">
        <p><strong>헷갈림 1:</strong> <code>Math</code>는 함수가 아니라 객체이며 <code>new Math()</code>로 만들지 않습니다.</p>
        <p><strong>헷갈림 2:</strong> <code>toFixed()</code>는 Math 기능이 아니라 숫자의 메서드이고 결과는 문자열입니다. <code>(3.14159).toFixed(2)</code> → <code>&quot;3.14&quot;</code></p>
        <p><strong>헷갈림 3:</strong> <code>Math.floor(-3.2)</code>는 더 작은 정수인 <code>-4</code>, <code>Math.trunc(-3.2)</code>는 소수부를 버린 <code>-3</code>입니다.</p>
        <p><strong>보안:</strong> <code>Math.random()</code>은 게임·추첨 예제용입니다. 비밀번호·토큰 같은 보안 값에는 사용하지 않습니다.</p>
      </div>

      <p className="study-note-summary"><strong>한 문장 정리:</strong> 원하는 계산을 고르고 <code>Math.기능(값)</code>으로 실행한 뒤, 반환된 숫자를 변수에 저장하거나 다음 계산에 사용합니다.</p>
    </section>
  );
}

function LearningProgressPanel({ progress }: { progress: ChapterLearningProgress }) {
  return (
    <section className="my-learning-record" id={`learning-js-${progress.chapter}-my-progress`}>
      <div className="my-learning-heading">
        <span>{learningProgressLabels[progress.status]}</span>
        <strong>내 학습 기록</strong>
        <small>마지막 갱신 {progress.updatedAt}</small>
      </div>

      <div className="understanding-shift">
        <div><span>이전 생각</span><p>{progress.before}</p></div>
        <b aria-hidden="true">→</b>
        <div><span>지금의 이해</span><p>{progress.after}</p></div>
      </div>

      <div className="learning-record-columns">
        <section>
          <h3>배운 것</h3>
          <ul>{progress.learned.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section>
          <h3>아직 확인할 것</h3>
          <ul>{progress.remaining.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
      </div>

      <div className="question-memory">
        <h3>질문으로 기억하기</h3>
        {progress.questions.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p><strong>답:</strong> {item.answer}</p>
            <p><strong>바뀐 관점:</strong> {item.changedView}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Article({ id, navigate }: { id: ArticleId; navigate: (view: View) => void }) {
  if (id.startsWith("learning-js-")) {
    return (
      <LearningJavascriptArticle
        id={id as LearningJavascriptArticleId}
        navigate={navigate}
      />
    );
  }
  if (id === "css-intro") {
    return <CssIntroArticle navigate={navigate} />;
  }
  if (id === "css-spacing-selectors") {
    return <CssSpacingSelectorsArticle navigate={navigate} />;
  }
  if (id === "css-fonts") {
    return <CssFontsArticle navigate={navigate} />;
  }
  if (id === "css-text-styles") {
    return <CssTextStylesArticle navigate={navigate} />;
  }
  if (id === "css-box-model") {
    return <CssBoxModelArticle navigate={navigate} />;
  }
  if (id === "css-borders") {
    return <CssBordersArticle navigate={navigate} />;
  }
  if (id === "css-backgrounds") {
    return <CssBackgroundsArticle navigate={navigate} />;
  }
  if (id === "css-gradients") {
    return <CssGradientsArticle navigate={navigate} />;
  }
  if (id === "css-layout") {
    return <CssLayoutArticle navigate={navigate} />;
  }
  if (id === "css-flex") {
    return <CssFlexArticle navigate={navigate} />;
  }
  if (id === "css-responsive") {
    return <CssResponsiveArticle navigate={navigate} />;
  }
  if (id !== "fieldset" && id !== "legend") {
    return (
      <ImportedHtmlArticle
        id={id as Exclude<HtmlArticleId, "fieldset" | "legend">}
        navigate={navigate}
      />
    );
  }
  const fieldset = id === "fieldset";
  const toc: Array<[string, string]> = [
    ["개요", "개요"],
    ["왜 필요한가?", "why"],
    ["브라우저에서는 어떻게 동작하는가?", "browser"],
    ["직접 코드로 확인", "experiment"],
    ["내가 헷갈렸던 부분", "confused"],
    ["한 줄 요약", "summary"],
  ];
  return (
    <DocsFrame toc={toc}>
      <article className="prose article-prose">
        <PageActions />
        <button className="breadcrumb-button" onClick={() => navigate({ type: "category", id: "html" })}>HTML <span>›</span> Form</button>
        <h1><code>&lt;{id}&gt;</code></h1>
        <p className="lead">{fieldset ? "관련된 폼 컨트롤을 하나의 의미 있는 그룹으로 묶습니다." : "fieldset으로 묶인 폼 컨트롤 그룹의 이름을 제공합니다."}</p>

        <div className="quick-reference" id="개요">
          <p><strong>HTML 요소</strong></p>
          <p>{fieldset ? <><code>&lt;fieldset&gt;</code> 요소는 웹 양식의 여러 컨트롤과 레이블을 그룹화할 때 사용합니다.</> : <><code>&lt;legend&gt;</code> 요소는 부모 <code>&lt;fieldset&gt;</code> 콘텐츠의 설명을 나타냅니다.</>}</p>
        </div>

        <ArticleHeading id="why" title="왜 필요한가?" />
        <p>{fieldset ? "라디오 버튼이나 체크박스가 여러 개 있을 때, 개별 label만으로는 이 선택지들이 어떤 질문에 답하는지 알기 어렵습니다. fieldset은 관련 컨트롤이 하나의 맥락에 속한다는 구조를 만듭니다." : "label은 각각의 입력만 설명합니다. ‘선호하는 연락 방법’처럼 그룹 전체가 답하는 질문은 legend가 담당합니다."}</p>
        <Note title="접근성">
          {fieldset ? "보조 기술은 fieldset과 legend를 통해 사용자가 현재 어떤 입력 그룹 안에 있는지 전달할 수 있습니다." : "스크린 리더는 그룹 안의 컨트롤에 접근할 때 legend를 그룹 이름으로 함께 읽을 수 있습니다."}
        </Note>

        <ArticleHeading id="browser" title="브라우저에서는 어떻게 동작하는가?" />
        <p>{fieldset ? "브라우저는 fieldset에 기본 테두리와 여백을 적용합니다. 더 중요한 점은 접근성 트리에 group 관계를 만들고 legend의 텍스트를 그 이름으로 연결한다는 것입니다." : "legend는 기본 스타일에서 fieldset의 테두리 위에 배치됩니다. 반드시 fieldset의 첫 번째 자식으로 두어야 그룹 이름으로 일관되게 해석됩니다."}</p>

        <ArticleHeading id="experiment" title="직접 코드로 확인" />
        <CodeExample id={id} />
        <LiveExample fieldset={fieldset} />

        <ArticleHeading id="confused" title="내가 헷갈렸던 부분" />
        <p>{fieldset ? "fieldset은 테두리를 그리는 요소가 아닙니다. 스타일이 필요 없다는 이유로 div로 바꾸면 폼 컨트롤 사이의 의미 관계도 함께 사라집니다. 단순한 시각적 묶음이라면 div가 적절하고, 같은 질문에 답하는 입력 그룹이라면 fieldset이 적절합니다." : "디자인을 맞추기 위해 legend를 fieldset 밖으로 빼면 시각적으로는 비슷해도 의미 연결이 사라집니다. 위치와 모양은 CSS로 조정하고 마크업 관계는 유지해야 합니다."}</p>

        <ArticleHeading id="summary" title="한 줄 요약" />
        <div className="summary-callout">{fieldset ? "fieldset은 관련된 폼 컨트롤에 하나의 맥락을 부여하는 그룹이다." : "legend는 fieldset 안의 컨트롤들이 함께 답하는 질문이다."}</div>

        <NextPage label={fieldset ? "<legend>" : "HTML 개요"} onClick={() => navigate(fieldset ? { type: "article", id: "legend" } : { type: "category", id: "html" })} />
      </article>
    </DocsFrame>
  );
}

function CssIntroArticle({ navigate }: { navigate: (view: View) => void }) {
  const toc: Array<[string, string]> = [
    ["CSS 한 문장 정의", "css-definition"],
    ["이름의 의미", "css-name"],
    ["기본 형식", "css-syntax"],
    ["CSS 적용 방법", "css-apply-methods"],
    ["중요 키워드 5가지", "css-keywords"],
    ["한 줄 요약", "css-summary"],
  ];

  return (
    <DocsFrame toc={toc}>
      <article className="prose article-prose imported-article">
        <PageActions />
        <button className="breadcrumb-button" onClick={() => navigate({ type: "category", id: "css" })}>CSS <span>›</span></button>
        <div className="source-badge"><span>●</span> CSS FOUNDATION</div>
        <h1>CSS 개요</h1>
        <p className="lead">CSS는 HTML로 만든 웹 문서의 글자 색상, 크기, 배치, 여백 등 화면 디자인을 지정하는 언어입니다.</p>

        <ArticleHeading id="css-definition" title="CSS 한 문장 정의" />
        <div className="summary-callout">CSS는 HTML 문서가 화면에서 어떤 모습으로 보일지 정하는 디자인 언어입니다.</div>

        <ArticleHeading id="css-name" title="CSS는 무엇의 줄임말인가?" />
        <div className="definition-card"><code>CSS</code><span>=</span><strong>Cascading Style Sheets</strong></div>
        <DocsTable
          headers={["단어", "의미"]}
          rows={[
            [<code key="cascading">Cascading</code>, "여러 스타일이 겹칠 때 우선순위에 따라 적용되는 방식"],
            [<code key="style">Style</code>, "색상, 크기, 여백, 배치 등의 디자인"],
            [<code key="sheets">Sheets</code>, "스타일 규칙을 모아 놓은 문서"],
          ]}
        />
        <Note title="쉽게 말하면">CSS는 웹페이지에 적용할 디자인 규칙을 모아 놓은 스타일 문서입니다.</Note>

        <ArticleHeading id="css-syntax" title="CSS의 기본 형식" />
        <CssSyntaxExample />
        <DocsTable
          headers={["코드", "이름", "설명"]}
          rows={[
            [<code key="selector">p</code>, "선택자", "스타일을 적용할 HTML 요소를 선택"],
            [<code key="property">color</code>, "속성", "선택한 요소의 무엇을 디자인할지 지정"],
            [<code key="value">blue</code>, "속성값", "속성을 어떤 모습으로 적용할지 지정"],
            [<code key="declaration">color: blue;</code>, "선언", "속성과 속성값을 한 쌍으로 작성한 명령"],
          ]}
        />

        <ArticleHeading id="css-apply-methods" title="CSS를 적용하는 3가지 방법" />
        <p>CSS는 HTML에 적용하는 위치에 따라 <strong>인라인 스타일</strong>, <strong>내부 스타일 시트</strong>, <strong>외부 스타일 시트</strong>로 나눌 수 있습니다.</p>
        <DocsTable
          headers={["방법", "작성 위치", "사용하기 좋은 경우"]}
          rows={[
            ["인라인 스타일", <code key="inline">style 속성</code>, "특정 요소 하나만 간단히 꾸밀 때"],
            ["내부 스타일 시트", <code key="internal">&lt;style&gt; 태그</code>, "현재 HTML 문서 하나에만 스타일을 적용할 때"],
            ["외부 스타일 시트", <code key="external">별도의 .css 파일</code>, "여러 요소나 여러 페이지에서 스타일을 재사용할 때"],
          ]}
        />
        <h3 className="article-subheading">상황별 권장 방식</h3>
        <DocsTable
          headers={["상황", "권장 방식"]}
          rows={[
            ["여러 페이지에서 반복되는 디자인", "외부 CSS"],
            ["페이지 전체 디자인", "외부 CSS"],
            ["특정 페이지에서만 사용하는 디자인", "내부 CSS 또는 외부 CSS"],
            ["잠깐 확인하는 빠른 테스트", "인라인 스타일 가능"],
            ["자바스크립트로 계산한 실시간 값", "인라인 스타일이 유용"],
            ["HTML 이메일", "호환성을 위해 인라인 스타일을 많이 사용"],
          ]}
        />

        <h3 className="article-subheading">1. 인라인 스타일</h3>
        <p>스타일 시트를 따로 만들지 않고, 스타일을 적용할 HTML 태그의 <code>style</code> 속성에 CSS 선언을 직접 작성하는 방법입니다.</p>
        <SimpleCode language="HTML" code={'<p style="color: blue; font-size: 16px;">\n  파란색 문장\n</p>'} />
        <Note title="기억하기">인라인 스타일에도 CSS를 사용하지만, 선택자 없이 해당 요소에 적용할 <code>속성: 속성값;</code>만 작성합니다. 간단한 확인에는 편리하지만 반복 사용과 수정에는 불편합니다.</Note>

        <h3 className="article-subheading">2. 내부 스타일 시트</h3>
        <p>HTML 문서의 <code>&lt;head&gt;</code> 안에 <code>&lt;style&gt;</code> 태그를 만들고 CSS 규칙을 모아 작성하는 방법입니다.</p>
        <SimpleCode language="HTML" code={'<!doctype html>\n<html lang="ko">\n<head>\n  <style>\n    p {\n      color: blue;\n      font-size: 16px;\n    }\n  </style>\n</head>\n<body>\n  <p>파란색 문장</p>\n</body>\n</html>'} />

        <h3 className="article-subheading">3. 외부 스타일 시트</h3>
        <p>CSS 규칙을 별도의 <code>.css</code> 파일에 작성하고, HTML의 <code>&lt;link&gt;</code> 태그로 연결하는 방법입니다. 여러 페이지가 같은 디자인을 재사용하기 쉬워 실제 웹사이트에서 가장 많이 사용하는 방식입니다.</p>
        <div className="code-stack two-columns">
          <SimpleCode language="index.html" code={'<!doctype html>\n<html lang="ko">\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <p>파란색 문장</p>\n</body>\n</html>'} />
          <SimpleCode language="style.css" code={'p {\n  color: blue;\n  font-size: 16px;\n}'} />
        </div>
        <Note title="질문의 답">네, 별도의 CSS 파일을 만들어 HTML과 연결하는 것은 <strong>외부 스타일 시트</strong> 방식입니다. 다만 스타일 규칙을 모아 둔 <code>&lt;style&gt;</code> 영역도 내부 스타일 시트라고 부르므로, “스타일 시트”가 항상 별도 파일만 뜻하는 것은 아닙니다.</Note>
        <div className="summary-callout"><code>style=&quot;...&quot;</code>은 태그에 직접 작성, <code>&lt;style&gt;</code>은 현재 문서 안에 작성, <code>&lt;link&gt;</code>는 별도의 CSS 파일을 연결합니다.</div>

        <ArticleHeading id="css-keywords" title="CSS 중요 키워드 5가지" />
        <DocsTable
          headers={["키워드", "영어", "한 문장 설명"]}
          rows={[
            ["선택자", <code key="selector">Selector</code>, "어떤 HTML 요소에 스타일을 적용할지 선택합니다."],
            ["속성", <code key="property">Property</code>, "선택한 요소의 무엇을 디자인할지 지정합니다."],
            ["속성값", <code key="value">Value</code>, "속성을 어떤 모습으로 적용할지 지정합니다."],
            ["선언", <code key="declaration">Declaration</code>, "속성: 속성값;을 한 쌍으로 작성한 스타일 명령입니다."],
            ["캐스케이딩", <code key="cascading">Cascading</code>, "여러 스타일이 겹치면 우선순위를 계산하여 최종 스타일을 결정합니다."],
          ]}
        />

        <ArticleHeading id="css-summary" title="한 줄 요약" />
        <div className="summary-callout">선택자로 대상을 고르고, <code>속성: 속성값;</code> 형식의 선언으로 디자인하며, 겹친 규칙은 캐스케이딩으로 결정합니다.</div>
        <NextPage label="여백과 기본 선택자" onClick={() => navigate({ type: "article", id: "css-spacing-selectors" })} />
      </article>
    </DocsFrame>
  );
}

function CssSpacingSelectorsArticle({ navigate }: { navigate: (view: View) => void }) {
  const toc: Array<[string, string]> = [
    ["margin과 padding", "spacing"],
    ["방향별 여백", "spacing-directions"],
    ["auto와 음수 margin", "margin-auto-negative"],
    ["가로 중앙 정렬", "horizontal-centering"],
    ["가로·세로 중앙 정렬", "full-centering"],
    ["사이트 컨테이너", "site-container"],
    ["재사용 여백 CSS", "spacing-utilities"],
    ["타입 선택자", "type-selector"],
    ["클래스 선택자", "class-selector"],
    ["아이디 선택자", "id-selector"],
    ["선택자 비교", "selector-comparison"],
    ["class와 id", "class-id"],
    ["인라인 스타일", "inline-selector"],
    ["스타일 우선순위", "specificity"],
    ["선택 기준", "selector-choice"],
    ["최종 핵심 암기", "selector-summary"],
  ];

  return (
    <DocsFrame toc={toc}>
      <article className="prose article-prose imported-article">
        <PageActions />
        <button className="breadcrumb-button" onClick={() => navigate({ type: "category", id: "css" })}>CSS <span>›</span> 기초</button>
        <div className="source-badge"><span>●</span> CSS FOUNDATION</div>
        <h1 id="css-spacing-selectors">여백과 기본 선택자</h1>
        <p className="lead">margin·padding의 방향별 설정과 중앙 정렬 방법을 익히고, 타입·클래스·아이디·인라인 스타일로 대상을 선택하는 방법을 정리합니다.</p>

        <ArticleHeading id="spacing" title="1. margin과 padding" />
        <p><code>margin</code>은 테두리 바깥쪽 여백이고, <code>padding</code>은 테두리와 내용 사이의 안쪽 여백입니다.</p>
        <BoxModelDiagram />
        <DocsTable
          headers={["속성", "역할"]}
          rows={[
            [<code key="margin">margin</code>, "요소 테두리 바깥쪽의 여백"],
            [<code key="padding">padding</code>, "요소 테두리 안쪽의 여백"],
          ]}
        />
        <SimpleCode language="CSS" code={'.box {\n  margin: 20px;\n  padding: 10px;\n  border: 1px solid black;\n}'} />
        <ul>
          <li><code>margin: 20px;</code> — 다른 요소와 20px 떨어집니다.</li>
          <li><code>padding: 10px;</code> — 내용과 테두리 사이에 10px 여백이 생깁니다.</li>
        </ul>

        <h3 className="article-subheading">여백 값 작성법</h3>
        <SimpleCode language="CSS" code={'/* 모든 방향 */\nmargin: 10px;\n\n/* 위·아래 / 왼쪽·오른쪽 */\nmargin: 10px 20px;\n\n/* 위 / 왼쪽·오른쪽 / 아래 */\nmargin: 10px 20px 30px;\n\n/* 위 / 오른쪽 / 아래 / 왼쪽 */\nmargin: 10px 20px 30px 40px;\n\n/* padding도 같은 순서로 작성 */\npadding: 10px 20px;'} />
        <Note title="시계 방향으로 기억하기">값을 4개 쓰면 위쪽부터 시작해 오른쪽 → 아래쪽 → 왼쪽 순서로 적용됩니다.</Note>

        <h3 id="spacing-directions" className="article-subheading">방향별 margin과 padding</h3>
        <DocsTable
          headers={["방향", "margin", "padding"]}
          rows={[
            ["위", <code key="mt">margin-top</code>, <code key="pt">padding-top</code>],
            ["오른쪽", <code key="mr">margin-right</code>, <code key="pr">padding-right</code>],
            ["아래", <code key="mb">margin-bottom</code>, <code key="pb">padding-bottom</code>],
            ["왼쪽", <code key="ml">margin-left</code>, <code key="pl">padding-left</code>],
          ]}
        />
        <SimpleCode language="CSS" code={'.box {\n  margin-top: 20px;\n  margin-bottom: 32px;\n  padding-left: 16px;\n  padding-right: 16px;\n}'} />
        <h3 className="article-subheading">가로·세로를 묶는 논리 속성</h3>
        <SimpleCode language="CSS" code={'.box {\n  margin-block: 24px;   /* 위·아래 */\n  margin-inline: 16px; /* 시작·끝, 한글에서는 좌·우 */\n\n  padding-block: 20px;\n  padding-inline: 16px;\n}'} />
        <DocsTable
          headers={["속성", "한글·영어 문서에서 적용되는 방향"]}
          rows={[
            [<code key="margin-block">margin-block</code>, "위·아래 margin"],
            [<code key="margin-inline">margin-inline</code>, "왼쪽·오른쪽 margin"],
            [<code key="padding-block">padding-block</code>, "위·아래 padding"],
            [<code key="padding-inline">padding-inline</code>, "왼쪽·오른쪽 padding"],
          ]}
        />

        <h3 id="margin-auto-negative" className="article-subheading">margin의 auto와 음수 값</h3>
        <DocsTable
          headers={["값", "사용 가능 여부", "역할"]}
          rows={[
            [<code key="margin-auto">margin: auto;</code>, "margin만 가능", "남는 공간을 자동으로 나누어 배치"],
            [<code key="negative-margin">margin: -10px;</code>, "margin만 가능", "요소 사이 간격을 줄이거나 겹치게 함"],
            [<code key="padding-auto">padding: auto;</code>, "사용 불가", "유효한 padding 값이 아님"],
            [<code key="negative-padding">padding: -10px;</code>, "사용 불가", "padding은 음수가 될 수 없음"],
          ]}
        />
        <SimpleCode language="CSS" code={'.center-box {\n  width: 320px;\n  margin-inline: auto;\n}\n\n.overlap-card {\n  margin-top: -24px;\n}'} />
        <Note title="음수 margin은 필요한 경우만">음수 margin은 의도적으로 요소를 당기거나 겹칠 때 유용하지만, 레이아웃 흐름을 파악하기 어려워질 수 있으므로 목적이 분명할 때 사용합니다.</Note>

        <h3 id="horizontal-centering" className="article-subheading">가로 중앙 정렬 방법</h3>
        <h3 className="article-subheading">1. 블록 요소 자체를 가운데 정렬</h3>
        <p>부모보다 작은 너비가 정해진 블록 요소의 좌우 margin을 <code>auto</code>로 설정합니다.</p>
        <SimpleCode language="CSS" code={'.box {\n  width: 320px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n/* 같은 의미의 간단한 작성 */\n.box {\n  width: 320px;\n  margin-inline: auto;\n}'} />
        <Note title="너비가 필요함">블록 요소가 부모 너비를 모두 차지하고 있으면 나눌 남는 공간이 없습니다. <code>width</code>나 <code>max-width</code>로 부모보다 작게 만들어야 중앙 정렬 결과가 보입니다.</Note>

        <h3 className="article-subheading">2. 글자와 인라인 요소를 가운데 정렬</h3>
        <p>부모 블록에 <code>text-align: center;</code>를 사용합니다.</p>
        <div className="code-stack two-columns">
          <SimpleCode language="HTML" code={'<div class="hero">\n  <h1>가운데 제목</h1>\n  <a href="#">시작하기</a>\n</div>'} />
          <SimpleCode language="CSS" code={'.hero {\n  text-align: center;\n}'} />
        </div>
        <div className="summary-callout"><code>margin-inline: auto</code>는 블록 박스 자체, <code>text-align: center</code>는 부모 안의 글자와 인라인 콘텐츠를 가운데로 정렬합니다.</div>

        <h3 id="full-centering" className="article-subheading">가로·세로 모두 중앙 정렬</h3>
        <h3 className="article-subheading">Flexbox 사용</h3>
        <SimpleCode language="CSS" code={'.parent {\n  min-height: 400px;\n  display: flex;\n  justify-content: center; /* 가로 */\n  align-items: center;     /* 세로 */\n}'} />
        <h3 className="article-subheading">Grid 사용</h3>
        <SimpleCode language="CSS" code={'.parent {\n  min-height: 400px;\n  display: grid;\n  place-items: center; /* 가로와 세로를 한 번에 */\n}'} />
        <Note title="부모 높이 확인">세로 중앙 정렬을 확인하려면 부모에 정렬할 수 있는 높이가 있어야 합니다. 화면 전체라면 <code>min-height: 100vh;</code> 또는 <code>100dvh</code>를 사용할 수 있습니다.</Note>

        <h3 id="site-container" className="article-subheading">웹사이트 전체 내용을 가운데 배치하는 컨테이너</h3>
        <p>페이지 배경은 화면 전체를 사용하면서 실제 콘텐츠는 최대 너비 안에 가운데 배치하는 패턴입니다.</p>
        <div className="code-stack two-columns">
          <SimpleCode language="HTML" code={'<header class="site-header">\n  <div class="site-container">메뉴</div>\n</header>\n\n<main class="site-container">\n  페이지 내용\n</main>'} />
          <SimpleCode language="CSS" code={'body {\n  margin: 0;\n}\n\n.site-container {\n  width: min(100% - 32px, 1200px);\n  margin-inline: auto;\n}'} />
        </div>
        <p><code>100% - 32px</code>은 작은 화면에서 좌우에 각각 16px의 안전 여백을 만들고, <code>1200px</code>은 큰 화면에서 콘텐츠가 지나치게 넓어지는 것을 막습니다.</p>
        <h3 className="article-subheading">같은 패턴을 익숙한 속성으로 작성</h3>
        <SimpleCode language="CSS" code={'.site-container {\n  width: calc(100% - 32px);\n  max-width: 1200px;\n  margin-left: auto;\n  margin-right: auto;\n}'} />

        <h3 id="spacing-utilities" className="article-subheading">복사해서 쓰는 여백·정렬 CSS</h3>
        <SimpleCode language="CSS" code={'.u-m-0 { margin: 0; }\n.u-mx-auto { margin-inline: auto; }\n.u-mt-sm { margin-top: 8px; }\n.u-mt-md { margin-top: 16px; }\n.u-mt-lg { margin-top: 32px; }\n\n.u-p-0 { padding: 0; }\n.u-p-sm { padding: 8px; }\n.u-p-md { padding: 16px; }\n.u-p-lg { padding: 32px; }\n.u-px-md { padding-inline: 16px; }\n.u-py-md { padding-block: 16px; }\n\n.u-text-center { text-align: center; }\n\n.u-flex-center {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.u-grid-center {\n  display: grid;\n  place-items: center;\n}\n\n.site-container {\n  width: min(100% - 32px, 1200px);\n  margin-inline: auto;\n}'} />
        <SimpleCode language="HTML" code={'<main class="site-container">\n  <section class="u-p-lg u-text-center">\n    <h1 class="u-m-0">가운데 정렬된 사이트 내용</h1>\n  </section>\n</main>'} />

        <ArticleHeading id="type-selector" title="2. 타입 선택자" />
        <p>타입 선택자는 <strong>태그 이름으로 요소를 선택</strong>합니다. 아래의 <code>p</code>는 페이지에 있는 모든 <code>&lt;p&gt;</code> 요소를 선택합니다.</p>
        <div className="code-stack two-columns">
          <SimpleCode language="HTML" code={'<p>첫 번째 문단</p>\n<p>두 번째 문단</p>'} />
          <SimpleCode language="CSS" code={'p {\n  color: blue;\n}'} />
        </div>
        <div className="summary-callout"><code>p</code> → 모든 <code>&lt;p&gt;</code> 요소 선택</div>

        <ArticleHeading id="class-selector" title="3. 클래스 선택자" />
        <p>클래스 선택자는 HTML의 <code>class</code> 속성값으로 요소를 선택합니다. CSS에서는 클래스 이름 앞에 마침표 <code>.</code>를 붙입니다.</p>
        <div className="selector-connection" aria-label="클래스 선택자 연결 관계">
          <span>HTML <code>class=&quot;warning&quot;</code></span><b>연결</b><span>CSS <code>.warning</code></span>
        </div>
        <div className="code-stack two-columns">
          <SimpleCode language="HTML" code={'<p class="warning">첫 번째 경고</p>\n<p class="warning">두 번째 경고</p>\n<div class="warning">세 번째 경고</div>'} />
          <SimpleCode language="CSS" code={'.warning {\n  color: red;\n}'} />
        </div>
        <Note title="반복 사용 가능">같은 클래스 이름은 여러 요소에 반복해서 사용할 수 있으므로 공통 디자인에 적합합니다.</Note>

        <ArticleHeading id="id-selector" title="4. 아이디 선택자" />
        <p>아이디 선택자는 HTML의 <code>id</code> 속성값으로 요소를 선택합니다. CSS에서는 아이디 이름 앞에 해시 기호 <code>#</code>을 붙입니다.</p>
        <div className="selector-connection" aria-label="아이디 선택자 연결 관계">
          <span>HTML <code>id=&quot;main-title&quot;</code></span><b>연결</b><span>CSS <code>#main-title</code></span>
        </div>
        <div className="code-stack two-columns">
          <SimpleCode language="HTML" code={'<h1 id="main-title">웹사이트 제목</h1>'} />
          <SimpleCode language="CSS" code={'#main-title {\n  color: navy;\n}'} />
        </div>
        <Note title="한 페이지에서 한 번">하나의 <code>id</code> 값은 같은 HTML 문서에서 한 요소에만 사용해야 합니다. 여러 요소에 같은 스타일을 적용하려면 <code>class</code>를 사용합니다.</Note>
        <SimpleCode language="HTML" code={'<!-- 권장하지 않음: 같은 id가 중복됨 -->\n<h1 id="main-title">첫 번째 제목</h1>\n<h2 id="main-title">두 번째 제목</h2>\n\n<!-- 권장: 반복할 때는 class 사용 -->\n<p class="warning">첫 번째 경고</p>\n<p class="warning">두 번째 경고</p>'} />

        <ArticleHeading id="selector-comparison" title="5. 타입·클래스·아이디 선택자 비교" />
        <DocsTable
          headers={["구분", "타입 선택자", "클래스 선택자", "아이디 선택자"]}
          rows={[
            ["기본형", <code key="type">p</code>, <code key="class">.warning</code>, <code key="id">#main-title</code>],
            ["HTML 속성", "필요 없음", <code key="class-attr">class=&quot;warning&quot;</code>, <code key="id-attr">id=&quot;main-title&quot;</code>],
            ["선택 기준", "태그 이름", "클래스 이름", "아이디 이름"],
            ["사용 범위", "해당 태그 전체", "여러 요소에 반복 가능", "같은 값은 한 요소에만 사용"],
            ["주요 용도", "태그의 기본 디자인", "반복되는 디자인", "하나의 고유한 요소"],
            ["일반적인 우선순위", "낮음", "타입보다 높음", "클래스보다 높음"],
          ]}
        />
        <div className="code-stack two-columns">
          <SimpleCode language="HTML" code={'<p>일반 문단</p>\n<p class="warning">경고 문단</p>\n<p id="important-message">중요한 문단</p>'} />
          <SimpleCode language="CSS" code={'p { color: blue; }\n.warning { color: red; }\n#important-message { color: purple; }'} />
        </div>

        <ArticleHeading id="class-id" title="6. class와 id의 차이" />
        <DocsTable
          headers={["구분", "class", "id"]}
          rows={[
            ["CSS 기호", <code key="dot">.</code>, <code key="hash">#</code>],
            ["같은 이름 반복", "가능", "불가능"],
            ["한 요소에 여러 개 지정", "공백으로 구분해 가능", "하나의 id 값만 지정"],
            ["주된 목적", "반복되는 디자인", "고유한 요소 구분"],
            ["CSS 사용 추천", "일반적인 스타일에 권장", "꼭 필요한 고유 요소에 사용"],
          ]}
        />
        <h3 className="article-subheading">클래스 여러 개 사용하기</h3>
        <div className="code-stack two-columns">
          <SimpleCode language="HTML" code={'<p class="warning large-text">\n  큰 경고 문장\n</p>'} />
          <SimpleCode language="CSS" code={'.warning {\n  color: red;\n}\n\n.large-text {\n  font-size: 24px;\n}'} />
        </div>
        <h3 className="article-subheading">class와 id 함께 사용하기</h3>
        <div className="code-stack two-columns">
          <SimpleCode language="HTML" code={'<p id="first-warning" class="warning">\n  첫 번째 경고\n</p>'} />
          <SimpleCode language="CSS" code={'.warning {\n  color: red;\n}\n\n#first-warning {\n  font-size: 24px;\n}'} />
        </div>

        <ArticleHeading id="inline-selector" title="7. 인라인 스타일과 선택자의 차이" />
        <p>인라인 스타일은 선택자를 사용하지 않고, HTML 요소의 <code>style</code> 속성에 CSS 선언을 직접 작성합니다.</p>
        <DocsTable
          headers={["구분", "클래스 선택자", "아이디 선택자", "인라인 스타일"]}
          rows={[
            ["HTML", <code key="class">class=&quot;warning&quot;</code>, <code key="id">id=&quot;important&quot;</code>, <code key="style">style=&quot;color:red&quot;</code>],
            ["CSS 기호", <code key="dot">.</code>, <code key="hash">#</code>, "선택자 없음"],
            ["작성 위치", "CSS 규칙", "CSS 규칙", "HTML 태그 안"],
            ["반복 사용", "가능", "같은 값은 한 번", "요소마다 직접 작성"],
            ["재사용", "쉬움", "고유 요소에 사용", "어려움"],
            ["일반적인 우선순위", "중간", "높음", "매우 높음"],
          ]}
        />
        <div className="code-stack two-columns">
          <SimpleCode language="HTML" code={'<!-- 인라인 스타일 -->\n<p style="color: red;">경고 문장</p>\n\n<!-- 선택자를 사용하는 방식 -->\n<p class="warning">경고 문장</p>\n<p id="important-message">중요한 문장</p>'} />
          <SimpleCode language="CSS" code={'.warning {\n  color: red;\n}\n\n#important-message {\n  color: red;\n}'} />
        </div>

        <ArticleHeading id="specificity" title="8. 스타일 우선순위" />
        <p>같은 요소의 같은 속성에 여러 규칙이 겹치면, 단순화한 일반적인 우선순위는 다음과 같습니다.</p>
        <div className="selector-priority" aria-label="CSS 선택자 우선순위">
          <code>인라인 스타일</code><span>›</span><code>#아이디</code><span>›</span><code>.클래스</code><span>›</span><code>타입</code>
        </div>
        <div className="code-stack two-columns">
          <SimpleCode language="HTML" code={'<p id="message" class="warning" style="color: orange;">\n  알림 문장\n</p>'} />
          <SimpleCode language="CSS" code={'p { color: blue; }\n.warning { color: red; }\n#message { color: green; }'} />
        </div>
        <DocsTable
          headers={["방식", "지정한 색상"]}
          rows={[
            [<><span key="text">타입 선택자 </span><code key="code">p</code></>, "파란색"],
            [<><span key="text">클래스 선택자 </span><code key="code">.warning</code></>, "빨간색"],
            [<><span key="text">아이디 선택자 </span><code key="code">#message</code></>, "초록색"],
            ["인라인 스타일", "주황색 — 최종 적용"],
          ]}
        />
        <Note title="단순화한 암기 순서">위 순서는 같은 출처의 일반 선언을 비교할 때의 기본 암기법입니다. <code>!important</code>, 스타일의 출처, 캐스케이드 레이어, 선언 순서 같은 조건에 따라 실제 결과는 달라질 수 있습니다.</Note>

        <ArticleHeading id="selector-choice" title="9. 어떤 선택자를 사용해야 할까?" />
        <div className="memory-grid selector-choice-grid">
          <span><code>p</code><small>같은 태그 전체</small></span>
          <span><code>.warning</code><small>여러 요소에 반복</small></span>
          <span><code>#main-title</code><small>하나의 고유 요소</small></span>
          <span><code>style=&quot;&quot;</code><small>빠른 테스트·동적인 값</small></span>
        </div>
        <p>실제 디자인에서는 여러 요소에 재사용하기 쉬운 클래스 선택자를 가장 많이 사용합니다.</p>
        <div className="code-stack two-columns">
          <SimpleCode language="HTML" code={'<p class="warning">주의 사항</p>'} />
          <SimpleCode language="CSS" code={'.warning {\n  color: red;\n  padding: 10px;\n  margin-bottom: 20px;\n}'} />
        </div>

        <ArticleHeading id="selector-summary" title="최종 핵심 암기" />
        <DocsTable
          headers={["기본형", "의미"]}
          rows={[
            [<code key="type">p</code>, "타입 선택자 — 해당 태그 전체"],
            [<code key="class">.warning</code>, "클래스 선택자 — 여러 요소에 반복"],
            [<code key="id">#main-title</code>, "아이디 선택자 — 하나의 고유한 요소"],
            [<code key="inline">style=&quot;&quot;</code>, "인라인 스타일 — 요소에 직접 적용"],
          ]}
        />
        <div className="summary-callout">일반적인 우선순위: <code>인라인</code> › <code>아이디</code> › <code>클래스</code> › <code>타입</code></div>
        <NextPage label="글꼴 스타일" onClick={() => navigate({ type: "article", id: "css-fonts" })} />
      </article>
    </DocsFrame>
  );
}

function CssFontsArticle({ navigate }: { navigate: (view: View) => void }) {
  const toc: Array<[string, string]> = [
    ["글꼴 핵심 속성", "font-properties"],
    ["font-family", "font-family"],
    ["font-size", "font-size"],
    ["굵기와 기울기", "font-weight-style"],
    ["line-height", "line-height"],
    ["font 한 줄 작성", "font-shorthand"],
    ["Google Fonts", "google-fonts"],
    ["아이콘과 cdnjs", "font-awesome"],
    ["재사용 CSS", "font-library"],
    ["핵심 암기", "font-summary"],
  ];

  return (
    <DocsFrame toc={toc}>
      <article className="prose article-prose imported-article">
        <PageActions />
        <button className="breadcrumb-button" onClick={() => navigate({ type: "category", id: "css" })}>CSS <span>›</span> 기초</button>
        <div className="source-badge"><span>●</span> CSS TYPOGRAPHY</div>
        <h1 id="css-fonts">글꼴 스타일</h1>
        <p className="lead">글꼴의 종류·크기·굵기·기울기·줄 간격을 지정하고, Google Fonts와 Font Awesome을 웹 문서에 연결하는 방법을 정리합니다.</p>

        <ArticleHeading id="font-properties" title="1. 글꼴 핵심 속성" />
        <DocsTable
          headers={["CSS 속성", "역할", "사용 예"]}
          rows={[
            [<code key="family">font-family</code>, "글꼴 종류 지정", <code key="family-example">font-family: Arial, sans-serif;</code>],
            [<code key="size">font-size</code>, "글자 크기 지정", <code key="size-example">font-size: 20px;</code>],
            [<code key="weight">font-weight</code>, "글자 굵기 지정", <code key="weight-example">font-weight: 700;</code>],
            [<code key="style">font-style</code>, "글자 기울기 지정", <code key="style-example">font-style: italic;</code>],
            [<code key="height">line-height</code>, "한 줄의 높이와 줄 간격 지정", <code key="height-example">line-height: 1.6;</code>],
          ]}
        />

        <ArticleHeading id="font-family" title="2. font-family: 글꼴 종류" />
        <p>앞에 작성한 글꼴부터 사용하며, 해당 글꼴이 없으면 다음 글꼴을 시도합니다. 마지막에는 <code>sans-serif</code>나 <code>serif</code> 같은 기본 글꼴 계열을 적어 둡니다.</p>
        <SimpleCode language="CSS" code={'body {\n  font-family: "Noto Sans KR", "맑은 고딕", sans-serif;\n}'} />
        <div className="structure-flow" aria-label="글꼴 적용 순서">
          <code>Noto Sans KR</code><span>→ 없으면</span><code>맑은 고딕</code><span>→ 없으면</span><code>sans-serif</code>
        </div>
        <Note title="따옴표 사용">글꼴 이름에 공백이 있으면 <code>&quot;Noto Sans KR&quot;</code>처럼 따옴표로 감싸는 것이 좋습니다.</Note>

        <ArticleHeading id="font-size" title="3. font-size: 글자 크기" />
        <DocsTable
          headers={["단위", "기준"]}
          rows={[
            [<code key="px">px</code>, "고정된 크기"],
            [<code key="percent">%</code>, "부모 요소의 글자 크기"],
            [<code key="em">em</code>, "부모 요소의 글자 크기"],
            [<code key="rem">rem</code>, "문서의 기본 글자 크기"],
          ]}
        />
        <SimpleCode language="CSS" code={'h1 { font-size: 2rem; }  /* 기본 16px이면 32px */\np  { font-size: 1rem; }  /* 기본 16px */'} />
        <Note title="기본 크기">브라우저의 기본 글자 크기는 일반적으로 <code>16px</code>입니다. 사용자의 글자 크기 설정을 존중하기 쉬운 <code>rem</code>을 자주 사용합니다.</Note>

        <ArticleHeading id="font-weight-style" title="4. font-weight와 font-style" />
        <DocsTable
          headers={["속성값", "의미"]}
          rows={[
            [<code key="normal">font-weight: 400;</code>, "보통 굵기"],
            [<code key="bold">font-weight: 700;</code>, "굵은 글자"],
            [<code key="black">font-weight: 900;</code>, "매우 굵은 글자"],
            [<code key="italic">font-style: italic;</code>, "기울어진 글자"],
            [<code key="not-italic">font-style: normal;</code>, "기울이지 않은 글자"],
          ]}
        />
        <SimpleCode language="CSS" code={'.title {\n  font-weight: 700;\n}\n\n.accent {\n  font-weight: bold;\n  font-style: italic;\n}'} />
        <Note title="지원되는 굵기">사용하는 글꼴이 해당 굵기를 제공해야 정확하게 표시됩니다. Google Fonts를 불러올 때도 실제 사용할 굵기만 선택합니다.</Note>

        <ArticleHeading id="line-height" title="5. line-height: 줄 높이" />
        <p><code>line-height</code>는 글자 자체의 크기가 아니라 <strong>한 줄 전체의 높이</strong>를 지정합니다. 단위 없이 작성하면 현재 글자 크기에 비율을 곱합니다.</p>
        <SimpleCode language="CSS" code={'p {\n  font-size: 16px;\n  line-height: 1.6; /* 16px × 1.6 = 25.6px */\n}'} />
        <div className="summary-callout">긴 본문에는 보통 <code>line-height: 1.5;</code>에서 <code>1.7;</code> 정도를 사용하면 읽기 편합니다.</div>

        <ArticleHeading id="font-shorthand" title="6. font 속성으로 한 줄 작성" />
        <p><code>font</code> 단축 속성을 사용하면 여러 글꼴 속성을 한 줄로 작성할 수 있습니다.</p>
        <SimpleCode language="CSS" code={'p {\n  font: italic 700 20px/1.6 Arial, sans-serif;\n}\n\n/* 순서\nfont-style → font-weight → font-size/line-height → font-family\n*/'} />
        <Note title="처음에는 나누어 작성">단축 속성은 일부 값을 빠뜨리면 초기값으로 돌아갈 수 있습니다. 학습할 때는 각 속성을 따로 작성하면 의미를 확인하기 쉽습니다.</Note>

        <ArticleHeading id="google-fonts" title="7. Google Fonts로 웹 폰트 사용" />
        <p><strong>웹 폰트</strong>는 사용자의 컴퓨터에 설치되어 있지 않아도 웹에서 내려받아 사용하는 글꼴입니다. Google Fonts에서 원하는 글꼴과 굵기를 선택한 뒤 HTML과 CSS에 적용합니다.</p>
        <h3 className="article-subheading">HTML에서 글꼴 불러오기</h3>
        <SimpleCode language="HTML" code={'<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link\n  rel="stylesheet"\n  href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap"\n>'} />
        <h3 className="article-subheading">CSS에서 적용하기</h3>
        <SimpleCode language="CSS" code={'body {\n  font-family: "Noto Sans KR", sans-serif;\n}\n\n.title {\n  font-weight: 700;\n}'} />
        <Note title="로딩 줄이기">사용하지 않는 글꼴과 굵기까지 모두 불러오면 페이지가 무거워집니다. 실제 사용하는 종류와 굵기만 선택합니다.</Note>

        <ArticleHeading id="font-awesome" title="8. Font Awesome 아이콘과 cdnjs" />
        <p><strong>cdnjs</strong>는 라이브러리 파일을 전달하는 CDN이고, <strong>Font Awesome</strong>은 아이콘을 제공하는 라이브러리입니다. cdnjs에서 Font Awesome의 CSS를 불러온 뒤 아이콘 클래스를 사용합니다.</p>
        <h3 className="article-subheading">HTML의 head에서 아이콘 CSS 불러오기</h3>
        <SimpleCode language="HTML" code={'<link\n  rel="stylesheet"\n  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.0/css/all.min.css"\n>'} />
        <h3 className="article-subheading">아이콘 사용하기</h3>
        <SimpleCode language="HTML" code={'<i class="fa-solid fa-house" aria-hidden="true"></i>\n<i class="fa-solid fa-user" aria-hidden="true"></i>\n<i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>\n<i class="fa-brands fa-github" aria-hidden="true"></i>'} />
        <SimpleCode language="CSS" code={'.fa-house {\n  font-size: 24px;\n  color: tomato;\n}'} />
        <Note title="접근성">장식용 아이콘에는 <code>aria-hidden=&quot;true&quot;</code>를 사용합니다. 아이콘만 있는 버튼에는 기능을 설명하는 <code>aria-label</code>을 반드시 작성합니다.</Note>

        <ArticleHeading id="font-library" title="9. 재사용 가능한 글꼴 CSS" />
        <p>자주 쓰는 값을 CSS 변수와 클래스로 만들어 두면 여러 페이지에서 라이브러리처럼 재사용할 수 있습니다.</p>
        <SimpleCode language="CSS" code={':root {\n  --font-sans: "Noto Sans KR", sans-serif;\n  --text-base: 1rem;\n  --text-title: 2rem;\n  --leading-body: 1.6;\n}\n\n.font-title {\n  font: normal 700 var(--text-title)/1.2 var(--font-sans);\n}\n\n.font-body {\n  font: normal 400 var(--text-base)/var(--leading-body) var(--font-sans);\n}\n\n.font-accent {\n  font-weight: 700;\n  font-style: italic;\n}'} />
        <SimpleCode language="HTML" code={'<h1 class="font-title">레드향</h1>\n<p class="font-body">껍질에 붉은 빛이 돌아 레드향이라 불린다.</p>\n<strong class="font-accent">중요한 내용</strong>'} />

        <ArticleHeading id="font-summary" title="10. 핵심 암기" />
        <DocsTable
          headers={["이름", "역할"]}
          rows={[
            [<code key="summary-family">font-family</code>, "글꼴 종류"],
            [<code key="summary-size">font-size</code>, "글자 크기"],
            [<code key="summary-weight">font-weight</code>, "글자 굵기"],
            [<code key="summary-style">font-style</code>, "글자 기울기"],
            [<code key="summary-height">line-height</code>, "줄 높이와 줄 간격"],
            ["Google Fonts", "웹 폰트 제공 서비스"],
            ["cdnjs", "라이브러리 파일을 전달하는 CDN"],
            ["Font Awesome", "아이콘 라이브러리"],
          ]}
        />
        <div className="summary-callout">Google Fonts는 글꼴을 불러오고 <code>font-family</code>로 적용합니다. Font Awesome은 CDN에서 CSS를 불러오고 아이콘 클래스로 사용합니다.</div>
        <NextPage label="텍스트 스타일" onClick={() => navigate({ type: "article", id: "css-text-styles" })} />
      </article>
    </DocsFrame>
  );
}

function CssTextStylesArticle({ navigate }: { navigate: (view: View) => void }) {
  const toc: Array<[string, string]> = [
    ["빠른 속성표", "text-properties"],
    ["글자 색상", "text-color"],
    ["텍스트 정렬", "text-align"],
    ["줄 높이", "text-line-height"],
    ["밑줄·윗줄·취소선", "text-decoration"],
    ["글자 그림자", "text-shadow"],
    ["글자 간격", "letter-spacing"],
    ["재사용 클래스", "text-utilities"],
    ["핵심 암기", "text-summary"],
  ];

  return (
    <DocsFrame toc={toc}>
      <article className="prose article-prose imported-article">
        <PageActions />
        <button className="breadcrumb-button" onClick={() => navigate({ type: "category", id: "css" })}>CSS <span>›</span> 기초</button>
        <div className="source-badge"><span>●</span> CSS TEXT</div>
        <h1 id="css-text-styles">텍스트 스타일</h1>
        <p className="lead">글자 색상과 정렬, 줄 높이, 장식선, 그림자, 글자 간격을 빠르게 찾아 복사할 수 있도록 속성별로 정리합니다.</p>

        <ArticleHeading id="text-properties" title="1. 빠른 속성표" />
        <DocsTable
          headers={["CSS 속성", "역할", "자주 쓰는 예"]}
          rows={[
            [<code key="color">color</code>, "글자 색상", <code key="color-example">color: #2563eb;</code>],
            [<code key="align">text-align</code>, "가로 정렬", <code key="align-example">text-align: center;</code>],
            [<code key="line-height">line-height</code>, "한 줄의 높이", <code key="line-height-example">line-height: 1.6;</code>],
            [<code key="decoration">text-decoration</code>, "밑줄·윗줄·취소선", <code key="decoration-example">text-decoration: underline;</code>],
            [<code key="shadow">text-shadow</code>, "글자 그림자", <code key="shadow-example">text-shadow: 1px 1px 3px #999;</code>],
            [<code key="spacing">letter-spacing</code>, "글자 사이 간격", <code key="spacing-example">letter-spacing: 0.05em;</code>],
          ]}
        />

        <ArticleHeading id="text-color" title="2. color: 글자 색상" />
        <p><code>color</code>는 요소 안의 글자 색상을 지정합니다. 자식 요소에 별도 색상이 없으면 부모의 색상을 상속받습니다.</p>
        <DocsTable
          headers={["표현 방법", "예"]}
          rows={[
            ["색상 이름", <code key="name">color: tomato;</code>],
            ["HEX", <code key="hex">color: #2563eb;</code>],
            ["RGB", <code key="rgb">color: rgb(37, 99, 235);</code>],
            ["투명도 포함", <code key="rgba">color: rgb(37 99 235 / 70%);</code>],
          ]}
        />
        <SimpleCode language="CSS" code={'.title {\n  color: #1d4ed8;\n}\n\n.description {\n  color: rgb(31 41 55 / 75%);\n}'} />
        <Note title="가독성 확인">글자색과 배경색의 명도 차이가 너무 작으면 읽기 어렵습니다. 특히 본문은 충분한 대비를 유지합니다.</Note>

        <ArticleHeading id="text-align" title="3. text-align: 텍스트 정렬" />
        <p><code>text-align</code>은 블록 요소 안에 있는 글자와 인라인 콘텐츠의 가로 정렬을 지정합니다.</p>
        <DocsTable
          headers={["값", "결과"]}
          rows={[
            [<code key="left">left</code>, "왼쪽 정렬"],
            [<code key="center">center</code>, "가운데 정렬"],
            [<code key="right">right</code>, "오른쪽 정렬"],
            [<code key="justify">justify</code>, "양쪽 정렬"],
            [<code key="start">start</code>, "글쓰기 방향의 시작 쪽 정렬"],
            [<code key="end">end</code>, "글쓰기 방향의 끝 쪽 정렬"],
          ]}
        />
        <SimpleCode language="CSS" code={'.title { text-align: center; }\n.description { text-align: left; }\n.price { text-align: right; }'} />
        <Note title="박스 자체 정렬과 다름"><code>text-align: center;</code>는 요소 안의 글자를 가운데로 정렬합니다. 블록 요소 자체를 가운데에 놓을 때는 너비와 <code>margin-inline: auto;</code> 등을 사용합니다.</Note>

        <ArticleHeading id="text-line-height" title="4. line-height: 줄 높이" />
        <p><code>line-height</code>는 글자 크기가 아니라 <strong>한 줄 전체의 높이</strong>를 지정합니다. 여러 줄 본문의 읽기 편한 정도를 조절할 때 사용합니다.</p>
        <SimpleCode language="CSS" code={'p {\n  font-size: 16px;\n  line-height: 1.6; /* 실제 줄 높이 25.6px */\n}'} />
        <DocsTable
          headers={["사용 위치", "권장 시작값"]}
          rows={[
            ["큰 제목", <code key="title-height">line-height: 1.2;</code>],
            ["짧은 문장", <code key="short-height">line-height: 1.4;</code>],
            ["일반 본문", <code key="body-height">line-height: 1.5 ~ 1.7;</code>],
          ]}
        />
        <Note title="단위 없는 값 권장"><code>line-height: 1.6;</code>처럼 단위 없이 지정하면 글자 크기가 바뀌어도 같은 비율이 유지되고 자식 요소에도 자연스럽게 상속됩니다.</Note>

        <ArticleHeading id="text-decoration" title="5. text-decoration: 밑줄·윗줄·취소선" />
        <DocsTable
          headers={["값", "역할"]}
          rows={[
            [<code key="none">none</code>, "장식선 제거"],
            [<code key="underline">underline</code>, "글자 아래에 밑줄"],
            [<code key="overline">overline</code>, "글자 위에 윗줄"],
            [<code key="line-through">line-through</code>, "글자 가운데에 취소선"],
          ]}
        />
        <SimpleCode language="CSS" code={'.link {\n  text-decoration: underline;\n  text-underline-offset: 4px;\n}\n\n.old-price {\n  text-decoration: line-through;\n}\n\n.overline {\n  text-decoration: overline;\n}\n\n.no-line {\n  text-decoration: none;\n}'} />
        <h3 className="article-subheading">색상·모양·두께까지 지정하기</h3>
        <SimpleCode language="CSS" code={'.fancy-line {\n  text-decoration-line: underline;\n  text-decoration-color: tomato;\n  text-decoration-style: wavy;\n  text-decoration-thickness: 2px;\n  text-underline-offset: 4px;\n}\n\n/* 단축형 */\n.fancy-line {\n  text-decoration: underline wavy tomato 2px;\n}'} />
        <Note title="의미가 있는 삭제"><code>line-through</code>는 모양만 바꿉니다. 삭제된 내용이라는 의미도 전달해야 한다면 HTML의 <code>&lt;del&gt;</code> 요소를 사용합니다.</Note>

        <ArticleHeading id="text-shadow" title="6. text-shadow: 글자 그림자" />
        <p>기본 순서는 <strong>가로 거리 → 세로 거리 → 흐림 정도 → 색상</strong>입니다.</p>
        <SimpleCode language="CSS" code={'.title {\n  text-shadow: 2px 2px 4px rgb(0 0 0 / 30%);\n}\n\n/* 그림자 여러 개는 쉼표로 구분 */\n.neon {\n  color: white;\n  text-shadow:\n    0 0 4px #fff,\n    0 0 10px #22d3ee,\n    0 0 18px #22d3ee;\n}'} />
        <div className="structure-flow" aria-label="text-shadow 값 작성 순서">
          <code>2px</code><span>가로</span><code>2px</code><span>세로</span><code>4px</code><span>흐림</span><code>#999</code><span>색상</span>
        </div>
        <Note title="본문에는 약하게">강한 그림자는 작은 글자의 가독성을 떨어뜨릴 수 있습니다. 제목이나 짧은 강조 문구에 필요한 만큼만 사용합니다.</Note>

        <ArticleHeading id="letter-spacing" title="7. letter-spacing: 글자 간격" />
        <p><code>letter-spacing</code>은 글자와 글자 사이의 간격을 조절합니다. 양수는 넓게, 음수는 좁게 만듭니다.</p>
        <DocsTable
          headers={["값", "결과"]}
          rows={[
            [<code key="normal-spacing">normal</code>, "글꼴의 기본 간격"],
            [<code key="wide-spacing">0.05em</code>, "글자 크기에 비례해 조금 넓게"],
            [<code key="tight-spacing">-0.02em</code>, "글자 크기에 비례해 조금 좁게"],
            [<code key="fixed-spacing">2px</code>, "2px만큼 고정해서 넓게"],
          ]}
        />
        <SimpleCode language="CSS" code={'.title { letter-spacing: -0.02em; }\n.eyebrow { letter-spacing: 0.12em; }\n.normal-text { letter-spacing: normal; }'} />
        <Note title="작게 조절하기">간격을 지나치게 넓히거나 좁히면 한글과 긴 본문을 읽기 어려워집니다. 보통 <code>em</code> 단위로 작은 값부터 조절합니다.</Note>

        <ArticleHeading id="text-utilities" title="8. 복사해서 쓰는 재사용 클래스" />
        <SimpleCode language="CSS" code={'.text-primary { color: #2563eb; }\n.text-muted { color: rgb(31 41 55 / 65%); }\n\n.text-left { text-align: left; }\n.text-center { text-align: center; }\n.text-right { text-align: right; }\n\n.leading-tight { line-height: 1.2; }\n.leading-normal { line-height: 1.5; }\n.leading-relaxed { line-height: 1.7; }\n\n.underline { text-decoration: underline; }\n.overline { text-decoration: overline; }\n.line-through { text-decoration: line-through; }\n.no-underline { text-decoration: none; }\n\n.text-shadow-soft {\n  text-shadow: 1px 1px 3px rgb(0 0 0 / 25%);\n}\n\n.tracking-tight { letter-spacing: -0.02em; }\n.tracking-normal { letter-spacing: normal; }\n.tracking-wide { letter-spacing: 0.05em; }'} />
        <SimpleCode language="HTML" code={'<h1 class="text-center text-primary text-shadow-soft tracking-tight">\n  가운데 제목\n</h1>\n\n<p class="leading-relaxed text-muted">\n  줄 간격을 넉넉하게 설정한 본문입니다.\n</p>\n\n<del class="line-through">29,000원</del>'} />

        <ArticleHeading id="text-summary" title="9. 코딩할 때 보는 핵심 암기" />
        <SimpleCode language="CSS" code={'color: #2563eb;                  /* 글자 색 */\ntext-align: center;               /* 가운데 정렬 */\nline-height: 1.6;                 /* 줄 높이 */\ntext-decoration: underline;       /* 밑줄 */\ntext-decoration: overline;        /* 윗줄 */\ntext-decoration: line-through;    /* 취소선 */\ntext-shadow: 1px 1px 3px #999;    /* 그림자 */\nletter-spacing: 0.05em;           /* 글자 간격 */'} />
        <div className="summary-callout"><code>color</code>는 색상, <code>text-align</code>은 정렬, <code>line-height</code>는 줄 높이, <code>text-decoration</code>은 장식선, <code>text-shadow</code>는 그림자, <code>letter-spacing</code>은 글자 간격을 담당합니다.</div>
        <NextPage label="Box Model" onClick={() => navigate({ type: "article", id: "css-box-model" })} />
      </article>
    </DocsFrame>
  );
}

function CssBoxModelArticle({ navigate }: { navigate: (view: View) => void }) {
  const toc: Array<[string, string]> = [
    ["전체 흐름", "display-flow"],
    ["박스 모델", "box-model"],
    ["box-sizing", "box-sizing"],
    ["box-shadow", "box-shadow"],
    ["블록 박스", "block-box"],
    ["인라인 박스", "inline-box"],
    ["inline-block", "inline-block-box"],
    ["display 비교", "display-comparison"],
    ["재사용 CSS", "box-utilities"],
    ["핵심 암기", "box-summary"],
  ];

  return (
    <DocsFrame toc={toc}>
      <article className="prose article-prose imported-article">
        <PageActions />
        <button className="breadcrumb-button" onClick={() => navigate({ type: "category", id: "css" })}>CSS <span>›</span> Core</button>
        <div className="source-badge"><span>●</span> CSS BOX</div>
        <h1 id="css-box-model">Box Model과 display</h1>
        <p className="lead">브라우저가 HTML 요소를 박스로 만드는 방식부터 크기 계산, 그림자, block·inline·inline-block의 배치 차이까지 하나의 흐름으로 정리합니다.</p>

        <ArticleHeading id="display-flow" title="1. 박스 개념의 전체 흐름" />
        <p>HTML의 거의 모든 요소는 브라우저에서 박스로 취급됩니다. <code>display</code>가 박스의 배치 방식을 정하고, Box Model이 내부 크기와 간격을 만들며, 시각 속성이 최종 모양을 완성합니다.</p>
        <div className="structure-flow" aria-label="HTML 요소가 CSS 박스로 그려지는 순서">
          <code>HTML 요소</code><span>→</span><code>display</code><span>→</span><code>Box Model</code><span>→</span><code>box-sizing</code><span>→</span><code>시각 효과</code>
        </div>
        <DocsTable
          headers={["단계", "다루는 내용"]}
          rows={[
            [<code key="display">display</code>, "block / inline / inline-block 배치 방식"],
            ["Box Model", "content / padding / border / margin"],
            [<code key="sizing">box-sizing</code>, "width와 height의 계산 범위"],
            ["시각 효과", "background / border / border-radius / box-shadow"],
          ]}
        />

        <ArticleHeading id="box-model" title="2. CSS Box Model" />
        <p>박스는 안쪽부터 <strong>content → padding → border → margin</strong> 순서로 구성됩니다.</p>
        <BoxModelDiagram />
        <DocsTable
          headers={["영역", "역할"]}
          rows={[
            [<code key="content">content</code>, "글자나 이미지 같은 실제 내용"],
            [<code key="padding">padding</code>, "내용과 테두리 사이의 안쪽 여백"],
            [<code key="border">border</code>, "padding 바깥을 감싸는 테두리"],
            [<code key="margin">margin</code>, "다른 요소와 떨어지는 바깥 여백"],
          ]}
        />
        <SimpleCode language="CSS" code={'.card {\n  width: 300px;\n  padding: 20px;\n  border: 1px solid #d1d5db;\n  margin: 24px;\n}'} />
        <div className="summary-callout"><code>content</code>는 내용, <code>padding</code>은 안쪽 간격, <code>border</code>는 테두리, <code>margin</code>은 바깥 간격입니다.</div>

        <ArticleHeading id="box-sizing" title="3. box-sizing: 크기 계산 기준" />
        <p><code>box-sizing</code>은 지정한 <code>width</code>와 <code>height</code>가 박스의 어느 영역까지 포함하는지 결정합니다.</p>
        <DocsTable
          headers={["값", "width가 의미하는 범위", "300px 예제의 실제 너비"]}
          rows={[
            [<code key="content-box">content-box</code>, "content만 포함", "padding과 border가 더해져 350px"],
            [<code key="border-box">border-box</code>, "content + padding + border", "지정한 그대로 300px"],
          ]}
        />
        <div className="code-stack two-columns">
          <SimpleCode language="content-box" code={'.box {\n  box-sizing: content-box;\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}\n\n/* 300 + 40 + 10 = 350px */'} />
          <SimpleCode language="border-box" code={'.box {\n  box-sizing: border-box;\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}\n\n/* 전체 너비 = 300px */'} />
        </div>
        <p><code>border-box</code>에서 content가 실제로 사용할 수 있는 너비는 <code>300 - 40 - 10 = 250px</code>입니다.</p>
        <h3 className="article-subheading">프로젝트 시작 시 자주 사용하는 설정</h3>
        <SimpleCode language="CSS" code={'*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}'} />
        <Note title="왜 border-box를 많이 쓸까?">padding과 border를 추가해도 지정한 전체 크기가 커지지 않아 레이아웃의 너비를 예상하기 쉽습니다.</Note>

        <ArticleHeading id="box-shadow" title="4. box-shadow: 박스 그림자" />
        <p>기본 작성 순서는 <strong>x축 이동 → y축 이동 → 흐림 → 퍼짐 → 색상</strong>입니다.</p>
        <SimpleCode language="CSS" code={'box-shadow: x y blur spread color;\n\n.card {\n  box-shadow: 0 4px 12px 0 rgb(0 0 0 / 15%);\n}'} />
        <DocsTable
          headers={["값", "역할", "음수 사용"]}
          rows={[
            ["x축 이동", "양수면 오른쪽", "음수면 왼쪽"],
            ["y축 이동", "양수면 아래쪽", "음수면 위쪽"],
            [<code key="blur">blur</code>, "클수록 부드럽게 흐려짐", "음수 사용 불가"],
            [<code key="spread">spread</code>, "그림자 전체 크기를 확대·축소", "음수면 축소"],
            [<code key="shadow-color">color</code>, "그림자의 색상과 투명도", "해당 없음"],
          ]}
        />
        <div className="code-stack two-columns">
          <SimpleCode language="바깥 그림자" code={'.card {\n  box-shadow: 0 4px 12px rgb(0 0 0 / 15%);\n}'} />
          <SimpleCode language="안쪽 그림자" code={'.input {\n  box-shadow: inset 0 0 10px rgb(0 0 0 / 30%);\n}'} />
        </div>
        <h3 className="article-subheading">여러 그림자 사용하기</h3>
        <SimpleCode language="CSS" code={'.floating-card {\n  box-shadow:\n    0 1px 2px rgb(0 0 0 / 8%),\n    0 8px 24px rgb(0 0 0 / 14%);\n}'} />
        <Note title="inset 기억하기">일반 <code>box-shadow</code>는 박스 바깥에 생기고, 맨 앞에 <code>inset</code>을 붙이면 박스 안쪽에 생깁니다.</Note>

        <ArticleHeading id="block-box" title="5. Block-level Box" />
        <p><code>div</code>, <code>p</code>, <code>section</code>, <code>article</code>, <code>header</code>, <code>footer</code>, 제목 요소는 기본적으로 블록 박스처럼 동작합니다.</p>
        <SimpleCode language="HTML" code={'<div>A</div>\n<div>B</div>\n<div>C</div>'} />
        <SimpleCode language="CSS" code={'div {\n  display: block;\n  width: 300px;\n  height: 100px;\n}'} />
        <ul>
          <li>기본적으로 새 줄에서 시작하고 사용 가능한 가로 공간을 차지합니다.</li>
          <li><code>width</code>와 <code>height</code>를 지정할 수 있습니다.</li>
          <li><code>margin</code>, <code>padding</code>, <code>border</code>를 박스 단위로 적용합니다.</li>
        </ul>
        <div className="summary-callout">Block의 기본 흐름: <code>A</code> 아래에 <code>B</code>, 그 아래에 <code>C</code>가 세로로 쌓입니다.</div>

        <ArticleHeading id="inline-box" title="6. Inline Box" />
        <p><code>span</code>, <code>a</code>, <code>strong</code>, <code>em</code>은 기본적으로 텍스트 흐름 안에 들어가는 인라인 박스처럼 동작합니다.</p>
        <SimpleCode language="HTML" code={'<span>A</span>\n<span>B</span>\n<span>C</span>\n\n<!-- 화면에서는 A B C처럼 한 줄에 배치 -->'} />
        <SimpleCode language="CSS" code={'span {\n  display: inline;\n  width: 300px;  /* 일반적으로 원하는 방식으로 적용되지 않음 */\n  height: 200px; /* 일반적으로 원하는 방식으로 적용되지 않음 */\n}'} />
        <ul>
          <li>새 줄을 만들지 않고 콘텐츠 크기만큼만 너비를 차지합니다.</li>
          <li>문장 속 글자처럼 한 줄의 텍스트 흐름에 참여합니다.</li>
          <li><code>width</code>와 <code>height</code>로 박스 크기를 직접 정하기 어렵습니다.</li>
        </ul>
        <Note title="인라인 박스의 목적">인라인 박스는 <code>안녕하세요 &lt;span&gt;강조&lt;/span&gt; 반갑습니다.</code>처럼 문장의 흐름을 유지하기 위한 박스입니다.</Note>

        <ArticleHeading id="inline-block-box" title="7. inline-block" />
        <p><code>inline-block</code>은 인라인처럼 옆으로 배치되면서 블록처럼 크기를 지정할 수 있습니다.</p>
        <div className="code-stack two-columns">
          <SimpleCode language="HTML" code={'<span class="box">A</span>\n<span class="box">B</span>\n<span class="box">C</span>'} />
          <SimpleCode language="CSS" code={'.box {\n  display: inline-block;\n  width: 100px;\n  height: 100px;\n  padding: 16px;\n  border: 1px solid #999;\n}'} />
        </div>
        <div className="summary-callout"><code>inline</code>의 옆 배치 + <code>block</code>의 크기 지정 = <code>inline-block</code></div>

        <ArticleHeading id="display-comparison" title="8. block·inline·inline-block 비교" />
        <DocsTable
          headers={["특징", "block", "inline", "inline-block"]}
          rows={[
            ["새 줄에서 시작", "O", "X", "X"],
            ["옆으로 배치", "기본적으로 X", "O", "O"],
            [<code key="width">width</code>, "O", "일반적으로 X", "O"],
            [<code key="height">height</code>, "O", "일반적으로 X", "O"],
            ["내용만큼 너비 차지", "기본적으로 X", "O", "O"],
            ["박스 크기 직접 지정", "O", "제한적", "O"],
          ]}
        />
        <SimpleCode language="CSS" code={'.block { display: block; }\n.inline { display: inline; }\n.inline-block { display: inline-block; }'} />

        <ArticleHeading id="box-utilities" title="9. 복사해서 쓰는 박스 CSS" />
        <p>프로젝트에서 반복해서 사용할 수 있도록 초기 설정과 유틸리티 클래스를 한곳에 모은 예입니다.</p>
        <SimpleCode language="CSS" code={'/* 크기 계산 초기화 */\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n/* display */\n.u-block { display: block; }\n.u-inline { display: inline; }\n.u-inline-block { display: inline-block; }\n\n/* 카드 박스 */\n.ui-card {\n  padding: 20px;\n  border: 1px solid #e5e7eb;\n  border-radius: 12px;\n  background: #fff;\n  box-shadow: 0 4px 12px rgb(0 0 0 / 15%);\n}\n\n/* 자주 쓰는 그림자 */\n.u-shadow-sm { box-shadow: 0 1px 3px rgb(0 0 0 / 12%); }\n.u-shadow-md { box-shadow: 0 4px 12px rgb(0 0 0 / 15%); }\n.u-shadow-lg { box-shadow: 0 12px 32px rgb(0 0 0 / 18%); }\n.u-shadow-inset { box-shadow: inset 0 0 8px rgb(0 0 0 / 20%); }'} />
        <SimpleCode language="HTML" code={'<article class="ui-card u-shadow-md">\n  <h2>카드 제목</h2>\n  <p>padding, border, radius, shadow를 재사용합니다.</p>\n</article>\n\n<span class="u-inline-block">크기를 지정할 수 있는 인라인 박스</span>'} />

        <ArticleHeading id="box-summary" title="10. 코딩할 때 보는 핵심 암기" />
        <DocsTable
          headers={["개념", "한 줄 설명"]}
          rows={[
            ["Box Model", "content → padding → border → margin"],
            [<code key="border-box-summary">box-sizing: border-box;</code>, "지정한 width 안에 padding과 border 포함"],
            [<code key="shadow-summary">box-shadow</code>, "x → y → blur → spread → color 순서"],
            [<code key="block-summary">display: block;</code>, "새 줄에서 시작하고 크기 지정 가능"],
            [<code key="inline-summary">display: inline;</code>, "문장 흐름 안에서 내용만큼 차지"],
            [<code key="inline-block-summary">display: inline-block;</code>, "옆으로 배치하면서 크기 지정 가능"],
          ]}
        />
        <div className="summary-callout">HTML 요소 → display 방식 → Box Model → box-sizing 계산 → border·background·shadow 시각 효과의 순서로 연결해서 이해합니다.</div>
        <Note title="다음 학습 순서">이 내용을 익힌 다음에는 margin collapsing → overflow → position → Flexbox 순서로 이어가면 박스 배치의 흐름을 이해하기 좋습니다.</Note>
        <NextPage label="Border와 radius" onClick={() => navigate({ type: "article", id: "css-borders" })} />
      </article>
    </DocsFrame>
  );
}

function CssBordersArticle({ navigate }: { navigate: (view: View) => void }) {
  const toc: Array<[string, string]> = [
    ["border 기본형", "border-basics"],
    ["테두리 종류", "border-styles"],
    ["방향별 설정", "border-directions"],
    ["값 1~4개", "border-values"],
    ["border-radius", "border-radius"],
    ["모서리별 radius", "corner-radius"],
    ["원·알약·타원", "radius-shapes"],
    ["재사용 CSS", "border-utilities"],
    ["핵심 암기", "border-summary"],
  ];

  return (
    <DocsFrame toc={toc}>
      <article className="prose article-prose imported-article">
        <PageActions />
        <button className="breadcrumb-button" onClick={() => navigate({ type: "category", id: "css" })}>CSS <span>›</span> Core</button>
        <div className="source-badge"><span>●</span> CSS BORDER</div>
        <h1 id="css-borders">Border와 radius</h1>
        <p className="lead">박스 테두리의 굵기·종류·색상, 상하좌우 개별 설정, 모서리별 둥글기와 원·알약 모양을 코딩할 때 바로 찾을 수 있도록 정리합니다.</p>

        <ArticleHeading id="border-basics" title="1. border 기본형" />
        <p><code>border</code> 단축 속성은 <strong>굵기 → 종류 → 색상</strong>을 한 줄에 작성합니다. 세 값의 순서는 바꿔도 해석되지만, 이 순서로 통일하면 읽기 쉽습니다.</p>
        <SimpleCode language="CSS" code={'border: width style color;\n\n.box {\n  border: 2px solid #2563eb;\n}'} />
        <DocsTable
          headers={["속성", "역할", "예"]}
          rows={[
            [<code key="border-width">border-width</code>, "테두리 굵기", <code key="width-example">2px</code>],
            [<code key="border-style">border-style</code>, "테두리 종류", <code key="style-example">solid</code>],
            [<code key="border-color">border-color</code>, "테두리 색상", <code key="color-example">#2563eb</code>],
          ]}
        />
        <div className="code-stack two-columns">
          <SimpleCode language="나누어 작성" code={'.box {\n  border-width: 2px;\n  border-style: solid;\n  border-color: #2563eb;\n}'} />
          <SimpleCode language="한 줄로 작성" code={'.box {\n  border: 2px solid #2563eb;\n}'} />
        </div>
        <Note title="style이 필요함"><code>border-width</code>와 <code>border-color</code>를 지정해도 <code>border-style</code>이 기본값 <code>none</code>이면 테두리가 보이지 않습니다.</Note>

        <ArticleHeading id="border-styles" title="2. border-style: 테두리 종류" />
        <DocsTable
          headers={["값", "모양"]}
          rows={[
            [<code key="none">none</code>, "테두리 없음"],
            [<code key="hidden">hidden</code>, "테두리를 숨김 — 표의 경계 충돌에서 none과 차이가 있음"],
            [<code key="solid">solid</code>, "한 줄 실선"],
            [<code key="dotted">dotted</code>, "점선"],
            [<code key="dashed">dashed</code>, "긴 점선"],
            [<code key="double">double</code>, "두 줄 테두리"],
            [<code key="groove">groove</code>, "홈이 파인 듯한 입체 테두리"],
            [<code key="ridge">ridge</code>, "튀어나온 능선 같은 입체 테두리"],
            [<code key="inset">inset</code>, "박스 전체가 안으로 들어간 듯한 모양"],
            [<code key="outset">outset</code>, "박스 전체가 밖으로 나온 듯한 모양"],
          ]}
        />
        <SimpleCode language="CSS" code={'.solid { border: 2px solid #333; }\n.dotted { border: 2px dotted #333; }\n.dashed { border: 2px dashed #333; }\n.double { border: 6px double #333; }\n.groove { border: 6px groove #94a3b8; }\n.ridge { border: 6px ridge #94a3b8; }\n.inset { border: 6px inset #94a3b8; }\n.outset { border: 6px outset #94a3b8; }'} />
        <Note title="입체 테두리">groove, ridge, inset, outset의 실제 색감은 테두리 색상과 브라우저에 따라 조금 다르게 보일 수 있습니다.</Note>

        <ArticleHeading id="border-directions" title="3. 상·우·하·좌 방향별 설정" />
        <p>특정 방향에만 테두리를 넣을 때는 <code>border-top</code>, <code>border-right</code>, <code>border-bottom</code>, <code>border-left</code>를 사용합니다.</p>
        <SimpleCode language="CSS" code={'.box {\n  border-top: 4px solid tomato;\n  border-right: 3px dashed royalblue;\n  border-bottom: 2px dotted seagreen;\n  border-left: 6px double rebeccapurple;\n}'} />
        <DocsTable
          headers={["방향", "단축 속성", "세부 속성 예"]}
          rows={[
            ["위", <code key="top">border-top</code>, <code key="top-color">border-top-color</code>],
            ["오른쪽", <code key="right">border-right</code>, <code key="right-style">border-right-style</code>],
            ["아래", <code key="bottom">border-bottom</code>, <code key="bottom-width">border-bottom-width</code>],
            ["왼쪽", <code key="left">border-left</code>, <code key="left-color">border-left-color</code>],
          ]}
        />
        <h3 className="article-subheading">자주 쓰는 방향별 예제</h3>
        <SimpleCode language="CSS" code={'.section-title {\n  border-bottom: 1px solid #d1d5db;\n}\n\n.notice {\n  border-left: 4px solid #f59e0b;\n  padding-left: 12px;\n}\n\n.no-bottom-border {\n  border-bottom: 0;\n}'} />
        <h3 className="article-subheading">글쓰기 방향을 고려한 논리 속성</h3>
        <SimpleCode language="CSS" code={'.box {\n  border-block: 1px solid #d1d5db;  /* 위·아래 */\n  border-inline: 2px solid #2563eb; /* 시작·끝 */\n}\n\n.notice {\n  border-inline-start: 4px solid #f59e0b;\n}'} />
        <Note title="left와 inline-start"><code>border-left</code>는 항상 물리적인 왼쪽입니다. <code>border-inline-start</code>는 한국어·영어에서는 왼쪽이지만 오른쪽에서 왼쪽으로 쓰는 언어에서는 오른쪽이 됩니다.</Note>

        <ArticleHeading id="border-values" title="4. border-width·style·color 값 1~4개" />
        <p><code>border-width</code>, <code>border-style</code>, <code>border-color</code>는 margin과 같은 시계 방향 규칙으로 값 1~4개를 받을 수 있습니다.</p>
        <DocsTable
          headers={["값 개수", "적용 방향"]}
          rows={[
            ["1개", "상·우·하·좌 모두"],
            ["2개", "상하 / 좌우"],
            ["3개", "상 / 좌우 / 하"],
            ["4개", "상 / 우 / 하 / 좌 — 시계 방향"],
          ]}
        />
        <SimpleCode language="CSS" code={'.box {\n  /* 위 1px / 오른쪽 2px / 아래 3px / 왼쪽 4px */\n  border-width: 1px 2px 3px 4px;\n\n  /* 위·아래 solid / 왼쪽·오른쪽 dashed */\n  border-style: solid dashed;\n\n  /* 위 red / 오른쪽 blue / 아래 green / 왼쪽 purple */\n  border-color: red blue green purple;\n}'} />
        <Note title="border 단축형과 구분"><code>border: 1px solid black;</code>은 모든 방향을 같은 값으로 설정합니다. 방향마다 다르게 만들려면 위의 개별 속성이나 <code>border-top</code> 등을 사용합니다.</Note>

        <ArticleHeading id="border-radius" title="5. border-radius: 모서리 둥글게" />
        <p><code>border-radius</code>는 테두리가 없어도 요소의 배경과 내용 영역 모서리를 둥글게 만들 수 있습니다.</p>
        <DocsTable
          headers={["값 개수", "적용 모서리"]}
          rows={[
            ["1개", "모든 모서리"],
            ["2개", "왼쪽 위·오른쪽 아래 / 오른쪽 위·왼쪽 아래"],
            ["3개", "왼쪽 위 / 오른쪽 위·왼쪽 아래 / 오른쪽 아래"],
            ["4개", "왼쪽 위 / 오른쪽 위 / 오른쪽 아래 / 왼쪽 아래"],
          ]}
        />
        <SimpleCode language="CSS" code={'.all { border-radius: 12px; }\n.opposite { border-radius: 20px 4px; }\n.three { border-radius: 20px 8px 2px; }\n.four { border-radius: 20px 16px 8px 4px; }'} />
        <div className="summary-callout">값 4개의 순서: <code>왼쪽 위 → 오른쪽 위 → 오른쪽 아래 → 왼쪽 아래</code></div>

        <ArticleHeading id="corner-radius" title="6. 모서리별 border-radius" />
        <DocsTable
          headers={["모서리", "속성"]}
          rows={[
            ["왼쪽 위", <code key="top-left">border-top-left-radius</code>],
            ["오른쪽 위", <code key="top-right">border-top-right-radius</code>],
            ["오른쪽 아래", <code key="bottom-right">border-bottom-right-radius</code>],
            ["왼쪽 아래", <code key="bottom-left">border-bottom-left-radius</code>],
          ]}
        />
        <SimpleCode language="CSS" code={'.message {\n  border-top-left-radius: 16px;\n  border-top-right-radius: 16px;\n  border-bottom-right-radius: 16px;\n  border-bottom-left-radius: 4px;\n}'} />
        <h3 className="article-subheading">가로·세로 반지름을 다르게 지정</h3>
        <SimpleCode language="CSS" code={'.ellipse-corner {\n  /* 가로 반지름 / 세로 반지름 */\n  border-radius: 50% / 25%;\n}\n\n.single-corner {\n  border-top-left-radius: 40px 20px;\n}'} />

        <ArticleHeading id="radius-shapes" title="7. 원·알약·이미지 둥글게 만들기" />
        <div className="code-stack two-columns">
          <SimpleCode language="원" code={'.circle {\n  width: 80px;\n  aspect-ratio: 1;\n  border-radius: 50%;\n}'} />
          <SimpleCode language="알약" code={'.pill {\n  min-height: 40px;\n  padding-inline: 18px;\n  border-radius: 9999px;\n}'} />
        </div>
        <SimpleCode language="둥근 이미지" code={'.avatar {\n  width: 80px;\n  aspect-ratio: 1;\n  border-radius: 50%;\n  object-fit: cover;\n}\n\n.rounded-image-wrap {\n  border-radius: 16px;\n  overflow: hidden; /* 자식 이미지도 둥근 모서리에 맞춰 자름 */\n}'} />
        <Note title="원을 만드는 조건"><code>border-radius: 50%;</code>만으로 항상 원이 되지는 않습니다. 요소의 가로와 세로 크기가 같아야 정확한 원이 됩니다.</Note>

        <ArticleHeading id="border-utilities" title="8. 복사해서 쓰는 Border CSS" />
        <SimpleCode language="CSS" code={'/* 기본 테두리 */\n.u-border { border: 1px solid #d1d5db; }\n.u-border-0 { border: 0; }\n.u-border-top { border-top: 1px solid #d1d5db; }\n.u-border-bottom { border-bottom: 1px solid #d1d5db; }\n.u-border-accent { border-left: 4px solid #2563eb; }\n\n/* 테두리 종류 */\n.u-border-solid { border-style: solid; }\n.u-border-dashed { border-style: dashed; }\n.u-border-dotted { border-style: dotted; }\n.u-border-double { border-style: double; }\n\n/* 모서리 */\n.u-rounded-sm { border-radius: 4px; }\n.u-rounded-md { border-radius: 8px; }\n.u-rounded-lg { border-radius: 16px; }\n.u-rounded-full { border-radius: 9999px; }\n\n/* 원형 이미지 */\n.ui-avatar {\n  width: 48px;\n  aspect-ratio: 1;\n  border: 2px solid #fff;\n  border-radius: 50%;\n  object-fit: cover;\n}'} />
        <SimpleCode language="HTML" code={'<section class="u-border u-rounded-lg">카드</section>\n<p class="u-border-accent">강조 문장</p>\n<span class="u-border u-rounded-full">태그</span>\n<img class="ui-avatar" src="profile.jpg" alt="사용자 프로필">'} />

        <ArticleHeading id="border-summary" title="9. 코딩할 때 보는 핵심 암기" />
        <SimpleCode language="CSS" code={'border: 1px solid #333;          /* 굵기 종류 색상 */\nborder-top: 2px dashed tomato;    /* 위쪽만 */\nborder-bottom: 1px solid #ddd;    /* 아래쪽만 */\nborder-left: 4px solid royalblue; /* 왼쪽 강조선 */\nborder: 0;                        /* 테두리 제거 */\n\nborder-radius: 12px;              /* 모든 모서리 */\nborder-radius: 12px 4px;          /* 대각선끼리 */\nborder-radius: 50%;                /* 정사각형을 원으로 */\nborder-radius: 9999px;             /* 알약 모양 */'} />
        <div className="summary-callout"><code>border</code>는 굵기·종류·색상을 정하고, 방향별 속성은 특정 면만 꾸미며, <code>border-radius</code>는 모서리의 둥근 정도를 정합니다.</div>
        <NextPage label="Background" onClick={() => navigate({ type: "article", id: "css-backgrounds" })} />
      </article>
    </DocsFrame>
  );
}

function CssBackgroundsArticle({ navigate }: { navigate: (view: View) => void }) {
  const toc: Array<[string, string]> = [
    ["background-color", "background-color"],
    ["background-clip", "background-clip"],
    ["clip 비교", "background-examples"],
    ["background-image", "background-image"],
    ["background-repeat", "background-repeat"],
    ["background-position", "background-position"],
    ["background-origin", "background-origin"],
    ["background-attachment", "background-attachment"],
    ["background-size", "background-size"],
    ["background 단축형", "background-shorthand"],
    ["핵심 암기", "background-summary"],
  ];

  return (
    <DocsFrame toc={toc}>
      <article className="prose article-prose imported-article">
        <PageActions />
        <button className="breadcrumb-button" onClick={() => navigate({ type: "category", id: "css" })}>CSS <span>›</span> Core</button>
        <div className="source-badge"><span>●</span> CSS BACKGROUND</div>
        <h1 id="css-backgrounds">Background</h1>
        <p className="lead">배경색과 적용 범위를 정하고, 배경 이미지의 반복·위치·기준 영역·고정 여부·크기를 속성별로 제어하는 방법입니다.</p>

        <ArticleHeading id="background-color" title="1. background-color: 배경색" />
        <p><code>background-color</code>는 요소의 배경색을 지정합니다. 색상 이름, HEX, RGB와 투명도를 사용할 수 있습니다.</p>
        <SimpleCode language="CSS" code={'.card {\n  background-color: #dbeafe;\n}\n\n.overlay {\n  background-color: rgb(37 99 235 / 20%);\n}\n\n.transparent {\n  background-color: transparent;\n}'} />
        <Note title="margin은 제외">배경색은 margin 영역에는 칠해지지 않습니다. 기본 설정에서는 content와 padding을 채우고 border 아래쪽까지 이어집니다.</Note>

        <ArticleHeading id="background-clip" title="2. background-clip: 배경 적용 범위" />
        <DocsTable
          headers={["값", "배경색이 칠해지는 범위"]}
          rows={[
            [<code key="border-box">border-box</code>, "border의 바깥 경계까지 — 기본값"],
            [<code key="padding-box">padding-box</code>, "padding의 바깥 경계까지 — border 아래는 제외"],
            [<code key="content-box">content-box</code>, "content 영역에만"],
          ]}
        />
        <div className="summary-callout"><code>border-box</code>가 가장 넓고, <code>padding-box</code>, <code>content-box</code> 순서로 배경 범위가 좁아집니다.</div>

        <ArticleHeading id="background-examples" title="3. 세 가지 범위 비교" />
        <SimpleCode language="CSS" code={'.box {\n  padding: 24px;\n  border: 10px dashed rgb(37 99 235 / 45%);\n  background-color: #bfdbfe;\n}\n\n.clip-border {\n  background-clip: border-box; /* border 아래까지 */\n}\n\n.clip-padding {\n  background-clip: padding-box; /* padding까지 */\n}\n\n.clip-content {\n  background-clip: content-box; /* content만 */\n}'} />
        <SimpleCode language="HTML" code={'<div class="box clip-border">border-box</div>\n<div class="box clip-padding">padding-box</div>\n<div class="box clip-content">content-box</div>'} />
        <Note title="차이를 확인하는 방법">두꺼운 반투명 또는 dashed 테두리와 넓은 padding을 함께 지정하면 background-clip의 차이를 쉽게 확인할 수 있습니다.</Note>

        <ArticleHeading id="background-image" title="4. background-image: 배경 이미지 기본형" />
        <p><code>background-image</code>의 <code>url()</code> 안에 이미지 경로를 작성합니다.</p>
        <SimpleCode language="CSS" code={'.hero {\n  background-image: url("../images/hero.jpg");\n}'} />
        <Note title="경로 기준">배경 이미지의 상대 경로는 HTML이 아니라 <strong>CSS 파일이 저장된 위치</strong>를 기준으로 계산합니다.</Note>
        <div className="structure-flow" aria-label="CSS 파일에서 배경 이미지로 이동하는 상대 경로">
          <code>css/style.css</code><span>→ ../</span><code>images/hero.jpg</code>
        </div>

        <ArticleHeading id="background-repeat" title="5. background-repeat: 반복 방법" />
        <p>배경 이미지가 요소보다 작으면 기본적으로 가로와 세로 방향으로 반복됩니다.</p>
        <DocsTable
          headers={["값", "동작"]}
          rows={[
            [<code key="repeat">repeat</code>, "가로·세로 반복 — 기본값"],
            [<code key="no-repeat">no-repeat</code>, "반복하지 않음"],
            [<code key="repeat-x">repeat-x</code>, "가로 방향만 반복"],
            [<code key="repeat-y">repeat-y</code>, "세로 방향만 반복"],
            [<code key="space">space</code>, "이미지 사이에 공간을 나누어 반복"],
            [<code key="round">round</code>, "이미지 크기를 조절해 빈 공간 없이 반복"],
          ]}
        />
        <SimpleCode language="CSS" code={'.pattern {\n  background-image: url("../images/pattern.png");\n  background-repeat: repeat-x;\n}\n\n.hero {\n  background-image: url("../images/hero.jpg");\n  background-repeat: no-repeat;\n}'} />

        <ArticleHeading id="background-position" title="6. background-position: 이미지 위치" />
        <p>두 값을 쓰면 <strong>가로 위치 → 세로 위치</strong> 순서입니다. 키워드, 백분율, 길이 단위를 사용할 수 있습니다.</p>
        <DocsTable
          headers={["예", "의미"]}
          rows={[
            [<code key="left-top">left top</code>, "왼쪽 위 — 기본 위치"],
            [<code key="center">center</code>, "가로·세로 가운데"],
            [<code key="right-bottom">right bottom</code>, "오른쪽 아래"],
            [<code key="percentage">50% 50%</code>, "가로·세로 50% 위치"],
            [<code key="length">20px 40px</code>, "왼쪽에서 20px, 위에서 40px"],
            [<code key="edge-offset">right 20px bottom 10px</code>, "오른쪽 20px, 아래쪽 10px 간격"],
          ]}
        />
        <SimpleCode language="CSS" code={'.hero {\n  background-position: center;\n}\n\n.badge {\n  background-position: right 20px bottom 10px;\n}'} />

        <ArticleHeading id="background-origin" title="7. background-origin: 위치 계산 기준" />
        <p><code>background-origin</code>은 배경 이미지의 시작 위치를 박스의 어느 영역에서 계산할지 정합니다.</p>
        <DocsTable
          headers={["값", "위치 계산 기준"]}
          rows={[
            [<code key="origin-border">border-box</code>, "border의 바깥 경계"],
            [<code key="origin-padding">padding-box</code>, "padding의 바깥 경계 — 기본값"],
            [<code key="origin-content">content-box</code>, "content 영역의 시작점"],
          ]}
        />
        <SimpleCode language="CSS" code={'.box {\n  padding: 24px;\n  border: 8px solid rgb(0 0 0 / 20%);\n  background-image: url("../images/icon.png");\n  background-repeat: no-repeat;\n  background-origin: content-box;\n}'} />
        <div className="summary-callout"><code>background-origin</code>은 이미지의 위치 계산 기준, <code>background-clip</code>은 배경이 실제로 칠해지는 범위입니다.</div>

        <ArticleHeading id="background-attachment" title="8. background-attachment: 스크롤과 고정" />
        <DocsTable
          headers={["값", "동작"]}
          rows={[
            [<code key="scroll">scroll</code>, "페이지와 함께 움직임 — 기본값"],
            [<code key="fixed">fixed</code>, "배경 이미지를 화면에 고정"],
            [<code key="local">local</code>, "요소 내부의 스크롤을 따라 움직임"],
          ]}
        />
        <SimpleCode language="CSS" code={'body {\n  background-image: url("../images/background.jpg");\n  background-repeat: no-repeat;\n  background-position: center;\n  background-attachment: fixed;\n}'} />

        <ArticleHeading id="background-size" title="9. background-size: 이미지 크기" />
        <DocsTable
          headers={["값", "동작"]}
          rows={[
            [<code key="auto">auto</code>, "이미지의 원본 크기 유지 — 기본값"],
            [<code key="cover">cover</code>, "영역을 빈틈없이 채움 — 이미지 일부가 잘릴 수 있음"],
            [<code key="contain">contain</code>, "이미지 전체를 표시 — 빈 공간이 생길 수 있음"],
            [<code key="fixed-size">300px 200px</code>, "가로 300px, 세로 200px로 직접 지정"],
            [<code key="responsive-size">100% auto</code>, "가로에 맞추고 원본 세로 비율 유지"],
          ]}
        />
        <div className="code-stack two-columns">
          <SimpleCode language="cover" code={'.hero {\n  background-size: cover;\n  background-position: center;\n}'} />
          <SimpleCode language="contain" code={'.product {\n  background-size: contain;\n  background-position: center;\n  background-repeat: no-repeat;\n}'} />
        </div>
        <Note title="cover와 contain"><code>cover</code>는 이미지 일부가 잘려도 박스를 모두 채우고, <code>contain</code>은 빈 공간이 생겨도 이미지 전체를 보여 줍니다.</Note>

        <ArticleHeading id="background-shorthand" title="10. background 단축 속성" />
        <p>배경 이미지, 위치, 크기, 반복을 한 줄로 작성할 수 있습니다. <strong>position과 size 사이에는 반드시 <code>/</code>를 사용</strong>합니다.</p>
        <SimpleCode language="CSS" code={'.hero {\n  background: url("../images/hero.jpg") center / cover no-repeat;\n}\n\n/* 학습 중에는 복잡한 값은 나누어 쓰면 확인하기 쉽다. */\n.hero {\n  background-image: url("../images/hero.jpg");\n  background-position: center;\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-origin: padding-box;\n  background-attachment: scroll;\n}'} />

        <ArticleHeading id="background-summary" title="11. 코딩할 때 보는 핵심 암기" />
        <SimpleCode language="CSS" code={'background-color: #dbeafe;\nbackground-image: url("../images/hero.jpg");\nbackground-repeat: no-repeat;\nbackground-position: center;\nbackground-origin: padding-box;\nbackground-clip: border-box;\nbackground-attachment: scroll;\nbackground-size: cover;'} />
        <DocsTable
          headers={["속성", "질문으로 기억하기"]}
          rows={[
            [<code key="summary-image">background-image</code>, "어떤 이미지인가?"],
            [<code key="summary-repeat">background-repeat</code>, "반복할 것인가?"],
            [<code key="summary-position">background-position</code>, "어디에 배치할 것인가?"],
            [<code key="summary-origin">background-origin</code>, "어디부터 위치를 계산할 것인가?"],
            [<code key="summary-attachment">background-attachment</code>, "스크롤할 때 움직일 것인가?"],
            [<code key="summary-size">background-size</code>, "얼마나 크게 표시할 것인가?"],
          ]}
        />
        <div className="summary-callout"><code>image → repeat → position → origin → attachment → size</code> 순서로 확인하면 배경 이미지를 원하는 모습으로 제어할 수 있습니다.</div>
        <NextPage label="Gradient" onClick={() => navigate({ type: "article", id: "css-gradients" })} />
      </article>
    </DocsFrame>
  );
}

function CssGradientsArticle({ navigate }: { navigate: (view: View) => void }) {
  const toc: Array<[string, string]> = [
    ["선형 기본형", "linear-gradient"],
    ["방향과 각도", "gradient-direction"],
    ["색상 중지점", "gradient-stops"],
    ["원형 기본형", "radial-gradient"],
    ["모양과 중심", "radial-shape-position"],
    ["원형 크기 네 값", "radial-size"],
    ["반복 패턴", "gradient-patterns"],
    ["재사용 CSS", "gradient-utilities"],
    ["핵심 암기", "gradient-summary"],
  ];

  return (
    <DocsFrame toc={toc}>
      <article className="prose article-prose imported-article">
        <PageActions />
        <button className="breadcrumb-button" onClick={() => navigate({ type: "category", id: "css" })}>CSS <span>›</span> Core</button>
        <div className="source-badge"><span>●</span> CSS GRADIENT</div>
        <h1 id="css-gradients">Linear와 Radial Gradient</h1>
        <p className="lead">선형 그라데이션의 방향·각도·색상 중지점부터 원형 그라데이션의 모양·중심·크기와 반복 패턴까지 복사해서 사용할 수 있도록 정리합니다.</p>

        <ArticleHeading id="linear-gradient" title="1. linear-gradient: 선형 그라데이션" />
        <p>선형 그라데이션은 직선을 따라 색상이 변하는 배경 이미지입니다. 최소 두 가지 색상이 필요합니다.</p>
        <SimpleCode language="CSS" code={'.box {\n  background-image: linear-gradient(to right, #60a5fa, #7c3aed);\n}\n\n/* background 단축 속성으로도 사용 가능 */\n.hero {\n  background: linear-gradient(#0f172a, #2563eb);\n}'} />
        <div className="summary-callout"><code>linear-gradient(방향 또는 각도, 시작 색상, 끝 색상)</code></div>

        <ArticleHeading id="gradient-direction" title="2. 선형 그라데이션 방향과 각도" />
        <DocsTable
          headers={["작성값", "색상이 진행하는 방향"]}
          rows={[
            [<code key="right">to right</code>, "왼쪽 → 오른쪽"],
            [<code key="left">to left</code>, "오른쪽 → 왼쪽"],
            [<code key="bottom">to bottom</code>, "위 → 아래 — 기본 방향"],
            [<code key="top">to top</code>, "아래 → 위"],
            [<code key="bottom-right">to bottom right</code>, "왼쪽 위 → 오른쪽 아래"],
            [<code key="top-left">to top left</code>, "오른쪽 아래 → 왼쪽 위"],
          ]}
        />
        <p>각도는 <code>0deg</code>가 위쪽이며 시계 방향으로 증가합니다.</p>
        <DocsTable
          headers={["각도", "진행 방향"]}
          rows={[
            [<code key="0deg">0deg</code>, "아래 → 위"],
            [<code key="90deg">90deg</code>, "왼쪽 → 오른쪽"],
            [<code key="180deg">180deg</code>, "위 → 아래"],
            [<code key="270deg">270deg</code>, "오른쪽 → 왼쪽"],
          ]}
        />
        <SimpleCode language="CSS" code={'.diagonal {\n  background: linear-gradient(135deg, #f97316, #ec4899, #7c3aed);\n}'} />

        <ArticleHeading id="gradient-stops" title="3. 색상 중지점(Color Stop)" />
        <p>색상 뒤에 위치를 적으면 해당 색상이 나타날 지점을 직접 지정할 수 있습니다. 위치를 생략하면 브라우저가 색상을 균등하게 배치합니다.</p>
        <SimpleCode language="CSS" code={'.sunset {\n  background: linear-gradient(\n    to right,\n    #fef3c7 0%,\n    #f97316 35%,\n    #db2777 70%,\n    #312e81 100%\n  );\n}'} />
        <DocsTable
          headers={["형태", "예", "결과"]}
          rows={[
            ["위치 생략", <code key="auto-stop">red, blue</code>, "두 색상을 자동으로 배치"],
            ["중지점 지정", <code key="manual-stop">red 20%, blue 80%</code>, "20%와 80%를 기준으로 변화"],
            ["단단한 경계", <code key="hard-stop">red 50%, blue 50%</code>, "같은 지점에서 색상이 즉시 전환"],
          ]}
        />
        <SimpleCode language="CSS" code={'.split {\n  background: linear-gradient(\n    to right,\n    #2563eb 0 50%,\n    #f8fafc 50% 100%\n  );\n}'} />
        <Note title="중지점의 의미">색상 중지점은 박스를 자르는 위치가 아니라, 각 색상이 정확히 놓이는 위치와 색상 변화 구간을 정합니다.</Note>

        <ArticleHeading id="radial-gradient" title="4. radial-gradient: 원형 그라데이션" />
        <p>원형 그라데이션은 하나의 중심점에서 바깥쪽으로 색상이 퍼집니다.</p>
        <SimpleCode language="CSS" code={'.spotlight {\n  background: radial-gradient(circle, white, #60a5fa, #1e3a8a);\n}'} />
        <div className="summary-callout"><code>radial-gradient(모양 크기 at 중심 위치, 색상 중지점...)</code></div>

        <ArticleHeading id="radial-shape-position" title="5. 모양과 중심 위치" />
        <DocsTable
          headers={["설정", "값", "의미"]}
          rows={[
            ["모양", <code key="circle">circle</code>, "정원 형태로 퍼짐"],
            ["모양", <code key="ellipse">ellipse</code>, "타원 형태로 퍼짐 — 기본 모양"],
            ["중심", <code key="center">at center</code>, "요소의 가운데 — 기본 위치"],
            ["중심", <code key="left-top">at left top</code>, "왼쪽 위"],
            ["중심", <code key="percent">at 25% 30%</code>, "가로 25%, 세로 30% 위치"],
          ]}
        />
        <SimpleCode language="CSS" code={'.light {\n  background: radial-gradient(\n    circle at 25% 30%,\n    white 0%,\n    #60a5fa 45%,\n    #1e3a8a 100%\n  );\n}'} />

        <ArticleHeading id="radial-size" title="6. 원형 그라데이션 크기 네 가지" />
        <p>크기값은 <strong>거리</strong>를 나타내는 <code>closest</code>·<code>farthest</code>와 <strong>대상</strong>을 나타내는 <code>side</code>·<code>corner</code>를 조합합니다.</p>
        <DocsTable
          headers={["크기값", "기준", "쉽게 기억하기"]}
          rows={[
            [<code key="closest-side">closest-side</code>, "중심에서 가장 가까운 면", "가까운 벽까지"],
            [<code key="farthest-side">farthest-side</code>, "중심에서 가장 먼 면", "먼 벽까지"],
            [<code key="closest-corner">closest-corner</code>, "중심에서 가장 가까운 모서리", "가까운 꼭짓점까지"],
            [<code key="farthest-corner">farthest-corner</code>, "중심에서 가장 먼 모서리", "먼 꼭짓점까지 — 기본값"],
          ]}
        />
        <SimpleCode language="CSS" code={'.box {\n  background: radial-gradient(\n    circle closest-side at 25% 30%,\n    white,\n    blue\n  );\n}\n\n/* 아래 크기값만 바꾸어 비교 */\n/* closest-side / farthest-side */\n/* closest-corner / farthest-corner */'} />
        <Note title="마지막 색상은 계속 채워짐">크기값은 시작 색상부터 마지막 색상까지 변하는 범위를 정합니다. 그라데이션 범위 밖이 투명해지는 것이 아니라 마지막 색상이 나머지 영역을 채웁니다.</Note>

        <ArticleHeading id="gradient-patterns" title="7. 그라데이션으로 반복 패턴 만들기" />
        <h3 className="article-subheading">선형 줄무늬</h3>
        <SimpleCode language="CSS" code={'.stripes {\n  background: repeating-linear-gradient(\n    45deg,\n    #2563eb 0 12px,\n    #dbeafe 12px 24px\n  );\n}'} />
        <h3 className="article-subheading">원형 동심원</h3>
        <SimpleCode language="CSS" code={'.rings {\n  background: repeating-radial-gradient(\n    circle at center,\n    #2563eb 0 12px,\n    #dbeafe 12px 24px\n  );\n}'} />
        <h3 className="article-subheading">점무늬</h3>
        <SimpleCode language="CSS" code={'.dots {\n  background-color: #eff6ff;\n  background-image: radial-gradient(\n    circle,\n    #2563eb 2px,\n    transparent 2.5px\n  );\n  background-size: 20px 20px;\n}'} />
        <div className="summary-callout"><code>repeating-linear-gradient()</code>는 직선 패턴, <code>repeating-radial-gradient()</code>는 동심원 패턴을 반복합니다.</div>

        <ArticleHeading id="gradient-utilities" title="8. 복사해서 쓰는 Gradient CSS" />
        <SimpleCode language="CSS" code={':root {\n  --gradient-brand: linear-gradient(135deg, #2563eb, #7c3aed);\n  --gradient-sunset: linear-gradient(135deg, #f97316, #ec4899);\n  --gradient-spotlight: radial-gradient(circle at 30% 25%, #fff, #93c5fd 45%, #1e3a8a);\n}\n\n.u-gradient-brand { background: var(--gradient-brand); }\n.u-gradient-sunset { background: var(--gradient-sunset); }\n.u-gradient-spotlight { background: var(--gradient-spotlight); }\n\n.u-pattern-stripes {\n  background: repeating-linear-gradient(\n    45deg,\n    #2563eb 0 10px,\n    #dbeafe 10px 20px\n  );\n}\n\n.u-pattern-dots {\n  background-color: #eff6ff;\n  background-image: radial-gradient(circle, #2563eb 2px, transparent 2.5px);\n  background-size: 20px 20px;\n}'} />
        <SimpleCode language="HTML" code={'<section class="u-gradient-brand">브랜드 영역</section>\n<div class="u-gradient-spotlight">조명 효과</div>\n<div class="u-pattern-dots">점무늬 배경</div>'} />

        <ArticleHeading id="gradient-summary" title="9. 코딩할 때 보는 핵심 암기" />
        <SimpleCode language="CSS" code={'/* 선형: 방향 또는 각도 + 색상 중지점 */\nbackground: linear-gradient(90deg, red 0%, blue 100%);\n\n/* 원형: 모양 + 크기 + 중심 + 색상 중지점 */\nbackground: radial-gradient(\n  circle farthest-corner at 25% 30%,\n  white 0%,\n  blue 100%\n);\n\n/* 반복 패턴 */\nbackground: repeating-linear-gradient(45deg, #333 0 10px, #fff 10px 20px);'} />
        <DocsTable
          headers={["함수", "역할"]}
          rows={[
            [<code key="linear-summary">linear-gradient()</code>, "직선을 따라 색상 변화"],
            [<code key="radial-summary">radial-gradient()</code>, "중심에서 바깥으로 색상 변화"],
            [<code key="repeating-linear-summary">repeating-linear-gradient()</code>, "선형 변화를 반복해 패턴 생성"],
            [<code key="repeating-radial-summary">repeating-radial-gradient()</code>, "원형 변화를 반복해 패턴 생성"],
          ]}
        />
        <div className="summary-callout"><code>closest</code>는 가까운 곳, <code>farthest</code>는 먼 곳, <code>side</code>는 면, <code>corner</code>는 모서리를 뜻합니다.</div>
        <NextPage label="페이지 배치" onClick={() => navigate({ type: "article", id: "css-layout" })} />
      </article>
    </DocsFrame>
  );
}

function CssLayoutArticle({ navigate }: { navigate: (view: View) => void }) {
  const toc: Array<[string, string]> = [
    ["배치의 두 가지 문제", "layout-problems"],
    ["주요 배치 방식", "layout-methods"],
    ["Flex와 Grid 비교", "flex-grid-compare"],
    ["함께 사용하는 이유", "flex-grid-together"],
    ["선택 기준", "layout-decision"],
    ["핵심 암기", "layout-summary"],
  ];

  return (
    <DocsFrame toc={toc}>
      <article className="prose article-prose imported-article">
        <PageActions />
        <button className="breadcrumb-button" onClick={() => navigate({ type: "category", id: "css" })}>CSS <span>›</span> Layout</button>
        <div className="source-badge"><span>●</span> CSS LAYOUT</div>
        <h1 id="css-layout">페이지 배치: Flex, Grid와 다른 방식들</h1>
        <p className="lead">페이지의 큰 구조를 만드는 문제와 그 안의 요소를 정렬하는 문제를 구분하고, 상황에 맞는 CSS 배치 방식을 선택하는 기준을 정리합니다.</p>

        <ArticleHeading id="layout-problems" title="1. 페이지 배치의 두 가지 문제" />
        <p>실제 웹페이지에서는 <strong>큰 구조를 나누는 문제</strong>와 <strong>각 영역 안의 요소를 정렬하는 문제</strong>가 동시에 생깁니다.</p>
        <SimpleCode language="구조" code={'쇼핑몰 페이지\n├── Header: 로고 · 메뉴 · 검색 · 로그인\n├── Main\n│   ├── Sidebar\n│   └── Products: 상품 카드 목록\n└── Footer'} />
        <DocsTable
          headers={["배치 문제", "예", "잘 맞는 방식"]}
          rows={[
            ["큰 영역의 관계", "Header·Sidebar·Main·Footer를 행과 열로 구성", <code key="grid-problem">Grid</code>],
            ["한 영역 내부 정렬", "헤더 안의 로고와 메뉴를 한 줄로 정렬", <code key="flex-problem">Flex</code>],
            ["특별한 위치", "닫기 버튼·알림 배지·고정 메뉴", <code key="position-problem">Position</code>],
          ]}
        />

        <ArticleHeading id="layout-methods" title="2. CSS의 주요 배치 방식" />
        <DocsTable
          headers={["방식", "주요 용도", "대표 키워드"]}
          rows={[
            ["기본 흐름", "블록은 위에서 아래로, 인라인은 한 줄에 배치", <code key="flow">block / inline</code>],
            ["Flexbox", "한 방향의 아이템 배치와 정렬", <code key="flex">display: flex</code>],
            ["Grid", "행과 열을 이용한 구조 및 반복 배치", <code key="grid">display: grid</code>],
            ["Position", "특정 위치에 배치하거나 화면에 고정", <code key="position">relative / absolute / fixed / sticky</code>],
            ["Float", "이미지 주변으로 글을 흐르게 배치", <code key="float">float</code>],
            ["Multi-column", "긴 글을 신문처럼 여러 단으로 나눔", <code key="column">column-count</code>],
          ]}
        />
        <SimpleCode language="CSS" code={'/* 기본 흐름 */\nsection { display: block; }\n\n/* 한 방향 정렬 */\n.header { display: flex; }\n\n/* 행과 열 구조 */\n.page { display: grid; }\n\n/* 특별한 위치 */\n.badge { position: absolute; }\n\n/* 이미지 주변 글 흐름 */\n.article img { float: left; }\n\n/* 여러 단의 긴 글 */\n.article { column-count: 3; }'} />
        <Note title="현재의 일반적인 선택">과거에는 Float로 전체 페이지를 만들기도 했지만, 현재는 일반적으로 구조에는 Grid와 Flex를 사용하고 Float는 이미지 주변의 글 흐름에 사용합니다.</Note>

        <ArticleHeading id="flex-grid-compare" title="3. Flex와 Grid 비교" />
        <DocsTable
          headers={["구분", "Flex", "Grid"]}
          rows={[
            ["차원", "1차원", "2차원"],
            ["기준", "가로 또는 세로 한 방향", "행과 열을 함께 사용"],
            ["강점", "정렬·간격·아이템 크기 분배", "영역 구조·반복 목록 배치"],
            ["대표 예", "메뉴, 버튼 묶음, 카드 내부", "페이지, 갤러리, 카드 목록"],
          ]}
        />
        <div className="summary-callout"><code>Flex</code>는 한 방향의 정렬에 강하고, <code>Grid</code>는 행과 열로 구조를 만드는 데 강합니다.</div>

        <ArticleHeading id="flex-grid-together" title="4. Flex와 Grid를 함께 사용하는 이유" />
        <p>둘을 함께 쓴다는 것은 같은 요소에 억지로 동시에 적용한다는 뜻이 아닙니다. <strong>부모와 자식 또는 서로 다른 영역이 각자 알맞은 레이아웃을 사용</strong>한다는 뜻입니다.</p>
        <SimpleCode language="구조" code={'Grid: 페이지 전체\n├── Header\n│   └── Flex: 로고 · 메뉴 · 로그인 정렬\n├── Sidebar\n├── Main\n│   └── Grid: 상품 카드 목록\n│       └── Flex: 카드 내부 세로 정렬\n└── Footer\n    └── Flex: 링크와 정보 정렬'} />
        <SimpleCode language="HTML" code={'<div class="page">\n  <header class="header">...</header>\n  <aside class="sidebar">...</aside>\n  <main class="products">\n    <article class="card">...</article>\n    <article class="card">...</article>\n  </main>\n  <footer class="footer">...</footer>\n</div>'} />
        <SimpleCode language="CSS" code={'.page {\n  display: grid;\n  grid-template-columns: 240px 1fr;\n}\n\n.header,\n.footer {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.products {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}\n\n.card {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}'} />

        <ArticleHeading id="layout-decision" title="5. 상황에 맞는 배치 방식 선택" />
        <DocsTable
          headers={["확인할 질문", "선택"]}
          rows={[
            ["문서의 기본적인 순서대로 쌓으면 되는가?", "기본 흐름"],
            ["아이템을 가로 또는 세로 한 방향으로 정렬하는가?", "Flex"],
            ["여러 영역을 행과 열로 구성하는가?", "Grid"],
            ["다른 요소 위에 겹치거나 화면에 고정해야 하는가?", "Position"],
            ["이미지 주위로 글이 흘러야 하는가?", "Float"],
            ["긴 글을 여러 단으로 나누어야 하는가?", "Multi-column"],
          ]}
        />
        <Note title="절대적인 규칙은 아님">페이지 전체를 Flex로 만들 수도 있고 작은 영역에 Grid를 사용할 수도 있습니다. 요소의 크기보다 해결하려는 배치 문제가 1차원인지, 2차원인지 먼저 확인합니다.</Note>

        <ArticleHeading id="layout-summary" title="6. 코딩할 때 보는 핵심 암기" />
        <SimpleCode language="선택 순서" code={'큰 구조와 반복 목록 → Grid\n영역 내부 한 방향 정렬 → Flex\n특정 위치와 겹치기 → Position\n이미지 주변 글 흐름 → Float\n긴 글의 다단 편집 → Multi-column'} />
        <div className="summary-callout">Grid는 <strong>구조</strong>에 강하고 Flex는 그 구조 안의 <strong>정렬</strong>에 강하므로, 실제 페이지에서는 함께 사용하는 경우가 많습니다.</div>
        <NextPage label="Flex" onClick={() => navigate({ type: "article", id: "css-flex" })} />
      </article>
    </DocsFrame>
  );
}

function CssFlexArticle({ navigate }: { navigate: (view: View) => void }) {
  const toc: Array<[string, string]> = [
    ["Flexbox와 Box Model", "flex-definition"],
    ["부모와 자식", "flex-parent-child"],
    ["flex와 inline-flex", "flex-inline-flex"],
    ["주축과 교차축", "flex-axes"],
    ["배치 방향", "flex-direction"],
    ["줄바꿈과 flex-flow", "flex-wrap"],
    ["주축 정렬", "justify-content"],
    ["교차축 정렬", "align-items"],
    ["아이템 간격", "flex-gap"],
    ["여러 줄 정렬", "align-content"],
    ["아이템 크기", "flex-basis"],
    ["flex 단축 속성", "flex-shorthand"],
    ["개별 정렬과 순서", "align-self"],
    ["반응형 Flex", "flex-responsive"],
    ["실전 코드", "flex-example"],
    ["핵심 암기", "flex-summary"],
  ];

  return (
    <DocsFrame toc={toc}>
      <article className="prose article-prose imported-article">
        <PageActions />
        <button className="breadcrumb-button" onClick={() => navigate({ type: "category", id: "css" })}>CSS <span>›</span> Layout</button>
        <div className="source-badge"><span>●</span> CSS FLEXBOX</div>
        <h1 id="css-flex">Flexbox 기본 배치</h1>
        <p className="lead">부모가 바로 아래 자식들의 배치 방향, 줄바꿈, 정렬·간격·크기를 유연하게 관리하는 CSS의 1차원 레이아웃 방식입니다.</p>

        <ArticleHeading id="flex-definition" title="1. Flexbox와 Box Model의 역할" />
        <p>박스 모델은 <strong>박스 하나</strong>의 content, padding, border, margin과 크기를 계산하고, Flexbox는 <strong>여러 박스 사이</strong>의 배치와 정렬을 관리합니다.</p>
        <DocsTable
          headers={["개념", "관리하는 것"]}
          rows={[
            ["Box Model", "박스 하나의 크기, 안쪽 여백, 테두리, 바깥 여백"],
            ["Flexbox", "부모 안에 있는 여러 자식 박스의 방향, 정렬, 간격, 크기 분배"],
          ]}
        />
        <div className="summary-callout"><code>Box Model</code>은 박스 자체, <code>Flexbox</code>는 여러 박스의 관계를 다룹니다.</div>

        <ArticleHeading id="flex-parent-child" title="2. 부모와 자식의 관계" />
        <p><code>display: flex</code>는 자식이 아니라 <strong>배치를 관리할 부모 요소</strong>에 작성합니다. 그러면 바로 아래 자식들이 플렉스 아이템이 됩니다.</p>
        <SimpleCode language="HTML" code={'<div class="container">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n</div>'} />
        <SimpleCode language="CSS" code={'.container {\n  display: flex;\n}'} />
        <SimpleCode language="관계" code={'.container → 플렉스 컨테이너\n├── .item → 플렉스 아이템\n├── .item → 플렉스 아이템\n└── .item → 플렉스 아이템'} />
        <Note title="바로 아래 자식만 해당">손자 요소까지 자동으로 플렉스 아이템이 되는 것은 아닙니다. 손자도 Flex로 배치하려면 그 부모에 다시 <code>display: flex</code>를 지정합니다.</Note>

        <ArticleHeading id="flex-inline-flex" title="3. display: flex와 inline-flex" />
        <DocsTable
          headers={["값", "컨테이너 바깥쪽 배치", "바로 아래 자식 배치"]}
          rows={[
            [<code key="display-flex">display: flex</code>, "블록처럼 사용 가능한 너비를 차지", "Flex 방식"],
            [<code key="display-inline-flex">display: inline-flex</code>, "내용 크기만 차지하며 다른 인라인 요소 옆에 배치 가능", "Flex 방식"],
          ]}
        />
        <SimpleCode language="CSS" code={'.layout { display: flex; }\n.badge-group { display: inline-flex; }'} />
        <p>일반적인 페이지 레이아웃에는 <code>display: flex</code>를 가장 많이 사용합니다.</p>

        <ArticleHeading id="flex-axes" title="4. 주축과 교차축" />
        <DocsTable
          headers={["축", "의미"]}
          rows={[
            ["주축(Main Axis)", "플렉스 아이템이 배치되는 방향"],
            ["교차축(Cross Axis)", "주축과 수직인 방향"],
          ]}
        />
        <SimpleCode language="축" code={'flex-direction: row\n주축     왼쪽 ─────────→ 오른쪽\n교차축   위쪽 → 아래쪽\n\nflex-direction: column\n주축     위쪽 → 아래쪽\n교차축   왼쪽 → 오른쪽'} />
        <div className="summary-callout"><code>justify-content</code>는 항상 주축, <code>align-items</code>는 항상 교차축을 정렬합니다. 따라서 무조건 가로·세로라고 외우면 안 됩니다.</div>

        <ArticleHeading id="flex-direction" title="5. flex-direction: 배치 방향" />
        <DocsTable
          headers={["값", "배치 방향"]}
          rows={[
            [<code key="row">row</code>, "왼쪽 → 오른쪽 — 기본값"],
            [<code key="row-reverse">row-reverse</code>, "오른쪽 → 왼쪽"],
            [<code key="column">column</code>, "위 → 아래"],
            [<code key="column-reverse">column-reverse</code>, "아래 → 위"],
          ]}
        />
        <SimpleCode language="CSS" code={'.container {\n  display: flex;\n  flex-direction: row;\n}'} />
        <SimpleCode language="결과" code={'row:            [1] [2] [3]\nrow-reverse:    [3] [2] [1]\ncolumn:         [1]\n                [2]\n                [3]\ncolumn-reverse: [3]\n                [2]\n                [1]'} />

        <ArticleHeading id="flex-wrap" title="6. flex-wrap: 줄바꿈" />
        <p>기본값은 <code>nowrap</code>이므로 공간이 부족해도 한 줄에 배치하려고 합니다. 다음 줄로 넘기려면 <code>wrap</code>을 사용합니다.</p>
        <DocsTable
          headers={["값", "의미"]}
          rows={[
            [<code key="nowrap">nowrap</code>, "줄바꿈하지 않음 — 기본값"],
            [<code key="wrap">wrap</code>, "공간이 부족하면 다음 줄로 이동"],
            [<code key="wrap-reverse">wrap-reverse</code>, "교차축의 반대 방향으로 줄바꿈"],
          ]}
        />
        <SimpleCode language="CSS" code={'.container {\n  display: flex;\n  flex-wrap: wrap;\n}'} />
        <SimpleCode language="결과" code={'넓은 화면: [1] [2] [3] [4]\n좁은 화면: [1] [2]\n             [3] [4]'} />

        <ArticleHeading id="flex-flow" title="7. flex-flow: 방향과 줄바꿈 단축 속성" />
        <p><code>flex-flow</code>는 <code>flex-direction</code>과 <code>flex-wrap</code>을 한 줄에 작성하는 컨테이너 단축 속성입니다.</p>
        <div className="code-stack two-columns">
          <SimpleCode language="단축형" code={'.container {\n  display: flex;\n  flex-flow: row wrap;\n}'} />
          <SimpleCode language="개별형" code={'.container {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n}'} />
        </div>
        <div className="summary-callout"><code>flex-flow: direction wrap;</code> 순서로 작성합니다.</div>

        <ArticleHeading id="justify-content" title="8. justify-content: 주축 정렬" />
        <DocsTable
          headers={["값", "배치 방법"]}
          rows={[
            [<code key="justify-start">flex-start</code>, "주축 시작점에 배치 — 기본값"],
            [<code key="justify-end">flex-end</code>, "주축 끝점에 배치"],
            [<code key="justify-center">center</code>, "주축 가운데 배치"],
            [<code key="between">space-between</code>, "양 끝에 붙이고 아이템 사이를 동일하게"],
            [<code key="around">space-around</code>, "각 아이템 주변에 동일한 공간"],
            [<code key="evenly">space-evenly</code>, "바깥쪽을 포함한 모든 간격을 동일하게"],
          ]}
        />
        <SimpleCode language="배치 모습" code={'flex-start:    [1][2][3]____________\nflex-end:      ____________[1][2][3]\ncenter:        ______[1][2][3]______\nspace-between: [1]_______[2]_______[3]\nspace-evenly:  ___[1]___[2]___[3]___'} />

        <ArticleHeading id="align-items" title="9. align-items: 교차축 정렬" />
        <DocsTable
          headers={["값", "의미"]}
          rows={[
            [<code key="stretch">stretch</code>, "교차축 방향으로 아이템을 늘림 — 기본값"],
            [<code key="align-start">flex-start</code>, "교차축 시작점에 배치"],
            [<code key="align-end">flex-end</code>, "교차축 끝점에 배치"],
            [<code key="align-center">center</code>, "교차축 가운데 배치"],
            [<code key="baseline">baseline</code>, "아이템 안 글자의 기준선에 맞춤"],
          ]}
        />
        <h3 className="article-subheading">가로·세로 정중앙 배치</h3>
        <SimpleCode language="CSS" code={'.container {\n  display: flex;\n  justify-content: center; /* 주축 가운데 */\n  align-items: center;     /* 교차축 가운데 */\n  min-height: 300px;\n}'} />
        <Note title="높이가 있어야 세로 이동 공간이 생김">row 방향에서 세로 중앙 정렬을 확인하려면 컨테이너에 <code>height</code> 또는 <code>min-height</code>처럼 남는 세로 공간이 있어야 합니다.</Note>

        <ArticleHeading id="flex-gap" title="10. gap: 아이템 사이 간격" />
        <DocsTable
          headers={["속성", "역할"]}
          rows={[
            [<code key="gap">gap</code>, "행과 열의 간격을 함께 지정"],
            [<code key="row-gap">row-gap</code>, "줄과 줄 사이 간격"],
            [<code key="column-gap">column-gap</code>, "같은 줄의 아이템 사이 간격"],
          ]}
        />
        <SimpleCode language="CSS" code={'.container {\n  display: flex;\n  flex-wrap: wrap;\n  row-gap: 10px;\n  column-gap: 20px;\n\n  /* 위 두 줄 대신 gap: 10px 20px; 가능 */\n}'} />
        <p>단순히 아이템 사이에 일정한 간격을 만들 때는 각 자식에 <code>margin</code>을 넣는 것보다 부모의 <code>gap</code>이 편리합니다.</p>

        <ArticleHeading id="align-content" title="11. align-content: 여러 줄 전체 정렬" />
        <p><code>align-content</code>는 줄바꿈으로 생긴 <strong>여러 줄 묶음 전체</strong>를 교차축에서 정렬합니다.</p>
        <DocsTable
          headers={["속성", "정렬 대상", "작동 조건"]}
          rows={[
            [<code key="items-target">align-items</code>, "각 줄 안의 아이템", "한 줄에서도 사용 가능"],
            [<code key="content-target">align-content</code>, "여러 줄 전체", "wrap으로 여러 줄이 생기고 남는 교차축 공간이 있어야 함"],
          ]}
        />
        <SimpleCode language="CSS" code={'.container {\n  display: flex;\n  flex-wrap: wrap;\n  align-content: center;\n  min-height: 500px;\n}'} />

        <ArticleHeading id="flex-item-properties" title="12. 플렉스 아이템 속성 한눈에 보기" />
        <DocsTable
          headers={["속성", "역할"]}
          rows={[
            [<code key="grow">flex-grow</code>, "남는 공간을 얼마나 늘려 가질지 결정"],
            [<code key="shrink">flex-shrink</code>, "공간이 부족할 때 얼마나 줄어들지 결정"],
            [<code key="basis">flex-basis</code>, "공간을 나누기 전 아이템의 기본 크기"],
            [<code key="self">align-self</code>, "특정 아이템만 교차축에서 따로 정렬"],
            [<code key="order">order</code>, "화면에 보이는 아이템 순서 변경"],
          ]}
        />

        <ArticleHeading id="flex-basis" title="13. flex-basis: 늘고 줄기 전의 기본 크기" />
        <p><code>flex-basis</code>는 아이템이 늘어나거나 줄어들기 전의 <strong>주축 방향 기본 크기</strong>입니다. 기본값은 <code>auto</code>입니다.</p>
        <DocsTable
          headers={["flex-direction", "flex-basis가 정하는 크기"]}
          rows={[
            [<code key="basis-row">row</code>, "기본 너비"],
            [<code key="basis-column">column</code>, "기본 높이"],
          ]}
        />
        <SimpleCode language="CSS" code={'.item {\n  flex-basis: 250px;\n}'} />

        <ArticleHeading id="flex-grow" title="14. flex-grow: 남는 공간 나누기" />
        <p>부모에 남는 공간이 있을 때 아이템이 늘어나는 비율입니다. 기본값은 <code>0</code>이므로 따로 지정하지 않으면 남는 공간 때문에 자동으로 커지지 않습니다.</p>
        <SimpleCode language="CSS" code={'.item1 { flex-grow: 1; }\n.item2 { flex-grow: 2; }\n.item3 { flex-grow: 1; }'} />
        <SimpleCode language="결과" code={'남는 공간을 1 : 2 : 1 비율로 분배\n[  item 1  ][      item 2      ][  item 3  ]'} />
        <Note title="전체 너비의 비율이 아님"><code>flex-grow</code>의 비율은 각 아이템의 기본 크기를 제외하고 <strong>남은 공간</strong>을 나누는 비율입니다.</Note>

        <ArticleHeading id="flex-shrink" title="15. flex-shrink: 부족한 공간 줄이기" />
        <p>부모 공간이 부족할 때 아이템이 얼마나 줄어들지 정합니다. 기본값은 <code>1</code>이므로 기본적으로 줄어들 수 있습니다.</p>
        <SimpleCode language="CSS" code={'.item {\n  flex-shrink: 1; /* 공간이 부족하면 줄어듦 */\n}\n\n.fixed-item {\n  flex-shrink: 0; /* 줄어들지 않음 */\n}'} />
        <Note title="0 사용 시 넘침 주의"><code>flex-shrink: 0</code>을 사용하면 아이템을 보호할 수 있지만, 좁은 화면에서 부모 밖으로 넘칠 수 있으므로 줄바꿈이나 overflow도 함께 확인합니다.</Note>

        <ArticleHeading id="flex-shorthand" title="16. flex: grow shrink basis 단축 속성" />
        <p><code>flex</code>는 아이템의 늘어남, 줄어듦, 기본 크기를 한 줄로 작성합니다.</p>
        <div className="summary-callout"><code>flex: grow shrink basis;</code></div>
        <div className="code-stack two-columns">
          <SimpleCode language="단축형" code={'.item {\n  flex: 1 1 250px;\n}'} />
          <SimpleCode language="개별형" code={'.item {\n  flex-grow: 1;\n  flex-shrink: 1;\n  flex-basis: 250px;\n}'} />
        </div>
        <DocsTable
          headers={["부분", "기억할 의미"]}
          rows={[
            [<code key="basis-memory">basis</code>, "시작 크기"],
            [<code key="grow-memory">grow</code>, "공간이 남으면 늘어남"],
            [<code key="shrink-memory">shrink</code>, "공간이 부족하면 줄어듦"],
          ]}
        />
        <Note title="flex: 1의 의미"><code>flex: 1</code>은 실무에서 같은 줄의 남는 공간을 균등하게 나눌 때 자주 사용합니다. 긴 내용 때문에 아이템이 넘친다면 <code>min-width: 0</code>도 함께 확인합니다.</Note>

        <ArticleHeading id="align-self" title="17. align-self: 특정 아이템만 따로 정렬" />
        <p>부모의 <code>align-items</code>와 다르게 특정 플렉스 아이템 하나만 교차축에서 정렬할 때 사용합니다.</p>
        <SimpleCode language="CSS" code={'.container {\n  display: flex;\n  align-items: center;\n}\n\n.special {\n  align-self: flex-end;\n}'} />

        <ArticleHeading id="flex-order" title="18. order: 화면 표시 순서" />
        <p><code>order</code>는 숫자가 작은 아이템부터 화면에 배치합니다. 기본값은 모든 아이템이 <code>0</code>입니다.</p>
        <SimpleCode language="CSS" code={'.item1 { order: 2; }\n.item2 { order: 1; }'} />
        <Note title="접근성 주의"><code>order</code>는 시각적 순서만 바꾸고 HTML의 읽기 순서와 키보드 이동 순서는 바꾸지 않습니다. 중요한 콘텐츠 순서는 HTML에서 먼저 올바르게 작성합니다.</Note>

        <ArticleHeading id="flex-responsive" title="19. Flexbox로 만드는 반응형 카드" />
        <p>Flexbox는 부모 크기에 따라 아이템이 늘고, 줄고, 다음 줄로 이동할 수 있어 반응형 목록에 유용합니다.</p>
        <SimpleCode language="흐름" code={'부모가 커짐   → flex-grow로 아이템이 늘어남\n부모가 작아짐 → flex-shrink로 아이템이 줄어듦\n더 작아짐     → flex-wrap으로 다음 줄로 이동'} />
        <SimpleCode language="CSS" code={'.cards {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 20px;\n}\n\n.card {\n  flex: 1 1 250px;\n}'} />
        <SimpleCode language="배치" code={'넓은 화면\n[ 카드 1 ][ 카드 2 ][ 카드 3 ]\n\n좁은 화면\n[ 카드 1 ][ 카드 2 ]\n[       카드 3       ]'} />
        <Note title="Flex만으로 모든 반응형 문제가 끝나지는 않음">늘이기·줄이기·줄바꿈으로 자연스러운 변화는 만들 수 있지만, 특정 너비에서 메뉴 모양이나 열 수를 명확히 바꾸려면 미디어 쿼리를 함께 사용합니다.</Note>

        <ArticleHeading id="flex-example" title="20. 복사해서 쓰는 기본 실전 코드" />
        <SimpleCode language="HTML" code={'<div class="container">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n</div>'} />
        <SimpleCode language="CSS" code={'.container {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center;\n  gap: 20px;\n  min-height: 300px;\n}\n\n.item {\n  width: 100px;\n  padding: 20px;\n  border: 1px solid black;\n  text-align: center;\n}'} />

        <ArticleHeading id="flex-summary" title="21. Flexbox 최종 암기 순서" />
        <DocsTable
          headers={["순서", "확인할 질문", "속성"]}
          rows={[
            ["1", "누가 자식 배치를 관리하는 부모인가?", <code key="summary-display">display: flex</code>],
            ["2", "어느 방향으로 배치할까?", <code key="summary-direction">flex-direction</code>],
            ["3", "공간이 부족하면 줄바꿈할까?", <code key="summary-wrap">flex-wrap</code>],
            ["4", "주축에서 어떻게 정렬할까?", <code key="summary-justify">justify-content</code>],
            ["5", "교차축에서 어떻게 정렬할까?", <code key="summary-align">align-items</code>],
            ["6", "아이템 사이 간격은 얼마인가?", <code key="summary-gap">gap</code>],
            ["7", "아이템의 시작 크기와 증감은?", <code key="summary-flex">flex: grow shrink basis</code>],
          ]}
        />
        <SimpleCode language="CSS" code={'.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 20px;\n}'} />
        <div className="summary-callout">부모에 <code>display: flex</code> → 방향과 줄바꿈 → 주축·교차축 정렬 → <code>gap</code> → 아이템의 <code>basis·grow·shrink</code> 순서로 생각합니다.</div>
        <NextPage label="Media Query" onClick={() => navigate({ type: "article", id: "css-responsive" })} />
      </article>
    </DocsFrame>
  );
}

function CssResponsiveArticle({ navigate }: { navigate: (view: View) => void }) {
  const toc: Array<[string, string]> = [
    ["반응형 웹", "responsive-basics"],
    ["viewport 설정", "viewport-meta"],
    ["상대 단위", "responsive-units"],
    ["viewport 단위", "viewport-units"],
    ["유동 레이아웃", "fluid-layout"],
    ["반응형 이미지", "responsive-images"],
    ["미디어 쿼리", "media-query"],
    ["모바일 우선", "mobile-first"],
    ["추가 조건", "media-features"],
    ["전체 예제", "responsive-example"],
    ["핵심 암기", "responsive-summary"],
  ];

  return (
    <DocsFrame toc={toc}>
      <article className="prose article-prose imported-article">
        <PageActions />
        <button className="breadcrumb-button" onClick={() => navigate({ type: "category", id: "css" })}>CSS <span>›</span> Responsive</button>
        <div className="source-badge"><span>●</span> RESPONSIVE CSS</div>
        <h1 id="css-responsive">반응형 웹과 Media Query</h1>
        <p className="lead">화면 크기에 따라 레이아웃이 자연스럽게 바뀌도록 viewport, 상대 단위, 유동 레이아웃과 미디어 쿼리를 함께 사용하는 방법입니다.</p>

        <ArticleHeading id="responsive-basics" title="1. 반응형 웹이란?" />
        <p>반응형 웹은 하나의 HTML 문서가 모바일·태블릿·데스크톱의 화면 크기에 맞춰 크기와 배치를 바꾸는 방식입니다.</p>
        <DocsTable
          headers={["핵심 요소", "역할"]}
          rows={[
            ["Viewport 설정", "모바일 화면 너비를 올바르게 인식"],
            ["상대 단위", "글자와 공간을 기준에 따라 유연하게 계산"],
            ["유동 레이아웃", "고정 너비 대신 %, max-width, Grid 등을 사용"],
            ["유동 이미지", "이미지가 부모 영역보다 커지지 않게 설정"],
            ["미디어 쿼리", "화면 조건에 따라 CSS 규칙을 변경"],
          ]}
        />
        <div className="summary-callout">모바일은 1열, 태블릿은 2열, 데스크톱은 3열처럼 콘텐츠가 사용할 수 있는 공간에 맞춰 배치를 바꿉니다.</div>

        <ArticleHeading id="viewport-meta" title="2. HTML viewport 설정" />
        <SimpleCode language="HTML" code={'<meta\n  name="viewport"\n  content="width=device-width, initial-scale=1.0"\n>'} />
        <DocsTable
          headers={["설정", "의미"]}
          rows={[
            [<code key="device-width">width=device-width</code>, "문서의 viewport 너비를 기기 화면 너비에 맞춤"],
            [<code key="initial-scale">initial-scale=1.0</code>, "처음 표시되는 배율을 100%로 설정"],
          ]}
        />
        <Note title="모바일 반응형의 시작">viewport 메타 태그가 없으면 모바일 브라우저가 넓은 데스크톱 페이지처럼 축소해서 표시할 수 있습니다.</Note>

        <ArticleHeading id="responsive-units" title="3. 상대 단위: em, rem, %" />
        <DocsTable
          headers={["단위", "계산 기준", "특징"]}
          rows={[
            [<code key="em">em</code>, "부모 또는 현재 요소의 글자 크기", "중첩되면 크기가 계속 곱해질 수 있음"],
            [<code key="rem">rem</code>, "최상위 html 요소의 글자 크기", "문서 전체에서 기준이 일정함"],
            [<code key="percent">%</code>, "대부분 관련 부모 요소의 크기", "속성마다 정확한 계산 기준을 확인해야 함"],
          ]}
        />
        <div className="code-stack two-columns">
          <SimpleCode language="em" code={'.parent {\n  font-size: 20px;\n}\n\n.child {\n  font-size: 1.5em; /* 30px */\n}'} />
          <SimpleCode language="rem" code={'html {\n  font-size: 16px;\n}\n\n.title {\n  font-size: 2rem; /* 32px */\n}'} />
        </div>
        <Note title="em의 기준"><code>font-size</code>에 사용한 em은 부모 글자 크기를 기준으로 하고, padding·margin 등에 사용한 em은 해당 요소의 계산된 글자 크기를 기준으로 합니다.</Note>
        <Note title="상대 단위와 반응형의 차이"><code>em</code>과 <code>rem</code>은 화면 크기를 직접 감지하는 단위가 아니라 기준 크기에 값을 곱하는 상대 단위입니다. 화면에 따른 변화는 유동 너비, viewport 단위, 미디어 쿼리 등과 조합해서 만듭니다.</Note>

        <ArticleHeading id="viewport-units" title="4. Viewport 단위" />
        <DocsTable
          headers={["단위", "기준"]}
          rows={[
            [<code key="vw">vw</code>, "viewport 너비의 1%"],
            [<code key="vh">vh</code>, "viewport 높이의 1%"],
            [<code key="vmin">vmin</code>, "너비와 높이 중 작은 값의 1%"],
            [<code key="vmax">vmax</code>, "너비와 높이 중 큰 값의 1%"],
            [<code key="dvh">dvh</code>, "모바일 주소창 변화가 반영된 현재 화면 높이의 1%"],
          ]}
        />
        <SimpleCode language="CSS" code={'.hero {\n  width: 100%;\n  min-height: 100dvh;\n}\n\n.title {\n  font-size: clamp(2rem, 5vw, 4rem);\n}'} />
        <p><code>clamp(최솟값, 유동값, 최댓값)</code>을 사용하면 화면에 따라 변하면서도 지나치게 작거나 커지는 것을 막을 수 있습니다.</p>

        <ArticleHeading id="fluid-layout" title="5. 유동적인 레이아웃" />
        <SimpleCode language="CSS" code={'*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n.site-container {\n  width: min(100% - 2rem, 1200px);\n  margin-inline: auto;\n}'} />
        <DocsTable
          headers={["설정", "역할"]}
          rows={[
            [<code key="fluid-width">width: min(100% - 2rem, 1200px)</code>, "작은 화면에서는 좌우 여백, 큰 화면에서는 최대 너비 유지"],
            [<code key="fluid-margin">margin-inline: auto</code>, "남는 가로 공간을 나누어 컨테이너 중앙 정렬"],
          ]}
        />

        <ArticleHeading id="responsive-images" title="6. 반응형 이미지" />
        <p>이미지가 원본 크기 때문에 부모 영역 밖으로 넘치지 않도록 최대 너비를 부모의 100%로 제한하고 높이는 원본 비율에 맞게 계산합니다.</p>
        <SimpleCode language="CSS" code={'img {\n  display: block;\n  max-width: 100%;\n  height: auto;\n}'} />
        <DocsTable
          headers={["속성", "역할"]}
          rows={[
            [<code key="image-width">max-width: 100%</code>, "이미지가 부모보다 커지는 것을 방지"],
            [<code key="image-height">height: auto</code>, "이미지 원본 비율 유지"],
          ]}
        />
        <Note title="퍼센트 기호 확인"><code>max-width: 100</code>은 길이 단위가 없어 잘못된 값입니다. 부모 너비를 기준으로 하려면 반드시 <code>max-width: 100%</code>처럼 <code>%</code>를 붙입니다.</Note>

        <ArticleHeading id="media-query" title="7. 미디어 쿼리 기본형" />
        <SimpleCode language="CSS" code={'@media (조건) {\n  /* 조건을 만족할 때 적용할 CSS */\n}\n\n@media (min-width: 768px) {\n  .container {\n    display: flex;\n  }\n}\n\n@media (max-width: 767px) {\n  .desktop-only {\n    display: none;\n  }\n}'} />
        <DocsTable
          headers={["조건", "적용 시점"]}
          rows={[
            [<code key="min-width">min-width</code>, "화면이 지정한 너비 이상일 때"],
            [<code key="max-width">max-width</code>, "화면이 지정한 너비 이하일 때"],
          ]}
        />
        <Note title="Breakpoint 정하기">중단점은 특정 기기 이름보다 콘텐츠의 배치가 깨지거나 공간이 부족해지는 지점을 기준으로 정하는 것이 좋습니다.</Note>

        <ArticleHeading id="mobile-first" title="8. 모바일 우선 방식" />
        <p>작은 화면의 CSS를 기본으로 작성하고 <code>min-width</code> 미디어 쿼리에서 넓은 화면용 규칙을 추가합니다.</p>
        <SimpleCode language="CSS" code={'.cards {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 1rem;\n}\n\n@media (min-width: 48rem) {\n  .cards {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n@media (min-width: 64rem) {\n  .cards {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}'} />
        <div className="summary-callout">기본 1열 → 48rem 이상 2열 → 64rem 이상 3열</div>

        <ArticleHeading id="media-features" title="9. 너비 외에 사용할 수 있는 조건" />
        <SimpleCode language="CSS" code={'/* 가로 방향 화면 */\n@media (orientation: landscape) {\n  .hero { min-height: 70vh; }\n}\n\n/* 마우스를 올릴 수 있는 기기 */\n@media (hover: hover) {\n  .button:hover { background-color: royalblue; }\n}\n\n/* 애니메이션 감소 설정을 사용한 경우 */\n@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n    scroll-behavior: auto !important;\n  }\n}'} />

        <ArticleHeading id="responsive-example" title="10. 복사해서 쓰는 전체 예제" />
        <SimpleCode language="HTML" code={'<main class="site-container">\n  <h1 class="page-title">반응형 카드</h1>\n  <section class="cards">\n    <article class="card">카드 1</article>\n    <article class="card">카드 2</article>\n    <article class="card">카드 3</article>\n  </section>\n</main>'} />
        <SimpleCode language="CSS" code={'*, *::before, *::after {\n  box-sizing: border-box;\n}\n\nbody {\n  margin: 0;\n  font: 1rem/1.6 sans-serif;\n}\n\n.site-container {\n  width: min(100% - 2rem, 1200px);\n  margin-inline: auto;\n}\n\n.page-title {\n  font-size: clamp(2rem, 5vw, 4rem);\n}\n\n.cards {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 1rem;\n}\n\n.card {\n  padding: 1.5rem;\n  border: 1px solid #d1d5db;\n  border-radius: 1rem;\n}\n\n@media (min-width: 48rem) {\n  .cards { grid-template-columns: repeat(2, 1fr); }\n}\n\n@media (min-width: 64rem) {\n  .cards { grid-template-columns: repeat(3, 1fr); }\n}'} />

        <ArticleHeading id="responsive-summary" title="11. 코딩할 때 보는 핵심 암기" />
        <DocsTable
          headers={["개념", "한 줄 설명"]}
          rows={[
            ["viewport", "모바일 화면 너비를 올바르게 인식"],
            [<code key="em-summary">em</code>, "부모·현재 글자 크기 기준"],
            [<code key="rem-summary">rem</code>, "html 글자 크기 기준"],
            [<code key="percent-summary">%</code>, "대부분 관련 부모 요소의 크기 기준"],
            [<code key="vw-summary">vw</code>, "viewport 너비 기준"],
            [<code key="dvh-summary">dvh</code>, "현재 보이는 viewport 높이 기준"],
            [<code key="image-summary">max-width: 100%</code>, "이미지가 부모보다 커지는 것을 방지"],
            [<code key="min-summary">min-width</code>, "해당 너비 이상에서 적용"],
            [<code key="max-summary">max-width</code>, "해당 너비 이하에서 적용"],
            ["모바일 우선", "작은 화면 CSS부터 작성하고 min-width로 확장"],
          ]}
        />
        <SimpleCode language="CSS" code={'/* 가장 자주 쓰는 반응형 뼈대 */\n.site-container {\n  width: min(100% - 2rem, 1200px);\n  margin-inline: auto;\n}\n\n@media (min-width: 48rem) {\n  /* 태블릿 이상 */\n}\n\n@media (min-width: 64rem) {\n  /* 데스크톱 이상 */\n}'} />
        <div className="summary-callout">viewport로 화면을 맞추고, 상대 단위·유동 레이아웃·반응형 이미지로 기본 구조를 만든 뒤, 미디어 쿼리로 필요한 지점에서 배치를 변경합니다.</div>
        <NextPage label="CSS" onClick={() => navigate({ type: "category", id: "css" })} />
      </article>
    </DocsFrame>
  );
}

function BoxModelDiagram() {
  return (
    <div className="box-model-diagram" aria-label="바깥에서 안쪽으로 margin, border, padding, content 순서">
      <strong>margin <small>바깥 여백</small></strong>
      <div>
        <strong>border <small>테두리</small></strong>
        <div>
          <strong>padding <small>안쪽 여백</small></strong>
          <div><strong>content</strong><small>실제 내용</small></div>
        </div>
      </div>
    </div>
  );
}

function CssSyntaxExample() {
  return (
    <section className="runnable-example css-syntax-example">
      <SimpleCode language="CSS" code={'p {\n  color: blue;\n  font-size: 16px;\n}'} />
      <div className="css-live-preview">
        <div><span>적용 결과</span><small>위 CSS 규칙이 문단에 적용됩니다.</small></div>
        <p>CSS가 적용된 문장입니다.</p>
      </div>
    </section>
  );
}

const importedMeta: Record<Exclude<HtmlArticleId, "fieldset" | "legend">, {
  title: string;
  lead: string;
  toc: Array<[string, string]>;
  next: HtmlArticleId;
  nextLabel: string;
}> = {
  "html-intro": {
    title: "HTML 개요",
    lead: "HTML은 웹페이지의 구조와 내용에 의미를 부여하는 마크업 언어입니다.",
    toc: [["HTML이란?", "what"], ["이름을 나누어 보면", "name"], ["한 줄 요약", "summary"]],
    next: "tag-overview",
    nextLabel: "태그 개요",
  },
  "tag-overview": {
    title: "태그 개요",
    lead: "태그는 콘텐츠를 감싸서 제목, 단락, 영역, 목록과 같은 의미와 역할을 표시합니다.",
    toc: [["기본 태그", "basic"], ["학습한 범위", "scope"], ["문서 구조", "structure"]],
    next: "semantic-tags",
    nextLabel: "시맨틱 태그",
  },
  "semantic-tags": {
    title: "시맨틱 태그",
    lead: "페이지를 의미 있는 영역으로 나누는 구조 태그와 각각의 사용 위치를 정리합니다.",
    toc: [["페이지 구조 태그", "semantic"], ["구조 예제", "example"], ["선택 기준", "criteria"]],
    next: "text-tags",
    nextLabel: "텍스트 태그",
  },
  "text-tags": {
    title: "텍스트 태그",
    lead: "제목과 단락을 만들고, 텍스트에 강조·삭제·추가 같은 의미를 더하는 태그입니다.",
    toc: [["문서의 흐름", "flow"], ["인라인 태그", "inline"], ["헷갈렸던 부분", "confused"]],
    next: "list-tags",
    nextLabel: "목록 태그",
  },
  "list-tags": {
    title: "목록 태그",
    lead: "순서가 있는 목록, 순서가 없는 목록, 용어와 설명의 관계를 표현합니다.",
    toc: [["목록 태그", "list"], ["코드 예제", "example"], ["관계로 이해하기", "relation"]],
    next: "table",
    nextLabel: "표 정리",
  },
  table: {
    title: "표 정리",
    lead: "table → tr → th 또는 td의 구조와 표를 디자인하는 CSS를 함께 정리합니다.",
    toc: [["기본 구조", "structure"], ["태그와 속성", "elements"], ["기본 예제", "example"], ["표 디자인", "style"], ["이미지 넣기", "image"], ["핵심 암기", "summary"]],
    next: "image-pdf",
    nextLabel: "이미지와 PDF",
  },
  "image-pdf": {
    title: "이미지와 PDF",
    lead: "이미지와 PDF 파일을 문서에 삽입하고 상대 경로를 작성하는 방법을 정리합니다.",
    toc: [["이미지 삽입", "image"], ["이미지 경로", "image-path"], ["PDF 삽입", "pdf"], ["PDF 경로", "pdf-path"], ["비교", "compare"], ["핵심 암기", "summary"]],
    next: "media",
    nextLabel: "미디어 삽입",
  },
  media: {
    title: "미디어 삽입 태그",
    lead: "embed, audio, video의 용도와 재생 관련 속성, 파일 경로를 한 번에 비교합니다.",
    toc: [["태그 비교", "compare"], ["주요 속성", "attributes"], ["embed", "embed"], ["audio", "audio"], ["video", "video"], ["preload", "preload"], ["파일 경로", "path"], ["핵심 암기", "summary"]],
    next: "form",
    nextLabel: "Form",
  },
  form: {
    title: "Form",
    lead: "입력 칸과 선택 항목, 버튼을 하나의 양식으로 묶는 form의 구조와 핵심 속성을 정리합니다.",
    toc: [
      ["01. 폼 기본 구조", "chapter-basics"],
      ["02. 입력 종류", "chapter-types"],
      ["03. 숫자·날짜 입력", "chapter-number-date"],
      ["04. 속성과 기본값", "chapter-attributes"],
      ["05. 특수·선택 입력", "chapter-special"],
      ["06. 전체 예제", "full-example"],
      ["07. 핵심 요약", "summary"],
    ],
    next: "fieldset",
    nextLabel: "<fieldset>",
  },
};

function ImportedHtmlArticle({ id, navigate }: { id: Exclude<HtmlArticleId, "fieldset" | "legend">; navigate: (view: View) => void }) {
  const meta = importedMeta[id];
  return (
    <DocsFrame toc={meta.toc}>
      <article className="prose article-prose imported-article">
        <PageActions />
        <button className="breadcrumb-button" onClick={() => navigate({ type: "category", id: "html" })}>HTML <span>›</span></button>
        <div className="source-badge"><span>●</span> NOTION STUDY ARCHIVE</div>
        <h1>{meta.title}</h1>
        <p className="lead">{meta.lead}</p>
        <ImportedContent id={id} />
        <NextPage label={meta.nextLabel} onClick={() => navigate({ type: "article", id: meta.next })} />
      </article>
    </DocsFrame>
  );
}

function ImportedContent({ id }: { id: Exclude<HtmlArticleId, "fieldset" | "legend"> }) {
  if (id === "html-intro") {
    return (
      <>
        <ArticleHeading id="what" title="HTML이란?" />
        <p>HTML은 웹페이지의 구조와 내용에 의미를 부여하는 마크업 언어입니다. 화면을 꾸미는 CSS나 동작을 만드는 JavaScript보다 먼저, 콘텐츠가 무엇인지 브라우저에 설명합니다.</p>
        <div className="definition-card"><code>HTML</code><span>=</span><strong>HyperText Markup Language</strong></div>
        <ArticleHeading id="name" title="이름을 나누어 보면" />
        <DocsTable
          headers={["단어", "학습한 의미"]}
          rows={[
            [<code key="h">HyperText</code>, "다른 문서와 연결할 수 있는 텍스트"],
            [<code key="m">Markup</code>, "태그로 내용의 의미를 표시"],
            [<code key="l">Language</code>, "정해진 작성 규칙"],
          ]}
        />
        <ArticleHeading id="summary" title="한 줄 요약" />
        <div className="summary-callout">HTML은 태그를 사용해 웹 콘텐츠의 구조와 의미를 표현하는 언어다.</div>
      </>
    );
  }

  if (id === "tag-overview") {
    return (
      <>
        <ArticleHeading id="basic" title="기본 태그" />
        <p><code>&lt;h1&gt;</code>은 제목을, <code>&lt;p&gt;</code>는 단락을 나타냅니다. 태그 이름은 브라우저와 개발자에게 콘텐츠의 역할을 전달합니다.</p>
        <SimpleCode code={'<h1>페이지 제목</h1>\n<p>하나의 의미 있는 단락입니다.</p>'} />
        <ArticleHeading id="scope" title="학습한 범위" />
        <ul>
          <li>페이지 구조를 만드는 시맨틱 태그</li>
          <li>제목, 단락, 강조와 수정 이력을 표현하는 텍스트 태그</li>
          <li>순서·항목·설명 관계를 만드는 목록 태그</li>
          <li>표, 이미지, PDF, 오디오, 비디오 삽입 태그</li>
          <li>사용자 입력을 받는 Form 태그</li>
        </ul>
        <ArticleHeading id="structure" title="문서 구조" />
        <SimpleCode code={'<header>머리말</header>\n<nav>주요 메뉴</nav>\n<main>\n  <section>\n    <article>독립적인 콘텐츠</article>\n  </section>\n  <aside>관련된 보조 내용</aside>\n</main>\n<footer>하단 정보</footer>'} />
      </>
    );
  }

  if (id === "semantic-tags") {
    return (
      <>
        <ArticleHeading id="semantic" title="페이지 구조 태그" />
        <DocsTable
          headers={["태그", "의미", "사용 예"]}
          rows={[
            [<code key="div">&lt;div&gt;</code>, "특별한 의미가 없는 일반 묶음", "CSS 배치, 여러 요소 묶기"],
            [<code key="header">&lt;header&gt;</code>, "페이지나 영역의 머리말", "로고, 제목, 소개"],
            [<code key="nav">&lt;nav&gt;</code>, "주요 이동 메뉴", "상단 메뉴, 목차"],
            [<code key="main">&lt;main&gt;</code>, "페이지의 핵심 내용", "게시글·상품 목록"],
            [<code key="section">&lt;section&gt;</code>, "같은 주제의 내용을 묶은 구역", "공지사항, 인기 상품"],
            [<code key="article">&lt;article&gt;</code>, "독립적으로 이해할 수 있는 콘텐츠", "게시글, 뉴스, 상품 카드"],
            [<code key="aside">&lt;aside&gt;</code>, "핵심 내용과 관련된 보조 영역", "광고, 추천 글, 사이드바"],
            [<code key="footer">&lt;footer&gt;</code>, "페이지나 영역의 하단 정보", "저작권, 연락처, 약관"],
          ]}
        />
        <ArticleHeading id="example" title="구조 예제" />
        <SimpleCode code={'<header>\n  <h1>Frontend Library</h1>\n</header>\n<nav>문서 목차</nav>\n<main>\n  <section>\n    <h2>HTML</h2>\n    <article>fieldset 학습 기록</article>\n  </section>\n  <aside>관련 문서</aside>\n</main>\n<footer>저작권과 연락처</footer>'} />
        <ArticleHeading id="criteria" title="선택 기준" />
        <Note title="의미가 먼저">
          스타일을 적용하기 위한 묶음이면 div를, 문서 안에서 역할이 분명한 영역이면 header, nav, main, section, article, aside, footer를 먼저 검토합니다.
        </Note>
      </>
    );
  }

  if (id === "text-tags") {
    return (
      <>
        <ArticleHeading id="flow" title="문서의 흐름" />
        <DocsTable
          headers={["태그", "의미", "메모"]}
          rows={[
            [<code key="h">&lt;h1&gt;–&lt;h6&gt;</code>, "제목", "1부터 6까지 단계가 내려감"],
            [<code key="p">&lt;p&gt;</code>, "단락", "하나의 문단을 묶음"],
            [<code key="br">&lt;br&gt;</code>, "줄바꿈", "닫는 태그 없음"],
            [<code key="hr">&lt;hr&gt;</code>, "주제의 전환", "기본 스타일은 가로줄"],
            [<code key="strong">&lt;strong&gt;</code>, "중요한 내용", "화면 낭독기에서도 중요성을 전달"],
            [<code key="b">&lt;b&gt;</code>, "주의를 끄는 굵은 글씨", "중요성 없이 시각적으로 구분"],
            [<code key="em">&lt;em&gt;</code>, "강조", "문맥의 강세를 전달"],
            [<code key="i">&lt;i&gt;</code>, "다른 목소리나 용어", "기본 스타일은 이탤릭체"],
            [<code key="cite">&lt;cite&gt;</code>, "저작물의 제목", "책·영화·그림 등의 제목"],
          ]}
        />
        <ArticleHeading id="inline" title="의미를 더하는 인라인 태그" />
        <DocsTable
          headers={["태그", "의미와 역할", "사용 예시 / 화면 표시"]}
          rows={[
            [<code key="abbr">&lt;abbr&gt;</code>, "약어·줄임말", '<abbr title="Artificial Intelligence">AI</abbr>'],
            [<code key="code">&lt;code&gt;</code>, "짧은 소스 코드나 명령어", "<code>push()</code> 함수"],
            [<code key="del">&lt;del&gt;</code>, "문서에서 삭제된 내용", "<del>13,000원</del>"],
            [<code key="ins">&lt;ins&gt;</code>, "문서에 새로 추가된 내용", "<ins>12,000원</ins>"],
            [<code key="mark">&lt;mark&gt;</code>, "중요하거나 관련 있는 내용", "색상은 <mark>빨간색</mark>입니다."],
            [<code key="small">&lt;small&gt;</code>, "덧붙임·저작권·주의사항", "가격: 13,000원 <small>(부가세 별도)</small>"],
            [<code key="sub">&lt;sub&gt;</code>, "아래 첨자", "H₂O"],
            [<code key="sup">&lt;sup&gt;</code>, "위 첨자", "E = mc²"],
          ]}
        />
        <ArticleHeading id="confused" title="내가 헷갈렸던 부분" />
        <Note title="strong과 b, em과 i">
          학습 당시에는 모양이 같아 차이가 헷갈렸습니다. strong과 em은 중요도와 강세라는 의미를 전달하고, b와 i는 의미보다 다른 텍스트와의 구분에 가깝습니다. cite는 일반적인 이탤릭 표현이 아니라 저작물의 제목에 사용합니다.
        </Note>
      </>
    );
  }

  if (id === "list-tags") {
    return (
      <>
        <ArticleHeading id="list" title="목록 태그" />
        <DocsTable
          headers={["태그", "의미"]}
          rows={[
            [<code key="ol">&lt;ol&gt;</code>, "순서가 있는 목록"],
            [<code key="ul">&lt;ul&gt;</code>, "순서가 없는 목록"],
            [<code key="li">&lt;li&gt;</code>, "ol 또는 ul 안의 목록 항목"],
            [<code key="dl">&lt;dl&gt;</code>, "설명 목록"],
            [<code key="dt">&lt;dt&gt;</code>, "설명할 용어나 이름"],
            [<code key="dd">&lt;dd&gt;</code>, "용어에 대한 설명"],
          ]}
        />
        <ArticleHeading id="example" title="코드 예제" />
        <SimpleCode code={'<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n</ul>\n\n<dl>\n  <dt>HTML</dt>\n  <dd>웹 문서의 구조와 의미를 표현하는 언어</dd>\n</dl>'} />
        <ArticleHeading id="relation" title="관계로 이해하기" />
        <div className="summary-callout">ol / ul → li, 그리고 dl → dt + dd의 부모·자식 관계로 기억한다.</div>
      </>
    );
  }

  if (id === "table") {
    return (
      <>
        <ArticleHeading id="structure" title="1. 표의 기본 구조" />
        <p><code>table → tr → th 또는 td</code> 순서로 작성합니다. 표 전체 안에 행이 있고, 행 안에는 제목 셀이나 내용 셀이 들어갑니다.</p>
        <div className="structure-flow"><code>table</code><span>→</span><code>tr</code><span>→</span><code>th / td</code></div>
        <ArticleHeading id="elements" title="태그와 속성" />
        <DocsTable
          headers={["태그·속성", "역할", "예시"]}
          rows={[
            [<code key="table">&lt;table&gt;</code>, "표 전체를 감쌈", "<table>...</table>"],
            [<code key="caption">&lt;caption&gt;</code>, "표의 제목을 작성", "<caption>상품 목록</caption>"],
            [<code key="thead">&lt;thead&gt;</code>, "표의 제목 영역을 묶음", "<thead>...</thead>"],
            [<code key="tbody">&lt;tbody&gt;</code>, "표의 본문 영역을 묶음", "<tbody>...</tbody>"],
            [<code key="tr">&lt;tr&gt;</code>, "표의 한 행을 만듦", "<tr>...</tr>"],
            [<code key="th">&lt;th&gt;</code>, "제목 셀을 만듦", "<th>상품명</th>"],
            [<code key="td">&lt;td&gt;</code>, "일반 데이터 셀을 만듦", "<td>노트북</td>"],
            [<code key="colspan">colspan</code>, "여러 열을 하나로 합침", '<td colspan="2">내용</td>'],
            [<code key="rowspan">rowspan</code>, "여러 행을 하나로 합침", '<td rowspan="2">내용</td>'],
          ]}
        />
        <ArticleHeading id="example" title="기본 표 예제" />
        <SimpleCode code={'<table>\n  <caption>상품 목록</caption>\n  <thead>\n    <tr>\n      <th>상품명</th>\n      <th>가격</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>키보드</td>\n      <td>30,000원</td>\n    </tr>\n    <tr>\n      <td>마우스</td>\n      <td>20,000원</td>\n    </tr>\n  </tbody>\n</table>'} />
        <ArticleHeading id="style" title="2. 표 디자인하기" />
        <DocsTable
          headers={["CSS 속성", "역할", "예시"]}
          rows={[
            [<code key="border">border</code>, "테두리를 표시", "border: 1px solid #ccc;"],
            [<code key="collapse">border-collapse</code>, "겹치는 테두리를 하나로 합침", "border-collapse: collapse;"],
            [<code key="padding">padding</code>, "셀 안쪽 여백", "padding: 10px 20px;"],
            [<code key="align">text-align</code>, "셀의 글자를 정렬", "text-align: center;"],
            [<code key="background">background-color</code>, "셀의 배경색을 지정", "background-color: #eee;"],
          ]}
        />
        <SimpleCode language="CSS" code={'table {\n  border-collapse: collapse;\n}\n\ntable, th, td {\n  border: 1px solid #ccc;\n}\n\nth, td {\n  padding: 10px 20px;\n  text-align: center;\n}\n\nth {\n  background-color: #eee;\n}'} />
        <Note title="border-collapse">표의 테두리를 합치는 속성이므로 각각의 셀이 아니라 table에 적용합니다.</Note>
        <ArticleHeading id="image" title="3. 표 안에 이미지 넣기" />
        <p>표 안에 이미지를 넣으려면 <code>&lt;td&gt;</code> 안에 <code>&lt;img&gt;</code>를 작성합니다. 구조는 <code>table → tr → td → img</code>입니다.</p>
        <SimpleCode code={'<table>\n  <caption>동물 목록</caption>\n  <thead>\n    <tr>\n      <th>사진</th>\n      <th>이름</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>\n        <img src="images/cat.jpg" alt="고양이 사진" width="150">\n      </td>\n      <td>고양이</td>\n    </tr>\n  </tbody>\n</table>'} />
        <ArticleHeading id="summary" title="핵심 암기" />
        <div className="memory-grid">
          <span><code>table</code><small>표 전체</small></span>
          <span><code>tr</code><small>한 행</small></span>
          <span><code>th</code><small>제목 셀</small></span>
          <span><code>td</code><small>내용 셀</small></span>
        </div>
      </>
    );
  }

  if (id === "image-pdf") {
    return (
      <>
        <ArticleHeading id="image" title="1. 이미지 삽입하기" />
        <p>이미지는 <code>&lt;img&gt;</code> 태그로 삽입합니다. img는 닫는 태그가 없는 빈 요소입니다.</p>
        <SimpleCode code={'<img src="이미지 경로" alt="이미지 설명">\n\n<img\n  src="images/cat.jpg"\n  alt="소파에 앉아 있는 고양이"\n  width="300">'} />
        <DocsTable
          headers={["속성", "역할", "예시"]}
          rows={[
            [<code key="src">src</code>, "이미지 파일의 경로", 'src="images/cat.jpg"'],
            [<code key="alt">alt</code>, "이미지를 대신하는 설명", 'alt="고양이 사진"'],
            [<code key="width">width</code>, "이미지의 너비", 'width="300"'],
            [<code key="height">height</code>, "이미지의 높이", 'height="200"'],
          ]}
        />
        <ArticleHeading id="image-path" title="2. 이미지 경로 작성법" />
        <DocsTable
          headers={["이미지 위치", "작성 방법", "의미"]}
          rows={[
            ["HTML과 같은 폴더", 'src="cat.jpg"', "현재 폴더"],
            ["images 폴더 안", 'src="images/cat.jpg"', "하위 폴더"],
            ["한 단계 위 폴더", 'src="../cat.jpg"', "상위 폴더"],
            ["인터넷 이미지", 'src="https://주소/cat.jpg"', "외부 주소"],
          ]}
        />
        <SimpleCode language="TREE" code={'project\n├── index.html\n└── images\n    └── cat.jpg'} />
        <SimpleCode code={'<img src="images/cat.jpg" alt="고양이 사진">'} />
        <ArticleHeading id="pdf" title="3. PDF 삽입하기" />
        <p>PDF는 <code>&lt;embed&gt;</code> 태그로 삽입할 수 있습니다. embed 역시 닫는 태그가 없습니다.</p>
        <SimpleCode code={'<embed src="PDF 경로" type="application/pdf">\n\n<embed\n  src="files/product.pdf"\n  type="application/pdf"\n  width="900"\n  height="800">'} />
        <DocsTable
          headers={["속성", "역할", "예시"]}
          rows={[
            [<code key="src">src</code>, "PDF 파일의 경로", 'src="files/product.pdf"'],
            [<code key="type">type</code>, "삽입할 파일의 형식", 'type="application/pdf"'],
            [<code key="width">width</code>, "PDF 화면의 너비", 'width="900"'],
            [<code key="height">height</code>, "PDF 화면의 높이", 'height="800"'],
          ]}
        />
        <ArticleHeading id="pdf-path" title="4. PDF 경로 작성법" />
        <DocsTable
          headers={["PDF 위치", "작성 방법", "의미"]}
          rows={[
            ["HTML과 같은 폴더", 'src="product.pdf"', "현재 폴더"],
            ["files 폴더 안", 'src="files/product.pdf"', "하위 폴더"],
            ["한 단계 위 폴더", 'src="../product.pdf"', "상위 폴더"],
            ["인터넷 PDF", 'src="https://주소/product.pdf"', "외부 주소"],
          ]}
        />
        <SimpleCode language="TREE" code={'project\n├── index.html\n├── images\n│   └── cat.jpg\n└── files\n    └── product.pdf'} />
        <ArticleHeading id="compare" title="이미지와 PDF 비교" />
        <DocsTable
          headers={["구분", "이미지", "PDF"]}
          rows={[
            ["사용하는 태그", "<img>", "<embed>"],
            ["파일 경로 속성", "src", "src"],
            ["파일 설명 / 형식", "alt", "type"],
            ["닫는 태그", "없음", "없음"],
            ["기본 형식", '<img src="경로" alt="설명">', '<embed src="경로" type="application/pdf">'],
          ]}
        />
        <ArticleHeading id="summary" title="핵심 암기" />
        <SimpleCode code={'<!-- 이미지 -->\n<img src="이미지 경로" alt="이미지 설명">\n\n<!-- PDF -->\n<embed src="PDF 경로" type="application/pdf">'} />
      </>
    );
  }

  if (id === "media") {
    return (
      <>
        <ArticleHeading id="compare" title="미디어 삽입 태그 비교" />
        <DocsTable
          headers={["태그", "용도", "기본 형식"]}
          rows={[
            [<code key="embed">&lt;embed&gt;</code>, "PDF, 오디오, 비디오 등의 외부 파일 삽입", '<embed src="파일 주소">'],
            [<code key="audio">&lt;audio&gt;</code>, "음악이나 음성 파일 재생", '<audio src="오디오 주소" controls></audio>'],
            [<code key="video">&lt;video&gt;</code>, "비디오 파일 재생", '<video src="비디오 주소" controls></video>'],
          ]}
        />
        <ArticleHeading id="attributes" title="주요 속성 정리" />
        <DocsTable
          headers={["속성", "적용 태그", "설명", "사용 예"]}
          rows={[
            [<code key="src">src</code>, "모두", "삽입할 파일의 주소 또는 경로", 'src="medias/salad.mp4"'],
            [<code key="type">type</code>, "embed 등", "삽입하는 파일의 형식", 'type="application/pdf"'],
            [<code key="controls">controls</code>, "audio, video", "재생·정지·음량 조절 버튼 표시", "controls"],
            [<code key="autoplay">autoplay</code>, "audio, video", "페이지를 열면 자동 재생", "autoplay"],
            [<code key="loop">loop</code>, "audio, video", "재생이 끝나면 반복", "loop"],
            [<code key="muted">muted</code>, "audio, video", "음소거 상태로 재생", "muted"],
            [<code key="preload">preload</code>, "audio, video", "파일을 미리 불러오는 방법", 'preload="metadata"'],
            [<code key="width">width</code>, "embed, video", "화면의 너비", 'width="700"'],
            [<code key="height">height</code>, "embed, video", "화면의 높이", 'height="400"'],
            [<code key="poster">poster</code>, "video", "재생 전 표시할 대표 이미지", 'poster="images/salad.jpg"'],
          ]}
        />
        <ArticleHeading id="embed" title="<embed> 기본 형식" />
        <p>embed는 img처럼 닫는 태그가 없습니다. 여러 외부 파일을 넣을 수 있지만 오디오와 비디오는 전용 태그를 쓰는 편이 기능과 의미 면에서 더 적합합니다.</p>
        <SimpleCode code={'<embed\n  src="파일 주소"\n  type="파일 형식"\n  width="너비"\n  height="높이">'} />
        <div className="code-stack">
          <SimpleCode code={'<!-- PDF 삽입 -->\n<embed\n  src="files/product.pdf"\n  type="application/pdf"\n  width="900"\n  height="800">'} />
          <SimpleCode code={'<!-- 오디오 삽입 -->\n<embed src="medias/spring.mp3" type="audio/mpeg">'} />
          <SimpleCode code={'<!-- 비디오 삽입 -->\n<embed\n  src="medias/salad.mp4"\n  type="video/mp4"\n  width="700"\n  height="400">'} />
        </div>
        <ArticleHeading id="audio" title="<audio> 기본 형식" />
        <SimpleCode code={'<audio src="오디오 주소" controls></audio>\n\n<!-- 반복 재생 -->\n<audio\n  src="medias/spring.mp3"\n  controls\n  loop>\n</audio>\n\n<!-- 자동 재생 -->\n<audio\n  src="medias/spring.mp3"\n  autoplay\n  muted>\n</audio>'} />
        <Note title="자동 재생 정책">자동 재생은 브라우저 정책 때문에 muted와 함께 사용해야 작동하는 경우가 많습니다.</Note>
        <ArticleHeading id="video" title="<video> 기본 형식" />
        <SimpleCode code={'<video src="비디오 주소" controls></video>\n\n<!-- 크기와 대표 이미지 -->\n<video\n  src="medias/salad.mp4"\n  controls\n  width="700"\n  poster="images/salad.jpg">\n</video>\n\n<!-- 자동 반복 재생 -->\n<video\n  src="medias/salad.mp4"\n  autoplay\n  muted\n  loop\n  width="700">\n</video>\n\n<!-- 메타데이터만 미리 로드 -->\n<video\n  src="medias/salad.mp4"\n  controls\n  preload="metadata">\n</video>'} />
        <ArticleHeading id="preload" title="preload 값" />
        <DocsTable
          headers={["값", "의미"]}
          rows={[
            [<code key="auto">auto</code>, "파일을 미리 불러옴"],
            [<code key="metadata">metadata</code>, "재생 시간 등의 기본 정보만 불러옴"],
            [<code key="none">none</code>, "사용자가 재생하기 전에는 불러오지 않음"],
          ]}
        />
        <ArticleHeading id="path" title="파일 주소 작성법" />
        <DocsTable
          headers={["파일 위치", "작성 방법"]}
          rows={[
            ["HTML과 같은 폴더", 'src="salad.mp4"'],
            ["medias 폴더 안", 'src="medias/salad.mp4"'],
            ["한 단계 위 폴더", 'src="../salad.mp4"'],
            ["인터넷 파일", 'src="https://example.com/salad.mp4"'],
          ]}
        />
        <SimpleCode language="TREE" code={'project\n├── index.html\n├── files\n│   └── product.pdf\n├── images\n│   └── salad.jpg\n└── medias\n    ├── spring.mp3\n    └── salad.mp4'} />
        <SimpleCode code={'<embed src="files/product.pdf">\n\n<audio src="medias/spring.mp3" controls></audio>\n\n<video\n  src="medias/salad.mp4"\n  poster="images/salad.jpg"\n  controls\n  width="700">\n</video>'} />
        <ArticleHeading id="summary" title="핵심만 암기" />
        <SimpleCode code={'<!-- 외부 파일 -->\n<embed src="파일 주소">\n\n<!-- 오디오 -->\n<audio src="오디오 주소" controls></audio>\n\n<!-- 비디오 -->\n<video src="비디오 주소" controls></video>'} />
      </>
    );
  }

  if (id === "form") {
    return (
      <>
        <FormChapterNav />
        <FormChapterDivider id="chapter-basics" number="01" title="폼 기본 구조" description="form의 역할과 관련 태그, 그룹, 자동 완성" />
        <ArticleHeading id="what" title="1. <form>이란?" />
        <p><code>&lt;form&gt;</code>은 입력 칸 자체가 아니라, 입력 칸과 선택 항목, 전송 버튼 등을 하나로 묶는 전체 양식입니다.</p>
        <div className="form-structure" aria-label="form 요소의 기본 구조">
          <strong>form</strong>
          <span>이름 입력 칸</span>
          <span>비밀번호 입력 칸</span>
          <span>선택 항목</span>
          <span>전송 버튼</span>
        </div>
        <SimpleCode code={'<form action="정보를 보낼 주소" method="post">\n  입력 요소\n</form>'} />
        <DocsTable
          headers={["속성", "역할"]}
          rows={[
            [<code key="action">action</code>, "입력한 정보를 보낼 서버 주소"],
            [<code key="method">method</code>, "정보를 전송하는 방법"],
            [<code key="autocomplete">autocomplete</code>, "자동 완성 기능의 사용 여부"],
          ]}
        />
        <SimpleCode code={'<form\n  action="/register"\n  method="post"\n  autocomplete="on">\n</form>'} />

        <ArticleHeading id="elements" title="2. 폼에서 사용하는 주요 태그" />
        <DocsTable
          headers={["태그", "역할"]}
          rows={[
            [<code key="form">&lt;form&gt;</code>, "입력 양식 전체를 묶음"],
            [<code key="fieldset">&lt;fieldset&gt;</code>, "관련된 입력 요소를 그룹으로 묶음"],
            [<code key="legend">&lt;legend&gt;</code>, "fieldset 그룹의 제목"],
            [<code key="label">&lt;label&gt;</code>, "입력 요소의 이름이나 설명"],
            [<code key="input">&lt;input&gt;</code>, "한 줄 입력, 선택 버튼 등을 만듦"],
            [<code key="button">&lt;button&gt;</code>, "전송, 초기화, 일반 버튼을 만듦"],
          ]}
        />
        <SimpleCode code={'<form>\n  <fieldset>\n    <legend>사용자 정보</legend>\n\n    <label for="user-name">이름</label>\n    <input type="text" id="user-name" name="userName">\n\n    <button type="submit">전송</button>\n  </fieldset>\n</form>'} />

        <ArticleHeading id="fieldset-legend" title="3. <fieldset>과 <legend>" />
        <p><code>&lt;fieldset&gt;</code>은 관련된 입력 요소를 하나의 그룹으로 묶고, <code>&lt;legend&gt;</code>는 그 그룹의 제목을 나타냅니다.</p>
        <SimpleCode code={'<fieldset>\n  <legend>로그인 정보</legend>\n\n  <input type="text">\n  <input type="password">\n</fieldset>'} />
        <Note title="의미 있는 그룹">테두리 모양만 만드는 태그가 아닙니다. fieldset과 legend를 함께 사용하면 보조 기술도 입력 요소들이 어떤 질문에 속하는지 이해할 수 있습니다.</Note>

        <ArticleHeading id="autocomplete" title="4. 자동 완성 autocomplete" />
        <p><code>autocomplete</code>는 브라우저에 저장된 정보를 이용해 입력 내용을 추천하거나 자동으로 채우는 기능입니다.</p>
        <SimpleCode code={'<form autocomplete="on">\n  <input type="email" autocomplete="email">\n</form>'} />
        <DocsTable
          headers={["값", "의미"]}
          rows={[
            [<code key="on">autocomplete=&quot;on&quot;</code>, "자동 완성을 사용"],
            [<code key="off">autocomplete=&quot;off&quot;</code>, "자동 완성을 사용하지 않도록 요청"],
            [<code key="name">autocomplete=&quot;name&quot;</code>, "이름 정보 자동 완성"],
            [<code key="email">autocomplete=&quot;email&quot;</code>, "이메일 정보 자동 완성"],
            [<code key="username">autocomplete=&quot;username&quot;</code>, "사용자 아이디 자동 완성"],
            [<code key="password">autocomplete=&quot;current-password&quot;</code>, "현재 비밀번호 자동 완성"],
          ]}
        />
        <Note title="placeholder와의 차이">placeholder는 입력 방법을 알려 주는 안내 문구이고, autocomplete는 저장된 실제 정보를 채우는 기능입니다.</Note>

        <FormChapterDivider id="chapter-types" number="02" title="입력 종류" description="input type에 따라 달라지는 입력 방식" />
        <ArticleHeading id="input-types" title="5. <input> 태그의 type" />
        <p><code>type</code> 값에 따라 입력 요소의 모양과 기능이 달라집니다. <code>&lt;input&gt;</code>은 닫는 태그가 없습니다.</p>
        <SimpleCode code={'<input type="입력 형태">\n\n<input type="text">'} />
        <DocsTable
          headers={["구분", "type 값", "역할"]}
          rows={[
            ["일반 입력", <code key="text">text</code>, "한 줄짜리 글자 입력"],
            ["비밀번호", <code key="password">password</code>, "입력한 내용을 기호로 가림"],
            ["검색", <code key="search">search</code>, "검색어 입력"],
            ["인터넷 주소", <code key="url">url</code>, "URL 주소 입력"],
            ["이메일", <code key="email">email</code>, "이메일 주소 입력"],
            ["전화번호", <code key="tel">tel</code>, "전화번호 입력"],
            ["여러 개 선택", <code key="checkbox">checkbox</code>, "여러 항목을 동시에 선택"],
            ["한 개 선택", <code key="radio">radio</code>, "같은 그룹에서 하나만 선택"],
            ["숫자", <code key="number">number</code>, "숫자 직접 입력 또는 화살표로 조절"],
            ["숫자 범위", <code key="range">range</code>, "슬라이드 막대로 숫자 선택"],
            ["날짜", <code key="date">date</code>, "연, 월, 일 선택"],
            ["연월", <code key="month">month</code>, "연도와 월 선택"],
            ["연주", <code key="week">week</code>, "연도와 주 선택"],
            ["시간", <code key="time">time</code>, "시간 선택"],
            ["날짜와 시간", <code key="datetime">datetime-local</code>, "날짜와 시간을 함께 선택"],
            ["전송", <code key="submit">submit</code>, "폼 내용을 서버로 전송"],
            ["초기화", <code key="reset">reset</code>, "입력 내용을 처음 상태로 되돌림"],
            ["이미지 버튼", <code key="image">image</code>, "이미지를 전송 버튼으로 사용"],
            ["일반 버튼", <code key="button">button</code>, "기본 기능이 없는 버튼"],
            ["파일 첨부", <code key="file">file</code>, "컴퓨터에서 파일 선택"],
            ["숨김 정보", <code key="hidden">hidden</code>, "화면에 보이지 않는 값을 전송"],
          ]}
        />

        <FormChapterDivider id="chapter-number-date" number="03" title="숫자·날짜 입력" description="number, range와 날짜·시간 전용 type" />
        <ArticleHeading id="number-input" title={'6. 숫자 입력 type="number"'} />
        <p>숫자를 직접 입력하거나 입력 칸의 화살표 버튼으로 값을 조절할 때 사용합니다.</p>
        <SimpleCode code={'<input type="number">'} />
        <DocsTable
          headers={["속성", "역할", "예시"]}
          rows={[
            [<code key="min">min</code>, "입력할 수 있는 최솟값", 'min="1"'],
            [<code key="max">max</code>, "입력할 수 있는 최댓값", 'max="10"'],
            [<code key="step">step</code>, "숫자가 증가하거나 감소하는 간격", 'step="2"'],
            [<code key="value">value</code>, "처음 표시할 기본값", 'value="5"'],
          ]}
        />
        <SimpleCode code={'<input\n  type="number"\n  min="1"\n  max="10"\n  step="1"\n  value="5">'} />
        <DocsTable
          headers={["코드", "의미"]}
          rows={[
            [<code key="type">type=&quot;number&quot;</code>, "숫자를 입력"],
            [<code key="min">min=&quot;1&quot;</code>, "1보다 작은 숫자는 범위를 벗어남"],
            [<code key="max">max=&quot;10&quot;</code>, "10보다 큰 숫자는 범위를 벗어남"],
            [<code key="step">step=&quot;1&quot;</code>, "화살표를 누를 때 1씩 변경"],
            [<code key="value">value=&quot;5&quot;</code>, "처음에는 5를 표시"],
          ]}
        />
        <h3 className="article-subheading">step 이해하기</h3>
        <p><code>step</code>은 숫자가 변경되는 간격입니다. 정수뿐 아니라 소수 단위도 지정할 수 있습니다.</p>
        <SimpleCode code={'<input\n  type="number"\n  min="0"\n  max="10"\n  step="2"\n  value="0">'} />
        <div className="value-sequence" aria-label="2씩 증가하는 숫자"><code>0</code><span>→</span><code>2</code><span>→</span><code>4</code><span>→</span><code>6</code><span>→</span><code>8</code><span>→</span><code>10</code></div>
        <SimpleCode code={'<input\n  type="number"\n  min="0"\n  max="5"\n  step="0.5"\n  value="1">'} />
        <div className="value-sequence" aria-label="0.5씩 증가하는 숫자"><code>1</code><span>→</span><code>1.5</code><span>→</span><code>2</code><span>→</span><code>2.5</code><span>→</span><code>3</code></div>
        <Note title="number에서 maxlength를 쓰지 않는 이유"><code>maxlength</code>는 글자 수를 제한하는 속성입니다. 숫자의 범위는 <code>min</code>과 <code>max</code>로 제한합니다. 예: <code>&lt;input type=&quot;number&quot; min=&quot;1&quot; max=&quot;100&quot;&gt;</code></Note>

        <ArticleHeading id="range-input" title={'7. 슬라이드 막대 type="range"'} />
        <p><code>range</code>는 슬라이드 막대를 움직여 숫자를 선택할 때 사용합니다. number와 마찬가지로 <code>min</code>, <code>max</code>, <code>step</code>, <code>value</code>를 사용합니다.</p>
        <SimpleCode code={'<input\n  type="range"\n  min="0"\n  max="100"\n  step="10"\n  value="50">'} />
        <DocsTable
          headers={["속성", "의미"]}
          rows={[
            [<code key="min">min=&quot;0&quot;</code>, "슬라이드의 최솟값은 0"],
            [<code key="max">max=&quot;100&quot;</code>, "슬라이드의 최댓값은 100"],
            [<code key="step">step=&quot;10&quot;</code>, "10씩 이동"],
            [<code key="value">value=&quot;50&quot;</code>, "처음 위치는 50"],
          ]}
        />
        <div className="value-sequence compact" aria-label="range에서 선택할 수 있는 값"><code>0</code><span>→</span><code>10</code><span>→</span><code>20</code><span>→</span><code>30</code><span>→</span><code>…</code><span>→</span><code>100</code></div>
        <h3 className="article-subheading">number와 range 비교</h3>
        <DocsTable
          headers={["구분", "number", "range"]}
          rows={[
            ["기본형", '<input type="number">', '<input type="range">'],
            ["화면 모양", "숫자 입력 칸", "슬라이드 막대"],
            ["숫자 직접 입력", "가능", "불가능"],
            ["값 선택 방법", "직접 입력 또는 화살표", "막대를 움직여 선택"],
            ["정확한 값 확인", "쉬움", "기본 화면에서는 정확한 값이 안 보일 수 있음"],
            ["주요 속성", "min, max, step, value", "min, max, step, value"],
          ]}
        />
        <SimpleCode code={'<!-- 숫자를 정확하게 입력 -->\n<input type="number" min="0" max="100" value="50">\n\n<!-- 슬라이드 막대로 선택 -->\n<input type="range" min="0" max="100" value="50">'} />

        <ArticleHeading id="date-time-inputs" title="8. 날짜와 시간 입력" />
        <p>날짜와 시간도 <code>&lt;input&gt;</code>의 <code>type</code>을 이용해 선택할 수 있습니다. 각 type마다 value에 사용하는 형식이 정해져 있습니다.</p>
        <DocsTable
          headers={["type", "역할", "value 형식"]}
          rows={[
            [<code key="date">date</code>, "연, 월, 일 선택", "2026-08-24"],
            [<code key="month">month</code>, "연도와 월 선택", "2026-08"],
            [<code key="week">week</code>, "연도와 주 선택", "2026-W35"],
            [<code key="time">time</code>, "시간 선택", "14:30"],
            [<code key="datetime">datetime-local</code>, "날짜와 시간을 함께 선택", "2026-08-24T14:30"],
          ]}
        />
        <h3 className="article-subheading">날짜 선택 date</h3>
        <SimpleCode code={'<input\n  type="date"\n  min="2026-08-01"\n  max="2026-08-31"\n  value="2026-08-24">'} />
        <DocsTable
          headers={["속성", "의미"]}
          rows={[
            [<code key="min">min=&quot;2026-08-01&quot;</code>, "선택 가능한 가장 빠른 날짜"],
            [<code key="max">max=&quot;2026-08-31&quot;</code>, "선택 가능한 가장 늦은 날짜"],
            [<code key="value">value=&quot;2026-08-24&quot;</code>, "처음 선택된 날짜"],
          ]}
        />
        <div className="format-card"><span>연도</span><b>-</b><span>월</span><b>-</b><span>일</span><code>2026-08-24</code></div>
        <h3 className="article-subheading">month와 week</h3>
        <div className="code-stack two-columns">
          <SimpleCode code={'<!-- 연도와 월 -->\n<input\n  type="month"\n  value="2026-08">'} />
          <SimpleCode code={'<!-- 연도와 주 -->\n<input\n  type="week"\n  value="2026-W35">'} />
        </div>
        <p><code>W35</code>는 해당 연도의 35번째 주를 의미합니다.</p>
        <h3 className="article-subheading">시간 선택 time</h3>
        <SimpleCode code={'<input\n  type="time"\n  min="09:00"\n  max="18:00"\n  step="1800"\n  value="09:00">'} />
        <Note title="time의 step은 초 단위"><code>1800</code>초는 30분, <code>3600</code>초는 1시간입니다. 위 코드는 오전 9시부터 오후 6시까지 30분 간격으로 시간을 선택한다는 뜻입니다.</Note>
        <h3 className="article-subheading">날짜와 시간 datetime-local</h3>
        <SimpleCode code={'<input\n  type="datetime-local"\n  min="2026-08-24T09:00"\n  max="2026-08-24T18:00"\n  value="2026-08-24T14:30">'} />
        <div className="format-card datetime-format"><span>2026-08-24</span><b>T</b><span>14:30</span><small>날짜와 시간 사이는 T로 구분</small></div>
        <NumberDatePlayground />

        <FormChapterDivider id="chapter-attributes" number="04" title="속성과 기본값" description="입력 요소의 이름, 초기 상태와 자동 동작" />
        <ArticleHeading id="input-attributes" title="9. <input>의 주요 속성" />
        <DocsTable
          headers={["속성", "역할", "예시"]}
          rows={[
            [<code key="type">type</code>, "입력 형태 지정", 'type="text"'],
            [<code key="id">id</code>, "입력 요소를 구별하는 고유 이름", 'id="user-name"'],
            [<code key="name">name</code>, "서버로 전송할 항목의 이름", 'name="userName"'],
            [<code key="value">value</code>, "입력 요소가 가지고 있는 실제 값", 'value="홍길동"'],
            [<code key="size">size</code>, "입력 칸의 보이는 너비", 'size="10"'],
            [<code key="maxlength">maxlength</code>, "입력할 수 있는 최대 글자 수", 'maxlength="5"'],
            [<code key="placeholder">placeholder</code>, "입력 칸에 힌트를 표시", 'placeholder="이름 입력"'],
            [<code key="autofocus">autofocus</code>, "페이지가 열리면 자동으로 커서 표시", "autofocus"],
            [<code key="readonly">readonly</code>, "내용을 볼 수 있지만 수정할 수 없음", "readonly"],
            [<code key="required">required</code>, "반드시 입력하도록 지정", "required"],
            [<code key="checked">checked</code>, "처음부터 선택된 상태로 지정", "checked"],
          ]}
        />
        <h3 className="article-subheading" id="autofocus">autofocus: 페이지가 열리면 자동으로 포커스</h3>
        <p><code>autofocus</code>를 지정하면 페이지가 처음 열릴 때 해당 입력 요소에 자동으로 포커스가 이동하여 바로 입력할 수 있는 상태가 됩니다.</p>
        <SimpleCode code={'<input type="text" id="user-name" autofocus>'} />
        <DocsTable
          headers={["초기 상태 속성", "역할", "기본 예시"]}
          rows={[
            [<code key="value">value</code>, "처음 표시할 실제 값", 'value="홍길동"'],
            [<code key="checked">checked</code>, "체크박스·라디오를 처음부터 선택", "checked"],
            [<code key="autofocus">autofocus</code>, "페이지가 열릴 때 입력 요소에 포커스", "autofocus"],
            [<code key="placeholder">placeholder</code>, "값이 없을 때 입력 안내 문구 표시", 'placeholder="이름 입력"'],
            [<code key="required">required</code>, "제출 전에 반드시 입력하도록 지정", "required"],
            [<code key="readonly">readonly</code>, "초기 값을 표시하되 수정은 막음", "readonly"],
          ]}
        />
        <Note title="autofocus 사용 시 주의">한 페이지에서는 가장 먼저 입력해야 할 요소 하나에만 사용하는 것이 좋습니다. 모바일 키보드가 갑자기 열리거나 보조 기술 사용자의 읽기 위치가 이동할 수 있으므로 꼭 필요할 때만 사용합니다.</Note>
        <AutofocusPlayground />

        <h3 className="article-subheading" id="placeholder">placeholder: 입력 전에 보여 주는 안내 문구</h3>
        <p><code>placeholder</code>는 입력 칸이 비어 있을 때 어떤 내용을 입력해야 하는지 알려 주는 짧은 힌트입니다. 사용자가 글자를 입력하면 안내 문구는 사라집니다.</p>
        <SimpleCode code={'<input type="text" id="user-name" placeholder="안녕?">'} />
        <DocsTable
          headers={["구분", "placeholder", "value"]}
          rows={[
            ["역할", "입력 방법을 알려 주는 힌트", "입력 요소가 실제로 가진 초기 값"],
            ["입력 시작 후", "글자를 입력하면 사라짐", "기존 값을 수정하거나 지우게 됨"],
            ["폼 제출", "placeholder 문구는 전송되지 않음", "name이 있으면 실제 값이 전송됨"],
            ["예시", 'placeholder="안녕?"', 'value="홍길동"'],
          ]}
        />
        <Note title="label을 대신할 수 없습니다">placeholder는 입력하는 동안 사라지므로 입력 요소의 이름으로 사용하면 안 됩니다. <code>&lt;label&gt;</code>로 항목 이름을 표시하고 placeholder는 짧은 예시나 형식 안내에 사용합니다.</Note>

        <h3 className="article-subheading" id="readonly">readonly: 값을 보여 주되 수정은 막기</h3>
        <p><code>readonly</code>를 지정하면 입력 요소의 값을 보고 선택할 수는 있지만 사용자가 직접 수정할 수 없습니다. 값은 일반적인 폼 제출 데이터에 포함됩니다.</p>
        <SimpleCode code={'<input\n  type="text"\n  id="user-name"\n  name="userName"\n  value="홍길동"\n  readonly>'} />
        <DocsTable
          headers={["구분", "readonly", "disabled"]}
          rows={[
            ["사용자 수정", "불가능", "불가능"],
            ["포커스와 선택", "가능", "불가능"],
            ["폼 제출", "name이 있으면 값이 전송됨", "일반적으로 값이 전송되지 않음"],
            ["주요 용도", "확인용 값, 수정하면 안 되는 입력", "현재 사용할 수 없는 입력"],
          ]}
        />
        <Note title="보안 기능은 아닙니다">readonly 값도 개발자 도구로 변경할 수 있으므로 서버는 제출된 값을 그대로 신뢰하지 말고 다시 확인해야 합니다.</Note>

        <h3 className="article-subheading" id="required">required: 반드시 입력해야 하는 항목</h3>
        <p><code>required</code>를 지정하면 값이 비어 있을 때 브라우저가 폼 제출을 막고 사용자에게 입력이 필요하다는 안내를 보여 줍니다.</p>
        <SimpleCode code={'<form>\n  <label for="user-name">이름</label>\n  <input\n    type="text"\n    id="user-name"\n    name="userName"\n    required>\n\n  <button type="submit">제출</button>\n</form>'} />
        <DocsTable
          headers={["상태", "브라우저 동작"]}
          rows={[
            ["입력값이 비어 있음", "제출을 막고 입력 안내를 표시"],
            ["입력값이 있음", "폼 제출을 계속 진행"],
            ["required가 없음", "비어 있어도 다른 조건이 없다면 제출 가능"],
          ]}
        />
        <Note title="서버 검증도 필요합니다">required는 브라우저에서 사용자의 입력을 돕는 기능입니다. 속성을 제거하거나 요청을 직접 보낼 수 있으므로 서버에서도 필수값을 반드시 다시 검사해야 합니다.</Note>
        <ReadonlyRequiredPlayground />
        <ArticleHeading id="attribute-compare" title="size, value, maxlength 비교" />
        <SimpleCode code={'<input\n  type="text"\n  size="10"\n  value="홍길동"\n  maxlength="5">'} />
        <div className="attribute-compare-grid">
          <span><code>size</code><small>입력 칸의 보이는 크기</small></span>
          <span><code>value</code><small>입력 칸의 실제 내용</small></span>
          <span><code>maxlength</code><small>입력 가능한 최대 글자 수</small></span>
        </div>

        <ArticleHeading id="value" title="10. value의 역할" />
        <p>텍스트 입력에서는 처음 들어 있는 실제 값, 버튼에서는 화면에 표시되는 글자, 선택 요소에서는 선택 시 서버로 전송되는 값이 됩니다.</p>
        <SimpleCode code={'<!-- 텍스트 입력 -->\n<input type="text" name="userName" value="홍길동">\n<!-- 제출: userName=홍길동 -->\n\n<!-- 버튼 -->\n<input type="submit" value="가입하기">\n<input type="reset" value="다시 작성">\n\n<!-- 선택 요소 -->\n<input type="checkbox" name="hobby" value="music">\n<!-- 선택하면 제출: hobby=music -->'} />

        <FormChapterDivider id="chapter-special" number="05" title="특수·선택 입력" description="hidden, checkbox, radio와 초기 선택" />
        <ArticleHeading id="hidden-input" title={'11. 숨김 입력 type="hidden"'} />
        <p><code>&lt;input type=&quot;hidden&quot;&gt;</code>은 사용자에게 입력받을 필요는 없지만, 폼을 제출할 때 서버에 함께 보내야 하는 값을 담습니다.</p>
        <SimpleCode code={'<input type="hidden" name="productId" value="A100">'} />
        <p>화면에는 아무 입력 칸도 나타나지 않지만 폼을 제출하면 <code>productId=A100</code>이 함께 전송됩니다.</p>

        <h3 className="article-subheading">왜 사용하는가?</h3>
        <p>사용자는 상품의 수량만 입력하고, 어떤 상품인지 구분하는 ID는 시스템이 hidden 값으로 함께 전달할 수 있습니다.</p>
        <SimpleCode code={'<form action="/order" method="post">\n  <input\n    type="hidden"\n    name="productId"\n    value="A100">\n\n  <label for="quantity">수량</label>\n  <input\n    type="number"\n    id="quantity"\n    name="quantity"\n    value="1">\n\n  <button type="submit">주문하기</button>\n</form>'} />
        <HiddenInputPlayground />
        <div className="hidden-value-grid">
          <span><code>quantity=1</code><small>사용자가 직접 입력하는 정보</small></span>
          <span><code>productId=A100</code><small>시스템이 함께 전달하는 정보</small></span>
        </div>
        <p>서버는 <code>productId</code>를 보고 사용자가 어떤 상품을 주문했는지 구분할 수 있습니다.</p>

        <h3 className="article-subheading">주요 사용 사례</h3>
        <DocsTable
          headers={["사용 목적", "예시"]}
          rows={[
            ["상품 구분", <code key="product">productId=A100</code>],
            ["게시글 구분", <code key="post">postId=25</code>],
            ["회원 구분", <code key="user">userId=10</code>],
            ["작업 종류 구분", <code key="mode">mode=edit</code>],
            ["보안 검증용 토큰 전달", <code key="csrf">csrfToken=...</code>],
            ["이전 페이지 정보 전달", <code key="return">returnPage=cart</code>],
          ]}
        />

        <h3 className="article-subheading">hidden의 기본 형식</h3>
        <SimpleCode code={'<input\n  type="hidden"\n  name="서버에서 사용할 이름"\n  value="서버로 보낼 값">'} />
        <DocsTable
          headers={["속성", "역할"]}
          rows={[
            [<code key="type">type=&quot;hidden&quot;</code>, "화면에 보이지 않는 입력 요소로 지정"],
            [<code key="name">name</code>, "서버에서 값을 구분할 이름"],
            [<code key="value">value</code>, "실제로 서버에 전송할 값"],
          ]}
        />
        <Note title="name이 꼭 필요합니다">name이 없는 입력 요소는 일반적인 폼 제출 데이터에 포함되지 않습니다.</Note>
        <SimpleCode code={'<!-- 전송됨 -->\n<input type="hidden" name="productId" value="A100">\n\n<!-- name이 없으므로 일반적으로 전송되지 않음 -->\n<input type="hidden" value="A100">'} />

        <h3 className="article-subheading">중요한 주의점</h3>
        <p>hidden은 화면에만 보이지 않을 뿐, 비밀번호처럼 값을 안전하게 숨기는 기능이 아닙니다. 개발자 도구를 사용하면 누구나 값을 확인하거나 수정할 수 있습니다.</p>
        <SimpleCode code={'<input type="hidden" name="price" value="50000">'} />
        <DocsTable
          headers={["저장하면 안 되는 정보", "이유"]}
          rows={[
            ["비밀번호", "개발자 도구에서 확인 가능"],
            ["카드 번호", "안전하게 보호되지 않음"],
            ["실제 상품 가격", "사용자가 변경할 수 있음"],
            ["관리자 권한 여부", "사용자가 값을 조작할 수 있음"],
          ]}
        />
        <div className="summary-callout"><code>hidden</code>은 비밀 정보를 숨기는 기능이 아니라, 사용자에게 보여 줄 필요가 없는 값을 폼과 함께 서버로 전달하는 기능입니다.</div>

        <ArticleHeading id="choices" title="12. 체크박스와 라디오 버튼" />
        <DocsTable
          headers={["구분", "체크박스", "라디오 버튼"]}
          rows={[
            ["기본형", <code key="checkbox">type=&quot;checkbox&quot;</code>, <code key="radio">type=&quot;radio&quot;</code>],
            ["선택 개수", "여러 개 선택 가능", "같은 그룹에서 한 개만 선택"],
            ["사용 예", "취미, 관심 분야, 약관 동의", "배송 방법, 결제 방법"],
            ["모양", "네모", "동그라미"],
          ]}
        />
        <div className="code-stack two-columns">
          <SimpleCode code={'<!-- 체크박스: 여러 개 선택 -->\n<label>\n  <input type="checkbox" name="hobby" value="music">\n  음악\n</label>\n<label>\n  <input type="checkbox" name="hobby" value="movie">\n  영화\n</label>'} />
          <SimpleCode code={'<!-- 라디오: 같은 name에서 하나만 선택 -->\n<label>\n  <input type="radio" name="delivery" value="normal">\n  일반 배송\n</label>\n<label>\n  <input type="radio" name="delivery" value="quick">\n  빠른 배송\n</label>'} />
        </div>
        <Note title="name과 value">라디오 버튼에서 같은 name은 하나의 그룹을 뜻하고, value는 선택했을 때 서버로 전송되는 값입니다.</Note>

        <ArticleHeading id="checked" title="13. 처음부터 선택하기" />
        <p><code>checked</code>를 사용하면 라디오 버튼이나 체크박스를 처음부터 선택된 상태로 표시할 수 있습니다.</p>
        <SimpleCode code={'<input\n  type="radio"\n  name="delivery"\n  value="normal"\n  checked>\n\n<input\n  type="checkbox"\n  name="agree"\n  value="yes"\n  checked>'} />

        <FormChapterDivider id="chapter-example" number="06" title="전체 예제" description="배운 속성을 하나의 회원 가입 폼으로 연결" />
        <ArticleHeading id="full-example" title="14. 전체 예제" />
        <SimpleCode code={'<form action="/register" method="post" autocomplete="on">\n  <fieldset>\n    <legend>회원 정보</legend>\n\n    <p>\n      <label for="user-name">이름</label>\n      <input\n        type="text"\n        id="user-name"\n        name="userName"\n        size="10"\n        maxlength="5"\n        placeholder="이름 입력"\n        autofocus\n        required>\n    </p>\n\n    <p>\n      <label for="password">비밀번호</label>\n      <input\n        type="password"\n        id="password"\n        name="password"\n        maxlength="12"\n        required>\n    </p>\n  </fieldset>\n\n  <fieldset>\n    <legend>관심 분야</legend>\n\n    <label>\n      <input type="checkbox" name="hobby" value="html">\n      HTML\n    </label>\n\n    <label>\n      <input type="checkbox" name="hobby" value="css">\n      CSS\n    </label>\n  </fieldset>\n\n  <fieldset>\n    <legend>배송 방법</legend>\n\n    <label>\n      <input type="radio" name="delivery" value="normal" checked>\n      일반 배송\n    </label>\n\n    <label>\n      <input type="radio" name="delivery" value="quick">\n      빠른 배송\n    </label>\n  </fieldset>\n\n  <input type="submit" value="가입하기">\n  <input type="reset" value="다시 작성">\n</form>'} />
        <FormPlayground />

        <FormChapterDivider id="chapter-summary" number="07" title="핵심 요약" description="필요한 개념을 카드로 빠르게 다시 찾기" />
        <ArticleHeading id="summary" title="15. 최종 핵심 요약" />
        <DocsTable
          headers={["속성", "숫자·슬라이드에서 의미", "날짜·시간에서 의미"]}
          rows={[
            [<code key="min">min</code>, "선택할 수 있는 최솟값", "가장 빠른 날짜 또는 시간"],
            [<code key="max">max</code>, "선택할 수 있는 최댓값", "가장 늦은 날짜 또는 시간"],
            [<code key="step">step</code>, "값이 변경되는 간격", "날짜나 시간이 변경되는 간격"],
            [<code key="value">value</code>, "처음 표시되는 숫자", "처음 선택된 날짜 또는 시간"],
          ]}
        />
        <SimpleCode code={'<!-- 숫자 -->\n<input type="number" min="1" max="10" step="1" value="5">\n\n<!-- 슬라이드 막대 -->\n<input type="range" min="0" max="100" step="10" value="50">\n\n<!-- 날짜 -->\n<input type="date" min="2026-08-01" max="2026-08-31">\n\n<!-- 시간 -->\n<input type="time" min="09:00" max="18:00">'} />
        <div className="form-summary-grid">
          {[
            ["form", "입력 양식 전체", "what"],
            ["fieldset", "관련 입력 요소의 그룹", "fieldset-legend"],
            ["legend", "그룹의 제목", "fieldset-legend"],
            ["label", "입력 요소의 설명", "elements"],
            ["input", "실제 입력 또는 선택", "input-types"],
            ["type", "입력 형태", "input-types"],
            ["name", "서버로 보낼 항목 이름", "input-attributes"],
            ["value", "실제로 전달할 값", "value"],
            ["autofocus", "페이지가 열리면 자동 포커스", "autofocus"],
            ["placeholder", "입력 전 표시되는 안내 문구", "placeholder"],
            ["readonly", "값을 보여 주되 수정은 제한", "readonly"],
            ["required", "반드시 입력해야 하는 항목", "required"],
            ["hidden", "보이지 않는 값을 함께 전송", "hidden-input"],
            ["checkbox", "여러 개 선택", "choices"],
            ["radio", "같은 name에서 한 개", "choices"],
            ["checked", "처음부터 선택", "checked"],
            ["number", "숫자를 직접 입력", "number-input"],
            ["range", "막대로 숫자 선택", "range-input"],
            ["date / month / week", "날짜 단위 선택", "date-time-inputs"],
            ["time", "시간 선택", "date-time-inputs"],
            ["datetime-local", "날짜와 시간 선택", "date-time-inputs"],
            ["submit / reset", "전송 / 초기화", "full-example"],
          ].map(([term, meaning, target]) => (
            <a key={term} href={`#${target}`} aria-label={`${term} 설명으로 이동`}>
              <code>{term}</code><small>{meaning}</small><b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <ArticleHeading id="status" title="현재 기록 상태" />
      <div className="empty-document">
        <span>EMPTY PAGE</span>
        <h3>아직 작성된 본문이 없습니다.</h3>
        <p>Notion의 Form 페이지에는 제목만 있고 하위 내용이나 링크는 없었습니다. 기록을 누락하지 않기 위해 빈 문서 상태도 그대로 가져왔습니다.</p>
      </div>
      <ArticleHeading id="next" title="이어갈 내용" />
      <p>Form 학습은 현재 라이브러리의 <code>&lt;fieldset&gt;</code>과 <code>&lt;legend&gt;</code> 문서로 이어집니다.</p>
    </>
  );
}

function FormChapterNav() {
  const chapters = [
    ["01", "폼 기본 구조", "form·fieldset·autocomplete", "chapter-basics"],
    ["02", "입력 종류", "input type 한눈에 보기", "chapter-types"],
    ["03", "숫자·날짜", "number·range·date·time", "chapter-number-date"],
    ["04", "속성과 기본값", "autofocus·placeholder·required", "chapter-attributes"],
    ["05", "특수·선택 입력", "hidden·checkbox·radio", "chapter-special"],
    ["06", "전체 예제", "회원 가입 폼 실습", "full-example"],
    ["07", "핵심 요약", "태그 카드로 다시 찾기", "summary"],
  ];

  return (
    <nav className="form-chapter-nav" id="form-chapters" aria-label="Form 단락 바로가기">
      <div><span>QUICK INDEX</span><strong>Form 단락 찾아보기</strong></div>
      <div className="form-chapter-grid">
        {chapters.map(([number, title, description, target]) => (
          <a key={number} href={`#${target}`}>
            <b>{number}</b><span><strong>{title}</strong><small>{description}</small></span><i aria-hidden="true">↓</i>
          </a>
        ))}
      </div>
    </nav>
  );
}

function FormChapterDivider({ id, number, title, description }: { id: string; number: string; title: string; description: string }) {
  return (
    <div className="form-chapter-divider" id={id}>
      <span>CHAPTER {number}</span>
      <div><strong>{title}</strong><small>{description}</small></div>
      <a href="#form-chapters" aria-label="Form 단락 목차로 이동">↑</a>
    </div>
  );
}

function AutofocusPlayground() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="form-playground autofocus-playground" aria-labelledby="autofocus-playground-title">
      <div className="form-playground-heading">
        <span>LIVE EXAMPLE</span>
        <strong id="autofocus-playground-title">자동 포커스 효과 확인</strong>
      </div>
      <div className="autofocus-row">
        <label htmlFor="autofocus-demo-name">이름</label>
        <input ref={inputRef} id="autofocus-demo-name" type="text" placeholder="여기에 포커스됩니다" />
        <button type="button" onClick={() => inputRef.current?.focus()}>포커스 다시 적용</button>
      </div>
      <p className="form-result">실제 autofocus는 페이지가 열릴 때 한 번 동작합니다. 여기서는 페이지의 현재 위치를 방해하지 않도록 버튼으로 같은 효과를 재현합니다.</p>
    </section>
  );
}

function ReadonlyRequiredPlayground() {
  const [result, setResult] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setResult(`memberId=${data.get("memberId")} · userName=${data.get("userName")}`);
  };

  return (
    <section className="form-playground readonly-required-playground" aria-labelledby="readonly-required-title">
      <div className="form-playground-heading">
        <span>LIVE EXAMPLE</span>
        <strong id="readonly-required-title">readonly와 required 함께 확인</strong>
      </div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>회원 확인</legend>
          <label htmlFor="readonly-member-id">회원 번호</label>
          <input id="readonly-member-id" name="memberId" type="text" value="MEMBER-100" readOnly />
          <label htmlFor="required-user-name">이름</label>
          <input id="required-user-name" name="userName" type="text" placeholder="필수 입력" required />
        </fieldset>
        <div className="form-playground-actions"><button type="submit">제출 확인</button></div>
      </form>
      <p className="form-result" role="status">{result || "이름을 비운 채 제출해 required 동작을 확인하고, 회원 번호가 결과에 포함되는지도 확인해 보세요."}</p>
    </section>
  );
}

function FormPlayground() {
  const [result, setResult] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const hobbies = data.getAll("hobby").join(", ") || "선택 없음";
    const password = String(data.get("password") ?? "");
    setResult(`userName=${data.get("userName")} · password=${"•".repeat(password.length)} · hobby=${hobbies} · delivery=${data.get("delivery")}`);
  };

  return (
    <section className="form-playground" aria-labelledby="form-playground-title">
      <div className="form-playground-heading">
        <span>LIVE EXAMPLE</span>
        <strong id="form-playground-title">직접 입력해 보기</strong>
      </div>
      <form autoComplete="on" onSubmit={handleSubmit} onReset={() => setResult("")}>
        <fieldset>
          <legend>회원 정보</legend>
          <label htmlFor="demo-user-name">이름</label>
          <input id="demo-user-name" name="userName" type="text" maxLength={5} placeholder="이름 입력" autoComplete="name" required />
          <label htmlFor="demo-password">비밀번호</label>
          <input id="demo-password" name="password" type="password" maxLength={12} autoComplete="current-password" required />
        </fieldset>
        <fieldset className="choice-fieldset">
          <legend>관심 분야</legend>
          <label><input type="checkbox" name="hobby" value="html" /> HTML</label>
          <label><input type="checkbox" name="hobby" value="css" /> CSS</label>
        </fieldset>
        <fieldset className="choice-fieldset">
          <legend>배송 방법</legend>
          <label><input type="radio" name="delivery" value="normal" defaultChecked /> 일반 배송</label>
          <label><input type="radio" name="delivery" value="quick" /> 빠른 배송</label>
        </fieldset>
        <div className="form-playground-actions">
          <button type="submit">가입하기</button>
          <button type="reset">다시 작성</button>
        </div>
      </form>
      <p className="form-result" role="status">{result || "제출하면 name=value 형태의 결과가 여기에 표시됩니다."}</p>
    </section>
  );
}

function HiddenInputPlayground() {
  const [result, setResult] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setResult(`productId=${data.get("productId")} · quantity=${data.get("quantity")}`);
  };

  return (
    <section className="form-playground hidden-playground" aria-labelledby="hidden-playground-title">
      <div className="form-playground-heading">
        <span>LIVE EXAMPLE</span>
        <strong id="hidden-playground-title">hidden 값과 수량 함께 제출하기</strong>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="productId" value="A100" />
        <div className="hidden-order-row">
          <label htmlFor="hidden-demo-quantity">수량</label>
          <input id="hidden-demo-quantity" type="number" name="quantity" min="1" defaultValue="1" />
          <button type="submit">주문하기</button>
        </div>
      </form>
      <p className="form-result" role="status">{result || "주문하기를 누르면 화면에 없는 productId도 결과에 함께 표시됩니다."}</p>
    </section>
  );
}

function NumberDatePlayground() {
  const [numberValue, setNumberValue] = useState("5");
  const [rangeValue, setRangeValue] = useState("50");

  return (
    <section className="input-lab" aria-labelledby="input-lab-title">
      <div className="form-playground-heading">
        <span>LIVE EXAMPLE</span>
        <strong id="input-lab-title">숫자·범위·날짜 입력 직접 확인</strong>
      </div>
      <div className="input-lab-body">
        <div className="input-lab-row">
          <label htmlFor="lab-number"><code>number</code><small>1–10, 1씩 변경</small></label>
          <input id="lab-number" type="number" min="1" max="10" step="1" value={numberValue} onChange={(event) => setNumberValue(event.target.value)} />
          <output htmlFor="lab-number">{numberValue || "—"}</output>
        </div>
        <div className="input-lab-row">
          <label htmlFor="lab-range"><code>range</code><small>0–100, 10씩 이동</small></label>
          <input id="lab-range" type="range" min="0" max="100" step="10" value={rangeValue} onChange={(event) => setRangeValue(event.target.value)} />
          <output htmlFor="lab-range">{rangeValue}</output>
        </div>
        <div className="date-input-grid">
          <label htmlFor="lab-date"><span>date</span><input id="lab-date" type="date" min="2026-08-01" max="2026-08-31" defaultValue="2026-08-24" /></label>
          <label htmlFor="lab-month"><span>month</span><input id="lab-month" type="month" defaultValue="2026-08" /></label>
          <label htmlFor="lab-week"><span>week</span><input id="lab-week" type="week" defaultValue="2026-W35" /></label>
          <label htmlFor="lab-time"><span>time</span><input id="lab-time" type="time" min="09:00" max="18:00" step="1800" defaultValue="09:00" /></label>
          <label className="wide" htmlFor="lab-datetime"><span>datetime-local</span><input id="lab-datetime" type="datetime-local" min="2026-08-24T09:00" max="2026-08-24T18:00" defaultValue="2026-08-24T14:30" /></label>
        </div>
      </div>
    </section>
  );
}

function DocsTable({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="doc-table-wrap">
      <table className="doc-table">
        <thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
        <tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function SimpleCode({ code, language = "HTML" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  const source = (
    <div className="simple-code">
      <div><span>{language}</span><button onClick={async () => { await navigator.clipboard?.writeText(code); setCopied(true); window.setTimeout(() => setCopied(false), 1200); }}>{copied ? "복사됨" : "복사"}</button></div>
      <pre><code>{code}</code></pre>
    </div>
  );

  const runnable = language === "HTML" && /<(?:form|fieldset|label|input)\b/i.test(code);
  if (!runnable) return source;

  return (
    <section className="runnable-example">
      {source}
      <HtmlExamplePreview code={code} />
    </section>
  );
}

function HtmlExamplePreview({ code }: { code: string }) {
  const previewId = useId();
  const previewHeight = useMemo(() => {
    const fieldsetCount = code.match(/<fieldset\b/gi)?.length ?? 0;
    if (fieldsetCount >= 3) return 500;
    if (fieldsetCount === 1) return 250;
    const lineCount = code.split("\n").length;
    return Math.max(130, Math.min(300, 100 + Math.ceil(lineCount / 2) * 18));
  }, [code]);
  const document = useMemo(() => {
    const previewCode = code.replace(/\sautofocus\b/gi, "");
    return `<!doctype html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  * { box-sizing: border-box; }
  body { margin: 0; padding: 18px; background: #f8fafc; color: #20242b; font: 14px/1.55 -apple-system, BlinkMacSystemFont, "Noto Sans KR", sans-serif; }
  form { display: grid; gap: 14px; }
  fieldset { min-width: 0; margin: 0; padding: 15px; border: 1px solid #bac2cd; border-radius: 8px; display: grid; gap: 10px; }
  legend { padding: 0 6px; font-weight: 700; }
  p { margin: 0; }
  label { display: inline-flex; align-items: center; gap: 7px; margin-right: 14px; }
  input, button { font: inherit; }
  input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="submit"]):not([type="reset"]):not([type="button"]):not([type="image"]) { min-height: 38px; max-width: 100%; padding: 6px 10px; border: 1px solid #aeb7c3; border-radius: 6px; background: white; color: #20242b; }
  input[type="checkbox"], input[type="radio"], input[type="range"] { accent-color: #1488a1; }
  input[type="range"] { width: min(100%, 340px); }
  input[type="submit"], input[type="reset"], input[type="button"], button { min-height: 38px; margin: 4px 8px 0 0; padding: 0 14px; border: 1px solid #8793a1; border-radius: 7px; background: white; color: #20242b; cursor: pointer; }
  input[type="submit"], button[type="submit"] { border-color: #1488a1; background: #1488a1; color: white; }
</style>
</head>
<body>${previewCode}</body>
</html>`;
  }, [code]);

  return (
    <div className="html-example-preview">
      <div><span>실행 결과</span><small>아래 요소를 직접 입력하고 선택해 보세요.</small></div>
      <iframe
        title={`HTML 실행 예제 ${previewId}`}
        sandbox=""
        srcDoc={document}
        style={{ height: previewHeight }}
        loading="lazy"
      />
    </div>
  );
}

function DocsFrame({ children, toc }: { children: React.ReactNode; toc: Array<string | [string, string]> }) {
  return (
    <div className="docs-frame">
      <div className="content-column">{children}</div>
      <aside className="page-toc">
        <h4>이 페이지에서</h4>
        {toc.map((item) => {
          const label = Array.isArray(item) ? item[0] : item;
          const anchor = Array.isArray(item) ? item[1] : item.toLowerCase().replaceAll(" ", "-").replaceAll("?", "");
          return <a key={label} href={`#${anchor}`}>{label}</a>;
        })}
      </aside>
    </div>
  );
}

function ArticleHeading({ id, title }: { id: string; title: string }) {
  return <h2 id={id}>{title}<a href={`#${id}`} aria-label={`${title} 링크`}>#</a></h2>;
}

function InlineButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return <button className="inline-link" onClick={onClick}>{children}</button>;
}

function Note({ title, children }: { title: string; children: React.ReactNode }) {
  return <aside className="note"><span>i</span><div><strong>{title}</strong><p>{children}</p></div></aside>;
}

function CodeExample({ id }: { id: "fieldset" | "legend" }) {
  const lines = id === "fieldset"
    ? ['<fieldset>', '  <legend>알림을 받을 채널</legend>', '  <label><input type="checkbox" /> 이메일</label>', '  <label><input type="checkbox" /> 문자</label>', '</fieldset>']
    : ['<fieldset>', '  <legend>선호하는 연락 방법</legend>', '  <label><input type="radio" name="contact" /> 이메일</label>', '  <label><input type="radio" name="contact" /> 전화</label>', '</fieldset>'];
  const [copied, setCopied] = useState(false);
  return (
    <div className="code-example">
      <div><span>HTML</span><button onClick={async () => { await navigator.clipboard?.writeText(lines.join("\n")); setCopied(true); window.setTimeout(() => setCopied(false), 1200); }}>{copied ? "복사됨" : "복사"}</button></div>
      <pre>{lines.map((line, index) => <code key={line}><span>{index + 1}</span>{line}</code>)}</pre>
    </div>
  );
}

function LiveExample({ fieldset }: { fieldset: boolean }) {
  return (
    <div className="live-example">
      <p>결과</p>
      <fieldset>
        <legend>{fieldset ? "알림을 받을 채널" : "선호하는 연락 방법"}</legend>
        <label><input type={fieldset ? "checkbox" : "radio"} name="preview" /> 이메일</label>
        <label><input type={fieldset ? "checkbox" : "radio"} name="preview" /> {fieldset ? "문자" : "전화"}</label>
      </fieldset>
    </div>
  );
}

function NextPage({ label, onClick }: { label: string; onClick: () => void }) {
  return <button className="next-page" onClick={onClick}><span><small>다음</small><strong>{label}</strong></span><b>›</b></button>;
}
