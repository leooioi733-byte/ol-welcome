import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  label: string;
  className?: string;
  barClassName?: string;
}

export function ProgressBar({ value, label, className, barClassName }: ProgressBarProps) {
  const pct = Math.round(Math.max(0, Math.min(1, value)) * 100);
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      className={cn("h-2.5 w-full overflow-hidden rounded-full bg-muted", className)}
    >
      <div
        className={cn("h-full rounded-full bg-area transition-[width] duration-700 ease-out", barClassName)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
