"use client";

import { useState } from "react";

type SelectableTagsProps = {
  ariaLabel: string;
  labels: string[];
};

export default function SelectableTags({
  ariaLabel,
  labels,
}: SelectableTagsProps) {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  function toggleLabel(label: string) {
    setSelectedLabels((currentLabels) =>
      currentLabels.includes(label)
        ? currentLabels.filter((currentLabel) => currentLabel !== label)
        : [...currentLabels, label],
    );
  }

  return (
    <div className="highlight-tags" aria-label={ariaLabel}>
      {labels.map((label) => {
        const isSelected = selectedLabels.includes(label);

        return (
          <button
            type="button"
            className="highlight-tag"
            aria-pressed={isSelected}
            key={label}
            onClick={() => toggleLabel(label)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
