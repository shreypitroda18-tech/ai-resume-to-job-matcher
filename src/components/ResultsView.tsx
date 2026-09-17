"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Copy,
  Check,
  Download,
  ArrowLeft,
  Sparkles,
  CheckSquare,
  BookOpen,
  Zap,
  Quote,
  FileText,
  MessageSquare,
  Scale,
  Edit3,
  FileDown,
  Printer,
  ChevronDown,
  Flame,
  AlertOctagon,
  DollarSign,
  Linkedin,
  Send,
  Kanban,
  Building,
  ShieldCheck,
  Eye,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  X,
  Layers,
  Search,
} from "lucide-react";
import { MatchAnalysisResult, BulletRewrite, SkillMatchItem, CompanyJobListing } from "@/lib/types";
import { DiffHighlight } from "./DiffHighlight";
import { AtsRiskBadge } from "./AtsRiskBadge";
import { CoverLetterView } from "./CoverLetterView";
import { InterviewPrepView } from "./InterviewPrepView";
import { RoleComparisonView } from "./RoleComparisonView";
import { LiveEditorView } from "./LiveEditorView";
import { HeatmapSimulationView } from "./HeatmapSimulationView";
import { CandidAuditView } from "./CandidAuditView";
import { SalaryIntelligenceView } from "./SalaryIntelligenceView";
import { LinkedInSyncView } from "./LinkedInSyncView";
import { ColdOutreachView } from "./ColdOutreachView";
import { ApplicationTrackerView } from "./ApplicationTrackerView";
import { CompanyMatcherView } from "./CompanyMatcherView";
import { KeywordStuffingView } from "./KeywordStuffingView";
import {
  mergeAcceptedRewrites,
  downloadMarkdownFile,
  downloadDocxFile,
  printAtsResumePdf,
} from "@/lib/export-utils";

interface ResultsViewProps {
  result: MatchAnalysisResult;
  onResetOrEdit: () => void;
  fileName?: string;
  onUpdateResumeText?: (newText: string) => void;
  onLoadNewJobDescription?: (jobText: string, jobTitle?: string, companyName?: string) => void;
}

export type TabKey =
  | "rewrites"
  | "overview"
  | "skills"
  | "ats-risk"
  | "heatmap"
  | "candid-audit"
  | "live-editor"
  | "cover-letter"
  | "interview-prep"
  | "salary"
  | "linkedin"
  | "outreach"
  | "company-matcher"
  | "compare-roles"
  | "applications";

interface NavItem {
  id: TabKey;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeColor?: string;
}

interface NavGroup {
  name: string;
  items: NavItem[];
}

export function ResultsView({
  result,
  onResetOrEdit,
  fileName,
  onUpdateResumeText,
  onLoadNewJobDescription,
}: ResultsViewProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("rewrites");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);
  const [copiedRewriteId, setCopiedRewriteId] = useState<string | null>(null);
  const [copiedReport, setCopiedReport] = useState(false);
  const [isCandidMode, setIsCandidMode] = useState(false);

  // Accepted Rewrites State (Feature 1)
  const [acceptedRewrites, setAcceptedRewrites] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    result.rewrites.forEach((r) => {
      initial[r.id] = true;
    });
    return initial;
  });

  const [showExportModal, setShowExportModal] = useState(false);
  const [isExportingDocx, setIsExportingDocx] = useState(false);
  const [currentResumeText, setCurrentResumeText] = useState(
    result.rawResumeText || result.resumeText || ""
  );

  const { scoreBreakdown, matchedSkills, missingSkills, partialSkills, rewrites, atsChecklist } =
    result;
  const targetScore = scoreBreakdown.overallScore;

  // Animate score count-up
  useEffect(() => {
    let current = 0;
    const increment = Math.max(1, Math.ceil(targetScore / 30));
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetScore) {
        setDisplayScore(targetScore);
        clearInterval(timer);
      } else {
        setDisplayScore(current);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [targetScore]);

  const toggleAcceptRewrite = (id: string) => {
    setAcceptedRewrites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const acceptedCount = Object.values(acceptedRewrites).filter(Boolean).length;

  const getTailoredResumeText = () => {
    return mergeAcceptedRewrites(currentResumeText, rewrites, acceptedRewrites);
  };

  const handleCopyRewrite = (rewrite: BulletRewrite) => {
    navigator.clipboard.writeText(rewrite.suggestedBullet);
    setCopiedRewriteId(rewrite.id);
    setTimeout(() => setCopiedRewriteId(null), 2000);
  };

  const handleCopyReport = () => {
    const reportText = generateReportMarkdown(result);
    navigator.clipboard.writeText(reportText);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const tailored = getTailoredResumeText();
    downloadMarkdownFile(tailored, `Tailored-Resume-${result.jobTitleDetected || "Role"}.md`);
    setShowExportModal(false);
  };

  const handleDownloadDocx = async () => {
    setIsExportingDocx(true);
    try {
      const tailored = getTailoredResumeText();
      await downloadDocxFile(tailored, `Tailored-Resume-${result.jobTitleDetected || "Role"}.docx`);
      setShowExportModal(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExportingDocx(false);
    }
  };

  const handlePrintPdf = () => {
    const tailored = getTailoredResumeText();
    printAtsResumePdf(tailored, `${result.jobTitleDetected || "Tailored Resume"}`);
    setShowExportModal(false);
  };

  const toggleCandidMode = () => {
    const next = !isCandidMode;
    setIsCandidMode(next);
    if (next) {
      setActiveTab("candid-audit");
    }
  };

  const handleSelectJobFromCompanyMatcher = (job: CompanyJobListing) => {
    if (onLoadNewJobDescription) {
      onLoadNewJobDescription(job.jobDescriptionText, job.roleTitle, job.companyName);
    } else {
      onResetOrEdit();
    }
  };

  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600 dark:text-emerald-400 stroke-emerald-500";
    if (score >= 65) return "text-indigo-600 dark:text-indigo-400 stroke-indigo-500";
    if (score >= 50) return "text-amber-500 dark:text-amber-400 stroke-amber-500";
    return "text-rose-500 dark:text-rose-400 stroke-rose-500";
  };

  const NAV_GROUPS: NavGroup[] = [
    {
      name: "Analysis & Fit",
      items: [
        { id: "overview", label: "Score & Overview", icon: BookOpen },
        { id: "skills", label: "Skills Overlap", icon: CheckCircle2, badge: matchedSkills.length },
        {
          id: "rewrites",
          label: "Bullet Rewrites",
          icon: Sparkles,
          badge: rewrites.length,
          badgeColor: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
        },
        {
          id: "heatmap",
          label: "6-Sec Scan Heatmap",
          icon: Flame,
          badge: "F-Scan",
          badgeColor: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
        },
        { id: "ats-risk", label: "ATS Risk & Spam", icon: ShieldCheck },
        {
          id: "candid-audit",
          label: "Candid Recruiter",
          icon: AlertOctagon,
          badge: "Raw",
          badgeColor: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
        },
      ],
    },
    {
      name: "Tailor & Prepare",
      items: [
        {
          id: "live-editor",
          label: "Live Split-Editor",
          icon: Edit3,
          badge: "Live",
          badgeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
        },
        { id: "cover-letter", label: "1-Click Cover Letter", icon: FileText },
        { id: "interview-prep", label: "Interview Cheat Sheet", icon: MessageSquare },
        { id: "salary", label: "Salary Intelligence", icon: DollarSign },
      ],
    },
    {
      name: "Outreach & Brand",
      items: [
        { id: "linkedin", label: "LinkedIn Profile Sync", icon: Linkedin },
        { id: "outreach", label: "Cold Outreach Messages", icon: Send, badge: "<100w" },
      ],
    },
    {
      name: "Explore & Track",
      items: [
        {
          id: "company-matcher",
          label: "Company Job Matcher",
          icon: Building,
          badge: "Live",
          badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
        },
        { id: "compare-roles", label: "Multi-Role Matrix", icon: Scale },
        { id: "applications", label: "Local Kanban CRM", icon: Kanban },
      ],
    },
  ];

  const allItems = NAV_GROUPS.flatMap((g) => g.items);
  const currentItem = allItems.find((i) => i.id === activeTab) || allItems[0];

  return (
    <div
      className={`w-full max-w-7xl mx-auto space-y-6 pb-20 transition-all ${
        isCandidMode
          ? "bg-amber-950/15 p-4 sm:p-6 rounded-3xl border border-amber-900/40 shadow-2xl"
          : "animate-in fade-in duration-300"
      }`}
    >
      {/* Top sticky iteration, candid toggle & export bar */}
      <div
        className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 rounded-2xl glass-panel sticky top-16 z-30 transition-colors ${
          isCandidMode ? "border-amber-700/60 shadow-amber-950/20" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={onResetOrEdit}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Re-enter Inputs
          </button>

          {/* Candid Recruiter Mode Toggle */}
          <button
            onClick={toggleCandidMode}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              isCandidMode
                ? "bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400/50"
                : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400"
            }`}
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>Candid Mode {isCandidMode ? "ON" : "OFF"}</span>
          </button>
        </div>

        <div className="flex items-center gap-2 justify-end">
          {/* Mobile Drawer Trigger */}
          <button
            onClick={() => setIsMobileDrawerOpen(true)}
            className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
          >
            <Menu className="w-4 h-4" />
            <span className="truncate max-w-[120px]">{currentItem.label}</span>
          </button>

          {/* Export Tailored Resume Button */}
          <div className="relative">
            <button
              onClick={() => setShowExportModal(!showExportModal)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-lg shadow-sm transition-all"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Export Resume</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-800 text-emerald-100">
                {acceptedCount}
              </span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>

            {/* Export Dropdown Modal */}
            {showExportModal && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl glass-panel shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 text-xs">
                  <div className="font-bold text-slate-900 dark:text-white">
                    Export Tailored Resume
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Merges {acceptedCount} accepted rewrites into clean single-column format
                  </div>
                </div>

                <div className="py-1 space-y-1">
                  <button
                    onClick={handleDownloadDocx}
                    disabled={isExportingDocx}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-500" />
                      <div>
                        <div className="font-semibold">Word Document (.docx)</div>
                        <div className="text-[10px] text-slate-400">ATS single-column layout</div>
                      </div>
                    </div>
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  <button
                    onClick={handlePrintPdf}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Printer className="w-4 h-4 text-rose-500" />
                      <div>
                        <div className="font-semibold">Print / Save as PDF</div>
                        <div className="text-[10px] text-slate-400">Clean 1-page layout</div>
                      </div>
                    </div>
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  <button
                    onClick={handleDownloadMarkdown}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <FileDown className="w-4 h-4 text-slate-500" />
                      <div>
                        <div className="font-semibold">Markdown (.md)</div>
                        <div className="text-[10px] text-slate-400">Plain text parseable</div>
                      </div>
                    </div>
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleCopyReport}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors"
          >
            {copiedReport ? (
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">{copiedReport ? "Copied!" : "Copy Report"}</span>
          </button>
        </div>
      </div>

      {/* Candid Mode Alert Banner */}
      {isCandidMode && (
        <div className="p-4 rounded-2xl bg-amber-900/60 border border-amber-600/50 text-amber-200 text-xs sm:text-sm flex items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-amber-400 text-black font-black">
              <AlertOctagon className="w-4 h-4" />
            </span>
            <div>
              <span className="font-bold uppercase tracking-wider block text-amber-300">
                Senior Recruiter Audit Active
              </span>
              <span>Showing unfiltered critiques, fluff buzzword flags, and triage reactions.</span>
            </div>
          </div>
          <button
            onClick={() => setActiveTab("candid-audit")}
            className="px-3 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shrink-0"
          >
            Jump to Audit
          </button>
        </div>
      )}

      {/* Desktop Main Layout: Persistent Collapsible Sidebar + Content Canvas */}
      <div className="flex items-start gap-6">
        {/* DESKTOP SIDEBAR (Collapsible Linear/Notion Style) */}
        <aside
          className={`hidden lg:flex flex-col shrink-0 transition-all duration-300 sticky top-36 rounded-3xl glass-panel p-3 ${
            isSidebarCollapsed ? "w-20 items-center" : "w-64"
          }`}
        >
          {/* Sidebar Header & Collapse Toggle */}
          <div
            className={`flex items-center pb-3 mb-2 border-b border-slate-200/60 dark:border-slate-800/80 ${
              isSidebarCollapsed ? "justify-center w-full" : "justify-between px-2"
            }`}
          >
            {!isSidebarCollapsed && (
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Career Copilot
              </span>
            )}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isSidebarCollapsed ? (
                <PanelLeftOpen className="w-4 h-4" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Navigation Groups */}
          <div className="space-y-4 w-full overflow-y-auto max-h-[calc(100vh-220px)] pr-1">
            {NAV_GROUPS.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1">
                {!isSidebarCollapsed && (
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2.5 py-1">
                    {group.name}
                  </div>
                )}
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all group relative ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20 font-semibold"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100"
                      } ${isSidebarCollapsed ? "justify-center px-2" : ""}`}
                      title={isSidebarCollapsed ? item.label : undefined}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                          isActive
                            ? "text-white"
                            : item.id === "heatmap"
                            ? "text-orange-500"
                            : item.id === "candid-audit"
                            ? "text-amber-500"
                            : ""
                        }`}
                      />

                      {!isSidebarCollapsed && (
                        <>
                          <span className="flex-1 text-left truncate">{item.label}</span>
                          {item.badge !== undefined && (
                            <span
                              className={`text-[10px] px-1.5 py-0.2 rounded-md font-bold shrink-0 ${
                                isActive
                                  ? "bg-white/20 text-white"
                                  : item.badgeColor ||
                                    "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </aside>

        {/* MOBILE DRAWER (Slide-over Bottom Sheet) */}
        {isMobileDrawerOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-end animate-in fade-in duration-150">
            <div
              className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 rounded-t-3xl max-h-[85vh] overflow-y-auto p-5 space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="font-bold text-sm text-slate-900 dark:text-white">
                  All 16 Career Copilot Features
                </span>
                <button
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {NAV_GROUPS.map((group, gIdx) => (
                  <div key={gIdx} className="space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      {group.name}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;

                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              setActiveTab(item.id);
                              setIsMobileDrawerOpen(false);
                            }}
                            className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-medium text-left transition-all ${
                              isActive
                                ? "bg-indigo-600 text-white font-semibold shadow-sm"
                                : "bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                            }`}
                          >
                            <Icon className="w-4 h-4 shrink-0" />
                            <span className="flex-1 truncate">{item.label}</span>
                            {item.badge !== undefined && (
                              <span
                                className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                                  isActive
                                    ? "bg-white/20 text-white"
                                    : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MAIN FEATURE VIEW CONTAINER (Flex-1) */}
        <div className="flex-1 min-w-0">
          {/* VIEW: Suggested Rewrites (Feature 1) */}
          {activeTab === "rewrites" && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl glass-panel border border-indigo-200/70 dark:border-indigo-800/40 flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0" />
                  <div className="text-xs sm:text-sm text-indigo-950 dark:text-indigo-200">
                    <span className="font-semibold block mb-0.5">
                      Accept Rewrites to Build Your Tailored Resume
                    </span>
                    Toggle <strong>&ldquo;Accept&rdquo;</strong> on the suggestions below. When
                    ready, click <strong>&ldquo;Export Resume&rdquo;</strong> above to download an
                    ATS-compliant Word, PDF, or Markdown document with all changes merged into your
                    original resume.
                  </div>
                </div>

                <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300 shrink-0 hidden sm:block">
                  {acceptedCount} of {rewrites.length} Accepted
                </div>
              </div>

              <div className="space-y-6">
                {rewrites.map((rewrite, idx) => {
                  const isAccepted = Boolean(acceptedRewrites[rewrite.id]);

                  return (
                    <div
                      key={rewrite.id || idx}
                      className={`rounded-2xl transition-all p-5 sm:p-6 glass-panel ${
                        isAccepted
                          ? "border-indigo-300 dark:border-indigo-800/80 ring-1 ring-indigo-500/20"
                          : "opacity-80"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => toggleAcceptRewrite(rewrite.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                              isAccepted
                                ? "bg-emerald-600 text-white shadow-xs"
                                : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300"
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{isAccepted ? "Accepted" : "Accept Rewrite"}</span>
                          </button>

                          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                            Target: {rewrite.targetSkillOrKeyword}
                          </span>
                        </div>

                        <button
                          onClick={() => handleCopyRewrite(rewrite)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                        >
                          {copiedRewriteId === rewrite.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-500" /> Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" /> Copy
                            </>
                          )}
                        </button>
                      </div>

                      <div className="space-y-3 my-4">
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                            Visual Diff (Before &rarr; After)
                          </div>
                          <DiffHighlight
                            original={rewrite.originalBullet}
                            suggested={rewrite.suggestedBullet}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                        <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl">
                          <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">
                            Why this matters:
                          </span>
                          <span className="text-slate-600 dark:text-slate-400">
                            {rewrite.rationale}
                          </span>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl">
                          <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">
                            ATS Filter Impact:
                          </span>
                          <span className="text-slate-600 dark:text-slate-400">
                            {rewrite.atsImpact}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW: Overview & Score Hero */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="rounded-3xl glass-panel p-6 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
                    <div className="relative w-36 h-36 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 130 130">
                        <circle
                          cx="65"
                          cy="65"
                          r={radius}
                          stroke="currentColor"
                          strokeWidth="10"
                          fill="transparent"
                          className="text-slate-100 dark:text-slate-800"
                        />
                        <circle
                          cx="65"
                          cy="65"
                          r={radius}
                          strokeWidth="10"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                          fill="transparent"
                          className={`transition-all duration-1000 ease-out ${getScoreColor(
                            targetScore
                          )}`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                          {displayScore}
                          <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">
                            /100
                          </span>
                        </span>
                        <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mt-0.5">
                          Match Score
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-1.5">
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {scoreBreakdown.confidenceRating} Confidence
                      </span>
                      <span className="text-[11px] text-slate-400">
                        &bull; {result.engineUsed === "gemini-ai" ? "Gemini Flash" : "Heuristic ATS"}
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-8 flex flex-col justify-center space-y-4">
                    <div>
                      <div className="text-xs uppercase tracking-wider font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                        Executive Fit Summary
                      </div>
                      <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
                        {scoreBreakdown.summaryExplanation}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-2">
                      <div className="p-3 rounded-xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50">
                        <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                          Skills Overlap
                        </div>
                        <div className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                          {scoreBreakdown.skillsScore}%
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 rounded-full mt-2 overflow-hidden">
                          <div
                            className="bg-indigo-500 h-full rounded-full"
                            style={{ width: `${scoreBreakdown.skillsScore}%` }}
                          />
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50">
                        <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                          Experience Fit
                        </div>
                        <div className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                          {scoreBreakdown.experienceScore}%
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 rounded-full mt-2 overflow-hidden">
                          <div
                            className="bg-violet-500 h-full rounded-full"
                            style={{ width: `${scoreBreakdown.experienceScore}%` }}
                          />
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50">
                        <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                          Keyword Density
                        </div>
                        <div className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                          {scoreBreakdown.keywordDensityScore}%
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 rounded-full mt-2 overflow-hidden">
                          <div
                            className="bg-emerald-500 h-full rounded-full"
                            style={{ width: `${scoreBreakdown.keywordDensityScore}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 6: ATS Visual & Format Risk Badge */}
              <AtsRiskBadge inspection={result.atsRiskInspection} />

              {/* ATS Checklist Audit */}
              <div className="rounded-3xl glass-panel p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    ATS Compatibility Checklist
                  </h3>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800 pt-2">
                  {atsChecklist.map((item, idx) => (
                    <div key={idx} className="py-3 flex items-start gap-3">
                      <div className="mt-0.5">
                        {item.passed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-amber-500" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-white">
                          {item.item}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {item.note}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* VIEW: Matched & Missing Skills */}
          {activeTab === "skills" && (
            <div className="space-y-8">
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-500" /> Missing Critical Requirements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  {missingSkills
                    .filter((s) => s.importance === "critical")
                    .map((skill, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-2xl glass-panel border border-rose-200/80 dark:border-rose-900/40 shadow-xs"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-semibold text-sm text-slate-900 dark:text-white">
                            {skill.name}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
                            Critical
                          </span>
                        </div>
                        {skill.recommendation && (
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                            {skill.recommendation}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> Nice-to-Have &amp;
                  Partially-Matched Skills
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  {partialSkills.map((skill, i) => (
                    <div
                      key={`partial-${i}`}
                      className="p-4 rounded-2xl glass-panel border border-amber-200/80 dark:border-amber-900/40 shadow-xs"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-semibold text-sm text-slate-900 dark:text-white">
                          {skill.name}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
                          Partial Match
                        </span>
                      </div>
                      {skill.recommendation && (
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          {skill.recommendation}
                        </p>
                      )}
                    </div>
                  ))}

                  {missingSkills
                    .filter((s) => s.importance !== "critical")
                    .map((skill, i) => (
                      <div
                        key={`nice-${i}`}
                        className="p-4 rounded-2xl glass-panel shadow-xs"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-semibold text-sm text-slate-900 dark:text-white">
                            {skill.name}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                            {skill.importance}
                          </span>
                        </div>
                        {skill.recommendation && (
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                            {skill.recommendation}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Matched Skills (
                  {matchedSkills.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  {matchedSkills.map((skill, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl glass-panel shadow-xs"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-sm text-slate-900 dark:text-white">
                          {skill.name}
                        </span>
                        {skill.category && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                            {skill.category}
                          </span>
                        )}
                      </div>

                      {skill.contextSnippet && (
                        <div className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50/70 dark:bg-slate-800/50 p-2 rounded-lg flex items-start gap-1.5">
                          <Quote className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                          <span className="italic line-clamp-2">
                            &ldquo;{skill.contextSnippet}&rdquo;
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* VIEW: Feature 9 - 6-Second Glance Heatmap Simulation */}
          {activeTab === "heatmap" && (
            <HeatmapSimulationView
              heatmapData={result.heatmapData}
              resumeText={currentResumeText}
            />
          )}

          {/* VIEW: Feature 6 & 7 - ATS Visual Risk & Keyword Stuffing Detector */}
          {activeTab === "ats-risk" && (
            <div className="space-y-6">
              <AtsRiskBadge inspection={result.atsRiskInspection} />
              <KeywordStuffingView inspection={result.keywordStuffingInspection} />
            </div>
          )}

          {/* VIEW: Feature 10 - Candid Recruiter Audit */}
          {activeTab === "candid-audit" && (
            <CandidAuditView candidAudit={result.candidAudit} />
          )}

          {/* VIEW: Feature 5 - Live Editor */}
          {activeTab === "live-editor" && (
            <LiveEditorView
              initialResumeText={currentResumeText}
              jobDescriptionText={result.rawJobDescriptionText || result.jobDescriptionText || ""}
              matchedSkills={matchedSkills}
              missingSkills={missingSkills}
              onSaveResume={(updated) => {
                setCurrentResumeText(updated);
                if (onUpdateResumeText) onUpdateResumeText(updated);
              }}
              onFullReAnalyze={(updated) => {
                setCurrentResumeText(updated);
                if (onUpdateResumeText) onUpdateResumeText(updated);
                onResetOrEdit();
              }}
            />
          )}

          {/* VIEW: Feature 2 - Cover Letter */}
          {activeTab === "cover-letter" && (
            <CoverLetterView
              coverLetters={result.coverLetters}
              jobTitle={result.jobTitleDetected}
              companyName={result.companyDetected}
            />
          )}

          {/* VIEW: Feature 3 - Interview Prep */}
          {activeTab === "interview-prep" && (
            <InterviewPrepView interviewPrep={result.interviewPrep} />
          )}

          {/* VIEW: Feature 11 - Salary & Negotiation Intelligence */}
          {activeTab === "salary" && (
            <SalaryIntelligenceView salaryData={result.salaryIntelligence} />
          )}

          {/* VIEW: Feature 12 - LinkedIn Profile Sync */}
          {activeTab === "linkedin" && (
            <LinkedInSyncView syncData={result.linkedInSync} />
          )}

          {/* VIEW: Feature 13 - Cold Outreach Messages */}
          {activeTab === "outreach" && (
            <ColdOutreachView outreachMessages={result.outreachMessages} />
          )}

          {/* VIEW: Feature 15 - Company Matcher */}
          {activeTab === "company-matcher" && (
            <CompanyMatcherView
              resumeText={currentResumeText}
              onSelectJobForAnalysis={handleSelectJobFromCompanyMatcher}
            />
          )}

          {/* VIEW: Feature 8 - Multi-Role Comparison Matrix */}
          {activeTab === "compare-roles" && (
            <RoleComparisonView resumeText={currentResumeText} />
          )}

          {/* VIEW: Feature 14 - Application Tracker */}
          {activeTab === "applications" && (
            <ApplicationTrackerView
              currentMatchResult={result}
              currentRoleTitle={result.jobTitleDetected}
              currentCompanyName={result.companyDetected}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function generateReportMarkdown(result: MatchAnalysisResult): string {
  const { scoreBreakdown, matchedSkills, missingSkills, rewrites } = result;

  let md = `# MatchPoint AI - Resume Fit & ATS Analysis Report\n\n`;
  md += `**Overall Match Score:** ${scoreBreakdown.overallScore}/100\n`;
  md += `**Confidence:** ${scoreBreakdown.confidenceRating} | **Date:** ${new Date().toLocaleDateString()}\n\n`;
  md += `### Executive Summary\n${scoreBreakdown.summaryExplanation}\n\n`;
  md += `### Score Breakdown\n`;
  md += `- **Technical Skills Overlap:** ${scoreBreakdown.skillsScore}%\n`;
  md += `- **Experience Alignment:** ${scoreBreakdown.experienceScore}%\n`;
  md += `- **Keyword Density:** ${scoreBreakdown.keywordDensityScore}%\n\n`;

  md += `### Matched Skills (${matchedSkills.length})\n`;
  matchedSkills.forEach((s) => {
    md += `- **${s.name}**${s.category ? ` (${s.category})` : ""}${
      s.contextSnippet ? `: "${s.contextSnippet}"` : ""
    }\n`;
  });

  md += `\n### Missing Skills & Keywords (${missingSkills.length})\n`;
  missingSkills.forEach((s) => {
    md += `- **${s.name}** [${s.importance}]: ${
      s.recommendation || "Recommended to add to resume"
    }\n`;
  });

  md += `\n### Suggested Bullet Point Rewrites\n`;
  rewrites.forEach((r, i) => {
    md += `#### Rewrite #${i + 1} (Target: ${r.targetSkillOrKeyword})\n`;
    md += `**Original:**\n> ${r.originalBullet}\n\n`;
    md += `**Suggested:**\n> ${r.suggestedBullet}\n\n`;
    md += `*Rationale:* ${r.rationale}\n\n`;
  });

  return md;
}
