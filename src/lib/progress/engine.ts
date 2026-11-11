import type { Catalog } from "@/content/catalog";

import { type AchievementDef, newlyUnlocked } from "./achievements";
import { levelFromXp } from "./levels";
import { dayKey } from "./streak";
import type { ActivityResult, ProgressState } from "./types";
import { type LessonXpBreakdown, computeLessonXp, lessonScore } from "./xp";

export interface LessonCompletionOutcome {
  state: ProgressState;
  xp: LessonXpBreakdown;
  score: number;
  perfect: boolean;
  achievements: AchievementDef[];
  leveledUp: boolean;
  levelBefore: number;
  levelAfter: number;
}

/** Pure state transition for finishing a lesson. */
export function applyLessonCompletion(
  state: ProgressState,
  lessonId: string,
  results: ActivityResult[],
  catalog: Catalog,
  now: Date,
): LessonCompletionOutcome {
  const previous = state.lessons[lessonId];
  const xp = computeLessonXp(results, Boolean(previous));
  const { score, perfect } = lessonScore(results);
  const iso = now.toISOString();
  const today = dayKey(now);

  let next: ProgressState = {
    ...state,
    xp: state.xp + xp.total,
    lastLessonId: lessonId,
    activeDays: state.activeDays.includes(today) ? state.activeDays : [...state.activeDays, today],
    lessons: {
      ...state.lessons,
      [lessonId]: previous
        ? {
            ...previous,
            lastCompletedAt: iso,
            timesCompleted: previous.timesCompleted + 1,
            bestScore: Math.max(previous.bestScore, score),
            perfect: previous.perfect || perfect,
            xpEarned: previous.xpEarned + xp.total,
          }
        : {
            firstCompletedAt: iso,
            lastCompletedAt: iso,
            timesCompleted: 1,
            bestScore: score,
            perfect,
            xpEarned: xp.total,
          },
    },
  };

  const achievements = newlyUnlocked(next, catalog, now);
  if (achievements.length) {
    next = {
      ...next,
      achievements: {
        ...next.achievements,
        ...Object.fromEntries(achievements.map((a) => [a.id, { unlockedAt: iso }])),
      },
    };
  }

  const levelBefore = levelFromXp(state.xp).level;
  const levelAfter = levelFromXp(next.xp).level;
  return { state: next, xp, score, perfect, achievements, leveledUp: levelAfter > levelBefore, levelBefore, levelAfter };
}
