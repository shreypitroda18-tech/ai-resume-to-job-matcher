import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Newsreader } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const editorial = Newsreader({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-editorial",
});

export const metadata: Metadata = {
  title: "MatchPoint AI — AI Resume-to-Job Matcher & Career Copilot",
  description:
    "Instant, explainable match scoring, missing skill gap analysis, and high-impact bullet point rewrites tailored to job postings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${editorial.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#080A10] dark:text-slate-100 antialiased selection:bg-indigo-500 selection:text-white transition-colors relative font-sans">
        {children}
      </body>
    </html>
  );
}
