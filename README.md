# Resume Matcher — AI Resume-to-Job Matcher & Application Copilot

> Turn resume guesswork into a data-backed, high-callback editing process.

A full-stack, privacy-first career copilot web application where job seekers can analyze an existing resume or build one from scratch, receive an **explainable match score**, bridge critical skill gaps, and export **tailored ATS-ready resumes and cover letters** all the way to a submitted application.

Built with Next.js 15, TypeScript, Tailwind CSS, and powered by a dual-engine architecture (offline intelligent ATS heuristics + Google Gemini Flash generative intelligence).

---

## 🌟 Complete 16-Feature Suite

### Phase 1 — Analysis & Diagnostics
1. **🎯 Apply Rewrites & Tailored Resume Export**
   - **Accept/Reject Toggles:** Review each bullet rewrite suggestion and selectively accept improvements.
   - **Automated In-Memory Merging:** Click "Export Tailored Resume" to cleanly merge accepted rewrites directly into your original document structure.
   - **Triple-Format ATS Export:** Download as Microsoft Word (`.docx`), Printable ATS PDF (clean 1-column layout), or Markdown (`.md`).
2. **🛡️ ATS Visual & Format Risk Inspector**
   - **Structural Hazard Checks:** Inspects documents for multi-column layouts, tables/grids, non-standard rating glyphs, and header-trapped contact info.
   - **Machine-Readability Score:** Outputs a 0-100 ATS safety score with clear pass/warning badges.
3. **🔍 Overqualification & Keyword-Stuffing Detector**
   - **Repetition Spam Score:** Identifies unnaturally repeated keywords that trigger modern ATS spam filters (Workday, Greenhouse, Taleo).
   - **Seniority & Down-leveling Advice:** Flags candidates significantly overqualified for junior/mid roles, with concrete guidance on how to avoid recruiter rejection.
4. **👁️ Recruiter 6-Second Glance Heatmap Simulation**
   - **F-Pattern Eye-Tracking Scan:** Simulates where technical recruiters look during their initial 6-second triage.
   - **Above-The-Fold Score:** Measures the density of critical qualifications visible in the top 30% viewport.
   - **Buried Metric Finder:** Surfaces high-value quantified metrics hidden in lower bullets and recommends moving them above the fold.
5. **⚡ Brutal Truth / Candid Recruiter Audit Mode**
   - **Unfiltered Recruiter Persona:** One-click toggle transforms the UI into an amber/slate alert skin with candid, direct feedback.
   - **Fluff Buzzwords Table:** Flags empty corporate buzzwords (*"results-driven"*, *"synergized"*) with high-impact alternatives.
   - **What Actually Impressed Me:** Highlights genuine standout proof points to maintain balance.

---

### Phase 2 — Tailor & Prepare
6. **✍️ 1-Click Tailored Cover Letter Generator**
   - **3-Paragraph Custom Synthesis:** Automatically bridges verified matched skills to the employer's core stated requirements.
   - **Dynamic Tones:** Switch between *Confident & Technical*, *Concise & Executive*, and *Startup Collaborative*.
   - **Inline Editor:** Edit directly inside the app before copying or exporting as `.txt`.
7. **🎙️ Interview Prep & Gap-Bridging Cheat Sheet**
   - **Targeted Question Prediction:** Generates realistic interview questions tailored to your specific missing skills.
   - **Honest Bridging Scripts:** Learn how to address skill gaps with adjacent experience without overclaiming.
8. **⚡ Live Interactive Split-Screen Resume Editor**
   - **Split-Screen Workspace:** Line-numbered resume text editor with real-time text updates.
   - **Dynamic Keyword Tracking:** Checklist detects and lights up target skills as you type.
   - **Live Score Climb:** Watch the match score gauge animate smoothly upward as you bridge skill gaps.
9. **💰 Role Compensation & Salary Negotiation Intelligence**
   - **Market Percentiles:** Displays 25th, 50th, and 75th percentile salary estimates based on title, seniority, and location.
   - **Skill-Grounded Negotiation Scripts:** 2 concrete scripts to justify asking for the 75th percentile based on verified skill overlaps.

---

### Phase 3 — Outreach & Brand
10. **💼 LinkedIn Profile & Headline Synchronizer**
    - **Optimized Headline:** Recruiter-search-optimized headline under 220 characters.
    - **Targeted About Section:** 2 punchy paragraphs balancing personal narrative and critical keywords.
    - **Top 5 Skills to Pin:** Direct match for recruiter search filters.
11. **📨 Cold Outreach & Hiring Manager Message Generator**
    - **Sub-100 Word Rule:** Direct, high-response message templates formatted for busy decision-makers.
    - **3 Message Types:** Hiring Manager InMail, Peer Coffee Chat Ask, and 7-Day Follow-Up note.

---

### Phase 4 — Explore & Track
12. **🔗 Live Job Posting URL Importer**
    - **Automated Web Extraction:** Paste any job board URL (Greenhouse, Lever, LinkedIn, corporate careers).
    - **Boilerplate Stripping:** Isolates job title, company, and requirements text on the server using Cheerio.
13. **⚖️ Multi-Role Target Comparison Matrix**
    - **Side-by-Side Comparison:** Compare your resume against 2 or 3 job descriptions simultaneously.
    - **Highest Callback Odds:** Highlights which role you have the strongest match for today.
14. **🏢 "Am I Eligible?" Company & Live Job Board Matcher**
    - **Curated Tech Directory:** Evaluates your resume against verified roles at Stripe, Vercel, Datadog, Figma, etc.
    - **Eligibility Verdicts:** Strong Match, Possible with tailoring, or Significant gap with action checklists.
    - **Direct Handoff:** Click "Tailor for this Role" to immediately load that job into the analysis engine.
15. **📋 Private Local Application Tracker**
    - **Kanban Mini-CRM:** Move applications through *Tailored → Applied → Interviewing → Offer*.
    - **Zero Cloud Storage:** Stored 100% locally in browser `localStorage`. No database tracking.
16. **📝 Guided Resume Builder From Scratch**
    - **Step-by-Step Wizard:** Designed for candidates starting with zero resume.
    - **Google X-Y-Z Formula:** *"Accomplished [X] as measured by [Y], by doing [Z]"* prompts for bullet points.
    - **Live Strength Meter:** Real-time 0-100 gauge as sections are completed.
    - **Direct Matcher Handoff:** Load the generated resume directly into the matcher in one click.

---

## 🏗️ Architecture & Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 19, Next.js 15 (App Router), Tailwind CSS | Responsive, accessible, dark/light theme, Linear/Notion-level calm aesthetic |
| **Backend** | Next.js Server Route Handlers | `/api/match` and `/api/fetch-job-url` with zero-latency execution |
| **AI Layer** | Google Gemini 2.5 Flash + Smart ATS Heuristics | Deep generative analysis with 100% offline fallback reliability |
| **Document Parsing** | `pdf-parse` + `mammoth` | Server-side in-memory text and structure extraction |
| **Document Export** | `docx` + Print CSS | Native Word `.docx`, Printable ATS PDF, and Markdown `.md` |
| **Scraper** | `cheerio` + Node HTTP | Live job posting URL importer with boilerplate stripping |
| **Persistence** | In-memory session + Browser `localStorage` | 100% private, zero permanent cloud data retention |

---

## 🔒 Privacy Guarantee

- **0 Data Persisted:** Resumes and job descriptions are never saved to a database, file system, or external storage.
- **Session Only:** All data remains in your local browser sandbox and is cleared when you close the tab.
- **Application Tracker:** Uses local browser `localStorage` exclusively.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. (Optional) Set Gemini API Key
Create a `.env.local` file:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
```
*(You can also configure or clear your API key at any time in the app header modal. If omitted, the built-in smart ATS heuristic engine runs automatically!)*

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
```
