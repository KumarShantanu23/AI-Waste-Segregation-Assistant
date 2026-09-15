import React from "react";

export const SAMPLE_WASTE_ITEMS = [
  "Plastic water bottle",
  "Used tissue",
  "Pizza box with leftover food",
  "Old mobile phone",
  "Glass bottle",
] as const;

interface QuickExamplesProps {
  onSelect: (item: string) => void;
  selectedItem?: string;
}

export function QuickExamples({ onSelect, selectedItem }: QuickExamplesProps) {
  return (
    <div className="mt-4">
      <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
        Quick examples (click to try):
      </p>
      <div className="flex flex-wrap gap-2">
        {SAMPLE_WASTE_ITEMS.map((item) => {
          const isSelected = selectedItem?.toLowerCase() === item.toLowerCase();
          return (
            <button
              key={item}
              type="button"
              onClick={() => onSelect(item)}
              aria-label={`Select example: ${item}`}
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-colors border focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 ${
                isSelected
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}
