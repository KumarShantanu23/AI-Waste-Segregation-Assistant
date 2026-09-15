import React from "react";

interface ResultSkeletonProps {
  className?: string;
}

export function ResultSkeleton({ className = "" }: ResultSkeletonProps) {
  return (
    <div
      aria-label="Loading waste classification result"
      aria-busy="true"
      className={`w-full bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6 animate-pulse ${className}`}
    >
      {/* Top Bar: Item Name & Category Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="space-y-2">
          <div className="h-3 w-20 bg-slate-200 rounded" />
          <div className="h-6 w-48 bg-slate-300 rounded" />
        </div>
        <div className="h-8 w-36 bg-slate-200 rounded-full" />
      </div>

      {/* Disposal Method Skeleton */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-slate-300 rounded-full" />
          <div className="h-4 w-40 bg-slate-300 rounded" />
        </div>
        <div className="space-y-1.5 pl-6">
          <div className="h-3.5 w-full bg-slate-200 rounded" />
          <div className="h-3.5 w-5/6 bg-slate-200 rounded" />
        </div>
      </div>

      {/* Explanation Skeleton */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-slate-300 rounded-full" />
          <div className="h-4 w-32 bg-slate-300 rounded" />
        </div>
        <div className="space-y-1.5 pl-6">
          <div className="h-3.5 w-full bg-slate-200 rounded" />
          <div className="h-3.5 w-4/6 bg-slate-200 rounded" />
        </div>
      </div>

      {/* Sustainability Tip Skeleton */}
      <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-emerald-200 rounded-full" />
          <div className="h-3.5 w-28 bg-emerald-200 rounded" />
        </div>
        <div className="h-3.5 w-11/12 bg-slate-200 rounded" />
      </div>

      {/* Municipal Disclaimer Skeleton */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <div className="h-3 w-64 bg-slate-200 rounded" />
        <div className="h-3 w-16 bg-slate-200 rounded" />
      </div>
    </div>
  );
}
