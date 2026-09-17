"use client";

import React, { useState, useMemo } from "react";
import { CompanyJobListing, CompanyEligibilityResult } from "@/lib/types";
import { evaluateAllCompanyEligibility, CURATED_COMPANY_JOBS } from "@/lib/company-matcher";
import {
  Building,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Globe,
  MapPin,
  Check,
  Copy,
} from "lucide-react";

interface CompanyMatcherViewProps {
  resumeText: string;
  onSelectJobForAnalysis?: (job: CompanyJobListing) => void;
}

export function CompanyMatcherView({
  resumeText,
  onSelectJobForAnalysis,
}: CompanyMatcherViewProps) {
  const [filterVerdict, setFilterVerdict] = useState<string>("all");
  const [copiedHookIndex, setCopiedHookIndex] = useState<number | null>(null);

  const eligibilityResults = useMemo(() => {
    return evaluateAllCompanyEligibility(resumeText, CURATED_COMPANY_JOBS);
  }, [resumeText]);

  const filteredResults = eligibilityResults.filter((item) => {
    if (filterVerdict === "all") return true;
    return item.eligibilityVerdict === filterVerdict;
  });

  const handleCopyHook = (hook: string, index: number) => {
    navigator.clipboard.writeText(hook);
    setCopiedHookIndex(index);
    setTimeout(() => setCopiedHookIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <Building className="w-5 h-5" />
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                "Am I Eligible?" Live Company Matcher
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
                Public ATS Directory
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Live eligibility scoring across verified open roles at top tech companies. Clear the threshold before you submit.
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0">
            {["all", "Strong Match", "Possible with tailoring"].map((verdict) => (
              <button
                key={verdict}
                onClick={() => setFilterVerdict(verdict)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                  filterVerdict === verdict
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {verdict === "all" ? "All Companies" : verdict}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Company Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResults.map((result, idx) => {
          const isStrong = result.eligibilityVerdict === "Strong Match";
          const isPossible = result.eligibilityVerdict === "Possible with tailoring";

          return (
            <div
              key={result.job.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div>
                {/* Top Company Info & Score */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {result.job.companyName}
                      </span>
                      <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                        {result.job.department}
                      </span>
                    </div>
                    <h4 className="font-bold text-base text-slate-900 dark:text-white mt-1">
                      {result.job.roleTitle}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {result.job.location}
                      </span>
                      <span>•</span>
                      <span>{result.job.postedDate}</span>
                    </div>
                  </div>

                  {/* Score & Verdict Badge */}
                  <div className="text-right shrink-0">
                    <div
                      className={`text-2xl font-black font-mono ${
                        isStrong
                          ? "text-emerald-600 dark:text-emerald-400"
                          : isPossible
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-slate-400"
                      }`}
                    >
                      {result.matchScore}%
                    </div>
                    <span
                      className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mt-0.5 ${
                        isStrong
                          ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300"
                          : isPossible
                          ? "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {result.eligibilityVerdict}
                    </span>
                  </div>
                </div>

                {/* Personalized Action Checklist */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Eligibility Action Checklist
                  </div>
                  {result.actionChecklist.map((taskItem, tIdx) => (
                    <div
                      key={tIdx}
                      className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{taskItem.task}</span>
                    </div>
                  ))}
                </div>

                {/* Direct Outreach Hook */}
                <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      Suggested Outreach Hook
                    </span>
                    <button
                      onClick={() => handleCopyHook(result.tailoredOutreachHook, idx)}
                      className="text-[10px] font-medium text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                    >
                      {copiedHookIndex === idx ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Hook</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 italic font-sans leading-relaxed">
                    "{result.tailoredOutreachHook}"
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <a
                  href={result.job.publicBoardUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>View Official Job Board</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                {onSelectJobForAnalysis && (
                  <button
                    onClick={() => onSelectJobForAnalysis(result.job)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm"
                  >
                    <span>Tailor for this Role</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
