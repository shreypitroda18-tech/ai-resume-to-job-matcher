"use client";

import React from "react";
import { computeBulletDiff, DiffPart } from "@/lib/diff";

interface DiffHighlightProps {
  original: string;
  suggested: string;
}

export function DiffHighlight({ original, suggested }: DiffHighlightProps) {
  const diffParts: DiffPart[] = computeBulletDiff(original, suggested);

  return (
    <div className="font-mono text-sm leading-relaxed whitespace-pre-wrap rounded-md bg-slate-900/5 dark:bg-slate-900/50 p-4 border border-slate-200 dark:border-slate-800">
      {diffParts.map((part, index) => {
        if (part.added) {
          return (
            <span
              key={index}
              className="bg-emerald-100 text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-300 font-medium px-1 py-0.5 rounded border-b-2 border-emerald-500 inline"
            >
              {part.value}
            </span>
          );
        }

        if (part.removed) {
          return (
            <span
              key={index}
              className="bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-400 line-through opacity-70 px-1 py-0.5 rounded inline"
            >
              {part.value}
            </span>
          );
        }

        return (
          <span key={index} className="text-slate-700 dark:text-slate-300">
            {part.value}
          </span>
        );
      })}
    </div>
  );
}
