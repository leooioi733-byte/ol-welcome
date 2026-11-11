import type { TileShape } from "@/content/types";
import { cn } from "@/lib/utils";

interface TileProps {
  shape: TileShape;
  className?: string;
  rotate?: 0 | 90 | 180 | 270 | undefined;
  title?: string;
}

/** A single mosaic tile. Color comes from `currentColor` (use text-* classes). */
export function Tile({ shape, className, rotate = 0, title }: TileProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("size-6", className)}
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <TileShapePath shape={shape} />
    </svg>
  );
}

export function TileShapePath({ shape }: { shape: TileShape }) {
  switch (shape) {
    case "circle":
      return <circle cx="20" cy="20" r="18" fill="currentColor" />;
    case "square":
      return <rect x="3" y="3" width="34" height="34" rx="4" fill="currentColor" />;
    case "quarter":
      return <path d="M3 37 V3 A34 34 0 0 1 37 37 Z" fill="currentColor" />;
    case "triangle":
      return <path d="M20 3 L37 36 H3 Z" fill="currentColor" strokeLinejoin="round" />;
    case "half":
      return <path d="M3 22 A17 17 0 0 1 37 22 V37 H3 Z" fill="currentColor" />;
    case "arch":
      return <path d="M5 37 V20 A15 15 0 0 1 35 20 V37 H26 V21 A6 6 0 0 0 14 21 V37 Z" fill="currentColor" />;
    case "diamond":
      return <path d="M20 2 L38 20 L20 38 L2 20 Z" fill="currentColor" />;
  }
}
