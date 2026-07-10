"use client";

import { formatDate, articleFragrances } from "@/lib/content";
import type { Article } from "@/lib/types";
import { Eyebrow } from "./eyebrow";
import { ArrowRight } from "lucide-react";

const categoryAccent: Record<Article["category"], string> = {
  comparison: "text-wine",
  layering: "text-gold",
  guide: "text-foreground/70",
};

/** Article card for the home/featured and category grids. */
export function ArticleCard({
  article,
  onOpen,
  className,
}: {
  article: Article;
  onOpen: (slug: string) => void;
  className?: string;
}) {
  const frags = articleFragrances(article);
  return (
    <button
      onClick={() => onOpen(article.slug)}
      className={`group flex h-full flex-col items-start rounded-lg border border-border bg-surface p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_12px_28px_-16px_rgba(122,35,49,0.25)] ${className ?? ""}`}
    >
      <div className="flex w-full items-center justify-between">
        <Eyebrow>{article.label}</Eyebrow>
        <span className={`text-[0.65rem] font-medium uppercase tracking-wider ${categoryAccent[article.category]}`}>
          {article.category}
        </span>
      </div>

      <h3 className="mt-3 font-display text-xl font-semibold leading-tight text-foreground">
        {article.title}
      </h3>

      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {article.description}
      </p>

      {/* Quick verdict snippet — scannable without opening the article */}
      {article.verdict && (
        <div className="mt-3 border-l-2 border-l-gold/60 pl-2.5">
          <span className="block text-[0.6rem] font-semibold uppercase tracking-wider text-gold">
            Verdict
          </span>
          <p className="line-clamp-2 text-xs italic leading-snug text-foreground/75">
            {article.verdict.title}
          </p>
        </div>
      )}

      {frags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {frags.map((f) => (
            <span
              key={f.id}
              className="rounded-sm border border-border bg-surface-elevated px-1.5 py-0.5 text-[0.65rem] text-muted-foreground"
            >
              {f.name}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex w-full items-center justify-between pt-5 text-xs text-muted-foreground">
        <span>Updated {formatDate(article.updatedDate)}</span>
        <span className="inline-flex items-center gap-1 font-medium text-wine opacity-0 transition-opacity group-hover:opacity-100">
          Read duel <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </button>
  );
}
