import { catalog } from "@/content/catalog";
import type { ProgressState } from "@/lib/progress/types";
import { cn } from "@/lib/utils";

import { areaStyle } from "./area-style";
import { Tile } from "./Tile";

const ROTATIONS = [0, 90, 180, 270] as const;

/**
 * The student's personal mosaic: one tile per lesson in the catalog. Completed lessons
 * become colored tiles in their area's pigment; the rest stay as empty slots.
 */
export function Mosaic({ progress, className }: { progress: ProgressState; className?: string }) {
  const lessons = catalog.allLessons();
  const done = lessons.filter((l) => progress.lessons[l.lesson.id]).length;
  return (
    <div className={className}>
      <ul
        className="grid grid-cols-[repeat(auto-fill,minmax(2.25rem,1fr))] gap-1.5"
        aria-label={`Seu mosaico: ${done} de ${lessons.length} lições concluídas`}
      >
        {lessons.map((ctx, i) => {
          const complete = Boolean(progress.lessons[ctx.lesson.id]);
          return (
            <li
              key={ctx.lesson.id}
              style={areaStyle(ctx.area.pigment)}
              className={cn(
                "aspect-square rounded-md",
                complete ? "bg-area-soft" : "border border-dashed border-border bg-transparent",
              )}
              title={`${ctx.lesson.title} — ${complete ? "concluída" : "a fazer"}`}
            >
              {complete && (
                <Tile
                  shape={i % 3 === 0 ? ctx.area.motif : i % 3 === 1 ? "quarter" : "circle"}
                  rotate={ROTATIONS[i % 4]}
                  className="size-full animate-pop-in p-1 text-area"
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
