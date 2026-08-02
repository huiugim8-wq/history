"use client";

export default function PrintButton({ label = "PDF로 저장" }: { label?: string }) {
  return (
    <button
      className="print-button"
      type="button"
      onClick={() => window.print()}
    >
      {label}
    </button>
  );
}
