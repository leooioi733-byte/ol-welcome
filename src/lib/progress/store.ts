import type { Catalog } from "@/content/catalog";

import { type LessonCompletionOutcome, applyLessonCompletion } from "./engine";
import { type ProgressRepository, parseProgress } from "./storage";
import { type ActivityResult, INITIAL_PROGRESS, type ProgressState, type StudentProfile } from "./types";

export interface ProgressStore {
  getState(): ProgressState;
  subscribe(listener: () => void): () => void;
  setProfile(profile: Omit<StudentProfile, "createdAt">): void;
  completeLesson(lessonId: string, results: ActivityResult[]): LessonCompletionOutcome;
  exportJson(): string;
  importJson(json: string): boolean;
  reset(): void;
}

export function createProgressStore(
  repo: ProgressRepository,
  catalog: Catalog,
  clock: () => Date = () => new Date(),
): ProgressStore {
  let state = repo.load();
  const listeners = new Set<() => void>();

  const emit = () => listeners.forEach((l) => l());
  const commit = (next: ProgressState) => {
    state = next;
    repo.save(state);
    emit();
  };

  repo.onExternalChange?.(() => {
    state = repo.load();
    emit();
  });

  return {
    getState: () => state,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    setProfile(profile) {
      commit({
        ...state,
        profile: {
          name: profile.name.trim(),
          interests: profile.interests,
          createdAt: state.profile?.createdAt ?? clock().toISOString(),
        },
      });
    },
    completeLesson(lessonId, results) {
      const outcome = applyLessonCompletion(state, lessonId, results, catalog, clock());
      commit(outcome.state);
      return outcome;
    },
    exportJson: () => JSON.stringify(state, null, 2),
    importJson(json) {
      try {
        const parsed = parseProgress(JSON.parse(json));
        if (!parsed) return false;
        commit(parsed);
        return true;
      } catch {
        return false;
      }
    },
    reset() {
      commit(INITIAL_PROGRESS);
    },
  };
}
