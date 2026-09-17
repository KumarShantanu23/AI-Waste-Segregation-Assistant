import React from "react";
import { QuickExamples } from "./QuickExamples";

interface WasteInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  maxLength?: number;
  isLoading?: boolean;
}

export function WasteInput({
  value,
  onChange,
  onSubmit,
  maxLength = 150,
  isLoading = false,
}: WasteInputProps) {
  const charCount = value.length;
  const isTooLong = charCount > maxLength;
  const isValid = charCount >= 2 && !isTooLong;

  const handleClear = () => {
    onChange("");
  };

  return (
    <section aria-label="Waste Item Input Section" className="w-full">
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor="waste-item-input"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-800"
            >
              <svg
                className="w-4 h-4 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span>Describe your waste item</span>
            </label>
            <span
              id="char-counter"
              aria-live="polite"
              className={`text-xs font-medium tabular-nums transition-colors ${
                isTooLong
                  ? "text-red-600 font-bold"
                  : charCount > 130
                  ? "text-amber-600 font-semibold"
                  : "text-slate-400"
              }`}
            >
              {charCount} / {maxLength}
            </span>
          </div>

          <div className="relative group">
            <input
              id="waste-item-input"
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              maxLength={maxLength + 10} // Allow typing slightly over to show red limit warning gracefully
              placeholder="e.g. Plastic water bottle, pizza box with food, old mobile phone..."
              aria-describedby="char-counter input-hint"
              disabled={isLoading}
              className={`w-full px-4 py-3.5 pr-11 rounded-xl border text-sm sm:text-base text-slate-900 placeholder:text-slate-400 bg-slate-50/60 hover:bg-white focus:bg-white transition-all shadow-xs focus:outline-none focus-visible:ring-2 ${
                isTooLong
                  ? "border-red-400 focus-visible:ring-red-400/30 focus-visible:border-red-500"
                  : "border-slate-300/90 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-600"
              }`}
            />

            {value && !isLoading && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear input text"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          <p id="input-hint" className="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 text-slate-400 shrink-0"
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
            <span>Mention specific details like food grease, battery chemistry, or material condition for the most accurate guidance.</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-xl text-sm font-semibold text-white transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500 ${
              !isValid || isLoading
                ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                : "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 cursor-pointer shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0"
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-1 h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                <span>Analyzing Waste Item...</span>
              </>
            ) : (
              <>
                <span>Classify Waste</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>

      <QuickExamples onSelect={onChange} selectedItem={value} disabled={isLoading} />
    </section>
  );
}
