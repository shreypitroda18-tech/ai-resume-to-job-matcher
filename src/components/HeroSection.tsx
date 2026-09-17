"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Flame,
  CheckCircle2,
  DollarSign,
  Zap,
  Lock,
  ChevronRight,
  FileDown,
  Building,
  Target,
  FileCheck2,
  Cpu,
} from "lucide-react";

interface HeroSectionProps {
  onScrollToWorkspace: () => void;
  onLaunchBuilder: () => void;
}

export function HeroSection({ onScrollToWorkspace, onLaunchBuilder }: HeroSectionProps) {
  const [activeMockTab, setActiveMockTab] = useState<"diagnostic" | "heatmap" | "diff" | "salary">("diagnostic");
  const [isAccepted, setIsAccepted] = useState(true);

  return (
    <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      {/* Editorial Hero Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 animate-fade-up">
        {/* Category Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full am-category-tag shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          <span>AI CAREER COPILOT &bull; PROVEN 3.2X CALLBACK ADVANTAGE</span>
        </div>

        {/* Large Editorial Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.08] max-w-4xl mx-auto">
          Turn resume guesswork into an{" "}
          <span className="highlight-editorial hl-amber">unfair hiring advantage</span>.
        </h1>

        {/* Supporting Narrative */}
        <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          The all-in-one AI career copilot that audits ATS format risks, simulates the recruiter’s 6-second glance, and generates Google X-Y-Z formula rewrites that land senior interviews.
        </p>

        {/* Dual High-Impact Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <button
            onClick={onScrollToWorkspace}
            className="am-btn-primary text-sm sm:text-base py-3.5 px-8 w-full sm:w-auto shadow-xl group"
          >
            <span>Analyze My Resume Free</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onLaunchBuilder}
            className="am-btn-secondary text-sm sm:text-base py-3.5 px-7 w-full sm:w-auto"
          >
            <span>Build Resume from Scratch</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-500 dark:text-slate-400 pt-2 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            0 Data Retained / Session-Only
          </span>
          <span className="hidden sm:inline">&bull;</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            No Account or Sign-Up Needed
          </span>
          <span className="hidden sm:inline">&bull;</span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            Instant Heuristic + Gemini AI
          </span>
        </div>
      </div>

      {/* INTERACTIVE PRODUCT VISUALIZATION (Amplemarket Style) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-16">
        <div className="rounded-2xl glass-panel shadow-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 transition-all duration-300">
          {/* macOS Browser Chrome */}
          <div className="px-4 py-3 bg-slate-100/80 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-3 text-[11px] font-mono text-slate-400 hidden sm:inline">
                matchpoint.ai/live-demo/senior-software-engineer
              </span>
            </div>

            {/* Mockup Interactive Tabs */}
            <div className="flex items-center gap-1 bg-white/70 dark:bg-slate-800/80 p-0.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-xs">
              <button
                onClick={() => setActiveMockTab("diagnostic")}
                className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  activeMockTab === "diagnostic"
                    ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-xs"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Match Score
              </button>
              <button
                onClick={() => setActiveMockTab("heatmap")}
                className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  activeMockTab === "heatmap"
                    ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-xs"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                6s Heatmap
              </button>
              <button
                onClick={() => setActiveMockTab("diff")}
                className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  activeMockTab === "diff"
                    ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-xs"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Diff Rewrite
              </button>
              <button
                onClick={() => setActiveMockTab("salary")}
                className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  activeMockTab === "salary"
                    ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-xs"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Salary Intel
              </button>
            </div>
          </div>

          {/* Interactive Window Canvas */}
          <div className="p-6 sm:p-8 bg-slate-50/50 dark:bg-slate-950/60 min-h-[420px]">
            {/* TAB 1: Match Diagnostic */}
            {activeMockTab === "diagnostic" && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center animate-in fade-in duration-200">
                {/* Left: Score Dial & Profile */}
                <div className="md:col-span-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3 shadow-sm">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Live Fit Score
                  </div>
                  <div className="text-5xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight font-mono">
                    92<span className="text-xl text-slate-400">/100</span>
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                    Top 5% Candidate Fit
                  </span>
                  <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800 text-left">
                    <div className="flex justify-between py-1">
                      <span>Skills Overlap:</span>
                      <strong className="text-slate-900 dark:text-white font-mono">94%</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Experience Alignment:</span>
                      <strong className="text-slate-900 dark:text-white font-mono">90%</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>ATS Safety Score:</span>
                      <strong className="text-emerald-600 font-mono">100% Pass</strong>
                    </div>
                  </div>
                </div>

                {/* Right: Skills & Breakdown */}
                <div className="md:col-span-8 space-y-4">
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Target Role Match
                        </span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
                          Stripe &bull; Core Infrastructure SWE
                        </span>
                      </div>
                      <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> High Callback Odds
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Your 5+ years building distributed Go and TypeScript microservices directly match Stripe’s high-throughput billing systems. Rephrasing 2 database bullets pushes your profile above the senior engineering threshold.
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                        ✓ Go / Golang (Matched)
                      </span>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                        ✓ Redis / Distributed Caching (Matched)
                      </span>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                        ✓ High-Availability Architecture (Matched)
                      </span>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                        + Kubernetes Mesh (Add to Bullet 3)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: 6-Second Glance Heatmap */}
            {activeMockTab === "heatmap" && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center animate-in fade-in duration-200">
                <div className="md:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative overflow-hidden font-mono text-[11px] leading-relaxed select-none shadow-sm min-h-[300px]">
                  <div className="absolute top-4 left-6 w-32 h-16 bg-red-500/20 rounded-full filter blur-xl" />
                  <div className="absolute top-14 left-8 w-48 h-16 bg-amber-500/25 rounded-full filter blur-xl" />
                  <div className="absolute top-28 left-6 w-36 h-16 bg-blue-500/20 rounded-full filter blur-md" />

                  {/* Fixation 1 */}
                  <div className="absolute top-6 left-12 flex items-center gap-1.5 z-10">
                    <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-[10px] shadow-md">
                      1
                    </span>
                    <span className="bg-slate-900 text-white px-2 py-0.5 rounded text-[10px] font-sans">
                      Senior Software Engineer (0.8s)
                    </span>
                  </div>

                  {/* Fixation 2 */}
                  <div className="absolute top-20 left-16 flex items-center gap-1.5 z-10">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-[10px] shadow-lg">
                      2
                    </span>
                    <span className="bg-slate-900 text-white px-2 py-0.5 rounded text-[10px] font-sans">
                      p95 latency reduced 800ms &rarr; 120ms (1.6s)
                    </span>
                  </div>

                  {/* Simulated Resume Lines */}
                  <div className="opacity-70 space-y-2 font-sans pt-1">
                    <div className="font-bold text-slate-900 dark:text-white text-xs">
                      ALEX RIVERA &bull; SENIOR INFRASTRUCTURE ENGINEER
                    </div>
                    <div className="text-slate-600 dark:text-slate-400 text-xs">
                      TechCorp &bull; 2021 &ndash; Present
                    </div>
                    <div className="text-slate-700 dark:text-slate-300 text-xs pl-2">
                      &bull; Architected distributed Redis caching cluster handling 40,000 req/sec...
                    </div>
                    <div className="text-slate-700 dark:text-slate-300 text-xs pl-2">
                      &bull; Migrated Postgres schema zero-downtime over 250M rows...
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5 space-y-4">
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400">
                        <Flame className="w-4 h-4" />
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        Above-The-Fold Score: 88/100
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      Recruiters spend 80% of their initial 6-second triage scan above the first-page fold. Your core quantified metrics catch immediate retention.
                    </p>
                    <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-800 dark:text-amber-200">
                      <strong>Buried Metric Fixed:</strong> Moved 40,000 req/sec achievement from line 4 to line 1.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Diff Rewrite */}
            {activeMockTab === "diff" && (
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      Google X-Y-Z Rewrite Suggestion
                    </span>
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono text-slate-600 dark:text-slate-400">
                      Target: Redis Throughput
                    </span>
                  </div>

                  <button
                    onClick={() => setIsAccepted(!isAccepted)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      isAccepted
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {isAccepted ? "✓ Accepted for Export" : "Accept Rewrite"}
                  </button>
                </div>

                <div className="space-y-3 font-sans text-xs">
                  <div className="p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 text-slate-600 dark:text-slate-400">
                    <div className="text-[10px] uppercase font-bold text-rose-500 mb-1">
                      Before (Weak Responsibility Description)
                    </div>
                    <span className="line-through opacity-75">
                      Responsible for caching systems and helping optimize slow backend database queries.
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-300/80 dark:border-emerald-800/80 text-slate-900 dark:text-white">
                    <div className="text-[10px] uppercase font-bold text-emerald-600 mb-1">
                      After (Quantified Google X-Y-Z Impact)
                    </div>
                    <span>
                      <strong className="text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/60 px-1 rounded">
                        Architected and deployed distributed Redis cluster
                      </strong>
                      , reducing p95 query latency from 800ms to 120ms and supporting 40,000 req/sec during peak traffic.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Salary Intel */}
            {activeMockTab === "salary" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center animate-in fade-in duration-200">
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    25th Percentile
                  </div>
                  <div className="text-2xl font-black text-slate-700 dark:text-slate-200 font-mono mt-1">
                    $158,000
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Base entry band</div>
                </div>

                <div className="p-5 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 shadow-sm">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex justify-between">
                    <span>50th (Market Median)</span>
                    <span className="text-[9px] bg-indigo-200 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-1 rounded">
                      TARGET
                    </span>
                  </div>
                  <div className="text-3xl font-black text-indigo-700 dark:text-indigo-300 font-mono mt-1">
                    $178,000
                  </div>
                  <div className="text-[11px] text-indigo-600 dark:text-indigo-300 mt-1">
                    San Francisco, CA / Remote
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 shadow-sm">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex justify-between">
                    <span>75th Percentile</span>
                    <span className="text-[9px] bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-1 rounded">
                      MATCH FIT
                    </span>
                  </div>
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1">
                    $195,000
                  </div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-300 mt-1">
                    With Go/Redis match justification
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
