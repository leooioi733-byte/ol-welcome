export interface StudentProfile {
  name: string;
  /** Area ids the student chose during onboarding. */
  interests: string[];
  createdAt: string;
}

export interface ActivityResult {
  activityId: string;
  /** False for self-guided activities (practice, sketch). */
  graded: boolean;
  correct: boolean;
  attempts: number;
  /** True when the student asked to see the answer. */
  revealed: boolean;
}

export interface LessonRecord {
  firstCompletedAt: string;
  lastCompletedAt: string;
  timesCompleted: number;
  /** Best share of graded activities solved on the first attempt (0–1). */
  bestScore: number;
  perfect: boolean;
  xpEarned: number;
}

export interface ProgressState {
  version: 1;
  profile: StudentProfile | null;
  xp: number;
  lessons: Record<string, LessonRecord>;
  /** Local calendar days (YYYY-MM-DD) on which at least one lesson was completed. */
  activeDays: string[];
  achievements: Record<string, { unlockedAt: string }>;
  lastLessonId: string | null;
}

export const INITIAL_PROGRESS: ProgressState = {
  version: 1,
  profile: null,
  xp: 0,
  lessons: {},
  activeDays: [],
  achievements: {},
  lastLessonId: null,
};
