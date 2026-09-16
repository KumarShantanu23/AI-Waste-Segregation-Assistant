import React from "react";
import { WasteCategory, WasteClassificationResult } from "@/types/waste";
import { DisclaimerBanner } from "./DisclaimerBanner";

interface ResultCardProps {
  result: WasteClassificationResult;
}

interface CategoryConfig {
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  cardBorder: string;
  icon: React.ReactNode;
}

const CATEGORY_CONFIGS: Record<WasteCategory, CategoryConfig> = {
  "Recyclable": {
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-700",
    badgeBorder: "border-blue-200",
    cardBorder: "border-blue-200",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
  },
  "Organic / Compostable": {
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    badgeBorder: "border-emerald-200",
    cardBorder: "border-emerald-200",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
  },
  "Hazardous / E-Waste": {
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-800",
    badgeBorder: "border-amber-200",
    cardBorder: "border-amber-200",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
  },
  "Landfill / General Waste": {
    badgeBg: "bg-slate-100",
    badgeText: "text-slate-700",
    badgeBorder: "border-slate-300",
    cardBorder: "border-slate-300",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    ),
  },
};

export function ResultCard({ result }: ResultCardProps) {
  const config = CATEGORY_CONFIGS[result.category] || CATEGORY_CONFIGS["Landfill / General Waste"];

  return (
    <article
      aria-label={`Classification result for ${result.item}`}
      className={`w-full bg-white rounded-xl border ${config.cardBorder} shadow-sm p-6 sm:p-8 space-y-6 transition-all`}
    >
      {/* Top Bar: Item Name, Category Badge & Source Transparency */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Item Classified
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 capitalize">
            {result.item}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Category Badge */}
          <div
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border ${config.badgeBg} ${config.badgeText} ${config.badgeBorder}`}
          >
            {config.icon}
            <span>{result.category}</span>
          </div>

          {/* Source Transparency Badge */}
          <span
            className={`text-[11px] font-medium px-2 py-0.5 rounded border ${
              result.source === "gemini"
                ? "bg-purple-50 text-purple-700 border-purple-200"
                : "bg-slate-50 text-slate-600 border-slate-200"
            }`}
            title={
              result.source === "gemini"
                ? "Classified dynamically via Google Gemini Flash"
                : "Classified via deterministic local guideline rules"
            }
          >
            {result.source === "gemini" ? "AI Verified" : "Standard Rule"}
          </span>
        </div>
      </div>

      {/* Uncertainty Advisory (only rendered when present) */}
      {result.uncertainty_note && result.uncertainty_note.trim() && (
        <div
          role="alert"
          aria-label="Classification advisory note"
          className="p-3.5 rounded-lg bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5"
        >
          <svg
            className="w-4 h-4 text-amber-600 shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <span className="font-semibold block mb-0.5">Note on Material &amp; Local Variance:</span>
            <p className="leading-relaxed">{result.uncertainty_note}</p>
          </div>
        </div>
      )}

      {/* Section 1: Recommended Disposal Method */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
          <svg
            className="w-4 h-4 text-emerald-600 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
          <h3>Recommended Disposal Method</h3>
        </div>
        <p className="text-sm text-slate-700 pl-6 leading-relaxed">
          {result.disposal_method}
        </p>
      </div>

      {/* Section 2: Why This Category (Material Reasoning) */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
          <svg
            className="w-4 h-4 text-blue-600 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3>Why It Belongs in This Category</h3>
        </div>
        <p className="text-sm text-slate-600 pl-6 leading-relaxed">
          {result.explanation}
        </p>
      </div>

      {/* Section 3: Sustainability Tip */}
      <div className="p-4 rounded-lg bg-emerald-50/60 border border-emerald-100 space-y-1">
        <div className="flex items-center gap-2 text-emerald-900 font-semibold text-xs uppercase tracking-wider">
          <svg
            className="w-4 h-4 text-emerald-600 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <span>Sustainability &amp; Reduction Tip</span>
        </div>
        <p className="text-xs sm:text-sm text-emerald-950 pl-6 leading-relaxed">
          {result.sustainability_tip}
        </p>
      </div>

      {/* Section 4: Responsible AI Municipal Disclaimer */}
      <DisclaimerBanner className="mt-4" />
    </article>
  );
}
