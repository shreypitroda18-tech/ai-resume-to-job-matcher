"use client";

import React, { useState } from "react";
import { LinkedInProfileSync } from "@/lib/types";
import { Linkedin, Copy, Check, Sparkles, Tag, FileText, CheckCircle2 } from "lucide-react";

interface LinkedInSyncViewProps {
  syncData?: LinkedInProfileSync;
}

export function LinkedInSyncView({ syncData }: LinkedInSyncViewProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!syncData) {
    return (
      <div className="p-8 text-center text-slate-500 dark:text-slate-400">
        No LinkedIn profile sync data available.
      </div>
    );
  }

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                <Linkedin className="w-5 h-5" />
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                LinkedIn Profile & Headline Synchronizer
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60">
                Recruiter Search Optimized
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Align your LinkedIn presence with your tailored resume. When recruiters click your profile from an application, the narrative and core skills match seamlessly.
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Headline */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Optimized Headline
              </h4>
              <span className="text-[11px] text-slate-400">
                Under 220 chars • Max search algorithm visibility
              </span>
            </div>
          </div>

          <button
            onClick={() => copyToClipboard(syncData.suggestedHeadline, "headline")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 transition-colors"
          >
            {copiedSection === "headline" ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Headline</span>
              </>
            )}
          </button>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 font-sans text-sm font-medium text-slate-800 dark:text-slate-100">
          {syncData.suggestedHeadline}
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <FileText className="w-4 h-4" />
            </span>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Targeted "About" Summary
              </h4>
              <span className="text-[11px] text-slate-400">
                2 punchy paragraphs balancing personal voice and high-priority skills
              </span>
            </div>
          </div>

          <button
            onClick={() => copyToClipboard(syncData.aboutSection, "about")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
          >
            {copiedSection === "about" ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy About</span>
              </>
            )}
          </button>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
          {syncData.aboutSection}
        </div>
      </div>

      {/* Top 5 Skills to Pin */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <Tag className="w-4 h-4" />
            </span>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Top 5 Skills to Pin to Profile
              </h4>
              <span className="text-[11px] text-slate-400">
                Directly matches recruiter search filters for this target title
              </span>
            </div>
          </div>

          <button
            onClick={() => copyToClipboard(syncData.topSkillsToPin.join(", "), "skills")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
          >
            {copiedSection === "skills" ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy All 5</span>
              </>
            )}
          </button>
        </div>

        <div className="flex flex-wrap gap-2.5 pt-1">
          {syncData.topSkillsToPin.map((skill, idx) => (
            <div
              key={idx}
              className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-xs font-medium text-slate-800 dark:text-slate-200"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
