import React from "react";

export function Header() {
  return (
    <header className="text-center space-y-4 pt-2 sm:pt-4">
      {/* SDG 12 Identity Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50/80 border border-emerald-200/80 text-emerald-800 text-xs font-semibold shadow-sm tracking-wide">
        <svg
          className="w-3.5 h-3.5 text-emerald-600 shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
            clipRule="evenodd"
          />
        </svg>
        <span>AI Waste Segregation Assistant &bull; UN SDG 12</span>
      </div>

      {/* Primary Headline */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
        Know where your waste belongs.
      </h1>

      {/* Concise Subhead */}
      <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
        Describe any household item or packaging to receive instant disposal instructions,
        contamination prevention guidance, and practical sustainability tips.
      </p>

      {/* Subtle Eco Value Pillars */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] font-medium text-slate-500">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100/80 border border-slate-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          Recycle Without Contamination
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100/80 border border-slate-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Divert Organics
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100/80 border border-slate-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          Handle Hazardous Safely
        </span>
      </div>
    </header>
  );
}
