"use client";

import React, { useRef, useState, useEffect } from "react";
import { Star, Quote, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

export function TestimonialsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const testimonials = [
    {
      name: "Elena Rostova",
      role: "Staff Infrastructure Engineer",
      company: "Stripe",
      avatar: "ER",
      avatarBg: "bg-slate-900 text-white dark:bg-white dark:text-slate-900",
      rating: 5,
      headline: "From 0 callbacks to 6 first-round screens in 10 days.",
      quote:
        "I sent out 40 applications with zero response. MatchPoint pointed out that my two-column LaTeX resume was getting scrambled by Workday's parser. After flattening the layout and running Google X-Y-Z rewrites on my distributed systems bullets, I booked 6 interviews in under two weeks.",
      outcome: "3.8x Callback Increase &bull; Staff Offer",
    },
    {
      name: "Marcus Chen",
      role: "Senior Product Manager",
      company: "Figma",
      avatar: "MC",
      avatarBg: "bg-slate-900 text-white dark:bg-white dark:text-slate-900",
      rating: 5,
      headline: "Successfully pivoted from consulting into Tier-1 Tech.",
      quote:
        "Switching careers is brutal because standard ATS filters reject non-traditional titles. MatchPoint AI bridged my consulting deliverables into native product development competencies, showing exact diff rewrites. Landed my target PM role with total confidence.",
      outcome: "+$45k Comp Uplift &bull; Zero Title Penalty",
    },
    {
      name: "Priya Patel",
      role: "Machine Learning Engineer",
      company: "Datadog",
      avatar: "PP",
      avatarBg: "bg-slate-900 text-white dark:bg-white dark:text-slate-900",
      rating: 5,
      headline: "The 6-second heatmap fixed my resume layout immediately.",
      quote:
        "As a new grad with lab projects, recruiters were skipping my resume. The gaze heatmap simulation revealed that my high-scale PyTorch throughput metrics were buried in the low-attention bottom zone. Moving them to the F-pattern sweep resulted in 4 immediate recruiter screens.",
      outcome: "Signed in 3 Weeks &bull; 0 Parse Errors",
    },
    {
      name: "David Thorne",
      role: "Director of Engineering",
      company: "Fintech Enterprise",
      avatar: "DT",
      avatarBg: "bg-slate-900 text-white dark:bg-white dark:text-slate-900",
      rating: 5,
      headline: "The salary intelligence paid off tenfold in negotiations.",
      quote:
        "Most engineers leave tens of thousands of dollars on the table during initial HR screens. The market percentile benchmarks and recruiter deflection scripts gave me the exact confidence and phrasing to negotiate an extra $40,000 sign-on bonus and equity refresh.",
      outcome: "+$40,000 Sign-on Bonus Negotiated",
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
    <section id="testimonials" className="py-16 sm:py-24 scroll-mt-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Arrow Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full am-category-tag">
              <Quote className="w-3.5 h-3.5 text-indigo-500" />
              <span>VERIFIED CANDIDATE STORIES</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12]">
              Trusted by candidates landing offers at{" "}
              <span className="highlight-editorial hl-emerald">the world’s top tech teams</span>.
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              Real outcomes from engineers, product managers, and leaders who stopped guessing and
              started submitting data-backed applications.
            </p>
          </div>

          {/* Desktop Arrow Controls */}
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
              aria-label="Scroll testimonials left"
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
              aria-label="Scroll testimonials right"
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
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="snap-card w-[88vw] sm:w-[480px] lg:w-[540px] p-7 sm:p-8 rounded-2xl glass-panel border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all group"
            >
              <div className="space-y-4">
                {/* Stars & Verification Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/60">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified Candidate</span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white leading-snug">
                  &ldquo;{t.headline}&rdquo;
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {t.quote}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl ${t.avatarBg} flex items-center justify-center font-bold text-xs shadow-xs`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {t.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {t.role} &bull; <strong className="font-semibold text-slate-700 dark:text-slate-300">{t.company}</strong>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase block">
                    Verified Outcome
                  </span>
                  <span
                    className="text-[11px] font-bold text-slate-900 dark:text-white"
                    dangerouslySetInnerHTML={{ __html: t.outcome }}
                  />
                </div>
              </div>
            </div>
          ))}
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
