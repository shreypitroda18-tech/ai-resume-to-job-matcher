export interface SkillMatchItem {
  name: string;
  category?: string;
  foundInResume: boolean;
  contextSnippet?: string;
  importance: "critical" | "important" | "nice-to-have";
  matchStatus: "matched" | "partial" | "missing";
  recommendation?: string;
}

export interface BulletRewrite {
  id: string;
  originalBullet: string;
  suggestedBullet: string;
  targetSkillOrKeyword: string;
  rationale: string;
  atsImpact: string;
}

export interface ScoreBreakdown {
  overallScore: number;
  skillsScore: number;
  experienceScore: number;
  keywordDensityScore: number;
  summaryExplanation: string;
  confidenceRating: "High" | "Medium" | "Low";
}

export interface AtsRiskCheck {
  name: string;
  passed: boolean;
  details: string;
}

export interface AtsRiskInspection {
  safetyScore: number;
  status: "pass" | "warning" | "alert";
  headline: string;
  explanation: string;
  checks: AtsRiskCheck[];
}

// Feature 7: Keyword Stuffing & Overqualification
export interface KeywordStuffingInspection {
  stuffingScore: number; // 0-100 (100 is healthy, <70 is spam penalty risk)
  isRiskDetected: boolean;
  repeatedTerms: { term: string; count: number; riskLevel: "safe" | "moderate" | "excessive" }[];
  overqualificationCheck: {
    isOverqualified: boolean;
    candidateYears: number;
    targetYears: number;
    warningMessage?: string;
    downlevelingAdvice?: string;
  };
}

// Feature 9: 6-Second Glance Eye-Tracking Heatmap
export interface BuriedMetricAlert {
  id: string;
  metric: string;
  currentLocation: string; // e.g. "Job #2, bullet 4"
  recommendation: string; // e.g. "Move to Job #1, bullet 1 to catch the 6-second scan"
}

export interface RecruiterHeatmapData {
  aboveTheFoldScore: number; // 0-100
  scanPatternVerdict: string;
  fixationPoints: { xPercent: number; yPercent: number; intensity: number; label: string }[];
  buriedMetrics: BuriedMetricAlert[];
  scannabilityChecklist: { item: string; passed: boolean; note: string }[];
}

// Feature 10: Candid Recruiter Audit Mode
export interface CandidAuditFeedback {
  brutalSummary: string;
  fluffBuzzwordsDetected: { word: string; count: number; alternative: string }[];
  scopeTitleMismatch?: string;
  redFlags: { flag: string; severity: "high" | "medium"; fix: string }[];
  whatActuallyImpressedRecruiter: string[];
}

// Feature 11: Role Compensation & Salary Intelligence
export interface SalaryIntelligence {
  jobTitle: string;
  estimatedSeniority: string;
  percentile25: number;
  percentile50: number;
  percentile75: number;
  currency: string;
  locationScope: string;
  negotiationTalkingPoints: {
    point: string;
    groundedInSkill: string;
    script: string;
  }[];
  dataSourceDisclaimer: string;
}

// Feature 12: LinkedIn Profile Sync
export interface LinkedInProfileSync {
  suggestedHeadline: string;
  aboutSection: string;
  topSkillsToPin: string[];
}

// Feature 13: Cold Outreach Messages
export interface ColdOutreachMessages {
  hiringManagerInMail: {
    subject: string;
    body: string;
    wordCount: number;
  };
  peerReferralAsk: {
    subject: string;
    body: string;
    wordCount: number;
  };
  sevenDayFollowUp: {
    subject: string;
    body: string;
    wordCount: number;
  };
}

// Feature 14: Private Local Application Tracker
export type ApplicationStatus = "tailored" | "applied" | "interviewing" | "offer" | "rejected";

export interface ApplicationTrackerItem {
  id: string;
  company: string;
  roleTitle: string;
  matchScore: number;
  status: ApplicationStatus;
  dateAdded: string;
  jobDescriptionText: string;
  tailoredResumeText: string;
  coverLetterText?: string;
  notes?: string;
}

// Feature 15: Company Eligibility Matcher
export interface CompanyJobListing {
  id: string;
  companyName: string;
  companyLogo?: string;
  roleTitle: string;
  location: string;
  isRemote: boolean;
  department: string;
  postedDate: string;
  publicBoardUrl: string;
  jobDescriptionText: string;
}

export interface CompanyEligibilityResult {
  job: CompanyJobListing;
  eligibilityVerdict: "Strong Match" | "Possible with tailoring" | "Significant gap";
  matchScore: number;
  skillsOverlapPercent: number;
  actionChecklist: { task: string; priority: "high" | "medium" }[];
  tailoredOutreachHook: string;
}

// Feature 16: Resume Builder From Scratch
export interface GuidedExperienceEntry {
  id: string;
  roleTitle: string;
  company: string;
  duration: string;
  problemSolved: string;
  actionTaken: string;
  quantifiedResult: string;
  generatedBullet: string;
}

export interface ResumeBuilderState {
  contactInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };
  summary: string;
  experiences: GuidedExperienceEntry[];
  education: {
    school: string;
    degree: string;
    gradYear: string;
  }[];
  skills: string;
  projects: string;
  strengthScore: number; // 0-100
}

export type CoverLetterTone = "confident-technical" | "concise-executive" | "startup-collaborative";

export interface CoverLetter {
  tone: CoverLetterTone;
  toneLabel: string;
  jobTitle: string;
  companyName: string;
  openingParagraph: string;
  bodyParagraph: string;
  closingParagraph: string;
  fullText: string;
}

export interface InterviewPrepItem {
  id: string;
  missingSkill: string;
  predictedQuestion: string;
  questionType: "technical" | "behavioral" | "experience-gap";
  bridgingScript: string;
  whyAsked: string;
}

export interface RoleComparisonItem {
  id: string;
  roleTitle: string;
  company: string;
  jobDescriptionText: string;
  overallScore: number;
  skillsScore: number;
  experienceScore: number;
  topMissingSkills: string[];
  isHighestOdds: boolean;
  fitSummary: string;
}

export interface MatchAnalysisResult {
  scoreBreakdown: ScoreBreakdown;
  matchedSkills: SkillMatchItem[];
  missingSkills: SkillMatchItem[];
  partialSkills: SkillMatchItem[];
  rewrites: BulletRewrite[];
  atsChecklist: {
    item: string;
    passed: boolean;
    note: string;
  }[];
  atsRiskInspection?: AtsRiskInspection;
  keywordStuffingInspection?: KeywordStuffingInspection;
  heatmapData?: RecruiterHeatmapData;
  candidAudit?: CandidAuditFeedback;
  salaryIntelligence?: SalaryIntelligence;
  linkedInSync?: LinkedInProfileSync;
  outreachMessages?: ColdOutreachMessages;
  coverLetters?: Record<CoverLetterTone, CoverLetter>;
  interviewPrep?: InterviewPrepItem[];
  jobTitleDetected?: string;
  companyDetected?: string;
  yearsOfExperienceMatch?: {
    requiredYears: string;
    candidateEstimatedYears: string;
    status: "meets" | "partial" | "below" | "not-specified";
  };
  analyzedAt: string;
  engineUsed: "gemini-ai" | "heuristic-ats";
  rawResumeText: string;
  rawJobDescriptionText: string;
  resumeText?: string;
  jobDescriptionText?: string;
}

export interface AnalysisRequest {
  resumeText: string;
  jobDescriptionText: string;
  apiKey?: string;
}

export interface ParseResult {
  text: string;
  pageCount?: number;
  wordCount: number;
  fileName?: string;
  atsRiskInspection?: AtsRiskInspection;
}
