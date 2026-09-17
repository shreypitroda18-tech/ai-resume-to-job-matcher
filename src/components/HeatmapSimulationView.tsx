"use client";

import React, { useState } from "react";
import { RecruiterHeatmapData } from "@/lib/types";
import { Eye, Flame, ArrowUpRight, CheckCircle, AlertCircle, Info, Sparkles } from "lucide-react";

interface HeatmapSimulationViewProps {
  heatmapData?: RecruiterHeatmapData;
  resumeText: string;
}

export function HeatmapSimulationView({ heatmapData, resumeText }: HeatmapSimulationViewProps) {
  const [showOverlay, setShowOverlay] = useState(true);
  const [activeFixation, setActiveFixation] = useState<number | null>(null);

  if (!heatmapData) {
    return (
      <div className="p-8 text-center text-slate-500 dark:text-slate-400">
        No eye-tracking simulation data available for this resume.
      </div>
    );
  }

  // Split resume text into top lines for preview
  const resumeLines = resumeText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .slice(0, 30);

  const aboveTheFoldScore = heatmapData.aboveTheFoldScore;
  const scoreColor =
    aboveTheFoldScore >= 80
      ? "text-emerald-500 dark:text-emerald-400"
      : aboveTheFoldScore >= 60
      ? "text-amber-500 dark:text-amber-400"
      : "text-rose-500 dark:text-rose-400";

  return (
    <div className="space-y-6">
      {/* Header & Score Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
                <Flame className="w-5 h-5" />
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Recruiter 6-Second Glance Simulation
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800/60">
                F-Pattern Scan Model
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Simulates where a senior technical recruiter’s eyes fixate during the initial 6-second triage scan. High-density heat zones show immediate attention areas.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/60 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0">
            <div className="text-right">
              <div className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                Above-The-Fold Score
              </div>
              <div className={`text-2xl font-black ${scoreColor}`}>
                {aboveTheFoldScore}
                <span className="text-xs font-normal text-slate-400">/100</span>
              </div>
            </div>
            <div className="h-10 w-[1px] bg-slate-200 dark:bg-slate-700" />
            <div className="text-xs text-slate-500 dark:text-slate-400 max-w-[140px] leading-tight">
              {aboveTheFoldScore >= 80
                ? "Excellent punch: core skills visible in first 3 seconds."
                : aboveTheFoldScore >= 60
                ? "Acceptable, but key achievements sit too low."
                : "High risk: key qualifications buried off-screen."}
            </div>
          </div>
        </div>

        {/* Scan Verdict pill */}
        <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-xl flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
          <Eye className="w-4 h-4 text-indigo-500 shrink-0" />
          <span>
            <strong>Verdict:</strong> {heatmapData.scanPatternVerdict}
          </span>
        </div>
      </div>

      {/* Main Heatmap Visualizer + Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Simulated Visual Scan Canvas (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Simulated Page 1 Document View
              </span>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded">
                Top 30% Viewport
              </span>
            </div>

            <button
              onClick={() => setShowOverlay(!showOverlay)}
              className={`text-xs font-semibold px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
                showOverlay
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              {showOverlay ? "Heatmap On" : "Show Heatmap"}
            </button>
          </div>

          {/* Relative container for resume text and heatmap overlay */}
          <div className="relative rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 p-6 font-mono text-[11px] leading-relaxed select-none overflow-hidden min-h-[460px]">
            {/* The underlying resume preview text */}
            <div className="space-y-2 opacity-75 blur-[0.3px]">
              {resumeLines.map((line, idx) => {
                const isHeading = line.length < 35 && line.toUpperCase() === line;
                const isBullet = line.startsWith("•") || line.startsWith("-") || line.startsWith("*");

                return (
                  <div
                    key={idx}
                    className={`truncate ${
                      isHeading
                        ? "font-bold text-slate-900 dark:text-slate-100 text-xs mt-3 first:mt-0 tracking-wider"
                        : isBullet
                        ? "text-slate-700 dark:text-slate-300 pl-2"
                        : "text-slate-600 dark:text-slate-400 font-sans text-xs"
                    }`}
                  >
                    {line}
                  </div>
                );
              })}
            </div>

            {/* Fold marker */}
            <div className="absolute top-[42%] left-0 right-0 border-b-2 border-dashed border-rose-400/70 dark:border-rose-500/60 pointer-events-none flex items-center justify-end px-3">
              <span className="bg-rose-500 text-white text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded shadow-sm">
                6-Sec Scan Cutoff (Fold)
              </span>
            </div>

            {/* Heatmap Overlays / Fixation Nodes */}
            {showOverlay && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Simulated Heat Radial Gradients */}
                <div className="absolute top-6 left-8 w-40 h-24 bg-red-500/25 rounded-full filter blur-xl animate-pulse" />
                <div className="absolute top-16 left-6 w-56 h-20 bg-amber-500/25 rounded-full filter blur-xl" />
                <div className="absolute top-36 left-8 w-36 h-20 bg-yellow-400/20 rounded-full filter blur-lg" />
                <div className="absolute top-52 left-6 w-24 h-16 bg-blue-500/15 rounded-full filter blur-md" />

                {/* Interactive Fixation Points */}
                {heatmapData.fixationPoints.map((point, index) => {
                  const isActive = activeFixation === index;
                  return (
                    <div
                      key={index}
                      style={{
                        top: `${point.yPercent}%`,
                        left: `${point.xPercent}%`,
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
                      onMouseEnter={() => setActiveFixation(index)}
                      onMouseLeave={() => setActiveFixation(null)}
                    >
                      {/* Pulse ring */}
                      <span
                        className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${
                          point.intensity > 0.8
                            ? "bg-rose-400"
                            : point.intensity > 0.5
                            ? "bg-amber-400"
                            : "bg-blue-400"
                        }`}
                      />
                      {/* Badge node */}
                      <div
                        className={`relative flex items-center justify-center w-7 h-7 rounded-full text-[11px] font-bold text-white shadow-lg transition-transform group-hover:scale-125 ${
                          point.intensity > 0.8
                            ? "bg-rose-600 ring-2 ring-rose-300"
                            : point.intensity > 0.5
                            ? "bg-amber-500 ring-2 ring-amber-300"
                            : "bg-indigo-500 ring-2 ring-indigo-300"
                        }`}
                      >
                        {index + 1}
                      </div>

                      {/* Tooltip */}
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 top-8 z-30 w-48 p-2.5 rounded-lg bg-slate-900 text-white text-[11px] shadow-xl transition-all pointer-events-none font-sans leading-normal ${
                          isActive ? "opacity-100 visible" : "opacity-0 invisible"
                        }`}
                      >
                        <div className="font-semibold text-amber-300">
                          Fixation #{index + 1} ({Math.round(point.intensity * 100)}% gaze)
                        </div>
                        <p className="mt-0.5 text-slate-300">{point.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                Primary Gaze (1-2s)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                Secondary Scan (3-4s)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                Peripheral (5-6s)
              </span>
            </div>
            <span className="text-[11px] text-slate-400">Hover nodes to view scan intent</span>
          </div>
        </div>

        {/* Right Column: Buried Metric Alerts & Scannability Checklist (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Buried Metric Alerts */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                  <AlertCircle className="w-4 h-4" />
                </span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Buried Metric Finder
                </h4>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                {heatmapData.buriedMetrics.length} detected
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              High-value quantified accomplishments found below the 6-second scan fold. Move these to top bullet positions for immediate recruiter retention.
            </p>

            <div className="space-y-2.5 pt-1">
              {heatmapData.buriedMetrics.length === 0 ? (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>No buried metrics! Your top quantified numbers are front and center.</span>
                </div>
              ) : (
                heatmapData.buriedMetrics.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-xs text-amber-900 dark:text-amber-200">
                        {alert.metric}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-300 bg-amber-200/60 dark:bg-amber-900/60 px-1.5 py-0.5 rounded shrink-0">
                        {alert.currentLocation}
                      </span>
                    </div>
                    <div className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                      <ArrowUpRight className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                      <span>{alert.recommendation}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Scannability Checklist */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-4 h-4" />
              </span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Scannability Audit
              </h4>
            </div>

            <div className="space-y-2">
              {heatmapData.scannabilityChecklist.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5 text-xs"
                >
                  {item.passed ? (
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                      {item.item}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                      {item.note}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
