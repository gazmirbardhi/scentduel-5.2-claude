"use client";

import { useBookmarks } from "@/hooks/use-bookmarks";
import { Eyebrow } from "./eyebrow";
import { Bookmark, X, ArrowRight } from "lucide-react";

/**
 * "Your saved duels" section for the home page. Shows user-bookmarked
 * articles from localStorage. Hidden entirely until the user has saved at
 * least one duel.
 */
export function SavedDuels({
  onOpenArticle,
}: {
  onOpenArticle: (slug: string) => void;
}) {
  const { items, remove, clear } = useBookmarks();

  if (items.length === 0) return null;

  return (
    <section className="border-y border-border bg-surface-elevated/40">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="h-5 w-5 text-gold" />
            <h2 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
              Your saved duels
            </h2>
            <span className="rounded-full bg-surface px-2 py-0.5 text-xs text-muted-foreground">
              {items.length}
            </span>
          </div>
          <button
            onClick={clear}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-wine"
            aria-label="Clear all saved duels"
          >
            <X className="h-3 w-3" /> Clear all
          </button>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item.slug} className="group relative">
              <button
                onClick={() => onOpenArticle(item.slug)}
                className="flex w-full items-center justify-between gap-3 rounded-md border border-border bg-surface px-4 py-3 text-left transition-colors hover:border-gold/50 hover:bg-surface-elevated"
              >
                <span className="min-w-0">
                  <span className="block text-[0.6rem] font-semibold uppercase tracking-wider text-gold">
                    {item.label}
                  </span>
                  <span className="block truncate font-display text-sm font-semibold text-foreground">
                    {item.title}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-wine" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  remove(item.slug);
                }}
                aria-label={`Remove ${item.title} from saved`}
                className="absolute -right-1.5 -top-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground opacity-0 shadow-sm transition-all hover:border-wine hover:text-wine group-hover:opacity-100"
              >
                <X className="h-3 w-3" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
