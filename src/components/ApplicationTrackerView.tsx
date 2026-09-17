"use client";

import React, { useState, useEffect } from "react";
import { ApplicationTrackerItem, ApplicationStatus, MatchAnalysisResult } from "@/lib/types";
import {
  loadApplicationsFromStorage,
  saveApplicationToStorage,
  updateApplicationStatusInStorage,
  deleteApplicationFromStorage,
} from "@/lib/app-tracker";
import {
  Kanban,
  Plus,
  Trash2,
  ExternalLink,
  Lock,
  ArrowRight,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle,
} from "lucide-react";

interface ApplicationTrackerViewProps {
  currentMatchResult?: MatchAnalysisResult;
  currentRoleTitle?: string;
  currentCompanyName?: string;
}

const COLUMNS: { id: ApplicationStatus; label: string; color: string; badgeBg: string }[] = [
  { id: "tailored", label: "Tailored", color: "border-slate-300 dark:border-slate-700", badgeBg: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300" },
  { id: "applied", label: "Applied", color: "border-blue-300 dark:border-blue-800", badgeBg: "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300" },
  { id: "interviewing", label: "Interviewing", color: "border-amber-300 dark:border-amber-800", badgeBg: "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300" },
  { id: "offer", label: "Offer", color: "border-emerald-300 dark:border-emerald-800", badgeBg: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300" },
];

export function ApplicationTrackerView({
  currentMatchResult,
  currentRoleTitle,
  currentCompanyName,
}: ApplicationTrackerViewProps) {
  const [items, setItems] = useState<ApplicationTrackerItem[]>([]);
  const [isSavedCurrent, setIsSavedCurrent] = useState(false);
  const [activeModalItem, setActiveModalItem] = useState<ApplicationTrackerItem | null>(null);

  useEffect(() => {
    setItems(loadApplicationsFromStorage());
  }, []);

  const handleSaveCurrent = () => {
    if (!currentMatchResult) return;

    const company = currentCompanyName || "Target Company";
    const role = currentRoleTitle || currentMatchResult.salaryIntelligence?.jobTitle || "Target Role";
    const newItem: ApplicationTrackerItem = {
      id: `app_${Date.now()}`,
      company,
      roleTitle: role,
      matchScore: currentMatchResult.scoreBreakdown.overallScore,
      status: "tailored",
      dateAdded: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      jobDescriptionText: currentMatchResult.rawJobDescriptionText || currentMatchResult.jobDescriptionText || "",
      tailoredResumeText: currentMatchResult.rawResumeText || currentMatchResult.resumeText || "",
    };

    const updated = saveApplicationToStorage(newItem);
    setItems(updated);
    setIsSavedCurrent(true);
    setTimeout(() => setIsSavedCurrent(false), 3000);
  };

  const handleMoveStatus = (id: string, newStatus: ApplicationStatus) => {
    const updated = updateApplicationStatusInStorage(id, newStatus);
    setItems(updated);
  };

  const handleDelete = (id: string) => {
    const updated = deleteApplicationFromStorage(id);
    setItems(updated);
    if (activeModalItem?.id === id) {
      setActiveModalItem(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                <Kanban className="w-5 h-5" />
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Private Local Application Tracker
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Zero-Cloud Privacy
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Track your tailored applications through every hiring stage. Data is stored entirely in your local browser sandbox—never sent to any database.
            </p>
          </div>

          {currentMatchResult && (
            <button
              onClick={handleSaveCurrent}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all shrink-0 ${
                isSavedCurrent
                  ? "bg-emerald-600 text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              {isSavedCurrent ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Saved to Kanban!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Save Current Match to Tracker</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {COLUMNS.map((col) => {
          const colItems = items.filter((item) => item.status === col.id);

          return (
            <div
              key={col.id}
              className={`bg-slate-50/70 dark:bg-slate-900/60 border rounded-2xl p-4 flex flex-col min-h-[440px] ${col.color}`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    {col.label}
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.2 rounded-full ${col.badgeBg}`}>
                    {colItems.length}
                  </span>
                </div>
              </div>

              {/* Cards Container */}
              <div className="space-y-3 pt-3 flex-1 overflow-y-auto">
                {colItems.length === 0 ? (
                  <div className="h-32 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center text-xs text-slate-400">
                    No applications
                  </div>
                ) : (
                  colItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-sm space-y-2.5 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                    >
                      {/* Card Top */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-bold text-xs text-slate-900 dark:text-white leading-tight">
                            {item.roleTitle}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                            <Building2 className="w-3 h-3" />
                            <span>{item.company}</span>
                          </div>
                        </div>

                        <div className="shrink-0">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              item.matchScore >= 80
                                ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                                : item.matchScore >= 60
                                ? "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            {item.matchScore}%
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {item.dateAdded}
                        </span>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1 text-slate-400 hover:text-rose-500 rounded transition-colors"
                          title="Delete application"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Status Transition Buttons */}
                      <div className="flex items-center gap-1 pt-1">
                        {COLUMNS.filter((c) => c.id !== item.status).map((targetCol) => (
                          <button
                            key={targetCol.id}
                            onClick={() => handleMoveStatus(item.id, targetCol.id)}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
                          >
                            → {targetCol.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
