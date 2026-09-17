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
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow transition-shadow p-6 sm:p-8">
          <WasteInput
            value={wasteItem}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            maxLength={150}
            isLoading={isLoading}
          />

          {/* Friendly, Accessible Error Alert */}
          {error && (
            <div
              role="alert"
              aria-live="polite"
              className="mt-5 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-900 flex items-start gap-3 shadow-2xs"
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
                <p className="font-bold text-xs uppercase tracking-wider text-red-800">Notice</p>
                <p className="text-xs sm:text-sm text-red-700 mt-0.5 leading-relaxed">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Result Area */}
        <section aria-label="Classification Output" className="w-full">
          {isLoading && <ResultSkeleton />}

          {!isLoading && result && <ResultCard result={result} />}

          {!isLoading && !result && !error && (
            <div className="bg-white/80 backdrop-blur-xs rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs space-y-6">
              <div className="text-center max-w-md mx-auto space-y-1">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  How It Works
                </span>
                <h3 className="text-lg font-bold text-slate-800">
                  Three Simple Steps to Segregate Responsibly
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Proper waste sorting keeps recyclable materials clean, diverts organic matter from landfills, and shields sanitation workers from hazards.
                </p>
              </div>

              {/* 3-Step Process */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100 space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                    1
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">Describe Item</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Type any everyday item, food package, container, or electronic device.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100 space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                    2
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">AI / Rule Sorting</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Get categorized into one of 4 standardized streams with contamination awareness.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100 space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                    3
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">Dispose Safely</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Follow step-by-step instructions and practical tips to minimize waste generation.
                  </p>
                </div>
              </div>

              {/* 4 Waste Streams Quick Legend */}
              <div className="pt-3 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 text-center sm:text-left">
                  The Four Waste Streams:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-3 rounded-lg bg-blue-50/60 border border-blue-100 text-left">
                    <span className="block font-bold text-xs text-blue-800">Recyclable</span>
                    <span className="text-[11px] text-blue-700/80 leading-snug">Bottles, clean paper, cans</span>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-100 text-left">
                    <span className="block font-bold text-xs text-emerald-800">Organic</span>
                    <span className="text-[11px] text-emerald-700/80 leading-snug">Food scraps, greasy boxes</span>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-100 text-left">
                    <span className="block font-bold text-xs text-amber-900">Hazardous</span>
                    <span className="text-[11px] text-amber-800/80 leading-snug">Batteries, e-waste, sharps</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-100/70 border border-slate-200 text-left">
                    <span className="block font-bold text-xs text-slate-800">Landfill</span>
                    <span className="text-[11px] text-slate-600 leading-snug">Soiled wipes, broken glass</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
