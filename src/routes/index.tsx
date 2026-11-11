import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Flame } from "lucide-react";
import { useState } from "react";

import { AppShell } from "@/components/mosa/AppShell";
import { AreaCard } from "@/components/mosa/AreaCard";
import { areaStyle } from "@/components/mosa/area-style";
import { LevelCard } from "@/components/mosa/LevelCard";
import { LogoMark } from "@/components/mosa/Logo";
import { Mosaic } from "@/components/mosa/Mosaic";
import { Tile } from "@/components/mosa/Tile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AREAS, catalog } from "@/content/catalog";
import { getProgressStore, useHydrated, useProgress } from "@/hooks/use-progress";
import { currentStreak } from "@/lib/progress/streak";
import { recommendedLesson } from "@/lib/progress/unlock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MOSA — Aprenda artes visuais, composição, música e dança" },
      { name: "description", content: "Trilhas curtas, atividades interativas, XP e conquistas para aprender artes no seu ritmo." },
      { property: "og:title", content: "MOSA — Plataforma de educação artística" },
      { property: "og:description", content: "Aprenda artes com lições curtas, prática ativa e um mosaico que cresce com você." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Onboarding() {
  const [name, setName] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  return (
    <div className="mx-auto grid min-h-dvh max-w-5xl items-center gap-10 px-5 py-12 md:grid-cols-2">
      <div>
        <LogoMark className="size-14" />
        <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] md:text-6xl">
          Aprenda arte <span className="font-accent text-vermilion">peça</span> por peça.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">Cada lição concluída vira um ladrilho do seu mosaico pessoal. Comece contando um pouco sobre você.</p>
      </div>
      <form
        className="rounded-3xl paper p-6 md:p-8"
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim()) getProgressStore().setProfile({ name, interests });
        }}
      >
        <label htmlFor="nome" className="font-display text-lg font-bold">Como podemos te chamar?</label>
        <Input id="nome" value={name} maxLength={60} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" className="mt-2 h-12 text-base" required />
        <fieldset className="mt-6">
          <legend className="font-display text-lg font-bold">O que você quer explorar?</legend>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {AREAS.map((a) => {
              const on = interests.includes(a.id);
              return (
                <button
                  key={a.id}
                  type="button"
                  aria-pressed={on}
                  style={areaStyle(a.pigment)}
                  onClick={() => setInterests((p) => (on ? p.filter((x) => x !== a.id) : [...p, a.id]))}
                  className={cn("flex items-center gap-2 rounded-2xl border-2 p-3 text-left text-sm font-semibold transition-all", on ? "border-area bg-area-soft" : "border-border")}
                >
                  <Tile shape={a.motif} className="size-6 text-area" /> {a.name}
                </button>
              );
            })}
          </div>
        </fieldset>
        <Button type="submit" size="lg" className="mt-8 h-12 w-full rounded-xl text-base font-bold" disabled={!name.trim()}>
          Começar <ArrowRight className="size-4" aria-hidden />
        </Button>
        <p className="mt-3 text-center text-xs text-muted-foreground">Seu progresso fica salvo neste dispositivo.</p>
      </form>
    </div>
  );
}

function Home() {
  const hydrated = useHydrated();
  const progress = useProgress();
  if (!hydrated) return <div className="min-h-dvh" aria-busy="true" />;
  if (!progress.profile) return <Onboarding />;

  const next = recommendedLesson(progress, catalog);
  const streak = currentStreak(progress.activeDays, new Date());
  const done = Object.keys(progress.lessons).length;

  return (
    <AppShell>
      <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-accent text-2xl text-vermilion">Olá, {progress.profile.name}.</p>
          <h1 className="mt-1 text-4xl font-extrabold leading-tight md:text-5xl">{done === 0 ? "Seu primeiro traço espera por você." : "Vamos continuar a sua obra?"}</h1>
          {next ? (
            <Link
              to="/licoes/$lessonId"
              params={{ lessonId: next.lesson.id }}
              style={areaStyle(next.area.pigment)}
              className="group mt-6 flex items-center gap-5 rounded-3xl bg-area p-6 text-area-foreground shadow-lift transition-transform hover:-translate-y-1"
            >
              <Tile shape={next.area.motif} className="size-16 shrink-0 animate-float text-area-foreground" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-[0.16em] opacity-80">{done === 0 ? "Comece por aqui" : "Continuar"} · {next.area.name}</p>
                <p className="mt-1 font-display text-2xl font-bold">{next.lesson.title}</p>
                <p className="text-sm opacity-85">{next.track.title} · {next.lesson.minutes} min</p>
              </div>
              <ArrowRight className="size-6 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          ) : (
            <p className="mt-6 rounded-3xl paper p-6 font-semibold">Você concluiu todas as lições disponíveis. Novas trilhas chegam em breve!</p>
          )}
        </div>
        <div className="grid gap-4">
          <LevelCard xp={progress.xp} />
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl paper p-5">
              <Flame className={cn("size-6", streak ? "text-vermilion" : "text-muted-foreground")} aria-hidden />
              <p className="mt-2 font-display text-3xl font-bold tabular-nums">{streak}</p>
              <p className="text-sm text-muted-foreground">dias seguidos</p>
            </div>
            <div className="rounded-2xl paper p-5">
              <Tile shape="square" className="size-6 text-cobalt" />
              <p className="mt-2 font-display text-3xl font-bold tabular-nums">{done}</p>
              <p className="text-sm text-muted-foreground">lições concluídas</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-3xl font-bold">Áreas artísticas</h2>
          <Link to="/areas" className="text-sm font-semibold underline-offset-4 hover:underline">Ver todas</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AREAS.map((a) => <AreaCard key={a.id} area={a} progress={progress} />)}
        </div>
      </section>

      <section className="mt-12 rounded-3xl paper p-6 md:p-8">
        <h2 className="text-2xl font-bold">Seu mosaico</h2>
        <p className="mb-5 mt-1 text-sm text-muted-foreground">Cada lição concluída preenche um ladrilho com a cor da sua área.</p>
        <Mosaic progress={progress} />
      </section>
    </AppShell>
  );
}
