"use client";

import React, { useState } from "react";
import { Briefcase, X, Sparkles, Globe, Loader2, ArrowRight, AlertCircle } from "lucide-react";
import { SAMPLE_PRESETS, SamplePreset } from "@/lib/sample-data";

interface JobDescriptionPanelProps {
  jobDescription: string;
  setJobDescription: (text: string) => void;
  onApplyPreset: (preset: SamplePreset) => void;
}

export function JobDescriptionPanel({
  jobDescription,
  setJobDescription,
  onApplyPreset,
}: JobDescriptionPanelProps) {
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [jobUrl, setJobUrl] = useState("");
  const [isFetchingUrl, setIsFetchingUrl] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(null);

  const wordCount = jobDescription
    ? jobDescription.trim().split(/\s+/).filter(Boolean).length
    : 0;

  const handleFetchUrl = async () => {
    if (!jobUrl || !jobUrl.startsWith("http")) {
      setUrlError("Please enter a valid URL starting with http:// or https://");
      return;
    }

    setUrlError(null);
    setIsFetchingUrl(true);

    try {
      const res = await fetch("/api/fetch-job-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: jobUrl.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to extract job posting content.");
      }

      setJobDescription(data.text);
      setShowUrlInput(false);
      setJobUrl("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Could not fetch job URL.";
      setUrlError(msg);
    } finally {
      setIsFetchingUrl(false);
    }
  };

  return (
    <div className="flex flex-col h-full rounded-3xl glass-panel shadow-md p-5 sm:p-6 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Job Description</h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {wordCount > 0 ? `${wordCount} words detected` : "Paste posting or import from URL"}
            </p>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="px-2.5 py-1 rounded-md text-xs font-medium text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/50 border border-violet-200/60 dark:border-violet-800/60 flex items-center gap-1.5 transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Fetch from URL</span>
          </button>

          {/* Quick Sample Selector Chips */}
          <div className="hidden sm:flex items-center gap-1 text-xs">
            <span className="text-[11px] text-slate-400 ml-1 mr-0.5 flex items-center">
              <Sparkles className="w-3 h-3 text-violet-500 mr-0.5" /> Presets:
            </span>
            {SAMPLE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => onApplyPreset(preset)}
                className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              >
                {preset.role}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* URL Fetch Input Box */}
      {showUrlInput && (
        <div className="mt-3 p-3.5 rounded-xl bg-violet-50/50 dark:bg-violet-950/30 border border-violet-200/70 dark:border-violet-800/50 space-y-2 animate-in fade-in duration-150">
          <div className="flex items-center justify-between text-xs font-semibold text-violet-950 dark:text-violet-200">
            <span>Import Job Posting via Web URL</span>
            <button
              type="button"
              onClick={() => setShowUrlInput(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="url"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              placeholder="https://boards.greenhouse.io/company/jobs/12345..."
              className="flex-1 px-3 py-1.5 rounded-lg border border-violet-300 dark:border-violet-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <button
              type="button"
              onClick={handleFetchUrl}
              disabled={isFetchingUrl}
              className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0"
            >
              {isFetchingUrl ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Fetching...
                </>
              ) : (
                <>
                  <span>Fetch</span> <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>

          {urlError && (
            <div className="text-[11px] text-rose-600 dark:text-rose-400 flex items-center gap-1.5 pt-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{urlError}</span>
            </div>
          )}
        </div>
      )}

      {/* Main Textarea */}
      <div className="flex-1 flex flex-col pt-4 min-h-[300px]">
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the target job description here (responsibilities, required qualifications, nice-to-haves, tech stack)..."
          className="flex-1 w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-xs sm:text-sm font-mono leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
        />

        <div className="flex items-center justify-between pt-2.5 text-xs text-slate-400">
          <span>{wordCount} words &bull; {jobDescription.length} chars</span>
          {jobDescription && (
            <button
              type="button"
              onClick={() => setJobDescription("")}
              className="text-rose-500 hover:text-rose-600 font-medium flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Clear Text
            </button>
          )}
        </div>
      </div>

      <div className="pt-3 mt-auto text-[11px] text-slate-400 dark:text-slate-500 flex items-center justify-between">
        <span>Includes requirements, qualifications, and core responsibilities for optimal ATS fidelity.</span>
      </div>
    </div>
  );
}
