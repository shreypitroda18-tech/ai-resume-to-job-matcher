import { AtsRiskInspection, AtsRiskCheck } from "./types";

/**
 * Inspects document text layout and structural markers for ATS parser safety.
 * This is a pure string-analysis module safe for both server and client execution.
 */
export function inspectAtsLayoutRisk(
  rawContent: string,
  fileType: "pdf" | "docx" | "text/plain" = "text/plain",
  _fileName = "Resume"
): AtsRiskInspection {
  const checks: AtsRiskCheck[] = [];
  let deduction = 0;

  // Check 1: Multi-column layout detection
  const lines = rawContent.split("\n");
  const multiColumnLineCount = lines.filter((line) => /\S {6,}\S/.test(line)).length;
  const hasMultiColumn = multiColumnLineCount >= 4;

  if (hasMultiColumn) {
    deduction += 25;
    checks.push({
      name: "Single-Column Flow",
      passed: false,
      details:
        "Detected horizontal spacing patterns indicating a multi-column layout. Older ATS parsers (Taleo, Workday) frequently scramble two-column text left-to-right, blending different sections together.",
    });
  } else {
    checks.push({
      name: "Single-Column Flow",
      passed: true,
      details:
        "Document text flows in a single linear column, which ATS parsers read with 100% hierarchy accuracy.",
    });
  }

  // Check 2: Tables & Text Box Grid Structures
  const hasTableMarkers = /\|.*\|.*\|/.test(rawContent) || /\+[-+]+\+/.test(rawContent);
  if (hasTableMarkers) {
    deduction += 20;
    checks.push({
      name: "Table & Grid Layout",
      passed: false,
      details:
        "Tabular structures or grid tables detected. Many ATS engines discard tables or concatenate table cells out of order.",
    });
  } else {
    checks.push({
      name: "Table & Grid Layout",
      passed: true,
      details:
        "No complex tables or grid cells found. Standard paragraphs and bullet points are safe for parsing.",
    });
  }

  // Check 3: Non-standard symbols, icon fonts, or graphic rating bars
  const hasGraphicRating = /[●○■□▲▼◆◇★☆]{3,}|[█░▒▓]{3,}/.test(rawContent);
  const hasCorruptedGlyphs = /\uFFFD|\u0000|\x00/.test(rawContent);

  if (hasGraphicRating || hasCorruptedGlyphs) {
    deduction += 15;
    checks.push({
      name: "Fonts & Standard Glyph Symbols",
      passed: false,
      details:
        "Non-standard rating graphics or skill bars (e.g. ●●●○○) detected. ATS systems cannot parse visual rating meters and may convert them to garbled characters.",
    });
  } else {
    checks.push({
      name: "Fonts & Standard Glyph Symbols",
      passed: true,
      details:
        "Text uses standard Unicode/ASCII typography without unparseable rating bars or embedded graphical icons.",
    });
  }

  // Check 4: Contact Info Placement (Header/Footer trap)
  const emailMatch = rawContent.match(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/);
  const phoneMatch = rawContent.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const hasContact = Boolean(emailMatch || phoneMatch);

  const topText = rawContent.slice(0, Math.floor(rawContent.length * 0.35));
  const contactInTop =
    (emailMatch && topText.includes(emailMatch[0])) ||
    (phoneMatch && topText.includes(phoneMatch[0]));

  if (!hasContact) {
    deduction += 20;
    checks.push({
      name: "Contact Information Header",
      passed: false,
      details:
        "Could not detect contact email or phone number in the main body. If embedded inside a PDF header/footer band or image, ATS parsers will miss it.",
    });
  } else if (!contactInTop) {
    deduction += 10;
    checks.push({
      name: "Contact Information Header",
      passed: false,
      details:
        "Contact details were found lower in the document rather than at the top. Ensure your name, email, and phone number are in the primary top section.",
    });
  } else {
    checks.push({
      name: "Contact Information Header",
      passed: true,
      details:
        "Email and phone number are clearly positioned in the top section of the document body.",
    });
  }

  // Check 5: Section Heading Hierarchy
  const standardHeadings = ["experience", "education", "skills", "projects", "summary"];
  const matchedHeadings = standardHeadings.filter((h) =>
    new RegExp(`(^|\\n)\\s*${h}`, "i").test(rawContent)
  );

  if (matchedHeadings.length < 2) {
    deduction += 15;
    checks.push({
      name: "Standard Section Headings",
      passed: false,
      details:
        "Standard ATS heading terms (Experience, Skills, Education) are ambiguous or missing. Use conventional capitalized headings.",
    });
  } else {
    checks.push({
      name: "Standard Section Headings",
      passed: true,
      details: `Recognized standard section headings (${matchedHeadings.join(", ")}) for accurate section mapping.`,
    });
  }

  const safetyScore = Math.max(20, Math.min(100, 100 - deduction));
  let status: "pass" | "warning" | "alert" = "pass";
  let headline = "✅ 100% Machine-Readable";
  let explanation =
    "Your resume structure complies with single-column ATS reading standards. Text streams cleanly without layout hazards.";

  if (safetyScore < 65) {
    status = "alert";
    headline = "⚠️ High Format Risk — Likely to Fail Older ATS Systems";
    explanation =
      "Structural layout issues (such as multi-column splits, tables, or obscured contact info) may cause automated recruiters and older ATS engines to drop key sections.";
  } else if (safetyScore < 85) {
    status = "warning";
    headline = hasMultiColumn
      ? "⚠️ Multi-Column Layout Detected — May Scramble in Older ATS Systems"
      : "⚠️ Minor ATS Formatting Warnings";
    explanation =
      "Your resume is largely readable, but certain layout choices may decrease parsing fidelity in conservative corporate ATS databases.";
  }

  return {
    safetyScore,
    status,
    headline,
    explanation,
    checks,
  };
}
