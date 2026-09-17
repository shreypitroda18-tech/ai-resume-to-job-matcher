import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
import { BulletRewrite } from "./types";

/**
 * Merges accepted bullet rewrites into the original resume text.
 */
export function mergeAcceptedRewrites(
  originalResumeText: string,
  rewrites: BulletRewrite[],
  acceptedIds: Record<string, boolean>
): string {
  let updatedText = originalResumeText;

  for (const rewrite of rewrites) {
    if (acceptedIds[rewrite.id]) {
      // Clean matching: exact or trimmed
      const target = rewrite.originalBullet.trim();
      if (updatedText.includes(target)) {
        updatedText = updatedText.replace(target, rewrite.suggestedBullet.trim());
      } else {
        // Try line-by-line fuzzy match (ignoring leading bullet chars)
        const lines = updatedText.split("\n");
        const matchIdx = lines.findIndex(
          (l) => l.replace(/^[-*•]\s*/, "").trim() === target.replace(/^[-*•]\s*/, "").trim()
        );
        if (matchIdx !== -1) {
          const prefix = lines[matchIdx].match(/^[-*•]\s*/)?.[0] || "- ";
          lines[matchIdx] = `${prefix}${rewrite.suggestedBullet.trim()}`;
          updatedText = lines.join("\n");
        }
      }
    }
  }

  return updatedText;
}

/**
 * Generates and triggers client-side download of clean Markdown file.
 */
export function downloadMarkdownFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  triggerDownload(blob, filename.endsWith(".md") ? filename : `${filename}.md`);
}

/**
 * Generates an ATS-compliant single-column Microsoft Word (.docx) document.
 */
export async function downloadDocxFile(resumeText: string, filename: string): Promise<void> {
  const lines = resumeText.split("\n").map((l) => l.trim());
  const paragraphs: Paragraph[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) {
      paragraphs.push(new Paragraph({ text: "" }));
      continue;
    }

    // Name (very first line if short)
    if (i === 0 && line.length < 50 && !line.includes("|")) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line,
              bold: true,
              size: 32, // 16pt
              font: "Calibri",
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 120 },
        })
      );
      continue;
    }

    // Contact info line
    if (i === 1 && (line.includes("@") || line.includes("|") || line.includes("http"))) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line,
              size: 20, // 10pt
              font: "Calibri",
              color: "555555",
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 240 },
        })
      );
      continue;
    }

    // Standard Section Headings (EXPERIENCE, SKILLS, EDUCATION, etc.)
    const isHeading =
      /^(professional experience|work experience|experience|technical skills|skills|education|projects|summary|certifications)$/i.test(
        line.replace(/[:]/g, "").trim()
      ) || (line === line.toUpperCase() && line.length > 3 && line.length < 35);

    if (isHeading) {
      paragraphs.push(
        new Paragraph({
          text: line.toUpperCase(),
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 240, after: 120 },
          children: [
            new TextRun({
              text: line.toUpperCase(),
              bold: true,
              size: 24, // 12pt
              font: "Calibri",
              color: "1A365D",
            }),
          ],
        })
      );
      continue;
    }

    // Bullet points
    if (line.startsWith("-") || line.startsWith("*") || line.startsWith("•")) {
      const cleanBullet = line.replace(/^[-*•]\s*/, "");
      paragraphs.push(
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({
              text: cleanBullet,
              size: 22, // 11pt
              font: "Calibri",
            }),
          ],
          spacing: { after: 80 },
        })
      );
      continue;
    }

    // Role / Title / Company subheadings
    const isSubheading = line.includes("|") || /\b(19\d\d|20\d\d)\b/.test(line);
    if (isSubheading) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line,
              bold: true,
              size: 22,
              font: "Calibri",
            }),
          ],
          spacing: { before: 120, after: 60 },
        })
      );
      continue;
    }

    // Regular paragraph
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: line,
            size: 22,
            font: "Calibri",
          }),
        ],
        spacing: { after: 100 },
      })
    );
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children: paragraphs,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  triggerDownload(blob, filename.endsWith(".docx") ? filename : `${filename}.docx`);
}

/**
 * Triggers a clean printable ATS single-column window for instant PDF printing/saving.
 */
export function printAtsResumePdf(resumeText: string, jobTitle = "Tailored Resume"): void {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Please allow popups to generate the printable ATS PDF.");
    return;
  }

  const escapedText = resumeText
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const lines = escapedText.split("\n");
  let bodyHtml = "";

  lines.forEach((l, i) => {
    const trimmed = l.trim();
    if (!trimmed) {
      bodyHtml += "<div style='height: 8px;'></div>";
      return;
    }

    if (i === 0 && trimmed.length < 50) {
      bodyHtml += `<h1 style="font-size: 22px; font-weight: 700; margin: 0 0 4px 0; text-align: center; text-transform: uppercase; letter-spacing: 0.5px;">${trimmed}</h1>`;
      return;
    }

    if (i === 1 && (trimmed.includes("@") || trimmed.includes("|"))) {
      bodyHtml += `<div style="font-size: 11px; color: #4b5563; text-align: center; margin-bottom: 16px;">${trimmed}</div>`;
      return;
    }

    const isHeading =
      /^(professional experience|work experience|experience|technical skills|skills|education|projects|summary)$/i.test(
        trimmed.replace(/[:]/g, "").trim()
      ) || (trimmed === trimmed.toUpperCase() && trimmed.length > 3 && trimmed.length < 35);

    if (isHeading) {
      bodyHtml += `<h2 style="font-size: 13px; font-weight: 700; margin: 16px 0 6px 0; text-transform: uppercase; border-bottom: 1px solid #111827; padding-bottom: 2px; letter-spacing: 0.5px;">${trimmed}</h2>`;
      return;
    }

    if (trimmed.startsWith("-") || trimmed.startsWith("*") || trimmed.startsWith("•")) {
      bodyHtml += `<div style="display: flex; margin-bottom: 4px; font-size: 11px; line-height: 1.5;">
        <span style="margin-right: 6px;">•</span>
        <span>${trimmed.replace(/^[-*•]\s*/, "")}</span>
      </div>`;
      return;
    }

    if (trimmed.includes("|")) {
      bodyHtml += `<div style="font-weight: 600; font-size: 11.5px; margin-top: 8px; margin-bottom: 2px;">${trimmed}</div>`;
      return;
    }

    bodyHtml += `<p style="margin: 0 0 6px 0; font-size: 11px; line-height: 1.5;">${trimmed}</p>`;
  });

  const html = `<!DOCTYPE html>
<html>
<head>
  <title>${jobTitle} — ATS Single Column</title>
  <style>
    @page {
      margin: 0.75in;
      size: auto;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #111827;
      background: #ffffff;
      margin: 0;
      padding: 0;
      line-height: 1.4;
    }
    @media print {
      body { -webkit-print-color-adjust: exact; }
      h2 { page-break-after: avoid; }
    }
  </style>
</head>
<body>
  ${bodyHtml}
  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 200);
    };
  </script>
</body>
</html>`;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
