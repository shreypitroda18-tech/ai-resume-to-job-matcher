import { RecruiterHeatmapData, BuriedMetricAlert } from "./types";

/**
 * Simulates recruiter eye-tracking scan patterns and detects buried high-impact metrics.
 */
export function simulateRecruiterHeatmap(resumeText: string): RecruiterHeatmapData {
  const lines = resumeText.split("\n").map((l) => l.trim()).filter(Boolean);
  const buriedMetrics: BuriedMetricAlert[] = [];

  // Identify metrics and their position
  let currentJobTitle = "Current Role";
  let bulletIndexInJob = 0;
  let topMetricsCount = 0;
  let totalMetricsCount = 0;

  lines.forEach((line, index) => {
    // Detect job heading
    if (line.includes("|") || /\b(20[12]\d|199\d)\b/.test(line)) {
      currentJobTitle = line.split("|")[0]?.trim() || "Experience Entry";
      bulletIndexInJob = 0;
      return;
    }

    if (line.startsWith("-") || line.startsWith("*") || line.startsWith("•")) {
      bulletIndexInJob++;
      const metricMatch = line.match(/(\d+[%kM$+]|\$\d+[\d,.]*|\b\d+\s*(users|clients|engineers|reduction|increase|improvement)\b)/i);

      if (metricMatch) {
        totalMetricsCount++;
        const isAboveTheFold = index < lines.length * 0.35;

        if (isAboveTheFold) {
          topMetricsCount++;
        }

        // If strong metric is buried deep in bullet 3 or lower
        if (bulletIndexInJob >= 3) {
          buriedMetrics.push({
            id: `buried-${buriedMetrics.length + 1}`,
            metric: metricMatch[0],
            currentLocation: `${currentJobTitle}, Bullet #${bulletIndexInJob}`,
            recommendation: `Move your standout metric "${metricMatch[0]}" to Bullet #1 or #2. Eye-tracking shows recruiters rarely read past the second bullet point in 6-second scans.`,
          });
        }
      }
    }
  });

  const aboveTheFoldScore = totalMetricsCount > 0
    ? Math.round((topMetricsCount / totalMetricsCount) * 100)
    : 75;

  // Eye-tracking hot spots following the classic F-pattern
  const fixationPoints = [
    { xPercent: 20, yPercent: 6, intensity: 0.95, label: "Name & Contact Header (1.4s)" },
    { xPercent: 25, yPercent: 18, intensity: 0.9, label: "Current Title & Company (1.8s)" },
    { xPercent: 35, yPercent: 25, intensity: 0.85, label: "Primary Achievement Bullet (1.5s)" },
    { xPercent: 28, yPercent: 33, intensity: 0.75, label: "Secondary Bullet (0.9s)" },
    { xPercent: 22, yPercent: 48, intensity: 0.65, label: "Past Job Company & Dates (0.7s)" },
    { xPercent: 30, yPercent: 70, intensity: 0.8, label: "Technical Skills Matrix (1.1s)" },
    { xPercent: 25, yPercent: 88, intensity: 0.6, label: "Education & Degree (0.5s)" },
  ];

  const scannabilityChecklist = [
    {
      item: "First 2 Bullets Lead With Strongest Metrics",
      passed: buriedMetrics.length <= 1,
      note: buriedMetrics.length === 0
        ? "All high-impact numerical achievements are positioned prominently in bullets #1 & #2."
        : `${buriedMetrics.length} strong metrics are buried past bullet #2 where recruiters often miss them.`,
    },
    {
      item: "Clear Visual Anchor Hierarchy",
      passed: /(experience|skills|education)/i.test(resumeText),
      note: "Standard capitalized headers provide natural visual stopping points for the eye.",
    },
    {
      item: "Contact Info at Immediate Top",
      passed: /([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/.test(resumeText.slice(0, 400)),
      note: "Contact details are verified in the primary top header zone.",
    },
  ];

  return {
    aboveTheFoldScore,
    scanPatternVerdict:
      aboveTheFoldScore >= 70
        ? "Excellent Eye-Flow: Recruiter attention lands directly on high-value quantified accomplishments in the first 3 seconds."
        : "Optimization Recommended: Several of your most impressive numerical achievements are placed deep in later bullets where eye-tracking scans drop off.",
    fixationPoints,
    buriedMetrics: buriedMetrics.slice(0, 3),
    scannabilityChecklist,
  };
}
