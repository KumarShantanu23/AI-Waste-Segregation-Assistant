"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { WasteInput } from "@/components/WasteInput";
import { ResultSkeleton } from "@/components/ResultSkeleton";
import { ResultCard } from "@/components/ResultCard";
import { Footer } from "@/components/Footer";
import { ClassifyResponse, WasteClassificationResult } from "@/types/waste";

export default function Home() {
  const [wasteItem, setWasteItem] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<WasteClassificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = wasteItem.trim();
    if (!trimmed || trimmed.length < 2) {
      setError("Please provide a waste item description (at least 2 characters).");
      return;
    }

    if (trimmed.length > 150) {
      setError("Item description exceeds the maximum limit of 150 characters.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/classify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item: trimmed }),
      });

      const data: ClassifyResponse = await response.json();

      if (response.ok && data.success) {
        setResult(data.data);
        setError(null);
      } else {
        setError(
          !data.success && data.error
            ? data.error
            : "Could not classify the waste item. Please try again."
        );
      }
    } catch {
      setError(
        "Unable to connect to the classification service. Please check your internet connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (value: string) => {
    setWasteItem(value);
    if (error) {
      setError(null);
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
            isLoading={isLoading}
          />

          {/* Friendly Error Alert */}
          {error && (
            <div
              role="alert"
              aria-live="polite"
              className="mt-5 p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-800 flex items-start gap-3 shadow-sm"
            >
              <svg
                className="w-5 h-5 text-red-600 shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="font-semibold text-xs uppercase tracking-wider">Classification Notice</p>
                <p className="text-xs text-red-700 mt-0.5 leading-relaxed">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Result Area */}
        <section aria-label="Classification Output" className="w-full">
          {isLoading && <ResultSkeleton />}

          {!isLoading && result && <ResultCard result={result} />}

          {!isLoading && !result && !error && (
            <div className="border border-dashed border-slate-200 rounded-xl p-8 text-center text-xs text-slate-400">
              Enter an item above or click one of the quick examples to see the classification and disposal guidance.
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
