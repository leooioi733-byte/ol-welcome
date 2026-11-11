import { CheckCircle2, Eye, RotateCcw, Sparkles, XCircle } from "lucide-react";
import { type ReactNode, useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import type { ActivityResult } from "@/lib/progress/types";
import { cn } from "@/lib/utils";

export type ResolvedPayload = Omit<ActivityResult, "activityId">;

export interface ActivityProps<A> {
  activity: A;
  onResolve: (result: ResolvedPayload) => void;
}

export type GradedStatus = "idle" | "wrong" | "correct" | "revealed";

/** Shared state machine for activities with a right answer. */
export function useGraded(onResolve: (r: ResolvedPayload) => void) {
  const [status, setStatus] = useState<GradedStatus>("idle");
  const [attempts, setAttempts] = useState(0);

  const check = useCallback(
    (ok: boolean) => {
      const n = attempts + 1;
      setAttempts(n);
      if (ok) {
        setStatus("correct");
        onResolve({ graded: true, correct: true, attempts: n, revealed: false });
      } else {
        setStatus("wrong");
      }
    },
    [attempts, onResolve],
  );

  const reveal = useCallback(() => {
    setStatus("revealed");
    onResolve({ graded: true, correct: false, attempts, revealed: true });
  }, [attempts, onResolve]);

  const retry = useCallback(() => setStatus("idle"), []);
  const locked = status === "correct" || status === "revealed";
  return { status, attempts, check, reveal, retry, locked };
}

export function ActivityHeader({ label, prompt }: { label: string; prompt: string }) {
  return (
    <div className="mb-6">
      <p className="inline-flex items-center gap-1.5 rounded-full bg-area-soft px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-foreground">
        <Sparkles className="size-3.5 text-area" aria-hidden /> {label}
      </p>
      <h2 className="mt-3 text-2xl font-bold leading-snug md:text-3xl">{prompt}</h2>
    </div>
  );
}

interface GradedFooterProps {
  status: GradedStatus;
  attempts: number;
  canCheck: boolean;
  onCheck: () => void;
  onRetry: () => void;
  onReveal: () => void;
  explanation: string;
  wrongHint?: string;
}

export function GradedFooter({ status, attempts, canCheck, onCheck, onRetry, onReveal, explanation, wrongHint }: GradedFooterProps) {
  return (
    <div className="mt-6" aria-live="polite">
      {status === "idle" && (
        <Button size="lg" className="h-12 w-full rounded-xl text-base font-bold md:w-auto md:px-10" disabled={!canCheck} onClick={onCheck}>
          Verificar
        </Button>
      )}
      {status === "wrong" && (
        <Feedback tone="wrong" title="Ainda não." icon={<XCircle className="size-5" aria-hidden />}>
          <p>{wrongHint ?? "Observe de novo e tente outra vez — errar faz parte do processo."}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button onClick={onRetry} className="rounded-lg">
              <RotateCcw className="size-4" aria-hidden /> Tentar de novo
            </Button>
            {attempts >= 2 && (
              <Button variant="ghost" onClick={onReveal} className="rounded-lg">
                <Eye className="size-4" aria-hidden /> Mostrar resposta
              </Button>
            )}
          </div>
        </Feedback>
      )}
      {status === "correct" && (
        <Feedback tone="correct" title={attempts <= 1 ? "Isso! De primeira." : "Isso!"} icon={<CheckCircle2 className="size-5" aria-hidden />}>
          <p>{explanation}</p>
        </Feedback>
      )}
      {status === "revealed" && (
        <Feedback tone="neutral" title="Resposta" icon={<Eye className="size-5" aria-hidden />}>
          <p>{explanation}</p>
        </Feedback>
      )}
    </div>
  );
}

export function Feedback({ tone, title, icon, children }: { tone: "correct" | "wrong" | "neutral"; title: string; icon: ReactNode; children: ReactNode }) {
  return (
    <div
      className={cn(
        "animate-rise rounded-2xl border p-4 text-sm",
        tone === "correct" && "border-success/30 bg-success-soft",
        tone === "wrong" && "animate-wiggle border-destructive/30 bg-accent",
        tone === "neutral" && "border-border bg-muted",
      )}
    >
      <p className={cn("mb-1 flex items-center gap-2 font-display text-base font-bold", tone === "correct" && "text-success", tone === "wrong" && "text-destructive")}>
        {icon} {title}
      </p>
      {children}
    </div>
  );
}

/** Deterministic shuffle (same on server and client) that never returns the original order. */
export function seededShuffle<T>(items: T[], seed: string): T[] {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  const rand = () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  if (out.length > 1 && out.every((v, i) => v === items[i])) out.push(out.shift()!);
  return out;
}
