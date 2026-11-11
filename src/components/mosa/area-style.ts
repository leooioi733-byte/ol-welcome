import type { CSSProperties } from "react";

import type { Pigment } from "@/content/types";

/** Scopes the --area color tokens (bg-area, text-area, bg-area-soft…) to a pigment. */
export function areaStyle(pigment: Pigment): CSSProperties {
  return {
    "--area": `var(--${pigment})`,
    "--area-soft": `var(--${pigment}-soft)`,
    "--area-foreground": `var(--${pigment}-foreground)`,
  } as CSSProperties;
}
