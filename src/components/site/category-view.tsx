"use client";

import { articlesByCategory } from "@/lib/articles";
import type { Category } from "@/lib/types";
import { ArticleCard } from "./article-card";
import { Eyebrow } from "./eyebrow";
import { JsonLd, breadcrumbLd } from "./json-ld";
import { Swords, Layers, BookOpen } from "lucide-react";

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
        {items.length} article{items.length === 1 ? "" : "s"}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((a) => (
          <ArticleCard key={a.slug} article={a} onOpen={onOpenArticle} />
        ))}
      </div>
    </div>
  );
}
