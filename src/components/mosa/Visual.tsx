import type { Visual } from "@/content/types";
import { cn } from "@/lib/utils";

import { Diagram } from "./diagrams";
import { Tile } from "./Tile";

const PIGMENT_TEXT = {
  vermilion: "text-vermilion",
  cobalt: "text-cobalt",
  saffron: "text-saffron",
  orchid: "text-orchid",
  moss: "text-moss",
} as const;

export function VisualView({ visual, size = "md", className }: { visual: Visual; size?: "sm" | "md"; className?: string }) {
  switch (visual.type) {
    case "diagram":
      return (
        <div className={cn("rounded-2xl bg-card p-4 md:p-6", className)}>
          <Diagram id={visual.id} />
        </div>
      );
    case "swatch":
      return (
        <div className={cn("flex gap-1.5", className)} aria-hidden>
          {visual.colors.map((c) => (
            <span key={c} className={cn("rounded-full ring-2 ring-card", size === "sm" ? "size-6" : "size-10")} style={{ backgroundColor: c }} />
          ))}
        </div>
      );
    case "tile":
      return (
        <Tile
          shape={visual.shape}
          className={cn(size === "sm" ? "size-8" : "size-16", visual.pigment ? PIGMENT_TEXT[visual.pigment] : "text-area", className)}
        />
      );
  }
}
