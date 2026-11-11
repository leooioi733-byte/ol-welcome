import { useMemo, useState } from "react";

import type { Activity } from "@/content/types";
import { cn } from "@/lib/utils";

import { type ActivityProps, ActivityHeader, GradedFooter, seededShuffle, useGraded } from "./shared";

type MatchActivityData = Extract<Activity, { type: "match" }>;

const PAIR_COLORS = ["bg-vermilion-soft border-vermilion", "bg-cobalt-soft border-cobalt", "bg-saffron-soft border-saffron", "bg-orchid-soft border-orchid", "bg-moss-soft border-moss"];

export function MatchActivity({ activity, onResolve }: ActivityProps<MatchActivityData>) {
  const rights = useMemo(() => seededShuffle(activity.pairs.map((_, i) => i), activity.id), [activity]);
  /** left index -> right index (indexes into activity.pairs) */
  const [links, setLinks] = useState<Record<number, number>>({});
  const [activeLeft, setActiveLeft] = useState<number | null>(null);
  const g = useGraded(onResolve);

  const linkOrder = Object.keys(links).map(Number);
  const colorFor = (left: number) => PAIR_COLORS[linkOrder.indexOf(left) % PAIR_COLORS.length];
  const leftOfRight = (right: number) => {
    const entry = Object.entries(links).find(([, r]) => r === right);
    return entry ? Number(entry[0]) : null;
  };

  const pickRight = (right: number) => {
    if (activeLeft === null || g.locked) return;
    const next = { ...links };
    const prevOwner = leftOfRight(right);
    if (prevOwner !== null) delete next[prevOwner];
    next[activeLeft] = right;
    setLinks(next);
    setActiveLeft(null);
    if (g.status === "wrong") g.retry();
  };

  const wrongLeft = (l: number) => g.status === "wrong" && links[l] !== undefined && links[l] !== l;

  return (
    <div>
      <ActivityHeader label="Associe" prompt={activity.prompt} />
      <p className="mb-4 text-sm text-muted-foreground">Toque num item da esquerda e depois no par correspondente à direita.</p>
      <div className="grid grid-cols-2 gap-3 md:gap-5">
        <ul className="space-y-2.5">
          {activity.pairs.map((p, l) => {
            const linked = links[l] !== undefined;
            return (
              <li key={p.left}>
                <button
                  type="button"
                  disabled={g.locked}
                  aria-pressed={activeLeft === l}
                  onClick={() => setActiveLeft(activeLeft === l ? null : l)}
                  className={cn(
                    "min-h-14 w-full rounded-2xl border-2 bg-card p-3 text-left text-sm font-semibold transition-all md:text-base",
                    activeLeft === l ? "border-foreground shadow-block" : "border-border",
                    linked && colorFor(l),
                    wrongLeft(l) && "animate-wiggle",
                  )}
                >
                  {p.left}
                </button>
              </li>
            );
          })}
        </ul>
        <ul className="space-y-2.5">
          {rights.map((r) => {
            const owner = leftOfRight(r);
            return (
              <li key={activity.pairs[r]!.right}>
                <button
                  type="button"
                  disabled={g.locked || activeLeft === null}
                  onClick={() => pickRight(r)}
                  className={cn(
                    "min-h-14 w-full rounded-2xl border-2 border-dashed bg-card p-3 text-left text-sm font-semibold transition-all md:text-base",
                    activeLeft !== null && "border-foreground/50 hover:border-foreground",
                    owner !== null ? cn("border-solid", colorFor(owner)) : "border-border",
                  )}
                >
                  {activity.pairs[r]!.right}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <GradedFooter
        status={g.status}
        attempts={g.attempts}
        canCheck={Object.keys(links).length === activity.pairs.length}
        onCheck={() => g.check(activity.pairs.every((_, l) => links[l] === l))}
        onRetry={() => {
          setLinks(Object.fromEntries(Object.entries(links).filter(([l, r]) => Number(l) === r)));
          g.retry();
        }}
        onReveal={() => {
          setLinks(Object.fromEntries(activity.pairs.map((_, i) => [i, i])));
          g.reveal();
        }}
        explanation={activity.explanation}
        wrongHint="Alguns pares não combinam. Ao tentar de novo, mantemos os pares certos."
      />
    </div>
  );
}
