import { createFileRoute } from "@tanstack/react-router";
import { Download, Upload } from "lucide-react";
import { useRef } from "react";

import { AchievementBadge } from "@/components/mosa/AchievementBadge";
import { AppShell } from "@/components/mosa/AppShell";
import { areaStyle } from "@/components/mosa/area-style";
import { LevelCard } from "@/components/mosa/LevelCard";
import { Mosaic } from "@/components/mosa/Mosaic";
import { ProgressBar } from "@/components/mosa/ProgressBar";
import { Button } from "@/components/ui/button";
import { AREAS, catalog } from "@/content/catalog";
import { getProgressStore, useHydrated, useProgress } from "@/hooks/use-progress";
import { ACHIEVEMENTS } from "@/lib/progress/achievements";
import { currentStreak, longestStreak } from "@/lib/progress/streak";
import { areaProgress } from "@/lib/progress/unlock";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Seu perfil — MOSA" },
      { name: "description", content: "Seu nível, XP, conquistas e o mosaico das lições concluídas." },
      { property: "og:title", content: "Perfil do estudante — MOSA" },
      { property: "og:description", content: "Acompanhe sua evolução artística no MOSA." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const hydrated = useHydrated();
  const progress = useProgress();
  const fileRef = useRef<HTMLInputElement>(null);
  const store = getProgressStore();
  const unlocked = Object.keys(progress.achievements).length;

  const exportData = () => {
    const blob = new Blob([store.exportJson()], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "mosa-progresso.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <AppShell>
      {!hydrated ? (
        <div className="min-h-96" aria-busy="true" />
      ) : (
        <>
          <p className="font-accent text-2xl text-orchid">Perfil</p>
          <h1 className="text-4xl font-extrabold md:text-5xl">{progress.profile?.name ?? "Estudante"}</h1>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <LevelCard xp={progress.xp} className="md:col-span-1" />
            <div className="rounded-2xl paper p-5">
              <p className="font-display text-3xl font-bold tabular-nums">{currentStreak(progress.activeDays, new Date())}</p>
              <p className="text-sm text-muted-foreground">dias seguidos · recorde {longestStreak(progress.activeDays)}</p>
              <p className="mt-4 font-display text-3xl font-bold tabular-nums">{Object.keys(progress.lessons).length}</p>
              <p className="text-sm text-muted-foreground">lições concluídas</p>
            </div>
            <div className="space-y-3 rounded-2xl paper p-5">
              {AREAS.map((a) => {
                const p = areaProgress(a, progress, catalog);
                return (
                  <div key={a.id} style={areaStyle(a.pigment)}>
                    <div className="mb-1 flex justify-between text-sm font-semibold"><span>{a.name}</span><span className="tabular-nums">{p.done}/{p.total}</span></div>
                    <ProgressBar value={p.ratio} label={`Progresso em ${a.name}`} />
                  </div>
                );
              })}
            </div>
          </div>

          <section className="mt-10 rounded-3xl paper p-6 md:p-8">
            <h2 className="text-2xl font-bold">Seu mosaico</h2>
            <p className="mb-5 mt-1 text-sm text-muted-foreground">Uma peça para cada lição concluída.</p>
            <Mosaic progress={progress} />
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold">Conquistas <span className="text-muted-foreground">{unlocked}/{ACHIEVEMENTS.length}</span></h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {ACHIEVEMENTS.map((a, i) => <AchievementBadge key={a.id} achievement={a} unlockedAt={progress.achievements[a.id]?.unlockedAt} index={i} />)}
            </div>
          </section>

          <section className="mt-10 rounded-3xl border border-dashed border-border p-6">
            <h2 className="text-xl font-bold">Seus dados</h2>
            <p className="mt-1 text-sm text-muted-foreground">O progresso fica salvo neste navegador. Exporte uma cópia para guardar ou levar para outro dispositivo.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="outline" onClick={exportData}><Download className="size-4" aria-hidden /> Exportar progresso</Button>
              <Button variant="outline" onClick={() => fileRef.current?.click()}><Upload className="size-4" aria-hidden /> Importar progresso</Button>
              <input
                ref={fileRef}
                type="file"
                accept="application/json"
                className="hidden"
                onChange={async (e) => {
                  const f = e.target.files?.[0];
                  if (f && !store.importJson(await f.text())) window.alert("Arquivo inválido: não foi possível importar.");
                  e.target.value = "";
                }}
              />
              <Button variant="ghost" className="text-destructive" onClick={() => window.confirm("Apagar todo o progresso deste dispositivo?") && store.reset()}>
                Recomeçar do zero
              </Button>
            </div>
          </section>
        </>
      )}
    </AppShell>
  );
}
