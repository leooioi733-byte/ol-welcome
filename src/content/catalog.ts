import { artesVisuais } from "./areas/artes-visuais";
import { composicaoVisual } from "./areas/composicao-visual";
import { danca } from "./areas/danca";
import { musica } from "./areas/musica";
import type { Activity, Area, Lesson, Module, Track } from "./types";

/**
 * Registry of every area. To add a new area, create a file in ./areas and append it here.
 * Order defines display order.
 */
export const AREAS: Area[] = [artesVisuais, composicaoVisual, musica, danca];

export interface LessonContext {
  lesson: Lesson;
  module: Module;
  track: Track;
  area: Area;
  /** Position of the lesson inside its track (0-based, across modules). */
  indexInTrack: number;
  trackLessons: Lesson[];
}

export interface Catalog {
  areas: Area[];
  getArea(id: string): Area | undefined;
  getTrack(id: string): { track: Track; area: Area } | undefined;
  getLesson(id: string): LessonContext | undefined;
  trackLessons(track: Track): Lesson[];
  allLessons(): LessonContext[];
}

export function createCatalog(areas: Area[]): Catalog {
  const lessonIndex = new Map<string, LessonContext>();
  const trackIndex = new Map<string, { track: Track; area: Area }>();
  const seen = new Set<string>();

  const trackLessons = (track: Track) => track.modules.flatMap((m) => m.lessons);

  for (const area of areas) {
    for (const track of area.tracks) {
      trackIndex.set(track.id, { track, area });
      const lessons = trackLessons(track);
      let i = 0;
      for (const module of track.modules) {
        for (const lesson of module.lessons) {
          if (seen.has(lesson.id)) throw new Error(`Duplicate lesson id: ${lesson.id}`);
          seen.add(lesson.id);
          lessonIndex.set(lesson.id, { lesson, module, track, area, indexInTrack: i, trackLessons: lessons });
          i++;
        }
      }
    }
  }

  return {
    areas,
    getArea: (id) => areas.find((a) => a.id === id),
    getTrack: (id) => trackIndex.get(id),
    getLesson: (id) => lessonIndex.get(id),
    trackLessons,
    allLessons: () => [...lessonIndex.values()],
  };
}

export const catalog = createCatalog(AREAS);

export function lessonActivities(lesson: Lesson): Activity[] {
  return lesson.steps.flatMap((s) => (s.kind === "activity" ? [s.activity] : []));
}

/** Activities that have a right/wrong answer (practice and sketch are self-guided). */
export function isGraded(activity: Activity): boolean {
  return activity.type !== "practice" && activity.type !== "sketch";
}
