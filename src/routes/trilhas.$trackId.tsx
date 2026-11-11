import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Check, Lock } from "lucide-react";

import { AppShell } from "@/components/mosa/AppShell";
import { areaStyle } from "@/components/mosa/area-style";
import { ProgressBar } from "@/components/mosa/ProgressBar";
import { Tile } from "@/components/mosa/Tile";
import { catalog } from "@/content/catalog";
import { useProgress } from "@/hooks/use-progress";
import { lessonStatus, trackProgress } from "@/lib/progress/unlock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/trilhas/$trackId")({
  loader: ({ params }) => {
    const found = catalog.getTrack(params.trackId);
    if (!found) throw notFound();
    return { id: found.track.id, title: found.track.title, summary: found.track.summary, area: found.area.name };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} · ${loaderData.area} — MOSA` : "Trilha — MOSA" },
      { name: "description", content: loaderData?.summary ?? "Trilha de aprendizagem do MOSA." },
      { property: "og:title", content: loaderData ? `${loaderData.title} — MOSA` : "Trilha — MOSA" },
      { property: "og:description", content: loaderData?.summary ?? "Trilha de aprendizagem do MOSA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TrackPage,
});

function TrackPage() {
  const { id } = Route.useLoaderData();
  const { track, area } = catalog.getTrack(id)!;
  const progress = useProgress();
  const tp = trackProgress(track, progress, catalog);
  let n = 0;
  return (
    <AppShell>
      <div style={areaStyle(area.pigment)} className="mx-auto max-w-3xl">
        <Link to="/areas/$areaId" params={{ areaId: area.id }} className="font-accent text-xl text-area hover:underline">{area.name}</Link>
        <h1 className="mt-1 text-4xl font-extrabold md:text-5xl">{track.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{track.summary}</p>
        <div className="mt-5 flex items-center gap-3">
          <ProgressBar value={tp.ratio} label="Progresso da trilha" />
          <span className="text-sm font-bold tabular-nums">{tp.done}/{tp.total}</span>
        </div>
        {track.modules.map((m) => (
          <section key={m.id} className="mt-10">
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">{m.title}</h2>
            <ol className="relative mt-4 space-y-3 border-l-2 border-dashed border-border pl-8">
              {m.lessons.map((l) => {
                const status = lessonStatus(l.id, progress, catalog);
                const i = n++;
                const body = (
                  <>
                    <span className={cn("absolute -left-[3.05rem] grid size-10 place-items-center rounded-xl", status === "completed" ? "bg-area text-area-foreground" : status === "available" ? "bg-foreground text-background" : "bg-muted text-muted-foreground")}>
                      {status === "completed" ? <Check className="size-5" aria-hidden /> : status === "locked" ? <Lock className="size-4" aria-hidden /> : <Tile shape={area.motif} className="size-5 text-saffron" />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-muted-foreground">Lição {i + 1} · {l.minutes} min</p>
                      <p className="font-display text-xl font-bold">{l.title}</p>
                      <p className="text-sm text-muted-foreground">{l.summary}</p>
                    </div>
                    <span className="text-sm font-bold">{status === "completed" ? "Revisar" : status === "available" ? "Começar" : "Bloqueada"}</span>
                  </>
                );
                return (
                  <li key={l.id} className="relative">
                    {status === "locked" ? (
                      <div className="flex items-center gap-4 rounded-2xl border border-dashed border-border p-4 opacity-70">{body}</div>
                    ) : (
                      <Link to="/licoes/$lessonId" params={{ lessonId: l.id }} className={cn("flex items-center gap-4 rounded-2xl paper p-4 transition-all hover:-translate-y-0.5 hover:shadow-lift", status === "available" && "ring-2 ring-foreground")}>
                        {body}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
