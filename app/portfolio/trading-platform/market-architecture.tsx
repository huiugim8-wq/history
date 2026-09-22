export default function MarketArchitecture() {
  return (
    <svg className="trading-architecture-svg" viewBox="0 0 840 318" role="img" aria-labelledby="market-architecture-title market-architecture-desc">
      <title id="market-architecture-title">실시간 파이프라인의 데이터 전달 경로</title>
      <desc id="market-architecture-desc">외부 WebSocket에서 받은 이벤트를 Kafka 입력 토픽에 기록합니다. Market Processor가 가공한 실시간 상태는 Redis와 WebSocket을 통해 차트에 전달하고, 마감 봉과 이벤트는 별도 토픽으로 전달해 ClickHouse 저장, S3 기록과 AI 분석 Consumer가 독립적으로 처리합니다.</desc>
      <defs><marker id="market-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 7 3.5 0 7" fill="#8994a3" /></marker></defs>
      <g transform="translate(42 15.9) scale(0.9)">
        <rect x="154" y="30" width="675" height="272" rx="4" fill="#fbfcfd" stroke="#d6dce3" strokeDasharray="4 4" />
        <text x="174" y="52" className="diagram-eyebrow">AWS EKS · 독립 워크로드</text>
        <g fill="none" stroke="#8994a3" strokeWidth="1.5" markerEnd="url(#market-arrow)">
          <path d="M131 114H179" /><path d="M307 114H346" /><path d="M505 114H548" /><path d="M650 114H689" />
          <path d="M426 144V190" /><path d="M505 226H553" /><path d="M505 226H528V280H553" /><path d="M505 226H528V180H553" />
        </g>
        <g className="diagram-node">
          <rect x="8" y="83" width="123" height="62" rx="3" fill="#f1f3f5" stroke="#d6dce3" />
          <text x="69.5" y="109">외부 WebSocket</text><text x="69.5" y="128" className="diagram-caption">체결 · 호가 · 봉</text>
          <rect x="180" y="83" width="127" height="62" rx="3" fill="#252b33" />
          <text x="243.5" y="109" fill="white">Kafka 입력</text><text x="243.5" y="128" fill="#d6dce3" className="diagram-caption">이벤트 기록 · 분산</text>
          <rect x="347" y="83" width="158" height="62" rx="3" fill="white" stroke="#2997ff" />
          <text x="426" y="109">Market Processor</text><text x="426" y="128" className="diagram-caption">정규화 · 봉 가공</text>
          <rect x="549" y="83" width="101" height="62" rx="3" fill="white" stroke="#d6dce3" />
          <text x="599.5" y="109">Redis</text><text x="599.5" y="128" className="diagram-caption">실시간 상태</text>
          <rect x="690" y="83" width="121" height="62" rx="3" fill="white" stroke="#2997ff" />
          <text x="750.5" y="109">차트 화면</text><text x="750.5" y="128" className="diagram-caption">WebSocket 갱신</text>
          <rect x="347" y="191" width="158" height="70" rx="3" fill="#252b33" />
          <text x="426" y="216" fill="white">Kafka 가공 토픽</text><text x="426" y="238" fill="#d6dce3" className="diagram-caption">마감 봉 · 체결 · 호가 · 이벤트</text>
          <rect x="554" y="161" width="257" height="37" rx="3" fill="white" stroke="#d6dce3" /><text x="682.5" y="184">ClickHouse · 틱 / 과거 데이터 조회</text>
          <rect x="554" y="207" width="257" height="37" rx="3" fill="white" stroke="#d6dce3" /><text x="682.5" y="230">S3 · 마감 봉 / 이벤트 기록</text>
          <rect x="554" y="261" width="257" height="37" rx="3" fill="white" stroke="#d6dce3" /><text x="682.5" y="284">분석 Consumer · 시장 이벤트 감지</text>
        </g>
        <text x="187" y="244" className="diagram-caption">그룹별 처리 위치 분리</text>
        <text x="187" y="264" className="diagram-caption">저장과 분석의 독립 실행</text>
      </g>
    </svg>
  );
}
