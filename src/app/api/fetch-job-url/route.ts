import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string" || !url.startsWith("http")) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid job posting URL starting with http:// or https://" },
        { status: 400 }
      );
    }

    // Fetch with reasonable timeout and standard desktop headers
    let response: Response;
    try {
      response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
        signal: AbortSignal.timeout(9000),
      });
    } catch {
      return NextResponse.json(
        {
          success: false,
          error:
            "Couldn't reach this URL or request timed out. Some job sites block automated access. Please copy and paste the job description text directly.",
        },
        { status: 400 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: `Could not load job page (HTTP ${response.status}). Many job boards (e.g. LinkedIn) require login. Please paste the job description text instead.`,
        },
        { status: 400 }
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Strip unneeded elements
    $(
      "script, style, noscript, nav, footer, header, aside, svg, iframe, form, button, input, .nav, .footer, .header, .cookie, .banner"
    ).remove();

    // Extract title & company
    const pageTitle =
      $('meta[property="og:title"]').attr("content") ||
      $('meta[name="twitter:title"]').attr("content") ||
      $("title").text().trim() ||
      "Job Posting";

    const companyName =
      $('meta[property="og:site_name"]').attr("content") ||
      $('meta[name="author"]').attr("content") ||
      extractCompanyFromUrl(url);

    // Identify main job description body
    const candidateSelectors = [
      '[class*="job-description"]',
      '[class*="jobDescription"]',
      '[id*="job-description"]',
      '[id*="jobDescription"]',
      '[data-automation="jobDescription"]',
      ".description",
      "#content",
      "main",
      "article",
    ];

    let extractedText = "";
    for (const selector of candidateSelectors) {
      const match = $(selector);
      if (match.length > 0) {
        const text = match.text().trim();
        if (text.length > 200) {
          extractedText = text;
          break;
        }
      }
    }

    // Fallback to body
    if (!extractedText || extractedText.length < 150) {
      extractedText = $("body").text().trim();
    }

    // Clean up whitespace
    extractedText = extractedText
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .replace(/[\t ]+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    if (extractedText.length < 80) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Extracted content was too short. This site may be rendered entirely with client-side JavaScript or blocked by bot protection. Please copy and paste the job text manually.",
        },
        { status: 400 }
      );
    }

    // Format output with title and company
    const formattedJobDescription = `${pageTitle}${companyName ? ` — ${companyName}` : ""}\n\n${extractedText.slice(0, 12000)}`;

    return NextResponse.json({
      success: true,
      jobTitle: pageTitle,
      company: companyName,
      text: formattedJobDescription,
    });
  } catch (err: unknown) {
    console.error("fetch-job-url caught error:", err);
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      {
        success: false,
        error: `Could not auto-fetch this posting: ${msg}. Please paste the job description text directly.`,
      },
      { status: 500 }
    );
  }
}

function extractCompanyFromUrl(urlStr: string): string {
  try {
    const host = new URL(urlStr).hostname.replace(/^www\./, "");
    const parts = host.split(".");
    return parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) : "";
  } catch {
    return "";
  }
}
