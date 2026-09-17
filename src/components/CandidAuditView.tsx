"use client";

import React from "react";
import { CandidAuditFeedback } from "@/lib/types";
import { AlertOctagon, ThumbsUp, AlertTriangle, ArrowRight, ShieldAlert, Sparkles } from "lucide-react";

interface CandidAuditViewProps {
  candidAudit?: CandidAuditFeedback;
}

export function CandidAuditView({ candidAudit }: CandidAuditViewProps) {
  if (!candidAudit) {
    return (
      <div className="p-8 text-center text-slate-500 dark:text-slate-400">
        No candid recruiter audit available for this resume.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner: Unmistakable Tone Reskin */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-stone-900 text-amber-50 border border-amber-800/60 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-500 text-slate-950 font-black shadow">
              <AlertOctagon className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
                  Candid Recruiter Audit
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  UNFILTERED FEEDBACK
                </span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight mt-0.5">
                What a Hiring Manager Actually Thinks in 30 Seconds
              </h3>
            </div>
          </div>
        </div>

        {/* Brutal Executive Summary */}
        <div className="mt-5 p-4 rounded-xl bg-amber-900/40 border border-amber-500/30 text-amber-100 text-sm leading-relaxed font-sans shadow-inner">
          <p className="font-medium italic">"{candidAudit.brutalSummary}"</p>
        </div>

        {/* Scope / Title Mismatch warning if present */}
        {candidAudit.scopeTitleMismatch && (
          <div className="mt-3 p-3 rounded-lg bg-rose-950/60 border border-rose-600/40 text-rose-200 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
            <span>
              <strong>Scope Mismatch:</strong> {candidAudit.scopeTitleMismatch}
            </span>
          </div>
        )}
      </div>

      {/* Grid: What Impressed vs Red Flags */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* What Actually Impressed */}
        <div className="bg-white dark:bg-slate-900 border border-emerald-200/80 dark:border-emerald-950/50 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <ThumbsUp className="w-4 h-4" />
            </span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              What Actually Impressed Me
            </h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Keep these highlighted. These are the rare, tangible proof points that justify putting you in the "Yes" pile.
          </p>

          <div className="space-y-2 pt-1">
            {candidAudit.whatActuallyImpressedRecruiter.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No standout proof points identified yet.</p>
            ) : (
              candidAudit.whatActuallyImpressedRecruiter.map((point, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300"
                >
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{point}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Red Flags & Skepticism */}
        <div className="bg-white dark:bg-slate-900 border border-rose-200/80 dark:border-rose-950/50 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-4 h-4" />
            </span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Recruiter Red Flags & Fixes
            </h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Claims that raise recruiter eyebrows or sound like passive participation rather than real ownership.
          </p>

          <div className="space-y-2.5 pt-1">
            {candidAudit.redFlags.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No red flags flagged.</p>
            ) : (
              candidAudit.redFlags.map((flag, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-rose-900 dark:text-rose-200">
                      {flag.flag}
                    </span>
                    <span
                      className={`text-[9px] uppercase font-extrabold px-1.5 py-0.5 rounded ${
                        flag.severity === "high"
                          ? "bg-rose-600 text-white"
                          : "bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200"
                      }`}
                    >
                      {flag.severity}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                    <span>
                      <strong>Fix:</strong> {flag.fix}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Fluff Buzzwords Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
            Fluff Buzzwords Detected
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Recruiters mentally filter out empty corporate clichés. Replace them with specific engineering/business action verbs.
          </p>
        </div>

        {candidAudit.fluffBuzzwordsDetected.length === 0 ? (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-xs">
            Zero fluff buzzwords detected! Your resume uses crisp, direct action language.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px] font-semibold">
                  <th className="py-2.5 px-3">Fluff Word</th>
                  <th className="py-2.5 px-3">Count</th>
                  <th className="py-2.5 px-3">Impact</th>
                  <th className="py-2.5 px-3">Use Instead</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {candidAudit.fluffBuzzwordsDetected.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-semibold text-rose-600 dark:text-rose-400">
                      "{item.word}"
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                        {item.count}x
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-500 dark:text-slate-400">
                      Vague & unquantified
                    </td>
                    <td className="py-3 px-3 text-emerald-700 dark:text-emerald-400 font-medium">
                      {item.alternative}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
