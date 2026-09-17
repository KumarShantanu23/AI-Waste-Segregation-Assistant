import React from "react";

interface DisclaimerBannerProps {
  className?: string;
}

export function DisclaimerBanner({ className = "" }: DisclaimerBannerProps) {
  return (
    <div
      role="note"
      aria-label="Local municipal regulation notice"
      className={`rounded-xl p-4 bg-slate-50/80 border border-slate-200/80 text-xs text-slate-600 flex items-start gap-3 ${className}`}
    >
      <svg
        className="w-4 h-4 text-slate-400 shrink-0 mt-0.5"
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
        <span className="font-bold text-slate-700">Municipal Guidance Note:</span> Waste management and recycling capabilities vary across local jurisdictions. This assistant provides standardized material segregation guidance; always follow local municipal regulations for specific item acceptance and hazardous disposal events.
      </p>
    </div>
  );
}
