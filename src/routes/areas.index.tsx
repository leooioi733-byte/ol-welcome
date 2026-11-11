import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/mosa/AppShell";
import { AreaCard } from "@/components/mosa/AreaCard";
import { AREAS } from "@/content/catalog";
import { useProgress } from "@/hooks/use-progress";

export const Route = createFileRoute("/areas/")({
  head: () => ({
    meta: [
      { title: "Áreas artísticas — MOSA" },
      { name: "description", content: "Artes Visuais, Composição Visual, Música e Dança: escolha por onde começar." },
      { property: "og:title", content: "Áreas artísticas — MOSA" },
      { property: "og:description", content: "Quatro áreas, trilhas progressivas e lições interativas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AreasPage,
});

function AreasPage() {
  const progress = useProgress();
  return (
    <AppShell>
      <p className="font-accent text-2xl text-cobalt">Catálogo</p>
      <h1 className="text-4xl font-extrabold md:text-5xl">Escolha um território</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">Cada área tem trilhas com lições curtas, exemplos e prática. Você pode transitar entre elas quando quiser.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {AREAS.map((a) => <AreaCard key={a.id} area={a} progress={progress} className="min-h-64" />)}
      </div>
    </AppShell>
  );
}
