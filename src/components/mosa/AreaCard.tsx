import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { catalog } from "@/content/catalog";
import type { Area } from "@/content/types";
import type { ProgressState } from "@/lib/progress/types";
import { areaProgress } from "@/lib/progress/unlock";
import { cn } from "@/lib/utils";

import { areaStyle } from "./area-style";
import { ProgressBar } from "./ProgressBar";
import { Tile } from "./Tile";

export function AreaCard({ area, progress, className }: { area: Area; progress: ProgressState; className?: string }) {
  const p = areaProgress(area, progress, catalog);
  const lessons = area.tracks.reduce((n, t) => n + catalog.trackLessons(t).length, 0);
  return (
    <Link
      to="/areas/$areaId"
      params={{ areaId: area.id }}
      style={areaStyle(area.pigment)}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-paper transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      <div aria-hidden className="absolute -right-8 -top-8 grid grid-cols-2 gap-1.5 opacity-90 transition-transform duration-500 group-hover:rotate-6">
        <Tile shape={area.motif} className="size-16 text-area" />
        <Tile shape="square" className="size-16 text-area-soft" />
        <Tile shape="quarter" rotate={90} className="size-16 text-area-soft" />
        <Tile shape={area.motif} rotate={180} className="size-16 text-area" />
      </div>
      <p className="font-accent text-lg text-area">{area.tagline}</p>
      <h3 className="mt-1 max-w-[70%] text-2xl font-bold leading-tight">{area.name}</h3>
      <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{area.description}</p>
      <div className="mt-auto pt-6">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span>
            {area.tracks.length} trilhas · {lessons} lições
          </span>
          <span className="tabular-nums">
            {p.done}/{p.total}
          </span>
        </div>
        <ProgressBar value={p.ratio} label={`Progresso em ${area.name}`} />
      </div>
      <ArrowUpRight className="absolute bottom-6 right-6 hidden size-5 text-area opacity-0 transition-opacity group-hover:opacity-100 md:block" aria-hidden />
    </Link>
  );
}
