import { cn } from "@/lib/utils";

/** MOSA mark: four tiles — one per art area — forming a single square. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("size-9", className)} aria-hidden="true">
      <circle cx="12" cy="12" r="10" className="fill-vermilion" />
      <rect x="26" y="2" width="20" height="20" rx="3" className="fill-cobalt" />
      <path d="M2 46 V26 A20 20 0 0 1 22 46 Z" className="fill-saffron" />
      <path d="M26 46 V34 A10 10 0 0 1 46 34 V46 Z" className="fill-orchid" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="font-display text-2xl font-extrabold lowercase tracking-tight">mosa</span>
    </span>
  );
}
