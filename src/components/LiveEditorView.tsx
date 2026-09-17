"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, RefreshCw, CheckCircle2, Circle, ArrowUpRight, Zap } from "lucide-react";
import { MatchAnalysisResult, SkillMatchItem } from "@/lib/types";

interface LiveEditorViewProps {
  initialResumeText: string;
  jobDescriptionText: string;
  matchedSkills: SkillMatchItem[];
  missingSkills: SkillMatchItem[];
  onSaveResume: (newText: string) => void;
  onFullReAnalyze: (updatedText: string) => void;
  isReanalyzing?: boolean;
}

export function LiveEditorView({
  initialResumeText,
  jobDescriptionText,
  matchedSkills,
  missingSkills,
  onSaveResume,
  onFullReAnalyze,
  isReanalyzing = false,
}: LiveEditorViewProps) {
  const [editedText, setEditedText] = useState(initialResumeText);
  const [liveScore, setLiveScore] = useState(72);
  const [targetScore, setTargetScore] = useState(72);
  const [activeKeywords, setActiveKeywords] = useState<{ name: string; found: boolean; importance: string }[]>([]);
  const lineCount = editedText.split("\n").length;

  // Track all critical and target skills
  const allTargetKeywords = [
    ...missingSkills.map((s) => ({ name: s.name, importance: s.importance })),
    ...matchedSkills.map((s) => ({ name: s.name, importance: s.importance })),
  ];

  // Debounced real-time keyword evaluation
  useEffect(() => {
    const handler = setTimeout(() => {
      const lower = editedText.toLowerCase();

      // Check presence of each keyword
      const evaluated = allTargetKeywords.map((kw) => {
        const found = lower.includes(kw.name.toLowerCase());
        return {
          name: kw.name,
          found,
          importance: kw.importance,
        };
      });

      setActiveKeywords(evaluated);

      // Compute dynamic score based on keyword presence
      const total = evaluated.length;
      if (total > 0) {
        const foundCount = evaluated.filter((k) => k.found).length;
        const ratio = foundCount / total;
        // Scale dynamically between 45 and 96
        const newScore = Math.min(98, Math.max(40, Math.round(45 + ratio * 52)));
        setTargetScore(newScore);
      }
    }, 250);

    return () => clearTimeout(handler);
  }, [editedText]);

  // Animate score counter smoothly on change (intentional dopamine climb 68 -> 85)
  useEffect(() => {
    if (liveScore === targetScore) return;

    const diff = targetScore - liveScore;
    const step = diff > 0 ? 1 : -1;
    const interval = Math.max(15, Math.floor(400 / Math.abs(diff)));

    const timer = setInterval(() => {
      setLiveScore((prev) => {
        const next = prev + step;
        if ((step > 0 && next >= targetScore) || (step < 0 && next <= targetScore)) {
          clearInterval(timer);
          return targetScore;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [targetScore, liveScore]);

  // Radius and SVG dimensions
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (liveScore / 100) * circumference;

  const handleApplyChanges = () => {
    onSaveResume(editedText);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/70 dark:border-indigo-800/40 flex items-center justify-between">
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0" />
          <div className="text-xs sm:text-sm text-indigo-950 dark:text-indigo-200">
            <span className="font-semibold block mb-0.5">Live Interactive Split-Screen Resume Editor</span>
            Edit bullets directly on the left. The right pane dynamically highlights added terms and climbs your match score in real time.
          </div>
        </div>

        <button
          type="button"
          onClick={() => onFullReAnalyze(editedText)}
          disabled={isReanalyzing}
          className="shrink-0 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isReanalyzing ? "animate-spin" : ""}`} />
          <span>{isReanalyzing ? "Scoring..." : "Re-score with AI"}</span>
        </button>
      </div>

      {/* Split Screen Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Pane: Line-numbered editor */}
        <div className="lg:col-span-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-[650px]">
          <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Resume Editor ({lineCount} lines &bull; {editedText.split(/\s+/).filter(Boolean).length} words)
            </span>
            <button
              type="button"
              onClick={handleApplyChanges}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Save to Session
            </button>
          </div>

          <div className="flex-1 flex overflow-hidden font-mono text-xs leading-relaxed">
            {/* Line numbers column */}
            <div className="w-12 select-none py-4 bg-slate-50 dark:bg-slate-950/80 border-r border-slate-200/60 dark:border-slate-800/60 text-right pr-3 text-slate-400 font-mono text-[11px] overflow-hidden">
              {Array.from({ length: Math.max(lineCount, 30) }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Textarea */}
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="flex-1 p-4 bg-transparent text-slate-900 dark:text-slate-100 resize-none focus:outline-none focus:ring-0 overflow-y-auto whitespace-pre leading-relaxed"
              spellCheck={false}
              placeholder="Paste or edit your resume text here..."
            />
          </div>
        </div>

        {/* Right Pane: Sticky Live Score Gauge + Term Checklist */}
        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
          {/* Live Score Radial Card */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col items-center justify-center text-center">
            <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-2">
              Real-Time Match Gauge
            </span>

            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-slate-100 dark:text-slate-800"
                />
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className={`transition-all duration-300 ease-out ${
                    liveScore >= 80
                      ? "stroke-emerald-500"
                      : liveScore >= 65
                      ? "stroke-indigo-500"
                      : "stroke-amber-500"
                  }`}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {liveScore}
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400">/ 100</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
              Score adjusts dynamically as target JD keywords are added.
            </p>
          </div>

          {/* Real-time Keyword Checklist */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-5 space-y-3 max-h-[380px] flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Live Keyword Checklist
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                {activeKeywords.filter((k) => k.found).length} / {activeKeywords.length} terms found
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-xs">
              {activeKeywords.map((kw, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between p-2 rounded-lg transition-all ${
                    kw.found
                      ? "bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border border-emerald-200/50 dark:border-emerald-900/40"
                      : "bg-slate-50 dark:bg-slate-800/40 text-slate-400 border border-slate-100 dark:border-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {kw.found ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0" />
                    )}
                    <span className="font-semibold">{kw.name}</span>
                  </div>
                  <span
                    className={`px-1.5 py-0.2 rounded text-[10px] uppercase font-bold ${
                      kw.importance === "critical"
                        ? "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300"
                        : "bg-slate-200/60 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {kw.importance}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
