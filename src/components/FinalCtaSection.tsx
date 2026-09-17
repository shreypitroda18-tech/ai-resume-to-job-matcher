"use client";

import React from "react";
import { ArrowRight, ShieldCheck, Lock, Zap } from "lucide-react";

interface FinalCtaSectionProps {
  onScrollToWorkspace: () => void;
  onLaunchBuilder: () => void;
}

export function FinalCtaSection({ onScrollToWorkspace, onLaunchBuilder }: FinalCtaSectionProps) {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl p-6 sm:p-12 lg:p-16 overflow-hidden bg-slate-950 text-white border border-slate-800 shadow-xl">
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wider uppercase text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>START IN UNDER 60 SECONDS</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Ready to turn resume guesswork into{" "}
              <span className="highlight-editorial hl-gold">senior interview offers</span>?
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
              Eliminate silent ATS rejections, optimize for the recruiter&apos;s 6-second scan, and
              submit Google X-Y-Z rewritten bullets backed by real market compensation data.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
              <button
                type="button"
                onClick={onScrollToWorkspace}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-sm sm:text-base bg-white text-slate-950 hover:bg-slate-100 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Analyze My Resume Free</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={onLaunchBuilder}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full font-semibold text-sm sm:text-base bg-white/10 hover:bg-white/15 text-white border border-white/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Build from Scratch</span>
              </button>
            </div>

            {/* Guarantee Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Free &amp; Open</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-slate-300" />
                <span>Zero Server Data Retention</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Instant In-Memory Heuristics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
