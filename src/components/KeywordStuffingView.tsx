"use client";

import React from "react";
import { KeywordStuffingInspection } from "@/lib/types";
import { ShieldCheck, AlertTriangle, XCircle, Award, CheckCircle2, ArrowRight } from "lucide-react";

interface KeywordStuffingViewProps {
  inspection?: KeywordStuffingInspection;
}

export function KeywordStuffingView({ inspection }: KeywordStuffingViewProps) {
  if (!inspection) {
    return (
      <div className="p-8 text-center text-slate-500 dark:text-slate-400">
        No keyword stuffing analysis available.
      </div>
    );
  }

  const isHealthy = inspection.stuffingScore >= 80;
  const isModerate = inspection.stuffingScore >= 65 && inspection.stuffingScore < 80;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Keyword Stuffing & Overqualification Detector
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
                Spam Filter Protection
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Modern ATS systems (Workday, Greenhouse, Taleo) flag unnatural keyword repetition as spam. Ensure your keyword density remains high-signal and natural.
            </p>
          </div>

          {/* Stuffing Health Score */}
          <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/60 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0">
            <div className="text-right">
              <div className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                Natural Flow Score
              </div>
              <div
                className={`text-2xl font-black font-mono ${
                  isHealthy
                    ? "text-emerald-600 dark:text-emerald-400"
                    : isModerate
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-rose-600 dark:text-rose-400"
                }`}
              >
                {inspection.stuffingScore}
                <span className="text-xs font-normal text-slate-400">/100</span>
              </div>
            </div>
            <div className="h-10 w-[1px] bg-slate-200 dark:bg-slate-700" />
            <div className="text-xs text-slate-500 dark:text-slate-400 max-w-[130px] leading-tight">
              {isHealthy
                ? "Clean distribution. Zero algorithmic penalty risk."
                : isModerate
                ? "Moderate repetition detected in key terms."
                : "High spam penalty risk. Keywords appear artificially forced."}
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Repeated Terms vs Overqualification */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Repeated Terms Frequency */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Keyword Repetition Frequency
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Terms repeated more than 5 times can trigger ATS spam penalties or look robotic to human recruiters.
            </p>
          </div>

          <div className="space-y-2.5">
            {inspection.repeatedTerms.length === 0 ? (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>All keywords are well-balanced and naturally distributed.</span>
              </div>
            ) : (
              inspection.repeatedTerms.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      "{item.term}"
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      ({item.count} occurrences)
                    </span>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      item.riskLevel === "safe"
                        ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300"
                        : item.riskLevel === "moderate"
                        ? "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300"
                        : "bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300"
                    }`}
                  >
                    {item.riskLevel}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Overqualification Check */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
              <Award className="w-4 h-4" />
            </span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Seniority & Overqualification Check
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <div className="text-[10px] uppercase font-semibold text-slate-400">
                Candidate Experience
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                {inspection.overqualificationCheck.candidateYears} yrs
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <div className="text-[10px] uppercase font-semibold text-slate-400">
                Target Role Requires
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                {inspection.overqualificationCheck.targetYears} yrs
              </div>
            </div>
          </div>

          {inspection.overqualificationCheck.isOverqualified ? (
            <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-200">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Overqualification Risk Detected</span>
              </div>
              <p className="text-amber-800/90 dark:text-amber-300 leading-relaxed">
                {inspection.overqualificationCheck.warningMessage ||
                  "Your extensive seniority may cause recruiters to assume you'll be bored or too expensive."}
              </p>
              {inspection.overqualificationCheck.downlevelingAdvice && (
                <div className="pt-2 border-t border-amber-200 dark:border-amber-900/60 text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Down-leveling Strategy:</strong>{" "}
                    {inspection.overqualificationCheck.downlevelingAdvice}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Experience matches target role expectations closely without overqualification concerns.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
