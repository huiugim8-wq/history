import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outputPath = path.join(root, "public", "KIM_HEEJUN_RALLIT_RESUME.svg");

function imageDataUri(fileName) {
  const filePath = path.join(root, "public", fileName);
  const extension = path.extname(fileName).slice(1).toLowerCase();
  const mimeType = extension === "jpg" || extension === "jpeg" ? "image/jpeg" : "image/png";
  return `data:${mimeType};base64,${fs.readFileSync(filePath).toString("base64")}`;
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function text(x, y, value, className, attributes = "") {
  return `<text x="${x}" y="${y}" class="${className}" ${attributes}>${escapeXml(value)}</text>`;
}

function textLines(x, y, lines, className, lineHeight = 27) {
  return lines
    .map((line, index) => text(x, y + index * lineHeight, line, className))
    .join("\n");
}

function linkText(x, y, value, href, className = "link") {
  return `<a href="${escapeXml(href)}" target="_blank">${text(x, y, value, className)}</a>`;
}

function highlightedLinkText(x, y, segments, href) {
  const content = segments
    .map(({ value, accent = false }) =>
      `<tspan class="${accent ? "highlight-link-accent" : "highlight-link-copy"}">${escapeXml(value)}</tspan>`,
    )
    .join("");

  return `<a href="${escapeXml(href)}" target="_blank"><text x="${x}" y="${y}" class="highlight-title highlight-link" xml:space="preserve">${content}</text></a>`;
}

function tag(x, y, width, value) {
  return `
    <g class="tag" tabindex="0">
      <rect x="${x}" y="${y}" width="${width}" height="25" rx="4" class="tag-box"/>
      ${text(x + 9, y + 17, value, "tag-text")}
    </g>`;
}

function tagRow(y, tags) {
  let x = 387;
  return tags
    .map(([label, width]) => {
      const item = tag(x, y, width, label);
      x += width + 7;
      return item;
    })
    .join("\n");
}

const profileImage = imageDataUri("profile-id.png");
const jungleLogo = imageDataUri("jungle-by-krafton.png");
const notionUrl =
  "https://app.notion.com/p/3aa0463ff9f08065b16bd4cbbc87d321?source=copy_link";
const reactComponentsNotionUrl =
  "https://app.notion.com/p/React-3af0463ff9f080a3a00ce7a70d0bb221";
const typescriptAlgorithmNotionUrl =
  "https://app.notion.com/p/TypeScript-3af0463ff9f0808486bae010a67275f7";

const svg = `<svg xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  width="1190" height="3061" viewBox="0 0 1190 3061"
  role="img" aria-labelledby="resume-title resume-description">
  <title id="resume-title">김희준 프론트엔드 개발자 이력서</title>
  <desc id="resume-description">소통을 바탕으로 구현하는 프론트엔드 개발자 김희준의 자기소개와 경력</desc>

  <defs>
    <clipPath id="profile-photo-clip">
      <rect x="1003" y="28" width="112" height="149"/>
    </clipPath>
    <style>
      text {
        font-family: Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo",
          "Noto Sans KR", "Segoe UI", sans-serif;
        fill: #1f2328;
        text-rendering: geometricPrecision;
      }
      .eyebrow { fill: #1f2328; font-size: 22px; font-weight: 700; letter-spacing: -1px; }
      .name { font-size: 50px; font-weight: 800; letter-spacing: -3px; }
      .header-link { fill: #8a929d; font-size: 12px; font-weight: 650; }
      .section-label { font-size: 18px; font-weight: 800; letter-spacing: -.65px; }
      .intro-title { font-size: 26px; font-weight: 750; letter-spacing: -1px; }
      .intro-body { fill: #3f4752; font-size: 16px; font-weight: 500; letter-spacing: -.3px; }
      .company { font-size: 26px; font-weight: 800; letter-spacing: -1px; }
      .company-role { fill: #4a525d; font-size: 14px; font-weight: 600; }
      .period {
        fill: #687281;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: .7px;
      }
      .project-title { font-size: 21px; font-weight: 700; letter-spacing: -.8px; }
      .link { font-size: 16px; font-weight: 750; }
      .lead { fill: #2f363f; font-size: 17px; font-weight: 600; letter-spacing: -.35px; }
      .body { fill: #4a525d; font-size: 15px; font-weight: 400; letter-spacing: -.22px; }
      .body-strong { fill: #1f2937; font-size: 15px; font-weight: 700; letter-spacing: -.22px; }
      .number {
        fill: #687281;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 1px;
      }
      .highlight-title { font-size: 17px; font-weight: 700; letter-spacing: -.7px; }
      .highlight-link { fill: #1f2328; cursor: pointer; }
      .highlight-link-accent {
        fill: #008f5a;
        stroke: #e1f7ed;
        stroke-width: 7px;
        stroke-linejoin: round;
        paint-order: stroke fill;
        transition: fill 140ms ease, stroke 140ms ease;
      }
      .tag-box { fill: #f8f9fa; stroke: #cfd4da; stroke-width: 1; }
      .tag-text {
        fill: #4a525d;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 12px;
        font-weight: 650;
      }
      .tag { cursor: pointer; }
      .tag-box,
      .tag-text { transition: fill 140ms ease, stroke 140ms ease; }
      .tag:hover .tag-box,
      .tag:focus .tag-box { fill: #e7f8f0; stroke: #00c887; }
      .tag:hover .tag-text,
      .tag:focus .tag-text { fill: #008f5a; }
      .tag:active .tag-box { fill: #d8f5e9; stroke: #008f5a; }
      .tag:active .tag-text { fill: #007a4d; }
      a:hover .link,
      a:focus .link { fill: #1f2328; text-decoration: underline; }
      a:hover .highlight-link-accent,
      a:focus .highlight-link-accent {
        fill: #008f5a;
        stroke: #e1f7ed;
        text-decoration-line: underline;
        text-decoration-color: #00a86b;
        text-decoration-thickness: 2px;
        text-underline-offset: 4px;
      }
      .summary { fill: #4a525d; font-size: 15px; font-weight: 400; letter-spacing: -.22px; }
      .summary-strong { fill: #1f2328; font-size: 15px; font-weight: 700; letter-spacing: -.22px; }
      .contact-label { fill: #5c6470; font-size: 15px; }
      .contact-link { font-size: 17px; font-weight: 850; }
      .footer { fill: #8a929d; font-size: 12px; font-weight: 750; letter-spacing: 1px; }
      .rule { stroke: #e8ebef; stroke-width: 1; }
      .rule-strong { stroke: #d9dde3; stroke-width: 1; }
      .accent-rule { stroke: #d9dde3; stroke-width: 1; }
    </style>
  </defs>

  <rect width="1190" height="3061" fill="#ffffff"/>

  <g id="header">
    ${text(75, 50, "프론트엔드 개발자", "eyebrow")}
    ${text(75, 105, "김희준", "name")}
    ${linkText(75, 145, "Email", "mailto:huiugim8@gmail.com", "header-link")}
    ${linkText(126, 145, "Github", "https://github.com/huiugim8-wq", "header-link")}
    <image x="1003" y="28" width="112" height="149"
      preserveAspectRatio="xMidYMid slice"
      clip-path="url(#profile-photo-clip)"
      href="${profileImage}"/>
  </g>

  <g id="about">
    ${text(75, 240, "자기소개", "section-label")}
    ${text(311, 246, "소통을 바탕으로 구현하는 프론트엔드 개발자", "intro-title")}

    ${textLines(
      311,
      294,
      [
        "실내건축디자인을 전공하고 창업 과정에서 체험단을 운영하며 사용자의 피드백을 실행 가능한 형태로",
        "구체화해 왔고, 이 경험은 개발에서도 사용자의 문제를 기준으로 해결책을 찾는 태도로 이어졌습니다.",
      ],
      "intro-body",
      29,
    )}

    ${textLines(
      311,
      365,
      [
        "비전공자로서 7개월 만에 9천만 건의 주식 틱 이벤트를 처리하는 환경에서 React 조회 패널과",
        "TypeScript 차트 엔진을 구현했으며, 과거 데이터는 REST로, 최신 데이터는 WebSocket으로 반영하고",
        "정적·실시간 요소를 두 개의 Canvas로 분리해 필요한 부분만 다시 그리도록 설계했습니다.",
      ],
      "intro-body",
      29,
    )}

    ${text(
      311,
      463,
      "개발 영역을 프론트엔드에 한정하지 않고, 백엔드 구조까지 이해하며 원활하게 협업하는 개발자를 지향합니다.",
      "intro-body",
    )}
  </g>

  <g id="work-and-experience">
    ${text(75, 548, "Work & Experience", "section-label")}

    <g id="krafton-jungle">
      ${text(311, 550, "크래프톤 정글", "company")}
      ${text(311, 586, "12기 졸업", "company-role")}
      ${text(311, 616, "2026.03 — 2026.07", "period")}
      <image x="941" y="548" width="174" height="49"
        preserveAspectRatio="xMidYMid meet"
        href="${jungleLogo}"/>

      ${text(311, 679, "실시간 투자 정보 플랫폼", "project-title")}
      <line x1="311" y1="689" x2="521" y2="689" class="accent-rule"/>
      ${linkText(900, 677, "Github  ↗", "https://github.com/huiugim8-wq/gops-stock-trading-platform")}
      ${linkText(974, 677, "Notion  ↗", notionUrl)}
      ${linkText(1053, 677, "YouTube  ↗", "https://www.youtube.com/watch?v=8P4wiwDrvxs")}

      ${textLines(
        311,
        744,
        [
          "사용자가 시장을 탐색하고, 차트를 분석하고, 주문한 뒤 거래를 복기하는 과정을 하나의 작업 화면에서 수행할 수 있도록 만든",
          "AI 주식 트레이딩 플랫폼입니다.",
        ],
        "lead",
        29,
      )}
      ${textLines(
        311,
        806,
        [
          "인프라·프론트엔드·백엔드·AI 각 1명으로 구성된 4인 팀에서 프론트엔드를 담당했습니다. 담당 영역은 React 기반 UI와",
          "TypeScript 차트 엔진입니다.",
        ],
        "body",
        27,
      )}
      ${textLines(
        311,
        868,
        [
          "백엔드 데이터 파이프라인은 Kafka를 통해 24시간 기준 약 9천만 건의 시장 이벤트를 처리하며, 프로젝트는 Docker와",
          "Kubernetes 환경에서 배포·운영되었습니다.",
        ],
        "body",
        27,
      )}

      <g id="highlight-react-panels">
        <line x1="311" y1="939" x2="1115" y2="939" class="rule"/>
        ${text(311, 976, "01", "number")}
        ${highlightedLinkText(
          387,
          976,
          [
            { value: "공통 프레임과 기능 패널을 분리한 " },
            { value: "React 컴포넌트", accent: true },
            { value: " 설계  ↗" },
          ],
          reactComponentsNotionUrl,
        )}
        ${textLines(
          387,
          1018,
          [
            "사용자가 시장 탐색·차트 분석·주문·거래 복기에 필요한 패널을 선택·이동·크기 조절해 작업 화면을 구성할 수 있도록,",
            "43종의 패널이 공통 프레임을 재사용하게 설계했습니다.",
            "컴포넌트·최소 크기·기본 배치·우선순위를 TypeScript Registry 한곳에서 관리하고, Layout Agent 명령을 검증한 뒤",
            "등록된 패널로만 변환했습니다.",
          ],
          "body",
          27,
        )}
        ${tagRow(1136, [
          ["React", 54],
          ["TypeScript", 82],
          ["Component Composition", 161],
          ["Runtime Validation", 132],
          ["Agent-driven UI", 112],
        ])}
      </g>

      <g id="highlight-chart-engine">
        <line x1="311" y1="1178" x2="1115" y2="1178" class="rule"/>
        ${text(311, 1215, "02", "number")}
        ${highlightedLinkText(
          387,
          1215,
          [{ value: "REST API·WebSocket  ↗", accent: true }],
          notionUrl,
        )}
        ${text(574, 1215, "과", "highlight-title")}
        ${highlightedLinkText(
          595,
          1215,
          [{ value: "2-Layer Canvas를 적용한 주식차트  ↗", accent: true }],
          notionUrl,
        )}
        ${textLines(
          387,
          1257,
          [
            "기존 데이터 범위 밖의 누락 구간만 REST로 조회하고 이후 시장 이벤트는 WebSocket으로 반영해,",
            "전체 구간을 다시 요청하지 않고 실시간 차트를 유지했습니다.",
            "정적 차트와 포인터·가이드 UI를 2개의 Canvas로 분리해, 포인터 이동 시",
            "정적 차트의 재렌더링 없이 오버레이 Canvas만 갱신하도록 구현했습니다.",
          ],
          "body",
          27,
        )}
        ${tagRow(1375, [
          ["TypeScript CSR", 112],
          ["REST API", 72],
          ["WebSocket", 86],
          ["Canvas 2D", 81],
          ["requestAnimationFrame", 161],
        ])}
      </g>

      <g id="highlight-analysis-algorithm">
        <line x1="311" y1="1417" x2="1115" y2="1417" class="rule"/>
        ${text(311, 1454, "03", "number")}
        ${highlightedLinkText(
          387,
          1454,
          [
            { value: "피벗 군집·선형회귀로 지지·저항선을 생성한 " },
            { value: "TypeScript 알고리즘", accent: true },
            { value: "  ↗" },
          ],
          typescriptAlgorithmNotionUrl,
        )}
        ${textLines(
          387,
          1496,
          [
            "피벗 군집과 선형회귀로 후보선을 생성하고 접촉·가격 반응·오차·돌파를 평가해,",
            "기준을 통과한 후보만 차트에 표시했습니다.",
            "후보 생성과 검증을 분리해 동일한 데이터와 조건에서 같은 분석 결과를 재현하고, 선택된 선과 평가 근거를",
            "별도 차트 레이어에 표시해 사용자가 선정 이유를 확인할 수 있도록 구성했습니다.",
          ],
          "body",
          27,
        )}
        ${tagRow(1607, [
          ["TypeScript", 82],
          ["Data Structures", 112],
          ["Clustering", 83],
          ["Linear Regression", 128],
          ["Candidate Scoring", 128],
        ])}
        <line x1="311" y1="1629" x2="1115" y2="1629" class="rule"/>
      </g>

      <g id="pintos">
        ${text(311, 1694, "Pintos 시스템 콜 구현과 실행 흐름 추적", "highlight-title")}
        ${textLines(
          311,
          1736,
          [
            "Pintos에서 read·write·open·close 시스템 콜을 구현하고, 사용자 프로그램의 인자가 레지스터와 interrupt frame을",
            "거쳐 커널 함수로 전달되는 흐름을 추적했습니다.",
            "syscall-entry.S와 GDB로 사용자 모드에서 커널 모드로 전환되는 지점을 어셈블리와 레지스터 수준에서 확인하고,",
            "프론트엔드의 HTTP GET 요청이 백엔드의 소켓 I/O와 운영체제 시스템 콜로 이어지는 구조를 이해했습니다.",
          ],
          "body",
          27,
        )}
        ${tagRow(1854, [
          ["Pintos", 58],
          ["C", 30],
          ["System Call", 91],
          ["x86-64 Assembly", 126],
          ["GDB", 41],
        ])}
      </g>
    </g>

    <g id="nahyun">
      <line x1="311" y1="1930" x2="1115" y2="1930" class="rule"/>
      ${text(311, 1973, "㈜나현", "company")}
      ${text(311, 2008, "자동차 부품 제조", "company-role")}
      ${text(311, 2038, "2024 — 2025.08", "period")}
      ${text(311, 2090, "자동차 부품 제조 현장에서 생산 작업과 품질 기준 준수를 담당했습니다.", "summary")}
    </g>

    <g id="otos">
      <line x1="311" y1="2156" x2="1115" y2="2156" class="rule"/>
      ${text(311, 2199, "OTOS", "company")}
      ${text(311, 2234, "수건·목재 판매 창업", "company-role")}
      ${text(311, 2264, "2023 — 2024", "period")}
      ${text(311, 2314, "와디즈 스피마코튼 펀딩 1,206% 달성", "project-title")}
      ${linkText(1029, 2314, "와디즈 펀딩  ↗", "https://www.wadiz.kr/web/campaign/detail/198814")}
      ${textLines(
        311,
        2360,
        [
          "와디즈 펀딩과 쿠팡 목재 판매를 직접 기획·운영하며, ‘무엇을 팔까’보다 고객의 어떤 문제를 풀어야 하는지",
          "먼저 정의하고 시장 반응과 수익성으로 사업 가능성을 검증해 연 매출 약 1억 원을 달성했습니다.",
        ],
        "summary",
        27,
      )}
    </g>
  </g>

  <g id="education">
    <line x1="75" y1="2456" x2="1115" y2="2456" class="rule-strong"/>
    ${text(75, 2499, "Education", "section-label")}
    <g id="daegu-university">
      ${text(311, 2499, "대구대학교", "company")}
      ${text(311, 2534, "실내건축디자인학과", "company-role")}
      ${text(311, 2564, "2017.03 — 2023.08", "period")}
      ${textLines(
        311,
        2616,
        [
          "공간 설계와 시각적 구성 훈련을 통해 복잡한 정보를 구조화하고 명확하게 전달하는 기반을",
          "다졌습니다.",
        ],
        "summary",
        27,
      )}
    </g>
  </g>

  <g id="contact">
    <line x1="75" y1="2777" x2="1115" y2="2777" class="rule-strong"/>
    ${text(75, 2840, "함께 만들 이야기가 있다면 편하게 연락해 주세요.", "contact-label")}
    ${linkText(75, 2883, "huiugim8@gmail.com  ↗", "mailto:huiugim8@gmail.com", "contact-link")}
  </g>

  <g id="footer">
    <line x1="75" y1="2970" x2="1115" y2="2970" class="rule-strong"/>
    ${text(75, 3026, "© 2026 KIM HEEJUN", "footer")}
    ${linkText(1007, 3026, "Back to top ↑", "#header", "footer")}
  </g>
</svg>
`;

fs.writeFileSync(outputPath, svg, "utf8");
console.log(outputPath);
