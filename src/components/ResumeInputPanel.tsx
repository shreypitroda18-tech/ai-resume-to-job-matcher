"use client";

import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import { UploadCloud, FileText, X, CheckCircle2, AlertCircle } from "lucide-react";

interface ResumeInputPanelProps {
  resumeText: string;
  setResumeText: (text: string) => void;
  resumeFile: File | null;
  setResumeFile: (file: File | null) => void;
  inputMode: "upload" | "paste";
  setInputMode: (mode: "upload" | "paste") => void;
}

export function ResumeInputPanel({
  resumeText,
  setResumeText,
  resumeFile,
  setResumeFile,
  inputMode,
  setInputMode,
}: ResumeInputPanelProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const wordCount = resumeText
    ? resumeText.trim().split(/\s+/).filter(Boolean).length
    : 0;

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setFileError(null);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processSelectedFile(files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const files = e.target.files;
    if (files && files.length > 0) {
      processSelectedFile(files[0]);
    }
  };

  const processSelectedFile = (file: File) => {
    const validExtensions = [".pdf", ".docx", ".txt", ".md"];
    const name = file.name.toLowerCase();
    const isValid = validExtensions.some((ext) => name.endsWith(ext));

    if (!isValid) {
      setFileError("Please upload a PDF (.pdf), Word (.docx), or text (.txt) file.");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setFileError("File size exceeds 8MB limit. Please upload a smaller file or paste plain text.");
      return;
    }

    setResumeFile(file);
    // If it's a plain text file, we can also read preview into resumeText
    if (name.endsWith(".txt") || name.endsWith(".md")) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (typeof ev.target?.result === "string") {
          setResumeText(ev.target.result);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleRemoveFile = () => {
    setResumeFile(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col h-full rounded-3xl glass-panel shadow-md p-5 sm:p-6 transition-all">
      {/* Panel Header & Mode Toggle */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Your Resume</h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {inputMode === "upload" && resumeFile
                ? `${resumeFile.name} (${(resumeFile.size / 1024).toFixed(1)} KB)`
                : inputMode === "paste" && wordCount > 0
                ? `${wordCount} words detected`
                : "Upload PDF/DOCX or paste text"}
            </p>
          </div>
        </div>

        {/* Segmented Mode Switcher */}
        <div className="flex items-center p-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-xs font-medium text-slate-600 dark:text-slate-400">
          <button
            type="button"
            onClick={() => setInputMode("upload")}
            className={`px-3 py-1 rounded-md transition-all ${
              inputMode === "upload"
                ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                : "hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            Upload
          </button>
          <button
            type="button"
            onClick={() => setInputMode("paste")}
            className={`px-3 py-1 rounded-md transition-all ${
              inputMode === "paste"
                ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                : "hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            Paste Text
          </button>
        </div>
      </div>

      {/* Main Input Area */}
      <div className="flex-1 flex flex-col pt-4 min-h-[300px]">
        {inputMode === "upload" ? (
          <div className="flex-1 flex flex-col justify-center">
            {resumeFile ? (
              <div className="p-6 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/20 flex flex-col items-center justify-center text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mb-2" />
                <p className="font-semibold text-sm text-slate-900 dark:text-white">
                  {resumeFile.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Ready for match analysis &bull; {(resumeFile.size / 1024).toFixed(1)} KB
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-700 dark:text-slate-200"
                  >
                    Change File
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  isDragging
                    ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30"
                    : "border-slate-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-600 bg-slate-50/50 dark:bg-slate-950/40"
                }`}
              >
                <div className="p-3.5 rounded-full bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400 mb-3">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Drop your resume file here
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
                  Supports PDF, DOCX, or TXT (up to 8MB)
                </p>
                <span className="mt-4 inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-xs">
                  Browse Files
                </span>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt,.md,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
              className="hidden"
              onChange={handleFileChange}
            />

            {fileError && (
              <div className="mt-3 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{fileError}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your full resume text here (experience bullets, skills, education, summary)..."
              className="flex-1 w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-xs sm:text-sm font-mono leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
            />
            <div className="flex items-center justify-between pt-2.5 text-xs text-slate-400">
              <span>{wordCount} words &bull; {resumeText.length} chars</span>
              {resumeText && (
                <button
                  type="button"
                  onClick={() => setResumeText("")}
                  className="text-rose-500 hover:text-rose-600 font-medium flex items-center gap-1"
                >
                  <X className="w-3 h-3" /> Clear Text
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="pt-3 mt-auto text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
        <span>Analysis happens in-memory for this session only. Your resume is never persisted.</span>
      </div>
    </div>
  );
}
