"use client";

import React, { useState, useEffect } from "react";
import { Key, ShieldCheck, Cpu, X, Check, ExternalLink } from "lucide-react";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveApiKey: (key: string) => void;
}

export function ApiKeyModal({ isOpen, onClose, apiKey, onSaveApiKey }: ApiKeyModalProps) {
  const [inputVal, setInputVal] = useState(apiKey);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setInputVal(apiKey);
  }, [apiKey]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveApiKey(inputVal.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  const handleClear = () => {
    setInputVal("");
    onSaveApiKey("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">AI Engine Configuration</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Manage your AI API connection</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/50 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2.5">
            <Cpu className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold text-slate-800 dark:text-slate-200">Zero-Config Fallback Active:</span>
              {" "}If no API key is provided, the app runs locally on our built-in Smart Heuristic ATS Engine. Add a Gemini API key for deep generative LLM reasoning and custom bullet rewrites.
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Google Gemini API Key
            </label>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-mono"
            />
            <div className="flex items-center justify-between mt-2">
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
              >
                Get a free Gemini API key <ExternalLink className="w-3 h-3" />
              </a>
              {apiKey && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs text-rose-500 hover:underline"
                >
                  Clear Key
                </button>
              )}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Saved!
                </>
              ) : (
                "Save Configuration"
              )}
            </button>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span>Keys are stored in browser session storage only and never logged or persisted to any database.</span>
        </div>
      </div>
    </div>
  );
}
