"use client";

import React, { useState } from "react";
import { Sparkles, Trophy, Plus, Trash2, ArrowRight } from "lucide-react";
import { RoleComparisonItem } from "@/lib/types";
import { compareMultipleRoles } from "@/lib/heuristic-matcher";
import { SAMPLE_PRESETS } from "@/lib/sample-data";

interface RoleComparisonViewProps {
  resumeText: string;
}

export function RoleComparisonView({ resumeText }: RoleComparisonViewProps) {
  const [roles, setRoles] = useState<
    { id: string; title: string; company: string; text: string }[]
  >([
    {
      id: "role-1",
      title: "Senior Full-Stack Engineer",
      company: "CloudScale SaaS",
      text: SAMPLE_PRESETS[0].jobDescriptionText,
    },
    {
      id: "role-2",
      title: "Enterprise Platform Engineer",
      company: "Apex Systems",
      text: `Platform Software Engineer

Requirements:
- 5+ years building distributed backend infrastructure with Node.js and Go.
- Kubernetes, Docker containerization, and Terraform.
- Microservices, Kafka messaging, and PostgreSQL database performance tuning.
- AWS cloud architecture, CI/CD pipeline automation with GitHub Actions.
- Mentorship and technical leadership for junior engineers.`,
    },
  ]);

  const [comparisons, setComparisons] = useState<RoleComparisonItem[]>(() =>
    compareMultipleRoles(
      resumeText,
      roles.map((r) => ({ id: r.id, text: r.text, label: r.title }))
    )
  );

  const handleRunComparison = () => {
    const valid = roles.filter((r) => r.text.trim().length > 30);
    const results = compareMultipleRoles(
      resumeText,
      valid.map((r) => ({ id: r.id, text: r.text, label: r.title }))
    );
    setComparisons(results);
  };

  const handleAddRole = () => {
    if (roles.length >= 3) return;
    const newId = `role-${roles.length + 1}`;
    setRoles([
      ...roles,
      {
        id: newId,
        title: `Target Role #${roles.length + 1}`,
        company: "Company",
        text: "",
      },
    ]);
  };

  const handleRemoveRole = (id: string) => {
    if (roles.length <= 1) return;
    const next = roles.filter((r) => r.id !== id);
    setRoles(next);
    setComparisons(
      compareMultipleRoles(
        resumeText,
        next.map((r) => ({ id: r.id, text: r.text, label: r.title }))
      )
    );
  };

  const handleUpdateRoleText = (id: string, text: string) => {
    setRoles(roles.map((r) => (r.id === id ? { ...r, text } : r)));
  };

  const handleUpdateRoleTitle = (id: string, title: string) => {
    setRoles(roles.map((r) => (r.id === id ? { ...r, title } : r)));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Banner */}
      <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/70 dark:border-indigo-800/40 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0" />
        <div className="text-xs sm:text-sm text-indigo-950 dark:text-indigo-200">
          <span className="font-semibold block mb-0.5">
            Multi-Role Target Comparison Matrix
          </span>
          Applying to multiple positions? Compare your resume against 2 or 3 job descriptions side-by-side to identify where your current callback odds are highest.
        </div>
      </div>

      {/* Comparison Results Cards */}
      {comparisons.length > 0 && (
        <div className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Side-by-Side Match Matrix
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {comparisons.map((item) => (
              <div
                key={item.id}
                className={`rounded-2xl border p-6 flex flex-col justify-between transition-all relative ${
                  item.isHighestOdds
                    ? "bg-white dark:bg-slate-900 border-emerald-500 ring-2 ring-emerald-500/20 shadow-lg"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm"
                }`}
              >
                {item.isHighestOdds && (
                  <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-emerald-600 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <Trophy className="w-3 h-3" /> Highest Callback Odds
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-base text-slate-900 dark:text-white line-clamp-1">
                      {item.roleTitle}
                    </h4>
                    <p className="text-xs text-slate-400">{item.company}</p>
                  </div>

                  {/* Score Gauge */}
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`text-4xl font-extrabold ${
                        item.overallScore >= 80
                          ? "text-emerald-600 dark:text-emerald-400"
                          : item.overallScore >= 60
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-amber-500"
                      }`}
                    >
                      {item.overallScore}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">/100 Fit Score</span>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                      <span className="text-slate-400 block text-[10px] uppercase">Skills Overlap</span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {item.skillsScore}%
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                      <span className="text-slate-400 block text-[10px] uppercase">Experience Fit</span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {item.experienceScore}%
                      </span>
                    </div>
                  </div>

                  {/* Top Missing Gaps */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Top Missing Skills:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.topMissingSkills.length > 0 ? (
                        item.topMissingSkills.map((gap, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded text-[11px] font-medium bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200/50 dark:border-rose-900/40"
                          >
                            {gap}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-emerald-600">No major gaps detected</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                  {item.fitSummary}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inputs Section */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Job Descriptions ({roles.length}/3)
          </h3>
          {roles.length < 3 && (
            <button
              type="button"
              onClick={handleAddRole}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Another Job Posting
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((r, idx) => (
            <div
              key={r.id}
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={r.title}
                  onChange={(e) => handleUpdateRoleTitle(r.id, e.target.value)}
                  placeholder="Job Title"
                  className="font-semibold text-xs text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-500 focus:outline-none w-full"
                />
                {roles.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveRole(r.id)}
                    className="text-slate-400 hover:text-rose-500 ml-2"
                    title="Remove role"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <textarea
                value={r.text}
                onChange={(e) => handleUpdateRoleText(r.id, e.target.value)}
                rows={7}
                placeholder={`Paste Job Description #${idx + 1} text here...`}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-xs font-mono resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={handleRunComparison}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
          >
            <span>Recalculate Comparison Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
