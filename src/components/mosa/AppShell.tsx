import { Link } from "@tanstack/react-router";
import { Compass, Flame, Home, UserRound } from "lucide-react";
import type { ReactNode } from "react";

import { useHydrated, useProgress } from "@/hooks/use-progress";
import { currentStreak } from "@/lib/progress/streak";
import { cn } from "@/lib/utils";

import { Logo } from "./Logo";

const NAV = [
  { to: "/", label: "Início", icon: Home },
  { to: "/areas", label: "Áreas", icon: Compass },
  { to: "/perfil", label: "Perfil", icon: UserRound },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const progress = useProgress();
  const hydrated = useHydrated();
  const streak = hydrated ? currentStreak(progress.activeDays, new Date()) : 0;

  return (
    <div className="min-h-dvh pb-24 md:pb-0">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Pular para o conteúdo
      </a>
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <Link to="/" aria-label="MOSA — início">
            <Logo />
          </Link>
          <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-foreground data-[status=active]:text-background"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 text-sm font-bold">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5"
              title="Dias seguidos estudando"
            >
              <Flame className={cn("size-4", streak > 0 ? "text-vermilion" : "text-muted-foreground")} aria-hidden />
              <span className="tabular-nums">{streak}</span>
              <span className="sr-only">dias seguidos</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-saffron px-3 py-1.5 text-saffron-foreground">
              <span className="tabular-nums">{hydrated ? progress.xp : 0}</span> XP
            </span>
          </div>
        </div>
      </header>

      <main id="conteudo" className="mx-auto max-w-6xl px-5 py-8 md:py-12">
        {children}
      </main>

      <nav
        aria-label="Principal"
        className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-3 rounded-2xl border border-border bg-card/95 p-1.5 shadow-lift backdrop-blur-md md:hidden"
      >
        {NAV.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            className="flex flex-col items-center gap-0.5 rounded-xl py-2 text-xs font-semibold text-muted-foreground transition-colors data-[status=active]:bg-foreground data-[status=active]:text-background"
          >
            <Icon className="size-5" aria-hidden />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
