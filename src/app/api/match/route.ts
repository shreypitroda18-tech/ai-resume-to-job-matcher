import { NextRequest, NextResponse } from "next/server";
import { parseResumeDocument } from "@/lib/parser";
import { analyzeMatchWithAI } from "@/lib/gemini";
import { AtsRiskInspection } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    let resumeText = "";
    let jobDescription = "";
    let apiKey: string | undefined;
    let fileName = "Resume Text";
    let fileRisk: AtsRiskInspection | undefined;

    const contentType = req.headers.get("content-type") || "";

    // 1. Multipart Form Data (File upload + JD)
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("resumeFile") as File | null;
      const rawText = formData.get("resumeText") as string | null;
      jobDescription = (formData.get("jobDescription") as string | null) || "";
      apiKey = (formData.get("apiKey") as string | null) || undefined;

      if (file && file.size > 0) {
        fileName = file.name;
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const parsed = await parseResumeDocument(buffer, file.name, file.type, rawText || undefined);
        resumeText = parsed.text;
        fileRisk = parsed.atsRiskInspection;
      } else if (rawText && rawText.trim().length > 0) {
        resumeText = rawText.trim();
      }
    }
    // 2. JSON Request
    else if (contentType.includes("application/json")) {
      const body = await req.json();
      resumeText = body.resumeText || "";
      jobDescription = body.jobDescription || body.jobDescriptionText || "";
      apiKey = body.apiKey;
    } else {
      return NextResponse.json(
        { success: false, error: "Unsupported Content-Type. Use multipart/form-data or application/json." },
        { status: 400 }
      );
    }

    if (!resumeText || resumeText.trim().length < 40) {
      return NextResponse.json(
        {
          success: false,
          error: "Resume content is too short or could not be extracted. Please paste your resume text directly or upload a valid PDF/Word document.",
        },
        { status: 400 }
      );
    }

    if (!jobDescription || jobDescription.trim().length < 30) {
      return NextResponse.json(
        {
          success: false,
          error: "Job description is missing or too brief. Please paste the full job posting requirements to get an accurate match score.",
        },
        { status: 400 }
      );
    }

    // Run matching
    const result = await analyzeMatchWithAI(resumeText, jobDescription, apiKey);

    // If fileRisk was parsed directly from the binary PDF/DOCX, prioritize it
    if (fileRisk) {
      result.atsRiskInspection = fileRisk;
    }

    return NextResponse.json({
      success: true,
      result,
      meta: {
        resumeWordCount: resumeText.split(/\s+/).filter(Boolean).length,
        jdWordCount: jobDescription.split(/\s+/).filter(Boolean).length,
        fileName,
      },
    });
  } catch (error: unknown) {
    console.error("Match API error:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred while analyzing the resume.";
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
