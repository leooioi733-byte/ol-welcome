import { Check, Volume2 } from "lucide-react";
import { useState } from "react";

import type { Activity } from "@/content/types";
import { playTone } from "@/lib/audio";
import { cn } from "@/lib/utils";

import { type ActivityProps, ActivityHeader, GradedFooter, useGraded } from "./shared";

type ChoiceActivityData = Extract<Activity, { type: "choice" }>;

export function ChoiceActivity({ activity, onResolve }: ActivityProps<ChoiceActivityData>) {
  const [selected, setSelected] = useState<number | null>(null);
  const g = useGraded(onResolve);

  return (
    <div>
      <ActivityHeader label="Escolha" prompt={activity.prompt} />
      <div role="radiogroup" aria-label={activity.prompt} className="grid gap-3 sm:grid-cols-2">
        {activity.options.map((opt, i) => {
          const isSelected = selected === i;
          const showCorrect = (g.status === "correct" && isSelected) || (g.status === "revealed" && i === activity.answer);
          const showWrong = g.status === "wrong" && isSelected;
          return (
            <div key={opt.label} className="relative">
              <button
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={g.locked}
                onClick={() => {
                  setSelected(i);
                  if (g.status === "wrong") g.retry();
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl border-2 bg-card p-4 text-left font-semibold transition-all",
                  "hover:-translate-y-0.5 hover:border-foreground/40 disabled:hover:translate-y-0",
                  isSelected ? "border-foreground shadow-block" : "border-border",
                  showCorrect && "border-success bg-success-soft shadow-none",
                  showWrong && "border-destructive bg-accent shadow-none",
                  opt.tone && "pr-16",
                )}
              >
                <span
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-full border-2 text-xs font-bold",
                    isSelected ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground",
                    showCorrect && "border-success bg-success text-success-foreground",
                  )}
                >
                  {showCorrect ? <Check className="size-4" aria-hidden /> : String.fromCharCode(65 + i)}
                </span>
                {opt.swatch && <span className="size-8 shrink-0 rounded-lg ring-1 ring-border" style={{ backgroundColor: opt.swatch }} aria-hidden />}
                <span>{opt.label}</span>
              </button>
              {opt.tone && (
                <button
                  type="button"
                  onClick={() => playTone(opt.tone!, 1)}
                  aria-label={`Ouvir ${opt.label}`}
                  className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-area text-area-foreground transition-transform hover:scale-105 active:scale-95"
                >
                  <Volume2 className="size-5" aria-hidden />
                </button>
              )}
            </div>
          );
        })}
      </div>
      <GradedFooter
        status={g.status}
        attempts={g.attempts}
        canCheck={selected !== null}
        onCheck={() => g.check(selected === activity.answer)}
        onRetry={() => {
          setSelected(null);
          g.retry();
        }}
        onReveal={() => {
          setSelected(activity.answer);
          g.reveal();
        }}
        explanation={activity.explanation}
      />
    </div>
  );
}
