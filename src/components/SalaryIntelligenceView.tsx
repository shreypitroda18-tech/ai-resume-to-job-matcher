"use client";

import React, { useState } from "react";
import { SalaryIntelligence } from "@/lib/types";
import { DollarSign, Copy, Check, TrendingUp, ShieldAlert, Sparkles, MapPin, Award } from "lucide-react";

interface SalaryIntelligenceViewProps {
  salaryData?: SalaryIntelligence;
}

export function SalaryIntelligenceView({ salaryData }: SalaryIntelligenceViewProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!salaryData) {
    return (
      <div className="p-8 text-center text-slate-500 dark:text-slate-400">
        No compensation intelligence available for this role.
      </div>
    );
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: salaryData.currency || "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <DollarSign className="w-5 h-5" />
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Role Compensation & Salary Intelligence
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                Tier-1 Tech Market Grounded
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Estimated market compensation range for{" "}
              <strong className="text-slate-900 dark:text-white">{salaryData.jobTitle}</strong> (
              {salaryData.estimatedSeniority}) in {salaryData.locationScope}.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <MapPin className="w-3.5 h-3.5 text-indigo-500" />
            <span>{salaryData.locationScope}</span>
          </div>
        </div>

        {/* Percentile Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              25th Percentile (Base Band)
            </div>
            <div className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1 font-mono">
              {formatCurrency(salaryData.percentile25)}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Typical entry for this level</div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center justify-between">
              <span>50th Percentile (Median)</span>
              <span className="text-[9px] bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.2 rounded font-bold">
                TARGET
              </span>
            </div>
            <div className="text-2xl font-black text-indigo-700 dark:text-indigo-300 mt-1 font-mono">
              {formatCurrency(salaryData.percentile50)}
            </div>
            <div className="text-[11px] text-indigo-500/80 mt-0.5">Standard market midpoint</div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
              <span>75th Percentile (Top Tier)</span>
              <span className="text-[9px] bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.2 rounded font-bold">
                HIGH FIT
              </span>
            </div>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
              {formatCurrency(salaryData.percentile75)}
            </div>
            <div className="text-[11px] text-emerald-500/80 mt-0.5">With strong skill alignment</div>
          </div>
        </div>

        {/* Visual Range Bar */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="relative w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
            <div className="h-full bg-slate-300 dark:bg-slate-700 w-1/3" />
            <div className="h-full bg-indigo-500 w-1/3" />
            <div className="h-full bg-emerald-500 w-1/3" />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-2">
            <span>{formatCurrency(salaryData.percentile25)}</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">
              Median: {formatCurrency(salaryData.percentile50)}
            </span>
            <span>{formatCurrency(salaryData.percentile75)}</span>
          </div>
        </div>
      </div>

      {/* Negotiation Scripts Grounded in Matched Skills */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
            <Sparkles className="w-4 h-4" />
          </span>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Skill-Grounded Negotiation Scripts
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Never negotiate on vibes. Justify asking for the 75th percentile ({formatCurrency(salaryData.percentile75)}) using your specific verified skill overlaps.
            </p>
          </div>
        </div>

        <div className="space-y-4 pt-1">
          {salaryData.negotiationTalkingPoints.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 flex items-center justify-center text-xs font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
                    {item.point}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  <Award className="w-3 h-3" />
                  Grounded in: {item.groundedInSkill}
                </span>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200/70 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 font-sans italic leading-relaxed">
                "{item.script}"
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => handleCopy(item.script, idx)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        Copied to Clipboard!
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Talking Point</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="pt-2 flex items-start gap-2 text-[11px] text-slate-400">
          <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <span>{salaryData.dataSourceDisclaimer}</span>
        </div>
      </div>
    </div>
  );
}
