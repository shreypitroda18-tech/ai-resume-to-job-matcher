import { ParseResult, AtsRiskInspection } from "./types";
import { inspectAtsLayoutRisk } from "./ats-risk";

/**
 * Extracts raw text from uploaded files (PDF, DOCX, TXT) and inspects ATS layout risks.
 */
export async function parseResumeDocument(
  fileBuffer: Buffer | null,
  fileName: string,
  mimeType: string,
  rawFallbackText?: string
): Promise<ParseResult> {
  // 1. Raw Text provided directly
  if (!fileBuffer && rawFallbackText) {
    const cleanText = cleanExtractedText(rawFallbackText);
    const risk = inspectAtsLayoutRisk(cleanText, "text/plain", fileName);
    return {
      text: cleanText,
      wordCount: countWords(cleanText),
      fileName: "Pasted Resume Text",
      atsRiskInspection: risk,
    };
  }

  if (!fileBuffer) {
    throw new Error("No resume file or text content provided.");
  }

  const lowerName = fileName.toLowerCase();

  // 2. Plain Text / Markdown
  if (
    mimeType === "text/plain" ||
    mimeType === "text/markdown" ||
    lowerName.endsWith(".txt") ||
    lowerName.endsWith(".md")
  ) {
    const text = cleanExtractedText(fileBuffer.toString("utf-8"));
    const risk = inspectAtsLayoutRisk(text, "text/plain", fileName);
    return {
      text,
      wordCount: countWords(text),
      fileName,
      atsRiskInspection: risk,
    };
  }

  // 3. DOCX (Word)
  if (
    mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    lowerName.endsWith(".docx")
  ) {
    try {
      const mammoth = await import("mammoth");
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      const text = cleanExtractedText(result.value);

      if (!text || text.length < 30) {
        throw new Error(
          "Could not extract sufficient text from this Word document. It may be empty or contain non-standard formatting."
        );
      }

      const risk = inspectAtsLayoutRisk(text, "docx", fileName);
      return {
        text,
        wordCount: countWords(text),
        fileName,
        atsRiskInspection: risk,
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new Error(`Failed to parse DOCX file: ${msg}`);
    }
  }

  // 4. PDF
  if (mimeType === "application/pdf" || lowerName.endsWith(".pdf")) {
    try {
      const pdfParseModule = await import("pdf-parse");
      const pdfParse =
        (pdfParseModule as unknown as { default?: (buf: Buffer) => Promise<{ text: string; numpages: number }> }).default ||
        (pdfParseModule as unknown as (buf: Buffer) => Promise<{ text: string; numpages: number }>);

      const parsed = await pdfParse(fileBuffer);
      const text = cleanExtractedText(parsed.text);

      if (!text || text.length < 30) {
        throw new Error(
          "The PDF appears to be a scanned image or contains no selectable text. Please copy and paste the plain text of your resume instead."
        );
      }

      const risk = inspectAtsLayoutRisk(parsed.text, "pdf", fileName);

      return {
        text,
        wordCount: countWords(text),
        pageCount: parsed.numpages,
        fileName,
        atsRiskInspection: risk,
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("scanned image")) {
        throw err;
      }
      throw new Error(
        `Failed to parse PDF: ${msg}. If this is a scanned/image PDF, please paste the plain text instead.`
      );
    }
  }

  // Fallback
  try {
    const utf8 = fileBuffer.toString("utf-8");
    if (/^[\x20-\x7E\s\n\r\t]+$/.test(utf8.slice(0, 500))) {
      const text = cleanExtractedText(utf8);
      const risk = inspectAtsLayoutRisk(text, "text/plain", fileName);
      return {
        text,
        wordCount: countWords(text),
        fileName,
        atsRiskInspection: risk,
      };
    }
  } catch {
    // Ignore and proceed
  }

  throw new Error(
    `Unsupported file format (${fileName}). Supported formats are PDF (.pdf), Word (.docx), or plain text (.txt).`
  );
}


function cleanExtractedText(str: string): string {
  if (!str) return "";
  return str
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/[\t ]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function countWords(str: string): number {
  if (!str) return 0;
  const tokens = str.trim().split(/\s+/);
  return tokens.filter((t) => t.length > 0).length;
}
