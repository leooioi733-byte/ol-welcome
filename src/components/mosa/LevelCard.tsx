import { levelFromXp } from "@/lib/progress/levels";
import { cn } from "@/lib/utils";

import { ProgressBar } from "./ProgressBar";

export function LevelCard({ xp, className }: { xp: number; className?: string }) {
  const info = levelFromXp(xp);
  return (
    <div className={cn("rounded-2xl paper p-5", className)}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Nível {info.level}</p>
          <p className="font-display text-3xl font-bold">{info.name}</p>
        </div>
        <p className="text-right text-sm text-muted-foreground">
          <span className="font-display text-2xl font-bold text-foreground tabular-nums">{xp}</span> XP
        </p>
      </div>
      <ProgressBar value={info.progress} label={`Progresso até o nível ${info.level + 1}`} className="mt-4" barClassName="bg-saffron" />
      <p className="mt-2 text-xs text-muted-foreground">
        Faltam <strong className="text-foreground">{info.xpToNext} XP</strong> para o nível {info.level + 1}
      </p>
    </div>
  );
}
