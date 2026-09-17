"use client";

import React, { useState } from "react";
import { MessageSquare, Copy, Check, HelpCircle, ShieldAlert, Sparkles } from "lucide-react";
import { InterviewPrepItem } from "@/lib/types";

interface InterviewPrepViewProps {
  interviewPrep?: InterviewPrepItem[];
}

export function InterviewPrepView({ interviewPrep = [] }: InterviewPrepViewProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyScript = (item: InterviewPrepItem) => {
    navigator.clipboard.writeText(item.bridgingScript);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (interviewPrep.length === 0) {
    return (
      <div className="p-8 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <Sparkles className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          No Significant Skill Gaps Found!
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
          Your resume demonstrates strong direct coverage for this role. Prepare for standard architectural and behavioral deep-dives on your existing listed projects.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Overview Banner */}
      <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/40 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
        <div className="text-xs sm:text-sm text-amber-950 dark:text-amber-200">
          <span className="font-semibold block mb-0.5">
            Recruiter Gap-Bridging Cheat Sheet
          </span>
          Hiring managers will quickly spot requirements missing from your resume. Below are the 3–5 toughest questions they will likely ask, paired with proven <strong>Bridging Scripts</strong> to address adjacent experience with confidence without overclaiming.
        </div>
      </div>

      {/* Questions & Bridging Cards */}
      <div className="space-y-4">
        {interviewPrep.map((item, index) => (
          <div
            key={item.id || index}
            className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-5 sm:p-6 space-y-4 transition-all hover:border-slate-300 dark:hover:border-slate-700"
          >
            {/* Header / Target Gap */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
                  Identified Gap: {item.missingSkill}
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  &bull; {item.questionType === "technical" ? "Technical Probe" : "Experience Bridge"}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleCopyScript(item)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" /> Copied Script!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy Script
                  </>
                )}
              </button>
            </div>

            {/* Predicted Question */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Likely Recruiter / Interviewer Question:
                  </span>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                    &ldquo;{item.predictedQuestion}&rdquo;
                  </p>
                </div>
              </div>

              {item.whyAsked && (
                <div className="mt-2.5 text-[11px] text-slate-500 dark:text-slate-400 pl-6 border-l-2 border-indigo-200 dark:border-indigo-900">
                  <span className="font-semibold">Why they ask:</span> {item.whyAsked}
                </div>
              )}
            </div>

            {/* Bridging Script */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Recommended Bridging Script (How to Answer):</span>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-sans leading-relaxed">
                {item.bridgingScript}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
