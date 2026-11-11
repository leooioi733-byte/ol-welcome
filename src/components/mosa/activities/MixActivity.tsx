import { useState } from "react";

import type { Activity } from "@/content/types";
import { cn } from "@/lib/utils";

import { type ActivityProps, ActivityHeader, GradedFooter, useGraded } from "./shared";

type MixActivityData = Extract<Activity, { type: "mix" }>;

export function MixActivity({ activity, onResolve }: ActivityProps<MixActivityData>) {
  const [picked, setPicked] = useState<number[]>([]);
  const g = useGraded(onResolve);

  const toggle = (i: number) => {
    if (g.locked) return;
    if (g.status === "wrong") g.retry();
    setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : p.length >= 2 ? [p[1]!, i] : [...p, i]));
  };

  const [a, b] = picked.map((i) => activity.palette[i]!.color);
  const solved = g.status === "correct" || g.status === "revealed";
  const bowl = solved ? activity.result.color : a && b ? `color-mix(in oklab, ${a}, ${b})` : a ?? undefined;

  return (
    <div>
      <ActivityHeader label="Misture" prompt={activity.prompt} />
      <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center">
        <div className="flex gap-4" role="group" aria-label="Paleta de tintas">
          {activity.palette.map((p, i) => {
            const on = picked.includes(i);
            return (
              <button
                key={p.label}
                type="button"
                aria-pressed={on}
                disabled={g.locked}
                onClick={() => toggle(i)}
                className="group flex flex-col items-center gap-2"
              >
                <span
                  className={cn(
                    "size-16 rounded-full ring-4 ring-offset-4 ring-offset-background transition-all group-hover:scale-105 md:size-20",
                    on ? "scale-105 ring-foreground" : "ring-transparent",
                  )}
                  style={{ backgroundColor: p.color }}
                />
                <span className="text-sm font-semibold">{p.label}</span>
              </button>
            );
          })}
        </div>
        <div className="flex flex-col items-center gap-2" aria-live="polite">
          <div className="relative grid size-32 place-items-center rounded-full border-4 border-dashed border-border bg-card md:size-36">
            <span className={cn("size-24 rounded-full transition-all duration-700 md:size-28", bowl ? "scale-100" : "scale-0")} style={{ backgroundColor: bowl }} />
          </div>
          <span className="text-sm font-semibold text-muted-foreground">{solved ? activity.result.label : picked.length === 2 ? "Mistura" : "Tigela de mistura"}</span>
        </div>
      </div>
      <GradedFooter
        status={g.status}
        attempts={g.attempts}
        canCheck={picked.length === 2}
        onCheck={() => g.check(activity.answer.every((i) => picked.includes(i)))}
        onRetry={() => {
          setPicked([]);
          g.retry();
        }}
        onReveal={() => {
          setPicked([...activity.answer]);
          g.reveal();
        }}
        explanation={activity.explanation}
        wrongHint={`Essa mistura não resulta em ${activity.result.label.toLowerCase()}. Pense em quais cores ficam ao lado dele no círculo.`}
      />
    </div>
  );
}
