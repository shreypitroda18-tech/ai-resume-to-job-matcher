"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  Eye,
  Flame,
  FileDiff,
  Check,
  DollarSign,
  TrendingUp,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  Zap,
  CheckCircle2,
  Copy,
} from "lucide-react";

export function FeatureStorytellingSections({ onScrollToWorkspace }: { onScrollToWorkspace: () => void }) {
  // Feature 2: Heatmap toggle state
  const [heatmapActive, setHeatmapActive] = useState(true);

  // Feature 3: Diff rewrite toggle state
  const [diffApplied, setDiffApplied] = useState(false);
  const [copiedDiff, setCopiedDiff] = useState(false);

  // Feature 4: Salary tier state
  const [salaryTier, setSalaryTier] = useState<"mid" | "senior" | "lead">("senior");

  const handleCopyDiff = () => {
    navigator.clipboard.writeText(
      "Architected distributed event-driven processing pipeline using Kafka & Go, reducing end-to-end ingestion latency by 42% across 25M daily transactions."
    );
    setCopiedDiff(true);
    setTimeout(() => setCopiedDiff(false), 2000);
  };

  return (
    <div id="features" className="space-y-32 sm:space-y-44 py-16 sm:py-24 overflow-hidden scroll-mt-24">
      {/* ========================================================================= */}
      {/* SECTION 1: ATS FORMAT RISK (Copy Left, Visual Right) */}
      {/* ========================================================================= */}
      <section id="feature-ats" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Copy Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full am-category-tag">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
              <span>PARSING INTEGRITY AUDIT</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12]">
              Eliminate silent ATS rejections{" "}
              <span className="highlight-editorial hl-indigo">before a human ever sees your file</span>.
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Applicant Tracking Systems like Workday, Taleo, and Greenhouse frequently scramble
              multi-column tables, floating text boxes, and complex header structures. MatchPoint AI
              stress-tests your document against standard parser models, flagging structural bugs
              that cause immediate automated rejection.
            </p>

            <ul className="space-y-3.5 pt-2">
              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                <div className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong className="text-slate-900 dark:text-white font-semibold">
                    Multi-column &amp; table extraction check:
                  </strong>{" "}
                  Detects text stream collisions that mix job titles with company descriptions.
                </span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                <div className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong className="text-slate-900 dark:text-white font-semibold">
                    Header &amp; contact parsing audit:
                  </strong>{" "}
                  Verifies email, phone, LinkedIn, and GitHub links parse without truncation.
                </span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                <div className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong className="text-slate-900 dark:text-white font-semibold">
                    Keyword stuffing penalty guard:
                  </strong>{" "}
                  Flags repetitive, hidden, or ungrounded skill dumps that trigger spam filters.
                </span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onScrollToWorkspace}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group cursor-pointer"
              >
                <span>Audit your resume file now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Interactive Visual Column */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl p-6 sm:p-7 glass-panel border border-slate-200/80 dark:border-slate-800/80 shadow-2xl relative overflow-hidden bg-white/70 dark:bg-slate-900/60 backdrop-blur-md">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200/60 dark:border-slate-800/60">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    ATS_AUDIT_REPORT // WORKDAY_GEN4
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  LOW RISK &bull; 98% PARSE RATE
                </span>
              </div>

              {/* Diagnostic Checklist */}
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      Single-column linear text flow
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    PASSED
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      Standard section taxonomy (Experience, Education, Skills)
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    100% MATCH
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/40 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="font-medium text-amber-900 dark:text-amber-200">
                      Table tags detected in Skills section
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-amber-700 dark:text-amber-400 font-semibold">
                    AUTO-FLATTENED
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      Contact hyperlinks &amp; clean URL protocol
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    VERIFIED
                  </span>
                </div>
              </div>

              {/* Extracted Stream Preview Box */}
              <div className="mt-4 p-3.5 rounded-xl bg-slate-900 text-slate-300 font-mono text-[11px] leading-relaxed">
                <span className="text-slate-500 block text-[10px] mb-1">
                  PARSER STREAM OUTPUT (Raw Tokenizer):
                </span>
                <span className="text-emerald-400">[Name: Alex Vance]</span> &bull;{" "}
                <span className="text-indigo-400">[Title: Senior Distributed Systems Engineer]</span>{" "}
                &bull; <span className="text-violet-400">[Skills: Kafka, Go, Rust, K8s, gRPC]</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: 6-SECOND HEATMAP GLANCE (Visual Left, Copy Right) */}
      {/* ========================================================================= */}
      <section id="feature-heatmap" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Interactive Visual Column (Left on Desktop) */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-2xl p-6 sm:p-7 glass-panel border border-slate-200/80 dark:border-slate-800/80 shadow-2xl relative overflow-hidden bg-white/70 dark:bg-slate-900/60 backdrop-blur-md">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200/60 dark:border-slate-800/60">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-rose-500" />
                  <span className="text-xs font-semibold text-slate-900 dark:text-white">
                    Gaze Tracking Simulation
                  </span>
                </div>
                <button
                  onClick={() => setHeatmapActive(!heatmapActive)}
                  className="px-3 py-1 rounded-full text-xs font-semibold transition-all bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                >
                  {heatmapActive ? "Hide Heatmap" : "Show Heatmap"}
                </button>
              </div>

              {/* Document Mockup with Heatmap Overlay */}
              <div className="relative p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-4">
                {/* Simulated Header */}
                <div className="relative">
                  <div
                    className={`transition-opacity duration-300 ${
                      heatmapActive ? "opacity-100" : "opacity-0"
                    } absolute -inset-2 bg-rose-500/20 rounded-lg blur-sm pointer-events-none`}
                  />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Staff Infrastructure Engineer
                  </h4>
                  <p className="text-[11px] text-slate-500">San Francisco, CA &bull; (415) 555-0192</p>
                </div>

                {/* Simulated Bullet 1: In Prime F-Pattern Zone (Hot) */}
                <div className="relative p-2.5 rounded-lg border border-slate-100 dark:border-slate-800/60">
                  <div
                    className={`transition-opacity duration-300 ${
                      heatmapActive ? "opacity-100" : "opacity-0"
                    } absolute inset-0 bg-gradient-to-r from-rose-500/30 via-amber-500/20 to-transparent rounded-lg pointer-events-none`}
                  />
                  <div className="relative">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      Primary Focus (0.8s - 2.2s):
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 text-[11px] mt-0.5">
                      Scaled high-frequency streaming pipeline to{" "}
                      <span className="font-bold text-rose-600 dark:text-rose-400">
                        1.2M queries/sec
                      </span>
                      , achieving 99.999% uptime during peak holiday load.
                    </p>
                  </div>
                </div>

                {/* Simulated Bullet 2: Middle Scan Zone (Warm) */}
                <div className="relative p-2.5 rounded-lg border border-slate-100 dark:border-slate-800/60">
                  <div
                    className={`transition-opacity duration-300 ${
                      heatmapActive ? "opacity-100" : "opacity-0"
                    } absolute inset-0 bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-transparent rounded-lg pointer-events-none`}
                  />
                  <div className="relative">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      Secondary Scan (2.2s - 4.1s):
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 text-[11px] mt-0.5">
                      Mentored 8 senior engineers and authored RFC for unified microservice deployment standard across 4 global regions.
                    </p>
                  </div>
                </div>

                {/* Simulated Bullet 3: Low Attention Zone (Cool) */}
                <div className="relative p-2.5 rounded-lg border border-slate-100 dark:border-slate-800/60">
                  <div
                    className={`transition-opacity duration-300 ${
                      heatmapActive ? "opacity-100" : "opacity-0"
                    } absolute inset-0 bg-blue-500/10 rounded-lg pointer-events-none`}
                  />
                  <div className="relative">
                    <span className="font-semibold text-slate-500">
                      Peripheral Glance (4.1s - 6.0s):
                    </span>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      Participated in sprint planning, managed Jira backlogs, and conducted daily standups.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> High Focus (Top 35%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Moderate
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Peripheral
                </span>
              </div>
            </div>
          </div>

          {/* Copy Column */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full am-category-tag">
              <Eye className="w-3.5 h-3.5 text-indigo-500" />
              <span>RECRUITER VISION HEURISTICS</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12]">
              Win the recruiter’s{" "}
              <span className="highlight-editorial hl-rose">crucial 6-second glance</span>.
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Eye-tracking studies prove recruiters review resumes in an asymmetric F-pattern,
              spending only 6 to 7.4 seconds deciding whether to shortlist or reject. MatchPoint AI
              simulates this cognitive triage to ensure your most impressive metrics occupy the
              high-probability gaze zones.
            </p>

            <ul className="space-y-3.5 pt-2">
              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                <div className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong className="text-slate-900 dark:text-white font-semibold">
                    F-Pattern gaze prediction:
                  </strong>{" "}
                  Places primary achievements on the left margin where eye sweeps begin.
                </span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                <div className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong className="text-slate-900 dark:text-white font-semibold">
                    Bury-the-lede prevention:
                  </strong>{" "}
                  Catches huge metric gains buried at the end of 3-line descriptive paragraphs.
                </span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                <div className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong className="text-slate-900 dark:text-white font-semibold">
                    Visual density leveling:
                  </strong>{" "}
                  Balances line lengths and white space to prevent visual fatigue.
                </span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onScrollToWorkspace}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group cursor-pointer"
              >
                <span>Simulate your resume glance</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: WORD-LEVEL GOOGLE X-Y-Z DIFF REWRITES (Copy Left, Visual Right) */}
      {/* ========================================================================= */}
      <section id="feature-rewrites" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Copy Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full am-category-tag">
              <FileDiff className="w-3.5 h-3.5 text-violet-500" />
              <span>GOOGLE X-Y-Z FORMULA</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12]">
              Elevate passive bullet points into{" "}
              <span className="highlight-editorial hl-emerald">quantified executive wins</span>.
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Most candidates make the fatal mistake of listing daily tasks instead of accomplishments.
              MatchPoint AI rewrites weak bullets using Google’s gold-standard formula:
              <em> &ldquo;Accomplished [X] as measured by [Y], by doing [Z]&rdquo;</em>, highlighting
              exact word deletions and additions with diff clarity.
            </p>

            <ul className="space-y-3.5 pt-2">
              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                <div className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong className="text-slate-900 dark:text-white font-semibold">
                    Word-level diff visualization:
                  </strong>{" "}
                  See red strike-throughs of weak verbs and green highlights of high-impact metrics.
                </span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                <div className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong className="text-slate-900 dark:text-white font-semibold">
                    JD keyword alignment:
                  </strong>{" "}
                  Injects specific tools, frameworks, and domain verbs requested in the target role.
                </span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                <div className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong className="text-slate-900 dark:text-white font-semibold">
                    1-Click copy &amp; apply:
                  </strong>{" "}
                  Instantly paste rewrites directly into your resume or live in-editor preview.
                </span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onScrollToWorkspace}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group cursor-pointer"
              >
                <span>Generate rewrites for your resume</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Interactive Visual Column */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl p-6 sm:p-7 glass-panel border border-slate-200/80 dark:border-slate-800/80 shadow-2xl relative overflow-hidden bg-white/70 dark:bg-slate-900/60 backdrop-blur-md">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200/60 dark:border-slate-800/60">
                <span className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-500" />
                  Live Bullet Transformer
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDiffApplied(!diffApplied)}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors cursor-pointer"
                  >
                    {diffApplied ? "View Original" : "View Elevated"}
                  </button>
                  <button
                    onClick={handleCopyDiff}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                    title="Copy bullet"
                  >
                    {copiedDiff ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Before vs After View */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">
                      Original Weak Bullet (Score: 42/100)
                    </span>
                    <span className="text-[10px] text-rose-600 dark:text-rose-400 font-medium">
                      Passive &bull; No metrics
                    </span>
                  </div>
                  <p className="text-xs text-rose-950 dark:text-rose-200 leading-relaxed">
                    &ldquo;Was responsible for working on the backend data pipeline using Kafka and Go
                    to make sure things ran faster for users.&rdquo;
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-900/60 shadow-sm">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                      Google X-Y-Z Elevated Bullet (Score: 96/100)
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                      +54 pts &bull; Quantified impact
                    </span>
                  </div>
                  <p className="text-xs text-emerald-950 dark:text-emerald-100 leading-relaxed font-medium">
                    &ldquo;Architected distributed event-driven processing pipeline using{" "}
                    <span className="underline decoration-emerald-500 font-bold">Kafka &amp; Go</span>
                    , reducing end-to-end ingestion latency by{" "}
                    <span className="underline decoration-emerald-500 font-bold">42%</span> across{" "}
                    <span className="underline decoration-emerald-500 font-bold">
                      25M daily transactions
                    </span>
                    .&rdquo;
                  </p>
                </div>
              </div>

              {/* Rationale Pill */}
              <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed">
                  <strong>Why this wins:</strong> Replaces passive duty language (&ldquo;was
                  responsible for&rdquo;) with an executive action verb (&ldquo;architected&rdquo;) and
                  injects hard throughput and latency numbers.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: SALARY INTELLIGENCE & NEGOTIATION (Visual Left, Copy Right) */}
      {/* ========================================================================= */}
      <section id="feature-salary" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Interactive Visual Column (Left on Desktop) */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-2xl p-6 sm:p-7 glass-panel border border-slate-200/80 dark:border-slate-800/80 shadow-2xl relative overflow-hidden bg-white/70 dark:bg-slate-900/60 backdrop-blur-md">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200/60 dark:border-slate-800/60">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-semibold text-slate-900 dark:text-white">
                    Market Compensation Benchmarks
                  </span>
                </div>
                <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 text-xs">
                  <button
                    onClick={() => setSalaryTier("mid")}
                    className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                      salaryTier === "mid"
                        ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                        : "text-slate-500"
                    }`}
                  >
                    Mid-Level
                  </button>
                  <button
                    onClick={() => setSalaryTier("senior")}
                    className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                      salaryTier === "senior"
                        ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                        : "text-slate-500"
                    }`}
                  >
                    Senior
                  </button>
                  <button
                    onClick={() => setSalaryTier("lead")}
                    className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                      salaryTier === "lead"
                        ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                        : "text-slate-500"
                    }`}
                  >
                    Staff / Lead
                  </button>
                </div>
              </div>

              {/* Dynamic Compensation Numbers */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-500">Target Median Comp:</span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    {salaryTier === "mid"
                      ? "$165,000 / yr"
                      : salaryTier === "senior"
                      ? "$225,000 / yr"
                      : "$295,000 / yr"}
                  </span>
                </div>

                {/* Breakdown bars */}
                <div className="space-y-2 pt-2 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                      <span>Base Salary:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {salaryTier === "mid" ? "$145k" : salaryTier === "senior" ? "$190k" : "$235k"}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full w-[70%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                      <span>Annual Equity (RSU/Options):</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {salaryTier === "mid" ? "$20k" : salaryTier === "senior" ? "$35k" : "$60k"}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full bg-violet-500 rounded-full w-[45%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recruiter Talking Point Preview */}
              <div className="mt-4 p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/70 dark:border-indigo-900/60 text-xs">
                <span className="font-bold text-indigo-900 dark:text-indigo-200 block mb-1">
                  Recruiter Screening Counter-Script:
                </span>
                <p className="text-indigo-800 dark:text-indigo-300 text-[11px] leading-relaxed italic">
                  &ldquo;Given the core scope involving architecture of high-throughput distributed
                  systems and team mentorship, I am targeting opportunities in the{" "}
                  {salaryTier === "mid"
                    ? "$155k - $175k"
                    : salaryTier === "senior"
                    ? "$215k - $240k"
                    : "$285k - $320k"}{" "}
                  total compensation range, contingent on equity structure.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Copy Column */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full am-category-tag">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              <span>MARKET COMPENSATION INTEL</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12]">
              Never undersell yourself in the{" "}
              <span className="highlight-editorial hl-teal">first recruiter phone screen</span>.
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Salary negotiation begins the moment a recruiter asks: &ldquo;What are your salary
              expectations?&rdquo; MatchPoint AI maps your matched skill competencies, seniority
              level, and geography against current market bands, arming you with word-for-word scripts
              that defend your market value.
            </p>

            <ul className="space-y-3.5 pt-2">
              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                <div className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong className="text-slate-900 dark:text-white font-semibold">
                    Percentile-accurate market ranges:
                  </strong>{" "}
                  View 25th, 50th, 75th, and 90th percentile comp splits across base and equity.
                </span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                <div className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong className="text-slate-900 dark:text-white font-semibold">
                    Custom negotiation counter-scripts:
                  </strong>{" "}
                  Deflect premature salary lock-in without alienating the hiring team.
                </span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                <div className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong className="text-slate-900 dark:text-white font-semibold">
                    Role level calibration:
                  </strong>{" "}
                  Detects if the JD’s responsibilities justify a higher level and compensation band.
                </span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onScrollToWorkspace}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group cursor-pointer"
              >
                <span>Check your role market comp</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
