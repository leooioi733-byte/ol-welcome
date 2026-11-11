import { useState } from "react";

import type { Activity } from "@/content/types";
import { cn } from "@/lib/utils";

import { type ActivityProps, ActivityHeader, GradedFooter, useGraded } from "./shared";

type HotspotActivityData = Extract<Activity, { type: "hotspot" }>;

function Scene({ kind, showGrid }: { kind: HotspotActivityData["scene"]; showGrid: boolean }) {
  return (
    <svg viewBox="0 0 300 200" className="absolute inset-0 size-full" aria-hidden preserveAspectRatio="none">
      <rect width="300" height="200" className="fill-cobalt-soft" />
      {kind === "landscape" ? (
        <>
          <circle cx="250" cy="40" r="16" className="fill-saffron" opacity={0.8} />
          <path d="M0 140 C 60 120, 110 150, 170 132 S 260 120, 300 134 V200 H0 Z" className="fill-moss" opacity={0.55} />
          <path d="M0 160 C 80 150, 160 170, 300 156 V200 H0 Z" className="fill-moss" />
        </>
      ) : (
        <rect y="150" width="300" height="50" className="fill-muted" />
      )}
      {showGrid &&
        [1, 2].map((n) => (
          <g key={n} className="stroke-foreground" strokeDasharray="5 5" strokeWidth={1}>
            <line x1={(300 * n) / 3} y1={0} x2={(300 * n) / 3} y2={200} />
            <line x1={0} y1={(200 * n) / 3} x2={300} y2={(200 * n) / 3} />
          </g>
        ))}
    </svg>
  );
}

export function HotspotActivity({ activity, onResolve }: ActivityProps<HotspotActivityData>) {
  const [picked, setPicked] = useState<number | null>(null);
  const g = useGraded(onResolve);
  const solved = g.locked;

  return (
    <div>
      <ActivityHeader label="Posicione" prompt={activity.prompt} />
      <div className="relative mx-auto aspect-[3/2] w-full max-w-xl overflow-hidden rounded-2xl border-2 border-foreground shadow-block">
        <Scene kind={activity.scene} showGrid={solved} />
        {activity.points.map((p, i) => {
          const isPicked = picked === i;
          const isAnswer = activity.answers.includes(i);
          return (
            <button
              key={i}
              type="button"
              disabled={g.locked}
              aria-pressed={isPicked}
              aria-label={`Posição ${i + 1}`}
              onClick={() => {
                setPicked(i);
                if (g.status === "wrong") g.retry();
              }}
              className={cn(
                "absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-dashed border-foreground/50 bg-card/50 transition-all hover:scale-110",
                isPicked && "border-solid border-foreground bg-card",
                solved && isAnswer && "border-solid border-success bg-success-soft",
              )}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              {isPicked && (
                <svg viewBox="0 0 24 32" className="size-7 animate-pop-in" aria-hidden>
                  <rect x="10" y="18" width="4" height="12" className="fill-foreground" />
                  <circle cx="12" cy="12" r="10" className="fill-moss" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
      <GradedFooter
        status={g.status}
        attempts={g.attempts}
        canCheck={picked !== null}
        onCheck={() => g.check(picked !== null && activity.answers.includes(picked))}
        onRetry={() => {
          setPicked(null);
          g.retry();
        }}
        onReveal={() => {
          setPicked(activity.answers[0] ?? null);
          g.reveal();
        }}
        explanation={activity.explanation}
        wrongHint="Imagine o quadro dividido em três partes iguais, na horizontal e na vertical."
      />
    </div>
  );
}
