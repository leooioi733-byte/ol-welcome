import type { RhythmFigure } from "@/content/types";

/** Steps (eighth notes) each figure fills, and which of them sound. */
const FIGURE_STEPS: Record<RhythmFigure, boolean[]> = {
  seminima: [true, false],
  colcheias: [true, true],
  pausa: [false, false],
  minima: [true, false, false, false],
};

/** Converts written figures into an eighth-note step pattern (true = sound). */
export function figuresToPattern(figures: RhythmFigure[]): boolean[] {
  return figures.flatMap((f) => FIGURE_STEPS[f]);
}

export function patternsEqual(a: boolean[], b: boolean[]): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}
