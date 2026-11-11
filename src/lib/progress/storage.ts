import { z } from "zod";

import { INITIAL_PROGRESS, type ProgressState } from "./types";

/**
 * Persistence boundary. The app talks to a ProgressRepository, so swapping local storage
 * for a cloud backend later only means writing another implementation of this interface.
 */
export interface ProgressRepository {
  load(): ProgressState;
  save(state: ProgressState): void;
  /** Notifies when another tab changed the data. Returns an unsubscribe function. */
  onExternalChange?(listener: () => void): () => void;
}

const lessonRecord = z.object({
  firstCompletedAt: z.string(),
  lastCompletedAt: z.string(),
  timesCompleted: z.number().int().nonnegative(),
  bestScore: z.number().min(0).max(1),
  perfect: z.boolean(),
  xpEarned: z.number().nonnegative(),
});

export const progressSchema = z.object({
  version: z.literal(1),
  profile: z
    .object({ name: z.string().min(1).max(60), interests: z.array(z.string()), createdAt: z.string() })
    .nullable(),
  xp: z.number().nonnegative(),
  lessons: z.record(lessonRecord),
  activeDays: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  achievements: z.record(z.object({ unlockedAt: z.string() })),
  lastLessonId: z.string().nullable(),
});

export function parseProgress(raw: unknown): ProgressState | null {
  const result = progressSchema.safeParse(raw);
  return result.success ? (result.data as ProgressState) : null;
}

export const STORAGE_KEY = "mosa:progress:v1";

export function createLocalStorageRepository(storage: Storage, key = STORAGE_KEY): ProgressRepository {
  return {
    load() {
      try {
        const raw = storage.getItem(key);
        if (!raw) return INITIAL_PROGRESS;
        return parseProgress(JSON.parse(raw)) ?? INITIAL_PROGRESS;
      } catch {
        return INITIAL_PROGRESS;
      }
    },
    save(state) {
      try {
        storage.setItem(key, JSON.stringify(state));
      } catch {
        // Storage full or blocked (private mode): keep working in memory.
      }
    },
    onExternalChange(listener) {
      const handler = (e: StorageEvent) => {
        if (e.key === key) listener();
      };
      window.addEventListener("storage", handler);
      return () => window.removeEventListener("storage", handler);
    },
  };
}

export function createMemoryRepository(initial: ProgressState = INITIAL_PROGRESS): ProgressRepository {
  let data = initial;
  return {
    load: () => data,
    save: (s) => {
      data = s;
    },
  };
}
