"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SocialProofSection } from "@/components/SocialProofSection";
import { FeatureStorytellingSections } from "@/components/FeatureStorytellingSections";
import { AiIntelligenceFlowSection } from "@/components/AiIntelligenceFlowSection";
import { PersonaUseCasesSection } from "@/components/PersonaUseCasesSection";
import { RoiMetricsSection } from "@/components/RoiMetricsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ResourceGuidesSection } from "@/components/ResourceGuidesSection";
import { FinalCtaSection } from "@/components/FinalCtaSection";
import { Footer } from "@/components/Footer";

import { ResumeInputPanel } from "@/components/ResumeInputPanel";
import { JobDescriptionPanel } from "@/components/JobDescriptionPanel";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { ResultsView } from "@/components/ResultsView";
import { ApiKeyModal } from "@/components/ApiKeyModal";
import { GuidedResumeBuilder } from "@/components/ResumeBuilder/GuidedResumeBuilder";
import { MatchAnalysisResult } from "@/lib/types";
import { SamplePreset, SAMPLE_PRESETS } from "@/lib/sample-data";
import {
  Sparkles,
  ArrowRight,
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  // State
  const [darkMode, setDarkMode] = useState(false);
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const [inputMode, setInputMode] = useState<"upload" | "paste">("paste");
  const [resumeText, setResumeText] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");

  const [viewState, setViewState] = useState<"input" | "loading" | "results" | "builder">("input");
  const [analysisResult, setAnalysisResult] = useState<MatchAnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | undefined>(undefined);
  const [builderNotice, setBuilderNotice] = useState<string | null>(null);

  // Initialize theme & load saved API key from localStorage
  useEffect(() => {
    // Check saved theme
    const savedTheme = localStorage.getItem("matchpoint_theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Check saved API key
    const savedKey = localStorage.getItem("matchpoint_api_key");
    if (savedKey) {
      setApiKey(savedKey);
    }

    // Default prefill first sample preset for an immediate delightful demo!
    const defaultPreset = SAMPLE_PRESETS[0];
    setResumeText(defaultPreset.resumeText);
    setJobDescription(defaultPreset.jobDescriptionText);
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("matchpoint_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("matchpoint_theme", "light");
    }
  };

  const handleSaveApiKey = (newKey: string) => {
    setApiKey(newKey);
    if (newKey) {
      localStorage.setItem("matchpoint_api_key", newKey);
    } else {
      localStorage.removeItem("matchpoint_api_key");
    }
  };

  const handleApplyPreset = (preset: SamplePreset) => {
    setInputMode("paste");
    setResumeFile(null);
    setResumeText(preset.resumeText);
    setJobDescription(preset.jobDescriptionText);
    setErrorMessage(null);
    setSelectedFileName(undefined);
    setBuilderNotice(null);
  };

  const handleScrollToWorkspace = () => {
    if (viewState !== "input") {
      setViewState("input");
    }
    setTimeout(() => {
      const el = document.getElementById("workspace");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 60);
  };

  const handleLaunchBuilder = () => {
    setViewState("builder");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Trigger Match Analysis
  const handleAnalyze = async () => {
    setErrorMessage(null);

    // Validation
    const hasResume =
      (inputMode === "upload" && resumeFile) ||
      (inputMode === "paste" && resumeText.trim().length >= 40);
    if (!hasResume) {
      setErrorMessage(
        "Please provide your resume by uploading a PDF/DOCX or pasting your resume text."
      );
      return;
    }

    if (!jobDescription || jobDescription.trim().length < 30) {
      setErrorMessage("Please paste the job description you want to match against.");
      return;
    }

    setViewState("loading");
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      let response: Response;

      if (inputMode === "upload" && resumeFile) {
        setSelectedFileName(resumeFile.name);
        const formData = new FormData();
        formData.append("resumeFile", resumeFile);
        formData.append("jobDescription", jobDescription);
        if (apiKey) formData.append("apiKey", apiKey);
        if (resumeText) formData.append("resumeText", resumeText);

        response = await fetch("/api/match", {
          method: "POST",
          body: formData,
        });
      } else {
        setSelectedFileName("Pasted Resume Text");
        response = await fetch("/api/match", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resumeText,
            jobDescription,
            apiKey: apiKey || undefined,
          }),
        });
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Analysis failed. Please try again or paste your resume text."
        );
      }

      setAnalysisResult(data.result);
      setViewState("results");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(msg);
      setViewState("input");
    }
  };

  const hasMinimumInput =
    ((inputMode === "upload" && Boolean(resumeFile)) ||
      (inputMode === "paste" && resumeText.trim().length >= 40)) &&
    jobDescription.trim().length >= 30;

  return (
    <div className="min-h-screen flex flex-col transition-colors relative overflow-x-hidden bg-background text-foreground">
      {/* Floating Enterprise Header */}
      <Header
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenApiModal={() => setIsApiModalOpen(true)}
        hasApiKey={Boolean(apiKey)}
        onSelectPreset={handleApplyPreset}
        onScrollToWorkspace={handleScrollToWorkspace}
        onLaunchBuilder={handleLaunchBuilder}
      />

      {/* VIEW: Loading Screen */}
      {viewState === "loading" && (
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20">
          <LoadingIndicator />
        </main>
      )}

      {/* VIEW: Results Screen (Full 16-feature suite) */}
      {viewState === "results" && analysisResult && (
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <ResultsView
            result={analysisResult}
            fileName={selectedFileName}
            onUpdateResumeText={(newText) => setResumeText(newText)}
            onLoadNewJobDescription={(jobText) => {
              setJobDescription(jobText);
              setViewState("input");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onResetOrEdit={() => {
              setViewState("input");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </main>
      )}

      {/* VIEW: Guided Resume Builder (Feature 16) */}
      {viewState === "builder" && (
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
          <GuidedResumeBuilder
            onCompleteAndAnalyze={(generatedText) => {
              setResumeText(generatedText);
              setInputMode("paste");
              setBuilderNotice(
                "Your resume was generated using the Google X-Y-Z formula and loaded into the matcher. Now paste or import a job description to analyze!"
              );
              setViewState("input");
              handleScrollToWorkspace();
            }}
            onCancel={() => {
              setViewState("input");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </main>
      )}

      {/* VIEW: Main Marketing + Interactive Workspace */}
      {viewState === "input" && (
        <main className="flex-1 w-full">
          {/* 1. Amplemarket Hero Section with Interactive Live Browser Mockup */}
          <HeroSection
            onScrollToWorkspace={handleScrollToWorkspace}
            onLaunchBuilder={handleLaunchBuilder}
          />

          {/* 2. Social Proof Section: Logos & Quantified Highlights */}
          <SocialProofSection />

          {/* 3. The Core Interactive Analysis Workspace */}
          <section id="workspace" className="py-16 sm:py-24 scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Workspace Header */}
              <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full am-category-tag">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  <span>INTERACTIVE ANALYSIS HUB</span>
                </div>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                  Analyze Your Resume Against <span className="highlight-editorial hl-indigo">Any Target Job</span>
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal">
                  Upload your resume or paste its text, add your target job description or job URL,
                  and let our engine generate an explainable fit score with word-level rewrites.
                </p>
              </div>

              {/* Dual Landing Entry Switcher */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8">
                <button
                  type="button"
                  onClick={() => setViewState("input")}
                  className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-md cursor-pointer"
                >
                  📄 Analyze Existing Resume
                </button>
                <button
                  type="button"
                  onClick={handleLaunchBuilder}
                  className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800/80 hover:text-slate-950 dark:hover:text-white cursor-pointer"
                >
                  ✍️ Build New Resume from Scratch
                </button>
              </div>

              {/* Builder Notice Banner if just completed builder */}
              {builderNotice && (
                <div className="max-w-3xl mx-auto mb-6 p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-xs sm:text-sm text-emerald-800 dark:text-emerald-200 flex items-start gap-3 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-semibold block mb-0.5">Resume Successfully Created!</span>
                    <span>{builderNotice}</span>
                  </div>
                </div>
              )}

              {/* Error Banner */}
              {errorMessage && (
                <div className="max-w-3xl mx-auto mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs sm:text-sm text-rose-800 dark:text-rose-200 flex items-start gap-3 shadow-xs">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-semibold block mb-0.5">Could not complete analysis</span>
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}

              {/* Dual Input Panels: Side by Side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
                <ResumeInputPanel
                  resumeText={resumeText}
                  setResumeText={setResumeText}
                  resumeFile={resumeFile}
                  setResumeFile={setResumeFile}
                  inputMode={inputMode}
                  setInputMode={setInputMode}
                />

                <JobDescriptionPanel
                  jobDescription={jobDescription}
                  setJobDescription={setJobDescription}
                  onApplyPreset={handleApplyPreset}
                />
              </div>

              {/* Primary Action Button */}
              <div className="flex flex-col items-center justify-center pt-8 space-y-3.5">
                <button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={!hasMinimumInput}
                  className={`w-full sm:w-auto px-10 py-4 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-3 transition-all ${
                    hasMinimumInput
                      ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 active:scale-98 shadow-xl shadow-slate-950/20 cursor-pointer"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none"
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-indigo-400 dark:text-indigo-600" />
                  <span>Analyze Fit &amp; Generate Rewrites</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Your resume isn&apos;t stored. 100% in-memory ephemeral evaluation.</span>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Alternating Feature Storytelling Sections (ATS, 6s Heatmap, Diff Rewrites, Salary Intel) */}
          <FeatureStorytellingSections onScrollToWorkspace={handleScrollToWorkspace} />

          {/* 5. AI Intelligence Engine Pipeline Architecture */}
          <AiIntelligenceFlowSection onScrollToWorkspace={handleScrollToWorkspace} />

          {/* 6. Persona Use-Cases (Engineers, Switchers, Leaders, Grads) */}
          <PersonaUseCasesSection
            onScrollToWorkspace={handleScrollToWorkspace}
            onSelectPreset={(idx) => handleApplyPreset(SAMPLE_PRESETS[idx % SAMPLE_PRESETS.length])}
          />

          {/* 7. Quantified ROI Metrics */}
          <RoiMetricsSection />

          {/* 8. Candidate Testimonials Grid */}
          <TestimonialsSection />

          {/* 9. Career Guides & ATS Playbooks */}
          <ResourceGuidesSection onScrollToWorkspace={handleScrollToWorkspace} />

          {/* 10. High-Impact Closing CTA Banner */}
          <FinalCtaSection
            onScrollToWorkspace={handleScrollToWorkspace}
            onLaunchBuilder={handleLaunchBuilder}
          />
        </main>
      )}

      {/* Enterprise SaaS 5-Column Footer */}
      <Footer
        onScrollToWorkspace={handleScrollToWorkspace}
        onLaunchBuilder={handleLaunchBuilder}
        onOpenApiModal={() => setIsApiModalOpen(true)}
      />

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
      />
    </div>
  );
}
