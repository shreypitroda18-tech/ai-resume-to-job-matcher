import { LinkedInProfileSync, ColdOutreachMessages, SkillMatchItem } from "./types";

/**
 * Generates tailored LinkedIn profile positioning and cold outreach messages.
 */
export function generateLinkedInAndOutreach(
  candidateName: string,
  jobTitle: string,
  companyName: string,
  matchedSkills: SkillMatchItem[],
  jobDescriptionText: string
): { linkedInSync: LinkedInProfileSync; outreachMessages: ColdOutreachMessages } {
  const topMatched = matchedSkills.slice(0, 3).map((s) => s.name);
  const primarySkill = topMatched[0] || "Full-Stack Engineering";
  const secondarySkill = topMatched[1] || "Distributed Systems";
  const thirdSkill = topMatched[2] || "Cloud Architecture";
  const addressCompany = companyName !== "the team" ? companyName : "your team";

  // 1. LinkedIn Profile Sync
  const suggestedHeadline = `${jobTitle} | ${primarySkill}, ${secondarySkill} & ${thirdSkill} | Building Resilient High-Scale Systems`;

  const aboutSection = `I am a ${jobTitle.toLowerCase()} focused on turning complex technical challenges into scalable, high-performing products. With deep expertise in ${primarySkill} and ${secondarySkill}, I've led initiatives spanning distributed backend services, high-traffic web applications, and automated CI/CD deployment pipelines.\n\nThroughout my career, I've prioritized measurable business impact — dropping query latencies, expanding engineering throughput, and partnering closely with cross-functional product teams. Open to connecting with engineering leaders and innovative teams building mission-critical software.`;

  const topSkillsToPin = [
    primarySkill,
    secondarySkill,
    thirdSkill,
    matchedSkills[3]?.name || "System Design",
    matchedSkills[4]?.name || "CI/CD Pipelines",
  ].slice(0, 5);

  // 2. Cold Outreach Messages (< 100 words each)
  // Message 1: Direct Hiring Manager InMail
  const hiringManagerSubject = `Regarding the ${jobTitle} role at ${companyName}`;
  const hiringManagerBody = `Hi [Hiring Manager Name],\n\nI noticed ${companyName} is expanding the team for ${jobTitle}. Having recently scaled distributed systems using ${primarySkill} and reduced latency by 85%, I've tackled the exact performance challenges your team is solving.\n\nI've already applied via your portal, but wanted to reach out directly to share a quick 2-minute overview of my background if you're open to a brief chat.\n\nBest,\n${candidateName}`;

  // Message 2: Peer Referral Coffee Chat
  const peerSubject = `Quick question about engineering at ${companyName}`;
  const peerBody = `Hi [Name],\n\nI saw your work at ${companyName} and was really impressed by the engineering culture your team is building with ${primarySkill}.\n\nI'm applying for the ${jobTitle} opening and would love to hear your perspective on the tech stack and team dynamics. Would you be open to a 10-minute coffee chat this week? No pressure either way!\n\nThanks,\n${candidateName}`;

  // Message 3: 7-Day Follow-Up Email
  const followUpSubject = `Following up: ${jobTitle} application — ${candidateName}`;
  const followUpBody = `Hi [Hiring Manager Name],\n\nFollowing up on my application submitted last week for the ${jobTitle} position at ${companyName}.\n\nGiven my strong background in ${primarySkill} and ${secondarySkill}, I remain very excited about the opportunity to help your team hit its roadmap goals. Please let me know if I can provide any additional work samples or references.\n\nThank you,\n${candidateName}`;

  const countWords = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

  return {
    linkedInSync: {
      suggestedHeadline,
      aboutSection,
      topSkillsToPin,
    },
    outreachMessages: {
      hiringManagerInMail: {
        subject: hiringManagerSubject,
        body: hiringManagerBody,
        wordCount: countWords(hiringManagerBody),
      },
      peerReferralAsk: {
        subject: peerSubject,
        body: peerBody,
        wordCount: countWords(peerBody),
      },
      sevenDayFollowUp: {
        subject: followUpSubject,
        body: followUpBody,
        wordCount: countWords(followUpBody),
      },
    },
  };
}
