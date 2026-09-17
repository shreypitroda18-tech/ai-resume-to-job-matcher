"use client";

import React, { useState } from "react";
import { ColdOutreachMessages } from "@/lib/types";
import { Mail, MessageSquare, Clock, Copy, Check, Send, AlertCircle, Sparkles } from "lucide-react";

interface ColdOutreachViewProps {
  outreachMessages?: ColdOutreachMessages;
}

export function ColdOutreachView({ outreachMessages }: ColdOutreachViewProps) {
  const [activeTab, setActiveTab] = useState<"hiringManager" | "peerReferral" | "followUp">("hiringManager");
  const [copied, setCopied] = useState(false);

  if (!outreachMessages) {
    return (
      <div className="p-8 text-center text-slate-500 dark:text-slate-400">
        No outreach message templates available.
      </div>
    );
  }

  const currentMessage =
    activeTab === "hiringManager"
      ? outreachMessages.hiringManagerInMail
      : activeTab === "peerReferral"
      ? outreachMessages.peerReferralAsk
      : outreachMessages.sevenDayFollowUp;

  const handleCopy = () => {
    const fullText = `Subject: ${currentMessage.subject}\n\n${currentMessage.body}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <Send className="w-5 h-5" />
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Cold Outreach & Hiring Manager Messages
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
                Sub-100 Word Rule
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              High-response direct messaging tailored to your target role. Busy hiring managers and peers don't read essays—they read concise, respectful hooks.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-1">
        <button
          onClick={() => setActiveTab("hiringManager")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "hiringManager"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Hiring Manager InMail</span>
          <span className="text-[10px] opacity-75">
            ({outreachMessages.hiringManagerInMail.wordCount}w)
          </span>
        </button>

        <button
          onClick={() => setActiveTab("peerReferral")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "peerReferral"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Peer Coffee Chat</span>
          <span className="text-[10px] opacity-75">
            ({outreachMessages.peerReferralAsk.wordCount}w)
          </span>
        </button>

        <button
          onClick={() => setActiveTab("followUp")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "followUp"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>7-Day Follow-Up</span>
          <span className="text-[10px] opacity-75">
            ({outreachMessages.sevenDayFollowUp.wordCount}w)
          </span>
        </button>
      </div>

      {/* Active Message Preview */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
              {activeTab === "hiringManager"
                ? "Direct to Decision Maker"
                : activeTab === "peerReferral"
                ? "Internal Referral Network"
                : "Polite Persistence"}
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
              Subject: <span className="font-mono font-normal text-indigo-600 dark:text-indigo-400">{currentMessage.subject}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {currentMessage.wordCount} words
            </span>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copied Message!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Message</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Message Body */}
        <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 font-sans text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line">
          {currentMessage.body}
        </div>

        {/* Tactical Best Practice Tip */}
        <div className="p-3 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 rounded-xl flex items-start gap-2 text-xs text-amber-800 dark:text-amber-300">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            {activeTab === "hiringManager"
              ? "Tip: Send on Tuesday or Thursday between 8:30 AM and 9:15 AM local time for peak read rates."
              : activeTab === "peerReferral"
              ? "Tip: Search LinkedIn for alumni from your university or past companies currently working at this target company."
              : "Tip: Reply directly to your original thread so the hiring manager has immediate context without searching."}
          </span>
        </div>
      </div>
    </div>
  );
}
