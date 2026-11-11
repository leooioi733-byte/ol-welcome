import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { AppShell } from "@/components/mosa/AppShell";
import { areaStyle } from "@/components/mosa/area-style";
import { ProgressBar } from "@/components/mosa/ProgressBar";
import { Tile } from "@/components/mosa/Tile";
import { catalog } from "@/content/catalog";
import { useProgress } from "@/hooks/use-progress";
import { areaProgress, trackProgress } from "@/lib/progress/unlock";

export const Route = createFileRoute("/areas/$areaId")({
  loader: ({ params }) => {
    const area = catalog.getArea(params.areaId);
    if (!area) throw notFound();
    return { id: area.id, name: area.name, description: area.description };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} — MOSA` : "Área — MOSA" },
      { name: "description", content: loaderData?.description ?? "Área artística do MOSA." },
      { property: "og:title", content: loaderData ? `${loaderData.name} — MOSA` : "Área — MOSA" },
      { property: "og:description", content: loaderData?.description ?? "Área artística do MOSA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AreaPage,
});

function AreaPage() {
  const { id } = Route.useLoaderData();
  const area = catalog.getArea(id)!;
  const progress = useProgress();
  const p = areaProgress(area, progress, catalog);
  return (
    <AppShell>
      <div style={areaStyle(area.pigment)}>
        <section className="relative overflow-hidden rounded-3xl bg-area p-8 text-area-foreground md:p-12">
          <div aria-hidden className="absolute -right-6 -top-6 grid grid-cols-3 gap-2 opacity-30">
            {Array.from({ length: 9 }, (_, i) => <Tile key={i} shape={i % 2 ? "quarter" : area.motif} rotate={((i * 90) % 360) as 0} className="size-14 text-area-foreground" />)}
          </div>
          <p className="font-accent text-2xl">{area.tagline}</p>
          <h1 className="mt-1 text-5xl font-extrabold">{area.name}</h1>
          <p className="mt-4 max-w-xl text-lg opacity-90">{area.description}</p>
          <p className="mt-6 text-sm font-bold">{p.done} de {p.total} lições concluídas</p>
        </section>
        <h2 className="mt-10 text-2xl font-bold">Trilhas</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {area.tracks.map((t) => {
            const tp = trackProgress(t, progress, catalog);
            return (
              <Link key={t.id} to="/trilhas/$trackId" params={{ trackId: t.id }} className="group rounded-3xl paper p-6 transition-all hover:-translate-y-1 hover:shadow-lift">
                <span className="rounded-full bg-area-soft px-3 py-1 text-xs font-bold">{t.level}</span>
                <h3 className="mt-3 text-2xl font-bold">{t.title}</h3>
                <p className="mt-1 text-muted-foreground">{t.summary}</p>
                <div className="mt-5 flex items-center gap-3">
                  <ProgressBar value={tp.ratio} label={`Progresso em ${t.title}`} />
                  <span className="text-sm font-semibold tabular-nums">{tp.done}/{tp.total}</span>
                  <ArrowRight className="size-5 text-area transition-transform group-hover:translate-x-1" aria-hidden />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
