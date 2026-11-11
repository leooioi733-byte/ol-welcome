import { Eraser, Undo2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import type { Activity } from "@/content/types";

import { type ActivityProps, ActivityHeader } from "./shared";

type SketchActivityData = Extract<Activity, { type: "sketch" }>;
type Point = { x: number; y: number };

export function SketchActivity({ activity, onResolve }: ActivityProps<SketchActivityData>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [strokes, setStrokes] = useState<Point[][]>([]);
  const current = useRef<Point[] | null>(null);
  const [done, setDone] = useState(false);

  const redraw = (list: Point[][]) => {
    const c = canvasRef.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim() || "black";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (const s of list) {
      ctx.beginPath();
      s.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      ctx.stroke();
    }
  };

  useEffect(() => redraw(strokes), [strokes]);

  const pos = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * e.currentTarget.width, y: ((e.clientY - r.top) / r.height) * e.currentTarget.height };
  };

  return (
    <div>
      <ActivityHeader label="Prática de desenho" prompt={activity.prompt} />
      {activity.tips && (
        <ul className="mb-4 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {activity.tips.map((t) => <li key={t}>{t}</li>)}
        </ul>
      )}
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        aria-label="Área de desenho"
        className="aspect-[8/5] w-full touch-none rounded-2xl border-2 border-foreground bg-card shadow-block"
        onPointerDown={(e) => {
          if (done) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          current.current = [pos(e)];
        }}
        onPointerMove={(e) => {
          if (!current.current) return;
          current.current.push(pos(e));
          redraw([...strokes, current.current]);
        }}
        onPointerUp={() => {
          if (current.current && current.current.length > 1) setStrokes((s) => [...s, current.current!]);
          current.current = null;
        }}
      />
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Button variant="outline" disabled={done || !strokes.length} onClick={() => setStrokes((s) => s.slice(0, -1))}>
          <Undo2 className="size-4" aria-hidden /> Desfazer
        </Button>
        <Button variant="outline" disabled={done || !strokes.length} onClick={() => setStrokes([])}>
          <Eraser className="size-4" aria-hidden /> Limpar
        </Button>
        <span className="text-sm text-muted-foreground" aria-live="polite">
          {strokes.length}/{activity.minStrokes} traços
        </span>
      </div>
      <Button
        size="lg"
        className="mt-6 h-12 rounded-xl px-10 font-bold"
        disabled={done || strokes.length < activity.minStrokes}
        onClick={() => {
          setDone(true);
          onResolve({ graded: false, correct: true, attempts: 1, revealed: false });
        }}
      >
        {done ? "Prática concluída" : "Concluir prática"}
      </Button>
    </div>
  );
}
