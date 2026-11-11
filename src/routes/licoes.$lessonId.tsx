import { createFileRoute, notFound } from "@tanstack/react-router";

import { LessonPlayer } from "@/components/mosa/lesson/LessonPlayer";
import { catalog } from "@/content/catalog";
import { useHydrated } from "@/hooks/use-progress";

export const Route = createFileRoute("/licoes/$lessonId")({
  loader: ({ params }) => {
    const ctx = catalog.getLesson(params.lessonId);
    if (!ctx) throw notFound();
    return { id: ctx.lesson.id, title: ctx.lesson.title, summary: ctx.lesson.summary, area: ctx.area.name };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} · ${loaderData.area} — MOSA` : "Lição — MOSA" },
      { name: "description", content: loaderData?.summary ?? "Lição interativa do MOSA." },
      { property: "og:title", content: loaderData ? `${loaderData.title} — MOSA` : "Lição — MOSA" },
      { property: "og:description", content: loaderData?.summary ?? "Lição interativa do MOSA." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LessonPage,
});

function LessonPage() {
  const { id } = Route.useLoaderData();
  const hydrated = useHydrated();
  const ctx = catalog.getLesson(id)!;
  if (!hydrated) return <div className="min-h-dvh" aria-busy="true" />;
  return <LessonPlayer key={id} ctx={ctx} />;
}
