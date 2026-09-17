"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Moon,
  Sun,
  Key,
  ChevronDown,
  FileText,
  Shield,
  Layers,
  ArrowRight,
  Flame,
  DollarSign,
  MessageSquare,
  Building,
  Menu,
  X,
  Briefcase,
  GraduationCap,
  Users,
  Compass,
} from "lucide-react";
import { SAMPLE_PRESETS, SamplePreset } from "@/lib/sample-data";

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenApiModal: () => void;
  hasApiKey: boolean;
  onSelectPreset: (preset: SamplePreset) => void;
  onScrollToWorkspace?: () => void;
  onLaunchBuilder?: () => void;
}

export function Header({
  darkMode,
  onToggleDarkMode,
  onOpenApiModal,
  hasApiKey,
  onSelectPreset,
  onScrollToWorkspace,
  onLaunchBuilder,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showPresetsMenu, setShowPresetsMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    let targetId = sectionId;
    if (sectionId === "personas") targetId = "solutions";
    if (sectionId === "features") targetId = "features";
    const elem =
      document.getElementById(targetId) ||
      document.getElementById(sectionId) ||
      (sectionId === "features" ? document.getElementById("feature-ats") : null) ||
      (sectionId === "testimonials" ? document.getElementById("results") : null);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    } else if (onScrollToWorkspace) {
      onScrollToWorkspace();
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "py-2.5 bg-white/85 dark:bg-[#080A10]/85 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-800/80 shadow-sm"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* LEFT: Brand Logo & Tag */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-orange-500 via-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-[1.02] transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-900 dark:text-white tracking-tight text-base sm:text-lg flex items-center gap-1.5">
                MatchPoint
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.2 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
                  AI
                </span>
              </span>
            </div>
          </a>
        </div>

        {/* CENTER: Mega-Menu Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200/60 dark:border-slate-800/60 shadow-xs">
          {/* Product Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("product")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => handleNavClick("features")}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors"
            >
              <span>Platform</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {activeDropdown === "product" && (
              <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl glass-panel p-3 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-2.5 py-1">
                  Core AI Intelligence
                </div>
                <div className="space-y-1 mt-1">
                  <button
                    onClick={() => handleNavClick("feature-ats")}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors flex items-start gap-2.5"
                  >
                    <Shield className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        ATS Format &amp; Risk Inspector
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Multi-column layout, table &amp; glyph parser audit
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick("feature-heatmap")}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors flex items-start gap-2.5"
                  >
                    <Flame className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        6-Second Recruiter Heatmap
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        F-pattern gaze simulation &amp; above-the-fold score
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick("feature-rewrites")}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors flex items-start gap-2.5"
                  >
                    <Sparkles className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        Diff-Style Bullet Rewrites
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Google X-Y-Z formula with 1-click accept
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick("feature-salary")}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors flex items-start gap-2.5"
                  >
                    <DollarSign className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        Salary &amp; Negotiation Intel
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        25th/50th/75th percentiles &amp; talking points
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Solutions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("solutions")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => handleNavClick("personas")}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors"
            >
              <span>Solutions</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {activeDropdown === "solutions" && (
              <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl glass-panel p-3 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-2.5 py-1">
                  Built For Every Career Stage
                </div>
                <div className="space-y-1 mt-1">
                  <button
                    onClick={() => handleNavClick("personas")}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200"
                  >
                    <Briefcase className="w-4 h-4 text-indigo-500" />
                    <span>Software Engineers &amp; Tech</span>
                  </button>

                  <button
                    onClick={() => handleNavClick("personas")}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200"
                  >
                    <Compass className="w-4 h-4 text-rose-500" />
                    <span>Career Switchers &amp; Pivoters</span>
                  </button>

                  <button
                    onClick={() => handleNavClick("personas")}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200"
                  >
                    <Users className="w-4 h-4 text-amber-500" />
                    <span>Senior &amp; Staff+ Leaders</span>
                  </button>

                  <button
                    onClick={() => handleNavClick("personas")}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200"
                  >
                    <GraduationCap className="w-4 h-4 text-emerald-500" />
                    <span>New Grads &amp; Entry-Level</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavClick("how-it-works")}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            How it Works
          </button>

          <button
            onClick={() => handleNavClick("testimonials")}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Results
          </button>

          <button
            onClick={() => handleNavClick("resources")}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Resources
          </button>
        </nav>

        {/* RIGHT: Action Controls & CTA */}
        <div className="flex items-center gap-2.5">
          {/* Quick Presets Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowPresetsMenu(!showPresetsMenu)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5"
              title="Test drive with realistic sample candidates"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
              <span className="hidden sm:inline">Presets</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {showPresetsMenu && (
              <div
                className="absolute right-0 mt-2 w-64 rounded-2xl glass-panel shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                onClick={() => setShowPresetsMenu(false)}
              >
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Instant Test-Drive Candidates
                </div>
                {SAMPLE_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      onSelectPreset(preset);
                      if (onScrollToWorkspace) onScrollToWorkspace();
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-slate-100/80 dark:hover:bg-slate-800/70 text-slate-700 dark:text-slate-200 flex flex-col"
                  >
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {preset.title}
                    </span>
                    <span className="text-[11px] text-slate-400">{preset.role}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Engine Status / API Key Button */}
          <button
            onClick={onOpenApiModal}
            className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 border transition-all ${
              hasApiKey
                ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800"
                : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800"
            }`}
            title="Configure AI API engine"
          >
            <Key className="w-3 h-3 text-indigo-500" />
            <span className="hidden md:inline">
              {hasApiKey ? "Gemini AI" : "Built-in ATS"}
            </span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            aria-label="Toggle theme"
            className="p-2 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Primary CTA (Amplemarket Pill Style) */}
          <button
            onClick={onScrollToWorkspace}
            className="am-btn-primary text-xs py-2 px-4.5 hidden xs:inline-flex"
          >
            <span>Analyze Resume</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide-down */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-[#080A10]/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-5 py-4 space-y-3 animate-in slide-in-from-top-2 duration-150 shadow-xl">
          <button
            onClick={() => handleNavClick("features")}
            className="w-full text-left py-2 text-sm font-semibold text-slate-800 dark:text-slate-200"
          >
            Platform &amp; Diagnostics
          </button>
          <button
            onClick={() => handleNavClick("how-it-works")}
            className="w-full text-left py-2 text-sm font-semibold text-slate-800 dark:text-slate-200"
          >
            How it Works
          </button>
          <button
            onClick={() => handleNavClick("personas")}
            className="w-full text-left py-2 text-sm font-semibold text-slate-800 dark:text-slate-200"
          >
            Solutions &amp; Personas
          </button>
          <button
            onClick={() => handleNavClick("testimonials")}
            className="w-full text-left py-2 text-sm font-semibold text-slate-800 dark:text-slate-200"
          >
            Customer Results
          </button>
          <button
            onClick={() => handleNavClick("resources")}
            className="w-full text-left py-2 text-sm font-semibold text-slate-800 dark:text-slate-200"
          >
            Resources &amp; Guides
          </button>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onScrollToWorkspace) onScrollToWorkspace();
              }}
              className="am-btn-primary w-full text-xs justify-center"
            >
              <span>Analyze Resume Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            {onLaunchBuilder && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLaunchBuilder();
                }}
                className="am-btn-secondary w-full text-xs justify-center"
              >
                <span>Build Resume from Scratch</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
