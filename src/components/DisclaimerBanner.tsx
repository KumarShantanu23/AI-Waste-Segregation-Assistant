import React from "react";

interface DisclaimerBannerProps {
  className?: string;
}

export function DisclaimerBanner({ className = "" }: DisclaimerBannerProps) {
  return (
    <div
      role="note"
      aria-label="Local municipal regulation notice"
      className={`rounded-lg p-3.5 bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5 ${className}`}
    >
      <svg
        className="w-4 h-4 text-slate-500 shrink-0 mt-0.5"
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
      <p className="leading-relaxed">
        <span className="font-semibold text-slate-700">Municipal Notice:</span> Local waste and recycling guidelines differ by municipality. While this guidance reflects standard material processing rules, always verify specific item acceptance with your local waste utility.
      </p>
    </div>
  );
}
