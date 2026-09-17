"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Sparkles, Shield, Cpu } from "lucide-react";

const STAGES = [
  { id: 1, label: "Parsing document structure, layout boundaries & ATS glyphs…" },
  { id: 2, label: "Extracting core technical skills, competencies & experience metrics…" },
  { id: 3, label: "Evaluating ATS keyword density & spam-repetition risk audit…" },
  { id: 4, label: "Simulating 6-second recruiter eye-tracking scan pattern…" },
  { id: 5, label: "Synthesizing executive fit score, salary intel & tailored rewrites…" },
];

export function LoadingIndicator() {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  useEffect(() => {
    const intervals = [1000, 1400, 1500, 1600];
    let step = 0;

    const timer = setInterval(() => {
      step++;
      if (step < STAGES.length) {
        setCurrentStageIndex(step);
      } else {
        clearInterval(timer);
      }
    }, intervals[step] || 1500);

    return () => clearInterval(timer);
  }, []);

  const progressPercent = Math.min(96, ((currentStageIndex + 1) / STAGES.length) * 100);

  return (
    <div className="w-full max-w-xl mx-auto my-12 p-8 rounded-3xl glass-panel shadow-2xl transition-all animate-in fade-in zoom-in-95 duration-200 relative overflow-hidden">
      {/* Background subtle glow */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-48 h-48 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="text-center mb-6">
        <div className="inline-flex p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mb-3 shadow-inner border border-indigo-100 dark:border-indigo-800/40">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          Analyzing Match &amp; Synthesizing Insights
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Evaluating your resume against recruiter triage benchmarks and ATS parsing engines…
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden mb-8 border border-slate-200/50 dark:border-slate-700/50">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-600 transition-all duration-700 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Staged Checklist */}
      <div className="space-y-3">
        {STAGES.map((stage, index) => {
          const isDone = index < currentStageIndex;
          const isCurrent = index === currentStageIndex;

          return (
            <div
              key={stage.id}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                isCurrent
                  ? "bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 shadow-sm"
                  : isDone
                  ? "bg-slate-50/40 dark:bg-slate-800/20 opacity-80"
                  : "opacity-35"
              }`}
            >
              <div className="shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700" />
                )}
              </div>
              <span
                className={`text-xs sm:text-sm font-medium ${
                  isCurrent
                    ? "text-indigo-950 dark:text-indigo-200 font-semibold"
                    : isDone
                    ? "text-slate-700 dark:text-slate-300"
                    : "text-slate-400 dark:text-slate-500"
                }`}
              >
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Security reassurance */}
      <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-slate-400">
        <Shield className="w-3.5 h-3.5 text-emerald-500" />
        <span>In-memory sandbox processing &bull; Zero data retained</span>
      </div>
    </div>
  );
}
