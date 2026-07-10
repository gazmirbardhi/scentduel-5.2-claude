"use client";

import { useMemo, useState } from "react";
import { articlesByCategory } from "@/lib/articles";
import { tagsForCategory, housesForCategory } from "@/lib/content";
import type { Category } from "@/lib/types";
import { articleFragrances } from "@/lib/content";
import { ArticleCard } from "./article-card";
import { Eyebrow } from "./eyebrow";
import { JsonLd, breadcrumbLd } from "./json-ld";
import { Swords, Layers, BookOpen, X } from "lucide-react";
import { cn } from "@/lib/utils";

const META: Record<
  Category,
  { title: string; eyebrow: string; blurb: string; icon: typeof Swords }
> = {
  comparison: {
    title: "Fragrance Comparisons",
    eyebrow: "Category",
    blurb:
      "Head-to-head duels between two fragrances — performance, smell and value — including verified smells-like claims. Specific pairs, not the saturated headliners.",
    icon: Swords,
  },
  layering: {
    title: "Layering Duels",
    eyebrow: "Category",
    blurb:
      "Does spraying one fragrance over another actually work? Tested layering combinations with ratios, wear-time and a plain yes/no verdict.",
    icon: Layers,
  },
  guide: {
    title: "Guides & Methodology",
    eyebrow: "Category",
    blurb:
      "How we test, how to buy, and the recurring fragrance questions that need a real answer rather than a listicle.",
    icon: BookOpen,
  },
};

type FilterMode = "tag" | "house";

export function CategoryView({
  category,
  onNavigate,
  onOpenArticle,
}: {
  category: Category;
  onNavigate: (hash: string) => void;
  onOpenArticle: (slug: string) => void;
}) {
  const meta = META[category];
  const items = articlesByCategory(category);
  const Icon = meta.icon;

  const [filterMode, setFilterMode] = useState<FilterMode>("tag");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const tags = useMemo(() => tagsForCategory(category), [category]);
  const houses = useMemo(() => housesForCategory(category), [category]);
  const chips = filterMode === "tag" ? tags.map((t) => t.tag) : houses.map((h) => h.house);

  const filtered = useMemo(() => {
    if (!activeFilter) return items;
    if (filterMode === "tag") {
      return items.filter((a) => a.tags.includes(activeFilter));
    }
    // house filter
    return items.filter((a) => {
      const frags = articleFragrances(a);
      return frags.some((f) => f.house === activeFilter);
    });
  }, [items, activeFilter, filterMode]);

  const crumbs = breadcrumbLd([
    { name: "Home", url: "https://scentduel.com/" },
    { name: meta.title, url: `https://scentduel.com/#/category/${category}` },
  ]);

  return (
    <div className="sd-fade-up mx-auto max-w-6xl px-4 pb-20 pt-8 sm:pt-12">
      <JsonLd data={crumbs} />

      <button
        onClick={() => onNavigate("#/")}
        className="mb-6 text-sm text-muted-foreground transition-colors hover:text-wine"
      >
        ← Home
      </button>

      <div className="flex items-start gap-4">
        <span className="mt-1 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-gold">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <Eyebrow>{meta.eyebrow}</Eyebrow>
          <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            {meta.title}
          </h1>
        </div>
      </div>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        {meta.blurb}
      </p>

      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-surface-elevated px-3 py-1 text-xs text-muted-foreground">
        {filtered.length} of {items.length} article{filtered.length === 1 ? "" : "s"}
      </div>

      {/* Filter controls */}
      {chips.length > 1 && (
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Filter by
            </span>
            <div className="inline-flex rounded-md border border-border bg-surface p-0.5">
              <button
                onClick={() => {
                  setFilterMode("tag");
                  setActiveFilter(null);
                }}
                className={cn(
                  "rounded-sm px-2.5 py-1 text-xs font-medium transition-colors",
                  filterMode === "tag"
                    ? "bg-wine text-wine-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Tag
              </button>
              <button
                onClick={() => {
                  setFilterMode("house");
                  setActiveFilter(null);
                }}
                className={cn(
                  "rounded-sm px-2.5 py-1 text-xs font-medium transition-colors",
                  filterMode === "house"
                    ? "bg-wine text-wine-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                House
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {chips.map((chip) => {
              const active = activeFilter === chip;
              return (
                <button
                  key={chip}
                  onClick={() => setActiveFilter(active ? null : chip)}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                    active
                      ? "border-wine bg-wine text-wine-foreground"
                      : "border-border bg-surface text-foreground/75 hover:border-gold/60 hover:text-wine"
                  )}
                >
                  {chip}
                </button>
              );
            })}
            {activeFilter && (
              <button
                onClick={() => setActiveFilter(null)}
                className="inline-flex items-center gap-1 rounded-full border border-transparent px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-wine"
              >
                <X className="h-3 w-3" /> Clear
              </button>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => (
          <ArticleCard key={a.slug} article={a} onOpen={onOpenArticle} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-8 rounded-lg border border-dashed border-border bg-surface-elevated/40 p-8 text-center text-sm text-muted-foreground">
          No articles match this filter.{" "}
          <button
            onClick={() => setActiveFilter(null)}
            className="font-medium text-wine underline-offset-2 hover:underline"
          >
            Clear the filter
          </button>
          .
        </div>
      )}
    </div>
  );
}
