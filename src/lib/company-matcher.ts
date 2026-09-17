import { CompanyJobListing, CompanyEligibilityResult } from "./types";
import { runHeuristicAnalysis } from "./heuristic-matcher";

export const CURATED_COMPANY_JOBS: CompanyJobListing[] = [
  {
    id: "stripe-swe",
    companyName: "Stripe",
    roleTitle: "Software Engineer — Core Infrastructure",
    location: "San Francisco, CA / Remote",
    isRemote: true,
    department: "Infrastructure Engineering",
    postedDate: "Updated 3 days ago",
    publicBoardUrl: "https://stripe.com/jobs",
    jobDescriptionText: `Stripe Software Engineer — Infrastructure

Stripe builds economic infrastructure for the internet. As an Infrastructure Software Engineer, you will build and scale the distributed systems and database engines that power billions of dollars in daily transactions.

Requirements:
- 4+ years of professional software engineering experience.
- Strong proficiency in Java, Go, Ruby, or TypeScript.
- Hands-on experience with distributed databases (PostgreSQL, MySQL, Redis) and high-availability architecture.
- Experience with containerization (Docker, Kubernetes) and AWS cloud infrastructure.
- Commitment to reliability, automated testing, and zero-downtime schema migrations.`,
  },
  {
    id: "vercel-frontend",
    companyName: "Vercel",
    roleTitle: "Senior Full-Stack Engineer — Platform DX",
    location: "Remote (Global)",
    isRemote: true,
    department: "Developer Experience",
    postedDate: "Updated 1 day ago",
    publicBoardUrl: "https://vercel.com/careers",
    jobDescriptionText: `Vercel Senior Full-Stack Engineer — Platform DX

At Vercel, we make the web faster. You will work on our core deployment infrastructure, Next.js framework optimizations, and serverless Edge runtime.

Requirements:
- 5+ years of software development experience with React, TypeScript, and Next.js.
- Strong expertise in Server Components, streaming SSR, and edge compute primitives.
- Experience building REST and GraphQL APIs backed by Node.js and PostgreSQL.
- Passion for Developer Experience (DevEx), automated testing (Playwright, Jest), and bundle optimization.
- Familiarity with CI/CD workflows and serverless deployments.`,
  },
  {
    id: "datadog-backend",
    companyName: "Datadog",
    roleTitle: "Software Engineer — Distributed Systems",
    location: "New York, NY / Remote",
    isRemote: true,
    department: "Telemetry & APM",
    postedDate: "Updated 4 days ago",
    publicBoardUrl: "https://www.datadoghq.com/careers",
    jobDescriptionText: `Datadog Software Engineer — Distributed Systems

Datadog is the monitoring and security platform for cloud applications. We process trillions of data points every day.

Requirements:
- 3+ years experience with Go, Python, or C++.
- Experience building high-throughput event streaming systems with Apache Kafka, Redis, or RabbitMQ.
- Solid understanding of Linux system internals, network protocols, and Kubernetes orchestration.
- PostgreSQL or Elasticsearch indexing and query optimization experience.
- Proven ability to troubleshoot latency bottlenecks in high-scale production environments.`,
  },
  {
    id: "figma-product-swe",
    companyName: "Figma",
    roleTitle: "Product Engineer — Collaboration & Editor",
    location: "San Francisco, CA / Remote",
    isRemote: true,
    department: "Product Engineering",
    postedDate: "Updated 2 days ago",
    publicBoardUrl: "https://www.figma.com/careers",
    jobDescriptionText: `Figma Product Engineer — Collaboration & Editor

Figma makes design accessible to everyone. We are looking for product engineers who care deeply about craft, speed, and real-time multiplayer systems.

Requirements:
- 4+ years of software engineering experience building complex web applications.
- Mastery of TypeScript, React, WebSockets, and state management.
- Experience collaborating closely with product designers to ship delightful micro-interactions.
- Performance profiling experience (Chrome DevTools, memory leaks, rendering latency).
- Familiarity with C++, WebAssembly, or canvas rendering is a plus.`,
  },
];

/**
 * Evaluates candidate resume against live company job listings.
 */
export function evaluateAllCompanyEligibility(
  resumeText: string,
  listings: CompanyJobListing[] = CURATED_COMPANY_JOBS
): CompanyEligibilityResult[] {
  return listings.map((job) => {
    const analysis = runHeuristicAnalysis(resumeText, job.jobDescriptionText);
    const score = analysis.scoreBreakdown.overallScore;

    let eligibilityVerdict: "Strong Match" | "Possible with tailoring" | "Significant gap" = "Possible with tailoring";
    if (score >= 78) {
      eligibilityVerdict = "Strong Match";
    } else if (score < 62) {
      eligibilityVerdict = "Significant gap";
    }

    // Build personalized action checklist
    const actionChecklist: { task: string; priority: "high" | "medium" }[] = [];
    if (analysis.missingSkills.length > 0) {
      actionChecklist.push({
        task: `Incorporate '${analysis.missingSkills[0].name}' into your technical skills or project summaries.`,
        priority: "high",
      });
    }
    if (analysis.rewrites.length > 0) {
      actionChecklist.push({
        task: `Adopt the suggested rewrite targeting '${analysis.rewrites[0].targetSkillOrKeyword}' to raise recruiter match rate.`,
        priority: "high",
      });
    }
    actionChecklist.push({
      task: `Highlight metrics showing throughput and team scale to clear ${job.companyName}'s engineering bar.`,
      priority: "medium",
    });

    const primaryMatched = analysis.matchedSkills[0]?.name || "distributed software architecture";
    const tailoredOutreachHook = `I noticed ${job.companyName} is expanding the ${job.roleTitle} team. Having recently scaled applications using ${primaryMatched}, I've solved the exact performance challenges your team is focusing on.`;

    return {
      job,
      eligibilityVerdict,
      matchScore: score,
      skillsOverlapPercent: analysis.scoreBreakdown.skillsScore,
      actionChecklist,
      tailoredOutreachHook,
    };
  });
}
