import type { ActivityResult } from "./types";

/** XP rules. Rewards favour understanding on the first try, but never punish retrying. */
export const XP = {
  firstTry: 10,
  afterRetry: 5,
  revealed: 0,
  practice: 10,
  lessonComplete: 20,
  perfectBonus: 10,
  review: 5,
} as const;

export function activityXp(r: ActivityResult): number {
  if (!r.graded) return XP.practice;
  if (r.revealed || !r.correct) return XP.revealed;
  return r.attempts <= 1 ? XP.firstTry : XP.afterRetry;
}

export function lessonScore(results: ActivityResult[]): { score: number; perfect: boolean } {
  const graded = results.filter((r) => r.graded);
  if (graded.length === 0) return { score: 1, perfect: false };
  const firstTry = graded.filter((r) => r.correct && !r.revealed && r.attempts <= 1).length;
  return { score: firstTry / graded.length, perfect: firstTry === graded.length };
}

export interface LessonXpBreakdown {
  activities: number;
  completion: number;
  perfectBonus: number;
  total: number;
  isReview: boolean;
}

/**
 * XP for finishing a lesson. A first completion earns activity XP + completion bonus
 * (+ perfect bonus). Replaying an already completed lesson earns a small review reward only,
 * so XP reflects learning instead of repetition.
 */
export function computeLessonXp(results: ActivityResult[], alreadyCompleted: boolean): LessonXpBreakdown {
  if (alreadyCompleted) {
    return { activities: 0, completion: XP.review, perfectBonus: 0, total: XP.review, isReview: true };
  }
  const activities = results.reduce((sum, r) => sum + activityXp(r), 0);
  const { perfect } = lessonScore(results);
  const perfectBonus = perfect ? XP.perfectBonus : 0;
  return {
    activities,
    completion: XP.lessonComplete,
    perfectBonus,
    total: activities + XP.lessonComplete + perfectBonus,
    isReview: false,
  };
}
