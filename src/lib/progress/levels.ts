/** Artistic ranks: from the first sketch to mastery. */
export const LEVEL_NAMES = [
  "Rascunho",
  "Esboço",
  "Estudo",
  "Ensaio",
  "Composição",
  "Obra",
  "Repertório",
  "Ateliê",
  "Mestria",
] as const;

/** Total XP needed to reach a level (1-based): 0, 100, 300, 600, 1000, 1500… */
export function xpForLevel(level: number): number {
  return 50 * level * (level - 1);
}

export interface LevelInfo {
  level: number;
  name: string;
  currentLevelXp: number;
  nextLevelXp: number;
  /** 0–1 progress inside the current level. */
  progress: number;
  xpToNext: number;
}

export function levelFromXp(xp: number): LevelInfo {
  let level = 1;
  while (xp >= xpForLevel(level + 1)) level++;
  const currentLevelXp = xpForLevel(level);
  const nextLevelXp = xpForLevel(level + 1);
  const span = nextLevelXp - currentLevelXp;
  const name =
    level <= LEVEL_NAMES.length
      ? LEVEL_NAMES[level - 1]!
      : `${LEVEL_NAMES[LEVEL_NAMES.length - 1]} ${level - LEVEL_NAMES.length + 1}`;
  return {
    level,
    name,
    currentLevelXp,
    nextLevelXp,
    progress: (xp - currentLevelXp) / span,
    xpToNext: nextLevelXp - xp,
  };
}
