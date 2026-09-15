import React from "react";

export function Footer() {
  return (
    <footer className="mt-16 text-center text-xs text-slate-500 py-6 border-t border-slate-200">
      <div className="max-w-xl mx-auto space-y-1.5">
        <p>
          <span className="font-semibold text-slate-700">AI Waste Segregation Assistant</span> &bull; Developed for UN SDG 12 Sustainability Initiative.
        </p>
        <p className="text-slate-400 text-[11px]">
          Educational internship project. Local municipal recycling and compost regulations always take precedence over AI guidance.
        </p>
      </div>
    </footer>
  );
}
