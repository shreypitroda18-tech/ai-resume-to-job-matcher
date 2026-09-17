import { CandidAuditFeedback } from "./types";

/**
 * Conducts a direct, no-punches-pulled Senior Recruiter Audit of resume text.
 */
export function generateCandidAudit(
  resumeText: string,
  jobDescriptionText: string,
  overallScore: number
): CandidAuditFeedback {
  const resumeLower = resumeText.toLowerCase();

  // 1. Detect Fluffy Buzzwords & Vague Filler
  const buzzwordRules = [
    { word: "results-driven", alt: "Delete this cliché; show results with a +% or $ metric instead." },
    { word: "team player", alt: "Demonstrate collaboration by citing cross-functional teams or mentorship count." },
    { word: "hard worker", alt: "Remove. High-performing engineering roles assume hard work; prove velocity." },
    { word: "responsible for", alt: "Rephrase with an active power verb: 'Led', 'Architected', or 'Delivered'." },
    { word: "helped", alt: "Too passive. State your exact individual contribution and technical ownership." },
    { word: "synergy", alt: "Corporate filler. Specify the exact system integration or team collaboration." },
    { word: "detail-oriented", alt: "Remove. Demonstrate it through clean code and thorough test coverage figures." },
    { word: "go-getter", alt: "Informal and non-descriptive. Replace with demonstrated initiative." },
    { word: "various", alt: "Vague. Name the exact number or names of systems, services, or clients." },
  ];

  const fluffDetected: { word: string; count: number; alternative: string }[] = [];
  for (const rule of buzzwordRules) {
    const regex = new RegExp(`\\b${rule.word}\\b`, "gi");
    const matches = resumeLower.match(regex);
    if (matches && matches.length > 0) {
      fluffDetected.push({
        word: rule.word,
        count: matches.length,
        alternative: rule.alt,
      });
    }
  }

  // 2. Title & Scope Mismatch Check
  let scopeTitleMismatch: string | undefined;
  const isSeniorTitle = /(senior|lead|staff|principal|head|director)/i.test(resumeText.slice(0, 1000));
  const hasMentorshipOrArchitecture = /(mentored|led|architected|spearheaded|roadmap|hired|strategy)/i.test(resumeText);

  if (isSeniorTitle && !hasMentorshipOrArchitecture) {
    scopeTitleMismatch =
      "Your title indicates Senior/Lead level, but your bullet points describe individual execution tasks. Recruiters at this level look for technical leadership, mentorship of junior engineers, and system architectural ownership.";
  }

  // 3. Red Flags & Bloat Check
  const redFlags: { flag: string; severity: "high" | "medium"; fix: string }[] = [];
  const lines = resumeText.split("\n").map((l) => l.trim()).filter(Boolean);

  // Check for overly long bullets (> 200 chars)
  const bloatedBullets = lines.filter(
    (l) => (l.startsWith("-") || l.startsWith("•")) && l.length > 220
  );
  if (bloatedBullets.length >= 2) {
    redFlags.push({
      flag: "Dense, Wall-of-Text Bullets",
      severity: "medium",
      fix: "Multiple bullet points exceed 3 lines. Recruiters scan horizontally; split them into punchy 1-to-2 line statements leading with the metric first.",
    });
  }

  // Check if unquantified bullets dominate
  const totalBullets = lines.filter((l) => l.startsWith("-") || l.startsWith("•") || l.startsWith("*"));
  const quantifiedBullets = totalBullets.filter((b) => /\d+%|\$\d+|\b\d+\s*(users|ms|engineers|teams|days)\b/i.test(b));

  if (totalBullets.length > 0 && quantifiedBullets.length / totalBullets.length < 0.4) {
    redFlags.push({
      flag: "Low Metric Density (Under 40% Quantified)",
      severity: "high",
      fix: "More than half your bullets describe duties rather than measurable outcomes. Add the Google X-Y-Z formula: 'Accomplished [X] as measured by [Y], by doing [Z]'.",
    });
  }

  // 4. What actually impressed the recruiter
  const whatImpressed: string[] = [];
  if (quantifiedBullets.length >= 3) {
    whatImpressed.push("Clear inclusion of concrete numbers, percentages, and scale metrics in your primary experience section.");
  }
  if (/(react|typescript|node|aws|docker|kubernetes|sql|python)/i.test(resumeText)) {
    whatImpressed.push("Strong baseline tech stack alignment matching modern enterprise production stacks.");
  }
  if (whatImpressed.length === 0) {
    whatImpressed.push("Clear linear career progression and consistent engineering tenure.");
  }

  // Summary
  const brutalSummary =
    overallScore >= 80
      ? "You have a solid technical foundation that clears initial screening. However, you are losing polish points on passive duty phrasing and buried metrics. Elevate the opening power verbs to guarantee callbacks."
      : overallScore >= 60
      ? "Right now, your resume looks like 70% of the applicant pile: capable, but passive and generic. You're listing what your team did rather than the exact leverage and technical impact you drove individually."
      : "In its current state, automated ATS filters and high-volume recruiters will likely screen this out within 10 seconds. You are missing core required tools and framing accomplishments as daily task assignments.";

  return {
    brutalSummary,
    fluffBuzzwordsDetected: fluffDetected,
    scopeTitleMismatch,
    redFlags,
    whatActuallyImpressedRecruiter: whatImpressed,
  };
}
