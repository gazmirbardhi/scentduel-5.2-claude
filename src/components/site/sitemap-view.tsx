"use client";

import { ARTICLES, articlesByCategory } from "@/lib/articles";
import { FRAGRANCES } from "@/lib/fragrance-data";
import { CATEGORY_LABEL, categoryHash, formatDate } from "@/lib/content";
import { Eyebrow } from "./eyebrow";
import { JsonLd, breadcrumbLd } from "./json-ld";
import { ArrowLeft, FileText, FlaskConical, Layers, BookOpen, Swords, Beaker } from "lucide-react";
import type { Category } from "@/lib/types";

const TOOLS = [
  { label: "Scent Duel Comparator", hash: "#/comparator", desc: "Pick two fragrances, see the VS layout + note-overlap analysis." },
  { label: "Wear Tonight Finder", hash: "#/find", desc: "Pick an occasion, get ranked matching fragrances." },
  { label: "Browse by Family", hash: "#/families", desc: "The full dataset grouped by accord family." },
  { label: "Fragrance Glossary", hash: "#/glossary", desc: "25 fragrance terms defined for beginners." },
];

const CATEGORY_ICON: Record<Category, typeof Swords> = {
  comparison: Swords,
  layering: Layers,
  guide: BookOpen,
};

/**
 * Human-readable sitemap — a structured directory of every page on the site,
 * grouped by section. Complements the machine-readable /sitemap.xml. Route: #/sitemap
 */
export function SitemapView({
  onNavigate,
  onOpenArticle,
}: {
  onNavigate: (hash: string) => void;
  onOpenArticle: (slug: string) => void;
}) {
  const crumbs = breadcrumbLd([
    { name: "Home", url: "https://scentduel.com/" },
    { name: "Sitemap", url: "https://scentduel.com/#/sitemap" },
  ]);

  const categories: Category[] = ["comparison", "layering", "guide"];

  return (
    <div className="sd-fade-up mx-auto max-w-4xl px-4 pb-20 pt-8 sm:pt-12">
      <JsonLd data={crumbs} />

      <button
        onClick={() => onNavigate("#/")}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-wine"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back
      </button>

      <Eyebrow>Directory</Eyebrow>
      <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
        Sitemap
      </h1>
      <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
        Every page on ScentDuel, organised by section. For the machine-readable
        XML sitemap for crawlers, see{" "}
        <a
          href="/sitemap.xml"
          className="font-medium text-wine underline-offset-2 hover:underline"
        >
          /sitemap.xml
        </a>
        .
      </p>

      {/* Top-level pages */}
      <section className="mt-10">
        <h2 className="mb-3 flex items-center gap-2 font-display text-xl font-semibold text-foreground">
          <FileText className="h-5 w-5 text-gold" />
          Top-level pages
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {[
            { label: "Home", hash: "#/", desc: "The editorial homepage." },
            { label: "About ScentDuel", hash: "#/about", desc: "Why the site exists + editorial standard." },
            { label: "Authors", hash: "#/author", desc: "The editorial team + their published duels." },
          ].map((item) => (
            <li key={item.hash}>
              <button
                onClick={() => onNavigate(item.hash)}
                className="group w-full rounded-md border border-border bg-surface p-3 text-left transition-colors hover:border-gold/50 hover:bg-surface-elevated"
              >
                <span className="block font-display text-sm font-semibold text-foreground group-hover:text-wine">
                  {item.label}
                </span>
                <span className="block text-xs text-muted-foreground">{item.desc}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Tools */}
      <section className="mt-10">
        <h2 className="mb-3 flex items-center gap-2 font-display text-xl font-semibold text-foreground">
          <FlaskConical className="h-5 w-5 text-gold" />
          Interactive tools
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {TOOLS.map((tool) => (
            <li key={tool.hash}>
              <button
                onClick={() => onNavigate(tool.hash)}
                className="group w-full rounded-md border border-border bg-surface p-3 text-left transition-colors hover:border-gold/50 hover:bg-surface-elevated"
              >
                <span className="block font-display text-sm font-semibold text-foreground group-hover:text-wine">
                  {tool.label}
                </span>
                <span className="block text-xs text-muted-foreground">{tool.desc}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Articles by category */}
      <section className="mt-10">
        <h2 className="mb-3 flex items-center gap-2 font-display text-xl font-semibold text-foreground">
          <BookOpen className="h-5 w-5 text-gold" />
          Articles ({ARTICLES.length})
        </h2>
        <div className="space-y-6">
          {categories.map((cat) => {
            const items = articlesByCategory(cat);
            const Icon = CATEGORY_ICON[cat];
            return (
              <div key={cat}>
                <button
                  onClick={() => onNavigate(categoryHash(cat))}
                  className="mb-2 inline-flex items-center gap-1.5 text-sm font-semibold text-wine hover:underline"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {CATEGORY_LABEL[cat]} ({items.length})
                </button>
                <ul className="space-y-1">
                  {items.map((a) => (
                    <li key={a.slug} className="ml-5">
                      <button
                        onClick={() => onOpenArticle(a.slug)}
                        className="group flex items-center justify-between gap-3 rounded-md px-2 py-1 text-left text-sm transition-colors hover:bg-surface-elevated"
                      >
                        <span className="truncate text-foreground/80 group-hover:text-wine">
                          {a.title}
                        </span>
                        <span className="shrink-0 text-[0.65rem] text-muted-foreground">
                          {formatDate(a.updatedDate)}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Fragrance profiles */}
      <section className="mt-10">
        <h2 className="mb-3 flex items-center gap-2 font-display text-xl font-semibold text-foreground">
          <Beaker className="h-5 w-5 text-gold" />
          Fragrance profiles ({FRAGRANCES.length})
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {FRAGRANCES.map((f) => (
            <button
              key={f.id}
              onClick={() => onNavigate(`#/fragrance/${f.id}`)}
              className="rounded-sm border border-border bg-surface px-2 py-1 text-xs text-foreground/80 transition-colors hover:border-gold/50 hover:text-wine"
            >
              {f.name}
            </button>
          ))}
        </div>
      </section>

      {/* Legal */}
      <section className="mt-10">
        <h2 className="mb-3 flex items-center gap-2 font-display text-xl font-semibold text-foreground">
          <FileText className="h-5 w-5 text-gold" />
          Legal &amp; policies
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {[
            { label: "Privacy policy", hash: "#/privacy" },
            { label: "Terms of use", hash: "#/terms" },
            { label: "Cookie policy", hash: "#/cookies" },
            { label: "RSS feed", href: "/rss.xml" },
            { label: "XML sitemap", href: "/sitemap.xml" },
            { label: "robots.txt", href: "/robots.txt" },
          ].map((item) => (
            <li key={item.hash ?? item.href}>
              {"hash" in item ? (
                <button
                  onClick={() => onNavigate(item.hash!)}
                  className="group w-full rounded-md border border-border bg-surface p-3 text-left text-sm transition-colors hover:border-gold/50 hover:bg-surface-elevated"
                >
                  <span className="font-display font-semibold text-foreground group-hover:text-wine">
                    {item.label}
                  </span>
                </button>
              ) : (
                <a
                  href={item.href}
                  className="group block w-full rounded-md border border-border bg-surface p-3 text-left text-sm transition-colors hover:border-gold/50 hover:bg-surface-elevated"
                >
                  <span className="font-display font-semibold text-foreground group-hover:text-wine">
                    {item.label}
                  </span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
