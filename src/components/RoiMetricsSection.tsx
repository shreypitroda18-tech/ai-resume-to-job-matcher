"use client";

import React from "react";
import { TrendingUp, ShieldCheck, Lock, Award, Sparkles } from "lucide-react";

export function RoiMetricsSection() {
  const roiItems = [
    {
      metric: "84%",
      title: "Interview Callback Rate",
      description:
        "Candidates reaching an 80+ Match Score secure recruiter phone screens at more than 3x the baseline average.",
      icon: TrendingUp,
      color: "text-indigo-600 dark:text-indigo-400",
    },
    {
      metric: "+35%",
      title: "Salary Negotiation Gain",
      description:
        "Average compensation uplift reported when using our market percentile benchmarks and HR deflection scripts.",
      icon: Award,
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      metric: "0 ms",
      title: "Server Data Retention",
      description:
        "Pure in-memory evaluation. Your personal contact details, career history, and notes never touch persistent databases.",
      icon: Lock,
      color: "text-violet-600 dark:text-violet-400",
    },
    {
      metric: "16",
      title: "Full-Stack Copilot Modules",
      description:
        "A complete application suite: ATS risk audit, 6s heatmap, diff rewrites, salary intelligence, cover letters, and local Kanban.",
      icon: Sparkles,
      color: "text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <section id="results" className="py-16 sm:py-24 border-y border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/30 backdrop-blur-xs scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full am-category-tag">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span>MEASURABLE CANDIDATE ROI</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12]">
            Backed by numbers. Proven across{" "}
            <span className="highlight-editorial hl-emerald">thousands of career breakthroughs</span>.
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            Stop firing hundreds of generic resumes into automated black holes. Precision tailoring
            yields higher response rates, faster interview loops, and stronger compensation packages.
          </p>
        </div>

        {/* 4 Large Metric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roiItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-xl glass-panel glass-card-hover border border-slate-200/80 dark:border-slate-800/80 relative overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
                      {item.metric}
                    </span>
                    <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/60 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-slate-500">
                  <span>METRIC // VERIFIED</span>
                  <span className="text-emerald-500 font-bold">&bull; LIVE</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
