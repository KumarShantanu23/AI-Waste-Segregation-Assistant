import React from "react";

export function Header() {
  return (
    <header className="text-center mb-8">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium mb-4 shadow-sm">
        <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
        <span>UN SDG 12: Responsible Consumption &amp; Production</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
        AI Waste Segregation Assistant
      </h1>

      <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
        Describe any household or everyday waste item to learn its correct bin category,
        practical disposal instructions, and sustainability tips.
      </p>
    </header>
  );
}
