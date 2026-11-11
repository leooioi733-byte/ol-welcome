import { Play } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import type { Activity } from "@/content/types";
import { playPattern } from "@/lib/audio";
import { figuresToPattern, patternsEqual } from "@/lib/rhythm";
import { cn } from "@/lib/utils";

import { NoteGlyph } from "../diagrams/NoteGlyph";
import { type ActivityProps, ActivityHeader, GradedFooter, useGraded } from "./shared";

type RhythmActivityData = Extract<Activity, { type: "rhythm" }>;

export function RhythmActivity({ activity, onResolve }: ActivityProps<RhythmActivityData>) {
  const target = useMemo(() => figuresToPattern(activity.figures), [activity]);
  const [grid, setGrid] = useState<boolean[]>(() => target.map(() => false));
  const g = useGraded(onResolve);

  return (
    <div>
      <ActivityHeader label="Ritmo" prompt={activity.prompt} />
      <div className="rounded-2xl bg-card p-4">
        <svg viewBox={`0 0 ${activity.figures.length * 60} 64`} className="mx-auto h-20" role="img" aria-label={`Notação: ${activity.figures.join(", ")}`}>
          <line x1="0" y1="44" x2={activity.figures.length * 60} y2="44" className="stroke-border" />
          {activity.figures.map((f, i) => (
            <NoteGlyph key={i} kind={f} x={i * 60 + 24} y={44} />
          ))}
        </svg>
      </div>
      <div className="mt-5 grid grid-cols-4 gap-2" role="group" aria-label="Grade rítmica">
        {[0, 1, 2, 3].map((beat) => (
          <div key={beat} className="grid grid-cols-2 gap-1 rounded-xl border border-border p-1">
            {[0, 1].map((half) => {
              const i = beat * 2 + half;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={g.locked}
                  aria-pressed={grid[i]}
                  aria-label={`Tempo ${beat + 1}${half ? " e" : ""}`}
                  onClick={() => {
                    setGrid((p) => p.map((v, j) => (j === i ? !v : v)));
                    if (g.status === "wrong") g.retry();
                  }}
                  className={cn("h-14 rounded-lg text-xs font-bold transition-all", grid[i] ? "bg-area text-area-foreground" : "bg-muted text-muted-foreground")}
                >
                  {half ? "e" : beat + 1}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => playPattern(target, activity.bpm)}>
          <Play className="size-4" aria-hidden /> Ouvir a notação
        </Button>
        <Button variant="outline" onClick={() => playPattern(grid, activity.bpm)}>
          <Play className="size-4" aria-hidden /> Ouvir minha versão
        </Button>
      </div>
      <GradedFooter
        status={g.status}
        attempts={g.attempts}
        canCheck={grid.some(Boolean)}
        onCheck={() => g.check(patternsEqual(grid, target))}
        onRetry={g.retry}
        onReveal={() => {
          setGrid(target);
          g.reveal();
        }}
        explanation={activity.explanation}
      />
    </div>
  );
}
