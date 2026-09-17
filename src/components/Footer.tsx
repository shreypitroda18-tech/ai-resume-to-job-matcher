"use client";

import React from "react";
import { Sparkles, ShieldCheck, Github, Twitter, Linkedin, Heart } from "lucide-react";

interface FooterProps {
  onScrollToWorkspace: () => void;
  onLaunchBuilder: () => void;
  onOpenApiModal?: () => void;
}

export function Footer({ onScrollToWorkspace, onLaunchBuilder, onOpenApiModal }: FooterProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      onScrollToWorkspace();
    }
  };

  return (
    <footer className="border-t border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md pt-16 pb-12 text-slate-600 dark:text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-200/60 dark:border-slate-800/60">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4 pr-0 lg:pr-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-slate-950 via-indigo-950 to-violet-900 text-white flex items-center justify-center shadow-md">
                <Sparkles className="w-4 h-4 text-indigo-300" />
              </div>
              <span className="font-extrabold text-lg text-slate-950 dark:text-white tracking-tight">
                MatchPoint <span className="am-text-gradient">AI</span>
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              The AI career copilot that audits ATS format risks, simulates the recruiter’s 6-second
              glance, and generates Google X-Y-Z formula rewrites that land senior tech interviews.
            </p>

            {/* System Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-medium">All Systems Operational &bull; 100% In-Memory</span>
            </div>
          </div>

          {/* Col 1: Platform */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("feature-ats")}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  ATS Risk Diagnostic
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("feature-heatmap")}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  6-Second Heatmap
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("feature-rewrites")}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  Google X-Y-Z Rewrites
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("feature-salary")}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  Salary Intelligence
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onLaunchBuilder}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  Guided Resume Builder
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Solutions */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              Solutions
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("solutions")}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  Software Engineers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("solutions")}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  Career Switchers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("solutions")}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  Staff+ Leadership
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("solutions")}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  New Graduates
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("resources")}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  Career Guides &amp; Playbooks
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Trust */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              Trust &amp; Privacy
            </h4>
            <ul className="space-y-2">
              <li>
                <span className="text-slate-500">Zero Server Retention</span>
              </li>
              <li>
                <span className="text-slate-500">Client-Side Session Only</span>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenApiModal}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  Custom Gemini API Key
                </button>
              </li>
              <li>
                <span className="text-slate-500">Candidate First Pledge</span>
              </li>
              <li>
                <span className="text-slate-500">No Account Required</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-slate-500">
          <div className="flex items-center gap-2">
            <span>&copy; 2026 MatchPoint AI. Built for candidates worldwide.</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Workday, Greenhouse, Taleo &amp; Lever ATS Verified</span>
            <span>&bull;</span>
            <span>Client-side Ephemeral Processing</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
