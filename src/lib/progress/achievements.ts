import type { Catalog } from "@/content/catalog";
import type { TileShape } from "@/content/types";

import { currentStreak, longestStreak } from "./streak";
import type { ProgressState } from "./types";
import { trackProgress } from "./unlock";

export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  shape: TileShape;
  check: (state: ProgressState, catalog: Catalog, now: Date) => boolean;
}

const completedCount = (s: ProgressState) => Object.keys(s.lessons).length;

const completedTracks = (s: ProgressState, c: Catalog) =>
  c.areas.flatMap((a) => a.tracks).filter((t) => trackProgress(t, s, c).ratio === 1);

const bestStreak = (s: ProgressState, now: Date) =>
  Math.max(currentStreak(s.activeDays, now), longestStreak(s.activeDays));

export const ACHIEVEMENTS: AchievementDef[] = [
  {
    id: "primeiro-traco",
    title: "Primeiro traço",
    description: "Conclua sua primeira lição.",
    shape: "circle",
    check: (s) => completedCount(s) >= 1,
  },
  {
    id: "mao-firme",
    title: "Mão firme",
    description: "Conclua uma lição sem errar nenhuma atividade.",
    shape: "diamond",
    check: (s) => Object.values(s.lessons).some((l) => l.perfect),
  },
  {
    id: "caderno-cheio",
    title: "Caderno cheio",
    description: "Conclua 5 lições.",
    shape: "square",
    check: (s) => completedCount(s) >= 5,
  },
  {
    id: "portfolio",
    title: "Portfólio",
    description: "Conclua 10 lições.",
    shape: "half",
    check: (s) => completedCount(s) >= 10,
  },
  {
    id: "trilha-percorrida",
    title: "Trilha percorrida",
    description: "Conclua todas as lições de uma trilha.",
    shape: "arch",
    check: (s, c) => completedTracks(s, c).length >= 1,
  },
  {
    id: "polimata",
    title: "Polímata",
    description: "Conclua ao menos uma lição em cada área artística.",
    shape: "quarter",
    check: (s, c) =>
      c.areas.every((area) =>
        area.tracks.some((t) => c.trackLessons(t).some((l) => s.lessons[l.id])),
      ),
  },
  {
    id: "ritmo-constante",
    title: "Ritmo constante",
    description: "Estude 3 dias seguidos.",
    shape: "triangle",
    check: (s, _c, now) => bestStreak(s, now) >= 3,
  },
  {
    id: "semana-criativa",
    title: "Semana criativa",
    description: "Estude 7 dias seguidos.",
    shape: "circle",
    check: (s, _c, now) => bestStreak(s, now) >= 7,
  },
  {
    id: "quinhentos",
    title: "Paleta rica",
    description: "Acumule 500 XP.",
    shape: "diamond",
    check: (s) => s.xp >= 500,
  },
];

/** Achievements whose condition is met now but that the student has not unlocked yet. */
export function newlyUnlocked(state: ProgressState, catalog: Catalog, now: Date): AchievementDef[] {
  return ACHIEVEMENTS.filter((a) => !state.achievements[a.id] && a.check(state, catalog, now));
}
