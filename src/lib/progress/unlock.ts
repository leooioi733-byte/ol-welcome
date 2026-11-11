import type { Area, Track } from "@/content/types";
import type { Catalog } from "@/content/catalog";

import type { ProgressState } from "./types";

export type LessonStatus = "completed" | "available" | "locked";

/** Lessons unlock in order inside a track: the first is open, each next one opens after the previous. */
export function lessonStatus(lessonId: string, state: ProgressState, catalog: Catalog): LessonStatus {
  if (state.lessons[lessonId]) return "completed";
  const ctx = catalog.getLesson(lessonId);
  if (!ctx) return "locked";
  if (ctx.indexInTrack === 0) return "available";
  const previous = ctx.trackLessons[ctx.indexInTrack - 1];
  return previous && state.lessons[previous.id] ? "available" : "locked";
}

export interface ProgressCount {
  done: number;
  total: number;
  ratio: number;
}

function count(ids: string[], state: ProgressState): ProgressCount {
  const done = ids.filter((id) => state.lessons[id]).length;
  return { done, total: ids.length, ratio: ids.length ? done / ids.length : 0 };
}

export function trackProgress(track: Track, state: ProgressState, catalog: Catalog): ProgressCount {
  return count(catalog.trackLessons(track).map((l) => l.id), state);
}

export function areaProgress(area: Area, state: ProgressState, catalog: Catalog): ProgressCount {
  return count(area.tracks.flatMap((t) => catalog.trackLessons(t).map((l) => l.id)), state);
}

export function nextLessonInTrack(track: Track, state: ProgressState, catalog: Catalog) {
  return catalog.trackLessons(track).find((l) => !state.lessons[l.id]);
}

/**
 * What to study next: continue the track of the last lesson, otherwise start in the
 * student's interest areas, otherwise anywhere available.
 */
export function recommendedLesson(state: ProgressState, catalog: Catalog) {
  if (state.lastLessonId) {
    const ctx = catalog.getLesson(state.lastLessonId);
    if (ctx) {
      const next = nextLessonInTrack(ctx.track, state, catalog);
      if (next) return catalog.getLesson(next.id);
    }
  }
  const interests = state.profile?.interests ?? [];
  const ordered = [
    ...catalog.areas.filter((a) => interests.includes(a.id)),
    ...catalog.areas.filter((a) => !interests.includes(a.id)),
  ];
  for (const area of ordered) {
    for (const track of area.tracks) {
      const next = nextLessonInTrack(track, state, catalog);
      if (next) return catalog.getLesson(next.id);
    }
  }
  return undefined;
}
