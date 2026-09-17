"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check, Download, Sparkles, RefreshCw, Send } from "lucide-react";
import { CoverLetter, CoverLetterTone } from "@/lib/types";

interface CoverLetterViewProps {
  coverLetters?: Record<CoverLetterTone, CoverLetter>;
  candidateName?: string;
  jobTitle?: string;
  companyName?: string;
}

const TONES: { id: CoverLetterTone; label: string; description: string }[] = [
  {
    id: "confident-technical",
    label: "Confident & Technical",
    description: "Emphasizes architecture, system scale, and engineering craftsmanship.",
  },
  {
    id: "concise-executive",
    label: "Concise & Executive",
    description: "Direct, high-level impact focusing on ROI, leadership, and velocity.",
  },
  {
    id: "startup-collaborative",
    label: "Startup Collaborative",
    description: "High-ownership builder tone, cross-functional agility, and passion.",
  },
];

export function CoverLetterView({
  coverLetters,
  jobTitle = "Target Role",
  companyName = "Hiring Team",
}: CoverLetterViewProps) {
  const [selectedTone, setSelectedTone] = useState<CoverLetterTone>("confident-technical");
  const [editedText, setEditedText] = useState("");
  const [copied, setCopied] = useState(false);

  // Update text when tone changes or letters load
  useEffect(() => {
    if (coverLetters && coverLetters[selectedTone]) {
      setEditedText(coverLetters[selectedTone].fullText);
    }
  }, [selectedTone, coverLetters]);

  const handleCopy = () => {
    navigator.clipboard.writeText(editedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([editedText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Cover-Letter-${companyName.replace(/\s+/g, "_")}-${selectedTone}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleResetToDefault = () => {
    if (coverLetters && coverLetters[selectedTone]) {
      setEditedText(coverLetters[selectedTone].fullText);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="p-4 rounded-xl bg-violet-50/60 dark:bg-violet-950/30 border border-violet-200/70 dark:border-violet-800/40 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-violet-600 dark:text-violet-400 mt-0.5 shrink-0" />
        <div className="text-xs sm:text-sm text-violet-950 dark:text-violet-200">
          <span className="font-semibold block mb-0.5">3-Paragraph Tailored Cover Letter</span>
          Synthesized directly from your verified matched skills and candidate achievements, mapped to {companyName}&apos;s specific job requirements.
        </div>
      </div>

      {/* Tone Selector */}
      <div className="space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Select Tone (Instant Regeneration)
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {TONES.map((tone) => (
            <button
              key={tone.id}
              type="button"
              onClick={() => setSelectedTone(tone.id)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                selectedTone === tone.id
                  ? "bg-indigo-50/80 dark:bg-indigo-950/60 border-indigo-500 shadow-xs text-indigo-950 dark:text-indigo-200"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300"
              }`}
            >
              <div className="font-semibold text-xs sm:text-sm mb-1">{tone.label}</div>
              <div className="text-[11px] opacity-75 leading-tight">{tone.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Editable Editor Area */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Send className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-semibold text-slate-900 dark:text-white">
              Editable Letter Draft ({TONES.find((t) => t.id === selectedTone)?.label})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1"
              title="Reset edits to original generated letter"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/70 dark:hover:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy Letter"}</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download .txt</span>
            </button>
          </div>
        </div>

        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          rows={14}
          className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-sans leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          placeholder="Generating your tailored cover letter..."
        />

        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{editedText.split(/\s+/).filter(Boolean).length} words &bull; Edit directly above before copying</span>
          <span className="text-[11px]">Formatted for direct paste into Greenhouse, Lever, or email</span>
        </div>
      </div>
    </div>
  );
}
