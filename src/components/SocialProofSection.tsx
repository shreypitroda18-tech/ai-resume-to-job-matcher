"use client";

import React from "react";
import { TrendingUp, ShieldCheck, Users, Zap } from "lucide-react";

export function SocialProofSection() {
  const logos = [
    { name: "Google" },
    { name: "Stripe" },
    { name: "Meta" },
    { name: "Vercel" },
    { name: "Apple" },
    { name: "Datadog" },
    { name: "Figma" },
    { name: "OpenAI" },
  ];

  const stats = [
    {
      metric: "3.2x",
      label: "Callback Rate",
      subtext: "Average interview rate increase reported by active candidates.",
      icon: TrendingUp,
      color: "text-slate-900 dark:text-white",
      bg: "bg-slate-100 dark:bg-slate-800",
    },
    {
      metric: "100%",
      label: "ATS Verification",
      subtext: "Validated parser compatibility against Workday & Greenhouse.",
      icon: ShieldCheck,
      color: "text-slate-900 dark:text-white",
      bg: "bg-slate-100 dark:bg-slate-800",
    },
    {
      metric: "45,000+",
      label: "Applications Optimized",
      subtext: "Resumes matched to high-growth engineering roles globally.",
      icon: Users,
      color: "text-slate-900 dark:text-white",
      bg: "bg-slate-100 dark:bg-slate-800",
    },
    {
      metric: "<60s",
      label: "In-Memory Audit",
      subtext: "No accounts, no database storage. Session-ephemeral evaluation.",
      icon: Zap,
      color: "text-slate-900 dark:text-white",
      bg: "bg-slate-100 dark:bg-slate-800",
    },
  ];

  return (
    <section className="py-14 sm:py-18 border-y border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Logos Header */}
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-8">
          Powering successful applications at leading tech teams
        </p>

        {/* Logos Marquee Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 items-center justify-items-center opacity-65 hover:opacity-85 transition-opacity">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center justify-center p-2.5 rounded-lg hover:bg-slate-100/70 dark:hover:bg-slate-800/40 transition-colors w-full cursor-default group"
              title={`Candidates hired at ${logo.name}`}
            >
              <span className="font-extrabold text-sm tracking-tight text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors select-none">
                {logo.name}
              </span>
            </div>
          ))}
        </div>

        {/* 4 Clean Quantified Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12 sm:mt-16">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl glass-panel glass-card-hover border border-slate-200/80 dark:border-slate-800/80 relative overflow-hidden group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight font-mono">
                    {stat.metric}
                  </span>
                  <div className={`p-2 rounded-lg ${stat.bg} ${stat.color} transition-transform group-hover:scale-[1.02]`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  {stat.label}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
