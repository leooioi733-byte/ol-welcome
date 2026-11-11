import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Lightbulb, RotateCcw, Trophy, X } from "lucide-react";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { type LessonContext, catalog } from "@/content/catalog";
import type { Step } from "@/content/types";
import { getProgressStore, useProgress } from "@/hooks/use-progress";
import type { LessonCompletionOutcome } from "@/lib/progress/engine";
import { levelFromXp } from "@/lib/progress/levels";
import type { ActivityResult } from "@/lib/progress/types";
import { lessonStatus } from "@/lib/progress/unlock";
import { cn } from "@/lib/utils";

import { ActivityView } from "../activities";
import type { ResolvedPayload } from "../activities/shared";
import { AchievementBadge } from "../AchievementBadge";
import { areaStyle } from "../area-style";
import { ProgressBar } from "../ProgressBar";
import { Tile } from "../Tile";
import { VisualView } from "../Visual";

function StepView({ step }: { step: Exclude<Step, { kind: "activity" }> }) {
  switch (step.kind) {
    case "intro":
      return (
        <div className="animate-rise">
          {step.visual && <VisualView visual={step.visual} className="mb-6 animate-float" />}
          {step.kicker && <p className="font-accent text-xl text-area">{step.kicker}</p>}
          <h1 className="mt-1 text-4xl font-extrabold leading-[1.05] md:text-5xl">{step.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{step.body}</p>
        </div>
      );
    case "text":
      return (
        <div className="animate-rise space-y-4">
          {step.title && <h2 className="text-3xl font-bold">{step.title}</h2>}
          {step.body.map((p) => <p key={p} className="text-lg leading-relaxed">{p}</p>)}
        </div>
      );
    case "cards":
      return (
        <div className="animate-rise">
          {step.title && <h2 className="mb-5 text-3xl font-bold">{step.title}</h2>}
          <div className="grid gap-3 sm:grid-cols-2">
            {step.cards.map((c, i) => (
              <div key={c.title} className="rounded-2xl paper p-5" style={{ animationDelay: `${i * 80}ms` }}>
                {c.visual && <VisualView visual={c.visual} size="sm" className="mb-3" />}
                <p className="font-display text-lg font-bold">{c.title}</p>
                <p className="mt-1 text-muted-foreground">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case "visual":
      return (
        <div className="animate-rise">
          {step.title && <h2 className="mb-5 text-3xl font-bold">{step.title}</h2>}
          <VisualView visual={step.visual} className="border border-border shadow-paper" />
          {step.caption && <p className="mt-4 text-muted-foreground">{step.caption}</p>}
        </div>
      );
    case "example":
      return (
        <div className="animate-rise rounded-3xl bg-area-soft p-6 md:p-8">
          <p className="font-accent text-xl text-area">Exemplo</p>
          <h2 className="mt-1 text-3xl font-bold">{step.title}</h2>
          <p className="mt-4 text-lg leading-relaxed">{step.body}</p>
          {step.visual && <VisualView visual={step.visual} className="mt-5" />}
        </div>
      );
    case "tip":
      return (
        <div className="animate-rise flex gap-4 rounded-3xl border-2 border-dashed border-area p-6">
          <Lightbulb className="size-8 shrink-0 text-area" aria-hidden />
          <div>
            <p className="font-display text-lg font-bold">Dica de ateliê</p>
            <p className="mt-1 text-lg leading-relaxed">{step.body}</p>
          </div>
        </div>
      );
    case "conclusion":
      return (
        <div className="animate-rise">
          <p className="font-accent text-xl text-area">Para levar</p>
          <h2 className="mt-1 text-3xl font-bold">{step.title ?? "O que você aprendeu"}</h2>
          <ul className="mt-5 space-y-3">
            {step.points.map((p) => (
              <li key={p} className="flex gap-3 rounded-2xl paper p-4 text-lg">
                <Check className="mt-1 size-5 shrink-0 text-area" aria-hidden /> {p}
              </li>
            ))}
          </ul>
        </div>
      );
  }
}

export function LessonPlayer({ ctx }: { ctx: LessonContext }) {
  const progress = useProgress();
  const { lesson, track, area } = ctx;
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<Record<string, ActivityResult>>({});
  const [outcome, setOutcome] = useState<LessonCompletionOutcome | null>(null);

  const step = lesson.steps[index]!;
  const activityId = step.kind === "activity" ? step.activity.id : null;
  const canContinue = !activityId || Boolean(results[activityId]);
  const isLast = index === lesson.steps.length - 1;

  const onResolve = useCallback(
    (r: ResolvedPayload) => {
      if (!activityId) return;
      setResults((p) => ({ ...p, [activityId]: { ...r, activityId } }));
    },
    [activityId],
  );

  const next = () => {
    if (isLast) setOutcome(getProgressStore().completeLesson(lesson.id, Object.values(results)));
    else setIndex(index + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (lessonStatus(lesson.id, progress, catalog) === "locked" && !outcome) {
    return (
      <div style={areaStyle(area.pigment)} className="mx-auto max-w-md px-5 py-24 text-center">
        <Tile shape={area.motif} className="mx-auto size-16 text-area-soft" />
        <h1 className="mt-6 text-3xl font-bold">Lição bloqueada</h1>
        <p className="mt-2 text-muted-foreground">Conclua a lição anterior da trilha para desbloquear esta.</p>
        <Button asChild className="mt-6"><Link to="/trilhas/$trackId" params={{ trackId: track.id }}>Ver a trilha</Link></Button>
      </div>
    );
  }

  if (outcome) {
    const nextCtx = ctx.trackLessons[ctx.indexInTrack + 1];
    const level = levelFromXp(outcome.state.xp);
    return (
      <div style={areaStyle(area.pigment)} className="mx-auto max-w-xl px-5 py-12 md:py-20">
        <div className="relative mx-auto grid size-28 grid-cols-2 gap-1.5" aria-hidden>
          <Tile shape={area.motif} className="size-full animate-pop-in text-area" />
          <Tile shape="quarter" className="size-full animate-pop-in text-saffron [animation-delay:120ms]" />
          <Tile shape="square" className="size-full animate-pop-in text-cobalt [animation-delay:240ms]" />
          <Tile shape="circle" className="size-full animate-pop-in text-orchid [animation-delay:360ms]" />
        </div>
        <h1 className="mt-8 text-center text-4xl font-extrabold">{outcome.xp.isReview ? "Revisão concluída!" : "Lição concluída!"}</h1>
        <p className="mt-2 text-center text-muted-foreground">Mais uma peça no seu mosaico: <strong className="text-foreground">{lesson.title}</strong></p>
        <div className="mt-8 rounded-3xl paper p-6">
          <div className="flex items-baseline justify-between">
            <span className="font-display text-lg font-bold">XP ganho</span>
            <span className="font-display text-4xl font-extrabold text-area">+{outcome.xp.total}</span>
          </div>
          <dl className="mt-4 space-y-1.5 text-sm">
            {!outcome.xp.isReview && <div className="flex justify-between"><dt className="text-muted-foreground">Atividades</dt><dd className="font-semibold">+{outcome.xp.activities}</dd></div>}
            <div className="flex justify-between"><dt className="text-muted-foreground">{outcome.xp.isReview ? "Revisão" : "Lição concluída"}</dt><dd className="font-semibold">+{outcome.xp.completion}</dd></div>
            {outcome.xp.perfectBonus > 0 && <div className="flex justify-between"><dt className="text-muted-foreground">Bônus: tudo de primeira</dt><dd className="font-semibold">+{outcome.xp.perfectBonus}</dd></div>}
            <div className="flex justify-between"><dt className="text-muted-foreground">Acertos de primeira</dt><dd className="font-semibold">{Math.round(outcome.score * 100)}%</dd></div>
          </dl>
          <ProgressBar value={level.progress} label="Progresso de nível" className="mt-5" barClassName="bg-saffron" />
          <p className="mt-2 text-xs text-muted-foreground">Nível {level.level} · {level.name} — faltam {level.xpToNext} XP</p>
        </div>
        {outcome.leveledUp && (
          <div className="mt-4 flex items-center gap-3 rounded-2xl bg-foreground p-4 text-background animate-rise">
            <Trophy className="size-6 text-saffron" aria-hidden />
            <p className="font-semibold">Você subiu para o nível {level.level}: {level.name}!</p>
          </div>
        )}
        {outcome.achievements.length > 0 && (
          <div className="mt-6 space-y-3">
            <p className="font-display text-lg font-bold">Nova conquista</p>
            {outcome.achievements.map((a, i) => <AchievementBadge key={a.id} achievement={a} unlockedAt={new Date().toISOString()} index={i} className="animate-rise" />)}
          </div>
        )}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {nextCtx ? (
            <Button asChild size="lg" className="h-12 flex-1 rounded-xl font-bold">
              <Link to="/licoes/$lessonId" params={{ lessonId: nextCtx.id }} reloadDocument>Próxima lição <ArrowRight className="size-4" aria-hidden /></Link>
            </Button>
          ) : (
            <Button asChild size="lg" className="h-12 flex-1 rounded-xl font-bold"><Link to="/areas/$areaId" params={{ areaId: area.id }}>Trilha completa — ver a área</Link></Button>
          )}
          <Button asChild size="lg" variant="outline" className="h-12 rounded-xl"><Link to="/trilhas/$trackId" params={{ trackId: track.id }}>Voltar à trilha</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div style={areaStyle(area.pigment)} className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-20 border-b border-border/70 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-3xl items-center gap-4 px-5">
          <Link to="/trilhas/$trackId" params={{ trackId: track.id }} aria-label="Sair da lição" className="grid size-10 place-items-center rounded-full hover:bg-muted">
            <X className="size-5" aria-hidden />
          </Link>
          <div className="flex flex-1 gap-1" role="progressbar" aria-label="Progresso da lição" aria-valuemin={1} aria-valuemax={lesson.steps.length} aria-valuenow={index + 1}>
            {lesson.steps.map((s, i) => (
              <span key={i} className={cn("h-2 flex-1 rounded-full transition-colors", i <= index ? "bg-area" : "bg-muted", s.kind === "activity" && "h-2.5")} />
            ))}
          </div>
          <span className="text-xs font-bold tabular-nums text-muted-foreground">{index + 1}/{lesson.steps.length}</span>
        </div>
      </header>
      <main id="conteudo" className="mx-auto w-full max-w-3xl flex-1 px-5 py-8 md:py-12">
        {step.kind === "activity" ? (
          <ActivityView key={step.activity.id} activity={step.activity} onResolve={onResolve} />
        ) : (
          <StepView key={index} step={step} />
        )}
      </main>
      <footer className="sticky bottom-0 border-t border-border/70 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-5 py-4">
          <Button variant="ghost" disabled={index === 0} onClick={() => setIndex(index - 1)}>
            <RotateCcw className="size-4" aria-hidden /> Voltar
          </Button>
          <div className="flex items-center gap-3">
            {!canContinue && <span className="hidden text-sm text-muted-foreground sm:inline">Responda para continuar</span>}
            <Button size="lg" className="h-12 rounded-xl px-8 font-bold" disabled={!canContinue} onClick={next}>
              {isLast ? "Concluir lição" : "Continuar"} <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
