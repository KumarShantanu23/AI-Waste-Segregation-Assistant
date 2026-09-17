import React from "react";

export function Footer() {
  return (
    <footer className="mt-16 text-center text-xs text-slate-500 py-6 border-t border-slate-200/80">
      <div className="max-w-xl mx-auto space-y-2">
        <p className="font-medium text-slate-700">
          AI Waste Segregation Assistant &bull; Supporting UN SDG 12 (Target 12.5 &amp; 12.8)
        </p>
        <p className="text-slate-400 text-[11px] leading-relaxed">
          Educational sustainability tool. Local municipal recycling and compost regulations always supersede AI recommendations.
        </p>
      </div>
    </footer>
  );
}
