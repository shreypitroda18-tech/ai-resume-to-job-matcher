import {
  MatchAnalysisResult,
  SkillMatchItem,
  BulletRewrite,
  CoverLetter,
  CoverLetterTone,
  InterviewPrepItem,
  RoleComparisonItem,
} from "./types";
import { inspectAtsLayoutRisk } from "./ats-risk";
import { inspectKeywordStuffing } from "./keyword-stuffing";
import { simulateRecruiterHeatmap } from "./heatmap-simulator";
import { generateCandidAudit } from "./candid-audit";
import { estimateSalaryIntelligence } from "./salary-data";
import { generateLinkedInAndOutreach } from "./linkedin-outreach";

const SKILL_CATALOG: { name: string; category: string; aliases: string[] }[] = [
  // Languages
  { name: "TypeScript", category: "Languages", aliases: ["typescript", "ts"] },
  { name: "JavaScript", category: "Languages", aliases: ["javascript", "js", "es6", "esnext"] },
  { name: "Python", category: "Languages", aliases: ["python", "python3", "py"] },
  { name: "Java", category: "Languages", aliases: ["java", "core java"] },
  { name: "C++", category: "Languages", aliases: ["c++", "cpp"] },
  { name: "C#", category: "Languages", aliases: ["c#", "csharp", ".net"] },
  { name: "Go / Golang", category: "Languages", aliases: ["golang", "go"] },
  { name: "Rust", category: "Languages", aliases: ["rust"] },
  { name: "SQL", category: "Languages", aliases: ["sql", "structured query language"] },
  { name: "HTML / CSS", category: "Languages", aliases: ["html", "html5", "css", "css3"] },

  // Frontend Frameworks
  { name: "React", category: "Frontend", aliases: ["react", "react.js", "reactjs"] },
  { name: "Next.js", category: "Frontend", aliases: ["next.js", "nextjs", "next 14", "next 15"] },
  { name: "Vue.js", category: "Frontend", aliases: ["vue", "vue.js", "vuejs", "nuxt"] },
  { name: "Angular", category: "Frontend", aliases: ["angular", "angularjs"] },
  { name: "Tailwind CSS", category: "Frontend", aliases: ["tailwind", "tailwindcss"] },
  { name: "Redux", category: "Frontend", aliases: ["redux", "redux toolkit", "rtk"] },

  // Backend & APIs
  { name: "Node.js", category: "Backend", aliases: ["node", "node.js", "nodejs"] },
  { name: "Express.js", category: "Backend", aliases: ["express", "express.js", "expressjs"] },
  { name: "GraphQL", category: "Backend", aliases: ["graphql", "apollo", "apollo graphql"] },
  { name: "REST APIs", category: "Backend", aliases: ["rest", "restful", "rest api", "rest apis"] },
  { name: "Microservices", category: "Backend", aliases: ["microservices", "microservice", "service-oriented"] },
  { name: "Django / FastAPI", category: "Backend", aliases: ["django", "fastapi", "flask"] },
  { name: "Spring Boot", category: "Backend", aliases: ["spring", "spring boot", "springboot"] },

  // Databases & Storage
  { name: "PostgreSQL", category: "Databases", aliases: ["postgres", "postgresql", "psql"] },
  { name: "MongoDB", category: "Databases", aliases: ["mongo", "mongodb"] },
  { name: "Redis", category: "Databases", aliases: ["redis", "in-memory cache"] },
  { name: "Snowflake", category: "Databases", aliases: ["snowflake"] },
  { name: "Google BigQuery", category: "Databases", aliases: ["bigquery", "google bigquery"] },
  { name: "MySQL", category: "Databases", aliases: ["mysql"] },
  { name: "Elasticsearch", category: "Databases", aliases: ["elasticsearch", "elastic search", "elk"] },

  // Cloud & DevOps
  { name: "AWS", category: "Cloud & DevOps", aliases: ["aws", "amazon web services", "ec2", "s3", "lambda", "eks", "rds"] },
  { name: "Google Cloud (GCP)", category: "Cloud & DevOps", aliases: ["gcp", "google cloud", "google cloud platform"] },
  { name: "Microsoft Azure", category: "Cloud & DevOps", aliases: ["azure", "microsoft azure"] },
  { name: "Docker", category: "Cloud & DevOps", aliases: ["docker", "containerization", "containers"] },
  { name: "Kubernetes", category: "Cloud & DevOps", aliases: ["kubernetes", "k8s"] },
  { name: "Terraform", category: "Cloud & DevOps", aliases: ["terraform", "iac", "infrastructure as code"] },
  { name: "CI/CD Pipelines", category: "Cloud & DevOps", aliases: ["ci/cd", "continuous integration", "github actions", "gitlab ci", "jenkins"] },

  // Architecture & Messaging
  { name: "Kafka / Message Queues", category: "Architecture", aliases: ["kafka", "rabbitmq", "sqs", "event-driven", "pub/sub"] },
  { name: "System Design", category: "Architecture", aliases: ["system design", "distributed systems", "high availability", "scalability"] },
  { name: "Automated Testing", category: "Testing & Quality", aliases: ["jest", "cypress", "playwright", "unit testing", "integration testing", "tdd"] },

  // Data & Product
  { name: "Tableau / Looker", category: "Analytics", aliases: ["tableau", "looker", "power bi", "metabase"] },
  { name: "A/B Testing", category: "Product & Strategy", aliases: ["a/b testing", "ab testing", "experimentation", "multivariate testing"] },
  { name: "Agile / Scrum", category: "Methodology", aliases: ["agile", "scrum", "sprint planning", "jira"] },
  { name: "AI / LLM Integration", category: "AI & ML", aliases: ["llm", "large language models", "rag", "langchain", "openai", "gemini", "prompt engineering"] },
];

/**
 * Executes a deterministic ATS heuristic analysis on resume and job description.
 */
export function runHeuristicAnalysis(
  resumeText: string,
  jobDescriptionText: string
): MatchAnalysisResult {
  const resumeLower = resumeText.toLowerCase();
  const jdLower = jobDescriptionText.toLowerCase();

  // Extract candidate name & target job title
  const candidateName = extractCandidateName(resumeText);
  const jobTitle = extractJobTitle(jobDescriptionText);
  const companyName = extractCompany(jobDescriptionText);

  // 1. Identify skills mentioned in the Job Description
  const matchedSkills: SkillMatchItem[] = [];
  const missingSkills: SkillMatchItem[] = [];
  const partialSkills: SkillMatchItem[] = [];

  const niceToHaveSectionMatch = jdLower.match(/(nice to have|bonus|preferred|good to have|plus)[\s\S]*/i);
  const niceToHaveText = niceToHaveSectionMatch ? niceToHaveSectionMatch[0] : "";

  for (const skill of SKILL_CATALOG) {
    const inJd = skill.aliases.some((alias) => hasWord(jdLower, alias));
    if (!inJd) continue;

    const inNiceToHave = skill.aliases.some((alias) => niceToHaveText && hasWord(niceToHaveText, alias));
    const mentionsInJd = skill.aliases.reduce((count, alias) => count + countOccurrences(jdLower, alias), 0);

    let importance: "critical" | "important" | "nice-to-have" = "important";
    if (inNiceToHave) {
      importance = "nice-to-have";
    } else if (mentionsInJd >= 2 || /must have|required|requirements/i.test(jdLower)) {
      importance = "critical";
    }

    const inResume = skill.aliases.some((alias) => hasWord(resumeLower, alias));

    if (inResume) {
      const snippet = extractSnippet(resumeText, skill.aliases);
      matchedSkills.push({
        name: skill.name,
        category: skill.category,
        foundInResume: true,
        contextSnippet: snippet,
        importance,
        matchStatus: "matched",
      });
    } else {
      const hasRelated = checkPartialRelated(skill.name, resumeLower);
      if (hasRelated) {
        partialSkills.push({
          name: skill.name,
          category: skill.category,
          foundInResume: false,
          importance,
          matchStatus: "partial",
          recommendation: `You have adjacent background with ${hasRelated}. Explicitly showcase ${skill.name} in your skills section or project bullets.`,
        });
      } else {
        missingSkills.push({
          name: skill.name,
          category: skill.category,
          foundInResume: false,
          importance,
          matchStatus: "missing",
          recommendation: `Incorporate experience or certifications featuring ${skill.name} to clear automated ATS keyword gates.`,
        });
      }
    }
  }

  // Fallback if unusual JD
  if (matchedSkills.length + missingSkills.length + partialSkills.length < 4) {
    const jdWords = extractKeywords(jobDescriptionText);
    for (const kw of jdWords.slice(0, 8)) {
      if (hasWord(resumeLower, kw.toLowerCase())) {
        matchedSkills.push({
          name: kw,
          importance: "important",
          foundInResume: true,
          matchStatus: "matched",
          contextSnippet: extractSnippet(resumeText, [kw.toLowerCase()]),
        });
      } else {
        missingSkills.push({
          name: kw,
          importance: "critical",
          foundInResume: false,
          matchStatus: "missing",
          recommendation: `Include key JD terminology '${kw}' in your work experience summaries.`,
        });
      }
    }
  }

  // 2. Compute Weighted Scores
  const totalRelevantSkills = matchedSkills.length + missingSkills.length + partialSkills.length;
  const criticalMatched = matchedSkills.filter((s) => s.importance === "critical").length;
  const criticalTotal =
    criticalMatched +
    missingSkills.filter((s) => s.importance === "critical").length +
    partialSkills.filter((s) => s.importance === "critical").length;

  const skillsScore = totalRelevantSkills > 0
    ? Math.round(
        ((matchedSkills.length * 1.0 + partialSkills.length * 0.5) / totalRelevantSkills) * 100
      )
    : 70;

  const expMatch = evaluateExperience(resumeText, jobDescriptionText);
  const experienceScore = expMatch.score;
  const keywordDensityScore = evaluateKeywordDensity(resumeLower, jdLower);

  const overallScore = Math.min(
    98,
    Math.max(25, Math.round(skillsScore * 0.45 + experienceScore * 0.35 + keywordDensityScore * 0.2))
  );

  let summaryExplanation = "";
  if (overallScore >= 80) {
    summaryExplanation = `Strong overall match (${overallScore}/100) with key qualifications. You cover ${matchedSkills.length} requested core competencies, with only minor gaps in ${missingSkills.slice(0, 2).map((s) => s.name).join(", ") || "niche tools"}.`;
  } else if (overallScore >= 60) {
    summaryExplanation = `Moderate fit (${overallScore}/100). You satisfy baseline experience requirements, but miss ${missingSkills.filter((s) => s.importance === "critical").length} critical keywords that ATS filters frequently prioritize.`;
  } else {
    summaryExplanation = `Low initial match (${overallScore}/100). While your background indicates transferable abilities, the resume misses foundational required tools (${missingSkills.slice(0, 3).map((s) => s.name).join(", ")}).`;
  }

  // 3. Generate Targeted Bullet Point Rewrites
  const rewrites = generateBulletRewrites(resumeText, missingSkills, partialSkills, jobDescriptionText);

  // 4. ATS Checklist
  const atsChecklist = [
    {
      item: "Contact Info & Links",
      passed: /([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+|\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/.test(resumeText),
      note: "Email and phone number detected cleanly.",
    },
    {
      item: "Clear Section Headings",
      passed: /(experience|skills|education|projects|summary)/i.test(resumeText),
      note: "Standard standard headings (Experience, Skills, Education) parse reliably in ATS systems.",
    },
    {
      item: "Quantified Accomplishments",
      passed: /(\d+[%kM$+]|\$\d+|\b\d+\s*(users|clients|team|engineers|increase|improvement|reduction)\b)/i.test(resumeText),
      note: "Resume includes numerical metrics and measurable business outcomes.",
    },
    {
      item: "Action Verbs Leading Bullets",
      passed: /(architected|spearheaded|developed|engineered|designed|led|built|optimized|implemented)/i.test(resumeText),
      note: "Uses strong, active power verbs rather than passive descriptions.",
    },
    {
      item: "Critical Keyword Coverage",
      passed: criticalTotal === 0 || (criticalMatched / criticalTotal) >= 0.6,
      note: `${criticalMatched} of ${criticalTotal} critical job requirements found in your resume.`,
    },
  ];

  // 5. ATS Layout Risk Inspection
  const atsRiskInspection = inspectAtsLayoutRisk(resumeText, "text/plain", "Candidate Resume");

  // 6. Cover Letters across 3 Tones
  const coverLetters = generateCoverLetters(
    candidateName,
    jobTitle,
    companyName,
    matchedSkills,
    missingSkills,
    overallScore
  );

  // 7. Interview Prep & Gap-Bridging Cheat Sheet
  const interviewPrep = generateInterviewPrep(missingSkills, partialSkills, jobTitle);

  // 8. Keyword Stuffing & Overqualification Inspection
  const keywordStuffingInspection = inspectKeywordStuffing(resumeText, jobDescriptionText);

  // 9. 6-Second Recruiter Eye Heatmap Simulation
  const heatmapData = simulateRecruiterHeatmap(resumeText);

  // 10. Candid Recruiter Audit Mode
  const candidAudit = generateCandidAudit(resumeText, jobDescriptionText, overallScore);

  // 11. Role Compensation & Salary Intelligence
  const salaryIntelligence = estimateSalaryIntelligence(jobTitle, matchedSkills);

  // 12 & 13. LinkedIn Sync & Cold Outreach Messages
  const { linkedInSync, outreachMessages } = generateLinkedInAndOutreach(
    candidateName,
    jobTitle,
    companyName,
    matchedSkills,
    jobDescriptionText
  );

  return {
    scoreBreakdown: {
      overallScore,
      skillsScore,
      experienceScore,
      keywordDensityScore,
      summaryExplanation,
      confidenceRating: totalRelevantSkills >= 6 ? "High" : "Medium",
    },
    matchedSkills,
    missingSkills: sortSkillsByImportance(missingSkills),
    partialSkills: sortSkillsByImportance(partialSkills),
    rewrites,
    atsChecklist,
    atsRiskInspection,
    keywordStuffingInspection,
    heatmapData,
    candidAudit,
    salaryIntelligence,
    linkedInSync,
    outreachMessages,
    coverLetters,
    interviewPrep,
    jobTitleDetected: jobTitle,
    companyDetected: companyName,
    yearsOfExperienceMatch: expMatch.details,
    analyzedAt: new Date().toISOString(),
    engineUsed: "heuristic-ats",
    rawResumeText: resumeText,
    rawJobDescriptionText: jobDescriptionText,
  };
}

/**
 * Compares a resume across multiple job descriptions.
 */
export function compareMultipleRoles(
  resumeText: string,
  jobDescriptions: { id: string; text: string; label?: string }[]
): RoleComparisonItem[] {
  const comparisons: RoleComparisonItem[] = [];

  for (const item of jobDescriptions) {
    const analysis = runHeuristicAnalysis(resumeText, item.text);
    const topMissing = analysis.missingSkills.slice(0, 3).map((s) => s.name);

    comparisons.push({
      id: item.id,
      roleTitle: analysis.jobTitleDetected || item.label || "Target Role",
      company: analysis.companyDetected || "Employer",
      jobDescriptionText: item.text,
      overallScore: analysis.scoreBreakdown.overallScore,
      skillsScore: analysis.scoreBreakdown.skillsScore,
      experienceScore: analysis.scoreBreakdown.experienceScore,
      topMissingSkills: topMissing,
      isHighestOdds: false,
      fitSummary: analysis.scoreBreakdown.summaryExplanation,
    });
  }

  // Identify highest odds
  if (comparisons.length > 0) {
    let maxIdx = 0;
    for (let i = 1; i < comparisons.length; i++) {
      if (comparisons[i].overallScore > comparisons[maxIdx].overallScore) {
        maxIdx = i;
      }
    }
    comparisons[maxIdx].isHighestOdds = true;
  }

  return comparisons;
}

// Generator for Cover Letters (3 Tones)
function generateCoverLetters(
  candidateName: string,
  jobTitle: string,
  companyName: string,
  matchedSkills: SkillMatchItem[],
  missingSkills: SkillMatchItem[],
  score: number
): Record<CoverLetterTone, CoverLetter> {
  const topMatched = matchedSkills.slice(0, 3).map((s) => s.name).join(", ") || "core technical and domain skills";
  const primaryMatch = matchedSkills[0]?.name || "engineering";
  const addressCompany = companyName !== "the team" ? companyName : "your organization";

  // Tone 1: Confident & Technical
  const confidentOpening = `I am writing to express my enthusiastic interest in the ${jobTitle} position at ${addressCompany}. With deep hands-on expertise in ${topMatched}, I have consistently architected high-performance systems and led engineering initiatives from discovery to production.`;
  const confidentBody = `Throughout my recent roles, I have focused on measurable business outcomes and rigorous software craft. My background aligns directly with your technical requirements for ${primaryMatch}, where I have scaled distributed architecture, increased operational throughput, and partnered closely with product teams. I thrive in environments that value clean design patterns and resilient execution.`;
  const confidentClosing = `I would welcome the opportunity to discuss how my technical leadership and background in ${topMatched} can help ${addressCompany} deliver on its technical and growth goals this year. Thank you for your time and consideration.`;

  // Tone 2: Concise & Executive
  const executiveOpening = `Please accept this letter of interest for the ${jobTitle} opening at ${addressCompany}. My professional career has centered on scaling mission-critical platforms, driving cross-functional alignment, and delivering measurable revenue and efficiency gains.`;
  const executiveBody = `A review of your requirements demonstrates an ideal match for my background in ${topMatched}. Key accomplishments include driving double-digit performance optimizations, mentoring engineering talent, and delivering scalable solutions backed by robust CI/CD and architectural standards. I prioritize high-leverage business impact and pragmatic execution.`;
  const executiveClosing = `I look forward to discussing how my strategic orientation and execution velocity can drive immediate value for ${addressCompany}. Thank you for your review.`;

  // Tone 3: Startup Collaborative
  const startupOpening = `I was thrilled to see the ${jobTitle} opportunity at ${addressCompany}. I love building in fast-moving, high-ownership environments where engineers solve ambiguous problems directly and ship customer-centric products rapidly.`;
  const startupBody = `Your focus on ${topMatched} resonates strongly with my recent work. Whether diving deep into ${primaryMatch} challenges, iterating quickly alongside product designers, or wearing multiple hats to unblock releases, I enjoy taking end-to-end ownership of product initiatives. I am particularly excited by ${addressCompany}'s mission and pace of innovation.`;
  const startupClosing = `I would love to chat with the team about how my background and builder mindset can accelerate your roadmap. Looking forward to speaking with you!`;

  const formatFull = (open: string, body: string, close: string) =>
    `Dear Hiring Team at ${addressCompany},\n\n${open}\n\n${body}\n\n${close}\n\nSincerely,\n${candidateName}`;

  return {
    "confident-technical": {
      tone: "confident-technical",
      toneLabel: "Confident & Technical",
      jobTitle,
      companyName,
      openingParagraph: confidentOpening,
      bodyParagraph: confidentBody,
      closingParagraph: confidentClosing,
      fullText: formatFull(confidentOpening, confidentBody, confidentClosing),
    },
    "concise-executive": {
      tone: "concise-executive",
      toneLabel: "Concise & Executive",
      jobTitle,
      companyName,
      openingParagraph: executiveOpening,
      bodyParagraph: executiveBody,
      closingParagraph: executiveClosing,
      fullText: formatFull(executiveOpening, executiveBody, executiveClosing),
    },
    "startup-collaborative": {
      tone: "startup-collaborative",
      toneLabel: "Startup Collaborative",
      jobTitle,
      companyName,
      openingParagraph: startupOpening,
      bodyParagraph: startupBody,
      closingParagraph: startupClosing,
      fullText: formatFull(startupOpening, startupBody, startupClosing),
    },
  };
}

// Generator for Interview Prep & Gap-Bridging Cheat Sheet
function generateInterviewPrep(
  missingSkills: SkillMatchItem[],
  partialSkills: SkillMatchItem[],
  jobTitle: string
): InterviewPrepItem[] {
  const gaps = [...missingSkills, ...partialSkills].slice(0, 4);
  const items: InterviewPrepItem[] = [];

  const bridgingTemplates: Record<string, { q: string; why: string; bridge: string }> = {
    "Kubernetes": {
      q: "We run our microservices on Kubernetes. I noticed your background is mostly Docker and AWS EC2. How will you handle deployment and cluster management here?",
      why: "The interviewer wants to see whether container orchestration is an intimidating blocker or a quick ramp-up.",
      bridge:
        "While my production experience has centered on Docker and AWS container services (EC2/ECS), the containerization primitives, pod lifecycle, and networking concepts translate directly. In past roles, I've mastered local Minikube workflows, and I'm very comfortable with container manifests and CI/CD pipelines. I typically ramp up on orchestration tooling within a couple of weeks.",
    },
    "Next.js": {
      q: "Our entire frontend is built on Next.js App Router and Server Components. How comfortable are you transitioning from pure React?",
      why: "They are testing your understanding of server-side rendering, streaming, and modern React 19 paradigms.",
      bridge:
        "My deep foundation in React and TypeScript makes this transition very natural. The core state and component lifecycles are identical; the key shift with Next.js App Router is architecting clean boundaries between Server and Client Components to minimize bundle size. I've already built projects utilizing Next.js routing and SSR, and I thoroughly enjoy the performance advantages.",
    },
    "GraphQL": {
      q: "We use GraphQL APIs with Apollo rather than REST endpoints. Have you queried or designed GraphQL schemas?",
      why: "Evaluating how you handle schema-driven development, resolvers, and caching.",
      bridge:
        "I've designed high-throughput REST APIs and microservices, so I'm deeply familiar with payload optimization, caching, and rate limiting. With GraphQL, I appreciate how it solves over-fetching and allows clients to request exact fields. While my daily production work was REST, I've experimented with GraphQL schemas and understand resolver structures and DataLoader patterns to avoid N+1 query traps.",
    },
    "Terraform": {
      q: "We manage our infrastructure as code using Terraform. What has your experience been with automated cloud provisioning?",
      why: "Verifying whether you can contribute to infrastructure safely without manual console tweaking.",
      bridge:
        "I have hands-on experience configuring AWS cloud infrastructure and deploying via automated CI/CD pipelines. While I previously used native CloudFormation/CLI scripts, the declarative state management in Terraform follows the exact same architectural principles. I respect the discipline of immutable infrastructure and PR-based plan/apply workflows.",
    },
  };

  gaps.forEach((gap, idx) => {
    const template = bridgingTemplates[gap.name] || {
      q: `The job posting specifically requires ${gap.name}. Can you speak to your familiarity with it or how you've handled similar requirements?`,
      why: `The hiring manager wants to ensure you won't struggle with this specific qualification during your first 90 days.`,
      bridge: `I haven't used ${gap.name} as my primary daily tool in my most recent role, but I have extensive experience with adjacent technologies that share the exact same underlying principles. When faced with new tooling, I focus on the foundational design patterns first, consult documentation, and deliver small testable features quickly. I ramp up rapidly and bring cross-pollinated insights from other systems.`,
    };

    items.push({
      id: `prep-${idx + 1}`,
      missingSkill: gap.name,
      predictedQuestion: template.q,
      questionType: idx % 2 === 0 ? "technical" : "experience-gap",
      whyAsked: template.why,
      bridgingScript: template.bridge,
    });
  });

  return items;
}

// Helpers
function extractCandidateName(text: string): string {
  const firstLine = text.trim().split("\n")[0]?.trim() || "Candidate";
  if (firstLine.length < 35 && !firstLine.includes("@") && !firstLine.includes("|")) {
    return firstLine;
  }
  return "Candidate";
}

function extractJobTitle(text: string): string {
  const firstLine = text.trim().split("\n")[0]?.trim() || "";
  const match = firstLine.match(/^([A-Za-z0-9\s/—–-]+)/);
  if (match && match[1].length > 4 && match[1].length < 60) {
    return match[1].split(/—|–|-/)[0].trim();
  }
  return "Target Role";
}

function extractCompany(text: string): string {
  const match = text.match(/(at|@)\s+([A-Z][A-Za-z0-9\s&]+)/);
  if (match && match[2].length < 30) {
    return match[2].trim();
  }
  return "the team";
}

function hasWord(text: string, term: string): boolean {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(^|[^a-zA-Z0-9_#+])${escaped}([^a-zA-Z0-9_#+]|$)`, "i");
  return regex.test(text);
}

function countOccurrences(text: string, term: string): number {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(^|[^a-zA-Z0-9_#+])${escaped}([^a-zA-Z0-9_#+]|$)`, "gi");
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

function extractSnippet(text: string, aliases: string[]): string {
  const lines = text.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length > 20 && aliases.some((a) => hasWord(trimmed.toLowerCase(), a))) {
      return trimmed.replace(/^[-*•]\s*/, "");
    }
  }
  return "Mentioned in resume profile";
}

function checkPartialRelated(skillName: string, resumeLower: string): string | null {
  const relatedMap: Record<string, string[]> = {
    "Next.js": ["react", "frontend"],
    "Kubernetes": ["docker", "container"],
    "GraphQL": ["rest", "api", "backend"],
    "TypeScript": ["javascript", "js"],
    "Snowflake": ["sql", "postgresql", "bigquery"],
    "Terraform": ["aws", "cloud", "docker"],
    "Kafka / Message Queues": ["redis", "microservices", "rabbitmq"],
    "Looker": ["tableau", "power bi", "sql"],
  };

  const check = relatedMap[skillName];
  if (!check) return null;
  for (const item of check) {
    if (hasWord(resumeLower, item)) {
      return item.toUpperCase();
    }
  }
  return null;
}

function sortSkillsByImportance(skills: SkillMatchItem[]): SkillMatchItem[] {
  const order = { critical: 1, important: 2, "nice-to-have": 3 };
  return [...skills].sort((a, b) => order[a.importance] - order[b.importance]);
}

function evaluateExperience(resumeText: string, jdText: string): {
  score: number;
  details: {
    requiredYears: string;
    candidateEstimatedYears: string;
    status: "meets" | "partial" | "below" | "not-specified";
  };
} {
  const jdYearsMatch = jdText.match(/(\d+)\+?\s*(years|yrs|year)\b/i);
  const reqYears = jdYearsMatch ? parseInt(jdYearsMatch[1], 10) : 3;

  const resumeYearsMatch = resumeText.match(/(\d+)\+?\s*(years|yrs|year)\b/i);
  let candYears = 4;
  if (resumeYearsMatch) {
    candYears = parseInt(resumeYearsMatch[1], 10);
  } else {
    const years = resumeText.match(/\b(20[0-2][0-9]|199[0-9])\b/g);
    if (years && years.length >= 2) {
      const nums = years.map(Number).sort();
      candYears = Math.max(1, nums[nums.length - 1] - nums[0]);
    }
  }

  let status: "meets" | "partial" | "below" | "not-specified" = "meets";
  let score = 85;

  if (candYears >= reqYears) {
    status = "meets";
    score = 92;
  } else if (candYears >= reqYears - 1) {
    status = "partial";
    score = 75;
  } else {
    status = "below";
    score = 58;
  }

  return {
    score,
    details: {
      requiredYears: `${reqYears}+ years`,
      candidateEstimatedYears: `~${candYears} years detected`,
      status,
    },
  };
}

function evaluateKeywordDensity(resumeLower: string, jdLower: string): number {
  const words = extractKeywords(jdLower);
  if (words.length === 0) return 75;

  let hits = 0;
  for (const w of words) {
    if (resumeLower.includes(w)) hits++;
  }

  const ratio = hits / words.length;
  return Math.min(95, Math.max(40, Math.round(ratio * 100)));
}

function extractKeywords(text: string): string[] {
  const stopwords = new Set([
    "with", "from", "that", "this", "have", "experience", "looking", "about",
    "will", "team", "years", "role", "work", "ability", "strong", "skills",
    "across", "using", "such", "must", "plus", "understanding", "good",
    "knowledge", "building", "design", "development", "lead", "responsibilities"
  ]);

  const tokens = text.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
  const freq: Record<string, number> = {};
  for (const t of tokens) {
    if (!stopwords.has(t)) {
      freq[t] = (freq[t] || 0) + 1;
    }
  }

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([word]) => word);
}

function generateBulletRewrites(
  resumeText: string,
  missingSkills: SkillMatchItem[],
  partialSkills: SkillMatchItem[],
  jdText: string
): BulletRewrite[] {
  const lines = resumeText
    .split("\n")
    .map((l) => l.trim().replace(/^[-*•]\s*/, ""))
    .filter((l) => l.length > 35 && l.length < 220);

  const missingNames = [...missingSkills, ...partialSkills].map((s) => s.name);
  const rewrites: BulletRewrite[] = [];

  for (let i = 0; i < lines.length && rewrites.length < 4; i++) {
    const line = lines[i];
    const targetSkill = missingNames[rewrites.length] || "CI/CD & Scalability";

    if (line.includes("|") || /^(education|skills|summary|experience)/i.test(line)) continue;

    if (/developed|built|created|responsible for|worked on|maintained|engineered/i.test(line)) {
      const rewritten = elevateBullet(line, targetSkill, jdText);
      if (rewritten !== line) {
        rewrites.push({
          id: `rewrite-${rewrites.length + 1}`,
          originalBullet: line,
          suggestedBullet: rewritten,
          targetSkillOrKeyword: targetSkill,
          rationale: `Replaces passive phrasing with high-impact power verb and embeds missing JD priority '${targetSkill}' with quantifiable results.`,
          atsImpact: `Directly matches '${targetSkill}' search queries in ATS parsers and signals senior-level ownership.`,
        });
      }
    }
  }

  if (rewrites.length === 0 && lines.length > 0) {
    const fallbackSkill = missingNames[0] || "Key Architecture & Performance";
    const line = lines[0];
    rewrites.push({
      id: "rewrite-1",
      originalBullet: line,
      suggestedBullet: `Architected and scaled core features utilizing ${fallbackSkill}, improving system throughput by 35% and accelerating release cycles across the team.`,
      targetSkillOrKeyword: fallbackSkill,
      rationale: `Transforms general duties into an outcome-oriented accomplishment targeting '${fallbackSkill}'.`,
      atsImpact: `Highlights measurable outcome and directly incorporates high-frequency JD keyword.`,
    });
  }

  return rewrites;
}

function elevateBullet(original: string, targetSkill: string, _jdText: string): string {
  let cleaned = original;

  cleaned = cleaned.replace(/^worked on/i, "Spearheaded development of");
  cleaned = cleaned.replace(/^responsible for/i, "Directed");
  cleaned = cleaned.replace(/^developed/i, "Architected and deployed");
  cleaned = cleaned.replace(/^built/i, "Engineered and scaled");
  cleaned = cleaned.replace(/^maintained/i, "Optimized and maintained");

  if (!cleaned.toLowerCase().includes(targetSkill.toLowerCase())) {
    if (cleaned.includes(",")) {
      cleaned = cleaned.replace(/,/, ` leveraging ${targetSkill},`);
    } else {
      cleaned = `${cleaned}, integrating ${targetSkill} to enhance performance and operational reliability`;
    }
  }

  if (!/\d+%|\$\d+|\b\d+\s*(users|ms|daily|monthly)\b/i.test(cleaned)) {
    cleaned += ", driving a 30% reduction in processing latency and improving team delivery speed";
  }

  return cleaned;
}
