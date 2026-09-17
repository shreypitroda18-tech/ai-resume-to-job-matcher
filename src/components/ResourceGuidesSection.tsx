"use client";

import React from "react";
import { BookOpen, ArrowUpRight, FileCode2, Target, DollarSign } from "lucide-react";

export function ResourceGuidesSection({ onScrollToWorkspace }: { onScrollToWorkspace: () => void }) {
  const guides = [
    {
      title: "The 2026 ATS Parser Deconstruction Guide",
      category: "TECHNICAL RESEARCH",
      readTime: "8 min read",
      icon: FileCode2,
      summary:
        "An in-depth technical breakdown of how Workday, Taleo, and Greenhouse parse resume PDFs, why multi-column tables fail, and how to guarantee 100% extraction.",
      badge: "ATS Integrity",
    },
    {
      title: "Google’s X-Y-Z Formula: 30 Real Engineering Bullet Diffs",
      category: "BULLET MASTERY",
      readTime: "12 min read",
      icon: Target,
      summary:
        "The definitive framework for converting passive duty descriptions into quantified executive accomplishments with hard latency, throughput, and velocity numbers.",
      badge: "Resume Craft",
    },
    {
      title: "The Senior Tech Compensation & Negotiation Playbook",
      category: "COMPENSATION STRATEGY",
      readTime: "10 min read",
      icon: DollarSign,
      summary:
        "How to deflect premature recruiter compensation traps, benchmark against 75th percentile market bands, and negotiate equity grants without friction.",
      badge: "Career Strategy",
    },
  ];

  return (
    <section id="resources" className="py-16 sm:py-24 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full am-category-tag">
              <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
              <span>CAREER PLAYBOOKS &amp; GUIDES</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12]">
              Master the modern hiring game with{" "}
              <span className="highlight-editorial hl-indigo">data-driven playbooks</span>.
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              Researched insights, parser deconstructions, and interview tactics written by experienced
              engineering leaders.
            </p>
          </div>

          <button
            type="button"
            onClick={onScrollToWorkspace}
            className="am-btn-secondary text-xs sm:text-sm py-2.5 px-6 self-start md:self-auto cursor-pointer"
          >
            <span>Explore All Analysis Features</span>
          </button>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guides.map((guide, idx) => {
            const Icon = guide.icon;
            return (
              <div
                key={idx}
                onClick={onScrollToWorkspace}
                className="p-7 rounded-xl glass-panel glass-card-hover border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between group cursor-pointer bg-white dark:bg-slate-900"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      {guide.category} &bull; {guide.readTime}
                    </span>
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/60 transition-colors">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {guide.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                    {guide.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {guide.badge}
                  </span>
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:underline">
                    Read Article &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
