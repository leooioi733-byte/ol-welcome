import { Lock } from "lucide-react";

import type { AchievementDef } from "@/lib/progress/achievements";
import { cn } from "@/lib/utils";

import { Tile } from "./Tile";

const PIGMENTS = ["text-vermilion", "text-cobalt", "text-saffron", "text-orchid"] as const;

export function AchievementBadge({
  achievement,
  unlockedAt,
  index = 0,
  className,
}: {
  achievement: AchievementDef;
  unlockedAt?: string;
  index?: number;
  className?: string;
}) {
  const unlocked = Boolean(unlockedAt);
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-2xl border p-4 transition-colors",
        unlocked ? "border-border bg-card shadow-paper" : "border-dashed border-border bg-transparent",
        className,
      )}
    >
      <div
        className={cn(
          "relative grid size-14 shrink-0 place-items-center rounded-xl",
          unlocked ? "bg-foreground" : "bg-muted",
        )}
      >
        {unlocked ? (
          <Tile shape={achievement.shape} className={cn("size-8", PIGMENTS[index % PIGMENTS.length])} />
        ) : (
          <Lock className="size-5 text-muted-foreground" aria-hidden />
        )}
      </div>
      <div className="min-w-0">
        <p className={cn("font-display font-bold", !unlocked && "text-muted-foreground")}>{achievement.title}</p>
        <p className="text-sm text-muted-foreground">{achievement.description}</p>
        {unlockedAt && (
          <p className="mt-1 text-xs font-semibold text-success">
            Conquistada em {new Date(unlockedAt).toLocaleDateString("pt-BR")}
          </p>
        )}
      </div>
    </div>
  );
}
