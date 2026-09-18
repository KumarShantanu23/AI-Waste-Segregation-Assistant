import React from "react";

interface ResultSkeletonProps {
  className?: string;
}

export function ResultSkeleton({ className = "" }: ResultSkeletonProps) {
  return (
    <div
      aria-label="Loading waste classification result"
      aria-busy="true"
      role="status"
      className={`w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6 animate-pulse motion-reduce:animate-none ${className}`}
    >
      {/* Visual Status Header */}
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 text-xs font-semibold text-slate-500">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
        <span>Analyzing waste material &amp; sorting rules...</span>
      </div>

      {/* Top Bar: Item Name & Category Badge Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="space-y-2">
          <div className="h-3 w-24 bg-slate-200 rounded" />
          <div className="h-7 w-52 bg-slate-300 rounded-lg" />
        </div>
        <div>
          <div className="h-8 w-32 bg-slate-200 rounded-full" />
        </div>
      </div>

      {/* Disposal Method Action Callout Skeleton */}
      <div className="p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-slate-300 rounded-full" />
          <div className="h-4 w-48 bg-slate-300 rounded" />
        </div>
        <div className="space-y-2 pl-7">
          <div className="h-3.5 w-full bg-slate-200 rounded" />
          <div className="h-3.5 w-4/5 bg-slate-200 rounded" />
        </div>
      </div>

      {/* Explanation Skeleton */}
      <div className="space-y-2 pl-1">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-slate-300 rounded-full" />
          <div className="h-3.5 w-40 bg-slate-300 rounded" />
        </div>
        <div className="space-y-1.5 pl-6">
          <div className="h-3 w-full bg-slate-200 rounded" />
          <div className="h-3 w-5/6 bg-slate-200 rounded" />
        </div>
      </div>

      {/* Sustainability Tip Skeleton */}
      <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100/70 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-emerald-200 rounded-full" />
          <div className="h-3.5 w-36 bg-emerald-200 rounded" />
        </div>
        <div className="h-3 w-11/12 bg-slate-200 rounded pl-6" />
      </div>

      {/* Classification Source Skeleton */}
      <div className="h-3 w-40 bg-slate-200 rounded" />

      {/* Disclaimer Banner Skeleton */}
      <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
        <div className="h-3 w-64 bg-slate-200 rounded" />
        <div className="h-3 w-16 bg-slate-200 rounded" />
      </div>
    </div>
  );
}
