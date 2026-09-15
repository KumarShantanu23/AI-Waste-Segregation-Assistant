"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { WasteInput } from "@/components/WasteInput";
import { ResultSkeleton } from "@/components/ResultSkeleton";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [wasteItem, setWasteItem] = useState<string>("");
  const [showSkeletonPreview, setShowSkeletonPreview] = useState<boolean>(false);
  const [phase3Notice, setPhase3Notice] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wasteItem.trim()) return;

    // Phase 3 constraint: Do NOT call the API or classification logic yet.
    // Provide visual confirmation that the input was captured successfully.
    setPhase3Notice(
      `Captured: "${wasteItem.trim()}". (Phase 3 UI verified. API classification is scheduled for Phase 4).`
    );
  };

  const handleInputChange = (value: string) => {
    setWasteItem(value);
    if (phase3Notice) {
      setPhase3Notice(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between px-4 py-8 sm:py-12 max-w-3xl mx-auto">
      <main className="w-full space-y-8">
        {/* Header / Hero */}
        <Header />

        {/* Core Input Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <WasteInput
            value={wasteItem}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            maxLength={150}
            isLoading={false}
          />

          {/* Feedback notice for Phase 3 button click */}
          {phase3Notice && (
            <div
              role="status"
              className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2"
            >
              <svg
                className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{phase3Notice}</span>
            </div>
          )}
        </div>

        {/* Skeleton Preview Section */}
        <section aria-label="Loading and Result Layout Preview" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Result Component Preview (Phase 4/5 Integration Target)
            </h2>
            <button
              type="button"
              onClick={() => setShowSkeletonPreview((prev) => !prev)}
              className="text-xs font-medium text-emerald-700 hover:text-emerald-800 underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
            >
              {showSkeletonPreview ? "Hide Skeleton" : "Preview Loading Skeleton"}
            </button>
          </div>

          {showSkeletonPreview ? (
            <ResultSkeleton />
          ) : (
            <div className="border border-dashed border-slate-200 rounded-xl p-6 text-center text-xs text-slate-400">
              Click &ldquo;Preview Loading Skeleton&rdquo; to inspect the animated placeholder designed for classification results.
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
