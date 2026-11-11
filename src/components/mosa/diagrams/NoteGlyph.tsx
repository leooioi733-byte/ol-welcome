import type { RhythmFigure } from "@/content/types";

type Glyph = "semibreve" | "minima" | "seminima" | "colcheia" | RhythmFigure;

/** Simple music notation glyph drawn in a 40×60 box (x,y = notehead center). */
export function NoteGlyph({ kind, x = 20, y = 44, className = "fill-foreground stroke-foreground" }: { kind: Glyph; x?: number; y?: number; className?: string }) {
  const head = (filled: boolean, dx = 0) => (
    <ellipse
      cx={x + dx}
      cy={y}
      rx={7}
      ry={5}
      transform={`rotate(-20 ${x + dx} ${y})`}
      className={filled ? className : "fill-none stroke-foreground"}
      strokeWidth={filled ? 0 : 2.4}
    />
  );
  const stem = (dx = 0) => <line x1={x + 6.5 + dx} y1={y - 2} x2={x + 6.5 + dx} y2={y - 34} className="stroke-foreground" strokeWidth={2.2} />;

  switch (kind) {
    case "semibreve":
      return head(false);
    case "minima":
      return (
        <g>
          {head(false)}
          {stem()}
        </g>
      );
    case "seminima":
      return (
        <g>
          {head(true)}
          {stem()}
        </g>
      );
    case "colcheia":
      return (
        <g>
          {head(true)}
          {stem()}
          <path d={`M${x + 6.5} ${y - 34} q 10 8 8 20`} className="fill-none stroke-foreground" strokeWidth={2.2} />
        </g>
      );
    case "colcheias":
      return (
        <g>
          {head(true, -8)}
          {stem(-8)}
          {head(true, 10)}
          {stem(10)}
          <rect x={x - 1.5} y={y - 36} width={18} height={5} className={className} />
        </g>
      );
    case "pausa":
      return (
        <path
          d={`M${x - 3} ${y - 30} l 7 9 l -6 7 l 7 9 q -9 -3 -7 6`}
          className="fill-none stroke-foreground"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
  }
}
