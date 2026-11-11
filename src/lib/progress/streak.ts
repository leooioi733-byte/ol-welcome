/** Local calendar day as YYYY-MM-DD. */
export function dayKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function shiftDay(key: string, delta: number): string {
  const [y, m, d] = key.split("-").map(Number) as [number, number, number];
  return dayKey(new Date(y, m - 1, d + delta));
}

/**
 * Consecutive active days ending today — or yesterday, so a streak is not shown as lost
 * before the student had a chance to practise today.
 */
export function currentStreak(activeDays: string[], today: Date): number {
  const days = new Set(activeDays);
  let cursor = dayKey(today);
  if (!days.has(cursor)) {
    cursor = shiftDay(cursor, -1);
    if (!days.has(cursor)) return 0;
  }
  let streak = 0;
  while (days.has(cursor)) {
    streak++;
    cursor = shiftDay(cursor, -1);
  }
  return streak;
}

export function longestStreak(activeDays: string[]): number {
  const sorted = [...new Set(activeDays)].sort();
  let best = 0;
  let run = 0;
  let prev: string | null = null;
  for (const day of sorted) {
    run = prev !== null && shiftDay(prev, 1) === day ? run + 1 : 1;
    best = Math.max(best, run);
    prev = day;
  }
  return best;
}
