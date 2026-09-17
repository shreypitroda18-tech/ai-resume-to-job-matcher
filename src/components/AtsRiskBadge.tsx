"use client";

import React, { useState } from "react";
import { ShieldCheck, AlertTriangle, XCircle, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { AtsRiskInspection } from "@/lib/types";

interface AtsRiskBadgeProps {
  inspection?: AtsRiskInspection;
}

export function AtsRiskBadge({ inspection }: AtsRiskBadgeProps) {
  const [expanded, setExpanded] = useState(false);

  if (!inspection) return null;

  const isPass = inspection.status === "pass";
  const isWarning = inspection.status === "warning";

  return (
    <div className={`rounded-xl border transition-all ${
      isPass
        ? "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200/80 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200"
        : isWarning
        ? "bg-amber-50/70 dark:bg-amber-950/30 border-amber-200/80 dark:border-amber-900/40 text-amber-900 dark:text-amber-200"
        : "bg-rose-50/70 dark:bg-rose-950/30 border-rose-200/80 dark:border-rose-900/40 text-rose-900 dark:text-rose-200"
    }`}>
      <div
        onClick={() => setExpanded(!expanded)}
        className="p-3.5 sm:p-4 flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex items-center gap-3">
          <div className="shrink-0">
            {isPass ? (
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            ) : isWarning ? (
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            ) : (
              <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs sm:text-sm">{inspection.headline}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-white/60 dark:bg-black/40">
                Safety: {inspection.safetyScore}/100
              </span>
            </div>
            <p className="text-xs opacity-80 mt-0.5 hidden sm:block">
              {inspection.explanation}
            </p>
          </div>
        </div>

        <button
          type="button"
          aria-label="Toggle ATS inspection details"
          className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {expanded && (
        <div className="px-4 pb-4 pt-1 border-t border-black/5 dark:border-white/5 space-y-2.5 text-xs animate-in fade-in duration-150">
          <p className="opacity-90 sm:hidden">
            {inspection.explanation}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
            {inspection.checks.map((check, i) => (
              <div
                key={i}
                className="p-2.5 rounded-lg bg-white/70 dark:bg-slate-900/60 border border-black/5 dark:border-white/5 flex items-start gap-2 text-slate-700 dark:text-slate-300"
              >
                {check.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-semibold block text-slate-900 dark:text-white">
                    {check.name}
                  </span>
                  <span className="text-[11px] leading-relaxed block text-slate-500 dark:text-slate-400 mt-0.5">
                    {check.details}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
