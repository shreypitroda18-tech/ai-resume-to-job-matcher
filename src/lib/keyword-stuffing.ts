import { KeywordStuffingInspection } from "./types";

/**
 * Evaluates keyword repetition frequency and overqualification risk.
 */
export function inspectKeywordStuffing(
  resumeText: string,
  jobDescriptionText: string
): KeywordStuffingInspection {
  const resumeLower = resumeText.toLowerCase();
  const jdLower = jobDescriptionText.toLowerCase();

  // Extract core keywords from JD
  const words = jdLower.match(/\b[a-z]{3,}\b/g) || [];
  const stopwords = new Set([
    "with", "from", "that", "this", "have", "experience", "looking", "about",
    "will", "team", "years", "role", "work", "ability", "strong", "skills",
    "across", "using", "such", "must", "plus", "understanding", "good",
    "knowledge", "building", "design", "development", "lead", "responsibilities"
  ]);

  const jdKeywords: Record<string, number> = {};
  for (const w of words) {
    if (!stopwords.has(w)) {
      jdKeywords[w] = (jdKeywords[w] || 0) + 1;
    }
  }

  // Count repetitions in resume
  const repeatedTerms: { term: string; count: number; riskLevel: "safe" | "moderate" | "excessive" }[] = [];
  let excessiveCount = 0;

  for (const [term] of Object.entries(jdKeywords).slice(0, 20)) {
    const regex = new RegExp(`\\b${term}\\b`, "gi");
    const count = (resumeLower.match(regex) || []).length;

    if (count > 0) {
      let riskLevel: "safe" | "moderate" | "excessive" = "safe";
      if (count >= 7) {
        riskLevel = "excessive";
        excessiveCount++;
      } else if (count >= 4) {
        riskLevel = "moderate";
      }

      repeatedTerms.push({
        term: term.charAt(0).toUpperCase() + term.slice(1),
        count,
        riskLevel,
      });
    }
  }

  // Overqualification check (experience years)
  const resumeYearsMatch = resumeText.match(/(\d+)\+?\s*(years|yrs|year)\b/i);
  const jdYearsMatch = jobDescriptionText.match(/(\d+)\+?\s*(years|yrs|year)\b/i);

  const candidateYears = resumeYearsMatch ? parseInt(resumeYearsMatch[1], 10) : 5;
  const targetYears = jdYearsMatch ? parseInt(jdYearsMatch[1], 10) : 3;

  const isOverqualified = candidateYears >= targetYears + 4;
  let warningMessage: string | undefined;
  let downlevelingAdvice: string | undefined;

  if (isOverqualified) {
    warningMessage = `Candidate has ~${candidateYears} years of experience applying to a role requesting ~${targetYears} years. Recruiters may screen you out as "too expensive" or likely to be bored.`;
    downlevelingAdvice = `Emphasize hands-on technical execution rather than executive management. Focus bullet points on active building, direct coding, and individual delivery to reassure hiring managers.`;
  }

  const stuffingScore = Math.max(30, 100 - excessiveCount * 20);

  return {
    stuffingScore,
    isRiskDetected: excessiveCount > 0 || isOverqualified,
    repeatedTerms: repeatedTerms.sort((a, b) => b.count - a.count).slice(0, 8),
    overqualificationCheck: {
      isOverqualified,
      candidateYears,
      targetYears,
      warningMessage,
      downlevelingAdvice,
    },
  };
}
