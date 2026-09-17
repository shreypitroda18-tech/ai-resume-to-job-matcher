import { GoogleGenAI } from "@google/genai";
import { MatchAnalysisResult } from "./types";
import { runHeuristicAnalysis } from "./heuristic-matcher";
import { inspectAtsLayoutRisk } from "./ats-risk";

const SYSTEM_PROMPT = `You are an elite ATS (Applicant Tracking System) and Executive Tech Recruiter specialist.
Analyze a candidate's resume text against a target job description.

Provide an unbiased, rigorous, explainable evaluation with the following structured JSON output:
{
  "scoreBreakdown": {
    "overallScore": number (0-100),
    "skillsScore": number (0-100),
    "experienceScore": number (0-100),
    "keywordDensityScore": number (0-100),
    "summaryExplanation": string (2-3 sentences explaining exactly why this score was awarded),
    "confidenceRating": "High" | "Medium" | "Low"
  },
  "matchedSkills": [
    {
      "name": string,
      "category": string,
      "foundInResume": true,
      "contextSnippet": string,
      "importance": "critical" | "important" | "nice-to-have",
      "matchStatus": "matched"
    }
  ],
  "missingSkills": [
    {
      "name": string,
      "category": string,
      "foundInResume": false,
      "importance": "critical" | "important" | "nice-to-have",
      "matchStatus": "missing",
      "recommendation": string
    }
  ],
  "partialSkills": [
    {
      "name": string,
      "category": string,
      "foundInResume": false,
      "importance": "critical" | "important" | "nice-to-have",
      "matchStatus": "partial",
      "recommendation": string
    }
  ],
  "rewrites": [
    {
      "id": string,
      "originalBullet": string,
      "suggestedBullet": string,
      "targetSkillOrKeyword": string,
      "rationale": string,
      "atsImpact": string
    }
  ],
  "atsChecklist": [
    {
      "item": string,
      "passed": boolean,
      "note": string
    }
  ],
  "jobTitleDetected": string,
  "companyDetected": string,
  "yearsOfExperienceMatch": {
    "requiredYears": string,
    "candidateEstimatedYears": string,
    "status": "meets" | "partial" | "below" | "not-specified"
  }
}
`;

export async function analyzeMatchWithAI(
  resumeText: string,
  jobDescriptionText: string,
  customApiKey?: string
): Promise<MatchAnalysisResult> {
  const apiKey = customApiKey || process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === "") {
    return runHeuristicAnalysis(resumeText, jobDescriptionText);
  }

  try {
    const ai = new GoogleGenAI({ apiKey: apiKey.trim() });

    const prompt = `RESUME TEXT:
"""
${resumeText.slice(0, 10000)}
"""

JOB DESCRIPTION:
"""
${jobDescriptionText.slice(0, 8000)}
"""

Perform the ATS match analysis and output strictly valid JSON conforming to the requested schema.`;

    const modelName = process.env.GEMINI_MODEL || "gemini-2.0-flash";
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response from Gemini API");
    }

    const parsedData = JSON.parse(responseText) as Partial<MatchAnalysisResult>;

    if (
      !parsedData.scoreBreakdown ||
      typeof parsedData.scoreBreakdown.overallScore !== "number" ||
      !Array.isArray(parsedData.matchedSkills) ||
      !Array.isArray(parsedData.missingSkills)
    ) {
      throw new Error("Malformed JSON structure received from model");
    }

    // Run layout inspection and supplementary generators for complete feature parity
    const heuristicFallback = runHeuristicAnalysis(resumeText, jobDescriptionText);
    const atsRiskInspection = inspectAtsLayoutRisk(resumeText, "text/plain", "Candidate Resume");

    return {
      scoreBreakdown: parsedData.scoreBreakdown,
      matchedSkills: parsedData.matchedSkills,
      missingSkills: parsedData.missingSkills,
      partialSkills: parsedData.partialSkills || [],
      rewrites: parsedData.rewrites && parsedData.rewrites.length > 0 ? parsedData.rewrites : heuristicFallback.rewrites,
      atsChecklist: parsedData.atsChecklist || heuristicFallback.atsChecklist,
      atsRiskInspection,
      keywordStuffingInspection: heuristicFallback.keywordStuffingInspection,
      heatmapData: heuristicFallback.heatmapData,
      candidAudit: heuristicFallback.candidAudit,
      salaryIntelligence: heuristicFallback.salaryIntelligence,
      linkedInSync: heuristicFallback.linkedInSync,
      outreachMessages: heuristicFallback.outreachMessages,
      coverLetters: heuristicFallback.coverLetters,
      interviewPrep: heuristicFallback.interviewPrep,
      jobTitleDetected: parsedData.jobTitleDetected || heuristicFallback.jobTitleDetected,
      companyDetected: parsedData.companyDetected || heuristicFallback.companyDetected,
      yearsOfExperienceMatch: parsedData.yearsOfExperienceMatch || heuristicFallback.yearsOfExperienceMatch,
      analyzedAt: new Date().toISOString(),
      engineUsed: "gemini-ai",
      rawResumeText: resumeText,
      rawJobDescriptionText: jobDescriptionText,
    };
  } catch (error) {
    console.warn("AI analysis encountered an error, falling back to heuristic matcher:", error);
    return runHeuristicAnalysis(resumeText, jobDescriptionText);
  }
}
