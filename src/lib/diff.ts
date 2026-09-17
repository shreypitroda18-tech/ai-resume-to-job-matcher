import * as Diff from "diff";

export interface DiffPart {
  value: string;
  added?: boolean;
  removed?: boolean;
}

/**
 * Computes word-level diff between original bullet and suggested bullet.
 */
export function computeBulletDiff(original: string, suggested: string): DiffPart[] {
  if (!original || !suggested) {
    return [{ value: suggested || original || "" }];
  }

  try {
    const diffs = Diff.diffWordsWithSpace(original, suggested);
    return diffs.map((part) => ({
      value: part.value,
      added: Boolean(part.added),
      removed: Boolean(part.removed),
    }));
  } catch {
    // Fallback simple line diff if Diff package encounters unexpected input
    return [
      { value: original, removed: true },
      { value: " -> " },
      { value: suggested, added: true },
    ];
  }
}
