import React from "react";

export const SAMPLE_WASTE_ITEMS = [
  { label: "Plastic water bottle", dot: "bg-blue-500" },
  { label: "Used tissue", dot: "bg-slate-400" },
  { label: "Pizza box with leftover food", dot: "bg-emerald-500" },
  { label: "Old mobile phone", dot: "bg-amber-500" },
  { label: "Glass bottle", dot: "bg-blue-500" },
] as const;

interface QuickExamplesProps {
  onSelect: (item: string) => void;
  selectedItem?: string;
  disabled?: boolean;
}

export function QuickExamples({ onSelect, selectedItem, disabled = false }: QuickExamplesProps) {
  return (
    <div className="pt-3 border-t border-slate-100 mt-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Quick Examples (click to test):
        </p>
        <span className="text-[11px] text-slate-400 hidden sm:inline">
          5 standard items
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {SAMPLE_WASTE_ITEMS.map(({ label, dot }) => {
          const isSelected = selectedItem?.toLowerCase() === label.toLowerCase();
          return (
            <button
              key={label}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(label)}
              aria-label={`Select example: ${label}`}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all border focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-1 disabled:opacity-60 disabled:cursor-not-allowed ${
                isSelected
                  ? "bg-emerald-50 text-emerald-900 border-emerald-300 font-semibold shadow-xs"
                  : "bg-slate-50/80 text-slate-700 border-slate-200 hover:bg-white hover:border-slate-300 hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${dot} shrink-0`} aria-hidden="true" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
