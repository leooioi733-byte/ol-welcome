import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Activity } from "@/content/types";
import { type Metronome, startMetronome } from "@/lib/audio";
import { cn } from "@/lib/utils";

import { type ActivityProps, ActivityHeader } from "./shared";

type PracticeActivityData = Extract<Activity, { type: "practice" }>;

export function PracticeActivity({ activity, onResolve }: ActivityProps<PracticeActivityData>) {
  const [checked, setChecked] = useState<boolean[]>(() => activity.checklist.map(() => false));
  const [done, setDone] = useState(false);
  const [beat, setBeat] = useState<number | null>(null);
  const metro = useRef<Metronome | null>(null);

  useEffect(() => () => metro.current?.stop(), []);

  const toggleMetronome = () => {
    if (metro.current) {
      metro.current.stop();
      metro.current = null;
      setBeat(null);
    } else if (activity.metronomeBpm) {
      metro.current = startMetronome(activity.metronomeBpm, setBeat);
    }
  };

  return (
    <div>
      <ActivityHeader label="Prática" prompt={activity.prompt} />
      {activity.metronomeBpm && (
        <div className="mb-5 flex items-center gap-4 rounded-2xl bg-card p-4">
          <Button onClick={toggleMetronome} variant={beat === null ? "default" : "outline"}>
            {beat === null ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
            Metrônomo · {activity.metronomeBpm} BPM
          </Button>
          <div className="flex gap-2" aria-hidden>
            {[0, 1, 2, 3].map((b) => (
              <span key={b} className={cn("size-4 rounded-full transition-all", beat === b ? "scale-125 bg-area" : "bg-muted")} />
            ))}
          </div>
        </div>
      )}
      <ul className="space-y-2.5">
        {activity.checklist.map((item, i) => (
          <li key={item}>
            <label className={cn("flex cursor-pointer items-center gap-3 rounded-2xl border-2 bg-card p-4 font-semibold transition-colors", checked[i] ? "border-success bg-success-soft" : "border-border")}>
              <Checkbox
                checked={checked[i]}
                disabled={done}
                onCheckedChange={(v) => setChecked((p) => p.map((c, j) => (j === i ? v === true : c)))}
              />
              {item}
            </label>
          </li>
        ))}
      </ul>
      <Button
        size="lg"
        className="mt-6 h-12 rounded-xl px-10 font-bold"
        disabled={done || !checked.every(Boolean)}
        onClick={() => {
          metro.current?.stop();
          metro.current = null;
          setBeat(null);
          setDone(true);
          onResolve({ graded: false, correct: true, attempts: 1, revealed: false });
        }}
      >
        {done ? "Prática concluída" : "Concluí a prática"}
      </Button>
    </div>
  );
}
