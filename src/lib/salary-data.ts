import { SalaryIntelligence, SkillMatchItem } from "./types";

/**
 * Generates market compensation intelligence and negotiation talking points.
 */
export function estimateSalaryIntelligence(
  jobTitle: string,
  matchedSkills: SkillMatchItem[],
  locationScope = "US National / Remote Benchmark"
): SalaryIntelligence {
  const lowerTitle = jobTitle.toLowerCase();

  // Baseline market ranges for common tech roles (in USD)
  let base25 = 115000;
  let base50 = 145000;
  let base75 = 180000;
  let estimatedSeniority = "Mid-Level";

  if (/senior|sr\.|lead/i.test(lowerTitle)) {
    estimatedSeniority = "Senior";
    base25 = 145000;
    base50 = 178000;
    base75 = 215000;
  } else if (/staff|principal|director/i.test(lowerTitle)) {
    estimatedSeniority = "Staff / Principal";
    base25 = 185000;
    base50 = 230000;
    base75 = 285000;
  } else if (/junior|entry|associate/i.test(lowerTitle)) {
    estimatedSeniority = "Junior / Associate";
    base25 = 85000;
    base50 = 105000;
    base75 = 128000;
  }

  // Domain adjustments
  if (/product manager|pm\b/i.test(lowerTitle)) {
    base50 += 10000;
    base75 += 15000;
  } else if (/data scientist|machine learning|ml\b|ai\b/i.test(lowerTitle)) {
    base50 += 18000;
    base75 += 25000;
  }

  // Tech stack premium (Distributed systems, AWS, Kubernetes, Next.js)
  const premiumSkills = ["Kubernetes", "AWS", "System Design", "Microservices", "TypeScript"];
  const matchedPremiums = matchedSkills.filter((s) => premiumSkills.includes(s.name));
  if (matchedPremiums.length >= 2) {
    base50 += 8000;
    base75 += 12000;
  }

  // Generate 2 custom negotiation talking points grounded in candidate's matched skills
  const topSkill1 = matchedSkills[0]?.name || "core full-stack architecture";
  const topSkill2 = matchedSkills[1]?.name || "scalable database optimization";

  const negotiationTalkingPoints = [
    {
      point: "Zero-Ramp Up Justification for Upper Percentile",
      groundedInSkill: topSkill1,
      script: `“Based on my deep production background in ${topSkill1}, I will be able to contribute to high-priority deliverables immediately without a lengthy onboarding runway. For that reason, I am targeting compensation aligned with your 75th percentile ($${base75.toLocaleString()}).”`,
    },
    {
      point: "Cross-Functional Architecture Leverage",
      groundedInSkill: topSkill2,
      script: `“In addition to core development, my experience with ${topSkill2} allows me to elevate team best practices and optimize system throughput from day one. I'm looking for a total package around $${base50.toLocaleString()} that reflects this dual technical and execution leverage.”`,
    },
  ];

  return {
    jobTitle: jobTitle || "Target Role",
    estimatedSeniority,
    percentile25: base25,
    percentile50: base50,
    percentile75: base75,
    currency: "USD",
    locationScope,
    negotiationTalkingPoints,
    dataSourceDisclaimer:
      "Compensation figures are directional estimates modeled from Levels.fyi tech benchmarks and Bureau of Labor Statistics tech sector percentiles. Actual offers depend on company stage, equity structure, and interview loop ratings.",
  };
}
