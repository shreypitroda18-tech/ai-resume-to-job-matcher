"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Code2,
  Shuffle,
  Award,
  GraduationCap,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export function PersonaUseCasesSection({
  onSelectPreset,
  onScrollToWorkspace,
}: {
  onSelectPreset?: (presetIndex: number) => void;
  onScrollToWorkspace: () => void;
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const personas = [
    {
      id: "engineers",
      tabLabel: "Software Engineers",
      icon: Code2,
      roleTitle: "Software Engineers & Cloud Architects",
      tagline: "Highlight technical depth, throughput metrics, and modern cloud stacks.",
      challenge:
        "Engineers often bury high-scale achievements inside generic maintenance descriptions, failing ATS tech stack keywords.",
      solution:
        "Validates framework keywords (Go, Kafka, K8s, AWS), reformulates bullets with hard latency and throughput metrics, and flags multi-column parsing bugs.",
      stats: [
        { label: "Technical Callback", value: "+64%" },
        { label: "Keyword Match", value: "96%" },
        { label: "Comp Uplift", value: "+$32k" },
      ],
      presetIndex: 0,
    },
    {
      id: "switchers",
      tabLabel: "Career Switchers",
      icon: Shuffle,
      roleTitle: "Career Switchers & Industry Pivoters",
      tagline: "Translate non-linear domain experience into high-value transferable competencies.",
      challenge:
        "Past job titles from traditional fields fail standard ATS filters when pivoting into tech or product roles.",
      solution:
        "Maps transferable cross-functional skills (project leadership, data analysis, stakeholder consensus) to JD requirements, neutralizing title mismatch penalties.",
      stats: [
        { label: "Skill Bridge Match", value: "88%" },
        { label: "Screen Pass Rate", value: "3.1x" },
        { label: "Cover Letter Fit", value: "100%" },
      ],
      presetIndex: 1,
    },
    {
      id: "leaders",
      tabLabel: "Staff+ & Leadership",
      icon: Award,
      roleTitle: "Staff+ Engineers & Engineering Managers",
      tagline: "Communicate multi-team leverage, architectural vision, and organizational scale.",
      challenge:
        "Senior candidates struggle to condense a decade of multi-org influence into concise, recruiter-scannable bullet points.",
      solution:
        "Frames accomplishments around org-wide leverage, team velocity gains, and P&L impact, accompanied by top 90th percentile salary benchmarks.",
      stats: [
        { label: "Recruiter Pick-up", value: "4.2x" },
        { label: "Level Calibration", value: "Staff/VP" },
        { label: "Equity Gain", value: "+45%" },
      ],
      presetIndex: 0,
    },
    {
      id: "graduates",
      tabLabel: "New Grads & Juniors",
      icon: GraduationCap,
      roleTitle: "New Graduates & Junior Professionals",
      tagline: "Convert capstones, hackathons, and internships into hireable engineering proof.",
      challenge:
        "Lack of full-time years leaves resumes feeling sparse, triggering entry-level filtering traps.",
      solution:
        "Elevates class projects and open-source contributions using commercial terminology, proving production readiness without fabricated claims.",
      stats: [
        { label: "Interview Latency", value: "<14 days" },
        { label: "Format Safety", value: "0 Risks" },
        { label: "Builder Speed", value: "8 mins" },
      ],
      presetIndex: 2,
    },
  ];

  const updateScrollState = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const maxScroll = scrollWidth - clientWidth;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < maxScroll - 10);
    setScrollProgress(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = scrollContainerRef.current.clientWidth * 0.75;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section id="solutions" className="py-16 sm:py-24 scroll-mt-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full am-category-tag">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>TAILORED FOR YOUR CAREER STAGE</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12]">
              Engineered for every step of{" "}
              <span className="highlight-editorial hl-amber">your professional trajectory</span>.
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              Whether you are aiming for a Staff Architect seat or breaking into engineering for the
              first time, MatchPoint AI calibrates its scoring heuristics to your specific level.
            </p>
          </div>

          {/* Desktop Arrow Controls & Peek Indicator */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <span className="text-xs font-mono text-slate-400 hidden sm:inline mr-1">
              Swipe or scroll &rarr;
            </span>
            <button
              type="button"
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              className={`p-2.5 rounded-full border transition-all ${
                canScrollLeft
                  ? "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer shadow-xs"
                  : "bg-slate-100/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-600 cursor-not-allowed"
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              className={`p-2.5 rounded-full border transition-all ${
                canScrollRight
                  ? "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer shadow-xs"
                  : "bg-slate-100/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-600 cursor-not-allowed"
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Track (Instruction 6) */}
        <div
          ref={scrollContainerRef}
          className="horizontal-scroll-track gap-5 sm:gap-6 pb-6 pt-1 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
          {personas.map((persona, idx) => {
            const Icon = persona.icon;
            return (
              <div
                key={persona.id}
                className="snap-card w-[88vw] sm:w-[420px] lg:w-[460px] p-7 sm:p-8 rounded-2xl glass-panel border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all group"
              >
                <div className="space-y-5">
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white transition-transform group-hover:scale-[1.02]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {persona.tabLabel}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      0{idx + 1} // 04
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white tracking-tight leading-snug">
                      {persona.roleTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 font-normal leading-relaxed">
                      {persona.tagline}
                    </p>
                  </div>

                  {/* Challenge vs Solution */}
                  <div className="space-y-2.5 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
                      <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">
                        Primary Bottleneck:
                      </span>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                        {persona.challenge}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
                      <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">
                        MatchPoint Solution:
                      </span>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                        {persona.solution}
                      </p>
                    </div>
                  </div>

                  {/* 3 Metric Pills */}
                  <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                    {persona.stats.map((stat, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 shadow-2xs"
                      >
                        <span className="text-base font-black text-slate-950 dark:text-white font-mono block">
                          {stat.value}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectPreset) {
                        onSelectPreset(persona.presetIndex);
                      }
                      onScrollToWorkspace();
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group/btn cursor-pointer"
                  >
                    <span>Load Demo Profile</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                  <span className="text-[11px] text-slate-400">1-Click Test</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimal Progress Indicator */}
        <div className="max-w-xs mx-auto mt-6">
          <div className="scroll-progress-bar">
            <div
              className="scroll-progress-thumb"
              style={{ width: `${Math.max(25, scrollProgress)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
