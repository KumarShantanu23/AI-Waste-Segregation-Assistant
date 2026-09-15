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
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <div className="flex justify-between items-baseline mb-1.5">
            <label
              htmlFor="waste-item-input"
              className="block text-sm font-semibold text-slate-800"
            >
              Describe your waste item
            </label>
            <span
              id="char-counter"
              className={`text-xs ${
                isTooLong
                  ? "text-red-600 font-bold"
                  : charCount > 130
                  ? "text-amber-600"
                  : "text-slate-400"
              }`}
            >
              {charCount} / {maxLength}
            </span>
          </div>

          <div className="relative">
            <input
              id="waste-item-input"
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              maxLength={maxLength + 10} // Allow typing a bit over to show limit warning gracefully
              placeholder="e.g. Plastic water bottle, pizza box with leftover food..."
              aria-describedby="char-counter input-hint"
              disabled={isLoading}
              className={`w-full px-4 py-3 pr-10 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 bg-white transition-all focus:outline-none focus:ring-2 ${
                isTooLong
                  ? "border-red-400 focus:ring-red-400 focus:border-red-400"
                  : "border-slate-300 focus:ring-emerald-500 focus:border-emerald-500"
              } shadow-sm`}
            />

            {value && !isLoading && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear input text"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded focus:outline-none focus:ring-1 focus:ring-slate-400"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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

          <p id="input-hint" className="text-xs text-slate-500 mt-1.5">
            Be specific (e.g., mention food stains, battery types, or composite materials) for best guidance.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
              !isValid || isLoading
                ? "bg-slate-300 cursor-not-allowed text-slate-500"
                : "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 cursor-pointer shadow hover:shadow-md"
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
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
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <span>Classify Waste</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>

      <QuickExamples onSelect={onChange} selectedItem={value} />
    </section>
  );
}
