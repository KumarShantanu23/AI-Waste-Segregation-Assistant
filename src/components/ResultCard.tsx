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
  actionBg: string;
  actionBorder: string;
  actionText: string;
  accentBar: string;
  icon: React.ReactNode;
}

const CATEGORY_CONFIGS: Record<WasteCategory, CategoryConfig> = {
  "Recyclable": {
    badgeBg: "bg-blue-50 text-blue-800 border-blue-200",
    badgeText: "text-blue-800",
    badgeBorder: "border-blue-200",
    cardBorder: "border-blue-200/90",
    actionBg: "bg-blue-50/50",
    actionBorder: "border-blue-100",
    actionText: "text-blue-900",
    accentBar: "bg-blue-500",
    icon: (
      <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
    badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
    badgeText: "text-emerald-800",
    badgeBorder: "border-emerald-200",
    cardBorder: "border-emerald-200/90",
    actionBg: "bg-emerald-50/40",
    actionBorder: "border-emerald-100",
    actionText: "text-emerald-900",
    accentBar: "bg-emerald-500",
    icon: (
      <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
    badgeBg: "bg-amber-50 text-amber-900 border-amber-200",
    badgeText: "text-amber-900",
    badgeBorder: "border-amber-200",
    cardBorder: "border-amber-300/90",
    actionBg: "bg-amber-50/50",
    actionBorder: "border-amber-200",
    actionText: "text-amber-950",
    accentBar: "bg-amber-500",
    icon: (
      <svg className="w-4 h-4 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
    badgeBg: "bg-slate-100 text-slate-800 border-slate-300",
    badgeText: "text-slate-800",
    badgeBorder: "border-slate-300",
    cardBorder: "border-slate-300/90",
    actionBg: "bg-slate-50/70",
    actionBorder: "border-slate-200",
    actionText: "text-slate-900",
    accentBar: "bg-slate-500",
    icon: (
      <svg className="w-4 h-4 text-slate-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
  const isUncertain = result.uncertainty_note?.toLowerCase().includes("uncertain");

  return (
    <article
      aria-label={`Classification result for ${result.item}`}
      className={`w-full bg-white rounded-2xl border ${config.cardBorder} shadow-sm p-6 sm:p-8 space-y-6 transition-all relative overflow-hidden`}
    >
      {/* Visual Category Accent Top Edge */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 ${config.accentBar}`} aria-hidden="true" />

      {/* Top Bar: Item Name, Category Badge & Source Transparency */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Item Classified
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 capitalize tracking-tight">
            {result.item}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Category Badge (Icon + Text + High Contrast Border) */}
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border shadow-2xs ${config.badgeBg}`}
          >
            {config.icon}
            <span>{result.category}</span>
          </div>

          {/* Honest Source Transparency Badge */}
          <span
            className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border flex items-center gap-1.5 ${
              result.source === "gemini"
                ? "bg-purple-50 text-purple-700 border-purple-200"
                : "bg-slate-100 text-slate-700 border-slate-200"
            }`}
            title={
              result.source === "gemini"
                ? "Dynamically categorized via Google Gemini"
                : "Categorized using local deterministic rule engine"
            }
          >
            {result.source === "gemini" ? (
              <>
                <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zm0 13a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zm8-5a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10z" />
                </svg>
                <span>AI Verified</span>
              </>
            ) : (
              <>
                <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Standard Rule</span>
              </>
            )}
          </span>
        </div>
      </div>

      {/* Uncertainty & Safety Advisory (Prominently rendered when applicable) */}
      {result.uncertainty_note && result.uncertainty_note.trim() && (
        <div
          role="alert"
          aria-label="Classification advisory notice"
          className={`p-4 rounded-xl border text-xs sm:text-sm flex items-start gap-3 shadow-2xs ${
            isUncertain
              ? "bg-amber-50/90 border-amber-300 text-amber-950"
              : "bg-slate-50 border-slate-200 text-slate-800"
          }`}
        >
          <svg
            className={`w-5 h-5 shrink-0 mt-0.5 ${isUncertain ? "text-amber-600" : "text-slate-500"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div>
            <span className="font-bold block mb-1 uppercase tracking-wider text-xs">
              {isUncertain ? "Classification Notice:" : "Material & Local Variation Note:"}
            </span>
            <p className="leading-relaxed">{result.uncertainty_note}</p>
          </div>
        </div>
      )}

      {/* Primary Section: Recommended Disposal Method (Most Actionable Centerpiece) */}
      <div className={`p-5 sm:p-6 rounded-xl border ${config.actionBorder} ${config.actionBg} space-y-2`}>
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm sm:text-base">
          <svg
            className="w-5 h-5 text-emerald-600 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3>Recommended Disposal Method</h3>
        </div>
        <p className="text-sm sm:text-base text-slate-800 pl-7 leading-relaxed font-medium">
          {result.disposal_method}
        </p>
      </div>

      {/* Secondary Section: Why It Belongs in This Category (Material Reasoning) */}
      <div className="space-y-2 pt-1">
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
        <p className="text-xs sm:text-sm text-slate-600 pl-6 leading-relaxed">
          {result.explanation}
        </p>
      </div>

      {/* Tertiary Section: Sustainability & Reduction Tip */}
      <div className="p-4 sm:p-4.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-1.5 shadow-2xs">
        <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
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

      {/* Responsible AI Municipal Disclaimer */}
      <DisclaimerBanner className="mt-4" />
    </article>
  );
}
