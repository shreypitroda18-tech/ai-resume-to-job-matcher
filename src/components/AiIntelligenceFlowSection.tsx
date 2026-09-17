"use client";

import React, { useState } from "react";
import {
  Cpu,
  FileText,
  Search,
  CheckCircle2,
  Lock,
  ArrowRight,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";

export function AiIntelligenceFlowSection({ onScrollToWorkspace }: { onScrollToWorkspace: () => void }) {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    {
      step: "01",
      title: "Document Ingestion & Tokenization",
      subtitle: "Deterministic parsing without lossy flattening",
      icon: FileText,
      description:
        "Processes PDF, DOCX, or raw text locally in-memory. De-duplicates layout elements, preserves bullet hierarchies, and isolates contact headers, experience timelines, and tech stack references.",
      latency: "12ms",
      details: [
        "In-memory memory-safe buffer processing",
        "Deterministic single-column stream normalization",
        "Zero cloud storage or permanent retention",
      ],
      outputSample: "EXTRACTED: 4 Roles, 18 Bullet Items, 26 Primary Skill Entities",
    },
    {
      step: "02",
      title: "Neural JD Requirement Extraction",
      subtitle: "Separating must-haves from wishlist noise",
      icon: Search,
      description:
        "Analyzes the target job description to extract explicit requirements, implicit architectural competencies, and seniority expectations, ranking them by algorithmic weight.",
      latency: "45ms",
      details: [
        "Hierarchical skill entity classification",
        "Must-have vs nice-to-have qualification weighting",
        "Domain framework & tech stack mapping",
      ],
      outputSample: "MAPPED: 8 Core Requirements, 4 Secondary Tools, Staff-tier expectations",
    },
    {
      step: "03",
      title: "Multi-Vector Scoring & ATS Diagnostic",
      subtitle: "Simulating automated filters & human gaze",
      icon: Layers,
      description:
        "Evaluates your resume against the JD across 3 independent scoring vectors (Skill Overlap, Experience Calibration, Keyword Density) while running 9 automated parser vulnerability checks.",
      latency: "38ms",
      details: [
        "Explainable weighted match score (0-100)",
        "Workday & Greenhouse layout risk heuristics",
        "Recruiter 6-second F-pattern gaze simulation",
      ],
      outputSample: "SCORE: 88/100 (Skills: 91%, Exp: 85%, ATS Integrity: High)",
    },
    {
      step: "04",
      title: "Generative Elevation & Application Suite",
      subtitle: "Producing interview-winning application assets",
      icon: Sparkles,
      description:
        "Transforms weak passive bullets using Google's X-Y-Z formula, generates customized cold recruiter outreach emails, drafts tailored cover letters, and calculates market salary bands.",
      latency: "180ms",
      details: [
        "Word-level diff rewrites with hard metrics",
        "Targeted hiring manager cold outreach message",
        "Senior-calibrated salary talking points",
      ],
      outputSample: "DELIVERED: 4 Google X-Y-Z Rewrites, Custom Pitch, Comp Blueprint",
    },
  ];

  const current = stages[activeStage];
  const CurrentIcon = current.icon;

  return (
    <section id="how-it-works" className="py-16 sm:py-24 border-y border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/30 backdrop-blur-xs scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full am-category-tag">
            <Cpu className="w-3.5 h-3.5 text-indigo-500" />
            <span>INTELLIGENCE ENGINE ARCHITECTURE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12]">
            How MatchPoint AI models your candidacy{" "}
            <span className="highlight-editorial hl-violet">in under 60 seconds</span>.
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            A deterministic, 4-stage neural pipeline designed to inspect ATS parser vulnerability,
            simulate recruiter cognitive triage, and generate senior-grade application assets in-memory.
          </p>
        </div>

        {/* 4 Interactive Stage Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = activeStage === idx;
            return (
              <button
                key={stage.step}
                type="button"
                onClick={() => setActiveStage(idx)}
                className={`text-left p-5 rounded-xl transition-all border cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? "bg-white dark:bg-slate-900 border-slate-950 dark:border-white shadow-sm ring-1 ring-slate-950/10 dark:ring-white/10"
                    : "bg-white/50 dark:bg-slate-900/40 border-slate-200/70 dark:border-slate-800/70 hover:bg-white dark:hover:bg-slate-900"
                }`}
              >
                {/* Active Indicator Bar */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-slate-950 dark:bg-white" />
                )}

                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isSelected ? "text-slate-950 dark:text-white" : "text-slate-400"
                    }`}
                  >
                    PHASE // {stage.step}
                  </span>
                  <div
                    className={`p-2 rounded-lg ${
                      isSelected
                        ? "bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white"
                        : "bg-slate-100/60 dark:bg-slate-800/60 text-slate-400"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug mb-1">
                  {stage.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                  {stage.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Stage Deep-Dive Card */}
        <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-slate-200/80 dark:border-slate-800/80 shadow-lg bg-white dark:bg-slate-900">
          <div key={activeStage} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-tab-fade">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                  <CurrentIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                    Stage {current.step} Deep Architecture
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {current.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {current.description}
              </p>

              <div className="space-y-2 pt-2">
                {current.details.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex items-center gap-4">
                <button
                  type="button"
                  onClick={onScrollToWorkspace}
                  className="am-btn-primary text-xs sm:text-sm py-2.5 px-6 group cursor-pointer"
                >
                  <span>Test with your resume</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>100% In-memory execution</span>
                </div>
              </div>
            </div>

            {/* Architecture Telemetry Box */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-950 text-slate-300 font-mono text-xs border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-slate-400 text-[11px] font-semibold">
                  PIPELINE_TELEMETRY // LIVE
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <Zap className="w-3 h-3" /> Latency: {current.latency}
                </span>
              </div>

              <div className="space-y-2 text-[11px]">
                <div>
                  <span className="text-slate-500 block">STATUS:</span>
                  <span className="text-emerald-400 font-bold">READY / OPTIMIZED</span>
                </div>
                <div>
                  <span className="text-slate-500 block">OUTPUT ARTIFACT:</span>
                  <span className="text-indigo-300 break-words">{current.outputSample}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">ENCRYPTION:</span>
                  <span className="text-slate-400">Client-Ephemeral (No DB Persist)</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                <span>Model: Heuristic ATS + Gemini Flash</span>
                <span>Thread: Worker 01</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
