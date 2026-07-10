"use client";

import { useRecentlyViewed } from "@/hooks/use-recently-viewed";
import { Eyebrow } from "./eyebrow";
import { History, X, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/content";

/**
 * "Pick up where you left off" section for the home page. Shows recently
 * visited duels from localStorage. Hidden entirely until the user has
 * visited at least one article.
 */
export function RecentlyViewed({
  onOpenArticle,
}: {
  onOpenArticle: (slug: string) => void;
}) {
  const { items, clear } = useRecentlyViewed();

  if (items.length === 0) return null;

  return (
    <section className="border-y border-border bg-surface-elevated/40">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-gold" />
            <h2 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
              Pick up where you left off
            </h2>
          </div>
          <button
            onClick={clear}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-wine"
            aria-label="Clear recently viewed history"
          >
            <X className="h-3 w-3" /> Clear
          </button>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item.slug}>
              <button
                onClick={() => onOpenArticle(item.slug)}
                className="group flex w-full items-center justify-between gap-3 rounded-md border border-border bg-surface px-4 py-3 text-left transition-colors hover:border-gold/50 hover:bg-surface-elevated"
              >
                <span className="min-w-0">
                  <span className="block text-[0.6rem] font-semibold uppercase tracking-wider text-gold">
                    {item.label}
                  </span>
                  <span className="block truncate font-display text-sm font-semibold text-foreground">
                    {item.title}
                  </span>
                  <span className="mt-0.5 block text-[0.65rem] text-muted-foreground">
                    Visited {formatDate(new Date(item.visitedAt).toISOString())}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-wine" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
