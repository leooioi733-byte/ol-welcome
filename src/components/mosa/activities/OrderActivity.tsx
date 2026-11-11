import { ArrowDown, ArrowUp, Volume2 } from "lucide-react";
import { useMemo, useState } from "react";

import type { Activity } from "@/content/types";
import { playTone } from "@/lib/audio";
import { cn } from "@/lib/utils";

import { type ActivityProps, ActivityHeader, GradedFooter, seededShuffle, useGraded } from "./shared";

type OrderActivityData = Extract<Activity, { type: "order" }>;

export function OrderActivity({ activity, onResolve }: ActivityProps<OrderActivityData>) {
  const initial = useMemo(() => seededShuffle(activity.items.map((_, i) => i), activity.id), [activity]);
  const [order, setOrder] = useState(initial);
  const g = useGraded(onResolve);

  const move = (pos: number, delta: -1 | 1) => {
    const target = pos + delta;
    if (target < 0 || target >= order.length) return;
    const next = [...order];
    [next[pos], next[target]] = [next[target]!, next[pos]!];
    setOrder(next);
    if (g.status === "wrong") g.retry();
  };

  const showResult = g.status !== "idle";

  return (
    <div>
      <ActivityHeader label="Ordene" prompt={activity.prompt} />
      <ol className="space-y-2.5" aria-label="Itens para ordenar">
        {order.map((itemIndex, pos) => {
          const item = activity.items[itemIndex]!;
          const inPlace = itemIndex === pos;
          return (
            <li
              key={itemIndex}
              className={cn(
                "flex items-center gap-3 rounded-2xl border-2 bg-card p-3 transition-all",
                showResult && inPlace && "border-success bg-success-soft",
                showResult && !inPlace && g.status === "wrong" && "border-destructive/60",
                !showResult && "border-border",
              )}
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-foreground font-display text-sm font-bold text-background">{pos + 1}</span>
              {item.swatch && <span className="size-9 shrink-0 rounded-lg ring-1 ring-border" style={{ backgroundColor: item.swatch }} aria-hidden />}
              <span className="flex-1 font-semibold">{item.label}</span>
              {item.tone && (
                <button type="button" onClick={() => playTone(item.tone!, 0.9)} aria-label={`Ouvir ${item.label}`} className="grid size-9 place-items-center rounded-full bg-area text-area-foreground">
                  <Volume2 className="size-4" aria-hidden />
                </button>
              )}
              <div className="flex gap-1">
                <button
                  type="button"
                  disabled={g.locked || pos === 0}
                  onClick={() => move(pos, -1)}
                  aria-label={`Mover ${item.label} para cima`}
                  className="grid size-9 place-items-center rounded-lg border border-border transition-colors hover:bg-muted disabled:opacity-30"
                >
                  <ArrowUp className="size-4" aria-hidden />
                </button>
                <button
                  type="button"
                  disabled={g.locked || pos === order.length - 1}
                  onClick={() => move(pos, 1)}
                  aria-label={`Mover ${item.label} para baixo`}
                  className="grid size-9 place-items-center rounded-lg border border-border transition-colors hover:bg-muted disabled:opacity-30"
                >
                  <ArrowDown className="size-4" aria-hidden />
                </button>
              </div>
            </li>
          );
        })}
      </ol>
      <GradedFooter
        status={g.status}
        attempts={g.attempts}
        canCheck
        onCheck={() => g.check(order.every((v, i) => v === i))}
        onRetry={g.retry}
        onReveal={() => {
          setOrder(activity.items.map((_, i) => i));
          g.reveal();
        }}
        explanation={activity.explanation}
        wrongHint="Os itens em verde já estão no lugar certo. Reorganize os outros."
      />
    </div>
  );
}
