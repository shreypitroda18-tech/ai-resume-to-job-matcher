"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Plus,
  Trash2,
  FileDown,
  BookOpen,
  Info,
  Award,
} from "lucide-react";
import { GuidedExperienceEntry, ResumeBuilderState } from "@/lib/types";
import { downloadDocxFile, printAtsResumePdf, downloadMarkdownFile } from "@/lib/export-utils";

interface GuidedResumeBuilderProps {
  onCompleteAndAnalyze: (generatedResumeText: string) => void;
  onCancel: () => void;
}

export function GuidedResumeBuilder({
  onCompleteAndAnalyze,
  onCancel,
}: GuidedResumeBuilderProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [state, setState] = useState<ResumeBuilderState>({
    contactInfo: {
      fullName: "Alex Rivera",
      email: "alex.rivera@email.com",
      phone: "(555) 234-5678",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/alexrivera-dev",
      github: "github.com/alexrivera",
    },
    summary:
      "Full-Stack Software Engineer with 4+ years of experience designing and scaling resilient web applications with React, TypeScript, Node.js, and AWS. Proven track record of optimizing database queries and accelerating CI/CD deployment cadences.",
    experiences: [
      {
        id: "exp-1",
        roleTitle: "Software Engineer",
        company: "Vanguard Tech",
        duration: "2021 - Present",
        problemSolved: "Legacy monolith caused deployment bottlenecks and slow query latency.",
        actionTaken: "Architected containerized microservices in Docker and integrated Redis caching.",
        quantifiedResult: "Reduced p95 response times from 800ms to 120ms and improved release speed by 50%.",
        generatedBullet:
          "Architected and deployed Docker microservices backed by Redis caching, reducing p95 query latency from 800ms to 120ms and accelerating release cycles by 50%.",
      },
    ],
    education: [
      {
        school: "University of California, Berkeley",
        degree: "B.S. in Computer Science",
        gradYear: "2017 - 2021",
      },
    ],
    skills:
      "TypeScript, JavaScript, React, Next.js, Node.js, Express, PostgreSQL, Redis, AWS (S3, EC2, Lambda), Docker, CI/CD, Git",
    projects:
      "Real-Time Collaborative Canvas: Built high-throughput WebSocket sync application supporting 5,000+ simultaneous canvas edits.",
    strengthScore: 78,
  });

  // Convert raw guided question inputs into Google X-Y-Z formula
  const generateGoogleXYZBullet = (exp: GuidedExperienceEntry): string => {
    const action = exp.actionTaken.trim().replace(/\.$/, "");
    const result = exp.quantifiedResult.trim().replace(/\.$/, "");

    if (action && result) {
      let verb = "Spearheaded and delivered";
      if (/built|developed/i.test(action)) verb = "Engineered and scaled";
      else if (/architected|designed/i.test(action)) verb = "Architected and deployed";
      else if (/optimized|improved/i.test(action)) verb = "Optimized and maintained";

      return `${verb} ${action.toLowerCase().replace(/^(i |we )/, "")}, driving ${result.toLowerCase().replace(/^(we |it )/, "")}.`;
    }
    return exp.generatedBullet || "Delivered high-impact technical initiatives across the product lifecycle.";
  };

  const handleUpdateExperience = (id: string, field: keyof GuidedExperienceEntry, val: string) => {
    setState((prev) => {
      const updated = prev.experiences.map((exp) => {
        if (exp.id === id) {
          const next = { ...exp, [field]: val };
          if (field === "actionTaken" || field === "quantifiedResult") {
            next.generatedBullet = generateGoogleXYZBullet(next);
          }
          return next;
        }
        return exp;
      });
      return { ...prev, experiences: updated };
    });
  };

  const handleAddExperience = () => {
    const newEntry: GuidedExperienceEntry = {
      id: `exp-${state.experiences.length + 1}`,
      roleTitle: "",
      company: "",
      duration: "2022 - Present",
      problemSolved: "",
      actionTaken: "",
      quantifiedResult: "",
      generatedBullet: "",
    };
    setState((prev) => ({
      ...prev,
      experiences: [...prev.experiences, newEntry],
    }));
  };

  const handleRemoveExperience = (id: string) => {
    if (state.experiences.length <= 1) return;
    setState((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((e) => e.id !== id),
    }));
  };

  // Compile structured resume into clean plain text
  const compileResumeText = (): string => {
    const { contactInfo, summary, experiences, education, skills, projects } = state;

    let doc = `${contactInfo.fullName}\n`;
    doc += `${contactInfo.email} | ${contactInfo.phone} | ${contactInfo.location} | ${contactInfo.linkedin} | ${contactInfo.github}\n\n`;

    doc += `PROFESSIONAL SUMMARY\n${summary}\n\n`;

    doc += `TECHNICAL SKILLS\n${skills}\n\n`;

    doc += `WORK EXPERIENCE\n`;
    experiences.forEach((exp) => {
      doc += `${exp.roleTitle || "Software Engineer"} | ${exp.company || "Company"} | ${exp.duration}\n`;
      doc += `- ${exp.generatedBullet || exp.actionTaken || "Delivered key engineering deliverables."}\n\n`;
    });

    if (projects) {
      doc += `PROJECTS\n${projects}\n\n`;
    }

    doc += `EDUCATION\n`;
    education.forEach((edu) => {
      doc += `${edu.degree} | ${edu.school} | ${edu.gradYear}\n`;
    });

    return doc.trim();
  };

  // Calculate live resume strength
  const calculateStrength = (): number => {
    let score = 40;
    if (state.contactInfo.fullName && state.contactInfo.email && state.contactInfo.phone) score += 15;
    if (state.summary.length > 50) score += 15;
    if (state.experiences.some((e) => /\d+%|\$\d+|\b\d+\s*(users|ms|days)\b/i.test(e.generatedBullet))) score += 20;
    if (state.skills.length > 30) score += 10;
    return Math.min(100, score);
  };

  const strength = calculateStrength();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-24 animate-in fade-in duration-200">
      {/* Header bar */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <button
          type="button"
          onClick={onCancel}
          className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Analyzer
        </button>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-slate-900 dark:text-white">
              Resume Strength: {strength}%
            </div>
            <div className="text-[10px] text-slate-400">ATS-ready formula</div>
          </div>
          <div className="w-24 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full transition-all duration-300" style={{ width: `${strength}%` }} />
          </div>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-between px-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
        <button
          onClick={() => setCurrentStep(1)}
          className={`pb-1 border-b-2 ${currentStep === 1 ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold" : "border-transparent"}`}
        >
          1. Contact Info
        </button>
        <button
          onClick={() => setCurrentStep(2)}
          className={`pb-1 border-b-2 ${currentStep === 2 ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold" : "border-transparent"}`}
        >
          2. Professional Summary
        </button>
        <button
          onClick={() => setCurrentStep(3)}
          className={`pb-1 border-b-2 ${currentStep === 3 ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold" : "border-transparent"}`}
        >
          3. Work Experience (Guided)
        </button>
        <button
          onClick={() => setCurrentStep(4)}
          className={`pb-1 border-b-2 ${currentStep === 4 ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold" : "border-transparent"}`}
        >
          4. Skills &amp; Education
        </button>
        <button
          onClick={() => setCurrentStep(5)}
          className={`pb-1 border-b-2 ${currentStep === 5 ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold" : "border-transparent"}`}
        >
          5. Review &amp; Export
        </button>
      </div>

      {/* STEP 1: Contact Info */}
      {currentStep === 1 && (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex items-start gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Contact &amp; Header Info</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                ATS parsers scan the top 20 lines for your name, email, phone number, and professional profiles. Avoid tables or text boxes.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Full Name</label>
              <input
                type="text"
                value={state.contactInfo.fullName}
                onChange={(e) => setState({ ...state, contactInfo: { ...state.contactInfo, fullName: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Email Address</label>
              <input
                type="email"
                value={state.contactInfo.email}
                onChange={(e) => setState({ ...state, contactInfo: { ...state.contactInfo, email: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Phone Number</label>
              <input
                type="text"
                value={state.contactInfo.phone}
                onChange={(e) => setState({ ...state, contactInfo: { ...state.contactInfo, phone: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Location (City, State / Remote)</label>
              <input
                type="text"
                value={state.contactInfo.location}
                onChange={(e) => setState({ ...state, contactInfo: { ...state.contactInfo, location: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">LinkedIn Profile URL</label>
              <input
                type="text"
                value={state.contactInfo.linkedin}
                onChange={(e) => setState({ ...state, contactInfo: { ...state.contactInfo, linkedin: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">GitHub / Portfolio URL</label>
              <input
                type="text"
                value={state.contactInfo.github}
                onChange={(e) => setState({ ...state, contactInfo: { ...state.contactInfo, github: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <span>Next: Professional Summary</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Summary */}
      {currentStep === 2 && (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex items-start gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <BookOpen className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Professional Summary</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Recruiters decide whether to keep reading in under 7 seconds. This is your 2-to-3 sentence hook, not an autobiographical story.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Executive Summary (2-3 sentences leading with title, years, and top skills)
            </label>
            <textarea
              value={state.summary}
              onChange={(e) => setState({ ...state, summary: e.target.value })}
              rows={5}
              className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-xs sm:text-sm font-sans leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <span>Next: Work Experience</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Work Experience (Guided Questions) */}
      {currentStep === 3 && (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Guided Work Experience &amp; Metric Formula
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Answer the 3 guided prompts below for each role. Our engine automatically transforms them into metric-forward bullet points using the Google X-Y-Z formula.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddExperience}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Another Role
            </button>
          </div>

          <div className="space-y-6">
            {state.experiences.map((exp, idx) => (
              <div
                key={exp.id}
                className="p-5 rounded-2xl bg-slate-50/60 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    Role Entry #{idx + 1}
                  </span>
                  {state.experiences.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveExperience(exp.id)}
                      className="text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Job Title</label>
                    <input
                      type="text"
                      value={exp.roleTitle}
                      onChange={(e) => handleUpdateExperience(exp.id, "roleTitle", e.target.value)}
                      placeholder="e.g. Lead Software Engineer"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleUpdateExperience(exp.id, "company", e.target.value)}
                      placeholder="e.g. Acme Corp"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Dates / Duration</label>
                    <input
                      type="text"
                      value={exp.duration}
                      onChange={(e) => handleUpdateExperience(exp.id, "duration", e.target.value)}
                      placeholder="e.g. 2022 - Present"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    />
                  </div>
                </div>

                {/* 3 Guided Questions */}
                <div className="space-y-3 pt-2 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-0.5">
                      1. What problem were you solving?
                    </label>
                    <input
                      type="text"
                      value={exp.problemSolved}
                      onChange={(e) => handleUpdateExperience(exp.id, "problemSolved", e.target.value)}
                      placeholder="e.g. Monolithic architecture was struggling under 40k DAU and slowing releases"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-0.5">
                      2. What did you do / what tools did you use?
                    </label>
                    <input
                      type="text"
                      value={exp.actionTaken}
                      onChange={(e) => handleUpdateExperience(exp.id, "actionTaken", e.target.value)}
                      placeholder="e.g. Migrated services to Docker containers on AWS EC2 and added Redis caching"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-0.5">
                      3. What was the measurable result? (Include a % or number)
                    </label>
                    <input
                      type="text"
                      value={exp.quantifiedResult}
                      onChange={(e) => handleUpdateExperience(exp.id, "quantifiedResult", e.target.value)}
                      placeholder="e.g. Dropping p95 response times from 850ms to 120ms and accelerating releases by 60%"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                    />
                  </div>
                </div>

                {/* Generated Bullet Preview */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
                    Auto-Formatted ATS Power Bullet:
                  </span>
                  <div className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 text-xs text-slate-800 dark:text-slate-200 font-mono">
                    &bull; {exp.generatedBullet}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <span>Next: Skills &amp; Education</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Skills & Education */}
      {currentStep === 4 && (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Technical Skills &amp; Education</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              List the primary programming languages, frameworks, cloud services, and your educational degrees.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Skills &amp; Technologies (Comma-separated)
              </label>
              <textarea
                value={state.skills}
                onChange={(e) => setState({ ...state, skills: e.target.value })}
                rows={3}
                className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Key Projects (Optional)
              </label>
              <textarea
                value={state.projects}
                onChange={(e) => setState({ ...state, projects: e.target.value })}
                rows={2}
                placeholder="Name: Description with technologies and metrics"
                className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 font-mono text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Degree</label>
                <input
                  type="text"
                  value={state.education[0]?.degree || ""}
                  onChange={(e) => {
                    const next = [...state.education];
                    next[0] = { ...next[0], degree: e.target.value };
                    setState({ ...state, education: next });
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">University / College</label>
                <input
                  type="text"
                  value={state.education[0]?.school || ""}
                  onChange={(e) => {
                    const next = [...state.education];
                    next[0] = { ...next[0], school: e.target.value };
                    setState({ ...state, education: next });
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Graduation Years</label>
                <input
                  type="text"
                  value={state.education[0]?.gradYear || ""}
                  onChange={(e) => {
                    const next = [...state.education];
                    next[0] = { ...next[0], gradYear: e.target.value };
                    setState({ ...state, education: next });
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(5)}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <span>Review &amp; Export</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Review & Direct ATS Match Handoff */}
      {currentStep === 5 && (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Your Professional Resume Is Ready</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Formatted in clean single-column structure guaranteed to parse smoothly in any corporate ATS system.
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              <Award className="w-4 h-4" />
              <span>{strength}% ATS Strength</span>
            </div>
          </div>

          {/* Compiled text preview */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs leading-relaxed max-h-72 overflow-y-auto whitespace-pre-wrap text-slate-800 dark:text-slate-200">
            {compileResumeText()}
          </div>

          {/* Action Hub */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Primary Action: Match against Job Description */}
            <div className="p-5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 flex flex-col justify-between space-y-3">
              <div>
                <span className="font-bold text-sm text-indigo-950 dark:text-indigo-200 block mb-1">
                  Step 2: Match Against a Job Posting
                </span>
                <p className="text-xs text-indigo-800/80 dark:text-indigo-300">
                  Instantly carry this resume directly into the match analyzer to test fit scores, missing skills, and cover letter generation.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onCompleteAndAnalyze(compileResumeText())}
                className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Analyze Match Against Job Description</span>
              </button>
            </div>

            {/* Secondary Action: Direct File Download */}
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-3">
              <div>
                <span className="font-bold text-sm text-slate-900 dark:text-white block mb-1">
                  Download Finished Resume
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Export in single-column ATS format without tables or text boxes.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => downloadDocxFile(compileResumeText(), `${state.contactInfo.fullName.replace(/\s+/g, "_")}_Resume.docx`)}
                  className="flex-1 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1 hover:bg-slate-50"
                >
                  <FileDown className="w-3.5 h-3.5 text-blue-500" /> Word (.docx)
                </button>
                <button
                  type="button"
                  onClick={() => printAtsResumePdf(compileResumeText(), `${state.contactInfo.fullName} Resume`)}
                  className="flex-1 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1 hover:bg-slate-50"
                >
                  <FileDown className="w-3.5 h-3.5 text-rose-500" /> PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
