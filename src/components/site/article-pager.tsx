"use client";

import type { Article } from "@/lib/types";
import { ArrowLeft, ArrowRight } from "lucide-react";

/**
 * Prev/next pager for the bottom of article pages. Two large buttons side by
 * side — prev (left-arrow) and next (right-arrow) — each showing the
 * neighbour's label + title. Wraps around the article list.
 */
export function ArticlePager({
  prev,
  next,
  onNavigate,
}: {
  prev: Article | null;
  next: Article | null;
  onNavigate: (hash: string) => void;
}) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="More duels"
      className="mt-12 grid gap-3 border-t border-border pt-8 sm:grid-cols-2"
    >
      {prev ? (
        <button
          onClick={() => onNavigate(`#/article/${prev.slug}`)}
          className="group flex items-start gap-2 rounded-lg border border-border bg-surface p-3 text-left transition-colors hover:border-gold/50 hover:bg-surface-elevated sm:p-4 sm:gap-3 w-full max-w-full overflow-hidden"
        >
          <ArrowLeft className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-0.5 group-hover:text-wine" />
          <span className="min-w-0 overflow-hidden">
            <span className="block text-[0.6rem] font-semibold uppercase tracking-wider text-gold">
              Previous duel
            </span>
            <span className="block truncate font-display text-sm font-semibold text-foreground group-hover:text-wine">
              {prev.title}
            </span>
          </span>
        </button>
      ) : (
        <span className="hidden sm:block" aria-hidden />
      )}

      {next ? (
        <button
          onClick={() => onNavigate(`#/article/${next.slug}`)}
          className="group flex items-start justify-end gap-2 rounded-lg border border-border bg-surface p-3 text-right transition-colors hover:border-gold/50 hover:bg-surface-elevated sm:col-start-2 sm:p-4 sm:gap-3 w-full max-w-full overflow-hidden"
        >
          <span className="min-w-0 overflow-hidden">
            <span className="block text-[0.6rem] font-semibold uppercase tracking-wider text-gold">
              Next duel
            </span>
            <span className="block truncate font-display text-sm font-semibold text-foreground group-hover:text-wine">
              {next.title}
            </span>
          </span>
          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-wine" />
        </button>
      ) : null}
    </nav>
  );
}
